"use client"
import { useState, useEffect } from 'react';
import Calendar from '@/app/components/Calendar/Calendar';
import GenericCard from '@/app/components/CardComponent/GenericCard';
import { DynamicRenderer } from '@/app/utils/DynamicRender';
import PTMSchedulingConfig from '@/app/config/PTMSchedulingConfig';

const PTMScheduling = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div style={{
            p: "2rem",
            px: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "4rem" },
            gap: "3rem",
        }}>
            <div className={PTMSchedulingConfig.styles.container}>

                {/* Title */}
                <h1 style={{ marginTop: '1rem' }} className={PTMSchedulingConfig.styles.title}>
                    {PTMSchedulingConfig.page.title}
                </h1>
                <p className={PTMSchedulingConfig.styles.subtitle}>
                    {PTMSchedulingConfig.page.subtitle}
                </p>

                {/* Stats Cards */}
                <div className={PTMSchedulingConfig.styles.statsGrid}>
                    {PTMSchedulingConfig.stats.map((stat, index) => (
                        <GenericCard
                            key={index}
                            title={stat.title}
                            desc={stat.value}
                            styles={{
                                cardStyle: {
                                    inlineStyle: {
                                        textAlign: 'center',
                                        padding: isMobile ? '16px' : '24px',
                                        border: '2px solid #3b82f6',
                                        borderRadius: '8px'
                                    },
                                },
                                textContainerStyle: {
                                    inlineStyle: { textAlign: 'center' },
                                    titleStyle: {
                                        inlineStyle: {
                                            fontSize: isMobile ? '0.8rem' : '1rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            marginBottom: '4px'
                                        }
                                    },
                                    descStyle: {
                                        inlineStyle: {
                                            fontSize: isMobile ? '1.1rem' : '1.2rem',
                                            fontWeight: 'bold',
                                            color: '#000000',
                                            marginBottom: '2px'
                                        }
                                    },
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Main Content: Calendar and PTM Creation Wizard */}
                <div className={PTMSchedulingConfig.styles.mainGrid}>
                    {/*Calendar */}
                    <div className={`${PTMSchedulingConfig.styles.calendarSection} flex-1`}>
                        <h2 className={PTMSchedulingConfig.styles.calendarTitle}>
                            PTM Overview & Calendar
                        </h2>
                        <div className={PTMSchedulingConfig.styles.calendarContainer}>
                            <Calendar />
                        </div>
                    </div>

                    {/*PTM Creation Wizard */}
                    <div className={`${PTMSchedulingConfig.styles.wizardSection} flex-1`}>
                        <h2 className={PTMSchedulingConfig.styles.wizardTitle}>
                            PTM Creation Wizard
                        </h2>
                        <DynamicRenderer config={{
                            type: "accordion",
                            values: PTMSchedulingConfig.sections,
                            styles: {
                                inlineStyle: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.7rem" ,
                            } }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PTMScheduling;
