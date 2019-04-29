import Responder from '../../server/expressResponder'
import sendEmail from '../services/Email/test'
import sendEmailParams from '../services/Email/sendEmailParams'

export default class sendMail {

  static async sendEmail(req, res) {
    const variable = req.body;
    const sendEmailResult = await sendEmail.execute(variable)
    if (sendEmailResult.successful) {
      Responder.success(res, { variable })
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
