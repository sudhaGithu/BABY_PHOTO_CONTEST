// middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const adminAuth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decoded._id });
        if (!admin) {
            return res.status(401).json({ error: 'Authentication failed: Admin not found' });
        }

        req.token = token;
        req.admin = admin;
        next();
    } catch (error) {
        console.error('Error in adminAuth middleware:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = adminAuth;
