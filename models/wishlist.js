'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wishlist.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    like : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
    movie_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    user_id : {
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
    tableName : 'wishlist',
    timestamps : true
  });
  return Wishlist;
};