'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cast.init({
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
    sequelize,
    tableName : 'cast',
    timestamps : true
  });
  return Cast;
};
