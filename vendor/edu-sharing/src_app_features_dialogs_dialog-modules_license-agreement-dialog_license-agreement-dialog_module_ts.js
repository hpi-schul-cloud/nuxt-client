"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_license-agreement-dialog_license-agreement-dialog_module_ts"],{

/***/ 93120:
/*!****************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/license-agreement-dialog/license-agreement-dialog.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseAgreementDialogComponent: () => (/* binding */ LicenseAgreementDialogComponent)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 21916);







class LicenseAgreementDialogComponent {
  constructor(data, dialogRef) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.acceptLicenseAgreement = false;
    this.contentPadding = new _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CardDialogConfig().contentPadding;
    this.acceptButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('LICENSE_AGREEMENT.ACCEPT', {
      color: 'primary'
    }, () => this.accept());
    this.buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('LICENSE_AGREEMENT.DECLINE', {
      color: 'standard'
    }, () => this.decline()), this.acceptButton];
  }
  ngOnInit() {
    this.updateButtons();
    this.dialogRef.patchConfig({
      buttons: this.buttons
    });
    this.licenseAgreementHTML = this.data.licenseHtml;
  }
  updateButtons() {
    this.acceptButton.disabled = !this.acceptLicenseAgreement;
  }
  accept() {
    this.dialogRef.close('accepted');
  }
  decline() {
    this.dialogRef.close('declined');
  }
  static #_ = this.ɵfac = function LicenseAgreementDialogComponent_Factory(t) {
    return new (t || LicenseAgreementDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__.CardDialogRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: LicenseAgreementDialogComponent,
    selectors: [["es-license-agreement-dialog"]],
    decls: 6,
    vars: 13,
    consts: [[1, "card-scroll"], [1, "agreement", 3, "innerHTML"], [3, "ngModel", "ngModelChange", "change"]],
    template: function LicenseAgreementDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div")(3, "mat-checkbox", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LicenseAgreementDialogComponent_Template_mat_checkbox_ngModelChange_3_listener($event) {
          return ctx.acceptLicenseAgreement = $event;
        })("change", function LicenseAgreementDialogComponent_Template_mat_checkbox_change_3_listener() {
          return ctx.updateButtons();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("margin-top", -ctx.contentPadding, "px")("margin-left", -ctx.contentPadding, "px")("margin-right", -ctx.contentPadding, "px")("padding", ctx.contentPadding, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx.licenseAgreementHTML, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.acceptLicenseAgreement);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 11, "LICENSE_AGREEMENT.CHECKBOX"));
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckbox, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.card-scroll[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin-bottom: 20px;\n}\n\n.mat-checkbox[_ngcontent-%COMP%]     .mat-checkbox-layout {\n  white-space: normal !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9saWNlbnNlLWFncmVlbWVudC1kaWFsb2cvbGljZW5zZS1hZ3JlZW1lbnQtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFQTtFQUNJLDhCQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uY2FyZC1zY3JvbGwge1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5tYXQtY2hlY2tib3ggOjpuZy1kZWVwIC5tYXQtY2hlY2tib3gtbGF5b3V0IHtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsICFpbXBvcnRhbnQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 90487:
/*!*************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/license-agreement-dialog/license-agreement-dialog.module.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseAgreementDialogComponent: () => (/* reexport safe */ _license_agreement_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LicenseAgreementDialogComponent),
/* harmony export */   LicenseAgreementDialogModule: () => (/* binding */ LicenseAgreementDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _license_agreement_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./license-agreement-dialog.component */ 93120);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class LicenseAgreementDialogModule {
  static #_ = this.ɵfac = function LicenseAgreementDialogModule_Factory(t) {
    return new (t || LicenseAgreementDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: LicenseAgreementDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LicenseAgreementDialogModule, {
    declarations: [_license_agreement_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LicenseAgreementDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_license-agreement-dialog_license-agreement-dialog_module_ts.js.map