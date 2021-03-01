import { QuickPickItem } from "vscode";
import loadUnicodeData from "./UnicodeCharacterData";

const getCharacterQuickPickItems = () => {
    let items: QuickPickItem[] = [];

    const testItem1: QuickPickItem = {
        label: "#",
        description: "sharp",
        detail: "pound",
    };

    const testItem2: QuickPickItem = {
        label: ":",
        description: "colon",
        detail: "colon detail",
    };

    items.push(testItem1, testItem2);

    const unicodeCharacters = loadUnicodeData();
    const unicodeQuickPickItems = unicodeCharacters.map(char =>
        char.asQuickPickItem(),
    );

    items = [...items, ...unicodeQuickPickItems];

    return items;
};

export default getCharacterQuickPickItems;
