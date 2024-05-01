import mysql from 'mysql2';

import pool from '../db.js';
import bcrypt from "bcrypt";

import * as security from '../utils/security.js';

export const getUserDetail = async (id) => {
    const query = `SELECT * FROM users where id=${mysql.escape(id)}`;

    const [rows] = await pool.promise().query(query);

    return [rows];
}

export const getAllUsers = async ({ page, perPage, sortBy, sortDirection, searchText }) => {
    const startIndex = (page - 1) * perPage;

    let where = '';
    if (searchText) {
        where = ` WHERE 
                        u.email LIKE '%${searchText}%'
                        OR u.first_name LIKE '%${searchText}%' 
                        OR u.last_name LIKE '%${searchText}%'
                        OR u.mobile_number LIKE '%${searchText}%'
                `;
    }

    const query = `SELECT 
                        u.*, cu.name as currency, c.name as country_name
                    FROM 
                        users  u 
                            LEFT JOIN 
                        currencies cu on cu.id = u.currency_id 
                            LEFT JOIN
                        countries c on c.alpha2_code = u.country
                    ${where} 
                    ORDER BY u.${sortBy} ${sortDirection} 
                    LIMIT ${startIndex}, ${perPage}`;

    const [rows] = await pool.promise().query(query);

    const countQuery = `SELECT count(id) as totalDatas FROM users ${where}`;

    const [count] = await pool.promise().query(countQuery);

    const response = { rows, count };

    return response;

}

export const updateUserDetails = async ({ id, username, currentPassword, newPassword }) => {
    if (id && username && currentPassword && newPassword) {
        const getUserPassword = `SELECT password FROM users WHERE id = ${id}`;

        const [res] = await pool.promise().query(getUserPassword);

        const checkPassword = await security.comparePassword(currentPassword, res[0].password);

        if (checkPassword) {
            return new Promise((resolve, reject) => {
                return bcrypt.hash(newPassword, 5, async (err, hash) => {

                    if (err) {
                        throw HttpStatus.BAD_REQUEST;
                    }
                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date + ' ' + time;

                    const query = `UPDATE users SET 
                                    username    = '${username}',
                                    password    = '${hash}',
                                    updated_at  = NOW()          
                                WHERE 
                                    id = ${id}`;

                    const [result] = await pool.promise().query(query);

                    return resolve(result.insertId);
                });
            });
        } else {
            return {
                status: 202,
                message: "Invalid Password"
            }
        }
    }
}

export const searchUser = async ({ searchTerm }) => {
    const query = `SELECT * FROM users WHERE id like '%${searchTerm}%' OR first_name like '%${searchTerm}%' OR last_name like '%${searchTerm}%' OR email like '%${searchTerm}%' or mobile_number like '%${searchTerm}%'`;

    const [rows] = await pool.promise().query(query);

    return [rows];
}

export const userCategories = async ({ page, perPage, sortBy, sortDirection, searchText }) => {
    const startIndex = (page - 1) * perPage;

    const query = `SELECT 
                        * 
                    FROM 
                        user_categories 
                    ORDER BY ${sortBy} ${sortDirection} 
                    LIMIT ${startIndex}, ${perPage}`;

    const [rows] = await pool.promise().query(query);

    return [rows];
}