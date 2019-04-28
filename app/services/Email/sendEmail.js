import ServiceBase from '../base'
const emptable = require('../../../models').empTable;
const moduletable = require('../../../models').moduleTable;
const tasktable = require('../../../models').taskTable;
const emptrainingtable = require('../../../models').empTraingTable;
const nodemailer = require("nodemailer");

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class sendEmail extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      let sendEmail = async (obj) => {
        console.log(obj);
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, 
          auth: {
            user: testAccount.user, 
            pass: testAccount.pass 
          }
        });
        let info = await transporter.sendMail({
          from: obj.sender, 
          to: obj.receiver, 
          subject: obj.subject, 
          text: `Hi ${obj.employeeName},\n${obj.moduleName} ${obj.taskName} task must be completed by ${obj.doc} `, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      let obj = {};
      console.log(obj);
      if (this._args.name) {
        let nowDate = new Date()
        emptable.findAll({
          attributes:['id','empEmail'],
          where:{
            empName: this._args.name
          }
        })
        .then((moduletaskid) => {
          moduletable.findAll({
            attributes: ['id', 'taskId'],
            where: {moduleName: this._args.mname}
          })
          .then(async(empid) => {
            let length = empid[0].taskId.length;
            for (let i = 0; length > i; i++) {
              await emptrainingtable.findAll({
              attributes:['id','reviewerId','moduleId','taskId'],
              where:{
                empId: moduletaskid[0].id,
                taskId: empid[0].taskId[i]
              }
            })
            .then(async(modulename) => {
               await moduletable.findAll({
                attributes: ['moduleName'],
                where:{id: modulename[0].moduleId}
              })
              .then(async(taskname) => {
                await tasktable.findAll({
                  attributes: ['taskName'],
                  where:{id: modulename[0].taskId}
                })
                .then(async(reviewmail) => {
                  await emptable.findAll({
                    attributes: ['empEmail'],
                    where:{id: modulename[0].reviewerId}
                  })
                  .then(async(ret) => {
                    await emptrainingtable.findAll({
                      attributes: ['expectedDateOfCompletion'],
                      where:{id: modulename[0].id}
                    })
                    .then(async(doc) => {
                      obj.recEmail = moduletaskid[0].empEmail;
                      obj.senEmail = ret[0].empEmail;
                      obj.subject = `Complete ${taskname[0].moduleName} ${reviewmail[0].taskName}`;
                      obj.empName =  this._args.name;
                      obj.moduleName = taskname[0].moduleName;
                      obj.taskName = reviewmail[0].taskName;
                      obj.doc = doc[0].expectedDateOfCompletion;
                      await sendEmail({sender: obj.senEmail, receiver: obj.recEmail, subject: obj.subject, employeeName: obj.empName, moduleName: obj.moduleName, taskName: obj.taskName, doc: obj.doc});
                    })
                  })            
                })
              })        
            })     
            }
          })
        })
      }

      return this._args

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
