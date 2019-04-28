import ServiceBase from '../base'




export default class taskFetch extends ServiceBase {
 

  async run() {
    try {
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
