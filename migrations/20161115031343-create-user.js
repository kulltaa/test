module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'user',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      {
        engine: 'InnoDB',
        charset: 'utf8'
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('user');
  }
};
