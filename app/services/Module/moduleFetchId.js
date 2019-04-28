import ServiceBase from '../base'
const moduletable = require('../../../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class moduleFetchId extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      moduletable.findAll({
        attributes: ['id'],
        where: {moduleName: this._args.name}
      })
      return this._args
    } catch (error) {   
      return this.variable
    }
  }
}
