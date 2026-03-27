require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose')

const cookieparser=require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');

const Blog=require('./models/blog');
const userRoute = require('./routes/users');
const blogRoute=require('./routes/blog');

const app = express();
const PORT =process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL)
.then((e) => console.log('MongoDB Connected'))
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(cookieparser());
app.use(checkForAuthenticationCookie('token'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve('./public')))
app.use('/user', userRoute);
app.use('/blog', blogRoute);


app.get('/', async (req, res) => {
    const allBlogs=await Blog.find({});
    return res.render('home',{
        user:req.user,
        blogs:allBlogs,
    });
})

app.listen(PORT, () => console.log(`Server Started At PORT:${PORT}`));