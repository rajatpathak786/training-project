import ServiceBase from '../base'
const moduletable = require('../../../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class moduleDelete extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
        moduletable.destroy({
            where: {id: this._args.id}
          })
      return this._args
    } catch (error) {     
      return this.variable
    }
  }
}
