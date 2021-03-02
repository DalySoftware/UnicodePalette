// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import getCharacterQuickPickItems from "./CharacterSet";
import { QuickPickItemExtended } from "./QuickPickItemExtended";
import {
    addCharacterToRecentlyUsed,
    getRecentlyUsed,
} from "./RecentlyUsedCharactersStorage";
import UnicodeCharacter from "./UnicodeCharacter";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.debug('Extension "characterpalette" activating');

    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand(
            "characterpalette.insertCharacter",
            async (editor, edit) => {
                let quickPickItems = getRecentlyUsed(context).map(x =>
                    x.asQuickPickItem(),
                );

                quickPickItems = [
                    ...quickPickItems,
                    ...(await getCharacterQuickPickItems()),
                ];

                const input = (await vscode.window.showQuickPick(
                    quickPickItems,
                    {
                        matchOnDescription: true,
                        matchOnDetail: true,
                        ignoreFocusOut: true,
                    },
                )) as QuickPickItemExtended;

                if (input?.label) {
                    editor.edit(edit => {
                        addCharacterToRecentlyUsed(context, input.character);

                        const oldSelectionEnd = editor.selection.end;

                        if (editor.selection.isEmpty) {
                            edit.insert(
                                editor.selection.start,
                                input?.character.toString(),
                            );
                        } else {
                            edit.replace(
                                editor.selection,
                                input?.character.toString(),
                            );
                        }
                        editor.selection = new vscode.Selection(
                            oldSelectionEnd,
                            oldSelectionEnd,
                        );
                    });
                }

                deactivate();
            },
        ),
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.debug('Extension "characterpalette" deactivating');
}
