const nodemailer = require("nodemailer");
const config = require('config');

const user = config.get('nodemailer.user');
const password = config.get('nodemailer.password');
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: password,
  },
});

const sendConfirmationEmail = (name, firstname, lastname, email, confirmationCode, host) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${firstname} ${lastname} (${name})</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://${host}/users/confirm?code=${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log("Error during send email:", err));
}

module.exports.sendConfirmationEmail = sendConfirmationEmail;