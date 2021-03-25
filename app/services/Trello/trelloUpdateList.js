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
      let formatDate = async (date) => {
        let currentDate = new Date(date),
        month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
      }
       date = await formatDate(date);
      let createTrelloList = async(date) => { 
        await emptrainingtable.findAll({
          attributes: ['id', 'moduleId', 'listId', 'boardId'],
          where: {dateOfStart: date}
        })
        .then(async(trainingInfo) => {
          if (typeof trainingInfo[0] == 'undefined') {
            console.log('no new assignments today');
          } else {
            let length = trainingInfo.length  
            for(let i = 0 ; i < length; ) {             
              if (typeof trainingInfo[i].listId == 'object') {
                let empid = trainingInfo[i].id
                await moduletable.findAll({
                  attributes: ['moduleName'],
                  where: {id: trainingInfo[i].moduleId}    
                })
                .then(async (modulename) => {
                  let boardid = trainingInfo[i].boardId
                  let options = {
                    method: 'POST',
                    url: `https://api.trello.com/1/boards/${boardid}/lists`,
                    qs:
                    {
                      name: modulename[0].moduleName,
                      pos: 'top',
                      key: apiKey,
                      token: token
                    }
                  };
                  await request(options, async function (error, response, body) {
                    if (error) throw new Error(error);
                    body = body.split(',')[0].split(':')[1].split('"')[1];
                    await emptrainingtable.update(
                      { listId: body },
                      {where: {id: empid}}
                    )
                  })    
                })
              } else {
                await emptrainingtable.update (
                  { listId: trainingInfo[i].listId},
                  {where: {id: trainingInfo[i].id}}
                )
              }
            ++i;        
            }
          }    
        })
      }
      await createTrelloList(date); 
            
      return this._args
    } catch (error) {
      // handle error case
      return this.variable
    }
  }
}
