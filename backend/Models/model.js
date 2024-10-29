const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../bd');

const Educations = sequelize.define('Educations', {
  idEducation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameEducation: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'educations', timestamps: false });

const Groups = sequelize.define('Groups', {
  idGroup: { type: DataTypes.INTEGER, primaryKey: true },
  codGroup: DataTypes.INTEGER,
  nameGroup: DataTypes.STRING,
}, { tableName: 'groups', timestamps: false });

const Schools = sequelize.define('Schools', {
  idSchool: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSchool: DataTypes.STRING,
}, { tableName: 'schools', timestamps: false });

const Subjects = sequelize.define('Subjects', {
  idSubject: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSubject: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'subjects', timestamps: false });

const Years = sequelize.define('Years', {
  idYear: { type: DataTypes.INTEGER, primaryKey: true },
  year: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'years', timestamps: false });

const Users = sequelize.define('Users', {
  idTeacher: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING(30),
  email: DataTypes.STRING(255),
  password: DataTypes.STRING(500),
  createDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  role: { type: DataTypes.STRING, defaultValue: 'utilizador' },
  resetToken: DataTypes.STRING,
  photo: DataTypes.STRING,
}, { tableName: 'users', timestamps: false });


const Activities = sequelize.define('Activities', {
  idActivity: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTeacher: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
  planning: DataTypes.STRING,
  presentation: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  // idSubject: { type: DataTypes.INTEGER, references: { model: Subjects, key: 'idSubject' } },
  // idYear: { type: DataTypes.INTEGER, references: { model: Years, key: 'idYear' } },
  // idEducation: { type: DataTypes.INTEGER, references: { model: Educations, key: 'idEducation' } },
}, { tableName: 'activities', timestamps: false });

// Определение модели ActivityFiles (Файлы деятельности)
const Activity_Files = sequelize.define('Activity_Files', {
  idFile: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idActivity: { 
    type: DataTypes.INTEGER, 
    references: { 
      model: Activities, 
      key: 'idActivity' 
    }, 
    allowNull: false 
  },
  filePath: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.INTEGER },
  fileName: { type: DataTypes.STRING },
}, { tableName: 'activity_files', timestamps: false });

const Tools = sequelize.define('Tools', {
  idTool: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  link: DataTypes.STRING(255),
  about: DataTypes.TEXT,
  application: DataTypes.STRING(255),
  type: DataTypes.STRING(255),
  state: DataTypes.STRING(255),
}, { tableName: 'tools', timestamps: false });

const User_Groups = sequelize.define('User_Groups', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeacher: DataTypes.INTEGER,
  idGroup: DataTypes.INTEGER
}, { tableName: 'user_groups', timestamps: false });

const User_Schools = sequelize.define('User_Schools', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeacher: DataTypes.INTEGER,
  idSchool: DataTypes.INTEGER
}, { tableName: 'user_schools', timestamps: false });

const Activity_Subjects = sequelize.define('Activity_Subjects', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idActivity: DataTypes.INTEGER,
  idSubject: DataTypes.INTEGER
}, { tableName: 'activity_subjects', timestamps: false });

const Activity_Educations = sequelize.define('Activity_Educations', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idActivity: DataTypes.INTEGER,
  idEducation: DataTypes.INTEGER
}, { tableName: 'activity_educations', timestamps: false });

const Activity_Years = sequelize.define('Activity_Years', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idActivity: DataTypes.INTEGER,
  idYear: DataTypes.INTEGER
}, { tableName: 'activity_years', timestamps: false });

const Friends = sequelize.define('Friends', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTeacher: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
  idFriend: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
}, { tableName: 'friends', timestamps: false });

const Chats = sequelize.define('Chats', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idParticipantOne: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' }, allowNull: false },
  idParticipantTwo: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' }, allowNull: false },
  lastMessage: { type: DataTypes.TEXT },
  lastMessageTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  chatToken: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'chats', timestamps: false });

const Messages = sequelize.define('Messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idChat: { type: DataTypes.INTEGER,references: { model: Chats, key: 'id' },allowNull: false },
  idSender: { type: DataTypes.INTEGER,references: { model: Users, key: 'idTeacher' } },
  idReceiver: { type: DataTypes.INTEGER,references: { model: Users, key: 'idTeacher' } },
  message: { type: DataTypes.TEXT, allowNull: false }, 
  timeStamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'messages', timestamps: false });

