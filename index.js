import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';

config();

const chatKey = process.env.CHATKEY;

const app = express();
app.use(json());
app.use(cors({origin:true}))

app.post('/authenticate', async (req, res)=>{
    const { username } = req.body;
    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            {username: username, secret: username, first_name: username},
            {headers: {"private-key": chatKey}}
        );
        return res.status(r.status).json(r.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
    
})

const PORT = process.env.PORT || 3500
app.listen(PORT, ()=>console.log(`Server is running up....`))