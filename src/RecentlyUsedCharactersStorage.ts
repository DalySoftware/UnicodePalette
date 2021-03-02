import { ExtensionContext } from "vscode";
import UnicodeCharacter from "./UnicodeCharacter";

const recentlyUsedKey = "recentlyUsed";
const maxToStore = 20;

export const getRecentlyUsed = (context: ExtensionContext) => {
    const state = context.globalState;
    const objectsFromStorage: UnicodeCharacter[] =
        state.get(recentlyUsedKey) ?? [];

    const retrievedCharacters = objectsFromStorage.map(
        x =>
            new UnicodeCharacter(
                x.code,
                x.name,
                x.generalCategory,
                x.aliases,
                x.canonicalCombiningClass,
                x.bidiClass,
                x.decompositionType,
                x.numericType,
                x.bidiMirrored,
                x.unicode1Name,
                x.isoComment,
                x.simpleUppercaseMapping,
                x.simpleLowerCaseMapping,
                x.simpleTitlecaseMapping,
            ),
    );

    return retrievedCharacters;
};

export const saveRecentlyUsed = (
    context: ExtensionContext,
    characters: UnicodeCharacter[],
) => {
    const state = context.globalState;
    state.update(recentlyUsedKey, characters.slice(0, maxToStore - 1));
};

export const addCharacterToRecentlyUsed = (
    context: ExtensionContext,
    character: UnicodeCharacter,
) => {
    const existingCharacters = getRecentlyUsed(context);

    const existingCharactersExcludingNew = existingCharacters.filter(
        x => x.code !== character.code,
    );

    saveRecentlyUsed(context, [character, ...existingCharactersExcludingNew]);
};
