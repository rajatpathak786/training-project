const emptrainingtable = require('../../../models').empTraingTable;
const tasktable = require('../../../models').taskTable;
const request = require("request");
const {apiKey, token} = require('./config');
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class trelloUpdateCard extends ServiceBase {
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

      let trelloUpdateCard = async(date) => {
        await emptrainingtable.findAll({
          attributes: ['id', 'listId', 'taskId', 'cardId'],
          where: {dateOfStart: date}
        })
        .then(async(trainingInfo) => {
          let length = trainingInfo.length;
          for (let i = 0; i < length; ) {
            if (typeof trainingInfo[i].cardId == 'object') {
              let listId = trainingInfo[i].listId;
              let empid = trainingInfo[i].id;
              await tasktable.findAll({
                attributes: ['taskName'],
                where: {id: trainingInfo[i].taskId}
              })
              .then(async(taskname) => {
                let options = {
                  method: 'POST',
                  url: 'https://api.trello.com/1/cards',
                  qs:
                  {
                    name: taskname[0].taskName,
                    idList: listId,
                    keepFromSource: 'all',
                    key: apiKey,
                    token: token
                  }
                };
                await request(options, async function (error, response, body) {
                  if (error) throw new Error(error);
                  body = body.split(',')[0].split(':')[1].split('"')[1];
                  await emptrainingtable.update (
                    { cardId: body },
                    { where: {id: empid}}
                  )
                });
              }) 
            } else {
              await emptrainingtable.update(
                {cardId: cardId},
                {where: {id: trainingInfo[i].id}}
              )
            }
            ++i;
          }
        })
      }
      await trelloUpdateCard(date);
      return this._args
    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
