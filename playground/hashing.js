const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err,salt) => {
	bcrypt.hash(password,salt,(err, hash)=>{
		// console.log(hash);
	});
});


var hashedPassword = '$2a$10$s8bUcqlVbQyqYUDf7NIiueT4jFbnchTa0qbTAZ.IwEMZ7B9hLWlvC';

bcrypt.compare(password,hashedPassword,(err,res) =>{
	console.log(res);
});
// var data = {
// 	id: 10
// };

// var token = jwt.sign(data,'123abc');

// var decoded = jwt.verify(token,'123abc');

// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// var data = {
// 	id: 4
// };


// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHas = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHas === token.hash){
// 	console.log('data was not change');
// }else{
// 	console.log('data was changed. Do Not trust');
// }

