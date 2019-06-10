const emptrainingtable = require('../../../models').empTraingTable;
const moduletable = require('../../../models').moduleTable;
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class empTrainingInsert extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      console.log(this._args)
      let empinserttraining = async(values) => {    
        console.log(values)  
        // await moduletable.findAll({
        //   attributes: ['id'],
        //   where: {moduleName: this._args.modulename}
        // })
        // .then(async(objmodule) => {
          await moduletable.findAll({
            attributes: ['taskId'],
            where: {id: values.moduleid}
          })
          .then(async(objtaskId) => {
            let len = objtaskId[0].taskId.length
            for(let i=0; i < len; i++) {
              if(i != 0) { 
                values.date = await new Date(values.date.setDate(values.date.getDate() + 5))
                values.endDate = await new Date(values.endDate.setDate(values.endDate.getDate() + 5))
                console.log(values.date+"      "+values.endDate)
              }
              await emptrainingtable.create ({
                empId: values.eid,
                reviewerId: values.rid,
                taskStatus: values.taskstatus,
                dateOfStart: values.date,
                expectedDateOfCompletion: values.endDate,
                moduleId: values.moduleid,
                taskId:objtaskId[0].taskId[i]
              })
            }
          })
        }
      await empinserttraining(this._args);  
      return this._args
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
