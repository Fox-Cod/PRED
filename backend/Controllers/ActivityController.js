const { Users, Activities, Subjects, Years, Educations, Activity_Files, Activity_Subjects, Activity_Educations, Activity_Years, Activity_Commentary } = require('../Models/model');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');

async function getAllActivity(req, res) {
  try {
    const allActivity = await Activities.findAll({
      include: [
        { model: Activity_Subjects, as: 'activity_subjects', include: { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] } },

        { model: Activity_Educations, as: 'activity_educations', include: { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] } },

        { model: Activity_Years, as: 'activity_years', include: { model: Years, as: 'years', attributes: ['idYear', 'year'] } },

        { model: Activity_Files, as: 'activity_files', attributes: ['idFile', 'filePath', 'fileType', 'fileName', 'fileSize'] },

        { model: Users, as: 'users', attributes: ['idTeacher', 'name', 'photo'] }
      ]
    });
    if (!allActivity) { return res.status(404).json({ Message: "Nenhuma atividade detectada" }) }

    res.json(allActivity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: 'Erro interno do servidor' });
  }
}

async function getOneActivity(req, res) {
  const activityId = req.params.activityId;

  try {
    const activity = await Activities.findOne({
      where: { idActivity: activityId },
      include: [
        { model: Activity_Subjects, as: 'activity_subjects', include: { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] } },

        { model: Activity_Educations, as: 'activity_educations', include: { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] } },

        { model: Activity_Years, as: 'activity_years', include: { model: Years, as: 'years', attributes: ['idYear', 'year'] } },

        { model: Activity_Files, as: 'activity_files', attributes: ['idFile', 'filePath', 'fileType', 'fileName', 'fileSize'] },

        { model: Activity_Commentary, as: 'activity_commentaries', include: { model: Users, as: 'user',attributes: ['idTeacher', 'name', 'photo'] }, attributes: ['id', 'message', 'publishDate'] },

        { model: Users, as: 'users', attributes: ['idTeacher', 'name', 'photo'] }
      ]
    });


    if (!activity) { return res.status(404).json({ error: 'Nenhuma atividade encontrada' }) }
    res.json(activity);
  } catch (error) {
    console.error('Erro ao receber atividade:', error);
    return res.status(500).send('Erro interno do servidor');
  }
}

async function postActivity(req, res) {
  const { idTeacher } = req.userToken;
  const { title, description, planning, presentation, selectedSubjects, selectedEducations, selectedYears, selectedGroups, selectedSchools } = req.body;
  const selectedFiles = req.files;

  let errors = {};

  try {
    const subjectsArray = typeof selectedSubjects === 'string' ? JSON.parse(selectedSubjects) : selectedSubjects;
    const educationsArray = typeof selectedEducations === 'string' ? JSON.parse(selectedEducations) : selectedEducations;
    const yearsArray = typeof selectedYears === 'string' ? JSON.parse(selectedYears) : selectedYears;

    if (!title) {
      errors.title = "O campo 'Title' é obrigatório";
    }
    if (!description) {
      errors.description = "O campo 'Descrição' é obrigatório.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }


    const newActivity = await Activities.create({
      idTeacher: idTeacher,
      title: title,
      description: description,
      planning: planning || null,
      presentation: presentation || null
    });

    const subjectsRecords = subjectsArray.map(SubjectId => ({
      idActivity: newActivity.idActivity,
      idSubject: SubjectId
    }));

    await Activity_Subjects.bulkCreate(subjectsRecords);

    const educationsRecords = educationsArray.map(EducationId => ({
      idActivity: newActivity.idActivity,
      idEducation: EducationId
    }));

    await Activity_Educations.bulkCreate(educationsRecords);

    const yearsRecords = yearsArray.map(YearId => ({
      idActivity: newActivity.idActivity,
      idYear: YearId
    }));

    await Activity_Years.bulkCreate(yearsRecords);

    const filesRecords = [];

    if (selectedFiles && selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        const { originalname, size } = file;
        const safeFileName = encodeURIComponent(originalname);
      
        const fileType = mimeTypes.lookup(path.extname(originalname));

        filesRecords.push({
          idActivity: newActivity.idActivity,
          filePath: file.path,
          fileType: fileType,
          fileName: safeFileName,
          fileSize: size
        });
      }
    }
    await Activity_Files.bulkCreate(filesRecords);


    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
}

async function postCommentary(req, res) {
  const { idTeacher } = req.userToken;
  const { idActivity, message } = req.body;

  const errors = {};
  if (!idActivity) errors.idActivity = "O campo 'idActivity' é obrigatório.";
  if (!message || !message) errors.message = "O campo 'message' é obrigatório.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    const newCommentary = await Activity_Commentary.create({
      idTeacher,
      idActivity,
      message: message,
    });

    return res.json({
      success: true,
      data: {
        id: newCommentary.id,
        idTeacher: newCommentary.idTeacher,
        idActivity: newCommentary.idActivity,
        message: newCommentary.message,
        publishDate: newCommentary.publishDate,
      },
      newCommentary,
      message: 'Comentário adicionado com sucesso.',
    });

  } catch (error) {
    console.error('Erro ao adicionar um comentário:', error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map(e => e.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
}


module.exports = { getAllActivity, getOneActivity, postActivity, postCommentary };
