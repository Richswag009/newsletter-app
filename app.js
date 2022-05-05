// jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request= require("request");

const app= express();
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/sign-up.html");
});


app.post("/", function(req,res){
    const firstname = req.body.fName;
    const lastname = req.body.lName;
    const email = req.body.email;
    var data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/fbce8f01bd";
    const options={
        method:"POST",
        auth:"riches:8b7f49379730f73ff4cfe5a6488eb014-us13"
    }
    
    const request =https.request(url,options, (response)=>{


        if(response.statusCode === 200){
            res.sendFile(__dirname +"/sucess.html")
        }else{
            res.sendFile(__dirname +"/failure.html")
        }
       response.on("data", (data)=>{
           console.log(JSON.parse(data));
       })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(request, response){
    response.redirect("/");
});

app.listen(process.env.PORT || 8000, ()=>{
    console.log("server is running on port 8000")
});



