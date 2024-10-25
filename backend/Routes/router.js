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

const { authenticateToken } = require('../middleware/authMiddleware');

// Определение маршрутов
router.post('/auth/registration', authController.registration);
router.post('/auth/login', authController.login);
router.get('/auth/checking-auth', authenticateToken, authController.check);

// Профиль
router.get('/user/profile', authenticateToken, userController.getProfileUser);
router.post('/user/profile-update', authenticateToken, userController.updateProfileUser);
router.post('/user/upload-avatar', uploadAvatar.single('avatar'), authenticateToken, userController.uploadAvatar);

router.get('/user/profile-view/:idTeacher', userController.getProfileUserToView);

router.post('/user/add-or-delete-friend', userController.addORdeleteFriend);



// Активности
router.post('/add-activity', upload.array('files'), authenticateToken, activityController.postActivity);

router.get('/view-activities', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)

//Tool
router.get('/view-tools', toolController.getTools)

//Data (Groups & Schools // Subjects & Educations & Years)
router.get('/get-groups-schools', otherController.getSchoolsAndGroups)
router.get('/get-subjects-educations-years', otherController.getSubjectsEducationsAndYears)

//Delete entity
router.post('/delete-entipy', authenticateToken, otherController.deleteEntity)
// Экспорт маршрутизатора
module.exports = router;
