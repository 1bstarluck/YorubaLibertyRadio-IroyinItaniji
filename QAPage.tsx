
import React from 'react';
import Accordion from '../components/Accordion';

const faqs = [
    {
        question: "How can I listen to the live radio?",
        answer: "You can listen live directly through this app by visiting the 'Radio' tab. You can also tune in via our international shortwave frequencies, which are listed on our website."
    },
    {
        question: "Are the podcasts available for download?",
        answer: "Yes! On the podcast episode page, you will find a download icon next to each episode. Tapping this will save the episode to your device for offline listening."
    },
    {
        question: "How can I support Yoruba Liberty Radio?",
        answer: "Thank you for your interest! You can support us by making a donation through the 'More' tab, purchasing merchandise from our shop, or by sharing our content with your friends and family."
    },
    {
        question: "How do I get in touch with a show host?",
        answer: "The best way to contact a specific show or host is by using the contact form on our 'Contact Us' page. Please specify who the message is for in your inquiry."
    }
];


const QAPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <Accordion key={index} title={faq.question}>
                        <p className="text-gray-300 pb-4 px-4">{faq.answer}</p>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default QAPage;
