// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true},(err,client) => {
	if(err){
		return console.log('Unable to connect to the MongoDB server');
	}else{

	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	//DeleteMany
	// db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// }).catch((err) => {

	// });
	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// }).catch((err) => {

	// });
	//findOneAndDelete
	db.collection('Users').findOneAndDelete({_id: new ObjectID("5bd6c932bb52b7122521af7f")}).then((result) => {
		console.log(result);
	}).catch((err) => {

	});	
	// client.close();
});