import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class taskUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    console.log('2222222222')
    console.log(this._args)
    try {
      tasktable.update(
        {taskName: this._args.taskName},
        {where: {id: this._args.id}}
      )
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
