import ServiceBase from '../base'
const emptable = require('../../../models').empTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeFetchId extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      let returnval = await retId();
      async function retId() {
        await emptable.findAll({
          attributes: ['id'],
          where: {empName: req.query.name}
        })
        .then(async(emp) => {
          returnval = emp[0].id;
          return returnval
        })
      }
      return returnval
    }

     catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
