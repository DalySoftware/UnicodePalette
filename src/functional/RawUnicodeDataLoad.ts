import Papa from "papaparse";
import * as fs from "fs";
import * as path from "path";
import UnicodeCharacter from "../classes/UnicodeCharacter";
import { promises } from "fs";
import { GeneralCategory } from "../other/GeneralCategory";

const unicodeDataTxtFilePath = path.join(
    __dirname,
    "..",
    "..",
    "rawData",
    "UnicodeData.txt",
);

const partProceesedNamesListFilePath = path.join(
    __dirname,
    "..",
    "..",
    "rawData",
    "NamesListPartProcessed.txt",
);

const processedNamesListFilePath = path.join(
    __dirname,
    "..",
    "..",
    "unicodeData",
    "NamesListPreProcessed.txt",
);

export const loadUnicodeCharacters = async () => {
    console.time("loadUnicodeCharacters");
    const unparsedText = await promises.readFile(unicodeDataTxtFilePath, {
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

    let parsedCharacters: UnicodeCharacter[] = preFilteredCharacters.map(
        (line: string[]) => {
            let x = new UnicodeCharacter(
                line[0],
                line[1],
                line[2],
                mappedAliases.find(x => x.code === line[0])?.aliases ?? [],
            );
            
            return x;
        },
    );

    parsedCharacters = parsedCharacters.filter(c => !!c.code);

    console.timeEnd("loadUnicodeCharacters");
    return parsedCharacters;
};

export const loadUnicodeAliases = () => {
    console.time("loadUnicodeAliases");
    const unparsedText = fs.readFileSync(processedNamesListFilePath, {
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

export const processNamesList = () => {
    console.time("processNamesList");

    const partProcessed = fs.readFileSync(partProceesedNamesListFilePath, {
        encoding: "utf-8",
    });

    const parseResult = Papa.parse<string[]>(partProcessed, {
        delimiter: "\t",
        encoding: "utf-8",
        newline: "\n",
        header: false,
    });

    var charDict : { [code: string]: string } = {};

    console.log("building charDict");
    console.timeLog("processNamesList");

    for (const [code, nameOrAlias] of parseResult.data) {

        if (!code || !nameOrAlias) {
            continue;
        }

        const trimmedNameOrAlias = nameOrAlias.replace(/\r?\n|\r/g, "");

        const existingEntry = charDict[code];

        if (existingEntry) {
            charDict[code] = existingEntry + "|" + trimmedNameOrAlias;
            continue;
        }
        
        charDict[code] = trimmedNameOrAlias;
    };

    console.log("built charDict");
    console.timeLog("processNamesList");

    const linesToWrite = Object
        .entries(charDict)
        .map((keyValue) => keyValue[0] + "|" + keyValue[1])
        .sort();
    const fileContent = linesToWrite.join("\r\n");

    fs.writeFileSync(processedNamesListFilePath, fileContent);

    console.timeEnd("processNamesList");
};