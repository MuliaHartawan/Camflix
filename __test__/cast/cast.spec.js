
const { cast } = require('../../routes/handler/cast');
const Cast = require('../../models/cast');

const {
    PORT,
} = process.env

jest.mock('../../models', () => ({
    Cast: {
        findByPk : jest.fn((params) => {
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
            const cast = casts.find((it) => (
                it.id === params
            ));
            return cast;
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

    it('error cast not found', async () => {
        const request = {
            params: {
                id : 2
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await cast(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });

    it('success get data cast', async () => {
        const request = {
            params: {
                id : 1
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await cast(request, response);
        expect(result.status).toEqual("success");
    });
});