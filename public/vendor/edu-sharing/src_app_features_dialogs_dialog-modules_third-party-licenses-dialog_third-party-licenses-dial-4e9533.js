"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_third-party-licenses-dialog_third-party-licenses-dial-4e9533"],{

/***/ 5552:
/*!**********************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/third-party-licenses-dialog/third-party-licenses-dialog.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThirdPartyLicensesDialogComponent: () => (/* binding */ ThirdPartyLicensesDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);





function ThirdPartyLicensesDialogComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h5", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const license_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", license_r1.component, " / ", license_r1.plugin, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", license_r1.details, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
  }
}
class ThirdPartyLicensesDialogComponent {
  constructor(dialogRef, toast, connector) {
    this.dialogRef = dialogRef;
    this.toast = toast;
    this.connector = connector;
    this.licenseDetails = [];
    this.dialogRef.patchState({
      isLoading: true
    });
  }
  ngOnInit() {
    this.connector.getLicenses().subscribe(licenses => {
      const mapping = (component, plugin, details) => {
        return {
          component,
          plugin: plugin.replace('.txt', ''),
          details: details
        };
      };
      this.licenseDetails = Object.keys(licenses.repository).map(k => mapping('Repository', k, licenses.repository[k]));
      Object.keys(licenses.services).forEach(k => this.licenseDetails = this.licenseDetails.concat(Object.keys(licenses.services[k]).map(p => mapping(k, p, licenses.services[k][p]))));
      this.dialogRef.patchState({
        isLoading: false
      });
    }, error => {
      this.dialogRef.close();
      this.toast.error(error);
      console.error(error);
    });
  }
  static #_ = this.ɵfac = function ThirdPartyLicensesDialogComponent_Factory(t) {
    return new (t || ThirdPartyLicensesDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_0__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_1__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConnectorService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ThirdPartyLicensesDialogComponent,
    selectors: [["es-third-party-licenses-dialog"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngFor", "ngForOf"], [1, "mat-heading-5"], [1, "license-group", 3, "innerHTML"]],
    template: function ThirdPartyLicensesDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, ThirdPartyLicensesDialogComponent_ng_container_0_Template, 4, 3, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.licenseDetails);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.license-group[_ngcontent-%COMP%] {\n  white-space: pre;\n  font-family: monospace;\n  overflow-x: auto;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy90aGlyZC1wYXJ0eS1saWNlbnNlcy1kaWFsb2cvdGhpcmQtcGFydHktbGljZW5zZXMtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ubGljZW5zZS1ncm91cCB7XG4gICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgZmxleC1zaHJpbms6IDA7XG59XG5cbi8vIC5saWNlbnNlLXNwYWNlciB7XG4vLyAgICAgd2lkdGg6IDEwMCU7XG4vLyAgICAgaGVpZ2h0OiAxcHg7XG4vLyAgICAgbWFyZ2luOiAxNXB4IDEwcHg7XG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I7XG4vLyB9XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 82887:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/third-party-licenses-dialog/third-party-licenses-dialog.module.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThirdPartyLicensesDialogComponent: () => (/* reexport safe */ _third_party_licenses_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ThirdPartyLicensesDialogComponent),
/* harmony export */   ThirdPartyLicensesDialogModule: () => (/* binding */ ThirdPartyLicensesDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _third_party_licenses_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./third-party-licenses-dialog.component */ 5552);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class ThirdPartyLicensesDialogModule {
  static #_ = this.ɵfac = function ThirdPartyLicensesDialogModule_Factory(t) {
    return new (t || ThirdPartyLicensesDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: ThirdPartyLicensesDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ThirdPartyLicensesDialogModule, {
    declarations: [_third_party_licenses_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ThirdPartyLicensesDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_third-party-licenses-dialog_third-party-licenses-dial-4e9533.js.map