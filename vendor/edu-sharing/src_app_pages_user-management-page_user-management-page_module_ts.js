"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_user-management-page_user-management-page_module_ts"],{

/***/ 68216:
/*!*********************************************************************************!*\
  !*** ./src/app/pages/user-management-page/authorities/authorities.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PermissionsAuthoritiesComponent: () => (/* binding */ PermissionsAuthoritiesComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var _pages_admin_page_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../pages/admin-page/autocomplete/autocomplete.component */ 94462);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core-module/csv.helper */ 83848);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/components/breadcrumbs/breadcrumbs.component */ 98617);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../shared/components/input-password/input-password.component */ 35799);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _shared_components_user_quota_user_quota_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../shared/components/user-quota/user-quota.component */ 31579);
/* harmony import */ var _toolpermission_manager_toolpermission_manager_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../toolpermission-manager/toolpermission-manager.component */ 57970);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);







































const _c0 = ["actionbar"];
const _c1 = ["actionbarMember"];
const _c2 = ["actionbarSignup"];
const _c3 = ["mainList"];
const _c4 = ["memberAdd"];
const _c5 = ["signupList"];
const _c6 = ["addToComponent"];
function PermissionsAuthoritiesComponent_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div")(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_div_2_div_1_Template_a_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r15.setOrgTab());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 2, "PERMISSIONS.INFO_GLOBAL_" + ctx_r13._mode));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](6, 4, "PERMISSIONS.CHOOSE_ORG"));
  }
}
function PermissionsAuthoritiesComponent_div_2_div_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "span")(1, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_div_2_div_2_span_4_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r18.deselectOrg());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_div_2_div_2_span_4_Template_a_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r20.setOrgTab());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 2, "PERMISSIONS.NO_ORG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](6, 4, "PERMISSIONS.CHOOSE_ORG"));
  }
}
const _c7 = function (a0) {
  return {
    org: a0
  };
};
function PermissionsAuthoritiesComponent_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div")(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](4, PermissionsAuthoritiesComponent_div_2_div_2_span_4_Template, 7, 6, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind2"](3, 2, "PERMISSIONS.INFO_ORG_" + ctx_r14._mode, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](5, _c7, ctx_r14.org.profile.displayName)));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r14.isAdmin);
  }
}
function PermissionsAuthoritiesComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, PermissionsAuthoritiesComponent_div_2_div_1_Template, 7, 6, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](2, PermissionsAuthoritiesComponent_div_2_div_2_Template, 5, 7, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r0.org);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r0.org);
  }
}
function PermissionsAuthoritiesComponent_es_toolpermission_manager_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-toolpermission-manager", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onClose", function PermissionsAuthoritiesComponent_es_toolpermission_manager_5_Template_es_toolpermission_manager_onClose_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r21.toolpermissionAuthority = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("authority", ctx_r2.toolpermissionAuthority);
  }
}
function PermissionsAuthoritiesComponent_es_card_6_mat_form_field_4_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", type_r26);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.USER_STATUS." + type_r26));
  }
}
function PermissionsAuthoritiesComponent_es_card_6_mat_form_field_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-form-field", 22)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "mat-select", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_6_mat_form_field_4_Template_mat_select_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r27.editStatus.status.status = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](6, PermissionsAuthoritiesComponent_es_card_6_mat_form_field_4_mat_option_6_Template, 3, 4, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 4, "PERMISSIONS.STATUS_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](5, 6, "PERMISSIONS.STATUS.null"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r23.editStatus.status.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", ctx_r23.STATUS_TYPES);
  }
}
const _c8 = function () {
  return {
    relative: false,
    time: true
  };
};
function PermissionsAuthoritiesComponent_es_card_6_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.STATUS_LAST_CHANGE"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind2"](3, 4, ctx_r24.editStatus.status.date, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](7, _c8)), " ");
  }
}
function PermissionsAuthoritiesComponent_es_card_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-card", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onCancel", function PermissionsAuthoritiesComponent_es_card_6_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r29.editStatus = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](4, PermissionsAuthoritiesComponent_es_card_6_mat_form_field_4_Template, 7, 8, "mat-form-field", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_6_Template_mat_checkbox_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r31.editStatusNotify = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](8, PermissionsAuthoritiesComponent_es_card_6_div_8_Template, 4, 8, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 8, "PERMISSIONS.SET_STATUS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("subtitle", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 10, ctx_r3.editStatus));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("isCancelable", true)("buttons", ctx_r3.editStatusButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r3.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r3.editStatusNotify);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](7, 12, "PERMISSIONS.STATUS_NOTIFY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r3.editStatus.status.date);
  }
}
function PermissionsAuthoritiesComponent_es_card_7_es_info_message_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-info-message", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.ORG_SIGNUP_NO_EMAIL"), " ");
  }
}
function PermissionsAuthoritiesComponent_es_card_7_es_input_password_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-input-password", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("valueChange", function PermissionsAuthoritiesComponent_es_card_7_es_input_password_24_Template_es_input_password_valueChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r34.groupSignupDetails.signupPassword = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 3, "PERMISSIONS.ORG_SIGNUP_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("hint", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 5, "PERMISSIONS.ORG_SIGNUP_PASSWORD_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", ctx_r33.groupSignupDetails.signupPassword);
  }
}
function PermissionsAuthoritiesComponent_es_card_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-card", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onCancel", function PermissionsAuthoritiesComponent_es_card_7_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r36.groupSignupDetails = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](3, PermissionsAuthoritiesComponent_es_card_7_es_info_message_3_Template, 3, 3, "es-info-message", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "mat-form-field")(5, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](8, "mat-select", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_7_Template_mat_select_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r37);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r38.groupSignupDetails.signupMethod = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](9, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](12, "mat-option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](15, "mat-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](18, "mat-option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](21, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](24, PermissionsAuthoritiesComponent_es_card_7_es_input_password_24_Template, 3, 7, "es-input-password", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 13, "PERMISSIONS.ORG_SIGNUP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("node", ctx_r4.groupSignup)("isCancelable", true)("buttons", ctx_r4.signupButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r4.groupSignup.profile.groupEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](7, 15, "PERMISSIONS.ORG_SIGNUP_METHOD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r4.groupSignupDetails.signupMethod);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](11, 17, "PERMISSIONS.ORG_SIGNUP_METHODS.disabled"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](14, 19, "PERMISSIONS.ORG_SIGNUP_METHODS.simple"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](17, 21, "PERMISSIONS.ORG_SIGNUP_METHODS.password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](20, 23, "PERMISSIONS.ORG_SIGNUP_METHODS.list"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](23, 25, "PERMISSIONS.ORG_SIGNUP_METHODS." + (ctx_r4.groupSignupDetails.signupMethod || "disabled") + "_DETAILS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r4.groupSignupDetails.signupMethod === "password");
  }
}
function PermissionsAuthoritiesComponent_es_card_8_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "h5", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.ORG_SIGNUP_LIST_EMPTY"), " ");
  }
}
function PermissionsAuthoritiesComponent_es_card_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-card", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onCancel", function PermissionsAuthoritiesComponent_es_card_8_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r43.groupSignupListShown = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "div", 39)(3, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](4, "es-actionbar", 41, 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](6, "es-node-entries-wrapper", 43, 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("clickItem", function PermissionsAuthoritiesComponent_es_card_8_Template_es_node_entries_wrapper_clickItem_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r44);
      const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](7);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r45.selectOnClick(_r40, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](8, PermissionsAuthoritiesComponent_es_card_8_ng_template_8_Template, 3, 3, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 11, "PERMISSIONS.ORG_SIGNUP_LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("node", ctx_r5.groupSignup)("isCancelable", true)("buttons", ctx_r5.signupListButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("numberOfAlwaysVisibleOptions", 1)("numberOfAlwaysVisibleOptionsMobile", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("scope", ctx_r5.Scope.UserManagement)("displayType", ctx_r5.DisplayType.Table)("elementInteractionType", ctx_r5.InteractionType.Emitter)("columns", ctx_r5.addMemberColumns)("dataSource", ctx_r5.groupSignupList);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 49)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 2, "PERMISSIONS.INTERNAL_NAME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](ctx_r46.edit.authorityName);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_5_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r52 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", type_r52);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.GROUP_TYPE." + type_r52));
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_5_mat_form_field_18_mat_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r54 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", type_r54);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.SCOPE_TYPE." + type_r54));
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_5_mat_form_field_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-form-field", 22)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "mat-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_5_mat_form_field_18_Template_mat_select_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r56);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r55.edit.profile.scopeType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](6, PermissionsAuthoritiesComponent_es_card_9_div_5_mat_form_field_18_mat_option_6_Template, 3, 4, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 4, "GROUP.scopeType"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](5, 6, "PERMISSIONS.SCOPE_TYPE.null"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r51.edit.profile.scopeType);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", ctx_r51.SCOPE_TYPES);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div")(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "input", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_5_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r58);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r57.edit.profile.displayName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](10, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_5_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r58);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r59.edit.profile.groupEmail = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "mat-form-field", 22)(12, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](15, "mat-select", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_5_Template_mat_select_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r58);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r60.edit.profile.groupType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](17, PermissionsAuthoritiesComponent_es_card_9_div_5_mat_option_17_Template, 3, 4, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](18, PermissionsAuthoritiesComponent_es_card_9_div_5_mat_form_field_18_Template, 7, 8, "mat-form-field", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](4, 9, "GROUP.displayName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r47.edit.profile.displayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](9, 11, "GROUP.groupEmail"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r47.edit.profile.groupEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](14, 13, "GROUP.groupType"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](16, 15, "PERMISSIONS.GROUP_TYPE.null"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r47.edit.profile.groupType);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", ctx_r47.GROUP_TYPES);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r47.isAdmin);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_6_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r63 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", type_r63);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.GROUP_TYPE." + type_r63));
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_6_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 56)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](4, "es-breadcrumbs", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 4, "PERMISSIONS.ORG_HOME_FOLDER_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("home", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](5, 6, "PERMISSIONS.ORG_HOME_FOLDER_MAIN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("clickable", true)("createLink", true);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div")(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "input", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_6_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r65);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r64.edit.profile.displayName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](10, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_6_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r65);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r66.edit.profile.groupEmail = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "mat-form-field", 22)(12, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](15, "mat-select", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_6_Template_mat_select_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r65);
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r67.edit.profile.groupType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](17, PermissionsAuthoritiesComponent_es_card_9_div_6_mat_option_17_Template, 3, 4, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](18, PermissionsAuthoritiesComponent_es_card_9_div_6_div_18_Template, 6, 8, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](4, 9, "ORG.displayName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r48.edit.profile.displayName);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](9, 11, "ORG.groupEmail"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r48.edit.profile.groupEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](14, 13, "ORG.groupType"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](16, 15, "PERMISSIONS.GROUP_TYPE.null"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r48.edit.profile.groupType);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", ctx_r48.ORG_TYPES);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r48.edit.folderPath == null ? null : ctx_r48.edit.folderPath.length);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_mat_form_field_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_mat_form_field_1_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r74);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r73.editDetails.authorityName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](3, 2, "USER.authorityName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r68.editDetails.authorityName);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_mat_select_22_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const a_r76 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", a_r76);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "USER.PRIMARY_AFFILIATION." + a_r76));
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_mat_select_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r78 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "mat-select", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_mat_select_22_Template_mat_select_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r78);
      const ctx_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r77.edit.profile.primaryAffiliation = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](1, "mat-option");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](2, PermissionsAuthoritiesComponent_es_card_9_div_7_mat_select_22_mat_option_2_Template, 3, 4, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r69.edit.profile.primaryAffiliation);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", ctx_r69.PRIMARY_AFFILIATIONS);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_input_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r80 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_input_23_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r80);
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r79.edit.profile.primaryAffiliation = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r70.edit.profile.primaryAffiliation);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div")(1, "es-input-password", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("valueChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_div_27_Template_es_input_password_valueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r82);
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r81.editDetails.password = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 2, "USER.password"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("value", ctx_r71.editDetails.password);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_es_user_quota_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "es-user-quota", 73);
  }
  if (rf & 2) {
    const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("quota", ctx_r72.edit.quota);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r84 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, PermissionsAuthoritiesComponent_es_card_9_div_7_mat_form_field_1_Template, 5, 4, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](6, "input", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r84);
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r83.edit.profile.firstName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](7, "mat-form-field")(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "input", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r84);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r85.edit.profile.lastName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](12, "mat-form-field")(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](16, "input", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r84);
      const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r86.edit.profile.email = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](17, "div", 61)(18, "mat-form-field")(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](22, PermissionsAuthoritiesComponent_es_card_9_div_7_mat_select_22_Template, 3, 2, "mat-select", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](23, PermissionsAuthoritiesComponent_es_card_9_div_7_input_23_Template, 1, 1, "input", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](24, "button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_es_card_9_div_7_Template_button_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r84);
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r87.primaryAffiliationList = !ctx_r87.primaryAffiliationList);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](25, "i", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](27, PermissionsAuthoritiesComponent_es_card_9_div_7_div_27_Template, 3, 4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](28, "div", 66)(29, "mat-form-field")(30, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](33, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_9_div_7_Template_input_ngModelChange_33_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r84);
      const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r88.edit.profile.sizeQuota = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](34, PermissionsAuthoritiesComponent_es_card_9_div_7_es_user_quota_34_Template, 1, 1, "es-user-quota", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r49.editId);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](5, 15, "USER.firstName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r49.edit.profile.firstName);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](10, 17, "USER.lastName"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r49.edit.profile.lastName);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](15, 19, "USER.email"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r49.edit.profile.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](21, 21, "USER.primaryAffiliation"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r49.primaryAffiliationList);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r49.primaryAffiliationList);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](ctx_r49.primaryAffiliationList ? "edit" : "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r49.editId);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](32, 23, "USER.sizeQuota"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r49.edit.profile.sizeQuota);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r49.editId && ctx_r49.edit.quota.enabled);
  }
}
function PermissionsAuthoritiesComponent_es_card_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-card", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onCancel", function PermissionsAuthoritiesComponent_es_card_9_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r90);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r89.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "div", 47)(3, "form");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](4, PermissionsAuthoritiesComponent_es_card_9_div_4_Template, 6, 4, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](5, PermissionsAuthoritiesComponent_es_card_9_div_5_Template, 19, 17, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](6, PermissionsAuthoritiesComponent_es_card_9_div_6_Template, 19, 17, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](7, PermissionsAuthoritiesComponent_es_card_9_div_7_Template, 35, 25, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 7, "PERMISSIONS." + (ctx_r6.editId == null ? "CREATE" : "EDIT") + "_" + ctx_r6._mode));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("subtitle", ctx_r6.editId ? ctx_r6.edit.authorityName : ctx_r6.editDetails.authorityName ? ctx_r6.editDetails.authorityName : ctx_r6.edit.profile.displayName)("buttons", ctx_r6.editButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r6.editId);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r6._mode === "GROUP");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r6._mode === "ORG");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r6._mode === "USER");
  }
}
function PermissionsAuthoritiesComponent_es_card_10_es_actionbar_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "es-actionbar", 83, 84);
  }
}
const _c9 = function (a0) {
  return {
    group: a0
  };
};
function PermissionsAuthoritiesComponent_es_card_10_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind2"](2, 1, "PERMISSIONS.CURRENT_MEMBERS", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](4, _c9, ctx_r92.editMembers.profile ? ctx_r92.editMembers.profile.displayName : ctx_r92.org.profile.displayName)), " ");
  }
}
function PermissionsAuthoritiesComponent_es_card_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r96 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "es-card", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onScrolled", function PermissionsAuthoritiesComponent_es_card_10_Template_es_card_onScrolled_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const ctx_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r95.refreshMemberList());
    })("onCancel", function PermissionsAuthoritiesComponent_es_card_10_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const ctx_r97 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r97.cancelEditMembers());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "div", 75)(3, "div", 76)(4, "form", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngSubmit", function PermissionsAuthoritiesComponent_es_card_10_Template_form_ngSubmit_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const ctx_r98 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r98.searchMembers());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "mat-form-field")(6, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](9, "input", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_es_card_10_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const ctx_r99 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r99.manageMemberSearch = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](10, PermissionsAuthoritiesComponent_es_card_10_es_actionbar_10_Template, 2, 0, "es-actionbar", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](11, PermissionsAuthoritiesComponent_es_card_10_div_11_Template, 3, 6, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](12, "es-node-entries-wrapper", 81, 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("clickItem", function PermissionsAuthoritiesComponent_es_card_10_Template_es_node_entries_wrapper_clickItem_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const _r93 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](13);
      const ctx_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r100.selectOnClick(_r93, $event));
    })("fetchData", function PermissionsAuthoritiesComponent_es_card_10_Template_es_node_entries_wrapper_fetchData_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r96);
      const ctx_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r101.refreshMemberList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](1, 12, ctx_r7.addMembers ? "PERMISSIONS.ADD_MEMBER_TO_GROUP" : ctx_r7.editMembers === "ALL" ? "PERMISSIONS.EDIT_ORG_MEMBERS" : ctx_r7.editMembers ? "PERMISSIONS.EDIT_MEMBERS" : "PERMISSIONS.EDIT_MEMBER_GROUPS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("subtitle", ctx_r7.addMembers ? ctx_r7.addMembers.profile.displayName : ctx_r7.editMembers ? ctx_r7.editMembers.profile.displayName : ctx_r7.editGroups.authorityName)("buttons", ctx_r7.memberButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](8, 14, ctx_r7.addMembers ? "PERMISSIONS.SEARCH_USER" : ctx_r7.editGroups ? "PERMISSIONS.SEARCH_GROUPS" : "PERMISSIONS.SEARCH_MEMBER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r7.manageMemberSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r7.editMembers || ctx_r7.editGroups);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r7.editMembers);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("scope", ctx_r7.Scope.UserManagement)("columns", ctx_r7.editGroups ? ctx_r7.editGroupColumns : ctx_r7.addMemberColumns)("dataSource", ctx_r7.memberList)("displayType", ctx_r7.DisplayType.Table)("elementInteractionType", ctx_r7.InteractionType.Emitter);
  }
}
function PermissionsAuthoritiesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r104 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 86)(1, "div", 87)(2, "es-permissions-authorities", 88, 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("onSelection", function PermissionsAuthoritiesComponent_div_11_Template_es_permissions_authorities_onSelection_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r104);
      const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r103.addToSelection = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "div", 90)(5, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_div_11_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r104);
      const ctx_r105 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r105.cancelAddTo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](8, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("click", function PermissionsAuthoritiesComponent_div_11_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r104);
      const ctx_r106 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r106.addToSelect());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@fromRight", ctx_r8.addTo);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("mode", "GROUP")("org", ctx_r8.org)("embedded", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](7, 7, "CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("disabled", !(ctx_r8.addToSelection == null ? null : ctx_r8.addToSelection.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](10, 9, "PERMISSIONS.ADD_TO"), " ");
  }
}
function PermissionsAuthoritiesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r108 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 93)(1, "form", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngSubmit", function PermissionsAuthoritiesComponent_div_12_Template_form_ngSubmit_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r108);
      const ctx_r107 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r107.searchQuery = ctx_r107.embeddedQuery);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](2, "mat-form-field")(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](6, "input", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("ngModelChange", function PermissionsAuthoritiesComponent_div_12_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r108);
      const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r109.embeddedQuery = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](5, 2, "PERMISSIONS.SEARCH_" + ctx_r9._mode));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngModel", ctx_r9.embeddedQuery);
  }
}
function PermissionsAuthoritiesComponent_ng_template_15_h5_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "h5", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.NO_ELEMENTS"));
  }
}
function PermissionsAuthoritiesComponent_ng_template_15_h5_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "h5", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.NO_ELEMENTS_SEARCH"), " ");
  }
}
function PermissionsAuthoritiesComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](0, PermissionsAuthoritiesComponent_ng_template_15_h5_0_Template, 3, 3, "h5", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, PermissionsAuthoritiesComponent_ng_template_15_h5_1_Template, 3, 3, "h5", 95);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r12._searchQuery);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !!ctx_r12._searchQuery);
  }
}
class PermissionsAuthoritiesComponent {
  set searchQuery(searchQuery) {
    this._searchQuery = searchQuery;
    // wait for other data to be initalized
    setTimeout(() => this.search());
  }
  set org(org) {
    this._org = org;
    // this.refresh();
  }

