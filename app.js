const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winnerRoutes = require('./routes/winnerRoutes')
const participantRoutes = require('./routes/participantRoutes');
const stateRoutes = require('./routes/stateRoutes');
const otproutes = require('./routes/otpRoute')
const districtRoutes = require('./routes/districtRoutes');
const adminRoutes = require('./routes/adminRoutes')
const Sequence = require('./models/sequenceModel'); // Ensure this is imported
const scriptRoutes = require('./routes/scriptRoutes')
const homeRoutes = require('./routes/homePageRoutes')

//console.log(process.env.MONGO_URL);
const app = express();
const port = 3000;
// Enable All CORS Requests
app.use(cors());

app.use(cors({
    origin: '*' // Allow only requests from this origin
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});




// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
console.log(process.env.MONGO_URL);
// Connection to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB successfully');

        // Ensure the sequence document exists
        const sequence = await Sequence.findOne({ name: 'participant' });
        if (!sequence) {
            await Sequence.create({ name: 'participant', value: 1 });
            console.log('Initialized participant sequence value to 1000');
        }
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Routes
app.use('/participate', participantRoutes);
app.use('/state', stateRoutes);
app.use('/district', districtRoutes);
app.use('/otp',otproutes)
app.use('/admin', adminRoutes)
app.use('/scripts', scriptRoutes)
app.use('/winners',winnerRoutes)
app.use('/home',homeRoutes)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
