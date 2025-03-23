const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(3000,()=>{
    console.log(`Server Running on PORT: 3000`);
})
