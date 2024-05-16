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

import dailyShower from '../assets/images/quiz/shower/dailyShower.png';
import lessShower from '../assets/images/quiz/shower/lessShower.png';
import moreShower from '../assets/images/quiz/shower/moreShower.png';
import twiseShower from '../assets/images/quiz/shower/twiseShower.png';

import coal from '../assets/images/quiz/heating/coal.png';
import electricity from '../assets/images/quiz/heating/electricity.png';
import gas from '../assets/images/quiz/heating/natural-gas.png';
import wood from '../assets/images/quiz/heating/wood.png';

import bus from '../assets/images/quiz/transport/bus.png';
import walking from '../assets/images/quiz/transport/walking.png';
import personalCar from '../assets/images/quiz/transport/personalCar.png';

import dieselCar from '../assets/images/quiz/vehicle-type/dieselCar.png';
import electricCar from '../assets/images/quiz/vehicle-type/electricCar.png';
import hybridCar from '../assets/images/quiz/vehicle-type/hybridCar.png';
import lpgCar from '../assets/images/quiz/vehicle-type/lpgCar.png';
import petrolCar from '../assets/images/quiz/vehicle-type/petrolCar.png';

import neverSocial from '../assets/images/quiz/social-activity/neverSocial.png';
import sometimesSocial from '../assets/images/quiz/social-activity/sometimesSocial.png';
import oftenSocial from '../assets/images/quiz/social-activity/oftenSocial.png';

import frquentlyAir from '../assets/images/quiz/air-travel/frquentlyAir.png';
import neverAir from '../assets/images/quiz/air-travel/neverAir.png';
import oftenAir from '../assets/images/quiz/air-travel/oftenAir.png';
import rarelyAir from '../assets/images/quiz/air-travel/rarelyAir.png';

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

export const SHOWER = [
    { value: "daily", title: 'Daily', image: dailyShower },
    { value: "less frequently", title: 'Less frequently', image: lessShower },
    { value: "more frequently", title: 'More frequently', image: moreShower },
    { value: "twice a day", title: 'twice a day', image: twiseShower },
]

export const HEATING = [
    { value: "coal", title: 'Coal', image: coal },
    { value: "natural gas", title: 'Natural gas', image: gas },
    { value: "wood", title: 'Wood', image: wood },
    { value: "electricity", title: 'Electricity', image: electricity },
]

export const TRANSPORT = [
    { value: "public", title: 'Public', image: bus },
    { value: "walk/bicycle", title: 'Walk/Bicycle', image: walking },
    { value: "private", title: 'Private', image: personalCar },
]

export const VEHICLE_TYPE = [
    { value: "petrol", title: 'Petrol car', image: petrolCar },
    { value: "diesel", title: 'Diesel car', image: dieselCar },
    { value: "hybrid", title: 'Hybrid car', image: hybridCar },
    { value: "lpg", title: 'Lpg car', image: lpgCar },
    { value: "electric", title: 'Electric car', image: electricCar },
]

export const SOCIAL_ACTIVITY = [
    { value: "often", title: 'Often', image: oftenSocial },
    { value: "never", title: 'Never', image: neverSocial },
    { value: "sometimes", title: 'Sometimes', image: sometimesSocial },
]

export const AIR_TRAVEL = [
    { value: "frequently", title: 'Frequently', image: frquentlyAir },
    { value: "rarely", title: 'Rarely', image: rarelyAir },
    { value: "never", title: 'Never', image: neverAir },
    { value: "very frequently", title: 'Very frequently', image: oftenAir },
]