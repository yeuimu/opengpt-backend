const nodemailer = require('nodemailer');
const colors = require('colors-console');
const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: '2197651308@qq.com',
    pass: 'sottfhmhtuzoeafd'
  }
});

const sendmail = async mail => {
  try {
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');
    await transporter.sendMail({
      from: `"OpenGP"<2197651308@qq.com>`,
      subject: 'verify code',
      to: mail,
      html: `<p>欢迎使用 OpenGPT！您的验证码是：${code} <p>`
    });
    console.log(colors('green', 'Code:'), `成功向 ${mail} 发送验证码`);
    return true;
  } catch (error) {
    error && console.log(colors('red', 'Code:'), `向 ${mail} 发送验证码失败，失败原因: \n`, error);
    return false;
  }
}

module.exports = sendmail;