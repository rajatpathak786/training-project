import ServiceBase from '../base'
import trelloList from '../Trello/trelloUpdateList'
import trelloCard from '../Trello/trelloUpdateCard';
const emptable = require('../../../models').empTable;
const moduletable = require('../../../models').moduleTable;
const tasktable = require('../../../models').taskTable;
const emptrainingtable = require('../../../models').empTraingTable;
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

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
      let obj = {};

      let sendEmail = async (obj) => {
        console.log(obj);
        console.log('14 14 14 14 14 14 14 14 14 14 14 14')
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

      let assignmentMail = async (id) => {
        console.log('888888888888888888          '+id)
        await emptrainingtable.findAll({
          attributes: ['reviewerId', 'empId', 'moduleId', 'taskId', 'expectedDateOfCompletion', 'taskStatus'],
          where: {id: id}
        })
        .then(async(trainingInfo) => {
          if (trainingInfo[0].taskStatus == 'not assigned') { 
          console.log('9999999999999999999                '+trainingInfo[0]);
          await emptrainingtable.update(
            {taskStatus: 'mail send'},
            {where: {id: id}}
          )
          .then(async(statusUpdate) => {
            await emptable.findAll({
              attributes: ['empEmail', 'empName'],
              where: {id: trainingInfo[0].empId}
            })
            .then(async(employeeDetails) => {
              console.log('10 10 10 10 10 10 10 10 10 10 10 10       '+employeeDetails[0]);
              await emptable.findAll({
                attributes: ['empEmail'],
                where: {id: trainingInfo[0].reviewerId}
              })
              .then(async(reviewerEmail) => {
                console.log('11 11 11 11 11 11 11 11 11 11        '+reviewerEmail[0]);
                await moduletable.findAll({
                  attributes: ['moduleName'],
                  where: {id: trainingInfo[0].moduleId}
                })
                .then(async(moduleName) => {
                  console.log('12 12 12 12 12 12 12 12 12     '+moduleName[0]);
                  await tasktable.findAll({
                    attributes: ['taskName'],
                    where: {id: trainingInfo[0].taskId}
                  })
                  .then(async(taskName) => {
                    console.log('13 13 13 13 13 13 13 13 13 13 13        '+taskName[0]);
                    obj.recEmail = employeeDetails[0].empEmail;
                    obj.senEmail = reviewerEmail[0].empEmail;
                    obj.subject = `Complete ${moduleName[0].moduleName} ${taskName[0].taskName}`;
                    obj.empName =  employeeDetails[0].empName;
                    obj.moduleName = moduleName[0].moduleName;
                    obj.taskName = taskName[0].taskName;
                    obj.doc = trainingInfo[0].expectedDateOfCompletion;
                    await sendEmail({sender: obj.senEmail, receiver: obj.recEmail, subject: obj.subject, employeeName: obj.empName, moduleName: obj.moduleName, taskName: obj.taskName, doc: obj.doc});
                  })
                })
              })
            })
          })
         }
        })        
      }
      
      let nextmail = schedule.scheduleJob('* /11 * * *', async function() {
        let date = Date.now();
        console.log('111111111111     '+date);
        let formatDate = async (date) => {
          let currentDate = new Date(date),
          month = '' + (currentDate.getMonth() + 1),
          day = '' + currentDate.getDate(),
          year = currentDate.getFullYear(); 
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          return [year, month, day].join('-');
        }
        date = await formatDate(date);
        console.log('222222222222     '+date);
        console.log('333333333333333');

        console.log('4444444444444444444444444         '+date);
        await emptrainingtable.findAll({
          attributes: ['id'],
          where: {dateOfStart: date}
        })
        .then(async (empids) => {
          console.dir(empids[0]);
          console.log(typeof empids[0]);
          console.log('5555555555555555555            '+empids[0].id+'      ');
          if(typeof empids[0] == 'undefined') {
            console.log('No new assignments today');
          } else {
            let length = empids.length;
            console.log(empids[0].id);
            console.log(typeof empids[0].id);
            console.log('6666666666666666666            '+length);
            console.log('7777777777777777777777');
            for (let i = 0 ; i < length; ) {
              await assignmentMail(empids[i].id)
              console.log('after mail send');
              await trelloList.run();
              console.log('Trello List Updated');
              await trelloCard.run();  
              console.log('Trello Card Updated');
              ++i;
            }
          }              
        })          
      })
      .catch((err) => {
        console.log(err)
      }) 
      return this._args
    }
    catch (error) {

      // handle error case
      
      return this.variable
    }

  } 
}

