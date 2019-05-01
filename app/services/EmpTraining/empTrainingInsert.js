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
      let empinserttraining = async(values) => {      
        await moduletable.findAll({
          attributes: ['id'],
          where: {moduleName: this._args.modulename}
        })
        .then(async(objmodule) => {
          await moduletable.findAll({
            attributes: ['taskId'],
            where: {moduleName: this._args.modulename}
          })
          .then(async(objtaskId) => {
            let len = objtaskId[0].taskId.length
            for(let i=0; i < len; i++) {
              if(i != 0) { 
                this._args.date = await new Date(this._args.date.setDate(this._args.date.getDate() + 5))
                this._args.endDate = await new Date(this._args.endDate.setDate(this._args.endDate.getDate() + 5))
                console.log(this._args.date+"      "+this._args.endDate)
              }
              await emptrainingtable.create ({
                empId: this._args.eid,
                reviewerId: this._args.rid,
                taskStatus: this._args.taskstatus,
                dateOfStart: this._args.date,
                expectedDateOfCompletion: this._args.endDate,
                moduleId: objmodule[0].id,
                taskId:objtaskId[0].taskId[i]
              })
            }
          })
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
