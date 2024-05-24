"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_login-page_login-page_module_ts"],{

/***/ 34148:
/*!***************************************************************!*\
  !*** ./src/app/pages/login-page/login-page-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageRoutingModule: () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _login_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-page.component */ 66094);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _login_page_component__WEBPACK_IMPORTED_MODULE_0__.LoginPageComponent
}];
class LoginPageRoutingModule {
  static #_ = this.ɵfac = function LoginPageRoutingModule_Factory(t) {
    return new (t || LoginPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: LoginPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LoginPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 66094:
/*!**********************************************************!*\
  !*** ./src/app/pages/login-page/login-page.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageComponent: () => (/* binding */ LoginPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs/operators */ 1062);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _util_router_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/router.helper */ 97526);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/bridge.service */ 34997);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/theme.service */ 42471);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/cdk/a11y */ 93170);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/card/card.component */ 13838);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/directives/image-config.directive */ 654);
/* harmony import */ var _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/components/input-password/input-password.component */ 35799);
/* harmony import */ var _shared_components_link_link_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/components/link/link.component */ 5491);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/autocomplete */ 99892);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _shared_components_powered_by_powered_by_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/components/powered-by/powered-by.component */ 49420);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../shared/pipes/assets-path.pipe */ 689);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _url_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./url.pipe */ 95597);








































