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
     await queryInterface.createTable('movies', { 
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
      name : {
        type : Sequelize.STRING(100),
        allowNull : false
      },
      poster : {
        type : Sequelize.STRING,
        allowNull : true
      },
      status : {
        type : Sequelize.ENUM(),
        values : ['started', 'ended', 'ongoing'],
        defaultValue: 'ongoing', 
        allowNull : false
      },
      rating : {
        type : Sequelize.TINYINT,
        defaultValue: 1, 
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
     await queryInterface.dropTable('movies');
  }
};
