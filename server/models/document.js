'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.User,{
        foreignKey : "uploadedby", as : "faculty"
      });
    }
  }
  Document.init({
    title: DataTypes.STRING,
    filepath: DataTypes.STRING,
    subject: DataTypes.STRING,
    isapproved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};