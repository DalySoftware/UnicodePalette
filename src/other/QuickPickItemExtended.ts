import { QuickPickItem } from "vscode";
import UnicodeCharacter from "../classes/UnicodeCharacter";

export type QuickPickItemExtended = QuickPickItem & {
    character: UnicodeCharacter;
};
