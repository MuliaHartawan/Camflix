module.exports = (sequelize, DataTypes) => {
    const Cast = sequelize.define('Cast', {
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
        avatar : {
            type : DataTypes.STRING,
            allowNull : true
        },
        birthday : {
            type : DataTypes.DATE,
            allowNull : false
        },
        deadday : {
            type : DataTypes.DATE,
            allowNull : true
        },
        rating : {
            type : DataTypes.TINYINT,
            defaultValue: 1, 
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
        tableName : 'cast',
        timestamps : true
    });

    return Cast;
}