
const { comingSoon } = require('../../routes/handler/movies');
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
                "status" : 'ongoing',
                "rating" : 5,
            },
            {
                "id": 2,
                "name": "Laskar pelangi",
                "poster": null,
                "status" : 'ongoing',
                "rating" : 5,
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

describe('Get Movie Coming Soon', () => {

    it('success get data movie coming soon', async () => {
        const request = {
            query: {
                search : ""
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await comingSoon(request, response);
        expect(result.status).toEqual("success");
    });
});