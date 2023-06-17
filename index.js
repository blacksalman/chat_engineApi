import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(json());
app.use(cors({origin:true}))

app.post('/authenticate', async (req, res)=>{
    const { username } = req.body;
    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            {username: username, secret: username, first_name: username},
            {headers: {"private-key": "7792aa03-9f76-41ed-b41d-05f3320292ff"}}
        );
        return res.status(r.status).json(r.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
    
})

const PORT = process.env.PORT || 3500
app.listen(PORT, ()=>console.log(`Server is running up....`))