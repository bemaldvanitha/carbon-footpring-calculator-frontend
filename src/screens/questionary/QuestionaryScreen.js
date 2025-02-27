import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { message } from "antd";

import QuestionContainer from "../../components/quiz/QuestionContainer";
import SingleChoiseQuestion from "../../components/quiz/SingleChoiseQuestion";
import InputQuestion from "../../components/quiz/InputQuestion";
import CustomButton from "../../components/common/CustomButton";
import { BODY_TYPES, SEX, DIET, SHOWER, HEATING, TRANSPORT, VEHICLE_TYPE, SOCIAL_ACTIVITY, AIR_TRAVEL,
    WASTE_BAG_SIZE, ENERGY_EFFICIENTLY, RECYCLE, COOKING_WITH } from "../../constants/constants";
import { useCalculateMutation } from "../../slicers/calculatorSlice";

import './QuestionaryScreen.css';

const QuestionaryScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        body_type: "overweight",
        sex: "male",
        diet: "pescatarian",
        how_often_shower: "daily",
        heating_energy_source: "coal",
        transport: "public",
        vehicle_type: "empty",
        social_activity: "often",
        monthly_grocery_bill: 0,
        frequency_of_travel_by_air: "frequently",
        vehicle_monthly_distance: 0,
        waste_bag_size: "large",
        waste_bag_count: 0,
        tv_pc_daily_hour: 0,
        new_cloths_monthly: 0,
        internet_daily_hours: 0,
        energy_efficiency: "Yes",
        recycling: [],
        cooking_with: []
    });
    const [formDataError, setFormDataError] = useState({
        body_type_error: false,
        sex_error: false,
        diet_error: false,
        how_often_shower_error: false,
        heating_energy_source_error: false,
        transport_error: false,
        vehicle_type_error: false,
        social_activity_error: false,
        monthly_grocery_bill_error: false,
        frequency_of_travel_by_air_error: false,
        vehicle_monthly_distance_error: false,
        waste_bag_size_error: false,
        waste_bag_count_error: false,
        tv_pc_daily_hour_error: false,
        new_cloths_monthly_error: false,
        internet_daily_hours_error: false,
        energy_efficiency_error: false,
        recycling_error: false,
        cooking_with_error: false
    });

    const [calculate, { isLoading }] = useCalculateMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const bodyTypeChangeHandler = (value) => {
        handleChange('body_type', value)
    }

    const sexChangeHandler = (value) => {
        handleChange('sex', value);
    }

    const dietChangeHandler = (value) => {
        handleChange('diet', value);
    }

    const showerChangeHandler = (value) => {
        handleChange('how_often_shower', value);
    }

    const heatingChangeHandler = (value) => {
        handleChange('heating_energy_source', value);
    }

    const transportChangeHandler = (value) => {
        handleChange('transport', value);
        if(value !== 'private'){
            handleChange('vehicle_type', 'empty');
            handleChange('vehicle_monthly_distance', 0);
        }
    }

    const vehicleTypeChangeHandler = (value) => {
        handleChange('vehicle_type', value);
    }

    const socialActivityChangeHandler = (value) => {
        handleChange('social_activity', value);
    }

    const monthlyBillChangeHandler = (value) => {
        handleChange('monthly_grocery_bill', parseInt(value));
    }

    const airTravelChangeHandler = (value) => {
        handleChange('frequency_of_travel_by_air', value);
    }

    const vehicleMonthlyDistanceChangeHandler = (value) => {
        handleChange('vehicle_monthly_distance', parseInt(value));
    }

    const wasteBagSizeChangeHandler = (value) => {
        handleChange('waste_bag_size', value);
    }

    const wasteBagCountChangeHandler = (value) => {
        handleChange('waste_bag_count', parseInt(value));
    }

    const tvDailyHoursChangeHandler = (value) => {
        handleChange('tv_pc_daily_hour', parseInt(value));
    }

    const newClothsMonthlyChangeHandler = (value) => {
        handleChange('new_cloths_monthly', parseInt(value));
    }

    const internetDailyHourChangeHandler = (value) => {
        handleChange('internet_daily_hours', parseInt(value));
    }

    const energyEfficiencyChangeHandler = (value) => {
        handleChange('energy_efficiency', value);
    }

    const recyclingChangeHandler = (value) => {
        let currentRecycling = formData.recycling;
        let recyclingIdx = currentRecycling.findIndex(recycle => recycle === value);
        if(recyclingIdx === -1){
            currentRecycling.push(value);
        }else{
            currentRecycling.splice(recyclingIdx, 1);
        }
        handleChange('recycling', currentRecycling);
    }

    const cookingChangeHandler = (value) => {
        let currentCooking = formData.cooking_with;
        let cookingIdx = currentCooking.findIndex(cooking => cooking === value);
        if(cookingIdx === -1){
            currentCooking.push(value);
        }else{
            currentCooking.splice(cookingIdx, 1);
        }
        handleChange('cooking_with', currentCooking);
    }

    const submitHandler = async () => {
        setFormDataError({
            body_type_error: false,
            sex_error: false,
            diet_error: false,
            how_often_shower_error: false,
            heating_energy_source_error: false,
            transport_error: false,
            vehicle_type_error: false,
            social_activity_error: false,
            monthly_grocery_bill_error: false,
            frequency_of_travel_by_air_error: false,
            vehicle_monthly_distance_error: false,
            waste_bag_size_error: false,
            waste_bag_count_error: false,
            tv_pc_daily_hour_error: false,
            new_cloths_monthly_error: false,
            internet_daily_hours_error: false,
            energy_efficiency_error: false,
            recycling_error: false,
            cooking_with_error: false
        });

        const groceryBillValidity = formData.monthly_grocery_bill <= 0
        const driveDistanceValidity = formData.transport === 'private' && formData.vehicle_monthly_distance <= 0
        const wasteBagValidity = formData.waste_bag_count <= 0;
        const tvHourValidity = formData.tv_pc_daily_hour <= 0;
        const clothValidity = formData.new_cloths_monthly <= 0;
        const internetHourValidity = formData.internet_daily_hours <= 0;
        const vehicleTypeValidity = formData.transport === 'private' && formData.vehicle_type === ''

        if(groceryBillValidity || driveDistanceValidity || wasteBagValidity ||tvHourValidity ||clothValidity || internetHourValidity){
            setFormDataError({
                body_type_error: false,
                sex_error: false,
                diet_error: false,
                how_often_shower_error: false,
                heating_energy_source_error: false,
                transport_error: false,
                vehicle_type_error: vehicleTypeValidity,
                social_activity_error: false,
                monthly_grocery_bill_error: groceryBillValidity,
                frequency_of_travel_by_air_error: false,
                vehicle_monthly_distance_error: driveDistanceValidity,
                waste_bag_size_error: false,
                waste_bag_count_error: wasteBagValidity,
                tv_pc_daily_hour_error: tvHourValidity,
                new_cloths_monthly_error: clothValidity,
                internet_daily_hours_error: internetHourValidity,
                energy_efficiency_error: false,
                recycling_error: false,
                cooking_with_error: false
            });
            message.warning('Please fill missing fields!')
        }else {
            try {
                const res = await calculate(formData).unwrap();
                const userId = res.data.user_id;

                message.success(res?.message);
                navigate(`/signup?user=${userId}`)
            }catch (error){
                message.error(error?.data?.message);
            }
        }
    }

    return(
        <div className={'questionary-screen'}>
            <div className={'questionary-screen-header'}>
                <p className={'questionary-screen-title'}>Carboon</p>
                <p className={'questionary-screen-text'}>Answer these questions to calculate your carbon footprint</p>
            </div>
            <QuestionContainer>
                <SingleChoiseQuestion title={'1). Select Your Body Type'} value={formData.body_type}
                                      isError={formDataError.body_type_error}
                                      onChangeValue={bodyTypeChangeHandler} options={BODY_TYPES}
                                      errorMessage={'Please select your body type'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'2). Select Your Gender'} value={formData.sex} isError={formDataError.sex_error}
                                      onChangeValue={sexChangeHandler} options={SEX}
                                      errorMessage={'Please select your sex'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'3). Dietary Plan'} value={formData.diet} isError={formDataError.diet_error}
                                      onChangeValue={dietChangeHandler} options={DIET}
                                      errorMessage={'Please select your diet'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'4). How Often Do You Shower'} value={formData.how_often_shower}
                                      isError={formDataError.how_often_shower_error} onChangeValue={showerChangeHandler}
                                      options={SHOWER} errorMessage={'Please select your how often shower'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'5). Heating Energy Source Of House'} value={formData.heating_energy_source}
                                      isError={formDataError.heating_energy_source_error}
                                      onChangeValue={heatingChangeHandler}
                                      options={HEATING} errorMessage={'Please select your heating energy source'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'6). Transport Method To Work'} value={formData.transport}
                                      isError={formDataError.transport_error} onChangeValue={transportChangeHandler}
                                      options={TRANSPORT} errorMessage={'Please select your transport mode'}/>
            </QuestionContainer>
            {formData.transport === 'private' && <QuestionContainer>
                <SingleChoiseQuestion title={'7). Vehicle Type'} value={formData.vehicle_type}
                                      isError={formDataError.vehicle_type_error}
                                      onChangeValue={vehicleTypeChangeHandler}
                                      options={VEHICLE_TYPE} errorMessage={'Please select your vehicle type'}/>
            </QuestionContainer>}
            <QuestionContainer>
                <SingleChoiseQuestion title={'8). Social Activity Level'} value={formData.social_activity}
                                      isError={formDataError.social_activity_error}
                                      onChangeValue={socialActivityChangeHandler}
                                      options={SOCIAL_ACTIVITY} errorMessage={'Please select social activity level'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'9). Monthly Grocery Bill'} value={formData.monthly_grocery_bill}
                               onChangeValue={monthlyBillChangeHandler}
                               isError={formDataError.monthly_grocery_bill_error}
                               errorMessage={'Please Enter your monthly grocery bill amount'}
                               placeholder={'Enter monthly grocery bill amount'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'10). Frequency of Traveling by Air'}
                                      value={formData.frequency_of_travel_by_air}
                                      isError={formDataError.frequency_of_travel_by_air_error}
                                      onChangeValue={airTravelChangeHandler} options={AIR_TRAVEL}
                                      errorMessage={'Please select air travel frequency'}/>
            </QuestionContainer>
            {formData.transport === 'private' && <QuestionContainer>
                <InputQuestion title={'11). Vehicle Monthly Distance'} value={formData.vehicle_monthly_distance}
                               onChangeValue={vehicleMonthlyDistanceChangeHandler}
                               isError={formDataError.vehicle_monthly_distance_error}
                               errorMessage={'Please Enter your vehicle monthly distance'}
                               placeholder={'Enter monthly your vehicle monthly distance'}/>
            </QuestionContainer>}
            <QuestionContainer>
                <SingleChoiseQuestion title={'12). Waste Bag Size'} value={formData.waste_bag_size}
                                      isError={formDataError.waste_bag_size_error}
                                      onChangeValue={wasteBagSizeChangeHandler}
                                      options={WASTE_BAG_SIZE} errorMessage={'Please select waste bag size'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'13). Waste bag count per week'} value={formData.waste_bag_count}
                               onChangeValue={wasteBagCountChangeHandler} isError={formDataError.waste_bag_count_error}
                               errorMessage={'Please Enter your waste bag count per week'}
                               placeholder={'Enter your waste bag count per week'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'14). how many hours use Tv/Pc daily'} value={formData.tv_pc_daily_hour}
                               onChangeValue={tvDailyHoursChangeHandler} isError={formDataError.tv_pc_daily_hour_error}
                               errorMessage={'Please Enter your Tv/Pc daily hour count'}
                               placeholder={'Enter your Tv/Pc daily hour count'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'15). Purchased new cloths per month'} value={formData.new_cloths_monthly}
                               onChangeValue={newClothsMonthlyChangeHandler}
                               isError={formDataError.new_cloths_monthly_error}
                               errorMessage={'Please Enter purchased new cloths per month'}
                               placeholder={'Enter purchased new cloths per month'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'16). How many hour do you use internet daily'}
                               value={formData.internet_daily_hours}
                               onChangeValue={internetDailyHourChangeHandler}
                               isError={formDataError.internet_daily_hours_error}
                               errorMessage={'Please Enter how many hour do you use internet'}
                               placeholder={'How many hour do you use internet'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'17). Energy efficiency'} value={formData.energy_efficiency}
                                      isError={formDataError.energy_efficiency_error}
                                      onChangeValue={energyEfficiencyChangeHandler}
                                      options={ENERGY_EFFICIENTLY}
                                      errorMessage={'Please select energy efficiency rate'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'18). Recycling Materials'} value={formData.recycling}
                                      isError={formDataError.recycling_error} onChangeValue={recyclingChangeHandler}
                                      options={RECYCLE} errorMessage={'Please select recycle materials'}
                                      isMultiple={true}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'19). Cooking Methods'} value={formData.cooking_with}
                                      isError={formDataError.cooking_with_error} onChangeValue={cookingChangeHandler}
                                      options={COOKING_WITH} errorMessage={'Please select cooking method'}
                                      isMultiple={true}/>
            </QuestionContainer>
            <div className={'questionary-screen-button-container'}>
                <CustomButton title={'Calculate your carbon credit'} onClick={submitHandler} fontColor={'#f0f0f0'}
                              bgColor={'#41B06E'}/>
            </div>
        </div>
    )
}

export default QuestionaryScreen;