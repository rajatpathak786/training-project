'use strict';
module.exports = (sequelize, DataTypes) => {
  const empTraingTable = sequelize.define('empTraingTable', {
    empId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    dateOfStart: DataTypes.DATEONLY,
    dateOfCompletion: DataTypes.DATE,
    moduleId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    taskStatus: DataTypes.STRING,
    drift: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    body: DataTypes.STRING,
    boardId: DataTypes.STRING,
    listId: DataTypes.STRING,
    cardId: DataTypes.STRING,
    leave: DataTypes.INTEGER,
    expectedDateOfCompletion: DataTypes.DATEONLY
  }, {});
  empTraingTable.associate = function(models) {
    // associations can be defined here
  };
  return empTraingTable;
};