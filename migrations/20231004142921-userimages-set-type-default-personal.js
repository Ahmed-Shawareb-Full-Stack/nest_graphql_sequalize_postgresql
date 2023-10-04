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
        'UserImages',
        'Type',
        {
          type: Sequelize.DataTypes.STRING,
          defaultValue: 'personal',
        },
        {
          transaction,
        },
      );
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
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
