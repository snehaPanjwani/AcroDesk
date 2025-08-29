'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Query extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Query.belongsTo(models.User,{
        foreignKey : "queryby", as :"student"
      });
      Query.hasMany(models.QueryResponse,{
        foreignKey : "query", as :"answers"
      });
    }
  }
  Query.init({
    subject: DataTypes.STRING,
    query_text: DataTypes.STRING,
    status: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Query',
  });
  return Query;
};