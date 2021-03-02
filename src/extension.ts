import * as vscode from "vscode";
import getCharacterQuickPickItems from "./CharacterSet";
import { QuickPickItemExtended } from "./QuickPickItemExtended";
import {
    addCharacterToRecentlyUsed,
    getRecentlyUsed,
} from "./RecentlyUsedCharactersStorage";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand(
            "unicodepalette.insertCharacter",
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

export function deactivate() {}
