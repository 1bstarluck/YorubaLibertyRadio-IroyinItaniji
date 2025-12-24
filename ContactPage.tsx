
import React, { useState, useEffect } from 'react';
import MailIcon from '../components/icons/MailIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import InstagramIcon from '../components/icons/InstagramIcon';

const SocialLink: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <a href="#" className="flex flex-col items-center space-y-2 text-gray-400 hover:text-yellow-400 transition-colors">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">{icon}</div>
        <span className="text-xs">{label}</span>
    </a>
)

const ContactPage: React.FC = () => {
    const [email, setEmail] = useState('info@yorubalibertyradio.com');
    const [phone, setPhone] = useState('+1 (234) 567-890');

    useEffect(() => {
        const loadContact = () => {
             const storedEmail = localStorage.getItem('contact_email');
             const storedPhone = localStorage.getItem('contact_phone');
             if (storedEmail) setEmail(storedEmail);
             if (storedPhone) setPhone(storedPhone);
        };
        
        loadContact();
        window.addEventListener('storage', loadContact);
        return () => window.removeEventListener('storage', loadContact);
    }, []);

    return (
        <div className="p-4 space-y-8">
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            
            <section>
                <h2 className="text-xl font-semibold mb-4 text-yellow-400">Send us a Message</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    <textarea placeholder="Your Message" rows={5} className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                    <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors">Submit</button>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-yellow-400">Connect with Us</h2>
                <div className="grid grid-cols-4 gap-4">
                    <SocialLink icon={<WhatsAppIcon />} label="WhatsApp" />
                    <SocialLink icon={<FacebookIcon />} label="Facebook" />
                    <SocialLink icon={<TwitterIcon />} label="Twitter" />
                    <SocialLink icon={<InstagramIcon />} label="Instagram" />
                </div>
            </section>

            <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                    <MailIcon className="w-5 h-5 text-yellow-400"/>
                    <a href={`mailto:${email}`} className="text-gray-300 break-all">{email}</a>
                </div>
                <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-5 h-5 text-yellow-400"/>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-gray-300">{phone}</a>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
