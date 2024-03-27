"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_add-folder-dialog_add-folder-dialog_module_ts"],{

/***/ 23455:
/*!*********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-folder-dialog/add-folder-dialog-data.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddFolderDialogData: () => (/* binding */ AddFolderDialogData)
/* harmony export */ });
class AddFolderDialogData {}

/***/ }),

/***/ 75085:
/*!**************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-folder-dialog/add-folder-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddFolderDialogComponent: () => (/* binding */ AddFolderDialogComponent)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _add_folder_dialog_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-folder-dialog-data */ 23455);















function AddFolderDialogComponent_div_5_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mds_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", mds_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](mds_r2.name);
  }
}
function AddFolderDialogComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "mat-select", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddFolderDialogComponent_div_5_Template_mat_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.mdsSet = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, AddFolderDialogComponent_div_5_mat_option_6_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 3, "WORKSPACE.ADD_FOLDER_METADATASET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r0.mdsSet);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.mdsSets);
  }
}
class AddFolderDialogComponent {
  constructor(data, dialogRef, mds, translate, config) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.mds = mds;
    this.translate = translate;
    this.config = config;
    this.folderName = '';
  }
  ngOnInit() {
    this.processDialogData();
    this.updateButtons();
  }
  processDialogData() {
    this.mds.getSets().subscribe(data => {
      this.mdsSets = _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.ConfigurationHelper.filterValidMds(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.HOME_REPOSITORY, data.metadatasets, this.config);
      if (this.mdsSets) {
        _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__.UIHelper.prepareMetadatasets(this.translate, this.mdsSets);
        if (this.mdsSets.length) {
          this.mdsSet = this.mdsSets[0].id;
        } else {
          console.error('Filtering valid mds failed, no mds was available after filtering. Will use default mds');
          console.error('Check availableMds in config');
        }
      }
      this._parent = this.data.parent;
      if (this._parent && this._parent.metadataset && this._parent.metadataset !== 'default') {
        this.mdsSet = this._parent.metadataset;
      }
    });
  }
  cancel() {
    this.dialogRef.close(null);
  }
  addFolder() {
    const name = this.folderName.trim();
    if (!name) {
      return;
    }
    this.dialogRef.close({
      name,
      metadataSet: this.mdsSets ? this.mdsSet : null
    });
  }
  updateButtons() {
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.cancel()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.addFolder())];
    buttons[1].disabled = !this.folderName.trim();
    this.dialogRef.patchConfig({
      buttons
    });
  }
  static #_ = this.ɵfac = function AddFolderDialogComponent_Factory(t) {
    return new (t || AddFolderDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.ConfigService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: AddFolderDialogComponent,
    selectors: [["es-add-folder-dialog"]],
    decls: 6,
    vars: 5,
    consts: [["matInput", "", "autofocus", "", "autocomplete", "off", "data-test", "add-folder-name-input", 3, "ngModel", "ngModelChange", "keyup.enter"], [4, "ngIf"], ["id", "mdsSet", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
    template: function AddFolderDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddFolderDialogComponent_Template_input_ngModelChange_4_listener($event) {
          return ctx.folderName = $event;
        })("ngModelChange", function AddFolderDialogComponent_Template_input_ngModelChange_4_listener() {
          return ctx.updateButtons();
        })("keyup.enter", function AddFolderDialogComponent_Template_input_keyup_enter_4_listener() {
          return ctx.addFolder();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, AddFolderDialogComponent_div_5_Template, 7, 5, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, "WORKSPACE.FOLDER_PLACEHOLDER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.folderName);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.mdsSets && ctx.mdsSets.length > 1);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelect, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
    styles: ["mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9hZGQtZm9sZGVyLWRpYWxvZy9hZGQtZm9sZGVyLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 33264:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-folder-dialog/add-folder-dialog.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddFolderDialogComponent: () => (/* reexport safe */ _add_folder_dialog_component__WEBPACK_IMPORTED_MODULE_1__.AddFolderDialogComponent),
/* harmony export */   AddFolderDialogModule: () => (/* binding */ AddFolderDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _add_folder_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-folder-dialog.component */ 75085);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class AddFolderDialogModule {
  static #_ = this.ɵfac = function AddFolderDialogModule_Factory(t) {
    return new (t || AddFolderDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AddFolderDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AddFolderDialogModule, {
    declarations: [_add_folder_dialog_component__WEBPACK_IMPORTED_MODULE_1__.AddFolderDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_add-folder-dialog_add-folder-dialog_module_ts.js.map