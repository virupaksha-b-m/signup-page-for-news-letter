let express = require("express");
let bodyparser = require("body-parser");
let request = require("request");
let https = require("https");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var name = req.body.fn;

  var lname = req.body.ln;
  var email = req.body.em;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: lname,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var url = "https://us21.api.mailchimp.com/3.0/lists/ed934e9db9";

  var options = {
    method: "POST",
    auth: "virupaksha:h74eca1b94ad25e3e3ab875dd1cb9ef13-us21",
  };

  var request = https.request(url, options, function (response) 
  {
    if ((response.statusCode === 200)) 
    {
      res.sendFile(__dirname + "/success.html");
    // res.send("success");
    
    } else {
      res.sendFile(__dirname + "/failure.html");
    // res.send("failure")
    }
    response.on("data", function (data) 
    {
      console.log(JSON.parse(data));
      
    });
  });

  request.write(jsonData);
  request.end();
  // console.log(name +" "+ lname+" "+email);
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000, function () {
  console.log("server is running on 3000");
});

//API key
// 74eca1b94ad25e3e3ab875dd1cb9ef13-us21

// unique key : ed934e9db9
