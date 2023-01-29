import './App.css';
import emailjs from 'emailjs-com'

function Email() {


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.init('CR9PmcvXu13LCcTwU');
        emailjs.sendForm(
            'service_f568lfw', 
            'template_b7rz5mg'
            )
    }

    return (
        <div className="App">

            <form onSubmit={() => sendEmail()}>
                <input type="text" name="name" placeholder='name'/><br/>
                <input type="email" name="user_email" placeholder='email'/><br/>
                <input type="text" name="message" placeholder='message'/><br/>
                <input type="submit"/>
            </form>

        </div>
    );
}

export default Email;
