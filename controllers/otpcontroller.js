require('dotenv').config();
const nodemailer = require('nodemailer')
const otpmodel = require('../models/generateOtp')
const otpGenertaor = require('otp-generator');
const twilio = require('twilio');
const jwt = require('jsonwebtoken')
//console.log(process.env);
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSid , authToken, process.env.TWILIO_PHONE_NUMBER);
// const twilioClient = new twilio(accountSid, authToken);

const generateOtp = async (req, res) => {
    try {

        const {email} = req.body;
        let testAccount = await nodemailer.createTestAccount();

       
        // connect with the smtp
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host:"smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
             user: 'sudarsanarao054@gmail.com',
             pass: 'norb ryrq uevc vwud'
            },
          });

        const otpDocument = await otpmodel.findOne({email});

        const otp = otpGenertaor.generate(5,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const cDate = new Date();
        if(otpDocument)
            {
                const updateotp = await otpmodel.findOneAndUpdate(
                    {email:email},
                   
                    {$set:{otp:otp}},
                    {$set:{otpExpiration: new Date(cDate.getTime())}},
                   { new: true });

                   const info = await transporter.sendMail({
                    from: "sudarsanarao054@gmail.com", // sender address
                    to: email, // list of receivers
                    subject: "OTP for verification", // Subject line
                    text: `your OTP for baby contest login is ${otp}`, // plain text body
                    //html: "<b>Hello world?</b>", // html body
                  });

                  transporter.sendMail(info, (error, emailResponse)=>{
                    if(error)
                    throw error;
                    res.status(200).json({
                        success: true,
                        message: 'Otp sent successfully',
                        otp: otp
                
                     })
                  })

                  console.log("message sent: %s", info.messageId);

                //   // console.log(TWILIO_PHONE_NUMBER);
                //  await twilioClient.messages.create({
                //  body: `your otp for baby contest login is ${otp}`,
                // messagingServiceSid:"MG4bc7db30037e55b0dbfd47d48fd0017e",
                //  to: phone,
                //  from: process.env.TWILIO_PHONE_NUMBER
                // })

                  
            }
            else
            {
                const generateotp = new otpmodel({
                    email,
                    otp,
                    otpExpiration: new Date(cDate.getTime())
                    
                })
                generateotp.save();
                const info = await transporter.sendMail({
                    from: "sudarsanarao054@gmail.com", // sender address
                    to: email, // list of receivers
                    subject: "OTP for verification", // Subject line
                    text: `your OTP for baby contest login is ${otp}`, // plain text body
                    //html: "<b>Hello world?</b>", // html body
                  });


                  transporter.sendMail(info, (error, emailResponse)=>{
                    if(error)
                    throw error;
                    res.status(200).json({
                        success: true,
                        message: 'Otp sent successfully',
                        otp: otp
                
                     })
                  })

            }
        

    } catch (error) {
     return res.status(400).json({
        success: false,
        message: error.message

     })
    }
  };

  const verifyOtp = async (req, res) => {
    try {
        const {phone, otp} = req.body;

        const otpdocument = await otpmodel.findOne({phone,otp});

        if(otpdocument)
            {
                    // Generate JWT token
                const payload = { phone };
                const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '12h' });
                res.send({success: true ,
                    user: otpdocument,
                    token : token
                });
            }
            else{
                res.status(401).send({success: false, error: "Invalid otp"})
            }
        


    } catch (error) {
     return res.status(400).json({
        success: false,
        message: error.message

     })
    }
  };

  module.exports = {
    generateOtp,
    verifyOtp}