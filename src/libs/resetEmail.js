const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text, html) {
  try {
    // Create a transporter (a way to send emails)
    const transporter = nodemailer.createTransport({
      host: "your-smtp-server.com", // SMTP server address
      port: 587, // SMTP server port
      secure: false, // true for 465, false for other ports
      auth: {
        user: "your-email@example.com", // Your email address
        pass: "your-email-password", // Your email password
      },
    });

    // Define the email options
    const mailOptions = {
      from: "your-email@example.com", // Sender's email address
      to: to, // Recipient's email address
      subject: subject, // Subject line
      text: text, // Plain text body
      html: html, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usage
sendEmail(
  "recipient@example.com",
  "Hello from Node.js",
  "This is a plain text email",
  "<h1>This is an HTML email</h1><p>With some formatted content</p>"
);
