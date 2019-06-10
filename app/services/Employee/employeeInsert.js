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
      var regex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
      if (!(regex.test(this._args.email))) {
        let message = `give an proper email address`
        return message 
      } else {
        emptable.create({
          empName: this._args.name,
          empEmail: this._args.email
        })
        .then(() => console.log('employee details successfully inserted in emptable'));
        return this._args  
      }
      
      
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}

