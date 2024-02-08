import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'

const Contact = () => {
    const form = useRef();

    const [done, setDone] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_1lp2wnu', 'template_cb7osfg', form.current, 'H7WaFOhE9Wu7WNaVX')
            .then((result) => {
                // console.log(result.text);
                setDone(true);
            }, (error) => {
                // console.log(error.text);
            });
    };

    return (
        <div className="contact-form" id="contact">
            <div className="c-left">
                <div className="c-left-title">
                    <h1>Liên hệ <span>SaiGon Sky</span></h1>
                    <p>Chúng tôi trân trọng mọi cơ hội được giao lưu và hợp tác. Hãy liên hệ ngay với chúng tôi để được tư vấn và giải đáp mọi thắc mắc của bạn về <span>SaiGon Sky</span> nhé!</p>
                </div>
                <div className="c-left-img">
                    <img src="/assets/images/contact2.png" alt="" />
                </div>
            </div>

            <div className="c-right">
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name="user_name" className="user" placeholder="Tên" />
                    <input type="email" name="user_email" className="user" placeholder="Email" />
                    <textarea name="message" className="user" placeholder="Lời nhắn..." />
                    <input type="submit" value="Gửi" className="button_about_us" />
                    <span>{done && "Thanks for contaction me!"}</span>
                </form>
            </div>
        </div>
    )
}

export default Contact