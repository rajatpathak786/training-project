import ServiceBase from '../base'
const moduletable = require('../../../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class moduleInsert extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      moduletable.create({
        moduleName: this._args.modulename,
        taskId: this._args.taskId
      })
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
