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
      await queryInterface.changeColumn(
        'Users',
        'Email',
        {
          allowNull: false,
        },
        { transaction },
      );
      await queryInterface.changeColumn(
        'Users',
        'FirstName',
        {
          allowNull: false,
        },
        { transaction },
      );
      await queryInterface.changeColumn(
        'Users',
        'LastName',
        {
          allowNull: false,
        },
        { transaction },
      );
      await queryInterface.changeColumn(
        'Users',
        'Password',
        {
          allowNull: false,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
