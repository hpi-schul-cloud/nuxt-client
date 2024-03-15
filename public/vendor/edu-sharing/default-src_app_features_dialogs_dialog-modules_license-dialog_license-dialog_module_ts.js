"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["default-src_app_features_dialogs_dialog-modules_license-dialog_license-dialog_module_ts"],{

/***/ 1751:
/*!****************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/license-dialog/license-dialog-content.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseDialogContentComponent: () => (/* binding */ LicenseDialogContentComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_mds_mds_editor_mds_editor_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../features/mds/mds-editor/mds-editor-common.service */ 35168);
/* harmony import */ var _features_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../features/mds/mds-editor/mds-editor-instance.service */ 27201);
/* harmony import */ var _features_mds_mds_editor_mds_editor_view_view_instance_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../features/mds/mds-editor/mds-editor-view/view-instance.service */ 70004);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/node-helper.service */ 76754);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_license_source_license_source_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/components/license-source/license-source.component */ 73815);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _mds_mds_editor_widgets_mds_editor_widget_author_mds_editor_widget_author_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../mds/mds-editor/widgets/mds-editor-widget-author/mds-editor-widget-author.component */ 85874);



























const _c0 = ["selectLicense"];
const _c1 = ["author"];
function LicenseDialogContentComponent_mat_slide_toggle_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-slide-toggle", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_mat_slide_toggle_0_Template_mat_slide_toggle_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r14.oerMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r0.oerMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 2, "WORKSPACE.LICENSE.ONLY_OER"));
  }
}
function LicenseDialogContentComponent_mat_radio_group_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 20)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC0.CC0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC0.CC0_INFO"), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r16.getLicenseUrlVersion("CC_0")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_mat_radio_group_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 26)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC0.PDM"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC0.PDM_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r17.getLicenseUrlVersion("PDM")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_mat_radio_group_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 28)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC.CC_BY_RADIO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC.CC_BY_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r18.getLicenseUrlVersion("CC_BY")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_mat_radio_group_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 29)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC.CC_BY_SA_RADIO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC.CC_BY_SA_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r19.getLicenseUrlVersion("CC_BY_SA")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_mat_radio_group_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-radio-group", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_mat_radio_group_1_Template_mat_radio_group_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r20.type = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "fieldset")(2, "legend");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, LicenseDialogContentComponent_mat_radio_group_1_div_6_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, LicenseDialogContentComponent_mat_radio_group_1_div_7_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "fieldset")(9, "legend");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, LicenseDialogContentComponent_mat_radio_group_1_div_13_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, LicenseDialogContentComponent_mat_radio_group_1_div_14_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 7, "LICENSE.GROUPS.CC_0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.isAllowedLicense("CC_0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.isAllowedLicense("PDM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 9, "LICENSE.GROUPS.CC_BY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.isAllowedLicense("CC_BY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.isAllowedLicense("CC_BY_SA"));
  }
}
function LicenseDialogContentComponent_div_2_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const license_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", license_r28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 2, "LICENSE.GROUPS." + license_r28));
  }
}
function LicenseDialogContentComponent_div_2_div_8_div_6_mat_radio_button_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-radio-button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "WORKSPACE.LICENSE.CC.YES_ALIKE"));
  }
}
function LicenseDialogContentComponent_div_2_div_8_div_6_mat_radio_button_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-radio-button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "NO"));
  }
}
function LicenseDialogContentComponent_div_2_div_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "mat-radio-group", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_div_8_div_6_Template_mat_radio_group_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r34);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r33.ccShare = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "mat-radio-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, LicenseDialogContentComponent_div_2_div_8_div_6_mat_radio_button_11_Template, 3, 3, "mat-radio-button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, LicenseDialogContentComponent_div_2_div_8_div_6_mat_radio_button_12_Template, 3, 3, "mat-radio-button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 6, "WORKSPACE.LICENSE.CC.SHARE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 8, "WORKSPACE.LICENSE.CC.SHARE_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r29.ccShare);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](10, 10, "YES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r29.isAllowedLicense("CC_BY_SA"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r29.isAllowedLicense("CC_BY_ND"));
  }
}
function LicenseDialogContentComponent_div_2_div_8_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "mat-radio-group", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_div_8_div_7_Template_mat_radio_group_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r36);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r35.ccCommercial = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "mat-radio-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "mat-radio-button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 5, "WORKSPACE.LICENSE.CC.COMMERCIAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 7, "WORKSPACE.LICENSE.CC.COMMERCIAL_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r30.ccCommercial);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](10, 9, "YES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 11, "NO"));
  }
}
function LicenseDialogContentComponent_div_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 40)(1, "h5", 41)(2, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, LicenseDialogContentComponent_div_2_div_8_div_6_Template, 13, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, LicenseDialogContentComponent_div_2_div_8_div_7_Template, 14, 13, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 4, ctx_r24.getLicenseUrlVersion("CC_BY_ABOUT")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 6, "WORKSPACE.LICENSE.CC.ABOUT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r24.isAllowedLicense("CC_BY_SA") || ctx_r24.isAllowedLicense("CC_BY_ND"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r24.isAllowedLicense("CC_BY_NC"));
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 50)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 2, "WORKSPACE.LICENSE.COPYRIGHT.FREE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 4, "WORKSPACE.LICENSE.COPYRIGHT.FREE_INFO"), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeHtml"]);
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_9_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 51)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 2, "WORKSPACE.LICENSE.COPYRIGHT.LICENSE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 4, "WORKSPACE.LICENSE.COPYRIGHT.LICENSE_INFO"), " ");
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-radio-group", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_mat_radio_group_9_Template_mat_radio_group_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r40);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r39.type = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_div_2_mat_radio_group_9_div_1_Template, 9, 6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, LicenseDialogContentComponent_div_2_mat_radio_group_9_div_2_Template, 9, 6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r25.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r25.isAllowedLicense("COPYRIGHT_FREE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r25.isAllowedLicense("COPYRIGHT_LICENSE"));
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 20)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC0.CC0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC0.CC0_INFO"), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r41.getLicenseUrlVersion("CC_0")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "mat-radio-button", 26)(2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](3, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](6, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 24)(10, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 4, "WORKSPACE.LICENSE.CC0.PDM"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "WORKSPACE.LICENSE.CC0.PDM_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 8, ctx_r42.getLicenseUrlVersion("PDM")), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, "WORKSPACE.LICENSE.MORE"));
  }
}
function LicenseDialogContentComponent_div_2_mat_radio_group_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-radio-group", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_mat_radio_group_10_Template_mat_radio_group_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r43.type = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_div_2_mat_radio_group_10_div_1_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, LicenseDialogContentComponent_div_2_mat_radio_group_10_div_2_Template, 14, 12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r26.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r26.isAllowedLicense("CC_0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r26.isAllowedLicense("PDM"));
  }
}
function LicenseDialogContentComponent_div_2_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 53)(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "textarea", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_div_11_Template_textarea_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r46);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r45.rightsDescription = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 2, "LICENSE.GROUPS.CUSTOM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r27.rightsDescription);
  }
}
function LicenseDialogContentComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 30)(1, "mat-form-field", 31)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "mat-select", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_2_Template_mat_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r48);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r47.primaryType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, LicenseDialogContentComponent_div_2_mat_option_7_Template, 3, 4, "mat-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, LicenseDialogContentComponent_div_2_div_8_Template, 8, 8, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, LicenseDialogContentComponent_div_2_mat_radio_group_9_Template, 3, 3, "mat-radio-group", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, LicenseDialogContentComponent_div_2_mat_radio_group_10_Template, 3, 3, "mat-radio-group", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, LicenseDialogContentComponent_div_2_div_11_Template, 6, 4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 7, "WORKSPACE.LICENSE.TYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r2.primaryType);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r2.licenseMainTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r2.primaryType === "CC_BY");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r2.primaryType === "COPYRIGHT");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r2.primaryType === "CC_0");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r2.primaryType === "CUSTOM");
  }
}
function LicenseDialogContentComponent_es_license_source_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "es-license-source", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ccTitleOfWorkChange", function LicenseDialogContentComponent_es_license_source_5_Template_es_license_source_ccTitleOfWorkChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r50);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r49.ccTitleOfWork = $event);
    })("ccSourceUrlChange", function LicenseDialogContentComponent_es_license_source_5_Template_es_license_source_ccSourceUrlChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r50);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r51.ccSourceUrl = $event);
    })("ccProfileUrlChange", function LicenseDialogContentComponent_es_license_source_5_Template_es_license_source_ccProfileUrlChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r50);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r52.ccProfileUrl = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ccTitleOfWork", ctx_r4.ccTitleOfWork)("ccSourceUrl", ctx_r4.ccSourceUrl)("ccProfileUrl", ctx_r4.ccProfileUrl);
  }
}
function LicenseDialogContentComponent_h4_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "WORKSPACE.LICENSE.CURRENT"));
  }
}
function LicenseDialogContentComponent_img_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "img", 56);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("src", ctx_r6.getLicenseIcon(), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
  }
}
function LicenseDialogContentComponent_div_9_div_1_mat_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const country_r55 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("value", country_r55.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](country_r55.name);
  }
}
function LicenseDialogContentComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 64)(1, "mat-form-field")(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "mat-select", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_9_div_1_Template_mat_select_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r57);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r56.ccCountry = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "mat-option", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, LicenseDialogContentComponent_div_9_div_1_mat_option_9_Template, 2, 2, "mat-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 4, "WORKSPACE.LICENSE.LOCALE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r53.ccCountry);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 6, "COUNTRY_CODE.INTERNATIONAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r53._ccCountries);
  }
}
function LicenseDialogContentComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_div_9_div_1_Template, 10, 8, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 59)(3, "mat-form-field")(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "mat-select", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function LicenseDialogContentComponent_div_9_Template_mat_select_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r59);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r58.ccVersion = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "mat-option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "2.0");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "mat-option", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11, "3.0");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "mat-option", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "4.0");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r7.ccVersion != "4.0");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 3, "WORKSPACE.LICENSE.VERSION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r7.ccVersion);
  }
}
function LicenseDialogContentComponent_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "WORKSPACE.LICENSE.OER"));
  }
}
function LicenseDialogContentComponent_div_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "WORKSPACE.LICENSE.NOT_OER"));
  }
}
function LicenseDialogContentComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_div_13_span_1_Template, 3, 3, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, LicenseDialogContentComponent_div_13_span_2_Template, 3, 3, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isOerLicense());
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx_r8.isOerLicense());
  }
}
function LicenseDialogContentComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r9.rightsDescription, " ");
  }
}
function LicenseDialogContentComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](1, 1, "LICENSE.DESCRIPTION." + ctx_r10.primaryType), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeHtml"]);
  }
}
function LicenseDialogContentComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "LICENSE.DESCRIPTION." + ctx_r11.copyrightType), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeHtml"]);
  }
}
function LicenseDialogContentComponent_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "LICENSE.DESCRIPTION.CC_SHARE_" + ctx_r62.ccShare), " ");
  }
}
function LicenseDialogContentComponent_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "LICENSE.DESCRIPTION.CC_COMMERCIAL_" + ctx_r63.ccCommercial), " ");
  }
}
const _c2 = function (a0) {
  return {
    locale: a0
  };
};
function LicenseDialogContentComponent_div_18_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, "WORKSPACE.LICENSE.LOCALE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](9, _c2, ctx_r64.ccCountry)), " ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 5, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 7, "COUNTRY_CODE." + (ctx_r64.ccCountry ? ctx_r64.ccCountry : "INTERNATIONAL"))), ". ");
  }
}
function LicenseDialogContentComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_div_18_div_1_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, LicenseDialogContentComponent_div_18_div_2_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, LicenseDialogContentComponent_div_18_div_3_Template, 5, 11, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r12.ccShare);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r12.ccCommercial);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r12.ccVersion != "4.0");
  }
}
function LicenseDialogContentComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 72)(1, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 2, ctx_r13.getLicenseUrl()), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 4, "WORKSPACE.LICENSE.MORE"));
  }
}
const ALL_LICENSE_TYPES = ['NONE', 'CC_0', 'CC_BY', 'SCHULFUNK', 'UNTERRICHTS_UND_LEHRMEDIEN', 'COPYRIGHT', 'CUSTOM'];
const ALL_COUNTRIES = ['AE', 'AL', 'AR', 'AT', 'AU', 'BA', 'BG', 'BH', 'BO', 'BR', 'BY', 'CA', 'CH', 'CL', 'CN', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HR', 'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IS', 'IT', 'JO', 'JP', 'KR', 'KW', 'LB', 'LT', 'LU', 'LV', 'LY', 'MA', 'ME', 'MK', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PR', 'PT', 'PY', 'QA', 'RO', 'RS', 'RU', 'SA', 'SD', 'SE', 'SG', 'SI', 'SK', 'SY', 'TH', 'TN', 'TR', 'TW', 'UA', 'US', 'UY', 'VE', 'VN', 'YE', 'ZA'];
class LicenseDialogContentComponent {
  set primaryType(primaryType) {
    if (!primaryType.startsWith('CC_BY')) {
      // make sure to unset cc-values if they're inapplicable
      this.ccCountry = '';
      this.ccVersion = '';
      this.ccShare = '';
      this.ccCommercial = '';
      if (!primaryType.startsWith('CC')) {
        this.ccProfileUrl = '';
        this.ccSourceUrl = '';
        this.ccTitleOfWork = '';
      } else if (primaryType == 'CC_0') {
        // CC0 is only available in version 1.0
        this.ccVersion = '1.0';
      }
    } else {
      // if no version is selected select 4.0 by default
      if (!this.ccVersion) this.ccVersion = '4.0';
    }
    this._primaryType = primaryType;
    this.updateCanSave();
  }
  get primaryType() {
    return this._primaryType;
  }
  set type(type) {
    if (type == 'CC_0' || type == 'PDM') {
      this.cc0Type = type;
      type = 'CC_0';
    }
    if (type == 'CC_BY') {
      this.ccCommercial = '';
      this.ccShare = '';
    }
    if (type == 'CC_BY_SA') {
      type = 'CC_BY';
      this.ccShare = 'SA';
    }
    if (type.startsWith('COPYRIGHT')) {
      this.copyrightType = type;
      type = 'COPYRIGHT';
    }
    this.primaryType = type;
  }
  get type() {
    return this.getLicenseProperty();
  }
  get getccCountries() {
    return this._ccCountries;
  }
  set oerMode(oerMode) {
    this._oerMode = oerMode;
    this.showCcAuthor = false;
    if (oerMode) {
      if (this.isOerLicense()) {
        return;
      } else {
        this.type = 'NONE';
      }
    }
  }
  get oerMode() {
    return this._oerMode;
  }
  constructor(connector, translate, config, nodeHelper, mdsEditorInstanceService, iamApi, toast, nodeApi) {
    this.connector = connector;
    this.translate = translate;
    this.config = config;
    this.nodeHelper = nodeHelper;
    this.mdsEditorInstanceService = mdsEditorInstanceService;
    this.iamApi = iamApi;
    this.toast = toast;
    this.nodeApi = nodeApi;
    /**
     * Emits the updated node or properties (depending on the provided `data`) when saved and null
     * when canceled.
     */
    this.done = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
    this.isLoading = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
    this.canSave = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
    this.ccShare = '';
    this.ccCommercial = '';
    this.ccTitleOfWork = '';
    this.ccSourceUrl = '';
    this.ccVersion = '4.0';
    this.ccCountry = '';
    this.ccProfileUrl = '';
    this.copyrightType = 'COPYRIGHT_FREE';
    this.rightsDescription = '';
    this.oerAvailable = true;
    this._ccCountries = [];
    this._primaryType = '';
    this.cc0Type = 'CC_0';
    this.eduType = 'P_NR';
    this.showCcAuthor = false; // FIXME: not used.
    this.contact = true;
    this.contactIndeterminate = false;
    this.release = false;
    this.releaseIndeterminate = false;
    this.eduDownload = true;
    this._oerMode = true;
    this.allowRelease = true; // FIXME: not used.
  }

