'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();

      const token = keyTokenModel.create({
        userId,
        publicKey: publicKeyString,
      });

      return token ? publicKeyString : null;
    } catch (error) {}
  };
}

module.exports = KeyTokenService;
