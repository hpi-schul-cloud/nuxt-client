"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_profile-page_profile-page_module_ts"],{

/***/ 31396:
/*!*******************************************************************!*\
  !*** ./src/app/pages/profile-page/profile-page-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePageRoutingModule: () => (/* binding */ ProfilePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _profile_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-page.component */ 97073);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: ':authority',
  component: _profile_page_component__WEBPACK_IMPORTED_MODULE_0__.ProfilePageComponent
}];
class ProfilePageRoutingModule {
  static #_ = this.ɵfac = function ProfilePageRoutingModule_Factory(t) {
    return new (t || ProfilePageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ProfilePageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ProfilePageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 97073:
/*!**************************************************************!*\
  !*** ./src/app/pages/profile-page/profile-page.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePageComponent: () => (/* binding */ ProfilePageComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/input-password/input-password.component */ 35799);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/user-avatar/user-avatar.component */ 98588);
/* harmony import */ var _shared_pipes_authority_color_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/pipes/authority-color.pipe */ 97185);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ngx-translate/core */ 21916);





























const _c0 = ["avatar"];
function ProfilePageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function ProfilePageComponent_div_2_img_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "img", 30);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r2.user.profile.avatar + "&crop=true&width=400&height=400", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function ProfilePageComponent_div_2_img_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "img", 30);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r3.user.profile.avatar + "&crop=true&width=400&height=400", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function ProfilePageComponent_div_2_img_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "img", 30);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r4.avatarImage, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function ProfilePageComponent_div_2_es_actionbar_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "es-actionbar", 31);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleMap"]("flat");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("numberOfAlwaysVisibleOptions", 1)("numberOfAlwaysVisibleOptionsMobile", 1)("options", ctx_r5.actions);
  }
}
function ProfilePageComponent_div_2_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_button_13_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r18.edit = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 1, "PROFILES.CANCEL_EDIT"));
  }
}
function ProfilePageComponent_div_2_es_user_avatar_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "es-user-avatar", 34);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("user", ctx_r7.user);
  }
}
function ProfilePageComponent_div_2_es_user_avatar_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "es-user-avatar", 35);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("user", ctx_r8.userEdit)("customImage", ctx_r8.avatarFile);
  }
}
function ProfilePageComponent_div_2_div_16_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_16_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r22.clearAvatar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "i", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function ProfilePageComponent_div_2_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 36)(1, "input", 37, 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function ProfilePageComponent_div_2_div_16_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r24.updateAvatar($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_16_Template_div_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r25);
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](_r20.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, ProfilePageComponent_div_2_div_16_button_7_Template, 2, 0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 2, "PROFILES.IMG_CHANGE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r9.hasAvatar());
  }
}
function ProfilePageComponent_div_2_div_17_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 45)(1, "a", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate1"]("href", "mailto:", ctx_r27.user.profile.email, "", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r27.user.profile.email);
  }
}
function ProfilePageComponent_div_2_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div")(1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ProfilePageComponent_div_2_div_17_div_4_Template, 3, 2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 2, ctx_r10.user));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r10.user.profile.email);
  }
}
function ProfilePageComponent_div_2_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div")(1, "div", 47)(2, "div", 48)(3, "mat-form-field", 49)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_18_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r28.userEdit.profile.vcard.title = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div", 51)(9, "mat-form-field", 49)(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_18_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r30.userEdit.profile.firstName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "div", 52)(15, "mat-form-field", 49)(16, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_18_Template_input_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r31.userEdit.profile.lastName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "div", 53)(21, "mat-form-field", 54)(22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_18_Template_input_ngModelChange_25_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r32.userEdit.profile.email = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](26, "mat-slide-toggle", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_18_Template_mat_slide_toggle_ngModelChange_26_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r29);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r33.profileSettings.showEmail = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "mat-label", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](30, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 13, "VCARD.Title"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r11.userEdit.profile.vcard.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](12, 15, "USER.firstName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r11.userEdit.profile.firstName);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](18, 17, "USER.lastName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r11.userEdit.profile.lastName);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](24, 19, "USER.email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r11.userEdit.profile.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](27, 21, "PROFILE_SETTINGS.SHOW_EMAIL_TOOLTIP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", "primary-bright")("checked", ctx_r11.profileSettings.showEmail)("ngModel", ctx_r11.profileSettings.showEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](30, 23, "PROFILE_SETTINGS.SHOW_EMAIL_LABEL"));
  }
}
function ProfilePageComponent_div_2_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_button_20_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r34.saveEdits());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "SAVE"), " ");
  }
}
function ProfilePageComponent_div_2_div_43_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_43_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r38.aboutEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "PROFILES.EDIT"), " ");
  }
}
function ProfilePageComponent_div_2_div_43_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_43_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r40.editAbout = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "PROFILES.CANCEL_EDIT"), " ");
  }
}
function ProfilePageComponent_div_2_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ProfilePageComponent_div_2_div_43_button_1_Template, 3, 3, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, ProfilePageComponent_div_2_div_43_button_2_Template, 3, 3, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r13.editAbout && !ctx_r13.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r13.editAbout);
  }
}
function ProfilePageComponent_div_2_div_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 62)(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "textarea", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_44_Template_textarea_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r43);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r42.userEdit.profile.about = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 64)(7, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_44_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r43);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r44.saveEdits());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 3, "PROFILES.ABOUT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r14.userEdit.profile.about);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 5, "SAVE"), " ");
  }
}
function ProfilePageComponent_div_2_div_45_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r45.user.profile.about);
  }
}
function ProfilePageComponent_div_2_div_45_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "PROFILES.NO_ABOUT" + (ctx_r46.isMe ? "_ME" : "")), " ");
  }
}
function ProfilePageComponent_div_2_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ProfilePageComponent_div_2_div_45_div_1_Template, 2, 1, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, ProfilePageComponent_div_2_div_45_div_2_Template, 3, 3, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r15.user.profile.about);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r15.user.profile.about);
  }
}
function ProfilePageComponent_div_2_div_46_i_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 77);
  }
}
function ProfilePageComponent_div_2_div_46_i_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 78);
  }
}
function ProfilePageComponent_div_2_div_46_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "es-info-message", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "mat-form-field", 81)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "input", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_46_div_9_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r50.userEdit.profile.vcard.orcid = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](8, "mat-hint", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "mat-form-field", 81)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function ProfilePageComponent_div_2_div_46_div_9_Template_input_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r51);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r52.userEdit.profile.vcard.gnduri = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](15, "mat-hint", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](17, "div", 64)(18, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_46_div_9_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r51);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r53.savePersistentIds());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("@overlay", ctx_r49.showPersistentIds);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 9, "PROFILES.PERSISTENT_ID_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 11, "VCARD.X-ORCID"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r49.userEdit.profile.vcard.orcid);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 13, "VCARD_HINT.X-ORCID"), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](13, 15, "VCARD.X-GND-URI"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx_r49.userEdit.profile.vcard.gnduri);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](16, 17, "VCARD_HINT.X-GND-URI"), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](20, 19, "SAVE"), " ");
  }
}
function ProfilePageComponent_div_2_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 70)(1, "div", 71)(2, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_46_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r55);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r54.showPersistentIds = !ctx_r54.showPersistentIds);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "i", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, ProfilePageComponent_div_2_div_46_i_7_Template, 1, 0, "i", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, ProfilePageComponent_div_2_div_46_i_8_Template, 1, 0, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, ProfilePageComponent_div_2_div_46_div_9_Template, 21, 21, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, "WORKSPACE.CONTRIBUTOR.PERSISTENT_IDS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r16.showPersistentIds);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r16.showPersistentIds);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r16.showPersistentIds);
  }
}
function ProfilePageComponent_div_2_div_47_i_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 91);
  }
}
function ProfilePageComponent_div_2_div_47_i_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 92);
  }
}
function ProfilePageComponent_div_2_div_47_i_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 93);
  }
}
function ProfilePageComponent_div_2_div_47_i_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 94);
  }
}
function ProfilePageComponent_div_2_div_47_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 95)(1, "es-input-password", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function ProfilePageComponent_div_2_div_47_div_10_Template_es_input_password_valueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r63);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r62.oldPassword = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "es-input-password", 97, 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function ProfilePageComponent_div_2_div_47_div_10_Template_es_input_password_valueChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r63);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r64.password = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 64)(8, "button", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_47_div_10_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r63);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r65.savePassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](4);
    const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("@overlay", ctx_r60.changePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 12, "OLD_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("displayStrength", false)("value", ctx_r60.oldPassword)("required", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 14, "NEW_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("hint", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 16, "REGISTER.HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("displayStrength", true)("value", ctx_r60.password)("required", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", !ctx_r60.oldPassword.trim() || _r61.passwordStrength === "weak");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](10, 18, "SAVE"), " ");
  }
}
function ProfilePageComponent_div_2_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 85)(1, "div", 71)(2, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProfilePageComponent_div_2_div_47_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r67);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r66.editPassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, ProfilePageComponent_div_2_div_47_i_3_Template, 1, 0, "i", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ProfilePageComponent_div_2_div_47_i_4_Template, 1, 0, "i", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, ProfilePageComponent_div_2_div_47_i_8_Template, 1, 0, "i", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, ProfilePageComponent_div_2_div_47_i_9_Template, 1, 0, "i", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, ProfilePageComponent_div_2_div_47_div_10_Template, 11, 20, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r17.changePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r17.changePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 6, "CHANGE_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r17.changePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r17.changePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r17.changePassword);
  }
}
const _c1 = function (a0) {
  return {
    name: a0
  };
};
function ProfilePageComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 6)(1, "div", 7)(2, "h1", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "authorityColor");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](8, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, ProfilePageComponent_div_2_img_9_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, ProfilePageComponent_div_2_img_10_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, ProfilePageComponent_div_2_img_11_Template, 1, 1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, ProfilePageComponent_div_2_es_actionbar_12_Template, 1, 5, "es-actionbar", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](13, ProfilePageComponent_div_2_button_13_Template, 5, 3, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, ProfilePageComponent_div_2_es_user_avatar_14_Template, 1, 1, "es-user-avatar", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, ProfilePageComponent_div_2_es_user_avatar_15_Template, 1, 2, "es-user-avatar", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](16, ProfilePageComponent_div_2_div_16_Template, 8, 4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](17, ProfilePageComponent_div_2_div_17_Template, 5, 4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](18, ProfilePageComponent_div_2_div_18_Template, 31, 25, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](20, ProfilePageComponent_div_2_button_20_Template, 3, 3, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](21, "div", 19)(22, "div", 20)(23, "div")(24, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "div")(30, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](33, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "div")(36, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](38, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](39, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](42, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](43, ProfilePageComponent_div_2_div_43_Template, 3, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](44, ProfilePageComponent_div_2_div_44_Template, 10, 7, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](45, ProfilePageComponent_div_2_div_45_Template, 3, 2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](46, ProfilePageComponent_div_2_div_46_Template, 10, 6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](47, ProfilePageComponent_div_2_div_47_Template, 11, 8, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    let tmp_14_0;
    let tmp_16_0;
    let tmp_18_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](4, 26, "PROFILES.TITLE", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](39, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 29, ctx_r1.user))), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("background-color", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 31, ctx_r1.edit ? ctx_r1.userEdit : ctx_r1.user));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r1.edit && ctx_r1.user.profile.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit && !ctx_r1.avatarFile && ctx_r1.userEdit.profile.avatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit && ctx_r1.avatarFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.isMe && !ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.isMe && ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.edit);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](26, 33, "PROFILES.STATS.MATERIALS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_14_0 = ctx_r1.userStats == null ? null : ctx_r1.userStats.nodeCount) !== null && tmp_14_0 !== undefined ? tmp_14_0 : "-", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](32, 35, "PROFILES.STATS.COLLECTIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_16_0 = ctx_r1.userStats == null ? null : ctx_r1.userStats.collectionCount) !== null && tmp_16_0 !== undefined ? tmp_16_0 : "-", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](38, 37, "PROFILES.STATS.MATERIALS_CC"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (tmp_18_0 = ctx_r1.userStats == null ? null : ctx_r1.userStats.nodeCountCC) !== null && tmp_18_0 !== undefined ? tmp_18_0 : "-", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.isMe && ctx_r1.editProfile);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.editAbout);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r1.editAbout);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.isMe && ctx_r1.editProfile);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r1.isMe && ctx_r1.editProfile && ctx_r1.userEditProfile);
  }
}
class ProfilePageComponent {
  constructor(toast, route, mainNav, connector, translations, router, config, sanitizer, loadingScreen, iamService) {
    this.toast = toast;
    this.route = route;
    this.mainNav = mainNav;
    this.connector = connector;
    this.translations = translations;
    this.router = router;
    this.config = config;
    this.sanitizer = sanitizer;
    this.loadingScreen = loadingScreen;
    this.iamService = iamService;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_13__.Subject();
    this.loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed
    });
    this.editAbout = false;
    this.oldPassword = '';
    this.password = '';
    this.showPersistentIds = false;
    this.translations.waitForInit().subscribe(() => {
      route.params.subscribe(params => {
        this.editProfileUrl = this.config.instant('editProfileUrl');
        this.editProfile = this.config.instant('editProfile', true);
        this.loadUser(params.authority);
        this.getProfileSetting(params.authority);
      });
    });
    this.editAction = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OptionItem('PROFILES.EDIT', 'edit', () => this.beginEdit());
    this.editAction.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.DefaultGroups.Edit;
    this.editAction.showAsAction = true;
    this.actions = [this.editAction];
  }
  static #_ = this.PASSWORD_MIN_LENGTH = 5;
  ngOnInit() {
    this.mainNav.setMainNavConfig({
      title: 'PROFILES.TITLE_NAV',
      currentScope: 'profiles'
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  loadUser(authority) {
    this.toast.showProgressSpinner();
    this.connector.isLoggedIn().subscribe(login => {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.forkJoin)(this.iamService.getUser(authority), this.iamService.getUserStats(authority)).subscribe(([profile, stats]) => {
        this.user = profile.person;
        this.userStats = stats;
        this.userEditProfile = profile.editProfile;
        this.toast.closeProgressSpinner();
        this.userEdit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.deepCopy(this.user);
        if (!(this.user.profile.vcard instanceof ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.VCard)) {
          this.user.profile.vcard = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.VCard(this.user.profile.vcard);
        }
        this.userEdit.profile.vcard = this.user.profile.vcard?.copy();
        if (!this.loadingTask.isDone) {
          this.loadingTask.done();
        }
        this.iamService.getCurrentUserAsync().then(me => {
          this.isMe = profile.person.authorityName === me.person.authorityName;
          if (this.isMe && login.isGuest) {
            _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestHelper.goToLogin(this.router, this.config);
          }
          this.editAction.isEnabled = this.editProfile && !!(this.userEditProfile || this.editProfileUrl);
        });
      }, error => {
        this.toast.closeProgressSpinner();
        if (!this.loadingTask.isDone) {
          this.loadingTask.done();
        }
        this.toast.error(null, 'PROFILES.LOAD_ERROR');
      });
    });
  }
  getProfileSetting(authority) {
    this.iamService.getProfileSettings(authority).subscribe(res => {
      this.profileSettings = res;
    }, error => {
      this.profileSettings = null;
    });
  }
  updateAvatar(event) {
    if (this.avatarElement.nativeElement.files && this.avatarElement.nativeElement.files.length) {
      this.avatarFile = this.avatarElement.nativeElement.files[0];
      this.avatarImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.avatarFile));
    }
  }
  beginEdit() {
    if (!this.userEditProfile && this.editProfileUrl) {
      window.location.href = this.editProfileUrl;
      return;
    }
    this.userEdit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.deepCopy(this.user);
    this.userEdit.profile.vcard = this.user.profile.vcard.copy();
    this.edit = true;
    this.avatarFile = null;
  }
  clearAvatar() {
    this.avatarFile = null;
    this.userEdit.profile.avatar = null;
  }
  hasAvatar() {
    return this.userEdit.profile.avatar || this.avatarFile;
  }
  savePassword() {
    if (this.changePassword) {
      this.toast.showProgressSpinner();
      if (this.password.length < ProfilePageComponent.PASSWORD_MIN_LENGTH) {
        this.toast.error(null, 'PASSWORD_MIN_LENGTH', {
          length: ProfilePageComponent.PASSWORD_MIN_LENGTH
        });
        this.toast.closeProgressSpinner();
        return;
      }
      const credentials = {
        oldPassword: this.oldPassword,
        newPassword: this.password
      };
      this.iamService.editUserCredentials(this.user.authorityName, credentials).subscribe(() => {
        this.saveAvatar();
      }, error => {
        if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestHelper.errorMessageContains(error, 'BadCredentialsException')) {
          this.toast.error(null, 'WRONG_PASSWORD');
          this.toast.closeProgressSpinner();
        } else {
          this.toast.error(error);
          this.saveAvatar();
        }
      });
    } else {
      this.saveAvatar();
    }
  }
  saveEdits() {
    if (!this.userEdit.profile.firstName?.trim()) {
      this.toast.error(null, 'PROFILES.ERROR.FIRST_NAME');
      return;
    }
    if (!this.userEdit.profile.lastName?.trim()) {
      this.toast.error(null, 'PROFILES.ERROR.LAST_NAME');
      return;
    }
    if (!this.userEdit.profile.email?.trim()) {
      this.toast.error(null, 'PROFILES.ERROR.EMAIL');
      return;
    }
    this.toast.showProgressSpinner();
    this.iamService.editUser(this.user.authorityName, this.userEdit.profile).subscribe(() => {
      this.saveProfileSettings();
    }, error => {
      this.toast.closeProgressSpinner();
      this.toast.error(error);
    });
  }
  saveAvatar() {
    this.user = null;
    if (!this.userEdit.profile.avatar && !this.avatarFile) {
      this.iamService.removeUserAvatar(this.userEdit.authorityName).subscribe(() => {
        this.edit = false;
        this.editAbout = false;
        this.oldPassword = '';
        this.password = '';
        this.changePassword = false;
        this.toast.toast('PROFILE_UPDATED');
        this.loadUser(this.userEdit.authorityName);
      }, error => {
        this.toast.error(error);
      });
    } else if (this.avatarFile) {
      this.iamService.setUserAvatar(this.avatarFile, this.userEdit.authorityName).subscribe(() => {
        this.edit = false;
        this.editAbout = false;
        this.toast.toast('PROFILE_UPDATED');
        this.loadUser(this.userEdit.authorityName);
      }, error => {
        this.toast.error(error);
      });
    } else {
      this.toast.closeProgressSpinner();
      this.edit = false;
      this.editAbout = false;
      this.toast.toast('PROFILE_UPDATED');
      this.loadUser(this.userEdit.authorityName);
    }
  }
  saveProfileSettings() {
    this.iamService.setProfileSettings(this.profileSettings, this.user.authorityName).subscribe(() => {
      this.saveAvatar();
    }, error => {
      this.toast.closeProgressSpinner();
      this.toast.error(error);
    });
  }
  aboutEdit() {
    this.userEdit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.deepCopy(this.user);
    this.userEdit.profile.vcard = this.user.profile.vcard?.copy();
    this.editAbout = true;
  }
  editPassword() {
    this.changePassword = !this.changePassword;
    this.password = '';
    this.oldPassword = '';
  }
  savePersistentIds() {
    this.saveEdits();
  }
  static #_2 = this.ɵfac = function ProfilePageComponent_Factory(t) {
    return new (t || ProfilePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_2__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_3__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_4__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestIamService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: ProfilePageComponent,
    selectors: [["es-profile-page"]],
    viewQuery: function ProfilePageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.avatarElement = _t.first);
      }
    },
    decls: 3,
    vars: 2,
    consts: [["class", "profile-bg", 4, "ngIf"], [1, "profiles-wrapper"], ["class", "profiles", 4, "ngIf"], [1, "profile-bg"], [1, "avatar-default"], [1, "profile-gradient"], [1, "profiles"], ["role", "main", "esSkipTarget", "MAIN_CONTENT", 1, "main"], ["esTitle", "", 1, "cdk-visually-hidden"], [1, "top"], ["class", "blurred-image", "alt", "", 3, "src", 4, "ngIf"], [3, "style", "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile", "options", 4, "ngIf"], ["mat-button", "", "class", "edit clickable", 3, "click", 4, "ngIf"], [3, "user", 4, "ngIf"], [3, "user", "customImage", 4, "ngIf"], ["class", "editAvatar", 4, "ngIf"], [4, "ngIf"], [1, "save"], ["mat-raised-button", "", 3, "click", 4, "ngIf"], [1, "statsBackground"], [1, "stats"], [1, "stat"], [1, "value"], [1, "about"], ["esIcon", "edu-quotes", 1, "quotes"], ["class", "about-buttons", 4, "ngIf"], ["class", "about-edit", 4, "ngIf"], ["class", "about", 4, "ngIf"], ["class", "persistent-id", 4, "ngIf"], ["class", "changePassword", 4, "ngIf"], ["alt", "", 1, "blurred-image", 3, "src"], [3, "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile", "options"], ["mat-button", "", 1, "edit", "clickable", 3, "click"], ["esIcon", "close"], [3, "user"], [3, "user", "customImage"], [1, "editAvatar"], ["type", "file", "accept", "image/*", 1, "hide", 3, "change"], ["avatar", ""], [1, "new-avatar-button", 3, "click"], ["mat-button", "", 3, "click", 4, "ngIf"], ["mat-button", "", 3, "click"], ["esIcon", "delete"], [1, "name"], ["class", "mail", 4, "ngIf"], [1, "mail"], [3, "href"], [1, "vcard"], [1, "title"], [1, "mat-form-field-bright"], ["matInput", "", "type", "text", 3, "ngModel", "ngModelChange"], [1, "givenname"], [1, "surname"], [1, "email-group-form"], [1, "mat-form-field-bright", "email"], ["matInput", "", "type", "email", 3, "ngModel", "ngModelChange"], [3, "color", "matTooltip", "checked", "ngModel", "ngModelChange"], [1, "mat-slide-label"], ["mat-raised-button", "", 3, "click"], [1, "about-buttons"], ["mat-button", "", "color", "primary", "class", "edit", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 1, "edit", 3, "click"], [1, "about-edit"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "4", "id", "about", 3, "ngModel", "ngModelChange"], [1, "change-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "profile", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [1, "profile"], [1, "empty"], [1, "persistent-id"], [1, "toggle"], ["mat-button", "", "color", "primary", 3, "click"], ["esIcon", "fingerprint"], ["esIcon", "keyboard_arrow_down", 4, "ngIf"], ["esIcon", "keyboard_arrow_right", 4, "ngIf"], ["class", "persistent-id-inputs", 4, "ngIf"], ["esIcon", "keyboard_arrow_down"], ["esIcon", "keyboard_arrow_right"], [1, "persistent-id-inputs"], [3, "message"], ["floatLabel", "always"], ["matInput", "", "id", "orcid", "pattern", "https?:\\/\\/orcid.org\\/\\d{4}(-\\d{4}){3}", "placeholder", "http://orcid.org/0000-0000-0000-0000", 3, "ngModel", "ngModelChange"], [3, "innerHTML"], ["matInput", "", "id", "gnduri", "pattern", "https?:\\/\\/d-nb.info\\/gnd\\/(\\d|x|X)+", "placeholder", "http://d-nb.info/gnd/0000000000", 3, "ngModel", "ngModelChange"], [1, "changePassword"], ["esIcon", "lock", 4, "ngIf"], ["esIcon", "lock_open", 4, "ngIf"], ["aria-hidden", "true", "esIcon", "keyboard_arrow_right", 4, "ngIf"], ["aria-hidden", "true", "esIcon", "keyboard_arrow_down", 4, "ngIf"], ["class", "password", 4, "ngIf"], ["esIcon", "lock"], ["esIcon", "lock_open"], ["aria-hidden", "true", "esIcon", "keyboard_arrow_right"], ["aria-hidden", "true", "esIcon", "keyboard_arrow_down"], [1, "password"], ["inputId", "oldPassword", 3, "label", "displayStrength", "value", "required", "valueChange"], ["inputId", "password", 3, "label", "hint", "displayStrength", "value", "required", "valueChange"], ["newPassword", ""], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"]],
    template: function ProfilePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ProfilePageComponent_div_0_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, ProfilePageComponent_div_2_Template, 48, 41, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.user);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.user);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__.InfoMessageComponent, _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_6__.InputPasswordComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_21__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_23__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_24__.CdkTextareaAutosize, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__.MatSlideToggle, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_7__.SkipTargetDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_8__.TitleDirective, _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_9__.UserAvatarComponent, _shared_pipes_authority_color_pipe__WEBPACK_IMPORTED_MODULE_10__.AuthorityColorPipe, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_11__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__.TranslatePipe],
    styles: ["\n\n\n\n.vcard[_ngcontent-%COMP%] {\n  padding-top: 8px;\n  display: flex;\n  column-gap: 15px;\n  width: 100%;\n  grid-template-columns: 20% 40% 40%;\n}\n.vcard[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .givenname[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .org[_ngcontent-%COMP%] {\n  width: 0;\n}\n.vcard[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .givenname[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .org[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.vcard[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .org[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.vcard[_ngcontent-%COMP%]   .givenname[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%] {\n  flex-grow: 2;\n}\n@media screen and (max-width: 500px) {\n  .vcard[_ngcontent-%COMP%] {\n    flex-direction: column;\n    row-gap: 5px;\n  }\n  .vcard[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .givenname[_ngcontent-%COMP%], .vcard[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .vcard[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    max-width: 200px;\n  }\n}\n\n.profile-bg[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.profile-bg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: fixed;\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  object-fit: cover;\n}\n.profile-bg[_ngcontent-%COMP%]   .avatar-default[_ngcontent-%COMP%] {\n  background: url('vendor/edu-sharing/register.jpg') no-repeat;\n  background-size: cover;\n}\n\n.profiles-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  height: calc(100vh - var(--mainnavHeight));\n  align-items: center;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%] {\n  position: relative;\n  width: 480px;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 20px;\n  background: white;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 140%;\n  font-weight: bold;\n  margin-top: 5px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%] {\n  position: relative;\n  padding-top: 40px;\n  padding-bottom: 20px;\n  padding-left: 20px;\n  padding-right: 20px;\n  text-align: center;\n  color: var(--light-primary-text);\n  z-index: 2;\n  overflow: hidden;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--light-primary-text);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .mail[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   es-user-avatar[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .editAvatar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .mail[_ngcontent-%COMP%] {\n  opacity: 0.75;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   es-user-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .edit[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   es-actionbar[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  top: 20px;\n  z-index: 10;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-button], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-flat-button] {\n  background-color: transparent;\n  color: #fff;\n  transition: all var(--transitionNormal);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-button]:disabled, .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-flat-button]:disabled {\n  opacity: 0.25;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-button]:hover, .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]     [mat-flat-button]:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .editAvatar[_ngcontent-%COMP%] {\n  position: absolute;\n  left: calc(50% + 60px);\n  top: 82px;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .editAvatar[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .editAvatar[_ngcontent-%COMP%]   .new-avatar-button[_ngcontent-%COMP%] {\n  left: -118px;\n  border-radius: 50%;\n  position: absolute;\n  top: -45px;\n  height: 120px;\n  width: 116px;\n  cursor: pointer;\n  overflow: hidden;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .editAvatar[_ngcontent-%COMP%]   .new-avatar-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7);\n  bottom: 0;\n  color: #fff;\n  font-size: 9pt;\n  left: 0;\n  position: absolute;\n  padding-top: 7px;\n  padding-bottom: 10px;\n  text-align: center;\n  width: 100%;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .authorityName[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .changePassword[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: auto;\n  padding: 0 25px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .changePassword[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-top: 40px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .changePassword[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-transform: uppercase;\n  float: left;\n  margin-bottom: 20px;\n  width: 100%;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .changePassword[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  float: left;\n  display: flex;\n  align-items: center;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .changePassword[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .change-buttons[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: right;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]    > .persistent-id-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]    > .persistent-id-inputs[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .persistent-id[_ngcontent-%COMP%]    > .persistent-id-inputs[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  position: relative;\n  \n\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-edit[_ngcontent-%COMP%] {\n  padding-top: 10px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {\n  padding-top: 25px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 0 15px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-buttons[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  text-align: right;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%], .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  color: #aaa;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .quotes[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  left: 30px;\n  color: #383838;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .statsBackground[_ngcontent-%COMP%] {\n  background-color: #fff;\n  width: 100%;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-bottom: 10px;\n  display: flex;\n  text-align: center;\n  flex-direction: row;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  align-items: center;\n  padding: 0 10px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 30pt;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .authorityName[_ngcontent-%COMP%] {\n  padding-top: 20px;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%]:hover {\n  background-color: #eee;\n}\n.profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  float: right;\n}\n\n.email-group-form[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  column-gap: 20px;\n  padding-bottom: 20px;\n}\n.email-group-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.email-group-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .mat-form-field-wrapper {\n  padding-bottom: 0;\n}\n.email-group-form[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n[_nghost-%COMP%]     es-input-password mat-form-field {\n  width: 100%;\n}\n\n@media screen and (max-width: 900px) {\n  .profiles-wrapper[_ngcontent-%COMP%]   .profiles[_ngcontent-%COMP%] {\n    width: 100%;\n    left: 0;\n    padding-bottom: 82px;\n  }\n  .email-group-form[_ngcontent-%COMP%] {\n    margin-bottom: calc(62px / 2);\n  }\n}\n@media only screen and (max-width: 500px) {\n  .profiles[_ngcontent-%COMP%] {\n    margin-bottom: 40px;\n  }\n  .profiles[_ngcontent-%COMP%]   .stats[_ngcontent-%COMP%] {\n    padding-left: 8px;\n    padding-right: 8px;\n    font-size: smaller;\n  }\n  .profiles[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .edit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.hide[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9tZHMvbWRzLWVkaXRvci93aWRnZXRzL21kcy1lZGl0b3Itd2lkZ2V0LXZjYXJkL3ZjYXJkLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL3BhZ2VzL3Byb2ZpbGUtcGFnZS9wcm9maWxlLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIiwid2VicGFjazovLy4vcHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUFBQSxnRUFBQTtBQ0hBO0VBQ0ksZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0NBQUE7QUNDSjtBREFJOzs7O0VBSUksUUFBQTtBQ0VSO0FERFE7Ozs7RUFDSSxXQUFBO0FDTVo7QURISTs7RUFFSSxZQUFBO0FDS1I7QURISTs7RUFFSSxZQUFBO0FDS1I7QURISTtFQXZCSjtJQXdCUSxzQkFBQTtJQUNBLFlBQUE7RUNNTjtFRExNOzs7SUFHSSxXQUFBO0VDT1Y7RURMTTtJQUNJLGdCQUFBO0VDT1Y7QUFDRjs7QUFwQ0k7RUFDSSxlQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQXVDUjtBQXJDSTtFQUNJLGVBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQXVDUjtBQXJDSTtFQUNJLDREQUFBO0VBQ0Esc0JBQUE7QUF1Q1I7O0FBcENBO0VBQ0ksYUFBQTtFQUNBLDBDQUFBO0VBQ0EsbUJBQUE7QUF1Q0o7QUF0Q0k7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHNDQUFBO0FBd0NSO0FBdENRO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQXdDWjtBQXJDUTtFQUNJLHFCQUFBO0FBdUNaO0FBcENRO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NDbkRJO0VEb0RKLFVBQUE7RUFDQSxnQkFBQTtBQXNDWjtBQXBDWTtFQUNJLGdDQ3hEQTtBRDhGaEI7QUFuQ1k7Ozs7OztFQU1JLGtCQUFBO0VBQ0EsVUFBQTtBQXFDaEI7QUFsQ1k7RUFDSSxhQUFBO0FBb0NoQjtBQWpDWTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtBQW1DaEI7QUFoQ1k7O0VBRUksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7QUFrQ2hCO0FBL0JnQjs7RUFFSSw2QkFBQTtFQUNBLFdBQUE7RUFJQSx1Q0FBQTtBQThCcEI7QUFqQ29COztFQUNJLGFBQUE7QUFvQ3hCO0FBakNvQjs7RUFDSSxvQ0FBQTtBQW9DeEI7QUEvQlk7RUFDSSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7QUFpQ2hCO0FBL0JnQjtFQUNJLGFBQUE7QUFpQ3BCO0FBOUJnQjtFQUNJLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBZ0NwQjtBQTlCb0I7RUFDSSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFnQ3hCO0FBMUJROzs7OztFQUtJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUE0Qlo7QUF6QlE7O0VBRUksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7QUEyQlo7QUF6Qlk7O0VBQ0kscUJDOUpOO0VEK0pNLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQTRCaEI7QUExQmdCOztFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUE2QnBCO0FBMUJnQjs7RUFDSSxrQkFBQTtBQTZCcEI7QUF4QlE7RUFDSSxXQUFBO0VBQ0EsaUJBQUE7QUEwQlo7QUF2Qlk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUF5QmhCO0FBeEJnQjtFQUNJLG9CQUFBO0FBMEJwQjtBQXhCZ0I7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBMEJwQjtBQXRCUTtFQUNJLGtCQUFBO0VBOEJBLDREQUFBO0FBTFo7QUF2Qlk7RUFDSSxpQkFBQTtBQXlCaEI7QUF2Qlk7RUFDSSxpQkFBQTtBQXlCaEI7QUF4QmdCO0VBQ0ksZUFBQTtBQTBCcEI7QUF0Qlk7RUFDSSxXQUFBO0FBd0JoQjtBQXJCWTtFQUNJLGlCQUFBO0VBQ0EsaUJBQUE7QUF1QmhCO0FBcEJZOztFQUVJLHFCQUFBO0FBc0JoQjtBQW5CWTtFQUNJLFdGNU1BO0FFaU9oQjtBQWZRO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGNGcE5EO0FFcU9YO0FBZFE7RUFDSSxzQkFBQTtFQUNBLFdBQUE7RUUxTlIsc0NBQUE7QUYyT0o7QUFiUTtFQUNJLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQWVaO0FBYlk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBZWhCO0FBYmdCO0VBQ0ksYUFBQTtBQWVwQjtBQVhZO0VBQ0ksdUJGclBKO0FFa1FaO0FBVlk7RUFDSSxlQUFBO0FBWWhCO0FBUlE7RUFDSSxpQkFBQTtBQVVaO0FBUFE7RUFDSSxZQUFBO0FBU1o7QUFOUTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUFRWjtBQU5ZO0VBQ0ksc0JBQUE7QUFRaEI7QUFMWTtFQUNJLFlBQUE7QUFPaEI7O0FBREE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FBSUo7QUFISTtFQUNJLFlBQUE7QUFLUjtBQUhZO0VBQ0ksaUJBQUE7QUFLaEI7QUFESTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtBQUdSOztBQUVJO0VBQ0ksV0FBQTtBQUNSOztBQUVBO0VBQ0k7SUFDSSxXQUFBO0lBQ0EsT0FBQTtJQUNBLG9CQUFBO0VBQ047RUFFRTtJQUNJLDZCQUFBO0VBQU47QUFDRjtBQUVBO0VBQ0k7SUFDSSxtQkFBQTtFQUFOO0VBQ007SUFDSSxpQkFBQTtJQUNBLGtCQUFBO0lBQ0Esa0JBQUE7RUFDVjtFQUdjO0lBQ0ksYUFBQTtFQURsQjtBQUNGO0FBT0E7RUFDSSxhQUFBO0FBTEoiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICdzcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4udmNhcmQge1xuICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBjb2x1bW4tZ2FwOiAxNXB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjAlIDQwJSA0MCU7XG4gICAgLnRpdGxlLFxuICAgIC5naXZlbm5hbWUsXG4gICAgLnN1cm5hbWUsXG4gICAgLm9yZyB7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC50aXRsZSxcbiAgICAub3JnIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgIH1cbiAgICAuZ2l2ZW5uYW1lLFxuICAgIC5zdXJuYW1lIHtcbiAgICAgICAgZmxleC1ncm93OiAyO1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlV2lkdGggLSAkbW9iaWxlU3RhZ2UgKiAyKSB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHJvdy1nYXA6IDVweDtcbiAgICAgICAgLnRpdGxlLFxuICAgICAgICAuZ2l2ZW5uYW1lLFxuICAgICAgICAuc3VybmFtZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuQGltcG9ydCAnLi4vLi4vZmVhdHVyZXMvbWRzL21kcy1lZGl0b3Ivd2lkZ2V0cy9tZHMtZWRpdG9yLXdpZGdldC12Y2FyZC92Y2FyZCc7XG5cbiRwYXRoOiAnLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy8nO1xuXG4ucHJvZmlsZS1iZyB7XG4gICAgZGl2IHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgIGltZyB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgfVxuICAgIC5hdmF0YXItZGVmYXVsdCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgkcGF0aCArICdsYXlvdXQvcmVnaXN0ZXIuanBnJykgbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIH1cbn1cbi5wcm9maWxlcy13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLW1haW5uYXZIZWlnaHQpKTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC5wcm9maWxlcyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDQ4MHB4O1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG5cbiAgICAgICAgLm5hbWUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNDAlO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgICAgIH1cblxuICAgICAgICAucHJvZmlsZSB7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudG9wIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0T25QcmltYXJ5O1xuICAgICAgICAgICAgei1pbmRleDogMjtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAgICAgICAgIGEge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkdGV4dE9uUHJpbWFyeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYSxcbiAgICAgICAgICAgIC5uYW1lLFxuICAgICAgICAgICAgLm1haWwsXG4gICAgICAgICAgICBlcy11c2VyLWF2YXRhcixcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgLmVkaXRBdmF0YXIge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAubWFpbCB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC43NTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXMtdXNlci1hdmF0YXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5lZGl0LFxuICAgICAgICAgICAgZXMtYWN0aW9uYmFyIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDIwcHg7XG4gICAgICAgICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgICAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOjpuZy1kZWVwIHtcbiAgICAgICAgICAgICAgICBbbWF0LWJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgW21hdC1mbGF0LWJ1dHRvbl0ge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgICY6ZGlzYWJsZWQge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4yNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgJHRyYW5zaXRpb25Ob3JtYWw7XG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuZWRpdEF2YXRhciB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGxlZnQ6IGNhbGMoNTAlICsgNjBweCk7XG4gICAgICAgICAgICAgICAgdG9wOiA4MnB4O1xuICAgICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICAgICAgICAgICAgICAgPiBidXR0b24ge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC5uZXctYXZhdGFyLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IC0xMThweDtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogLTQ1cHg7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTIwcHg7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTZweDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgICAgICAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDlwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogN3B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5hYm91dCxcbiAgICAgICAgLnN0YXRzLFxuICAgICAgICAuYXV0aG9yaXR5TmFtZSxcbiAgICAgICAgLmNoYW5nZVBhc3N3b3JkLFxuICAgICAgICAucGVyc2lzdGVudC1pZCB7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgcGFkZGluZzogMCAyNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNoYW5nZVBhc3N3b3JkLFxuICAgICAgICAucGVyc2lzdGVudC1pZCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuXG4gICAgICAgICAgICAudG9nZ2xlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgICAgICAgICAgZGl2IHtcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuY2hhbmdlLWJ1dHRvbnMge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgfVxuICAgICAgICAucGVyc2lzdGVudC1pZCB7XG4gICAgICAgICAgICA+IC5wZXJzaXN0ZW50LWlkLWlucHV0cyB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVzLWluZm8tbWVzc2FnZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuYWJvdXQge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAgICAgICAuYWJvdXQtZWRpdCB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuYWJvdXQge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyNXB4O1xuICAgICAgICAgICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCAxNXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYWJvdXQtYnV0dG9ucyB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5wcm9maWxlcyxcbiAgICAgICAgICAgIC5lbXB0eSB7XG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuZW1wdHkge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkdGV4dFZlcnlMaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogYmFja2dyb3VuZDogdXJsKCRwYXRoICsgJ3F1b3Rlcy5zdmcnKSAxMHB4IDAgbm8tcmVwZWF0OyAqL1xuICAgICAgICB9XG5cbiAgICAgICAgLnF1b3RlcyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDIwcHg7XG4gICAgICAgICAgICBsZWZ0OiAzMHB4O1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TWFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zdGF0c0JhY2tncm91bmQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zdGF0cyB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cbiAgICAgICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuXG4gICAgICAgICAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnN0YXQge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudmFsdWUge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5hdXRob3JpdHlOYW1lIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLm1haW4ge1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNhdmUge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgei1pbmRleDogMjtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgICAgICAuYnRuLWZsYXQ6aG92ZXIge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4uZW1haWwtZ3JvdXAtZm9ybSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGNvbHVtbi1nYXA6IDIwcHg7XG4gICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIDo6bmctZGVlcCB7XG4gICAgICAgICAgICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF0LXNsaWRlLXRvZ2dsZSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICB9XG59XG5cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgZXMtaW5wdXQtcGFzc3dvcmQgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVRhYlN3aXRjaFdpZHRoKSkge1xuICAgIC5wcm9maWxlcy13cmFwcGVyIC5wcm9maWxlcyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBweCArICRtb2JpbGVUYWJOYXZIZWlnaHQ7XG4gICAgfVxuXG4gICAgLmVtYWlsLWdyb3VwLWZvcm0ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiBjYWxjKCN7JG1vYmlsZVRhYk5hdkhlaWdodH0gLyAyKTtcbiAgICB9XG59XG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCAtICRtb2JpbGVTdGFnZSoyKSB7XG4gICAgLnByb2ZpbGVzIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICAgICAgLnN0YXRzIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogOHB4O1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogOHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiBzbWFsbGVyO1xuICAgICAgICB9XG4gICAgICAgIC50b3Age1xuICAgICAgICAgICAgLmVkaXQge1xuICAgICAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmhpZGUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIiwiQG1peGluIGNsaWNrYWJsZSgpIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuQG1peGluIGxpbWl0TGluZUNvdW50KCRjb3VudCwgJGxpbmVIZWlnaHQ6IDEpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZUhlaWdodCArIGVtO1xuICAgIG1heC1oZWlnaHQ6ICRjb3VudCAqICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAkY291bnQ7IC8qIG51bWJlciBvZiBsaW5lcyB0byBzaG93ICovXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAvKiBhdXRvcHJlZml4ZXI6IG9mZiAqL1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93KCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dCb3R0b20oJG9wYWNpdHk6IDAuMSkge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDNweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd1NtYWxsKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgkaW1wb3J0YW50OiBmYWxzZSwgJG9wYWNpdHk6IDAuNikge1xuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2Nyb2xsYmFyKCkge1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIC8vIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgfVxufVxuQG1peGluIHJlbW92ZURlZmF1bHRGb2N1cygpIHtcbiAgICBvdXRsaW5lOiBub25lO1xufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJykge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgIH1cbn1cbi8vIEFwcGx5IHRoZSBjb250ZW50IHN0eWxlcyBpbiBjb250cmFzdCBtb2RlLiBUaGlzIGlzIGp1c3QgZW5vdWdoIGNvbnRyYXN0IHRvIGJlIFdDQUcgY29tcGxpZW50IC0tLVxuLy8gbm90IGEgaGlnaC1jb250cmFzdCBtb2RlLlxuLy9cbi8vIENhbGwgd2l0aG91dCBhcmd1bWVudHMgZm9yIHVzZSBpbiBlbmNhcHN1bGF0ZWQgY29tcG9uZW50IHN0eWxlcywgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUge1xuLy8gICAgICAgICAvLyBTdHlsZXMgdG8gYXBwbHkgaW4gY29udHJhc3QgbW9kZVxuLy8gICAgIH1cbi8vIFRvIHVzIGluIGdsb2JhbCBjb250ZXh0LCBwYXNzICdnbG9iYWwnIGFzIGZpcnN0IGFyZ3VtZW50LCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZShnbG9iYWwpIHsgLyogLi4uICovIH1cbkBtaXhpbiBjb250cmFzdE1vZGUoJHNjb3BlOiBlbmNhcHN1bGF0ZWQpIHtcbiAgICAkY29udHJhc3RNb2RlU2VsZWN0b3I6ICdib2R5LmVzLWNvbnRyYXN0LW1vZGUnO1xuICAgIEBpZiAkc2NvcGUgPT0gZW5jYXBzdWxhdGVkIHtcbiAgICAgICAgOmhvc3QtY29udGV4dCgjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0pICYge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRzY29wZSA9PSBnbG9iYWwge1xuICAgICAgICAje2lmKCYsICcjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0gJicsICRjb250cmFzdE1vZGVTZWxlY3Rvcil9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEBlcnJvciBcIkludmFsaWQgc2NvcGUgI3skc2NvcGV9LlwiO1xuICAgIH1cbn1cbkBtaXhpbiBibHVySW1hZ2UoJGJsdXJTdHJlbmd0aDogMjVweCkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgdG9wOiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICB6LWluZGV4OiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmlsdGVyOiBibHVyKCRibHVyU3RyZW5ndGgpO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9wYWNpdHk6IDAuNztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.trigger)('overlay', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIAnimation.openOverlay(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIAnimation.ANIMATION_TIME_FAST))]
    }
  });
}

/***/ }),

/***/ 12945:
/*!***********************************************************!*\
  !*** ./src/app/pages/profile-page/profile-page.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePageModule: () => (/* binding */ ProfilePageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _profile_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-page-routing.module */ 31396);
/* harmony import */ var _profile_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-page.component */ 97073);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class ProfilePageModule {
  static #_ = this.ɵfac = function ProfilePageModule_Factory(t) {
    return new (t || ProfilePageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: ProfilePageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _profile_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.ProfilePageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ProfilePageModule, {
    declarations: [_profile_page_component__WEBPACK_IMPORTED_MODULE_2__.ProfilePageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _profile_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.ProfilePageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_profile-page_profile-page_module_ts.js.map