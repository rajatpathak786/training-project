import ServiceBase from '../base'



export default class moduleGet extends ServiceBase {
  
  async run() {
    try {
      return this._args
    } catch (error) {
      return this.variable
    }
  }
}
