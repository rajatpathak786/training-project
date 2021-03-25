import ServiceBase from '../base'
import module from '../../controllers/module';
const moduletable = require('../../../models').moduleTable;

export default class moduleFetchId extends ServiceBase {
  // get constraints () {
  //   return constraints
  // }

  async run () {
    try {
      let moduleTaskDetails = []
      let retId = async() => {
        return await moduletable.findAll({
          attributes: ['moduleName', 'taskId'],
          where: {id: this._args.id}
        })
        .then((moduleDetails) => {
          let name = moduleDetails[0].moduleName;
          let taskId = moduleDetails[0].taskId;
          moduleTaskDetails.push({'id': this._args.id, 'name': name, 'taskId': taskId})
          return moduleTaskDetails
        })
      }
      let returnVal = await retId();
      return returnVal

    } catch (error) {   
      return this.variable
    }
  }
}