  ngOnInit() {
    this.translateLicenseCountries(ALL_COUNTRIES);
    void this.iamApi.getCurrentUserAsync();
    switch (this.data.kind) {
      case 'nodes':
        this.initNodes(this.data.nodes);
        break;
      case 'properties':
        this.initProperties(this.data.properties);
        break;
    }
  }
  updateCanSave() {
    this.canSave.emit(this.type !== 'MULTI');
  }
  initNodes(nodesIn) {
    var _this = this;
    this.isLoading.emit(true);
    this.loadNodes(nodesIn).subscribe( /*#__PURE__*/function () {
      var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (nodes) {
        try {
          yield _this.mdsEditorInstanceService.initWithNodes(nodes);
        } catch (e) {
          if (e instanceof _features_mds_mds_editor_mds_editor_common_service__WEBPACK_IMPORTED_MODULE_3__.UserPresentableError || e.message) {
            _this.toast.error(null, e.message);
          } else {
            _this.toast.error(e);
          }
          _this.done.emit(null);
          return;
        }
        _this.loadConfig();
        _this.checkAllowRelease();
        _this.readLicense();
        _this.setDefaultModeState();
        _this.isLoading.emit(false);
        _this.updateCanSave();
        _this.releaseMulti = null;
        let i = 0;
        for (const node of nodes) {
          i++;
          _this.nodeApi.getNodePermissions(node.ref.id).subscribe(permissions => {
            _this.permissions = permissions.permissions.localPermissions;
            _this.readPermissions(i == _this.getNodes()?.length);
          });
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), error => {
      this.toast.error(error);
      this.done.emit(null);
    });
  }
  initProperties(properties) {
    this.loadConfig();
    this._properties = properties;
    this.readLicense();
    this.setDefaultModeState();
    this.mdsEditorInstanceService.initWithNodes([{
      properties
    }], {
      refetch: false
    });
    this.isLoading.emit(false);
    this.updateCanSave();
  }
  isAllowedLicense(license) {
    return this.allowedLicenses == null || this.allowedLicenses.indexOf(license) != -1;
  }
  isOerLicense() {
    return this.getLicenseProperty() == 'CC_0' || this.getLicenseProperty() == 'PDM' || this.getLicenseProperty() == 'CC_BY' || this.getLicenseProperty() == 'CC_BY_SA';
  }
  loadNodes(nodes) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin)(nodes.map(n => this.nodeApi.getNodeMetadata(n.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(n2 => n2.node))));
  }
  loadConfig() {
    this.config.get('allowedLicenses').subscribe(data => {
      if (!data) {
        this.licenseMainTypes = ALL_LICENSE_TYPES;
        this.allowedLicenses = null;
      } else {
        this.licenseMainTypes = [];
        this.allowedLicenses = data;
        if (!this.oerAvailable) {
          this.oerMode = false;
        }
        for (const entry of data) {
          if (entry.startsWith('CC_BY')) {
            if (this.licenseMainTypes.indexOf('CC_BY') == -1) this.licenseMainTypes.push('CC_BY');
          } else if (entry == 'CC_0' || entry == 'PDM') {
            if (this.licenseMainTypes.indexOf('CC_0') == -1) this.licenseMainTypes.push('CC_0');
          } else if (entry.startsWith('COPYRIGHT')) {
            this.licenseMainTypes.push('COPYRIGHT');
            if (data.indexOf(this.copyrightType) == -1) this.copyrightType = entry;
          } else if (ALL_LICENSE_TYPES.indexOf(entry) != -1) {
            this.licenseMainTypes.push(entry);
          }
        }
      }
      for (const license of this.config.instant('customLicenses', [])) {
        this.licenseMainTypes.splice(license.position >= 0 ? license.position : this.licenseMainTypes.length - license.position, 0, license.id);
      }
    });
  }
  saveLicense() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.type === 'CUSTOM' && !_this2.rightsDescription.trim()) {
        _this2.toast.error(null, 'LICENSE.DESCRIPTION_REQUIRED');
        return;
      }
      if (_this2._properties) {
        // this._properties is set through getProperties, which is currently only used here and
        // in EmbedComponent, which controls saving the changes on its own, so just return here
        // fixme: if possible and worth it: unify (probably by letting license-dialog handle the
        //  saving, so all we do here is emit;
        //  on the other hand: having the dialog emit "done" only when everything went through
        //  without error, as it currently is, is also nice)
        _this2.done.emit(yield _this2.getProperties(_this2._properties));
        return;
      }
      if (!_this2.getLicenseProperty() && _this2.release) {
        // this.toast.error(null,'WORKSPACE.LICENSE.RELEASE_WITHOUT_LICENSE');
        // return;
      }
      let prop = {};
      prop = yield _this2.getProperties(prop);
      _this2.isLoading.emit(true);
      const updatedNodes = [];
      for (const node of _this2.getNodes()) {
        node.properties = prop;
        _this2.nodeApi.editNodeMetadataNewVersion(node.ref.id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_LICENSE_UPDATE, prop).subscribe(result => {
          updatedNodes.push(result.node);
          _this2.savePermissions(node);
          if (updatedNodes.length === _this2.getNodes().length) {
            _this2.toast.toast('WORKSPACE.TOAST.LICENSE_UPDATED');
            _this2.isLoading.emit(false);
            _this2.done.emit(updatedNodes);
          }
        }, error => {
          _this2.isLoading.emit(false);
          _this2.toast.error(error);
        });
      }
    })();
  }
  getNodes() {
    return this.mdsEditorInstanceService.nodes$.value;
  }
  getValueForAll(prop, fallbackNotIdentical = '', fallbackIsEmpty = fallbackNotIdentical, asArray = false) {
    if (this._properties) {
      return this._properties[prop] ? this._properties[prop][0] : fallbackIsEmpty;
    }
    if (this.getNodes()) {
      return this.nodeHelper.getValueForAll(this.getNodes(), prop, fallbackNotIdentical, fallbackIsEmpty, asArray);
    } else {
      return fallbackIsEmpty;
    }
  }
  readLicense() {
    let license = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE, 'MULTI', 'NONE');
    if (!license) license = 'NONE';
    this.type = license;
    if (license.startsWith('CC_BY')) {
      this.type = 'CC_BY';
      if (license.indexOf('SA') != -1) this.ccShare = 'SA';
      if (license.indexOf('ND') != -1) this.ccShare = 'ND';
      if (license.indexOf('NC') != -1) this.ccCommercial = 'NC';
      this.ccTitleOfWork = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK);
      this.ccSourceUrl = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL);
      this.ccProfileUrl = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL);
      this.ccVersion = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_VERSION, this.ccVersion);
      this.ccCountry = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_LOCALE);
    }
    if (license == 'CC_0') {
      this.type = 'CC_0';
    }
    if (license == 'PDM') {
      this.type = 'PDM';
    }
    if (license.startsWith('COPYRIGHT')) {
      this.type = 'COPYRIGHT';
      this.copyrightType = license;
    }
    if (license == 'SCHULFUNK') {
      this.type = license;
    }
    if (license.startsWith('EDU')) {
      this.type = 'EDU';
      if (license.indexOf('P_NR') != -1) this.eduType = 'P_NR';
      if (license.indexOf('NC') != -1) this.eduType = 'NC';
      this.eduDownload = license.indexOf('ND') == -1;
    }
    if (license == 'CUSTOM') this.type = license;
    this.rightsDescription = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_RIGHTS_DESCRIPTION);
    const contactState = this.getValueForAll(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_QUESTIONSALLOWED, 'multi', 'true');
    this.contact = contactState == 'true' || contactState == true;
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.invalidateMaterializeTextarea('authorFreetext');
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.invalidateMaterializeTextarea('licenseRights');
    this.contactIndeterminate = contactState == 'multi';
  }
  getLicenseProperty() {
    let name = this.primaryType;
    if (this.primaryType == 'NONE') return '';
    if (this.primaryType == 'CC_BY') {
      if (this.ccCommercial) name += '_' + this.ccCommercial;
      if (this.ccShare) name += '_' + this.ccShare;
      return name;
    }
    if (this.primaryType == 'CC_0') {
      return this.cc0Type;
    }
    if (this.primaryType == 'COPYRIGHT') {
      return this.copyrightType;
    }
    if (this.primaryType == 'EDU') {
      name += '_' + this.eduType;
      if (!this.eduDownload) name += '_ND';
    }
    return name;
  }
  getLicenseName() {
    return this.nodeHelper.getLicenseNameByString(this.getLicenseProperty());
  }
  getLicenseUrl() {
    return this.nodeHelper.getLicenseUrlByString(this.getLicenseProperty(), this.ccVersion, this.ccCountry);
  }
  getLicenseUrlVersion(type) {
    return this.nodeHelper.getLicenseUrlByString(type, this.ccVersion, this.ccCountry);
  }
  getLicenseIcon() {
    return this.nodeHelper.getLicenseIconByString(this.getLicenseProperty());
  }
  savePermissions(node) {
    if (this.releaseIndeterminate) {
      return;
    }
    let add = true;
    let index = 0;
    for (const perm of this.permissions.permissions) {
      if (perm.authority.authorityName == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE) {
        add = false;
        if (perm.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH) == -1 && this.release) {
          perm.permissions.push(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH);
        }
        if (perm.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER) == -1 && this.release) {
          perm.permissions.push(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER);
        }
        /*if(perm.permissions.indexOf(RestConstants.ACCESS_CC_PUBLISH)!=-1 && !this.release){
        perm.permissions.splice(perm.permissions.indexOf(RestConstants.ACCESS_CC_PUBLISH),1);
        }
        if(perm.permissions.indexOf(RestConstants.ACCESS_CONSUMER)!=-1 && !this.release){
        perm.permissions.splice(perm.permissions.indexOf(RestConstants.ACCESS_CONSUMER),1);
        }
        */
        break;
      }
      index++;
    }
    // remove all_authorities
    if (!add && !this.release) {
      this.permissions.permissions.splice(index, 1);
    }
    // add all_authorities
    if (add && this.release) {
      const perm = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.getAllAuthoritiesPermission();
      perm.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER];
      this.permissions.permissions.push(perm);
    }
    const permissions = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyAndCleanPermissions(this.permissions.permissions, this.permissions.inherited);
    this.nodeApi.setNodePermissions(node.ref.id, permissions, false, '', false).subscribe(() => {}, error => this.toast.error(error));
  }
  readPermissions(last) {
    this.release = false;
    if (this) for (const perm of this.permissions.permissions) {
      if (perm.authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_EVERYONE && perm.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH) != -1) {
        if (this.releaseMulti != null && this.releaseMulti != 'true') this.releaseMulti = 'multi';else this.releaseMulti = 'true';
        if (last) this.setPermissionState();
        return;
      }
    }
    if (this.releaseMulti != null && this.releaseMulti != 'false') this.releaseMulti = 'multi';else this.releaseMulti = 'false';
    if (last) this.setPermissionState();
  }
  setPermissionState() {
    if (this.releaseMulti == 'true') this.release = true;
    if (this.releaseMulti == null || this.releaseMulti == 'false') this.release = false;
    if (this.releaseMulti == 'multi') {
      this.releaseIndeterminate = true;
    }
  }
  checkAllowRelease() {
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES).subscribe(data => {
      if (!this.getNodes()) {
        return;
      }
      if (!data) {
        this.allowRelease = false;
        return;
      }
      for (const node of this.getNodes()) {
        if (node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CHANGE_PERMISSIONS) == -1) {
          this.allowRelease = false;
          return;
        }
      }
    });
  }
  getProperties(prop = this._properties) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE] = [_this3.getLicenseProperty()];
      if (!_this3.contactIndeterminate) prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_QUESTIONSALLOWED] = [_this3.contact];
      if (_this3.isCCAttributableLicense()) {
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK] = [];
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL] = [];
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL] = [];
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_VERSION] = [];
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_LOCALE] = [];
        if (_this3.ccTitleOfWork) {
          prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK] = [_this3.ccTitleOfWork];
        }
        if (_this3.ccSourceUrl) {
          prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL] = [_this3.ccSourceUrl];
        }
        if (_this3.ccProfileUrl) {
          prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL] = [_this3.ccProfileUrl];
        }
        if (_this3.ccVersion) {
          prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_VERSION] = [_this3.ccVersion];
          // make sure v4.0 has no locale
          if (_this3.ccVersion === '4.0') {
            _this3.ccCountry = '';
          }
        }
        if (_this3.ccCountry) {
          prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_LOCALE] = [_this3.ccCountry];
        }
      }
      prop = _this3.author ? yield _this3.author.getValues(prop, _this3.getNodes()?.length === 1 ? _this3.getNodes()[0] : null) : prop;
      if (_this3.type == 'CUSTOM') {
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_RIGHTS_DESCRIPTION] = [_this3.rightsDescription];
      }
      return prop;
    })();
  }
  isCCAttributableLicense() {
    return this.getLicenseProperty() && this.getLicenseProperty().startsWith('CC_BY');
  }
  /**
   * Get all the key from countries and return the array with key and name (Translated)
   * @param {string[]} countries array with all Countries Key
   */
  translateLicenseCountries(countries) {
    // fixme: many possible combinations of countries and versions do not actually exist
    //        we could use a dict here to collect the versions available per country and then
    //        only show the available versions and vice versa only the available countries
    //        per version
    this._ccCountries = [];
    countries.forEach(country => {
      this._ccCountries.push({
        key: country,
        name: this.translate.instant('COUNTRY_CODE.' + country)
      });
    });
    this._ccCountries.sort((a, b) => this.sortCountries({
      a: a.name,
      b: b.name
    }));
  }
  /**
   * Function wich compare 2 string and return one of those numbers -1,0,1
   *
   *   -1 if a<b
   *    1 if a>b
   *    0 if a=b
   *
   * @param {string} a first string
   * @param {string} b second string
   * @returns {number}   -1 | 0 | 1
   */
  sortCountries({
    a,
    b
  }) {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  }
  hasMixedAuthorValues() {
    return this.getNodes() != null && (this.nodeHelper.hasMixedPropertyValues(this.getNodes(), _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR) || this.nodeHelper.hasMixedPropertyValues(this.getNodes(), _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT));
  }
  resetMixedAuthorValues() {
    if (this.nodeHelper.hasMixedPropertyValues(this.getNodes(), _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR)) {
      this.getNodes().forEach(n => n.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR] = null);
    }
    if (this.nodeHelper.hasMixedPropertyValues(this.getNodes(), _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT)) {
      this.getNodes().forEach(n => n.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT] = null);
    }
  }
  setDefaultModeState() {
    this.oerAvailable = !this.allowedLicenses || this.allowedLicenses.filter(e => e !== 'NONE').length > 0;
    this.oerMode = this.oerAvailable && (this.isOerLicense() || this.primaryType == 'NONE');
  }
  static #_ = this.ɵfac = function LicenseDialogContentComponent_Factory(t) {
    return new (t || LicenseDialogContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_features_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__.MdsEditorInstanceService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_7__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: LicenseDialogContentComponent,
    selectors: [["es-license-dialog-content"]],
    viewQuery: function LicenseDialogContentComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.selectLicense = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.author = _t.first);
      }
    },
    inputs: {
      data: "data"
    },
    outputs: {
      done: "done",
      isLoading: "isLoading",
      canSave: "canSave"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵProvidersFeature"]([_features_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__.MdsEditorInstanceService, _features_mds_mds_editor_mds_editor_view_view_instance_service__WEBPACK_IMPORTED_MODULE_5__.ViewInstanceService])],
    decls: 20,
    vars: 15,
    consts: [["class", "oerSelect switch toggle-reverse", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "oerLicenses", "name", "oerLicenses mat-group-gap", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "allLicenses", 4, "ngIf"], [3, "showContributorDialog"], ["author", ""], ["class", "cc-additional", 3, "ccTitleOfWork", "ccSourceUrl", "ccProfileUrl", "ccTitleOfWorkChange", "ccSourceUrlChange", "ccProfileUrlChange", 4, "ngIf"], [1, "currentLicense"], [4, "ngIf"], ["class", "currentLicenseIcon", 3, "src", 4, "ngIf"], ["class", "license-additional-data", 4, "ngIf"], [1, "licenseName"], ["class", "oerStatus", 4, "ngIf"], [1, "currentLicenseDescription"], ["class", "customLicenseDescription", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], ["class", "licenseUrl", 4, "ngIf"], [1, "oerSelect", "switch", "toggle-reverse", 3, "ngModel", "ngModelChange"], ["name", "oerLicenses mat-group-gap", 1, "oerLicenses", 3, "ngModel", "ngModelChange"], [1, "oerCC0"], [1, "oerCCBY"], ["value", "CC_0"], ["slot", "label"], ["slot", "description"], [3, "innerHTML"], [1, "more-information-link"], ["target", "_blank", 3, "href"], ["value", "PDM"], ["target", "_blank", 1, "focus-underline", 3, "href"], ["value", "CC_BY", "id", "CC_BY"], ["value", "CC_BY_SA", "id", "CC_BY_SA"], [1, "allLicenses"], [1, "licenseType"], ["id", "type", "type", "text", 3, "ngModel", "ngModelChange"], ["selectLicense", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "cc", 4, "ngIf"], ["class", "copyright mat-group-gap", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "cc", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "custom", 4, "ngIf"], [3, "value"], [1, "cc"], [1, "ccAbout"], [3, "ngModel", "ngModelChange"], ["value", ""], ["value", "SA", 4, "ngIf"], ["value", "ND", 4, "ngIf"], ["value", "SA"], ["value", "ND"], ["value", "NC"], [1, "copyright", "mat-group-gap", 3, "ngModel", "ngModelChange"], ["value", "COPYRIGHT_FREE"], ["value", "COPYRIGHT_LICENSE"], [1, "cc", 3, "ngModel", "ngModelChange"], [1, "custom"], ["matInput", "", "cdkTextareaAutosize", "", "required", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "5", 3, "ngModel", "ngModelChange"], [1, "cc-additional", 3, "ccTitleOfWork", "ccSourceUrl", "ccProfileUrl", "ccTitleOfWorkChange", "ccSourceUrlChange", "ccProfileUrlChange"], [1, "currentLicenseIcon", 3, "src"], [1, "license-additional-data"], ["class", "licenseLocale", 4, "ngIf"], [1, "licenseVersion"], ["id", "version", 3, "ngModel", "ngModelChange"], ["value", "2.0"], ["value", "3.0"], ["value", "4.0"], [1, "licenseLocale"], ["id", "localeCountry", 3, "ngModel", "ngModelChange"], [1, "oerStatus"], ["class", "oer", 4, "ngIf"], ["class", "notOer", 4, "ngIf"], [1, "oer"], [1, "notOer"], [1, "customLicenseDescription"], [1, "licenseUrl"]],
    template: function LicenseDialogContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, LicenseDialogContentComponent_mat_slide_toggle_0_Template, 3, 4, "mat-slide-toggle", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, LicenseDialogContentComponent_mat_radio_group_1_Template, 15, 11, "mat-radio-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, LicenseDialogContentComponent_div_2_Template, 12, 9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "es-mds-editor-widget-author", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, LicenseDialogContentComponent_es_license_source_5_Template, 1, 3, "es-license-source", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, LicenseDialogContentComponent_h4_7_Template, 3, 3, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, LicenseDialogContentComponent_img_8_Template, 1, 1, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, LicenseDialogContentComponent_div_9_Template, 14, 5, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "div", 10)(11, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, LicenseDialogContentComponent_div_13_Template, 3, 2, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, LicenseDialogContentComponent_div_15_Template, 2, 1, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, LicenseDialogContentComponent_div_16_Template, 2, 3, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, LicenseDialogContentComponent_div_17_Template, 3, 3, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, LicenseDialogContentComponent_div_18_Template, 4, 3, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](19, LicenseDialogContentComponent_div_19_Template, 5, 6, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.oerAvailable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.oerMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.oerMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("showContributorDialog", !ctx._properties);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.isCCAttributableLicense());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.type !== "MULTI");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.type !== "MULTI");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.type.startsWith("CC_BY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx.getLicenseName());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.getLicenseProperty() !== "MULTI");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.primaryType === "CUSTOM");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.primaryType !== "CUSTOM" && ctx.primaryType !== "COPYRIGHT");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.primaryType === "COPYRIGHT");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.primaryType === "CC_BY");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.primaryType === "CC_BY" || ctx.primaryType === "CC_0");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _shared_components_license_source_license_source_component__WEBPACK_IMPORTED_MODULE_8__.LicenseSourceComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_19__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_20__.CdkTextareaAutosize, _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_21__.MatRadioButton, _angular_material_select__WEBPACK_IMPORTED_MODULE_22__.MatSelect, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_23__.MatSlideToggle, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_9__.MultiLineLabelComponent, _mds_mds_editor_widgets_mds_editor_widget_author_mds_editor_widget_author_component__WEBPACK_IMPORTED_MODULE_10__.MdsEditorWidgetAuthorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.UpperCasePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n[_nghost-%COMP%]     .mat-tab-labels {\n  background-color: #fff;\n}\n[_nghost-%COMP%]     .mat-checkbox-layout {\n  white-space: normal !important;\n  align-items: baseline !important;\n}\n\nes-mds-editor-widget-author[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding-top: 20px;\n}\n\n.cc[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.cc[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  padding-bottom: 5px;\n}\n\n.cc[_ngcontent-%COMP%]   .ccAbout[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: bold;\n  text-decoration: none;\n}\n\n.licenseType[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 10px 0;\n}\n\n.custom[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nh4[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 100%;\n  margin: 1.6rem 0 1rem 0;\n  color: var(--textLight);\n  font-weight: bold;\n}\n\nh5[_ngcontent-%COMP%] {\n  font-weight: normal;\n  font-size: 90%;\n  color: var(--textLight);\n  margin: 0;\n  line-height: 1.5;\n}\n\n.currentLicense[_ngcontent-%COMP%] {\n  text-align: center;\n  background-color: #fff;\n  padding: 10px 30px;\n  margin: 0 -20px;\n}\n.currentLicense[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 10px 0 20px 0;\n}\n\n.licenseName[_ngcontent-%COMP%] {\n  display: table;\n  margin: auto;\n  padding: 10px 0;\n}\n.licenseName[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .licenseName[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: table-cell;\n}\n\n.oerStatus[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  font-weight: bold;\n  text-transform: uppercase;\n  font-size: 80%;\n  color: var(--light-primary-text);\n}\n.oerStatus[_ngcontent-%COMP%]   .oer[_ngcontent-%COMP%] {\n  background: #0b0;\n}\n.oerStatus[_ngcontent-%COMP%]   .notOer[_ngcontent-%COMP%] {\n  background: #f5a623;\n}\n.oerStatus[_ngcontent-%COMP%]   .oer[_ngcontent-%COMP%], .oerStatus[_ngcontent-%COMP%]   .notOer[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n\nmat-radio-group[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n}\nmat-radio-group.mat-group-gap[_ngcontent-%COMP%] {\n  gap: 20px;\n}\nmat-radio-group[_ngcontent-%COMP%]   .ccAuthor[_ngcontent-%COMP%] {\n  margin: 5px 20px;\n}\nmat-radio-group[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n  margin: -5px 0;\n}\n\nmat-radio-button[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.more-information-link[_ngcontent-%COMP%] {\n  margin-left: 64px;\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n.more-information-link[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  text-decoration: underline;\n}\n\nfieldset[_ngcontent-%COMP%] {\n  border: none;\n  margin: 0;\n  padding: 0;\n}\nfieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 1em;\n  color: var(--textLight);\n}\n\n.oerSelect[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding-bottom: 10px;\n}\n\n.currentLicenseIcon[_ngcontent-%COMP%] {\n  height: 40px;\n  width: auto;\n}\n\n.currentLicenseDescription[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.currentLicenseDescription[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n\n.customLicenseDescription[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n\n.license-additional-data[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding-top: 10px;\n}\n.license-additional-data[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n\n.licenseUrl[_ngcontent-%COMP%] {\n  margin: 10px !important;\n}\n.licenseUrl[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: underline;\n}\n\n.authors[_ngcontent-%COMP%]   .mixed-authors[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n  margin-bottom: 20px;\n  background-color: #f9f9f9;\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n  justify-content: center;\n  display: grid;\n  grid-template-rows: auto auto auto;\n  grid-gap: 15px;\n  width: 100%;\n}\n.authors[_ngcontent-%COMP%]   .mixed-authors[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  text-align: center;\n  white-space: pre-line;\n}\n.authors[_ngcontent-%COMP%]   .mixed-authors[_ngcontent-%COMP%]    > span.title[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.authors[_ngcontent-%COMP%]   .mixed-authors[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL2xpY2Vuc2UtZGlhbG9nL2xpY2Vuc2UtZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIiwid2VicGFjazovLy4vcHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFJSTtFQUNJLHNCQUFBO0FBRFI7QUFHSTtFQUNJLDhCQUFBO0VBQ0EsZ0NBQUE7QUFEUjs7QUFLQTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQUZKOztBQUtBO0VBQ0ksV0FBQTtBQUZKOztBQUtBO0VBQ0ksbUJBQUE7QUFGSjs7QUFLQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtBQUZKOztBQUtBO0VBQ0ksV0FBQTtFQUNBLGNBQUE7QUFGSjs7QUFNSTtFQUNJLFdBQUE7QUFIUjs7QUFPQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJEcENRO0VDcUNSLGlCQUFBO0FBSko7O0FBT0E7RUFDSSxtQkFBQTtFQUNBLGNBQUE7RUFDQSx1QkQzQ1E7RUM0Q1IsU0FBQTtFQUNBLGdCQUFBO0FBSko7O0FBT0E7RUFDSSxrQkFBQTtFQUNBLHNCRHhDYztFQ3lDZCxrQkFBQTtFQUNBLGVBQUE7QUFKSjtBQUtJO0VBQ0kscUJBQUE7QUFIUjs7QUFPQTtFQUNJLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQUpKO0FBS0k7O0VBRUksbUJBQUE7QUFIUjs7QUFPQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxnQ0NwRlk7QURnRmhCO0FBS0k7RUFDSSxnQkFBQTtBQUhSO0FBS0k7RUFDSSxtQkFBQTtBQUhSO0FBS0k7O0VBRUksaUJBQUE7RUFDQSxrQkFBQTtBQUhSOztBQU9BO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBSko7QUFLSTtFQUNJLFNBQUE7QUFIUjtBQUtJO0VBQ0ksZ0JBQUE7QUFIUjtBQUtJO0VBQ0ksY0FBQTtBQUhSOztBQU9BO0VBQ0ksbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBSko7O0FBT0E7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUpKO0FBS0k7RUFDSSwwQkFBQTtBQUhSOztBQU9BO0VBQ0ksWUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBSko7QUFLSTtFQUNJLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkQ3SEk7QUMwSFo7O0FBT0E7RUFDSSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxvQkFBQTtBQUpKOztBQU9BO0VBQ0ksWUFBQTtFQUNBLFdBQUE7QUFKSjs7QUFPQTtFQUNJLHVCRDdJUTtBQ3lJWjs7QUFPQTtFQUNJLGNBQUE7QUFKSjs7QUFPQTtFQUNJLHFCQUFBO0FBSko7O0FBT0E7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtBQUpKO0FBS0k7RUFDSSxjQUFBO0FBSFI7O0FBT0E7RUFDSSx1QkFBQTtBQUpKO0FBS0k7RUFDSSwwQkFBQTtBQUhSOztBQU9JO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCRDVIYztFR3pDbEIsd0NBQUE7RUZrTEksdUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQWZSO0FBQVE7RUFDSSxrQkFBQTtFQUNBLHFCQUFBO0FBRVo7QUFEWTtFQUNJLGlCQUFBO0FBR2hCO0FBQVE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7QUFFWiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogMTAwJTtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAubWF0LXRhYi1sYWJlbHMge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIH1cbiAgICAubWF0LWNoZWNrYm94LWxheW91dCB7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWwgIWltcG9ydGFudDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuXG5lcy1tZHMtZWRpdG9yLXdpZGdldC1hdXRob3Ige1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbn1cblxuLmNjIGxhYmVsIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmNjIGg1IHtcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG4uY2MgLmNjQWJvdXQge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5saWNlbnNlVHlwZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5jdXN0b20ge1xuICAgID4gbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG5cbmg0IHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDEwMCU7XG4gICAgbWFyZ2luOiAxLjZyZW0gMCAxcmVtIDA7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmg1IHtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc2l6ZTogOTAlO1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgIG1hcmdpbjogMDtcbiAgICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4uY3VycmVudExpY2Vuc2Uge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZENvbG9yO1xuICAgIHBhZGRpbmc6IDEwcHggMzBweDtcbiAgICBtYXJnaW46IDAgLTIwcHg7XG4gICAgaDQge1xuICAgICAgICBtYXJnaW46IDEwcHggMCAyMHB4IDA7XG4gICAgfVxufVxuXG4ubGljZW5zZU5hbWUge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgaDQsXG4gICAgZGl2IHtcbiAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB9XG59XG5cbi5vZXJTdGF0dXMge1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogODAlO1xuICAgIGNvbG9yOiAkdGV4dE9uUHJpbWFyeTtcbiAgICAub2VyIHtcbiAgICAgICAgYmFja2dyb3VuZDogIzBiMDtcbiAgICB9XG4gICAgLm5vdE9lciB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmNWE2MjM7XG4gICAgfVxuICAgIC5vZXIsXG4gICAgLm5vdE9lciB7XG4gICAgICAgIHBhZGRpbmc6IDRweCAxMnB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgfVxufVxuXG5tYXQtcmFkaW8tZ3JvdXAge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47IC8vIHRoZXJlIG1pZ2h0IGJlIGEgYmV0dGVyIHNvbHV0aW9uIHRob3VnaCFcbiAgICAmLm1hdC1ncm91cC1nYXAge1xuICAgICAgICBnYXA6IDIwcHg7XG4gICAgfVxuICAgIC5jY0F1dGhvciB7XG4gICAgICAgIG1hcmdpbjogNXB4IDIwcHg7XG4gICAgfVxuICAgIG1hdC1yYWRpby1idXR0b24ge1xuICAgICAgICBtYXJnaW46IC01cHggMDtcbiAgICB9XG59XG5cbm1hdC1yYWRpby1idXR0b24ge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG59XG5cbi5tb3JlLWluZm9ybWF0aW9uLWxpbmsge1xuICAgIG1hcmdpbi1sZWZ0OiA2NHB4O1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICA+IGEge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG59XG5cbmZpZWxkc2V0IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGVnZW5kIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgfVxufVxuXG4ub2VyU2VsZWN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5jdXJyZW50TGljZW5zZUljb24ge1xuICAgIGhlaWdodDogNDBweDtcbiAgICB3aWR0aDogYXV0bztcbn1cblxuLmN1cnJlbnRMaWNlbnNlRGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xufVxuXG4uY3VycmVudExpY2Vuc2VEZXNjcmlwdGlvbiBkaXYge1xuICAgIG1hcmdpbjogMCAxMHB4O1xufVxuXG4uY3VzdG9tTGljZW5zZURlc2NyaXB0aW9uIHtcbiAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG59XG5cbi5saWNlbnNlLWFkZGl0aW9uYWwtZGF0YSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICA+IGRpdiB7XG4gICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgIH1cbn1cblxuLmxpY2Vuc2VVcmwge1xuICAgIG1hcmdpbjogMTBweCAhaW1wb3J0YW50O1xuICAgIGEge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG59XG4uYXV0aG9ycyB7XG4gICAgLm1peGVkLWF1dGhvcnMge1xuICAgICAgICBwYWRkaW5nOiAzMHB4IDIwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjYXJkTGlnaHRCYWNrZ3JvdW5kO1xuICAgICAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvd0JvdHRvbSgpO1xuICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgICAgICAgICAgJi50aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0byBhdXRvO1xuICAgICAgICBncmlkLWdhcDogMTVweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 74871:
/*!********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/license-dialog/license-dialog.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseDialogComponent: () => (/* binding */ LicenseDialogComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./license-dialog-content.component */ 1751);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);









