"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_input-dialog_input-dialog_module_ts"],{

/***/ 33358:
/*!****************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/input-dialog/input-dialog.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputDialogComponent: () => (/* binding */ InputDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_pipes_split_new_lines_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/pipes/split-new-lines.pipe */ 13847);
/* harmony import */ var _input_dialog_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input-dialog-data */ 67194);












function InputDialogComponent_p_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const line_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", line_r1, "\n");
  }
}
/**
 * A generic dialog with an input form field and configurable title, message, label and icon.
 */
class InputDialogComponent {
  constructor(data, dialogRef) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('');
    this.initButtons();
  }
  initButtons() {
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.dialogRef.close(null)), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.dialogRef.close(this.control.value.trim()))];
    buttons[1].disabled = true;
    this.control.valueChanges.subscribe(value => buttons[1].disabled = !value.trim());
    this.dialogRef.patchConfig({
      buttons
    });
  }
  static #_ = this.ɵfac = function InputDialogComponent_Factory(t) {
    return new (t || InputDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__.CardDialogRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: InputDialogComponent,
    selectors: [["es-input-dialog"]],
    decls: 8,
    vars: 10,
    consts: [[4, "ngFor", "ngForOf"], ["matInput", "", "autofocus", "", 3, "formControl"]],
    template: function InputDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, InputDialogComponent_p_0_Template, 2, 1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "splitNewLines");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-form-field")(4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 3, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 5, ctx.data.message, ctx.data.messageParameters)));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 8, ctx.data.label));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.control);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _shared_pipes_split_new_lines_pipe__WEBPACK_IMPORTED_MODULE_3__.SplitNewLinesPipe],
    styles: ["p[_ngcontent-%COMP%] {\n  margin: 0;\n  margin-bottom: 1.5em;\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  margin-top: 1.5em;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9pbnB1dC1kaWFsb2cvaW5wdXQtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtFQUNBLG9CQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLFdBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbInAge1xuICAgIG1hcmdpbjogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVlbTtcbn1cblxubWF0LWZvcm0tZmllbGQge1xuICAgIG1hcmdpbi10b3A6IDEuNWVtO1xuICAgIHdpZHRoOiAxMDAlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 40274:
/*!*************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/input-dialog/input-dialog.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputDialogComponent: () => (/* reexport safe */ _input_dialog_component__WEBPACK_IMPORTED_MODULE_1__.InputDialogComponent),
/* harmony export */   InputDialogModule: () => (/* binding */ InputDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _input_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input-dialog.component */ 33358);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class InputDialogModule {
  static #_ = this.ɵfac = function InputDialogModule_Factory(t) {
    return new (t || InputDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: InputDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](InputDialogModule, {
    declarations: [_input_dialog_component__WEBPACK_IMPORTED_MODULE_1__.InputDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_input-dialog_input-dialog_module_ts.js.map