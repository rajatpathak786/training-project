const emptrainingtable = require('../../../models').empTraingTable;
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
      let trelloBoard = async(trello) => {
        await emptrainingtable.findAll({
          attributes: ['boardId'],
          where: {empId: trello}
        })
        .then(async(board) => {
          console.log(typeof board[0].boardId)
          if (typeof board[0].boardId == 'object') {
            let assignmentName = `Employee Training Board of ${trello}`
            let options = { 
              method: 'POST',
              url: 'https://api.trello.com/1/boards',
              qs: { 
                name: assignmentName,
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
            await request(options, async function (error, response, body) {
              if (error) throw new Error(error);
              body = body.split(',')[0].split(':')[1].split('"')[1];             
              await emptrainingtable.update(
                {boardId: body},
                {where: {empId: trello}}
              )
            })  
          }
          else {
            await emptrainingtable.update(
              {boardId: board[0].boardId},
              {where: {empId: trello}}
            )
          }
        })       
      }
      await trelloBoard(this._args.eid);
    return this._args
   } catch (error) {
      return this.variable
    }
  }
}
