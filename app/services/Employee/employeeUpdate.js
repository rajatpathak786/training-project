import ServiceBase from '../base'
const emptable = require('../../../models').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      emptable.update(
        { 
          empName: this._args.name,
          empEmail: this._args.email 
        },
        { where: { id: this._args.id } }
      )
      return this._args
    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
