import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class taskDelete extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.destroy({
        where: {taskName: this._args.taskname}
      })
      
      return this._args

    } catch (error) {
      return this.variable
    }
  }
}
