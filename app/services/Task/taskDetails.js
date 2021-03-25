import ServiceBase from '../base'
const tasktable = require('../../../models').taskTable;

export default class SampleService extends ServiceBase {

  async run () {
    try {
      console.log('222222');  
      let taskDetail = []
      let taskDetailsFunction = async() => {
        return await tasktable.findAll({
          order: ['id'],
          attributes: ['id', 'taskName']
        }).then((result) => {
          console.log(result)
          for(let i = 0; i < result.length; ++i) {
            let id = result[i].id
            let taskname = result[i].taskName;
            taskDetail.push({'id': id, 'taskname': taskname})
          }
          console.log(taskDetail);
          return taskDetail;
        })
      }
      let taskDetails = await taskDetailsFunction();
      console.log('1111111---------------------1111111111111111111');
      console.log(taskDetails);
      return taskDetails

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
