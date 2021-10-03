const express = require("express");

const server = express();

let obj ={
    "name":"himanshu"
}

let port = "8080";

server.listen(port,()=>{
console.log("server is listening");
})

server.get("/",(req,res)=>{
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.path);

    res.send("<h1>hello</h1>");
})

server.get("/user",(req,res)=>{
    res.json(obj);
})

server.get("/home",(req,res)=>{
    res.sendFile("./views/index.html",{root:__dirname});
})

