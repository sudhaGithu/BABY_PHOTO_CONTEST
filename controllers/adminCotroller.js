
const Admin = require('../models/adminModel');
const Participant = require('../models/participantModel');
const Winner = require('../models/winners');
const Voter = require('../models/generateOtp');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// Admin operations: create, update, delete
const createAdmin = async (req, res) => {
  try {
    const { name, email, password,phoneNumber  } = req.body;
    console.log(name, email, password, phoneNumber);
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)


    const admin = new Admin({
      name,
      email,
      password:hashedpassword,
      phoneNumber
    });

    await admin.save();
    res.status(201).json(admin);
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).send('unable to add admin');
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  const user = await Admin.findOne({ email })

     // Generate JWT token
     const payload = { user: {
      id: user.id,
      email: user.email
      // Add any other fields you want to include in the token
    } };
     const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '12h' });
  if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: token
      })
}
else{
  res.json({
    message:"Invalid credentials"
  })
}
}

// const loginAdmin = async (req, res) => {
//   try {
//       const { email, password } = req.body;
//       const admin = await Admin.findOne({ email });
//       console.log(admin);
//       if (!admin || !(await admin.comparePassword(password))) {
//           return res.status(401).json({ error: 'Invalid login credentials' });
//       }
//       console.log("sudha");

//       const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
//       console.log(token);
//       res.status(200).json({ token });
//   } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//   }
// };

const dashboardforadmin = async (req, res) => {
  try {
      const userCount = await Voter.countDocuments();
      const participantCount = await Participant.countDocuments();
      const winnerCount = await Winner.countDocuments();
      const voterCount = await Voter.countDocuments();

      res.json ({
          users: userCount,
          participants: participantCount,
          winners: winnerCount,
          voters: voterCount,
      });
  } catch (error) {
      res.status(500).json({ error: 'unable to get records' });
  }
};




module.exports = {
  createAdmin,
  dashboardforadmin,
  loginAdmin,}