  get org() {
    return this._org;
  }
  updateMemberSuggestions(event) {
    if (this.editMembers == this.org || this.org == null) {
      this.iam.searchUsers(event.input).subscribe(users => {
        const ret = [];
        for (const user of users.users) {
          const item = new _pages_admin_page_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.SuggestItem(user.authorityName, user.profile.firstName + ' ' + user.profile.lastName, 'person', '');
          item.originalObject = user;
          ret.push(item);
        }
        this.memberSuggestions = ret;
      }, error => console.log(error));
    } else {
      this.iam.getGroupMembers(this.org.authorityName, event.input, 'USER').subscribe(users => {
        const ret = [];
        for (const user of users.authorities) {
          const item = new _pages_admin_page_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_1__.SuggestItem(user.authorityName, user.profile.firstName + ' ' + user.profile.lastName, 'person', '');
          item.originalObject = user;
          ret.push(item);
        }
        this.memberSuggestions = ret;
      }, error => console.log(error));
    }
  }
  addMember(event) {
    if (this.editMembers === 'ALL') {
      this.iam.addGroupMember(this.org.authorityName, event.item.id).subscribe(() => {
        this.memberList.reset();
        this.searchMembers();
      }, error => this.handleError(error));
    } else {
      this.iam.addGroupMember(this.editMembers.authorityName, event.item.id).subscribe(() => {
        this.memberList.reset();
        this.searchMembers();
      }, error => this.handleError(error));
    }
  }
  set mode(mode) {
    this._mode = mode;
  }
  getMemberOptions() {
    const options = [];
    if (this.editMembers || this.editGroups) {
      const removeMembership = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_REMOVE_MEMBERSHIP', 'delete', data => this.deleteMembership(_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService.getActionbarNodes(this.nodeMemberAdd.getSelection().selected, data)));
      removeMembership.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
      removeMembership.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
      removeMembership.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
      options.push(removeMembership);
      const removeFromGroup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_REMOVE_MEMBER', 'delete', data => {
        this.deleteMember(_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService.getActionbarNodes(this.nodeMemberAdd.getSelection().selected, data));
      });
      removeFromGroup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
      removeFromGroup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
      removeFromGroup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
      options.push(removeFromGroup);
    }
    return options;
  }
  getColumns(mode, fromDialog = false) {
    const columns = [];
    if (mode == 'USER') {
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_NAME));
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_FIRSTNAME));
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_LASTNAME));
      if (!fromDialog) {
        columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_EMAIL));
        columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_STATUS));
      }
    } else if (mode == 'GROUP') {
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_DISPLAYNAME));
      if (!fromDialog) {
        columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_GROUPTYPE));
      }
    } else {
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_DISPLAYNAME));
      columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItem(mode, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_GROUPTYPE));
    }
    return columns;
  }
  constructor(breadcrumbsService, connector, dialogs, iam, node, nodeHelper, optionsHelperService, organization, ref, router, toast, translate, uiService) {
    this.breadcrumbsService = breadcrumbsService;
    this.connector = connector;
    this.dialogs = dialogs;
    this.iam = iam;
    this.node = node;
    this.nodeHelper = nodeHelper;
    this.optionsHelperService = optionsHelperService;
    this.organization = organization;
    this.ref = ref;
    this.router = router;
    this.toast = toast;
    this.translate = translate;
    this.uiService = uiService;
    this.DisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.InteractionType;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Scope;
    this.sortConfig = {
      allowed: true,
      active: null,
      direction: 'asc',
      columns: []
    };
    this.GROUP_TYPES = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.VALID_GROUP_TYPES;
    this.STATUS_TYPES = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.VALID_PERSON_STATUS_TYPES;
    this.SCOPE_TYPES = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.VALID_SCOPE_TYPES;
    this.ORG_TYPES = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.VALID_GROUP_TYPES_ORG;
    this.PRIMARY_AFFILIATIONS = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.USER_PRIMARY_AFFILIATIONS;
    this.columns = [];
    this.addMemberColumns = [];
    this.editGroupColumns = [];
    this.options = {
      useDefaultOptions: true,
      supportedOptions: [],
      addOptions: []
    };
    this.memberOptions = {
      useDefaultOptions: false,
      addOptions: []
    };
    this.isAdmin = false;
    this.editStatusNotify = true;
    this.groupSignupListShown = false;
    this.groupSignupList = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.NodeDataSource();
    this.onDeselectOrg = new _angular_core__WEBPACK_IMPORTED_MODULE_18__.EventEmitter();
    this.embedded = false;
    this.onSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_18__.EventEmitter();
    this.setTab = new _angular_core__WEBPACK_IMPORTED_MODULE_18__.EventEmitter();
    this.memberList = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.NodeDataSource();
    // show primary affiliations as list (or free text)
    this.primaryAffiliationList = true;
    this.signupActions = {
      useDefaultOptions: false
    };
    this.dataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.NodeDataSource();
    this.isAdmin = this.connector.getCurrentLogin()?.isAdmin;
    this.organization.getOrganizations().subscribe(data => {
      this.updateOptions();
      this.updateButtons();
    });
  }
  ngAfterViewInit() {
    this.nodeEntries.getSelection().changed.pipe(
    // do not fire in org mode since this loses selection on tab switch
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.filter)(() => this._mode !== 'ORG')).subscribe(selection => this.onSelection.emit(selection.source.selected));
  }
  ngOnChanges(changes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.updateColumns();
      yield _this.updateOptions();
    })();
  }
  search() {
    this.refresh();
  }
  changeSort(event) {
    //this.sortBy=event.sortBy;
    if (this._mode == 'GROUP' || this._mode == 'USER') {
      this.sortConfig.active = event.active;
    }
    this.sortConfig.direction = event.direction;
    this.dataSource.reset();
    this.loadAuthorities();
  }
  getList(data) {
    return _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService.getActionbarNodes(this.nodeEntries.getSelection().selected, data);
  }
  updateOptions() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.embedded) {
        _this2.options.addOptions = [];
        _this2.options.supportedOptions = [];
      } else {
        _this2.options.supportedOptions = ['OPTIONS.DEBUG'];
        const options = [];
        if (_this2._mode === 'ORG') {
          const global = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_TOOLPERMISSIONS_GLOBAL', 'playlist_add_check', data => _this2.toolpermissionAuthority = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.getAuthorityEveryone());
          global.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
          global.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          global.priority = 10;
          global.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
          options.push(global);
        }
        if (_this2._mode === 'GROUP') {
          const createGroup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_CREATE_GROUP', 'add', data => _this2.createGroup());
          createGroup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
          createGroup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          createGroup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
          options.push(createGroup);
        }
        if (_this2._mode === 'USER') {
          if (_this2.org) {
            const addUser = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_ADD_GROUP_MEMBERS', 'person_add', data => _this2.addMembersFunction(_this2.org));
            addUser.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
            addUser.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
            addUser.priority = 10;
            addUser.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
            options.push(addUser);
          }
          if (_this2.orgs) {
            const createAuthority = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_CREATE_USER', 'add', data => _this2.createAuthority());
            createAuthority.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
            createAuthority.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
            createAuthority.priority = 10;
            createAuthority.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
            options.push(createAuthority);
          }
          const download = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.EXPORT_MEMBER', 'cloud_download', data => _this2.downloadMembers());
          download.onlyDesktop = true;
          download.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
          download.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          download.priority = 10;
          download.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
          options.push(download);
        }
        if (_this2._mode === 'ORG' && _this2.orgs && _this2.orgs.canCreate) {
          const newOrg = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.ADD_ORG', 'add', data => _this2.createOrg());
          newOrg.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Unknown];
          newOrg.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          newOrg.priority = 20;
          newOrg.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoSelection];
          options.push(newOrg);
        }
        const orgSignupList = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.ORG_SIGNUP_LIST', 'playlist_add', /*#__PURE__*/function () {
          var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this2.toast.showProgressSpinner();
            _this2.groupSignup = _this2.getList(data)[0];
            _this2.groupSignupListShown = true;
            _this2.ref.tick();
            _this2.signupList.getSelection().clear();
            _this2.groupSignupList.setData(yield _this2.iam.getGroupSignupList(_this2.groupSignup.authorityName).toPromise());
            yield _this2.signupList.initOptionsGenerator({
              actionbar: _this2.actionbarSignup,
              customOptions: _this2.signupActions
            });
            _this2.toast.closeProgressSpinner();
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        orgSignupList.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
        orgSignupList.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Edit;
        orgSignupList.customShowCallback = /*#__PURE__*/function () {
          var _ref2 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (nodes) {
            return nodes[0].signupMethod === 'list';
          });
          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }();
        orgSignupList.priority = 20;
        orgSignupList.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
        options.push(orgSignupList);
        const orgSignup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.ORG_SIGNUP', 'checkbox', data => {
          _this2.groupSignup = _this2.getList(data)[0];
          _this2.groupSignupDetails = {
            signupMethod: _this2.getList(data)[0].signupMethod ?? 'disabled',
            signupPassword: ''
          };
        });
        orgSignup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
        orgSignup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Edit;
        orgSignup.priority = 30;
        orgSignup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
        options.push(orgSignup);
        const addToGroup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_ADD_TO_GROUP', 'group_add', data => _this2.addToGroup(data));
        addToGroup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        addToGroup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
        addToGroup.priority = 10;
        addToGroup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
        options.push(addToGroup);
        const manageMemberships = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_EDIT_GROUPS', 'group', data => _this2.openEditGroups(data));
        manageMemberships.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        manageMemberships.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
        manageMemberships.priority = 20;
        manageMemberships.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
        options.push(manageMemberships);
        if (_this2._mode === 'GROUP') {
          const addMembers = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_ADD_GROUP_MEMBERS', 'group_add', data => _this2.addMembersFunction(data));
          addMembers.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
          addMembers.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          addMembers.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
          options.push(addMembers);
          const manageMembers = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_MANAGE_GROUP', 'group', data => _this2.manageMembers(data));
          manageMembers.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
          manageMembers.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
          manageMembers.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
          options.push(manageMembers);
        }
        if (_this2._mode === 'GROUP' || _this2.orgs && _this2.orgs.canCreate) {
          const editGroup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_EDIT_GROUP', 'edit', data => _this2.editAuthority(data));
          editGroup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
          editGroup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
          editGroup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Edit;
          editGroup.priority = 10;
          options.push(editGroup);
        }
        if (_this2.orgs && _this2.orgs.canCreate) {
          const edit = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_EDIT_PERSON', 'edit', data => _this2.editAuthority(data));
          edit.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
          edit.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
          edit.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Edit;
          edit.priority = 10;
          options.push(edit);
        }
        const manage = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_TOOLPERMISSIONS', 'playlist_add_check', data => {
          _this2.toolpermissionAuthority = _this2.getList(data)[0];
        });
        manage.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk];
        manage.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        manage.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Reuse;
        options.push(manage);
        if (_this2._mode === 'GROUP') {
          const removeGroup = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_DELETE', 'delete', data => _this2.deleteAuthority(data, list => _this2.startDelete(list)));
          removeGroup.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
          removeGroup.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
          removeGroup.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
          options.push(removeGroup);
        }
        const personStatus = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_STATUS', 'check', data => _this2.setPersonStatus(_this2.getList(data)[0]));
        personStatus.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.NoBulk, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin];
        personStatus.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        personStatus.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Edit;
        options.push(personStatus);
        if (_this2.org) {
          const excludePerson = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_EXCLUDE', 'delete', data => _this2.startExclude(_this2.getList(data)));
          excludePerson.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.User];
          excludePerson.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
          excludePerson.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
          options.push(excludePerson);
        }
        if (_this2._mode === 'ORG' && _this2.orgs && _this2.orgs.canCreate) {
          const remove = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.MENU_DELETE', 'delete', data => _this2.deleteAuthority(data, list => _this2.deleteOrg(list)));
          remove.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
          remove.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Group];
          remove.constrains = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.Constrain.Admin];
          options.push(remove);
        }
        _this2.options.addOptions = options;
        const signupAdd = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.ORG_SIGNUP_ADD', 'person_add', node => {
          _this2.toast.showProgressSpinner();
          const users = _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService.getActionbarNodes(_this2.signupList.getSelection().selected, node);
          (0,rxjs__WEBPACK_IMPORTED_MODULE_21__.forkJoin)(users.map(u => _this2.iam.confirmSignup(_this2.groupSignup.authorityName, u.authorityName))).subscribe(() => {
            _this2.groupSignupListShown = false;
            _this2.toast.toast('PERMISSIONS.ORG_SIGNUP_ADD_CONFIRM');
            _this2.toast.closeProgressSpinner();
          }, error => {
            _this2.toast.error(error);
            _this2.toast.closeProgressSpinner();
          });
        });
        signupAdd.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        signupAdd.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Primary;
        const signupRemove = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionItem('PERMISSIONS.ORG_SIGNUP_REJECT', 'close', node => {
          _this2.toast.showProgressSpinner();
          const users = _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService.getActionbarNodes(_this2.signupList.getSelection().selected, node);
          (0,rxjs__WEBPACK_IMPORTED_MODULE_21__.forkJoin)(users.map(u => _this2.iam.rejectSignup(_this2.groupSignup.authorityName, u.authorityName))).subscribe(() => {
            _this2.groupSignupListShown = false;
            _this2.toast.toast('PERMISSIONS.ORG_SIGNUP_REJECT_CONFIRM');
            _this2.toast.closeProgressSpinner();
          }, error => {
            _this2.toast.error(error);
            _this2.toast.closeProgressSpinner();
          });
        });
        signupRemove.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ElementType.Person];
        signupRemove.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.DefaultGroups.Delete;
        _this2.signupActions.addOptions = [signupAdd, signupRemove];
      }
      yield _this2.nodeEntries?.initOptionsGenerator({
        actionbar: _this2.actionbar,
        customOptions: _this2.options
      });
    })();
  }
  cancelEdit() {
    this.edit = null;
  }
  cancelAddTo() {
    this.addTo = null;
  }
  cancelEditMembers() {
    this.editMembers = null;
    this.addMembers = null;
    this.editGroups = null;
    // this.refresh();
  }

  addMembersToGroup() {
    this.toast.showProgressSpinner();
    this.addToSelection = [this.addMembers];
    this.addToList = this.nodeMemberAdd.getSelection().selected;
    this.addMembers = null;
    this.addToSingle(() => this.refresh());
  }
  checkOrgExists(orgName) {
    this.organization.getOrganizations(orgName, false).subscribe(data => {
      if (data.organizations.length) {
        this.closeDialog();
        this.toast.toast('PERMISSIONS.ORG_CREATED');
        this.refresh();
      } else {
        setTimeout(() => this.checkOrgExists(orgName), 2000);
      }
    });
  }
  saveEdits() {
    if (this._mode == 'GROUP' || this._mode == 'ORG') {
      if (this.editId == null) {
        const name = this.edit.profile.displayName;
        const profile = this.edit.profile;
        if (this._mode == 'ORG') {
          this.toast.showProgressSpinner();
          this.organization.createOrganization(name).subscribe(result => {
            this.edit = null;
            this.iam.editGroup(result.authorityName, profile).subscribe(() => {
              setTimeout(() => this.checkOrgExists(name), 2000);
            }, error => {
              this.toast.error(error);
              this.toast.closeProgressSpinner();
            });
          }, error => {
            this.toast.error(error);
            this.toast.closeProgressSpinner();
          });
        } else {
          this.toast.showProgressSpinner();
          this.iam.createGroup(name, this.edit.profile, this.org ? this.org.groupName : '').subscribe(() => {
            this.edit = null;
            this.toast.closeProgressSpinner();
            this.toast.toast('PERMISSIONS.GROUP_CREATED');
            this.refresh();
          }, error => {
            this.toast.error(error);
            this.toast.closeProgressSpinner();
          });
        }
        return;
      }
      this.iam.editGroup(this.editId, this.edit.profile).subscribe(() => {
        this.edit = null;
        this.toast.toast('PERMISSIONS.GROUP_EDITED');
        this.refresh();
      }, error => this.toast.error(error));
    } else {
      const editStore = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.deepCopy(this.edit);
      if (this.edit.profile?.vcard) {
        editStore.profile.vcard = this.edit.profile.vcard.copy();
      }
      editStore.profile.sizeQuota *= 1024 * 1024;
      this.toast.showProgressSpinner();
      if (this.editId == null) {
        const name = this.editDetails.authorityName;
        const password = this.editDetails.password;
        this.iam.createUser(name, password, editStore.profile).subscribe(() => {
          this.edit = null;
          this.toast.closeProgressSpinner();
          if (this.org) {
            this.iam.addGroupMember(this.org.authorityName, name).subscribe(() => {
              this.toast.toast('PERMISSIONS.USER_CREATED');
              this.refresh();
            }, error => this.toast.error(error));
          } else {
            this.toast.toast('PERMISSIONS.USER_CREATED');
            this.refresh();
          }
        }, error => {
          this.toast.error(error);
          this.toast.closeProgressSpinner();
        });
      } else {
        this.iam.editUser(this.editId, editStore.profile).subscribe(() => {
          this.edit = null;
          this.toast.toast('PERMISSIONS.USER_EDITED');
          this.refresh();
          this.toast.closeProgressSpinner();
        }, error => {
          this.toast.error(error);
          this.toast.closeProgressSpinner();
        });
      }
    }
  }
  loadAuthorities(event = null) {
    var _this3 = this;
    this.dataSource.isLoading = true;
    let sort = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_NAME;
    if (this._mode == 'ORG') {
      sort = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_PROP_AUTHORITY_DISPLAYNAME;
    }
    if (this._mode == 'GROUP' && !this.org) {
      sort = this.sortConfig.active;
      if (sort == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_DISPLAYNAME) {
        sort = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_PROP_AUTHORITY_DISPLAYNAME;
      }
      if (sort == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_GROUPTYPE) {
        sort = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_PROP_AUTHORITY_GROUPTYPE;
      }
    } else if (this._mode == 'USER' && !this.org) {
      sort = this.sortConfig.active;
      if (sort === _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_STATUS) {
        sort = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CM_ESPERSONSTATUS;
      }
    }
    const request = {
      sortBy: [sort],
      sortAscending: this.sortConfig.direction === 'asc',
      offset: this.dataSource.getData().length
    };
    const query = this._searchQuery ? this._searchQuery : '';
    this.organization.getOrganizations(query, false).subscribe(orgs => {
      this.orgs = orgs;
      this.updateOptions();
    });
    if (this._mode === 'ORG') {
      // as non-admin, search only own orgs since these are the once with access
      this.organization.getOrganizations(query, !this.isAdmin, request).subscribe( /*#__PURE__*/function () {
        var _ref3 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (orgs) {
          yield _this3.dataSource.appendData(orgs.organizations.filter(o => o.administrationAccess));
          _this3.dataSource.isLoading = false;
          _this3.updateOptions();
        });
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    } /*
      else if(this._mode=='USER'){
      this.iam.searchUsers(this.query,request).subscribe((users : IamUsers) => {
      for(let user of users.users)
      this.list.push(user);
      this.loading=false;
      });
      }
      else{
      this.iam.searchGroups(this.query,request).subscribe((groups : IamGroups) => {
      for(let group of groups.groups)
      this.list.push(group);
      this.loading=false;
      });
      }*/else {
      if (this.org) {
        this.iam.getGroupMembers(this.org.authorityName, query, this._mode, request).subscribe( /*#__PURE__*/function () {
          var _ref4 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this3.dataSource.setPagination(data.pagination);
            yield _this3.dataSource.appendData(data.authorities);
            _this3.dataSource.isLoading = false;
          });
          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }());
      } else if (this._mode == 'GROUP') {
        this.iam.searchGroups(query, true, '', '', request).subscribe( /*#__PURE__*/function () {
          var _ref5 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this3.dataSource.setPagination(data.pagination);
            yield _this3.dataSource.appendData(data.groups);
            _this3.dataSource.isLoading = false;
          });
          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }());
      } else if (this._mode == 'USER') {
        this.iam.searchUsers(query, true, '', request).subscribe( /*#__PURE__*/function () {
          var _ref6 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this3.dataSource.setPagination(data.pagination);
            yield _this3.dataSource.appendData(data.users);
            _this3.dataSource.isLoading = false;
          });
          return function (_x6) {
            return _ref6.apply(this, arguments);
          };
        }());
      }
    }
  }
  editAuthority(data) {
    const list = this.getList(data);
    if (this._mode == 'ORG') {
      this.node.getNodeParents(list[0].sharedFolder.id, true).subscribe(data => {
        this.edit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.deepCopy(list[0]);
        data.nodes = data.nodes.reverse().slice(1);
        this.edit.folderPath = data.nodes;
        this.breadcrumbsService.setNodePath(data.nodes);
        this.editId = this.edit.authorityName;
      }, error => this.toast.error(error));
    } else if (this._mode == 'USER') {
      this.iam.getUser(list[0].authorityName).subscribe(user => {
        this.edit = user.person;
        this.edit.profile.sizeQuota = user.person.quota.sizeQuota / 1024 / 1024;
        this.editId = this.edit.authorityName;
        this.primaryAffiliationList = this.edit.profile.primaryAffiliation ? this.PRIMARY_AFFILIATIONS.indexOf(this.edit.profile.primaryAffiliation) != -1 : true;
      });
    } else {
      this.edit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_4__.Helper.deepCopy(list[0]);
      this.editId = this.edit.authorityName;
    }
    this.updateButtons();
  }
  addToGroup(data) {
    const list = this.getList(data);
    this.addTo = list;
    this.addToSelection = null;
    this.uiService.waitForComponent(this, 'addToComponent').subscribe(() => this.addToComponent.loadAuthorities());
  }
  openEditGroups(data) {
    const list = this.getList(data);
    this.editGroups = list[0];
    this.initMembersList();
    this.manageMemberSearch = '';
    this.memberList.reset();
    this.searchMembers();
  }
  addToSelect() {
    this.addToList = this.nodeEntries.getSelection().selected;
    this.addToSingle();
  }
  addToSingle(callback = null, position = 0, groupPosition = 0, errors = 0) {
    if (position == this.addToList.length) {
      if (groupPosition < this.addToSelection.length - 1) {
        this.addToSingle(callback, 0, groupPosition + 1, errors);
      } else {
        if (groupPosition == 0) {
          if (errors) this.showToast('PERMISSIONS.USER_ADDED_FAILED', {
            count: position - errors,
            error: errors,
            group: this.addToSelection[0].profile.displayName
          });else this.showToast('PERMISSIONS.USER_ADDED_TO_GROUP', {
            count: position,
            group: this.addToSelection[0].profile.displayName
          });
        } else {
          const count = this.addToList.length * this.addToSelection.length;
          if (errors) this.showToast('PERMISSIONS.USER_ADDED_FAILED_MULTI', {
            count: count - errors,
            error: errors
          });else this.showToast('PERMISSIONS.USER_ADDED_TO_GROUP_MULTI', {
            count
          });
        }
        this.addTo = null;
        this.toast.closeProgressSpinner();
        if (callback) callback();
      }
      return;
    }
    this.toast.showProgressSpinner();
    this.iam.addGroupMember(this.addToSelection[groupPosition].authorityName, this.addToList[position].authorityName).subscribe(() => {
      this.addToSingle(callback, position + 1, groupPosition, errors);
    }, error => {
      if (error.status == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.DUPLICATE_NODE_RESPONSE) {
        errors++;
      } else {
        this.toast.error(error);
      }
      this.addToSingle(callback, position + 1, groupPosition, errors);
    });
  }
  deleteAuthority(data, callback) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const list = _this4.getList(data);
      if (_this4._mode == 'GROUP' && list.filter(l => l.groupType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.GROUP_TYPE_ADMINISTRATORS).length) {
        _this4.toast.error(null, 'PERMISSIONS.DELETE_ERROR_ADMINISTRATORS');
        return;
      }
      const dialogRef = yield _this4.dialogs.openGenericDialog({
        title: 'PERMISSIONS.DELETE_TITLE',
        message: 'PERMISSIONS.DELETE_' + _this4._mode + (list.length === 1 ? '_SINGLE' : ''),
        messageParameters: {
          name: _this4._mode == 'USER' ? list[0].authorityName : list[0].profile.displayName
        },
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__.DELETE_OR_CANCEL
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'YES_DELETE') {
          callback(list);
        }
      });
    })();
  }
  refresh() {
    this.dataSource.reset();
    this.nodeEntries.getSelection().clear();
    this.optionsHelperService.refreshComponents();
    this.loadAuthorities();
  }
  closeDialog() {
    this.toast.closeProgressSpinner();
  }
  startDelete(data, position = 0, error = false) {
    this.closeDialog();
    if (position == data.length) {
      this.toast.closeProgressSpinner();
      this.refresh();
      if (!error) this.toast.toast('PERMISSIONS.DELETED_' + this._mode);
      return;
    }
    this.toast.showProgressSpinner();
    if (this._mode == 'USER') {
      console.error('delete for user does not exists');
    } else {
      this.iam.deleteGroup(data[position].authorityName).subscribe(() => this.startDelete(data, position + 1, error), error => {
        this.toast.error(error);
        this.startDelete(data, position + 1, true);
      });
    }
  }
  startExclude(data, position = 0) {
    this.closeDialog();
    if (position == data.length) {
      this.toast.closeProgressSpinner();
      this.refresh();
      this.toast.toast('PERMISSIONS.DELETED_' + this._mode);
      return;
    }
    this.toast.showProgressSpinner();
    this.organization.removeMember(this.org.groupName, data[position].authorityName).subscribe(() => this.startExclude(data, position + 1), error => this.toast.error(error));
  }
  createAuthority() {
    this.edit = {
      profile: {}
    };
    this.editDetails = {};
    this.editId = null;
    this.updateButtons();
  }
  createGroup() {
    this.createAuthority();
    this.edit.profile.groupType = null;
    this.edit.profile.scopeType = null;
  }
  createOrg() {
    this.createGroup();
  }
  addMembersFunction(data) {
    if (data === 'ALL') this.addMembers = this.org;else {
      const list = this.getList(data);
      this.addMembers = list[0];
    }
    this.initMembersList();
    this.manageMemberSearch = '';
    this.searchMembers();
  }
  manageMembers(data) {
    if (data === 'ALL') this.editMembers = this.org;else {
      const list = this.getList(data);
      this.editMembers = list[0];
    }
    this.initMembersList();
    this.manageMemberSearch = '';
    this.searchMembers();
  }
  deleteMember(list, position = 0) {
    if (list.length === position) {
      this.toast.toast('PERMISSIONS.MEMBER_REMOVED');
      this.memberOptions.addOptions = this.getMemberOptions();
      this.memberList.reset();
      this.searchMembers();
      this.toast.closeProgressSpinner();
      return;
    }
    this.toast.showProgressSpinner();
    this.iam.deleteGroupMember(this.editMembers === 'ALL' ? this.org.authorityName : this.editMembers.authorityName, list[position].authorityName).subscribe(() => {
      this.deleteMember(list, position + 1);
    }, error => this.toast.error(error));
  }
  deleteMembership(list, position = 0) {
    if (list.length === position) {
      this.toast.toast('PERMISSIONS.MEMBERSHIP_REMOVED');
      this.memberOptions.addOptions = this.getMemberOptions();
      this.memberList.reset();
      this.searchMembers();
      this.toast.closeProgressSpinner();
      return;
    }
    this.toast.showProgressSpinner();
    this.iam.deleteGroupMember(list[position].authorityName, this.editGroups.authorityName).subscribe(() => {
      this.deleteMembership(list, position + 1);
    }, error => this.toast.error(error));
  }
  searchMembers() {
    this.memberOptions.addOptions = this.getMemberOptions();
    this.memberList.reset();
    this.nodeMemberAdd.getSelection().clear();
    this.refreshMemberList();
  }
  refreshMemberList() {
    var _this5 = this;
    this.memberList.isLoading = true;
    if (this.addMembers) {
      if (this.org && this.addMembers.authorityName != this.org.authorityName) {
        const request = {
          sortBy: ['authorityName'],
          offset: this.memberList.getData().length
        };
        this.iam.getGroupMembers(this.org.authorityName, this.manageMemberSearch, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_TYPE_USER, request).subscribe( /*#__PURE__*/function () {
          var _ref7 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this5.memberList.setPagination(data.pagination);
            yield _this5.memberList.appendData(data.authorities);
            _this5.memberList.isLoading = false;
          });
          return function (_x7) {
            return _ref7.apply(this, arguments);
          };
        }());
      } else {
        const request = {
          sortBy: ['firstName'],
          offset: this.memberList.getData().length
        };
        this.iam.searchUsers(this.manageMemberSearch, true, '', request).subscribe( /*#__PURE__*/function () {
          var _ref8 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
            _this5.memberList.setPagination(data.pagination);
            yield _this5.memberList.appendData(data.users);
            _this5.memberList.isLoading = false;
          });
          return function (_x8) {
            return _ref8.apply(this, arguments);
          };
        }());
      }
    } else if (this.editGroups) {
      const request = {
        sortBy: ['authorityName'],
        offset: this.memberList.getData().length
      };
      this.iam.getUserGroups(this.editGroups.authorityName, this.manageMemberSearch, request).subscribe( /*#__PURE__*/function () {
        var _ref9 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
          _this5.memberList.setPagination(data.pagination);
          yield _this5.memberList.appendData(data.groups);
          _this5.memberList.isLoading = false;
        });
        return function (_x9) {
          return _ref9.apply(this, arguments);
        };
      }());
    } else {
      const request = {
        sortBy: ['authorityName'],
        offset: this.memberList.getData().length
      };
      this.iam.getGroupMembers(this.editMembers.authorityName, this.manageMemberSearch, _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.AUTHORITY_TYPE_USER, request).subscribe( /*#__PURE__*/function () {
        var _ref10 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
          _this5.memberList.setPagination(data.pagination);
          yield _this5.memberList.appendData(data.authorities);
          _this5.memberList.isLoading = false;
        });
        return function (_x10) {
          return _ref10.apply(this, arguments);
        };
      }());
    }
    this.updateButtons();
  }
  handleError(error) {
    if (error.status == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.DUPLICATE_NODE_RESPONSE) this.toast.error(null, 'PERMISSIONS.USER_EXISTS_IN_GROUP');else this.toast.error(error);
  }
  handleKeyboardEvent(event) {
    if (event.key == 'Escape') {
      if (this.addTo) {
        this.addTo = null;
        return;
      }
      if (this.edit) {
        this.edit = null;
        return;
      }
      if (this.editMembers) {
        this.cancelEditMembers();
        return;
      }
    }
  }
  deleteOrg(list) {
    this.toast.showProgressSpinner();
    const org = list[0];
    this.organization.deleteOrganization(org.authorityName).subscribe(() => {
      this.toast.toast('PERMISSIONS.ORG_REMOVED');
      this.toast.closeProgressSpinner();
      this.closeDialog();
      this.refresh();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
      this.refresh();
    });
  }
  deselectOrg() {
    this.onDeselectOrg.emit();
    setTimeout(() => this.refresh());
  }
  setOrgTab() {
    this.setTab.emit(0);
  }
  downloadMembers() {
    const headers = this.columns.map(c => this.translate.instant(this._mode + '.' + c.name));
    const data = [];
    for (const entry of this.dataSource.getData()) {
      data.push([entry.authorityName, entry.profile.firstName, entry.profile.lastName, entry.profile.email, entry.status.status]);
    }
    _core_module_csv_helper__WEBPACK_IMPORTED_MODULE_3__.CsvHelper.download(this.translate.instant('PERMISSIONS.DOWNLOAD_MEMBER_FILENAME'), headers, data);
  }
  openFolder(folder) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_7__.UIHelper.goToWorkspaceFolder(this.node, this.router, this.connector.getCurrentLogin(), folder.id);
  }
  updateButtons() {
    this.editButtons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.cancelEdit()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.saveEdits())];
    /**
     *
     <div class="card-action" *ngIf="editMembers">
     <a class="waves-effect waves-light btn" (click)="cancelEditMembers()">{{'CLOSE' | translate }}</a>
     </div>
     <div class="card-action" *ngIf="addMembers">
     <a class="waves-effect waves-light btn" [class.disabled]="selectedMembers.length==0" (click)="addMembersToGroup()">{{'ADD' | translate }}</a>
     <a class="waves-effect waves-light btn-flat" (click)="cancelEditMembers()">{{'CLOSE' | translate }}</a>
     </div>
     </div>
     */
    const add = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('ADD', {
      color: 'primary'
    }, () => this.addMembersToGroup());
    add.disabled = this.nodeMemberAdd?.getSelection()?.isEmpty();
    this.memberButtons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('CLOSE', {
      color: 'standard'
    }, () => this.cancelEditMembers())];
    if (this.addMembers) {
      this.memberButtons.push(add);
    }
    this.editStatusButtons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => {
      this.editStatus = null;
    }), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.savePersonStatus())];
    this.signupButtons = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton.getSaveCancel(() => this.groupSignupDetails = null, () => this.saveGroupSignup());
    this.signupListButtons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.DialogButton('CLOSE', {
      color: 'standard'
    }, () => this.groupSignupListShown = null)];
  }
  setPersonStatus(data) {
    this.editStatus = data;
    this.updateButtons();
  }
  savePersonStatus() {
    this.toast.showProgressSpinner();
    this.iam.updateUserStatus(this.editStatus.authorityName, this.editStatus.status.status, this.editStatusNotify).subscribe(() => {
      this.toast.closeProgressSpinner();
      this.editStatus = null;
    }, error => {
      this.toast.closeProgressSpinner();
      this.toast.error(error);
    });
  }
  saveGroupSignup() {
    this.toast.showProgressSpinner();
    if (this.groupSignupDetails.signupMethod === 'disabled') {
      this.groupSignupDetails.signupMethod = null;
    }
    this.iam.editGroupSignup(this.groupSignup.authorityName, this.groupSignupDetails).subscribe(() => {
      this.groupSignupDetails = null;
      this.refresh();
      this.toast.toast('PERMISSIONS.ORG_SIGNUP_SAVED');
      this.toast.closeProgressSpinner();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
    });
  }
  getLink(mode, folder) {
    return this.nodeHelper.getNodeLink(mode, folder);
  }
  onClick(event) {
    if (this._mode === 'ORG') {
      if (!this.nodeEntries.getSelection().isEmpty() && event.element === this._org) {
        this._org = null;
        this.onSelection.emit(null);
        this.nodeEntries.getSelection().clear();
        return;
      }
      this._org = event.element;
    }
    console.log(event, this._mode);
    this.nodeEntries.getSelection().clear();
    this.nodeEntries.getSelection().select(event.element);
    this.onSelection.emit(this.nodeEntries.getSelection().selected);
  }
  updateColumns() {
    if (this._mode == 'USER') {
      this.sortConfig.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('USER', 'authorityName'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('USER', 'firstName'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('USER', 'lastName'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('USER', 'email'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('USER', 'status')];
    } else {
      this.sortConfig.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('GROUP', 'displayName'), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ListItemSort('GROUP', 'groupType')];
    }
    this.sortConfig.active = this.sortConfig.columns[0].name;
    this.columns = this.getColumns(this._mode, this.embedded);
    this.addMemberColumns = this.getColumns('USER', true);
    this.editGroupColumns = this.getColumns('GROUP', true);
    // will be called by searchQuery
    // this.loadAuthorities();
  }

  selectOnClick(source, event) {
    source.getSelection().clear();
    source.getSelection().select(event.element);
  }
  initMembersList() {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.ref.tick();
      yield _this6.nodeMemberAdd?.initOptionsGenerator({
        actionbar: _this6.actionbarMember,
        customOptions: _this6.memberOptions
      });
      _this6.nodeMemberAdd.getSelection().changed.subscribe(() => _this6.updateButtons());
    })();
  }
  showToast(message, translationParams) {
    this.toast.toast(message, translationParams, null, null, null, {
      message,
      type: 'info',
      subtype: _services_toast__WEBPACK_IMPORTED_MODULE_6__.ToastType.InfoData,
      html: true
    });
  }
  static #_ = this.ɵfac = function PermissionsAuthoritiesComponent_Factory(t) {
    return new (t || PermissionsAuthoritiesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_9__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestOrganizationService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_18__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_22__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.UIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
    type: PermissionsAuthoritiesComponent,
    selectors: [["es-permissions-authorities"]],
    viewQuery: function PermissionsAuthoritiesComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c3, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c5, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c6, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.actionbar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.actionbarMember = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.actionbarSignup = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.nodeMemberAdd = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.signupList = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.addToComponent = _t.first);
      }
    },
    hostBindings: function PermissionsAuthoritiesComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("keydown", function PermissionsAuthoritiesComponent_keydown_HostBindingHandler($event) {
          return ctx.handleKeyboardEvent($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresolveDocument"]);
      }
    },
    inputs: {
      searchQuery: "searchQuery",
      org: "org",
      embedded: "embedded",
      mode: "mode"
    },
    outputs: {
      onDeselectOrg: "onDeselectOrg",
      onSelection: "onSelection",
      setTab: "setTab"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵProvidersFeature"]([_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_9__.BreadcrumbsService, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.OptionsHelperDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵNgOnChangesFeature"]],
    decls: 17,
    vars: 20,
    consts: [[1, "topFrame"], [1, "info"], [4, "ngIf"], ["actionbar", ""], [3, "authority", "onClose", 4, "ngIf"], ["height", "auto", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel", 4, "ngIf"], ["height", "auto", 3, "title", "node", "isCancelable", "buttons", "onCancel", 4, "ngIf"], ["height", "large", 3, "title", "node", "isCancelable", "buttons", "onCancel", 4, "ngIf"], ["height", "xlarge", 3, "title", "subtitle", "buttons", "onCancel", 4, "ngIf"], ["icon", "person_add", "width", "xlarge", "height", "xlarge", 3, "title", "subtitle", "buttons", "onScrolled", "onCancel", 4, "ngIf"], ["class", "addTo", 4, "ngIf"], ["class", "searchEmbedded", 4, "ngIf"], ["infinite-scroll", "", 1, "list", 3, "scope", "scrollWindow", "displayType", "elementInteractionType", "columns", "configureColumns", "dataSource", "checkbox", "sort", "scrolled", "fetchData", "clickItem", "sortChange"], ["mainList", ""], ["empty", ""], [1, "clickable", 3, "click"], [3, "authority", "onClose"], ["height", "auto", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel"], [1, "card-content-padding", "card-status"], ["floatLabel", "always", 4, "ngIf"], [3, "ngModel", "ngModelChange"], ["class", "status-change", 4, "ngIf"], ["floatLabel", "always"], ["name", "status", 3, "ngModel", "placeholder", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "status-change"], ["height", "auto", 3, "title", "node", "isCancelable", "buttons", "onCancel"], [1, "card-content-padding", "org-signup"], ["mode", "warning", "class", "warning-email", 4, "ngIf"], ["value", "disabled"], ["value", "simple"], ["value", "password"], ["value", "list"], ["mode", "info"], [3, "value", "label", "hint", "valueChange", 4, "ngIf"], ["mode", "warning", 1, "warning-email"], [3, "value", "label", "hint", "valueChange"], ["height", "large", 3, "title", "node", "isCancelable", "buttons", "onCancel"], [1, "card-content-padding", "org-signup-list"], [1, "actionbar"], [3, "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile"], ["actionbarSignup", ""], [3, "scope", "displayType", "elementInteractionType", "columns", "dataSource", "clickItem"], ["signupList", ""], [1, "mat-heading-5"], ["height", "xlarge", 3, "title", "subtitle", "buttons", "onCancel"], [1, "card-content-padding", "card-edit"], ["class", "editSystemName", 4, "ngIf"], [1, "editSystemName"], [1, "infoText"], ["matInput", "", "name", "displayName", "required", "", "autofocus", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "name", "groupEmail", 3, "ngModel", "ngModelChange"], ["name", "orgType", 3, "ngModel", "placeholder", "ngModelChange"], ["name", "scopeType", 3, "ngModel", "placeholder", "ngModelChange"], ["class", "folder-path", 4, "ngIf"], [1, "folder-path"], [3, "home", "clickable", "createLink"], ["matInput", "", "name", "firstName", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "name", "lastName", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "name", "email", "required", "", 3, "ngModel", "ngModelChange"], [1, "group"], ["name", "primaryAffiliation", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["matInput", "", "type", "text", "name", "primaryAffiliation", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["mat-flat-button", "", 3, "click"], [1, "material-icons"], [1, "quota"], ["matInput", "", "name", "sizeQuota", "required", "", 3, "ngModel", "ngModelChange"], [3, "quota", 4, "ngIf"], ["matInput", "", "name", "authorityName", "required", "", "autofocus", "", 3, "ngModel", "ngModelChange"], ["name", "primaryAffiliation", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "text", "name", "primaryAffiliation", 3, "ngModel", "ngModelChange"], [3, "label", "value", "valueChange"], [3, "quota"], ["icon", "person_add", "width", "xlarge", "height", "xlarge", 3, "title", "subtitle", "buttons", "onScrolled", "onCancel"], [1, "card-content-padding"], [1, "memberActions"], [3, "ngSubmit"], ["matInput", "", "type", "search", "name", "manageMemberSearch", 3, "ngModel", "ngModelChange"], ["class", "memberItem memberActionBar", 4, "ngIf"], ["class", "currentMembers", 4, "ngIf"], [3, "scope", "columns", "dataSource", "displayType", "elementInteractionType", "clickItem", "fetchData"], ["memberAdd", ""], [1, "memberItem", "memberActionBar"], ["actionbarMember", ""], [1, "currentMembers"], [1, "addTo"], [1, "addToList"], [3, "mode", "org", "embedded", "onSelection"], ["addToComponent", ""], [1, "btns"], ["mat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "click"], [1, "searchEmbedded"], ["matInput", "", "type", "search", "name", "embeddedSearch", 3, "ngModel", "ngModelChange"], ["class", "noElements", 4, "ngIf"], [1, "noElements"]],
    template: function PermissionsAuthoritiesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](2, PermissionsAuthoritiesComponent_div_2_Template, 3, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](3, "es-actionbar", null, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](5, PermissionsAuthoritiesComponent_es_toolpermission_manager_5_Template, 1, 1, "es-toolpermission-manager", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](6, PermissionsAuthoritiesComponent_es_card_6_Template, 9, 14, "es-card", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](7, PermissionsAuthoritiesComponent_es_card_7_Template, 25, 27, "es-card", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](8, PermissionsAuthoritiesComponent_es_card_8_Template, 10, 13, "es-card", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](9, PermissionsAuthoritiesComponent_es_card_9_Template, 8, 9, "es-card", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](10, PermissionsAuthoritiesComponent_es_card_10_Template, 14, 16, "es-card", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](11, PermissionsAuthoritiesComponent_div_11_Template, 11, 11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](12, PermissionsAuthoritiesComponent_div_12_Template, 7, 4, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](13, "es-node-entries-wrapper", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("scrolled", function PermissionsAuthoritiesComponent_Template_es_node_entries_wrapper_scrolled_13_listener() {
          return ctx.loadAuthorities();
        })("fetchData", function PermissionsAuthoritiesComponent_Template_es_node_entries_wrapper_fetchData_13_listener($event) {
          return ctx.loadAuthorities($event);
        })("clickItem", function PermissionsAuthoritiesComponent_Template_es_node_entries_wrapper_clickItem_13_listener($event) {
          return ctx.onClick($event);
        })("sortChange", function PermissionsAuthoritiesComponent_Template_es_node_entries_wrapper_sortChange_13_listener($event) {
          return ctx.changeSort($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](15, PermissionsAuthoritiesComponent_ng_template_15_Template, 2, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx._mode !== "ORG" && !ctx.embedded);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.toolpermissionAuthority);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.editStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.groupSignupDetails);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.groupSignupListShown);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.edit);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.editGroups || ctx.editMembers || ctx.addMembers);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.addTo);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.embedded);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("listEmbedded", ctx.embedded);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("scope", ctx.Scope.UserManagement)("scrollWindow", false)("displayType", ctx.DisplayType.Table)("elementInteractionType", ctx.InteractionType.Emitter)("columns", ctx.columns)("configureColumns", !ctx.embedded)("dataSource", ctx.dataSource)("checkbox", ctx._mode !== "ORG")("sort", ctx.sortConfig);
      }
    },
    dependencies: [_shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_11__.BreadcrumbsComponent, _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_12__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.InfiniteScrollDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_25__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgForm, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_13__.InfoMessageComponent, _shared_components_input_password_input_password_component__WEBPACK_IMPORTED_MODULE_14__.InputPasswordComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_26__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_27__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_28__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_30__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_31__.MatSelect, _shared_components_user_quota_user_quota_component__WEBPACK_IMPORTED_MODULE_15__.UserQuotaComponent, PermissionsAuthoritiesComponent, _toolpermission_manager_toolpermission_manager_component__WEBPACK_IMPORTED_MODULE_16__.ToolpermissionManagerComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_17__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.FormatDatePipe],
    styles: ["\n\n.topFrame[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1;\n  width: 100%;\n  padding: 15px 10px;\n  display: flex;\n  align-items: center;\n}\n.topFrame[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  color: var(--palette-foreground-text);\n  font-weight: bold;\n  margin: 0 20px;\n}\n.topFrame[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n.topFrame[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto;\n  grid-gap: 5px;\n}\n.topFrame[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.25em;\n  max-height: 1.25em;\n  -webkit-line-clamp: 1; \n\n  -webkit-box-orient: vertical;\n  \n\n}\n.topFrame[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:not(:first-child):before {\n  color: #383838;\n  content: \" | \";\n  cursor: default;\n}\n.topFrame[_ngcontent-%COMP%]   es-actionbar[_ngcontent-%COMP%] {\n  min-width: 170px;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.org-signup[_ngcontent-%COMP%]   .warning-email[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 20px;\n}\n.org-signup[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .org-signup[_ngcontent-%COMP%]   es-input-password[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.org-signup[_ngcontent-%COMP%]   es-input-password[_ngcontent-%COMP%] {\n  display: flex;\n  margin-top: 20px;\n}\n\n.org-signup-list[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.54);\n}\n.org-signup-list[_ngcontent-%COMP%]   .actionbar[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  height: 45px;\n  justify-content: flex-end;\n}\n\n  .org-signup es-input-password mat-form-field {\n  width: 100%;\n}\n\n.memberActions[_ngcontent-%COMP%] {\n  height: 50px;\n  display: table;\n  margin-bottom: 10px;\n}\n\n.memberActions[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  width: 100%;\n}\n\n.memberActionBar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 25px;\n  right: 40px;\n}\n\n.memberItem[_ngcontent-%COMP%] {\n  display: table-cell;\n}\n\n.memberInput[_ngcontent-%COMP%] {\n  width: 280px;\n}\n\n[_nghost-%COMP%]     .card-status mat-checkbox {\n  display: flex;\n  margin-bottom: 20px;\n}\n[_nghost-%COMP%]     .card-edit mat-form-field {\n  width: 100%;\n}\n[_nghost-%COMP%]     .card-edit .folder-path {\n  display: flex;\n  flex-direction: column;\n}\n[_nghost-%COMP%]     .card-edit .folder-path   .breadcrumb {\n  flex-wrap: wrap;\n}\n[_nghost-%COMP%]     .card-edit .group {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n[_nghost-%COMP%]     .card-edit .group .mat-form-field-wrapper {\n  padding-bottom: 0;\n}\n\n.editSystemName[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.noElements[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  padding-top: 10px;\n  color: rgba(0, 0, 0, 0.54);\n  font-size: 110%;\n}\n\n.infoText[_ngcontent-%COMP%] {\n  padding: 5px 15px;\n}\n\n#orgType[_ngcontent-%COMP%] {\n  margin-bottom: 1.5em;\n}\n\n.folderLocation[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n\n.list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  position: fixed;\n  top: calc(var(--mainnavHeight) + 105px);\n  width: 100%;\n  height: calc(100% - (var(--mainnavHeight) + 105px));\n}\n\n.searchEmbedded[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.searchEmbedded[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.listEmbedded[_ngcontent-%COMP%] {\n  top: 270px;\n  height: calc(100% - 330px);\n  width: 400px;\n}\n\n.formEmbedded[_ngcontent-%COMP%] {\n  width: 400px;\n}\n\nlabel.search[_ngcontent-%COMP%] {\n  position: relative;\n  top: 8px;\n  left: 82px;\n}\n\n.currentMembers[_ngcontent-%COMP%] {\n  margin-top: -10px;\n  margin-bottom: 10px;\n}\n\n.addTo[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 0;\n  width: 400px;\n  top: calc(115px + var(--mainnavHeight));\n  height: calc(100% - 115px - var(--mainnavHeight));\n  z-index: 2;\n  padding-bottom: 20px;\n  background-color: #fff;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n.addTo[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%] {\n  padding: 10px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.addToList[_ngcontent-%COMP%] {\n  height: calc(100% - 37px);\n  overflow-y: auto;\n}\n\n#groupType[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy91c2VyLW1hbmFnZW1lbnQtcGFnZS9hdXRob3JpdGllcy9hdXRob3JpdGllcy5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksZUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFBSjtBQUNJO0VBQ0ksWUFBQTtFQUNBLHFDQ0pNO0VES04saUJBQUE7RUFDQSxjQUFBO0FBQ1I7QUFBUTtFQUNJLHlCQUFBO0FBRVo7QUFBUTtFQUNJLGFBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7QUFFWjtBQUFnQjtFRWJaLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkZTd0MsRUVUWiw0QkFBQTtFQUM1Qiw0QkFBQTtFQUNBLHNCQUFBO0FGZ0JKO0FBUGdCO0VBQ0ksY0ROVDtFQ09TLGNBQUE7RUFDQSxlQUFBO0FBU3BCO0FBSkk7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtBQU1SOztBQUZJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBS1I7QUFISTs7RUFFSSxXQUFBO0FBS1I7QUFISTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtBQUtSOztBQURJO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkRXUztBQ1BqQjtBQUZJO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7QUFJUjs7QUFDUTtFQUNJLFdBQUE7QUFFWjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFDQTtFQUNJLGlCQUFBO0VBQ0EsV0FBQTtBQUVKOztBQUFBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQUdKOztBQURBO0VBQ0ksbUJBQUE7QUFJSjs7QUFGQTtFQUNJLFlBQUE7QUFLSjs7QUFEUTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtBQUlaO0FBQVE7RUFDSSxXQUFBO0FBRVo7QUFBUTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUVaO0FBQWdCO0VBQ0ksZUFBQTtBQUVwQjtBQUVRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFBWjtBQUVZO0VBQ0ksaUJBQUE7QUFBaEI7O0FBS0E7RUFDSSxtQkFBQTtBQUZKOztBQUlBO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkQvRGE7RUNnRWIsZUQ5R1k7QUM2R2hCOztBQUdBO0VBQ0ksaUJBQUE7QUFBSjs7QUFFQTtFQUNJLG9CQUFBO0FBQ0o7O0FBQ0E7RUFDSSxxQkM5SU07QURnSlY7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSx1Q0FBQTtFQUNBLFdBQUE7RUFDQSxtREFBQTtBQUNKOztBQUNBO0VBQ0ksYUFBQTtBQUVKO0FBREk7RUFDSSxXQUFBO0FBR1I7O0FBQUE7RUFDSSxVQUFBO0VBQ0EsMEJBQUE7RUFDQSxZQWpCUztBQW9CYjs7QUFEQTtFQUNJLFlBcEJTO0FBd0JiOztBQUZBO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtBQUtKOztBQUhBO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBQU1KOztBQUpBO0VBQ0ksZUFBQTtFQUNBLFFBQUE7RUFDQSxZQWxDUztFQW1DVCx1Q0FBQTtFQUNBLGlEQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0VBQ0Esc0JBQUE7RUVyS0Esc0NBQUE7QUY2S0o7QUFOSTtFQUNJLGFBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7QUFRUjs7QUFMQTtFQUNJLHlCQUFBO0VBQ0EsZ0JBQUE7QUFRSjs7QUFOQTtFQUNJLG1CQUFBO0FBU0oiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLnRvcEZyYW1lIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiAxNXB4IDEwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC5pbmZvIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBjb2xvcjogJHRleHRQcmltYXJ5O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgbWFyZ2luOiAwIDIwcHg7XG4gICAgICAgIGEge1xuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgfVxuICAgICAgICA+IGRpdiA+IGRpdiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gICAgICAgICAgICBncmlkLWdhcDogNXB4O1xuICAgICAgICAgICAgPiBzcGFuIHtcbiAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICAgICAgQGluY2x1ZGUgbGltaXRMaW5lQ291bnQoMSwgMS4yNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID4gYTpub3QoOmZpcnN0LWNoaWxkKTpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRNYWluO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnIHwgJztcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlcy1hY3Rpb25iYXIge1xuICAgICAgICBtaW4td2lkdGg6IDE3MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cbn1cbi5vcmctc2lnbnVwIHtcbiAgICAud2FybmluZy1lbWFpbCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIG1hdC1mb3JtLWZpZWxkLFxuICAgIGVzLWlucHV0LXBhc3N3b3JkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIGVzLWlucHV0LXBhc3N3b3JkIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICB9XG59XG4ub3JnLXNpZ251cC1saXN0IHtcbiAgICBoNSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGNvbG9yOiAkbm9SZXN1bHRzQ29sb3I7XG4gICAgfVxuICAgIC5hY3Rpb25iYXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA0NXB4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cbn1cbjo6bmctZGVlcCB7XG4gICAgLm9yZy1zaWdudXAgZXMtaW5wdXQtcGFzc3dvcmQge1xuICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5tZW1iZXJBY3Rpb25zIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5tZW1iZXJBY3Rpb25zIGlucHV0IHtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICB3aWR0aDogMTAwJTtcbn1cbi5tZW1iZXJBY3Rpb25CYXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDI1cHg7XG4gICAgcmlnaHQ6IDQwcHg7XG59XG4ubWVtYmVySXRlbSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbn1cbi5tZW1iZXJJbnB1dCB7XG4gICAgd2lkdGg6IDI4MHB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAuY2FyZC1zdGF0dXMge1xuICAgICAgICBtYXQtY2hlY2tib3gge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmNhcmQtZWRpdCB7XG4gICAgICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5mb2xkZXItcGF0aCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIDo6bmctZGVlcCB7XG4gICAgICAgICAgICAgICAgLmJyZWFkY3J1bWIge1xuICAgICAgICAgICAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5ncm91cCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgICAgICAgICAgIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi5lZGl0U3lzdGVtTmFtZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5ub0VsZW1lbnRzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgY29sb3I6ICRub1Jlc3VsdHNDb2xvcjtcbiAgICBmb250LXNpemU6ICRmb250U2l6ZUxhcmdlO1xufVxuLmluZm9UZXh0IHtcbiAgICBwYWRkaW5nOiA1cHggMTVweDtcbn1cbiNvcmdUeXBlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVlbTtcbn1cbi5mb2xkZXJMb2NhdGlvbiB7XG4gICAgY29sb3I6ICRwcmltYXJ5O1xufVxuXG4kYWRkVG9XaWR0aDogNDAwcHg7XG4ubGlzdCB7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiBjYWxjKHZhcigtLW1haW5uYXZIZWlnaHQpICsgMTA1cHgpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gKGNhbGModmFyKC0tbWFpbm5hdkhlaWdodCkgKyAxMDVweCkpKTtcbn1cbi5zZWFyY2hFbWJlZGRlZCB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbi5saXN0RW1iZWRkZWQge1xuICAgIHRvcDogMjcwcHg7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAzMzBweCk7XG4gICAgd2lkdGg6ICRhZGRUb1dpZHRoO1xufVxuLmZvcm1FbWJlZGRlZCB7XG4gICAgd2lkdGg6ICRhZGRUb1dpZHRoO1xufVxubGFiZWwuc2VhcmNoIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiA4cHg7XG4gICAgbGVmdDogODJweDtcbn1cbi5jdXJyZW50TWVtYmVycyB7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5hZGRUbyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHJpZ2h0OiAwO1xuICAgIHdpZHRoOiAkYWRkVG9XaWR0aDtcbiAgICB0b3A6IGNhbGMoMTE1cHggKyB2YXIoLS1tYWlubmF2SGVpZ2h0KSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxMTVweCAtIHZhcigtLW1haW5uYXZIZWlnaHQpKTtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3coKTtcbiAgICAuYnRucyB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB9XG59XG4uYWRkVG9MaXN0IHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDM3cHgpO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG59XG4jZ3JvdXBUeXBlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.trigger)('fromRight', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.UIAnimation.fromRight()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_32__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_19__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 86527:
/*!***********************************************************************!*\
  !*** ./src/app/pages/user-management-page/delete/delete.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PermissionsDeleteComponent: () => (/* binding */ PermissionsDeleteComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/authority-search-input/authority-search-input.component */ 68504);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/select */ 96355);



























