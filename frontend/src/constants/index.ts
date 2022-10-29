import ROUTES from './routes';
import COLORS from './palette';
import IMAGES from './assets';
const USERTYPES = {
    ADMIN: 'admin',
    NOVICE: 'novice',
    EXPERT: 'expert',
}

import ALLANGUAGES from './helpers/allLanguages';
import ALLJOBSFIELDS from './helpers/allJobsFields';
import ALLJOBSSPECIALTIES from './helpers/allJobsSpecialties';
import {session_time_options as AVAILABILITY_SESSION_OPTIONS, availability_options as AVAILABILITY_OPTIONS} from "./helpers/availablityTimeOptions";
import USERS_TYPES_OPTIONS from "./helpers/usersTypeOptions";

export {ROUTES, COLORS, IMAGES, USERTYPES, ALLANGUAGES, ALLJOBSFIELDS,ALLJOBSSPECIALTIES, AVAILABILITY_OPTIONS, AVAILABILITY_SESSION_OPTIONS, USERS_TYPES_OPTIONS};