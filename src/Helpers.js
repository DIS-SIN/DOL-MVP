import Title from 'title';
import TitleFR from 'titlecase-french';
const SpecialTitlePhrases = require("./languages/SpecialTitlePhrases.json");

export function titleCase(text, language) {
    return language.language == "English" ? Title(text, SpecialTitlePhrases) : TitleFR.convert(text);
}