
const { movies } = require('../../routes/handler/movies');
const Movies = require('../../models/movies');

const {
    PORT,
} = process.env

jest.mock('../../models', () => ({
    Movies: {
        findAll : jest.fn(() => {
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
    
            return movies;
        }), 
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Get Data Movies', () => {

    it('success get data movies', async () => {
        const request = {
            query: {
                search : ""
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await movies(request, response);
        expect(result.status).toEqual("success");
    });
});