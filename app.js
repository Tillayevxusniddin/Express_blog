const express = require('express');
const mongoose = require('mongoose');

// models
const postModel =require('./models/post.model');


const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/', async(req, res) => {
   try {
        const { title, body } = req.body;
        const newPost = await postModel.create({ title, body });
        res.status(201).json(newPost);
   } catch (error) {
        res.status(500).json({message: error.message});
   }
})




// database connection
const DB_URL =
  "mongodb+srv://DevKage:iwQDKPzFVhAMnaB0@backend.onsax.mongodb.net/?retryWrites=true&w=majority&appName=Backend";
const PORT = 8080;

const bootstrap = async() => {
    try {
        await mongoose.connect(DB_URL).then(() => console.log('Connected to database'));
        app.listen(PORT, () =>
          console.log(`Server is running on - http://localhost:${PORT}`)
        );

    } catch (error) {
        console.log(`Error connecting to database - ${error}`);
    }
}

bootstrap();