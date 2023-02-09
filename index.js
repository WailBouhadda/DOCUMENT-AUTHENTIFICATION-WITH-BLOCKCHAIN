const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello world !')
})

app.get('/email', (req, res) => {
    QRCode.toDataURL('http://localhost:3000/').then(url => {
        res.send(`
        <h2>QRCode Generated</h2>
        <div><img src='${url}'/></div>
    `)
    }).catch(err => {
        console.debug(err)
    })
});

app.post('/email', (req, res) => {

    let emailData = req.body

    QRCode.toDataURL(`http://161.35.200.201/Diplome/${emailData.CNE+'.'+emailData.diplome+'.'+emailData.date}`).then(url => {
        
        let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 456,
            auth: {
                user: 'univh2.casablanca1@gmail.com',
                pass: 'czjsscgvpjsgfofk'
            }
        })

        let mailOptions = {
            from: 'univh2.casablanca1@gmail.com',
            to: emailData.email,
            subject: 'QR Code de Diplome (univh2c) ',
            attachDataUrls: true,
            html: `
            
                <h3>Bonjour mr. ${emailData.name},</h3>
                <h3> Veuillez trouver ci joint le code Qr de votre diplome "${emailData.diplome}", "${emailData.filiere}" : </h3>

                <img style:"marin-auto" src='${url}'/>

                <h3 style="color:red;font-weight:bold"> IMPORTANT !</h3>
                <h4 style="font-style:italic">*Scanner ce code Qr et verifier vos informations sur le diplome.</h4>
                <h4 style="font-style:italic">*Toute réclamation doit être adressée au service de scolarité de votre établissement.</h4>
    
            `
        }

        smtpTransport.sendMail(mailOptions, (error, response) => {
            if(error) { res.send(error) } 
            else { res.send('Success') }
        })
    
        smtpTransport.close();

    })



})



app.listen(5000, () => {
    console.log('Listening on port : 5000')
})