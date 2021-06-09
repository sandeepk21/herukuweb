const express=require('express');
const { join } = require('path');
const app=express();
const port=process.env.PORT || 3000;
const path=require('path');
const request=require('request');
const path_static=path.join(__dirname,"../public");
const view_path=path.join(__dirname,"../views");
app.use(express.static(path_static));
app.set("views",view_path);

app.get("/",(req, res) =>
{
   res.render('index.hbs');
});
app.get("/about",(req, res)=>{

   res.render('about.hbs',{
      susu : req.query.name
   });
})
app.get("/temp", (req, res)=>{
   request(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=dfa855b8dd4ab21007d7e72a0ad49eef&units=metric`).on("data",(chunk)=>{
      const objdata=JSON.parse(chunk);
      const arrdata=[objdata];
      console.log(req.query.name);
      res.render("temp.hbs",{
         city :arrdata[0].name,
         temp: arrdata[0].main.temp
      });
   })
   .on("end",(err)=>{
      if(err){
         return console.log("error",err);
         res.end();
      }
   })
 })

app.listen(port,()=>
{
   console.log(`online server ${port} from index`);
})