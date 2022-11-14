require("dotenv").config();
const { login, user } = require('../../routes/handler/users');
const User = require('../../models/users');


jest.mock('../../models', () => ({
    User: {
        findOne: jest.fn((params) => {

            const bcrypt = require('bcrypt');
            
            const users = [{
                "id": 1,
                "name": "admin",
                "email": "admin@gmail.com",
                "avatar": null,
                "password" : bcrypt.hashSync("12345678", 3),
                "created_at" : new Date(),
                "updated_at" : new Date(),
            }];
            const user = users.find((it) => (
                it.email === params.where.email
            ));
            return user;
        })
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Auth Login', () => {
    it('error validate form is required', async () => {
        
        const request = {
            body: {
              email: 'fake_email',
              password: 'fake_password',
            },
        };

        const result = await login(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(result.status).toEqual("error")
    });

    it('error user not found', async () => {
        const request = {
            body: {
              email: 'notfound@gmail.com',
              password: 'password',
            },
        };
        const result = await login(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });

    it('error credentials invalid username or password', async () => {
        const request = {
            body: {
              email: 'notfound@gmail.com',
              password: 'password',
            },
        };
        const result = await login(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });

    it('success you are logged', async () => {
        const request = {
            body: {
              email: 'admin@gmail.com',
              password: '12345678',
            },
        };
        const result = await login(request, response);
        expect(result.status).toEqual("success");
    });
});