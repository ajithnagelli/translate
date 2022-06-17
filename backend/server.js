const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const app= express();
const cors = require('cors');
const port= 8000;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/translatedb', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("connected");
});

const translateRoutes = require('./routes/translate.routes');
const userRoutes = require('./routes/user.routes');
// const pupmroutes = require('./routes/pumpFunctions');
// const managerroutes = require('./routes/manager');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/translate', translateRoutes);
app.use('/user', userRoutes);
// app.use('/pump', pupmroutes);
// app.use('/manager', managerroutes);
app.listen(port, () => console.info('REST API running on port '+ port));
