"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_node-relations-dialog_node-relations-dialog_module_ts"],{

/***/ 69118:
/*!**********************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-relations-dialog/node-relations-dialog.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeRelationsDialogComponent: () => (/* binding */ NodeRelationsDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/bridge.service */ 34997);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/node-helper.service */ 76754);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _node_search_selector_node_search_selector_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node-search-selector/node-search-selector.component */ 48816);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 21916);


























function NodeRelationsDialogComponent_es_info_message_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "es-info-message", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "NODE_RELATIONS.RELATION_COPY_HINT"), "\n");
  }
}
function NodeRelationsDialogComponent_mat_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", key_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 2, "NODE_RELATIONS.RELATION_TYPE_FULLY." + key_r10), " ");
  }
}
function NodeRelationsDialogComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](1, 1, "NODE_RELATIONS.NO_PERMISSIONS"));
  }
}
function NodeRelationsDialogComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 16)(1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "es-node-row", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_17_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r11.openNode(ctx_r11.swapRelation ? ctx_r11.target : ctx_r11.source));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 21)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](16, "es-node-row", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_17_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r13.openNode(ctx_r13.swapRelation ? ctx_r13.source : ctx_r13.target));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](19, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("node", ctx_r6.swapRelation ? ctx_r6.target : ctx_r6.source)("columns", _r3.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 11, "NODE_RELATIONS.OPEN_NODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](9, 13, "NODE_RELATIONS.RELATION_TYPE." + ctx_r6.RelationsInverted[ctx_r6.form.get("relation").value]));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("altText", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 15, "NODE_RELATIONS.RELATES_TO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](14, 17, "NODE_RELATIONS.RELATION_TYPE." + ctx_r6.form.get("relation").value));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("node", ctx_r6.swapRelation ? ctx_r6.source : ctx_r6.target)("columns", _r3.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](18, 19, "NODE_RELATIONS.OPEN_NODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
  }
}
function NodeRelationsDialogComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 23)(1, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_18_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      ctx_r14.target = null;
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r14.updateButtons());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_18_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r16.swap());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_18_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r15);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r17.createRelation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 8, "NODE_RELATIONS.RESELECT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", !ctx_r7.isSwappable());
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 10, "NODE_RELATIONS.SWAP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", !ctx_r7.form.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](12, 12, "NODE_RELATIONS.CREATE_CONFIRM"), " ");
  }
}
function NodeRelationsDialogComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "NODE_RELATIONS.NO_RELATIONS"), "\n");
  }
}
const _c0 = function () {
  return {
    relative: false
  };
};
function NodeRelationsDialogComponent_div_23_div_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 38)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 38)(8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const relation_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 4, "NODE_RELATIONS.RELATION_CREATED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](6, 6, relation_r20.timestamp, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](13, _c0)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](10, 9, "NODE_RELATIONS.RELATION_CREATOR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 11, relation_r20.creator));
  }
}
function NodeRelationsDialogComponent_div_23_div_7_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_23_div_7_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r28);
      const relation_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r26.removeRelation(relation_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const relation_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](1, 3, "NODE_RELATIONS.REMOVE_RELATION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", !ctx_r23.canModify(relation_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
  }
}
function NodeRelationsDialogComponent_div_23_div_7_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 41)(1, "div", 42)(2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_23_div_7_div_8_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r32);
      const relation_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r30.deleteRelations.splice(ctx_r30.deleteRelations.indexOf(relation_r20), 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 3, "WORKSPACE.SHARE.DELETED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](10, 5, "NODE_RELATIONS.RESTORE_RELATION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
  }
}
function NodeRelationsDialogComponent_div_23_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 17)(1, "es-node-row", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, NodeRelationsDialogComponent_div_23_div_7_ng_template_2_Template, 14, 14, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NodeRelationsDialogComponent_div_23_div_7_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r34);
      const relation_r20 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r33.openNode(relation_r20.node));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, NodeRelationsDialogComponent_div_23_div_7_button_7_Template, 3, 5, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, NodeRelationsDialogComponent_div_23_div_7_div_8_Template, 12, 7, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const relation_r20 = ctx.$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("added", ctx_r19.addRelations.includes(relation_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("node", relation_r20.node)("columns", ctx_r19.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 8, "NODE_RELATIONS.OPEN_NODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aria", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx_r19.deleteRelations.includes(relation_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r19.deleteRelations.includes(relation_r20));
  }
}
function NodeRelationsDialogComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 31)(1, "div")(2, "h5", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "nodeTitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, NodeRelationsDialogComponent_div_23_div_7_Template, 9, 10, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const key_r18 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" \"", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 3, ctx_r9.source), "\" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 5, "NODE_RELATIONS.RELATION_TYPE." + key_r18), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r9.getRelations(key_r18));
  }
}
class NodeRelationsDialogComponent {
  constructor(data, dialogRef, bridgeService, cdr, localEvents, nodeHelper, nodeService, relationService, toast, userService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.bridgeService = bridgeService;
    this.cdr = cdr;
    this.localEvents = localEvents;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.relationService = relationService;
    this.toast = toast;
    this.userService = userService;
    this.Relations = Object.values(Relations);
    this.RelationsInverted = {
      [Relations.isBasedOn]: 'isBasisFor',
      [Relations.isPartOf]: 'hasPart',
      [Relations.references]: 'references'
    };
    this.addRelations = [];
    this.deleteRelations = [];
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__.UntypedFormGroup({
      relation: new _angular_forms__WEBPACK_IMPORTED_MODULE_12__.UntypedFormControl(Relations.isBasedOn, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required)
    });
    this.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_WRITE];
    this.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TITLE)];
    this.buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton.TYPE_CANCEL, () => this.dialogRef.close(null)), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton.TYPE_PRIMARY, () => this.save())];
    this.dialogRef.patchState({
      isLoading: true
    });
  }
  ngOnInit() {
    this.dialogRef.patchConfig({
      buttons: this.buttons
    });
    this.initNode(this.data.node);
    this.updateButtons();
  }
  getRelationKeys() {
    return [...new Set(this.addRelations.concat(this.relations || [])?.map(r => r.type))].sort();
  }
  swap() {
    this.swapRelation = !this.swapRelation;
  }
  getCriteria() {
    return [{
      property: 'sourceNode',
      values: [this.source.ref.id]
    }];
  }
  getAllExistingRelations() {
    return this.getAllRelations().filter(r => !this.deleteRelations.includes(r));
  }
  getAllRelations() {
    return this.relations.concat(this.addRelations);
  }
  getRelations(key) {
    return this.getAllRelations().filter(r => r.type === key).sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
  }
  openNode(node) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.openUrl(this.nodeHelper.getNodeUrl(node, {
      closeOnBack: true
    }), this.bridgeService, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.OPEN_URL_MODE.Blank);
  }
  removeRelation(relation) {
    if (!this.deleteRelations.includes(relation)) {
      this.deleteRelations.push(relation);
    }
    this.updateButtons();
  }
  resolveRelationSendData(r) {
    const inverted = this.isInverted(r);
    let source = this.source.ref.id;
    let target = r.node.ref.id;
    let type = r.type;
    if (inverted) {
      source = r.node.ref.id;
      target = this.source.ref.id;
      type = inverted;
    }
    return {
      source,
      target,
      type
    };
  }
  save() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.toast.showProgressSpinner();
      try {
        yield (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(_this.addRelations.map(r => {
          const data = _this.resolveRelationSendData(r);
          return _this.relationService.createRelation(data.source, data.target, data.type);
        })).toPromise();
        yield (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(_this.deleteRelations.map(r => {
          const data = _this.resolveRelationSendData(r);
          return _this.relationService.deleteRelation(data.source, data.target, data.type);
        })).toPromise();
        _this.dialogRef.close(true);
        _this.localEvents.nodesChanged.emit([_this.data.node]);
      } catch (e) {}
      _this.toast.closeProgressSpinner();
    })();
  }
  updateButtons() {
    const hasChanges = this.hasChanges();
    this.buttons[1].disabled = !hasChanges;
    if (hasChanges) {
      this.dialogRef.patchConfig({
        closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.Closable.Confirm
      });
    } else if (this.target) {
      this.dialogRef.patchConfig({
        closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.Closable.Standard
      });
    } else {
      this.dialogRef.patchConfig({
        closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.Closable.Casual
      });
    }
  }
  getCurrentType() {}
  createRelation() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let type = _this2.form.get('relation').value;
      if (_this2.swapRelation) {
        type = _this2.RelationsInverted[type];
      }
      if (_this2.getAllExistingRelations().find(r => r.node.ref.id === _this2.target.ref.id && r.type === type)) {
        _this2.toast.error(null, 'NODE_RELATIONS.RELATION_EXISTS');
        return;
      }
      _this2.addRelations.push({
        node: _this2.target,
        type,
        // @TODO: check if api model is invalid
        timestamp: new Date().getTime(),
        creator: (yield _this2.userService.observeCurrentUser().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.first)()).toPromise()).person
      });
      _this2.form.reset();
      _this2.form.setValue({
        relation: Relations.isBasedOn
      });
      _this2.swapRelation = false;
      _this2.target = null;
      _this2.updateButtons();
    })();
  }
  isInverted(r) {
    return Object.keys(this.RelationsInverted).find(k => this.RelationsInverted[k] === r.type && k !== r.type);
  }
  isPublishedCopy() {
    return !!this.source.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_PUBLISHED_ORIGINAL]?.[0];
  }
  isSwappable() {
    const relation = this.form.get('relation').value;
    return !(this.RelationsInverted[relation] === relation);
  }
  canModify(relation) {
    return this.nodeHelper.getNodesRight([relation.node], _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_WRITE, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.NodesRightMode.Effective);
  }
  hasChanges() {
    return this.addRelations?.length || this.deleteRelations?.length;
  }
  initNode(node) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // published original: we now need to switch to the original id!
      if (node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_PUBLISHED_ORIGINAL]) {
        // switch to original node id!
        node = yield _this3.nodeService.getNode(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.removeSpacesStoreRef(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_PUBLISHED_ORIGINAL][0])).toPromise();
      }
      _this3.source = node;
      _this3.relationService.getRelations(node.ref.id).subscribe(relations => {
        _this3.relations = relations.relations;
        _this3.dialogRef.patchState({
          isLoading: false
        });
        _this3.cdr.detectChanges();
      }, e => {
        _this3.dialogRef.close(null);
      });
    })();
  }
  static #_ = this.ɵfac = function NodeRelationsDialogComponent_Factory(t) {
    return new (t || NodeRelationsDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_5__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__.RelationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_7__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_16__.UserService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: NodeRelationsDialogComponent,
    selectors: [["es-node-relations-dialog"]],
    decls: 24,
    vars: 26,
    consts: [["mode", "info", 4, "ngIf"], [1, "mat-heading-4"], [3, "formGroup"], ["formElement", ""], ["formControlName", "relation"], [3, "value", 4, "ngFor", "ngForOf"], [3, "groupId", "queryId", "columnsIds", "permissions", "criteria", "label", "onSelect"], ["selector", ""], ["noPermissions", ""], ["class", "relation-result", 4, "ngIf"], ["class", "actions", 4, "ngIf"], ["class", "relations-none", 4, "ngIf"], ["class", "relations-group", 4, "ngFor", "ngForOf"], ["mode", "info"], [3, "value"], ["esIcon", "security", 3, "matTooltip"], [1, "relation-result"], [1, "relation-node"], [3, "node", "columns"], ["mat-icon-button", "", "color", "primary", 3, "matTooltip", "click"], ["esIcon", "open_in_new", 3, "aria"], [1, "relation-details"], ["esIcon", "swap_horiz", 3, "altText"], [1, "actions"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["esIcon", "clear", 3, "aria"], ["mat-button", "", "color", "primary", 3, "disabled", "click"], ["esIcon", "swap_horiz", 3, "aria"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "click"], ["esIcon", "add", 3, "aria"], [1, "relations-none"], [1, "relations-group"], [1, "mat-heading-5"], [1, "relation-nodes"], ["class", "relation-node", 3, "added", 4, "ngFor", "ngForOf"], ["customMetadata", ""], ["mat-icon-button", "", "color", "primary", 3, "disabled", "matTooltip", "click", 4, "ngIf"], ["class", "deleted-overlay", 4, "ngIf"], [1, "info-group"], ["mat-icon-button", "", "color", "primary", 3, "disabled", "matTooltip", "click"], ["esIcon", "delete", 3, "aria"], [1, "deleted-overlay"], [1, "deleted-info"], [1, "line"], [1, "info"], ["esIcon", "undo", 3, "aria"]],
    template: function NodeRelationsDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, NodeRelationsDialogComponent_es_info_message_0_Template, 3, 3, "es-info-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "form", 2, 3)(6, "mat-form-field")(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, NodeRelationsDialogComponent_mat_option_11_Template, 3, 4, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "es-node-search-selector", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("onSelect", function NodeRelationsDialogComponent_Template_es_node_search_selector_onSelect_12_listener($event) {
          ctx.target = $event;
          return ctx.updateButtons();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, NodeRelationsDialogComponent_ng_template_15_Template, 2, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, NodeRelationsDialogComponent_div_17_Template, 20, 21, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, NodeRelationsDialogComponent_div_18_Template, 13, 14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](21, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](22, NodeRelationsDialogComponent_div_22_Template, 3, 3, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](23, NodeRelationsDialogComponent_div_23_Template, 8, 7, "div", 12);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.isPublishedCopy());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 18, "NODE_RELATIONS.CREATE_RELATION"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](9, 20, "NODE_RELATIONS.RELATION_TYPE_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.Relations);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("display-none", ctx.target);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](14, 22, "NODE_RELATIONS.RELATION_SEARCH_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("groupId", "search_relation_node")("queryId", "search_relation_query")("columnsIds", "relationNodes")("permissions", ctx.permissions)("criteria", ctx.getCriteria());
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.target);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.target);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](21, 24, "NODE_RELATIONS.EXISTING_RELATIONS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.getRelationKeys().length);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.getRelationKeys());
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.NodeRowComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__.InfoMessageComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_22__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _node_search_selector_node_search_selector_component__WEBPACK_IMPORTED_MODULE_9__.NodeSearchSelectorComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_10__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.FormatDatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.NodeTitlePipe],
    styles: ["\n\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\nform[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   es-node-search-selector[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nh2[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n\n.relation-result[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px 15px;\n  background-color: #f9f9f9;\n}\n.relation-result[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  grid-gap: 10px;\n  align-items: center;\n  padding: 5px 10px;\n}\n.relation-result[_ngcontent-%COMP%]   .relation-details[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  padding: 10px 0;\n}\n.relation-result[_ngcontent-%COMP%]   .relation-details[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  padding: 0 5px;\n}\n.relation-result[_ngcontent-%COMP%]   .relation-details[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  transform: rotate(90deg);\n}\n.relation-result[_ngcontent-%COMP%]    > es-node-row[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  grid-gap: 20px;\n  width: 100%;\n  justify-content: flex-end;\n  padding-top: 10px;\n}\n\n.relations-none[_ngcontent-%COMP%] {\n  font-size: 110%;\n  padding: 20px 0;\n  color: var(--textLight);\n  text-align: center;\n}\n\n.relations-group[_ngcontent-%COMP%] {\n  display: grid;\n  grid-gap: 20px;\n  grid-template-rows: repeat(auto-fit, 1fr);\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-rows: auto;\n  grid-gap: 10px;\n  background-color: #f9f9f9;\n  margin: 10px 0;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  grid-gap: 10px;\n  align-items: center;\n  padding: 5px 10px;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node.added[_ngcontent-%COMP%] {\n  border-radius: 25px;\n  border: 2px dashed #42ca8d;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%]    > .deleted-overlay[_ngcontent-%COMP%] {\n  display: grid;\n  grid-gap: 20px;\n  padding: 5px 10px;\n  grid-template-columns: 1fr auto;\n  align-items: center;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.6);\n  -webkit-backdrop-filter: blur(1px) saturate(50%);\n          backdrop-filter: blur(1px) saturate(50%);\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%]    > .deleted-overlay[_ngcontent-%COMP%]   .deleted-info[_ngcontent-%COMP%] {\n  display: flex;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%]    > .deleted-overlay[_ngcontent-%COMP%]   .deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 0 15px;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%]    > .deleted-overlay[_ngcontent-%COMP%]   .deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:last-child {\n  padding-right: 40px;\n}\n.relations-group[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .relation-node[_ngcontent-%COMP%]    > .deleted-overlay[_ngcontent-%COMP%]   .deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border: none;\n  background: #000;\n  height: 1px;\n}\n\n.info-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: var(--fontSizeXSmall);\n  color: var(--textLight);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL25vZGUtcmVsYXRpb25zLWRpYWxvZy9ub2RlLXJlbGF0aW9ucy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNJQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7QUFQSjtBQVNJOztFQUVJLFdBQUE7QUFQUjs7QUFXQTtFQUNJLGFBQUE7QUFSSjs7QUFXQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkRrQ2tCO0FDMUN0QjtBQVVJO0VBQ0ksV0FBQTtFQTdCSixhQUFBO0VBQ0Esb0NBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQXNCSjtBQU9JO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUFMUjtBQU9RO0VBQ0ksY0FBQTtBQUxaO0FBUVE7RUFDSSx3QkFBQTtBQU5aO0FBVUk7RUFDSSxXQUFBO0FBUlI7O0FBWUE7RUFDSSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUFUSjs7QUFZQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0EsdUJEcERRO0VDcURSLGtCQUFBO0FBVEo7O0FBWUE7RUFDSSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHlDQUFBO0FBVEo7QUFXSTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHdCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCRG5CYztFQ29CZCxjQUFBO0FBVFI7QUFXUTtFQWxGSixhQUFBO0VBQ0Esb0NBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQTBFSjtBQU9ZO0VBQ0ksbUJBQUE7RUFDQSwwQkFBQTtBQUxoQjtBQVFZO0VBQ0ksYUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFDQSxnREFBQTtVQUFBLHdDQUFBO0FBTmhCO0FBUWdCO0VBQ0ksYUFBQTtBQU5wQjtBQVFvQjtFQUNJLFlBQUE7RUFDQSxlQUFBO0FBTnhCO0FBUXdCO0VBQ0ksbUJBQUE7QUFONUI7QUFTd0I7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBUDVCOztBQWdCQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQWJKO0FBY0k7RUFDSSxnQ0QzR1M7RUM0R1QsdUJEckhJO0FDeUdaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbkBtaXhpbiBub2RlR3JvdXAoKSB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciBhdXRvIGF1dG87XG4gICAgZ3JpZC1nYXA6IDEwcHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbn1cbmZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIG1hdC1mb3JtLWZpZWxkLFxuICAgIGVzLW5vZGUtc2VhcmNoLXNlbGVjdG9yIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufVxuXG5oMjpmaXJzdC1jaGlsZCB7XG4gICAgbWFyZ2luLXRvcDogMDtcbn1cblxuLnJlbGF0aW9uLXJlc3VsdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZzogMjBweCAxNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjYXJkTGlnaHRCYWNrZ3JvdW5kO1xuXG4gICAgLnJlbGF0aW9uLW5vZGUge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgQGluY2x1ZGUgbm9kZUdyb3VwKCk7XG4gICAgfVxuXG4gICAgLnJlbGF0aW9uLWRldGFpbHMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcblxuICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgcGFkZGluZzogMCA1cHg7XG4gICAgICAgIH1cblxuICAgICAgICA+IGkge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgPiBlcy1ub2RlLXJvdyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cblxuLmFjdGlvbnMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG8gYXV0bztcbiAgICBncmlkLWdhcDogMjBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xufVxuXG4ucmVsYXRpb25zLW5vbmUge1xuICAgIGZvbnQtc2l6ZTogMTEwJTtcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucmVsYXRpb25zLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtZ2FwOiAyMHB4O1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCAxZnIpO1xuXG4gICAgLnJlbGF0aW9uLW5vZGVzIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG87XG4gICAgICAgIGdyaWQtZ2FwOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2FyZExpZ2h0QmFja2dyb3VuZDtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XG4gICAgICAgIC8vIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAucmVsYXRpb24tbm9kZSB7XG4gICAgICAgICAgICBAaW5jbHVkZSBub2RlR3JvdXAoKTtcblxuICAgICAgICAgICAgJi5hZGRlZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDJweCBkYXNoZWQgJHdvcmtzcGFjZUluaGVyaXRDb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPiAuZGVsZXRlZC1vdmVybGF5IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgICAgICAgIGdyaWQtZ2FwOiAyMHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIGF1dG87XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMXB4KSBzYXR1cmF0ZSg1MCUpO1xuXG4gICAgICAgICAgICAgICAgLmRlbGV0ZWQtaW5mbyB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICAgICAgICAgICAgICAgICAgLmxpbmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCAxNXB4O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDQwcHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmluZm8tZ3JvdXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBsYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplWFNtYWxsO1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    changeDetection: 0
  });
}
var Relations;
(function (Relations) {
  Relations["isBasedOn"] = "isBasedOn";
  Relations["isPartOf"] = "isPartOf";
  Relations["references"] = "references";
})(Relations || (Relations = {}));

