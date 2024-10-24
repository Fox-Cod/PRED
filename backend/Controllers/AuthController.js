const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { Users, User_Groups, User_Schools } = require('../Models/model')
const { Sequelize } = require('sequelize');
const client = new OAuth2Client('41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

const generateJwt = (idTeacher, role) => {
    return jwt.sign(
        { idTeacher, role },
        jwtSecretKey,
        { expiresIn: '72h' }
    )
}

// async function authGoogle(req, res) {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: '41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com',
//     });
//     const payload = ticket.getPayload();
//     const { name, email } = payload;

//     const user = await Users.findOne({ where: { email: email } });
//     if (!user) {
//       user = await Users.create({ name, email, role: 'utilizador' });
//     }

//     const jwtToken = generateJwt(user.idTeacher, user.role);
//     res.cookie('token', jwtToken, { httpOnly: true });

//     res.json({ status: 'Success', userId: user.idTeacher, role: user.role });
//   } catch (error) {
//     console.error('Ошибка аутентификации через Google:', error);
//     res.status(500).json({ message: 'Ошибка аутентификации через Google' });
//   }
// };


async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ Message: 'Email e palavra-passe necessários' });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ Message: 'Correio eletrónico errado ou não existe' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ Message: 'Palavra-passe errada' });
        }

        const token = generateJwt(user.idTeacher, user.role);
        res.cookie('token', token, { httpOnly: true });

        return res.json({ Message: 'Autorização bem sucedida', Status: 'Success', idTeacher: user.idTeacher, role: user.role });
    } catch (error) {
        console.error('Erro de consulta da base de dados:', error);
        return res.status(500).json({ Message: 'Erro interno do servidor' });
    }
}


async function registration(req, res) {
    try {
        const { nome, email, password, confirmPassword, selectedGroups, selectedSchools } = req.body;
        const errors = {};

        if (!nome) {
            errors.nome = "O campo 'Nome' é obrigatório.";
        }
        if (!email) {
            errors.email = "O campo 'Email' é obrigatório.";
        }
        if (!password) {
            errors.password = "As palavras-passe não são iguais..";
        }
        if (!Array.isArray(selectedGroups) || selectedGroups.length === 0) {
            errors.selectedGroups = "É necessário selecionar pelo menos um grupo.";
        }
        if (!Array.isArray(selectedSchools) || selectedSchools.length === 0) {
            errors.selectedSchools = "É necessário selecionar pelo menos uma escola.";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            name: nome,
            email: email,
            password: hashedPassword,
            role: 'utilizador'
        });

        const groupRecords = selectedGroups.map(groupId => ({
            idTeacher: newUser.idTeacher,
            idGroup: groupId
        }));
        await User_Groups.bulkCreate(groupRecords);

        const schoolRecords = selectedSchools.map(schoolId => ({
            idTeacher: newUser.idTeacher,
            idSchool: schoolId
        }));
        await User_Schools.bulkCreate(schoolRecords);

        return res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.error('Erro no registro:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Erro no servidor', 
            details: error.message 
        });
    }
}





async function tokenValidation(req, res) {
    try {
        const token = req.params.token;
        const user = await Users.findOne({ where: { resetToken: token } });
        if (!user) { return res.status(400).json({ message: 'A ligação de reposição da palavra-passe é inválida ou expirou' }); }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ocorreu um erro ao repor a palavra-passe' });
    }
};


async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        const { password, confPassword } = req.body;
        console.log(password, confPassword)
        if (password !== confPassword) { return res.status(400).json({ message: 'As palavras-passe não coincidem' }); }
        const user = await Users.findOne({ where: { resetToken: token } });
        if (!user) { return res.status(400).json({ message: 'Utilizador não encontrado' }); }
        res.clearCookie('token');
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();
        res.status(201).json({ success: true });
    } catch (err) {
        console.error('Ocorreu um erro ao repor a palavra-passe:', err);
        res.status(500).json({ message: 'Ocorreu um erro ao repor a palavra-passe' });
    }
};

async function check(req, res, next) {
    if (!req.userToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json({ success: true, token: req.userToken });
}

module.exports = { login, registration, tokenValidation, resetPassword, check };
