import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config.js";

import sha1 from "sha1";

var SALT = process.env.SALT_KEY;

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}

export const generateToken = (data, expiryTime) => {
  return jwt.sign(
    {
      encryptedData: data,
    },
    config.app.saltKey,
    {
      expiresIn: expiryTime,
    }
  );
};

export const decrypt = (data) => {
  return jwt.verify(data, config.app.saltKey);
};
