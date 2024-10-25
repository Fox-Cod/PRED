const { Schools, Groups, Subjects, Educations, Years, Users, Activities, Activity_Files, Activity_Subjects, Activity_Educations, Activity_Years } = require('../Models/model');

async function getSchoolsAndGroups(req, res) {
    try {
        const schools = await Schools.findAll({
            attributes: ['idSchool', 'nameSchool']
        });

        const groups = await Groups.findAll({
            attributes: ['idGroup', 'codGroup', 'nameGroup']
        });

        res.json({
            schools,
            groups
        });
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function getSubjectsEducationsAndYears(req, res) {
    try {
        const subjects = await Subjects.findAll({
            attributes: ['idSubject', 'nameSubject']
        });

        const educations = await Educations.findAll({
            attributes: ['idEducation', 'nameEducation']
        });

        const years = await Years.findAll({
            attributes: ['idYear', 'year']
        });

        res.json({
            subjects,
            educations,
            years
        });
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function deleteEntity(req, res) {
    try {
        const { entityType, entityId } = req.body;
        if (!entityType || !entityId) {
            return res.status(400).json({
                success: false,
                message: "Необходимо указать тип и идентификатор сущности"
            });
        }

        let model;
        switch (entityType) {
            case 'profile':
                model = Users;
                break;
            case 'activity':
                model = Activities;
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: "Неподдерживаемый тип сущности"
                });
        }

        if (entityType === 'activity') {
            await Promise.all([
                Activity_Files.destroy({ where: { idActivity: entityId } }),
                Activity_Subjects.destroy({ where: { idActivity: entityId } }),
                Activity_Educations.destroy({ where: { idActivity: entityId } }),
                Activity_Years.destroy({ where: { idActivity: entityId } }),
            ]);
        }

        const deletedEntity = await model.destroy({
            where: { idActivity: entityId }
        });

        if (!deletedEntity) {
            return res.status(404).json({
                success: false,
                message: "Сущность не найдена"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Сущность ${entityType} с ID ${entityId} успешно удалена`
        });
    } catch (error) {
        console.error('Ошибка при удалении сущности:', error);
        return res.status(500).json({
            success: false,
            message: 'Ошибка сервера',
            details: error.message
        });
    }
}


module.exports = { getSchoolsAndGroups, getSubjectsEducationsAndYears, deleteEntity };
