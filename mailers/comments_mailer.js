const nodeMailer = require('../config/nodemailer');



//another way of exporting comments
exports.newComment = (comment) => {
    console.log('Inside newComment mailer',comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'codial.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, function(err,info){
        if(err){console.log('Error in sending mail:', err); return;}

        // console.log('Message Sent: ', info);
        return;
    });
}