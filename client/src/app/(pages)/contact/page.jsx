"use client"
import { ContactUsConfig } from '@/app/config/ContactUsConfig';
import GenericCard from '@/app/components/CardComponent/GenericCard';

const ContactUs = () => {
    const config = ContactUsConfig;

    return (
        <div className='bg-gray-50 py-5'>
            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto">
                <h1 className="text-xl xs:text-base lg:text-4xl font-bold mb-2 text-gray-900 text-center">
                    {config.title}
                </h1>
                <p className="text-[0.7rem] md:text-base text-gray-500 text-center mb-6">{config.desc}</p>
            </div>

            <div style={{ display: 'flex',  margin: 'auto', width: '80%', alignItems:'center', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>

                {
                    config.cards.map((card, key) => (
                        <GenericCard
                            title={card.title}
                            desc={card.desc}
                            icon={card.icon}
                            additionalInfo={[{ email: card.email }, { time: card.time }]}
                            key={key}
                            styles={config.styles}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ContactUs;
