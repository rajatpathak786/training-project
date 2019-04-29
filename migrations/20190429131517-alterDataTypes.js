'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('empTraingTables', 'dateOfStart', {
        type: Sequelize.DATEONLY
      }),
      queryInterface.changeColumn('empTraingTables', 'expectedDateOfCompletion', {
        type: Sequelize.DATEONLY
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('empTraingTables', 'dateOfStart', {
        type: Sequelize.DATE
      }),
      queryInterface.changeColumn('empTraingTables', 'expectedDateOfCompletion', {
        type: Sequelize.DATE
      })
    ])
  }
};
