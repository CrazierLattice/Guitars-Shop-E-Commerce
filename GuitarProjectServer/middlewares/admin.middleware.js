import jwt from 'jsonwebtoken';

//Middleware that gives access only to the admin.

const verifyAdminToken = async (req, res, next) => {
  const token = req.header('xx-auth');
  if (!token)
    return res.status(404).json({ error: true, message: 'Token is required' });
  jwt.verify(token, process.env.SECRET_CODE, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send(err);
    }
    console.log(decoded);
    if (decoded.user[0].role === 'admin') return next();
    res
      .status(403)
      .json({ error: true, message: 'You dont have access to do that.' });
  });
};

export default verifyAdminToken;
