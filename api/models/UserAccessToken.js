module.exports = function createUserModel(sequelize, DataTypes) {
  const UserAccessToken = sequelize.define(
    'UserAccessToken',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      access_token_expired_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: 'user_access_token',
      underscored: true,
      classMethods: {
        associate(models) {
          UserAccessToken.belongsTo(models.User);
        }
      }
    }
  );

  return UserAccessToken;
};
