const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const participantRoutes = require('./routes/participantRoutes');
const stateRoutes = require('./routes/stateRoutes');
const otproutes = require('./routes/otpRoute')
const districtRoutes = require('./routes/districtRoutes');
const Sequence = require('./models/sequenceModel'); // Ensure this is imported


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Connection to database
mongoose.connect('mongodb://localhost/babyphotocontest', { useNewUrlParser: true, useUnifiedTopology: true })
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
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
