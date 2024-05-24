"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_lti-page_lti-page_module_ts"],{

/***/ 45072:
/*!***********************************************************!*\
  !*** ./src/app/pages/lti-page/lti-page-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LtiPageRoutingModule: () => (/* binding */ LtiPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _lti_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lti.component */ 80504);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _lti_component__WEBPACK_IMPORTED_MODULE_0__.LtiPageComponent
}];
class LtiPageRoutingModule {
  static #_ = this.ɵfac = function LtiPageRoutingModule_Factory(t) {
    return new (t || LtiPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: LtiPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LtiPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 9373:
/*!***************************************************!*\
  !*** ./src/app/pages/lti-page/lti-page.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LtiPageModule: () => (/* binding */ LtiPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _lti_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lti-page-routing.module */ 45072);
/* harmony import */ var _lti_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lti.component */ 80504);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class LtiPageModule {
  static #_ = this.ɵfac = function LtiPageModule_Factory(t) {
    return new (t || LtiPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: LtiPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _lti_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.LtiPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](LtiPageModule, {
    declarations: [_lti_component__WEBPACK_IMPORTED_MODULE_2__.LtiPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _lti_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.LtiPageRoutingModule]
  });
})();

/***/ }),

/***/ 80504:
/*!*************************************************!*\
  !*** ./src/app/pages/lti-page/lti.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LtiPageComponent: () => (/* binding */ LtiPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);







class LtiPageComponent {
  constructor(dialogs, mainNav, translations) {
    this.dialogs = dialogs;
    this.mainNav = mainNav;
    this.translations = translations;
  }
  ngOnInit() {
    this.mainNav.setMainNavConfig({
      currentScope: 'lti',
      title: '',
      show: false
    });
    // Wait for translations to avoid flashing translation strings.
    this.translations.waitForInit().subscribe(() => void this.showDialog());
  }
  showDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'LTI.REGISTERED.TITLE',
        message: 'LTI.REGISTERED.DESCRIPTION',
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__.OK,
        closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.Closable.Disabled
      });
      dialogRef.afterClosed().subscribe(() => {
        (window.opener || window.parent).postMessage({
          subject: 'org.imsglobal.lti.close'
        }, '*');
      });
    })();
  }
  static #_ = this.ɵfac = function LtiPageComponent_Factory(t) {
    return new (t || LtiPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.TranslationsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: LtiPageComponent,
    selectors: [["es-lti-page"]],
    decls: 0,
    vars: 0,
    template: function LtiPageComponent_Template(rf, ctx) {},
    encapsulation: 2
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_lti-page_lti-page_module_ts.js.map