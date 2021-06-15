var express = require('express');
var app = express();
const path=require('path');
const request=require('request');

console.log(path.join(__dirname,"../public"))
const staticpath=path.join(__dirname,"../public");
app.use(express.static(staticpath));
app.get("/", (req, res) =>{
   res.send("sandy stark");
});
app.get("/about", (req,res) =>{
   res.send("<html><h1>hello from the about sections</h1></html>");
});
app.get("/temp", (req, res)=>{
  request("http://api.openweathermap.org/data/2.5/weather?q=lakhimpur&appid=dfa855b8dd4ab21007d7e72a0ad49eef").on("data",(chunk)=>{
     const objdata=JSON.parse(chunk);
     const arrdata=[objdata];
     console.log(arrdata[0].name);
     res.send()
  })
  .on("end",(err)=>{
     if(err){
        return console.log("error",err);
        res.end();
     }
  })
})
app.listen(3000, ()=>{
   console.log("server online 3000");
})