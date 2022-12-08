import React, { useState } from 'react';
import '../landing/components/TopPage.scss';
import "./SalesPage.scss"
import Viewer from '../landing/components/Globe';
import MidPage from '../landing/components/MidPage';
import { Input, Tooltip, TextInput, Button } from '@mantine/core';
import { IconAt, IconAlertCircle } from '@tabler/icons';
import { useForm } from '@mantine/form';



export default function SalesPage() {
    const [focused, setFocused] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = (values: any) => {
        console.log(values)
        setHasSubmitted(true)
    };

    const form = useForm({
        initialValues: {
            email: '',
            message: ''
        }
    });

    return (
        <div className='salespage-container'>
            <div className='salespage-left'>
                <div className='salespage-content'>
                    <h1>Did you think trailss was only for consumers?</h1>
                    <a>Think again… </a>
                    <h2>Start sharing company values with your customers through the trailss platform. </h2>
                    <p>In 2022, the consumer is very conscious about the rising CO2 emissions. To be their #1 choice you don't only have to have the best product, you also have to align with their values. </p>
                    <p>Not only can you manage your fleets of vehicles, manage emissions of company trips, but you can also share certificates of how you are handling your emissions compared to other businesses.</p>
                    <a><p>Contact us through the form below, for a free consultation about how trailss can help your customers understand your values</p></a>

                    {
                        hasSubmitted ?
                            (
                                <div className='submission-message'>
                                    <hr className='rounded'></hr>
                                    <h2>Thank you! You will hear from us shortly</h2>
                                </div>
                            ) : (
                                <form className="form" onSubmit={form.onSubmit((values) => { handleSubmit(values) })}>
                                    <Input.Wrapper label="Type Your Email Here">
                                        <Input
                                            icon={<IconAt />}
                                            rightSection={
                                                <Tooltip label="This is the email we will contact you on" position="top-end" withArrow>
                                                    <div>
                                                        <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />
                                                    </div>
                                                </Tooltip>
                                            }
                                            {...form.getInputProps('email')}
                                        />
                                    </Input.Wrapper>
                                    <TextInput
                                        label="Write Your Message Here"
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        inputContainer={(children) => (
                                            <Tooltip label="Please type everything you think is relevant to your application" position="top-start" opened={focused}>
                                                {children}
                                            </Tooltip>
                                        )}
                                        {...form.getInputProps('message')}
                                    />

                                    <Button type="submit">Get Your Free Consultation</Button>
                                </form>
                            )
                    }


                </div>
            </div>
            <div className='salespage-right'>
                <Viewer />
            </div>
        </div>
    );
}
