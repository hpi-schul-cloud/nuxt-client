/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICodeEditorService } from '../services/codeEditorService.js';
import { EditorContextKeys } from '../../common/editorContextKeys.js';
import { localize } from '../../../nls.js';
import { Action2, MenuId, MenuRegistry, registerAction2 } from '../../../platform/actions/common/actions.js';
import { CommandsRegistry } from '../../../platform/commands/common/commands.js';
import { ContextKeyExpr } from '../../../platform/contextkey/common/contextkey.js';
const accessibleDiffViewerCategory = {
    value: localize('accessibleDiffViewer', 'Accessible Diff Viewer'),
    original: 'Accessible Diff Viewer',
};
export class AccessibleDiffViewerNext extends Action2 {
    constructor() {
        super({
            id: AccessibleDiffViewerNext.id,
            title: { value: localize('editor.action.accessibleDiffViewer.next', "Go to Next Difference"), original: 'Go to Next Difference' },
            category: accessibleDiffViewerCategory,
            precondition: ContextKeyExpr.has('isInDiffEditor'),
            keybinding: {
                primary: 65 /* KeyCode.F7 */,
                weight: 100 /* KeybindingWeight.EditorContrib */
            },
            f1: true,
        });
    }
    run(accessor) {
        const diffEditor = findFocusedDiffEditor(accessor);
        diffEditor === null || diffEditor === void 0 ? void 0 : diffEditor.accessibleDiffViewerNext();
    }
}
AccessibleDiffViewerNext.id = 'editor.action.accessibleDiffViewer.next';
MenuRegistry.appendMenuItem(MenuId.EditorTitle, {
    command: {
        id: AccessibleDiffViewerNext.id,
        title: localize('Open Accessible Diff Viewer', "Open Accessible Diff Viewer"),
    },
    order: 10,
    group: '2_diff',
    when: ContextKeyExpr.and(EditorContextKeys.accessibleDiffViewerVisible.negate(), ContextKeyExpr.has('isInDiffEditor')),
});
export class AccessibleDiffViewerPrev extends Action2 {
    constructor() {
        super({
            id: AccessibleDiffViewerPrev.id,
            title: { value: localize('editor.action.accessibleDiffViewer.prev', "Go to Previous Difference"), original: 'Go to Previous Difference' },
            category: accessibleDiffViewerCategory,
            precondition: ContextKeyExpr.has('isInDiffEditor'),
            keybinding: {
                primary: 1024 /* KeyMod.Shift */ | 65 /* KeyCode.F7 */,
                weight: 100 /* KeybindingWeight.EditorContrib */
            },
            f1: true,
        });
    }
    run(accessor) {
        const diffEditor = findFocusedDiffEditor(accessor);
        diffEditor === null || diffEditor === void 0 ? void 0 : diffEditor.accessibleDiffViewerPrev();
    }
}
AccessibleDiffViewerPrev.id = 'editor.action.accessibleDiffViewer.prev';
export function findFocusedDiffEditor(accessor) {
    var _a;
    const codeEditorService = accessor.get(ICodeEditorService);
    const diffEditors = codeEditorService.listDiffEditors();
    const activeCodeEditor = (_a = codeEditorService.getFocusedCodeEditor()) !== null && _a !== void 0 ? _a : codeEditorService.getActiveCodeEditor();
    if (!activeCodeEditor) {
        return null;
    }
    for (let i = 0, len = diffEditors.length; i < len; i++) {
        const diffEditor = diffEditors[i];
        if (diffEditor.getModifiedEditor().getId() === activeCodeEditor.getId() || diffEditor.getOriginalEditor().getId() === activeCodeEditor.getId()) {
            return diffEditor;
        }
    }
    if (document.activeElement) {
        for (const d of diffEditors) {
            const container = d.getContainerDomNode();
            if (isElementOrParentOf(container, document.activeElement)) {
                return d;
            }
        }
    }
    return null;
}
function isElementOrParentOf(elementOrParent, element) {
    let e = element;
    while (e) {
        if (e === elementOrParent) {
            return true;
        }
        e = e.parentElement;
    }
    return false;
}
CommandsRegistry.registerCommandAlias('editor.action.diffReview.next', AccessibleDiffViewerNext.id);
registerAction2(AccessibleDiffViewerNext);
CommandsRegistry.registerCommandAlias('editor.action.diffReview.prev', AccessibleDiffViewerPrev.id);
registerAction2(AccessibleDiffViewerPrev);
