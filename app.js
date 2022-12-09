//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
//mongoose.connect("mongodb+srv://admin-ashwin:admin@cluster0.qtcbu.mongodb.net/microp",{useNewUrlParser:true});
//mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema={
  email:String,
  password:String,
  name:String,
  address:String
};

const User= new mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.sendFile(__dirname+"/newindex.html");
})

app.get("/about.html",function(req,res){
  res.sendFile(__dirname+"/about.html");
})

app.get("/login",function(req,res){
  res.render("login");
})

app.get("/faq",function(req,res){
  res.render("faq");
});

app.get("/register",function(req,res){
  res.render("register");
})

app.get("/sucess",function(req,res){
  res.render("sucess");
})

app.get("/dashboard.html",function(req,res){
  res.sendFile(__dirname+"/dashboard.html");
})

app.get("/newindex.html",function(req,res){
  res.sendFile(__dirname+"/newindex.html");
})

app.get("/marketplace.html",function(req,res){
  res.sendFile(__dirname+"/marketplace.html");
})

app.get("/lead.html",function(req,res){
  res.sendFile(__dirname+"/lead.html");
})

app.post("/sucess",function(req,res){
  res.render("login");
})


app.post("/register",function(req,res)
{
  const name=req.body.name;
  const email=req.body.username;
  const password=req.body.password;
  const address=req.body.address;
  //console.log(email);
  //console.log(password);
  //console.log(name);
  const user=new User({
    email:email,
    password:password,
    name:name,
    address:address
  });

  user.save();
  res.render("sucess");
})

app.post("/login",function(req,res){
  const email=req.body.username;
  const password=req.body.password;
  //console.log(email);
  //console.log(password);
  User.find({},function(er,foundItems)
  {
    if(er){
      console.log("Error")
    }
    else{
        //console.log(foundItems);
        foundItems.forEach(function(item){
          if(item.email==email && item.password==password){
            //redirect to dashboard
            res.sendFile(__dirname+"/dashboard.html");
          }
        });
      }
    })
  })

app.listen(3000,function(){
  console.log("Server started on port 3000.");
})
