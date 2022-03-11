// import { describe, it } from "mocha";
import * as assert from "assert";
import UnicodeCharacter from "../../classes/UnicodeCharacter";

describe("UnicodeCharacter", function () {
    describe("#toString()", function () {
        it("should return the unicode character itself", function () {
            const character = new UnicodeCharacter(
                "0060",
                "GRAVE ACCENT",
                "SYMBOL, MODIFIER",
                ["grave accent", "backtick"],
            );

            assert.strictEqual(character.toString(), "`");
        });
    });

    describe("#asQuickPickItem()", function () {
        it("should format correctly as a QuickPickItemExtended", function () {
            const character = new UnicodeCharacter(
                "0060",
                "GRAVE ACCENT",
                "Sk",
                ["grave accent", "backtick"],
            );

            const quickPickItem = character.asQuickPickItem();

            assert.strictEqual(quickPickItem.character, character);
            assert.strictEqual(quickPickItem.description, "hex:0060\tint:96");
            assert.strictEqual(
                quickPickItem.detail,
                "[Symbol, Modifier]\tgrave accent, backtick",
            );
            assert.strictEqual(quickPickItem.label, "`\tGRAVE ACCENT");
        });
    });
});