Users.hasMany(User_Groups, { foreignKey: 'idTeacher', as: 'user_groups' });
Users.hasMany(User_Schools, { foreignKey: 'idTeacher', as: 'user_schools' });

Users.hasMany(Friends, { foreignKey: 'idTeacher', sourceKey: 'idTeacher', as: 'friends' });
Users.hasMany(Friends, { foreignKey: 'idFriend', sourceKey: 'idTeacher', as: 'friendOf' });

Users.hasMany(Messages, { foreignKey: 'idSender', as: 'sentMessages' });
Users.hasMany(Messages, { foreignKey: 'idReceiver', as: 'receivedMessages' });
Users.hasMany(Chats, { foreignKey: 'idParticipantOne', as: 'startedChats' });
Users.hasMany(Chats, { foreignKey: 'idParticipantTwo', as: 'receivedChats' });

Chats.belongsTo(Users, { foreignKey: 'idParticipantOne', as: 'participantOne' });
Chats.belongsTo(Users, { foreignKey: 'idParticipantTwo', as: 'participantTwo' });
Chats.hasMany(Messages, { foreignKey: 'idChat', as: 'messages' });

Messages.belongsTo(Users, { foreignKey: 'idSender', as: 'sender' });
Messages.belongsTo(Users, { foreignKey: 'idReceiver', as: 'receiver' });
Messages.belongsTo(Chats, { foreignKey: 'idChat', as: 'chat' });

Friends.belongsTo(Users, { foreignKey: 'idTeacher', as: 'user' });
Friends.belongsTo(Users, { foreignKey: 'idFriend', as: 'friend' });

User_Groups.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });
User_Groups.belongsTo(Groups, { foreignKey: 'idGroup', as: 'groups' });

User_Schools.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });
User_Schools.belongsTo(Schools, { foreignKey: 'idSchool', as: 'schools' });

Schools.hasMany(User_Schools, { foreignKey: 'idSchool', sourceKey: 'idSchool', as: 'user_schools' });
Groups.hasMany(User_Groups, { foreignKey: 'idGroup', sourceKey: 'idGroup', as: 'user_groups' });

Activities.hasMany(Activity_Files, { foreignKey: 'idActivity', as: 'activity_files' });
Activities.hasMany(Activity_Subjects, { foreignKey: 'idActivity', as: 'activity_subjects' });
Activities.hasMany(Activity_Educations, { foreignKey: 'idActivity', as: 'activity_educations' });
Activities.hasMany(Activity_Years, { foreignKey: 'idActivity', as: 'activity_years' });
Activities.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

Activity_Subjects.belongsTo(Activities, { foreignKey: 'idActivity', as: 'activities' });
Activity_Subjects.belongsTo(Subjects, { foreignKey: 'idSubject', as: 'subjects' });

Activity_Educations.belongsTo(Activities, { foreignKey: 'idActivity', as: 'activities' });
Activity_Educations.belongsTo(Educations, { foreignKey: 'idEducation', as: 'educations' });

Activity_Years.belongsTo(Activities, { foreignKey: 'idActivity', as: 'activities' });
Activity_Years.belongsTo(Years, { foreignKey: 'idYear', as: 'years' });

// Subjects.hasMany(Activity_Subjects, { foreignKey: 'idSubject', as: 'subjects' });

// Educations.hasMany(Activity_Educations, { foreignKey: 'idEducation', as: 'educations' });

// Years.hasMany(Activity_Years, { foreignKey: 'idYear', as: 'years' });

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All tables were created successfully.');
  } catch (error) {
    console.error('Error occurred while creating tables:', error);
  }
})();

module.exports = {
  Educations,
  Subjects,
  Groups,
  User_Schools,
  User_Groups,
  Schools,
  Users,
  Tools,
  Chats,
  Messages,
  Activities,
  Activity_Files,
  Activity_Subjects,
  Activity_Educations,
  Activity_Years,
  Years,
  Friends,
};
