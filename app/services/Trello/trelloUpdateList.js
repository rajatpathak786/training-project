const emptrainingtable = require('../../../models').empTraingTable;
const emptable = require('../../../models').empTable;
const moduletable = require('../../../models').moduleTable;
const tasktable = require('../../../models').taskTable
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
      moduletable.findAll({
        attributes: ['id'],
        where: { moduleName: this._args.mname }
      })
        .then((modulee) => {
          emptable.findAll({
            attributes: ['id'],
            where: { empName: this._args.empname }
          })
            .then((emp) => {
              tasktable.findAll({
                attributes: ['id'],
                where: { taskName: this._args.taskname }
              })
                .then((task) => {
                  emptrainingtable.findAll({
                    attributes: ['boardId'],
                    where: {
                      empId: emp[0].id,
                      taskId: task[0].id,
                      moduleId: modulee[0].id
                    }
                  })
                    .then((trellolist) => {
                      var options = {
                        method: 'POST',
                        url: `https://api.trello.com/1/boards/${trellolist[0].boardId}/lists`,
                        qs:
                        {
                          name: this._args.mname,
                          pos: 'top',
                          key: apiKey,
                          token: token
                        }
                      };
                      request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        //listID=body.id database code here
                        emptrainingtable.update(
                          { listId: body.id },
                          {
                            where: {
                              taskId: task[0].id,
                              moduleId: modulee[0].id,
                              empId: emp[0].id
                            }
                          }
                        )
                      })
                    })
                })
            })
        })
      return this.variable

    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
