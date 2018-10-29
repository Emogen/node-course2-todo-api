// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true},(err,client) => {
	if(err){
		return console.log('Unable to connect to the MongoDB server');
	}else{

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5bd6caa74dce650f764e395b')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs,undefined,2));
	// }).catch((e) => {
	// 	console.log('Unable to fetch the data', e);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos Count: ${count}`);

	// }).catch((e) => {
	// 	console.log('Unable to fetch the data', e);
	// });


	db.collection('Users').find({name: 'Singgih'}).toArray().then((docs) => {
		console.log(`User Dog: ${docs}`);

	}).catch((e) => {
		console.log('Unable to fetch the data', e);
	});
	// client.close();
});