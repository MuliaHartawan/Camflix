'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
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
    tableName : 'users',
    timestamps : true
  });
  return User;
};