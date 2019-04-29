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
        emptable.findAll({
          attributes: ['id'],
          where: {empName: this._args}
        })
        .then(async (trello) => {
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
          await request(options, function (error, response, body) {
          if (error) throw new Error(error);
          body = body.split(',');
          body = body[0];
          body = body.split(':');
          body = body[1];
          emptrainingtable.update(
            {boardId: body},
            {where: {empId: trello[0].id}}
          )
          .then(res => {
            console.dir(res)
          })
          .catch(err => {
            console.log(err)
          })
        })     
    })
    return this._args
   } catch (error) {
      return this.variable
    }
  }
}
