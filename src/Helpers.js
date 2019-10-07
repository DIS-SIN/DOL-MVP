import Title from 'title';
import TitleFR from 'titlecase-french';
const SpecialTitlePhrases = require("./languages/SpecialTitlePhrases.json");

export function titleCase(text, language) {
    return JSON.parse(localStorage.langIsEnglish) ? Title(text, SpecialTitlePhrases) : TitleFR.convert(text);
}

export function getContentType(format) {
    let contentType = format.toLowerCase();
    switch (contentType) {
        case "read":
            return "read";
            break;
        case "use":
            return "read";
            break;
        case "participate":
            return "course";
            break;
        case "watch":
            return "watch";
            break;
        case "listen":
            return "listen";
            break;
        default:
            return "read";
            break;
    }
}