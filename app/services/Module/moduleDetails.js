import ServiceBase from '../base'
const moduletable = require('../../../models').moduleTable;

export default class SampleService extends ServiceBase {

  async run () {
    try {
      console.log('222222');  
      let moduleDetail = []
      let moduleDetailsFunction = async() => {
        return await moduletable.findAll({
          order: ['id'],
          attributes: ['id', 'moduleName', 'taskId']
        }).then((result) => {
          console.log(result)
          for(let i = 0; i < result.length; ++i) {
            let id = result[i].id
            let moduleName = result[i].moduleName;
            let taskId = result[i].taskId;
            moduleDetail.push({'id': id, 'moduleName': moduleName, 'taskId': taskId})
          }
          console.log(moduleDetail);
          return moduleDetail;
        })
      }
      let moduleDetails = await moduleDetailsFunction();
      console.log('1111111---------------------1111111111111111111');
      console.log(moduleDetails);
      return moduleDetails

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
