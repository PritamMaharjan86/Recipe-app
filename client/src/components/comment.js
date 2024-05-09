import React, { useEffect, useState } from 'react'
import "../components/comment.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import http from "../pages/http";
import Box from '@mui/material/Box';




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

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField className="comment" label="Comment here..." variant="filled"  onChange={(e) => handleChange(e)}/>
            <Button className='post' variant="outlined" onClick={submitComment}>Post</Button>

        </Box>
        // <div className='comment_box'>
        //     <TextField className='comment' placeholder="Comment here...." onChange={(e) => handleChange(e)} />
        //     <Button className='post' variant="outlined" onClick={submitComment}>Post</Button>

        // </div>
    );
}
