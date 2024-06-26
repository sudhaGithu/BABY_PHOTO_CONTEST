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

        // Assuming winners is an array of documents fetched from MongoDB

        // Map through each winner and format the response
        const formattedWinners = winners.map(winner => {
            const participant = {
                _id: winner._id,
                winner: winner.winner,
                datenow: winner.datenow,
                __v: winner.__v
            };

            // Calculate the week based on createdAt date
            const createdAt = new Date(winner.winner.createdAt);
            const week = getWeekDescription(createdAt); // Implement getWeekDescription function

            participant.week = week;

            return participant;
        });

        res.status(200).json(formattedWinners);
    } catch (error) {
        console.error('Error fetching winners:', error);
        res.status(500).json({ error: 'Unable to fetch winners records' });
    }
};

function getWeekDescription(date) {
  // Assuming date is a JavaScript Date object
  const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekOfMonth = Math.ceil(date.getDate() / 7);
  const monthName = monthNames[date.getMonth()];
  const weekDescription = `${monthName} ${weekOfMonth}th week`;

  return weekDescription;
}

module.exports ={
    addWinner,
    getAllWinners
}
  