import LocalizationData from "../redux/types/LocalizationData";

export default async function getLocalizationData(language: string) {
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