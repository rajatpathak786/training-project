import ServiceBase from '../base'
const emptable = require('../../../models').empTable;

export default class SampleService extends ServiceBase {

  async run () {
    try {
      let empDetails = []
      let employeeDetailsFunction = async() => {
        return await emptable.findAll({
          order: ['id'],
          attributes: ['id', 'empName', 'empEmail']
        }).then((result) => {
          console.log(result)
          for(let i = 0; i < result.length; ++i) {
            let id = result[i].id
            let name = result[i].empName;
            let email = result[i].empEmail
            empDetails.push({'id': id, 'name': name, 'email': email})
          }
          console.log('lllllllllllllllll')
          console.log(empDetails);
          return empDetails;
        })
      }
      let employeeDetails = await employeeDetailsFunction();
      console.log('1111111---------------------1111111111111111111');
      console.log(employeeDetails);
      return employeeDetails

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
