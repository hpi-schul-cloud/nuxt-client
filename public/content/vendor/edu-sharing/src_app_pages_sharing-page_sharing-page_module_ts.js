"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_sharing-page_sharing-page_module_ts"],{

/***/ 69115:
/*!*******************************************************************!*\
  !*** ./src/app/pages/sharing-page/sharing-page-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharingPageRoutingModule: () => (/* binding */ SharingPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _sharing_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sharing-page.component */ 91913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _sharing_page_component__WEBPACK_IMPORTED_MODULE_0__.SharingPageComponent
}];
class SharingPageRoutingModule {
  static #_ = this.ɵfac = function SharingPageRoutingModule_Factory(t) {
    return new (t || SharingPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: SharingPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SharingPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 91913:
/*!**************************************************************!*\
  !*** ./src/app/pages/sharing-page/sharing-page.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharingPageComponent: () => (/* binding */ SharingPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/bridge.service */ 34997);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/directives/image-config.directive */ 654);
/* harmony import */ var _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/input-password/input-password.component */ 35799);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _shared_components_powered_by_powered_by_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/powered-by/powered-by.component */ 49420);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/pipes/assets-path.pipe */ 689);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 21916);























const _c0 = ["nodeEntries"];
function SharingPageComponent_es_global_progress_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "es-global-progress");
  }
}
const _c1 = function (a0) {
  return {
    count: a0
  };
};
function SharingPageComponent_div_4_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](2, 1, "SHARING.SUBELEMENT_" + (ctx_r2.childCount() === 1 ? "SINGLE" : "MULTI"), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](4, _c1, ctx_r2.childCount())), " ");
  }
}
const _c2 = function (a0) {
  return {
    inviter: a0
  };
};
function SharingPageComponent_div_4_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](2, 1, "SHARING.INVITED_AND_CREATED_BY", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](4, _c2, ctx_r3.getPersonName(ctx_r3.sharingInfo.invitedBy))), " ");
  }
}
const _c3 = function (a0, a1) {
  return {
    inviter: a0,
    creator: a1
  };
};
function SharingPageComponent_div_4_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](2, 1, "SHARING.INVITED_PLUS_CREATED_BY", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction2"](4, _c3, ctx_r4.getPersonName(ctx_r4.sharingInfo.invitedBy), ctx_r4.getPersonName(ctx_r4.sharingInfo.node.createdBy))), " ");
  }
}
function SharingPageComponent_div_4_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 16)(1, "form", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngsubmit", function SharingPageComponent_div_4_div_16_Template_form_ngsubmit_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r7.validatePassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "es-input-password", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("keydown.enter", function SharingPageComponent_div_4_div_16_Template_es_input_password_keydown_enter_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r9.validatePassword());
    })("valueChange", function SharingPageComponent_div_4_div_16_Template_es_input_password_valueChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r10.passwordInput = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function SharingPageComponent_div_4_div_16_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r8);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r11.validatePassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 5, "SHARING.PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 7, "SHARING.PASSWORD_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("required", true)("value", ctx_r5.passwordInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 9, "SHARING.ENTER_PASSWORD"), " ");
  }
}
function SharingPageComponent_div_4_div_17_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "SHARING.PASSWORD_CORRECT"), " ");
  }
}
function SharingPageComponent_div_4_div_17_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div")(1, "div", 26)(2, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function SharingPageComponent_div_4_div_17_div_2_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r15.download());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 27)(7, "es-node-entries-wrapper", 28, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("sortChange", function SharingPageComponent_div_4_div_17_div_2_Template_es_node_entries_wrapper_sortChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r17.changeSort($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 8, "SHARING.DOWNLOAD_ZIP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("dataSource", ctx_r13.nodesDataSource)("scope", ctx_r13.Scope.Sharing)("columns", ctx_r13.columns)("checkbox", false)("sort", ctx_r13.sort)("elementInteractionType", ctx_r13.InteractionType.None)("displayType", ctx_r13.NodeEntriesDisplayType.Table);
  }
}
function SharingPageComponent_div_4_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, SharingPageComponent_div_4_div_17_div_1_Template, 4, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, SharingPageComponent_div_4_div_17_div_2_Template, 9, 10, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div", 22)(4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function SharingPageComponent_div_4_div_17_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r18.download());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.sharingInfo.password && ctx_r6.sharingInfo.passwordMatches && !ctx_r6.sharingInfo.node.isDirectory);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.sharingInfo.node.isDirectory);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 3, "SHARING." + (ctx_r6.sharingInfo.node.mediatype === "link" ? "LINK" : ctx_r6.sharingInfo.node.isDirectory && ((tmp_2_0 = ctx_r6.nodesDataSource.getData()) == null ? null : tmp_2_0.length) > 1 ? "DOWNLOAD_ZIP" : "DOWNLOAD")), " ");
  }
}
const _c4 = function (a0) {
  return {
    "details-opacity": a0
  };
};
function SharingPageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "esAssetsPath");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 7)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](9, "esNodeIcon");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div")(11, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](13, SharingPageComponent_div_4_div_13_Template, 3, 6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](14, SharingPageComponent_div_4_div_14_Template, 3, 6, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](15, SharingPageComponent_div_4_div_15_Template, 3, 7, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](16, SharingPageComponent_div_4_div_16_Template, 8, 11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, SharingPageComponent_div_4_div_17_Template, 8, 5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](18, "es-powered-by", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 9, "assets/images/logo.svg"), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](15, _c4, !(!ctx_r1.sharingInfo.password || ctx_r1.sharingInfo.passwordMatches)));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 11, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](9, 13, ctx_r1.sharingInfo.node)), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r1.sharingInfo.node.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.childCount() > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.inviterIsAuthor());
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r1.inviterIsAuthor());
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !(!ctx_r1.sharingInfo.password || ctx_r1.sharingInfo.passwordMatches));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r1.sharingInfo.password || ctx_r1.sharingInfo.passwordMatches);
  }
}
class SharingPageComponent {
  constructor(router, route, connector, nodeService, sharingService, bridge, nodeHelperService, storage, toast, config, translations) {
    this.router = router;
    this.route = route;
    this.connector = connector;
    this.nodeService = nodeService;
    this.sharingService = sharingService;
    this.bridge = bridge;
    this.nodeHelperService = nodeHelperService;
    this.storage = storage;
    this.toast = toast;
    this.config = config;
    this.translations = translations;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.InteractionType;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.Scope;
    this.loading = true;
    this.nodesDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeDataSource();
    this.columns = [];
    this.sort = {
      allowed: true,
      columns: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.POSSIBLE_SORT_BY_FIELDS,
      active: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME,
      direction: 'asc'
    };
    this.options = {
      useDefaultOptions: false,
      addOptions: []
    };
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_MODIFIED_DATE));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SIZE));
    const download = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OptionItem('SHARING.DOWNLOAD', 'cloud_download', node => this.download(node));
    download.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ElementType.Node];
    download.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.DefaultGroups.Primary;
    download.showAsAction = true;
    const open = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OptionItem('SHARING.OPEN', 'open_in_new', node => {
      console.log(node);
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.openUrl(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_IO_WWWURL][0], this.bridge, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OPEN_URL_MODE.BlankSystemBrowser);
    });
    open.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.DefaultGroups.Primary;
    open.showAsAction = true;
    download.customShowCallback = /*#__PURE__*/function () {
      var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (nodes) {
        return nodes?.[0]?.mediatype !== 'link';
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    open.customShowCallback = /*#__PURE__*/function () {
      var _ref2 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (nodes) {
        return nodes?.[0]?.mediatype === 'link';
      });
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    this.options.addOptions.push(download);
    this.options.addOptions.push(open);
    this.translations.waitForInit().subscribe(() => {
      this.route.queryParams.subscribe(params => {
        this.params = params;
        this.sharingService.getInfo(params.nodeId, params.token).subscribe(result => {
          this.loading = false;
          this.sharingInfo = result;
          if (result.expired) {
            this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX, 'messages', 'share_expired']);
            return;
          }
          this.loadChildren();
        }, error => {
          console.warn(error);
          this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX, 'messages', 'share_expired']);
          this.loading = false;
        });
      });
    });
  }
  validatePassword() {
    this.sharingService.getInfo(this.params.nodeId, this.params.token, this.passwordInput).subscribe(result => {
      if (!result.passwordMatches) {
        this.toast.error(null, 'SHARING.ERROR_INVALID_PASSWORD');
      }
      this.sharingInfo = result;
      this.loadChildren();
    });
  }
  download(child = null) {
    const node = this.params.nodeId;
    const token = this.params.token;
    let url = this.connector.getAbsoluteEndpointUrl() + '../share?mode=download&token=' + encodeURIComponent(token) + '&password=' + encodeURIComponent(this.passwordInput) + '&nodeId=' + encodeURIComponent(node);
    if (child == null && this.sharingInfo.node.isDirectory) {
      const ids = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.getNodeIds(this.nodesDataSource.getData()).join(',');
      url += '&childIds=' + encodeURIComponent(ids);
    } else {
      if (child != null) {
        url += '&childIds=' + encodeURIComponent(child.ref.id);
      }
    }
    window.open(url);
  }
  changeSort(sort) {
    this.sort = sort;
    this.loadChildren();
  }
  loadChildren() {
    if (this.sharingInfo.password && !this.sharingInfo.passwordMatches) return;
    this.nodesDataSource.reset();
    this.nodesDataSource.isLoading = true;
    const request = {
      count: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COUNT_UNLIMITED,
      sortBy: [this.sort.active],
      sortAscending: [this.sort.direction === 'asc'],
      propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]
    };
    this.sharingService.getChildren(this.params.nodeId, this.params.token, this.passwordInput, request).subscribe(nodes => {
      this.nodesDataSource.setData(nodes.nodes);
      this.nodesDataSource.isLoading = false;
      setTimeout(() => {
        this.nodeEntries.initOptionsGenerator({
          customOptions: this.options
        });
      });
    });
  }
  inviterIsAuthor() {
    return _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.objectEquals(this.sharingInfo.invitedBy, this.sharingInfo.node.createdBy);
  }
  getPersonName(person) {
    return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationHelper.getPersonWithConfigDisplayName(person, this.config);
  }
  childCount() {
    if (this.sharingInfo.node.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_TYPE_IO) {
      try {
        return parseInt(this.sharingInfo.node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.VIRTUAL_PROP_CHILDOBJECTCOUNT]?.[0], 10) || 0;
      } catch (e) {}
    }
    return 0;
  }
  static #_ = this.ɵfac = function SharingPageComponent_Factory(t) {
    return new (t || SharingPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestSharingService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_4__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TranslationsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: SharingPageComponent,
    selectors: [["es-sharing-page"]],
    viewQuery: function SharingPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
      }
    },
    decls: 5,
    vars: 5,
    consts: [[4, "ngIf"], ["esTitle", "", 1, "cdk-visually-hidden"], ["class", "container", 4, "ngIf"], [1, "container"], [1, "container-inside"], [1, "branding"], ["esImageConfig", "", "alt", "logo", 3, "src"], [1, "details", 3, "ngClass"], [1, "details-type"], [1, "icon", 3, "src"], [1, "name"], ["class", "subobjects", 4, "ngIf"], ["class", "password-required", 4, "ngIf"], ["class", "password-valid", 4, "ngIf"], ["mode", "color"], [1, "subobjects"], [1, "password-required"], [3, "ngsubmit"], ["inputId", "password", 3, "label", "required", "value", "placeholder", "keydown.enter", "valueChange"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "password-valid"], ["class", "password-correct", 4, "ngIf"], [1, "download"], ["esIcon", "cloud_download"], [1, "password-correct"], ["esIcon", "done"], [1, "download-top"], [1, "folder"], [3, "dataSource", "scope", "columns", "checkbox", "sort", "elementInteractionType", "displayType", "sortChange"], ["nodeEntries", ""]],
    template: function SharingPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, SharingPageComponent_es_global_progress_0_Template, 1, 0, "es-global-progress", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, SharingPageComponent_div_4_Template, 19, 17, "div", 2);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 3, "SHARING.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.sharingInfo);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgForm, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_7__.GlobalProgressComponent, _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_8__.ImageConfigDirective, _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_9__.InputPasswordComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatButton, _shared_components_powered_by_powered_by_component__WEBPACK_IMPORTED_MODULE_10__.PoweredByComponent, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_11__.TitleDirective, _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_12__.AssetsPathPipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeIconPipe],
    styles: ["\n\n.container[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  margin: auto;\n  max-width: 1000px;\n}\n.container[_ngcontent-%COMP%]   .container-inside[_ngcontent-%COMP%] {\n  margin: var(--mainnavHeight) auto 70px auto;\n  padding: 5% 0 0 0;\n  width: 90%;\n  z-index: 1;\n  position: relative;\n}\n\n.password-required[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  width: 400px;\n}\n.password-required[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.subobjects[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n  margin: 6px 0;\n}\n\n.branding[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100px;\n  text-align: center;\n  margin-bottom: 80px;\n}\n.branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: auto;\n  height: 100%;\n}\n\n.details[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  position: relative;\n  width: 90%;\n  left: 5%;\n}\n.details[_ngcontent-%COMP%]   .details-type[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.details[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 14px;\n  width: 50px;\n  height: auto;\n}\n.details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 210%;\n  font-weight: bold;\n  height: 42px;\n  word-break: break-all;\n  overflow: hidden;\n}\n\n.details-opacity[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n.password-required[_ngcontent-%COMP%], .password-valid[_ngcontent-%COMP%] {\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.password-correct[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #40bf8e;\n  font-size: 10pt;\n  text-transform: uppercase;\n  font-weight: bold;\n  margin-bottom: 10px;\n}\n.password-correct[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  border-radius: 50%;\n  border: 2px solid #40bf8e;\n  padding: 2px;\n  display: table;\n}\n\n.download[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  text-align: center;\n}\n\n.download-top[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n\nes-powered-by[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  bottom: 3%;\n}\n\n.folder[_ngcontent-%COMP%] {\n  border: 6px solid #eee;\n  border-radius: 6px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  position: relative;\n}\n\n[_nghost-%COMP%]     .heading {\n  background: #eee;\n}\n[_nghost-%COMP%]     .password-required mat-form-field {\n  width: 100%;\n}\n\n@media screen and (max-width: 700px), screen and (max-height: 400px) {\n  .container[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .password-required[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .branding[_ngcontent-%COMP%] {\n    margin-bottom: -30px;\n  }\n  .branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100px;\n    height: auto;\n  }\n  es-powered-by[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .folder[_ngcontent-%COMP%] {\n    border: none;\n    margin-top: 0;\n    width: 110%;\n    left: -5%;\n  }\n}\n@media screen and (max-height: 400px) {\n  .branding[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zaGFyaW5nLXBhZ2Uvc2hhcmluZy1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUFKO0FBRUk7RUFDSSwyQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQUFSOztBQUlBO0VBQ0ksY0FBQTtFQUNBLFlBQUE7QUFESjtBQUdJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBRFI7O0FBSUE7RUFDSSxjREpZO0VDS1osdUJEYlE7RUNjUixhQUFBO0FBREo7O0FBSUE7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBREo7QUFFSTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQVI7O0FBR0E7RUFDSSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7QUFBSjtBQUNJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFDUjtBQUNJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNSO0FBQ0k7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQUNSOztBQUVBO0VBQ0ksWUFBQTtBQUNKOztBQUNBOztFQUVJLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBRUo7O0FBQUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNETmtCO0VDT2xCLGVBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFHSjtBQURJO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFHUjs7QUFDQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QUFFSjs7QUFDQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBRUo7O0FBQUE7RUFDSSxlQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7QUFHSjs7QUFBQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFHSjs7QUFBSTtFQUNJLGdCRHpEaUI7QUM0RHpCO0FBQVE7RUFDSSxXQUFBO0FBRVo7O0FBRUE7RUFDSTtJQUNJLFdBQUE7RUFDTjtFQUNFO0lBQ0ksV0FBQTtFQUNOO0VBQ0U7SUFDSSxvQkFBQTtFQUNOO0VBQ007SUFDSSxZQUFBO0lBQ0EsWUFBQTtFQUNWO0VBRUU7SUFDSSxhQUFBO0VBQU47RUFFRTtJQUNJLFlBQUE7SUFDQSxhQUFBO0lBQ0EsV0FBQTtJQUNBLFNBQUE7RUFBTjtBQUNGO0FBR0E7RUFDSTtJQUNJLGFBQUE7RUFETjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcblxuICAgIC5jb250YWluZXItaW5zaWRlIHtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1tYWlubmF2SGVpZ2h0KSBhdXRvIDcwcHggYXV0bztcbiAgICAgICAgcGFkZGluZzogNSUgMCAwIDA7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG59XG5cbi5wYXNzd29yZC1yZXF1aXJlZCB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgd2lkdGg6IDQwMHB4O1xuXG4gICAgZm9ybSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxufVxuLnN1Ym9iamVjdHMge1xuICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplU21hbGw7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgbWFyZ2luOiA2cHggMDtcbn1cblxuLmJyYW5kaW5nIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAxMDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogODBweDtcbiAgICBpbWcge1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbn1cbi5kZXRhaWxzIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogOTAlO1xuICAgIGxlZnQ6IDUlO1xuICAgIC5kZXRhaWxzLXR5cGUge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gICAgLmljb24ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDE0cHg7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgfVxuICAgIC5uYW1lIHtcbiAgICAgICAgZm9udC1zaXplOiAyMTAlO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgaGVpZ2h0OiA0MnB4O1xuICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxufVxuLmRldGFpbHMtb3BhY2l0eSB7XG4gICAgb3BhY2l0eTogMC41O1xufVxuLnBhc3N3b3JkLXJlcXVpcmVkLFxuLnBhc3N3b3JkLXZhbGlkIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4ucGFzc3dvcmQtY29ycmVjdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGNvbG9yOiAkY29sb3JTdGF0dXNQb3NpdGl2ZTtcbiAgICBmb250LXNpemU6IDEwcHQ7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuXG4gICAgaSB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAkY29sb3JTdGF0dXNQb3NpdGl2ZTtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG59XG5cbi5kb3dubG9hZCB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5kb3dubG9hZC10b3Age1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5lcy1wb3dlcmVkLWJ5IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDMlO1xufVxuXG4uZm9sZGVyIHtcbiAgICBib3JkZXI6IDZweCBzb2xpZCAkYWN0aW9uRGlhbG9nQmFja2dyb3VuZDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAuaGVhZGluZyB7XG4gICAgICAgIGJhY2tncm91bmQ6ICRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kO1xuICAgIH1cbiAgICAucGFzc3dvcmQtcmVxdWlyZWQge1xuICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGgpKSwgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogKCRtb2JpbGVIZWlnaHRMYW5kc2NhcGUpKSB7XG4gICAgLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAucGFzc3dvcmQtcmVxdWlyZWQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmJyYW5kaW5nIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTMwcHg7XG4gICAgICAgIC8vdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIGltZyB7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXMtcG93ZXJlZC1ieSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5mb2xkZXIge1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMTAlO1xuICAgICAgICBsZWZ0OiAtNSU7XG4gICAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogKCRtb2JpbGVIZWlnaHRMYW5kc2NhcGUpKSB7XG4gICAgLmJyYW5kaW5nIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 66675:
/*!***********************************************************!*\
  !*** ./src/app/pages/sharing-page/sharing-page.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharingPageModule: () => (/* binding */ SharingPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _sharing_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharing-page-routing.module */ 69115);
/* harmony import */ var _sharing_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sharing-page.component */ 91913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class SharingPageModule {
  static #_ = this.ɵfac = function SharingPageModule_Factory(t) {
    return new (t || SharingPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: SharingPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _sharing_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.SharingPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharingPageModule, {
    declarations: [_sharing_page_component__WEBPACK_IMPORTED_MODULE_2__.SharingPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _sharing_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.SharingPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_sharing-page_sharing-page_module_ts.js.map