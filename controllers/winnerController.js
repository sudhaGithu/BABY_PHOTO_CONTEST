const winnerModel = require('../models/winners')
const Participant = require('../models/participantModel');
const addWinner = async (req, res) => {
    try {
      const { babyCode  } = req.body;
      //console.log(name, email, password, phoneNumber);
      //hashing password
    //   const salt = await bcrypt.genSalt(10)
    //   const hashedpassword = await bcrypt.hash(password, salt)
    const participant = await Participant.findOne({ babyCode });
        console.log(participant);
      const admin = new winnerModel({
        winner:participant,
        datenow:Date.now()
      });
  
      await admin.save();
      res.status(201).json(admin);
    } catch (err) {
      console.error('Error creating admin:', err);
      res.status(500).send('unable to add winner');
    }
  };

  const getAllWinners = async (req, res) => {
    try {
        const winners = await winnerModel.find().populate('winner');

        res.status(200).json(winners);
    } catch (error) {
        console.error('Error fetching winners:', error);
        res.status(500).json({ error: 'uable to fetch winners records' });
    }
};

module.exports ={
    addWinner,
    getAllWinners
}
  