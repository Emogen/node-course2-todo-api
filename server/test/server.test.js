const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
},{
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

const users = [{
	_id: new ObjectID(),
	email: 'nyan@example.com',
	password: 'nyancattttt'
},{
	_id: new ObjectID(),
	email: 'meta@example.com',
	password: 'metadatatttt'
}];

beforeEach((done) => {
	Todo.deleteMany({}).then(() => {
		Todo.insertMany(todos);
	}).then(()=>{
		User.deleteMany({}).then(() =>{
			User.insertMany(users);
		}).catch((e)=>{
			return done(e);
		});
	}).then(()=>done()).catch((e)=>done(e));
});
// beforeEach((done) => {
// 	User.deleteMany({}).then(() =>{
// 		User.insertMany(users);
// 	}).then(()=>done()).catch((e)=>done(e));

	
// });

describe('POST /todos',() => {
	it('should create a new todo',(done) => {
		var text = 'Test todo text';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err,res) => {
			if(err){
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e));
		});
	});

	it('should not create todo with invalid body data',(done) => {
		
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res) => {
			if(err){
				return done(err);
			}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e)=> done(e));
		});
	});
});

describe('GET /todos',() => {
	it('should get all todos',(done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

describe('GET /todos/:id',() => {
	it('should return todo doc',(done) => {

		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		}).end(done);
	});

	it('should return 404 if todo not found',(done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	})

	it('should return 404 for non-object ids',(done) => {
		request(app)
		.get('/todos/123')
		.expect(404)
		.end(done);
	});
});

describe('DELETE /todos/:id',()=>{
	it('should remove a todo',(done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res) => {

			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(hexId).then((todo)=>{
				expect(todo).toNotExist();
				done();
			}).catch((e)=>{
				return done(err);
			})
		});
	});

	it('should return 404 if todo not found',(done) => {
		var hexIdRandom = new ObjectID().toHexString();
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexIdRandom}`)
		.expect(404)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(hexId).then((todo)=>{
				
				expect(todo._id.toHexString()).toBe(hexId);
				done();
			}).catch((err)=>{
				done(err);
			});
		});
	});

	it('should return 404 if object id is invalid',(done)=>{
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/111111`)
		.expect(404)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.findById(hexId).then((todo)=>{
				
				expect(todo._id.toHexString()).toBe(hexId);
				done();
			}).catch((err)=>{
			 	done(err);
			});
		});
	});
});

describe("PATCH /todo/:id",()=>{
	it('should update the todo', (done)=>{
		hexId = todos[0]._id.toHexString();
		var text = "this is first test updated from patch";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			text,
			completed: true
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text);
			expect(typeof res.body.todo.completedAt).toBe('number');
			expect(res.body.todo.completed).toBe(true);
		})
		.end(done);
		//update text, set completed true
		//200
		//verify text property is changed and completed is true, and completedAt is a number
	});

	it('should clear completedAt when todo is not completed',(done)=>{
		hexId = todos[1]._id.toHexString();
		var text = "this is Second test updated from patch";

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			text,
			completed: false
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done);
		//update text set completed to false
		//200
		//text is changed, completed false, completed at is null.
	});
});

// describe("POST /users",()=>{
// 	it('should save the new user into the db',(done) => {
// 		user = {
// 			email: 'angga@test.com',
// 			password: "unittest"
// 		}

// 		request(app)
// 		.post('/users')
// 		.send(user)
// 		.expect(200)
// 		.expect((res)=>{
// 			expect(res.body.email).toBe(user.email);
// 		})
// 		.expect((res)=>{
// 			expect(res.body.password).toBe(user.password);
// 		})
// 		.end((err,res)=>{
// 			if(err){
// 				return done(err);
// 			}
// 			User.find(user).then((users) => {
// 				expect(users.length).toBe(1);
// 				expect(users[0].email).toBe(user.email);
// 				expect(users[0].password).toBe(user.password);
// 				done();
// 			}).catch((e)=>{
// 				done(e);
// 			});
// 		});
// 	});
// });
