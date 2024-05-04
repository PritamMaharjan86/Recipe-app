import React, { useState } from 'react'
import "../components/comment.css"
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import http from "../pages/http";


export default function Comment({data}) {

    const [comment, setComment] = useState('');
    const [recipe_id, setRecipe_id] = useState('');
    const [user_id, setUser_id] = useState('');


    console.log('data', data);
    const handleComment = async () => {
       
        try {
            const response = await http.post('/recipe/add-comment',
                {
                    comment,
                    user_id,
                    recipe_id,
                });

           

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='comment_box'>
            <Textarea className='comment' placeholder="Comment here...." />;
            <Button className='post' variant="outlined" onClick={handleComment}>Post</Button>
        </div>
    )
}
