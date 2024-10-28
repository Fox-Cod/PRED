const { Schools, Groups, Users, Activities, Subjects, Years, Educations, User_Groups, User_Schools, Activity_Files, Activity_Subjects, Activity_Educations, Activity_Years, Friends, Chat } = require('../Models/model');

async function getProfileUser(req, res) {
    const { idTeacher } = req.userToken;

    try {
        const teacher = await Users.findByPk(idTeacher, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: User_Schools,
                    as: 'user_schools',
                    include: {
                        model: Schools,
                        as: 'schools',
                        attributes: ['idSchool', 'nameSchool']
                    }
                },
                {
                    model: User_Groups,
                    as: 'user_groups',
                    include: {
                        model: Groups,
                        as: 'groups',
                        attributes: ['idGroup', 'codGroup', 'nameGroup']
                    }
                },
                {
                    model: Friends,
                    as: 'friends',
                    include: {
                        model: Users,
                        as: 'friend',
                        attributes: ['idTeacher', 'name', 'email', 'photo'] 
                    }
                },
                {
                    model: Friends,
                    as: 'friendOf',
                    include: {
                        model: Users,
                        as: 'user', 
                        attributes: ['idTeacher', 'name', 'email', 'photo']
                    }
                }
            ]
        });

        const userActivity = await Activities.findAll({
            where: { idTeacher },
            include: [
                { model: Users, as: 'users', attributes: ['name'] },

                { model: Activity_Subjects, as: 'activity_subjects', include: { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] } },

                { model: Activity_Educations, as: 'activity_educations', include: { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] } },

                { model: Activity_Years, as: 'activity_years', include: { model: Years, as: 'years', attributes: ['idYear', 'year'] } },

                { model: Activity_Files, as: 'activity_files', attributes: ['idFile', 'filePath', 'fileType', 'fileName', 'fileSize'] },
            ]
        });
        

        if (!teacher) return res.status(404).json({ Message: 'Not Found: Utilizador não encontrado' });

        const teacherData = teacher.toJSON();

        const selectedSchools = teacherData.user_schools.map(item => item.schools) || [];
        const selectedGroups = teacherData.user_groups.map(item => item.groups) || [];

        const avatarUrl = teacherData.photo ? `http://localhost:8081/${teacherData.photo}` : null;

        res.json({
            Status: 'Success',
            profile: {
                ...teacherData,
                avatarUrl,
                selectedSchools,
                selectedGroups,
            },
            activity: userActivity,
        });
    } catch (error) {
        console.error('Erro de consulta da base de dados:', error);
        return res.status(500).json({ Message: 'Erro interno do servidor' });
    }
}

