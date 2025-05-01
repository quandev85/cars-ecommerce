const { USER_ROLE } = require('../constants/user.constant');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../utils/auth.util');
const { token } = require('morgan');
const { getInfoData } = require('../utils');
class AuthService {
  static register = async ({ name, email, password }) => {
    try {
      console.log(name, email, password);
      const userExist = await userModel.findOne({ email }).lean();
      console.log(userExist);
      if (userExist) {
        return {
          code: '0000',
          message: 'User already exists',
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        name,
        email,
        password: passwordHash,
        role: [USER_ROLE.GUEST],
      });

      if (newUser) {
        // create private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });

        console.log(privateKey, publicKey);

        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newUser._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: '0001',
            message: 'PublicKeyString error',
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKeyObject,
          privateKey
        );

        console.log(`Created token success for user: ${tokens}`);

        return {
          code: 201,
          message: 'Register success',
          metadata: {
            user: getInfoData(['_id', 'name', 'email'], newUser),
            tokens,
          },
        };
      }

      return {
        code: 'xxxx',
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxxx',
        message: error.message,
      };
    }
  };

  login = (req, res, next) => {
    // TODO: Implement login logic
    res.send('Login');
  };
}

module.exports = AuthService;