const _c0 = ["loginForm"];
const _c1 = ["passwordInput"];
const _c2 = ["usernameInput"];
function LoginPageComponent_es_global_progress_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "es-global-progress");
  }
}
const _c3 = function () {
  return {
    mode: "domain"
  };
};
function LoginPageComponent_div_1_div_13_mat_optgroup_15_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "mat-option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("onSelectionChange", function LoginPageComponent_div_1_div_13_mat_optgroup_15_mat_option_1_Template_mat_option_onSelectionChange_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r18);
      const option_r16 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r17.currentProvider = option_r16);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](5, "esUrl");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("value", option_r16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](option_r16.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind2"](5, 3, option_r16.url, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](6, _c3)), " ");
  }
}
function LoginPageComponent_div_1_div_13_mat_optgroup_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "mat-optgroup", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, LoginPageComponent_div_1_div_13_mat_optgroup_15_mat_option_1_Template, 6, 7, "mat-option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", group_r14.group.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngForOf", group_r14.providers);
  }
}
function LoginPageComponent_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 22)(1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "mat-form-field", 25)(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](11, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("keydown.enter", function LoginPageComponent_div_1_div_13_Template_input_keydown_enter_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r19.goToProvider());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](13, "mat-autocomplete", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](15, LoginPageComponent_div_1_div_13_mat_optgroup_15_Template, 2, 2, "mat-optgroup", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](17, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](18, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](19, "esAssetsPath");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](20, "div", 32)(21, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function LoginPageComponent_div_1_div_13_Template_button_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r20);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r21.goToProvider());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](14);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 10, "LOGIN.PROVIDER_SELECT_GROUP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](6, 12, "LOGIN.PROVIDER_SELECT_GROUP_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](10, 14, "LOGIN.PROVIDER_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](12, 16, "LOGIN.PROVIDER_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("formControl", ctx_r2.providerControl)("matAutocomplete", _r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("displayWith", ctx_r2.currentProviderDisplay);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](16, 18, ctx_r2.filteredProviders));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](19, 20, "assets/images/sso_logo.svg"), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](23, 22, "LOGIN.GO_TO_PROVIDER"), " ");
  }
}
function LoginPageComponent_div_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "LOGIN.LOGIN_GROUP"), " ");
  }
}
function LoginPageComponent_div_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "LOGIN.LOGIN_GROUP_DESCRIPTION"), " ");
  }
}
function LoginPageComponent_div_1_mat_form_field_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "mat-form-field", 25)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "input", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("keydown.enter", function LoginPageComponent_div_1_mat_form_field_19_Template_input_keydown_enter_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r23.login());
    })("keyup", function LoginPageComponent_div_1_mat_form_field_19_Template_input_keyup_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r25.checkConditions());
    })("ngModelChange", function LoginPageComponent_div_1_mat_form_field_19_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r26.username = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 2, "LOGIN.USERNAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngModel", ctx_r6.username);
  }
}
const _c4 = function (a0) {
  return [a0, "request"];
};
function LoginPageComponent_div_1_div_24_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "a", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](4, _c4, "/" + ctx_r27.ROUTER_PREFIX + "register"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 2, "LOGIN.RECOVER_PASSWORD"), " ");
  }
}
function LoginPageComponent_div_1_div_24_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("href", ctx_r28.config.register.recoverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 2, "LOGIN.RECOVER_PASSWORD"), " ");
  }
}
function LoginPageComponent_div_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, LoginPageComponent_div_1_div_24_a_1_Template, 3, 6, "a", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, LoginPageComponent_div_1_div_24_a_2_Template, 3, 4, "a", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r8.config.register.local || ctx_r8.config.register.recoverPassword === true);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx_r8.config.register.local || ctx_r8.config.register.recoverPassword === true));
  }
}
function LoginPageComponent_div_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 46)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "es-mat-link", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function LoginPageComponent_div_1_div_25_Template_es_mat_link_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r29.openLoginUrl());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](9, "arrow_forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 2, "LOGIN.USE_URL_TEXT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](7, 4, "LOGIN.USE_URL_LINK"));
  }
}
function LoginPageComponent_div_1_div_26_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function LoginPageComponent_div_1_div_26_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r33);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r32.register());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "LOGIN.REGISTER_TEXT"), " ");
  }
}
function LoginPageComponent_div_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, LoginPageComponent_div_1_div_26_button_1_Template, 3, 3, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function LoginPageComponent_div_1_div_26_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r34.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r10.canRegister());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("disabled", ctx_r10.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](4, 4, "LOGIN.LOGIN"), " ");
  }
}
function LoginPageComponent_div_1_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "LOGIN.ACTION_HELP"), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsanitizeHtml"]);
  }
}
const _c5 = function (a0) {
  return {
    "powered-down": a0
  };
};
function LoginPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div")(1, "es-card", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "div", 2)(5, "h1", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](9, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](10, "esAssetsPath");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](13, LoginPageComponent_div_1_div_13_Template, 24, 24, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](14, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](15, LoginPageComponent_div_1_div_15_Template, 3, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](16, LoginPageComponent_div_1_div_16_Template, 3, 3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](17, "form", 11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("ngSubmit", function LoginPageComponent_div_1_Template_form_ngSubmit_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r36.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](19, LoginPageComponent_div_1_mat_form_field_19_Template, 6, 4, "mat-form-field", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](20, "div", 14)(21, "es-input-password", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("keydown.enter", function LoginPageComponent_div_1_Template_es_input_password_keydown_enter_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r37);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r38.login());
    })("valueChange", function LoginPageComponent_div_1_Template_es_input_password_valueChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r37);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r39.password = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](24, LoginPageComponent_div_1_div_24_Template, 3, 2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](25, LoginPageComponent_div_1_div_25_Template, 10, 6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](26, LoginPageComponent_div_1_div_26_Template, 5, 6, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](27, LoginPageComponent_div_1_div_27_Template, 3, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](28, "es-powered-by", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 23, ctx_r1.caption));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("subtitle", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 25, "LOGIN.SUBTITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("isCancelable", false)("priority", -30)("buttons", ctx_r1.buttons)("width", ctx_r1.showProviders ? "xxlarge" : "normal")("height", ctx_r1.showProviders ? "" : "large");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("showProviders", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](7, 27, "LOGIN.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("alt", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](11, 31, "LOGIN.APP_LOGO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](10, 29, "assets/images/logo.svg"), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r1.isSafeLogin);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](23, 33, "LOGIN.PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("required", true)("value", ctx_r1.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.config.register.local && ctx_r1.config.register.recoverPassword !== false || ctx_r1.config.register.recoverPassword === true || ctx_r1.config.register.recoverUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.config.loginUrl && !ctx_r1.showProviders && !ctx_r1.isSafeLogin);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.showProviders);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](35, _c5, ctx_r1.config.register.local || ctx_r1.config.register.registerUrl));
  }
}
class LoginPageComponent {
  constructor(connector, toast, platformLocation, router, http, translations, configService, route, bridge, authentication, themeService, loadingScreen, mainNav) {
    var _this = this;
    this.connector = connector;
    this.toast = toast;
    this.platformLocation = platformLocation;
    this.router = router;
    this.http = http;
    this.translations = translations;
    this.configService = configService;
    this.route = route;
    this.bridge = bridge;
    this.authentication = authentication;
    this.themeService = themeService;
    this.loadingScreen = loadingScreen;
    this.mainNav = mainNav;
    this.ROUTER_PREFIX = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX;
    this.caption = 'LOGIN.TITLE';
    this.config = {};
    this.disabled = false;
    this.isSafeLogin = false;
    this.isLoading = true;
    this.password = '';
    this.providerControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_22__.UntypedFormControl();
    this.showProviders = false;
    this.username = '';
    this.next = '';
    this.scope = '';
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_23__.Subject();
    // reset the theme in case user was in safe previously
    this.themeService.initWithDefaults();
    const loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed
    });
    this.isLoading = true;
    this.updateButtons();
    this.translations.waitForInit().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.switchMap)(() => this.configService.getAll())).subscribe(data => {
      this.config = data;
      if (!this.config.register) {
        // default register mode: allow local registration if not disabled
        this.config.register = {
          local: true
        };
      }
      if (this.bridge.getCordova().isRunningCordova()) {
        this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX, 'app'], {
          replaceUrl: true
        });
        return;
      }
      this.updateButtons();
      this.username = this.configService.instant('defaultUsername', '');
      this.password = this.configService.instant('defaultPassword', '');
      this.route.queryParams.forEach(params => {
        if (params.username) {
          this.username = params.username;
        }
        this.next = params.next;
        this.connector.onAllRequestsReady().subscribe(() => {
          setTimeout(() => {
            if (this.username && this.passwordInput) {
              this.passwordInput.nativeInput.nativeElement.focus();
            } else if (this.usernameInput) {
              this.usernameInput.nativeElement.focus();
            }
          }, 100);
        });
        this.scope = params.scope;
        if (!this.scope) {
          this.scope = null;
        }
        this.connector.isLoggedIn().subscribe( /*#__PURE__*/function () {
          var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            if (data.currentScope) {
              // just to make sure there is no scope still set // NO: We need a valid session when login to scope!!!
              try {
                yield _this.connector.logout().toPromise();
              } catch (e) {
                console.warn(e);
              }
              data.statusCode = null;
            } else if (data.currentScope === _this.scope) {
              if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK && params.local !== 'true') {
                _this.goToNext(data);
              }
            }
            // when there is a request to go into safe mode, first, the user needs to log in regularly
            else if (data.statusCode !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK && _this.scope) {
              // RestHelper.goToLogin()
            }
            _this.loginUrl = configService.instant('loginUrl');
            const allowLocal = configService.instant('loginAllowLocal', false);
            if (params.local !== 'true' && !allowLocal && _this.loginUrl && data.statusCode !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
              _this.openLoginUrl();
              return;
            }
            _this.isLoading = false;
            loadingTask.done();
            if (configService.instant('loginProvidersUrl')) {
              _this.showProviders = true;
              _this.updateButtons();
              // delay to make sure animation of card has finished
              // otherwise, overlay gets aligned wrongly
              const providers = yield _this.http.get(configService.instant('loginProvidersUrl')).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_25__.delay)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIAnimation.ANIMATION_TIME_NORMAL)).toPromise();
              _this.processProviders(providers);
            }
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        this.isSafeLogin = this.scope == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE;
        if (this.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE) {
          this.connector.isLoggedIn(true).subscribe(data => {
            if (data.statusCode !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
              _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(this.router, this.configService);
            } else {
              this.authentication.observeHasAccessToScope(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_26__.first)()).subscribe(hasAccess => {
                if (hasAccess) {
                  this.username = data.authorityName;
                } else {
                  this.toast.error(null, 'LOGIN.NO_ACCESS');
                  this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'workspace']);
                  // window.history.back();
                }
              });
            }
          }, error => _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(this.router, this.configService));
        }
        if (this.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE) {
          this.caption = 'LOGIN.TITLE_SAFE';
        } else {
          this.caption = 'LOGIN.TITLE';
        }
      });
    });
  }
  ngAfterViewInit() {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  canRegister() {
    return this.config.register && (this.config.register.local || this.config.register.registerUrl);
  }
  checkConditions() {
    this.disabled = !this.username || this.currentProvider; // || !this.password;
    this.updateButtons();
  }
  currentProviderDisplay(provider) {
    return provider ? provider.name : '';
  }
  goToProvider() {
    if (!this.currentProvider) {
      this.toast.error(null, 'LOGIN.NO_PROVIDER_SELECTED');
    }
    let url = this.configService.instant('loginProviderTargetUrl');
    if (!url) {
      this.toast.error(null, 'No configuration for loginProviderTargetUrl found.');
      return;
    }
    const target = this.connector.getAbsoluteServerUrl() + this.configService.instant('loginUrl');
    url = url.replace(':target', encodeURIComponent(target))
    // remove invalid parameters for multiple universities using the same idp
    .replace(':entity', encodeURIComponent(this.currentProvider.url.replace(/@_.*?_@/, '')));
    // @TODO: Redirect to shibboleth provider
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.openUrl(url, this.bridge, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.OPEN_URL_MODE.Current);
  }
  login() {
    this.isLoading = true;
    this.connector.login(this.username, this.password, this.scope).subscribe(data => {
      if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
        this.goToNext(data);
      } else {
        if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_PREVIOUS_SESSION_REQUIRED || data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_PREVIOUS_USER_WRONG) {
          this.toast.error(null, 'LOGIN.SAFE_PREVIOUS');
        } else if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_PASSWORD_EXPIRED) {
          this.toast.error(null, 'LOGIN.PASSWORD_EXPIRED' + (this.isSafeLogin ? '_SAFE' : ''));
        } else if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_PERSON_BLOCKED) {
          this.toast.error(null, 'LOGIN.PERSON_BLOCKED');
        } else {
          this.toast.error(null, 'LOGIN.ERROR' + (this.isSafeLogin ? '_SAFE' : ''));
        }
        this.password = '';
        this.isLoading = false;
      }
    }, error => {
      this.toast.error(error);
      this.isLoading = false;
    });
  }
  ngOnInit() {
    this.mainNav.setMainNavConfig({
      currentScope: 'login',
      title: 'SIDEBAR.LOGIN'
    });
  }
  openLoginUrl() {
    window.location.href = this.loginUrl;
  }
  register() {
    if (this.config.register.local) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'register']);
    } else {
      window.location.href = this.config.register.registerUrl;
    }
  }
  filterProviders(filter = '') {
    const filtered = [];
    if (!this.providers) {
      return null;
    }
    // an object was detected, abort
    if (filter.name) {
      return this.providers;
    }
    this.currentProvider = null;
    for (const p of _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.providers)) {
      p.providers = p.providers.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.data?.toLowerCase().includes(filter.toLowerCase()));
      if (p.providers.length) {
        filtered.push(p);
      }
    }
    return filtered;
  }
  goToNext(data) {
    if (this.next) {
      this.next = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.addGetParameter('fromLogin', 'true', this.next);
      _util_router_helper__WEBPACK_IMPORTED_MODULE_3__.RouterHelper.navigateToAbsoluteUrl(this.platformLocation, this.router, this.next);
    } else if (data.currentScope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX, 'workspace', 'safe']);
    } else {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.goToDefaultLocation(this.router, this.platformLocation, this.configService);
    }
  }
  processProviders(providers) {
    const data = {};
    for (const provider of Object.keys(providers.wayf_idps)) {
      const object = providers.wayf_idps[provider];
      if (object) {
        object.url = provider;
        const type = object.type;
        if (!data[type]) {
          data[type] = {
            group: providers.wayf_categories[type],
            providers: []
          };
        }
        data[type].providers.push(object);
      }
    }
    this.providers = [];
    for (const key of Object.keys(data)) {
      this.providers.push(data[key]);
    }
    // register observer for autocomplete
    this.filteredProviders = this.providerControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_27__.startWith)(''), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_28__.map)(value => this.filterProviders(value)));
  }
  updateButtons() {
    this.buttons = [];
    if (this.showProviders) {
      return;
    }
    if (this.canRegister()) {
      this.buttons.push(new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('LOGIN.REGISTER_TEXT', {
        color: 'standard'
      }, () => this.register()));
    }
    const login = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('LOGIN.LOGIN', {
      color: 'primary'
    }, () => this.login());
    login.disabled = this.disabled;
    this.buttons.push(login);
  }
  static #_ = this.ɵfac = function LoginPageComponent_Factory(t) {
    return new (t || LoginPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_29__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_30__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_31__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_30__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_6__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_8__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_9__.MainNavService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
    type: LoginPageComponent,
    selectors: [["es-login-page"]],
    viewQuery: function LoginPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.loginForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.passwordInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.usernameInput = _t.first);
      }
    },
    decls: 2,
    vars: 2,
    consts: [[4, "ngIf"], ["role", "main", "esSkipTarget", "MAIN_CONTENT", "avatar", "assets/images/app-icon.svg", "modal", "auto", 3, "title", "subtitle", "isCancelable", "priority", "buttons", "width", "height"], [1, "login-content"], ["esTitle", "", 1, "cdk-visually-hidden"], [1, "branding"], ["esImageConfig", "", 3, "src", "alt"], [1, "groups"], ["class", "providers-select", 4, "ngIf"], [1, "login-form"], ["class", "group-heading", 4, "ngIf"], ["class", "group-description", 4, "ngIf"], [3, "ngSubmit"], ["loginForm", ""], ["floatLabel", "always", 4, "ngIf"], [1, "password-field"], ["inputId", "password", "floatLabel", "always", 3, "label", "required", "value", "keydown.enter", "valueChange"], ["passwordInput", ""], ["class", "forgot-password", 4, "ngIf"], ["class", "useUrl", 4, "ngIf"], ["class", "group-actions", 4, "ngIf"], ["class", "login-help", 4, "ngIf"], ["mode", "color", 3, "ngClass"], [1, "providers-select"], [1, "group-heading"], [1, "group-description"], ["floatLabel", "always"], ["type", "text", "matInput", "", 3, "placeholder", "formControl", "matAutocomplete", "keydown.enter"], [3, "displayWith"], ["autoProvider", "matAutocomplete"], [3, "label", 4, "ngFor", "ngForOf"], [1, "sso-group"], [1, "sso-logo", 3, "src"], [1, "group-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "label"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [3, "value", "onSelectionChange"], [1, "mat-option-primary"], [1, "mat-option-secondary"], ["matInput", "", "required", "", "name", "username", "id", "username", "autofocus", "", "autocapitalize", "none", 3, "ngModel", "keydown.enter", "keyup", "ngModelChange"], ["usernameInput", ""], [1, "forgot-password"], ["cdkMonitorElementFocus", "", 3, "routerLink", 4, "ngIf"], ["cdkMonitorElementFocus", "", 3, "href", 4, "ngIf"], ["cdkMonitorElementFocus", "", 3, "routerLink"], ["cdkMonitorElementFocus", "", 3, "href"], [1, "useUrl"], [1, "goto", 3, "click"], [1, "material-icons"], ["mat-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "click"], [1, "login-help"], [3, "innerHTML"]],
    template: function LoginPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, LoginPageComponent_es_global_progress_0_Template, 1, 0, "es-global-progress", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, LoginPageComponent_div_1_Template, 29, 37, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_33__.CdkMonitorFocus, _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_10__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_22__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_22__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgForm, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__.GlobalProgressComponent, _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_12__.ImageConfigDirective, _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_13__.InputPasswordComponent, _shared_components_link_link_component__WEBPACK_IMPORTED_MODULE_14__.LinkComponent, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_34__.MatAutocomplete, _angular_material_core__WEBPACK_IMPORTED_MODULE_35__.MatOption, _angular_material_core__WEBPACK_IMPORTED_MODULE_35__.MatOptgroup, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_34__.MatAutocompleteTrigger, _angular_material_button__WEBPACK_IMPORTED_MODULE_36__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_37__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_37__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_38__.MatInput, _shared_components_powered_by_powered_by_component__WEBPACK_IMPORTED_MODULE_15__.PoweredByComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_30__.RouterLink, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_16__.SkipTargetDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_17__.TitleDirective, _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_18__.AssetsPathPipe, _angular_common__WEBPACK_IMPORTED_MODULE_29__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_39__.TranslatePipe, _url_pipe__WEBPACK_IMPORTED_MODULE_19__.UrlPipe],
    styles: ["\n\n.login-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n\n[_nghost-%COMP%]     .login-content mat-form-field {\n  width: calc(100% - 0.2rem);\n}\n\nes-powered-by[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  bottom: 5%;\n}\n\n.powered-down[_ngcontent-%COMP%] {\n  top: calc(50% + 375px);\n}\n@media (max-height: 850px) {\n  .powered-down[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n.branding[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100px;\n  text-align: center;\n  margin-top: 10px;\n}\n.branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 100px;\n}\n\n.password-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column-reverse;\n}\n.password-field[_ngcontent-%COMP%]   .forgot-password[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n  height: 1.25em;\n}\n.password-field[_ngcontent-%COMP%]   .forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: var(--fontSizeXSmall);\n}\n.password-field[_ngcontent-%COMP%]   .forgot-password[_ngcontent-%COMP%]   a.cdk-keyboard-focused[_ngcontent-%COMP%] {\n  outline: none;\n  outline: var(--focusWidth) solid var(--palette-primary-300);\n  outline-offset: 2px;\n}\n\n.groups[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 25px 0;\n}\n.groups[_ngcontent-%COMP%]   .providers-select[_ngcontent-%COMP%] {\n  border-right: 1px solid var(--textLight);\n  padding-right: 30px;\n}\n.groups[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%] {\n  padding-left: 30px;\n  display: flex;\n  flex-direction: column;\n}\n.groups[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]    > form[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n[showProviders=false][_ngcontent-%COMP%]   .groups[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]    > form[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 0;\n  flex-grow: 1;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .group-heading[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 5px 10px;\n  margin-bottom: 10px;\n  color: var(--textLight);\n  text-transform: uppercase;\n  font-size: 130%;\n  border-bottom: 1px solid var(--textLight);\n  text-align: center;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .group-description[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  padding: 0 10px 20px 10px;\n  text-align: center;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .group-actions[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .sso-group[_ngcontent-%COMP%] {\n  display: flex;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .sso-group[_ngcontent-%COMP%]   .group-actions[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  align-self: flex-end;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .sso-group[_ngcontent-%COMP%]   .sso-logo[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  height: 155px;\n}\n.groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.login-help[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-bottom: 25px;\n}\n\n.useUrl[_ngcontent-%COMP%]   .goto[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding-top: 5px;\n}\n.useUrl[_ngcontent-%COMP%]   .goto[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  padding-left: 4px;\n  font-size: 20px;\n}\n\n@media screen and (max-height: 750px) {\n  es-powered-by[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media screen and (max-width: 800px) {\n  .groups[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .groups[_ngcontent-%COMP%]   .providers-select[_ngcontent-%COMP%] {\n    border-right: none;\n    padding-right: 0;\n  }\n  .groups[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%] {\n    padding-top: 10px;\n    padding-left: 0;\n  }\n  .groups[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding: 10px 0;\n    width: 100%;\n  }\n}\n@media screen and (max-width: 900px) {\n  es-powered-by[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-help[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media screen and (max-width: 800px), (max-height: 750px) {\n  [showProviders=true][_ngcontent-%COMP%]   .branding[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media screen and (max-height: 650px) {\n  .branding[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9sb2dpbi1wYWdlL2xvZ2luLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0ZBO0VBQ0ksYURvRlU7QUNyRmQ7O0FBSUk7RUFDSSwwQkFBQTtBQURSOztBQUlBO0VBQ0ksZUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0FBREo7O0FBR0E7RUFDSSxzQkFBQTtBQUFKO0FBQ0k7RUFGSjtJQUdRLGFBQUE7RUFFTjtBQUNGOztBQUFBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBR0o7QUFGSTtFQUNJLGlCQUFBO0FBSVI7O0FBREE7RUFDSSxhQUFBO0VBQ0EsOEJBQUE7QUFJSjtBQUhJO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUFLUjtBQUpRO0VBQ0ksZ0NEZks7QUNxQmpCO0FBTFk7RUNPUixhQUFBO0VBTUksMkRBQUE7RUFDQSxtQkFBQTtBREpSOztBQUpBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUFPSjtBQU5JO0VBQ0ksd0NBQUE7RUFDQSxtQkFBQTtBQVFSO0FBTkk7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQVFSO0FBUFE7RUFDSSxZQUFBO0FBU1o7QUFSWTtFQUNJLG1CQUFBO0FBVWhCO0FBTkk7RUFDSSxRQUFBO0VBQ0EsWUFBQTtBQVFSO0FBUFE7RUFDSSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCRHhEQTtFQ3lEQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0FBU1o7QUFQUTtFQUNJLHVCRC9EQTtFQ2dFQSx5QkFBQTtFQUNBLGtCQUFBO0FBU1o7QUFQUTtFQUNJLGlCQUFBO0FBU1o7QUFQUTtFQUNJLGFBQUE7QUFTWjtBQVJZO0VBQ0ksWUFBQTtFQUNBLG9CQUFBO0FBVWhCO0FBUlk7RUFDSSxrQkFBQTtFQUNBLGFBQUE7QUFVaEI7QUFQUTtFQUNJLFdBQUE7QUFTWjs7QUFMQTtFQUNJLGtCQUFBO0VBQ0Esb0JEaEJVO0FDd0JkOztBQUxJO0VBQ0ksb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBUVI7QUFQUTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtBQVNaOztBQUxBO0VBQ0k7SUFDSSxhQUFBO0VBUU47QUFDRjtBQU5BO0VBQ0k7SUFDSSxzQkFBQTtFQVFOO0VBUE07SUFDSSxrQkFBQTtJQUNBLGdCQUFBO0VBU1Y7RUFQTTtJQUNJLGlCQUFBO0lBQ0EsZUFBQTtFQVNWO0VBUE07SUFDSSxlQUFBO0lBQ0EsV0FBQTtFQVNWO0FBQ0Y7QUFOQTtFQUNJO0lBQ0ksYUFBQTtFQVFOO0VBTkU7SUFDSSxhQUFBO0VBUU47QUFDRjtBQU5BO0VBQ0k7SUFDSSxhQUFBO0VBUU47QUFDRjtBQU5BO0VBQ0k7SUFDSSxhQUFBO0VBUU47QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuQGltcG9ydCAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvY2FyZC92YXJpYWJsZXMnO1xuXG4ubG9naW4tY29udGVudCB7XG4gICAgcGFkZGluZzogJGNhcmRQYWRkaW5nO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5sb2dpbi1jb250ZW50IHtcbiAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAwLjJyZW0pO1xuICAgIH1cbn1cbmVzLXBvd2VyZWQtYnkge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogNSU7XG59XG4ucG93ZXJlZC1kb3duIHtcbiAgICB0b3A6IGNhbGMoNTAlICsgMzc1cHgpO1xuICAgIEBtZWRpYSAobWF4LWhlaWdodDogODUwcHgpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG4uYnJhbmRpbmcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgaW1nIHtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwcHg7XG4gICAgfVxufVxuLnBhc3N3b3JkLWZpZWxkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgICAuZm9yZ290LXBhc3N3b3JkIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIGhlaWdodDogMS4yNWVtO1xuICAgICAgICBhIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplWFNtYWxsO1xuICAgICAgICAgICAgJi5jZGsta2V5Ym9hcmQtZm9jdXNlZCB7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLmdyb3VwcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAkY2FyZFBhZGRpbmcgMDtcbiAgICAucHJvdmlkZXJzLXNlbGVjdCB7XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICR0ZXh0TGlnaHQ7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG4gICAgfVxuICAgIC5sb2dpbi1mb3JtIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICA+IGZvcm0ge1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgW3Nob3dQcm92aWRlcnM9J2ZhbHNlJ10gJiA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgID4gZGl2IHtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgLmdyb3VwLWhlYWRpbmcge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBmb250LXNpemU6IDEzMCU7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHRleHRMaWdodDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuZ3JvdXAtZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDEwcHggMjBweCAxMHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIC5ncm91cC1hY3Rpb25zIHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIC5zc28tZ3JvdXAge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIC5ncm91cC1hY3Rpb25zIHtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuc3NvLWxvZ28ge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1NXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxufVxuLmxvZ2luLWhlbHAge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nLWJvdHRvbTogJGNhcmRQYWRkaW5nO1xufVxuLnVzZVVybCB7XG4gICAgLmdvdG8ge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDRweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiAkbW9iaWxlSGVpZ2h0KSB7XG4gICAgZXMtcG93ZXJlZC1ieSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSoxKSB7XG4gICAgLmdyb3VwcyB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIC5wcm92aWRlcnMtc2VsZWN0IHtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmxvZ2luLWZvcm0ge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlVGFiU3dpdGNoV2lkdGgpIHtcbiAgICBlcy1wb3dlcmVkLWJ5IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLmxvZ2luLWhlbHAge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMSksIChtYXgtaGVpZ2h0OiA3NTBweCkge1xuICAgIFtzaG93UHJvdmlkZXJzPSd0cnVlJ10gLmJyYW5kaW5nIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNjUwcHgpIHtcbiAgICAuYnJhbmRpbmcge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_40__.trigger)('dialog', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIAnimation.switchDialog(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIAnimation.ANIMATION_TIME_FAST))]
    }
  });
}

