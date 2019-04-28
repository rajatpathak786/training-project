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
      let returnval = retId();
      function retId() {
        emptable.findAll({
          attributes: ['id'],
          where: {empName: req.query.name}
        })
        .then((emp) => {
          returnval = emp[0].id;
          return returnval
        })
      }
    }

     catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