function PermissionsDeleteComponent_es_card_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "es-card", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "textarea", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 5, "PERMISSIONS.DELETE.RESULTS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("isCancelable", false)("buttons", ctx_r0.deleteButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r0.deleteResult);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 7, "PERMISSIONS.DELETE.RESULTS_HINT"));
  }
}
function PermissionsDeleteComponent_es_spinner_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-spinner");
  }
}
function PermissionsDeleteComponent_h3_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h3", 12)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PermissionsDeleteComponent_h3_7_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r7.refresh());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, "PERMISSIONS.DELETE.USER_LIST"));
  }
}
function PermissionsDeleteComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "es-node-entries-wrapper", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("displayType", ctx_r3.DisplayType.Table)("columns", ctx_r3.columns)("dataSource", ctx_r3.usersDataSource)("checkbox", true)("elementInteractionType", ctx_r3.InteractionType.Emitter);
  }
}
function PermissionsDeleteComponent_es_info_message_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.NO_USERS"));
  }
}
function PermissionsDeleteComponent_div_10_div_1_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const j_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", j_r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](j_r12.description);
  }
}
function PermissionsDeleteComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19)(1, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "mat-form-field")(5, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "mat-select", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_div_1_Template_mat_select_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r13.job = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, PermissionsDeleteComponent_div_10_div_1_mat_option_12_Template, 2, 2, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 6, "PERMISSIONS.DELETE.JOBS.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 8, "PERMISSIONS.DELETE.JOBS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r9.job);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", "NONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 10, "PERMISSIONS.DELETE.JOBS.DEFAULT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r9.jobs);
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r31));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.HOME_FOLDER_NONE"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.HOME_FOLDER_DELETE"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r32));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r33));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r34));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r35));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r36 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r36));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_div_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 35)(1, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_div_60_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r37.options.sharedFolders.move = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r23.options.sharedFolders.move);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 2, "PERMISSIONS.DELETE.MOVE_SHARED_FILES"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r39));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mode_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", mode_r40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, "PERMISSIONS.DELETE.DELETE_MODE." + mode_r40));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-chip-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("removed", function PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_7_Template_mat_chip_option_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r43.receiver = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, ctx_r41.receiver));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-chip-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("removed", function PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_15_Template_mat_chip_option_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r46);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r45.receiverGroup = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, ctx_r42.receiverGroup));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 36)(1, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "es-authority-search-input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("onChooseAuthority", function PermissionsDeleteComponent_div_10_ng_container_2_div_79_Template_es_authority_search_input_onChooseAuthority_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r48);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r47.receiver = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "mat-chip-listbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_7_Template, 5, 3, "mat-chip-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "es-authority-search-input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("onChooseAuthority", function PermissionsDeleteComponent_div_10_ng_container_2_div_79_Template_es_authority_search_input_onChooseAuthority_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r48);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r49.receiverGroup = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "mat-chip-listbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, PermissionsDeleteComponent_div_10_ng_container_2_div_79_mat_chip_option_15_Template, 5, 3, "mat-chip-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 12, "PERMISSIONS.DELETE.RECEIVER_CAPTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 14, "PERMISSIONS.DELETE.RECEIVER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("globalSearchAllowed", true)("showRecent", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r26.receiver);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](10, 16, "PERMISSIONS.DELETE.RECEIVER_GROUP_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("hint", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 18, "PERMISSIONS.DELETE.RECEIVER_GROUP_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](13, 20, "PERMISSIONS.DELETE.RECEIVER_GROUP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("mode", ctx_r26.AuthoritySearchMode.Organizations)("globalSearchAllowed", true)("showRecent", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r26.receiverGroup);
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.NO_RECEIVER"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.DELETE_COLLECTIONS"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "es-info-message", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.DELETE.STATE.NON_CONFORM"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_div_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 42)(1, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_div_84_Template_mat_checkbox_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r50.options.cleanupMetadata = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 4, "PERMISSIONS.DELETE.METADATA.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r30.options.cleanupMetadata);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 6, "PERMISSIONS.DELETE.METADATA.DELETE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 8, "PERMISSIONS.DELETE.METADATA.HINT"));
  }
}
function PermissionsDeleteComponent_div_10_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 3)(2, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 23)(6, "div")(7, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r52.options.homeFolder.folders = $event);
    })("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r54.updateForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_11_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_12_Template, 2, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_13_Template, 2, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div")(15, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r55.options.homeFolder.privateFiles = $event);
    })("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r56.updateForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](19, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_19_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "div")(21, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](24, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r57.options.homeFolder.ccFiles = $event);
    })("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r58.updateForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_25_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "div", 26)(27, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "mat-radio-group", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_30_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r59.options.homeFolder.keepFolderStructure = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](36, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 3)(38, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](40, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](41, "div", 23)(42, "div")(43, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](45, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](46, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r60.options.sharedFolders.folders = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](47, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_47_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](48, "div")(49, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](51, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](52, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_52_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r61.options.sharedFolders.privateFiles = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](53, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_53_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](54, "div")(55, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](56);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](57, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](58, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_58_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r62.options.sharedFolders.ccFiles = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](59, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_59_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](60, PermissionsDeleteComponent_div_10_ng_container_2_div_60_Template, 4, 4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](61, "div", 3)(62, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](63);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](64, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](65, "div", 23)(66, "div")(67, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](69, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](70, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_70_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r63.options.collections.privateCollections = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](71, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_71_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](72, "div")(73, "h4", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](74);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](75, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](76, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_radio_group_ngModelChange_76_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r64.options.collections.publicCollections = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](77, PermissionsDeleteComponent_div_10_ng_container_2_mat_radio_button_77_Template, 3, 4, "mat-radio-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](78, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](79, PermissionsDeleteComponent_div_10_ng_container_2_div_79_Template, 16, 22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](80, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](81, PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_81_Template, 2, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](82, PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_82_Template, 2, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](83, PermissionsDeleteComponent_div_10_ng_container_2_es_info_message_83_Template, 2, 3, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](84, PermissionsDeleteComponent_div_10_ng_container_2_div_84_Template, 10, 10, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](85, "div", 32)(86, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](87);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](88, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](89, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_checkbox_ngModelChange_89_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r65.options.stream.delete = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](90);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](91, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](92, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](93);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](94, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](95, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_checkbox_ngModelChange_95_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r66.options.comments.delete = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](96);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](97, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](98, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](99);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](100, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](101, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_checkbox_ngModelChange_101_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r67.options.ratings.delete = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](102);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](103, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](104, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](105);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](106, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](107, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_checkbox_ngModelChange_107_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r68.options.collectionFeedback.delete = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](108);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](109, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](110, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](111);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](112, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](113, "mat-checkbox", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function PermissionsDeleteComponent_div_10_ng_container_2_Template_mat_checkbox_ngModelChange_113_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r53);
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r69.options.statistics.delete = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](114);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](115, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](116, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](117);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](118, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](119, "es-info-message", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](120, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 59, "PERMISSIONS.DELETE.HOME_FOLDER.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 61, "PERMISSIONS.DELETE.HOME_FOLDER.FOLDERS_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.homeFolder.folders);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.options.homeFolder.folders === "none");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.options.homeFolder.folders === "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](17, 63, "PERMISSIONS.DELETE.HOME_FOLDER.PRIVATE_FILES_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.homeFolder.privateFiles);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](23, 65, "PERMISSIONS.DELETE.HOME_FOLDER.CC_FILES_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.homeFolder.ccFiles);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](29, 67, "PERMISSIONS.DELETE.HOME_FOLDER.FOLDER_STRUCTURE_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.homeFolder.keepFolderStructure)("disabled", !ctx_r10.allAssigning());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](33, 69, "PERMISSIONS.DELETE.FOLDER_STRUCTURE_DISINTEGRATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](36, 71, "PERMISSIONS.DELETE.FOLDER_STRUCTURE_KEEP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](40, 73, "PERMISSIONS.DELETE.SHARED_FOLDERS.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](45, 75, "PERMISSIONS.DELETE.SHARED_FOLDERS.FOLDERS_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.sharedFolders.folders);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModesFolder);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](51, 77, "PERMISSIONS.DELETE.SHARED_FOLDERS.PRIVATE_FILES_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.sharedFolders.privateFiles);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](57, 79, "PERMISSIONS.DELETE.SHARED_FOLDERS.CC_FILES_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.sharedFolders.ccFiles);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.options.sharedFolders.privateFiles === "assign" || ctx_r10.options.sharedFolders.ccFiles === "assign");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](64, 81, "PERMISSIONS.DELETE.COLLECTIONS.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](69, 83, "PERMISSIONS.DELETE.COLLECTIONS.PRIVATE_COLLECTIONS_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.collections.privateCollections);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](75, 85, "PERMISSIONS.DELETE.COLLECTIONS.PUBLIC_COLLECTIONS_CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.collections.publicCollections);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r10.deleteModes);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.hasAssigning());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.missingAssigning());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.options.collections.privateCollections === "delete" || ctx_r10.options.collections.publicCollections === "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r10.isValid());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r10.hasAssigning());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](88, 87, "PERMISSIONS.DELETE.USER_INTERACTIONS.CAPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.stream.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](91, 89, "PERMISSIONS.DELETE.USER_INTERACTIONS.STREAM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](94, 91, "PERMISSIONS.DELETE.USER_INTERACTIONS.STREAM_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.comments.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](97, 93, "PERMISSIONS.DELETE.USER_INTERACTIONS.COMMENTS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](100, 95, "PERMISSIONS.DELETE.USER_INTERACTIONS.COMMENTS_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.ratings.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](103, 97, "PERMISSIONS.DELETE.USER_INTERACTIONS.RATINGS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](106, 99, "PERMISSIONS.DELETE.USER_INTERACTIONS.RATINGS_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.collectionFeedback.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](109, 101, "PERMISSIONS.DELETE.USER_INTERACTIONS.COLLECTION_FEEDBACK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](112, 103, "PERMISSIONS.DELETE.USER_INTERACTIONS.COLLECTION_FEEDBACK_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r10.options.statistics.delete);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](115, 105, "PERMISSIONS.DELETE.USER_INTERACTIONS.STATISTICS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](118, 107, "PERMISSIONS.DELETE.USER_INTERACTIONS.STATISTICS_HINT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](120, 109, "PERMISSIONS.DELETE.STATE.ASSIGNING_DELETED_USER"));
  }
}
function PermissionsDeleteComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PermissionsDeleteComponent_div_10_div_1_Template, 13, 12, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, PermissionsDeleteComponent_div_10_ng_container_2_Template, 121, 111, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r5.jobs == null ? null : ctx_r5.jobs.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r5.job === "NONE");
  }
}
function PermissionsDeleteComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 43)(1, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PermissionsDeleteComponent_div_11_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r71);
      const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r70.prepareStart());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, ctx_r6.canSubmit$));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 4, "PERMISSIONS.DELETE.START"), " ");
  }
}
class PermissionsDeleteComponent {
  constructor(admin, dialogs, iam, storage, toast, applicationRef, translate) {
    this.admin = admin;
    this.dialogs = dialogs;
    this.iam = iam;
    this.storage = storage;
    this.toast = toast;
    this.applicationRef = applicationRef;
    this.translate = translate;
    this.DisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.InteractionType;
    this.AuthoritySearchMode = _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_3__.AuthoritySearchMode;
    this.deleteModes = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.assign, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.delete];
    this.deleteModesFolder = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.assign];
    this.canSubmit$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject(false);
    this.usersDataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeDataSource();
    this.columns = [];
    this.job = 'NONE';
    // send list of target users + options for these specific users
    const defaultOptions = {
      // change this value if the config needs to be reset to default
      version: '1.0.0',
      homeFolder: {
        folders: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        privateFiles: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        ccFiles: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        keepFolderStructure: false
      },
      sharedFolders: {
        folders: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        privateFiles: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        ccFiles: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none
      },
      collections: {
        privateCollections: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none,
        publicCollections: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none
      },
      ratings: {
        delete: false
      },
      comments: {
        delete: false
      },
      collectionFeedback: {
        delete: false
      },
      statistics: {
        delete: false
      },
      stream: {
        delete: false
      },
      // change owner + (optional) invite a coordinator group
      // comments, ratings, feedback, stream, statistics
      receiver: '',
      receiverGroup: '',
      // shall the user be found & removed inside contributor metadata
      cleanupMetadata: true
    };
    this.storage.get('delete_users_options', defaultOptions).subscribe(data => {
      if (data.version === defaultOptions.version) {
        this.options = data;
      } else {
        this.options = defaultOptions;
      }
    });
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.ListItem('USER', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_NAME));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.ListItem('USER', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_FIRSTNAME));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.ListItem('USER', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_LASTNAME));
    this.deleteButtons = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton.getOk(() => {
      this.deleteResult = null;
    });
    this.refresh();
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.jobs = (yield _this.admin.getAllJobs().toPromise()).filter(j => j.tags?.includes('DeletePersonJob'));
    })();
  }
  /**
   * returns a code whether all selected modes seem to be data conform and all user-relevant data will be removed and all options match up
   */
  isValid() {
    return !this.anyModeMatches(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.none);
  }
  hasAssigning() {
    return this.anyModeMatches(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DeleteMode.assign);
  }
  anyModeMatches(mode) {
    return this.options.homeFolder.folders === mode || this.options.homeFolder.privateFiles === mode || this.options.homeFolder.ccFiles === mode || this.options.sharedFolders.folders === mode || this.options.sharedFolders.privateFiles === mode || this.options.sharedFolders.ccFiles === mode || this.options.collections.privateCollections === mode || this.options.collections.publicCollections === mode;
  }
  refresh() {
    this.usersDataSource.isLoading = true;
    const request = {
      maxItems: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COUNT_UNLIMITED
    };
    this.iam.searchUsers('*', true, 'todelete', request).subscribe(users => {
      this.usersDataSource.setData(users.users, users.pagination);
      this.applicationRef.tick();
      this.nodeEntriesWrapperComponent.getSelection().changed.subscribe(() => this.canSubmit$.next(this.canSubmit()));
      this.usersDataSource.isLoading = false;
    }, error => {
      this.toast.error(error);
      this.usersDataSource.isLoading = false;
    });
  }
  prepareStart() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let message = _this2.translate.instant('PERMISSIONS.DELETE.CONFIRM.USERS');
      for (const user of _this2.nodeEntriesWrapperComponent.getSelection().selected) {
        message += '\n' + new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_4__.AuthorityNamePipe(_this2.translate).transform(user, null);
      }
      if (_this2.hasAssigning()) {
        message += '\n\n' + _this2.translate.instant('PERMISSIONS.DELETE.CONFIRM.RECEIVER', {
          user: new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_4__.AuthorityNamePipe(_this2.translate).transform(_this2.receiver, null)
        });
        message += '\n\n' + _this2.translate.instant('PERMISSIONS.DELETE.CONFIRM.RECEIVER_GROUP', {
          group: new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_4__.AuthorityNamePipe(_this2.translate).transform(_this2.receiverGroup, null)
        });
      }
      message += '\n\n' + _this2.translate.instant('PERMISSIONS.DELETE.CONFIRM.FINAL');
      const dialogRef = yield _this2.dialogs.openGenericDialog({
        title: 'PERMISSIONS.DELETE.CONFIRM.CAPTION',
        message,
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'PERMISSIONS.DELETE.START',
          config: {
            color: 'primary'
          }
        }]
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'PERMISSIONS.DELETE.START') {
          _this2.start();
        }
      });
    })();
  }
  start() {
    this.toast.showProgressSpinner();
    if (this.job !== 'NONE') {
      this.admin.startJobSync(this.job.name, {
        authorities: this.nodeEntriesWrapperComponent.getSelection().selected.map(u => u.authorityName)
      }).subscribe(result => {
        this.toast.closeProgressSpinner();
        this.deleteResult = JSON.stringify(result, null, 2);
        this.refresh();
      }, error => {
        this.toast.error(error);
        this.toast.closeProgressSpinner();
      });
      return;
    }
    if (this.hasAssigning()) {
      this.options.receiver = this.receiver.authorityName;
      this.options.receiverGroup = this.receiverGroup.authorityName;
    }
    this.storage.set('delete_users_options', this.options);
    const submit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.options);
    delete submit.version;
    this.admin.deletePersons(this.nodeEntriesWrapperComponent.getSelection().selected.map(u => u.authorityName), submit).subscribe(result => {
      this.toast.closeProgressSpinner();
      this.deleteResult = JSON.stringify(result, null, 2);
      this.refresh();
    }, error => {
      this.toast.error(error);
      this.toast.closeProgressSpinner();
    });
  }
  missingAssigning() {
    return this.hasAssigning() && (this.receiver == null || this.receiverGroup == null);
  }
  canSubmit() {
    return !this.nodeEntriesWrapperComponent?.getSelection().isEmpty() && !this.missingAssigning();
  }
  allAssigning() {
    return this.options.homeFolder.folders === 'assign' && this.options.homeFolder.privateFiles === 'assign' && this.options.homeFolder.ccFiles === 'assign';
  }
  updateForm() {
    if (!this.allAssigning()) {
      this.options.homeFolder.keepFolderStructure = false;
    }
  }
  ngAfterViewInit() {}
  static #_ = this.ɵfac = function PermissionsDeleteComponent_Factory(t) {
    return new (t || PermissionsDeleteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_5__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: PermissionsDeleteComponent,
    selectors: [["es-permissions-delete"]],
    viewQuery: function PermissionsDeleteComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.nodeEntriesWrapperComponent = _t.first);
      }
    },
    decls: 12,
    vars: 10,
    consts: [["icon", "delete", "width", "large", "height", "xxlarge", 3, "title", "isCancelable", "buttons", 4, "ngIf"], [1, "wrapper"], [1, "mat-heading-2", "mat-heading-underline"], [1, "group"], [4, "ngIf"], ["class", "mat-heading-3 mat-heading-underline", 4, "ngIf"], ["class", "user-list", 4, "ngIf"], ["mode", "info", 3, "message", 4, "ngIf"], ["class", "group group-buttons", 4, "ngIf"], ["icon", "delete", "width", "large", "height", "xxlarge", 3, "title", "isCancelable", "buttons"], [1, "card-result"], ["matInput", "", "readonly", "", 3, "ngModel"], [1, "mat-heading-3", "mat-heading-underline"], ["mat-icon-button", "", 3, "click"], ["esIcon", "refresh"], [1, "user-list"], [3, "displayType", "columns", "dataSource", "checkbox", "elementInteractionType"], ["mode", "info", 3, "message"], ["class", "group group-jobs", 4, "ngIf"], [1, "group", "group-jobs"], [3, "ngModel", "ngModelChange"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "side-by-side"], [1, "mat-heading-4"], ["mode", "warning", 3, "message", 4, "ngIf"], [1, "structure"], [3, "ngModel", "disabled", "ngModelChange"], ["class", "move", 4, "ngIf"], ["class", "assigning", 4, "ngIf"], [1, "info-wrapper"], ["class", "group group-metadata", 4, "ngIf"], [1, "group", "group-interactions"], ["mode", "info", 1, "info-delete-assigning", 3, "message"], ["mode", "warning", 3, "message"], [1, "move"], [1, "assigning"], [3, "globalSearchAllowed", "showRecent", "placeholder", "onChooseAuthority"], [3, "removed", 4, "ngIf"], [3, "mode", "hint", "globalSearchAllowed", "showRecent", "placeholder", "onChooseAuthority"], [3, "removed"], ["matChipRemove", "", "esIcon", "cancel"], [1, "group", "group-metadata"], [1, "group", "group-buttons"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click"]],
    template: function PermissionsDeleteComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, PermissionsDeleteComponent_es_card_0_Template, 7, 9, "es-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 1)(2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, PermissionsDeleteComponent_es_spinner_6_Template, 1, 0, "es-spinner", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, PermissionsDeleteComponent_h3_7_Template, 6, 3, "h3", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, PermissionsDeleteComponent_div_8_Template, 2, 5, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, PermissionsDeleteComponent_es_info_message_9_Template, 2, 3, "es-info-message", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, PermissionsDeleteComponent_div_10_Template, 3, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, PermissionsDeleteComponent_div_11_Template, 5, 6, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.deleteResult);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 8, "PERMISSIONS.DELETE.MAIN_HEADING"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.usersDataSource.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.usersDataSource.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.usersDataSource.isEmpty());
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.usersDataSource.isLoading && ctx.usersDataSource.isEmpty());
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.usersDataSource.isLoading && !ctx.usersDataSource.isEmpty() && ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.usersDataSource.isLoading);
      }
    },
    dependencies: [_shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_3__.AuthoritySearchInputComponent, _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_7__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__.InfoMessageComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_17__.MatCheckbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__.MatChipListbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__.MatChipOption, _angular_material_chips__WEBPACK_IMPORTED_MODULE_18__.MatChipRemove, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInput, _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__.MatRadioButton, _angular_material_select__WEBPACK_IMPORTED_MODULE_22__.MatSelect, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_4__.AuthorityNamePipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
    styles: ["\n\n.wrapper[_ngcontent-%COMP%] {\n  padding: 10px 30px;\n}\n.wrapper[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%] {\n  padding: 0 10%;\n}\n.wrapper[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  margin: 10px 10%;\n}\n.wrapper[_ngcontent-%COMP%]   .user-list[_ngcontent-%COMP%] {\n  min-height: 200px;\n  max-height: 35vh;\n  overflow-y: auto;\n}\n.wrapper[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n}\n.wrapper[_ngcontent-%COMP%]   .group.group-jobs[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n  width: 100%;\n  max-width: 800px;\n}\n.wrapper[_ngcontent-%COMP%]   .group-interactions[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .group-metadata[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.wrapper[_ngcontent-%COMP%]   .group-interactions[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .group-metadata[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  margin-bottom: -8px;\n}\n.wrapper[_ngcontent-%COMP%]   .group-interactions[_ngcontent-%COMP%]   .info-delete-assigning[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .group-metadata[_ngcontent-%COMP%]   .info-delete-assigning[_ngcontent-%COMP%] {\n  padding-top: 15px;\n}\n.wrapper[_ngcontent-%COMP%]   .group-interactions[_ngcontent-%COMP%]    > mat-hint[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .group-metadata[_ngcontent-%COMP%]    > mat-hint[_ngcontent-%COMP%] {\n  padding-left: 46px;\n  padding-bottom: 2px;\n  font-size: 90%;\n}\n.wrapper[_ngcontent-%COMP%]   .side-by-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.wrapper[_ngcontent-%COMP%]   .side-by-side[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 0;\n  flex-grow: 1;\n}\n.wrapper[_ngcontent-%COMP%]   .side-by-side[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 10px;\n}\n.wrapper[_ngcontent-%COMP%]   .structure[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%] {\n  display: table;\n  margin: 10px auto 0 auto;\n}\n.wrapper[_ngcontent-%COMP%]   .assigning[_ngcontent-%COMP%] {\n  margin: 20px 20% 0 20%;\n}\n.wrapper[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.wrapper[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  margin: -5px 0;\n}\n\n.card-result[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.card-result[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 25px;\n}\n.card-result[_ngcontent-%COMP%]   mat-hint[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy91c2VyLW1hbmFnZW1lbnQtcGFnZS9kZWxldGUvZGVsZXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSkE7RUFDSSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxjQUFBO0FBRVI7QUFEUTtFQUNJLGdCQUFBO0FBR1o7QUFBSTtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUVSO0FBQUk7RUFDSSxrQkFBQTtBQUVSO0FBQVk7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUVoQjtBQUVJOztFQUVJLGFBQUE7RUFDQSxzQkFBQTtBQUFSO0FBQ1E7O0VBQ0ksbUJBQUE7QUFFWjtBQUFROztFQUNJLGlCQUFBO0FBR1o7QUFEUTs7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUlaO0FBREk7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQUdSO0FBRlE7RUFDSSxRQUFBO0VBQ0EsWUFBQTtBQUlaO0FBSFk7RUFDSSxhQUFBO0VBQ0EsYUFBQTtBQUtoQjtBQURJOztFQUVJLGNBQUE7RUFDQSx3QkFBQTtBQUdSO0FBREk7RUFDSSxzQkFBQTtBQUdSO0FBREk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFHUjtBQUZRO0VBQ0ksY0FBQTtBQUlaOztBQUFBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUdKO0FBRkk7RUFDSSxZQUFBO0VBQ0EsYURjTTtBQ1ZkO0FBRkk7RUFDSSxhRFdNO0FDUGQiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcbi53cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XG4gICAgLmluZm8td3JhcHBlciB7XG4gICAgICAgIHBhZGRpbmc6IDAgMTAlO1xuICAgICAgICBlcy1pbmZvLW1lc3NhZ2Uge1xuICAgICAgICAgICAgbWFyZ2luOiAxMHB4IDEwJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAudXNlci1saXN0IHtcbiAgICAgICAgbWluLWhlaWdodDogMjAwcHg7XG4gICAgICAgIG1heC1oZWlnaHQ6IDM1dmg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuICAgIC5ncm91cCB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgJi5ncm91cC1qb2JzIHtcbiAgICAgICAgICAgID4gbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDMwcHggMjBweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5ncm91cC1pbnRlcmFjdGlvbnMsXG4gICAgLmdyb3VwLW1ldGFkYXRhIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWF0LWNoZWNrYm94IHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IC04cHg7XG4gICAgICAgIH1cbiAgICAgICAgLmluZm8tZGVsZXRlLWFzc2lnbmluZyB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgfVxuICAgICAgICA+IG1hdC1oaW50IHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNDZweDtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAycHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDkwJTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuc2lkZS1ieS1zaWRlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIGVzLWluZm8tbWVzc2FnZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5zdHJ1Y3R1cmUsXG4gICAgLm1vdmUge1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgICAgbWFyZ2luOiAxMHB4IGF1dG8gMCBhdXRvO1xuICAgIH1cbiAgICAuYXNzaWduaW5nIHtcbiAgICAgICAgbWFyZ2luOiAyMHB4IDIwJSAwIDIwJTtcbiAgICB9XG4gICAgbWF0LXJhZGlvLWdyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgbWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgICBtYXJnaW46IC01cHggMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5jYXJkLXJlc3VsdCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgcGFkZGluZzogJGNhcmRQYWRkaW5nO1xuICAgIH1cbiAgICBtYXQtaGludCB7XG4gICAgICAgIHBhZGRpbmc6ICRjYXJkUGFkZGluZztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 57970:
/*!*******************************************************************************************************!*\
  !*** ./src/app/pages/user-management-page/toolpermission-manager/toolpermission-manager.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolpermissionManagerComponent: () => (/* binding */ ToolpermissionManagerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/spinner-small/spinner-small.component */ 65928);





















function ToolpermissionManagerComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.TOOLPERMISSIONS.DENY"), " ");
  }
}
function ToolpermissionManagerComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 6)(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ToolpermissionManagerComponent_div_3_div_7_Template, 3, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 4, ctx_r0._authority.authorityType === "GROUP" ? "PERMISSIONS.TOOLPERMISSIONS.MEMBERS_ALLOWED" : ctx_r0._authority.authorityType === "EVERYONE" ? "PERMISSIONS.TOOLPERMISSIONS.EVERYONE_ALLOWED" : "PERMISSIONS.TOOLPERMISSIONS.USER_ALLOWED"), ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 6, "PERMISSIONS.TOOLPERMISSIONS.ALLOW"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0._authority.authorityType !== "EVERYONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 8, "PERMISSIONS.TOOLPERMISSIONS.RESULT"));
  }
}
function ToolpermissionManagerComponent_es_spinner_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "es-spinner");
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "TOOLPERMISSION." + key_r8), " ");
  }
}
const _c0 = function (a0) {
  return {
    connector: a0
  };
};
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](2, 1, "TOOLPERMISSION.TOOLPERMISSION_CONNECTOR" + (ctx_r10.getTpSafe(key_r8) ? "_SAFE" : ""), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](4, _c0, ctx_r10.getTpConnector(key_r8))), " ");
  }
}
const _c1 = function (a0) {
  return {
    repository: a0
  };
};
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](2, 1, "TOOLPERMISSION.TOOLPERMISSION_REPOSITORY", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](4, _c1, ctx_r11.getTpRepository(key_r8))), " ");
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_es_info_message_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "es-info-message", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "PERMISSIONS.TOOLPERMISSIONS.SYSTEM_MANAGED_WARNING"), " ");
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21)(1, "mat-checkbox", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function ToolpermissionManagerComponent_div_7_div_1_div_5_div_10_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r20);
      const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r19.deny[key_r8] = $event);
    })("change", function ToolpermissionManagerComponent_div_7_div_1_div_5_div_10_Template_mat_checkbox_change_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r20);
      const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      ctx_r22.allow[key_r8] = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r22.change(key_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("name", "deny", key_r8, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r13.changing.indexOf(key_r8) != -1)("ngModel", ctx_r13.deny[key_r8]);
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "es-spinner-small");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_i_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 30);
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_i_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.TOOLPERMISSIONS.INHERIT_UNKNOWN"));
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_i_4_Template, 1, 0, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_i_5_Template, 2, 3, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", ctx_r15.isImplicit(key_r8) ? ctx_r15.getImplicitDetail(key_r8) : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 4, "PERMISSIONS.TOOLPERMISSIONS.STATUS_" + ctx_r15.getEffective(key_r8)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r15.isImplicit(key_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r15.getEffective(key_r8) === "UNKNOWN");
  }
}
function ToolpermissionManagerComponent_div_7_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 18)(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ToolpermissionManagerComponent_div_7_div_1_div_5_div_2_Template, 3, 3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, ToolpermissionManagerComponent_div_7_div_1_div_5_div_3_Template, 3, 6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ToolpermissionManagerComponent_div_7_div_1_div_5_div_4_Template, 3, 6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ToolpermissionManagerComponent_div_7_div_1_div_5_es_info_message_7_Template, 3, 3, "es-info-message", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 21)(9, "mat-checkbox", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function ToolpermissionManagerComponent_div_7_div_1_div_5_Template_mat_checkbox_ngModelChange_9_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const key_r8 = restoredCtx.$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r28.allow[key_r8] = $event);
    })("change", function ToolpermissionManagerComponent_div_7_div_1_div_5_Template_mat_checkbox_change_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const key_r8 = restoredCtx.$implicit;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      ctx_r30.deny[key_r8] = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r30.change(key_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, ToolpermissionManagerComponent_div_7_div_1_div_5_div_10_Template, 2, 3, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, ToolpermissionManagerComponent_div_7_div_1_div_5_div_12_Template, 2, 0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, ToolpermissionManagerComponent_div_7_div_1_div_5_div_13_Template, 6, 6, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const key_r8 = ctx.$implicit;
    const group_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", group_r6.name !== "CONNECTORS" && group_r6.name !== "REPOSITORIES");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", group_r6.name === "CONNECTORS");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", group_r6.name === "REPOSITORIES");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](key_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.permissions[key_r8] == null ? null : ctx_r7.permissions[key_r8].systemManaged);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("name", "allow", key_r8, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r7.changing.indexOf(key_r8) != -1)("ngModel", ctx_r7.allow[key_r8]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7._authority.authorityType !== "EVERYONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("allowed", ctx_r7.getEffective(key_r8) === "ALLOWED")("denied", ctx_r7.getEffective(key_r8) !== "ALLOWED");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.changing.indexOf(key_r8) != -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.changing.indexOf(key_r8) == -1);
  }
}
function ToolpermissionManagerComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, ToolpermissionManagerComponent_div_7_div_1_div_5_Template, 14, 15, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("esIcon", group_r6.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 3, "PERMISSIONS.TOOLPERMISSIONS.GROUP." + group_r6.name), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r4.getToolpermissionsForGroup(group_r6));
  }
}
function ToolpermissionManagerComponent_div_7_div_2_es_spinner_small_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "es-spinner-small");
  }
}
function ToolpermissionManagerComponent_div_7_div_2_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ToolpermissionManagerComponent_div_7_div_2_button_13_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r34.createToolpermission());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("disabled", !ctx_r33.addName.trim());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 3, "PERMISSIONS.TOOLPERMISSIONS.ADD"), " ");
  }
}
function ToolpermissionManagerComponent_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 32)(1, "div", 15)(2, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 34)(7, "mat-form-field")(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function ToolpermissionManagerComponent_div_7_div_2_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r36.addName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, ToolpermissionManagerComponent_div_7_div_2_es_spinner_small_12_Template, 1, 0, "es-spinner-small", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, ToolpermissionManagerComponent_div_7_div_2_button_13_Template, 3, 5, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 5, "PERMISSIONS.TOOLPERMISSIONS.GROUP.ADD"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 7, "PERMISSIONS.TOOLPERMISSIONS.GROUP.ADD_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r5.addName);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r5.creatingToolpermission);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r5.creatingToolpermission);
  }
}
function ToolpermissionManagerComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ToolpermissionManagerComponent_div_7_div_1_Template, 6, 5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ToolpermissionManagerComponent_div_7_div_2_Template, 14, 9, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r2.getGroups());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2._authority.authorityType === "EVERYONE");
  }
}
class ToolpermissionManagerComponent {
  static #_ = this.STATUS_ALLOWED = 'ALLOWED';
  static #_2 = this.STATUS_DENIED = 'DENIED';
  static #_3 = this.STATUS_UNDEFINED = 'UNDEFINED';
  static #_4 = this.STATUS_UNKNOWN = 'UNKNOWN';
  static #_5 = this.GROUPS = [{
    name: 'SHARING',
    icon: 'share',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_STREAM, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_LINK, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_SHARE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_FUZZY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_HISTORY]
  }, {
    name: 'LICENSING',
    icon: 'copyright',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_LICENSE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_PUBLISH_COPY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_MANAGE_RELATIONS, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_HANDLESERVICE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CONTROL_RESTRICTED_ACCESS]
  }, {
    name: 'DATA_MANAGEMENT',
    icon: 'folder',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_WORKSPACE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_FILES, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_FOLDERS, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CREATE_MAP_LINK, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_UNCHECKEDCONTENT, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COMMENT_WRITE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_RATE_READ, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_RATE_WRITE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_MATERIAL_FEEDBACK]
  }, {
    name: 'ACCOUNT_MANAGEMENT',
    icon: 'group',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_SIGNUP_GROUP]
  }, {
    name: 'SAFE',
    icon: 'lock',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CONFIDENTAL, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_SAFE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_INVITE_SHARE_SAFE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SAFE, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE_SAFE]
  }, {
    name: 'COLLECTIONS',
    icon: 'layers',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_COLLECTIONS, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COLLECTION_PROPOSAL, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COLLECTION_EDITORIAL, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COLLECTION_CURRICULUM, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COLLECTION_PINNING, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_VIDEO_AUDIO_CUT, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_COLLECTION_CHANGE_OWNER]
  }, {
    name: 'MANAGEMENT',
    icon: 'settings',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_USAGE_STATISTIC, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_NODES, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_GLOBAL_STATISTICS_USER]
  }, {
    name: 'MEDIACENTER',
    icon: 'business',
    permissions: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_MEDIACENTER_MANAGE]
  }, {
    name: 'CONNECTORS',
    icon: 'edit'
  }, {
    name: 'REPOSITORIES',
    icon: 'cloud'
  }, {
    name: 'OTHER',
    icon: 'help'
  }];
  getGroups() {
    return ToolpermissionManagerComponent.GROUPS;
  }
  getToolpermissionsForGroup(group) {
    if (group.permissions) {
      return group.permissions;
    }
    let permissions = Object.keys(this.permissions);
    if (group.name == 'CONNECTORS') {
      return permissions.filter(p => p.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CONNECTOR_PREFIX));
    } else if (group.name == 'REPOSITORIES') {
      return permissions.filter(p => p.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_REPOSITORY_PREFIX));
    }
    // filter "OTHER"
    for (let group of ToolpermissionManagerComponent.GROUPS) {
      if (group.permissions) {
        for (let tp of group.permissions) {
          let pos = permissions.indexOf(tp);
          if (pos != -1) {
            permissions.splice(pos, 1);
          }
        }
      } else if (group.name == 'CONNECTORS') {
        permissions = permissions.filter(p => !p.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CONNECTOR_PREFIX));
      } else if (group.name == 'REPOSITORIES') {
        permissions = permissions.filter(p => !p.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_REPOSITORY_PREFIX));
      }
    }
    return permissions;
  }
  set authority(authority) {
    if (authority == null) return;
    this._authority = authority;
    this.isLoading = true;
    this.name = new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__.AuthorityNamePipe(this.translate).transform(authority, null);
    this.refresh();
  }
  constructor(toast, admin, node, translate, iam) {
    this.toast = toast;
    this.admin = admin;
    this.node = node;
    this.translate = translate;
    this.iam = iam;
    this.isLoading = false;
    this.addName = '';
    this.creatingToolpermission = false;
    this.changing = [];
    this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
    this.buttons = _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton.getSingleButton('CLOSE', () => this.close(), 'standard');
  }
  close() {
    this.onClose.emit();
  }
  change(key) {
    this.changing.push(key);
    this.admin.setToolpermissions(this._authority.authorityName, this.getPermissions()).subscribe(() => {
      /*this.toast.toast('PERMISSIONS.TOOLPERMISSIONS.SAVED');
      this.close();*/
      this.refresh(() => {
        let i = this.changing.indexOf(key);
        if (i != -1) {
          this.changing.splice(i, 1);
        }
      });
    }, error => {
      this.toast.error(error);
    });
  }
  getEffective(key) {
    if (this.deny[key]) {
      return ToolpermissionManagerComponent.STATUS_DENIED;
    }
    if (this.allow[key] && this.permissions[key]?.effective != ToolpermissionManagerComponent.STATUS_DENIED) {
      return ToolpermissionManagerComponent.STATUS_ALLOWED;
    }
    if (!this.denyInit[key] && this.permissions[key]?.effective == ToolpermissionManagerComponent.STATUS_DENIED) {
      return ToolpermissionManagerComponent.STATUS_DENIED;
    }
    if (this.allow[key] != this.allowInit[key] || this.deny[key] != this.denyInit[key]) {
      return ToolpermissionManagerComponent.STATUS_UNKNOWN;
    }
    return this.permissions[key]?.effective;
  }
  isImplicit(key) {
    if (this._authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.AUTHORITY_TYPE_EVERYONE) {
      return false;
    }
    if (this.getEffective(key) == ToolpermissionManagerComponent.STATUS_UNDEFINED) return false;
    if (this.deny[key]) {
      return false;
    }
    if (this.allow[key] && this.permissions[key].effective == ToolpermissionManagerComponent.STATUS_DENIED) {
      return true;
    }
    return !this.allow[key];
  }
  getImplicitDetail(key) {
    let names = [];
    for (let group of this.permissions[key].effectiveSource) {
      if (group.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.AUTHORITY_TYPE_EVERYONE) {
        names.push(this.translate.instant('PERMISSIONS.TOOLPERMISSIONS.EVERYONE_ALLOWED'));
      } else {
        names.push(new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__.AuthorityNamePipe(this.translate).transform(group, null));
      }
    }
    return this.translate.instant('PERMISSIONS.TOOLPERMISSIONS.INHERIT_DETAIL', {
      memberships: names.join(', ')
    });
  }
  getPermissions() {
    let result = {};
    for (let key in this.permissions) {
      if (this.allow[key]) {
        result[key] = ToolpermissionManagerComponent.STATUS_ALLOWED;
      } else if (this.deny[key]) {
        result[key] = ToolpermissionManagerComponent.STATUS_DENIED;
      }
    }
    return result;
  }
  refresh(callback = null) {
    this.admin.getToolpermissions(this._authority.authorityName).subscribe(data => {
      this.isLoading = false;
      this.permissions = data;
      this.allow = {};
      this.deny = {};
      for (let key in this.permissions) {
        let value = this.permissions[key].explicit;
        this.allow[key] = value == ToolpermissionManagerComponent.STATUS_ALLOWED;
        this.deny[key] = value == ToolpermissionManagerComponent.STATUS_DENIED;
      }
      this.allowInit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.deepCopy(this.allow);
      this.denyInit = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.deepCopy(this.deny);
      if (callback) callback();
    }, error => {
      this.toast.error(error);
      this.close();
    });
  }
  createToolpermission() {
    this.creatingToolpermission = true;
    this.admin.addToolpermission(this.addName).subscribe(() => {
      this.toast.toast('PERMISSIONS.TOOLPERMISSIONS.ADDED', {
        name: this.addName
      });
      this.addName = '';
      this.creatingToolpermission = false;
      this.refresh();
    }, error => {
      this.creatingToolpermission = false;
      this.toast.error(error);
    });
  }
  getTpConnector(tp) {
    tp = tp.substring(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_CONNECTOR_PREFIX.length);
    if (tp.indexOf('_safe') != -1) tp = tp.substring(0, tp.indexOf('_safe'));
    let connector = this.translate.instant('CONNECTOR.' + tp + '.NAME');
    return connector;
  }
  getTpSafe(tp) {
    return tp.endsWith('_safe');
  }
  getTpRepository(tp) {
    tp = tp.substring(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.TOOLPERMISSION_REPOSITORY_PREFIX.length);
    return tp;
  }
  static #_6 = this.ɵfac = function ToolpermissionManagerComponent_Factory(t) {
    return new (t || ToolpermissionManagerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestIamService));
  };
  static #_7 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: ToolpermissionManagerComponent,
    selectors: [["es-toolpermission-manager"]],
    inputs: {
      authority: "authority"
    },
    outputs: {
      onClose: "onClose"
    },
    decls: 8,
    vars: 9,
    consts: [["width", "xlarge", "height", "xlarge", 3, "title", "subtitle", "buttons", "isCancelable", "onCancel"], [1, "heading-group"], ["class", "heading", 4, "ngIf"], [1, "toolpermissions"], [4, "ngIf"], ["class", "table", 4, "ngIf"], [1, "heading"], [1, "name"], [1, "checkboxDiv"], ["class", "checkboxDiv", 4, "ngIf"], [1, "result"], [1, "table"], ["class", "group", 4, "ngFor", "ngForOf"], ["class", "group-add", 4, "ngIf"], [1, "group"], [1, "card-title-element"], [3, "esIcon"], ["class", "groupTable", 4, "ngFor", "ngForOf"], [1, "groupTable"], [1, "technicalName"], ["mode", "warning", 4, "ngIf"], [1, "checkboxDiv", "checkboxInput"], [3, "disabled", "ngModel", "name", "ngModelChange", "change"], ["class", "checkboxDiv checkboxInput", 4, "ngIf"], [3, "title", 4, "ngIf"], ["mode", "warning"], [3, "title"], [1, "text"], ["esIcon", "edu-inherit", "class", "inherit", 4, "ngIf"], ["class", "inherit", "esIcon", "warning", 3, "matTooltip", 4, "ngIf"], ["esIcon", "edu-inherit", 1, "inherit"], ["esIcon", "warning", 1, "inherit", 3, "matTooltip"], [1, "group-add"], [1, "material-icons"], [1, "add"], ["matInput", "", "name", "addName", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
    template: function ToolpermissionManagerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "es-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("onCancel", function ToolpermissionManagerComponent_Template_es_card_onCancel_0_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](1, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, ToolpermissionManagerComponent_div_3_Template, 11, 10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 3)(5, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, ToolpermissionManagerComponent_es_spinner_6_Template, 1, 0, "es-spinner", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ToolpermissionManagerComponent_div_7_Template, 3, 2, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](1, 7, "PERMISSIONS.TOOLPERMISSIONS.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("subtitle", ctx.name)("buttons", ctx.buttons)("isCancelable", ctx.changing.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.SpinnerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgForm, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_6__.SpinnerSmallComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%]     .table .allowed #Mask {\n  fill: #40bf8e;\n}\n[_nghost-%COMP%]     .table .denied #Mask {\n  fill: #cd2457;\n}\n\n.card-scroll[_ngcontent-%COMP%] {\n  top: 0;\n  height: calc(100% - 67px);\n}\n\n.heading-group[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: #fff;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  height: 60px;\n}\n.heading-group[_ngcontent-%COMP%]   .fade[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 100;\n  left: 0;\n  top: 108px;\n  width: 100%;\n  height: 20px;\n  background: linear-gradient(to bottom, #fff 15%, rgba(255, 255, 255, 0.0001));\n}\n\n.toolpermissions[_ngcontent-%COMP%]   .groupTable[_ngcontent-%COMP%] {\n  padding: 0 25px;\n}\n\n.heading[_ngcontent-%COMP%], .groupTable[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.heading[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--textLight);\n  padding: 10px 0;\n  margin: 0 25px;\n}\n\n.table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-top: -10px;\n}\n\n.group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.group-add[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.group-add[_ngcontent-%COMP%]    > .add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px 0;\n}\n.group-add[_ngcontent-%COMP%]    > .add[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  width: auto;\n  margin: 0 30px;\n}\n.group-add[_ngcontent-%COMP%]    > .add[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin: 0 30px;\n}\n\n.groupName[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-weight: bold;\n  text-align: left;\n  padding: 10px 20px;\n}\n\n.name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  text-align: left;\n  align-self: center;\n  padding: 10px 0;\n  word-break: break-word;\n}\n.name[_ngcontent-%COMP%]   .technicalName[_ngcontent-%COMP%] {\n  font-size: 70%;\n  word-break: break-all;\n  color: #aaa;\n  font-style: italic;\n}\n\n.checkboxDiv[_ngcontent-%COMP%] {\n  width: 75px;\n  min-width: 75px;\n  align-self: center;\n}\n.checkboxDiv[_ngcontent-%COMP%]    > mat-checkbox[_ngcontent-%COMP%] {\n  padding-left: 13px;\n}\n\n.checkboxInput[_ngcontent-%COMP%] {\n  padding-top: 7px;\n}\n\n.checkboxDiv[_ngcontent-%COMP%], .result[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n[_nghost-%COMP%]     .result es-spinner-small .preloader-wrapper.small {\n  width: 20px;\n  height: 20px;\n}\n[_nghost-%COMP%]     .mat-checkbox-inner-container {\n  margin: 0;\n}\n[_nghost-%COMP%]     .add .mat-form-field-wrapper {\n  padding: 0;\n}\n\n.heading[_ngcontent-%COMP%]   .result[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n\n.result[_ngcontent-%COMP%] {\n  width: 100px;\n  min-width: 100px;\n  display: flex;\n  align-items: center;\n}\n.result[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n.result[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n.result[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   .inherit[_ngcontent-%COMP%] {\n  cursor: default;\n  padding-left: 10px;\n  font-size: 16px;\n  display: flex;\n  align-items: center;\n}\n\n.allowed[_ngcontent-%COMP%] {\n  color: #40bf8e;\n}\n\n.denied[_ngcontent-%COMP%] {\n  color: #cd2457;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy91c2VyLW1hbmFnZW1lbnQtcGFnZS90b29scGVybWlzc2lvbi1tYW5hZ2VyL3Rvb2xwZXJtaXNzaW9uLW1hbmFnZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGSTtFQUNJLGFEcUVjO0FDdEV0QjtBQUdJO0VBQ0ksYURvRWM7QUNyRXRCOztBQUlBO0VBQ0ksTUFBQTtFQUNBLHlCQUFBO0FBREo7O0FBSUE7RUFDSSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0VBQ0EsWUFQWTtBQU1oQjtBQUVJO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDZFQUFBO0FBQVI7O0FBSUk7RUFDSSxlQUFBO0FBRFI7O0FBSUE7O0VBRUksYUFBQTtBQURKOztBQUdBO0VBQ0ksaUJBQUE7RUFDQSx1QkQzQlE7RUM0QlIsZUFBQTtFQUNBLGNBQUE7QUFBSjs7QUFFQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUNBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBRUo7O0FBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFHSjtBQUZJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUlSO0FBSFE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUFLWjtBQUhRO0VBQ0ksY0FBQTtBQUtaOztBQURBO0VBQ0ksdUJEM0RRO0VDNERSLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUlKOztBQUZBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7QUFLSjtBQUpJO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0VBQ0EsV0R2RVE7RUN3RVIsa0JBQUE7QUFNUjs7QUFIQTtFQUNJLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFNSjtBQUxJO0VBQ0ksa0JBQUE7QUFPUjs7QUFKQTtFQUNJLGdCQUFBO0FBT0o7O0FBTEE7O0VBRUksa0JBQUE7QUFRSjs7QUFMSTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBUVI7QUFOSTtFQUNJLFNBQUE7QUFRUjtBQU5JO0VBQ0ksVUFBQTtBQVFSOztBQUxBO0VBQ0ksdUJBQUE7QUFRSjs7QUFOQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQVNKO0FBUkk7RUFDSSxhQUFBO0FBVVI7QUFUUTtFQUNJLHFCQUFBO0FBV1o7QUFUUTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFXWjs7QUFQQTtFQUNJLGNEdEVrQjtBQ2dGdEI7O0FBUkE7RUFDSSxjRHZFa0I7QUNrRnRCIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLnRhYmxlIC5hbGxvd2VkICNNYXNrIHtcbiAgICAgICAgZmlsbDogJGNvbG9yU3RhdHVzUG9zaXRpdmU7XG4gICAgfVxuICAgIC50YWJsZSAuZGVuaWVkICNNYXNrIHtcbiAgICAgICAgZmlsbDogJGNvbG9yU3RhdHVzTmVnYXRpdmU7XG4gICAgfVxufVxuLmNhcmQtc2Nyb2xsIHtcbiAgICB0b3A6IDA7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2N3B4KTtcbn1cbiRoZWFkaW5nSGVpZ2h0OiA2MHB4O1xuLmhlYWRpbmctZ3JvdXAge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgcG9zaXRpb246IHN0aWNreTtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogMTtcbiAgICBoZWlnaHQ6ICRoZWFkaW5nSGVpZ2h0O1xuICAgIC5mYWRlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB6LWluZGV4OiAxMDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMTA4cHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNmZmYgMTUlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDAwMSkpO1xuICAgIH1cbn1cbi50b29scGVybWlzc2lvbnMge1xuICAgIC5ncm91cFRhYmxlIHtcbiAgICAgICAgcGFkZGluZzogMCAkY2FyZFBhZGRpbmc7XG4gICAgfVxufVxuLmhlYWRpbmcsXG4uZ3JvdXBUYWJsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cbi5oZWFkaW5nIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgbWFyZ2luOiAwICRjYXJkUGFkZGluZztcbn1cbi50YWJsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuLmdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uZ3JvdXAtYWRkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgPiAuYWRkIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMjBweCAwO1xuICAgICAgICA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDMwcHg7XG4gICAgICAgIH1cbiAgICAgICAgPiBidXR0b24ge1xuICAgICAgICAgICAgbWFyZ2luOiAwIDMwcHg7XG4gICAgICAgIH1cbiAgICB9XG59XG4uZ3JvdXBOYW1lIHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbn1cbi5uYW1lIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgLnRlY2huaWNhbE5hbWUge1xuICAgICAgICBmb250LXNpemU6IDcwJTtcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICBjb2xvcjogJHRleHRWZXJ5TGlnaHQ7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG59XG4uY2hlY2tib3hEaXYge1xuICAgIHdpZHRoOiA3NXB4O1xuICAgIG1pbi13aWR0aDogNzVweDtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgPiBtYXQtY2hlY2tib3gge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEzcHg7XG4gICAgfVxufVxuLmNoZWNrYm94SW5wdXQge1xuICAgIHBhZGRpbmctdG9wOiA3cHg7XG59XG4uY2hlY2tib3hEaXYsXG4ucmVzdWx0IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG46aG9zdCA6Om5nLWRlZXAge1xuICAgIC5yZXN1bHQgZXMtc3Bpbm5lci1zbWFsbCAucHJlbG9hZGVyLXdyYXBwZXIuc21hbGwge1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgIH1cbiAgICAubWF0LWNoZWNrYm94LWlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgLmFkZCAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxufVxuLmhlYWRpbmcgLnJlc3VsdCB7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ucmVzdWx0IHtcbiAgICB3aWR0aDogMTAwcHg7XG4gICAgbWluLXdpZHRoOiAxMDBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAudGV4dCB7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICAgIH1cbiAgICAgICAgLmluaGVyaXQge1xuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4uYWxsb3dlZCB7XG4gICAgY29sb3I6ICRjb2xvclN0YXR1c1Bvc2l0aXZlO1xufVxuLmRlbmllZCB7XG4gICAgY29sb3I6ICRjb2xvclN0YXR1c05lZ2F0aXZlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 32683:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/user-management-page/user-management-page-routing.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManagementPageRoutingModule: () => (/* binding */ UserManagementPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _user_management_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-management-page.component */ 13425);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _user_management_page_component__WEBPACK_IMPORTED_MODULE_0__.UserManagementPageComponent
}];
class UserManagementPageRoutingModule {
  static #_ = this.ɵfac = function UserManagementPageRoutingModule_Factory(t) {
    return new (t || UserManagementPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: UserManagementPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UserManagementPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 13425:
/*!******************************************************************************!*\
  !*** ./src/app/pages/user-management-page/user-management-page.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManagementPageComponent: () => (/* binding */ UserManagementPageComponent)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../main/navigation/search-field/search-field.service */ 86381);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _authorities_authorities_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./authorities/authorities.component */ 68216);
