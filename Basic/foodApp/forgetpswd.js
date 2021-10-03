 const express = require('express')
const app = express();
const port = 3000
app.listen(port, () => console.log(`app listening on port port!`))
app.use(express.static("views"));

const forgetRoute = express.Router();

app.use("/user",forgetRoute)

forgetRoute
.route('/forgetpswd')
.get(fpswdform)
.post(getmail)


function fpswdform(req,res){
    res.sendFile("./views/forgetpaswd.html",{root:__dirname});
}

function getmail(req,res){
let data = req.body;
console.log(data);
//     let {email} = req.body;
// console.log({email});

res.json({
    message:"done"
})
}

