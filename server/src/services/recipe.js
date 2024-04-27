import mysql from "mysql2";
import HttpStatus from "http-status-codes";

import pool from "../db.js";

/**
 *
 * @param {*} user
 * @returns
 */
export const favoriteRecipe = async ({userId, recipe_name_id, recipe_id}) => {

   const query = `INSERT INTO favorites (userId, recipe_name_id, recipe_id, created_at, updated_at) 
                        VALUES (${userId}, ${recipe_name_id}, ${recipe_id}, NOW(), NOW())
                    `;

    const [rows] = await pool.promise().query(query);

    return [rows];
};
/**
 *
 * @param {*} user
 * @returns
 */
export const getFavoriteRecipe = async (userId) => {

   const query = `SELECT * FROM favorites WHERE userId = ${userId}`;

    const [rows] = await pool.promise().query(query);

    return [rows];
};