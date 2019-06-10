import ServiceBase from '../base'
const emptable = require('../../../models').empTable;

export default class employeeFetchId extends ServiceBase {

  async run () {
    try {
      let empDetails = []
      let retId = async() => {
        return await emptable.findAll({
          attributes: ['empName', 'empEmail'],
          where: {id: this._args.id}
        })
        .then((emp) => {
          let name = emp[0].empName;
          let email = emp[0].empEmail;
          empDetails.push({'id': this._args.id, 'name': name, 'email': email})
          return empDetails
        })
      }
      let returnval = await retId();
      return returnval
    }

     catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
