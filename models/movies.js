'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movies.belongsToMany(models.Cast, {
        through: "cast_movie",
        as: "cast",
        foreignKey: "movie_id",
      });
    }
  }
  Movies.init({
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
    sequelize,
    tableName : 'movies',
    timestamps : true , 
  });
  return Movies;
};