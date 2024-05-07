import mysql from "mysql2";
import HttpStatus from "http-status-codes";

import pool from "../db.js";

/**
 *
 * @param {*} user
 * @returns
 */
export const favoriteRecipe = async ({ userId, recipe_name_id, recipe_id }) => {

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

/**
 *
 * @param {*} user
 * @returns
 */
export const addComment = async ({ userId, recipe_id, comment }) => {
    if (userId && recipe_id && comment) {
        const query = `INSERT INTO comments (recipe_id, user_id, comment, created_at, updated_at) VALUES (${recipe_id}, ${userId}, '${comment}', NOW(), NOW())`;

        const [rows] = await pool.promise().query(query);

        return [rows];
    }

};
/**
 *
 * @param {*} user
 * @returns
 */
export const likeRecipe = async ({ userId, recipe_id }) => {
    if (userId && recipe_id) {
        const query = `INSERT INTO ${"`like`"} (user_id, recipe_id, created_at, updated_at) VALUES (${userId}, ${recipe_id}, NOW(), NOW())`;

        const [rows] = await pool.promise().query(query);

        return [rows];
    }

};

export const addRecipe = async ({ recipe_name, time_to_cook, steps, description, ingredients }) => {
        const insertRecipeQuery = `INSERT INTO recipes_name (recipe_name, created_at) VALUES ('${recipe_name}', NOW())`;

        const [insertRecipeName] = await pool.promise().query(insertRecipeQuery);

        const insertedId =  insertRecipeName.insertId;
        if(insertedId){
            const insertRecipeQ = `INSERT INTO recipes (recipe_name_id, time_to_cook, steps, description, ingredients, created_at) VALUES (${insertedId}, ${time_to_cook}, ${steps}, ${description}, ${ingredients})`;

            const [insertRecipe] = await pool.promise().query(insertRecipeQ);

            return [insertRecipe];
        }

        return {
            status : '202',
            message : 'Oops! Something went wrong while inserting data'
        }

};
/**
 *
 * @param {*} user
 * @returns
 */
export const getAllRecipe = async ({ searchTerm }) => {
    const query = `SELECT 
                        r.id,
                        r.recipe_name_id,
                        rn.recipe_name,
                        r.time_to_cook,
                        r.steps,
                        r.description,
                        r.ingredients,
                        r.image_link,
                        GROUP_CONCAT(c.${`comment`}, ' ') AS comment,
                        COUNT(l.id) AS likesCount
                    FROM
                        recipes r
                        LEFT JOIN
                        recipes_name rn ON r.recipe_name_id = rn.id
                    LEFT JOIN 
                        comments c ON c.recipe_id = r.id
                    LEFT JOIN
                        ${"`like`"} l ON l.recipe_id = r.id
                    WHERE rn.recipe_name LIKE '%${searchTerm}%'
                    GROUP BY
                        r.id,
                        r.recipe_name_id,
                        rn.recipe_name,
                        r.time_to_cook,
                        r.steps,
                        r.description,
                        r.ingredients,
                        r.image_link
                    LIMIT 50;`;


    const [rows] = await pool.promise().query(query);

    return [rows];

};