const { json } = require('express');
const express = require('express')
const rateLimit = require('express-rate-limit')
const MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');
const path = require("path");
require('dotenv').config();

const mongoURI = process.env.MONGODBURI;
const salt = process.env.SALT;
 
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const posts = client.db("Data").collection("Posts")
const cors = require('cors')

const app = express()
const port = 3000

const reqLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 30,
	standardHeaders: true,
	legacyHeaders: false,
})

const postLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(express.json());
app.use(cors());
app.use(express.static("app/build"));
app.use("/posts", reqLimiter)
app.use("/search", reqLimiter)
app.use("/post", postLimiter)
  
app.post('/post', async (req, res) => {
	console.log(req.body)
	if(req.body.userID != undefined && req.body.content != undefined) {
		let hash = crypto.createHash('md5').update(req.body.userID + salt).digest('hex').toString()
		console.log(hash)
		await posts.insertOne({userID: hash, content:req.body.content.substr(0, 256), timestamp:Date.now()})
		.then(() => {res.status(200).send("Posted under userID:" + hash)})
		.catch((e) => {console.log(e)});
		
	} else {
		res.status(400).send("Failed request")
	}

})

app.get('/posts', async (req, res) => {
	console.log("Posts requested")
	await posts.find({}).sort({timestamp:-1}).limit(10).toArray().then((results) => res.send(results))
})

app.get(["/search", "/post", "/about", "/comments"], function (req, res) {
	console.log("Page requested")
	res.sendFile(path.join(__dirname, "app/build/index.html"), function (err) {
	  if (err) {
		res.status(500).send(err);
	  }
	});
  });

app.get('/query', async (req, res) => {
	query = decodeURIComponent(req.query.query)
	console.log("Posts searched: " + query)
	if (req.query.query != "") {
		await posts.find( {$or:[
			{"content": {$regex: query}},
			{"userID": {$regex: query}}
		]})
		.sort({timestamp:-1})
		.limit(10)
		.toArray() 
		.then((results) => res.send(results)).catch((e) => {console.log(e)})
	} else {
		res.send([{content: "Empty search", userID: "error", timestamp: Date.now}]).catch((e) => {console.log(e)});
	}
}) 

app.get('/getComments', async (req, res) => {
	query = decodeURIComponent(req.query.query)
	console.log("Posts searched: " + query)
	if (req.query.query != "") {
		await posts.find( {$or:[
			{"_id": {$regex: query}}
		]})
		.sort({timestamp:-1})
		.limit(10)
		.toArray() 
		.then((results) => res.send(results)).catch((e) => {console.log(e)})
	} else {
		res.send([{content: "Empty search", userID: "error", timestamp: Date.now}]).catch((e) => {console.log(e)});
	}
}) 

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
