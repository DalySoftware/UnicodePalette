import Papa from "papaparse";
import * as fs from "fs";
import * as path from "path";
import UnicodeCharacter from "./UnicodeCharacter";
import { promises } from "fs";
import { GeneralCategory } from "./GeneralCategory";

const unicodeDataTxtFilePath = path.join(
    __dirname,
    "..",
    "rawData",
    "UnicodeData-2021-02-26.txt",
);

const processedNamesListFilePath = path.join(
    __dirname,
    "..",
    "raw",
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

    const parsedCharacters: UnicodeCharacter[] = preFilteredCharacters.map(
        (line: string[]) => {
            let x = new UnicodeCharacter(
                line[0],
                line[1],
                line[2],
                mappedAliases.find(x => x.code === line[0])?.aliases ?? [],
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
            );
            return x;
        },
    );

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
