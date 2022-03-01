'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motoristas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Motoristas.belongsTo(models.Usuario)
    }
  }
  Motoristas.init({
    nome: DataTypes.STRING,
    cnh: DataTypes.STRING,
    tipo_cnh: {
      type: DataTypes.ENUM,
      values: ['A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC']
    }, 
  }, {
    sequelize,
    modelName: 'Motoristas',
  });
  return Motoristas;
};