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
      console.log(this._args)
      moduletable.update({ taskId: this._args.taskId, moduleName: this._args.moduleName }, {
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