/***/ }),

/***/ 41457:
/*!*******************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-relations-dialog/node-relations-dialog.module.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeRelationsDialogComponent: () => (/* reexport safe */ _node_relations_dialog_component__WEBPACK_IMPORTED_MODULE_2__.NodeRelationsDialogComponent),
/* harmony export */   NodeRelationsDialogModule: () => (/* binding */ NodeRelationsDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mds/mds.module */ 77894);
/* harmony import */ var _node_relations_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node-relations-dialog.component */ 69118);
/* harmony import */ var _node_search_selector_node_search_selector_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node-search-selector/node-search-selector.component */ 48816);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);







class NodeRelationsDialogModule {
  static #_ = this.ɵfac = function NodeRelationsDialogModule_Factory(t) {
    return new (t || NodeRelationsDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: NodeRelationsDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.EduSharingUiModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](NodeRelationsDialogModule, {
    declarations: [_node_relations_dialog_component__WEBPACK_IMPORTED_MODULE_2__.NodeRelationsDialogComponent, _node_search_selector_node_search_selector_component__WEBPACK_IMPORTED_MODULE_3__.NodeSearchSelectorComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.EduSharingUiModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
})();

/***/ }),

/***/ 48816:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-relations-dialog/node-search-selector/node-search-selector.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeSearchSelectorComponent: () => (/* binding */ NodeSearchSelectorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_rest_services_rest_search_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../core-module/rest/services/rest-search.service */ 10723);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);
/* harmony import */ var _core_module_rest_services_rest_mds_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core-module/rest/services/rest-mds.service */ 42411);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/autocomplete */ 99892);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../shared/components/spinner-small/spinner-small.component */ 65928);


























