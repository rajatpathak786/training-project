import ServiceBase from '../base'
const emptable = require('../../../models').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeInsert extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      emptable.create({
        empName: this._args.name,
        empEmail: this._args.email
        })
        .then(() => console.log('employee details successfully inserted in emptable'));
      return this._args
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}

