'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motoristas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id'}
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cnh: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipo_cnh: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Motoristas');
  }
};