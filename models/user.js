
//Handles database interaction for users.
var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');

var db         = mongoose.connection;

var userSchema = mongoose.Schema({
  // TODO: Allow login with Facebook/etc.
  local      : {
    username : { type: String,
                 unique: true  },
    password : { type : String }
  }
});

var User = mongoose.model('user', userSchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, function(err, client){
  if(err) console.log('Error: Can\'t connect to database: ',err);
})
/*
mongoose.connect(require('./config/database.js'),{ useNewUrlParser: true}, function(err, client) {
   // Perform actions on the collection object
   if(err) {
     console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }

   const collection = db.collection("users");

   // Perform actions on the collection object
   db.collection("inventory").insertMany([
     // MongoDB adds the _id field with an ObjectId if _id is not present
     { username: "testuser1", password: "testpass1" },
     { username: "testuser2", password: "testpass2" }
  ])
  .then(function(result) {
  // Process result
  })
});
*/

//adduser("Eva","kk2");

//querring
User.find({}).exec(function(err, docs){
  if(err) throw err;
  console.log(docs);
});

// ========
// METHODS
// ========

/**
 * Generate hash for password.
 *
 * @param {String} password
 */
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Check if password valid.
 *                            //q should you hash password?
 * @param {String} password
 */
userSchema.method.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};

/**
 * Retrieves user from database using user ID to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 */

 /*
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};
*/

/**
 * Retrieves user from database using user ID to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 */

 /*
userSchema.method.getUserByName = (_name, callback) => {
  User.find({username : _name}, (err, user) => {
    if(err) callback(err, null);
    else callback(null, users[0]);
    });
  };
*/

function adduser(_name, _password) {
  var temp_user = new User({local : {username : _name, password : _password}});
  temp_user.save( err => {
    if(err) console.log("error: user not saved")
  });
}

module.exports = mongoose.model('User', userSchema);
