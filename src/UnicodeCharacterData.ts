import Papa from "papaparse";
import * as fs from "fs";
import UnicodeCharacter from "./UnicodeCharacter";
import { GeneralCategory } from "./GeneralCategory";

const loadUnicodeData = () => {
    const unicodeFilePath =
        "C:\\Users\\irond\\Documents\\Coding\\CharacterPalette\\UnicodeData-2021-02-26.txt";
    console.debug(unicodeFilePath);

    let unparsedText = "";

    console.time("loadUnicodeData");
    unparsedText = fs.readFileSync(unicodeFilePath, {
        encoding: "utf-8",
    });

    const parseResult = Papa.parse<string[]>(unparsedText, {
        delimiter: ";",
        encoding: "utf-8",
        newline: "\n",
        header: false,
    });

    const preFilteredCharacters = parseResult.data.filter(line => {
        const generalCategoryCode = line[2];
        return !(
            generalCategoryCode in
            [
                <GeneralCategory>"Letter, Other",
                <GeneralCategory>"Other, Private Use",
                <GeneralCategory>"Other, Not Assigned",
            ]
        );
    });

    const parsedCharacters: UnicodeCharacter[] = parseResult.data.map(
        (line: string[]) => {
            let x = new UnicodeCharacter(
                line[0],
                line[1],
                line[2],
                parseInt(line[3]),
                line[4],
                line[5],
                line[6],
                line[7],
                line[8],
                line[9],
                line[10],
                line[11],
                line[12],
            );
            return x;
        },
    );

    console.timeEnd("loadUnicodeData");

    return parsedCharacters;
};

// loadUnicodeData();
export default loadUnicodeData;
