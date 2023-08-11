const Nodemailer = require('nodemailer');
const Notification = {}

Notification.sendNotification = async (message, email, subject, priority = '', cc = '', filename = '', filepath = '') => {
  let transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'flipkartdatanew@gmail.com',
      // pass: 'kkolwuupghnoecvu'
      user: 'mailassitantprotiviti@gmail.com',
      pass: 'uezkmqeoxbqdcwif'
    }
  });
  var mailOptions = {
    // from: "flipkartdatanew@gmail.com",
    from: "mailassitantprotiviti@gmail.com",
    to: email,
    // to: "abhirup.roy@protivitiglobal.in; sarbajit.c@protivitiglobal.in; akshay.chauhan@protivitiglobal.in;",
    cc: cc,
    subject: subject,
    priority: priority,
    html: message,
  };
  if (filename !== '' && filepath !== '') {
    mailOptions = {
      ...mailOptions,
      'attachments': [
        {
          filename: filename,
          path: filepath
        }
      ]
    }
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:' + info.response);
    }
  });
}

module.exports = Notification;