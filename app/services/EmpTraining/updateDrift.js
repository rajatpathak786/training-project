const emptrainingtable = require('../../../models').empTraingTable;
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class UpdateDrift extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
        emptrainingtable.findAll ({
          attributes: ['id', 'dateOfStart', 'expectedDateOfCompletion'],
          where: {moduleId: this._args.moduleId, taskId: this._args.taskId}
        })
        .then(async (drift) => {
          emptrainingtable.update (
            {drift: this._args.drift},
            {where: {id: drift[0].id}}
          )
          .then(async (expDate) => {
            let dateDrift = parseInt(this._args.drift);
            this._args.Date = drift[0].dateOfStart;
            this._args.endDate = drift[0].expectedDateOfCompletion;
            for(let i = 0; i < (parseInt(this._args.remTasks) + 1); i++) {
              if (i != 0) {
                this._args.Date = await new Date(this._args.Date.setDate(this._args.endDate.getDate()));
                this._args.endDate = await new Date(this._args.endDate.setDate((this._args.endDate.getDate() + 5)));
                this._args.id = await this._args.id + 1;
              } else {
                this._args.endDate = await new Date(this._args.endDate.setDate((this._args.endDate.getDate() + dateDrift)));
                this._args.id = await drift[0].id;
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