import Responder from '../../server/expressResponder'
import trelloUpdateBoard from '../services/Trello/trelloUpdateBoard'
import trelloUpdateCard from '../services/Trello/trelloUpdateCard'
import trelloUpdateList from '../services/Trello/trelloUpdateList'

export default class trello {

  static async trelloUpdateBoard(req, res) {
    const variable = req.query.name;
    const trelloUpdateBoardResult = await trelloUpdateBoard.execute(variable)
    if (trelloUpdateBoardResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateBoardResult.error)
    }
  }
  static async trelloUpdateCard(req, res) {
    const variable = req.body;
    const trelloUpdateCardResult = await trelloUpdateCard.execute(variable)
    if (trelloUpdateCardResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateCardResult.error)
    }
  }
  static async trelloUpdateList(req, res) {
    const variable = req.body;
    const trelloUpdateListResult = await trelloUpdateList.execute(variable)
    if (trelloUpdateListResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateListResult.error)
    }
  }
}
