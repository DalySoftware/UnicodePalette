import { QuickPickItem } from "vscode";
import UnicodeCharacter from "./UnicodeCharacter";

export type QuickPickItemExtended = QuickPickItem & {
    character: UnicodeCharacter;
};
