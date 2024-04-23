import mysql from 'mysql2';

import pool from '../db.js';

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

export const updateUserDetails = async ({id,username}) => {
    const query = `UPDATE users SET 
                        username    = '${username}',
                        updated_at  = NOW()          
                    WHERE 
                        id = ${id}`;
    console.log('query', query);
    const [rows] = await pool.promise().query(query);

    return [rows];
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