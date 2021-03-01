import { QuickPickItem } from "vscode";
import { categoryFromString, GeneralCategory } from "./GeneralCategory";

export default class UnicodeCharacter {
    constructor(
        public code: string,
        public name: string,
        public generalCategory: string,
        public canonicalCombiningClass: number,
        public bidiClass: string,
        public decompositionType: string,
        public numericType: string,
        public bidiMirrored: string,
        public unicode1Name: string,
        public isoComment: string,
        public simpleUppercaseMapping: string,
        public simpleLowerCaseMapping: string,
        public simpleTitlecaseMapping: string,
    ) {}

    asQuickPickItem() {
        const categoryName = categoryFromString(this.generalCategory);

        const label = String.fromCodePoint(parseInt(this.code, 16));
        const detail = `name: ${this.name}, category: ${categoryName}`;
        const description = `hex code: ${this.code}, int code: ${parseInt(
            this.code,
            16,
        )}`;

        return { label, description, detail } as QuickPickItem;
    }
}
