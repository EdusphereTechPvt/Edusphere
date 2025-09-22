"use client";

import { PricingConfig } from "@/app/config/PricingConfig";
import { ButtonGroup, Grid } from '@mui/material';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { TableComponent } from "@/app/components/Table/TableComponent";
import { DynamicRenderer } from "@/app/utils/DynamicRender";

const Subscription = () => {

    const config = PricingConfig;

    const [period, setPeriod] = useState('monthly');
    const handlePeriodChange = (newPeriod) => {
        if (newPeriod !== null) {
            setPeriod(newPeriod);
        }
    };


    return (
        <>

            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto my-8 md:my-16">
                <h1 className="text-xl md:text-5xl font-bold mb-2 text-gray-900 text-center ">
                    {config.title}
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">{config.desc}</p>


                <div className="text-center">

                    <ButtonGroup style={{ background: '#f0f0f0', borderRadius: '50px' }} className='m-4 text-center'>
                        <button style={{ borderRadius: '50px', background: period == 'monthly' ? '#1975d0' : '#E7EAEE', color: period === 'monthly' ? 'white' : 'black' }} className=" px-6 py-2 font-bold" onClick={() => handlePeriodChange('monthly')}>Monthly</button>
                        <button style={{ borderRadius: '50px', background: period == 'annual' ? '#1975d0' : '#E7EAEE', color: period === 'annual' ? 'white' : 'black' }} className=" px-6 py-2 font-bold" onClick={() => handlePeriodChange('annual')}>Annual</button>
                    </ButtonGroup>
                </div>
            </div>


            <div style={{ display: 'block', margin: 'auto', width: '80%' }}>
                <Grid container spacing={5} justifyContent="center">
                    {config.cards.map((card, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>

                                <div style={card.title === 'Pro' ? {position: 'relative', bottom: '1.5rem'} : {}}>
                            {
                                        card.title == 'Pro' ?
                                        <div className="card position-absolute">
                                            <div style={{ position: 'relative', bottom: '-13px' }} className=" text-center w-80 "><button style={{ borderRadius: '30px', background: '#1976d2', color: 'white' }} className="px-5">Most Popular</button></div>
                                        </div> : null }
                                        <Card className="w-80 h-100 display-flex align-items p-4 " style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            border: card.title == 'Pro' && '2px solid #1976d2',
                                            borderRadius: '12px',
                                            boxShadow: '0 0 6px 0px black'

                                        }}>
                                            <div>


                                                <CardContent>
                                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                        {card.title}
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        {`${card.price} /${card.period || 'month'}`}
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                                        {card.desc}
                                                    </Typography>
                                                    <Typography variant="body2" component="div">
                                                        {card.features.map((feature) => (
                                                            <div key={feature.feature}>  <span><CheckIcon /></span>{feature.feature}</div>
                                                        ))}
                                                    </Typography>

                                                </CardContent>
                                            </div>
                                            <div className=" text-center rounded py-1 "  >

                                                <Button variant="contained" >
                                                    <span className="px-14">{card.button}</span>
                                                </Button>
                                            </div>

                                        </Card>
                                    </div>

                        </Grid>
                    ))}
                </Grid>


            </div>

            <div className="p-6 md:p-8 rounded-2xl  max-w-5xl mx-auto my-8 md:my-15">
                <h1 className="text-lg md:text-3xl font-bold  mb-5 text-gray-900 text-center ">
                    {config.tableTitle}
                </h1>

                <TableComponent

                    headers={(config.table.headers)}
                    data={(config.table.data)}
                    styles={{
                        headerCell: {
                            color: "black",
                            textAlign: "left",
                            fontWeight: "bolder",
                        },
                        dataCell: {
                            textAlign: "center",
                        }
                    }}
                />


            </div>


            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto my-8 md:my-16">
                <h4 className="text-lg md:text-2xl font-bold mb-2 text-gray-900 text-center ">
                    {config.schoolTitle}
                </h4>
                <p className="text-sm text-gray-500 text-center mb-6">{config.schoolDesc}</p>

                <div style={{
                    display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'auto', scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none',
                }}>
                    <Grid container spacing={3} wrap="nowrap" justifyContent="center">
                        {config.schoolLogos.map((logo, key) => (
                            <Grid key={key} item xs={12} sm={6} md={4} sx={{ display: 'flex', flexShrink: 0 }}>
                                <Card className="flex-row items-center mx-2 my-5">

                                    <img src={logo} alt="" width="100px" className="w-40" />

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>

            </div>

            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto  ">

                <p className="text-sm text-gray-500 text-center mb-6">{config.principalFeedBack}</p>

                <h4 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 text-center ">
                    {config.principal}
                </h4>
                <p className="text-sm text-gray-500 text-center mb-6">{config.principalDesc}</p>

            </div>


            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto  ">


                <h4 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 text-center " style={{...config.frequentQuestions.styles?.titleStyle?.inlineStyle}}>
                    {config.frequentQuestions.title}
                </h4>
                {
                    config.frequentQuestions.items.map(
                        (question, key) => (
                          <DynamicRenderer key={key} config={question} />
                        )
                    )
                }


            </div>


            <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto  ">


                <h4 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 text-center ">
                    {config.transformSchool.title}
                </h4>
                <p className="text-sm text-gray-500 text-center mb-6">{config.transformSchool.desc}</p>

                <div className="w-full text-center">
                    <Button variant="contained" className="px-5 py-5">{config.transformSchool.button}</Button>

                </div>

            </div>


            

        </>
    )

}

export default Subscription;