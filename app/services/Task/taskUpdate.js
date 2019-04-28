import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class taskUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.update(
        {taskName: this._args.name},
        {where: {id: this._args.id}}
      )
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
