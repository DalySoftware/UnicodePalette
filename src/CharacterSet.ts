import { QuickPickItem } from "vscode";
import { loadParsedData } from "./UnicodeDataLoad";

const getCharacterQuickPickItems = async () => {
    let items: QuickPickItem[] = [];

    const unicodeCharacters = await loadParsedData();
    const unicodeQuickPickItems = unicodeCharacters.map(char =>
        char.asQuickPickItem(),
    );

    items = [...items, ...unicodeQuickPickItems];

    return items;
};

export default getCharacterQuickPickItems;
