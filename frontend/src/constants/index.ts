export {default as ROUTES} from './routes';
export {default as COLORS} from './palette';
export {default as IMAGES} from './assets';

//helpers options
export {default as ALLANGUAGES} from "./selectOptions/allLanguages";
export {default as ALLJOBSFIELDS} from './selectOptions/allJobsFields';
export {default as ALLJOBSSPECIALTIES} from './selectOptions/allJobsSpecialties';
export {session_time_options as AVAILABILITY_SESSION_OPTIONS, availability_options as AVAILABILITY_OPTIONS} from "./selectOptions/availablityTimeOptions";
export {default as USERS_TYPES_OPTIONS} from "./selectOptions/usersTypeOptions";
export {default as APP_THEME_OPTIONS} from "./selectOptions/appThemesOptions";
export {default as APP_LANGUAGES_OPTIONS} from "./selectOptions/appLanguagesOptions"; 

const USERTYPES = {ADMIN: 'admin',NOVICE: 'novice',EXPERT: 'expert'};
export { USERTYPES};