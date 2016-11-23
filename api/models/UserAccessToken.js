const moment = require('moment');

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
        defaultValue: true
      }
    },
    {
      tableName: 'user_access_token',
      underscored: true,
      classMethods: {
        associate(models) {
          UserAccessToken.belongsTo(models.User);
        },

        /**
         * Validate access token
         *
         * @param token String
         * @param model Object
         * @return Promise
         */
        isAccessTokenValid(token, ...includedModels) {
          const cond = {
            where: {
              access_token: token,
              is_active: true,
              access_token_expired_at: {
                $gt: moment().utc().toDate()
              }
            }
          };

          if (includedModels) {
            cond.include = [];

            includedModels.forEach(model => (
              cond.include.push({ model, required: true })
            ));
          }

          return this.findOne(cond);
        }
      }
    }
  );

  return UserAccessToken;
};
