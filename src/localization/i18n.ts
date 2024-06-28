import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en/translations.json';
import translationES from './es/translations.json';
import translationPT from './pt/translations.json';
import i18next from "i18next";



const resources = {
    es: translationES,
    pt: translationPT,
    en: translationEN
}


i18next.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: resources,
        load: "languageOnly",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

    // const detectedLanguage = i18n.language;
    // console.log(detectedLanguage);
    

export default i18next;