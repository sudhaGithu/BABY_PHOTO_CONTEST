
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  try {
  console.log("sudha");
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'failed to authenticate Token' });
  }
};

module.exports = authenticateToken;