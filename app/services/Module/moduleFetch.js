import ServiceBase from '../base'



export default class moduleFetch extends ServiceBase {

  async run() {
    try {
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
