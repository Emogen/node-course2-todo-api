const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bd807cfa2684b0fdf515d101';

if(!ObjectID.isValid(id)){
	return console.log('ID is not valid');
}
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos',todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	if(!todo){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo ',todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo ',todo);
// }).catch((e)=> console.log(e));

