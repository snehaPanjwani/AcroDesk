'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Announcement.belongsTo(models.User,{
        foreignKey : "postby"
      });
    }
  }
  Announcement.init({
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Announcement',
  });
  return Announcement;
};