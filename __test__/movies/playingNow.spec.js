
const { playingNow } = require('../../routes/handler/movies');
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
            },
            {
                "id": 2,
                "name": "Laskar pelangi",
                "poster": null,
                "status" : 'started',
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

describe('Get Movie Playing Now', () => {

    it('success get data playing now', async () => {
        const request = {
            query: {
                search : ""
            },
            headers : {
                host : 'localhost:' + PORT
            }
        };
        const result = await playingNow(request, response);
        expect(result.status).toEqual("success");
    });
});