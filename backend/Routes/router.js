const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'Files/');
  },
  filename: function (req, files, cb) {
    cb(null, files.fieldname + '-' + Date.now() + path.extname(files.originalname));
  }
});

const upload = multer({
  storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/Avatar/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadAvatar = multer({
  storage: avatarStorage,
//   limits: { fileSize: 2 * 1024 * 1024 }
});

// Импорт контроллеров
const authController = require('../controllers/AuthController');
const userController = require('../Controllers/UserController');
const activityController = require('../Controllers/ActivityController');
const toolController = require('../Controllers/ToolController');
const otherController = require('../Controllers/OtherController');
const chatController = require('../Controllers/ChatController');

const { authenticateToken } = require('../middleware/authMiddleware');

// Auth
router.post('/auth/registration', authController.registration);
router.post('/auth/login', authController.login);
router.get('/auth/checking-auth', authenticateToken, authController.check);

// Profile
router.get('/user/profile', authenticateToken, userController.getProfileUser);
router.post('/user/profile-update', authenticateToken, userController.updateProfileUser);
router.post('/user/upload-avatar', uploadAvatar.single('avatar'), authenticateToken, userController.uploadAvatar);

router.get('/user/profile-view/:idTeacher', userController.getProfileUserToView);
router.post('/user/add-or-delete-friend', userController.addORdeleteFriend);

// Chat
router.get('/chat/chats', authenticateToken, chatController.getUserChats);

router.post('/chat/create', authenticateToken, chatController.createChat);

router.post('/chat/:chatToken/message', authenticateToken, chatController.sendMessage);

router.get('/chat/:chatToken', authenticateToken, chatController.getMessages);

// Activity
router.post('/add-activity', upload.array('files'), authenticateToken, activityController.postActivity);

router.post('/add-commentary', authenticateToken, activityController.postCommentary);

router.get('/view-activities', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)

// Tool
router.get('/view-tools', toolController.getTools)

//Data (Groups & Schools // Subjects & Educations & Years)
router.get('/get-groups-schools', otherController.getSchoolsAndGroups)
router.get('/get-subjects-educations-years', otherController.getSubjectsEducationsAndYears)

//Delete entity
router.post('/delete-entipy', authenticateToken, otherController.deleteEntity)

module.exports = router;
