// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true},(err,client) => {
	if(err){
		return console.log('Unable to connect to the MongoDB server');
	}else{

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').findOneAndUpdate(
	// 	{
	// 		_id : new ObjectID('5bd6d3294dce650f764e3bc5')
	// 	},
	// {
	// 	$set : {
	// 		completed : true
	// 	}
	// },{
	// 	returnOriginal : false
	// }).then((docs) => {
	// 	console.log(docs);
	// }).catch((err) => {

	// });

	db.collection('Users').findOneAndUpdate(
		{
			_id : new ObjectID('5bd6c03274a6ff10e88229aa')
		},
	{
		$set : {
			name : "Anggana"
		},
		$inc : {
			age: 1
		}
	},{
		returnOriginal : false
	}).then((docs) => {
		console.log(docs);
	}).catch((err) => {

	});

	// client.close();
});