/* harmony import */ var _delete_delete_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./delete/delete.component */ 86527);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);


















function UserManagementPageComponent_ng_container_0_mat_tab_group_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "es-permissions-authorities", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("onSelection", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_ng_template_3_Template_es_permissions_authorities_onSelection_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r6.selected = $event ? $event[0] : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("mode", "ORG")("searchQuery", ctx_r2.searchQuery);
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "es-permissions-authorities", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("onDeselectOrg", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_ng_template_2_Template_es_permissions_authorities_onDeselectOrg_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r9.selected = null);
    })("setTab", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_ng_template_2_Template_es_permissions_authorities_setTab_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r11.setTab($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("mode", "GROUP")("searchQuery", ctx_r8.searchQuery)("org", ctx_r8.selected);
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_ng_template_2_Template, 1, 3, "ng-template", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate2"]("label", "", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 2, "PERMISSIONS.TAB.GROUP"), "", ctx_r3.selected ? " (" + (ctx_r3.selected.profile == null ? null : ctx_r3.selected.profile.displayName) + ")" : "", "");
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "es-permissions-authorities", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("onDeselectOrg", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_ng_template_2_Template_es_permissions_authorities_onDeselectOrg_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r13.selected = null);
    })("setTab", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_ng_template_2_Template_es_permissions_authorities_setTab_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r15.setTab($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("mode", "USER")("searchQuery", ctx_r12.searchQuery)("org", ctx_r12.selected);
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_ng_template_2_Template, 1, 3, "ng-template", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate2"]("label", "", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 2, "PERMISSIONS.TAB.USER"), "", ctx_r4.selected ? " (" + (ctx_r4.selected.profile == null ? null : ctx_r4.selected.profile.displayName) + ")" : "", "");
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "es-permissions-delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 1, "PERMISSIONS.TAB.DELETE"));
  }
}
function UserManagementPageComponent_ng_container_0_mat_tab_group_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-tab-group", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectedIndexChange", function UserManagementPageComponent_ng_container_0_mat_tab_group_5_Template_mat_tab_group_selectedIndexChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r16.setTab($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "mat-tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, UserManagementPageComponent_ng_container_0_mat_tab_group_5_ng_template_3_Template, 1, 2, "ng-template", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_4_Template, 3, 4, "mat-tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_5_Template, 3, 4, "mat-tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, UserManagementPageComponent_ng_container_0_mat_tab_group_5_mat_tab_6_Template, 3, 3, "mat-tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "dark")("selectedIndex", ctx_r1.tab);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 6, "PERMISSIONS.TAB.ORG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.selected || ctx_r1.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.selected || ctx_r1.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r1.selected && ctx_r1.isAdmin);
  }
}
function UserManagementPageComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 1)(2, "h1", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, UserManagementPageComponent_ng_container_0_mat_tab_group_5_Template, 7, 8, "mat-tab-group", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 2, "PERMISSIONS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r0.isLoading);
  }
}
class UserManagementPageComponent {
  constructor(toast, router, platformLocation, config, translations, organization, loadingScreen, mainNav, connector, searchField) {
    this.toast = toast;
    this.router = router;
    this.platformLocation = platformLocation;
    this.config = config;
    this.translations = translations;
    this.organization = organization;
    this.loadingScreen = loadingScreen;
    this.mainNav = mainNav;
    this.connector = connector;
    this.searchField = searchField;
    this.tab = 0;
    this.isAdmin = false;
    this.disabled = false;
    this.isLoading = true;
    this.TABS = ['ORG', 'GROUP', 'USER', 'DELETE'];
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    const loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed
    });
    this.translations.waitForInit().subscribe(() => {
      this.connector.isLoggedIn().subscribe(data => {
        if (data.isValidLogin && !data.isGuest && !data.currentScope) {
          this.organization.getOrganizations().subscribe(data => {
            this.isAdmin = data.canCreate;
            const hasAccess = this.isAdmin || data.organizations.filter(o => o.administrationAccess).length > 0;
            if (!hasAccess) {
              this.toast.error(null, 'TOAST.API_FORBIDDEN');
              _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__.UIHelper.goToDefaultLocation(this.router, this.platformLocation, this.config);
              return;
            }
          });
        } else {
          this.goToLogin();
        }
        this.isLoading = false;
        loadingTask.done();
      }, error => this.goToLogin());
      this.config.get('hideMainMenu').subscribe(data => {
        if (data && data.indexOf('permissions') != -1) {
          //this.router.navigate([UIConstants.ROUTER_PREFIX+"workspace"]);
          this.disabled = true;
        }
      });
    });
  }
  ngOnInit() {
    this.registerMainNav();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  registerMainNav() {
    this.mainNav.setMainNavConfig({
      title: 'PERMISSIONS.TITLE',
      currentScope: 'permissions'
    });
    this.updateSearchField();
  }
  updateSearchField() {
    if (this.tab !== 3) {
      const searchFieldInstance = this.searchField.enable({
        placeholder: 'PERMISSIONS.SEARCH_' + this.TABS[this.tab]
      }, this.destroyed);
      searchFieldInstance.setSearchString(this.searchQuery);
      searchFieldInstance.onSearchTriggered().subscribe(({
        searchString
      }) => this.doSearch(searchString));
    } else {
      this.searchField.disable();
    }
  }
  doSearch(searchString) {
    this.searchQuery = searchString;
  }
  setTab(tab) {
    if (tab != 0 && !this.selected && !this.isAdmin) {
      this.toast.error(null, 'PERMISSIONS.SELECT_ORGANIZATION');
      this.tab = 0;
    } else if (tab === this.tab) {
      return;
    } else {
      if (tab === 0) {
        this.selected = null;
      }
      this.searchQuery = null;
      this.tab = tab;
    }
    this.updateSearchField();
  }
  goToLogin() {
    _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestHelper.goToLogin(this.router, this.config);
  }
  static #_ = this.ɵfac = function UserManagementPageComponent_Factory(t) {
    return new (t || UserManagementPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_2__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_13__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestOrganizationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_3__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__.SearchFieldService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: UserManagementPageComponent,
    selectors: [["es-user-management-page"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], ["role", "main", "esSkipTarget", "MAIN_CONTENT"], ["esTitle", "", 1, "cdk-visually-hidden"], ["mat-stretch-tabs", "", 3, "color", "selectedIndex", "selectedIndexChange", 4, "ngIf"], ["mat-stretch-tabs", "", 3, "color", "selectedIndex", "selectedIndexChange"], [3, "label"], ["matTabContent", ""], [3, "label", 4, "ngIf"], [3, "mode", "searchQuery", "onSelection"], [3, "mode", "searchQuery", "org", "onDeselectOrg", "setTab"]],
    template: function UserManagementPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, UserManagementPageComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.disabled || ctx.isAdmin);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTabContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__.MatTabGroup, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_6__.SkipTargetDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_7__.TitleDirective, _authorities_authorities_component__WEBPACK_IMPORTED_MODULE_8__.PermissionsAuthoritiesComponent, _delete_delete_component__WEBPACK_IMPORTED_MODULE_9__.PermissionsDeleteComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%]     {\n  \n\n\n\n}\n\nmat-tab-group[_ngcontent-%COMP%] {\n  position: absolute;\n  top: var(--mainnavHeight);\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy91c2VyLW1hbmFnZW1lbnQtcGFnZS91c2VyLW1hbmFnZW1lbnQtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBR0k7O0lBQUE7QUFBSjs7QUFJQTtFQUNJLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0FBREoiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAvLyBmaXggdGhhdCBjYXJkcyBhcmUgb3ZlciB0aGUgbWFpbiBuYXZcbiAgICAvLyB3aWxsIGJyZWFrIHRoZSBsZWZ0IG1haW4gbmF2XG4gICAgLyoubWF0LXRhYi1ib2R5Lm1hdC10YWItYm9keS1hY3RpdmUge1xuICAgIHotaW5kZXg6IDk3O1xuICB9Ki9cbn1cbm1hdC10YWItZ3JvdXAge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IHZhcigtLW1haW5uYXZIZWlnaHQpO1xuICAgIHdpZHRoOiAxMDAlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: []
    }
  });
}

