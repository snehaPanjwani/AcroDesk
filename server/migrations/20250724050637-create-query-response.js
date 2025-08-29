'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QueryResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      responseby : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references: {
          model : "Users" , key : "id"
        }
      },
      query : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references: {
          model : "Queries" , key : "id"
        }
      },
      response_text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QueryResponses');
  }
};