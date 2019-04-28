import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class taskFetchId extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.findAll({
        attributes: ['id'],
        where: { taskName: this._args.name }
      })
      return this._args

    } catch (error) {
      return this.variable
    }
  }
}