const _c0 = ["noPermissions"];
function NodeSearchSelectorComponent_es_spinner_small_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "es-spinner-small", 11);
  }
}
function NodeSearchSelectorComponent_ng_container_9_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-option", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 2, "NODE_SEARCH_SELECTOR.NO_MATCHES"));
  }
}
function NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainer"](0);
  }
}
function NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "NODE_SEARCH_SELECTOR.NO_PERMISSIONS"));
  }
}
const _c1 = function (a0) {
  return {
    node: a0
  };
};
function NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_ng_container_1_Template, 1, 0, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_ng_container_2_Template, 3, 3, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const suggestion_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngTemplateOutlet", ctx_r9.noPermissionsRef)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](3, _c1, suggestion_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r9.noPermissionsRef);
  }
}
function NodeSearchSelectorComponent_ng_container_9_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, NodeSearchSelectorComponent_ng_container_9_mat_option_2_div_1_Template, 3, 5, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "es-node-row", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const suggestion_r8 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", suggestion_r8)("disabled", !ctx_r7.hasPermissions(suggestion_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r7.hasPermissions(suggestion_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("node", suggestion_r8)("columns", ctx_r7.columns);
  }
}
function NodeSearchSelectorComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, NodeSearchSelectorComponent_ng_container_9_mat_option_1_Template, 4, 4, "mat-option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, NodeSearchSelectorComponent_ng_container_9_mat_option_2_Template, 3, 5, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", (ctx_r3.searchStatus.result == null ? null : ctx_r3.searchStatus.result.length) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r3.searchStatus.result);
  }
}
function NodeSearchSelectorComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NodeSearchSelectorComponent_div_10_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r13.showMds = !ctx_r13.showMds);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NodeSearchSelectorComponent_div_10_Template_button_click_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      ctx_r15.showMds = !ctx_r15.showMds;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 2, "NODE_SEARCH_SELECTOR.MORE_FILTERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("esIcon", "keyboard_arrow_" + (ctx_r4.showMds ? "up" : "down"));
  }
}
const _c2 = function () {
  return {};
};
class NodeSearchSelectorComponent {
  constructor(searchApi, mdsService, translate, nodeHelper, changeDetectorRef) {
    this.searchApi = searchApi;
    this.mdsService = mdsService;
    this.translate = translate;
    this.nodeHelper = nodeHelper;
    this.changeDetectorRef = changeDetectorRef;
    /**
     * only show nodes with appropriate permissions
     */
    this.permissions = [];
    /**
     * additional search criterias that should be added
     */
    this.criteria = [];
    /**
     * count of items to search
     */
    this.itemCount = 25;
    this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
    this.searchStatus = {
      loading: false
    };
    this.input = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.UntypedFormControl('');
    this.showMds = false;
    this.hasMds = false;
  }
  setOption(event) {
    this.onSelect.emit(event.option.value);
    this.input.setValue('');
  }
  searchNodes() {
    let criterias = [];
    if (this.input.value) {
      criterias.push({
        property: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PRIMARY_SEARCH_CRITERIA,
        values: [this.input.value]
      });
    }
    if (this.values) {
      criterias = criterias.concat(_core_module_rest_services_rest_search_service__WEBPACK_IMPORTED_MODULE_0__.RestSearchService.convertCritierias(this.values, this.mdsEditor.currentWidgets));
    }
    criterias = criterias.concat(this.criteria);
    const request = {
      count: this.itemCount,
      sortBy: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LUCENE_SCORE],
      sortAscending: [false]
    };
    return this.searchApi.search(criterias, [], request, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_TYPE_ALL, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.DEFAULT, [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL], this.queryId, this.permissions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(m => m.nodes.sort((a, b) => !this.hasPermissions(a) && this.hasPermissions(b) ? 1 : this.hasPermissions(a) && !this.hasPermissions(b) ? -1 : 0)));
  }
  ngAfterViewInit() {
    this.mdsService.getSet().subscribe(set => {
      this.columns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_2__.MdsHelper.getColumns(this.translate, set, this.columnsIds);
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([this.input.valueChanges, this.mdsEditor.mdsEditorInstance.values]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)(() => {
      if (this.input.value?.length < 2) {
        this.searchStatus = {
          loading: false
        };
        this.changeDetectorRef.detectChanges();
        return false;
      }
      return true;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.tap)(() => {
      this.searchStatus.loading = true;
      this.changeDetectorRef.detectChanges();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(() => this.searchNodes())).subscribe(result => {
      this.searchStatus = {
        loading: false,
        result
      };
      this.changeDetectorRef.detectChanges();
    });
    this.mdsEditor.loadMds();
    this.mdsEditor.mdsEditorInstance.values.subscribe(v => this.values = v);
  }
  hasPermissions(suggestion) {
    return this.permissions.every(p => this.nodeHelper.getNodesRight([suggestion], p, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_15__.NodesRightMode.Effective));
  }
  onMdsLoaded() {
    console.log('mds loaded', this.mdsEditor.currentWidgets);
    this.hasMds = this.mdsEditor.currentWidgets?.length > 0;
  }
  static #_ = this.ɵfac = function NodeSearchSelectorComponent_Factory(t) {
    return new (t || NodeSearchSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_rest_services_rest_search_service__WEBPACK_IMPORTED_MODULE_0__.RestSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_rest_services_rest_mds_service__WEBPACK_IMPORTED_MODULE_4__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: NodeSearchSelectorComponent,
    selectors: [["es-node-search-selector"]],
    contentQueries: function NodeSearchSelectorComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵcontentQuery"](dirIndex, _c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.noPermissionsRef = _t.first);
      }
    },
    viewQuery: function NodeSearchSelectorComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.mdsEditor = _t.first);
      }
    },
    inputs: {
      groupId: "groupId",
      queryId: "queryId",
      columnsIds: "columnsIds",
      label: "label",
      permissions: "permissions",
      criteria: "criteria",
      itemCount: "itemCount"
    },
    outputs: {
      onSelect: "onSelect"
    },
    decls: 14,
    vars: 12,
    consts: [["esIcon", "search", "matPrefix", ""], ["type", "search", "matInput", "", "name", "authoritySearch", 3, "matAutocomplete", "formControl"], ["inputElement", ""], ["matSuffix", "", 4, "ngIf"], [1, "mat-autocomplete-high", 3, "optionSelected"], ["autoGroup", "matAutocomplete"], [4, "ngIf"], ["class", "more clickable", 3, "click", 4, "ngIf"], [1, "mds-wrapper"], [3, "embedded", "editorMode", "groupId", "currentValues", "onMdsLoaded"], ["mds", ""], ["matSuffix", ""], [3, "disabled", 4, "ngIf"], ["class", "node-row-option", 3, "value", "disabled", 4, "ngFor", "ngForOf"], [3, "disabled"], [1, "no-match"], [1, "node-row-option", 3, "value", "disabled"], ["class", "missing-permissions", 4, "ngIf"], [3, "node", "columns"], [1, "missing-permissions"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["esIcon", "security", 3, "matTooltip"], [1, "more", "clickable", 3, "click"], ["mat-icon-button", "", "color", "primary", 3, "click"], [3, "esIcon"]],
    template: function NodeSearchSelectorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "i", 0)(4, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, NodeSearchSelectorComponent_es_spinner_small_6_Template, 1, 0, "es-spinner-small", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "mat-autocomplete", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("optionSelected", function NodeSearchSelectorComponent_Template_mat_autocomplete_optionSelected_7_listener($event) {
          return ctx.setOption($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, NodeSearchSelectorComponent_ng_container_9_Template, 3, 2, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, NodeSearchSelectorComponent_div_10_Template, 6, 4, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 8)(12, "es-mds-editor-wrapper", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("onMdsLoaded", function NodeSearchSelectorComponent_Template_es_mds_editor_wrapper_onMdsLoaded_12_listener() {
          return ctx.onMdsLoaded();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matAutocomplete", _r2)("formControl", ctx.input);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.searchStatus.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.searchStatus.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.hasMds);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@switchDialog", ctx.showMds);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("embedded", true)("editorMode", "search")("groupId", ctx.groupId)("currentValues", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](11, _c2));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgTemplateOutlet, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_15__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_15__.NodeRowComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__.MatAutocomplete, _angular_material_core__WEBPACK_IMPORTED_MODULE_20__.MatOption, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__.MatAutocompleteTrigger, _angular_material_button__WEBPACK_IMPORTED_MODULE_21__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_23__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlDirective, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_6__.SpinnerSmallComponent, _mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorWrapperComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
    styles: ["\n\nmat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.node-row-option[_ngcontent-%COMP%] {\n  height: auto;\n  line-height: unset;\n}\n.node-row-option.mat-option-disabled[_ngcontent-%COMP%] {\n  color: var(--textMediumLight);\n  cursor: not-allowed;\n}\n\n.more[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  margin-top: -15px;\n  padding: 2px 15px;\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n}\n.more[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\n.mds-wrapper[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n}\n\n.missing-permissions[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100%;\n  display: grid;\n  grid-template-columns: auto auto;\n  grid-gap: 10px;\n  justify-content: center;\n  align-items: center;\n  -webkit-backdrop-filter: blur(1px);\n          backdrop-filter: blur(1px);\n  z-index: 2;\n  padding: 0 5px 0 16px;\n  background-color: rgba(255, 255, 255, 0.9);\n  color: #383838;\n  font-weight: bold;\n}\n\n[_nghost-%COMP%]     .mds-wrapper es-mds-editor-core {\n  padding: 10px 20px 0 20px;\n}\n[_nghost-%COMP%]     .mds-wrapper .clear-button {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL25vZGUtcmVsYXRpb25zLWRpYWxvZy9ub2RlLXNlYXJjaC1zZWxlY3Rvci9ub2RlLXNlYXJjaC1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxXQUFBO0FBQUo7O0FBRUE7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUFJO0VBQ0ksNkJEUVU7RUNQVixtQkFBQTtBQUVSOztBQUNBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBRUEsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUNDQSx3Q0FBQTtBRENKO0FBREk7RUFDSSxZQUFBO0FBR1I7O0FBQ0E7RUFDSSx5QkRtQ2tCO0FDakN0Qjs7QUFBQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxnQ0FBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLDBDQUFBO0VBQ0EsY0R0Qk87RUN1QlAsaUJBQUE7QUFHSjs7QUFDUTtFQUNJLHlCQUFBO0FBRVo7QUFBUTtFQUNJLGFBQUE7QUFFWiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG5tYXQtZm9ybS1maWVsZCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4ubm9kZS1yb3ctb3B0aW9uIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgbGluZS1oZWlnaHQ6IHVuc2V0O1xuICAgICYubWF0LW9wdGlvbi1kaXNhYmxlZCB7XG4gICAgICAgIGNvbG9yOiAkdGV4dE1lZGl1bUxpZ2h0O1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIH1cbn1cbi5tb3JlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogJGNhcmRMaWdodEJhY2tncm91bmQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgcGFkZGluZzogMnB4IDE1cHg7XG4gICAgPiBzcGFuIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgIH1cbiAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvd0JvdHRvbSgpO1xufVxuLm1kcy13cmFwcGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2FyZExpZ2h0QmFja2dyb3VuZDtcbn1cbi5taXNzaW5nLXBlcm1pc3Npb25zIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG87XG4gICAgZ3JpZC1nYXA6IDEwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMXB4KTtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBhZGRpbmc6IDAgNXB4IDAgMTZweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gICAgY29sb3I6ICR0ZXh0TWFpbjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLm1kcy13cmFwcGVyIHtcbiAgICAgICAgZXMtbWRzLWVkaXRvci1jb3JlIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweCAwIDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmNsZWFyLWJ1dHRvbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiQG1peGluIGNsaWNrYWJsZSgpIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuQG1peGluIGxpbWl0TGluZUNvdW50KCRjb3VudCwgJGxpbmVIZWlnaHQ6IDEpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZUhlaWdodCArIGVtO1xuICAgIG1heC1oZWlnaHQ6ICRjb3VudCAqICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAkY291bnQ7IC8qIG51bWJlciBvZiBsaW5lcyB0byBzaG93ICovXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAvKiBhdXRvcHJlZml4ZXI6IG9mZiAqL1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93KCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dCb3R0b20oJG9wYWNpdHk6IDAuMSkge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDNweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd1NtYWxsKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgkaW1wb3J0YW50OiBmYWxzZSwgJG9wYWNpdHk6IDAuNikge1xuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2Nyb2xsYmFyKCkge1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIC8vIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgfVxufVxuQG1peGluIHJlbW92ZURlZmF1bHRGb2N1cygpIHtcbiAgICBvdXRsaW5lOiBub25lO1xufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJykge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgIH1cbn1cbi8vIEFwcGx5IHRoZSBjb250ZW50IHN0eWxlcyBpbiBjb250cmFzdCBtb2RlLiBUaGlzIGlzIGp1c3QgZW5vdWdoIGNvbnRyYXN0IHRvIGJlIFdDQUcgY29tcGxpZW50IC0tLVxuLy8gbm90IGEgaGlnaC1jb250cmFzdCBtb2RlLlxuLy9cbi8vIENhbGwgd2l0aG91dCBhcmd1bWVudHMgZm9yIHVzZSBpbiBlbmNhcHN1bGF0ZWQgY29tcG9uZW50IHN0eWxlcywgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUge1xuLy8gICAgICAgICAvLyBTdHlsZXMgdG8gYXBwbHkgaW4gY29udHJhc3QgbW9kZVxuLy8gICAgIH1cbi8vIFRvIHVzIGluIGdsb2JhbCBjb250ZXh0LCBwYXNzICdnbG9iYWwnIGFzIGZpcnN0IGFyZ3VtZW50LCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZShnbG9iYWwpIHsgLyogLi4uICovIH1cbkBtaXhpbiBjb250cmFzdE1vZGUoJHNjb3BlOiBlbmNhcHN1bGF0ZWQpIHtcbiAgICAkY29udHJhc3RNb2RlU2VsZWN0b3I6ICdib2R5LmVzLWNvbnRyYXN0LW1vZGUnO1xuICAgIEBpZiAkc2NvcGUgPT0gZW5jYXBzdWxhdGVkIHtcbiAgICAgICAgOmhvc3QtY29udGV4dCgjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0pICYge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRzY29wZSA9PSBnbG9iYWwge1xuICAgICAgICAje2lmKCYsICcjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0gJicsICRjb250cmFzdE1vZGVTZWxlY3Rvcil9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEBlcnJvciBcIkludmFsaWQgc2NvcGUgI3skc2NvcGV9LlwiO1xuICAgIH1cbn1cbkBtaXhpbiBibHVySW1hZ2UoJGJsdXJTdHJlbmd0aDogMjVweCkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgdG9wOiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICB6LWluZGV4OiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmlsdGVyOiBibHVyKCRibHVyU3RyZW5ndGgpO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9wYWNpdHk6IDAuNztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_24__.trigger)('switchDialog', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_15__.UIAnimation.switchDialogBoolean())]
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_node-relations-dialog_node-relations-dialog_module_ts.js.map