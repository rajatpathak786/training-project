const emptrainingtable = require('../../../models').empTraingTable;
const moduletable = require('../../../models').moduleTable;
const request = require("request");
const {apiKey, token} = require('./config');
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class trelloUpdateList extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      let date = Date.now();
      let formatDate = (date) => {
        let currentDate = new Date(date),
        month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
      }
      date = formatDate(date);
    
      emptrainingtable.findAll({
        attributes: ['id', 'moduleId', 'listId', 'boardId'],
        where: {dateOfStart: date}
      })
      .then(async(trainingInfo) => {
        let length = trainingInfo.length
        for(let i = 0; i < length; ) {
          if (typeof trainingInfo[i].listId == 'object') {
            await moduletable.findAll({
              attributes: ['moduleName'],
              where: {id: trainingInfo[i].moduleId}    
            })
            .then(async (modulename) => {
              let options = {
                method: 'POST',
                url: `https://api.trello.com/1/boards/${trainingInfo[i].boardId}/lists`,
                qs:
                {
                  name: modulename[i].moduleName,
                  pos: 'top',
                  key: apiKey,
                  token: token
                }
              };
              await request(options, async function (error, response, body) {
                if (error) throw new Error(error);
                body = body.split(',');
                body = body[0];
                body = body.split(':');
                body = body[1];
                await emptrainingtable.update(
                  { listId: body.id },
                  {where: {id: trainingInfo[i].id}}
                )    
              })    
            })
          } else {
            await emptrainingtable.update(
              { listId: trainingInfo[i].listId},
              {where: {id: trainingInfo[i].id}}
            )
          }
          ++i;        
        } 
      })      
      return this._args
    } catch (error) {
      // handle error case
      return this.variable
    }
  }
}
