const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '1h',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '30d',
    });

    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        throw new Error('Invalid access token');
      } else {
        console.log('Access token is valid:', decoded);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Error creating token pair');
  }
};

module.exports = {
  createTokenPair,
};
