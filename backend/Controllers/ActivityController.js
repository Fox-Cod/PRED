const { Users, Activities, Subjects, Years, Educations, Activity_Files, Activity_Subjects, Activity_Educations, Activity_Years } = require('../Models/model');
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
      planning: planning,
      presentation: presentation
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
        const uploadPath = path.resolve(__dirname, `../Files/${safeFileName}`);

        const fileType = mimeTypes.lookup(path.extname(originalname));

        filesRecords.push({
          idActivity: newActivity.idActivity,
          filePath: uploadPath,
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

module.exports = { getAllActivity, getOneActivity, postActivity };
