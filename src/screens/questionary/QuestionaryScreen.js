import React, { useState } from 'react';

import QuestionContainer from "../../components/quiz/QuestionContainer";
import SingleChoiseQuestion from "../../components/quiz/SingleChoiseQuestion";
import InputQuestion from "../../components/quiz/InputQuestion";
import { BODY_TYPES, SEX, DIET, SHOWER, HEATING, TRANSPORT, VEHICLE_TYPE, SOCIAL_ACTIVITY, AIR_TRAVEL,
    WASTE_BAG_SIZE } from "../../constants/constants";

import './QuestionaryScreen.css';

const QuestionaryScreen = () => {
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
        handleChange('monthly_grocery_bill', value);
    }

    const airTravelChangeHandler = (value) => {
        handleChange('frequency_of_travel_by_air', value);
    }

    const vehicleMonthlyDistanceChangeHandler = (value) => {
        handleChange('vehicle_monthly_distance', value);
    }

    const wasteBagSizeChangeHandler = (value) => {
        handleChange('waste_bag_size', value);
    }

    const wasteBagCountChangeHandler = (value) => {
        handleChange('waste_bag_count', value);
    }

    const tvDailyHoursChangeHandler = (value) => {
        handleChange('tv_pc_daily_hour', value);
    }

    const newClothsMonthlyChangeHandler = (value) => {
        handleChange('new_cloths_monthly', value);
    }

    const internetDailyHourChangeHandler = (value) => {
        handleChange('internet_daily_hours', value);
    }

    return(
        <div className={'questionary-screen'}>
            <p>Answer these questions to calculate your carbon footprint</p>
            <QuestionContainer>
                <SingleChoiseQuestion title={'1). Body Type'} value={formData.body_type} isError={formDataError.body_type_error}
                    onChangeValue={bodyTypeChangeHandler} options={BODY_TYPES} errorMessage={'Please select your body type'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'2). Sex'} value={formData.sex} isError={formDataError.sex_error}
                                      onChangeValue={sexChangeHandler} options={SEX} errorMessage={'Please select your sex'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'3). Diet'} value={formData.diet} isError={formDataError.diet_error}
                                      onChangeValue={dietChangeHandler} options={DIET} errorMessage={'Please select your diet'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'4). How Often Shower'} value={formData.how_often_shower}
                                      isError={formDataError.how_often_shower_error} onChangeValue={showerChangeHandler}
                                      options={SHOWER} errorMessage={'Please select your how often shower'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'5). Heating Energy Source'} value={formData.heating_energy_source}
                                      isError={formDataError.heating_energy_source_error} onChangeValue={heatingChangeHandler}
                                      options={HEATING} errorMessage={'Please select your heating energy source'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'6). Transport Mode'} value={formData.transport}
                                      isError={formDataError.transport_error} onChangeValue={transportChangeHandler}
                                      options={TRANSPORT} errorMessage={'Please select your transport mode'}/>
            </QuestionContainer>
            {formData.transport === 'private' && <QuestionContainer>
                <SingleChoiseQuestion title={'7). Vehicle Type'} value={formData.vehicle_type}
                                      isError={formDataError.vehicle_type_error} onChangeValue={vehicleTypeChangeHandler}
                                      options={VEHICLE_TYPE} errorMessage={'Please select your vehicle type'}/>
            </QuestionContainer>}
            <QuestionContainer>
                <SingleChoiseQuestion title={'8). Social Activity Level'} value={formData.social_activity}
                                      isError={formDataError.social_activity_error} onChangeValue={socialActivityChangeHandler}
                                      options={SOCIAL_ACTIVITY} errorMessage={'Please select social activity level'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'9). Monthly Grocery bill'} value={formData.monthly_grocery_bill}
                               onChangeValue={monthlyBillChangeHandler} isError={formDataError.monthly_grocery_bill_error}
                               errorMessage={'Please Enter your monthly grocery bill amount'}
                               placeholder={'Enter monthly grocery bill amount'}/>
            </QuestionContainer>
            <QuestionContainer>
                <SingleChoiseQuestion title={'10). Frequency of Traveling by Air'} value={formData.frequency_of_travel_by_air}
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
                                      isError={formDataError.waste_bag_size_error} onChangeValue={wasteBagSizeChangeHandler}
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
                               onChangeValue={newClothsMonthlyChangeHandler} isError={formDataError.new_cloths_monthly_error}
                               errorMessage={'Please Enter purchased new cloths per month'}
                               placeholder={'Enter purchased new cloths per month'}/>
            </QuestionContainer>
            <QuestionContainer>
                <InputQuestion title={'16). How many hour do you use internet daily'} value={formData.internet_daily_hours}
                               onChangeValue={internetDailyHourChangeHandler} isError={formDataError.internet_daily_hours_error}
                               errorMessage={'Please Enter how many hour do you use internet'}
                               placeholder={'How many hour do you use internet'}/>
            </QuestionContainer>
        </div>
    )
}

export default QuestionaryScreen;