/***/ }),

/***/ 75922:
/*!***************************************************************************!*\
  !*** ./src/app/pages/user-management-page/user-management-page.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManagementPageModule: () => (/* binding */ UserManagementPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _authorities_authorities_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorities/authorities.component */ 68216);
/* harmony import */ var _delete_delete_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delete/delete.component */ 86527);
/* harmony import */ var _toolpermission_manager_toolpermission_manager_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toolpermission-manager/toolpermission-manager.component */ 57970);
/* harmony import */ var _user_management_page_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-management-page-routing.module */ 32683);
/* harmony import */ var _user_management_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-management-page.component */ 13425);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);







class UserManagementPageModule {
  static #_ = this.ɵfac = function UserManagementPageModule_Factory(t) {
    return new (t || UserManagementPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: UserManagementPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _user_management_page_routing_module__WEBPACK_IMPORTED_MODULE_4__.UserManagementPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UserManagementPageModule, {
    declarations: [_user_management_page_component__WEBPACK_IMPORTED_MODULE_5__.UserManagementPageComponent, _authorities_authorities_component__WEBPACK_IMPORTED_MODULE_1__.PermissionsAuthoritiesComponent, _toolpermission_manager_toolpermission_manager_component__WEBPACK_IMPORTED_MODULE_3__.ToolpermissionManagerComponent, _delete_delete_component__WEBPACK_IMPORTED_MODULE_2__.PermissionsDeleteComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _user_management_page_routing_module__WEBPACK_IMPORTED_MODULE_4__.UserManagementPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_user-management-page_user-management-page_module_ts.js.map