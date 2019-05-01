import Responder from '../../server/expressResponder'
import sendEmail from '../services/Email/sendEmail'
import sendEmailParams from '../services/Email/sendEmailParams'
import trelloUpdateList from '../services/Trello/trelloUpdateList'
import trelloUpdateCard from '../services/Trello/trelloUpdateCard'

export default class sendMail {

  static async sendEmail(req, res) {
    const variable = 'mail send & trello updated';
    const sendEmailResult = await sendEmail.execute(variable)
    if (sendEmailResult.successful) {
      const trelloUpdateListResult = await trelloUpdateList.execute(variable)
        if(trelloUpdateListResult.successful) {
          const trelloUpdateCardResult = await trelloUpdateCard.execute(variable)
            if(trelloUpdateCardResult.successful) {
              Responder.success(res, { variable })        
            } else {
              Responder.operationFailed(res, trelloUpdateCardResult.error)
            }
        } else {
          Responder.operationFailed(res, trelloUpdateListResult.error)
        }
    } else {
      Responder.operationFailed(res, sendEmailResult.error)
    }
  }
  static async sendEmailParams(req, res) {
    const variable = 'Send post request for sending email in JSON format:\nname:\nmnane:';
    const sendEmailParamsResult = await sendEmailParams.execute(variable)
    if (sendEmailParamsResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, sendEmailParamsResult.error)
    }
  }
 
}
