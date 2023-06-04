import LocalizationData from "../redux/types/LocalizationData";
import SupportedLocale from "../redux/types/SupportedLocale";

/**
 * 
 * @param language is the locale string, which will be substituted into the url like this: /lang/${language}.json
 * @returns the language data if successful, or throws an error
 */
export default async function getLocalizationData(language: SupportedLocale) {
    try {
        const response = await fetch(`/lang/${language}.json`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
    
        const data = await response.json();

        return data as LocalizationData;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}