import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;

export default class taskFetchId extends ServiceBase {

  async run() {
    try {
      let taskName = []
      let retId = async() => {
        return await tasktable.findAll({
          attributes: ['taskName'],
          where: { id: this._args.id }
        })
        .then((task) => {
          taskName.push({'id': this._args.id, 'taskName': task[0].taskName})
          return taskName
        })
      }
      let returnval = await retId();
      return returnval

    } catch (error) {
      return this.variable
    }
  }
}
