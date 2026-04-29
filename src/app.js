const express = require('express');

const app = express();

app.use('/myName',(req,res)=>{
    res.send('Hello i am Ankur')
})

app.listen(3000,()=>{
    console.log('app is listening on port 3000');
})