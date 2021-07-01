const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact Form | ${process.env.APP_NAME}`,
    text: `Email received from Contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
		<div>
		<h4>Email received from Contact Form:</h4>
		<p>Sender name: ${name}</p>
		<p>Sender email: ${email}</p>
		<p>Sender message: ${message}</p>
		<hr />
		<p>This email contains sensetive information</p>
		<p>Visit site: http://localhost:3000</p></div>
		`,
  };

  sgMail
    .send(emailData)
    .then((response) => {
      console.log(response[0].statusCode);
      return res.json({
        success: true,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, email, name, message } = req.body;

  let maillist = [authorEmail, process.env.EMAIL_TO];
  const emailData = {
    to: maillist,
    from: email,
    subject: `Someone messaged you from | ${process.env.APP_NAME}`,
    text: `Email received from Contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
		<div>
		<h4>Message recieved from: </h4>
		<p>Name: ${name}</p>
		<p>Email: ${email}</p>
		<p>Message: ${message}</p>
		<hr />
		<p>This email contains sensetive information</p>
		<p>Visit site: http://localhost:3000</p></div>
		`,
  };

  sgMail
    .send(emailData)
    .then((response) => {
      console.log(response[0].statusCode);
      return res.json({
        success: true,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
