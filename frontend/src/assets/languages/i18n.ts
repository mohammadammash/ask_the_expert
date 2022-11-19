import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import french from "./french.json";

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', //for android
    lng: "en",
    fallbackLng: "en",
    resources: {
        english: english,
        french: french,
    },
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export default i18n;