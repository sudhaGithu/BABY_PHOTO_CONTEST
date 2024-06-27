 require('dotenv').config();
const nodemailer = require('nodemailer')
const otpmodel = require('../models/generateOtp')
const userSequence = require('../models/userSequenceModel')
const logger = require('../middleware/logger')
const otpGenertaor = require('otp-generator');
//const twilio = require('twilio');
const jwt = require('jsonwebtoken')
//console.log(process.env);
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSid , authToken, process.env.TWILIO_PHONE_NUMBER);
// const twilioClient = new twilio(accountSid, authToken);
//const JWT_SECRET = "my_secret_key"
const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;

            // Log the start of the transaction
    logger.info(`Generating OTP for email: ${email}`, { ip: req.ip });

        // to genrate sequence for user 
        let sequence = await userSequence.findOneAndUpdate(
            { name: 'generateotps' },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
        );

        if (!sequence) {
            logger.error('Failed to generate voterId: Sequence not found', { ip: req.ip });
            return res.status(500).json({ error: 'Failed to generate voterId' });
        }

        // Generate the baby code
        const voterId = `USER${sequence.value}`;


        
        const otpDocument = await otpmodel.findOne({ email });
        const otp = otpGenertaor.generate(5, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        const cDate = new Date();

        let info;
        if (otpDocument) {
            // Update existing OTP
            const updateotp = await otpmodel.findOneAndUpdate(
                { email: email },
                { $set: { otp: otp, otpExpiration: new Date(cDate.getTime()) } },
                { new: true }
            );
            logger.info('Updated existing OTP document', { email: email, ip: req.ip });
        } else {
            // Generate new OTP document
            const generateotp = new otpmodel({
                email,
                otp,
                voterId,
                otpExpiration: new Date(cDate.getTime())
            });
            await generateotp.save();

            logger.info('Generated new OTP document', { email: email, ip: req.ip });
        }

        // Send email with OTP
        info = await sendOtpEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        
        });
    } catch (error) {
        logger.error('Error generating OTP:', { ip: req.ip, error: error.message });
        console.error('Error generating OTP:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

async function sendOtpEmail(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Upgrade later with STARTTLS
            auth: {
                user: process.env.USER_MAIL, // replace with your actual Gmail email
                pass: process.env.USER_PASS // replace with your actual Gmail password 'norb ryrq uevc vwud'
            }
        });

        const info = await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email,
            subject: "OTP for verification",
            text: `Your OTP for baby contest login is ${otp}`
        });

        console.log("Message sent: %s", info.messageId);

        logger.info(`Email sent successfully to ${email}`, { messageId: info.messageId });
        return info;
    } catch (error) {
        logger.error('Error sending email:', { error: error.message });
        console.error('Error sending email:', error);
        throw error;
    }
}

  const verifyOtp = async (req, res) => {
    try {
        const {phone, otp} = req.body;

        const otpdocument = await otpmodel.findOne({phone,otp});

        if(otpdocument)
            {
                    // Generate JWT token
                const payload = { phone };
                const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '12h' });
                

            // Log successful OTP verification
            logger.info('OTP verified successfully', {
                phone: phone,
                email: otpdocument.email,
                voterId: otpdocument.voterId
            });
                
                res.status(200).send({success: true ,
                    user: {
                        email: otpdocument.email,
                        voterId: otpdocument.voterId
                    },
                    token : token
                });
            }
            else{

                // Log invalid OTP attempt
            logger.warn('Invalid OTP entered', { phone: phone });
                res.status(200).send({success: false, error: "Invalid otp"})
            }
        


    } catch (error) {

    logger.error('Error verifying OTP:', { error: error.message });
     return res.status(400).json({
        success: false,
        message: error.message

     })
    }
  };

  module.exports = {
    generateOtp,
    verifyOtp}