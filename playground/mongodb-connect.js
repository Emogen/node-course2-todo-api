// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true},(err,client) => {
	if(err){
		return console.log('Unable to connect to the MongoDB server');
	}else{

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something todo',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert todo',err);
	// 	}

	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// });

	//Insert new doc into Users (name, age, location)

	// db.collection('Users').insertOne({
	// 	name : 'Singgih',
	// 	age : 25,
	// 	location : {
	// 		lat: -7.973244,
	// 		lng: 112.637580
	// 	}
	// },(err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert User',err);
	// 	}
	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	// });

	client.close();
});