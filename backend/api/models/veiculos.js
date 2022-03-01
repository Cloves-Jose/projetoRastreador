'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Veiculos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Veiculos.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_veiculo_id'
      })
      Veiculos.hasOne(models.Localiza_veiculos, {
        foreignKey: 'veiculos_id'
      })
    }
  }
  Veiculos.init({
    modelo: DataTypes.STRING,
    ano: DataTypes.STRING,
    placa: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Veiculos',
  });
  return Veiculos;
};