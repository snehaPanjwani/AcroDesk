'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg :"Name cannot be NULL!"},
        notEmpty : {msg : "Name cannot be empty"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg :"Email cannot be NULL!"},
        notEmpty : {msg : "Email cannot be empty"},
        isEmail : {msg : "Wrong email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg :"password cannot be NULL!"},
        notEmpty : {msg : "password cannot be empty"}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg :"Role cannot be NULL!"},
        notEmpty : {msg : "Role cannot be empty"}
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg :"Department not be NULL!"},
        notEmpty : {msg : "Department cannot be empty"}
      }
    },
    active_status: {
      type: DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg :"Name cannot be NULL!"},
        notEmpty : {msg : "Name cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};