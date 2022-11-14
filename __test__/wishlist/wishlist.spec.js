
const { wishlist } = require('../../routes/handler/wishlist');
const Wishlist = require('../../models/wishlist');

jest.mock('../../models', () => ({
    Wishlist: {
        findAll : jest.fn((params) => {
            const wishlists = [{
                "id": 1,
                "like": true,
                "movie_id": 1,
                "user_id" : 1,
            },
            {
                "id": 2,
                "like": true,
                "movie_id": 2,
                "user_id" : 1,
            }];
            const wishlist = wishlists.find((it) => (
                it.user_id === params.where.user_id
                ));
            return wishlist ? wishlist : [];
        }), 
    }
}));

const response = {
    status: jest.fn((x) => ({ 
        json: jest.fn((x) => x)
    })),
    json: jest.fn((x) => x)
};

describe('Get Data Wishlist', () => {

    it('erorr get data wishlist not found', async () => {
        const request = {
            user: {
                "id": 3,
                "name": "admin",
                "email": "admin@gmail.com",
                "avatar": null,
            },
        };
        const result = await wishlist(request, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(result.status).toEqual("error");
    });

    it('get data wishlist', async () => {
        const request = {
            user: {
                "id": 1,
                "name": "admin",
                "email": "admin@gmail.com",
                "avatar": null,
            },
        };
        const result = await wishlist(request, response);
        expect(result.status).toEqual("success");
    });
});