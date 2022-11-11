module.exports = (sequelize, DataTypes) => {
    const CastMovie = sequelize.define('CastMovie', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        movie_id : {
            type : DataTypes.INTEGER,
            allowNull : false
          },
        cast_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        createdAt : {
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false
        }
    }, {
        tableName : 'cast_movie',
        timestamps : true
    });

    return CastMovie;
}