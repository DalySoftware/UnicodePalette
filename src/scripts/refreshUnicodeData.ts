import { downloadRawData } from "../functional/DownloadRawData";
import { processNamesList, loadUnicodeCharacters } from "../functional/RawUnicodeDataLoad";
import { saveParsedData } from "../functional/CharacterDataLoad";

// This file can be run with:
// npx ts-node src/scripts/refreshUnicodeData.ts 

downloadRawData("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
downloadRawData("https://www.unicode.org/Public/UCD/latest/ucd/NamesList.txt");

// To convert NamesList to NamesListPreProcessed, do a bunch of manual filtering in Excel

processNamesList();

loadUnicodeCharacters().then(chars => {
    saveParsedData(chars);
});
