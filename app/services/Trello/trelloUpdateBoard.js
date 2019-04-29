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
        .then(async (trello) => {
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
          console.log('1212121212121212121212121');
          request(options, function (error, response, body) {
          if (error) throw new Error(error);
          body = body.split(',');
          body = body[0];
          body = body.split(':');
          body = body[1];
          console.log('4444444444444444444444444444444333333333333333');
          console.log(typeof body);
          console.log(body);
          console.dir(body);
          console.log(typeof body);
          console.log(body[0].id);
          console.log(body.limits);
          console.log('1');
          emptrainingtable.update(
            {boardId: body},
            {where: {empId: trello[0].id}}
          )
        })     
    })
    return this._args
   } catch (error) {
      return this.variable
    }
  }
}
