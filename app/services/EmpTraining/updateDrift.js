const emptrainingtable = require('../../../models').empTraingTable;
import ServiceBase from '../base'

export default class UpdateDrift extends ServiceBase {

  async run () {
    try {
        emptrainingtable.findAll ({
          attributes: ['id', 'dateOfStart', 'expectedDateOfCompletion'],
          where: {moduleId: this._args.moduleId, taskId: this._args.taskId, empId: this._args.empId}
        })
        .then(async (drift) => {
          console.log(drift[0].id)
          emptrainingtable.update (
            {drift: this._args.drift[0].drift},
            {where: {id: drift[0].id}}
          )
          .then(async (expDate) => {
            let dateDrift = parseInt(this._args.drift[0].drift);
            console.log(drift[0].dateOfStart, typeof drift[0].dateOfStart)
            console.log(drift[0].dateOfStart, typeof drift[0].dateOfStart, new Date(drift[0].dateOfStart),typeof new Date(drift[0].dateOfStart))
            this._args.Date = await new Date(drift[0].dateOfStart);
            this._args.endDate = await new Date(drift[0].expectedDateOfCompletion);
            console.log(typeof this._args.Date, "000000000000000", typeof this._args.endDate);
            for(let i = 0; i < (parseInt(this._args.remTasks) + 1); i++) {
              if (i != 0) {
                this._args.Date = await new Date(this._args.Date.setDate(this._args.endDate.getDate()));
                this._args.endDate = await new Date(this._args.endDate.setDate((this._args.endDate.getDate() + 5)));
                this._args.id = await this._args.id + 1;
              } else {
                console.log(dateDrift, typeof dateDrift)
                this._args.endDate = await new Date(this._args.endDate.setDate((this._args.endDate.getDate() + dateDrift)));
                this._args.id = await drift[0].id;
                console.log(this._args.endDate);
              }
              await emptrainingtable.update (
                {dateOfStart: this._args.Date, expectedDateOfCompletion: this._args.endDate},
                {where: {id: this._args.id}}
              )
            }
          })
        })
    return this._args
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
