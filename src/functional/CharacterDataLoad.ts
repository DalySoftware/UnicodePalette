import * as avro from "avsc";
import * as path from "path";
import UnicodeCharacter from "../classes/UnicodeCharacter";

const avroFilePath = path.join(
    __dirname,
    "..",
    "..",
    "unicodeData",
    "ParsedCharactersAvro.txt",
);

export const saveParsedData = async (chars: UnicodeCharacter[] = []) => {
    console.time("saveParsedData");

    if (!chars) {
        chars = await loadParsedData();
    }

    const characterSetType = avro.Type.forSchema({
        type: "array",
        items: {
            name: "character",
            type: "record",
            fields: [
                { name: "code", type: "string" },
                { name: "name", type: "string" },
                { name: "generalCategory", type: "string" },
                { name: "aliases", type: { type: "array", items: "string" } },
                { name: "canonicalCombiningClass", type: "int" },
                { name: "bidiClass", type: "string" },
                { name: "decompositionType", type: "string" },
                { name: "numericType", type: "string" },
                { name: "bidiMirrored", type: "string" },
                { name: "unicode1Name", type: "string" },
                { name: "isoComment", type: "string" },
                { name: "simpleUppercaseMapping", type: "string" },
                { name: "simpleLowerCaseMapping", type: "string" },
                { name: "simpleTitlecaseMapping", type: "string" },
            ],
        },
    } as avro.Schema);

    const encoder = avro.createFileEncoder(avroFilePath, characterSetType, {});

    encoder.write(chars);
    encoder.end();

    console.timeEnd("saveParsedData");
};

export const loadParsedData = async () => {
    console.time(`Parsing unicode character data from ${avroFilePath}`);

    let unicodeCharacters = new Promise<UnicodeCharacter[]>(
        (resolve, reject) => {
            avro.createFileDecoder(avroFilePath).on("data", characters => {
                resolve(
                    characters.map(
                        (x: any) =>
                            new UnicodeCharacter(
                                x.code,
                                x.name,
                                x.generalCategory,
                                x.aliases,
                            ),
                    ),
                );
            });

            console.timeEnd(
                `Parsing unicode character data from ${avroFilePath}`,
            );
        },
    );

    return unicodeCharacters;
};
