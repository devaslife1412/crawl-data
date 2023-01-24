var jobs = require('./data');
//console.log(jobs.length);
const nodemailer = require("nodemailer");

var mailContent = "";
async function main() {

    for await (const job of jobs) {
        mailContent += job.job + " " + job.url;
        mailContent += "\n";
        //console.log(job.job)
    }
    console.log(mailContent.length);
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: "justus.hartmann@ethereal.email",
        to: "michael.hauck@ethereal.email",
        subject: "test mail",
        text: mailContent,
        html: "<b>Jobs list</b>",
    });
    console.log("URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
