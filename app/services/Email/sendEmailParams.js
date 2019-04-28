import ServiceBase from '../base'


export default class sendEmailParams extends ServiceBase {
  

  async run () {
    try {

      // Some async or service specific action

      return this._args

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
