import Papa, { parse } from "papaparse";
import * as fs from "fs";
import UnicodeCharacter from "./UnicodeCharacter";
import { GeneralCategory } from "./GeneralCategory";
import { writeFileSync } from "fs";

export const loadUnicodeCharacters = () => {
    const filePath =
        "C:\\Users\\irond\\Documents\\Coding\\CharacterPalette\\unicodeData\\UnicodeData-2021-02-26.txt";

    console.time("loadUnicodeCharacters");
    const unparsedText = fs.readFileSync(filePath, {
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

    const mappedAliases = loadUnicodeAliases();

    const parsedCharacters: UnicodeCharacter[] = parseResult.data.map(
        (line: string[]) => {
            let x = new UnicodeCharacter(
                line[0],
                line[1],
                line[2],
                // parseInt(line[3]),
                // line[4],
                // line[5],
                // line[6],
                // line[7],
                // line[8],
                // line[9],
                // line[10],
                // line[11],
                // line[12],
                mappedAliases.find(x => x.code === line[0])?.aliases ?? [],
            );
            return x;
        },
    );

    console.timeEnd("loadUnicodeCharacters");
    return parsedCharacters;
};

export const loadUnicodeAliases = () => {
    const filePath =
        "C:\\Users\\irond\\Documents\\Coding\\CharacterPalette\\unicodeData\\NamesListPreProcessed.txt";

    console.time("loadUnicodeAliases");
    const unparsedText = fs.readFileSync(filePath, {
        encoding: "utf-8",
    });

    const parseResult = Papa.parse<string[]>(unparsedText, {
        delimiter: "|",
        encoding: "utf-8",
        newline: "\n",
        header: false,
    });

    const results = parseResult.data.map(charLine => {
        let code: string;
        let aliases: string[];
        [code, ...aliases] = charLine;

        return { code: code, aliases: aliases };
    });

    console.timeEnd("loadUnicodeAliases");
    return results;
};

const saveParsedData = () => {
    const parsedData = loadUnicodeCharacters();
    const path =
        "C:\\Users\\irond\\Documents\\Coding\\CharacterPalette\\unicodeData\\ParsedCharacters.txt";

    writeFileSync(path, JSON.stringify(parsedData));
};

export const loadParsedData = () => {
    console.time("loadParsedData");
    const path =
        "C:\\Users\\irond\\Documents\\Coding\\CharacterPalette\\unicodeData\\ParsedCharacters.txt";

    const json = fs.readFileSync(path, { encoding: "utf-8" });

    console.time("deserializing");
    const parsedCharacters: UnicodeCharacter[] = JSON.parse(json).map(
        (x: any) =>
            new UnicodeCharacter(x.code, x.name, x.generalCategory, x.aliases),
    );
    console.timeEnd("deserializing");

    console.timeEnd("loadParsedData");
    return parsedCharacters;
};
