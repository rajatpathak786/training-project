const emptrainingtable = require('../../../models').empTraingTable;
//const moduletable = require('../../../models').moduleTable;
import ServiceBase from '../base'

export default class empTrainingGetDetail extends ServiceBase {

  async run () {
    try {
      let empDetails = []
      console.log('1212121212121212121')
      console.log(this._args)
      let employeeTrainingDetails = async() => {
        return emptrainingtable.findAll({
          order: ['id'],
          attributes: ['id', 'empId', 'reviewerId', 'dateOfStart', 'dateOfCompletion', 'expectedDateOfCompletion', 'taskStatus', 'drift', 'moduleId', 'taskId'],
          where: {empId: this._args.id, moduleId: this._args.moduleId}
        }).then((result) => {
          console.log(result)
          for(let i = 0; i < result.length; ++i) {
            let id = result[i].id
            let empId = result[i].empId;
            let reviewerId = result[i].reviewerId;
            let dateOfStart = result[i].dateOfStart;
            let dateOfCompletion = result[i].dateOfCompletion;
            let expectedDateOfCompletion = result[i].expectedDateOfCompletion;
            let taskStatus = result[i].taskStatus;
            let drift = result[i].drift;
            let moduleId = result[i].moduleId;
            let taskId = result[i].taskId;
            empDetails.push({'id': id, 'empId': empId, 'reviewerId': reviewerId, 'dos': dateOfStart, 'doc': dateOfCompletion, 'expdoc': expectedDateOfCompletion, 'taskStatus': taskStatus, 'drift': drift, 'moduleId': moduleId, 'taskId': taskId})
          }
          console.log('lllllllllllllllll')
          console.log(empDetails);
          return empDetails;
        })
      }
      console.log('asdasdasdsadasdasd')
      let employeeDetails = await employeeTrainingDetails();
      console.log('1111111---------------------1111111111111111111');
      console.log(employeeDetails);
      return employeeDetails  
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
