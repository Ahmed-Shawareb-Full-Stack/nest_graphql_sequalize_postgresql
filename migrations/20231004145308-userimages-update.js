'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('UserImages');
      await queryInterface.createTable('UserImages');
      await queryInterface.addColumn(
        'UserImages',
        'ID',
        {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        {
          transaction,
        },
      );
      await queryInterface.addColumn(
        'UserImages',
        'UserID',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'Users',
              schema: 'public',
            },
            key: 'id',
          },
          allowNull: true,
        },
        {
          transaction,
        },
      );
      await queryInterface.addColumn(
        'UserImages',
        'URL',
        {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
          defaultValue: 'dist/uploads/default.jpg',
        },
        {
          transaction,
        },
      );
      await queryInterface.addColumn(
        'UserImages',
        'Type',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: 'personal',
        },
        {
          transaction,
        },
      );

      await queryInterface.addColumn(
        'UserImages',
        'CreatedAt',
        {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        {
          transaction,
        },
      );

      await queryInterface.addColumn(
        'UserImages',
        'UpdatedAt',
        {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        {
          transaction,
        },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('UserImages');
  },
};
