import mysql from "mysql2";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";

import * as security from "../utils/security.js";
import pool from "../db.js";
import config from "../config.js";
import AuthenticationError from '../errors/authentication.js';

/**
 *
 * @param {*} user
 * @returns
 */
export const createUser = async (user) => {
    const checkUsernameQuery = `SELECT username FROM users where username = '${user.username}'`;

    const [checkUsername] = await pool.promise().query(checkUsernameQuery);

    if(!checkUsername.length){
        if (user.username && user.password) {
            return new Promise((resolve, reject) => {
                return bcrypt.hash(user.password, 5, async (err, hash) => {
                    if (err) {
                        throw HttpStatus.BAD_REQUEST;
                    }
                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date + ' ' + time;
    
                    const query = `INSERT INTO users
            (
              username,
              password,
              created_at,
              updated_at
            )
            VALUES
            (
              ${mysql.escape(user.username)},
              ${mysql.escape(hash)},
              ${mysql.escape(dateTime)},
              ${mysql.escape(dateTime)}
            );`;
                    const [result] = await pool.promise().query(query);
                    return resolve(result.insertId);
                });
            });
        }
    }else{
        throw new AuthenticationError('Username already exists.');
    }
};

export const login = async (user) => {



    const query = `SELECT id, username, password from users WHERE username= ${mysql.escape(user.username)}`;

    const [rows] = await pool.promise().query(query);

    if (!rows.length) {
        throw new AuthenticationError('Not Authorized');
    }
    const userAccount = rows[0];
    if (!await security.comparePassword(user.password, userAccount.password)) {
        throw new AuthenticationError('Username or Password mismatched');
    }

    const refreshToken = security.generateToken(
        {
            id: userAccount.id,
            type: "refresh",
        },
        config.app.refreshTokenExpiryInMinute
    );

    const accessToken = security.generateToken(
        {
            id: userAccount.id,
            type: "access",
        },
        config.app.accessTokenExpiryInMinute
    );

    const { id, username } = userAccount;
    return { id, username, refreshToken, accessToken };
};

export const refreshToken = (user) => {
    const refreshToken = security.generateToken(
        {
            id: user.user_id,
            type: "refresh",
        },
        config.app.refreshTokenExpiryInMinute
    );

    const accessToken = security.generateToken(
        {
            id: user.user_id,
            type: "access",
        },
        config.app.accessTokenExpiryInMinute
    );

    return { refreshToken, accessToken };
}