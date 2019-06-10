import Responder from '../../server/expressResponder'
import empTrainingInsert from '../services/EmpTraining/empTrainingInsert'
import updateDrift from '../services/EmpTraining/updateDrift'
import empTrainingGet from '../services/EmpTraining/empTrainingGet'
import updateDriftParams from '../services/EmpTraining/updateDriftParams'
import trelloUpdateBoard from '../services/Trello/trelloUpdateBoard'
import empTrainingGetDetail from '../services/EmpTraining/empTrainingGetDetail'

export default class empTraining {

  static async empTrainingInsert(req, res) {
    const variable = req.body;
    variable.date=new Date();
    variable.endDate = new Date();
    variable.endDate = new Date(variable.endDate.setDate(variable.date.getDate() + 5));
    const empTrainingInsertResult = await empTrainingInsert.execute(variable)
    console.log(empTrainingInsertResult)
    console.log(empTrainingInsertResult.successful)
    if (empTrainingInsertResult.successful) {
      const trelloUpdateBoardResult = await trelloUpdateBoard.execute(variable)
      if (trelloUpdateBoardResult.successful) {
        Responder.success(res, { variable })
      } else {
        Responder.operationFailed(res, trelloUpdateBoardResult.error)
      }
    } else {
        Responder.operationFailed(res, empTrainingInsertResult.error)
    }
  }
  static async updateDrift(req, res) {
    const variable = req.body;
    variable.endDate = new Date();
    variable.Date = new Date();
    console.log(variable);
    const updateDriftResult = await updateDrift.execute(variable)
    if (updateDriftResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, updateDriftResult.error)
    }
  }
  static async empTrainingGet(req, res) {
    const variable = 'Send Post in JSON format\neid:\nrid:\nmodulename:\ntaskstatus:';
    const empTrainingGetResult = await empTrainingGet.execute(variable)
    if (empTrainingGetResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, empTrainingGetResult.error)
    }
  }
  static async empTrainingDetails(req, res) {
    const variable = req.body;
    const empTrainingGetDetailResult = await empTrainingGetDetail.execute(variable)
    let responseResult = empTrainingGetDetailResult._result
    if (empTrainingGetDetailResult.successful) {
      Responder.success(res, { responseResult })
    } else {
      Responder.operationFailed(res, empTrainingGetDetailResult.error)
    }
  }
  static async updateDriftParams(req, res) {
    const variable = 'Send Post in JSON format:\nmoduleId:\ntaskId:\ndrift:\nremTasks:';
    const updateDriftParamsResult = await updateDriftParams.execute(variable)
    if (updateDriftParamsResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, updateDriftParamsResult.error)
    }
  }
}