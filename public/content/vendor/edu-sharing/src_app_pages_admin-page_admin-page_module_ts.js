"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_admin-page_admin-page_module_ts"],{

/***/ 12450:
/*!***************************************************************!*\
  !*** ./src/app/core-module/rest/services/rest-lti.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestLtiService: () => (/* binding */ RestLtiService)
/* harmony export */ });
/* harmony import */ var _abstract_rest_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-rest-service */ 11523);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _rest_connector_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest-connector.service */ 61871);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);




class RestLtiService extends _abstract_rest_service__WEBPACK_IMPORTED_MODULE_0__.AbstractRestService {
  constructor(connector, storage) {
    super(connector);
    this.storage = storage;
    this.getTokensCall = generate => {
      const query = this.connector.createUrl('lti/v13/registration/url?generate=:generate', null, [[':generate', String(generate)]]);
      return this.connector.get(query, this.connector.getRequestOptions());
    };
    this.removeToken = token => {
      const query = this.connector.createUrl('lti/v13/registration/url/:token', null, [[':token', token]]);
      return this.connector.delete(query, this.connector.getRequestOptions());
    };
    this.registrationAdvanced = (platformId, clientId, deploymentId, authenticationRequestUrl, keysetUrl, keyId, authTokenUrl) => {
      //http://localhost:4200/edu-sharing/rest//lti/v13/registration/static?platformId=fgfgh&fghfhg=:client_id&fghfg=:deployment_id&https%3A%2F%2Flocalhost.localdomain%2Fmoodle%2Fmod%2Flti%2Fauth.php=:authentication_request_url&https%3A%2F%2Flocalhost.localdomain%2Fmoodle%2Fmod%2Flti%2Fcerts.php=:keyset_url&e079a4884780ac1dfd16=:key_id&https%3A%2F%2Flocalhost.localdomain%2Fmoodle%2Fmod%2Flti%2Ftoken.php=:auth_token_url
      const query = this.connector.createUrl('lti/v13/registration/static?platformId=:platformId&client_id=:client_id&deployment_id=:deployment_id&authentication_request_url=:authentication_request_url&keyset_url=:keyset_url&key_id=:key_id&auth_token_url=:auth_token_url', null, [[':platformId', platformId], [':client_id', clientId], [':deployment_id', deploymentId], [':authentication_request_url', authenticationRequestUrl], [':keyset_url', keysetUrl], [':key_id', keyId], [':auth_token_url', authTokenUrl]]);
      return this.connector.post(query, null, this.connector.getRequestOptions());
    };
  }
  static #_ = this.ɵfac = function RestLtiService_Factory(t) {
    return new (t || RestLtiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_rest_connector_service__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.TemporaryStorageService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: RestLtiService,
    factory: RestLtiService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 78060:
/*!***************************************************************!*\
  !*** ./src/app/pages/admin-page/admin-page-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageRoutingModule: () => (/* binding */ AdminPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _admin_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-page.component */ 15516);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _admin_page_component__WEBPACK_IMPORTED_MODULE_0__.AdminPageComponent
}];
class AdminPageRoutingModule {
  static #_ = this.ɵfac = function AdminPageRoutingModule_Factory(t) {
    return new (t || AdminPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: AdminPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AdminPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 15516:
/*!**********************************************************!*\
  !*** ./src/app/pages/admin-page/admin-page.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageComponent: () => (/* binding */ AdminPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! rxjs */ 73064);
/* harmony import */ var _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autocomplete/autocomplete.component */ 94462);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-module/csv.helper */ 83848);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/authority-search-input/authority-search-input.component */ 68504);
/* harmony import */ var _workspace_page_explorer_explorer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../workspace-page/explorer/explorer.component */ 47159);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/expansion */ 88060);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../shared/components/spinner-small/spinner-small.component */ 65928);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _config_config_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./config/config.component */ 18999);
/* harmony import */ var _frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./frontpage/frontpage.component */ 98826);
/* harmony import */ var _mediacenter_mediacenter_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./mediacenter/mediacenter.component */ 11021);
/* harmony import */ var _plugins_plugins_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./plugins/plugins.component */ 81619);
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./statistics/statistics.component */ 52324);
/* harmony import */ var _lti_admin_lti_admin_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lti-admin/lti-admin.component */ 95188);
/* harmony import */ var _ltitool_admin_ltitool_admin_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./ltitool-admin/ltitool-admin.component */ 27371);
/* harmony import */ var _lucene_template_memory_lucene_template_memory_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./lucene-template-memory/lucene-template-memory.component */ 89539);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../shared/pipes/authority-name.pipe */ 99994);























































const _c0 = ["searchResults"];
const _c1 = ["actionbarComponent"];
const _c2 = ["keyValueTable"];
const _c3 = ["catalinaRef"];
const _c4 = ["xmlSelect"];
const _c5 = ["excelSelect"];
const _c6 = ["templateSelect"];
const _c7 = ["dynamic"];
function AdminPageComponent_ng_template_0_td_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](element_r24.key);
  }
}
function AdminPageComponent_ng_template_0_td_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](element_r25.value);
  }
}
function AdminPageComponent_ng_template_0_tr_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "tr", 28);
  }
}
const _c8 = function () {
  return ["key", "value"];
};
function AdminPageComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "table", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](1, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_ng_template_0_td_2_Template, 2, 1, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](3, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](4, AdminPageComponent_ng_template_0_td_4_Template, 2, 1, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_ng_template_0_tr_5_Template, 1, 0, "tr", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const info_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("dataSource", info_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](2, _c8));
  }
}
const _c9 = function () {
  return {
    standalone: true
  };
};
function AdminPageComponent_es_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "es-card", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](2, "div", 30)(3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "mat-checkbox", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_es_card_2_Template_mat_checkbox_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r27.jobForceCancel = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](8, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](1, 7, "ADMIN.JOBS.CANCEL_TITLE"))("buttons", ctx_r2.cancelJobButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 9, "ADMIN.JOBS.CANCEL_MESSAGE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r2.jobForceCancel)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](15, _c9));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 11, "ADMIN.JOBS.CANCEL_FORCE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](13, 13, "ADMIN.JOBS.CANCEL_FORCE_INFO"), " ");
  }
}
function AdminPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_6_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r31);
      const button_r29 = restoredCtx.$implicit;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r30.setMode(button_r29.id));
    })("keyup.enter", function AdminPageComponent_div_6_Template_div_keyup_enter_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r31);
      const button_r29 = restoredCtx.$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r32.setMode(button_r29.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "i", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const button_r29 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("active", ctx_r3.mode == button_r29.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("esIcon", button_r29.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 4, "ADMIN.MODE." + button_r29.id));
  }
}
function AdminPageComponent_11_ng_template_0_Template(rf, ctx) {}
function AdminPageComponent_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](0, AdminPageComponent_11_ng_template_0_Template, 0, 0, "ng-template", null, 37, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
  }
}
function AdminPageComponent_div_12_div_13_div_8_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_12_div_13_div_8_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r42);
      const check_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](check_r37.callback());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const check_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](2, 1, "ADMIN.INFO.CHECK." + check_r37.name + ".SOLUTION_LINK", check_r37.translate), " ");
  }
}
function AdminPageComponent_div_12_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 53)(1, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2, "forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](7, AdminPageComponent_div_12_div_13_div_8_button_7_Template, 3, 4, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const check_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](5, 2, "ADMIN.INFO.CHECK." + check_r37.name + ".SOLUTION", check_r37.translate), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", check_r37.status !== "OK" && check_r37.callback);
  }
}
function AdminPageComponent_div_12_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 47)(1, "div", 48)(2, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_12_div_13_div_8_Template, 8, 5, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("check-fail", check_r37.status === "FAIL")("check-ok", check_r37.status === "OK")("check-info", check_r37.status === "INFO")("check-warn", check_r37.status === "WARN");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](4, 12, "ADMIN.INFO.CHECK." + check_r37.name + ".TITLE", check_r37.translate), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](7, 15, "ADMIN.INFO.CHECK." + check_r37.name + ".STATUS_" + check_r37.status, check_r37.translate), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", check_r37.status !== "OK" && check_r37.status !== "INFO");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](check_r37.status === "OK" ? "check" : "error_outline");
  }
}
function AdminPageComponent_div_12_div_24_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 53)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div")(5, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_12_div_24_div_8_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r49);
      const check_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r47.fixTp(check_r45));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 2, "ADMIN.INFO.TP_CHECK.AUTO_FIX"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](7, 4, "ADMIN.INFO.TP_CHECK.AUTO_FIX_LINK"), " ");
  }
}
function AdminPageComponent_div_12_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 47)(1, "div", 48)(2, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_12_div_24_div_8_Template, 8, 6, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("check-fail", check_r45.status === "FAIL")("check-ok", check_r45.status === "OK")("check-info", check_r45.status === "INFO")("check-warn", check_r45.status === "WARN");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 12, "TOOLPERMISSION." + check_r45.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](7, 14, check_r45.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", check_r45.status !== "OK" && check_r45.status !== "INFO");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](check_r45.status === "OK" ? "check" : "error_outline");
  }
}
function AdminPageComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 38)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 41)(10, "div", 42)(11, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_12_Template_i_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r50.runChecks());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](13, AdminPageComponent_div_12_div_13_Template, 11, 18, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](17, "div", 45)(18, "div", 42)(19, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_12_Template_i_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r51);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r52.runTpChecks());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](20, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](21, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](24, AdminPageComponent_div_12_div_24_Template, 11, 16, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 7, "ADMIN.INFO.REPOSITORY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r5.repositoryVersion);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](8, 9, "ADMIN.INFO.SYSTEM_CHECKS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r5.getChecks(ctx_r5.systemChecks));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](16, 11, "ADMIN.INFO.SYSTEM_TP_CHECKS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](23, 13, "ADMIN.INFO.TP_CHECK.INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r5.getChecks(ctx_r5.tpChecks));
  }
}
const _c10 = function (a0) {
  return {
    xml: a0
  };
};
function AdminPageComponent_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div")(1, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_13_div_8_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r58);
      const xml_r56 = restoredCtx.$implicit;
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r57.editApp(xml_r56));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const xml_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](3, 1, "ADMIN.APPLICATIONS.EDIT_APP", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](4, _c10, xml_r56.file)), " ");
  }
}
function AdminPageComponent_div_13_mat_option_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-option", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r59 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("value", template_r59);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](template_r59);
  }
}
function AdminPageComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 57)(1, "div", 39)(2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3, "build");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_13_div_8_Template, 4, 6, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 39)(10, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](11, "mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](15, "div", 60)(16, "form", 61, 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngSubmit", function AdminPageComponent_div_13_Template_form_ngSubmit_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r61);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r60.testMail());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "div", 63)(19, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](22, "mat-form-field")(23, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](26, "input", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_13_Template_input_ngModelChange_26_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r61);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r62.mailReceiver = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](27, "div", 63)(28, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](30, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](31, "mat-form-field")(32, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](35, "mat-select", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_13_Template_mat_select_ngModelChange_35_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r61);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r63.mailTemplate = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](36, AdminPageComponent_div_13_mat_option_36_Template, 2, 2, "mat-option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](37, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](39, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](6, 13, "ADMIN.CONFIG.XML_CONFIG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r6.editableXmls);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](14, 15, "ADMIN.CONFIG.TEST_MAIL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](21, 17, "ADMIN.CONFIG.TEST_MAIL_RECEIVER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](25, 19, "ADMIN.CONFIG.TEST_MAIL_RECEIVER_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r6.mailReceiver);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](30, 21, "ADMIN.CONFIG.TEST_MAIL_TEMPLATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](34, 23, "ADMIN.CONFIG.TEST_MAIL_TEMPLATE_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r6.mailTemplate);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r6.mailTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("disabled", !ctx_r6.mailReceiver || !ctx_r6.mailTemplate);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](39, 25, "ADMIN.CONFIG.TEST_MAIL_SEND"), " ");
  }
}
function AdminPageComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 70)(1, "es-admin-statistics", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onOpenNode", function AdminPageComponent_div_14_Template_es_admin_statistics_onOpenNode_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r65);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r64.openNodeRender($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
}
function AdminPageComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 72)(1, "es-admin-mediacenter", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onOpenNode", function AdminPageComponent_div_15_Template_es_admin_mediacenter_onOpenNode_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r67);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r66.openNodeRender($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
}
function AdminPageComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r69 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 73)(1, "es-admin-frontpage", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onOpenNode", function AdminPageComponent_div_16_Template_es_admin_frontpage_onOpenNode_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r69);
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r68.openNodeRender($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
}
function AdminPageComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "es-admin-config");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "app-admin-plugins");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r78 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_button_12_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r78);
      const app_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r76.configApp(app_r74));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "i", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r80 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div")(1, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](12, AdminPageComponent_div_19_mat_expansion_panel_74_div_29_button_12_Template, 2, 0, "button", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "div", 100)(14, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_Template_button_click_14_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r80);
      const app_r74 = restoredCtx.$implicit;
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r79.editApp(app_r74));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](15, "i", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "div", 101)(17, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_Template_button_click_17_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r80);
      const app_r74 = restoredCtx.$implicit;
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r81.downloadApp(app_r74));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](18, "i", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](19, "div", 102)(20, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_mat_expansion_panel_74_div_29_Template_button_click_20_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r80);
      const app_r74 = restoredCtx.$implicit;
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r82.removeApp(app_r74));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](21, "i", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const app_r74 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](app_r74.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](app_r74.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](app_r74.file);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](app_r74.repositoryType);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](app_r74.subtype);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", app_r74.configUrl);
  }
}
function AdminPageComponent_div_19_mat_expansion_panel_74_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-expansion-panel", 92)(1, "mat-expansion-panel-header")(2, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 93)(5, "div", 94)(6, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](12, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](15, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "div", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](21, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](22, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](23, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](24, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](25, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](26, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](27, "div", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](28, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](29, AdminPageComponent_div_19_mat_expansion_panel_74_div_29_Template, 22, 6, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const type_r72 = ctx.$implicit;
    const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("expanded", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate2"]("", type_r72, " (", ctx_r71.getApplications(type_r72).length, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](8, 9, "ADMIN.APPLICATIONS.ID"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](11, 11, "ADMIN.APPLICATIONS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](14, 13, "ADMIN.APPLICATIONS.FILE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](17, 15, "ADMIN.APPLICATIONS.REPOTYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](20, 17, "ADMIN.APPLICATIONS.SUBTYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r71.getApplications(type_r72));
  }
}
function AdminPageComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r84 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 76)(1, "input", 77, 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_19_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r83.registerAppXml($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "form", 79)(4, "h4", 80)(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](8, "div")(9, "mat-form-field")(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "input", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_19_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r85.appUrl = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](17, "div")(18, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r86.registerApp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](21, "div")(22, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r70.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](25, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](28, "form", 79)(29, "h4", 80)(30, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](33, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](35, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](36, "mat-radio-group", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_19_Template_mat_radio_group_ngModelChange_36_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r88.ownAppMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](37, "mat-radio-button", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](39, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](40, "mat-radio-button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](42, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](43, "mat-radio-button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](45, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](46, "div")(47, "mat-form-field")(48, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](50, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](51, "input", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](52, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](54, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](55, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_19_Template_button_click_55_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r89.copyOwnApp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](56);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](57, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](58, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](59, "h4", 80)(60, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](61);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](62, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](63, "es-lti-admin", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onRefreshAppList", function AdminPageComponent_div_19_Template_es_lti_admin_onRefreshAppList_63_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r90.refreshAppList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](64, "h4", 80)(65, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](66);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](67, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](68, "es-ltitool-admin", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onRefreshAppList", function AdminPageComponent_div_19_Template_es_ltitool_admin_onRefreshAppList_68_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r84);
      const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r91.refreshAppList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](69, "h4", 80)(70, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](71);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](72, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](73, "mat-accordion", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](74, AdminPageComponent_div_19_mat_expansion_panel_74_Template, 30, 19, "mat-expansion-panel", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](7, 22, "ADMIN.APPLICATIONS.ADD_APPLICATION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](12, 24, "ADMIN.APPLICATIONS.URL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r12.appUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](16, 26, "ADMIN.APPLICATIONS.URL_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](20, 28, "ADMIN.APPLICATIONS.ADD_URL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](24, 30, "ADMIN.APPLICATIONS.SELECT_XML"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](27, 32, "ADMIN.APPLICATIONS.USE_FILE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](32, 34, "ADMIN.APPLICATIONS.USE_OWN_URL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](35, 36, "ADMIN.APPLICATIONS.CHOOSE_APP_MODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r12.ownAppMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](39, 38, "ADMIN.APPLICATIONS.APP_MODE.REPOSITORY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](42, 40, "ADMIN.APPLICATIONS.APP_MODE.RENDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](45, 42, "ADMIN.APPLICATIONS.APP_MODE.LMS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](50, 44, "ADMIN.APPLICATIONS.OWN_URL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r12.getOwnAppUrl());
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](54, 46, "ADMIN.APPLICATIONS.OWN_URL_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](57, 48, "ADMIN.APPLICATIONS.COPY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](62, 50, "ADMIN.LTI.HEADER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](67, 52, "ADMIN.LTITOOL.HEADER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](72, 54, "ADMIN.APPLICATIONS.LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("multi", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r12.getAppTypes());
  }
}
function AdminPageComponent_div_20_div_21_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "ADMIN.UPDATE.NOT_EXECUTED"), " ");
  }
}
function AdminPageComponent_div_20_div_21_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const update_r94 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, update_r94.executedAt));
  }
}
function AdminPageComponent_div_20_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r99 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 118)(1, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_div_20_div_21_div_5_Template, 3, 3, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](6, AdminPageComponent_div_20_div_21_div_6_Template, 3, 3, "div", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 114)(8, "button", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_20_div_21_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r99);
      const update_r94 = restoredCtx.$implicit;
      const ctx_r98 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r98.runUpdate(update_r94, false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "div", 115)(12, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_20_div_21_Template_button_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r99);
      const update_r94 = restoredCtx.$implicit;
      const ctx_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r100.runUpdate(update_r94, true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const update_r94 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("table-not-executed", !update_r94.executedAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](update_r94.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](update_r94.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !update_r94.executedAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", update_r94.executedAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 10, "ADMIN.UPDATE.TEST"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("disabled", update_r94.executedAt);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](14, 12, "ADMIN.UPDATE.RUN"), " ");
  }
}
function AdminPageComponent_div_20_es_spinner_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "es-spinner", 121);
  }
}
function AdminPageComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 109)(1, "div", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 111)(5, "div", 112)(6, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](12, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](15, "div", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "div", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](21, AdminPageComponent_div_20_div_21_Template, 15, 14, "div", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](22, AdminPageComponent_div_20_es_spinner_22_Template, 1, 0, "es-spinner", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 8, "ADMIN.UPDATE.HINT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](8, 10, "ADMIN.UPDATE.ID"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](11, 12, "ADMIN.UPDATE.DESCRIPTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](14, 14, "ADMIN.UPDATE.DATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](17, 16, "ADMIN.UPDATE.TEST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](20, 18, "ADMIN.UPDATE.RUN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r13.updates);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r13.updates.length === 0);
  }
}
function AdminPageComponent_div_21_div_23_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r108 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate2"](" ", ctx_r108.parentCollection.title, " (", ctx_r108.parentCollection.ref.id, ") ");
  }
}
function AdminPageComponent_div_21_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r110 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 126)(1, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_div_23_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r110);
      const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r109.chooseCollection());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_div_21_div_23_div_5_Template, 2, 2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 2, "ADMIN.IMPORT.CHOOSE_COLLECTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r102.parentCollection);
  }
}
function AdminPageComponent_div_21_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r104 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate2"]("", ctx_r104.parentNode.name, " (", ctx_r104.parentNode.ref.id, ")");
  }
}
function AdminPageComponent_div_21_div_69_mat_option_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-option", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r112 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("value", option_r112);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](option_r112);
  }
}
function AdminPageComponent_div_21_div_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r114 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div")(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r113 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r113.oai.url = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "mat-form-field")(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r115 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r115.oai.set = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "mat-form-field")(15, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r116.oai.prefix = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](19, "mat-form-field")(20, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](23, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r117 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r117.oai.metadata = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](24, "mat-form-field")(25, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](28, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r118 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r118.oai.file = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](29, "mat-form-field")(30, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](33, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_33_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r119 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r119.oai.ids = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](34, "mat-form-field")(35, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](37, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](38, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_38_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r120 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r120.oai.from = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](39, "mat-form-field")(40, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](42, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](43, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_43_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r121 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r121.oai.until = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](44, "mat-form-field")(45, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](47, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](48, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_input_ngModelChange_48_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r122 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r122.oai.periodInDays = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](49, "mat-form-field")(50, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](51);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](52, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](53, "mat-select", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_69_Template_mat_select_ngModelChange_53_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r114);
      const ctx_r123 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r123.oai.className = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](54, AdminPageComponent_div_21_div_69_mat_option_54_Template, 2, 2, "mat-option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r106 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 22, "ADMIN.IMPORT.OAI_URL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.url);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](8, 24, "ADMIN.IMPORT.OAI_URL_EXAMPLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](12, 26, "ADMIN.IMPORT.OAI_SET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.set);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](17, 28, "ADMIN.IMPORT.OAI_PREFIX"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](22, 30, "ADMIN.IMPORT.OAI_METADATA"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.metadata);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](27, 32, "ADMIN.IMPORT.OAI_FILE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.file);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](32, 34, "ADMIN.IMPORT.OAI_IDS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.ids);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](37, 36, "ADMIN.IMPORT.OAI_FROM"), " (yyyy-MM-dd)");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.from);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](42, 38, "ADMIN.IMPORT.OAI_UNTIL"), " (yyyy-MM-dd)");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.until);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](47, 40, "ADMIN.IMPORT.OAI_PERIOD_IN_DAYS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.periodInDays);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](52, 42, "ADMIN.IMPORT.OAI_CLASS_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r106.oai.className);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r106.oaiClasses);
  }
}
function AdminPageComponent_div_21_div_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r125 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 143)(1, "mat-checkbox", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_div_102_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r125);
      const ctx_r124 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r124.oai.forceUpdate = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r107 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r107.oai.forceUpdate);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 2, "ADMIN.IMPORT.OAI_FORCE_UPDATE"));
  }
}
function AdminPageComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r127 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 122)(1, "div", 39)(2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3, "layers");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 123)(8, "input", 124, 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_21_Template_input_change_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r126 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r126.updateCollectionsFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "div", 126)(11, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const _r101 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](9);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r101.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "mat-radio-group", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_mat_radio_group_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r129.parentCollectionType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](17, "mat-radio-button", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](20, "mat-radio-button", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](23, AdminPageComponent_div_21_div_23_Template, 6, 4, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](24, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r130 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r130.importCollections());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](27, "div", 39)(28, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](29, "table_chart");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](30, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](33, "div", 131)(34, "input", 132, 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_21_Template_input_change_34_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r131 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r131.updateExcelFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](36, "div", 126)(37, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const _r103 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](35);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r103.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](39, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](40, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](42, "div", 126)(43, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_43_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r133 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r133.chooseDirectory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](45, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](46, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](47, AdminPageComponent_div_21_div_47_Template, 2, 2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](48, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_48_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r134 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r134.importExcel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](50, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](51, "div", 39)(52, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](53, "description");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](54, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](56, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](57, "div", 135)(58, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](60, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](61, "input", 136, 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_21_Template_input_change_61_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r135 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r135.updateUploadOaiFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](63, "div", 126)(64, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_64_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](62);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r105.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](65);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](66, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](67, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](69, AdminPageComponent_div_21_div_69_Template, 55, 44, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](70, "mat-form-field")(71, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](72);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](73, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](74, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_input_ngModelChange_74_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r137 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r137.oai.importerClassName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](75, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](76);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](77, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](78, "mat-form-field")(79, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](80);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](81, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](82, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_input_ngModelChange_82_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r138 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r138.oai.recordHandlerClassName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](83, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](84);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](85, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](86, "mat-form-field")(87, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](88);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](89, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](90, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_input_ngModelChange_90_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r139 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r139.oai.binaryHandlerClassName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](91, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](92);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](93, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](94, "mat-form-field")(95, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](97, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](98, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_input_ngModelChange_98_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r140 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r140.oai.persistentHandlerClassName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](99, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](100);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](101, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](102, AdminPageComponent_div_21_div_102_Template, 4, 4, "div", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](103, "div", 140)(104, "mat-checkbox", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_21_Template_mat_checkbox_ngModelChange_104_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r141 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r141.oaiSave = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](105);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](106, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](107, "div", 142)(108, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_108_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r142 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r142.removeImports());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](109);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](110, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](111, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_21_Template_button_click_111_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r127);
      const ctx_r143 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r143.oaiImport());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](112);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](113, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](6, 36, "ADMIN.IMPORT.COLLECTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](13, 38, "ADMIN.IMPORT.CHOOSE_COLLECTIONS_XML"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r14.collectionsFile ? ctx_r14.collectionsFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.parentCollectionType);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](19, 40, "ADMIN.IMPORT.PARENT_COLLECTION_ROOT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](22, 42, "ADMIN.IMPORT.PARENT_COLLECTION_CHOOSE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r14.parentCollectionType === "choose");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](26, 44, "ADMIN.IMPORT.COLLECTION_START"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](32, 46, "ADMIN.IMPORT.EXCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](39, 48, "ADMIN.IMPORT.CHOOSE_EXCEL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r14.excelFile ? ctx_r14.excelFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](45, 50, "ADMIN.IMPORT.CHOOSE_DIRECTORY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r14.parentNode);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](50, 52, "ADMIN.IMPORT.EXCEL_START"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](56, 54, "ADMIN.IMPORT.OAI"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](60, 56, "ADMIN.IMPORT.OAI_XML"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](66, 58, "ADMIN.TOOLKIT.CHOOSE_UPLOAD_TEMP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r14.uploadOaiFile ? ctx_r14.uploadOaiFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !ctx_r14.uploadOaiFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](73, 60, "ADMIN.IMPORT.OAI_IMPORTER_CLASS_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.oai.importerClassName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](77, 62, "ADMIN.IMPORT.OAI_IMPORTER_CLASS_NAME_EXAMPLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](81, 64, "ADMIN.IMPORT.OAI_RECORD_HANDLER_CLASS_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.oai.recordHandlerClassName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](85, 66, "ADMIN.IMPORT.OAI_RECORD_HANDLER_CLASS_NAME_EXAMPLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](89, 68, "ADMIN.IMPORT.OAI_BINARY_HANDLER_CLASS_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.oai.binaryHandlerClassName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](93, 70, "ADMIN.IMPORT.OAI_BINARY_HANDLER_CLASS_NAME_EXAMPLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](97, 72, "ADMIN.IMPORT.OAI_PERSISTENT_HANDLER_CLASS_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.oai.persistentHandlerClassName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](101, 74, "ADMIN.IMPORT.OAI_PERSISTENT_HANDLER_CLASS_NAME_EXAMPLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !ctx_r14.uploadOaiFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r14.oaiSave);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](106, 76, "ADMIN.IMPORT.OAI_SAVE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](110, 78, "ADMIN.IMPORT.REMOVE_IMPORTS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](113, 80, "ADMIN.IMPORT.OAI_START"), " ");
  }
}
function AdminPageComponent_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 39)(1, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 1, "ADMIN.JOBS.START_JOB"));
  }
}
function AdminPageComponent_div_22_section_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r149 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, ctx_r149.job.name));
  }
}
function AdminPageComponent_div_22_section_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r150 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r150.job.class);
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1, "[]");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1, "(file)");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 163)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const value_r160 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", value_r160.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](value_r160.description);
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_8_div_2_Template, 5, 2, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const param_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", param_r154.values);
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1, " File ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const param_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", param_r154.type.replace("java.lang.", ""), " ");
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](1, AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_ng_container_1_Template, 2, 0, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_ng_container_2_Template, 2, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const param_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", param_r154.file);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !param_r154.file);
  }
}
function AdminPageComponent_div_22_section_2_div_10_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 163)(1, "div", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](3, AdminPageComponent_div_22_section_2_div_10_div_5_span_3_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](4, AdminPageComponent_div_22_section_2_div_10_div_5_span_4_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_8_Template, 3, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](9, AdminPageComponent_div_22_section_2_div_10_div_5_ng_container_9_Template, 3, 2, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const param_r154 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", param_r154.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", param_r154.array);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", param_r154.file);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](param_r154.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", param_r154.values);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !param_r154.values);
  }
}
function AdminPageComponent_div_22_section_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r167 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 159)(1, "h5", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_div_22_section_2_div_10_div_5_Template, 10, 6, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div")(7, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_section_2_div_10_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r167);
      const ctx_r166 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r166.setJobParamsTemplate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r151 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 3, "ADMIN.JOBS.PARAMETERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r151.job.object.params);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 5, "ADMIN.JOBS.APPLY_TEMPLATE"), " ");
  }
}
function AdminPageComponent_div_22_section_2_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r170 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 63)(1, "input", 166, 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_22_section_2_div_12_Template_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r170);
      const ctx_r169 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r169.updateUploadFile($event, "uploadJobsFile"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div", 126)(7, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_section_2_div_12_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r170);
      const _r168 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r168.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r152 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 3, "ADMIN.JOBS.UPLOAD_FILE_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 5, "ADMIN.JOBS.CHOOSE_UPLOAD_FILE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r152.uploadJobsFile == null ? null : ctx_r152.uploadJobsFile.name);
  }
}
function AdminPageComponent_div_22_section_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r173 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "section", 60)(1, "form")(2, "div", 63)(3, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div", 149)(7, "es-autocomplete", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("updateInput", function AdminPageComponent_div_22_section_2_Template_es_autocomplete_updateInput_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r173);
      const ctx_r172 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r172.updateJobSuggestions($event));
    })("addItem", function AdminPageComponent_div_22_section_2_Template_es_autocomplete_addItem_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r173);
      const ctx_r174 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r174.setJob($event));
    })("addAny", function AdminPageComponent_div_22_section_2_Template_es_autocomplete_addAny_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r173);
      const ctx_r175 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      ctx_r175.job.name = "";
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r175.job.class = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_22_section_2_div_8_Template, 3, 3, "div", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](9, AdminPageComponent_div_22_section_2_div_9_Template, 2, 1, "div", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](10, AdminPageComponent_div_22_section_2_div_10_Template, 10, 7, "div", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "ngx-monaco-editor", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_22_section_2_Template_ngx_monaco_editor_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r173);
      const ctx_r176 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r176.job.params = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](12, AdminPageComponent_div_22_section_2_div_12_Template, 12, 7, "div", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "button", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_section_2_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r173);
      const ctx_r177 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r177.startJob());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r145 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 14, "ADMIN.JOBS.JOB_CLASS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("suggestions", ctx_r145.jobClassesSuggested)("allowAny", true)("inputMinLength", 1)("maxSuggestions", 1000);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r145.job && ctx_r145.job.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r145.job && ctx_r145.job.class);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r145.job.object == null ? null : ctx_r145.job.object.params == null ? null : ctx_r145.job.object.params.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("options", ctx_r145.jobCodeOptions)("ngModel", ctx_r145.job.params)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](18, _c9));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r145.supportsUpload(ctx_r145.job.object));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("disabled", ctx_r145.jobs === null);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](15, 16, "ADMIN.JOBS.START_JOB"), " ");
  }
}
function AdminPageComponent_div_22_es_info_message_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "es-info-message");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "ADMIN.JOBS.CLUSTER_NOT_SUPPORTED"), " ");
  }
}
function AdminPageComponent_div_22_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 168);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "ADMIN.JOBS.NO_JOBS"), " ");
  }
}
const _c11 = function () {
  return {
    time: true,
    relative: false
  };
};
function AdminPageComponent_div_22_div_15_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const job_r178 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](2, 1, job_r178.finishTime, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](4, _c11)), " ");
  }
}
function AdminPageComponent_div_22_div_15_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "ADMIN.JOBS.WITH_WARNINGS"));
  }
}
function AdminPageComponent_div_22_div_15_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "ADMIN.JOBS.WITH_ERRORS"));
  }
}
function AdminPageComponent_div_22_div_15_es_spinner_small_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "es-spinner-small");
  }
}
function AdminPageComponent_div_22_div_15_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r190 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "button", 180);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_div_15_button_20_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r190);
      const job_r178 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().$implicit;
      const ctx_r188 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r188.cancelJob(job_r178));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "i", 181);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
}
function AdminPageComponent_div_22_div_15_i_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r179 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().index;
    const ctx_r185 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r185.jobsOpen[i_r179] ? "keyboard_arrow_up" : "keyboard_arrow_down");
  }
}
function AdminPageComponent_div_22_div_15_div_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r195 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 187)(1, "mat-form-field", 188)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_22_div_15_div_23_div_1_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r195);
      const i_r179 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).index;
      const ctx_r194 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r194.jobsLogFilter[i_r179] = $event);
    })("ngModelChange", function AdminPageComponent_div_22_div_15_div_23_div_1_Template_input_ngModelChange_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r195);
      const ctx_r197 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r197.updateJobLogs());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "mat-form-field", 189)(7, "mat-label", 190);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "mat-select", 191);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_22_div_15_div_23_div_1_Template_mat_select_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r195);
      const i_r179 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).index;
      const ctx_r198 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r198.jobsLogLevel[i_r179] = $event);
    })("ngModelChange", function AdminPageComponent_div_22_div_15_div_23_div_1_Template_mat_select_ngModelChange_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r195);
      const ctx_r200 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r200.updateJobLogs());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "mat-option", 192);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12, "Alles");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "mat-option", 193);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "mat-option", 194);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const i_r179 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2).index;
    const ctx_r192 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 6, "ADMIN.JOBS.LOG_FILTER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r192.jobsLogFilter[i_r179]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 8, "ADMIN.JOBS.LOG_LEVEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r192.jobsLogLevel[i_r179]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](15, 10, "ADMIN.JOBS.LOG_LEVEL_4"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](18, 12, "ADMIN.JOBS.LOG_LEVEL_3"));
  }
}
const _c12 = function () {
  return {
    time: true,
    date: false,
    relative: false
  };
};
function AdminPageComponent_div_22_div_15_div_23_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 195)(1, "div", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "div", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 199);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const entry_r202 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("status-error", entry_r202.level.syslogEquivalent <= 3)("status-warning", entry_r202.level.syslogEquivalent <= 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 8, "ADMIN.JOBS.LOG_LEVEL_" + entry_r202.level.syslogEquivalent), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](6, 10, entry_r202.date, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](13, _c12)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", entry_r202.className.split(".")[entry_r202.className.split(".").length - 1], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](entry_r202.message);
  }
}
function AdminPageComponent_div_22_div_15_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 182);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](1, AdminPageComponent_div_22_div_15_div_23_div_1_Template, 19, 14, "div", 183);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](2, "div", 170)(3, "div", 184);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div", 185);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](7, AdminPageComponent_div_22_div_15_div_23_div_7_Template, 11, 14, "div", 186);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const i_r179 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]().index;
    const ctx_r186 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r186.jobsLogData[i_r179] !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 3, "ADMIN.JOBS.LOG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r186.jobsLogData[i_r179]);
  }
}
function AdminPageComponent_div_22_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r205 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 169)(1, "div", 170)(2, "div", 171)(3, "div", 172)(4, "div", 173);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "div", 174);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](8, "div", 175)(9, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](11, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](12, AdminPageComponent_div_22_div_15_span_12_Template, 3, 5, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "div")(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](17, AdminPageComponent_div_22_div_15_span_17_Template, 3, 3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](18, AdminPageComponent_div_22_div_15_span_18_Template, 3, 3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](19, AdminPageComponent_div_22_div_15_es_spinner_small_19_Template, 1, 0, "es-spinner-small", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](20, AdminPageComponent_div_22_div_15_button_20_Template, 2, 0, "button", 176);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](21, "div", 177);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_div_15_Template_div_click_21_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r205);
      const job_r178 = restoredCtx.$implicit;
      const i_r179 = restoredCtx.index;
      const ctx_r204 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](job_r178.log === null || (job_r178.log == null ? null : job_r178.log.length) ? ctx_r204.jobsOpen[i_r179] = ctx_r204.jobsOpen[i_r179] ? false : true : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](22, AdminPageComponent_div_22_div_15_i_22_Template, 2, 1, "i", 178);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](23, AdminPageComponent_div_22_div_15_div_23_Template, 8, 5, "div", 179);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const job_r178 = ctx.$implicit;
    const i_r179 = ctx.index;
    const ctx_r148 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("status-error", job_r178.worstLevel.syslogEquivalent <= 3)("status-warning", job_r178.worstLevel.syslogEquivalent <= 4)("status-fine", job_r178.worstLevel.syslogEquivalent >= 6)("status-aborted", job_r178.status === "Aborted");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](job_r178.jobName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](job_r178.jobClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind2"](11, 24, job_r178.startTime, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](29, _c11)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.finishTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassMapInterpolate1"]("job-status ", job_r178.status.toLowerCase(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](16, 27, "ADMIN.JOBS." + job_r178.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.worstLevel.syslogEquivalent == 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.worstLevel.syslogEquivalent < 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.status === "Running");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.status === "Running");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassProp"]("clickable", job_r178.log === null || (job_r178.log == null ? null : job_r178.log.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", job_r178.log === null || (job_r178.log == null ? null : job_r178.log.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r148.jobsOpen[i_r179]);
  }
}
function AdminPageComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r207 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](1, AdminPageComponent_div_22_div_1_Template, 6, 3, "div", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_div_22_section_2_Template, 16, 19, "section", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div", 39)(4, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5, "history");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 60)(10, "div", 42)(11, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_22_Template_i_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r207);
      const ctx_r206 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r206.reloadJobStatus());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](13, AdminPageComponent_div_22_es_info_message_13_Template, 3, 3, "es-info-message", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](14, AdminPageComponent_div_22_div_14_Template, 3, 3, "div", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](15, AdminPageComponent_div_22_div_15_Template, 24, 30, "div", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r15.jobs !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r15.jobs !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](8, 6, "ADMIN.JOBS.LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r15.jobs === null);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", (ctx_r15.jobs == null ? null : ctx_r15.jobs.length) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r15.jobs);
  }
}
function AdminPageComponent_div_23_mat_chip_option_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r212 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-chip-option", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("removed", function AdminPageComponent_div_23_mat_chip_option_24_Template_mat_chip_option_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r212);
      const ctx_r211 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r211.authenticateAuthority = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](4, "i", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r208 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 1, ctx_r208.authenticateAuthority));
  }
}
function AdminPageComponent_div_23_div_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r209 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate2"]("", ctx_r209.parentNode.name, " (", ctx_r209.parentNode.ref.id, ")");
  }
}
function AdminPageComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r214 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 200)(1, "div", 39)(2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 60)(8, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r213 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r213.refreshAppInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "div", 60)(15, "div", 39)(16, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](17, "person");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](21, "es-authority-search-input", 201);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onChooseAuthority", function AdminPageComponent_div_23_Template_es_authority_search_input_onChooseAuthority_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r215 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r215.authenticateAuthority = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](23, "mat-chip-listbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](24, AdminPageComponent_div_23_mat_chip_option_24_Template, 5, 3, "mat-chip-option", 202);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](25, "button", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r216 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r216.authenticateAsUser());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](28, "div", 60)(29, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](32, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r217 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r217.refreshEduGroupCache());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](35, "div", 39)(36, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](37, "cached");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](38, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](40, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](41, "div", 60)(42, "form", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngSubmit", function AdminPageComponent_div_23_Template_form_ngSubmit_42_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r218 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r218.getCacheInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](43, "mat-form-field")(44, "input", 203);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_23_Template_input_ngModelChange_44_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r219 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r219.cacheInfo = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](45, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](46, "button", 204);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](48, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](49, "div", 205)(50, "div", 126)(51, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_51_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r220 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r220.chooseDirectory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](53, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](54, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](55, AdminPageComponent_div_23_div_55_Template, 2, 2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](56, "div", 60)(57, "div", 126)(58, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_58_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r221 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r221.refreshCache(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](60, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](61, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_61_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r222 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r222.refreshCache(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](62);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](63, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](64, "div", 206)(65, "mat-form-field")(66, "input", 207);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_23_Template_input_ngModelChange_66_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r223 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r223.propertyName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](67, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](68, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_68_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r224 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r224.getPropertyValues());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](69);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](70, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](71, "div", 39)(72, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](73, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](74, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](75);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](76, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](77, "div", 60)(78, "input", 166, 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_23_Template_input_change_78_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r225 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r225.updateUploadFile($event, "uploadTempFile"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](80, "div", 126)(81, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_81_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const _r210 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](79);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r210.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](83, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](84, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](85);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](86, "button", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_23_Template_button_click_86_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r214);
      const ctx_r227 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r227.startUploadTempFile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](87);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](88, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](6, 28, "ADMIN.TOOLKIT.REFRESH_APP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 30, "ADMIN.TOOLKIT.REFRESH_APP_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](13, 32, "ADMIN.TOOLKIT.REFRESH_APP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](20, 34, "ADMIN.TOOLKIT.AUTHENTICATE_AS_USER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](22, 36, "ADMIN.TOOLKIT.AUTHENTICATE_AS_USER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("mode", ctx_r16.AuthoritySearchMode.Users)("globalSearchAllowed", true)("showRecent", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r16.authenticateAuthority);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("disabled", !ctx_r16.authenticateAuthority);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](27, 38, "ADMIN.TOOLKIT.AUTHENTICATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](31, 40, "ADMIN.TOOLKIT.REFRESH_EDU_GROUP_CACHE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](34, 42, "ADMIN.TOOLKIT.REFRESH_EDU_GROUP_CACHE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](40, 44, "ADMIN.TOOLKIT.CACHE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](45, 46, "ADMIN.TOOLKIT.CACHE_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r16.cacheInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](48, 48, "ADMIN.TOOLKIT.CACHE_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](53, 50, "ADMIN.TOOLKIT.CACHE_ROOT_FOLDER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r16.parentNode);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](60, 52, "ADMIN.TOOLKIT.REFRESH_CACHE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](63, 54, "ADMIN.TOOLKIT.STICKY_REFRESH_CACHE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](67, 56, "ADMIN.TOOLKIT.PROPERTY_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r16.propertyName);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](70, 58, "ADMIN.TOOLKIT.PROPERTY_VALUESPACE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](76, 60, "ADMIN.TOOLKIT.UPLOAD_TEMP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](83, 62, "ADMIN.TOOLKIT.CHOOSE_UPLOAD_TEMP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](ctx_r16.uploadTempFile ? ctx_r16.uploadTempFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](88, 64, "ADMIN.TOOLKIT.UPLOAD_TEMP_START"), " ");
  }
}
function AdminPageComponent_div_24_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r233 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 60)(1, "div", 63)(2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "input", 219);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_19_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r233);
      const ctx_r232 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r232.lucene.noderef = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "button", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_24_div_19_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r233);
      const ctx_r234 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r234.searchNoderef());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r228 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 3, "ADMIN.BROWSER.NODEREF"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r228.lucene.noderef);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 5, "ADMIN.BROWSER.LUCENE_START"), " ");
  }
}
function AdminPageComponent_div_24_div_20_mat_form_field_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r243 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "textarea", 222);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_mat_form_field_2_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r243);
      const ctx_r242 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r242.lucene.query = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r235 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 2, "ADMIN.BROWSER.LUCENE_QUERY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r235.lucene.query);
  }
}
function AdminPageComponent_div_24_div_20_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r245 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 223)(1, "label", 224);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "ngx-monaco-editor", 225);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_div_3_Template_ngx_monaco_editor_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r245);
      const ctx_r244 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r244.lucene.query = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r236 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 4, "ADMIN.BROWSER.DSL_QUERY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("options", ctx_r236.dslCodeOptions)("ngModel", ctx_r236.lucene.query)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](6, _c9));
  }
}
function AdminPageComponent_div_24_div_20_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r247 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 63)(1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "mat-radio-group", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_div_4_Template_mat_radio_group_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r247);
      const ctx_r246 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r246.lucene.store = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "mat-radio-button", 226);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6, "Workspace");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "mat-radio-button", 227);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8, "Archive");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r237 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 2, "ADMIN.BROWSER.STORE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r237.lucene.store);
  }
}
function AdminPageComponent_div_24_div_20_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r249 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 63)(1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "mat-radio-group", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_div_5_Template_mat_radio_group_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r249);
      const ctx_r248 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r248.lucene.outputMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "mat-radio-button", 228);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](8, "mat-radio-button", 229);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r238 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 4, "ADMIN.BROWSER.OUTPUT_MODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r238.lucene.outputMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](7, 6, "ADMIN.BROWSER.OUTPUT_MODE_VIEW"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 8, "ADMIN.BROWSER.OUTPUT_MODE_EXPORT"));
  }
}
function AdminPageComponent_div_24_div_20_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r251 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "div", 63)(2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "textarea", 230);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_ng_container_6_Template_textarea_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r251);
      const ctx_r250 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r250.lucene.properties = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "div", 63)(11, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](14, "div")(15, "mat-radio-group", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_ng_container_6_Template_mat_radio_group_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r251);
      const ctx_r252 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r252.lucene.exportFormat = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "mat-radio-button", 231);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](19, "mat-radio-button", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](22, "div", 63)(23, "div")(24, "button", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_24_div_20_ng_container_6_Template_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r251);
      const ctx_r253 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r253.exportLucene());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r239 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 8, "ADMIN.BROWSER.LUCENE_EXPORT_PROPERTIES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r239.lucene.properties);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 10, "ADMIN.BROWSER.LUCENE_EXPORT_PROPERTIES_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](13, 12, "ADMIN.BROWSER.OUTPUT_MODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r239.lucene.exportFormat);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](18, 14, "ADMIN.BROWSER.EXPORT_FORMAT_CSV"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](21, 16, "ADMIN.BROWSER.EXPORT_FORMAT_JSON"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](26, 18, "ADMIN.BROWSER.LUCENE_EXPORT_START"), " ");
  }
}
function AdminPageComponent_div_24_div_20_ng_container_7_div_6_mat_chip_option_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r258 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-chip-option", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("removed", function AdminPageComponent_div_24_div_20_ng_container_7_div_6_mat_chip_option_3_Template_mat_chip_option_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r258);
      const authority_r256 = restoredCtx.$implicit;
      const ctx_r257 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r257.removeLuceneAuthority(authority_r256));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](4, "i", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const authority_r256 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 1, authority_r256));
  }
}
function AdminPageComponent_div_24_div_20_ng_container_7_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 235);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](2, "mat-chip-listbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](3, AdminPageComponent_div_24_div_20_ng_container_7_div_6_mat_chip_option_3_Template, 5, 3, "mat-chip-option", 236);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r254 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r254.lucene.authorities);
  }
}
function AdminPageComponent_div_24_div_20_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r260 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "div", 63)(2, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "es-authority-search-input", 233);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("onChooseAuthority", function AdminPageComponent_div_24_div_20_ng_container_7_Template_es_authority_search_input_onChooseAuthority_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r260);
      const ctx_r259 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r259.addLuceneAuthority($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](6, AdminPageComponent_div_24_div_20_ng_container_7_div_6_Template, 4, 1, "div", 234);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r240 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 5, "ADMIN.BROWSER.LUCENE_AUTHORITIES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("globalSearchAllowed", true)("placeholder", "ADMIN.BROWSER.ADD_AUTHORITY")("allowAny", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r240.lucene.authorities && ctx_r240.lucene.authorities.length);
  }
}
function AdminPageComponent_div_24_div_20_div_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r263 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "input", 238);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_div_8_ng_container_1_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r263);
      const ctx_r262 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r262.lucene.offset = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "input", 239);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_div_20_div_8_ng_container_1_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r263);
      const ctx_r264 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r264.lucene.count = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r261 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](4, 4, "ADMIN.BROWSER.LUCENE_OFFSET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r261.lucene.offset);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](9, 6, "ADMIN.BROWSER.LUCENE_COUNT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r261.lucene.count);
  }
}
function AdminPageComponent_div_24_div_20_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r266 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 237);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](1, AdminPageComponent_div_24_div_20_div_8_ng_container_1_Template, 11, 8, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](2, "div")(3, "button", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_24_div_20_div_8_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r266);
      const ctx_r265 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r265.searchNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r241 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r241.lucene.mode === "SOLR");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](5, 2, "ADMIN.BROWSER.LUCENE_START"), " ");
  }
}
function AdminPageComponent_div_24_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 60)(1, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_div_24_div_20_mat_form_field_2_Template, 5, 4, "mat-form-field", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](3, AdminPageComponent_div_24_div_20_div_3_Template, 5, 7, "div", 220);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](4, AdminPageComponent_div_24_div_20_div_4_Template, 9, 4, "div", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_div_24_div_20_div_5_Template, 11, 10, "div", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](6, AdminPageComponent_div_24_div_20_ng_container_6_Template, 27, 20, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](7, AdminPageComponent_div_24_div_20_ng_container_7_Template, 7, 7, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_24_div_20_div_8_Template, 6, 4, "div", 221);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r229 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.mode === "SOLR");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.mode === "ELASTIC");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.mode === "SOLR");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.mode === "SOLR");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.outputMode === "export");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.mode === "SOLR");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r229.lucene.outputMode === "view");
  }
}
function AdminPageComponent_div_24_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 240)(1, "label", 241);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](4, "ngx-monaco-editor", 242);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r230 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](3, 4, "ADMIN.BROWSER.ELASTIC_RESPONSE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("options", ctx_r230.elasticResponseCodeOptions)("ngModel", ctx_r230.elasticResponse.elasticResponse)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](6, _c9));
  }
}
function AdminPageComponent_div_24_div_22_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 248);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](2, 1, "WORKSPACE.NO_MATCHING_ITEMS"), " ");
  }
}
function AdminPageComponent_div_24_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r272 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 243);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "es-actionbar", null, 244);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "es-node-entries-wrapper", 245, 246);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("clickItem", function AdminPageComponent_div_24_div_22_Template_es_node_entries_wrapper_clickItem_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r272);
      const ctx_r271 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r271.debugNode($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, AdminPageComponent_div_24_div_22_ng_template_5_Template, 3, 3, "ng-template", null, 247, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r231 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("dataSource", ctx_r231.searchResponse)("scope", ctx_r231.SCOPES.Admin)("columns", ctx_r231.searchColumns)("configureColumns", true)("displayType", ctx_r231.NodeEntriesDisplayType.Table)("elementInteractionType", ctx_r231.InteractionType.Emitter);
  }
}
function AdminPageComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r274 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 212)(1, "div", 39)(2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](3, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 63)(8, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "mat-form-field")(12, "mat-select", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_24_Template_mat_select_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r274);
      const ctx_r273 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r273.lucene.mode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "mat-option", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](14, "Node-Ref / Node-Id");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](15, "mat-option", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](16, "Solr / Lucene Query");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](17, "mat-option", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](18, "Elasticsearch Query (DSL)");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](19, AdminPageComponent_div_24_div_19_Template, 10, 7, "div", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](20, AdminPageComponent_div_24_div_20_Template, 9, 7, "div", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](21, AdminPageComponent_div_24_div_21_Template, 5, 7, "div", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](22, AdminPageComponent_div_24_div_22_Template, 7, 6, "div", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](23, "es-lucene-template-memory", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("queryChange", function AdminPageComponent_div_24_Template_es_lucene_template_memory_queryChange_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r274);
      const ctx_r275 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r275.lucene.query = $event);
    })("propertiesChange", function AdminPageComponent_div_24_Template_es_lucene_template_memory_propertiesChange_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r274);
      const ctx_r276 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r276.lucene.properties = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](6, 9, "ADMIN.BROWSER.NODE_BROWSER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 11, "ADMIN.BROWSER.MODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r17.lucene.mode);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r17.lucene.mode === "NODEREF");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r17.lucene.mode === "SOLR" || ctx_r17.lucene.mode === "ELASTIC");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r17.lucene.mode === "ELASTIC" && ctx_r17.elasticResponse);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r17.lucene.mode === "NODEREF" || ctx_r17.lucene.outputMode === "view");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("query", ctx_r17.lucene.query)("properties", ctx_r17.lucene.properties);
  }
}
function AdminPageComponent_div_25_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r282 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 258)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_25_div_4_Template_i_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r282);
      const eduGroup_r280 = restoredCtx.$implicit;
      const ctx_r281 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r281.removeEduGroup(eduGroup_r280));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](4, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const eduGroup_r280 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](eduGroup_r280.title);
  }
}
function AdminPageComponent_div_25_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "mat-option", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r283 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("value", option_r283);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](option_r283);
  }
}
function AdminPageComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r285 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 249)(1, "form")(2, "es-autocomplete", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("addItem", function AdminPageComponent_div_25_Template_es_autocomplete_addItem_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r284 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r284.addEduGroup($event));
    })("updateInput", function AdminPageComponent_div_25_Template_es_autocomplete_updateInput_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r286 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r286.updateEduGroupSuggestions($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div", 251);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](4, AdminPageComponent_div_25_div_4_Template, 5, 1, "div", 252);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](5, "div", 63)(6, "mat-form-field")(7, "mat-select", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("ngModelChange", function AdminPageComponent_div_25_Template_mat_select_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r287 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r287.selectedTemplate = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](8, AdminPageComponent_div_25_mat_option_8_Template, 2, 2, "mat-option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div")(10, "button", 253);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_25_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const _r279 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](24);
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](_r279.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "div", 63)(14, "div")(15, "button", 254);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_25_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r289 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r289.gotoFoldertemplateFolder());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](18, "div")(19, "button", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("click", function AdminPageComponent_div_25_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r290 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r290.applyTemplate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](22, "div", 60)(23, "input", 255, 256);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function AdminPageComponent_div_25_Template_input_change_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r285);
      const ctx_r291 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r291.uploadTemplate($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](25, "div", 257);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("inputMinLength", 2)("placeholder", "ADMIN.FOLDERTEMPLATES.EDUGROUP")("suggestions", ctx_r18.eduGroupSuggestions);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r18.eduGroupsSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngModel", ctx_r18.selectedTemplate);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx_r18.templates);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](12, 10, "ADMIN.FOLDERTEMPLATES.UPLOAD_TEMPLATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](17, 12, "ADMIN.FOLDERTEMPLATES.GOTO_FOLDERTEMPLATES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](21, 14, "ADMIN.FOLDERTEMPLATES.APPLYTEMPLATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](27, 16, "ADMIN.FOLDERTEMPLATES.UPLOAD_HINT"));
  }
}
function AdminPageComponent_es_global_progress_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "es-global-progress");
  }
}
class AdminPageComponent {
  constructor(about, admin, config, connector, dialogs, mainNav, mediacenterService, networkService, node, organization, platformLocation, route, router, searchApi, sessionStorage, storage, toast, translate, translations) {
    this.about = about;
    this.admin = admin;
    this.config = config;
    this.connector = connector;
    this.dialogs = dialogs;
    this.mainNav = mainNav;
    this.mediacenterService = mediacenterService;
    this.networkService = networkService;
    this.node = node;
    this.organization = organization;
    this.platformLocation = platformLocation;
    this.route = route;
    this.router = router;
    this.searchApi = searchApi;
    this.sessionStorage = sessionStorage;
    this.storage = storage;
    this.toast = toast;
    this.translate = translate;
    this.translations = translations;
    this.AuthoritySearchMode = _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_8__.AuthoritySearchMode;
    this.SCOPES = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.Scope;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.InteractionType;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.NodeEntriesDisplayType;
    this.mailTemplates = ['invited', 'invited_workflow', 'invited_safe', 'invited_collection', 'nodeIssue', 'userStatusChanged', 'groupSignupList', 'groupSignupUser', 'groupSignupConfirmed', 'groupSignupRejected', 'groupSignupAdmin', 'userRegister', 'passwordRequest', 'userRegisterInformation'];
    this.globalProgress = true;
    this.oai = {};
    this.job = {};
    this.jobs = [];
    this.jobsOpen = [];
    this.jobsLogFilter = [];
    this.jobsLogLevel = [];
    this.jobsLogData = [];
    this.jobCodeOptions = {
      minimap: {
        enabled: false
      },
      language: 'json',
      autoIndent: true,
      automaticLayout: true
    };
    this.dslCodeOptions = {
      minimap: {
        enabled: false
      },
      language: 'json',
      autoIndent: true,
      automaticLayout: true
    };
    this.elasticResponseCodeOptions = {
      minimap: {
        enabled: false
      },
      language: 'json',
      autoIndent: true,
      automaticLayout: true,
      readOnly: true
    };
    this.jobClasses = [];
    this.jobClassesSuggested = [];
    this.lucene = {
      mode: 'NODEREF',
      store: 'Workspace',
      offset: 0,
      count: 100,
      outputMode: 'view'
    };
    this.oaiSave = true;
    this.updates = [];
    this.applications = [];
    this.applicationsOpen = {};
    this.parentCollectionType = 'root';
    this.buttons = [];
    this.editableXmls = [{
      name: 'HOMEAPP',
      file: _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.HOME_APPLICATION_XML
    }];
    this.searchResponse = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.NodeDataSource();
    this.searchColumns = [];
    this.selectedTemplate = '';
    this.eduGroupsSelected = [];
    this.systemChecks = [];
    this.tpChecks = [];
    this.ownAppMode = 'repository';
    this.onDestroyTasks = [];
    this.cancelJobButtons = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton.getYesNo(() => this.cancelJobInfo = null, () => {
      this.cancelJobFinally();
    });
    this._jobForceCancel = false;
    this.searchColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_NAME));
    this.searchColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.NODE_ID));
    this.searchColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_MODIFIED_DATE));
    this.translations.waitForInit().subscribe(() => {
      this.getTemplates();
      this.connector.isLoggedIn().subscribe(data => {
        this.loginResult = data;
        if (data.isAdmin) {
          this.init();
        } else {
          this.mediacenterService.getMediacenters().subscribe(mediacenters => {
            this.mediacenters = mediacenters;
            this.init();
          });
        }
      });
    });
  }
  static #_ = this.RS_CONFIG_HELP = 'https://docs.edu-sharing.com/confluence/edp/de/installation-en/installation-of-the-edu-sharing-rendering-service';
  get jobForceCancel() {
    return this._jobForceCancel ?? false;
  }
  set jobForceCancel(value) {
    this._jobForceCancel = value;
    this.cancelJobButtons[1].color = this._jobForceCancel ? 'danger' : 'primary';
  }
  ngOnInit() {
    this.mainNav.setMainNavConfig({
      title: 'ADMIN.TITLE',
      currentScope: 'admin'
    });
  }
  ngOnDestroy() {
    this.onDestroyTasks.forEach(task => task());
  }
  startJob() {
    this.storage.set('admin_job', this.job);
    this.globalProgress = true;
    try {
      this.admin.startJob(this.job.class, JSON.parse(this.job.params), this.uploadJobsFile).subscribe(() => {
        this.globalProgress = false;
        // this.uploadJobsFile = null;
        this.toast.toast('ADMIN.JOBS.JOB_STARTED');
      }, error => {
        this.globalProgress = false;
        this.toast.error(error);
      });
    } catch (e) {
      console.warn(e);
      this.toast.error(e);
      this.globalProgress = false;
    }
  }
  debugNode(node) {
    this.dialogs.openNodeInfoDialog({
      nodes: [node]
    });
  }
  getModeButton(mode = this.mode) {
    return this.buttons[_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.indexOfObjectArray(this.buttons, 'id', mode)];
  }
  searchNoderef() {
    this.storage.set('admin_lucene', this.lucene);
    this.globalProgress = true;
    this.node.getNodeMetadata(this.lucene.noderef, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ALL]).subscribe(node => {
      this.globalProgress = false;
      this.searchResponse.setData([node.node], {
        from: 0,
        count: 1,
        total: 1
      });
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  searchNodes() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.storage.set('admin_lucene', _this.lucene);
      const authorities = [];
      if (_this.lucene.authorities) {
        for (const auth of _this.lucene.authorities) {
          authorities.push(auth.authorityName);
        }
      }
      yield _this.nodeEntriesSearchResult.initOptionsGenerator({
        actionbar: _this.actionbarComponent
      });
      const request = {
        offset: _this.lucene.offset ? _this.lucene.offset : 0,
        count: _this.lucene.count,
        propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ALL]
      };
      _this.globalProgress = true;
      if (_this.lucene.mode === 'SOLR') {
        _this.admin.searchLucene(_this.lucene.query, _this.lucene.store, authorities, request).subscribe(data => {
          _this.globalProgress = false;
          _this.searchResponse.setData(data.nodes, data.pagination);
        }, error => {
          _this.globalProgress = false;
          _this.toast.error(error);
        });
      } else if (_this.lucene.mode === 'ELASTIC') {
        _this.admin.searchElastic(_this.lucene.query).subscribe(data => {
          _this.globalProgress = false;
          _this.elasticResponse = data;
          _this.searchResponse.setData(data.nodes, data.pagination);
        }, error => {
          _this.globalProgress = false;
          _this.toast.error(error);
        });
      }
    })();
  }
  addLuceneAuthority(authority) {
    if (!this.lucene.authorities) this.lucene.authorities = [];
    this.lucene.authorities.push(authority);
  }
  removeLuceneAuthority(authority) {
    this.lucene.authorities.splice(this.lucene.authorities.indexOf(authority), 1);
  }
  downloadApp(app) {
    _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.downloadContent(app.file, app.xml);
  }
  updateExcelFile(event) {
    this.excelFile = event.target.files[0];
  }
  updateUploadFile(event, file) {
    this[file] = event.target.files[0];
  }
  updateUploadOaiFile(event) {
    this.uploadOaiFile = event.target.files[0];
  }
  updateCollectionsFile(event) {
    this.collectionsFile = event.target.files[0];
  }
  importCollections() {
    if (!this.collectionsFile) {
      this.toast.error(null, 'ADMIN.IMPORT.CHOOSE_COLLECTIONS_XML');
      return;
    }
    if (!this.parentCollection && this.parentCollectionType == 'choose') {
      this.toast.error(null, 'ADMIN.IMPORT.CHOOSE_COLLECTION');
      return;
    }
    this.globalProgress = true;
    this.admin.importCollections(this.collectionsFile, this.parentCollectionType == 'root' ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ROOT : this.parentCollection.ref.id).subscribe(data => {
      this.toast.toast('ADMIN.IMPORT.COLLECTIONS_IMPORTED', {
        count: data.count
      });
      this.globalProgress = false;
      this.collectionsFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  startUploadTempFile() {
    if (!this.uploadTempFile) {
      this.toast.error(null, 'ADMIN.TOOLKIT.CHOOSE_UPLOAD_TEMP');
      return;
    }
    this.globalProgress = true;
    this.admin.uploadTempFile(this.uploadTempFile).subscribe(data => {
      this.toast.toast('ADMIN.TOOLKIT.UPLOAD_TEMP_DONE', {
        filename: data.file
      });
      this.globalProgress = false;
      this.uploadTempFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  importExcel() {
    if (!this.excelFile) {
      this.toast.error(null, 'ADMIN.IMPORT.CHOOSE_EXCEL');
      return;
    }
    if (!this.parentNode) {
      this.toast.error(null, 'ADMIN.IMPORT.CHOOSE_DIRECTORY');
      return;
    }
    this.globalProgress = true;
    this.admin.importExcel(this.excelFile, this.parentNode.ref.id).subscribe(data => {
      this.toast.toast('ADMIN.IMPORT.EXCEL_IMPORTED', {
        rows: data.rows
      });
      this.globalProgress = false;
      this.excelFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  configApp(app) {
    window.open(app.configUrl);
  }
  editApp(app) {
    var _this2 = this;
    const appName = app.name || 'HOMEAPP';
    const appXml = app.file;
    this.globalProgress = true;
    this.admin.getApplicationXML(app.file).subscribe( /*#__PURE__*/function () {
      var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (properties) {
        yield _this2.showXmlAppPropertiesDialog({
          appName,
          appXml,
          properties
        });
        _this2.globalProgress = false;
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  showXmlAppPropertiesDialog(data) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this3.dialogs.openXmlAppPropertiesDialog(data);
      dialogRef.afterClosed().subscribe(wasUpdated => {
        if (wasUpdated) {
          _this3.refreshAppList();
        }
      });
    })();
  }
  removeApp(app) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const info = Object.entries(app).filter(([key]) => key !== 'xml').map(([key, value]) => ({
        key,
        value
      }));
      const dialogRef = yield _this4.dialogs.openGenericDialog({
        title: 'ADMIN.APPLICATIONS.REMOVE_TITLE',
        message: 'ADMIN.APPLICATIONS.REMOVE_MESSAGE',
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_7__.DELETE_OR_CANCEL,
        contentTemplate: _this4.keyValueTable,
        context: {
          $implicit: info
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'YES_DELETE') {
          _this4.globalProgress = true;
          _this4.admin.removeApplication(app.id).subscribe(() => {
            _this4.globalProgress = false;
            _this4.refreshAppList();
          }, error => {
            _this4.toast.error(error);
            _this4.globalProgress = false;
          });
        }
      });
    })();
  }
  setMode(mode, skipLocationChange = false) {
    this.router.navigate(['./'], {
      queryParams: {
        mode
      },
      relativeTo: this.route,
      skipLocationChange: skipLocationChange
    });
  }
  chooseDirectory() {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this5.dialogs.openFileChooserDialog({
        title: 'ADMIN.IMPORT.CHOOSE_DIRECTORY',
        pickDirectory: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          _this5.pickDirectory(result);
        }
      });
    })();
  }
  pickDirectory(event) {
    this.parentNode = event[0];
  }
  chooseCollection() {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this6.dialogs.openFileChooserDialog({
        title: 'ADMIN.IMPORT.CHOOSE_COLLECTION',
        collections: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          _this6.pickCollection(result);
        }
      });
    })();
  }
  pickCollection(event) {
    this.parentCollection = event[0];
  }
  registerAppXml(event) {
    const file = event.target.files[0];
    if (!file) return;
    this.globalProgress = true;
    this.admin.addApplicationXml(file).subscribe(data => {
      this.toast.toast('ADMIN.APPLICATIONS.APP_REGISTERED');
      this.refreshAppList();
      this.globalProgress = false;
      this.xmlSelect.nativeElement.value = null;
    }, error => {
      this.globalProgress = false;
      this.xmlSelect.nativeElement.value = null;
      this.toast.error(error);
    });
  }
  registerApp() {
    this.globalProgress = true;
    this.admin.addApplication(this.appUrl).subscribe(data => {
      this.toast.toast('ADMIN.APPLICATIONS.APP_REGISTERED');
      this.refreshAppList();
      this.globalProgress = false;
      this.appUrl = '';
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  getCacheInfo() {
    this.globalProgress = true;
    this.admin.getCacheInfo(this.cacheInfo).subscribe(data => {
      this.globalProgress = false;
      void this.dialogs.openGenericDialog({
        title: this.cacheInfo,
        contentTemplate: this.keyValueTable,
        context: {
          $implicit: [{
            key: 'size',
            value: data.size
          }, {
            key: 'statisticHits',
            value: data.statisticHits
          }]
        }
      });
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  refreshAppInfo() {
    this.globalProgress = true;
    this.admin.refreshAppInfo().subscribe(() => {
      this.globalProgress = false;
      this.toast.toast('ADMIN.TOOLKIT.APP_INFO_REFRESHED');
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  refreshEduGroupCache() {
    this.globalProgress = true;
    this.admin.refreshEduGroupCache().subscribe(() => {
      this.globalProgress = false;
      this.toast.toast('ADMIN.TOOLKIT.EDU_GROUP_CACHE_REFRESHED');
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  refreshCache(sticky) {
    this.globalProgress = true;
    this.admin.refreshCache(this.parentNode ? this.parentNode.ref.id : _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.USERHOME, sticky).subscribe(() => {
      this.globalProgress = false;
      this.toast.toast('ADMIN.TOOLKIT.CACHE_REFRESHED');
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  oaiImport() {
    if (!this.oaiPreconditions()) return;
    this.globalProgress = true;
    if (this.oaiSave) {
      this.storage.set('admin_oai', this.oai);
    }
    if (this.uploadOaiFile) {
      this.admin.importOAIXML(this.uploadOaiFile, this.oai.recordHandlerClassName, this.oai.binaryHandlerClassName).subscribe(node => {
        this.debugNode(node);
        this.globalProgress = false;
      }, error => {
        this.toast.error(error);
        this.globalProgress = false;
      });
    } else {
      this.admin.importOAI(this.oai.url, this.oai.set, this.oai.prefix, this.oai.className, this.oai.importerClassName, this.oai.recordHandlerClassName, this.oai.binaryHandlerClassName, this.oai.persistentHandlerClassName, this.oai.metadata, this.oai.file, this.oai.ids, this.oai.forceUpdate, this.oai.from, this.oai.until, this.oai.periodInDays).subscribe(() => {
        this.globalProgress = false;
        const additional = {
          link: {
            caption: 'ADMIN.IMPORT.OPEN_JOBS',
            callback: () => this.setMode('JOBS')
          }
        };
        this.toast.toast('ADMIN.IMPORT.OAI_STARTED', null, null, null, additional);
      }, error => {
        this.globalProgress = false;
        this.toast.error(error);
      });
    }
  }
  oaiPreconditions() {
    if (this.uploadOaiFile) return true;
    if (!this.oai.url) {
      this.toast.error(null, 'ADMIN.IMPORT.OAI_NO_URL');
      return false;
    }
    if (!this.oai.set) {
      this.toast.error(null, 'ADMIN.IMPORT.OAI_NO_SET');
      return false;
    }
    if (!this.oai.prefix) {
      this.toast.error(null, 'ADMIN.IMPORT.OAI_NO_PREFIX');
      return false;
    }
    return true;
  }
  removeImports() {
    if (!this.oaiPreconditions()) return;
    this.globalProgress = true;
    this.admin.removeDeletedImports(this.oai.url, this.oai.set, this.oai.prefix).subscribe(data => {
      this.globalProgress = false;
      this.toast.toast('ADMIN.IMPORT.IMPORTS_REMOVED');
      this.appUrl = '';
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  getPropertyValues() {
    this.globalProgress = true;
    this.admin.getPropertyValuespace(this.propertyName).subscribe(data => {
      this.globalProgress = false;
      void this.dialogs.openGenericDialog({
        title: 'ADMIN.TOOLKIT.PROPERTY_VALUESPACE',
        message: data.xml,
        messageMode: 'preformatted',
        maxWidth: null
      });
      this.appUrl = '';
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  runUpdate(update, execute = false) {
    this.globalProgress = true;
    this.admin.runServerUpdate(update.id, execute).subscribe(data => {
      this.globalProgress = false;
      void this.dialogs.openGenericDialog({
        title: 'ADMIN.UPDATE.RESULT',
        message: data.result,
        messageMode: 'preformatted',
        maxWidth: null
      });
      this.refreshUpdateList();
    }, error => {
      this.globalProgress = false;
      this.toast.error(error);
    });
  }
  refreshAppList() {
    this.admin.getApplications().subscribe(data => {
      this.applications = data;
      this.applicationsOpen = {};
      if (this.applications && this.applications.length) {
        this.getAppTypes().forEach(t => this.applicationsOpen[t] = true);
      }
    });
  }
  refreshCatalina() {
    this.admin.getCatalina().subscribe(data => {
      this.catalina = data.reverse().join('\n');
      this.setCatalinaPosition();
    });
  }
  setCatalinaPosition() {
    setTimeout(() => {
      if (this.catalinaRef) {
        this.catalinaRef.nativeElement.scrollTop = this.catalinaRef.nativeElement.scrollHeight;
      } else {
        this.setCatalinaPosition();
      }
    }, 50);
  }
  getTemplates() {
    this.getTemplateFolderId().subscribe(id => {
      this.node.getChildren(id).subscribe(data => {
        const templates = [];
        for (const node of data.nodes) {
          if (node.mimetype == 'text/xml') {
            templates.push(node.name);
          }
        }
        this.templates = templates;
        this.selectedTemplate = this.templates[0];
      });
    });
  }
  getTemplateFolderId() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_31__.Observable(observer => {
      this.searchApi.searchByProperties([_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_NAME], ['Edu_Sharing_Sys_Template'], ['='], '', _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CONTENT_TYPE_FILES_AND_FOLDERS).subscribe(data => {
        for (const node of data.nodes) {
          if (node.isDirectory) {
            observer.next(node.ref.id);
            observer.complete();
            return;
          }
        }
      });
    });
  }
  updateEduGroupSuggestions(event) {
    this.organization.getOrganizations(event.input, false).subscribe(data => {
      const ret = [];
      for (const orga of data.organizations) {
        const item = new _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.SuggestItem(orga.authorityName, orga.profile.displayName, 'group', '');
        item.originalObject = orga;
        ret.push(item);
      }
      this.eduGroupSuggestions = ret;
    });
  }
  addEduGroup(data) {
    if (_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.indexOfObjectArray(this.eduGroupsSelected, 'id', data.item.id) < 0) this.eduGroupsSelected.push(data.item);
  }
  removeEduGroup(data) {
    this.eduGroupsSelected.splice(_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.indexOfObjectArray(this.eduGroupsSelected, 'id', data.id), 1);
  }
  uploadTemplate(event) {
    const file = event.target.files[0];
    if (!file) return;
    const id = '';
    this.globalProgress = true;
    this.getTemplateFolderId().subscribe(id => {
      this.node.createNode(id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_TYPE_IO, [], _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestHelper.createNameProperty(file.name), true).subscribe(data => {
        this.node.uploadNodeContent(data.node.ref.id, file, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.COMMENT_MAIN_FILE_UPLOAD).subscribe(data => {
          this.getTemplates();
          this.toast.toast('ADMIN.FOLDERTEMPLATES.UPLOAD_DONE', {
            filename: JSON.parse(data.response).node.name
          });
          this.globalProgress = false;
          this.templateSelect.nativeElement.value = null;
        });
      }, error => {
        this.globalProgress = false;
        this.templateSelect.nativeElement.value = null;
        this.toast.error(error);
      });
    });
  }
  applyTemplate(position = 0) {
    this.globalProgress = true;
    if (this.eduGroupsSelected.length < 1) {
      this.toast.error(null, 'ADMIN.FOLDERTEMPLATES.MISSING_GROUP');
      this.globalProgress = false;
      return;
    }
    if (this.selectedTemplate == '') {
      this.toast.error(null, 'ADMIN.FOLDERTEMPLATES.MISSING_TEMPLATE');
      this.globalProgress = false;
      return;
    }
    if (position >= this.eduGroupsSelected.length) {
      this.globalProgress = false;
      // done
      return;
    }
    this.admin.applyTemplate(this.eduGroupsSelected[position].id, this.selectedTemplate).subscribe(data => {
      this.toast.toast('ADMIN.FOLDERTEMPLATES.TEMPLATE_APPLIED', {
        templatename: this.selectedTemplate,
        groupname: this.eduGroupsSelected[position].id
      });
      this.applyTemplate(position + 1);
    }, error => {
      this.toast.error(error, 'ADMIN.FOLDERTEMPLATES.TEMPLATE_NOTAPPLIED', {
        templatename: this.selectedTemplate,
        groupname: this.eduGroupsSelected[position].id
      });
      this.applyTemplate(position + 1);
    });
  }
  gotoFoldertemplateFolder() {
    this.getTemplateFolderId().subscribe(id => {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.UIConstants.ROUTER_PREFIX + 'workspace'], {
        queryParams: {
          id
        }
      });
    });
  }
  getJobLog(job, pos) {
    let log = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.deepCopy(job.log)?.reverse();
    if (!log) {
      return null;
    }
    if (this.jobsLogLevel[pos]) {
      const result = [];
      for (const l of log) {
        if (l.level.syslogEquivalent > this.jobsLogLevel[pos]) continue;
        result.push(l);
      }
      log = result;
    }
    if (this.jobsLogFilter[pos]) {
      const result = [];
      for (const l of log) {
        if (l.message.indexOf(this.jobsLogFilter[pos]) == -1 && l.className.indexOf(this.jobsLogFilter[pos]) == -1) continue;
        result.push(l);
      }
      log = result;
    }
    if (log.length <= 200) return log;
    return log.slice(0, 200);
  }
  cancelJob(job) {
    this.cancelJobInfo = job;
  }
  cancelJobFinally() {
    const jobInfo = this.cancelJobInfo;
    this.cancelJobInfo = null;
    this.admin.cancelJob(jobInfo.jobName, this.jobForceCancel).subscribe(() => {
      this.toast.toast('ADMIN.JOBS.TOAST_CANCELED');
      this.globalProgress = false;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  reloadJobStatus() {
    this.admin.getJobs().subscribe(jobs => {
      if (!jobs) {
        this.jobs = null;
      }
      this.jobs = jobs.filter(j => !!j);
      this.updateJobLogs();
    });
  }
  getMajorVersion(version) {
    const v = version.split('.');
    if (v.length < 3) return version;
    v.splice(2, v.length - 2);
    return v.join('.');
  }
  runTpChecks() {
    const checks = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_USAGE_STATISTIC, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_PUBLISH_COPY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_USER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_NODES];
    this.tpChecks = [];
    this.admin.getToolpermissions(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_EVERYONE).subscribe(tp => {
      checks.forEach(c => {
        this.tpChecks.push({
          name: c,
          status: tp[c].explicit === 'ALLOWED' ? 'FAIL' : 'OK'
        });
      });
    });
  }
  runChecks() {
    this.systemChecks = [];
    // check versions render service
    this.about.getAbout().subscribe(about => {
      const repositoryVersion = this.getMajorVersion(about.version.repository);
      const renderServiceVersion = this.getMajorVersion(about.version.renderservice);
      this.systemChecks.push({
        name: 'RENDERING',
        status: repositoryVersion == 'unknown' ? 'WARN' : repositoryVersion == renderServiceVersion ? 'OK' : 'FAIL',
        translate: about.version,
        callback: () => {
          this.setMode('APPLICATIONS');
        }
      });
    }, error => {
      this.systemChecks.push({
        name: 'RENDERING',
        status: 'FAIL',
        error,
        callback: () => {
          this.setMode('APPLICATIONS');
        }
      });
    });
    // check if appid is changed
    this.networkService.getRepositories().subscribe(repositories => {
      const id = repositories.filter(repo => repo.isHomeRepo)[0].id;
      this.systemChecks.push({
        name: 'APPID',
        status: id == 'local' ? 'WARN' : 'OK',
        translate: {
          id
        },
        callback: () => {
          this.setMode('APPLICATIONS');
          this.editApp(this.editableXmls.filter(xml => xml.name == 'HOMEAPP')[0]);
        }
      });
    });
    this.node.getNodePermissions(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.USERHOME).subscribe(data => {
      let status = 'OK';
      for (const perm of data.permissions.localPermissions.permissions) {
        if (perm.authority.authorityName == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_EVERYONE) {
          status = 'FAIL';
        }
      }
      this.systemChecks.push(this.createSystemCheck('COMPANY_HOME', status));
    }, error => {
      this.systemChecks.push(this.createSystemCheck('COMPANY_HOME', 'FAIL', error));
    });
    this.admin.getJobs().subscribe(jobs => {
      let count = 0;
      for (const job of jobs) {
        if (job.status == 'Running') {
          count++;
        }
      }
      this.systemChecks.push({
        name: 'JOBS_RUNNING',
        status: count == 0 ? 'OK' : 'WARN',
        translate: {
          count
        }
      });
    });
    // check status of nodeReport + mail server
    this.admin.getConfigMerged().subscribe(config => {
      const mail = config.repository.mail;
      if (this.config.instant('nodeReport', false)) {
        this.systemChecks.push({
          name: 'MAIL_REPORT',
          status: mail.report.receivers && mail.server.smtp.host ? 'OK' : 'FAIL',
          translate: {
            receivers: mail.report?.receivers?.join(', ')
          }
        });
      }
      this.systemChecks.push({
        name: 'MAIL_SETUP',
        status: mail.server.smtp.host ? 'OK' : 'FAIL',
        translate: mail.server.smtp
      });
    });
    this.admin.getApplicationXML(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.HOME_APPLICATION_XML).subscribe(home => {
      this.systemChecks.push({
        name: 'CORS',
        status: home.allow_origin ? home.allow_origin.indexOf('http://localhost:54361') != -1 ? 'OK' : 'INFO' : 'FAIL',
        translate: home,
        callback: () => {
          this.setMode('APPLICATIONS');
          this.editApp(this.editableXmls.filter(xml => xml.name == 'HOMEAPP')[0]);
        }
      });
      const domainRepo = home.domain;
      let domainRender;
      try {
        domainRender = new URL(home.contenturl).host;
      } catch (e) {
        console.warn(e);
      }
      this.systemChecks.push({
        name: 'RS_XSS',
        status: domainRepo == domainRender ? 'FAIL' : home.allow_origin ? 'OK' : 'INFO',
        translate: {
          repo: domainRepo,
          render: domainRender
        },
        callback: () => {
          window.open(AdminPageComponent.RS_CONFIG_HELP);
        }
      });
    });
  }
  createSystemCheck(name, status, error = null) {
    const check = {
      name,
      status,
      error
    };
    if (name == 'COMPANY_HOME') {
      check.callback = () => {
        this.node.getNodeMetadata(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.USERHOME).subscribe(node => {
          _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_5__.UIHelper.goToWorkspaceFolder(this.node, this.router, null, node.node.parent.id);
        });
      };
    }
    return check;
  }
  getChecks(checks) {
    checks.sort((a, b) => {
      const status = {
        FAIL: 0,
        WARN: 1,
        INFO: 2,
        OK: 3
      };
      const statusA = status[a.status];
      const statusB = status[b.status];
      if (statusA != statusB) return statusA < statusB ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return checks;
  }
  testMail() {
    this.globalProgress = true;
    this.admin.testMail(this.mailReceiver, this.mailTemplate).subscribe(() => {
      this.toast.toast('ADMIN.CONFIG.MAIL_SENT', {
        receiver: this.mailReceiver
      });
      this.globalProgress = false;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  updateJobLogs() {
    this.jobsLogData = [];
    let i = 0;
    if (this.jobs) {
      for (const job of this.jobs) {
        this.jobsLogData.push(this.getJobLog(job, i));
        i++;
      }
    }
  }
  prepareJobClasses() {
    this.jobClasses = this.availableJobs.map(j => {
      const job = new _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.SuggestItem('');
      const id = j.name.split('.');
      job.id = j.name;
      job.title = j.description;
      job.secondaryTitle = id[id.length - 1];
      job.originalObject = j;
      return job;
    });
  }
  getJobName(job) {
    if (job && job.class) {
      let name = job.class.split('.');
      name = name[name.length - 1];
      return name;
    }
    return null;
  }
  updateJobSuggestions(event) {
    const name = event ? event.input.toString().toLowerCase() : '';
    if (name === '*') {
      this.jobClassesSuggested = this.jobClasses;
    } else {
      console.log(name);
      this.jobClassesSuggested = this.jobClasses.filter(j => j.title && j.title.toLowerCase().indexOf(name) !== -1 || j.secondaryTitle && j.secondaryTitle.toLowerCase().indexOf(name) !== -1);
    }
  }
  refreshUpdateList() {
    this.admin.getServerUpdates().subscribe(data => {
      this.updates = data;
    });
  }
  exportLucene() {
    if (!this.lucene.properties) {
      this.toast.error(null, 'ADMIN.BROWSER.LUCENE_PROPERTIES_REQUIRED');
      return;
    }
    this.storage.set('admin_lucene', this.lucene);
    this.globalProgress = true;
    const props = this.lucene.properties.split('\n');
    this.admin.exportLucene(this.lucene.query, this.lucene.store, props, this.lucene.authorities?.map(a => a.authorityName)).subscribe(data => {
      const filename = 'Export-' + ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.DateHelper.formatDate(this.translate, new Date().getTime(), {
        useRelativeLabels: false
      });
      this.globalProgress = false;
      // transform store refs to ids
      data.forEach(d => {
        Object.keys(d).forEach(k => {
          if (d[k]?.id) {
            d[k] = d[k].id;
          }
        });
      });
      if (this.lucene.exportFormat === 'json') {
        // reformat data, move all parent:: props to a seperate child
        data.forEach(d => {
          Object.keys(d).filter(k => k.startsWith('parent::')).forEach(key => {
            if (!d.parent) {
              d.parent = {};
            }
            d.parent[key.substring('parent::'.length)] = d[key];
            delete d[key];
          });
        });
        _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.downloadContent(filename + '.json', JSON.stringify(data, null, 2));
      } else {
        _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_3__.CsvHelper.download(filename, props, data);
      }
    });
  }
  initButtons() {
    if (this.loginResult.isAdmin) {
      this.buttons = [{
        id: 'INFO',
        icon: 'info_outline'
      }, {
        id: 'PLUGINS',
        icon: 'extension'
      }, {
        id: 'FRONTPAGE',
        icon: 'home'
      }, {
        id: 'GLOBAL_CONFIG',
        icon: 'edit'
      }, {
        id: 'CONFIG',
        icon: 'build'
      }, {
        id: 'APPLICATIONS',
        icon: 'apps'
      }, {
        id: 'UPDATE',
        icon: 'update'
      }, {
        id: 'IMPORT',
        icon: 'cloud_download'
      }, {
        id: 'JOBS',
        icon: 'check'
      }, {
        id: 'TOOLKIT',
        icon: 'settings'
      }, {
        id: 'BROWSER',
        icon: 'search'
      }, {
        id: 'FOLDERTEMPLATES',
        icon: 'create_new_folder'
      }];
    }
    if (this.loginResult.isAdmin || this.loginResult.toolPermissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_NODES) !== -1 || this.loginResult.toolPermissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_USER) !== -1) {
      this.buttons.splice(1, 0, {
        id: 'STATISTICS',
        icon: 'assessment'
      });
    }
    if (this.loginResult.isAdmin || this.mediacenters?.filter(mc => mc.administrationAccess).length) {
      this.buttons.splice(3, 0, {
        id: 'MEDIACENTER',
        icon: 'business'
      });
    }
  }
  init() {
    this.initButtons();
    if (this.buttons.length === 0) {
      this.toast.error(null, 'TOAST.API_FORBIDDEN');
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_5__.UIHelper.goToDefaultLocation(this.router, this.platformLocation, this.config);
      return;
    }
    this.globalProgress = false;
    this.searchColumns = _workspace_page_explorer_explorer_component__WEBPACK_IMPORTED_MODULE_9__.WorkspaceExplorerComponent.getColumns(this.connector);
    this.searchColumns.filter(s => [_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_NAME, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.NODE_ID, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_CREATOR].includes(s.name)).forEach(s => s.visible = true);
    this.route.queryParams.subscribe(data => {
      if (data.mode) {
        this.mode = data.mode;
        if (this.getModeButton().factory) {
          setTimeout(() => {
            const ref = this.dynamicComponent.createComponent(this.getModeButton().factory);
          });
        }
      } else this.setMode(this.buttons[0].id, true);
    });
    if (this.loginResult.isAdmin) {
      void this.showWarningDialog();
      this.admin.getServerUpdates().subscribe(data => {
        this.updates = data;
      });
      this.refreshUpdateList();
      // this.refreshCatalina();
      this.refreshAppList();
      this.storage.get('admin_job', this.job).subscribe(data => {
        this.job = data;
      });
      this.storage.get('admin_lucene', this.lucene).subscribe(data => {
        this.lucene = data;
      });
      this.reloadJobStatus();
      this.runTpChecks();
      this.runChecks();
      this.admin.getAllJobs().subscribe(jobs => {
        this.availableJobs = jobs;
        this.prepareJobClasses();
      });
      const interval = setInterval(() => {
        if (this.mode == 'JOBS') this.reloadJobStatus();
      }, 10000);
      this.onDestroyTasks.push(() => clearInterval(interval));
      this.admin.getOAIClasses().subscribe(classes => {
        this.oaiClasses = classes;
        this.storage.get('admin_oai').subscribe(data => {
          if (data) this.oai = data;else {
            this.oai = {
              className: classes[0],
              importerClassName: 'org.edu_sharing.repository.server.importer.OAIPMHLOMImporter',
              recordHandlerClassName: 'org.edu_sharing.repository.server.importer.RecordHandlerLOM'
            };
          }
          if (!this.oai.binaryHandlerClassName) this.oai.binaryHandlerClassName = '';
        });
      });
      this.admin.getRepositoryVersion().subscribe(data => {
        this.repositoryVersion = JSON.stringify(data, null, 2);
      }, error => {
        console.info(error);
        this.repositoryVersion = 'Error accessing version information. Are you in dev mode?';
      });
    }
  }
  showWarningDialog() {
    var _this7 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alreadyConfirmed = yield _this7.sessionStorage.get('admin-confirmed-warning-dialog', false, ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__.Store.Session).toPromise();
      if (alreadyConfirmed) {
        return;
      }
      const dialogRef = yield _this7.dialogs.openGenericDialog({
        title: 'ADMIN.WARNING_TITLE',
        message: 'ADMIN.WARNING_INFO',
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'ADMIN.UNDERSTAND',
          config: {
            color: 'primary'
          }
        }],
        closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__.Closable.Disabled,
        maxWidth: 600
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'CANCEL') {
          window.history.back();
        } else if (result === 'ADMIN.UNDERSTAND') {
          void _this7.sessionStorage.set('admin-confirmed-warning-dialog', true, ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__.Store.Session);
        }
      });
    })();
  }
  getOwnAppUrl() {
    return this.connector.getAbsoluteEdusharingUrl() + 'metadata?format=' + this.ownAppMode + '&external=true';
  }
  copyOwnApp() {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_5__.UIHelper.copyToClipboard(this.getOwnAppUrl());
    this.toast.toast('ADMIN.APPLICATIONS.COPIED_CLIPBOARD');
  }
  getAppTypes() {
    return Array.from(new Set(this.applications.map(a => a.type)));
  }
  getApplications(type) {
    return this.applications.filter(a => a.type === type);
  }
  modeIsActive(mode) {
    if (this.mode === mode) {
      if (this.buttons.filter(b => b.id === mode).length === 1) {
        return true;
      }
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.UIConstants.ROUTER_PREFIX, 'workspace']);
    }
    return false;
  }
  fixTp(check) {
    this.tpChecks = [];
    this.admin.getToolpermissions(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_EVERYONE).subscribe(tpIn => {
      const tp = {};
      Object.keys(tpIn).forEach(k => tp[k] = tpIn[k].explicit);
      tp[check.name] = 'UNDEFINED';
      this.admin.setToolpermissions(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_EVERYONE, tp).subscribe(() => this.runTpChecks());
    });
  }
  supportsUpload(job) {
    return job?.params?.some(p => p.file);
  }
  setJob(item) {
    this.job.name = item.item.title;
    this.job.class = item.item.id;
    this.job.object = item.item.originalObject;
  }
  setJobParamsTemplate() {
    const data = {};
    let modified = false;
    for (const param of this.job.object.params) {
      if (param.file) {
        continue;
      }
      data[param.name] = param.type === 'boolean' ? param.sampleValue === 'true' : param.sampleValue ?? '';
      if (param.type?.includes('Integer') && data[param.name] === '') {
        data[param.name] = null;
      }
      if (param.values) {
        data[param.name] = param.values.map(v => v.name).join('|');
      }
      if (param.array) {
        data[param.name] = [data[param.name]];
      }
      modified = true;
    }
    console.log(data, this.job);
    if (modified) {
      this.job.params = JSON.stringify(data, null, 2);
    }
  }
  authenticateAsUser() {
    var _this8 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this8.dialogs.openGenericDialog({
        title: 'ADMIN.TOOLKIT.AUTHENTICATE_AS_USER',
        message: 'ADMIN.TOOLKIT.AUTHENTICATE_AS_USER_DETAILS',
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_7__.OK_OR_CANCEL
      });
      dialogRef.afterClosed().subscribe( /*#__PURE__*/function () {
        var _ref2 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (response) {
          if (response === 'OK') {
            yield _this8.admin.switchAuthentication(_this8.authenticateAuthority.authorityName).toPromise();
            _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_5__.UIHelper.goToDefaultLocation(_this8.router, _this8.platformLocation, _this8.config, true);
          }
        });
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    })();
  }
  openNodeRender(event) {
    const url = this.router.createUrlTree([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.UIConstants.ROUTER_PREFIX + 'render', event.ref.id]);
    window.open(this.connector.getAbsoluteEdusharingUrl() + this.router.serializeUrl(url));
  }
  static #_2 = this.ɵfac = function AdminPageComponent_Factory(t) {
    return new (t || AdminPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__.AboutService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_11__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestMediacenterService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_32__.NetworkService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestOrganizationService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_33__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_34__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_34__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_12__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_35__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.TranslationsService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdefineComponent"]({
    type: AdminPageComponent,
    selectors: [["es-admin-page"]],
    viewQuery: function AdminPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c3, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c5, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c6, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c7, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.nodeEntriesSearchResult = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.actionbarComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.keyValueTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.catalinaRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.xmlSelect = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.excelSelect = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.templateSelect = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.dynamicComponent = _t.first);
      }
    },
    decls: 27,
    vars: 24,
    consts: [["keyValueTable", ""], ["height", "auto", 3, "title", "buttons", 4, "ngIf"], [1, "main"], [1, "main-nav"], ["matRipple", "", "matRippleColor", "primary", "class", "button clickable", "tabindex", "0", 3, "active", "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["role", "main", "esSkipTarget", "MAIN_CONTENT"], ["esTitle", "", 1, "cdk-visually-hidden"], [4, "ngIf"], ["class", "content info", 4, "ngIf"], ["class", "content config", 4, "ngIf"], ["class", "content statistics", 4, "ngIf"], ["class", "content mediacenter", 4, "ngIf"], ["class", "content frontpage", 4, "ngIf"], ["class", "content global-config", 4, "ngIf"], ["class", "content plugins", 4, "ngIf"], ["class", "content applications", 4, "ngIf"], ["class", "content update", 4, "ngIf"], ["class", "content import", 4, "ngIf"], ["class", "content jobs", 4, "ngIf"], ["class", "content toolkit", 4, "ngIf"], ["class", "content browser", 4, "ngIf"], ["class", "content foldertemplates", 4, "ngIf"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "key"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "value"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-cell", ""], ["mat-row", ""], ["height", "auto", 3, "title", "buttons"], [1, "card-content-padding"], [1, "cancel-job-message"], [3, "ngModel", "ngModelOptions", "ngModelChange"], ["slot", "label"], ["slot", "description", 1, "description"], ["matRipple", "", "matRippleColor", "primary", "tabindex", "0", 1, "button", "clickable", 3, "click", "keyup.enter"], [3, "esIcon"], ["dynamic", ""], [1, "content", "info"], [1, "heading"], [1, "version"], [1, "checks"], [1, "reload"], [1, "material-icons", "clickable", 3, "click"], ["class", "check", 3, "check-fail", "check-ok", "check-info", "check-warn", 4, "ngFor", "ngForOf"], [1, "checks-toolpermissions"], [1, "info"], [1, "check"], [1, "data"], [1, "title"], [1, "description"], ["class", "solution", 4, "ngIf"], [1, "material-icons"], [1, "solution"], ["mat-button", "", "color", "primary", "class", "solution-link clickable", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 1, "solution-link", "clickable", 3, "click"], [1, "tp-name"], [1, "content", "config"], [1, "group", "xml"], [4, "ngFor", "ngForOf"], [1, "group"], [3, "ngSubmit"], ["mailForm", ""], [1, "inputGroupGrow"], ["matInput", "", "type", "email", "name", "receiver", 3, "ngModel", "ngModelChange"], ["name", "template", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "value"], [1, "content", "statistics"], [3, "onOpenNode"], [1, "content", "mediacenter"], [1, "content", "frontpage"], [1, "content", "global-config"], [1, "content", "plugins"], [1, "content", "applications"], ["type", "file", "id", "xmlSelect", "accept", "application/xml", 2, "display", "none", 3, "change"], ["xmlSelect", ""], [1, "register-app"], [1, "mat-heading-4", "mat-heading-underline"], ["matInput", "", "type", "text", "name", "appUrl", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", 3, "click"], [1, "useFile"], ["name", "ownAppMode", 3, "ngModel", "ngModelChange"], ["value", "repository"], ["value", "render"], ["value", "lms"], ["matInput", "", "type", "text", "name", "ownAppUrl", "readonly", "", 3, "ngModel"], [3, "onRefreshAppList"], [3, "multi"], [3, "expanded", 4, "ngFor", "ngForOf"], [3, "expanded"], [1, "app-list"], [1, "header"], [1, "id"], [1, "file"], [1, "repoType"], [1, "subtype"], [1, "config"], [1, "edit"], [1, "download"], [1, "delete"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["esIcon", "edit", 1, "clickable"], ["esIcon", "cloud_download", 1, "clickable"], ["esIcon", "delete", 1, "clickable"], ["esIcon", "settings", 1, "clickable"], [1, "content", "update"], [1, "hint"], [1, "table"], [1, "tableRow", "header"], [1, "date"], [1, "test"], [1, "run"], ["class", "tableRow", 3, "table-not-executed", 4, "ngFor", "ngForOf"], ["class", "updates-loading", 4, "ngIf"], [1, "tableRow"], ["class", "date", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "click"], [1, "updates-loading"], [1, "content", "import"], [1, "collections"], ["type", "file", "id", "xmlCollectionsSelect", "accept", ".xml, .zip", 2, "display", "none", 3, "change"], ["xmlCollectionsSelect", ""], [1, "inputGroup"], [1, "inputGroup", 3, "ngModel", "ngModelChange"], ["name", "parentCollection", "id", "parentCollectionRoot", "value", "root"], ["name", "parentCollection", "id", "parentCollectionChoose", "value", "choose"], ["class", "inputGroup", 4, "ngIf"], [1, "csv"], ["type", "file", "id", "csvSelect", "accept", ".xls, .xlsx", 2, "display", "none", 3, "change"], ["csvSelect", ""], [1, "directory"], [1, "oai"], ["type", "file", "id", "uploadOaiSelect", 2, "display", "none", 3, "change"], ["uploadOaiSelect", ""], ["matInput", "", "type", "text", 3, "ngModel", "ngModelChange"], ["class", "oaiForce", 4, "ngIf"], [1, "oaiSave"], [3, "ngModel", "ngModelChange"], [1, "actions"], [1, "oaiForce"], [1, "content", "jobs"], ["class", "heading", 4, "ngIf"], ["class", "group", 4, "ngIf"], ["class", "no-jobs", 4, "ngIf"], ["class", "job", 4, "ngFor", "ngForOf"], [1, "autocomplete"], [3, "suggestions", "allowAny", "inputMinLength", "maxSuggestions", "updateInput", "addItem", "addAny"], ["class", "job-title", 4, "ngIf"], ["class", "job-class", 4, "ngIf"], ["class", "inputGroupRow params", 4, "ngIf"], ["name", "jobParams", 1, "jobParams", "materialize-textarea", 3, "options", "ngModel", "ngModelOptions", "ngModelChange"], ["class", "inputGroupGrow", 4, "ngIf"], ["mat-raised-button", "", 3, "disabled", "click"], [1, "job-title"], [1, "job-class"], [1, "inputGroupRow", "params"], [1, "mat-heading-5"], [1, "param-table"], ["class", "param-row", 4, "ngFor", "ngForOf"], [1, "param-row"], [1, "param-name"], [1, "param-value"], ["type", "file", 2, "display", "none", 3, "change"], ["uploadJobSelect", ""], [1, "no-jobs"], [1, "job"], [1, "job-col"], [1, "job-row", "job-main"], [1, "job-col", "col-name"], [1, "name"], [1, "class"], [1, "job-col", "col-time"], ["mat-icon-button", "", "class", "close", 3, "click", 4, "ngIf"], [1, "job-col", "col-more", 3, "click"], ["class", "material-icons", 4, "ngIf"], ["class", "job-col row-detail", 4, "ngIf"], ["mat-icon-button", "", 1, "close", 3, "click"], ["esIcon", "close"], [1, "job-col", "row-detail"], ["class", "job-row log-filters", 4, "ngIf"], [1, "log"], [1, "log-data"], ["class", "job-row", 3, "status-error", "status-warning", 4, "ngFor", "ngForOf"], [1, "job-row", "log-filters"], [1, "job-row", "log-filter"], [1, "job-row", "log-level"], ["for", "logLevel"], ["id", "logLevel", 3, "ngModel", "ngModelChange"], ["value", ""], ["value", "4"], ["value", "3"], [1, "job-row"], [1, "log-level"], [1, "log-date"], [1, "log-class"], [1, "log-message"], [1, "content", "toolkit"], [3, "mode", "globalSearchAllowed", "label", "showRecent", "onChooseAuthority"], [3, "removed", 4, "ngIf"], ["matInput", "", "type", "text", "name", "cacheInfo", 1, "cacheInfo", 3, "ngModel", "placeholder", "ngModelChange"], ["mat-raised-button", ""], [1, "group", "caches"], [1, "propertyGroup"], ["matInput", "", "type", "text", 3, "ngModel", "placeholder", "ngModelChange"], ["uploadTempSelect", ""], ["mat-flat-button", "", "color", "primary", 3, "click"], [3, "removed"], ["matChipRemove", "", "esIcon", "cancel"], [1, "content", "browser"], ["value", "NODEREF"], ["value", "SOLR"], ["value", "ELASTIC"], ["class", "elastic-response", 4, "ngIf"], ["class", "search-list", 4, "ngIf"], [3, "query", "properties", "queryChange", "propertiesChange"], ["matInput", "", "type", "text", "name", "noderef", "placeholder", "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee\"", 3, "ngModel", "ngModelChange"], ["class", "dsl-query", 4, "ngIf"], ["class", "inputGroupGrow lucenePaging", 4, "ngIf"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "5", "name", "luceneQuery", "placeholder", "@cm\\:name:\"*\"", 3, "ngModel", "ngModelChange"], [1, "dsl-query"], ["for", "dslQuery"], ["id", "dslQuery", 3, "options", "ngModel", "ngModelOptions", "ngModelChange"], ["name", "solrStore", "value", "Workspace"], ["name", "solrStore", "value", "Archive"], ["name", "solrMode", "value", "view"], ["name", "solrMode", "value", "export"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "5", 1, "export-properties", 3, "ngModel", "ngModelChange"], ["name", "exportFormat", "value", "csv"], ["name", "exportFormat", "value", "json"], [3, "globalSearchAllowed", "placeholder", "allowAny", "onChooseAuthority"], ["class", "inputGroupGrow luceneAuthorities", 4, "ngIf"], [1, "inputGroupGrow", "luceneAuthorities"], [3, "removed", 4, "ngFor", "ngForOf"], [1, "inputGroupGrow", "lucenePaging"], ["matInput", "", "type", "number", "name", "luceneOffset", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "number", "name", "luceneCount", 3, "ngModel", "ngModelChange"], [1, "elastic-response"], ["for", "elasticResponseLabel"], ["id", "elasticResponseLabel", 3, "options", "ngModel", "ngModelOptions"], [1, "search-list"], ["actionbarComponent", ""], [3, "dataSource", "scope", "columns", "configureColumns", "displayType", "elementInteractionType", "clickItem"], ["searchResults", ""], ["empty", ""], [1, "no-results"], [1, "content", "foldertemplates"], [3, "inputMinLength", "placeholder", "suggestions", "addItem", "updateInput"], [1, "eduGroupsSelected"], ["class", "badge", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", 1, "btnXml", 3, "click"], ["mat-button", "", "color", "primary", 1, "goto-folder", 3, "click"], ["type", "file", "id", "templateSelect", "accept", "application/xml", 2, "display", "none", 3, "change"], ["templateSelect", ""], [1, "upload-hint"], [1, "badge"]],
    template: function AdminPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](0, AdminPageComponent_ng_template_0_Template, 6, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](2, AdminPageComponent_es_card_2_Template, 14, 16, "es-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "div", 2)(4, "div", 3)(5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](6, AdminPageComponent_div_6_Template, 5, 6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](7, "div", 5)(8, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](11, AdminPageComponent_11_Template, 2, 0, null, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](12, AdminPageComponent_div_12_Template, 25, 15, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](13, AdminPageComponent_div_13_Template, 40, 27, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](14, AdminPageComponent_div_14_Template, 2, 0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](15, AdminPageComponent_div_15_Template, 2, 0, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](16, AdminPageComponent_div_16_Template, 2, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](17, AdminPageComponent_div_17_Template, 2, 0, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](18, AdminPageComponent_div_18_Template, 2, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](19, AdminPageComponent_div_19_Template, 75, 56, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](20, AdminPageComponent_div_20_Template, 23, 20, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](21, AdminPageComponent_div_21_Template, 114, 82, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](22, AdminPageComponent_div_22_Template, 16, 8, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](23, AdminPageComponent_div_23_Template, 89, 66, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](24, AdminPageComponent_div_24_Template, 24, 13, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](25, AdminPageComponent_div_25_Template, 28, 18, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](26, AdminPageComponent_es_global_progress_26_Template, 1, 0, "es-global-progress", 7);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.cancelJobInfo);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngForOf", ctx.buttons);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵclassMapInterpolate1"]("main-content main-content-", ctx.mode ? ctx.mode.toLowerCase() : "default", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpipeBind1"](10, 22, "ADMIN.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.getModeButton() && ctx.getModeButton().factory);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("CONFIG"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("STATISTICS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("MEDIACENTER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("FRONTPAGE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("GLOBAL_CONFIG"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("PLUGINS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("APPLICATIONS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("UPDATE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("IMPORT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("JOBS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("TOOLKIT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.modeIsActive("BROWSER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.mode === "FOLDERTEMPLATES");
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.globalProgress);
      }
    },
    dependencies: [_shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_8__.AuthoritySearchInputComponent, _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_13__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_33__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_33__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_36__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_36__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_36__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_36__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_36__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_36__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_36__.NgForm, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_14__.GlobalProgressComponent, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_15__.InfoMessageComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_37__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_38__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_38__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_39__.MatCheckbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_40__.MatChipListbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_40__.MatChipOption, _angular_material_chips__WEBPACK_IMPORTED_MODULE_40__.MatChipRemove, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_41__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_41__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_41__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_41__.MatExpansionPanelTitle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_42__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_42__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_42__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_43__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_44__.CdkTextareaAutosize, _angular_material_radio__WEBPACK_IMPORTED_MODULE_45__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_45__.MatRadioButton, _angular_material_core__WEBPACK_IMPORTED_MODULE_37__.MatRipple, _angular_material_select__WEBPACK_IMPORTED_MODULE_46__.MatSelect, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_47__.MatRow, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_16__.MultiLineLabelComponent, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_17__.SkipTargetDirective, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_18__.SpinnerSmallComponent, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_19__.TitleDirective, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_48__.EditorComponent, _config_config_component__WEBPACK_IMPORTED_MODULE_20__.AdminConfigComponent, _frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_21__.AdminFrontpageComponent, _mediacenter_mediacenter_component__WEBPACK_IMPORTED_MODULE_22__.AdminMediacenterComponent, _plugins_plugins_component__WEBPACK_IMPORTED_MODULE_23__.AdminPluginsComponent, _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_24__.AdminStatisticsComponent, _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.AutocompleteComponent, _lti_admin_lti_admin_component__WEBPACK_IMPORTED_MODULE_25__.LtiAdminComponent, _ltitool_admin_ltitool_admin_component__WEBPACK_IMPORTED_MODULE_26__.LtitoolAdminComponent, _lucene_template_memory_lucene_template_memory_component__WEBPACK_IMPORTED_MODULE_27__.LuceneTemplateMemoryComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_28__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_35__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.FormatDatePipe],
    styles: ["\n\n.main[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 100%;\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%] {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  height: calc(100% - var(--mainnavHeight));\n  overflow-y: auto;\n  width: 250px;\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px 30px 20px 20px;\n  width: 100%;\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover {\n  background-color: var(--palette-primary-50);\n}\n.main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .button.active[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: bold;\n  background: linear-gradient(to right, var(--primary) 0, var(--primary) 5px, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 0) 5px) no-repeat;\n}\n.main[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n  padding: 20px;\n  width: 100%;\n  min-width: 0;\n  margin-left: 250px;\n  flex-grow: 1;\n}\n.main[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  min-height: 36px;\n  height: auto;\n}\n.main[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%]   .updates-loading[_ngcontent-%COMP%] {\n  display: flex;\n  margin: auto;\n}\n.main[_ngcontent-%COMP%]   .main-content-statistics[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  overflow-x: auto;\n}\n\n.inputGroupGrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.inputGroupGrow[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 0;\n  flex-grow: 1;\n  display: flex;\n  margin: 0 10px;\n}\n.inputGroupGrow[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.heading[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  text-transform: uppercase;\n  font-weight: bold;\n  font-size: 110%;\n  width: 100%;\n  border-bottom: 1px solid #ccc;\n  margin: 20px 0;\n  padding: 0 10px;\n}\n.heading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 13pt;\n}\n.heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  top: -3px;\n  margin-left: 10px;\n}\n\n.frontpage[_ngcontent-%COMP%], .global-config[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.frontpage[_ngcontent-%COMP%]   es-admin-frontpage[_ngcontent-%COMP%], .frontpage[_ngcontent-%COMP%]   es-admin-config[_ngcontent-%COMP%], .global-config[_ngcontent-%COMP%]   es-admin-frontpage[_ngcontent-%COMP%], .global-config[_ngcontent-%COMP%]   es-admin-config[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.info[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: auto;\n}\n.info[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%] {\n  font-family: monospace;\n  white-space: pre;\n  padding: 20px;\n  border: 1px solid #ccc;\n  background-color: #f9f9f9;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%] {\n  position: relative;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  padding: 5px 20px 25px 20px;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .tp-name[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .tp-name[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n  padding-bottom: 10px;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  background-color: #d9f2e8;\n  padding: 10px 10px;\n  margin: 2px 0;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child, .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child {\n  flex-grow: 1;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  margin-right: 5px;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .solution-link[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .solution-link[_ngcontent-%COMP%] {\n  color: var(--palette-primary-900);\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check.check-fail[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check.check-fail[_ngcontent-%COMP%] {\n  background-color: #f1b2c5;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check.check-info[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check.check-info[_ngcontent-%COMP%] {\n  background-color: #eaeaea;\n}\n.info[_ngcontent-%COMP%]   .checks[_ngcontent-%COMP%]   .check.check-warn[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]   .checks-toolpermissions[_ngcontent-%COMP%]   .check.check-warn[_ngcontent-%COMP%] {\n  background-color: white;\n}\n\n.config[_ngcontent-%COMP%]   .xml[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.config[_ngcontent-%COMP%]   .xml[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n}\n\n.applications[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: auto;\n}\n.applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid #ccc;\n}\n.applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  width: 0;\n  flex-grow: 2;\n  word-break: break-word;\n  padding: 5px;\n}\n.applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div.title[_ngcontent-%COMP%] {\n  flex-grow: 4;\n}\n.applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div.config[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div.edit[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div.download[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .app-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   div.delete[_ngcontent-%COMP%] {\n  max-width: 50px;\n}\n.applications[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.applications[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 30px 0;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 10px 0;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin-right: 20px;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  align-self: center;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  display: grid;\n  grid-gap: 10px;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n}\n.applications[_ngcontent-%COMP%]   .register-app[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.applications[_ngcontent-%COMP%]   .materialize-textarea[_ngcontent-%COMP%] {\n  height: 150px;\n}\n.applications[_ngcontent-%COMP%]   .useFile[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  float: left;\n}\n.applications[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  float: right;\n}\n.applications[_ngcontent-%COMP%]   .warning[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  font-style: italic;\n  padding-bottom: 20px;\n}\n.applications[_ngcontent-%COMP%]   .property[_ngcontent-%COMP%] {\n  width: 100%;\n  float: left;\n  font-weight: bold;\n}\n\n.toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%] {\n  padding: 20px 0;\n  display: flex;\n  align-items: center;\n}\n.toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%], .toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  display: flex;\n}\n.toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%], .toolkit[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .directory[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .directory[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .directory[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0 10px;\n  vertical-align: middle;\n}\n\n.import[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: auto;\n}\n.import[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n.import[_ngcontent-%COMP%]   .collections[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .csv[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .oai[_ngcontent-%COMP%] {\n  padding-bottom: 50px;\n}\n.import[_ngcontent-%COMP%]   .oai[_ngcontent-%COMP%] {\n  max-width: 500px;\n}\n.import[_ngcontent-%COMP%]   .oai[_ngcontent-%COMP%]   .oaiSave[_ngcontent-%COMP%], .import[_ngcontent-%COMP%]   .oai[_ngcontent-%COMP%]   .oaiForce[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.import[_ngcontent-%COMP%]   .oai[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 5px 0;\n}\n.import[_ngcontent-%COMP%]    > .btn[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.import[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  width: 100%;\n}\n.import[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 10px;\n}\n\n.table[_ngcontent-%COMP%] {\n  display: table;\n  width: 100%;\n}\n\n.tableRow[_ngcontent-%COMP%] {\n  display: table-row;\n  background-color: white;\n}\n.tableRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: table-cell;\n  padding: 5px 10px;\n  vertical-align: middle;\n  word-break: break-all;\n  border-bottom: 1px solid #ccc;\n}\n.tableRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.tableRow.table-not-executed[_ngcontent-%COMP%] {\n  background-color: white;\n}\n\n.header[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  background-color: transparent;\n}\n\n.update[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: auto;\n}\n.update[_ngcontent-%COMP%]   .tableRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  min-width: 160px;\n}\n.update[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-weight: bold;\n  text-align: center;\n  padding: 0 0 40px;\n}\n.update[_ngcontent-%COMP%]   .test[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n\n.toolkit[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.toolkit[_ngcontent-%COMP%]   a.btn[_ngcontent-%COMP%], .toolkit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  float: right;\n}\n.toolkit[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%] {\n  padding: 0;\n  gap: 20px;\n}\n.toolkit[_ngcontent-%COMP%]   .catalina[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.toolkit[_ngcontent-%COMP%]   .catalina[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.toolkit[_ngcontent-%COMP%]   .catalina[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.toolkit[_ngcontent-%COMP%]   .catalina[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 600px;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .cacheGroup[_ngcontent-%COMP%], .toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .propertyGroup[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  margin: 0 5px;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .propertyGroup[_ngcontent-%COMP%] {\n  padding-top: 30px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .propertyGroup[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.toolkit[_ngcontent-%COMP%]   .caches[_ngcontent-%COMP%]   .propertyGroup[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n.toolkit[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  padding: 20px 0;\n  float: left;\n  width: 100%;\n}\n.toolkit[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  float: left;\n  padding-top: 10px;\n  margin-bottom: 10px;\n}\n.toolkit[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  float: right;\n}\n.toolkit[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .cacheInfo[_ngcontent-%COMP%] {\n  max-width: 250px;\n  float: left;\n}\n\n.browser[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n.browser[_ngcontent-%COMP%]   .dsl-query[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.browser[_ngcontent-%COMP%]   .dsl-query[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  padding-bottom: 5px;\n}\n.browser[_ngcontent-%COMP%]   .dsl-query[_ngcontent-%COMP%]   ngx-monaco-editor[_ngcontent-%COMP%] {\n  resize: vertical;\n  overflow: auto;\n}\n.browser[_ngcontent-%COMP%]   .elastic-response[_ngcontent-%COMP%] {\n  padding-top: 20px;\n}\n.browser[_ngcontent-%COMP%]   .elastic-response[_ngcontent-%COMP%]   ngx-monaco-editor[_ngcontent-%COMP%] {\n  resize: vertical;\n  overflow: auto;\n}\n.browser[_ngcontent-%COMP%]   .lucenePaging[_ngcontent-%COMP%] {\n  max-width: 700px;\n  margin: auto;\n}\n.browser[_ngcontent-%COMP%]   .lucenePaging[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex-grow: initial;\n  width: auto;\n}\n.browser[_ngcontent-%COMP%]   .luceneAuthorities[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.browser[_ngcontent-%COMP%]   .search-list[_ngcontent-%COMP%] {\n  padding: 20px 0 40px 0;\n}\n.browser[_ngcontent-%COMP%]   .search-list[_ngcontent-%COMP%]   es-actionbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n  width: 100%;\n  height: 40px;\n}\n.browser[_ngcontent-%COMP%]   .search-list[_ngcontent-%COMP%]   .no-results[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n  color: var(--textLight);\n  font-size: 120%;\n}\n.browser[_ngcontent-%COMP%]   .export-properties[_ngcontent-%COMP%] {\n  min-height: 150px;\n}\n\n.foldertemplates[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: auto;\n}\n.foldertemplates[_ngcontent-%COMP%]   .eduGroupsSelected[_ngcontent-%COMP%] {\n  margin: 20px 10px;\n}\n.foldertemplates[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  float: left;\n  margin-top: 20px;\n}\n.foldertemplates[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .upload-hint[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 10px;\n}\n.foldertemplates[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n\n.statistics[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.statistics[_ngcontent-%COMP%]   es-admin-statistics[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.jobs[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n.jobs[_ngcontent-%COMP%]   .jobParams[_ngcontent-%COMP%] {\n  min-height: 250px;\n}\n.jobs[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  position: relative;\n  float: left;\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.jobs[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]    > es-autocomplete[_ngcontent-%COMP%] {\n  width: calc(100% - 18px);\n}\n.jobs[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .autocomplete[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin: 0 20px;\n}\n.jobs[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 20px;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%] {\n  display: table;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%] {\n  display: table-row;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%]   .param-name[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%]   .param-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 90%;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%]   .param-value[_ngcontent-%COMP%] {\n  min-width: 30%;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%]   .param-value[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%] {\n  margin: 5px;\n  padding: 5px;\n  border: 1px solid #9e9e9e;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   .param-table[_ngcontent-%COMP%]   .param-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: table-cell;\n  padding: 2px 5px;\n  vertical-align: middle;\n}\n.jobs[_ngcontent-%COMP%]   .params[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.jobs[_ngcontent-%COMP%]   .job-class[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n}\n.jobs[_ngcontent-%COMP%]   .no-jobs[_ngcontent-%COMP%] {\n  font-size: 120%;\n  color: #aaa;\n  text-align: center;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]:not(:last-child) {\n  border-bottom: 1px solid #ccc;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .job-main[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .row-detail[_ngcontent-%COMP%] {\n  background-color: #fff;\n  padding-bottom: 10px;\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .row-detail[_ngcontent-%COMP%]   .log[_ngcontent-%COMP%] {\n  font-weight: bold;\n  padding: 10px 10px;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .row-detail[_ngcontent-%COMP%]   .job-col[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .row-detail[_ngcontent-%COMP%]   .job-row[_ngcontent-%COMP%] {\n  padding: 2px 20px;\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%] {\n  padding: 10px 0 !important;\n  justify-content: space-between;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-filter[_ngcontent-%COMP%] {\n  min-width: 70px;\n  color: var(--textLight);\n  font-weight: bold;\n  text-transform: uppercase;\n  max-width: 500px;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-date[_ngcontent-%COMP%] {\n  min-width: 100px;\n  color: var(--textLight);\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-class[_ngcontent-%COMP%] {\n  min-width: 170px;\n  max-width: 170px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--textLight);\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .log-message[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .class[_ngcontent-%COMP%] {\n  color: #aaa;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .job-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .job-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .col-name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .col-time[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .job-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .job-status[_ngcontent-%COMP%]   es-spinner-small[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .col-more[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding-left: 20px;\n  width: 40px;\n  color: var(--textLight);\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .status-fine[_ngcontent-%COMP%] {\n  background-color: #dcffd8;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .status-aborted[_ngcontent-%COMP%] {\n  background-color: #eee;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .status-warning[_ngcontent-%COMP%] {\n  background-color: #ffffd8;\n}\n.jobs[_ngcontent-%COMP%]   .job[_ngcontent-%COMP%]   .status-error[_ngcontent-%COMP%] {\n  background-color: #ffdcd8;\n}\n\n[_nghost-%COMP%]     .preloader-wrapper.small {\n  width: 16px;\n  height: 16px;\n}\n[_nghost-%COMP%]     .inputGroupGrow .mat-form-field-wrapper {\n  width: 100%;\n  margin-bottom: 0;\n}\n[_nghost-%COMP%]     .jobs .log-filters .mat-form-field-wrapper {\n  width: 100%;\n}\n\n.reload[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n  color: var(--textLight);\n  padding-bottom: 10px;\n  position: absolute;\n  top: -47px;\n}\n\n.row[_ngcontent-%COMP%] {\n  position: fixed;\n  top: var(--mainnavHeight);\n  width: 100%;\n  height: 48px;\n  z-index: 50;\n}\n\n.s12[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 10;\n}\n\n.cancel-job-message[_ngcontent-%COMP%] {\n  white-space: pre-line;\n  padding-bottom: 20px;\n}\n\n@media all and (max-width: 800px) {\n  .main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%] {\n    width: 66px;\n  }\n  .main[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n    margin-left: 66px;\n  }\n}\n@media all and (max-width: 1000px) {\n  .applications[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .applications[_ngcontent-%COMP%]   .tableRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    padding: 5px 2px;\n  }\n  .update[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .update[_ngcontent-%COMP%]   .tableRow[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    min-width: initial;\n  }\n  .update[_ngcontent-%COMP%]   .run[_ngcontent-%COMP%] {\n    min-width: 160px !important;\n  }\n}\n@media all and (max-width: 1200px) {\n  .applications[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .repoType[_ngcontent-%COMP%], .applications[_ngcontent-%COMP%]   .subtype[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .jobs[_ngcontent-%COMP%]   .log-class[_ngcontent-%COMP%], .jobs[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL2FkbWluLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL3BhZ2VzL2FkbWluLXBhZ2UvYWRtaW4udmFyaWFibGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFESjtBQUVJO0VBQ0ksZUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUNBQUE7RUFDQSxnQkFBQTtFQUNBLFlDZE87QURjZjtBQUNRO0VBQ0ksWUFBQTtBQUNaO0FBQVk7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7QUFFaEI7QUFEZ0I7RUFDSSxrQkFBQTtBQUdwQjtBQURnQjtFQUNJLDJDRHBCRDtBQ3VCbkI7QUFEZ0I7RUFDSSxxQkU3QlY7RUY4QlUsaUJBQUE7RUFDQSxpSURNZ0I7QUNIcEM7QUFFSTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQ3hDTztFRHlDUCxZQUFBO0FBQVI7QUFDUTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtBQUNaO0FBQ1E7RUFDSSxhQUFBO0VBQ0EsWUFBQTtBQUNaO0FBR0k7RUFDSSxVQUFBO0FBRFI7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7QUFESjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBQUo7QUFDSTtFQUNJLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QUFDUjtBQUNJO0VBQ0ksZ0JBQUE7QUFDUjs7QUFFQTtFQUNJLHVCRDNEUTtFQzREUix5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSw2QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBQ0o7QUFBSTtFQUNJLGVBQUE7QUFFUjtBQUFJO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7QUFFUjs7QUFDQTs7RUFFSSxhQUFBO0VBQ0EsdUJBQUE7QUFFSjtBQURJOzs7O0VBRUksV0FBQTtBQUtSOztBQUZBO0VBQ0ksZ0JBQUE7RUFDQSxZQUFBO0FBS0o7QUFKSTtFQUNJLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkQ5Q2M7QUNvRHRCO0FBSkk7O0VBRUksa0JBQUE7QUFNUjtBQUxROztFQUNJLDJCQUFBO0FBUVo7QUFOUTs7RUFDSSxjRDlGSTtFQytGSix1QkR2R0E7RUN3R0Esb0JBQUE7QUFTWjtBQVBROztFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBVVo7QUFUWTs7RUFDSSxZQUFBO0FBWWhCO0FBVlk7O0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBYWhCO0FBWmdCOztFQUNJLFlBQUE7QUFlcEI7QUFiZ0I7O0VBQ0kscUJBQUE7QUFnQnBCO0FBZGdCOztFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBaUJwQjtBQWhCb0I7O0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBbUJ4QjtBQWpCb0I7O0VBQ0ksaUJBQUE7QUFvQnhCO0FBbEJvQjs7RUFDSSxpQ0VwSlY7RUZxSlUseUJBQUE7RUFDQSxpQkFBQTtBQXFCeEI7QUFqQlk7O0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQW9CaEI7QUFsQlk7O0VBQ0kseUJBQUE7QUFxQmhCO0FBbkJZOztFQUNJLHlCQUFBO0FBc0JoQjtBQXBCWTs7RUFDSSx1QkFBQTtBQXVCaEI7O0FBakJJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQW9CUjtBQW5CUTtFQUNJLGtCQUFBO0FBcUJaOztBQWpCQTtFQWlGSSxpQkFBQTtFQUNBLFlBQUE7QUE1REo7QUFyQkk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUF1QlI7QUF0QlE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtBQXdCWjtBQXZCWTtFQUNJLFFBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FBeUJoQjtBQXhCZ0I7RUFDSSxZQUFBO0FBMEJwQjtBQXhCZ0I7RUFJSSxlQUFBO0FBdUJwQjtBQWxCSTtFQUNJLG1CQUFBO0FBb0JSO0FBbEJJO0VBQ0ksb0JBQUE7QUFvQlI7QUFsQkk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBb0JSO0FBbkJRO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUFxQlo7QUFwQlk7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7QUFzQmhCO0FBcEJZO0VBQ0ksa0JBQUE7QUFzQmhCO0FBbkJRO0VBQ0ksY0FBQTtBQXFCWjtBQW5CUTtFQUNJLGNBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLDREQUFBO0FBcUJaO0FBcEJZO0VBQ0ksY0FBQTtBQXNCaEI7QUFsQkk7RUFDSSxhQUFBO0FBb0JSO0FBbEJJO0VBQ0ksdUJEeE9JO0VDeU9KLFdBQUE7QUFvQlI7QUFsQkk7O0VBRUksWUFBQTtBQW9CUjtBQWxCSTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUFvQlI7QUFsQkk7RUFDSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBb0JSOztBQWZBOzs7RUFHSSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBa0JKO0FBakJJOzs7Ozs7Ozs7RUFHSSxhQUFBO0FBeUJSO0FBdkJJOzs7Ozs7RUFFSSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtBQTZCUjs7QUExQkE7RUFDSSxnQkFBQTtFQUNBLFlBQUE7QUE2Qko7QUE1Qkk7RUFDSSxrQkFBQTtBQThCUjtBQTVCSTs7O0VBR0ksb0JBQUE7QUE4QlI7QUE1Qkk7RUFDSSxnQkFBQTtBQThCUjtBQTdCUTs7RUFFSSxXQUFBO0FBK0JaO0FBN0JRO0VBQ0ksV0FBQTtFQUNBLGFBQUE7QUErQlo7QUE1Qkk7RUFDSSxnQkFBQTtBQThCUjtBQTVCSTtFQUNJLGFBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7QUE4QlI7QUE3QlE7RUFDSSxZQUFBO0FBK0JaOztBQTNCQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0FBOEJKOztBQTVCQTtFQUNJLGtCQUFBO0VBQ0EsdUJBQUE7QUErQko7QUE5Qkk7RUFDSSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLDZCQUFBO0FBZ0NSO0FBL0JRO0VBQ0ksdUJEL1RBO0FDZ1daO0FBOUJJO0VBQ0ksdUJBQUE7QUFnQ1I7O0FBN0JBO0VBQ0ksdUJEdlVRO0VDd1VSLDZCQUFBO0FBZ0NKOztBQTlCQTtFQUlJLGlCQUFBO0VBQ0EsWUFBQTtBQThCSjtBQWxDSTtFQUNJLGdCQUFBO0FBb0NSO0FBaENJO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBa0NSO0FBaENJO0VBQ0kseUJBQUE7QUFrQ1I7O0FBL0JBO0VBQ0ksaUJBQUE7QUFrQ0o7QUFqQ0k7O0VBRUksWUFBQTtBQW1DUjtBQWpDSTtFQUNJLFVBQUE7RUFDQSxTQUFBO0FBbUNSO0FBakNJO0VBQ0ksbUJBQUE7QUFtQ1I7QUFsQ1E7RUFDSSxtQkFBQTtBQW9DWjtBQWxDUTtFQUNJLFdBQUE7QUFvQ1o7QUFuQ1k7RUFDSSxpQkFBQTtBQXFDaEI7QUFoQ1E7RUFDSSxZQUFBO0FBa0NaO0FBaENROztFQUVJLFdBQUE7QUFrQ1o7QUFoQ1E7RUFDSSxhQUFBO0FBa0NaO0FBaENRO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBa0NaO0FBakNZO0VBQ0ksZ0JBQUE7QUFtQ2hCO0FBakNZO0VBQ0ksaUJBQUE7QUFtQ2hCO0FBL0JJO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FBaUNSO0FBaENRO0VBQ0ksV0FBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFrQ1o7QUFoQ1E7RUFDSSxZQUFBO0FBa0NaO0FBaENRO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0FBa0NaOztBQTVCUTtFQUNJLGVBQUE7QUErQlo7QUE1Qkk7RUFDSSxzQkFBQTtBQThCUjtBQTdCUTtFQUNJLG1CQUFBO0FBK0JaO0FBN0JRO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0FBK0JaO0FBNUJJO0VBQ0ksaUJBQUE7QUE4QlI7QUE3QlE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUErQlo7QUE1Qkk7RUFDSSxnQkFBQTtFQUNBLFlBQUE7QUE4QlI7QUE3QlE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7QUErQlo7QUE1Qkk7RUFDSSxtQkFBQTtBQThCUjtBQTVCSTtFQUNJLHNCQUFBO0FBOEJSO0FBN0JRO0VBQ0ksYUFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQStCWjtBQTdCUTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkR4Y0E7RUN5Y0EsZUFBQTtBQStCWjtBQTVCSTtFQUNJLGlCQUFBO0FBOEJSOztBQTFCQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtBQTZCSjtBQTVCSTtFQUNJLGlCQUFBO0FBOEJSO0FBNUJJO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0FBOEJSO0FBN0JRO0VBQ0kscUJBQUE7RUFDQSxnQkFBQTtBQStCWjtBQTdCUTtFQUNJLGtCQUFBO0FBK0JaOztBQTNCQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtBQThCSjtBQTdCSTtFQUNJLFdBQUE7QUErQlI7O0FBNUJBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQStCSjtBQTlCSTtFQUNJLGlCQUFBO0FBZ0NSO0FBOUJJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtBQWdDUjtBQS9CUTtFQUNJLHNCQUFBO0FBaUNaO0FBaENZO0VBQ0ksd0JBQUE7QUFrQ2hCO0FBaENZO0VBQ0ksY0FBQTtBQWtDaEI7QUEvQlE7RUFDSSxXQUFBO0FBaUNaO0FBOUJJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFnQ1I7QUEvQlE7RUFDSSxjQUFBO0FBaUNaO0FBL0JZO0VBQ0ksa0JBQUE7QUFpQ2hCO0FBL0JnQjtFQUNJLGlCQUFBO0FBaUNwQjtBQWhDb0I7RUFDSSx1QkRoaEJaO0VDaWhCWSxjRHpnQlI7QUMyaUJoQjtBQS9CZ0I7RUFDSSxjQUFBO0FBaUNwQjtBQWhDb0I7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FBa0N4QjtBQTlCZ0I7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUFnQ3BCO0FBNUJRO0VBQ0ksZ0JBQUE7QUE4Qlo7QUEzQkk7RUFDSSxjQUFBO0VBQ0EsdUJEMWlCSTtBQ3VrQlo7QUEzQkk7RUFDSSxlQUFBO0VBQ0EsV0Q1aUJRO0VDNmlCUixrQkFBQTtBQTZCUjtBQTNCSTtFQUlJLGFBQUE7RUFDQSxXQUFBO0FBMEJSO0FBOUJRO0VBQ0ksNkJBQUE7QUFnQ1o7QUE1QlE7RUFDSSxXQUFBO0FBOEJaO0FBM0JRO0VBQ0ksa0JBQUE7QUE2Qlo7QUEzQlE7RUFDSSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsV0FBQTtBQTZCWjtBQTVCWTtFQUNJLGlCQUFBO0VBQ0Esa0JBQUE7QUE4QmhCO0FBNUJZO0VBQ0ksV0FBQTtBQThCaEI7QUE1Qlk7RUFDSSxpQkFBQTtFQUNBLFdBQUE7QUE4QmhCO0FBM0JRO0VBQ0ksMEJBQUE7RUFDQSw4QkFBQTtBQTZCWjtBQTVCWTtFQUNJLFdBQUE7QUE4QmhCO0FBN0JnQjtFQUNJLFdBQUE7QUErQnBCO0FBM0JROztFQUVJLGVBQUE7RUFDQSx1QkQzbEJBO0VDNGxCQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUE2Qlo7QUE1Qlk7O0VBQ0ksZ0JBQUE7QUErQmhCO0FBNUJRO0VBQ0ksZ0JBQUE7RUFDQSx1QkRybUJBO0FDbW9CWjtBQTVCUTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUdwbkJSLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFSG9uQlEsdUJEM21CQTtBQzJvQlo7QUE5QlE7RUFDSSxxQkFBQTtFQUNBLHFCQUFBO0FBZ0NaO0FBOUJRO0VBQ0ksaUJBQUE7QUFnQ1o7QUE5QlE7RUFDSSxXRG5uQkk7QUNtcEJoQjtBQTlCUTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBZ0NaO0FBOUJRO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBZ0NaO0FBOUJRO0VBQ0ksWUFBQTtBQWdDWjtBQTlCUTtFQUNJLGlCQUFBO0FBZ0NaO0FBOUJRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBZ0NaO0FBL0JZO0VBQ0ksY0FBQTtBQWlDaEI7QUE5QlE7RUFDSSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLHVCRGpwQkE7QUNpckJaO0FBOUJRO0VBQ0kseUJBQUE7QUFnQ1o7QUE5QlE7RUFDSSxzQkFBQTtBQWdDWjtBQTlCUTtFQUNJLHlCQUFBO0FBZ0NaO0FBOUJRO0VBQ0kseUJBQUE7QUFnQ1o7O0FBM0JJO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUE4QlI7QUEzQlE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUE2Qlo7QUExQkk7RUFDSSxXQUFBO0FBNEJSOztBQXpCQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkRwckJRO0VDcXJCUixvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQTRCSjs7QUExQkE7RUFDSSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUE2Qko7O0FBM0JBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7QUE4Qko7O0FBNUJBO0VBQ0kscUJBQUE7RUFDQSxvQkFBQTtBQStCSjs7QUE3QkE7RUFFUTtJQUlJLFdDN3RCUztFRHl2Qm5CO0VBL0JVO0lBQ0ksYUFBQTtFQWlDZDtFQTdCTTtJQUNJLGlCQ2h1QlM7RUQrdkJuQjtBQUNGO0FBM0JBO0VBRVE7SUFDSSxhQUFBO0VBNEJWO0VBMUJNO0lBQ0ksZ0JBQUE7RUE0QlY7RUF4Qk07SUFDSSxhQUFBO0VBMEJWO0VBeEJNO0lBQ0ksa0JBQUE7RUEwQlY7RUF4Qk07SUFDSSwyQkFBQTtFQTBCVjtBQUNGO0FBdkJBO0VBRVE7OztJQUdJLGFBQUE7RUF3QlY7RUFwQk07O0lBRUksYUFBQTtFQXNCVjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5AaW1wb3J0ICdhZG1pbi52YXJpYWJsZXMnO1xuXG4ubWFpbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIC5tYWluLW5hdiB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSB2YXIoLS1tYWlubmF2SGVpZ2h0KSk7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgIHdpZHRoOiAkc2lkZW5hdldpZHRoO1xuICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAuYnV0dG9uIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMjBweCAzMHB4IDIwcHggMjBweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLm1haW4tY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAkc2lkZW5hdldpZHRoO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIC5idG4tZmxhdCB7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAzNnB4O1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIC51cGRhdGVzLWxvYWRpbmcge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBoYXMgb3duIHBhZGRpbmcgY2F1c2Ugb2YgdGFic1xuICAgIC5tYWluLWNvbnRlbnQtc3RhdGlzdGljcyB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxufVxuLnRhYnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbn1cbi5pbnB1dEdyb3VwR3JvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgPiAqIHtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgfVxuICAgID4gaW5wdXQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbn1cbi5oZWFkaW5nIHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMTEwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gICAgcGFkZGluZzogMCAxMHB4O1xuICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDEzcHQ7XG4gICAgfVxuICAgIHNwYW4ge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogLTNweDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgfVxufVxuLmZyb250cGFnZSxcbi5nbG9iYWwtY29uZmlnIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGVzLWFkbWluLWZyb250cGFnZSxcbiAgICBlcy1hZG1pbi1jb25maWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG4uaW5mbyB7XG4gICAgbWF4LXdpZHRoOiA4MDBweDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgLnZlcnNpb24ge1xuICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogcHJlO1xuICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkY2FyZFNlcGFyYXRvckxpbmVDb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNhcmRMaWdodEJhY2tncm91bmQ7XG4gICAgfVxuICAgIC5jaGVja3MsXG4gICAgLmNoZWNrcy10b29scGVybWlzc2lvbnMge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC5pbmZvIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCAyMHB4IDI1cHggMjBweDtcbiAgICAgICAgfVxuICAgICAgICAudHAtbmFtZSB7XG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVNtYWxsO1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICAgICAgfVxuICAgICAgICAuY2hlY2sge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGVuKCRjb2xvclN0YXR1c1Bvc2l0aXZlLCA0MCUpO1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiAycHggMDtcbiAgICAgICAgICAgIC5kYXRhIHtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgIGRpdjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC5tYXRlcmlhbC1pY29ucyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAuc29sdXRpb24tbGluayB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHByaW1hcnlEYXJrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLmNoZWNrLWZhaWwge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0ZW4oJHdhcm5pbmcsIDM1JSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLmNoZWNrLWluZm8ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0ZW4oJGNvbG9yU3RhdHVzTmV1dHJhbCwgNDUlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYuY2hlY2std2FybiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRlbigkd2FybmluZ01lZGl1bSwgNTAlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi5jb25maWcge1xuICAgIC54bWwge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgcGFkZGluZzogMzBweCAyMHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuLmFwcGxpY2F0aW9ucyB7XG4gICAgLmFwcC1saXN0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I7XG4gICAgICAgICAgICBkaXYge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAwO1xuICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMjtcbiAgICAgICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgICAgICAgICAmLnRpdGxlIHtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiA0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAmLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAmLmVkaXQsXG4gICAgICAgICAgICAgICAgJi5kb3dubG9hZCxcbiAgICAgICAgICAgICAgICAmLmRlbGV0ZSB7XG4gICAgICAgICAgICAgICAgICAgIG1heC13aWR0aDogNTBweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmJ0biB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gICAgfVxuICAgIC50YWJsZSB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgIH1cbiAgICAucmVnaXN0ZXItYXBwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWFyZ2luOiAzMHB4IDA7XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgICAgICAgICA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXQtbGFiZWwge1xuICAgICAgICAgICAgbWFyZ2luOiAxMHB4IDA7XG4gICAgICAgIH1cbiAgICAgICAgbWF0LXJhZGlvLWdyb3VwIHtcbiAgICAgICAgICAgIG1hcmdpbjogMTBweCAwO1xuICAgICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICAgIGdyaWQtZ2FwOiAxMHB4O1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICAgICAgICAgICAgbWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLm1hdGVyaWFsaXplLXRleHRhcmVhIHtcbiAgICAgICAgaGVpZ2h0OiAxNTBweDtcbiAgICB9XG4gICAgLnVzZUZpbGUge1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgfVxuICAgIC5idG4sXG4gICAgLmJ0bi1mbGF0IHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgIH1cbiAgICAud2FybmluZyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5wcm9wZXJ0eSB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIG1heC13aWR0aDogMTAwMHB4O1xuICAgIG1hcmdpbjogYXV0bztcbn1cbi50b29sa2l0IC5pbnB1dEdyb3VwLFxuLmpvYnMgLmlucHV0R3JvdXAsXG4uaW1wb3J0IC5pbnB1dEdyb3VwIHtcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgID4gYSxcbiAgICA+IGRpdixcbiAgICA+IGJ1dHRvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIC5maWxlLFxuICAgIC5kaXJlY3Rvcnkge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB9XG59XG4uaW1wb3J0IHtcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBtYXQtcmFkaW8tYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgIH1cbiAgICAuY29sbGVjdGlvbnMsXG4gICAgLmNzdixcbiAgICAub2FpIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDUwcHg7XG4gICAgfVxuICAgIC5vYWkge1xuICAgICAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgICAgICAub2FpU2F2ZSxcbiAgICAgICAgLm9haUZvcmNlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgbWFyZ2luOiA1cHggMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICA+IC5idG4ge1xuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgIH1cbiAgICAuYWN0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICBtYXJnaW46IDEwcHg7XG4gICAgICAgIH1cbiAgICB9XG59XG4udGFibGUge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlUm93IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1yb3c7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRlbigkY29sb3JTdGF0dXNQb3NpdGl2ZSwgNTAlKTtcbiAgICBkaXYge1xuICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I7XG4gICAgICAgIC5tYXRlcmlhbC1pY29ucyB7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmLnRhYmxlLW5vdC1leGVjdXRlZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0ZW4oJHdhcm5pbmdNZWRpdW0sIDUwJSk7XG4gICAgfVxufVxuLmhlYWRlciB7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4udXBkYXRlIHtcbiAgICAudGFibGVSb3cgZGl2IHtcbiAgICAgICAgbWluLXdpZHRoOiAxNjBweDtcbiAgICB9XG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIC5oaW50IHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMCAwIDQwcHg7XG4gICAgfVxuICAgIC50ZXN0IGEge1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cbn1cbi50b29sa2l0IHtcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICBhLmJ0bixcbiAgICBidXR0b24ge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuICAgIC5ncm91cCAuaW5wdXRHcm91cCB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGdhcDogMjBweDtcbiAgICB9XG4gICAgLmNhdGFsaW5hIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICAgICAgYnV0dG9uIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB0ZXh0YXJlYSB7XG4gICAgICAgICAgICAgICAgbWluLWhlaWdodDogNjAwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmNhY2hlcyB7XG4gICAgICAgIGlucHV0IHtcbiAgICAgICAgICAgIHdpZHRoOiAyMDBweDtcbiAgICAgICAgfVxuICAgICAgICAuY2FjaGVHcm91cCxcbiAgICAgICAgLnByb3BlcnR5R3JvdXAge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmlucHV0R3JvdXAgLmJ0bi1mbGF0IHtcbiAgICAgICAgICAgIG1hcmdpbjogMCA1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnByb3BlcnR5R3JvdXAge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDMwcHg7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGdhcDogMjBweDtcbiAgICAgICAgICAgID4gaW5wdXQge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA+IGEge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5ncm91cCB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggMDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAuaW5mbyB7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgfVxuICAgICAgICAuYnRuLWZsYXQge1xuICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIC5jYWNoZUluZm8ge1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAyNTBweDtcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICB9XG4gICAgfVxufVxuLmJyb3dzZXIge1xuICAgIG1hdC1yYWRpby1ncm91cCB7XG4gICAgICAgIG1hdC1yYWRpby1idXR0b24ge1xuICAgICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5kc2wtcXVlcnkge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICA+IGxhYmVsIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XG4gICAgICAgIH1cbiAgICAgICAgbmd4LW1vbmFjby1lZGl0b3Ige1xuICAgICAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5lbGFzdGljLXJlc3BvbnNlIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDIwcHg7XG4gICAgICAgIG5neC1tb25hY28tZWRpdG9yIHtcbiAgICAgICAgICAgIHJlc2l6ZTogdmVydGljYWw7XG4gICAgICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgfVxuICAgIH1cbiAgICAubHVjZW5lUGFnaW5nIHtcbiAgICAgICAgbWF4LXdpZHRoOiA3MDBweDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICBhIHtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogaW5pdGlhbDtcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5sdWNlbmVBdXRob3JpdGllcyB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5zZWFyY2gtbGlzdCB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggMCA0MHB4IDA7XG4gICAgICAgIGVzLWFjdGlvbmJhciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICB9XG4gICAgICAgIC5uby1yZXN1bHRzIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDQwcHg7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTIwJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuZXhwb3J0LXByb3BlcnRpZXMge1xuICAgICAgICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgICB9XG59XG5cbi5mb2xkZXJ0ZW1wbGF0ZXMge1xuICAgIG1heC13aWR0aDogOTAwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIC5lZHVHcm91cHNTZWxlY3RlZCB7XG4gICAgICAgIG1hcmdpbjogMjBweCAxMHB4O1xuICAgIH1cbiAgICAuZ3JvdXAge1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgICAgLnVwbG9hZC1oaW50IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bi1mbGF0IHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5zdGF0aXN0aWNzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGVzLWFkbWluLXN0YXRpc3RpY3Mge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG4uam9icyB7XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLmpvYlBhcmFtcyB7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDI1MHB4O1xuICAgIH1cbiAgICAuZ3JvdXAge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgLmF1dG9jb21wbGV0ZSB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgPiBlcy1hdXRvY29tcGxldGUge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgMjBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAucGFyYW1zIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgLnBhcmFtLXRhYmxlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRhYmxlO1xuXG4gICAgICAgICAgICAucGFyYW0tcm93IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1yb3c7XG5cbiAgICAgICAgICAgICAgICAucGFyYW0tbmFtZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVTbWFsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAucGFyYW0tdmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDMwJTtcbiAgICAgICAgICAgICAgICAgICAgLnBhcmFtLXRhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgJGlucHV0Qm9yZGVyQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJweCA1cHg7XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5qb2ItY2xhc3Mge1xuICAgICAgICBmb250LXNpemU6IDkwJTtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgfVxuICAgIC5uby1qb2JzIHtcbiAgICAgICAgZm9udC1zaXplOiAxMjAlO1xuICAgICAgICBjb2xvcjogJHRleHRWZXJ5TGlnaHQ7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLmpvYiB7XG4gICAgICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmpvYi1tYWluIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgfVxuICAgICAgICAucm93LWRldGFpbCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIC5sb2cge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMTBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5qb2ItY29sIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5qb2Itcm93IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHggMjBweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAubG9nLWZpbHRlcnMge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmxvZy1sZXZlbCxcbiAgICAgICAgLmxvZy1maWx0ZXIge1xuICAgICAgICAgICAgbWluLXdpZHRoOiA3MHB4O1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgICAgICAgICAgaW5wdXQge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmxvZy1kYXRlIHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgfVxuICAgICAgICAubG9nLWNsYXNzIHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogMTcwcHg7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDE3MHB4O1xuICAgICAgICAgICAgQGluY2x1ZGUgc2hvcnRlblRleHQoKTtcbiAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIC5sb2ctbWVzc2FnZSB7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gICAgICAgIH1cbiAgICAgICAgLm5hbWUge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgLmNsYXNzIHtcbiAgICAgICAgICAgIGNvbG9yOiAkdGV4dFZlcnlMaWdodDtcbiAgICAgICAgfVxuICAgICAgICAuam9iLXJvdyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLmpvYi1jb2wge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgLmNvbC1uYW1lIHtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgfVxuICAgICAgICAuY29sLXRpbWUge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgLmpvYi1zdGF0dXMge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBlcy1zcGlubmVyLXNtYWxsIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuY29sLW1vcmUge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIC5zdGF0dXMtZmluZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNmZmQ4O1xuICAgICAgICB9XG4gICAgICAgIC5zdGF0dXMtYWJvcnRlZCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICAgICAgICB9XG4gICAgICAgIC5zdGF0dXMtd2FybmluZyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmQ4O1xuICAgICAgICB9XG4gICAgICAgIC5zdGF0dXMtZXJyb3Ige1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZGNkODtcbiAgICAgICAgfVxuICAgIH1cbn1cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLnByZWxvYWRlci13cmFwcGVyLnNtYWxsIHtcbiAgICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICAgIGhlaWdodDogMTZweDtcbiAgICB9XG4gICAgLmlucHV0R3JvdXBHcm93IHtcbiAgICAgICAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5qb2JzIC5sb2ctZmlsdGVycyAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbi5yZWxvYWQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAtNDdweDtcbn1cbi5yb3cge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IHZhcigtLW1haW5uYXZIZWlnaHQpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDhweDtcbiAgICB6LWluZGV4OiA1MDtcbn1cbi5zMTIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDtcbn1cbi5jYW5jZWwtam9iLW1lc3NhZ2Uge1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbn1cbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMSkge1xuICAgIC5tYWluIHtcbiAgICAgICAgLm1haW4tbmF2IHtcbiAgICAgICAgICAgIC5idXR0b24gPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg6ICRzaWRlbmF2V2lkdGhNb2JpbGU7XG4gICAgICAgIH1cbiAgICAgICAgLm1haW4tY29udGVudCB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogJHNpZGVuYXZXaWR0aE1vYmlsZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSozKSB7XG4gICAgLmFwcGxpY2F0aW9ucyB7XG4gICAgICAgIC5maWxlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLnRhYmxlUm93IGRpdiB7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMnB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC51cGRhdGUge1xuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAudGFibGVSb3cgZGl2IHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogaW5pdGlhbDtcbiAgICAgICAgfVxuICAgICAgICAucnVuIHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogMTYwcHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqNSkge1xuICAgIC5hcHBsaWNhdGlvbnMge1xuICAgICAgICAudHlwZSxcbiAgICAgICAgLnJlcG9UeXBlLFxuICAgICAgICAuc3VidHlwZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5qb2JzIHtcbiAgICAgICAgLmxvZy1jbGFzcyxcbiAgICAgICAgLmxvZy1sZXZlbCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiJHNpZGVuYXZXaWR0aDogMjUwcHg7XG4kc2lkZW5hdldpZHRoTW9iaWxlOiA2NnB4O1xuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBpbWFnZURpc2FibGVkQmx1cigpIHtcbiAgICAtd2Via2l0LWZpbHRlcjogYmx1cigzcHgpO1xuICAgIGZpbHRlcjogYmx1cigzcHgpO1xufVxuQG1peGluIHNob3J0ZW5UZXh0KCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0xhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAxMHB4IDcwcHggcmdiYSgwLCAwLCAwLCAwLjE1KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBsaW1pdExpbmVMZW5ndGgoJHdpZHRoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1heC13aWR0aDogJHdpZHRoO1xufVxuQG1peGluIHVuc2VsZWN0YWJsZVRleHQoKSB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xufVxuQG1peGluIGlvc1Njcm9sbGluZygpIHtcbiAgICAvKiBpb3Mgc2Nyb2xsaW5nIGZpeCAqL1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cbkBtaXhpbiBwbGFjZWhvbGRlciB7XG4gICAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEluc2V0Rm9jdXMoKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICRmb2N1c1dpZHRoICRmb2N1c0NvbG9yICFpbXBvcnRhbnQ7XG4gICAgQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScsICRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxEYXNoZWRGb2N1cygpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBkYXNoZWQgJGZvY3VzQ29sb3I7XG59XG5cbkBtaXhpbiBmb2N1c1NoYWRvdygkZGFyazogdHJ1ZSwgJHN0cmVuZ3RoOiAwLjEpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIEBpZiAkZGFyaz09dHJ1ZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgfVxufVxuQG1peGluIGRhcmtlbigpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuQ29sb3I7XG59XG5AbWl4aW4gZGFya2VuTGlnaHQoKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkxpZ2h0Q29sb3I7XG59XG5AbWl4aW4gYmx1ckJhY2tncm91bmQoJHJhZGl1czogNXB4KSB7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKCRyYWRpdXMpO1xufVxuQG1peGluIHNldEdsb2JhbEZvY3VzKCRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgJGZvY3VzV2lkdGggJGNvbG9yICFpbXBvcnRhbnQ7XG59XG5cbkBtaXhpbiByZW1vdmVCdXR0b25EZWZhdWx0U3R5bGVzIHtcbiAgICBiYWNrZ3JvdW5kOiB1bnNldDtcbiAgICBib3JkZXI6IHVuc2V0O1xuICAgIHBhZGRpbmc6IHVuc2V0O1xufVxuXG5AbWl4aW4gYWZ0ZXJQc2V1ZG9FbGVtZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQGltcG9ydCAncHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zJztcbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_49__.trigger)('openOverlay', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.UIAnimation.openOverlay(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_30__.UIAnimation.ANIMATION_TIME_FAST))]
    }
  });
}

/***/ }),

/***/ 60885:
/*!*******************************************************!*\
  !*** ./src/app/pages/admin-page/admin-page.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageModule: () => (/* binding */ AdminPageModule)
/* harmony export */ });
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);
/* harmony import */ var _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../features/mds/mds.module */ 77894);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _admin_page_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin-page-routing.module */ 78060);
/* harmony import */ var _admin_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-page.component */ 15516);
/* harmony import */ var _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autocomplete/autocomplete.component */ 94462);
/* harmony import */ var _config_config_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/config.component */ 18999);
/* harmony import */ var _frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./frontpage/frontpage.component */ 98826);
/* harmony import */ var _lti_admin_lti_admin_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lti-admin/lti-admin.component */ 95188);
/* harmony import */ var _ltitool_admin_ltitool_admin_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ltitool-admin/ltitool-admin.component */ 27371);
/* harmony import */ var _lucene_template_memory_lucene_template_memory_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lucene-template-memory/lucene-template-memory.component */ 89539);
/* harmony import */ var _mediacenter_mediacenter_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mediacenter/mediacenter.component */ 11021);
/* harmony import */ var _plugins_plugins_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plugins/plugins.component */ 81619);
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./statistics/statistics.component */ 52324);
/* harmony import */ var _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./code-editor/code-editor */ 44199);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 61699);

















class AdminPageModule {
  static #_ = this.ɵfac = function AdminPageModule_Factory(t) {
    return new (t || AdminPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
    type: AdminPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _admin_page_routing_module__WEBPACK_IMPORTED_MODULE_2__.AdminPageRoutingModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_15__.MonacoEditorModule.forRoot({
      baseUrl: './assets'
    })]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AdminPageModule, {
    declarations: [_config_config_component__WEBPACK_IMPORTED_MODULE_5__.AdminConfigComponent, _frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_6__.AdminFrontpageComponent, _mediacenter_mediacenter_component__WEBPACK_IMPORTED_MODULE_10__.AdminMediacenterComponent, _admin_page_component__WEBPACK_IMPORTED_MODULE_3__.AdminPageComponent, _plugins_plugins_component__WEBPACK_IMPORTED_MODULE_11__.AdminPluginsComponent, _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_12__.AdminStatisticsComponent, _autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_4__.AutocompleteComponent, _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_13__.CodeEditorComponent, _lti_admin_lti_admin_component__WEBPACK_IMPORTED_MODULE_7__.LtiAdminComponent, _ltitool_admin_ltitool_admin_component__WEBPACK_IMPORTED_MODULE_8__.LtitoolAdminComponent, _lucene_template_memory_lucene_template_memory_component__WEBPACK_IMPORTED_MODULE_9__.LuceneTemplateMemoryComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _admin_page_routing_module__WEBPACK_IMPORTED_MODULE_2__.AdminPageRoutingModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_15__.MonacoEditorModule]
  });
})();

/***/ }),

/***/ 44199:
/*!*************************************************************!*\
  !*** ./src/app/pages/admin-page/code-editor/code-editor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeEditorComponent: () => (/* binding */ CodeEditorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-monaco-editor-v2 */ 8937);






const _c0 = function () {
  return {
    standalone: true
  };
};
function CodeEditorComponent_ngx_monaco_editor_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-monaco-editor", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CodeEditorComponent_ngx_monaco_editor_0_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.ngModelChange.emit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx_r0.options)("ngModel", ctx_r0.ngModel)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0));
  }
}
function CodeEditorComponent_textarea_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CodeEditorComponent_textarea_1_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.ngModelChange.emit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1.ngModel)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
  }
}
class CodeEditorComponent {
  constructor(configService) {
    this.configService = configService;
    this.ngModelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.configService.observeConfig().subscribe(config => {
      this.editorType = config.admin?.editorType || 'Monaco';
    });
  }
  static #_ = this.ɵfac = function CodeEditorComponent_Factory(t) {
    return new (t || CodeEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_1__.ConfigService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: CodeEditorComponent,
    selectors: [["es-code-editor"]],
    inputs: {
      options: "options",
      ngModel: "ngModel"
    },
    outputs: {
      ngModelChange: "ngModelChange"
    },
    decls: 2,
    vars: 2,
    consts: [[3, "options", "ngModel", "ngModelOptions", "ngModelChange", 4, "ngIf"], [3, "ngModel", "ngModelOptions", "ngModelChange", 4, "ngIf"], [3, "options", "ngModel", "ngModelOptions", "ngModelChange"], [3, "ngModel", "ngModelOptions", "ngModelChange"]],
    template: function CodeEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CodeEditorComponent_ngx_monaco_editor_0_Template, 1, 4, "ngx-monaco-editor", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CodeEditorComponent_textarea_1_Template, 1, 3, "textarea", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.editorType === "Monaco");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.editorType === "Textarea");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, ngx_monaco_editor_v2__WEBPACK_IMPORTED_MODULE_4__.EditorComponent],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n\ntextarea[_ngcontent-%COMP%] {\n  border: 1px solid #eee;\n  width: 100%;\n  min-height: 100%;\n  resize: vertical;\n  overflow: auto;\n}\ntextarea[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  border: 1px solid var(--primary);\n}\n\nngx-monaco-editor[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n  overflow: auto;\n}\n\n[_nghost-%COMP%]     ngx-monaco-editor.roConfig .view-lines {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYWRtaW4tcGFnZS9jb2RlLWVkaXRvci9jb2RlLWVkaXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUNBO0VBQ0ksc0JBQUE7RUFNQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFISjtBQUxJO0VBRUksYUFBQTtFQUNBLGdDQUFBO0FBTVI7O0FBQ0E7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBRUo7O0FBRVE7RUFDSSxZQUFBO0FBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG50ZXh0YXJlYSB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcbiAgICAmOmZvY3VzLFxuICAgICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICAgIH1cbiAgICB3aWR0aDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIHJlc2l6ZTogdmVydGljYWw7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG59XG5uZ3gtbW9uYWNvLWVkaXRvciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICBvdmVyZmxvdzogYXV0bztcbn1cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgbmd4LW1vbmFjby1lZGl0b3Iucm9Db25maWcge1xuICAgICAgICAudmlldy1saW5lcyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 18999:
/*!*************************************************************!*\
  !*** ./src/app/pages/admin-page/config/config.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminConfigComponent: () => (/* binding */ AdminConfigComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-admin.service */ 52598);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../code-editor/code-editor */ 44199);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 21916);















function AdminConfigComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 8)(1, "mat-slide-toggle", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_div_1_Template_mat_slide_toggle_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.showRO = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r0.showRO);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 2, "ADMIN.GLOBAL_CONFIG.SHOW_RO"), " ");
  }
}
const _c0 = function () {
  return {
    key: "security.configuration.inlineEditing"
  };
};
function AdminConfigComponent_es_info_message_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-info-message", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 1, "ADMIN.GLOBAL_CONFIG.EDIT_DISABLED", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](4, _c0)), " ");
  }
}
function AdminConfigComponent_es_info_message_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-info-message", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "ADMIN.GLOBAL_CONFIG.VOLATILE_WARNING"));
  }
}
function AdminConfigComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "es-info-message", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 4)(8, "es-code-editor", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_13_Template_es_code_editor_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r12.configs.reference = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "mat-hint")(10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 5, "ADMIN.GLOBAL_CONFIG.INHERIT_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 7, "ADMIN.GLOBAL_CONFIG.BASE_CONFIG_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r3.codeOptionsHocoonRO)("ngModel", ctx_r3.configs.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 9, "ADMIN.GLOBAL_CONFIG.BASE_CONFIG_HINT"));
  }
}
function AdminConfigComponent_ng_container_14_es_info_message_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-info-message", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "ADMIN.GLOBAL_CONFIG.VOLATILE_WARNING"));
  }
}
const _c1 = function () {
  return {
    standalone: true
  };
};
function AdminConfigComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, AdminConfigComponent_ng_container_14_es_info_message_4_Template, 3, 3, "es-info-message", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 4)(6, "es-code-editor", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_14_Template_es_code_editor_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.configs.extension = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-hint")(8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 6, "ADMIN.GLOBAL_CONFIG.EXTENSION_CONFIG_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r4.editSupported);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r4.codeOptionsHocoonRW)("ngModel", ctx_r4.configs.extension)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](10, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](10, 8, "ADMIN.GLOBAL_CONFIG.EXTENSION_CONFIG_HINT"));
  }
}
function AdminConfigComponent_ng_container_15_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "es-code-editor", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_15_ng_container_1_Template_es_code_editor_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.configs.clusterDeployment = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-hint")(7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, "ADMIN.GLOBAL_CONFIG.CLUSTER_DEPLOYMENT_CONFIG_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r17.codeOptionsHocoonRO)("ngModel", ctx_r17.configs.clusterDeployment);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 6, "ADMIN.GLOBAL_CONFIG.CLUSTER_DEPLOYMENT_CONFIG_HINT"), " ");
  }
}
function AdminConfigComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AdminConfigComponent_ng_container_15_ng_container_1_Template, 10, 8, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.configs.clusterDeployment);
  }
}
function AdminConfigComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "es-code-editor", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_16_Template_es_code_editor_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r20.configs.clusterOverride = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-hint")(7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, "ADMIN.GLOBAL_CONFIG.CLUSTER_OVERRIDE_CONFIG_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r6.codeOptionsHocoonRW)("ngModel", ctx_r6.configs.clusterOverride);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 6, "ADMIN.GLOBAL_CONFIG.CLUSTER_OVERRIDE_CONFIG_HINT"));
  }
}
function AdminConfigComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "es-code-editor", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_17_Template_es_code_editor_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r22.configs.nodeDeployment = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-hint")(7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, "ADMIN.GLOBAL_CONFIG.NODE_DEPLOYMENT_CONFIG_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r7.codeOptionsHocoonRO)("ngModel", ctx_r7.configs.nodeDeployment);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 6, "ADMIN.GLOBAL_CONFIG.NODE_DEPLOYMENT_CONFIG_HINT"));
  }
}
function AdminConfigComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "es-code-editor", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_ng_container_18_Template_es_code_editor_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r24.configs.parsed = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-hint")(7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, "ADMIN.GLOBAL_CONFIG.PARSED_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx_r8.codeOptionsHocoonRO)("ngModel", ctx_r8.configs.parsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 6, "ADMIN.GLOBAL_CONFIG.PARSED_HINT"));
  }
}
function AdminConfigComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 14)(1, "es-info-message", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminConfigComponent_div_19_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r26.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 2, "ADMIN.GLOBAL_CONFIG.WARNING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 4, "SAVE"));
  }
}
class AdminConfigComponent {
  static #_ = this.CONFIG_FILE_REFERENCE = 'edu-sharing.reference.conf';
  static #_2 = this.EXTENSION_CONFIG_FILE = 'edu-sharing.application.conf';
  static #_3 = this.OVERRIDE_CONFIG_FILE = 'edu-sharing.override.conf';
  static #_4 = this.CONFIG_DEPLOYMENT_FILE = 'edu-sharing.deployment.conf';
  static #_5 = this.CLIENT_CONFIG_FILE = 'client.config.xml';
  onCtrlS(event) {
    event.preventDefault();
    this.save();
  }
  constructor(adminService, configService, dialogs, toast) {
    this.adminService = adminService;
    this.configService = configService;
    this.dialogs = dialogs;
    this.toast = toast;
    this.codeOptionsHocoonRO = {
      minimap: {
        enabled: false
      },
      language: 'json',
      readOnly: true,
      automaticLayout: true
    };
    this.codeOptionsHocoonRW = {
      minimap: {
        enabled: false
      },
      language: 'json',
      automaticLayout: true
    };
    this.clientCodeOptions = {
      minimap: {
        enabled: false
      },
      language: 'xml',
      automaticLayout: true
    };
    this.configs = {
      clientConfig: null,
      reference: null,
      clusterDeployment: null,
      nodeDeployment: null,
      extension: null,
      clusterOverride: null,
      nodeOverride: null,
      parsed: null
    };
    this.size = 'medium';
    this.showRO = false;
    this.editSupported = false;
    this.adminService.getConfigFile(AdminConfigComponent.CLIENT_CONFIG_FILE, 'DEFAULTS').subscribe(data => this.configs.clientConfig = data);
    this.adminService.getConfigFile(AdminConfigComponent.CONFIG_FILE_REFERENCE, 'DEFAULTS').subscribe(base => this.configs.reference = base);
    this.adminService.getConfigFile(AdminConfigComponent.EXTENSION_CONFIG_FILE, 'DEFAULTS').subscribe(deployment => this.configs.extension = deployment);
    this.adminService.getConfigFile(AdminConfigComponent.CONFIG_DEPLOYMENT_FILE, 'CLUSTER').subscribe(deployment => this.configs.clusterDeployment = deployment);
    this.adminService.getConfigFile(AdminConfigComponent.CONFIG_DEPLOYMENT_FILE, 'NODE').subscribe(deployment => this.configs.nodeDeployment = deployment);
    this.adminService.getConfigFile(AdminConfigComponent.OVERRIDE_CONFIG_FILE, 'CLUSTER').subscribe(c => this.configs.clusterOverride = c);
    this.adminService.getConfigFile(AdminConfigComponent.OVERRIDE_CONFIG_FILE, 'NODE').subscribe(c => this.configs.nodeOverride = c);
    this.adminService.getConfigMerged().subscribe(merged => {
      this.configs.parsed = JSON.stringify(merged, null, 2);
      this.setEditSupported(merged?.security?.configuration?.inlineEditing);
    }, () => {
      this.setEditSupported(false);
    });
  }
  setEditSupported(status) {
    this.editSupported = status;
    this.showRO = !this.editSupported;
    // fix: monaco editor requires full object change to trigger/sync state
    this.codeOptionsHocoonRW = {
      ...this.codeOptionsHocoonRW,
      readOnly: !this.editSupported
    };
    this.clientCodeOptions = {
      ...this.clientCodeOptions,
      readOnly: !this.editSupported
    };
  }
  displayError(error) {
    console.warn(error);
    this.toast.closeProgressSpinner();
    void this.dialogs.openGenericDialog({
      title: 'ADMIN.GLOBAL_CONFIG.ERROR',
      message: 'ADMIN.GLOBAL_CONFIG.PARSE_ERROR',
      messageParameters: {
        error: error?.error?.error
      },
      messageMode: 'html',
      closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_0__.Closable.Disabled,
      buttons: [{
        label: 'ADMIN.GLOBAL_CONFIG.CHECK',
        config: {
          color: 'danger'
        }
      }]
    });
  }
  save() {
    this.toast.showProgressSpinner();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.forkJoin)([this.adminService.updateConfigFile(AdminConfigComponent.CLIENT_CONFIG_FILE, 'DEFAULTS', this.configs.clientConfig), this.adminService.updateConfigFile(AdminConfigComponent.EXTENSION_CONFIG_FILE, 'DEFAULTS', this.configs.extension), this.adminService.updateConfigFile(AdminConfigComponent.OVERRIDE_CONFIG_FILE, 'CLUSTER', this.configs.clusterOverride), this.adminService.updateConfigFile(AdminConfigComponent.OVERRIDE_CONFIG_FILE, 'NODE', this.configs.nodeOverride)]).subscribe(() => {
      this.adminService.refreshAppInfo().subscribe(() => {
        this.toast.closeProgressSpinner();
        this.configService.observeConfig({
          forceUpdate: true
        }).subscribe(() => {
          this.toast.closeProgressSpinner();
          this.toast.toast('ADMIN.GLOBAL_CONFIG.SAVED');
        }, error => this.displayError(error));
      }, error => this.displayError(error));
    });
  }
  static #_6 = this.ɵfac = function AdminConfigComponent_Factory(t) {
    return new (t || AdminConfigComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_1__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_8__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_2__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast));
  };
  static #_7 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: AdminConfigComponent,
    selectors: [["es-admin-config"]],
    hostBindings: function AdminConfigComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.control.s", function AdminConfigComponent_keydown_control_s_HostBindingHandler($event) {
          return ctx.onCtrlS($event);
        });
      }
    },
    decls: 20,
    vars: 21,
    consts: [["class", "config-hide", 4, "ngIf"], ["mode", "info", 4, "ngIf"], [1, "mat-heading-3", "mat-heading-underline"], ["mode", "warning", 4, "ngIf"], [1, "monaco-editor"], [3, "options", "ngModel", "ngModelChange"], [4, "ngIf"], ["class", "actions", 4, "ngIf"], [1, "config-hide"], ["name", "showRO", 1, "toggle-reverse", 3, "ngModel", "ngModelChange"], ["mode", "info"], ["mode", "warning"], [1, "roConfig", 3, "options", "ngModel", "ngModelChange"], [3, "options", "ngModel", "ngModelOptions", "ngModelChange"], [1, "actions"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
    template: function AdminConfigComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AdminConfigComponent_div_1_Template, 4, 4, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, AdminConfigComponent_es_info_message_2_Template, 3, 5, "es-info-message", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, AdminConfigComponent_es_info_message_6_Template, 3, 3, "es-info-message", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 4)(8, "es-code-editor", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function AdminConfigComponent_Template_es_code_editor_ngModelChange_8_listener($event) {
          return ctx.configs.clientConfig = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "mat-hint")(10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, AdminConfigComponent_ng_container_13_Template, 13, 11, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, AdminConfigComponent_ng_container_14_Template, 11, 11, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, AdminConfigComponent_ng_container_15_Template, 2, 1, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, AdminConfigComponent_ng_container_16_Template, 10, 8, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, AdminConfigComponent_ng_container_17_Template, 10, 8, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, AdminConfigComponent_ng_container_18_Template, 10, 8, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, AdminConfigComponent_div_19_Template, 7, 6, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("config config-size-", ctx.size, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editSupported);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.editSupported);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 17, "ADMIN.GLOBAL_CONFIG.CLIENT_CONFIG_TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editSupported);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.clientCodeOptions)("ngModel", ctx.configs.clientConfig);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 19, "ADMIN.GLOBAL_CONFIG.CLIENT_CONFIG_HINT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.configs.extension);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editSupported || ctx.configs.clusterOverride);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showRO && ctx.configs.nodeDeployment);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.editSupported);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_4__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatHint, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__.MatSlideToggle, _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_5__.CodeEditorComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
    styles: ["\n\nes-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 20px 0;\n}\n\n.config[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 1300px;\n  padding-right: 20px;\n}\n.config[_ngcontent-%COMP%]   .config-hide[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  padding: 20px;\n  background-color: #eee;\n  border-radius: 20px;\n}\n.config[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n\n.config-size-medium[_ngcontent-%COMP%]   es-code-editor[_ngcontent-%COMP%] {\n  min-height: 200px;\n}\n\n.size-chooser[_ngcontent-%COMP%]    > mat-label[_ngcontent-%COMP%] {\n  padding-right: 20px;\n}\n\n.config-size-large[_ngcontent-%COMP%]   es-code-editor[_ngcontent-%COMP%] {\n  min-height: 500px;\n  height: calc(100vh - 220px);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL2NvbmZpZy9jb25maWcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0FBQUo7O0FBR0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFBSjtBQUNJO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkQ2Q2lCO0VDNUNqQixtQkFBQTtBQUNSO0FBQ0k7RUFDSSxjQUFBO0FBQ1I7O0FBR0k7RUFDSSxpQkFBQTtBQUFSOztBQUlJO0VBQ0ksbUJBQUE7QUFEUjs7QUFLSTtFQUNJLGlCQUFBO0VBQ0EsMkJBQUE7QUFGUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG5lcy1pbmZvLW1lc3NhZ2Uge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMjBweCAwO1xufVxuXG4uY29uZmlnIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMzAwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICAuY29uZmlnLWhpZGUge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgfVxuICAgIC5hY3Rpb25zIHtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XG4gICAgfVxufVxuLmNvbmZpZy1zaXplLW1lZGl1bSB7XG4gICAgZXMtY29kZS1lZGl0b3Ige1xuICAgICAgICBtaW4taGVpZ2h0OiAyMDBweDtcbiAgICB9XG59XG4uc2l6ZS1jaG9vc2VyIHtcbiAgICA+IG1hdC1sYWJlbCB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgfVxufVxuLmNvbmZpZy1zaXplLWxhcmdlIHtcbiAgICBlcy1jb2RlLWVkaXRvciB7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDUwMHB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoKDEwMHZoIC0gMjIwcHgpKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 98826:
/*!*******************************************************************!*\
  !*** ./src/app/pages/admin-page/frontpage/frontpage.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminFrontpageComponent: () => (/* binding */ AdminFrontpageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-admin.service */ 52598);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _core_module_rest_services_configuration_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core-module/rest/services/configuration.service */ 14636);
/* harmony import */ var _shared_components_collection_chooser_collection_chooser_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/components/collection-chooser/collection-chooser.component */ 99260);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../code-editor/code-editor */ 44199);




























function AdminFrontpageComponent_es_info_message_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "es-info-message", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "ADMIN.FRONTPAGE.DISABLED"), "\n");
  }
}
function AdminFrontpageComponent_es_collection_chooser_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "es-collection-chooser", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("onCancel", function AdminFrontpageComponent_es_collection_chooser_2_Template_es_collection_chooser_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r3.chooseCollection = false);
    })("onChoose", function AdminFrontpageComponent_es_collection_chooser_2_Template_es_collection_chooser_onChoose_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r4);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r5.setCollection($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("@fromRight", ctx_r1.chooseCollection);
  }
}
function AdminFrontpageComponent_div_3_form_1_mat_option_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", mode_r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "ADMIN.FRONTPAGE.MODE." + mode_r15));
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
function AdminFrontpageComponent_div_3_form_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 29)(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_16_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r16.collectionName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 4, "ADMIN.FRONTPAGE.COLLECTION_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 6, "ADMIN.FRONTPAGE.COLLECTION_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx_r11.collectionName)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](8, _c0));
  }
}
function AdminFrontpageComponent_div_3_form_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 31)(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "mat-checkbox", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 4, "ADMIN.FRONTPAGE.TIMESPAN_LABEL"), " (", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 6, "ADMIN.FRONTPAGE.TIMESPAN_DAYS"), ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 8, "ADMIN.FRONTPAGE.TIMESPAN_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](12, 10, "ADMIN.FRONTPAGE.TIMESPAN.all"), " ");
  }
}
function AdminFrontpageComponent_div_3_form_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 19)(1, "div", 34)(2, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_form_1_div_18_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r18.chooseCollection = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 1, "ADMIN.FRONTPAGE.CHOOSE_COLLECTION"), " ");
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "FIELD_REQUIRED"));
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "FIELD_VALIDATION_ERROR_INTEGER"));
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "ADMIN.FRONTPAGE.TOTAL_COUNT_OUT_OF_RANGE"));
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_1_Template, 3, 3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_2_Template, 3, 3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_span_3_Template, 3, 3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r20.form.get("totalCount").errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r20.form.get("totalCount").errors.pattern);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r20.form.get("totalCount").errors.outOfRange);
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_es_info_message_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "es-info-message");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "ADMIN.FRONTPAGE.TOTAL_COUNT_LARGER_HINT"), " ");
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", type_r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "ADMIN.FRONTPAGE.CONDITION_TYPE." + type_r29));
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_form_field_11_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", p_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](p_r31);
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_form_field_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "mat-select", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_form_field_11_Template_mat_select_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r34);
      const query_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](query_r26.condition.value = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_form_field_11_mat_option_8_Template, 2, 2, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const query_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 5, "ADMIN.FRONTPAGE.CUSTOM_QUERY_CONDITION_VALUE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](6, 7, "ADMIN.FRONTPAGE.CUSTOM_QUERY_CONDITION_VALUE_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", query_r26.condition.value)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](9, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r28.toolpermissions);
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 40)(1, "div", 41)(2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "mat-select", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template_mat_select_ngModelChange_9_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const query_r26 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](query_r26.condition.type = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_option_10_Template, 3, 4, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, AdminFrontpageComponent_div_3_form_1_div_19_div_21_mat_form_field_11_Template, 9, 10, "mat-form-field", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "mat-radio-group", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template_mat_radio_group_ngModelChange_12_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const query_r26 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](query_r26.condition.negate = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "mat-radio-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](17, "true");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "mat-radio-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](19, "false");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template_button_click_20_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const query_r26 = restoredCtx.$implicit;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r39.removeQueryCondition(query_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](23, "div", 45)(24, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](27, "es-code-editor", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template_es_code_editor_ngModelChange_27_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const query_r26 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](query_r26.query = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](28, "mat-hint")(29, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](32, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r41.queryHelp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const query_r26 = ctx.$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 17, "ADMIN.FRONTPAGE.CUSTOM_QUERY_CONDITION_TYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 19, "ADMIN.FRONTPAGE.CUSTOM_QUERY_CONDITION_TYPE_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", query_r26.condition.type)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](31, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r22.conditionTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", query_r26.condition.type === "TOOLPERMISSION");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", query_r26.condition.negate)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](32, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](15, 21, "ADMIN.FRONTPAGE.CUSTOM_QUERY_CONDITION_NEGATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](22, 23, "ADMIN.FRONTPAGE.CUSTOM_QUERY_REMOVE_CONDITION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](26, 25, "ADMIN.FRONTPAGE.CUSTOM_QUERY_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("options", ctx_r22.codeOptions)("ngModel", query_r26.query);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](31, 27, "ADMIN.FRONTPAGE.CUSTOM_QUERY_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](34, 29, "ADMIN.FRONTPAGE.CUSTOM_QUERY_HINT_HELP"), " ");
  }
}
function AdminFrontpageComponent_div_3_form_1_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div")(1, "div", 19)(2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, AdminFrontpageComponent_div_3_form_1_div_19_mat_error_10_Template, 4, 3, "mat-error", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "mat-form-field")(12, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_div_19_Template_input_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r43);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r42.config.frontpage.displayCount = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](20, AdminFrontpageComponent_div_3_form_1_div_19_es_info_message_20_Template, 3, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](21, AdminFrontpageComponent_div_3_form_1_div_19_div_21_Template, 35, 33, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](22, "div", 19)(23, "div")(24, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_form_1_div_19_Template_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r43);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r44.addQueryCondition());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 9, "ADMIN.FRONTPAGE.TOTAL_COUNT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 11, "ADMIN.FRONTPAGE.TOTAL_COUNT_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r14.form.get("totalCount").errors);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](14, 13, "ADMIN.FRONTPAGE.DISPLAY_COUNT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](17, 15, "ADMIN.FRONTPAGE.DISPLAY_COUNT_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx_r14.config.frontpage.displayCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r14.form.get("totalCount").value > ctx_r14.form.get("displayCount").value);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r14.config.frontpage.queries);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](26, 17, "ADMIN.FRONTPAGE.CUSTOM_QUERY_ADD_CONDITION"), " ");
  }
}
function AdminFrontpageComponent_div_3_form_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "form", 16)(1, "h4", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 19)(6, "div")(7, "mat-form-field")(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "mat-select", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function AdminFrontpageComponent_div_3_form_1_Template_mat_select_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r46);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r45.config.frontpage.mode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](15, AdminFrontpageComponent_div_3_form_1_mat_option_15_Template, 3, 4, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](16, AdminFrontpageComponent_div_3_form_1_div_16_Template, 9, 9, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, AdminFrontpageComponent_div_3_form_1_div_17_Template, 13, 12, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](18, AdminFrontpageComponent_div_3_form_1_div_18_Template, 5, 3, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](19, AdminFrontpageComponent_div_3_form_1_div_19_Template, 27, 19, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "div", 19)(21, "div", 26)(22, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_form_1_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r46);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r47.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("formGroup", ctx_r6.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 13, "ADMIN.FRONTPAGE.GENERAL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](10, 15, "ADMIN.FRONTPAGE.MODE_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](13, 17, "ADMIN.FRONTPAGE.MODE_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", ctx_r6.config.frontpage.mode)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](21, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r6.modes);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.config.frontpage.mode === "collection");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.config.frontpage.mode !== "collection");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.config.frontpage.mode === "collection");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r6.config.frontpage.mode !== "collection");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", !ctx_r6.form.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](24, 19, "SAVE"), " ");
  }
}
function AdminFrontpageComponent_div_3_h5_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "h5", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "ADMIN.FRONTPAGE.PREVIEW_ERROR." + ctx_r7.previewError), " ");
  }
}
function AdminFrontpageComponent_div_3_es_node_entries_wrapper_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "es-node-entries-wrapper", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("clickItem", function AdminFrontpageComponent_div_3_es_node_entries_wrapper_11_Template_es_node_entries_wrapper_clickItem_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r49);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r48.onOpenNode.emit($event.element));
    })("dblClickItem", function AdminFrontpageComponent_div_3_es_node_entries_wrapper_11_Template_es_node_entries_wrapper_dblClickItem_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r49);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r50.onOpenNode.emit($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("columns", ctx_r8.previewColumns)("dataSource", ctx_r8.previewNodesDataSource)("checkbox", false)("displayType", ctx_r8.NodeEntriesDisplayType.Grid)("elementInteractionType", ctx_r8.InteractionType.Emitter)("scope", "dummy");
  }
}
function AdminFrontpageComponent_div_3_h5_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "h5", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](1, 1, "ADMIN.FRONTPAGE.PREVIEW_HINT"), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeHtml"]);
  }
}
function AdminFrontpageComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, AdminFrontpageComponent_div_3_form_1_Template, 25, 22, "form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "h4", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "i", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 9)(7, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function AdminFrontpageComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r51.updatePreviews());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, AdminFrontpageComponent_div_3_h5_10_Template, 3, 3, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, AdminFrontpageComponent_div_3_es_node_entries_wrapper_11_Template, 1, 6, "es-node-entries-wrapper", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, AdminFrontpageComponent_div_3_h5_12_Template, 2, 3, "h5", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r2.config);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 5, "ADMIN.FRONTPAGE.PREVIEW"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r2.previewError);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r2.previewError);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r2.previewLoading && !ctx_r2.previewError);
  }
}
class AdminFrontpageComponent {
  constructor(adminService, collectionService, dialogs, formBuilder, mdsService, nodeService, toast, translate, configService) {
    this.adminService = adminService;
    this.collectionService = collectionService;
    this.dialogs = dialogs;
    this.formBuilder = formBuilder;
    this.mdsService = mdsService;
    this.nodeService = nodeService;
    this.toast = toast;
    this.translate = translate;
    this.configService = configService;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.InteractionType;
    this.onOpenNode = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.previewLoading = true;
    this.modes = ['collection', 'rating', 'views', 'downloads'];
    this.conditionTypes = ['TOOLPERMISSION'];
    this.previewNodesDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeDataSource();
    this.previewColumns = [];
    this.collectionName = '';
    this.chooseCollection = false;
    this.codeOptions = {
      minimap: {
        enabled: false
      },
      language: 'json'
    };
    this.form = this.formBuilder.group({
      totalCount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern('[0-9]*')]],
      displayCount: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern('[0-9]*')]],
      timespan: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern('[0-9]*')]],
      timespanAll: []
    }, {
      validator: [ValidateForm]
    });
    this.form.valueChanges.subscribe(values => {
      values.timespanAll ? this.form.get('timespan').disable({
        emitEvent: false
      }) : this.form.get('timespan').enable({
        emitEvent: false
      });
    });
    this.mdsService.getSet().subscribe(set => {
      this.previewColumns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__.MdsHelper.getColumns(this.translate, set, 'search');
    });
    this.adminService.getToolpermissions().subscribe(toolpermissions => this.toolpermissions = Object.keys(toolpermissions));
    this.update();
  }
  ngAfterViewInit() {
    void this.nodeEntries.initOptionsGenerator({});
  }
  save() {
    for (const key of Object.keys(this.form.value)) {
      this.config.frontpage[key] = this.form.value[key];
    }
    this.toast.showProgressSpinner();
    this.adminService.updateRepositoryConfig(this.config).subscribe(() => {
      this.update();
      this.toast.toast('ADMIN.FRONTPAGE.SAVED');
    });
  }
  update() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this.config = yield _this.adminService.getRepositoryConfig().toPromise();
        const values = _this.form.value;
        for (const key of Object.keys(values)) {
          values[key] = _this.config.frontpage[key];
        }
        // fix if field is disabled, still fetch value
        if (!values.timespan) {
          values.timespan = _this.form.get('timespan').value;
        }
        _this.form.setValue(values);
        _this.toast.closeProgressSpinner();
        if (_this.config.frontpage.collection) {
          _this.collectionService.getCollection(_this.config.frontpage.collection).subscribe(c => {
            _this.collectionName = c.collection.title;
          });
        }
      } catch (e) {
        _this.toast.error(e);
        _this.toast.closeProgressSpinner();
        const dialogRef = yield _this.dialogs.openGenericDialog({
          title: 'ADMIN.FRONTPAGE.CONFIG_BROKEN',
          message: 'ADMIN.FRONTPAGE.CONFIG_BROKEN_INFO',
          buttons: [{
            label: 'CANCEL',
            config: {
              color: 'standard'
            }
          }, {
            label: 'ADMIN.FRONTPAGE.RESET',
            config: {
              color: 'danger'
            }
          }],
          closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__.Closable.Standard,
          maxWidth: 500
        });
        dialogRef.afterClosed().subscribe(response => {
          if (response === 'ADMIN.FRONTPAGE.RESET') {
            _this.toast.showProgressSpinner();
            _this.adminService.updateRepositoryConfig(null).subscribe(() => {
              void _this.update();
            });
          } else {
            _this.toast.closeProgressSpinner();
          }
        });
      }
      _this.updatePreviews();
    })();
  }
  updatePreviews() {
    this.previewLoading = true;
    this.previewNodesDataSource.reset();
    this.previewError = null;
    this.nodeService.getChildren(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.NODES_FRONTPAGE, [], {
      propertyFilter: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ALL]
    }).subscribe(nodes => {
      this.previewLoading = false;
      this.previewNodesDataSource.setData(nodes.nodes, nodes.pagination);
    }, error => {
      if (_core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.errorContains(error, 'No Elasticsearch instance')) {
        this.previewError = 'ELASTICSEARCH';
      } else {
        this.previewError = 'UNKNOWN';
      }
    });
  }
  openNode(node) {
    this.onOpenNode.emit(node.node);
  }
  setCollection(collection) {
    this.config.frontpage.collection = collection.ref.id;
    this.collectionName = collection.title;
    this.chooseCollection = false;
  }
  queryHelp() {
    // @TODO: Link to edu-sharing manpage!
  }
  addQueryCondition() {
    if (!this.config.frontpage.queries) this.config.frontpage.queries = [];
    this.config.frontpage.queries.push({
      condition: {
        type: this.conditionTypes[0],
        negate: false
      }
    });
  }
  removeQueryCondition(query) {
    this.config.frontpage.queries.splice(this.config.frontpage.queries.indexOf(query), 1);
  }
  static #_ = this.ɵfac = function AdminFrontpageComponent_Factory(t) {
    return new (t || AdminFrontpageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_5__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_6__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_7__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_15__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_6__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_6__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_8__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_rest_services_configuration_service__WEBPACK_IMPORTED_MODULE_9__.ConfigurationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: AdminFrontpageComponent,
    selectors: [["es-admin-frontpage"]],
    viewQuery: function AdminFrontpageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
      }
    },
    outputs: {
      onOpenNode: "onOpenNode"
    },
    decls: 5,
    vars: 7,
    consts: [["class", "info-disabled", 4, "ngIf"], ["class", "dialog-right", "title", "WORKSPACE.SELECT_COLLECTION", 3, "onCancel", "onChoose", 4, "ngIf"], ["class", "frontpage", 4, "ngIf"], [1, "info-disabled"], ["title", "WORKSPACE.SELECT_COLLECTION", 1, "dialog-right", 3, "onCancel", "onChoose"], [1, "frontpage"], [3, "formGroup", 4, "ngIf"], [1, "mat-heading-4", "mat-heading-underline", "preview-heading"], ["esIcon", "apps"], [1, "reload"], ["mat-icon-button", "", 3, "click"], ["esIcon", "refresh"], [1, "group", "preview"], ["class", "mat-heading-5 preview-error", 4, "ngIf"], [3, "columns", "dataSource", "checkbox", "displayType", "elementInteractionType", "scope", "clickItem", "dblClickItem", 4, "ngIf"], ["class", "mat-heading-5 preview-hint", 3, "innerHTML", 4, "ngIf"], [3, "formGroup"], [1, "mat-heading-4", "mat-heading-underline"], ["esIcon", "settings"], [1, "group"], ["id", "mode", 3, "ngModel", "ngModelOptions", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "mode-collection", 4, "ngIf"], ["class", "config-timespan", 4, "ngIf"], ["class", "group", 4, "ngIf"], [4, "ngIf"], [1, "save"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"], [3, "value"], [1, "mode-collection"], ["matInput", "", "id", "collection", "type", "text", "readonly", "true", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "config-timespan"], ["matInput", "", "id", "timespan", "type", "number", "min", "1", "formControlName", "timespan"], ["formControlName", "timespanAll"], [1, "select-collection"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["matInput", "", "id", "totalCount", "formControlName", "totalCount", "type", "number"], ["matInput", "", "id", "displayCount", "type", "number", "formControlName", "displayCount", 3, "ngModel", "ngModelChange"], [1, "group-info"], ["class", "group queries", 4, "ngFor", "ngForOf"], [1, "group", "queries"], [1, "condition"], ["id", "conditionType", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "negate", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "monaco-editor"], [3, "options", "ngModel", "ngModelChange"], ["mat-button", "", 3, "click"], ["id", "conditionValue", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "mat-heading-5", "preview-error"], [3, "columns", "dataSource", "checkbox", "displayType", "elementInteractionType", "scope", "clickItem", "dblClickItem"], [1, "mat-heading-5", "preview-hint", 3, "innerHTML"]],
    template: function AdminFrontpageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, AdminFrontpageComponent_es_info_message_0_Template, 3, 3, "es-info-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, AdminFrontpageComponent_es_collection_chooser_2_Template, 1, 1, "es-collection-chooser", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, AdminFrontpageComponent_div_3_Template, 13, 7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](1, 3, ctx.configService.get("frontpage.enabled", true)));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.chooseCollection);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](4, 5, ctx.configService.get("frontpage.enabled", true)));
      }
    },
    dependencies: [_shared_components_collection_chooser_collection_chooser_component__WEBPACK_IMPORTED_MODULE_10__.CollectionChooserComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_11__.InfoMessageComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_18__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_20__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_22__.MatInput, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioButton, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControlName, _code_editor_code_editor__WEBPACK_IMPORTED_MODULE_12__.CodeEditorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
    styles: ["\n\n.info-disabled[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 20%;\n}\n\n.frontpage[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1300px;\n}\n.frontpage[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.frontpage[_ngcontent-%COMP%]   .group-info[_ngcontent-%COMP%] {\n  margin: 0 10%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 50px 10%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .select-collection[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .config-timespan[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .config-timespan[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  padding-bottom: 15px;\n}\n.frontpage[_ngcontent-%COMP%]   .group.queries[_ngcontent-%COMP%] {\n  margin: 30px 12%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .monaco-editor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  padding: 0 10px;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  display: inline;\n  width: 100%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .mode-collection[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .mode-collection[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .condition[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .condition[_ngcontent-%COMP%]   .negate[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  display: flex;\n  flex-wrap: wrap;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .condition[_ngcontent-%COMP%]   .negate[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .condition[_ngcontent-%COMP%]   .negate[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n}\n.frontpage[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > .condition[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 15px;\n}\n.frontpage[_ngcontent-%COMP%]   .group.preview[_ngcontent-%COMP%] {\n  margin: 20px 20px 10px 20px;\n}\n.frontpage[_ngcontent-%COMP%]   .group.preview[_ngcontent-%COMP%]   es-node-entries-wrapper[_ngcontent-%COMP%] {\n  display: inline;\n}\n.frontpage[_ngcontent-%COMP%]   .preview-heading[_ngcontent-%COMP%]   .reload[_ngcontent-%COMP%] {\n  text-align: right;\n  flex-grow: 1;\n}\n\n[_nghost-%COMP%]     .group .mat-form-field-wrapper {\n  width: 100%;\n}\n[_nghost-%COMP%]     h5.preview-error {\n  display: flex;\n  justify-content: center;\n}\n[_nghost-%COMP%]     h5.preview-hint {\n  padding: 10px 10%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n[_nghost-%COMP%]     h5.preview-hint li {\n  list-style: square;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL2Zyb250cGFnZS9mcm9udHBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNKQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUFDSjs7QUFDQTtFQUNJLFdBQUE7RUFDQSxpQkFBQTtBQUVKO0FBREk7RUFDSSx5QkFBQTtBQUdSO0FBREk7RUFDSSxhQUFBO0FBR1I7QUFESTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtBQUdSO0FBRlE7RUFDSSx5QkFBQTtBQUlaO0FBRlE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFJWjtBQUhZO0VBQ0ksb0JBQUE7QUFLaEI7QUFGUTtFQUNJLGdCQUFBO0FBSVo7QUFGUTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUlaO0FBRlE7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFJWjtBQUZRO0VBQ0ksV0FBQTtBQUlaO0FBSFk7RUFDSSxlQUFBO0VBQ0EsV0FBQTtBQUtoQjtBQUZRO0VBQ0ksc0JBQUE7QUFJWjtBQUhZO0VBQ0ksZ0JBQUE7QUFLaEI7QUFGUTtFQUNJLHNCQUFBO0FBSVo7QUFIWTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFLaEI7QUFKZ0I7RUFDSSxXQUFBO0FBTXBCO0FBSmdCO0VBQ0ksaUJBQUE7QUFNcEI7QUFIWTtFQUNJLGdCQUFBO0FBS2hCO0FBRlE7RUFDSSwyQkFBQTtBQUlaO0FBSFk7RUFDSSxlQUFBO0FBS2hCO0FBQUk7RUFDSSxpQkFBQTtFQUNBLFlBQUE7QUFFUjs7QUFFSTtFQUNJLFdBQUE7QUFDUjtBQUNJO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0FBQ1I7QUFDSTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7QUFDUjtBQUFRO0VBQ0ksa0JBQUE7QUFFWiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuLmluZm8tZGlzYWJsZWQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWFyZ2luLXRvcDogMjAlO1xufVxuLmZyb250cGFnZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMzAwcHg7XG4gICAgLnNhdmUge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cbiAgICAuZ3JvdXAtaW5mbyB7XG4gICAgICAgIG1hcmdpbjogMCAxMCU7XG4gICAgfVxuICAgIC5ncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIG1hcmdpbjogNTBweCAxMCU7XG4gICAgICAgIC5zZWxlY3QtY29sbGVjdGlvbiB7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB9XG4gICAgICAgIC5jb25maWctdGltZXNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmLnF1ZXJpZXMge1xuICAgICAgICAgICAgbWFyZ2luOiAzMHB4IDEyJTtcbiAgICAgICAgfVxuICAgICAgICAubW9uYWNvLWVkaXRvciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICA+ICoge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgICAgfVxuICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgID4gbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICA+IC5tb2RlLWNvbGxlY3Rpb24ge1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgID4gYnV0dG9uIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgID4gLmNvbmRpdGlvbiB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgLm5lZ2F0ZSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgICAgICAgICBtYXQtbGFiZWwge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmLnByZXZpZXcge1xuICAgICAgICAgICAgbWFyZ2luOiAyMHB4IDIwcHggMTBweCAyMHB4O1xuICAgICAgICAgICAgZXMtbm9kZS1lbnRyaWVzLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5wcmV2aWV3LWhlYWRpbmcgLnJlbG9hZCB7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAuZ3JvdXAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgaDUucHJldmlldy1lcnJvciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cbiAgICBoNS5wcmV2aWV3LWhpbnQge1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDEwJTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGxpIHtcbiAgICAgICAgICAgIGxpc3Qtc3R5bGU6IHNxdWFyZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}
const ValidateForm = control => {
  const displayCount = control.get('displayCount');
  const totalCount = control.get('totalCount');
  if (parseInt(displayCount.value, 10) > parseInt(totalCount.value, 10)) {
    totalCount.setErrors({
      outOfRange: true
    });
  }
  return null;
};

/***/ }),

/***/ 95188:
/*!*******************************************************************!*\
  !*** ./src/app/pages/admin-page/lti-admin/lti-admin.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LtiAdminComponent: () => (/* binding */ LtiAdminComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _core_module_rest_services_rest_lti_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-lti.service */ 12450);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);


















function LtiAdminComponent_table_8_th_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "ADMIN.LTI.URL"));
  }
}
const _c0 = function (a0) {
  return {
    "text-decoration": a0
  };
};
function LtiAdminComponent_table_8_td_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](2, _c0, !element_r13.valid ? "line-through" : "none"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", element_r13.url, " ");
  }
}
function LtiAdminComponent_table_8_th_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "ADMIN.LTI.TS"));
  }
}
const _c1 = function () {
  return {
    relative: false,
    time: true
  };
};
function LtiAdminComponent_table_8_td_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](2, 1, element_r14.tsExpiry, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](4, _c1)), " ");
  }
}
function LtiAdminComponent_table_8_th_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "ADMIN.APPLICATIONS.ID"));
  }
}
function LtiAdminComponent_table_8_td_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", !element_r15.registeredAppId ? "-" : element_r15.registeredAppId, " ");
  }
}
function LtiAdminComponent_table_8_th_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "th", 29);
  }
}
function LtiAdminComponent_table_8_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 31)(1, "div", 32)(2, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LtiAdminComponent_table_8_td_12_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18);
      const element_r16 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r17.copyUrl(element_r16));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
}
function LtiAdminComponent_table_8_th_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "th", 29);
  }
}
function LtiAdminComponent_table_8_td_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "td", 31)(1, "div", 35)(2, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LtiAdminComponent_table_8_td_15_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r21);
      const element_r19 = restoredCtx.$implicit;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r20.remove(element_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "i", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
}
function LtiAdminComponent_table_8_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "tr", 37);
  }
}
function LtiAdminComponent_table_8_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "tr", 38);
  }
}
function LtiAdminComponent_table_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "table", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](1, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, LtiAdminComponent_table_8_th_2_Template, 3, 3, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, LtiAdminComponent_table_8_td_3_Template, 2, 4, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](4, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, LtiAdminComponent_table_8_th_5_Template, 3, 3, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, LtiAdminComponent_table_8_td_6_Template, 3, 5, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](7, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, LtiAdminComponent_table_8_th_8_Template, 3, 3, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, LtiAdminComponent_table_8_td_9_Template, 2, 1, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](10, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, LtiAdminComponent_table_8_th_11_Template, 1, 0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, LtiAdminComponent_table_8_td_12_Template, 4, 0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](13, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, LtiAdminComponent_table_8_th_14_Template, 1, 0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, LtiAdminComponent_table_8_td_15_Template, 4, 0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, LtiAdminComponent_table_8_tr_16_Template, 1, 0, "tr", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, LtiAdminComponent_table_8_tr_17_Template, 1, 0, "tr", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dataSource", ctx_r0.tokens.registrationLinks);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matHeaderRowDef", ctx_r0.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matRowDefColumns", ctx_r0.displayedColumns);
  }
}
class LtiAdminComponent {
  constructor(dialogs, ltiService, toast) {
    this.dialogs = dialogs;
    this.ltiService = ltiService;
    this.toast = toast;
    this.onRefreshAppList = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
    this.displayedColumns = ['url', 'tsExpiry', 'registeredAppId', 'copy', 'delete'];
  }
  ngOnInit() {
    this.refresh();
  }
  remove(element) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'ADMIN.LTI.REMOVE_TITLE',
        message: 'ADMIN.LTI.REMOVE_MESSAGE',
        messageParameters: element,
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__.DELETE_OR_CANCEL
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'YES_DELETE') {
          _this.ltiService.removeToken(element.token).subscribe(() => {
            _this.refresh();
          });
        }
      });
    })();
  }
  refresh() {
    this.ltiService.getTokensCall(false).subscribe(t => {
      this.tokens = t;
    });
  }
  generate() {
    this.ltiService.getTokensCall(true).subscribe(t => {
      this.tokens = t;
      this.copyUrl(this.tokens.registrationLinks[this.tokens.registrationLinks.length - 1]);
    });
  }
  saveAdvanced() {
    this.ltiService.registrationAdvanced(this.platformId, this.clientId, this.deploymentId, this.authenticationRequestUrl, this.keysetUrl, this.keyId, this.authTokenUrl).subscribe(t => {
      this.toast.toast('ADMIN.LTI.DATA.CREATED', null);
      this.toast.closeProgressSpinner();
      this.onRefreshAppList.emit();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
    });
  }
  copyUrl(element) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__.UIHelper.copyToClipboard(element.url);
    this.toast.toast('ADMIN.APPLICATIONS.COPIED_CLIPBOARD');
  }
  static #_ = this.ɵfac = function LtiAdminComponent_Factory(t) {
    return new (t || LtiAdminComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_rest_services_rest_lti_service__WEBPACK_IMPORTED_MODULE_4__.RestLtiService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: LtiAdminComponent,
    selectors: [["es-lti-admin"]],
    outputs: {
      onRefreshAppList: "onRefreshAppList"
    },
    decls: 59,
    vars: 47,
    consts: [["mat-stretch-tabs", ""], [3, "label"], [1, "lti-wrapper"], ["mode", "info"], [1, "info-message"], ["mat-table", "", 3, "dataSource", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["esIcon", "add"], [1, "base-fields"], ["floatLabel", "always"], ["matInput", "", "placeholder", "https://localhost.localdomain/moodle", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "LTEi6jcz3NltiFA", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "2", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "https://localhost.localdomain/moodle/mod/lti/auth.php", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "https://localhost.localdomain/moodle/mod/lti/certs.php", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "e079a4884780ac1dfd16", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "https://localhost.localdomain/moodle/mod/lti/token.php", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "url"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 3, "ngStyle", 4, "matCellDef"], ["matColumnDef", "tsExpiry"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "registeredAppId"], ["matColumnDef", "copy"], ["matColumnDef", "delete"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", "", 3, "ngStyle"], ["mat-cell", ""], [1, "copy"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["esIcon", "content_copy"], [1, "delete"], ["esIcon", "delete"], ["mat-header-row", ""], ["mat-row", ""]],
    template: function LtiAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-tab-group", 0)(1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 2)(4, "es-info-message", 3)(5, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](7, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, LtiAdminComponent_table_8_Template, 18, 3, "table", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LtiAdminComponent_Template_button_click_9_listener() {
          return ctx.generate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "div", 2)(16, "es-info-message", 3)(17, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "div", 8)(21, "mat-form-field", 9)(22, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_25_listener($event) {
          return ctx.platformId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "mat-form-field", 9)(27, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](29, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_30_listener($event) {
          return ctx.clientId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "mat-form-field", 9)(32, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](34, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_35_listener($event) {
          return ctx.deploymentId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "mat-form-field", 9)(37, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](39, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](40, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_40_listener($event) {
          return ctx.authenticationRequestUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "mat-form-field", 9)(42, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](44, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_45_listener($event) {
          return ctx.keysetUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](46, "mat-form-field", 9)(47, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](49, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](50, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_50_listener($event) {
          return ctx.keyId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "mat-form-field", 9)(52, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](53);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](54, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](55, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LtiAdminComponent_Template_input_ngModelChange_55_listener($event) {
          return ctx.authTokenUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](56, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LtiAdminComponent_Template_button_click_56_listener() {
          return ctx.saveAdvanced();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](57);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](58, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 21, "ADMIN.LTI.DYNAMIC"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](7, 23, "ADMIN.LTI.DYNAMIC_INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.tokens);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](12, 25, "ADMIN.LTI.GENERATE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](14, 27, "ADMIN.LTI.ADVANCED"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](19, 29, "ADMIN.LTI.MANUAL_INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](24, 31, "ADMIN.LTI.DATA.platformId"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.platformId);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](29, 33, "ADMIN.LTI.DATA.client_id"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.clientId);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](34, 35, "ADMIN.LTI.DATA.deployment_id"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.deploymentId);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](39, 37, "ADMIN.LTI.DATA.authentication_request_url"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.authenticationRequestUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](44, 39, "ADMIN.LTI.DATA.keyset_url"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.keysetUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](49, 41, "ADMIN.LTI.DATA.key_id"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.keyId);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](54, 43, "ADMIN.LTI.DATA.auth_token_url"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.authTokenUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](58, 45, "ADMIN.LTI.SAVE"), " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgStyle, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_6__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_14__.MatRow, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTabGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.FormatDatePipe],
    styles: [".lti-wrapper[_ngcontent-%COMP%] {\n  padding: 20px 20px;\n}\n.lti-wrapper[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 20px;\n}\n.lti-wrapper[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%]   .info-message[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n\n.mat-table[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.mat-button-base[_ngcontent-%COMP%] {\n  float: right;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.base-fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  padding-top: 10px;\n}\n.base-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: calc(50% - 20px);\n  margin: 0 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYWRtaW4tcGFnZS9sdGktYWRtaW4vbHRpLWFkbWluLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUFDSjtBQUFJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBRVI7QUFEUTtFQUNJLHFCQUFBO0FBR1o7O0FBQ0E7RUFDSSxtQkFBQTtBQUVKOztBQUFBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFHSjs7QUFBQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFHSjtBQURJO0VBQ0ksdUJBQUE7RUFDQSxjQUFBO0FBR1IiLCJzb3VyY2VzQ29udGVudCI6WyIubHRpLXdyYXBwZXIge1xuICAgIHBhZGRpbmc6IDIwcHggMjBweDtcbiAgICBlcy1pbmZvLW1lc3NhZ2Uge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAuaW5mby1tZXNzYWdlIHtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5tYXQtdGFibGUge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG4ubWF0LWJ1dHRvbi1iYXNlIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYmFzZS1maWVsZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuXG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogY2FsYyg1MCUgLSAyMHB4KTtcbiAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 27371:
/*!***************************************************************************!*\
  !*** ./src/app/pages/admin-page/ltitool-admin/ltitool-admin.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LtitoolAdminComponent: () => (/* binding */ LtitoolAdminComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 21916);













function LtitoolAdminComponent_iframe_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "iframe", 16);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r0.ltiToolDynRegUrlSafe, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeResourceUrl"]);
  }
}
class LtitoolAdminComponent {
  constructor(sanitizer, toast, ltiPlatformService) {
    this.sanitizer = sanitizer;
    this.toast = toast;
    this.ltiPlatformService = ltiPlatformService;
    this.onRefreshAppList = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.showIframe = false;
    this.ltiToolDynRegUrl = '';
    //manual registration
    this.manualRegistrationData = {
      clientName: '',
      targetLinkUri: ''
    };
    LtitoolAdminComponent.staticRef = this;
  }
  ngOnInit() {
    let eventListener = function (event) {
      if (event.data.subject == 'org.imsglobal.lti.close') {
        LtitoolAdminComponent.staticRef.showIframe = false;
        LtitoolAdminComponent.staticRef.ltiToolDynRegUrlSafe = null;
        LtitoolAdminComponent.staticRef.onRefreshAppList.emit();
      }
    };
    window.addEventListener('message', eventListener);
  }
  register() {
    console.log('iframeSrc:' + this.ltiToolDynRegUrl);
    try {
      new URL(this.ltiToolDynRegUrl);
    } catch {
      this.toast.toast('Invalid Url');
      return;
    }
    let url = '/edu-sharing/rest/ltiplatform/v13/start-dynamic-registration?url=' + this.ltiToolDynRegUrl;
    this.ltiToolDynRegUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showIframe = true;
  }
  manualRegistration() {
    this.ltiPlatformService.manualRegistration({
      body: this.manualRegistrationData
    }).subscribe(s => {
      this.onRefreshAppList.emit();
    });
  }
  changeRedirectionUrl(event) {
    this.manualRegistrationData.redirectionUrls = Array.of(event.target.value);
  }
  static #_ = this.ɵfac = function LtitoolAdminComponent_Factory(t) {
    return new (t || LtitoolAdminComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_0__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_4__.LtiPlatformV13Service));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: LtitoolAdminComponent,
    selectors: [["es-ltitool-admin"]],
    outputs: {
      onRefreshAppList: "onRefreshAppList"
    },
    decls: 54,
    vars: 42,
    consts: [["mat-stretch-tabs", ""], [3, "label"], [1, "lti-wrapper"], ["mode", "info"], [1, "info-message"], [1, "base-fields"], ["floatLabel", "always"], ["matInput", "", "placeholder", "https://toolwithdynamicregistration.url", 3, "ngModel", "ngModelChange"], ["id", "btn-register", "mat-raised-button", "", "color", "primary", 3, "click"], [3, "src", 4, "ngIf"], ["matInput", "", "placeholder", "https://domain/tool/keyset", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "https://domain/tool/login", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "https://domain/tool/launch", 3, "change"], ["matInput", "", "placeholder", "https://domain/tool/launch", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Example Tool", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "src"]],
    template: function LtitoolAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tab-group", 0)(1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2)(4, "es-info-message", 3)(5, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "mat-form-field", 6)(10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LtitoolAdminComponent_Template_input_ngModelChange_13_listener($event) {
          return ctx.ltiToolDynRegUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LtitoolAdminComponent_Template_button_click_14_listener() {
          return ctx.register();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, LtitoolAdminComponent_iframe_17_Template, 1, 1, "iframe", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 2)(21, "es-info-message", 3)(22, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 5)(26, "mat-form-field", 6)(27, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](29, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LtitoolAdminComponent_Template_input_ngModelChange_30_listener($event) {
          return ctx.manualRegistrationData.keysetUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "mat-form-field", 6)(32, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](34, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LtitoolAdminComponent_Template_input_ngModelChange_35_listener($event) {
          return ctx.manualRegistrationData.loginInitiationUrl = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "mat-form-field", 6)(37, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](39, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function LtitoolAdminComponent_Template_input_change_40_listener($event) {
          return ctx.changeRedirectionUrl($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "mat-form-field", 6)(42, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](44, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LtitoolAdminComponent_Template_input_ngModelChange_45_listener($event) {
          return ctx.manualRegistrationData.targetLinkUri = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "mat-form-field", 6)(47, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](49, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function LtitoolAdminComponent_Template_input_ngModelChange_50_listener($event) {
          return ctx.manualRegistrationData.clientName = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LtitoolAdminComponent_Template_button_click_51_listener() {
          return ctx.manualRegistration();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](53, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 18, "ADMIN.LTI.DYNAMIC"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 20, "ADMIN.LTITOOL.DYNAMIC_INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](12, 22, "ADMIN.LTITOOL.DYNAMIC_URL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.ltiToolDynRegUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](16, 24, "ADMIN.LTITOOL.REGISTER"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showIframe);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](19, 26, "ADMIN.LTI.ADVANCED"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](24, 28, "ADMIN.LTITOOL.MANUAL_INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](29, 30, "ADMIN.LTITOOL.DATA.keysetUrl"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.manualRegistrationData.keysetUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](34, 32, "ADMIN.LTITOOL.DATA.loginInitiationUrl"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.manualRegistrationData.loginInitiationUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](39, 34, "ADMIN.LTITOOL.DATA.redirectionUrls"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](44, 36, "ADMIN.LTITOOL.DATA.targetLinkUri"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.manualRegistrationData.targetLinkUri);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](49, 38, "ADMIN.LTITOOL.DATA.clientName"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.manualRegistrationData.clientName);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](53, 40, "ADMIN.LTI.SAVE"), " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_1__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__.MatTabGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
    styles: [".lti-wrapper[_ngcontent-%COMP%] {\n  padding: 20px 20px;\n}\n.lti-wrapper[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 20px;\n}\n.lti-wrapper[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%]   .info-message[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n\n.mat-table[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.mat-button-base[_ngcontent-%COMP%] {\n  float: right;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.base-fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  padding-top: 10px;\n}\n.base-fields[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: calc(100% - 20px);\n  margin: 0 10px;\n}\n.base-fields[_ngcontent-%COMP%]   #btn-register[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n\niframe[_ngcontent-%COMP%] {\n  width: calc(100% - 0px);\n  border: 1px solid var(--primary);\n  margin-top: 20px;\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYWRtaW4tcGFnZS9sdGl0b29sLWFkbWluL2x0aXRvb2wtYWRtaW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFFUjtBQURRO0VBQ0kscUJBQUE7QUFHWjs7QUFDQTtFQUNJLG1CQUFBO0FBRUo7O0FBQUE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUdKOztBQUFBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUdKO0FBREk7RUFDSSx3QkFBQTtFQUNBLGNBQUE7QUFHUjtBQUFJO0VBQ0ksaUJBQUE7QUFFUjs7QUFDQTtFQUNJLHVCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUFFSiIsInNvdXJjZXNDb250ZW50IjpbIi5sdGktd3JhcHBlciB7XG4gICAgcGFkZGluZzogMjBweCAyMHB4O1xuICAgIGVzLWluZm8tbWVzc2FnZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIC5pbmZvLW1lc3NhZ2Uge1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgICAgICB9XG4gICAgfVxufVxuLm1hdC10YWJsZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cbi5tYXQtYnV0dG9uLWJhc2Uge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5iYXNlLWZpZWxkcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG5cbiAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcbiAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgfVxuXG4gICAgI2J0bi1yZWdpc3RlciB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIH1cbn1cbmlmcmFtZSB7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDBweCk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcHJpbWFyeSk7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBwYWRkaW5nOiAxMHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 89539:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/admin-page/lucene-template-memory/lucene-template-memory.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LuceneTemplateMemoryComponent: () => (/* binding */ LuceneTemplateMemoryComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/menu */ 78128);
















function LuceneTemplateMemoryComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LuceneTemplateMemoryComponent_button_2_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const template_r5 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.loadTemplate(template_r5.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", template_r5.key, " ");
  }
}
function LuceneTemplateMemoryComponent_es_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "es-card", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("onCancel", function LuceneTemplateMemoryComponent_es_card_4_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r8.closeNewTemplateDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 12)(3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function LuceneTemplateMemoryComponent_es_card_4_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r10.newTemplateName = $event);
    })("keydown.enter", function LuceneTemplateMemoryComponent_es_card_4_Template_input_keydown_enter_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      ctx_r11.createNewTemplate();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.preventDefault());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 5, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.NEW_BUTTON"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("buttons", ctx_r2.newTemplateDialogButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 7, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CHOOSE_NAME_TEXT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](9, 9, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CHOOSE_NAME_INPUT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r2.newTemplateName);
  }
}
const _c0 = function (a0) {
  return {
    template: a0
  };
};
function LuceneTemplateMemoryComponent_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LuceneTemplateMemoryComponent_button_21_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r12.confirmUpdateTemplate(ctx_r12.selectedTemplate));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r3.query === ctx_r3.templates[ctx_r3.selectedTemplate].query && ctx_r3.properties === ctx_r3.templates[ctx_r3.selectedTemplate].properties);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 2, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.UPDATE_BUTTON", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](5, _c0, ctx_r3.selectedTemplate)), " ");
  }
}
function LuceneTemplateMemoryComponent_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LuceneTemplateMemoryComponent_button_22_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r14.confirmDeleteTemplate(ctx_r14.selectedTemplate));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.DELETE_BUTTON", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](4, _c0, ctx_r4.selectedTemplate)), " ");
  }
}
class LuceneTemplateMemoryComponent {
  static #_ = this.STORAGE_KEY = 'admin_lucene_templates';
  static #_2 = this.DEFAULT_TEMPLATES = {
    GROUPS: {
      query: 'TYPE:"cm:authorityContainer"',
      properties: ['cm:authorityDisplayName', 'cm:authorityName', 'ccm:groupType', 'ccm:groupEmail', 'ccm:groupScope', 'ccm:groupSource'].join('\n'),
      isDefault: true
    },
    ORGS: {
      query: 'TYPE:"cm:authorityContainer"',
      properties: ['cm:authorityDisplayName', 'cm:authorityName', 'ccm:edu_homedir', 'ccm:groupType', 'ccm:groupEmail', 'ccm:groupScope', 'ccm:groupSource'].join('\n'),
      isDefault: true
    },
    PERSONS: {
      query: 'TYPE:"cm:person"',
      properties: ['cm:userName', 'cm:firstName', 'cm:lastName', 'cm:email', 'cm:esuid', 'cm:homeFolder', 'cm:esLastLogin'].join('\n'),
      isDefault: true
    },
    CREATED_CONTENTS_BY_PERSON: {
      query: '@cm\\:creator:"user" OR @cm\\:modifier:"user"',
      properties: ['sys:node-uuid', 'cm:name', 'cclom:title', 'cm:creator', 'cm:created', 'cm:modifier', 'cm:modified', 'cclom:general_keyword', 'ccm:comment_content'].join('\n'),
      isDefault: true
    },
    BROKEN_LINKS: {
      query: 'ISNOTNULL:"ccm:location_status" AND NOT @ccm\\:location_status:"200"',
      properties: ['sys:node-uuid', 'cm:name', 'cclom:title', 'cm:created', 'cm:modified', 'cclom:general_keyword', 'cclom:location', 'ccm:replicationsource', 'ccm:replicationsourceid'].join('\n'),
      isDefault: true
    }
  };
  constructor(dialogs, storage, toast, translate) {
    this.dialogs = dialogs;
    this.storage = storage;
    this.toast = toast;
    this.translate = translate;
    this.queryChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.propertiesChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.isNewTemplateDialogVisible = false;
    this.newTemplateDialogButtons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CLOSE', {
      color: 'standard'
    }, () => {
      this.closeNewTemplateDialog();
    }), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CREATE_BUTTON', {
      color: 'primary'
    }, () => this.createNewTemplate())];
    this.storage.get(LuceneTemplateMemoryComponent.STORAGE_KEY).subscribe(templates => {
      this.templates = templates ?? {};
      for (const key of Object.keys(LuceneTemplateMemoryComponent.DEFAULT_TEMPLATES)) {
        this.templates[this.translate.instant('ADMIN.BROWSER.LUCENE_DEFAULT_TEMPLATES.' + key)] = LuceneTemplateMemoryComponent.DEFAULT_TEMPLATES[key];
      }
    });
  }
  ngOnInit() {}
  createNewTemplate() {
    if (!this.newTemplateName) {
      // Do nothing
    } else if (this.newTemplateName in this.templates) {
      if (this.templates[this.newTemplateName].isDefault) {
        this.toast.error(null, 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.DEFAULT_TEMPLATE_OVERRIDE');
        return;
      }
      this.confirmUpdateTemplate(this.newTemplateName).then(isUpdated => {
        if (isUpdated) {
          this.closeNewTemplateDialog();
        }
      });
    } else {
      this.templates[this.newTemplateName] = {
        query: this.query,
        properties: this.properties
      };
      this.updateStorage();
      this.selectedTemplate = this.newTemplateName;
      this.closeNewTemplateDialog();
    }
  }
  closeNewTemplateDialog() {
    this.isNewTemplateDialogVisible = false;
    this.newTemplateName = '';
  }
  loadTemplate(key) {
    this.selectedTemplate = key;
    this.query = this.templates[key].query;
    this.queryChange.emit(this.query);
    this.properties = this.templates[key].properties;
    this.propertiesChange.emit(this.properties);
  }
  confirmUpdateTemplate(template) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_UPDATE_TITLE',
        message: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_UPDATE_MESSAGE',
        messageParameters: {
          template
        },
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_UPDATE_BUTTON',
          config: {
            color: 'primary'
          }
        }]
      });
      const response = yield dialogRef.afterClosed().toPromise();
      if (response === 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_UPDATE_BUTTON') {
        _this.updateTemplate(template);
        return true;
      } else {
        return false;
      }
    })();
  }
  confirmDeleteTemplate(template) {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this2.dialogs.openGenericDialog({
        title: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_DELETE_TITLE',
        message: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_DELETE_MESSAGE',
        messageParameters: {
          template
        },
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_DELETE_BUTTON',
          config: {
            color: 'danger'
          }
        }]
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.CONFIRM_DELETE_BUTTON') {
          _this2.deleteTemplate(template);
        }
      });
    })();
  }
  updateTemplate(template) {
    this.templates[template] = {
      query: this.query,
      properties: this.properties
    };
    this.updateStorage();
  }
  deleteTemplate(template) {
    this.selectedTemplate = null;
    delete this.templates[template];
    this.updateStorage();
  }
  updateStorage() {
    const storeTemplates = {};
    Object.keys(this.templates).filter(t => !this.templates[t].isDefault).forEach(t => storeTemplates[t] = this.templates[t]);
    this.storage.set(LuceneTemplateMemoryComponent.STORAGE_KEY, storeTemplates);
  }
  static #_3 = this.ɵfac = function LuceneTemplateMemoryComponent_Factory(t) {
    return new (t || LuceneTemplateMemoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_2__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService));
  };
  static #_4 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: LuceneTemplateMemoryComponent,
    selectors: [["es-lucene-template-memory"]],
    inputs: {
      query: "query",
      properties: "properties"
    },
    outputs: {
      queryChange: "queryChange",
      propertiesChange: "propertiesChange"
    },
    decls: 23,
    vars: 22,
    consts: [[1, "mat-menu-template"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["height", "auto", 3, "title", "buttons", "onCancel", 4, "ngIf"], [1, "buttons"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", 3, "matMenuTriggerFor", "disabled"], ["esIcon", "arrow_drop_down", 1, "drop-down-arrow"], ["mat-raised-button", "", 3, "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", "color", "warn", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["height", "auto", 3, "title", "buttons", "onCancel"], [1, "modal-card-content"], ["matInput", "", 3, "ngModel", "ngModelChange", "keydown.enter"], ["mat-raised-button", "", 3, "disabled", "click"], ["mat-raised-button", "", "color", "warn", 3, "click"]],
    template: function LuceneTemplateMemoryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-menu", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, LuceneTemplateMemoryComponent_button_2_Template, 2, 1, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, LuceneTemplateMemoryComponent_es_card_4_Template, 11, 11, "es-card", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "fieldset")(6, "legend");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-hint");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 4)(13, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LuceneTemplateMemoryComponent_Template_button_click_13_listener() {
          return ctx.isNewTemplateDialogVisible = true;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](21, LuceneTemplateMemoryComponent_button_21_Template, 3, 7, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, LuceneTemplateMemoryComponent_button_22_Template, 3, 6, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 10, ctx.templates));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isNewTemplateDialogVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 12, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.GROUP_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 14, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.HINT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 16, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.NEW_BUTTON"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matMenuTriggerFor", _r0)("disabled", !ctx.templates || _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](17, 18, ctx.templates) === "{}");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](19, 20, "ADMIN.BROWSER.LUCENE_TEMPLATE_MEMORY.LOAD_BUTTON"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTemplate && !ctx.templates[ctx.selectedTemplate].isDefault);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTemplate && !ctx.templates[ctx.selectedTemplate].isDefault);
      }
    },
    dependencies: [_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__.MatMenuTrigger, _angular_common__WEBPACK_IMPORTED_MODULE_7__.JsonPipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.KeyValuePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
    styles: [".modal-card-content[_ngcontent-%COMP%] {\n  padding: 0 25px;\n}\n.modal-card-content[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n  .mat-menu-template {\n  max-width: 400px;\n}\n\nfieldset[_ngcontent-%COMP%] {\n  border: none;\n}\nfieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  padding-bottom: 0.25em;\n}\nfieldset[_ngcontent-%COMP%]   .mat-hint[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.25em;\n}\nfieldset[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\nfieldset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\nfieldset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:last-of-type) {\n  margin-right: 20px;\n}\nfieldset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .drop-down-arrow[_ngcontent-%COMP%] {\n  margin-right: -10px;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYWRtaW4tcGFnZS9sdWNlbmUtdGVtcGxhdGUtbWVtb3J5L2x1Y2VuZS10ZW1wbGF0ZS1tZW1vcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0FBQ0o7QUFBSTtFQUNJLFdBQUE7QUFFUjs7QUFDQTtFQUNJLGdCQUFBO0FBRUo7O0FBQ0E7RUFDSSxZQUFBO0FBRUo7QUFESTtFQUNJLHNCQUFBO0FBR1I7QUFESTtFQUNJLGNBQUE7RUFDQSxxQkFBQTtBQUdSO0FBREk7RUFDSSxlQUFBO0FBR1I7QUFESTtFQUNJLG1CQUFBO0FBR1I7QUFGUTtFQUNJLGtCQUFBO0FBSVo7QUFGUTtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7QUFJWiIsInNvdXJjZXNDb250ZW50IjpbIi5tb2RhbC1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDAgMjVweDtcbiAgICAubWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG46Om5nLWRlZXAgLm1hdC1tZW51LXRlbXBsYXRlIHtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG5maWVsZHNldCB7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGxlZ2VuZCB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwLjI1ZW07XG4gICAgfVxuICAgIC5tYXQtaGludCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjI1ZW07XG4gICAgfVxuICAgIC5idXR0b25zIHtcbiAgICAgICAgcGFkZGluZzogMTBweCAwO1xuICAgIH1cbiAgICBidXR0b24ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAmOm5vdCg6bGFzdC1vZi10eXBlKSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmRyb3AtZG93bi1hcnJvdyB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IC0xMHB4O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 11021:
/*!***********************************************************************!*\
  !*** ./src/app/pages/admin-page/mediacenter/mediacenter.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminMediacenterComponent: () => (/* binding */ AdminMediacenterComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/csv.helper */ 83848);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/components/authority-search-input/authority-search-input.component */ 68504);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_options_helper_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/options-helper.service */ 61396);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../features/mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../statistics/statistics.component */ 52324);


































const _c0 = ["mediacenterMds"];
const _c1 = ["nodeEntriesTable"];
const _c2 = ["groupEntriesTable"];
function AdminMediacenterComponent_es_spinner_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "es-spinner");
  }
}
function AdminMediacenterComponent_div_6_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "mat-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mediacenter_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", mediacenter_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](mediacenter_r7.profile.displayName);
  }
}
function AdminMediacenterComponent_div_6_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_6_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r8.addMediacenter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](3, 1, "ADMIN.MEDIACENTER.ADD_MEDIACENTER"), " ");
  }
}
function AdminMediacenterComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 6)(1, "mat-form-field", 7)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "mat-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_6_Template_mat_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r10.setMediacenter($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](6, AdminMediacenterComponent_div_6_mat_option_6_Template, 2, 2, "mat-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](7, AdminMediacenterComponent_div_6_button_7_Template, 4, 3, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](4, 4, "ADMIN.MEDIACENTER.SELECT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngModel", ctx_r1.currentMediacenter);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx_r1.mediacenters);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r1.isAdmin);
  }
}
function AdminMediacenterComponent_div_7_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 1, "ADMIN.MEDIACENTER.DATA.ACTIVATE.STATUS_ACTIVE"), " ");
  }
}
function AdminMediacenterComponent_div_7_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 1, "ADMIN.MEDIACENTER.DATA.ACTIVATE.STATUS_INACTIVE"), " ");
  }
}
const _c3 = function (a0) {
  return {
    id: a0
  };
};
function AdminMediacenterComponent_div_7_div_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div")(1, "h5", 48)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_div_51_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r26);
      const catalog_r23 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r25.removeCatalog(catalog_r23));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](6, "i", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 51)(8, "mat-form-field")(9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](12, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_div_51_Template_input_ngModelChange_12_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r26);
      const catalog_r23 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](catalog_r23.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "mat-form-field")(14, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_div_51_Template_input_ngModelChange_17_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r26);
      const catalog_r23 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](catalog_r23.url = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const catalog_r23 = ctx.$implicit;
    const i_r24 = ctx.index;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind2"](4, 7, "ADMIN.MEDIACENTER.DATA.CATALOGS", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](14, _c3, i_r24 + 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 10, "ADMIN.MEDIACENTER.DATA.CATALOG.name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r14.hasManagePermissions)("ngModel", catalog_r23.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 12, "ADMIN.MEDIACENTER.DATA.CATALOG.url"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r14.hasManagePermissions)("ngModel", catalog_r23.url);
  }
}
function AdminMediacenterComponent_div_7_h6_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "h6", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 1, "ADMIN.MEDIACENTER.DATA.EDIT_NOT_ALLOWED"), " ");
  }
}
function AdminMediacenterComponent_div_7_button_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_button_58_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r29.saveChanges());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 1, "ADMIN.MEDIACENTER.SAVE"), " ");
  }
}
function AdminMediacenterComponent_div_7_button_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_button_59_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r31.deleteMediacenter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 1, "ADMIN.MEDIACENTER.DELETE"), " ");
  }
}
const _c4 = function (a0) {
  return {
    name: a0
  };
};
function AdminMediacenterComponent_div_7_ng_container_66_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_ng_container_66_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r34.addCurrentGroup());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind2"](3, 1, "ADMIN.MEDIACENTER.GROUPS.ADD", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](4, _c4, ctx_r33.addGroup.profile.displayName)), " ");
  }
}
function AdminMediacenterComponent_div_7_ng_container_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "es-authority-search-input", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("onChooseAuthority", function AdminMediacenterComponent_div_7_ng_container_66_Template_es_authority_search_input_onChooseAuthority_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r36.addGroup = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](2, AdminMediacenterComponent_div_7_ng_container_66_button_2_Template, 4, 6, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("mode", ctx_r18.AuthoritySearchMode.Organizations)("showRecent", false)("globalSearchAllowed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r18.addGroup);
  }
}
function AdminMediacenterComponent_div_7_es_admin_statistics_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "es-admin-statistics", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("onOpenNode", function AdminMediacenterComponent_div_7_es_admin_statistics_92_Template_es_admin_statistics_onOpenNode_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r38.onOpenNode.emit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("mediacenter", ctx_r22.currentMediacenter);
  }
}
const _c5 = function () {
  return {};
};
function AdminMediacenterComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 14)(1, "h4", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "mat-tab-group", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("selectedIndexChange", function AdminMediacenterComponent_div_7_Template_mat_tab_group_selectedIndexChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r40.currentTab = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "div", 18)(9, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](12, AdminMediacenterComponent_div_7_ng_container_12_Template, 3, 3, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](13, AdminMediacenterComponent_div_7_ng_container_13_Template, 3, 3, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "mat-radio-group", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_mat_radio_group_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r42.currentMediacenterCopy.profile.mediacenter.contentStatus = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](18, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](21, "mat-radio-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](24, "div", 24)(25, "mat-form-field")(26, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](28, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](29, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r43.currentMediacenterCopy.profile.mediacenter.id = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](30, "mat-form-field")(31, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](34, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_34_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r44.currentMediacenterCopy.profile.mediacenter.location = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](35, "mat-form-field")(36, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](38, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](39, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_39_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r45.currentMediacenterCopy.profile.mediacenter.districtAbbreviation = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](40, "mat-form-field")(41, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](43, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](44, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_44_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r46.currentMediacenterCopy.profile.displayName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](45, "mat-form-field")(46, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](48, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](49, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_49_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r47.currentMediacenterCopy.profile.mediacenter.mainUrl = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](50, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](51, AdminMediacenterComponent_div_7_div_51_Template, 18, 16, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](52, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_Template_button_click_52_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r48.addCatalog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](53, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](54);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](55, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](56, AdminMediacenterComponent_div_7_h6_56_Template, 3, 3, "h6", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](57, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](58, AdminMediacenterComponent_div_7_button_58_Template, 3, 3, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](59, AdminMediacenterComponent_div_7_button_59_Template, 3, 3, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](60, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](61, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](62, "div", 32)(63, "h6", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](64);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](65, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](66, AdminMediacenterComponent_div_7_ng_container_66_Template, 3, 4, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](67, "es-node-entries-wrapper", 34, 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](69, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](70, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](71, "div", 36)(72, "div", 37)(73, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_Template_button_click_73_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r49.exportNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](74, "i", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](75);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](76, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](77, "es-mds-editor-wrapper", 40, 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("onMdsLoaded", function AdminMediacenterComponent_div_7_Template_es_mds_editor_wrapper_onMdsLoaded_77_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r50.searchMediaCenterNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](79, "mat-form-field", 42)(80, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](81);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](82, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](83, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_7_Template_input_ngModelChange_83_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r51.mediacenterNodesSearchWord = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](84, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_7_Template_button_click_84_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r52.searchMediaCenterNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](85, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](86);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](87, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](88, "es-node-entries-wrapper", 45, 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("clickItem", function AdminMediacenterComponent_div_7_Template_es_node_entries_wrapper_clickItem_88_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r53.onOpenNode.emit($event.element));
    })("sortChange", function AdminMediacenterComponent_div_7_Template_es_node_entries_wrapper_sortChange_88_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r54.setMediacenterNodesSort($event));
    })("fetchData", function AdminMediacenterComponent_div_7_Template_es_node_entries_wrapper_fetchData_88_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r41);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r55.loadMediacenterNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](90, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](91, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](92, AdminMediacenterComponent_div_7_es_admin_statistics_92_Template, 1, 1, "es-admin-statistics", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](4, 56, ctx_r2.currentMediacenterCopy.profile.displayName), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("selectedIndex", ctx_r2.currentTab);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](7, 58, "ADMIN.MEDIACENTER.DATA.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 60, "ADMIN.MEDIACENTER.DATA.ACTIVATE.STATUS_PREFIX"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.currentMediacenter.profile.mediacenter.contentStatus === "Activated");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.currentMediacenter.profile.mediacenter.contentStatus === "Deactivated");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 62, "ADMIN.MEDIACENTER.DATA.ACTIVATE.LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngModel", ctx_r2.currentMediacenterCopy.profile.mediacenter.contentStatus)("disabled", !ctx_r2.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](20, 64, "ADMIN.MEDIACENTER.DATA.ACTIVATE.OPTION_ACTIVATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](23, 66, "ADMIN.MEDIACENTER.DATA.ACTIVATE.OPTION_DEACTIVATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](28, 68, "ADMIN.MEDIACENTER.DATA.id"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.isAdmin)("ngModel", ctx_r2.currentMediacenterCopy.profile.mediacenter.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](33, 70, "ADMIN.MEDIACENTER.DATA.location"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.hasManagePermissions)("ngModel", ctx_r2.currentMediacenterCopy.profile.mediacenter.location);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](38, 72, "ADMIN.MEDIACENTER.DATA.districtAbbreviation"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.hasManagePermissions)("ngModel", ctx_r2.currentMediacenterCopy.profile.mediacenter.districtAbbreviation);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](43, 74, "ADMIN.MEDIACENTER.DATA.shortName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.hasManagePermissions)("ngModel", ctx_r2.currentMediacenterCopy.profile.displayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](48, 76, "ADMIN.MEDIACENTER.DATA.mainUrl"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.hasManagePermissions)("ngModel", ctx_r2.currentMediacenterCopy.profile.mediacenter.mainUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx_r2.currentMediacenterCopy.profile.mediacenter.catalogs);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", !ctx_r2.hasManagePermissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](55, 78, "ADMIN.MEDIACENTER.DATA.ADD_CATALOG"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx_r2.hasManagePermissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.hasManagePermissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](61, 80, "ADMIN.MEDIACENTER.GROUPS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](65, 82, "ADMIN.MEDIACENTER.GROUPS.DESCRIPTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.hasManagePermissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dataSource", ctx_r2.mediacenterGroups)("columns", ctx_r2.groupColumns)("displayType", ctx_r2.NodeEntriesDisplayType.Table)("checkbox", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](70, 84, "ADMIN.MEDIACENTER.NODES.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](76, 86, "ADMIN.MEDIACENTER.NODES.CSV_EXPORT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("embedded", true)("currentValues", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](94, _c5));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](82, 88, "ADMIN.MEDIACENTER.NODES.SEARCHWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngModel", ctx_r2.mediacenterNodesSearchWord);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](87, 90, "ADMIN.MEDIACENTER.NODES.FILTER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dataSource", ctx_r2.mediacenterNodesDataSource)("elementInteractionType", ctx_r2.InteractionType.Emitter)("displayType", ctx_r2.NodeEntriesDisplayType.Table)("scope", ctx_r2.SCOPES.MediacenterNodesList)("checkbox", false)("columns", ctx_r2.nodeColumns)("configureColumns", true)("sort", ctx_r2.mediacenterNodesSort);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](91, 92, "ADMIN.MEDIACENTER.STATISTICS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.currentTab === 3 && ctx_r2.currentMediacenter);
  }
}
function AdminMediacenterComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div")(1, "h4", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 56)(6, "input", 57, 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function AdminMediacenterComponent_div_8_Template_input_change_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r59.updateMediacentersFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "div", 59)(9, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](7);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](_r56.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](12, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r62.importMediacenters());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "h4", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](18, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](21, "div", 56)(22, "input", 62, 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function AdminMediacenterComponent_div_8_Template_input_change_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r63.updateOrganisationsFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](24, "div", 59)(25, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](23);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](_r57.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](28, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](30, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r65.importOrganisations());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](33, "h4", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](34, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](36, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](37, "div", 56)(38, "input", 64, 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function AdminMediacenterComponent_div_8_Template_input_change_38_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r66.updateOrgMcFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](40, "div", 59)(41, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_41_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](39);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](_r58.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](43, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](44, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](46, "mat-checkbox", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function AdminMediacenterComponent_div_8_Template_mat_checkbox_ngModelChange_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r68.removeSchoolsFromMC = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](48, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](49, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function AdminMediacenterComponent_div_8_Template_button_click_49_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r60);
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r69.importOrgMc());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](51, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](4, 14, "ADMIN.MEDIACENTER.IMPORT.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 16, "ADMIN.MEDIACENTER.IMPORT.CHOOSE_MEDIACENTERS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r3.mediacentersFile ? ctx_r3.mediacentersFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 18, "ADMIN.MEDIACENTER.IMPORT.MEDIACENTERS_START"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](20, 20, "ADMIN.MEDIACENTER.ORGIMPORT.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](27, 22, "ADMIN.MEDIACENTER.ORGIMPORT.CHOOSE_ORGANISATIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r3.organisationsFile ? ctx_r3.organisationsFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](32, 24, "ADMIN.MEDIACENTER.ORGIMPORT.ORGANISATIONS_START"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](36, 26, "ADMIN.MEDIACENTER.ORG_MC_CONNECT.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](43, 28, "ADMIN.MEDIACENTER.ORG_MC_CONNECT.CHOOSE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r3.orgMcFile ? ctx_r3.orgMcFile.name : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngModel", ctx_r3.removeSchoolsFromMC);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](48, 30, "ADMIN.MEDIACENTER.ORG_MC_CONNECT.REMOVE_SCHOOLS_FROM_MC"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](51, 32, "ADMIN.MEDIACENTER.ORG_MC_CONNECT.ORGANISATIONS_START"), " ");
  }
}
function AdminMediacenterComponent_es_global_progress_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "es-global-progress");
  }
}
class AdminMediacenterComponent {
  get currentTab() {
    return this._currentTab;
  }
  set currentTab(currentTab) {
    var _this = this;
    this._currentTab = currentTab;
    this.nodeEntriesTable?.initOptionsGenerator({
      customOptions: {
        useDefaultOptions: true,
        supportedOptions: ['OPTIONS.DEBUG', 'OPTIONS.DOWNLOAD']
      }
    });
    this.groupEntriesTable?.initOptionsGenerator({
      customOptions: {
        useDefaultOptions: false
      }
    });
    if (this.isAdmin) {
      const remove = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('ADMIN.MEDIACENTER.GROUPS.REMOVE', 'delete', /*#__PURE__*/function () {
        var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (a) {
          const authority = _this.optionsHelperService.getObjects(a, _this.groupEntriesTable.optionsHelper.getData())[0];
          console.log(authority);
          const dialogRef = yield _this.dialogs.openGenericDialog({
            title: 'ADMIN.MEDIACENTER.GROUPS.REMOVE_TITLE',
            message: 'ADMIN.MEDIACENTER.GROUPS.REMOVE_MESSAGE',
            messageParameters: {
              name: authority.profile.displayName
            },
            buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__.YES_OR_NO
          });
          dialogRef.afterClosed().subscribe(response => {
            if (response === 'YES') {
              _this.deleteGroup(authority);
            }
          });
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      remove.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ElementType.Group];
      remove.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.Delete;
      this.groupEntriesTable?.initOptionsGenerator({
        customOptions: {
          useDefaultOptions: false,
          addOptions: [remove]
        }
      });
    }
  }
  constructor(mediacenterServiceLegacy, mediacenterService, mdsService, optionsHelperService, translate, connector, ngZone, dialogs, toast) {
    this.mediacenterServiceLegacy = mediacenterServiceLegacy;
    this.mediacenterService = mediacenterService;
    this.mdsService = mdsService;
    this.optionsHelperService = optionsHelperService;
    this.translate = translate;
    this.connector = connector;
    this.ngZone = ngZone;
    this.dialogs = dialogs;
    this.toast = toast;
    this.AuthoritySearchMode = _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_9__.AuthoritySearchMode;
    this.SCOPES = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.Scope;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.InteractionType;
    this.onOpenNode = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter();
    this.mediacenterGroups = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.mediacenterNodesDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.mediacenterNodesSearchWord = '';
    this.mediacenterNodesSort = {
      columns: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.POSSIBLE_SORT_BY_FIELDS,
      active: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.LOM_PROP_TITLE,
      direction: 'asc',
      allowed: true
    };
    this._currentTab = 0;
    this.globalProgress = false;
    this.removeSchoolsFromMC = false;
    this.isAdmin = this.connector.getCurrentLogin().isAdmin;
    this.hasManagePermissions = this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.TOOLPERMISSION_MEDIACENTER_MANAGE);
    this.refresh();
    this.mdsService.getSet().subscribe(mds => {
      this.nodeColumns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_4__.MdsHelper.getColumns(this.translate, mds, 'mediacenterManaged');
      this.groupColumns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_4__.MdsHelper.getColumns(this.translate, mds, 'mediacenterGroups');
    });
  }
  setMediacenter(mediacenter) {
    this.currentMediacenter = mediacenter;
    this.currentMediacenterCopy = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_3__.Helper.deepCopy(mediacenter);
    this.mediacenterGroups.reset();
    this.mediacenterGroups.isLoading = true;
    this.resetMediacenterNodes();
    if (mediacenter) {
      this.mediacenterServiceLegacy.getManagedGroups(mediacenter.authorityName).subscribe(groups => {
        this.mediacenterGroups.setData(groups.map(g => g.group));
        this.mediacenterGroups.isLoading = false;
      });
      this.mediacenterNodesDataSource.reset();
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_7__.UIHelper.waitForComponent(this.ngZone, this, 'mediacenterMds').subscribe(() => this.mediacenterMds.loadMds());
      // done via mds
      // this.loadMediacenterNodes();
    }
  }

  loadMediacenterNodes() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.mediacenterNodesDataSource.isEmpty() && !_this2.mediacenterNodesDataSource.hasMore()) {
        return;
      }
      if (_this2.currentMediacenter) {
        const licensedNodeReq = {
          offset: _this2.mediacenterNodesDataSource?.getData()?.length,
          count: _this2.mediacenterNodesDataSource?.getData()?.length ? 50 : null,
          propertyFilter: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.ALL],
          sortBy: [_this2.mediacenterNodesSort.active],
          sortAscending: [_this2.mediacenterNodesSort.direction === 'asc']
        };
        _this2.mediacenterNodesDataSource.isLoading = true;
        let criteria = yield _this2.getMediacenterNodesCriteria();
        _this2.mediacenterServiceLegacy.getLicensedNodes(_this2.currentMediacenter.authorityName, criteria, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.HOME_REPOSITORY, licensedNodeReq).subscribe(data => {
          if (_this2.mediacenterNodesDataSource.isEmpty() || _this2.mediacenterNodesSearchWord != null && _this2.mediacenterNodesSearchWord.trim().length > 0) {
            _this2.mediacenterNodesDataSource.setData(data.nodes, data.pagination);
          } else {
            _this2.mediacenterNodesDataSource.appendData(data.nodes);
          }
          _this2.mediacenterNodesDataSource.isLoading = false;
        });
      }
    })();
  }
  getMediacenterNodesCriteria() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let criteria = [];
      if (_this3.mediacenterNodesSearchWord) {
        criteria.push({
          property: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.PRIMARY_SEARCH_CRITERIA,
          values: [_this3.mediacenterNodesSearchWord]
        });
      }
      return criteria.concat(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestSearchService.convertCritierias(yield _this3.mediacenterMds.getValues(), _this3.mediacenterMds.currentWidgets));
    })();
  }
  searchMediaCenterNodes() {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.mediacenterNodesDataSource.reset();
      yield _this4.loadMediacenterNodes();
    })();
  }
  removeCatalog(catalog) {
    this.currentMediacenterCopy.profile.mediacenter.catalogs.splice(this.currentMediacenterCopy.profile.mediacenter.catalogs.indexOf(catalog), 1);
  }
  addCatalog() {
    if (!this.currentMediacenterCopy.profile.mediacenter.catalogs) {
      this.currentMediacenterCopy.profile.mediacenter.catalogs = [];
    }
    this.currentMediacenterCopy.profile.mediacenter.catalogs.push({
      name: '',
      url: ''
    });
  }
  addMediacenter() {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this5.dialogs.openInputDialog({
        title: 'ADMIN.MEDIACENTER.ADD_MEDIACENTER_TITLE',
        message: 'ADMIN.MEDIACENTER.ADD_MEDIACENTER_MESSAGE',
        label: 'ADMIN.MEDIACENTER.ADD_MEDIACENTER_LABEL'
      });
      const id = yield dialogRef.afterClosed().toPromise();
      if (id) {
        const profile = {
          displayName: _this5.translate.instant('ADMIN.MEDIACENTER.UNNAMED_MEDIACENTER', {
            id
          }),
          mediacenter: {
            id
          }
        };
        _this5.toast.showProgressSpinner();
        _this5.mediacenterServiceLegacy.addMediacenter(id, profile).subscribe(result => {
          _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_6__.RestHelper.waitForResult(() => _this5.mediacenterServiceLegacy.getMediacenters(), list => {
            return list.filter(r => r.authorityName === result.authorityName).length === 1;
          }, () => {
            _this5.toast.closeProgressSpinner();
            _this5.toast.toast('ADMIN.MEDIACENTER.CREATED', {
              name: id
            });
            _this5.setMediacenter(null);
            _this5.refresh();
          });
        }, error => {
          _this5.toast.error(error);
          _this5.toast.closeProgressSpinner();
        });
      }
    })();
  }
  saveChanges() {
    this.toast.showProgressSpinner();
    this.mediacenterServiceLegacy.editMediacenter(this.currentMediacenterCopy.authorityName, this.currentMediacenterCopy.profile).subscribe(() => {
      this.toast.toast('ADMIN.MEDIACENTER.UPDATED', {
        name: this.currentMediacenterCopy.profile.displayName
      });
      this.toast.closeProgressSpinner();
      this.refresh();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
      this.refresh();
    });
  }
  refresh() {
    this.mediacenters = null;
    this.mediacenterServiceLegacy.getMediacenters().subscribe(m => {
      this.mediacenters = m.filter(m => m.administrationAccess);
    });
  }
  addCurrentGroup() {
    this.toast.showProgressSpinner();
    this.mediacenterServiceLegacy.addManagedGroup(this.currentMediacenterCopy.authorityName, this.addGroup.authorityName).subscribe(groups => {
      this.mediacenterGroups.setData(groups.map(g => g.group));
      this.toast.toast('ADMIN.MEDIACENTER.GROUPS.ADDED', {
        name: this.addGroup.profile.displayName
      });
      this.toast.closeProgressSpinner();
      this.addGroup = null;
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
    });
  }
  deleteMediacenter() {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this6.dialogs.openGenericDialog({
        title: 'ADMIN.MEDIACENTER.DELETE_TITLE',
        message: 'ADMIN.MEDIACENTER.DELETE_MESSAGE',
        messageParameters: {
          name: _this6.currentMediacenterCopy.profile.displayName
        },
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__.YES_OR_NO
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'YES') {
          _this6.toast.showProgressSpinner();
          _this6.mediacenterServiceLegacy.deleteMediacenter(_this6.currentMediacenter.authorityName).subscribe(() => {
            _this6.toast.closeProgressSpinner();
            _this6.toast.toast('ADMIN.MEDIACENTER.DELETED', {
              name: _this6.currentMediacenterCopy.profile.displayName
            });
            _this6.setMediacenter(null);
            _this6.refresh();
          }, error => {
            _this6.toast.error(error);
            _this6.toast.closeProgressSpinner();
          });
        }
      });
    })();
  }
  deleteGroup(authority) {
    this.toast.showProgressSpinner();
    this.mediacenterServiceLegacy.removeManagedGroup(this.currentMediacenterCopy.authorityName, authority.authorityName).subscribe(groups => {
      this.mediacenterGroups.setData(groups.map(g => g.group));
      this.toast.toast('ADMIN.MEDIACENTER.GROUPS.REMOVED', {
        name: authority.profile.displayName
      });
      this.toast.closeProgressSpinner();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
    });
  }
  updateMediacentersFile(event) {
    this.mediacentersFile = event.target.files[0];
  }
  updateOrganisationsFile(event) {
    this.organisationsFile = event.target.files[0];
  }
  updateOrgMcFile(event) {
    this.orgMcFile = event.target.files[0];
  }
  importMediacenters() {
    if (!this.mediacentersFile) {
      this.toast.error(null, 'ADMIN.MEDIACENTER.IMPORT.CHOOSE_MEDIACENTERS');
      return;
    }
    this.globalProgress = true;
    this.mediacenterServiceLegacy.importMediacenters(this.mediacentersFile).subscribe(data => {
      this.toast.toast('ADMIN.MEDIACENTER.IMPORT.IMPORTED', {
        rows: data.rows
      });
      this.globalProgress = false;
      this.mediacentersFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  importOrganisations() {
    if (!this.organisationsFile) {
      this.toast.error(null, 'ADMIN.MEDIACENTER.ORGIMPORT.CHOOSE_ORGANISATIONS');
      return;
    }
    this.globalProgress = true;
    this.mediacenterServiceLegacy.importOrganisations(this.organisationsFile).subscribe(data => {
      this.toast.toast('ADMIN.MEDIACENTER.ORGIMPORT.IMPORTED', {
        rows: data.rows
      });
      this.globalProgress = false;
      this.organisationsFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  // importMcOrgConnections
  importOrgMc() {
    if (!this.orgMcFile) {
      this.toast.error(null, 'ADMIN.MEDIACENTER.ORG_MC_CONNECT.CHOOSE');
      return;
    }
    this.globalProgress = true;
    this.mediacenterServiceLegacy.importMcOrgConnections(this.orgMcFile, this.removeSchoolsFromMC).subscribe(data => {
      this.toast.toast('ADMIN.MEDIACENTER.ORG_MC_CONNECT.IMPORTED', {
        rows: data.rows
      });
      this.globalProgress = false;
      this.orgMcFile = null;
    }, error => {
      this.toast.error(error);
      this.globalProgress = false;
    });
  }
  setMediacenterNodesSort(sort) {
    this.mediacenterNodesSort = sort;
    this.resetMediacenterNodes();
    this.loadMediacenterNodes();
  }
  resetMediacenterNodes() {
    this.mediacenterNodesDataSource.reset();
  }
  exportNodes() {
    var _this7 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const properties = _this7.nodeColumns.map(c => c.name).filter(n => n !== 'ccm:mediacenter');
      const propertiesLabel = properties.map(p => _this7.translate.instant('NODE.' + p));
      _this7.toast.showProgressSpinner();
      const data = yield _this7.mediacenterService.exportMediacenterLicensedNodes({
        repository: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.HOME_REPOSITORY,
        mediacenter: _this7.currentMediacenter.authorityName,
        sortProperties: [_this7.mediacenterNodesSort.active],
        sortAscending: [_this7.mediacenterNodesSort.direction === 'asc'],
        body: {
          criteria: yield _this7.getMediacenterNodesCriteria()
        },
        properties
      }).toPromise();
      _this7.toast.closeProgressSpinner();
      data.forEach(d => {
        Object.keys(d).filter(c => _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_5__.RestConstants.getAllVCardFields().includes(c)).forEach(c => {
          d[c] = d[c]?.map(d2 => new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.VCard(d2).getDisplayName());
        });
      });
      _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_2__.CsvHelper.download(yield _this7.translate.get('ADMIN.MEDIACENTER.NODES.CSV_FILENAME').toPromise(), propertiesLabel, data, properties);
    })();
  }
  static #_ = this.ɵfac = function AdminMediacenterComponent_Factory(t) {
    return new (t || AdminMediacenterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMediacenterService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__.MediacenterService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_services_options_helper_service__WEBPACK_IMPORTED_MODULE_10__.OptionsHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_11__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_12__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
    type: AdminMediacenterComponent,
    selectors: [["es-admin-mediacenter"]],
    viewQuery: function AdminMediacenterComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.mediacenterMds = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.nodeEntriesTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.groupEntriesTable = _t.first);
      }
    },
    outputs: {
      onOpenNode: "onOpenNode"
    },
    decls: 10,
    vars: 8,
    consts: [[1, "mediacenters"], [1, "mat-heading-4", "mat-heading-underline"], ["esIcon", "list"], [4, "ngIf"], ["class", "select-mediacenter", 4, "ngIf"], ["class", "mediacenter-actions", 4, "ngIf"], [1, "select-mediacenter"], [1, "mediacenter"], ["id", "type", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], [3, "value"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["esIcon", "add"], [1, "mediacenter-actions"], ["esIcon", "business"], ["mat-stretch-tabs", "", 3, "selectedIndex", "selectedIndexChange"], [3, "label"], [1, "base-data"], [1, "status"], ["id", "activate-label"], ["aria-labelledby", "activate-label", 1, "activate-group", 3, "ngModel", "disabled", "ngModelChange"], ["value", "Activated"], ["value", "Deactivated"], [1, "base-fields"], ["matInput", "", 3, "disabled", "ngModel", "ngModelChange"], [1, "data-catalogs"], [4, "ngFor", "ngForOf"], ["mat-button", "", "color", "primary", 3, "disabled", "click"], ["class", "mat-heading-6 edit-not-allowed", 4, "ngIf"], [1, "actions"], ["mat-raised-button", "", "color", "warn", 3, "click", 4, "ngIf"], [1, "groups"], [1, "mat-heading-6"], [3, "dataSource", "columns", "displayType", "checkbox"], ["groupEntriesTable", ""], [1, "nodes"], [1, "export"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["esIcon", "cloud_download"], ["mode", "search", "editorMode", "search", "groupId", "mediacenter_filter", 3, "embedded", "currentValues", "onMdsLoaded"], ["mediacenterMds", ""], [1, "searchword"], ["matInput", "", 3, "ngModel", "ngModelChange"], ["esIcon", "search"], [3, "dataSource", "elementInteractionType", "displayType", "scope", "checkbox", "columns", "configureColumns", "sort", "clickItem", "sortChange", "fetchData"], ["nodeEntriesTable", ""], [3, "mediacenter", "onOpenNode", 4, "ngIf"], [1, "mat-heading-5", "mat-heading-underline"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["esIcon", "delete"], [1, "catalog-fields"], [1, "mat-heading-6", "edit-not-allowed"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["placeholder", "ADMIN.MEDIACENTER.GROUPS.ADD_LABEL", 3, "mode", "showRecent", "globalSearchAllowed", "onChooseAuthority"], [3, "mediacenter", "onOpenNode"], [1, "import"], ["type", "file", "id", "importMediacentersSelect", "accept", ".csv", 2, "display", "none", 3, "change"], ["importMediacentersSelect", ""], [1, "inputGroup"], ["mat-raised-button", "", 3, "click"], [1, "file"], ["type", "file", "id", "importOrganisationsSelect", "accept", ".csv", 2, "display", "none", 3, "change"], ["importOrganisationsSelect", ""], ["type", "file", "id", "importOrgMcSelect", "accept", ".csv", 2, "display", "none", 3, "change"], ["importOrgMcSelect", ""], [1, "example-margin", 3, "ngModel", "ngModelChange"]],
    template: function AdminMediacenterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](5, AdminMediacenterComponent_es_spinner_5_Template, 1, 0, "es-spinner", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](6, AdminMediacenterComponent_div_6_Template, 8, 6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](7, AdminMediacenterComponent_div_7_Template, 93, 95, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](8, AdminMediacenterComponent_div_8_Template, 52, 34, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](9, AdminMediacenterComponent_es_global_progress_9_Template, 1, 0, "es-global-progress", 3);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](4, 6, "ADMIN.MEDIACENTER.MANAGE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.mediacenters);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.mediacenters);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.mediacenters && ctx.currentMediacenterCopy);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.currentMediacenter && ctx.isAdmin);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.globalProgress);
      }
    },
    dependencies: [_shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_9__.AuthoritySearchInputComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgModel, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_13__.GlobalProgressComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_26__.MatInput, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_27__.MatRadioButton, _angular_material_select__WEBPACK_IMPORTED_MODULE_28__.MatSelect, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_29__.MatTabGroup, _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.MdsEditorWrapperComponent, _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_15__.AdminStatisticsComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%]     .mat-tab-body-wrapper {\n  padding: 20px;\n}\n[_nghost-%COMP%]     .mat-tab-body-wrapper .mat-tab-body, [_nghost-%COMP%]     .mat-tab-body-wrapper .mat-tab-body-content {\n  overflow: unset;\n}\n\n[_nghost-%COMP%]     es-admin-statistics .mat-tab-labels > div:nth-child(2) {\n  display: none;\n}\n\n.select-mediacenter[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n  align-items: center;\n}\n.select-mediacenter[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n}\n\n.base-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.base-data[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  font-size: 130%;\n  margin-top: 0;\n}\n.base-data[_ngcontent-%COMP%]   #activate-label[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.base-data[_ngcontent-%COMP%]   .activate-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 0.25em 10px 1.8em;\n}\n.base-data[_ngcontent-%COMP%]   .activate-group[_ngcontent-%COMP%]    > .mat-radio-button[_ngcontent-%COMP%] {\n  margin: 0.4em;\n}\n.base-data[_ngcontent-%COMP%]   .base-fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.base-data[_ngcontent-%COMP%]   .base-fields[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: calc(50% - 20px);\n  margin: 0 10px;\n}\n.base-data[_ngcontent-%COMP%]   .edit-not-allowed[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  display: flex;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%]   .catalog-fields[_ngcontent-%COMP%] {\n  display: flex;\n}\n.base-data[_ngcontent-%COMP%]   .data-catalogs[_ngcontent-%COMP%]   .catalog-fields[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.base-data[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n}\n.base-data[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n\n.groups[_ngcontent-%COMP%]    > h6[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\n.groups[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.import[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%] {\n  margin: 20px 0 20px 0;\n  flex-grow: 1;\n}\n.import[_ngcontent-%COMP%]   .inputGroup[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0 10px;\n}\n.import[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  margin-right: 1em;\n}\n\n.nodes[_ngcontent-%COMP%] {\n  max-width: calc(100vw - 250px - 100px);\n}\n.nodes[_ngcontent-%COMP%]   .export[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.nodes[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 67%;\n  margin-right: 2%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL21lZGlhY2VudGVyL21lZGlhY2VudGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDRkk7RUFDSSxhQUFBO0FBRFI7QUFFUTs7RUFFSSxlQUFBO0FBQVo7O0FBUVk7RUFDSSxhQUFBO0FBTGhCOztBQVVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBUEo7QUFRSTtFQUNJLFdBQUE7RUFDQSxnQkFBQTtBQU5SOztBQVNBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBTko7QUFPSTtFQUNJLGVBQUE7RUFDQSxhQUFBO0FBTFI7QUFPSTtFQUNJLGNBQUE7QUFMUjtBQU9JO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7QUFMUjtBQU1RO0VBQ0ksYUFBQTtBQUpaO0FBT0k7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQUxSO0FBTVE7RUFDSSx1QkFBQTtFQUNBLGNBQUE7QUFKWjtBQU9JO0VBQ0ksb0JBQUE7QUFMUjtBQU9JO0VBQ0ksa0JBQUE7QUFMUjtBQU1RO0VBQ0ksV0FBQTtBQUpaO0FBTVE7RUFDSSxhQUFBO0FBSlo7QUFLWTtFQUNJLFlBQUE7QUFIaEI7QUFNUTtFQUNJLGFBQUE7QUFKWjtBQUtZO0VBQ0ksY0FBQTtBQUhoQjtBQU9JO0VBQ0ksYUFBQTtBQUxSO0FBTVE7RUFDSSxjQUFBO0FBSlo7O0FBU0k7RUFDSSxlQUFBO0FBTlI7QUFRSTtFQUNJLG1CQUFBO0FBTlI7O0FBVUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFQSjtBQVFJO0VBQ0kscUJBQUE7RUFDQSxZQUFBO0FBTlI7QUFPUTtFQUNJLHFCQUFBO0VBQ0EsZUFBQTtBQUxaO0FBUUk7RUFDSSxpQkFBQTtBQU5SOztBQVVBO0VBQ0ksc0NBQUE7QUFQSjtBQVFJO0VBQ0ksYUFBQTtFQUNBLHlCQUFBO0FBTlI7QUFRSTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtBQU5SIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5AaW1wb3J0ICcuLi9hZG1pbi52YXJpYWJsZXMnO1xuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAubWF0LXRhYi1ib2R5LXdyYXBwZXIge1xuICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICAubWF0LXRhYi1ib2R5LFxuICAgICAgICAubWF0LXRhYi1ib2R5LWNvbnRlbnQge1xuICAgICAgICAgICAgb3ZlcmZsb3c6IHVuc2V0O1xuICAgICAgICB9XG4gICAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBlcy1hZG1pbi1zdGF0aXN0aWNzIHtcbiAgICAgICAgLm1hdC10YWItbGFiZWxzIHtcbiAgICAgICAgICAgIC8vIGhpZGUgXCJieSBjcml0ZXJpYVwiIHRhYiBpbiBzdGF0cyBmb3IgbXpcbiAgICAgICAgICAgID4gZGl2Om50aC1jaGlsZCgyKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi5zZWxlY3QtbWVkaWFjZW50ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgPiBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgIH1cbn1cbi5iYXNlLWRhdGEge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAuc3RhdHVzIHtcbiAgICAgICAgZm9udC1zaXplOiAxMzAlO1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cbiAgICAjYWN0aXZhdGUtbGFiZWwge1xuICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICB9XG4gICAgLmFjdGl2YXRlLWdyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWFyZ2luOiAwLjI1ZW0gMTBweCAxLjhlbTtcbiAgICAgICAgPiAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgICBtYXJnaW46IDAuNGVtO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5iYXNlLWZpZWxkcyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgPiBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgLSAyMHB4KTtcbiAgICAgICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5lZGl0LW5vdC1hbGxvd2VkIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5kYXRhLWNhdGFsb2dzIHtcbiAgICAgICAgcGFkZGluZzogMzBweCAyMHB4O1xuICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICBoNSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmNhdGFsb2ctZmllbGRzIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAuYWN0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgID4gYnV0dG9uIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuLmdyb3VwcyB7XG4gICAgPiBoNiB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICB9XG4gICAgPiBidXR0b24ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cbn1cblxuLmltcG9ydCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC5pbnB1dEdyb3VwIHtcbiAgICAgICAgbWFyZ2luOiAyMHB4IDAgMjBweCAwO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIC5maWxlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXQtY2hlY2tib3gge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDFlbTtcbiAgICB9XG59XG5cbi5ub2RlcyB7XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMHZ3IC0gI3skc2lkZW5hdldpZHRofSAtIDEwMHB4KTtcbiAgICAuZXhwb3J0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICB9XG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogNjclO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 81619:
/*!***************************************************************!*\
  !*** ./src/app/pages/admin-page/plugins/plugins.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPluginsComponent: () => (/* binding */ AdminPluginsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-admin.service */ 52598);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 21916);






const _c0 = function (a0) {
  return {
    fallback: a0
  };
};
function AdminPluginsComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div")(3, "div", 8)(4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](6, 6, "ADMIN.PLUGINS.PLUGIN_DETAILS." + p_r1.name + ".TITLE", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](16, _c0, p_r1.name)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](p_r1.version);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("state-enabled", p_r1.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 9, "ADMIN.PLUGINS." + (p_r1.enabled ? "ENABLED" : "DISABLED")), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](14, 11, "ADMIN.PLUGINS.PLUGIN_DETAILS." + p_r1.name + ".DESCRIPTION", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](18, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](15, 14, "ADMIN.PLUGINS.NO_DESCRIPTION"))), " ");
  }
}
class AdminPluginsComponent {
  constructor(adminService) {
    this.adminService = adminService;
    this.adminService.getPlugins().subscribe(plugins => {
      this.plugins = plugins;
    });
  }
  static #_ = this.ɵfac = function AdminPluginsComponent_Factory(t) {
    return new (t || AdminPluginsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_0__.RestAdminService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AdminPluginsComponent,
    selectors: [["app-admin-plugins"]],
    decls: 16,
    vars: 13,
    consts: [[1, "plugins"], [1, "mat-heading-3", "mat-heading-underline"], ["mode", "info"], [1, "plugin-list"], [4, "ngFor", "ngForOf"], [1, "more"], ["href", "https://edu-sharing.com/extensions/", "target", "_blank"], ["esIcon", "extension"], [1, "name-wrapper"], [1, "name"], [1, "version"], [1, "state"], [1, "description"]],
    template: function AdminPluginsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "es-info-message", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, AdminPluginsComponent_li_8_Template, 16, 20, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 5)(10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 5, "ADMIN.PLUGINS.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 7, "ADMIN.PLUGINS.INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.plugins);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](12, 9, "ADMIN.PLUGINS.MORE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](15, 11, "ADMIN.PLUGINS.MORE_LINK"));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.IconDirective, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_1__.InfoMessageComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
    styles: ["\n\n.plugins[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 800px;\n  margin: 0;\n  padding: 40px 0 0 0;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  display: grid;\n  grid-template-columns: 60px auto;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #aaa;\n  font-size: 40px;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #761532;\n  padding-bottom: 2px;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .state.state-enabled[_ngcontent-%COMP%] {\n  color: #267355;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .name-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding-bottom: 2px;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .name-wrapper[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 120%;\n  flex-grow: 1;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .name-wrapper[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%] {\n  text-align: right;\n  min-width: 20%;\n  color: var(--textLight);\n  font-size: 90%;\n}\n.plugins[_ngcontent-%COMP%]   .plugin-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.plugins[_ngcontent-%COMP%]   .more[_ngcontent-%COMP%] {\n  padding-top: 60px;\n  color: var(--textLight);\n  font-size: 90%;\n}\n.plugins[_ngcontent-%COMP%]   .more[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 2px 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL3BsdWdpbnMvcGx1Z2lucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0pBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFDSjtBQUFJO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBRVI7QUFEUTtFQUNJLGVBQUE7RUFDQSxhQUFBO0VBQ0EsZ0NBQUE7QUFHWjtBQUZZO0VBQ0ksV0RHQTtFQ0ZBLGVBQUE7QUFJaEI7QUFGWTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBSWhCO0FBSGdCO0VBQ0ksY0FBQTtBQUtwQjtBQUZZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFJaEI7QUFIZ0I7RUFDSSxpQkFBQTtFQUNBLGVEVkg7RUNXRyxZQUFBO0FBS3BCO0FBSGdCO0VBQ0ksaUJBQUE7RUFDQSxjQUFBO0VBQ0EsdUJEdEJSO0VDdUJRLGNBQUE7QUFLcEI7QUFEWTtFQUNJLHVCRDVCSjtBQytCWjtBQUNJO0VBQ0ksaUJBQUE7RUFDQSx1QkRsQ0k7RUNtQ0osY0QzQlE7QUM0QmhCO0FBQVE7RUFDSSxhQUFBO0FBRVoiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcbi5wbHVnaW5zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAucGx1Z2luLWxpc3Qge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LXdpZHRoOiA4MDBweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiA0MHB4IDAgMCAwO1xuICAgICAgICBsaSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA2MHB4IGF1dG87XG4gICAgICAgICAgICBpIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRWZXJ5TGlnaHQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA0MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnN0YXRlIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICAgICBjb2xvcjogZGFya2VuKCRjb2xvclN0YXR1c05lZ2F0aXZlLCAyMCUpO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAycHg7XG4gICAgICAgICAgICAgICAgJi5zdGF0ZS1lbmFibGVkIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3JTdGF0dXNQb3NpdGl2ZSwgMjAlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubmFtZS13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDJweDtcbiAgICAgICAgICAgICAgICAubmFtZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVhMYXJnZTtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudmVyc2lvbiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDIwJTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogOTAlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAubW9yZSB7XG4gICAgICAgIHBhZGRpbmctdG9wOiA2MHB4O1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVTbWFsbDtcbiAgICAgICAgPiBwIHtcbiAgICAgICAgICAgIG1hcmdpbjogMnB4IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 52324:
/*!*********************************************************************!*\
  !*** ./src/app/pages/admin-page/statistics/statistics.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminStatisticsComponent: () => (/* binding */ AdminStatisticsComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/csv.helper */ 83848);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! chart.js */ 17005);
/* harmony import */ var _core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-admin.service */ 52598);
/* harmony import */ var _core_module_rest_services_rest_statistics_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-statistics.service */ 99992);
/* harmony import */ var _core_module_rest_services_ui_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core-module/rest/services/ui.service */ 80723);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _core_module_rest_services_session_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core-module/rest/services/session-storage.service */ 26083);
/* harmony import */ var _core_module_rest_services_rest_connector_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-connector.service */ 61871);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _core_module_rest_services_configuration_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core-module/rest/services/configuration.service */ 14636);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/datepicker */ 82226);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/tabs */ 60989);




































const _c0 = ["groupedChart"];
function AdminStatisticsComponent_es_spinner_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "es-spinner");
  }
}
function AdminStatisticsComponent_h5_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h5", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.NO_DATA"), " ");
  }
}
function AdminStatisticsComponent_mat_option_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const templates_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("value", templates_r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 2, "ADMIN.STATISTICS.GROUP_TEMPLATE." + templates_r12.name), " ");
  }
}
function AdminStatisticsComponent_mat_radio_button_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-radio-button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("value", group_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 2, "ADMIN.STATISTICS.HEADERS." + group_r13));
  }
}
function AdminStatisticsComponent_mat_radio_button_70_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-radio-button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r14 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("value", group_r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", group_r14 == ctx_r5.customGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 3, "ADMIN.STATISTICS.HEADERS." + group_r14));
  }
}
function AdminStatisticsComponent_div_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 24)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "mat-radio-group", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_div_71_Template_mat_radio_group_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r15.customGroupMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "mat-radio-button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "mat-radio-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](3, 4, "ADMIN.STATISTICS.SINGLE_MODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r6.customGroupMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](7, 6, "ADMIN.STATISTICS.MODE_NODES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](10, 8, "ADMIN.STATISTICS.MODE_USERS"));
  }
}
function AdminStatisticsComponent_es_spinner_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "es-spinner");
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.HEADERS." + key_r20));
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2).$implicit;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r24.customGroupLabels[key_r20] || key_r20);
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_span_1_Template, 3, 3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_span_2_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", key_r20 === "action" || key_r20 === "count" || key_r20 == ctx_r21.customGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !(key_r20 === "action" || key_r20 === "count" || key_r20 == ctx_r21.customGroup));
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.ACTIONS." + element_r28[key_r20]));
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](element_r28[key_r20]);
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](element_r28.displayValue);
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](element_r28.entry.groups[element_r28["action"]] ? element_r28.entry.groups[element_r28["action"]][ctx_r32.customUnfold][key_r20] : 0);
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_1_Template, 3, 3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_2_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_3_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_span_4_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", key_r20 === "action");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", key_r20 === "count");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", key_r20 == ctx_r22.customGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !(key_r20 === "action" || key_r20 === "count" || key_r20 == ctx_r22.customGroup));
  }
}
function AdminStatisticsComponent_mat_table_85_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0, 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_header_cell_1_Template, 3, 2, "mat-header-cell", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, AdminStatisticsComponent_mat_table_85_ng_container_1_mat_cell_2_Template, 5, 4, "mat-cell", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const key_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("matColumnDef", key_r20);
  }
}
function AdminStatisticsComponent_mat_table_85_mat_header_row_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "mat-header-row");
  }
}
function AdminStatisticsComponent_mat_table_85_mat_row_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "mat-row", 45);
  }
}
function AdminStatisticsComponent_mat_table_85_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-table", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdminStatisticsComponent_mat_table_85_ng_container_1_Template, 3, 1, "ng-container", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, AdminStatisticsComponent_mat_table_85_mat_header_row_2_Template, 1, 0, "mat-header-row", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdminStatisticsComponent_mat_table_85_mat_row_3_Template, 1, 0, "mat-row", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("mat-table-clickable", ctx_r8.singleMode === "NODES");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dataSource", ctx_r8.customGroupData);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx_r8.customGroupRows);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("matHeaderRowDef", ctx_r8.customGroupRows)("matHeaderRowDefSticky", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("matRowDefColumns", ctx_r8.customGroupRows);
  }
}
function AdminStatisticsComponent_mat_tab_86_es_info_message_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-info-message");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.NODES_MEDIACENTER_INFO"), " ");
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div")(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "textarea", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_div_7_Template_textarea_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r50);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r49.exportProperties = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "div")(10, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_div_7_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r50);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r51.export());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("@overlay", ctx_r48.showExport);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](4, 5, "ADMIN.STATISTICS.EXPORT_PROPERTIES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r48.exportProperties);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](8, 7, "ADMIN.STATISTICS.EXPORT_PROPERTIES_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](12, 9, "ADMIN.STATISTICS.EXPORT"), " ");
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 50)(1, "h4", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_Template_h4_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r53);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r52.showExport = !ctx_r52.showExport);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](6, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](7, AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_div_7_Template, 13, 11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 3, "ADMIN.STATISTICS.EXPORT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("esIcon", "keyboard_arrow_" + (ctx_r44.showExport ? "up" : "down"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r44.showExport);
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_h5_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h5", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.NO_DATA"), " ");
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_es_node_entries_wrapper_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-node-entries-wrapper", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("clickItem", function AdminStatisticsComponent_mat_tab_86_ng_container_22_es_node_entries_wrapper_3_Template_es_node_entries_wrapper_clickItem_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r55);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r54.onOpenNode.emit($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("scope", ctx_r46.Scope.Admin)("dataSource", ctx_r46.nodesDataSource)("elementInteractionType", ctx_r46.InteractionType.Emitter)("checkbox", false)("displayType", ctx_r46.NodeEntriesDisplayType.Table)("columns", ctx_r46.columns);
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_es_info_message_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-info-message");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.SLICE_INFO_DOWNLOAD"), " ");
  }
}
function AdminStatisticsComponent_mat_tab_86_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdminStatisticsComponent_mat_tab_86_ng_container_22_div_1_Template, 8, 5, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, AdminStatisticsComponent_mat_tab_86_ng_container_22_h5_2_Template, 3, 3, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdminStatisticsComponent_mat_tab_86_ng_container_22_es_node_entries_wrapper_3_Template, 1, 6, "es-node-entries-wrapper", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, AdminStatisticsComponent_mat_tab_86_ng_container_22_es_info_message_4_Template, 3, 3, "es-info-message", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r43.nodesNoData && !(ctx_r43.nodesDataSource == null ? null : ctx_r43.nodesDataSource.isLoading));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r43.nodesNoData && !ctx_r43.nodesDataSource.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !(ctx_r43.nodesNoData && !ctx_r43.nodesDataSource.isLoading));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r43.nodesNoData);
  }
}
function AdminStatisticsComponent_mat_tab_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-tab", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "h4", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "i", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](6, AdminStatisticsComponent_mat_tab_86_es_info_message_6_Template, 3, 3, "es-info-message", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 4)(8, "div", 9)(9, "div")(10, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](13, "mat-calendar", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_mat_tab_86_Template_mat_calendar_selectedChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r56.nodesStart = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "div")(15, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](18, "mat-calendar", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_mat_tab_86_Template_mat_calendar_selectedChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r58.nodesEnd = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](19, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function AdminStatisticsComponent_mat_tab_86_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r59.refreshNodes());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](22, AdminStatisticsComponent_mat_tab_86_ng_container_22_Template, 5, 4, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 14, "ADMIN.STATISTICS.NODES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 16, "ADMIN.STATISTICS.NODES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r9._mediacenter);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("@overlay", !(ctx_r9.nodesDataSource == null ? null : ctx_r9.nodesDataSource.isLoading));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](12, 18, "ADMIN.STATISTICS.FROM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx_r9.nodesStart)("maxDate", ctx_r9.nodesEnd);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](17, 20, "ADMIN.STATISTICS.TO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx_r9.nodesEnd)("minDate", ctx_r9.nodesStart)("maxDate", ctx_r9.today);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r9.nodesDataSource == null ? null : ctx_r9.nodesDataSource.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](21, 22, "ADMIN.STATISTICS.NODES_APPLY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r9.nodesDataSource !== null);
  }
}
function AdminStatisticsComponent_mat_tab_87_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "ADMIN.STATISTICS.ARCHIVED_EMPTY"), " ");
  }
}
function AdminStatisticsComponent_mat_tab_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-tab", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "h4", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "i", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "div", 58)(7, "es-info-message", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "es-node-entries-wrapper", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("clickItem", function AdminStatisticsComponent_mat_tab_87_Template_es_node_entries_wrapper_clickItem_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r63);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r62.downloadArchivedNode($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](11, AdminStatisticsComponent_mat_tab_87_ng_template_11_Template, 3, 3, "ng-template", null, 61, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 8, "ADMIN.STATISTICS.ARCHIVED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 10, "ADMIN.STATISTICS.ARCHIVED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 12, "ADMIN.STATISTICS.ARCHIVED_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("elementInteractionType", ctx_r10.InteractionType.Emitter)("displayType", ctx_r10.NodeEntriesDisplayType.Table)("dataSource", ctx_r10.archivedNodesDataSource)("checkbox", false)("columns", ctx_r10.archivedNodesColumns);
  }
}
function AdminStatisticsComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 50)(1, "h4", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "div")(6, "div")(7, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function AdminStatisticsComponent_div_88_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r65);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r64.export());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](4, 2, "ADMIN.STATISTICS.EXPORT_LABEL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 4, "ADMIN.STATISTICS.EXPORT"), " ");
  }
}
chart_js__WEBPACK_IMPORTED_MODULE_16__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_16__.BarController, chart_js__WEBPACK_IMPORTED_MODULE_16__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_16__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_16__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_16__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_16__.Legend, chart_js__WEBPACK_IMPORTED_MODULE_16__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_16__.Title);
class AdminStatisticsComponent {
  set mediacenter(mediacenter) {
    this._mediacenter = mediacenter;
    this.refresh();
  }
  static #_ = this.DAY_OFFSET = 1000 * 60 * 60 * 24;
  static #_2 = this.DEFAULT_OFFSET = AdminStatisticsComponent.DAY_OFFSET * 7; // 7 days
  static #_3 = this.DEFAULT_OFFSET_SINGLE = AdminStatisticsComponent.DAY_OFFSET * 3; // 3 days
  set groupedStart(groupedStart) {
    this._groupedStart = groupedStart;
    this._groupedStart.setHours(0, 0, 0);
    this.refreshGroups();
  }
  get groupedStart() {
    return this._groupedStart;
  }
  set groupedEnd(groupedEnd) {
    this._groupedEnd = groupedEnd;
    this._groupedEnd.setHours(23, 59, 59);
    this.refreshGroups();
  }
  get groupedEnd() {
    return this._groupedEnd;
  }
  set groupedMode(groupedMode) {
    this._groupedMode = groupedMode;
    this.refreshGroups();
  }
  get groupedMode() {
    return this._groupedMode;
  }
  set customGroupStart(customGroupStart) {
    this._customGroupStart = customGroupStart;
    this._customGroupStart.setHours(0, 0, 0);
    this.refreshCustomGroups();
  }
  get customGroupStart() {
    return this._customGroupStart;
  }
  set customGroupEnd(customGroupEnd) {
    this._customGroupEnd = customGroupEnd;
    this._customGroupEnd.setHours(23, 59, 59);
    this.refreshCustomGroups();
  }
  get customGroupEnd() {
    return this._customGroupEnd;
  }
  set customGroup(customGroup) {
    this._customGroup = customGroup;
    if (this.customGroup == this.customUnfold) this.customUnfold = null;
    this.refreshCustomGroups();
  }
  get customGroup() {
    return this._customGroup;
  }
  set customGroupMode(customGroupMode) {
    this._customGroupMode = customGroupMode;
    this.refreshCustomGroups();
  }
  get customGroupMode() {
    return this._customGroupMode;
  }
  set customUnfold(customUnfold) {
    this._customUnfold = customUnfold;
    this.refreshCustomGroups();
  }
  get customUnfold() {
    return this._customUnfold;
  }
  set singleStart(singleStart) {
    this._singleStart = singleStart;
    this._singleStart.setHours(0, 0, 0);
    this.refreshSingle();
  }
  get singleStart() {
    return this._singleStart;
  }
  set singleEnd(singleEnd) {
    this._singleEnd = singleEnd;
    this._singleEnd.setHours(23, 59, 59);
    this.refreshSingle();
  }
  get singleEnd() {
    return this._singleEnd;
  }
  set singleMode(singleMode) {
    this._singleMode = singleMode;
    this.refreshSingle();
  }
  get singleMode() {
    return this._singleMode;
  }
  set nodesStart(nodesStart) {
    this._nodesStart = nodesStart;
    this._nodesStart.setHours(0, 0, 0);
    this.nodesDataSource = null;
  }
  get nodesStart() {
    return this._nodesStart;
  }
  set nodesEnd(nodesEnd) {
    this._nodesEnd = nodesEnd;
    this._nodesEnd.setHours(23, 59, 59);
    this.nodesDataSource = null;
  }
  get nodesEnd() {
    return this._nodesEnd;
  }
  constructor(admin, statistics, uiService, toast, storage, changeDetectorRef, applicationRef, connector, translate, searchService, config, nodeHelperService) {
    this.admin = admin;
    this.statistics = statistics;
    this.uiService = uiService;
    this.toast = toast;
    this.storage = storage;
    this.changeDetectorRef = changeDetectorRef;
    this.applicationRef = applicationRef;
    this.connector = connector;
    this.translate = translate;
    this.searchService = searchService;
    this.config = config;
    this.nodeHelperService = nodeHelperService;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.Scope;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.InteractionType;
    this.finishedPreload = false;
    this.onOpenNode = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter();
    this.today = new Date();
    this._groupedStart = new Date();
    this._groupedEnd = new Date();
    this._singleStart = new Date();
    this._singleEnd = new Date();
    this._customGroupStart = new Date();
    this._customGroupEnd = new Date();
    this._customUnfold = '';
    this._nodesStart = new Date();
    this._nodesEnd = new Date();
    this._groupedMode = 'Daily';
    this._singleMode = 'NODES';
    this._customGroupMode = 'NODES';
    this.nodesDataSource = null;
    this.currentTab = 0;
    this.showModes = false;
    this.archivedNodesDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.archivedNodesColumns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.LOM_PROP_TITLE)];
    this.initColumns();
    this.groupedStart = new Date(new Date().getTime() - AdminStatisticsComponent.DEFAULT_OFFSET);
    this.groupedEnd = new Date();
    this.singleStart = new Date(new Date().getTime() - AdminStatisticsComponent.DEFAULT_OFFSET_SINGLE);
    this.singleEnd = new Date();
    this.customGroupStart = new Date(new Date().getTime() - AdminStatisticsComponent.DEFAULT_OFFSET);
    this.customGroupEnd = new Date();
    this.nodesStart = new Date(new Date().getTime() - AdminStatisticsComponent.DEFAULT_OFFSET);
    this.nodesEnd = new Date();
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.groupModeTemplates = yield _this.config.get('admin.statistics.templates', [{
        name: 'group_organization',
        group: 'authority_organization'
      }, {
        name: 'group_mediacenter',
        group: 'authority_mediacenter'
      }, {
        name: 'group_organization_unfold_mediacenter',
        group: 'authority_organization',
        unfold: 'authority_mediacenter'
      }]).toPromise();
      _this.currentTemplate = _this.groupModeTemplates[0];
      _this.applyTemplate(_this.currentTemplate, false);
      // e.g. ['school']
      _this.additionalGroups = yield _this.config.get('admin.statistics.groups', []).toPromise();
      _this.customGroups = ['authority_organization', 'authority_mediacenter', 'license'].concat(_this.additionalGroups);
      if (_this.customGroups.length) {
        _this.customGroup = _this.customGroups[0];
      }
      _this.nodesPermission = _this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_NODES);
      _this.userPermission = _this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_USER);
      _this.finishedPreload = true;
      _this.refresh();
    })();
  }
  refresh() {
    this.refreshArchived();
    this.refreshGroups();
    this.refreshSingle();
    this.refreshCustomGroups();
  }
  refreshGroups() {
    if (!this.finishedPreload) {
      return;
    }
    this.groupedLoading = true;
    this.statistics.getStatisticsNode(this._groupedStart, new Date(this._groupedEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), this._groupedMode, this.getMediacenter()).subscribe(dataNode => {
      if (this._groupedMode !== 'None') {
        this.statistics.getStatisticsUser(this._groupedStart, new Date(this._groupedEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), this._groupedMode, this.getMediacenter()).subscribe(dataUser => {
          this.processGroupData(dataNode, dataUser);
        }, error => {
          this.processGroupData(dataNode, null);
        });
      } else {
        this.processGroupData(dataNode, null);
      }
    }, error => {
      this.statistics.getStatisticsUser(this._groupedStart, new Date(this._groupedEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), this._groupedMode, this.getMediacenter()).subscribe(dataUser => {
        this.processGroupData(null, dataUser);
      });
    });
  }
  getMediacenter() {
    return this._mediacenter ? this._mediacenter.authorityName : '';
  }
  processGroupData(dataNode, dataUser) {
    this.groupedLoading = false;
    if (!dataNode || !dataNode.length) {
      this.groupedNoData = true;
      return;
    }
    this.groupedNoData = false;
    this.uiService.waitForComponent(this, 'groupedChartRef').subscribe(() => {
      const canvas = this.groupedChartRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if (this.groupedChart) {
        this.groupedChart.destroy();
      }
      this.groupedChart = this.initGroupedChart(dataNode, dataUser, ctx);
      this.groupedChartData = {
        node: dataNode,
        user: dataUser
      };
    });
  }
  initGroupedChart(dataNode, dataUser, ctx) {
    let max = dataNode ? dataNode.map(stat => Math.max(stat.counts.VIEW_MATERIAL || 0, stat.counts.VIEW_MATERIAL_EMBEDDED || 0, stat.counts.DOWNLOAD_MATERIAL || 0, stat.counts.VIEW_COLLECTION || 0, stat.counts.VIEW_MATERIAL_PLAY_MEDIA || 0)).reduce((a, b) => Math.max(a, b)) : 0;
    if (dataUser) {
      max = Math.max(max, dataUser.map(stat => stat.counts.LOGIN_USER_SESSION || 0).reduce((a, b) => Math.max(a, b)));
    }
    let chartGroupedData;
    if (dataNode) {
      chartGroupedData = {
        labels: dataNode.map(stat => stat.date),
        datasets: [{
          label: this.translate.instant('ADMIN.STATISTICS.VIEWS'),
          // yAxisID: 'y-axis-view',
          backgroundColor: 'rgb(30,52,192)',
          data: dataNode.map(stat => stat.counts.VIEW_MATERIAL ? stat.counts.VIEW_MATERIAL : 0)
        }, {
          label: this.translate.instant('ADMIN.STATISTICS.VIEWS_EMBEDDED'),
          // yAxisID: 'y-axis-view-collection',
          backgroundColor: 'rgb(117,48,192)',
          data: dataNode.map(stat => stat.counts.VIEW_MATERIAL_EMBEDDED ? stat.counts.VIEW_MATERIAL_EMBEDDED : 0)
        }, {
          label: this.translate.instant('ADMIN.STATISTICS.VIEWS_COLLECTION'),
          // yAxisID: 'y-axis-view-embedded',
          backgroundColor: 'rgb(55,166,154)',
          data: dataNode.map(stat => stat.counts.VIEW_COLLECTION ? stat.counts.VIEW_COLLECTION : 0)
        }, {
          label: this.translate.instant('ADMIN.STATISTICS.OPEN_EXTERNAL_LINK'),
          // yAxisID: 'y-axis-view-embedded',
          backgroundColor: 'rgb(197,96,73)',
          data: dataNode.map(stat => stat.counts.OPEN_EXTERNAL_LINK ? stat.counts.OPEN_EXTERNAL_LINK : 0)
        }, {
          label: this.translate.instant('ADMIN.STATISTICS.DOWNLOADS'),
          // yAxisID: 'y-axis-download',
          backgroundColor: 'rgb(40,146,192)',
          data: dataNode.map(stat => stat.counts.DOWNLOAD_MATERIAL ? stat.counts.DOWNLOAD_MATERIAL : 0)
        }, {
          label: this.translate.instant('ADMIN.STATISTICS.VIEWS_PLAY_MEDIA'),
          // yAxisID: 'y-axis-download',
          backgroundColor: 'rgb(192,173,40)',
          data: dataNode.map(stat => stat.counts.VIEW_MATERIAL_PLAY_MEDIA ? stat.counts.VIEW_MATERIAL_PLAY_MEDIA : 0)
        }]
      };
    } else {
      chartGroupedData = {
        labels: [],
        datasets: []
      };
    }
    /*const axes: {[key in string]: Partial<ScaleOptionsByType<keyof CartesianScaleTypeRegistry>>} = {
        'y-axis-view': {
            type: 'linear',
            display: true,
            position: 'left',
        },
        'y-axis-view-embedded': {
            type: 'linear',
            display: false,
        },
        'y-axis-view-collection': {
            type: 'linear',
            display: false,
        },
        'y-axis-download': {
            type: 'linear',
            display: false,
        },
    };*/
    if (dataUser) {
      chartGroupedData.datasets.push({
        label: this.translate.instant('ADMIN.STATISTICS.USER_LOGINS'),
        // yAxisID: 'y-axis-user',
        backgroundColor: 'rgb(22,192,73)',
        data: dataUser.map(stat => stat.counts.LOGIN_USER_SESSION ? stat.counts.LOGIN_USER_SESSION : 0)
      });
      /*axes['y-axis-user'] = {
          type: 'linear',
          display: false,
      };*/
    }
    // Chart.defaults.global.defaultFontFamily = 'inherit';
    return new chart_js__WEBPACK_IMPORTED_MODULE_16__.Chart(ctx, {
      type: 'bar',
      data: chartGroupedData,
      options: {
        responsive: true,
        aspectRatio: 3,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {}
        },
        scales: {
          y: {
            type: 'linear',
            max
          }
          // ...axes
        }
      }
    });
  }

  refreshNodes() {
    if (!this.finishedPreload) {
      return;
    }
    this.nodesDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.nodesDataSource.isLoading = true;
    this.nodesNoData = true;
    const group = this.config.instant('admin.statistics.nodeGroup');
    this.statistics.getStatisticsNode(this._nodesStart, new Date(this._nodesEnd.getTime()), 'Node', this.getMediacenter(), group ? [group] : null).subscribe(data => {
      this.nodesDataSource.isLoading = false;
      this.nodesNoData = data.length === 0;
      this.nodesDataSource.setData(data.map(stat => {
        stat.node.counts = stat;
        return stat.node;
      }));
    }, error => {
      this.toast.error(error);
      this.nodesDataSource.isLoading = false;
      this.nodesNoData = true;
    });
  }
  getValidMode(mode) {
    if (!this._mediacenter) {
      if (!this.nodesPermission) {
        mode = 'USERS';
      } else if (!this.userPermission) {
        mode = 'NODES';
      }
    }
    return mode;
  }
  refreshSingle() {
    if (!this.finishedPreload) {
      return;
    }
    this.singleDataRows = null;
    this.singleLoading = true;
    const mode = this.getValidMode(this._singleMode);
    if (mode === 'NODES') {
      this.singleDataRows = ['date', 'action', 'node', 'authority', 'authority_organization', 'authority_mediacenter'].concat(this.additionalGroups || []);
      this.statistics.getStatisticsNode(this._singleStart, new Date(this._singleEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), 'None', this.getMediacenter(), this.additionalGroups).subscribe(result => {
        this.singleData = result.map(entry => {
          return {
            action: Object.keys(entry.counts)[0],
            date: entry.date,
            node: _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_4__.RestHelper.getName(entry.node),
            authority: entry.authority,
            entry
          };
        });
        this.singleLoading = false;
      });
    }
    if (mode === 'USERS') {
      this.singleDataRows = ['date', 'action', 'authority', 'authority_organization', 'authority_mediacenter'].concat(this.additionalGroups || []);
      this.statistics.getStatisticsUser(this._singleStart, new Date(this._singleEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), 'None', this.getMediacenter(), this.additionalGroups).subscribe(result => {
        this.singleData = result.map(entry => {
          return {
            action: Object.keys(entry.counts)[0],
            date: entry.date,
            authority: entry.authority,
            entry
          };
        });
        this.singleLoading = false;
      });
    }
  }
  refreshCustomGroups() {
    if (!this.finishedPreload) {
      return;
    }
    if (!this.customGroups) {
      return;
    }
    this.customGroupData = null;
    this.customGroupLoading = true;
    this.customGroupRows = [];
    const handleResult = result => {
      this.customGroupRows = ['action'].concat(this.customGroup).concat('count');
      if (this.customUnfold) {
        // add all found values as a matrix
        /*
        let set = Array.from(new Set( result.map((entry) => Object.keys(entry.groups[this.customUnfold])).
            reduce((a, b) => a.concat(b)).
            filter((a) => a != '')
        ));
         */
        let set = Array.from(new Set(result.map(entry => Object.keys(entry.groups).map(type => Object.keys(entry.groups[type][this.customUnfold])).reduce((a, b) => a.concat(b)).filter(a => a != ''))));
        // flatten [['test'],...] to a string array
        set = [].concat(...set);
        // container for storing the display (transformed authorities names) data for the table view
        this.customGroupLabels = [];
        if (this.customUnfold == 'authority_organization' || this.customUnfold == 'authority_mediacenter') {
          // transform the value for the horizontal list data if it's org/group
          set = set.map(key => {
            const authority = result.map(entry => this.customUnfold == 'authority_organization' ? entry.authority.organization : entry.authority.mediacenter).reduce((a, b) => a.concat(b)).filter(a => a.authorityName == key);
            if (authority.length) {
              this.customGroupLabels[key] = new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_5__.AuthorityNamePipe(this.translate).transform(authority[0], null);
            }
            return key;
          });
        }
        this.customGroupRows = Array.from(new Set(this.customGroupRows.concat(set)));
      }
      if (result.length) {
        this.customGroupData = result.map(entry => {
          const result = [];
          for (const key in entry.counts) {
            let displayValue = entry.fields[this.customGroup];
            // transform the value for the vertical list data if it's org/group
            if (this.customGroup == 'authority_organization' || this.customGroup == 'authority_mediacenter') {
              const obj = this.customGroup == 'authority_organization' ? entry.authority.organization : entry.authority.mediacenter;
              if (obj) {
                displayValue = obj.map(group => {
                  return new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_5__.AuthorityNamePipe(this.translate).transform(group, null);
                }).join(', ');
              } else {
                displayValue = '';
              }
            }
            result.push({
              entry,
              displayValue,
              count: entry.counts[key],
              action: key
            });
          }
          return result;
        }).reduce((a, b) => a.concat(b));
      }
      this.customGroupLoading = false;
    };
    const mode = this.getValidMode(this._customGroupMode);
    if (mode === 'NODES') {
      this.statistics.getStatisticsNode(this._customGroupStart, new Date(this._customGroupEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), 'None', this.getMediacenter(), this.customUnfold ? [this.customUnfold] : null, [this.customGroup]).subscribe(result => {
        handleResult(result);
      });
    }
    if (mode === 'USERS') {
      this.statistics.getStatisticsUser(this._customGroupStart, new Date(this._customGroupEnd.getTime() + AdminStatisticsComponent.DAY_OFFSET), 'None', this.getMediacenter(), this.customUnfold ? [this.customUnfold] : null, [this.customGroup]).subscribe(result => {
        handleResult(result);
      });
    }
  }
  getGroupKey(element, key) {
    const data = element.entry?.groups?.[element.action]?.[key];
    return data ? Object.keys(data)[0] : null;
  }
  export() {
    let csvHeadersTranslated;
    let csvHeadersMapping;
    let csvData;
    let from;
    let to;
    // node export
    switch (this.currentTab) {
      // chart per day/month/year data
      case 0:
        {
          from = this.groupedStart;
          to = this.groupedEnd;
          if (this.groupedChartData.node) {
            // map the headings for the file
            const data = this.groupedChartData.node.concat(this.groupedChartData.user);
            csvHeadersMapping = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.uniqueArray(data.map(d => Object.keys(d.counts)).reduce((a, b) => a.concat(b)));
            csvHeadersTranslated = csvHeadersMapping.map(s => this.translate.instant('ADMIN.STATISTICS.ACTIONS.' + s));
            csvHeadersMapping.splice(0, 0, 'Date');
            csvHeadersTranslated.splice(0, 0, this.translate.instant('ADMIN.STATISTICS.HEADERS.date'));
            const result = {};
            data.forEach(d => {
              if (!result[d.date]) {
                result[d.date] = {
                  Date: d.date
                };
              }
              Object.keys(d.counts).forEach(c => {
                result[d.date][c] = d.counts[c];
              });
            });
            csvData = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.objectToArray(result);
          } else {
            this.toast.error('ADMIN.STATISTICS.EXPORT_NO_DATA');
          }
          break;
        }
      case 1:
        {
          // grouped / folded data
          from = this.customGroupStart;
          to = this.customGroupEnd;
          csvHeadersMapping = this.customGroupRows.map(h => {
            return this.customGroupLabels?.[h] || h;
          });
          csvHeadersTranslated = csvHeadersMapping.map(s => this.translate.instant('ADMIN.STATISTICS.HEADERS.' + s));
          csvData = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.customGroupData).map(c => {
            c[this.customGroup] = c.displayValue;
            console.log(c);
            for (const key of this.customGroupRows) {
              if (key === 'action' || key === 'count' || key === this.customGroup) {
                continue;
              }
              c[this.customGroupLabels?.[key] || key] = c.entry.groups[c.action]?.[this.customUnfold]?.[key];
            }
            return c;
          });
          const eventTypes = [
          // 'OVERALL',
          'VIEW_MATERIAL', 'VIEW_COLLECTION', 'OPEN_EXTERNAL_LINK', 'VIEW_MATERIAL_EMBEDDED', 'VIEW_MATERIAL_PLAY_MEDIA', 'DOWNLOAD_MATERIAL'];
          // fill up all non existing events per field group
          [...new Set(csvData.map(csvData => csvData.entry.fields[this.customGroup]))].forEach(grouping => {
            const data = csvData.filter(csvData => csvData.entry.fields[this.customGroup] === grouping);
            eventTypes.filter(event => !data.some(d => d.action === event)).forEach(event => {
              csvData.push({
                ...data[0],
                action: event,
                count: 0,
                entry: {
                  ...data[0].entry,
                  counts: null
                }
              });
            });
          });
          // sort the result
          csvData.sort((a, b) => {
            const a1 = a.entry.fields[this.customGroup];
            const b1 = b.entry.fields[this.customGroup];
            if (a1 !== b1) {
              return a1 > b1 ? -1 : 1;
            }
            return eventTypes.indexOf(a.action) > eventTypes.indexOf(b.action) ? 1 : -1;
          });
          // translate labels
          csvData = csvData.map(data => {
            data.action = this.translate.instant('ADMIN.STATISTICS.ACTIONS.' + data.action);
            return data;
          });
          console.info(csvHeadersTranslated, csvHeadersMapping, csvData);
          break;
        }
      case 2:
        {
          from = this.nodesStart;
          to = this.nodesEnd;
          // counts by node including custom properties
          const properties = this.exportProperties.split('\n').map(e => e.trim());
          this.storage.set('admin_statistics_properties', this.exportProperties);
          //csvHeaders = properties.concat(Helper.uniqueArray(this.nodes.map((n) => Object.keys(n.counts)).reduce((a: any, b: any) => a.concat(b))));
          const countHeaders = [
          // 'OVERALL',
          'VIEW_MATERIAL', 'VIEW_COLLECTION', 'OPEN_EXTERNAL_LINK', 'VIEW_MATERIAL_EMBEDDED', 'DOWNLOAD_MATERIAL'];
          csvHeadersMapping = properties.concat(countHeaders);
          csvHeadersTranslated = properties.map(e => this.translate.instant('NODE.' + e)).concat(countHeaders.map(s => this.translate.instant('NODE.counts.' + s)));
          csvData = this.nodesDataSource.getData().map(n => {
            const c = {};
            console.log(Object.keys(n.counts));
            for (const prop of properties) {
              c[prop] = n.properties ? n.properties[prop] : n.ref.id;
              for (const idx of countHeaders) {
                c[idx] = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListCountsComponent.getCount(n, idx);
              }
            }
            return c;
          });
          break;
        }
      // was single, but is removed for now
      case undefined:
        {
          from = this.singleStart;
          to = this.singleEnd;
          csvHeadersMapping = this.singleDataRows;
          csvHeadersTranslated = this.singleDataRows.map(s => this.translate.instant('ADMIN.STATISTICS.HEADERS.' + s));
          console.log(this.singleData);
          csvData = this.singleData.map(data => {
            const c = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(data);
            // c.action = this.translate.instant('ADMIN.STATISTICS.ACTIONS.' + data.action);
            c.authority = data.authority.hash.substring(0, 8);
            c.authority_organization = data.authority.organization.map(m => new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_5__.AuthorityNamePipe(this.translate).transform(m));
            c.authority_mediacenter = data.authority.mediacenter.map(m => new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_5__.AuthorityNamePipe(this.translate).transform(m));
            const mainGroup = data.entry.groups[Object.keys(data.entry.groups)[0]];
            if (mainGroup) {
              for (const additional of Object.keys(mainGroup)) {
                c[additional] = Object.keys(mainGroup[additional])[0];
              }
            }
            return c;
          });
          break;
        }
    }
    _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_1__.CsvHelper.download(this.translate.instant('ADMIN.STATISTICS.CSV_FILENAME' + (this.getMediacenter() ? '_MZ' : ''), {
      mz: this._mediacenter?.profile?.displayName,
      from: new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.FormatDatePipe(this.translate).transform(from, {
        relative: false,
        time: false
      }),
      to: new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.FormatDatePipe(this.translate).transform(to, {
        relative: false,
        time: false
      })
    }), csvHeadersTranslated, csvData, csvHeadersMapping);
  }
  initColumns() {
    const columns = this.config.instant('admin.statistics.nodeColumns');
    if (columns) {
      this.columns = columns.map(c => new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', c));
    } else {
      this.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.CM_NAME)];
    }
    this.storage.get('admin_statistics_properties', this.columns.map(c => c.name).join('\n')).subscribe(p => this.exportProperties = p);
    this.columns = this.columns.concat([
    //new ListItem('NODE', 'counts.OVERALL'),
    new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.VIEW_MATERIAL'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.VIEW_MATERIAL_EMBEDDED'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.VIEW_COLLECTION'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.DOWNLOAD_MATERIAL'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.OPEN_EXTERNAL_LINK'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('NODE', 'counts.VIEW_MATERIAL_PLAY_MEDIA')]);
  }
  applyTemplate(template, refresh = true) {
    this._customGroup = template.group;
    this._customUnfold = template.unfold ?? '';
    this._customGroupMode = template.type ?? 'NODES';
    if (refresh) {
      this.refreshCustomGroups();
    }
  }
  refreshArchived() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2._mediacenter) {
        return;
      }
      _this2.archivedNodesDataSource.reset();
      _this2.archivedNodesDataSource.isLoading = true;
      const result = yield _this2.searchService.search({
        sortProperties: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.CM_PROP_C_CREATED],
        sortAscending: [true],
        repository: ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__.HOME_REPOSITORY,
        contentType: 'FILES',
        maxItems: 100,
        metadataset: ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__.DEFAULT,
        query: 'mediacenter_statistics',
        body: {
          criteria: [{
            property: 'mediacenter',
            values: [_this2.getMediacenter()]
          }]
        }
      }).toPromise();
      _this2.archivedNodesDataSource.setData(result.nodes, result.pagination);
      _this2.archivedNodesDataSource.isLoading = false;
    })();
  }
  downloadArchivedNode(element) {
    this.nodeHelperService.downloadNodes([element]);
  }
  toggleModes() {
    this.showModes = !this.showModes;
  }
  static #_4 = this.ɵfac = function AdminStatisticsComponent_Factory(t) {
    return new (t || AdminStatisticsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_rest_admin_service__WEBPACK_IMPORTED_MODULE_6__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_rest_statistics_service__WEBPACK_IMPORTED_MODULE_7__.RestStatisticsService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_ui_service__WEBPACK_IMPORTED_MODULE_8__.UIService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_9__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_session_storage_service__WEBPACK_IMPORTED_MODULE_10__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_rest_connector_service__WEBPACK_IMPORTED_MODULE_11__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_18__.SearchService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_rest_services_configuration_service__WEBPACK_IMPORTED_MODULE_12__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_13__.NodeHelperService));
  };
  static #_5 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
    type: AdminStatisticsComponent,
    selectors: [["es-admin-statistics"]],
    viewQuery: function AdminStatisticsComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.groupedChartRef = _t.first);
      }
    },
    inputs: {
      mediacenter: "mediacenter"
    },
    outputs: {
      onOpenNode: "onOpenNode"
    },
    decls: 89,
    vars: 84,
    consts: [["mat-stretch-tabs", "", 3, "selectedIndex", "selectedIndexChange"], [1, "stats-grouped", 3, "label"], [1, "mat-heading-4", "mat-heading-underline"], ["esIcon", "history"], [1, "modes"], [3, "ngModel", "ngModelChange"], ["value", "Daily"], ["value", "Monthly"], ["value", "Yearly"], [1, "calendars"], [3, "selected", "maxDate", "selectedChange"], [3, "selected", "minDate", "maxDate", "selectedChange"], [4, "ngIf"], ["class", "mat-heading-5", 4, "ngIf"], ["groupedChart", ""], [1, "stats-custom-groups", 3, "label"], ["esIcon", "view_list"], [1, "groups-template-select"], [3, "ngModel", "name", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "groups-button"], ["mat-button", "", "color", "primary", 3, "click"], [3, "esIcon"], [1, "group-multi"], [1, "group"], ["value", ""], [3, "value", "disabled", 4, "ngFor", "ngForOf"], ["class", "group", 4, "ngIf"], [1, "custom-group-data-table"], [3, "dataSource", "mat-table-clickable", 4, "ngIf"], ["class", "stats-nodes", 3, "label", 4, "ngIf"], [3, "label", 4, "ngIf"], ["class", "export", 4, "ngIf"], [1, "mat-heading-5"], [3, "value"], [3, "value", "disabled"], ["value", "NODES"], ["value", "USERS"], [3, "dataSource"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], [4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["matRipple", "", 4, "matRowDef", "matRowDefColumns"], [3, "matColumnDef"], [4, "matHeaderCellDef"], [4, "matCellDef"], ["matRipple", ""], [1, "stats-nodes", 3, "label"], ["esIcon", "assessment"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "click"], [3, "scope", "dataSource", "elementInteractionType", "checkbox", "displayType", "columns", "clickItem", 4, "ngIf"], [1, "export"], [1, "mat-heading-4", "mat-heading-underline", "clickable", 3, "click"], ["esIcon", "cloud_download"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "4", "cdkAutosizeMaxRows", "6", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "scope", "dataSource", "elementInteractionType", "checkbox", "displayType", "columns", "clickItem"], [3, "label"], ["esIcon", "archive"], [1, "stats-archived-table"], ["mode", "info"], [3, "elementInteractionType", "displayType", "dataSource", "checkbox", "columns", "clickItem"], ["empty", ""], [1, "empty"]],
    template: function AdminStatisticsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-tab-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedIndexChange", function AdminStatisticsComponent_Template_mat_tab_group_selectedIndexChange_0_listener($event) {
          return ctx.currentTab = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "h4", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 4)(8, "mat-form-field")(9, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_Template_mat_select_ngModelChange_12_listener($event) {
          return ctx.groupedMode = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](13, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](18, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](19, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](21, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](22, "div", 9)(23, "div")(24, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](26, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](27, "mat-calendar", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_Template_mat_calendar_selectedChange_27_listener($event) {
          return ctx.groupedStart = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](28, "div")(29, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](31, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](32, "mat-calendar", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_Template_mat_calendar_selectedChange_32_listener($event) {
          return ctx.groupedEnd = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](33, AdminStatisticsComponent_es_spinner_33_Template, 1, 0, "es-spinner", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](34, AdminStatisticsComponent_h5_34_Template, 3, 3, "h5", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](35, "canvas", null, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](37, "mat-tab", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](38, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](39, "h4", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](40, "i", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](42, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](43, "mat-form-field", 17)(44, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](45);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](46, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](47, "mat-select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_Template_mat_select_ngModelChange_47_listener($event) {
          return ctx.currentTemplate = $event;
        })("ngModelChange", function AdminStatisticsComponent_Template_mat_select_ngModelChange_47_listener($event) {
          return ctx.applyTemplate($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](48, AdminStatisticsComponent_mat_option_48_Template, 3, 4, "mat-option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](49, "div", 20)(50, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function AdminStatisticsComponent_Template_button_click_50_listener() {
          return ctx.toggleModes();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](52, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](53, "i", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](54, "div", 4)(55, "div", 23)(56, "div", 24)(57, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](58);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](59, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](60, "mat-radio-group", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_Template_mat_radio_group_ngModelChange_60_listener($event) {
          return ctx.customGroup = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](61, AdminStatisticsComponent_mat_radio_button_61_Template, 3, 4, "mat-radio-button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](62, "div", 24)(63, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](65, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](66, "mat-radio-group", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function AdminStatisticsComponent_Template_mat_radio_group_ngModelChange_66_listener($event) {
          return ctx.customUnfold = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](67, "mat-radio-button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](68);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](69, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](70, AdminStatisticsComponent_mat_radio_button_70_Template, 3, 5, "mat-radio-button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](71, AdminStatisticsComponent_div_71_Template, 11, 10, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](72, "div", 9)(73, "div")(74, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](75);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](76, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](77, "mat-calendar", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_Template_mat_calendar_selectedChange_77_listener($event) {
          return ctx.customGroupStart = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](78, "div")(79, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](80);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](81, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](82, "mat-calendar", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("selectedChange", function AdminStatisticsComponent_Template_mat_calendar_selectedChange_82_listener($event) {
          return ctx.customGroupEnd = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](83, AdminStatisticsComponent_es_spinner_83_Template, 1, 0, "es-spinner", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](84, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](85, AdminStatisticsComponent_mat_table_85_Template, 4, 7, "mat-table", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](86, AdminStatisticsComponent_mat_tab_86_Template, 23, 24, "mat-tab", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](87, AdminStatisticsComponent_mat_tab_87_Template, 13, 14, "mat-tab", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](88, AdminStatisticsComponent_div_88_Template, 10, 6, "div", 32);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selectedIndex", ctx.currentTab);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 50, "ADMIN.STATISTICS.GROUPED"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 52, "ADMIN.STATISTICS.GROUPED"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](11, 54, "ADMIN.STATISTICS.GROUP_BY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx.groupedMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](15, 56, "ADMIN.STATISTICS.GROUP_DAILY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](18, 58, "ADMIN.STATISTICS.GROUP_MONTHLY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](21, 60, "ADMIN.STATISTICS.GROUP_YEARLY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](26, 62, "ADMIN.STATISTICS.FROM"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx.groupedStart)("maxDate", ctx.groupedEnd);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](31, 64, "ADMIN.STATISTICS.TO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx.groupedEnd)("minDate", ctx.groupedStart)("maxDate", ctx.today);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.groupedLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.groupedNoData);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("display-none", ctx.groupedLoading || ctx.groupedNoData);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](38, 66, "ADMIN.STATISTICS.CUSTOM_GROUPS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](42, 68, "ADMIN.STATISTICS.CUSTOM_GROUPS"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](46, 70, "ADMIN.STATISTICS.GROUP_TEMPLATE_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx.currentTemplate)("name", ctx.currentTemplate == null ? null : ctx.currentTemplate.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx.groupModeTemplates);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](52, 72, "ADMIN.STATISTICS.GROUPS_ADVANCED"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("esIcon", "keyboard_arrow_", ctx.showModes ? "up" : "down", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("display-none", !ctx.showModes);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("@dialog", ctx.showModes);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](59, 74, "ADMIN.STATISTICS.CUSTOM_GROUP_MODE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx.customGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx.customGroups);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](65, 76, "ADMIN.STATISTICS.CUSTOM_UNFOLD_MODE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx.customUnfold);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](69, 78, "ADMIN.STATISTICS.UNFOLD_NONE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx.customGroups);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.nodesPermission && ctx.userPermission);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](76, 80, "ADMIN.STATISTICS.FROM"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx.customGroupStart)("maxDate", ctx.customGroupEnd);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](81, 82, "ADMIN.STATISTICS.TO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("selected", ctx.customGroupEnd)("minDate", ctx.customGroupStart)("maxDate", ctx.today);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.customGroupLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.customGroupData && !ctx.customGroupLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx._mediacenter || ctx.nodesPermission);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx._mediacenter);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.currentTab === 0 && !ctx.groupedLoading || ctx.currentTab === 1 && !ctx.customGroupLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_14__.InfoMessageComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_24__.MatCalendar, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_26__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_27__.CdkTextareaAutosize, _angular_material_radio__WEBPACK_IMPORTED_MODULE_28__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_28__.MatRadioButton, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatRipple, _angular_material_select__WEBPACK_IMPORTED_MODULE_29__.MatSelect, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatRow, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__.MatTabGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
    styles: ["\n\n.groups-button[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.groups-template-select[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  max-width: 600px;\n  width: 100%;\n  margin: auto;\n}\n.groups-template-select[_ngcontent-%COMP%]     .mat-form-field-wrapper {\n  width: 100%;\n}\n\n.modes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.modes[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin: 20px 0;\n}\n.modes[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n}\n.modes[_ngcontent-%COMP%]   .group-multi[_ngcontent-%COMP%] {\n  display: flex;\n}\n.modes[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5px 0;\n}\n.modes[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n.modes[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--textLight);\n}\n.modes[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.modes[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%]   .mat-radio-button[_ngcontent-%COMP%] {\n  padding: 5px 0;\n}\n\n.calendars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.calendars[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 10px;\n  margin: 15px;\n  background-color: #fff;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  text-align: center;\n}\n.calendars[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   mat-calendar[_ngcontent-%COMP%] {\n  width: 220px;\n}\n\ncanvas[_ngcontent-%COMP%] {\n  max-width: 100%;\n  padding: 0 20px;\n}\n\nes-listTable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.single-data-table[_ngcontent-%COMP%], .custom-group-data-table[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  max-height: 70vh;\n  overflow: auto;\n}\n.single-data-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%], .single-data-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%], .custom-group-data-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%], .custom-group-data-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n.single-data-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], .single-data-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], .custom-group-data-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], .custom-group-data-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.5em;\n  max-height: 3em;\n  -webkit-line-clamp: 2; \n\n  -webkit-box-orient: vertical;\n  \n\n  display: flex;\n  flex-direction: column;\n}\n\n.stats-grouped[_ngcontent-%COMP%], .stats-nodes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.stats-archived-table[_ngcontent-%COMP%]    > es-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 20px 0;\n}\n.stats-archived-table[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 110%;\n  padding: 20px;\n  text-align: center;\n}\n\n.export[_ngcontent-%COMP%] {\n  padding: 0 30px 20px 20px;\n}\n.export[_ngcontent-%COMP%]    > h4[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.export[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 5%;\n  width: 100%;\n}\n.export[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n[_nghost-%COMP%]     .mat-tab-body {\n  padding: 0 20px;\n}\n[_nghost-%COMP%]     .mat-tab-body, [_nghost-%COMP%]     .mat-tab-body .mat-tab-body-content {\n  overflow: visible !important;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hZG1pbi1wYWdlL3N0YXRpc3RpY3Mvc3RhdGlzdGljcy5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSkE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUNBO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUVKO0FBREk7RUFDSSxXQUFBO0FBR1I7O0FBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUdKO0FBRkk7RUFDSSxjQUFBO0FBSVI7QUFGSTtFQUNJLFdBQUE7RUFDQSxnQkFBQTtBQUlSO0FBRkk7RUFDSSxhQUFBO0FBSVI7QUFGSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUlSO0FBSFE7RUFDSSxlQUFBO0FBS1o7QUFIUTtFQUNJLGlCQUFBO0VBQ0EsdUJEeEJBO0FDNkJaO0FBSFE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFLWjtBQUpZO0VBQ0ksY0FBQTtBQU1oQjs7QUFEQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7QUFJSjtBQUhJO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQ3ZDSixzQ0FBQTtFRHlDSSxrQkFBQTtBQUtSO0FBSlE7RUFDSSxZQUFBO0FBTVo7O0FBRkE7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQUtKOztBQUhBO0VBQ0ksV0FBQTtBQU1KOztBQUpBOztFQUVJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFPSjtBQU5JOzs7O0VBRUksZUFBQTtBQVVSO0FBVFE7Ozs7RUN4RUosZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EscUJEb0VnQyxFQ3BFSiw0QkFBQTtFQUM1Qiw0QkFBQTtFQUNBLHNCQUFBO0VEbUVRLGFBQUE7RUFDQSxzQkFBQTtBQXFCWjs7QUFqQkE7O0VBRUksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQW9CSjs7QUFqQkk7RUFDSSxhQUFBO0VBQ0EsY0FBQTtBQW9CUjtBQWxCSTtFQUNJLHVCRHJGSTtFQ3NGSixlQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBb0JSOztBQWhCQTtFQUNJLHlCQUFBO0FBbUJKO0FBakJRO0VBQ0ksWUFBQTtBQW1CWjtBQWhCSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQWtCUjtBQWpCUTtFQUNJLG1CQUFBO0FBbUJaOztBQWRJO0VBQ0ksZUFBQTtBQWlCUjtBQWhCUTs7RUFFSSw0QkFBQTtFQUNBLFdBQUE7QUFrQloiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcbi5ncm91cHMtYnV0dG9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG4uZ3JvdXBzLXRlbXBsYXRlLXNlbGVjdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXgtd2lkdGg6IDYwMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICA6Om5nLWRlZXAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG4ubW9kZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgID4gYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luOiAyMHB4IDA7XG4gICAgfVxuICAgID4gbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LXdpZHRoOiA1MDBweDtcbiAgICB9XG4gICAgLmdyb3VwLW11bHRpIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgLmdyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogNXB4IDA7XG4gICAgICAgID4gKiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgbWF0LWxhYmVsIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbWF0LXJhZGlvLWdyb3VwIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgLm1hdC1yYWRpby1idXR0b24ge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLmNhbGVuZGFycyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgPiBkaXYge1xuICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICBtYXJnaW46IDE1cHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgIEBpbmNsdWRlIG1hdGVyaWFsU2hhZG93KCk7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbWF0LWNhbGVuZGFyIHtcbiAgICAgICAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNhbnZhcyB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDAgMjBweDtcbn1cbmVzLWxpc3RUYWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4uc2luZ2xlLWRhdGEtdGFibGUsXG4uY3VzdG9tLWdyb3VwLWRhdGEtdGFibGUge1xuICAgIG1hcmdpbjogMjBweCAwO1xuICAgIG1heC1oZWlnaHQ6IDcwdmg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgLm1hdC1jZWxsLFxuICAgIC5tYXQtaGVhZGVyLWNlbGwge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgID4gc3BhbiB7XG4gICAgICAgICAgICBAaW5jbHVkZSBsaW1pdExpbmVDb3VudCgyLCAxLjUpO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIH1cbiAgICB9XG59XG4uc3RhdHMtZ3JvdXBlZCxcbi5zdGF0cy1ub2RlcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uc3RhdHMtYXJjaGl2ZWQtdGFibGUge1xuICAgID4gZXMtaW5mby1tZXNzYWdlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luOiAyMHB4IDA7XG4gICAgfVxuICAgIC5lbXB0eSB7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICBmb250LXNpemU6IDExMCU7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG59XG5cbi5leHBvcnQge1xuICAgIHBhZGRpbmc6IDAgMzBweCAyMHB4IDIwcHg7XG4gICAgPiBoNCB7XG4gICAgICAgID4gc3BhbiB7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDUlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgPiBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAubWF0LXRhYi1ib2R5IHtcbiAgICAgICAgcGFkZGluZzogMCAyMHB4O1xuICAgICAgICAmLFxuICAgICAgICAubWF0LXRhYi1ib2R5LWNvbnRlbnQge1xuICAgICAgICAgICAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiQG1peGluIGNsaWNrYWJsZSgpIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuQG1peGluIGxpbWl0TGluZUNvdW50KCRjb3VudCwgJGxpbmVIZWlnaHQ6IDEpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZUhlaWdodCArIGVtO1xuICAgIG1heC1oZWlnaHQ6ICRjb3VudCAqICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAkY291bnQ7IC8qIG51bWJlciBvZiBsaW5lcyB0byBzaG93ICovXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAvKiBhdXRvcHJlZml4ZXI6IG9mZiAqL1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93KCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dCb3R0b20oJG9wYWNpdHk6IDAuMSkge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDNweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd1NtYWxsKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgkaW1wb3J0YW50OiBmYWxzZSwgJG9wYWNpdHk6IDAuNikge1xuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2Nyb2xsYmFyKCkge1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIC8vIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgfVxufVxuQG1peGluIHJlbW92ZURlZmF1bHRGb2N1cygpIHtcbiAgICBvdXRsaW5lOiBub25lO1xufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJykge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgIH1cbn1cbi8vIEFwcGx5IHRoZSBjb250ZW50IHN0eWxlcyBpbiBjb250cmFzdCBtb2RlLiBUaGlzIGlzIGp1c3QgZW5vdWdoIGNvbnRyYXN0IHRvIGJlIFdDQUcgY29tcGxpZW50IC0tLVxuLy8gbm90IGEgaGlnaC1jb250cmFzdCBtb2RlLlxuLy9cbi8vIENhbGwgd2l0aG91dCBhcmd1bWVudHMgZm9yIHVzZSBpbiBlbmNhcHN1bGF0ZWQgY29tcG9uZW50IHN0eWxlcywgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUge1xuLy8gICAgICAgICAvLyBTdHlsZXMgdG8gYXBwbHkgaW4gY29udHJhc3QgbW9kZVxuLy8gICAgIH1cbi8vIFRvIHVzIGluIGdsb2JhbCBjb250ZXh0LCBwYXNzICdnbG9iYWwnIGFzIGZpcnN0IGFyZ3VtZW50LCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZShnbG9iYWwpIHsgLyogLi4uICovIH1cbkBtaXhpbiBjb250cmFzdE1vZGUoJHNjb3BlOiBlbmNhcHN1bGF0ZWQpIHtcbiAgICAkY29udHJhc3RNb2RlU2VsZWN0b3I6ICdib2R5LmVzLWNvbnRyYXN0LW1vZGUnO1xuICAgIEBpZiAkc2NvcGUgPT0gZW5jYXBzdWxhdGVkIHtcbiAgICAgICAgOmhvc3QtY29udGV4dCgjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0pICYge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRzY29wZSA9PSBnbG9iYWwge1xuICAgICAgICAje2lmKCYsICcjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0gJicsICRjb250cmFzdE1vZGVTZWxlY3Rvcil9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEBlcnJvciBcIkludmFsaWQgc2NvcGUgI3skc2NvcGV9LlwiO1xuICAgIH1cbn1cbkBtaXhpbiBibHVySW1hZ2UoJGJsdXJTdHJlbmd0aDogMjVweCkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgdG9wOiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICB6LWluZGV4OiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmlsdGVyOiBibHVyKCRibHVyU3RyZW5ndGgpO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9wYWNpdHk6IDAuNztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.trigger)('overlay', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.state)('false', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.style)({
        opacity: 0,
        'transform-origin': '50% 0%',
        transform: 'scaleY(0)',
        height: 0
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.state)('true', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.style)({
        opacity: 1,
        'transform-origin': '50% 0%',
        transform: 'scaleY(1)'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.transition)('false <=> true', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.animate)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIAnimation.ANIMATION_TIME_NORMAL + 'ms ease-in-out'))]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.trigger)('dialog', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIAnimation.switchDialog())]
    }
  });
}

/***/ }),

/***/ 8937:
/*!*****************************************************************************!*\
  !*** ./node_modules/ngx-monaco-editor-v2/fesm2022/ngx-monaco-editor-v2.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffEditorComponent: () => (/* binding */ DiffEditorComponent),
/* harmony export */   EditorComponent: () => (/* binding */ EditorComponent),
/* harmony export */   MonacoEditorModule: () => (/* binding */ MonacoEditorModule),
/* harmony export */   NGX_MONACO_EDITOR_CONFIG: () => (/* binding */ NGX_MONACO_EDITOR_CONFIG)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 93190);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);





const _c0 = ["editorContainer"];
const _c1 = "[_nghost-%COMP%]{display:block;height:200px}.editor-container[_ngcontent-%COMP%]{width:100%;height:98%}";
const NGX_MONACO_EDITOR_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NGX_MONACO_EDITOR_CONFIG');
let loadedMonaco = false;
let loadPromise;
class BaseEditor {
  set insideNg(insideNg) {
    this._insideNg = insideNg;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this._options, this.insideNg);
    }
  }
  get insideNg() {
    return this._insideNg;
  }
  constructor(config) {
    this.config = config;
    this.onInit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._insideNg = false;
  }
  ngAfterViewInit() {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this._options, this.insideNg);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise(resolve => {
        const baseUrl = this.config.baseUrl || "./assets";
        if (typeof window.monaco === 'object') {
          this.initMonaco(this._options, this.insideNg);
          resolve();
          return;
        }
        const onGotAmdLoader = require => {
          let usedRequire = require || window.require;
          let requireConfig = {
            paths: {
              vs: `${baseUrl}/monaco/min/vs`
            }
          };
          Object.assign(requireConfig, this.config.requireConfig || {});
          // Load monaco
          usedRequire.config(requireConfig);
          usedRequire([`vs/editor/editor.main`], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this._options, this.insideNg);
            resolve();
          });
        };
        if (this.config.monacoRequire) {
          onGotAmdLoader(this.config.monacoRequire);
          // Load AMD loader if necessary
        } else if (!window.require) {
          const loaderScript = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/monaco/min/vs/loader.js`;
          loaderScript.addEventListener('load', () => {
            onGotAmdLoader();
          });
          document.body.appendChild(loaderScript);
          // Load AMD loader without over-riding node's require
        } else if (!window.require.config) {
          var src = `${baseUrl}/monaco/min/vs/loader.js`;
          var loaderRequest = new XMLHttpRequest();
          loaderRequest.addEventListener("load", () => {
            let scriptElem = document.createElement('script');
            scriptElem.type = 'text/javascript';
            scriptElem.text = [
            // Monaco uses a custom amd loader that over-rides node's require.
            // Keep a reference to node's require so we can restore it after executing the amd loader file.
            'var nodeRequire = require;', loaderRequest.responseText.replace('"use strict";', ''),
            // Save Monaco's amd require and restore Node's require
            'var monacoAmdRequire = require;', 'require = nodeRequire;', 'require.nodeRequire = require;'].join('\n');
            document.body.appendChild(scriptElem);
            onGotAmdLoader(window.monacoAmdRequire);
          });
          loaderRequest.open("GET", src);
          loaderRequest.send();
        } else {
          onGotAmdLoader();
        }
      });
    }
  }
  ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }
  static #_ = this.ɵfac = function BaseEditor_Factory(t) {
    return new (t || BaseEditor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MONACO_EDITOR_CONFIG));
  };
  static #_2 = this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: BaseEditor,
    selectors: [["ng-component"]],
    viewQuery: function BaseEditor_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._editorContainer = _t.first);
      }
    },
    inputs: {
      insideNg: "insideNg"
    },
    outputs: {
      onInit: "onInit"
    },
    decls: 0,
    vars: 0,
    template: function BaseEditor_Template(rf, ctx) {},
    encapsulation: 2
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseEditor, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MONACO_EDITOR_CONFIG]
      }]
    }];
  }, {
    insideNg: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['insideNg']
    }],
    _editorContainer: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['editorContainer', {
        static: true
      }]
    }],
    onInit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
class EditorComponent extends BaseEditor {
  set options(options) {
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options, this.insideNg);
    }
  }
  get options() {
    return this._options;
  }
  set model(model) {
    this.options.model = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options, this.insideNg);
    }
  }
  constructor(zone, editorConfig) {
    super(editorConfig);
    this.zone = zone;
    this.editorConfig = editorConfig;
    this._value = '';
    this.propagateChange = _ => {};
    this.onTouched = () => {};
  }
  writeValue(value) {
    this._value = value || '';
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor && !this.options.model) {
        this._editor.setValue(this._value);
      }
    });
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  initMonaco(options, insideNg) {
    const hasModel = !!options.model;
    if (hasModel) {
      const model = monaco.editor.getModel(options.model.uri || '');
      if (model) {
        options.model = model;
        options.model.setValue(this._value);
      } else {
        options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
      }
    }
    if (insideNg) {
      this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
      });
    }
    if (!hasModel) {
      this._editor.setValue(this._value);
    }
    this._editor.onDidChangeModelContent(e => {
      const value = this._editor.getValue();
      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => {
        this.propagateChange(value);
        this._value = value;
      });
    });
    this._editor.onDidBlurEditorWidget(() => {
      this.onTouched();
    });
    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'resize').subscribe(() => this._editor.layout());
    this.onInit.emit(this._editor);
  }
  static #_ = this.ɵfac = function EditorComponent_Factory(t) {
    return new (t || EditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MONACO_EDITOR_CONFIG));
  };
  static #_2 = this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: EditorComponent,
    selectors: [["ngx-monaco-editor"]],
    inputs: {
      options: "options",
      model: "model"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EditorComponent),
      multi: true
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    decls: 2,
    vars: 0,
    consts: [[1, "editor-container"], ["editorContainer", ""]],
    template: function EditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block;height:200px}.editor-container[_ngcontent-%COMP%]{width:100%;height:98%}"]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditorComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-monaco-editor',
      template: '<div class="editor-container" #editorContainer></div>',
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EditorComponent),
        multi: true
      }],
      styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MONACO_EDITOR_CONFIG]
      }]
    }];
  }, {
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['options']
    }],
    model: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['model']
    }]
  });
})();
class DiffEditorComponent extends BaseEditor {
  set options(options) {
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(options, this.insideNg);
    }
  }
  get options() {
    return this._options;
  }
  set originalModel(model) {
    this._originalModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options, this.insideNg);
    }
  }
  set modifiedModel(model) {
    this._modifiedModel = model;
    if (this._editor) {
      this._editor.dispose();
      this.initMonaco(this.options, this.insideNg);
    }
  }
  constructor(zone, editorConfig) {
    super(editorConfig);
    this.zone = zone;
    this.editorConfig = editorConfig;
  }
  initMonaco(options, insideNg) {
    if (!this._originalModel || !this._modifiedModel) {
      throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
    }
    this._originalModel.language = this._originalModel.language || options.language;
    this._modifiedModel.language = this._modifiedModel.language || options.language;
    let originalModel = monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
    let modifiedModel = monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);
    this._editorContainer.nativeElement.innerHTML = '';
    const theme = options.theme;
    if (insideNg) {
      this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
    } else {
      this.zone.runOutsideAngular(() => {
        this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
      });
    }
    options.theme = theme;
    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'resize').subscribe(() => this._editor.layout());
    this.onInit.emit(this._editor);
  }
  static #_ = this.ɵfac = function DiffEditorComponent_Factory(t) {
    return new (t || DiffEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MONACO_EDITOR_CONFIG));
  };
  static #_2 = this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: DiffEditorComponent,
    selectors: [["ngx-monaco-diff-editor"]],
    inputs: {
      options: "options",
      originalModel: "originalModel",
      modifiedModel: "modifiedModel"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
    decls: 2,
    vars: 0,
    consts: [[1, "editor-container"], ["editorContainer", ""]],
    template: function DiffEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
      }
    },
    styles: [_c1]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DiffEditorComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-monaco-diff-editor',
      template: '<div class="editor-container" #editorContainer></div>',
      styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MONACO_EDITOR_CONFIG]
      }]
    }];
  }, {
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['options']
    }],
    originalModel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['originalModel']
    }],
    modifiedModel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['modifiedModel']
    }]
  });
})();
class MonacoEditorModule {
  static forRoot(config = {}) {
    return {
      ngModule: MonacoEditorModule,
      providers: [{
        provide: NGX_MONACO_EDITOR_CONFIG,
        useValue: config
      }]
    };
  }
  static #_ = this.ɵfac = function MonacoEditorModule_Factory(t) {
    return new (t || MonacoEditorModule)();
  };
  static #_2 = this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: MonacoEditorModule
  });
  static #_3 = this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
  });
}
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MonacoEditorModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
      declarations: [EditorComponent, DiffEditorComponent],
      exports: [EditorComponent, DiffEditorComponent]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_pages_admin-page_admin-page_module_ts.js.map