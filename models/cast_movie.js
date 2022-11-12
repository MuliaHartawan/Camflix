'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CastMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CastMovie.init({
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
    sequelize,
    tableName : 'cast_movie',
    timestamps : true,
  });
  return CastMovie;
};