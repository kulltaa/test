module.exports = function createUserModel(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: 'user',
      underscored: true
    }
  );

  return User;
};