class LicenseDialogComponent {
  constructor(data, dialogRef, localEvents) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.localEvents = localEvents;
    this.canSave = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(true);
    this.saveButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.content.saveLicense());
  }
  ngOnInit() {
    this.initButtons();
    this.registerUpdateButtons();
  }
  initButtons() {
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => this.dialogRef.close(null)), this.saveButton]
    });
  }
  registerUpdateButtons() {
    rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest([this.canSave, this.dialogRef.observeState('isLoading')]).subscribe(([canSave, isLoading]) => {
      this.saveButton.disabled = isLoading || !canSave;
    });
  }
  onDone(result) {
    this.dialogRef.close(result);
    if (this.data.kind === 'nodes' && Array.isArray(result)) {
      this.localEvents.nodesChanged.emit(result);
    }
  }
  setIsLoading(isLoading) {
    void Promise.resolve().then(() => {
      this.dialogRef.patchState({
        isLoading
      });
    });
  }
  static #_ = this.ɵfac = function LicenseDialogComponent_Factory(t) {
    return new (t || LicenseDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.LocalEventsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: LicenseDialogComponent,
    selectors: [["es-license-dialog"]],
    viewQuery: function LicenseDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__.LicenseDialogContentComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
      }
    },
    decls: 1,
    vars: 1,
    consts: [[3, "data", "done", "isLoading", "canSave"]],
    template: function LicenseDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-license-dialog-content", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("done", function LicenseDialogComponent_Template_es_license_dialog_content_done_0_listener($event) {
          return ctx.onDone($event);
        })("isLoading", function LicenseDialogComponent_Template_es_license_dialog_content_isLoading_0_listener($event) {
          return ctx.setIsLoading($event);
        })("canSave", function LicenseDialogComponent_Template_es_license_dialog_content_canSave_0_listener($event) {
          return ctx.canSave.next($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", ctx.data);
      }
    },
    dependencies: [_license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__.LicenseDialogContentComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 43095:
/*!*****************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/license-dialog/license-dialog.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseDialogComponent: () => (/* reexport safe */ _license_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LicenseDialogComponent),
/* harmony export */   LicenseDialogModule: () => (/* binding */ LicenseDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _license_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./license-dialog.component */ 74871);
/* harmony import */ var _license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./license-dialog-content.component */ 1751);
/* harmony import */ var _mds_mds_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../mds/mds.module */ 77894);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);






class LicenseDialogModule {
  static #_ = this.ɵfac = function LicenseDialogModule_Factory(t) {
    return new (t || LicenseDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: LicenseDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_3__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](LicenseDialogModule, {
    declarations: [_license_dialog_component__WEBPACK_IMPORTED_MODULE_1__.LicenseDialogComponent, _license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__.LicenseDialogContentComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_3__.MdsModule],
    exports: [_license_dialog_content_component__WEBPACK_IMPORTED_MODULE_2__.LicenseDialogContentComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_features_dialogs_dialog-modules_license-dialog_license-dialog_module_ts.js.map