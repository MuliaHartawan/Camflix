
const { casts } = require('../../routes/handler/cast');
const Cast = require('../../models/cast');

const {
    PORT,
} = process.env

jest.mock('../../models', () => ({
    Cast: {
        findAll : jest.fn(() => {
            const casts = [{
                "id": 1,
                "name": "Angeli Khang",
                "avatar": null,
                "birthday" : Date.now(),
                "deadday" : 5,
                "movies" : [{
                    "id": 1,
                    "name": "Harry Porter",
                    "poster": null,
                    "status" : 'ongoing',
                    "rating" : 5,
                }]
            },
            {
                "id": 2,
                "name": "Kana Morisawa",
                "avatar": null,
                "birthday" : Date.now(),
                "deadday" : "",
                "movies" : [{
                    "id": 2,
                    "name": "Laskar Pelangi",
                    "poster": null,
                    "status" : 'ongoing',
                    "rating" : 5,
                }]
            }];
    
            return casts;
        }), 
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Get Data Casts', () => {

    it('success get data casts', async () => {
        const request = {
            query: {
                search : ""
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await casts(request, response);
        expect(result.status).toEqual("success");
    });
});