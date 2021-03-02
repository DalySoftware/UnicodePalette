import { loadParsedData } from "./CharacterDataLoad";

const getCharacterQuickPickItems = async () => {
    const unicodeCharacters = await loadParsedData();
    return unicodeCharacters.map(char => char.asQuickPickItem());
};

export default getCharacterQuickPickItems;
