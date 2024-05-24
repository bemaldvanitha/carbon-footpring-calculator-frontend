import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from "react-router";
import {message, Spin} from "antd";

import {useFetchCarbonCreditsQuery, usePayAmountMutation} from "../../slicers/paymentSlice";
import { useFetchUserQuery } from "../../slicers/userSlice";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import './PaymentScreen.css';
import {useFetchSingleProjectQuery} from "../../slicers/projectSlice";

const PaymentScreen = () => {
    const projectId = useParams().id;
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const [user, setUser] = useState({});
    const [project, setProject] = useState({});
    const [amount, setAmount] = useState(0);

    const [amountError, setAmountError] = useState(false);

    const { data: userData, isLoading: userLoading, error: userError } = useFetchUserQuery();
    const [payAmount, { isLoading: payAmountIsLoading }] = usePayAmountMutation();
    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchSingleProjectQuery(projectId);
    const { data: ccData, isLoading: ccIsLoading, error: ccError } = useFetchCarbonCreditsQuery();

    useEffect(() => {
        if(userData?.data && ccData?.data){
            setUser({...userData?.data, ...ccData?.data});
        }

        if(projectData?.data){
            setProject(projectData?.data);
        }
    }, [userData, projectData, ccData]);

    const cardElementOptions = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#8898AA',
                },
                ':-webkit-autofill': {
                    color: '#fce883',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    const amountHandler = (e) => {
        setAmount(e.target.value);
    }

    const paymentHandler = async () => {
        const amountValidity = parseInt(amount.toString()) > 0;

        setAmountError(false);

        if(amountValidity){
            if (!stripe || !elements) {
                return;
            }

            const cardElement = elements.getElement(CardElement);
            const userEmail = user?.email;
            const { error, token } = await stripe.createToken(cardElement, { userEmail });

            if (error) {
                message.error(error.message);
            } else {
                try{
                    const res = payAmount({
                        project_id: parseInt(projectId),
                        amount: parseFloat(amount),
                        token: {
                            id: token?.id,
                            email: userEmail
                        }
                    });
                    message.success(res?.message);
                    navigate('/dashboard');
                }catch (err){
                    message.error(err?.data?.message);
                }
            }
        }else {
            setAmountError(!amountValidity);
        }
    }

    const calculateRemainingOffsetByThisProjectDonationAmount = () => {
        const remainingNeededCC = parseFloat(user?.carbon_emission) - parseFloat(user?.current_offset);
        const projectRemainingCC = (parseInt(project?.total_carbon_credits) - parseInt(project?.allocated_carbon_credit)) *
            parseFloat(project?.offset_rate);
        if(projectRemainingCC > remainingNeededCC){
            let cCPerDollar = 2;
            return (remainingNeededCC * cCPerDollar).toFixed(2);
        }else {
            return projectRemainingCC.toFixed(2);
        }
    }

    if(payAmountIsLoading || userLoading || projectIsLoading || ccIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return (
            <div className={'payment-screen'}>
                <div className={'payment-screen-container'}>
                    <p className={'payment-screen-header'}>Payment</p>
                    <p className={'payment-screen-description'}>Donate ${calculateRemainingOffsetByThisProjectDonationAmount()} to offset
                        your carbon credits</p>
                    <CustomInput type={'number'} id={'amount'} title={'Amount'} placeholder={'Enter amount'} isError={amountError}
                                 errorMessage={'Enter valid amount'} value={amount} onChangeHandle={amountHandler}/>
                    <div className={'payment-screen-pay-container'}>
                        <CardElement options={cardElementOptions}/>
                    </div>
                    <div className={'payment-screen-button-container'}>
                        <CustomButton title={'Pay Now'} onClick={paymentHandler} fontColor={'#f0f0f0'} bgColor={'#FFC94A'}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default PaymentScreen;
