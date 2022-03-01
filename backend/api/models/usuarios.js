'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuarios.hasMany(models.Veiculos, {
        foreignKey: 'usuario_veiculo_id'
      })
    }
  }
  Usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    administrador: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};