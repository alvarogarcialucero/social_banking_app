
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Creación del token
const createToken = (userData, oldToken = null) => {
  let payload;

  if(oldToken != null){
    payload = jwt.decode(oldToken, process.env.TOKEN_SECRET);
  }else{
    payload = {
      email: userData.email
    }
  }

  payload.createdAt = moment().unix();
  payload.expiredAt = moment().add(60, 'minutes').unix();

  return jwt.sign(payload, process.env.TOKEN_SECRET);
}


// Verificar la validez del token
const checkToken = (req, res, next) => {
 // const nonSecurePaths = ['/api/merchants/register', '/api/users/login', '/api/users/recover', '/api/ss/webhook', '/api/sign/webhook-subscriptions', '/api/users/refresh-token', '/api/terms-conditions', '/api/notifications/contact-landing'];
  let payload = {};

  //if (nonSecurePaths.includes(req.originalUrl)) return next();

  if (!req.header('authorization')) {
    return res.status(403).json({ status: 'ko', message: 'debes incluir el token en cabeceras' });
  }

  try {
    userToken = (req.header('authorization')).substring(7);
    payload = jwt.decode(userToken, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(403).json({ status: 'ko', message: 'El usertoken es incorrecto' });
  }

  if(payload.expiredAt < moment().unix()) {
    return res.status(403).json({ status: 'ko', message: 'Sesión expirada' });
  }

  req.payload = payload;
  next();
}


module.exports = {
  createToken,
  checkToken
}