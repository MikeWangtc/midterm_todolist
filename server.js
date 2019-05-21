// import express from 'express';
// import mongoose from 'mongoose';
// import UserDB from './src/models/user';
// import bodyParser from 'body-parser';
// import cors from 'cors';

const express = require('express');
const mongoose = require('mongoose');
const UserDB = require('./src/models/user');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create server to serve index.html
const app = express();
const PORT = process.env.PORT || 3000;
const users = express.Router();

// users.use(cors());
app.use(cors());
// Routing : 將 public routes 到根目錄
app.use(express.static('public'));
// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json()); 
//Parses the text as URL encoded data and exposes the resulting object on req.body.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname, 'public/index.html');
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

// Connect to mongo
mongoose.connect('mongodb+srv://Mike:12345@cluster0-snwtj.mongodb.net/test?retryWrites=true', {	
    useNewUrlParser: true
})
const db = mongoose.connection;
db.on('error', error => {
	console.log('Failed to connect MongoDB')
    console.error(error);
})
db.once('open', () => {
	console.log('MongoDB connected!');

	app.post('/login', (req, res) => {
		const usrInfo = req.body;
		console.log('start to login / signup');

		UserDB.findOne({email: usrInfo.email})
		.exec((err, info) => {
			let tmpUsr = info;
			if(!info){
				tmpUsr = new UserDB(usrInfo);
				tmpUsr.save(err => {
					if(err) console.log('failed', err);
					else console.log('successfully create');
				})
				console.log(`Login: [${tmpUsr.userName}]-${tmpUsr.email}`);
				res.send({ state: 'success', message: `Login: [${tmpUsr.userName}]-${tmpUsr.email}` });
			}
			else{
				if(tmpUsr.userName !== usrInfo.userName){
					console.log(`The email has been registered with user name:  ${info.userName}`);
					res.send({
						state: 'failed',
						message:`The email has been registered with user name:  ${info.userName}`
					});
				}
				else{
					console.log(`Login: [${tmpUsr.userName}]-${tmpUsr.email}`);
					res.send({ state: 'success', message: `Login:[${tmpUsr.userName}]-${tmpUsr.email}` });
				}
			}	
		})
	});
	app.post('/todolist/form', (req, res) => {
		console.log('start to send task to the tasks');
		const { email } = req.body;
		const task = req.body;
		delete task['email'];
		console.log('task',task);

		// Use MongoDB api(array update operator) 
		UserDB.findOneAndUpdate(
			{ email: email },
			{ $push:{ tasks:task } },
			((err, doc) => {
				if(err) console.log('failed to add a task: ', err);
				else console.log('successful to update DB')
			})
		);
	});
	app.post('/todolist', (req, res) => {
		console.log('start to load user tasks from db to client-side');
		const { email } = req.body;

		UserDB.findOne({ email: email })
		.exec((err, userData) => {
			if(err){
				console.log('failed to load user tasks');
				console.log(err);
				res.send({ message: 'failed to load user tasks' })
			}
			else{
				console.log('successfully loaded th user tasks');
				res.send(userData.tasks);
			}
		});
	});
	app.post('/logout', (req, res) => {
		console.log('start to modify tasks');
		const { email, discardedItems, revisedItems } = req.body;

		discardedItems.map(id => {
			UserDB.update(
				{ email: email },
				{ $pull: { tasks: { id: id } } },
				((err, doc) => {
					if(err) console.log('failed to delete tasks from DB');
					else console.log('successful to update DB');
				})
			);
		});
		revisedItems.map(task => {
			console.log(task);
			for(let key in task){
				const pair = { [`tasks.$.${key}`]: task[key] };
				console.log(pair);
				UserDB.updateOne(
					{ email: email, 'tasks.id': task.id },
					{ $set: pair},
					((err, doc) => {
						if(err) console.log('failed to update tasks from DB');
						else console.log('successful to update DB');
					})
				);
			}
		});
	})
})

