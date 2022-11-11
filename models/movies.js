const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        poster : {
            type : DataTypes.STRING,
            allowNull : true
        },
        status : {
            type : DataTypes.ENUM,
            values : ['started', 'ended', 'ongoing'],
            defaultValue: 'ongoing', 
            allowNull : false,
        },
        rating : {
            type : DataTypes.TINYINT,
            defaultValue: 'ongoing',
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
        tableName : 'movies',
        timestamps : true   
    });

    // static associate(models) {
    //     classroom.hasMany(models.student_schedule, { foreignKey: 'room_code' });
        
    // }

    return Movie;
}