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
    styles: ["\n\n.container[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  max-width: 1000px;\n}\n.container[_ngcontent-%COMP%]   .container-inside[_ngcontent-%COMP%] {\n  margin: var(--mainnavHeight) auto 70px auto;\n  padding: 5% 0 0 0;\n  width: 90%;\n  z-index: 1;\n  position: relative;\n}\n\n.password-required[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  width: 400px;\n}\n.password-required[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.subobjects[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n  margin: 6px 0;\n}\n\n.branding[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100px;\n  text-align: center;\n  margin-bottom: 80px;\n}\n.branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: auto;\n  height: 100%;\n}\n\n.details[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  position: relative;\n  width: 90%;\n  left: 5%;\n}\n.details[_ngcontent-%COMP%]   .details-type[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.details[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  margin-right: 14px;\n  width: 50px;\n  height: auto;\n}\n.details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 210%;\n  font-weight: bold;\n  height: 42px;\n  word-break: break-all;\n  overflow: hidden;\n}\n\n.details-opacity[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n.password-required[_ngcontent-%COMP%], .password-valid[_ngcontent-%COMP%] {\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.password-correct[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #40bf8e;\n  font-size: 10pt;\n  text-transform: uppercase;\n  font-weight: bold;\n  margin-bottom: 10px;\n}\n.password-correct[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  border-radius: 50%;\n  border: 2px solid #40bf8e;\n  padding: 2px;\n  display: table;\n}\n\n.download[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  text-align: center;\n}\n\n.download-top[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n\nes-powered-by[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  bottom: 3%;\n}\n\n.folder[_ngcontent-%COMP%] {\n  border: 6px solid #eee;\n  border-radius: 6px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  position: relative;\n}\n\n[_nghost-%COMP%]     .heading {\n  background: #eee;\n}\n[_nghost-%COMP%]     .password-required mat-form-field {\n  width: 100%;\n}\n\n@media screen and (max-width: 700px), screen and (max-height: 400px) {\n  .container[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .password-required[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .branding[_ngcontent-%COMP%] {\n    margin-bottom: -30px;\n  }\n  .branding[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100px;\n    height: auto;\n  }\n  es-powered-by[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .folder[_ngcontent-%COMP%] {\n    border: none;\n    margin-top: 0;\n    width: 110%;\n    left: -5%;\n  }\n}\n@media screen and (max-height: 400px) {\n  .branding[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zaGFyaW5nLXBhZ2Uvc2hhcmluZy1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FBQUo7QUFFSTtFQUNJLDJDQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FBQVI7O0FBSUE7RUFDSSxjQUFBO0VBQ0EsWUFBQTtBQURKO0FBR0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFEUjs7QUFJQTtFQUNJLGNESFk7RUNJWix1QkRaUTtFQ2FSLGFBQUE7QUFESjs7QUFJQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUVJO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFBUjs7QUFHQTtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtBQUFKO0FBQ0k7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUNSO0FBQ0k7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ1I7QUFDSTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0FBQ1I7O0FBRUE7RUFDSSxZQUFBO0FBQ0o7O0FBQ0E7O0VBRUksdUJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFFSjs7QUFBQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0RMa0I7RUNNbEIsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQUdKO0FBREk7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUdSOztBQUNBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQUVKOztBQUNBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFBQTtFQUNJLGVBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQUdKOztBQUFBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUdKOztBQUFJO0VBQ0ksZ0JEeERpQjtBQzJEekI7QUFBUTtFQUNJLFdBQUE7QUFFWjs7QUFFQTtFQUNJO0lBQ0ksV0FBQTtFQUNOO0VBQ0U7SUFDSSxXQUFBO0VBQ047RUFDRTtJQUNJLG9CQUFBO0VBQ047RUFDTTtJQUNJLFlBQUE7SUFDQSxZQUFBO0VBQ1Y7RUFFRTtJQUNJLGFBQUE7RUFBTjtFQUVFO0lBQ0ksWUFBQTtJQUNBLGFBQUE7SUFDQSxXQUFBO0lBQ0EsU0FBQTtFQUFOO0FBQ0Y7QUFHQTtFQUNJO0lBQ0ksYUFBQTtFQUROO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLmNvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XG5cbiAgICAuY29udGFpbmVyLWluc2lkZSB7XG4gICAgICAgIG1hcmdpbjogdmFyKC0tbWFpbm5hdkhlaWdodCkgYXV0byA3MHB4IGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDUlIDAgMCAwO1xuICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxufVxuXG4ucGFzc3dvcmQtcmVxdWlyZWQge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHdpZHRoOiA0MDBweDtcblxuICAgIGZvcm0ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cbn1cbi5zdWJvYmplY3RzIHtcbiAgICBmb250LXNpemU6ICRmb250U2l6ZVNtYWxsO1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgIG1hcmdpbjogNnB4IDA7XG59XG5cbi5icmFuZGluZyB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDgwcHg7XG4gICAgaW1nIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG59XG4uZGV0YWlscyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDkwJTtcbiAgICBsZWZ0OiA1JTtcbiAgICAuZGV0YWlscy10eXBlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICAgIC5pY29uIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNHB4O1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgIH1cbiAgICAubmFtZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjEwJTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGhlaWdodDogNDJweDtcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbn1cbi5kZXRhaWxzLW9wYWNpdHkge1xuICAgIG9wYWNpdHk6IDAuNTtcbn1cbi5wYXNzd29yZC1yZXF1aXJlZCxcbi5wYXNzd29yZC12YWxpZCB7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnBhc3N3b3JkLWNvcnJlY3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBjb2xvcjogJGNvbG9yU3RhdHVzUG9zaXRpdmU7XG4gICAgZm9udC1zaXplOiAxMHB0O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcblxuICAgIGkge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgJGNvbG9yU3RhdHVzUG9zaXRpdmU7XG4gICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgfVxufVxuXG4uZG93bmxvYWQge1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZG93bmxvYWQtdG9wIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuZXMtcG93ZXJlZC1ieSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAzJTtcbn1cblxuLmZvbGRlciB7XG4gICAgYm9yZGVyOiA2cHggc29saWQgJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLmhlYWRpbmcge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYWN0aW9uRGlhbG9nQmFja2dyb3VuZDtcbiAgICB9XG4gICAgLnBhc3N3b3JkLXJlcXVpcmVkIHtcbiAgICAgICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVdpZHRoKSksIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6ICgkbW9iaWxlSGVpZ2h0TGFuZHNjYXBlKSkge1xuICAgIC5jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLnBhc3N3b3JkLXJlcXVpcmVkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5icmFuZGluZyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC0zMHB4O1xuICAgICAgICAvL3RleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBpbWcge1xuICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVzLXBvd2VyZWQtYnkge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAuZm9sZGVyIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgICB3aWR0aDogMTEwJTtcbiAgICAgICAgbGVmdDogLTUlO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6ICgkbW9iaWxlSGVpZ2h0TGFuZHNjYXBlKSkge1xuICAgIC5icmFuZGluZyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
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