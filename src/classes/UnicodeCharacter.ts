import { categoryFromString, GeneralCategory } from "../other/GeneralCategory";
import { QuickPickItemExtended } from "../other/QuickPickItemExtended";

export default class UnicodeCharacter {
    constructor(
        public code: string,
        public name: string,
        public generalCategory: string,
        public aliases: string[],
        public canonicalCombiningClass: number = -1,
        public bidiClass: string = "",
        public decompositionType: string = "",
        public numericType: string = "",
        public bidiMirrored: string = "",
        public unicode1Name: string = "",
        public isoComment: string = "",
        public simpleUppercaseMapping: string = "",
        public simpleLowerCaseMapping: string = "",
        public simpleTitlecaseMapping: string = "",
    ) {}

    toString() {
        return String.fromCodePoint(parseInt(this.code, 16));
    }

    asQuickPickItem() {
        const categoryName = `[${categoryFromString(this.generalCategory)}]`;
        const aliasesString =
            this.aliases.length > 0
                ? "\t" + this.aliases.join(", ").toLowerCase()
                : "";

        const label = this.toString() + `\t${this.name}`;
        const detail = categoryName + aliasesString;
        const description = `hex:${this.code}\tint:${parseInt(this.code, 16)}`;

        return {
            label: label,
            description: description,
            detail: detail,
            character: this,
        } as QuickPickItemExtended;
    }
}
