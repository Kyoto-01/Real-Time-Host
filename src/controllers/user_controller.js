import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.js';


const saltRounds = 12;
const loginTime = 3600; //em segundos


async function create(req, res) {
    const data = req.body;
    const hash = await bcrypt.hash(data.password, saltRounds);

    data.password = hash;

    let response = {};

    try {
        response = await userModel.create(data);
    } catch {
        response.errors = true;
    }

    res.status(201).json(response);
}

async function signin(req, res) {
    const { email, password } = req.body;

    const response = {
        auth: null,
        token: null,
        username: null,
        email: null,
        errors: null
    };

    const user = await userModel.read_by_email(email);

    if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.SECRET,
                { expiresIn: loginTime }
            );

            response.auth = true;
            response.token = token;
            response.username = user.name;
            response.email = user.email;
        } else {
            response.auth = false;
            response.errors = 'password';
        }
    } else {
        response.auth = false;
        response.errors = 'user';
    }

    res.json(response);
}


export default {
    create,
    signin
};
