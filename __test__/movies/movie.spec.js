
const { movie } = require('../../routes/handler/movies');
const Movies = require('../../models/movies');

const {
    PORT,
} = process.env

jest.mock('../../models', () => ({
    Movies: {
        findByPk : jest.fn((params) => {
            const movies = [{
                "id": 1,
                "name": "Harry Porter",
                "poster": null,
                "status" : 'started',
                "rating" : 5,
                "cast" : [{
                    "id": 1,
                    "name": "Angeli Khang",
                    "avatar": null,
                    "birthday" : Date.now(),
                    "deadday" : 5,
                }]
            },
            {
                "id": 2,
                "name": "Laskar pelangi",
                "poster": null,
                "status" : 'ongoing',
                "rating" : 5,
                "cast" : [{
                    "id": 2,
                    "name": "Raisa",
                    "avatar": null,
                    "birthday" : Date.now(),
                    "deadday" : 5,
                }]
            }];
            const movie = movies.find((it) => (
                it.id === params
                ));
            return movie;
        }), 
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Get Details Data Movie', () => {

    it('error movie not found', async () => {
        const request = {
            params: {
                id : 2
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await movie(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });

    it('success get data movie', async () => {
        const request = {
            params: {
                id : 1
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await movie(request, response);
        expect(result.status).toEqual("success");
    });
});