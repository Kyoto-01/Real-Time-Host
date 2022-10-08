import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user_model.js';

const saltRounds = 12;
const loginTime = "1h";

async function create(req, res) {
    const data = req.body;
    const hash = await bcrypt.hash(data.password, saltRounds);

    data.password = hash;

    let status = 201;
    let response = {};

    try {
        response = await userModel.create(data);
    } catch {
        status = 500;
    }

    res.status(status).json(response);
}

async function signin(req, res) {
    const { email, password } = req.body;

    let status = 200;
    let response = {};

    try {
        const user = await userModel.read_by_email(email);
        response = await create_user_session(user, password);
    } catch {
        status = 500;
    }

    res.status(status).json(response);
}

async function create_user_session(user, password) {
    let response;

    if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.SECRET,
                { expiresIn: loginTime }
            );
            
            response = create_signin_response({user, token});
        } else {
            response = create_signin_response({errors: ["login-password"]});
        }
    } else {
        response = create_signin_response({errors: ["login-user"]});
    }

    return response;
}

function create_signin_response({user, token, errors}) {
    let response;

    if (errors) {
        response = { errors: errors }
    } else {
        response = {
            token: token,
            username: user.name,
            email: user.email,
        }
    }

    return response;
}

export default {
    create,
    signin
};
