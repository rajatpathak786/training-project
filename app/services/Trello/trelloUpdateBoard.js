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
        console.log(this._args)
        emptable.findAll({
          attributes: ['id'],
          where: {empName: this._args}
        })
        .then((trello) => {
          console.log(trello[0].id)
          console.log('555555555555');
          let assignmentName = 'Employee Training Board'
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
          console.dir(body);
          console.log(body[0].id);
          console.log(body.limits);
          emptrainingtable.update(
            {boardId: "555555555"},
            {where: {empId: trello[0].id}}
          )
          .catch((error) => {
            console.log(error[0])
          })
        })
      return this._args
    })
   } catch (error) {
      return this.variable
    }
  }
}
