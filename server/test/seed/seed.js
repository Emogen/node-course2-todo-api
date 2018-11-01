const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	_creator: userOneId
},{
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333,
	_creator: userTwoId
}];

const populateTodos = (done) => {
	Todo.deleteMany({}).then(() => {
		Todo.insertMany(todos);
	}).then(()=>done()).catch((e)=>done(e));
}

const users = [{
	_id: userOneId,
	email: 'nyan@example.com',
	password: 'nyancattttt',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id:userOneId, access: 'auth'},'abc123').toString()
	}]
},{
	_id: userTwoId,
	email: 'meta@example.com',
	password: 'metadatatttt',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id:userTwoId, access: 'auth'},'abc123').toString()
	}]
}];

const populateUsers = (done) => {
	User.deleteMany({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne,userTwo]).then(() =>{
			done();
		});
	});
}

module.exports = {populateTodos,todos,users,populateUsers}

