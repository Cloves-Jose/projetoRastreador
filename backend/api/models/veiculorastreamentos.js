'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VeiculoRastreamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VeiculoRastreamentos.init({
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    placa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VeiculoRastreamentos',
  });
  return VeiculoRastreamentos;
};