/***/ }),

/***/ 14693:
/*!*******************************************************!*\
  !*** ./src/app/pages/login-page/login-page.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageModule: () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login-page-routing.module */ 34148);
/* harmony import */ var _login_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-page.component */ 66094);
/* harmony import */ var _url_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url.pipe */ 95597);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);





class LoginPageModule {
  static #_ = this.ɵfac = function LoginPageModule_Factory(t) {
    return new (t || LoginPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: LoginPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.LoginPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](LoginPageModule, {
    declarations: [_login_page_component__WEBPACK_IMPORTED_MODULE_2__.LoginPageComponent, _url_pipe__WEBPACK_IMPORTED_MODULE_3__.UrlPipe],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.LoginPageRoutingModule]
  });
})();

/***/ }),

/***/ 95597:
/*!**********************************************!*\
  !*** ./src/app/pages/login-page/url.pipe.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlPipe: () => (/* binding */ UrlPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class UrlPipe {
  transform(value, args) {
    let url = new URL(value);
    if (args['mode'] == 'domain') {
      return url.host;
    } else {
      return 'unknown or unspecified mode: ' + args['mode'];
    }
  }
  static #_ = this.ɵfac = function UrlPipe_Factory(t) {
    return new (t || UrlPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "esUrl",
    type: UrlPipe,
    pure: true
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_login-page_login-page_module_ts.js.map