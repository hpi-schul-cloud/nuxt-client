var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter } from '../../../../base/common/event.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { autorunHandleChanges } from '../../../../base/common/observableImpl/autorun.js';
import { OverviewRulerPart } from './overviewRulerPart.js';
import { EditorOptions } from '../../../common/config/editorOptions.js';
import { localize } from '../../../../nls.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
let DiffEditorEditors = class DiffEditorEditors extends Disposable {
    constructor(originalEditorElement, modifiedEditorElement, _options, codeEditorWidgetOptions, _createInnerEditor, _instantiationService, _keybindingService) {
        super();
        this.originalEditorElement = originalEditorElement;
        this.modifiedEditorElement = modifiedEditorElement;
        this._options = _options;
        this._createInnerEditor = _createInnerEditor;
        this._instantiationService = _instantiationService;
        this._keybindingService = _keybindingService;
        this._onDidContentSizeChange = this._register(new Emitter());
        this.original = this._createLeftHandSideEditor(_options.editorOptions.get(), codeEditorWidgetOptions.originalEditor || {});
        this.modified = this._createRightHandSideEditor(_options.editorOptions.get(), codeEditorWidgetOptions.modifiedEditor || {});
        this._register(autorunHandleChanges('update editor options', {
            createEmptyChangeSummary: () => ({}),
            handleChange: (ctx, changeSummary) => {
                if (ctx.didChange(_options.editorOptions)) {
                    Object.assign(changeSummary, ctx.change.changedOptions);
                }
                return true;
            }
        }, (reader, changeSummary) => {
            _options.editorOptions.read(reader);
            this.modified.updateOptions(this._adjustOptionsForRightHandSide(reader, changeSummary));
            this.original.updateOptions(this._adjustOptionsForLeftHandSide(reader, changeSummary));
        }));
    }
    _createLeftHandSideEditor(options, codeEditorWidgetOptions) {
        const leftHandSideOptions = this._adjustOptionsForLeftHandSide(undefined, options);
        const editor = this._constructInnerEditor(this._instantiationService, this.originalEditorElement, leftHandSideOptions, codeEditorWidgetOptions);
        editor.setContextValue('isInDiffLeftEditor', true);
        return editor;
    }
    _createRightHandSideEditor(options, codeEditorWidgetOptions) {
        const rightHandSideOptions = this._adjustOptionsForRightHandSide(undefined, options);
        const editor = this._constructInnerEditor(this._instantiationService, this.modifiedEditorElement, rightHandSideOptions, codeEditorWidgetOptions);
        editor.setContextValue('isInDiffRightEditor', true);
        return editor;
    }
    _constructInnerEditor(instantiationService, container, options, editorWidgetOptions) {
        const editor = this._createInnerEditor(instantiationService, container, options, editorWidgetOptions);
        this._register(editor.onDidContentSizeChange(e => {
            const width = this.original.getContentWidth() + this.modified.getContentWidth() + OverviewRulerPart.ENTIRE_DIFF_OVERVIEW_WIDTH;
            const height = Math.max(this.modified.getContentHeight(), this.original.getContentHeight());
            this._onDidContentSizeChange.fire({
                contentHeight: height,
                contentWidth: width,
                contentHeightChanged: e.contentHeightChanged,
                contentWidthChanged: e.contentWidthChanged
            });
        }));
        return editor;
    }
    _adjustOptionsForLeftHandSide(_reader, changedOptions) {
        const result = this._adjustOptionsForSubEditor(changedOptions);
        if (!this._options.renderSideBySide.get()) {
            // never wrap hidden editor
            result.wordWrapOverride1 = 'off';
            result.wordWrapOverride2 = 'off';
            result.stickyScroll = { enabled: false };
        }
        else {
            result.wordWrapOverride1 = this._options.diffWordWrap.get();
        }
        if (changedOptions.originalAriaLabel) {
            result.ariaLabel = changedOptions.originalAriaLabel;
        }
        result.ariaLabel = this._updateAriaLabel(result.ariaLabel);
        result.readOnly = !this._options.originalEditable.get();
        result.dropIntoEditor = { enabled: !result.readOnly };
        result.extraEditorClassName = 'original-in-monaco-diff-editor';
        return result;
    }
    _adjustOptionsForRightHandSide(reader, changedOptions) {
        const result = this._adjustOptionsForSubEditor(changedOptions);
        if (changedOptions.modifiedAriaLabel) {
            result.ariaLabel = changedOptions.modifiedAriaLabel;
        }
        result.ariaLabel = this._updateAriaLabel(result.ariaLabel);
        result.wordWrapOverride1 = this._options.diffWordWrap.get();
        result.revealHorizontalRightPadding = EditorOptions.revealHorizontalRightPadding.defaultValue + OverviewRulerPart.ENTIRE_DIFF_OVERVIEW_WIDTH;
        result.scrollbar.verticalHasArrows = false;
        result.extraEditorClassName = 'modified-in-monaco-diff-editor';
        return result;
    }
    _adjustOptionsForSubEditor(options) {
        const clonedOptions = Object.assign(Object.assign({}, options), { dimension: {
                height: 0,
                width: 0
            } });
        clonedOptions.inDiffEditor = true;
        clonedOptions.automaticLayout = false;
        // Clone scrollbar options before changing them
        clonedOptions.scrollbar = Object.assign({}, (clonedOptions.scrollbar || {}));
        clonedOptions.scrollbar.vertical = 'visible';
        clonedOptions.folding = false;
        clonedOptions.codeLens = this._options.diffCodeLens.get();
        clonedOptions.fixedOverflowWidgets = true;
        // Clone minimap options before changing them
        clonedOptions.minimap = Object.assign({}, (clonedOptions.minimap || {}));
        clonedOptions.minimap.enabled = false;
        if (this._options.collapseUnchangedRegions.get()) {
            clonedOptions.stickyScroll = { enabled: false };
        }
        else {
            clonedOptions.stickyScroll = this._options.editorOptions.get().stickyScroll;
        }
        return clonedOptions;
    }
    _updateAriaLabel(ariaLabel) {
        var _a;
        if (!ariaLabel) {
            ariaLabel = '';
        }
        const ariaNavigationTip = localize('diff-aria-navigation-tip', ' use {0} to open the accessibility help.', (_a = this._keybindingService.lookupKeybinding('editor.action.accessibilityHelp')) === null || _a === void 0 ? void 0 : _a.getAriaLabel());
        if (this._options.accessibilityVerbose.get()) {
            return ariaLabel + ariaNavigationTip;
        }
        else if (ariaLabel) {
            return ariaLabel.replaceAll(ariaNavigationTip, '');
        }
        return '';
    }
};
DiffEditorEditors = __decorate([
    __param(5, IInstantiationService),
    __param(6, IKeybindingService)
], DiffEditorEditors);
export { DiffEditorEditors };
