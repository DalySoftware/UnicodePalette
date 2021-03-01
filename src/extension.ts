// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import getCharacterQuickPickItems from "./CharacterSet";

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
                console.time("getCharacterQuickPickItems");
                const characters = getCharacterQuickPickItems();
                console.timeEnd("getCharacterQuickPickItems");
                const input = await vscode.window.showQuickPick(characters, {
                    matchOnDescription: true,
                    matchOnDetail: true,
                    ignoreFocusOut: true,
                });

                if (input?.label) {
                    editor.edit(edit => {
                        const oldSelectionEnd = editor.selection.end;

                        if (editor.selection.isEmpty) {
                            edit.insert(editor.selection.start, input?.label);
                        } else {
                            edit.replace(editor.selection, input?.label);
                        }
                        editor.selection = new vscode.Selection(
                            oldSelectionEnd,
                            oldSelectionEnd,
                        );
                    });
                }
            },
        ),
    );
}

// this method is called when your extension is deactivated
export function deactivate() {}
