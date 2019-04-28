import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class taskInsert extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.create({
        taskName: this._args.taskname
      })
      .then(() => console.log('module details successfully inserted in tasktable'));
      return this._args

    } catch (error) {
      return this.variable
    }
  }
}
