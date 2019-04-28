const emptrainingtable = require('../../../models').empTraingTable;
const emptable = require('../../../models').empTable;
const request = require("request");
const {apiKey, token} = require('./config');
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class trelloUpdateBoard extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
        console.log('5555646464646464');
        emptable.findAll({
          attributes: ['id'],
          where: {empName: req.query.name}
        })
        .then((trello) => {
          createBoard('Employee Training');
          let createBoard = (assignmentName) => {
          let options = { method: 'POST',
          url: 'https://api.trello.com/1/boards',
          qs: 
           { name: assignmentName,
             defaultLabels: 'true',
             defaultLists: 'true',
             keepFromSource: 'none',
             prefs_permissionLevel: 'private',
             prefs_voting: 'disabled',
             prefs_comments: 'members',
             prefs_invitations: 'members',
             prefs_selfJoin: 'true',
             prefs_cardCovers: 'true',
             prefs_background: 'blue',
             prefs_cardAging: 'regular', 
             key: apiKey,
             token: token
            } 
          };
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          emptrainingtable.update (
          {boardId: body.id},
          {where: {empId: trello[0].id}}//empId: trello[0].id moduleId:trello[0].moduleId// empId: trello[0].id moduleId:trello[0].moduleId 
          )
        });
      }
        })
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
