"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_add-with-connector-dialog_add-with-connector-dialog_m-0cfea6"],{

/***/ 69012:
/*!*************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-with-connector-dialog/add-with-connector-dialog-data.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddWithConnectorDialogData: () => (/* binding */ AddWithConnectorDialogData)
/* harmony export */ });
class AddWithConnectorDialogData {}

/***/ }),

/***/ 62707:
/*!******************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-with-connector-dialog/add-with-connector-dialog.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddWithConnectorDialogComponent: () => (/* binding */ AddWithConnectorDialogComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _add_with_connector_dialog_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-with-connector-dialog-data */ 69012);














function AddWithConnectorDialogComponent_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const filetype_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", i_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 2, "CONNECTOR.MIMETYPE." + (filetype_r3.mimetype === "application/zip" ? filetype_r3.ccressourcetype + "_" + filetype_r3.ccressourceversion + "_" + filetype_r3.ccresourcesubtype : filetype_r3.mimetype)), "");
  }
}
function AddWithConnectorDialogComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 3, "CONNECTOR." + ctx_r2.connector.id + ".FILENAME"), ": ", ctx_r2.name, ".", ctx_r2.getType().filetype, "\n");
  }
}
class AddWithConnectorDialogComponent {
  get name() {
    return this.nameSubject.value;
  }
  set name(value) {
    this.nameSubject.next(value);
  }
  constructor(data, dialogRef) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.connector = this.processConnector(this.data.connector);
    this.nameSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(this.data.name ?? '');
    this.type = 0;
    this.initDialogConfig();
  }
  cancel() {
    this.dialogRef.close(null);
  }
  create() {
    if (!this.name.trim()) {
      return;
    }
    this.dialogRef.close({
      name: this.name,
      type: this.getType()
    });
  }
  processConnector(connector) {
    for (let i = 0; i < connector.filetypes.length; i++) {
      if (!connector.filetypes[i].creatable) {
        connector.filetypes.splice(i, 1);
      }
    }
    return connector;
  }
  initDialogConfig() {
    const cancelButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.cancel());
    const createButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CREATE', {
      color: 'primary'
    }, () => this.create());
    this.dialogRef.patchConfig({
      title: 'CONNECTOR.' + this.connector.id + '.TITLE',
      subtitle: 'CONNECTOR.' + this.connector.id + '.NAME',
      avatar: {
        kind: 'icon',
        icon: this.connector.icon
      },
      buttons: [cancelButton, createButton]
    });
    this.nameSubject.subscribe(name => createButton.disabled = !name.trim());
    this.nameSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.first)(name => !!name)).subscribe(() => this.dialogRef.patchConfig({
      closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.Closable.Standard
    }));
  }
  getType() {
    return this.connector.filetypes[this.type];
  }
  static #_ = this.ɵfac = function AddWithConnectorDialogComponent_Factory(t) {
    return new (t || AddWithConnectorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__.CardDialogRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AddWithConnectorDialogComponent,
    selectors: [["es-add-with-connector-dialog"]],
    decls: 14,
    vars: 13,
    consts: [["matInput", "", "type", "text", "name", "filename", "autofocus", "", 3, "ngModel", "ngModelChange"], ["input", ""], ["name", "filetype", 3, "ngModel", "disabled", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "name", 4, "ngIf"], [3, "value"], [1, "name"]],
    template: function AddWithConnectorDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form")(1, "mat-form-field")(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "input", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AddWithConnectorDialogComponent_Template_input_ngModelChange_5_listener($event) {
          return ctx.name = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "mat-form-field")(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AddWithConnectorDialogComponent_Template_mat_select_ngModelChange_11_listener($event) {
          return ctx.type = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, AddWithConnectorDialogComponent_mat_option_12_Template, 3, 4, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, AddWithConnectorDialogComponent_div_13_Template, 3, 5, "div", 4);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 9, "CONNECTOR." + ctx.connector.id + ".PLACEHOLDER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("hide", ctx.connector.filetypes.length === 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 11, "CONNECTOR_FORMAT_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.type)("disabled", ctx.connector.filetypes.length === 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.connector.filetypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.name.trim());
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelect, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe],
    styles: ["mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9hZGQtd2l0aC1jb25uZWN0b3ItZGlhbG9nL2FkZC13aXRoLWNvbm5lY3Rvci1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtZm9ybS1maWVsZCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 52591:
/*!***************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/add-with-connector-dialog/add-with-connector-dialog.module.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddWithConnectorDialogComponent: () => (/* reexport safe */ _add_with_connector_dialog_component__WEBPACK_IMPORTED_MODULE_1__.AddWithConnectorDialogComponent),
/* harmony export */   AddWithConnectorDialogModule: () => (/* binding */ AddWithConnectorDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _add_with_connector_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-with-connector-dialog.component */ 62707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class AddWithConnectorDialogModule {
  static #_ = this.ɵfac = function AddWithConnectorDialogModule_Factory(t) {
    return new (t || AddWithConnectorDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AddWithConnectorDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AddWithConnectorDialogModule, {
    declarations: [_add_with_connector_dialog_component__WEBPACK_IMPORTED_MODULE_1__.AddWithConnectorDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_add-with-connector-dialog_add-with-connector-dialog_m-0cfea6.js.map