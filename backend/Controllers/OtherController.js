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
                message: "É necessário especificar o tipo e o identificador da entidade"
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
                    message: "Tipo de entidade não suportado"
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
                message: "Entidade não encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Entidade ${entityType} com ID ${entityId} eliminado com êxito`
        });
    } catch (error) {
        console.error('Error when deleting an entity:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro do servidor',
            details: error.message
        });
    }
}


module.exports = { getSchoolsAndGroups, getSubjectsEducationsAndYears, deleteEntity };
