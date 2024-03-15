"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_app-login-page_app-login-page_module_ts"],{

/***/ 12080:
/*!***********************************************************************!*\
  !*** ./src/app/pages/app-login-page/app-login-page-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppLoginPageRoutingModule: () => (/* binding */ AppLoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _app_login_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-login-page.component */ 23131);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _app_login_page_component__WEBPACK_IMPORTED_MODULE_0__.AppLoginPageComponent
}];
class AppLoginPageRoutingModule {
  static #_ = this.ɵfac = function AppLoginPageRoutingModule_Factory(t) {
    return new (t || AppLoginPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: AppLoginPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppLoginPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 23131:
/*!******************************************************************!*\
  !*** ./src/app/pages/app-login-page/app-login-page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppLoginPageComponent: () => (/* binding */ AppLoginPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services_cordova_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/cordova.service */ 84003);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/bridge.service */ 34997);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/input-password/input-password.component */ 35799);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 21916);




















function AppLoginPageComponent_es_global_progress_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-global-progress");
  }
}
function AppLoginPageComponent_div_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AppLoginPageComponent_div_1_div_21_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r4.register());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "LOGIN.REGISTER_TEXT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 4, "LOGIN.REGISTER_LINK"), " ");
  }
}
function AppLoginPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "es-card", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("onCancel", function AppLoginPageComponent_div_1_Template_es_card_onCancel_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r6.buttonLoginBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "div", 5)(11, "form", 6, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngSubmit", function AppLoginPageComponent_div_1_Template_form_ngSubmit_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r8.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "mat-form-field")(14, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function AppLoginPageComponent_div_1_Template_input_ngModelChange_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r9.checkConditions());
    })("ngModelChange", function AppLoginPageComponent_div_1_Template_input_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r10.username = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "div")(19, "es-input-password", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function AppLoginPageComponent_div_1_Template_es_input_password_valueChange_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r11.checkConditions());
    })("keydown.enter", function AppLoginPageComponent_div_1_Template_es_input_password_keydown_enter_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r12.login());
    })("valueChange", function AppLoginPageComponent_div_1_Template_es_input_password_valueChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r13.password = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, AppLoginPageComponent_div_1_div_21_Template, 7, 6, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 11, "LOGIN_APP.LOGIN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 13, "LOGIN_APP.LOGIN_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 15, "LOGIN_APP.LOGIN_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("isCancelable", true)("buttons", ctx_r1.buttons);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 17, "LOGIN.USERNAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r1.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](20, 19, "LOGIN.PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("required", true)("value", ctx_r1.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.config.register.local || ctx_r1.config.register.registerUrl);
  }
}
// possible states this UI component can be in
var StateUI;
(function (StateUI) {
  StateUI[StateUI["SERVERLIST"] = 0] = "SERVERLIST";
  StateUI[StateUI["LOGIN"] = 1] = "LOGIN";
  StateUI[StateUI["SERVERURL"] = 2] = "SERVERURL";
  StateUI[StateUI["NOINTERNET"] = 3] = "NOINTERNET";
})(StateUI || (StateUI = {}));
// tslint:disable:no-console
class AppLoginPageComponent {
  constructor(toast, router, route, translations, platformLocation, cordova, connector, bridge, configService, locator) {
    var _this = this;
    this.toast = toast;
    this.router = router;
    this.route = route;
    this.translations = translations;
    this.platformLocation = platformLocation;
    this.cordova = cordova;
    this.connector = connector;
    this.bridge = bridge;
    this.configService = configService;
    this.locator = locator;
    this.isLoading = true;
    this.disabled = true;
    this.username = '';
    this.password = '';
    this.serverurl = 'https://';
    this.errorURL = null;
    console.info('startup app');
    this.isLoading = true;
    // WHEN RUNNING ON DESKTOP --> FORWARD TO BASIC LOGIN PAGE
    if (!this.cordova.isRunningCordova()) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.UIConstants.ROUTER_PREFIX + 'login']);
      return;
    }
    this.route.queryParams.subscribe(params => {
      this.locationNext = params['next'];
    });
    // 1. Wait until Cordova is Ready
    this.cordova.subscribeServiceReady().subscribe( /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // app startup, cordova has valid data ?
      // -> go to default location (this will check oauth)
      if (yield _this.cordova.hasValidConfig()) {
        console.info('app config valid, continuing to default location');
        _this.cordova.refreshOAuth().subscribe(() => {
          _this.goToDefaultLocation();
        });
        return;
      }
      // set the self set server url if available from persistence
      // for this value its no problem that result is async
      // init translation service
      _this.init();
    }));
  }
  recoverPassword() {
    if (this.config.register.local) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.UIConstants.ROUTER_PREFIX + 'register', 'request']);
    } else {
      window.location.href = this.config.register.recoverUrl;
    }
  }
  buttonExitApp() {
    this.cordova.exitApp();
  }
  ngOnInit() {}
  checkConditions() {
    this.disabled = !this.username; // || !this.password;
    this.updateButtons();
  }
  buttonLoginBack() {
    //window.history.back();
    //window.location.replace(this.cordova.getIndexPath()+"?reset=true");
    this.cordova.restartCordova();
    //(navigator as any).app.loadUrl(this.cordova.getIndexPath()+"?reset=true");
  }

  login() {
    /*
    // test camera
    this.cordova.getPhotoFromCamera(
    (win:any)=>{
    },
    (error:any, info:any)=>{
        console.dir(info);
    });
    if (1==1) return;
    */
    /*
    // test file download
    this.cordova.downloadContent("http://sample-videos.com/video/mp4/240/big_buck_bunny_240p_20mb.mp4", "test.mp4",(win:any)=>{
        alert("OK "+win);
        this.cordova.openContentNative(win,()=>{
            alert("OK Open");
        }, (text:string, error:any) => {
            alert("FAIL open");
        });
    }, (text:string,error:any) => {
        console.error(text, error);
        alert("FAIL: "+text);
    });
    if (1==1) return;
    */
    this.isLoading = true;
    // APP: oAuth Login
    this.cordova.loginOAuth(this.locator.endpointUrl, this.username, this.password).subscribe(oauthTokens => {
      this.cordova.setPermanentStorage(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CORDOVA_STORAGE_OAUTHTOKENS, JSON.stringify(oauthTokens));
      // continue to within the app
      this.goToDefaultLocation();
    }, error => {
      console.warn(error);
      this.isLoading = false;
      if (typeof error == 'string') {
        this.toast.error(null, error);
      } else {
        this.toast.error(null, 'LOGIN.ERROR');
      }
    });
    /*
    this.cordova.setServerURL(this.currentServer.url+"rest/",true).subscribe(()=> {
      });
    */
  }

  goToDefaultLocation() {
    if (this.locationNext) {
      console.info('location next', this.locationNext);
      window.location.replace(this.locationNext);
    } else {
      this.configService.getAll().subscribe(() => {
        _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.goToDefaultLocation(this.router, this.platformLocation, this.configService, true);
      });
    }
  }
  getServerIcon() {
    return 'assets/images/app-icon.svg';
  }
  init() {
    this.translations.waitForInit().subscribe(() => {
      this.serverurl = this.locator.endpointUrl;
      this.configService.getAll().subscribe(config => {
        this.config = config;
        if (!this.config.register) {
          // default register mode: allow local registration if not disabled
          this.config.register = {
            local: true
          };
        }
        this.isLoading = false;
        this.handleCurrentState();
      });
    });
  }
  register() {
    if (this.config.register.local) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.UIConstants.ROUTER_PREFIX + 'register']);
    } else {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.openUrl(this.config.register.registerUrl, this.bridge, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.OPEN_URL_MODE.BlankSystemBrowser);
    }
  }
  updateButtons() {
    const login = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('LOGIN.LOGIN', {
      color: 'primary'
    }, () => this.login());
    login.disabled = this.disabled;
    if (this.config && (this.config.register.local || this.config.register.recoverUrl)) {
      const recover = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('LOGIN.RECOVER_PASSWORD', {
        color: 'standard'
      }, () => this.recoverPassword());
      this.buttons = [recover, login];
    } else {
      this.buttons = [login];
    }
  }
  handleCurrentState() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // an external login, e.g. via shibboleth, may occured. get oauth for the session, and store it
      // this will break shibboleth/sso!
      /*if (!(await this.cordova.hasValidConfig())) {
          console.info('empty app oauth status, show login');
          this.checkLoginUrl();
          return;
      }*/
      _this2.connector.isLoggedIn(true).subscribe(data => {
        console.info('app login status', data);
        if (data.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
          _this2.cordova.loginOAuth(_this2.locator.endpointUrl, null, null, 'client_credentials').subscribe(oauthTokens => {
            _this2.cordova.setPermanentStorage(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CORDOVA_STORAGE_OAUTHTOKENS, JSON.stringify(oauthTokens));
            // continue to within the app
            _this2.goToDefaultLocation();
          });
        } else {
          _this2.checkLoginUrl();
        }
      }, error => {
        _this2.checkLoginUrl();
      });
    })();
  }
  checkLoginUrl() {
    if (this.configService.instant('loginUrl')) {
      window.location.href = this.configService.instant('loginUrl');
    }
  }
  static #_ = this.ɵfac = function AppLoginPageComponent_Factory(t) {
    return new (t || AppLoginPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_12__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_cordova_service__WEBPACK_IMPORTED_MODULE_4__.CordovaService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_5__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestLocatorService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: AppLoginPageComponent,
    selectors: [["es-app-login-page"]],
    decls: 2,
    vars: 2,
    consts: [[4, "ngIf"], ["class", "appLogin", 4, "ngIf"], [1, "appLogin"], [1, "infoTop", 2, "margin-top", "-10px"], ["modal", "auto", "width", "mlarge", "height", "large", "avatar", "assets/images/app-icon.svg", 3, "title", "isCancelable", "buttons", "onCancel"], [1, "card-content-padding"], [3, "ngSubmit"], ["loginForm", ""], ["matInput", "", "required", "", "autofocus", "", "name", "username", "id", "username", 3, "ngModel", "ngModelChange"], ["inputId", "password", 3, "label", "required", "value", "valueChange", "keydown.enter"], ["class", "register", 4, "ngIf"], [1, "register"], ["mat-button", "", "color", "primary", 3, "click"], ["esIcon", "arrow_forward"]],
    template: function AppLoginPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, AppLoginPageComponent_es_global_progress_0_Template, 1, 0, "es-global-progress", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, AppLoginPageComponent_div_1_Template, 22, 21, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgForm, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_7__.GlobalProgressComponent, _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_8__.InputPasswordComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe],
    styles: ["\n\n.appLogin[_ngcontent-%COMP%] {\n  background-color: #333;\n  width: 100%;\n  height: 100%;\n}\n\n.card[_ngcontent-%COMP%], .card-high[_ngcontent-%COMP%] {\n  top: 15%;\n  box-shadow: 0 10px 70px rgba(0, 0, 0, 0.15);\n}\n\n[_nghost-%COMP%]     mat-form-field {\n  width: 100%;\n}\n\n.infoTop[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6%;\n  left: 50%;\n  margin-left: -265px;\n  max-width: 530px;\n  padding: 20px;\n  padding-top: 0;\n}\n.infoTop[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  color: #aaa;\n}\n.infoTop[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 120%;\n  font-weight: bold;\n  margin: 0;\n  margin-bottom: 5px;\n  color: #fff;\n}\n\n.register[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n.register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11pt;\n  position: relative;\n  top: 3px;\n}\n\n@media only screen and (max-width: 600px) {\n  .infoTop[_ngcontent-%COMP%] {\n    left: 0;\n    width: 100%;\n    margin-left: 0;\n  }\n}\n@media only screen and (max-width: 800px) {\n  .branding[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 25px;\n    left: calc(50% - 75px);\n    height: 50px;\n  }\n  .branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100px;\n    height: auto;\n  }\n}\n@media screen and (max-height: 750px) {\n  .card[_ngcontent-%COMP%]:not(.card-high) {\n    top: 20%;\n    bottom: auto;\n  }\n}\n@media screen and (max-height: 550px) {\n  .card[_ngcontent-%COMP%]:not(.card-high) {\n    top: 0;\n    bottom: 0;\n  }\n  .infoTop[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hcHAtbG9naW4tcGFnZS9hcHAtbG9naW4tcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQUo7O0FBRUE7O0VBRUksUUFBQTtFQ0NBLDJDQUFBO0FEQ0o7O0FBQ0E7RUFDSSxXQUFBO0FBRUo7O0FBQUE7RUFDSSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FBR0o7QUFGSTtFQUNJLFdETlE7QUNVaEI7QUFGSTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFJUjs7QUFEQTtFQUNJLHVCRG5CUTtBQ3VCWjtBQUhJO0VBQ0kseUJBQUE7QUFLUjtBQUpRO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtBQU1aOztBQUZBO0VBQ0k7SUFDSSxPQUFBO0lBQ0EsV0FBQTtJQUNBLGNBQUE7RUFLTjtBQUNGO0FBSEE7RUFDSTtJQUNJLGtCQUFBO0lBQ0EsU0FBQTtJQUNBLHNCQUFBO0lBQ0EsWUFBQTtFQUtOO0VBSk07SUFDSSxZQUFBO0lBQ0EsWUFBQTtFQU1WO0FBQ0Y7QUFGQTtFQUNJO0lBQ0ksUUFBQTtJQUNBLFlBQUE7RUFJTjtBQUNGO0FBREE7RUFDSTtJQUNJLE1BQUE7SUFDQSxTQUFBO0VBR047RUFERTtJQUNJLGFBQUE7RUFHTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5hcHBMb2dpbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG4uY2FyZCxcbi5jYXJkLWhpZ2gge1xuICAgIHRvcDogMTUlO1xuICAgIEBpbmNsdWRlIG1hdGVyaWFsU2hhZG93TGFyZ2UoKTtcbn1cbjpob3N0IDo6bmctZGVlcCBtYXQtZm9ybS1maWVsZCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4uaW5mb1RvcCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNiU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtMjY1cHg7XG4gICAgbWF4LXdpZHRoOiA1MzBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIGRpdiB7XG4gICAgICAgIGNvbG9yOiAkdGV4dFZlcnlMaWdodDtcbiAgICB9XG4gICAgaDEge1xuICAgICAgICBmb250LXNpemU6IDEyMCU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgfVxufVxuLnJlZ2lzdGVyIHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBhIHtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDExcHQ7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IDNweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoIC0gJG1vYmlsZVN0YWdlKjEpIHtcbiAgICAuaW5mb1RvcCB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICB9XG59XG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMSkge1xuICAgIC5icmFuZGluZyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAyNXB4O1xuICAgICAgICBsZWZ0OiBjYWxjKDUwJSAtIDc1cHgpO1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIGltZyB7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiAoJG1vYmlsZUhlaWdodCkpIHtcbiAgICAuY2FyZDpub3QoLmNhcmQtaGlnaCkge1xuICAgICAgICB0b3A6IDIwJTtcbiAgICAgICAgYm90dG9tOiBhdXRvO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6ICgkbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkKSkge1xuICAgIC5jYXJkOm5vdCguY2FyZC1oaWdoKSB7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgIH1cbiAgICAuaW5mb1RvcCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuIiwiQG1peGluIGltYWdlRGlzYWJsZWRCbHVyKCkge1xuICAgIC13ZWJraXQtZmlsdGVyOiBibHVyKDNweCk7XG4gICAgZmlsdGVyOiBibHVyKDNweCk7XG59XG5AbWl4aW4gc2hvcnRlblRleHQoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TGFyZ2UoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDEwcHggNzBweCByZ2JhKDAsIDAsIDAsIDAuMTUpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIGxpbWl0TGluZUxlbmd0aCgkd2lkdGgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgbWF4LXdpZHRoOiAkd2lkdGg7XG59XG5AbWl4aW4gdW5zZWxlY3RhYmxlVGV4dCgpIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5AbWl4aW4gaW9zU2Nyb2xsaW5nKCkge1xuICAgIC8qIGlvcyBzY3JvbGxpbmcgZml4ICovXG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuQG1peGluIHBsYWNlaG9sZGVyIHtcbiAgICA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsSW5zZXRGb2N1cygpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgJGZvY3VzV2lkdGggJGZvY3VzQ29sb3IgIWltcG9ydGFudDtcbiAgICBAbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xuICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJywgJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbERhc2hlZEZvY3VzKCkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIGRhc2hlZCAkZm9jdXNDb2xvcjtcbn1cblxuQG1peGluIGZvY3VzU2hhZG93KCRkYXJrOiB0cnVlLCAkc3RyZW5ndGg6IDAuMSkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgQGlmICRkYXJrPT10cnVlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICB9XG59XG5AbWl4aW4gZGFya2VuKCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5Db2xvcjtcbn1cbkBtaXhpbiBkYXJrZW5MaWdodCgpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuTGlnaHRDb2xvcjtcbn1cbkBtaXhpbiBibHVyQmFja2dyb3VuZCgkcmFkaXVzOiA1cHgpIHtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoJHJhZGl1cyk7XG59XG5AbWl4aW4gc2V0R2xvYmFsRm9jdXMoJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAkZm9jdXNXaWR0aCAkY29sb3IgIWltcG9ydGFudDtcbn1cblxuQG1peGluIHJlbW92ZUJ1dHRvbkRlZmF1bHRTdHlsZXMge1xuICAgIGJhY2tncm91bmQ6IHVuc2V0O1xuICAgIGJvcmRlcjogdW5zZXQ7XG4gICAgcGFkZGluZzogdW5zZXQ7XG59XG5cbkBtaXhpbiBhZnRlclBzZXVkb0VsZW1lbnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AaW1wb3J0ICdwcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 71768:
/*!***************************************************************!*\
  !*** ./src/app/pages/app-login-page/app-login-page.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppLoginPageModule: () => (/* binding */ AppLoginPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _app_login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-login-page-routing.module */ 12080);
/* harmony import */ var _app_login_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-login-page.component */ 23131);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class AppLoginPageModule {
  static #_ = this.ɵfac = function AppLoginPageModule_Factory(t) {
    return new (t || AppLoginPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AppLoginPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _app_login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppLoginPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppLoginPageModule, {
    declarations: [_app_login_page_component__WEBPACK_IMPORTED_MODULE_2__.AppLoginPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _app_login_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppLoginPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_app-login-page_app-login-page_module_ts.js.map