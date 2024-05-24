"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_save-search-dialog_save-search-dialog_module_ts"],{

/***/ 82915:
/*!****************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/save-search-dialog/save-search-dialog.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SaveSearchDialogComponent: () => (/* binding */ SaveSearchDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 46939);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/autocomplete */ 99892);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 10026);





















function SaveSearchDialogComponent_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", option_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", option_r2, " ");
  }
}
class SaveSearchDialogComponent {
  constructor(data, dialogRef, savedSearchesService, dialogs, toast, translate) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.savedSearchesService = savedSearchesService;
    this.dialogs = dialogs;
    this.toast = toast;
    this.translate = translate;
    this.nameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.UntypedFormControl();
    this._savedSearches = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject(null);
  }
  ngOnInit() {
    const name = this.data.name || this.getInitialName(this.data.searchString);
    this.nameControl.setValue(name);
    const cancelButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.dialogRef.close());
    const saveButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.save());
    this.dialogRef.patchConfig({
      buttons: [cancelButton, saveButton]
    });
    const updateName = name => {
      this.dialogRef.patchConfig({
        subtitle: name
      });
      saveButton.disabled = !name;
    };
    this.nameControl.valueChanges.subscribe(name => updateName(name));
    updateName(name);
    this.savedSearchesService.observeMySavedSearches().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).subscribe(this._savedSearches);
    this.registerAutoCompleteValues();
  }
  registerAutoCompleteValues() {
    rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest([this._savedSearches.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.first)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull)), this.nameControl.valueChanges]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(([savedSearches, input]) => savedSearches.map(({
      title
    }) => title).filter(title => title.includes(input)))).subscribe(autocompleteValues => this.autocompleteValues = autocompleteValues);
  }
  getInitialName(searchString) {
    return (searchString || this.translate.instant('SEARCH.SAVE_SEARCH.UNKNOWN_QUERY')) + ' - ' + ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.DateHelper.formatDate(this.translate, Date.now(), {
      showAlwaysTime: true,
      useRelativeLabels: false
    });
  }
  save({
    replace = false
  } = {}) {
    if (!replace && this._savedSearches.value?.some(({
      title
    }) => title === this.nameControl.value)) {
      void this.showShouldReplaceDialog();
      return;
    }
    this.dialogRef.patchState({
      isLoading: true
    });
    this.savedSearchesService.saveCurrentSearch(this.nameControl.value, {
      replace
    }).subscribe({
      next: savedSearch => {
        this.toast.toast('SEARCH.SAVE_SEARCH.TOAST_SAVED');
        this.dialogRef.close(savedSearch);
      },
      error: error => {
        this.dialogRef.patchState({
          isLoading: false
        });
        if (error.status === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.DUPLICATE_NODE_RESPONSE) {
          error.preventDefault();
          void this.showShouldReplaceDialog();
        } else {
          throw error;
        }
      }
    });
  }
  showShouldReplaceDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'SEARCH.SAVE_SEARCH.SEARCH_EXISTS_TITLE',
        message: 'SEARCH.SAVE_SEARCH.SEARCH_EXISTS_MESSAGE',
        buttons: _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__.REPLACE_OR_BACK
      });
      dialogRef.beforeClosed().subscribe(result => {
        if (result === 'REPLACE') {
          _this.save({
            replace: true
          });
        } else {
          _this.dialogRef.patchState({
            isLoading: false
          });
        }
      });
    })();
  }
  static #_ = this.ɵfac = function SaveSearchDialogComponent_Factory(t) {
    return new (t || SaveSearchDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_15__.SavedSearchesService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_5__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: SaveSearchDialogComponent,
    selectors: [["es-save-search-dialog"]],
    decls: 12,
    vars: 9,
    consts: [[1, "label-form-field"], ["matInput", "", 3, "formControl", "matAutocomplete"], ["auto", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], [1, "explanation-text"], [3, "value"]],
    template: function SaveSearchDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "form")(1, "mat-form-field", 0)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-autocomplete", null, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, SaveSearchDialogComponent_mat_option_8_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 5, "SEARCH.SAVE_SEARCH.NAME"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formControl", ctx.nameControl)("matAutocomplete", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.autocompleteValues);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 7, "SEARCH.SAVE_SEARCH.DESCRIPTION"));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__.MatAutocomplete, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatOption, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__.MatAutocompleteTrigger, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
    styles: [".label-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9zYXZlLXNlYXJjaC1kaWFsb2cvc2F2ZS1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmxhYmVsLWZvcm0tZmllbGQge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 74058:
/*!*************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/save-search-dialog/save-search-dialog.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SaveSearchDialogComponent: () => (/* reexport safe */ _save_search_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SaveSearchDialogComponent),
/* harmony export */   SaveSearchDialogModule: () => (/* binding */ SaveSearchDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _save_search_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./save-search-dialog.component */ 82915);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class SaveSearchDialogModule {
  static #_ = this.ɵfac = function SaveSearchDialogModule_Factory(t) {
    return new (t || SaveSearchDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: SaveSearchDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SaveSearchDialogModule, {
    declarations: [_save_search_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SaveSearchDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_save-search-dialog_save-search-dialog_module_ts.js.map