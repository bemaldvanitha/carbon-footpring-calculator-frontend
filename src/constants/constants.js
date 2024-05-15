import obesity from '../assets/images/quiz/weight/obesity.png';
import overweight from '../assets/images/quiz/weight/overweight.png';
import underweight from '../assets/images/quiz/weight/underweight.png';
import normalWeight from '../assets/images/quiz/weight/normal-weight.png';

import male from '../assets/images/quiz/sex/male.png';
import female from '../assets/images/quiz/sex/female.png';

import fish from '../assets/images/quiz/diet/fish.png';
import meat from '../assets/images/quiz/diet/meat.png';
import broccoli from '../assets/images/quiz/diet/broccoli.png';
import salad from '../assets/images/quiz/diet/salad.png';

export const BODY_TYPES = [
    { value: "overweight", title: 'Over Weight', image: overweight },
    { value: "obese", title: 'Obese', image: obesity },
    { value: "underweight", title: 'Under Weight', image: underweight },
    { value: "normal", title: 'Normal weight', image: normalWeight },
]

export const SEX = [
    { value: "male", title: 'Male', image: male },
    { value: "female", title: 'Female', image: female },
]

export const DIET = [
    { value: "pescatarian", title: 'Pescatarian', image: fish },
    { value: "vegetarian", title: 'Vegetarian', image: salad },
    { value: "omnivore", title: 'Omnivore', image: meat },
    { value: "vegan", title: 'Vegan', image: broccoli },
]