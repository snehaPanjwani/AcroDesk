'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QueryResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QueryResponse.belongsTo(models.User,{
        foreignKey : "responseby"
      });
      QueryResponse.belongsTo(models.Query,{
        foreignKey : "query"
      });
    }
  }
  QueryResponse.init({
    response_text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QueryResponse',
  });
  return QueryResponse;
};