async function updateProfileUser(req, res) {
    const { idTeacher } = req.userToken;
    const { name, email, selectedSchools, selectedGroups } = req.body;

    try {
        const teacher = await Users.findByPk(idTeacher);

        if (!teacher) {
            return res.status(404).json({ Message: 'Utilizador não encontrado' });
        }

        if (name) teacher.name = name;
        if (email) teacher.email = email;

        await User_Schools.destroy({ where: { idTeacher } });
        const schoolRecords = selectedSchools.map(schoolId => ({
            idTeacher: teacher.idTeacher,
            idSchool: schoolId
        }));
        await User_Schools.bulkCreate(schoolRecords);

        await User_Groups.destroy({ where: { idTeacher } });
        const groupRecords = selectedGroups.map(groupId => ({
            idTeacher: teacher.idTeacher,
            idGroup: groupId
        }));
        await User_Groups.bulkCreate(groupRecords);

        await teacher.save();

        return res.status(200).json({ success: true, Message: 'Dados do perfil atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        return res.status(500).json({ Message: 'Erro interno do servidor' });
    }
}

async function uploadAvatar(req, res) {
    const { idTeacher } = req.userToken;
    const avatar = req.file;

    try {
        const teacher = await Users.findByPk(idTeacher);

        if (!teacher) {
            return res.status(404).json({ Message: 'Utilizador não encontrado' });
        }

        if (avatar) {
            teacher.photo = avatar.path;
        }

        await teacher.save();

        return res.status(200).json({ success: true, Message: 'Avatar atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar o avatar:', error);
        return res.status(500).json({ Message: 'Erro interno do servidor' });
    }
}

async function getProfileUserToView(req, res) {
    const { idTeacher } = req.params;

    try {
        const teacher = await Users.findByPk(idTeacher, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: User_Schools,
                    as: 'user_schools',
                    include: {
                        model: Schools,
                        as: 'schools',
                        attributes: ['idSchool', 'nameSchool']
                    }
                },
                {
                    model: User_Groups,
                    as: 'user_groups',
                    include: {
                        model: Groups,
                        as: 'groups',
                        attributes: ['idGroup', 'codGroup', 'nameGroup']
                    }
                },
                {
                    model: Friends,
                    as: 'friends',
                    include: {
                        model: Users,
                        as: 'friend',
                        attributes: ['idTeacher', 'name', 'email', 'photo'] 
                    }
                },
                {
                    model: Friends,
                    as: 'friendOf',
                    include: {
                        model: Users,
                        as: 'user', 
                        attributes: ['idTeacher', 'name', 'email', 'photo']
                    }
                }
            ]
        });

        const userActivity = await Activities.findAll({
            where: { idTeacher },
            include: [
                { model: Users, as: 'users', attributes: ['name'] },

                { model: Activity_Subjects, as: 'activity_subjects', include: { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] } },

                { model: Activity_Educations, as: 'activity_educations', include: { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] } },

                { model: Activity_Years, as: 'activity_years', include: { model: Years, as: 'years', attributes: ['idYear', 'year'] } },

                { model: Activity_Files, as: 'activity_files', attributes: ['idFile', 'filePath', 'fileType', 'fileName', 'fileSize'] },
            ]
        });

        if (!teacher) return res.status(404).json({ Message: `O utilizador com o ID ${idTeacher} não foi encontrado ou não existe. 
            É possível que tenha sido eliminado ou que os seus dados ainda não tenham sido inseridos no sistema. 
            Por favor, verifique a correção do ID inserido ou entre em contacto com a administração.` });

        const teacherData = teacher.toJSON();

        const selectedSchools = teacherData.user_schools.map(item => item.schools) || [];
        const selectedGroups = teacherData.user_groups.map(item => item.groups) || [];

        const avatarUrl = teacherData.photo ? `http://localhost:8081/${teacherData.photo}` : null;
          
        res.json({
            Status: 'Success',
            profile: {
                ...teacherData,
                avatarUrl,
                selectedSchools,
                selectedGroups,
            },
            activity: userActivity,
        });
    } catch (error) {
        console.error('Erro de consulta da base de dados:', error);
        return res.status(500).json({ Message: 'Erro interno do servidor' });
    }
}

async function addORdeleteFriend(req, res) {
    const { idTeacher, idFriend } = req.body;

    if (!idTeacher || !idFriend) {
        return res.status(400).json({ message: 'A ID de utilizador e a ID de amigo são obrigatórias.' });
    }

    try {
        const existingFriendship = await Friends.findOne({
            where: {
                idTeacher: idTeacher,
                idFriend: idFriend
            }
        });

        if (existingFriendship) {
            await existingFriendship.destroy();
            return res.status(200).json({ message: 'Amigo removido da lista de amigos.' });
        } else {
            const newFriendship = await Friends.create({
                idTeacher: idTeacher,
                idFriend: idFriend
            });
            return res.status(201).json({ success: true, message: 'Foi adicionado um amigo!', friendship: newFriendship });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
}



module.exports = { getProfileUser, updateProfileUser, uploadAvatar, getProfileUserToView, addORdeleteFriend };
