const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS needs to be false for port 587
  auth: {
    user: 'yogi09278@gmail.com', 
    pass: 'qono tqao ivlx whgz'
  } 
});

exports.SendMail = async (to, subject, text) => {
  try {
    const MailInfo = await transporter.sendMail({
      from: 'uttamftspl@gmail.com', 
      to: to,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully:');
    return MailInfo;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
