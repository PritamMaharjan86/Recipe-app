import React, { useEffect, useState } from 'react'
import "../components/comment.css"
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import http from "../pages/http";




export default function Comment({ recipe_id }) {
    const [comment, setComment] = useState('');

   
    const userId = localStorage.getItem('userId');


    const handleChange = (e) => {
        setComment(e.target.value);
    }
    

    const submitComment = async () => {
        try {
            const response = await http.post('/recipe/add-comment',
                {
                    comment,
                    userId,
                    recipe_id
                });
                console.log('response', response);
               

        } catch (error) {
            console.log(error);

        }
      


    }

   


    return (
        <div className='comment_box'>
            <Textarea className='comment' placeholder="Comment here...." onChange={(e)=>handleChange(e)}/>;
            <Button className='post' variant="outlined" onClick={submitComment}>Post</Button>
           
        </div>
    )
}
