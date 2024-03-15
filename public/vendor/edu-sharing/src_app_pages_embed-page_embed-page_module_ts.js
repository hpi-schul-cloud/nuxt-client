"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_embed-page_embed-page_module_ts"],{

/***/ 71795:
/*!***************************************************************!*\
  !*** ./src/app/pages/embed-page/embed-page-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmbedPageRoutingModule: () => (/* binding */ EmbedPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _embed_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./embed-page.component */ 18097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: ':component',
  component: _embed_page_component__WEBPACK_IMPORTED_MODULE_0__.EmbedPageComponent
}];
class EmbedPageRoutingModule {
  static #_ = this.ɵfac = function EmbedPageRoutingModule_Factory(t) {
    return new (t || EmbedPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: EmbedPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](EmbedPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 18097:
/*!**********************************************************!*\
  !*** ./src/app/pages/embed-page/embed-page.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmbedPageComponent: () => (/* binding */ EmbedPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _core_module_rest_services_frame_events_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/rest/services/frame-events.service */ 38181);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);
/* harmony import */ var _features_dialogs_dialog_modules_license_dialog_license_dialog_content_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../features/dialogs/dialog-modules/license-dialog/license-dialog-content.component */ 1751);














const _c0 = ["mdsRef"];
const _c1 = ["licenseRef"];
function EmbedPageComponent_es_mds_editor_wrapper_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-mds-editor-wrapper", 2, 3);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("embedded", true)("currentValues", ctx_r0.data)("setId", ctx_r0.setId)("groupId", ctx_r0.groupId);
  }
}
const _c2 = function (a1) {
  return {
    kind: "properties",
    properties: a1
  };
};
function EmbedPageComponent_es_license_dialog_content_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-license-dialog-content", 4, 5);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("data", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](1, _c2, ctx_r1.data));
  }
}
class EmbedPageComponent {
  constructor(translations, mainNavService, toast, ngZone, route, event) {
    var _this = this;
    this.translations = translations;
    this.mainNavService = mainNavService;
    this.toast = toast;
    this.ngZone = ngZone;
    this.route = route;
    this.event = event;
    this.data = {};
    this.groupId = 'io';
    this.setId = _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.DEFAULT;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    window.ngEmbed = this;
    // disable the cookie info when in embedded context
    this.mainNavService.getCookieInfo().show = false;
    this.mainNavService.patchMainNavConfig({
      currentScope: 'embed',
      show: false
    });
    this.event.addListener(this, this.destroyed);
    this.toast.showProgressSpinner();
    this.translations.waitForInit().subscribe(() => {
      this.route.params.subscribe(params => {
        this.component = params.component;
        this.route.queryParams.subscribe(params => {
          if (params.group) {
            this.groupId = params.group;
          }
          if (params.set) {
            this.setId = params.set;
          }
          if (params.data) {
            this.data = JSON.parse(params.data);
          }
          if (this.component === 'mds') {
            _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.waitForComponent(this.ngZone, this, 'mdsRef').subscribe( /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              yield _this.mdsRef.reInit();
              _this.toast.closeProgressSpinner();
            }));
          } else {
            this.toast.closeProgressSpinner();
          }
        });
      });
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  onEvent(event, data) {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (event === _core_module_rest_services_frame_events_service__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_PARENT_FETCH_DATA) {
        if (_this2.component === 'mds') {
          _this2.event.broadcastEvent(_core_module_rest_services_frame_events_service__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_POST_DATA, yield _this2.mdsRef.getValues());
        } else if (_this2.component === 'license') {
          _this2.event.broadcastEvent(_core_module_rest_services_frame_events_service__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_POST_DATA, _this2.licenseRef.getProperties());
        }
      }
    })();
  }
  static #_ = this.ɵfac = function EmbedPageComponent_Factory(t) {
    return new (t || EmbedPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_rest_services_frame_events_service__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: EmbedPageComponent,
    selectors: [["es-mds-embed"]],
    viewQuery: function EmbedPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.mdsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.licenseRef = _t.first);
      }
    },
    decls: 2,
    vars: 2,
    consts: [["editorMode", "form", 3, "embedded", "currentValues", "setId", "groupId", 4, "ngIf"], [3, "data", 4, "ngIf"], ["editorMode", "form", 3, "embedded", "currentValues", "setId", "groupId"], ["mdsRef", ""], [3, "data"], ["licenseRef", ""]],
    template: function EmbedPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, EmbedPageComponent_es_mds_editor_wrapper_0_Template, 2, 4, "es-mds-editor-wrapper", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, EmbedPageComponent_es_license_dialog_content_1_Template, 2, 3, "es-license-dialog-content", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.component === "mds");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.component === "license");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.MdsEditorWrapperComponent, _features_dialogs_dialog_modules_license_dialog_license_dialog_content_component__WEBPACK_IMPORTED_MODULE_7__.LicenseDialogContentComponent],
    styles: ["html,\nbody {\n  overflow-x: hidden;\n  background-color: transparent;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvZW1iZWQtcGFnZS9lbWJlZC1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVJLGtCQUFBO0VBQ0EsNkJBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImh0bWwsXG5ib2R5IHtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    encapsulation: 2
  });
}

/***/ }),

/***/ 48545:
/*!*******************************************************!*\
  !*** ./src/app/pages/embed-page/embed-page.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmbedPageModule: () => (/* binding */ EmbedPageModule)
/* harmony export */ });
/* harmony import */ var _features_dialogs_dialog_modules_license_dialog_license_dialog_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../features/dialogs/dialog-modules/license-dialog/license-dialog.module */ 43095);
/* harmony import */ var _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../features/mds/mds.module */ 77894);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _embed_page_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./embed-page-routing.module */ 71795);
/* harmony import */ var _embed_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./embed-page.component */ 18097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);






class EmbedPageModule {
  static #_ = this.ɵfac = function EmbedPageModule_Factory(t) {
    return new (t || EmbedPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: EmbedPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _embed_page_routing_module__WEBPACK_IMPORTED_MODULE_3__.EmbedPageRoutingModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule, _features_dialogs_dialog_modules_license_dialog_license_dialog_module__WEBPACK_IMPORTED_MODULE_0__.LicenseDialogModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](EmbedPageModule, {
    declarations: [_embed_page_component__WEBPACK_IMPORTED_MODULE_4__.EmbedPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _embed_page_routing_module__WEBPACK_IMPORTED_MODULE_3__.EmbedPageRoutingModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule, _features_dialogs_dialog_modules_license_dialog_license_dialog_module__WEBPACK_IMPORTED_MODULE_0__.LicenseDialogModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_embed-page_embed-page_module_ts.js.map