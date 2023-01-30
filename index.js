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

    QRCode.toDataURL(`http://localhost:3000/show/${emailData.apogee}`).then(url => {
        
        let smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            port: 456,
            auth: {
                user: 'wailbouhadda31@gmail.com',
                pass: 'djxtsfsrgtafwzox'
            }
        })

        let mailOptions = {
            from: 'wailbouhadda31@gmail.com',
            to: emailData.email,
            subject: 'Message from FSBM',
            attachDataUrls: true,
            html: `
            
                <h3>Message to ${emailData.name}: Voici le code qr de votre diplome "${emailData.diplome}"</h3>
                <img src='${url}'/>
    
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