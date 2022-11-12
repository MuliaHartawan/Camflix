'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('wishlist', { 
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
      like : {
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
      movie_id : {
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
      user_id : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : false
      },
      updated_at : {
        type : Sequelize.DATE,
        allowNull : false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('wishlist');
  }
};
