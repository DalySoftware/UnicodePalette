import { QuickPickItem } from "vscode";
import { QuickPickItemExtended } from "./QuickPickItemExtended";
import { loadParsedData } from "./UnicodeDataLoad";

const getCharacterQuickPickItems = async () => {
    const unicodeCharacters = await loadParsedData();
    return unicodeCharacters.map(char => char.asQuickPickItem());
};

export default getCharacterQuickPickItems;
