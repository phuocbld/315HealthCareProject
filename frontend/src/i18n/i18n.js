import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../locales/eng/translation";
import Vietnamese from "../locales/vie/translation";
import China from "../locales/chi/translation"


const resources = {
    eng: {
        translation: English,
    },
    vie: {
        translation: Vietnamese,
    },
    chi: {
        translation: China,
    },

};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "vie", // Ngôn ngữ mặc định
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;