const http=require('http')
const mysql=require('mysql')
const URL=require('url')
const fs = require('fs')
const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'assignment'
})
db.connect((err)=>{
if (err) console.log('Could not connect')
else{
console.log("Connection successful")}
})
const server = http.createServer((req,res)=>{
const url_path=URL.parse(req.url,true)
const pathname= url_path.pathname
if(req.method==="GET" && pathname==="/"){
fs.readFile("./index.html",(err,data)=>{
if(err){
res.writeHead(500);
res.end("Internal Server Error");
}
else{
res.writeHead(200, { "Content-Type": "text/html" });
res.end(data);
}
})
}
if(req.method==="GET" && pathname==="/welcome"){
fs.readFile("./welcome.html",(err,data)=>{
if(err){
res.writeHead(500);
res.end("Internal Server Error");
}
else{
res.writeHead(200, { "Content-Type": "text/html" });
res.end(data);
}
})
}
if(req.method==="POST" && pathname==="/signup"){
let body=''
req.on('data',(chunk)=>{
body+=chunk
})
req.on('end',()=>{
var formData = new URLSearchParams(body)
var name = formData.get('username')
var password=formData.get('password')
db.query(`Insert into users(username,password) Values('${name}','${password}')`,(err)=>{
if(err){
console.log(err)
res.writeHead(500).end("Error inserting the vale")
}
else{
console.log("Data insserted successfully")
res.writeHead(302,{"location":"/"})
res.end()
}
})
})
}
if(req.method==="POST" && pathname==="/signin"){
let body=''
req.on("data",(chunk)=>{
body+=chunk
})
req.on('end',()=>{
var formData=new URLSearchParams(body);
var name = formData.get('username')
var password = formData.get('password')
console.log(name," ",password)
db.query(`Select * from users where username ='${name}' and password='${password}'`,(err,results)=>{
if(err){
console.log("cant find records")
res.writeHead(404)
res.end("Cant find any records for the username and password")
}
else if(results.length>1){
console.log("Invalid users")
res.writeHead("500")
res.end("Invalid user")
}
else{
console.log("recod find successfully")
res.writeHead(302,{"location":"/welcome"})
res.end()
}
})
})
}
})
server.listen(3000,(err)=>{
if(err) console.log("Error Occured")
else{ console.log(`website running in port 3000`)}
})