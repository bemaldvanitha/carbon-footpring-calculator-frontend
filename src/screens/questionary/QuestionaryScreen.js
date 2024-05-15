import React, { useState } from 'react';

import QuestionContainer from "../../components/quiz/QuestionContainer";
import SingleChoiseQuestion from "../../components/quiz/SingleChoiseQuestion";
import { BODY_TYPES, SEX, DIET } from "../../constants/constants";

import './QuestionaryScreen.css';

const QuestionaryScreen = () => {
    const [formData, setFormData] = useState({
        body_type: "overweight",
        sex: "male",
        diet: "pescatarian",
        how_often_shower: "daily",
        heating_energy_source: "coal",
        transport: "public",
        vehicle_type: "petrol",
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
        </div>
    )
}

export default QuestionaryScreen;