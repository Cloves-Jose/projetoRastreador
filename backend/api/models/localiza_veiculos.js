'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localiza_veiculos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Localiza_veiculos.belongsTo(models.Veiculos, {
        foreignKey: 'veiculos_id'
      })
    }
  }
  Localiza_veiculos.init({
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Localiza_veiculos',
  });
  return Localiza_veiculos;
};