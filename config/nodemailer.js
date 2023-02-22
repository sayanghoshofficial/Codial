const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: 'sayanghosh.practice@gmail.com',
          clientId: '437838793536-c5eo8912ivqgi74s5tia38fl5cr47g4o.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken: "1//04-l0LTMTN3l6CgYIARAAGAQSNwF-L9IrGL2Ah5MslaxxqvCPLseZp74gCq_JUNhtpgoXjnbpOY5XoJ2lD9gVbyL0GeyKjKtzdus",
          accessToken: "ya29.a0AVvZVspvPznOefcXFPOdL4QJ1kGsEJVuy2jfF_3ZC7z5aDtV_gmNGE_4Zl2eio5ZJ-f6xJIkQYetVUeNeVS9_uBmBgrtzXvw9TE9wBcGwAV0VYmVtN79RtN_-kQ1AmA8ay-bf_cJE7BmCWzXggI67EREhuw2aCgYKAfMSARISFQGbdwaIwUOeUGFKoYmwg7LX2KRSEA0163"
        }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){ console.log("Error in rendering template"); return;}

            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}