import * as avro from "avsc";
import * as path from "path";
import UnicodeCharacter from "../classes/UnicodeCharacter";

const avroFilePath = path.join(
    __dirname,
    "..",
    "unicodeData",
    "ParsedCharactersAvro.txt",
);

const savedParsedData = async () => {
    const allCharacters = await loadParsedData();

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

    const encoder = avro.createFileEncoder(avroFilePath, characterSetType);

    encoder.write(allCharacters);
    encoder.end();
};

export const loadParsedData = async () => {
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
        },
    );

    return unicodeCharacters;
};
