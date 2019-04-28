import ServiceBase from '../base'
const moduletable = require('../../../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class moduleUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      moduletable.update({ taskId: this._args.taskId }, {
        where: {
          id: this._args.id
        }
      })
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
