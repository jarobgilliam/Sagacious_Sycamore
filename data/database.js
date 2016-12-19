var Sequelize = require('sequelize');

// NOTE: create 'hrgotchi' database before running
var db = new Sequelize('hrgotchi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

//user schema
var User = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
}, {timestamps: false});

//pet schema
var Pet = db.define('Pets', {
  name: {type: Sequelize.STRING, allowNull: false, defaultValue: 'TestPet8'},
  status: {type: Sequelize.STRING, defaultValue: 'normal'},
  feed: {type: Sequelize.INTEGER, defaultValue: 500},
  health: {type: Sequelize.INTEGER, defaultValue: 500},
  love: {type: Sequelize.INTEGER, defaultValue: 500},
  experience: {type: Sequelize.INTEGER, defaultValue: 0},
  level: {type: Sequelize.INTEGER, defaultValue: 1},
  mood: {type: Sequelize.STRING, defaultValue: 'normal'},
  phys: {type: Sequelize.STRING, defaultValue: 'normal'},
  img: {type: Sequelize.STRING, defaultValue: 'http://i.imgur.com/RzBy3Vw.gif'},
  user: {type: Sequelize.STRING},
}, {timestamps: false});

//log schema
var Log = db.define('Logs', {
  name: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Pet'},
  action: {type: Sequelize.STRING, allowNull: false, defaultValue: 'Hey'},
  createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
  user: {type: Sequelize.STRING, defaultValue: 'TestUser8'},
});

// Question Schema

var Question = db.define('Questions', {
  question: {type: Sequelize.STRING, allowNull: false, unique: true},
  choice1: {type: Sequelize.STRING, allowNull: false},
  choice2: {type: Sequelize.STRING, allowNull: false},
  choice3: {type: Sequelize.STRING, allowNull: false},
  choice4: {type: Sequelize.STRING, allowNull: false},
  answer: {type: Sequelize.INTEGER, allowNull: false}
});

//creates any missing tables
//pass in {force: true} to clear tables
User.sync();
Pet.sync();
Log.sync();
Question.sync();

module.exports = {
  User: User,
  Pet: Pet,
  Log: Log,
  Question: Question,
  db: db
} 