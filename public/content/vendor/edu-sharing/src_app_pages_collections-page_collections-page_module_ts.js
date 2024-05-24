"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_collections-page_collections-page_module_ts"],{

/***/ 69466:
/*!*******************************************************************************************!*\
  !*** ./src/app/pages/collections-page/collection-content/collection-content.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionContentComponent: () => (/* binding */ CollectionContentComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_management_dialogs_management_dialogs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../features/management-dialogs/management-dialogs.component */ 69284);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/bridge.service */ 34997);
/* harmony import */ var _core_module_rest_services_rest_collection_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-collection.service */ 43785);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _infobar_infobar_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../infobar/infobar.service */ 78689);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-node.service */ 57857);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _core_module_rest_services_ui_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../core-module/rest/services/ui.service */ 80723);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _collection_proposals_collection_proposals_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../collection-proposals/collection-proposals.component */ 88187);































const _c0 = ["empty"];
const _c1 = ["actionbarReferences"];
const _c2 = ["listReferences"];
function CollectionContentComponent_ng_template_4_h2_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.TAB." + ctx_r7.scope + "_LONG"));
  }
}
function CollectionContentComponent_ng_template_4_h2_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "COLLECTION.INFO_REFERENCES_MULTI"));
  }
}
function CollectionContentComponent_ng_template_4_h2_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "h2", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, CollectionContentComponent_ng_template_4_h2_1_ng_container_1_Template, 3, 3, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, CollectionContentComponent_ng_template_4_h2_1_ng_container_2_Template, 3, 3, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r6.isRootLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r6.isRootLevel);
  }
}
function CollectionContentComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, CollectionContentComponent_ng_template_4_h2_1_Template, 3, 2, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r1.isAllowedToEditCollection() || !ctx_r1.dataSourceCollections.isEmpty());
  }
}
function CollectionContentComponent_ng_template_6_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainer"](0);
  }
}
function CollectionContentComponent_ng_template_6_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, CollectionContentComponent_ng_template_6_div_0_ng_container_1_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngTemplateOutlet", ctx_r9.emptyRef);
  }
}
function CollectionContentComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, CollectionContentComponent_ng_template_6_div_0_Template, 2, 1, "div", 10);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r3.createAllowed());
  }
}
function CollectionContentComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div")(1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "div", 14)(5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 2, "COLLECTIONS.NO_SUBCOLLECTIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](7, 4, "COLLECTIONS.NO_SUBCOLLECTIONS_HINT"), " ");
  }
}
function CollectionContentComponent_ng_container_9_section_2_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 25)(1, "h2", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 1, "collections_content"), " ");
  }
}
function CollectionContentComponent_ng_container_9_section_2_ng_template_8_div_0_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function CollectionContentComponent_ng_container_9_section_2_ng_template_8_div_0_button_9_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2).element;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
      ctx_r22.deleteReference(element_r19);
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"]($event.preventDefault());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "ORIGINAL_DELETE"), " ");
  }
}
function CollectionContentComponent_ng_container_9_section_2_ng_template_8_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 27)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](9, CollectionContentComponent_ng_container_9_section_2_ng_template_8_div_0_button_9_Template, 3, 3, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]().element;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](5, 3, "ORIGINAL_DELETED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](8, 5, "ORIGINAL_DELETED_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r20.canDelete(element_r19));
  }
}
function CollectionContentComponent_ng_container_9_section_2_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, CollectionContentComponent_ng_container_9_section_2_ng_template_8_div_0_Template, 10, 7, "div", 26);
  }
  if (rf & 2) {
    const element_r19 = ctx.element;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r17.isDeleted(element_r19));
  }
}
function CollectionContentComponent_ng_container_9_section_2_div_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "collections_howToAddContent"), " ");
  }
}
function CollectionContentComponent_ng_container_9_section_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 14)(1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, CollectionContentComponent_ng_container_9_section_2_div_10_div_4_Template, 3, 3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](3, 2, "collections_noContentAvailable"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r18.isUserAllowedToEdit(ctx_r18.collection));
  }
}
const _c3 = function (a0, a1, a2) {
  return {
    dragAllowed: a0,
    dropAllowed: a1,
    dropped: a2
  };
};
const _c4 = function (a0, a1, a2, a3, a4) {
  return {
    active: a0,
    direction: a1,
    customSortingInProgress: a2,
    columns: a3,
    allowed: a4
  };
};
const _c5 = function (a0, a1) {
  return [a0, a1];
};
const _c6 = function () {
  return [];
};
function CollectionContentComponent_ng_container_9_section_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "section", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "es-actionbar", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 20)(4, "es-node-entries-wrapper", 21, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("displayTypeChange", function CollectionContentComponent_ng_container_9_section_2_Template_es_node_entries_wrapper_displayTypeChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r27.referencesDisplayType = $event);
    })("clickItem", function CollectionContentComponent_ng_container_9_section_2_Template_es_node_entries_wrapper_clickItem_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r29.onContentClick($event));
    })("sortChange", function CollectionContentComponent_ng_container_9_section_2_Template_es_node_entries_wrapper_sortChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r28);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r30.setReferenceSort($event));
    })("fetchData", function CollectionContentComponent_ng_container_9_section_2_Template_es_node_entries_wrapper_fetchData_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r28);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r31.loadMoreReferences($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, CollectionContentComponent_ng_container_9_section_2_ng_template_6_Template, 4, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](8, CollectionContentComponent_ng_container_9_section_2_ng_template_8_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](10, CollectionContentComponent_ng_container_9_section_2_div_10_Template, 5, 4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    let tmp_11_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("numberOfAlwaysVisibleOptions", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("wrapper-table", ctx_r11.referencesDisplayType === ctx_r11.NodeEntriesDisplayType.Table)("wrapper-empty", ctx_r11.dataSourceReferences.isEmpty())("wrapper-edit", ctx_r11.isUserAllowedToEdit(ctx_r11.collection));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("elementInteractionType", ctx_r11.InteractionType.Emitter)("dataSource", ctx_r11.dataSourceReferences)("scope", ctx_r11.Scope.CollectionsReferences)("primaryInstance", true)("columns", ctx_r11.referencesColumns)("displayType", ctx_r11.referencesDisplayType)("dragDrop", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction3"](17, _c3, ctx_r11.isAllowedToEditCollection(), ctx_r11.canDropOnRef, ctx_r11.dropOnRef))("sort", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction5"](21, _c4, ctx_r11.sortReferences.active, ctx_r11.sortReferences.direction, ctx_r11.sortReferences.customSortingInProgress, ctx_r11.sortReferences.columns, !ctx_r11.isMobile() && ((tmp_11_0 = ctx_r11.dataSourceReferences.getData()) == null ? null : tmp_11_0.length) > 1 && ctx_r11.isUserAllowedToEdit(ctx_r11.collection) && !(ctx_r11.sortCollections == null ? null : ctx_r11.sortCollections.customSortingInProgress)))("globalOptions", ctx_r11.isUserAllowedToEdit(ctx_r11.collection) ? _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction2"](27, _c5, ctx_r11.addMaterialSearchOptionItem, ctx_r11.addMaterialBinaryOptionItem) : _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](30, _c6));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r11.dataSourceReferences.isLoading && ctx_r11.dataSourceReferences.isEmpty());
  }
}
function CollectionContentComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "es-collection-proposals", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("onContentClick", function CollectionContentComponent_ng_container_9_Template_es_collection_proposals_onContentClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r33);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r32.onContentClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, CollectionContentComponent_ng_container_9_section_2_Template, 11, 31, "section", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("collection", ctx_r5.collection)("canEdit", ctx_r5.isAllowedToEditCollection());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r5.isRootLevel);
  }
}
const _c7 = function (a0) {
  return [a0];
};
class CollectionContentComponent {
  static #_ = this.DEFAULT_REQUEST = {
    sortBy: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_PINNED_STATUS, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_PINNED_ORDER, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE],
    sortAscending: [false, true, false]
  };
  constructor(authenticationService, bridge, collectionService, configurationService, dialogs, infobar, loadingScreen, mainNavService, mdsService, nodeHelper, nodeService, optionsService, route, router, toast, translation, uiService) {
    this.authenticationService = authenticationService;
    this.bridge = bridge;
    this.collectionService = collectionService;
    this.configurationService = configurationService;
    this.dialogs = dialogs;
    this.infobar = infobar;
    this.loadingScreen = loadingScreen;
    this.mainNavService = mainNavService;
    this.mdsService = mdsService;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.optionsService = optionsService;
    this.route = route;
    this.router = router;
    this.toast = toast;
    this.translation = translation;
    this.uiService = uiService;
    this.referencesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodeEntriesDisplayType.Grid;
    this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_22__.Subject();
    this.ROUTER_PREFIX = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.InteractionType;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.Scope;
    /**
     * you can subscribe to the clickItem event in case if you want to use emitter
     */
    this.interactionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.InteractionType.DefaultActionLink;
    this.clickItem = new _angular_core__WEBPACK_IMPORTED_MODULE_20__.EventEmitter();
    this.mainNavUpdateTrigger = new rxjs__WEBPACK_IMPORTED_MODULE_22__.Subject();
    this.sortCollectionColumns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_PROP_TITLE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION, 'ascending')];
    this.createSubCollectionOptionItem = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.OptionItem('OPTIONS.NEW_COLLECTION', 'layers', () => this.onCreateCollection());
    this.sortReferences = {
      active: null,
      direction: 'asc',
      columns: [
      // new ListItemSort('NODE', RestConstants.LOM_PROP_TITLE),
      new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_PROP_C_CREATED), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION, 'ascending')]
    };
    this.sortCollections = {
      active: null,
      direction: 'asc',
      columns: [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_PROP_TITLE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_PROP_C_CREATED), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION, 'ascending')]
    };
    this.addMaterialSearchOptionItem = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.OptionItem('OPTIONS.SEARCH_OBJECT', 'redo', () => {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__.UIHelper.getCommonParameters(this.route).subscribe(params => {
        params.addToCollection = this.collection.ref.id;
        this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'search'], {
          queryParams: params
        });
      });
    });
    this.addMaterialBinaryOptionItem = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.OptionItem('OPTIONS.ADD_OBJECT', 'cloud_upload', () => {
      this.mainNavService.getMainNav().topBar.createMenu.openUploadSelect();
    });
    this.dataSourceCollections = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodeDataSource();
    this.dataSourceReferences = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodeDataSource();
    this.collectionsColumns = [];
    this.referencesColumns = [];
    this.loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed$
    });
    this.canDropOnCollectionBreadcrumbs = dropData => {
      const nodes = dropData.draggedNodes;
      const target = dropData.target;
      if (target === 'HOME') {
        const accept = dropData.action === 'move' && nodes[0].aspects.indexOf(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_ASPECT_COLLECTION) !== -1 && this.nodeHelper.getNodesRight(nodes, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_WRITE);
        return {
          accept,
          denyExplicit: !accept
        };
      }
      if (nodes[0].ref.id === target.ref.id || target.ref.id === this.collection.ref.id || nodes[0].collection && dropData.action === 'copy') {
        return {
          accept: false
        };
      }
      // do not allow to move anything else than editorial collections into editorial collections (if the source is a collection)
      if (nodes[0].collection?.hasOwnProperty('childCollectionsCount')) {
        if (nodes[0].collection.type === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONTYPE_EDITORIAL && target.collection.type !== _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONTYPE_EDITORIAL || nodes[0].collection.type !== _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONTYPE_EDITORIAL && target.collection.type === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONTYPE_EDITORIAL) {
          return {
            accept: false
          };
        }
      }
      if (dropData.action === 'copy' && !this.nodeHelper.getNodesRight(nodes, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_CC_PUBLISH, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodesRightMode.Effective) || dropData.action === 'move' && !this.nodeHelper.getNodesRight(nodes, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_WRITE, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodesRightMode.Local)) {
        return {
          accept: false
        };
      }
      return {
        accept: this.nodeHelper.getNodesRight([target], _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_WRITE, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodesRightMode.Local)
      };
    };
    this.canDropOnCollection = dropData => {
      return this.canDropOnCollectionBreadcrumbs(dropData);
    };
    this.canDropOnRef = dragData => {
      // do not allow to drop here
      return {
        accept: false
      };
    };
    this.dropOnRef = (target, source) => {
      return;
    };
    this.dropOnCollection = (target, source) => {
      if (source.element[0] === target) {
        return;
      }
      this.toast.showProgressSpinner();
      if (source.element[0].mediatype === 'collection') {
        if (source.mode === 'copy') {
          this.toast.error(null, 'INVALID_OPERATION');
          this.toast.closeProgressSpinner();
          return;
        }
        this.nodeService.moveNode(target?.ref?.id || _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONHOME, source.element[0].ref.id).subscribe(() => {
          this.toast.closeProgressSpinner();
          this.refreshContent();
        }, error => {
          this.handleError(error);
          this.toast.closeProgressSpinner();
        });
      } else {
        if (source.mode === 'copy') {
          _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__.UIHelper.addToCollection(this.nodeHelper, this.collectionService, this.router, this.bridge, target, source.element, false, nodes => {
            this.toast.closeProgressSpinner();
            this.refreshContent();
          });
        } else if (source.mode === 'move') {
          (0,rxjs__WEBPACK_IMPORTED_MODULE_23__.forkJoin)(source.element.map(toMove => this.nodeService.moveNode(target?.ref?.id || _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTIONHOME, toMove.ref.id))).subscribe(() => {
            this.toast.closeProgressSpinner();
            this.refreshContent();
          }, error => {
            this.handleError(error);
            this.toast.closeProgressSpinner();
          });
        } else {
          this.toast.error(null, 'INVALID_OPERATION');
        }
      }
    };
    this.sortCollectionColumns[this.sortCollectionColumns.length - 1].mode = 'ascending';
    // this.collectionSortEmitter.subscribe((sort: SortEvent) => this.setCollectionSort(sort));
    // this.collectionCustomSortEmitter.subscribe((state: boolean) => state ? this.toggleCollectionsOrder() : this.changeCollectionsOrder());
    // this.referenceSortEmitter.subscribe((sort: SortEvent) => this.setReferenceSort(sort));
    // this.referenceCustomSortEmitter.subscribe((state: boolean) => state ? this.toggleReferencesOrder() : this.changeReferencesOrder());
    this.collectionsColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItem('COLLECTION', 'title'));
    this.collectionsColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItem('COLLECTION', 'info'));
    this.collectionsColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ListItem('COLLECTION', 'scope'));
    this.mainNavService.getDialogs().onEvent.subscribe(event => {
      if (event.event === _features_management_dialogs_management_dialogs_component__WEBPACK_IMPORTED_MODULE_7__.ManagementEventType.AddCollectionNodes) {
        if (event.data.collection.ref.id === this.collection.ref.id) {
          this.listReferences.addVirtualNodes(event.data.references);
        }
      }
    });
    this.authenticationService.observeLoginInfo().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.takeUntil)(this.destroyed$)).subscribe(login => {
      this.login = login;
      this.addMaterialBinaryOptionItem.isEnabled = login.toolPermissions.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_FILES);
      this.createSubCollectionOptionItem.isEnabled = login.toolPermissions.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_COLLECTIONS);
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const mdsSets = yield _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationHelper.getAvailableMds(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.HOME_REPOSITORY, _this.mdsService, _this.configurationService);
      const set = yield _this.mdsService.getMetadataSet({
        metadataSet: mdsSets[0].id
      }).toPromise();
      _this.referencesColumns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_3__.MdsHelper.getColumns(_this.translation, set, 'collectionReferences');
      _this.optionsService.clearComponents(_this.actionbarReferences);
      _this.registerMainNav();
      _this.mainNavUpdateTrigger.next();
    })();
  }
  ngOnChanges(changes) {
    if (changes.collection.currentValue) {
      this.dataSourceCollections.reset();
      this.dataSourceReferences.reset();
      this.createSubCollectionOptionItem.name = 'OPTIONS.' + (this.isRootLevel ? 'NEW_COLLECTION' : 'NEW_SUB_COLLECTION');
      if (this.isRootLevel) {
        // display root collections with tabs
        // Use hardcoded sorting for root collection.
        this.sortCollections.active = _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE;
        this.sortCollections.direction = 'desc';
        // To respect sort configuration of the mds, we would need to wait for it here.
        //
        // const sort = metadataSet.sorts.find(sort => sort.id === 'collections');
        // this.sortCollections.active = sort?.default?.sortBy ?? RestConstants.CM_MODIFIED_DATE;
        // this.sortCollections.direction = sort?.default?.sortAscending ? 'asc' : 'desc';
        this.refreshContent();
      } else {
        // load metadata of collection
        this.dataSourceCollections.isLoading = true;
        this.dataSourceReferences.isLoading = true;
        // set the collection and load content data by refresh
        const orderCollections = this.collection.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_SUBCOLLECTION_ORDER_MODE];
        this.sortCollections.active = orderCollections?.[0] || _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE;
        this.sortCollections.direction = orderCollections?.[0] === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION ? 'asc' : orderCollections?.[1] === 'true' ? 'asc' : 'desc';
        const refMode = this.collection.collection.orderMode;
        const refAscending = this.collection.collection.orderAscending;
        // cast old order mode to new parameter
        this.sortReferences.active = (refMode === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTION_ORDER_MODE_CUSTOM ? _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION : refMode) || _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CM_MODIFIED_DATE;
        this.sortReferences.direction = this.sortReferences.active === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COLLECTION_ORDER_MODE_CUSTOM ? 'asc' : refAscending ? 'asc' : 'desc';
        this.mainNavUpdateTrigger.next();
        this.dataSourceCollections.isLoading = false;
        this.setOptionsCollection();
        this.refreshContent();
        if (this.collection.access.indexOf(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_CHANGE_PERMISSIONS) !== -1) {
          this.nodeService.getNodePermissions(this.collection.ref.id).subscribe(permissions => {
            this.permissions = permissions.permissions.localPermissions.permissions.concat(permissions.permissions.inheritedPermissions);
          });
        }
      }
    }
  }
  isUserAllowedToEdit(collection) {
    return _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.isUserAllowedToEdit(collection);
  }
  isAllowedToEditCollection() {
    if (this.isRootLevel) {
      return !this.login?.isGuest; //this.tabSelected === RestConstants.COLLECTIONSCOPE_MY
    }

    return _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.hasAccessPermission(this.collection, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.PERMISSION_WRITE);
  }
  onCreateCollection() {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'collections/collection', 'new', this.collection.ref.id], {
        queryParams: params
      });
    });
  }
  handleError(error) {
    if (error.status === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.DUPLICATE_NODE_RESPONSE) {
      this.toast.error(null, 'COLLECTIONS.ERROR_NODE_EXISTS');
    } else {
      this.toast.error(error);
    }
  }
  onContentClick(event) {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.contentNode = event.element;
      if (event.element.type === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_TYPE_COLLECTION_PROPOSAL) {
        _this2.clickElementEvent(event);
      } else if (event.element.originalId == null) {
        const dialogRef = yield _this2.dialogs.openGenericDialog({
          title: 'COLLECTIONS.ORIGINAL_MISSING',
          message: 'COLLECTIONS.ORIGINAL_MISSING_INFO',
          buttons: [...(_this2.isAllowedToDeleteNodes([event.element]) ? [{
            label: 'OPTIONS.REMOVE_REF',
            config: {
              color: 'standard'
            }
          }] : []), {
            label: 'COLLECTIONS.OPEN_MISSING',
            config: {
              color: 'primary'
            }
          }]
        });
        dialogRef.afterClosed().subscribe(response => {
          if (response === 'OPTIONS.REMOVE_REF') {
            _this2.deleteFromCollection();
          } else if (response === 'COLLECTIONS.OPEN_MISSING') {
            _this2.clickElementEvent(event);
          }
        });
      } else {
        _this2.clickElementEvent(event);
      }
    })();
  }
  clickElementEvent(event) {
    if (this.interactionType === ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.InteractionType.DefaultActionLink) {
      this.nodeService.getNodeMetadata(event.element.ref.id).subscribe(data => {
        this.contentNode = data.node;
        this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'render', event.element.ref.id]);
      });
    } else {
      this.clickItem.emit(event);
    }
  }
  isAllowedToDeleteNodes(nodes) {
    return this.isAllowedToDeleteCollection() || this.nodeHelper.getNodesRight(nodes, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_DELETE);
  }
  isAllowedToDeleteCollection() {
    if (this.isRootLevel) {
      return false;
    }
    return _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.hasAccessPermission(this.collection, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.PERMISSION_DELETE);
  }
  deleteFromCollection(callback = null) {
    this.toast.showProgressSpinner();
    this.collectionService.removeFromCollection(this.contentNode.ref.id, this.collection.ref.id).subscribe(() => {
      if (!('proposal' in this.collection)) {
        this.toast.toast('COLLECTIONS.REMOVED_FROM_COLLECTION');
      }
      this.toast.closeProgressSpinner();
      this.refreshContent();
      if (callback) {
        callback();
      }
    }, error => {
      this.toast.closeProgressSpinner();
      this.toast.error(error);
    });
  }
  registerMainNav() {
    var _this3 = this;
    this.mainNavService.setMainNavConfig({
      title: 'COLLECTIONS.TITLE',
      currentScope: 'collections',
      onCreate: nodes => this.addNodesToCollection(nodes)
    });
    this.mainNavService.onConnectorCreated.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.takeUntil)(this.destroyed$)).subscribe(node => this.addNodesToCollection([node]));
    this.mainNavUpdateTrigger.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.takeUntil)(this.destroyed$)).subscribe( /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.mainNavService.patchMainNavConfig({
        create: {
          allowed: _this3.createAllowed(),
          allowBinary: !_this3.isRootLevel && (yield _this3.isAllowedToEditCollection()),
          parent: _this3.collection ?? null
        }
      });
    }));
  }
  refreshContent() {
    this.dataSourceCollections.reset();
    this.dataSourceReferences.reset();
    this.listReferences?.getSelection().clear();
    this.dataSourceCollections.isLoading = true;
    this.dataSourceReferences.isLoading = true;
    // set correct scope
    const request = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(CollectionContentComponent.DEFAULT_REQUEST);
    if (this.sortCollections?.active) {
      request.sortBy = [this.sortCollections.active];
      request.sortAscending = [this.sortCollections.direction === 'asc'];
    } else {
      console.warn('Sort for collections is not defined in the mds!');
    }
    // when loading child collections, we load all of them
    if (!this.isRootLevel) {
      request.count = _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COUNT_UNLIMITED;
    } else {
      // on root level, obey pinned order if collections are pinned
      request.sortBy = [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_PINNED_STATUS, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_PINNED_ORDER, ...request.sortBy];
      request.sortAscending = [false, true, ...request.sortAscending];
    }
    this.collectionService.getCollectionSubcollections(this.collection.ref.id, this.scope, [], request, this.collection.ref.repo).subscribe(collection => {
      // transfere sub collections and content
      this.dataSourceCollections.setData(collection.collections, collection.pagination);
      this.dataSourceCollections.isLoading = false;
      if (this.isRootLevel) {
        this.finishCollectionLoading();
        return;
      }
      const requestRefs = this.getReferencesRequest();
      requestRefs.count = null;
      this.collectionService.getCollectionReferences(this.collection.ref.id, [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ALL], requestRefs, this.collection.ref.repo).subscribe(refs => {
        this.dataSourceReferences.setData(refs.references, refs.pagination);
        this.dataSourceReferences.isLoading = false;
        this.finishCollectionLoading();
      });
    }, error => {
      this.toast.error(error);
    });
  }
  isMobile() {
    return this.uiService.isMobile();
  }
  setReferenceSort(sort) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const diff = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getKeysWithDifferentValues(_this4.sortReferences, sort);
      _this4.sortReferences = sort;
      // auto activate the custom sorting when the users switch to "custom order"
      if (diff.includes('active')) {
        _this4.sortReferences.customSortingInProgress = _this4.sortReferences.active === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION;
      }
      _this4.toggleReferencesOrder();
      if (_this4.sortReferences.customSortingInProgress) {
        yield _this4.loadMoreReferences({
          reset: true,
          amount: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.COUNT_UNLIMITED,
          offset: 0
        });
      }
      if (diff.includes('customSortingInProgress') && sort.customSortingInProgress) {
        return;
      }
      try {
        yield _this4.nodeService.editNodeProperty(_this4.collection.ref.id, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDER_MODE, [sort.active, (sort.direction === 'asc') + '']).toPromise();
        if (sort.active !== _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION) {
          _this4.toast.toast('COLLECTIONS.TOAST.SORT_SAVED_TYPE', {
            type: _this4.translation.instant('NODE.' + sort.active)
          });
        }
      } catch (e) {
        _this4.toast.error(e);
      }
      _this4.refreshContent();
    })();
  }
  getReferencesRequest() {
    return {
      sortBy: [this.sortReferences.active],
      sortAscending: [this.sortReferences.direction === 'asc']
    };
  }
  loadMoreReferences(event) {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!(yield _this5.dataSourceReferences.hasMore()) || _this5.dataSourceReferences.isLoading) {
        return;
      }
      const request = _this5.getReferencesRequest();
      request.offset = event.offset ?? (yield _this5.dataSourceReferences.getData()).length;
      if (event.amount != null) {
        request.count = event.amount;
      }
      if (event.reset) {
        _this5.dataSourceReferences.reset();
      }
      _this5.dataSourceReferences.isLoading = true;
      _this5.collectionService.getCollectionReferences(_this5.collection.ref.id, [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ALL], request, _this5.collection.ref.repo).subscribe(refs => {
        _this5.dataSourceReferences.appendData(refs.references);
        _this5.dataSourceReferences.isLoading = false;
      });
    })();
  }
  loadMoreCollections() {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!(yield _this6.dataSourceCollections.hasMore()) || _this6.dataSourceCollections.isLoading) {
        return;
      }
      const request = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(CollectionContentComponent.DEFAULT_REQUEST);
      request.offset = (yield _this6.dataSourceCollections.getData()).length;
      _this6.dataSourceCollections.isLoading = true;
      _this6.collectionService.getCollectionSubcollections(_this6.collection.ref.id, _this6.scope, [], request, _this6.collection.ref.repo).subscribe(refs => {
        _this6.dataSourceCollections.appendData(refs.collections);
        _this6.dataSourceCollections.isLoading = false;
      });
    })();
  }
  finishCollectionLoading(callback) {
    this.mainNavService.getMainNav()?.refreshBanner();
    // Cannot trivially reference the add button for the tutorial with
    // current implementation of generic options.
    //
    // TODO: Decide whether to keep the tutorial as it was and implement a
    // way to reference the option button if necessary.
    // if (
    //     this.getCollectionId() == RestConstants.ROOT &&
    //     this.isAllowedToEditCollection()
    // ) {
    //     setTimeout(() => {
    //         this.tutorialElement = this.listCollections.addElementRef;
    //     });
    // }
    if (callback) {
      callback();
    }
    setTimeout(() => {
      this.setOptionsCollection();
      this.listReferences?.initOptionsGenerator({
        actionbar: this.actionbarReferences,
        parent: this.collection
      });
      if (!this.loadingTask.isDone) {
        this.loadingTask.done();
      }
    });
  }
  deleteReference(content) {
    this.contentNode = content;
    this.deleteFromCollection();
  }
  setCollectionSort(sort) {
    var _this7 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.sortCollections = sort;
      try {
        yield _this7.nodeService.editNodeProperty(_this7.collection.ref.id, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_SUBCOLLECTION_ORDER_MODE, [_this7.sortCollections.active, (_this7.sortCollections.direction === 'asc') + '']).toPromise();
      } catch (e) {
        _this7.toast.error(e);
      }
      _this7.refreshContent();
      if (sort.active !== _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION) {
        _this7.toast.toast('COLLECTIONS.TOAST.SORT_SAVED_TYPE', {
          type: _this7.translation.instant('NODE.' + sort.active)
        });
      }
      if (_this7.sortCollections.active === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_COLLECTION_ORDERED_POSITION) {
        void _this7.toggleCollectionsOrder();
      } else {
        _this7.infobar.close();
      }
    })();
  }
  setOptionsCollection() {
    this.optionsService.setData({
      scope: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.Scope.CollectionsCollection,
      activeObjects: [this.collection]
    });
    this.optionsService.initComponents(this.getInfobar()?.actionbar, this.listReferences);
    this.optionsService.refreshComponents();
  }
  toggleCollectionsOrder() {
    var _this8 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this8.sortCollections.customSortingInProgress) {
        const response = yield _this8.infobar.open({
          title: 'COLLECTIONS.ORDER_COLLECTIONS',
          message: 'COLLECTIONS.ORDER_COLLECTIONS_INFO',
          buttons: [{
            label: 'SAVE',
            config: {
              color: 'primary'
            }
          }]
        });
        console.log('response', response);
        if (response === 'SAVE') {
          return _this8.changeCollectionsOrder();
        } else {
          _this8.sortCollections.customSortingInProgress = false;
        }
      } else {
        _this8.infobar.close();
      }
      _this8.refreshContent();
    })();
  }
  toggleReferencesOrder() {
    var _this9 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this9.sortReferences.customSortingInProgress) {
        const response = yield _this9.infobar.open({
          title: 'COLLECTIONS.ORDER_ELEMENTS',
          message: 'COLLECTIONS.ORDER_ELEMENTS_INFO',
          buttons: [{
            label: 'SAVE',
            config: {
              color: 'primary'
            }
          }]
        });
        _this9.sortReferences.customSortingInProgress = false;
        if (response === 'SAVE') {
          void _this9.changeReferencesOrder();
          _this9.listReferences.getSelection().clear();
        } else {
          _this9.refreshContent();
        }
      } else {
        _this9.infobar.close();
      }
    })();
  }
  addNodesToCollection(nodes, allowDuplicate = false) {
    this.toast.showProgressSpinner();
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__.UIHelper.addToCollection(this.nodeHelper, this.collectionService, this.router, this.bridge, this.collection, nodes, false, () => {
      this.refreshContent();
      this.toast.closeProgressSpinner();
    }, allowDuplicate);
  }
  changeReferencesOrder() {
    var _this10 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this10.toast.showProgressSpinner();
      _this10.collectionService.setOrder(_this10.collection.ref.id, _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.getNodeIds(yield _this10.dataSourceReferences.getData())).subscribe(() => {
        _this10.toast.toast('COLLECTIONS.TOAST.SORT_SAVED_CUSTOM');
        _this10.toast.closeProgressSpinner();
      }, error => {
        _this10.toast.closeProgressSpinner();
        _this10.toast.error(error);
      });
    })();
  }
  changeCollectionsOrder() {
    var _this11 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this11.toast.showProgressSpinner();
      _this11.collectionService.setOrder(_this11.collection.ref.id, _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.getNodeIds(yield _this11.dataSourceCollections.getData())).subscribe(() => {
        _this11.sortCollections.customSortingInProgress = false;
        _this11.toast.toast('COLLECTIONS.TOAST.SORT_SAVED_CUSTOM');
        _this11.toast.closeProgressSpinner();
      }, error => {
        _this11.toast.closeProgressSpinner();
        _this11.toast.error(error);
      });
    })();
  }
  canDelete(node) {
    return _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.hasAccessPermission(node, 'Delete');
  }
  isDeleted(node) {
    return node.aspects.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_ASPECT_IO_REFERENCE) && !node.aspects.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_ASPECT_REMOTEREPOSITORY) && !node.originalId;
  }
  static #_2 = this.ɵfac = function CollectionContentComponent_Factory(t) {
    return new (t || CollectionContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_25__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_8__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_rest_services_rest_collection_service__WEBPACK_IMPORTED_MODULE_9__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_25__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_10__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_infobar_infobar_service__WEBPACK_IMPORTED_MODULE_11__.InfobarService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_12__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_13__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_25__.MdsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_14__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_15__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_26__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_26__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_16__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_rest_services_ui_service__WEBPACK_IMPORTED_MODULE_17__.UIService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
    type: CollectionContentComponent,
    selectors: [["es-collection-content"]],
    contentQueries: function CollectionContentComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵcontentQuery"](dirIndex, _c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.emptyRef = _t.first);
      }
    },
    viewQuery: function CollectionContentComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.actionbarReferences = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.listReferences = _t.first);
      }
    },
    inputs: {
      collection: "collection",
      interactionType: "interactionType",
      scope: "scope",
      getInfobar: "getInfobar",
      isRootLevel: "isRootLevel",
      createAllowed: "createAllowed"
    },
    outputs: {
      clickItem: "clickItem"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵNgOnChangesFeature"]],
    decls: 10,
    vars: 26,
    consts: [["role", "main", "esSkipTarget", "MAIN_CONTENT", 1, "collections-master-div"], [1, "collections-cards-div"], [1, "collections-wrapper"], [3, "dataSource", "elementInteractionType", "columns", "displayType", "globalOptions", "dragDrop", "sort", "clickItem", "fetchData", "sortChange"], ["title", ""], ["empty", ""], [4, "ngIf"], [1, "heading-group"], ["class", "mat-heading-3", 4, "ngIf"], [1, "mat-heading-3"], ["class", "collection-nocontent-container collection-nocontent-big", 4, "ngIf"], [1, "collection-nocontent-container", "collection-nocontent-big"], [4, "ngTemplateOutlet"], [1, "collection-nocontent-big"], [1, "section-headline", "collection-nocontent-container"], [1, "collection-nocontent-small"], [3, "collection", "canEdit", "onContentClick"], ["class", "collections-cards-div", 4, "ngIf"], [1, "actionbarMaterials", 3, "numberOfAlwaysVisibleOptions"], ["actionbarReferences", ""], [1, "references-wrapper"], [3, "elementInteractionType", "dataSource", "scope", "primaryInstance", "columns", "displayType", "dragDrop", "sort", "globalOptions", "displayTypeChange", "clickItem", "sortChange", "fetchData"], ["listReferences", ""], ["overlay", ""], ["class", "section-headline collection-nocontent-container", 4, "ngIf"], [1, "content-header", "heading-group"], ["class", "node-deleted", 4, "ngIf"], [1, "node-deleted"], ["esIcon", "delete"], [1, "headline"], [1, "subline"], ["mat-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "click"], ["class", "collection-nocontent-small", 4, "ngIf"]],
    template: function CollectionContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "es-node-entries-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("clickItem", function CollectionContentComponent_Template_es_node_entries_wrapper_clickItem_3_listener($event) {
          return ctx.clickItem.emit($event);
        })("fetchData", function CollectionContentComponent_Template_es_node_entries_wrapper_fetchData_3_listener() {
          return ctx.loadMoreCollections();
        })("sortChange", function CollectionContentComponent_Template_es_node_entries_wrapper_sortChange_3_listener($event) {
          return ctx.setCollectionSort($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, CollectionContentComponent_ng_template_4_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, CollectionContentComponent_ng_template_6_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](8, CollectionContentComponent_div_8_Template, 8, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](9, CollectionContentComponent_ng_container_9_Template, 3, 3, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        let tmp_8_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("wrapper-empty", ctx.dataSourceCollections.isEmpty())("wrapper-edit", ctx.isUserAllowedToEdit(ctx.collection));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("dataSource", ctx.dataSourceCollections)("elementInteractionType", ctx.interactionType)("columns", ctx.collectionsColumns)("displayType", ctx.NodeEntriesDisplayType.SmallGrid)("globalOptions", ctx.createAllowed() ? _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](13, _c7, ctx.createSubCollectionOptionItem) : _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](15, _c6))("dragDrop", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction3"](16, _c3, ctx.isAllowedToEditCollection(), ctx.canDropOnCollection, ctx.dropOnCollection))("sort", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction5"](20, _c4, ctx.sortCollections.active, ctx.sortCollections.direction, ctx.sortCollections.customSortingInProgress, ctx.sortCollections.columns, !ctx.isMobile() && ((tmp_8_0 = ctx.dataSourceCollections.getData()) == null ? null : tmp_8_0.length) > 1 && ctx.isUserAllowedToEdit(ctx.collection) && !(ctx.sortReferences == null ? null : ctx.sortReferences.customSortingInProgress)));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx.isRootLevel && ctx.dataSourceCollections.isEmpty() && !ctx.dataSourceCollections.isLoading && ctx.isUserAllowedToEdit(ctx.collection));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx.isRootLevel);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_28__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_28__.NgTemplateOutlet, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.NodeEntriesWrapperComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_29__.MatButton, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_18__.SkipTargetDirective, _collection_proposals_collection_proposals_component__WEBPACK_IMPORTED_MODULE_19__.CollectionProposalsComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslatePipe],
    styles: ["\n\n.collections-cards-div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 30px;\n}\n.collections-cards-div[_ngcontent-%COMP%]   .heading-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.collections-cards-div[_ngcontent-%COMP%]   .heading-group[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin: 5px 10px 0 0;\n}\n.collections-cards-div[_ngcontent-%COMP%]   .heading-group[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n\n.collection-nocontent-container[_ngcontent-%COMP%] {\n  text-align: left;\n  float: left;\n  width: 100%;\n}\n\nes-collection-proposals[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding-bottom: 10px;\n}\n\n.collection-nocontent-big[_ngcontent-%COMP%] {\n  font-size: 110%;\n  color: #383838;\n  margin: 20px 0;\n  width: 100%;\n}\n\n.collection-nocontent-small[_ngcontent-%COMP%] {\n  padding: 16px;\n  padding-top: 0px;\n  padding-left: 0px;\n  color: var(--textLight);\n}\n\n.actionbarMaterials[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 20px 30px;\n  margin: -20px -20px 0;\n}\n\n.node-deleted[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.7);\n  -webkit-backdrop-filter: blur(3px);\n          backdrop-filter: blur(3px);\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  align-items: center;\n}\n.node-deleted[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  opacity: 1;\n  padding-bottom: 7px;\n}\n.node-deleted[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 26pt;\n  color: var(--palette-foreground-text);\n}\n.node-deleted[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%] {\n  color: var(--palette-foreground-text);\n  font-size: 120%;\n}\n.node-deleted[_ngcontent-%COMP%]   .subline[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 90%;\n}\n.node-deleted[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.node-deleted[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: relative;\n  top: 7px;\n}\n\n.references-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%], .collections-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: max-content auto;\n  grid-gap: 50px;\n  align-items: center;\n}\n.references-wrapper.wrapper-empty.wrapper-edit.wrapper-table[_ngcontent-%COMP%]   es-node-entries-wrapper[_ngcontent-%COMP%], .collections-wrapper.wrapper-empty.wrapper-edit.wrapper-table[_ngcontent-%COMP%]   es-node-entries-wrapper[_ngcontent-%COMP%] {\n  display: none;\n}\n@media only screen and (max-width: 800px) {\n  .references-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%], .collections-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%] {\n    grid-gap: 0;\n    grid-template-columns: auto;\n  }\n  .references-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%]   .collection-nocontent-container[_ngcontent-%COMP%], .collections-wrapper.wrapper-empty.wrapper-edit[_ngcontent-%COMP%]   .collection-nocontent-container[_ngcontent-%COMP%] {\n    padding: 0 20px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2NvbGxlY3Rpb24tY29udGVudC9jb2xsZWN0aW9uLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUFKO0FBQ0k7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFDUjtBQUFRO0VBQ0ksWUFBQTtFQUNBLG9CQUFBO0FBRVo7QUFBUTtFQUNJLGtCQUFBO0FBRVo7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FBRUo7O0FBQUE7RUFDSSxlRE5ZO0VDT1osY0RWTztFQ1dQLGNBQUE7RUFFQSxXQUFBO0FBRUo7O0FBQ0E7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLHVCRHhCUTtBQzBCWjs7QUFDQTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUFFSjs7QUFBQTtFQUNJLFlBQUE7RUFDQSwwQ0FBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBR0o7QUFGSTtFQUNJLFVBQUE7RUFDQSxtQkFBQTtBQUlSO0FBRkk7RUFDSSxlQUFBO0VBQ0EscUNDeERNO0FENERkO0FBRkk7RUFDSSxxQ0MzRE07RUQ0RE4sZUFBQTtBQUlSO0FBRkk7RUFDSSx1QkR0REk7RUN1REosY0FBQTtBQUlSO0FBRkk7RUFDSSx5QkFBQTtFQUNBLGlCQUFBO0FBSVI7QUFIUTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtBQUtaOztBQUNJOztFQUNJLGFBQUE7RUFDQSx1Q0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUdSO0FBRFk7O0VBQ0ksYUFBQTtBQUloQjtBQURRO0VBVko7O0lBV1EsV0FBQTtJQUNBLDJCQUFBO0VBS1Y7RUFKVTs7SUFDSSxlQUFBO0VBT2Q7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4uY29sbGVjdGlvbnMtY2FyZHMtZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAuaGVhZGluZy1ncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgID4gaDIge1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgbWFyZ2luOiA1cHggMTBweCAwIDA7XG4gICAgICAgIH1cbiAgICAgICAgbWF0LXNsaWRlLXRvZ2dsZSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICB9XG59XG4uY29sbGVjdGlvbi1ub2NvbnRlbnQtY29udGFpbmVyIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAxMDAlO1xufVxuZXMtY29sbGVjdGlvbi1wcm9wb3NhbHMge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuLmNvbGxlY3Rpb24tbm9jb250ZW50LWJpZyB7XG4gICAgZm9udC1zaXplOiAkZm9udFNpemVMYXJnZTtcbiAgICBjb2xvcjogJHRleHRNYWluO1xuICAgIG1hcmdpbjogMjBweCAwO1xuICAgIC8vIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmNvbGxlY3Rpb24tbm9jb250ZW50LXNtYWxsIHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIHBhZGRpbmctdG9wOiAwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG5cbi5hY3Rpb25iYXJNYXRlcmlhbHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBwYWRkaW5nOiAyMHB4IDMwcHg7XG4gICAgbWFyZ2luOiAtMjBweCAtMjBweCAwO1xufVxuLm5vZGUtZGVsZXRlZCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoM3B4KTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGRpdiB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiA3cHg7XG4gICAgfVxuICAgID4gZGl2IGkge1xuICAgICAgICBmb250LXNpemU6IDI2cHQ7XG4gICAgICAgIGNvbG9yOiAkdGV4dFByaW1hcnk7XG4gICAgfVxuICAgIC5oZWFkbGluZSB7XG4gICAgICAgIGNvbG9yOiAkdGV4dFByaW1hcnk7XG4gICAgICAgIGZvbnQtc2l6ZTogMTIwJTtcbiAgICB9XG4gICAgLnN1YmxpbmUge1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgZm9udC1zaXplOiA5MCU7XG4gICAgfVxuICAgIGEge1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IDdweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5yZWZlcmVuY2VzLXdyYXBwZXIsXG4uY29sbGVjdGlvbnMtd3JhcHBlciB7XG4gICAgJi53cmFwcGVyLWVtcHR5LndyYXBwZXItZWRpdCB7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgYXV0bztcbiAgICAgICAgZ3JpZC1nYXA6IDUwcHg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICYud3JhcHBlci10YWJsZSB7XG4gICAgICAgICAgICBlcy1ub2RlLWVudHJpZXMtd3JhcHBlciB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMSkge1xuICAgICAgICAgICAgZ3JpZC1nYXA6IDA7XG4gICAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XG4gICAgICAgICAgICAuY29sbGVjdGlvbi1ub2NvbnRlbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 70213:
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/collections-page/collection-info-bar/collection-info-bar.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionInfoBarComponent: () => (/* binding */ CollectionInfoBarComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/components/user-avatar/user-avatar.component */ 98588);
/* harmony import */ var _features_mds_mds_viewer_mds_viewer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../features/mds/mds-viewer/mds-viewer.component */ 2361);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 21916);















const _c0 = ["actionbar"];
const _c1 = ["mds"];
function CollectionInfoBarComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 18)(1, "div", 19)(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CollectionInfoBarComponent_div_3_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r10.edit.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("cursor", ctx_r0.isAllowedToEditCollection() ? "pointer" : "auto");
  }
}
const _c2 = function () {
  return {
    maxWidth: 300,
    maxHeight: 300,
    crop: true
  };
};
function CollectionInfoBarComponent_div_4_img_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "esNodeImage");
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 3, ctx_r12.collection, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](6, _c2))), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function CollectionInfoBarComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "esNodeImage");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, CollectionInfoBarComponent_div_4_img_4_Template, 3, 7, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](3, 4, ctx_r1.collection, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](7, _c2))), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.collection == null ? null : ctx_r1.collection.preview == null ? null : ctx_r1.collection.preview.url);
  }
}
function CollectionInfoBarComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CollectionInfoBarComponent_div_5_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r13.edit.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CollectionInfoBarComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r4.collection.collection.childCollectionsCount, " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, "COLLECTION.INFO_REFERENCES_MULTI"), " ");
  }
}
function CollectionInfoBarComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r5.collection.collection.childReferencesCount, " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, "COLLECTION.INFO_CHILDS_MULTI"), " ");
  }
}
function CollectionInfoBarComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, ctx_r6.collection.owner));
  }
}
function CollectionInfoBarComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r7.collection.collection.authorFreetext);
  }
}
function CollectionInfoBarComponent_es_mds_viewer_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-mds-viewer", 27, 28);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("data", ctx_r8.collection.properties)("headingLevel", 2);
  }
}
function CollectionInfoBarComponent_ng_container_28_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "es-user-avatar", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const permission_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("user", permission_r18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 2, permission_r18.authority.authorityType === "GROUP" ? permission_r18.group : permission_r18.user));
  }
}
function CollectionInfoBarComponent_ng_container_28_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CollectionInfoBarComponent_ng_container_28_div_5_ng_container_1_Template, 5, 4, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const permission_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", permission_r18.authority.authorityType !== "EVERYONE");
  }
}
function CollectionInfoBarComponent_ng_container_28_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "h2", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, "COLLECTIONS.STATS.TOTAL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r17.stats.total["VIEW_COLLECTION"], " ");
  }
}
function CollectionInfoBarComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "h2", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, CollectionInfoBarComponent_ng_container_28_div_5_Template, 2, 1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, CollectionInfoBarComponent_ng_container_28_ng_container_6_Template, 6, 4, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 3, "COLLECTIONS.PERMISSIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r9.permissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r9.stats);
  }
}
class CollectionInfoBarComponent {
  constructor(nodeHelper, nodeService) {
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.edit = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
  }
  ngOnChanges(changes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (changes.collection?.currentValue) {
        if (_this.collection.access.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ACCESS_CHANGE_PERMISSIONS)) {
          _this.stats = yield _this.nodeService.getStats(_this.collection.ref.id).toPromise();
        }
      }
    })();
  }
  isBrightColor() {
    return ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.ColorHelper.getPreferredColor(this.collection?.collection?.color) === ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.PreferredColor.White;
  }
  hasNonIconPreview() {
    const preview = this.collection?.preview;
    return preview && !preview.isIcon;
  }
  isAllowedToEditCollection() {
    return _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_1__.RestHelper.hasAccessPermission(this.collection, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.PERMISSION_WRITE);
  }
  getScopeInfo() {
    return this.nodeHelper.getCollectionScopeInfo(this.collection);
  }
  static #_ = this.ɵfac = function CollectionInfoBarComponent_Factory(t) {
    return new (t || CollectionInfoBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_10__.NodeService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: CollectionInfoBarComponent,
    selectors: [["es-collection-info-bar"]],
    viewQuery: function CollectionInfoBarComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.actionbar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.mds = _t.first);
      }
    },
    inputs: {
      collection: "collection",
      permissions: "permissions"
    },
    outputs: {
      edit: "edit"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵNgOnChangesFeature"]],
    decls: 29,
    vars: 36,
    consts: [["role", "complementary", 1, "collections-header"], [1, "card-collection-image-container", 2, "width", "100%"], ["style", "width: 250px; height: 200px; margin-left: auto; margin-right: auto", 4, "ngIf"], ["class", "card-image-icon-container", 4, "ngIf"], ["role", "presentation", "class", "big-edit-button", 3, "click", 4, "ngIf"], [1, "collections-header-textarea"], [1, "collection-option"], ["appearance", "round", 3, "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile", "dropdownPosition"], ["actionbar", ""], ["esTitle", "", 1, "collection-new-preview-headline", "collections-header-texttop", 2, "overflow", "hidden"], ["class", "collection-new-preview-subline collections-header-texttop", 4, "ngIf"], [1, "collection-new-preview-infoline"], ["esIcon", "person", 1, "icon-bottom", 3, "altText"], [4, "ngIf"], [1, "icon-bottom", 3, "esIcon", "altText"], [1, "collection-permissions", "collection-label"], [1, "collections-metadata"], ["groupId", "collection_sidebar", 3, "data", "headingLevel", 4, "ngIf"], [2, "width", "250px", "height", "200px", "margin-left", "auto", "margin-right", "auto"], [1, "card-image-icon-container"], [1, "card-image-icon-circle", 3, "click"], ["esIcon", "layers"], ["role", "presentation", 1, "blurred-image", 3, "src"], ["class", "collection-header-image", "role", "presentation", 3, "src", 4, "ngIf"], ["role", "presentation", 1, "collection-header-image", 3, "src"], ["role", "presentation", 1, "big-edit-button", 3, "click"], [1, "collection-new-preview-subline", "collections-header-texttop"], ["groupId", "collection_sidebar", 3, "data", "headingLevel"], ["mds", ""], [1, "collection-permissions", "collection-content"], [4, "ngFor", "ngForOf"], ["size", "xsmall", 3, "user"], [1, "collection-stats", "collection-content"]],
    template: function CollectionInfoBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, CollectionInfoBarComponent_div_3_Template, 4, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, CollectionInfoBarComponent_div_4_Template, 5, 8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, CollectionInfoBarComponent_div_5_Template, 1, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 5)(7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "es-actionbar", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "h1", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, CollectionInfoBarComponent_div_12_Template, 3, 4, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, CollectionInfoBarComponent_div_13_Template, 3, 4, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, CollectionInfoBarComponent_span_18_Template, 3, 3, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, CollectionInfoBarComponent_span_19_Template, 2, 1, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](25, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](27, CollectionInfoBarComponent_es_mds_viewer_27_Template, 2, 2, "es-mds-viewer", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, CollectionInfoBarComponent_ng_container_28_Template, 7, 5, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("background-color", ctx.collection == null ? null : ctx.collection.collection == null ? null : ctx.collection.collection.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("dark-color", ctx.isBrightColor());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 28, "COLLECTIONS.DETAILS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("card-collection-icon-container", !ctx.hasNonIconPreview());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.hasNonIconPreview());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.hasNonIconPreview());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isAllowedToEditCollection());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("collections-header-textarea-bright", ctx.isBrightColor());
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleMap"]("flat");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("numberOfAlwaysVisibleOptions", 1)("numberOfAlwaysVisibleOptionsMobile", 1)("dropdownPosition", "right");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx.collection == null ? null : ctx.collection.title, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.collection == null ? null : ctx.collection.collection == null ? null : ctx.collection.collection.childCollectionsCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.collection == null ? null : ctx.collection.collection == null ? null : ctx.collection.collection.childReferencesCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("altText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](16, 30, "COLLECTIONS.CREATOR") + ": ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !(ctx.collection == null ? null : ctx.collection.collection == null ? null : ctx.collection.collection.authorFreetext));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.collection == null ? null : ctx.collection.collection == null ? null : ctx.collection.collection.authorFreetext);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("esIcon", ctx.getScopeInfo().icon)("altText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 32, "COLLECTIONS.SHARING_STATE") + ": ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" \u00A0", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](24, 34, "COLLECTION.SCOPE." + ctx.getScopeInfo().scopeName), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.collection == null ? null : ctx.collection.properties);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx.collection == null ? null : ctx.collection.access == null ? null : ctx.collection.access.indexOf("ChangePermissions")) !== -1 && ctx.permissions);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.IconDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_4__.TitleDirective, _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_5__.UserAvatarComponent, _features_mds_mds_viewer_mds_viewer_component__WEBPACK_IMPORTED_MODULE_6__.MdsViewerComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__.AuthorityNamePipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.NodeImagePipe],
    styles: ["\n\n.collections-header-textarea[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 50px 20px 30px 20px;\n}\n\n.collections-header-texttop[_ngcontent-%COMP%] {\n  text-align: left;\n}\n\n.collections-header[_ngcontent-%COMP%] {\n  background-color: var(--primary);\n  color: #fff;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  z-index: 1;\n}\n.collections-header[_ngcontent-%COMP%]   .collection-loading[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.75);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n}\n\n.dark-color[_ngcontent-%COMP%] {\n  color: #000;\n}\n\n.collection-new-preview-headline[_ngcontent-%COMP%] {\n  word-break: normal;\n  overflow-wrap: break-word;\n  line-height: normal;\n  margin: 0;\n}\n\n.collection-new-preview-infoarea[_ngcontent-%COMP%] {\n  min-height: 120px;\n  padding: 16px;\n  color: white;\n}\n\n.card-image-icon-circle[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  border-radius: 50%;\n  background-color: rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: default;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.card-image-icon-circle[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 45px;\n}\n\n.collection-new-preview-headline[_ngcontent-%COMP%] {\n  font-size: 150%;\n  padding-bottom: 15px;\n}\n\n.collection-new-preview-subline[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n\n.collection-new-preview-infoline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  opacity: 0.85;\n  margin-top: 16px;\n  margin-left: -2px;\n  margin-bottom: 4px;\n}\n\n.card-collection-image-container[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  height: 200px;\n}\n\n.card-image-icon-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 220px;\n  width: 100%;\n  overflow: hidden;\n  margin: auto;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-image-icon-container[_ngcontent-%COMP%]   .blurred-image[_ngcontent-%COMP%] {\n  display: block;\n  filter: blur(15px);\n}\n.card-image-icon-container[_ngcontent-%COMP%]   .collection-header-image[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n  margin: auto;\n  z-index: 1;\n  position: relative;\n  box-shadow: 0 10px 70px rgba(0, 0, 0, 0.15);\n}\n\n.big-edit-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  cursor: pointer;\n  border-radius: 50%;\n  opacity: 0;\n}\n\n.collection-option[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -23px;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  z-index: 1;\n}\n.collection-option[_ngcontent-%COMP%]     .actionbar > button.mat-button.cdk-keyboard-focused {\n  outline-color: white;\n}\n\n.collections-header-textarea[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.collections-header-textarea.collections-header-textarea-bright[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.15);\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-label[_ngcontent-%COMP%], .collections-header-textarea[_ngcontent-%COMP%]   .collection-metadata[_ngcontent-%COMP%] {\n  margin: 18px 0 0;\n  padding-top: 18px;\n  border-top: 1px solid rgba(0, 0, 0, 0.25);\n  opacity: 0.8;\n  font-size: 90%;\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-content[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-permissions.collection-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-permissions.collection-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 3px 0;\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-permissions.collection-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > es-user-avatar[_ngcontent-%COMP%] {\n  height: 24px;\n  margin-right: 9px;\n}\n.collections-header-textarea[_ngcontent-%COMP%]   .collection-permissions.collection-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.25em;\n  max-height: 2.5em;\n  -webkit-line-clamp: 2; \n\n  -webkit-box-orient: vertical;\n  \n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2NvbGxlY3Rpb24taW5mby1iYXIvY29sbGVjdGlvbi1pbmZvLWJhci5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxrQkFBQTtFQUNBLDRCQUFBO0FBQUo7O0FBR0E7RUFDSSxnQkFBQTtBQUFKOztBQUVBO0VBQ0ksZ0NDWE07RURZTixXQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FBQ0o7QUFBSTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSwyQ0FBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7QUFFUjs7QUFDQTtFQUNJLFdBQUE7QUFFSjs7QUFBQTtFQUNJLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFHSjs7QUFEQTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFJSjs7QUFGQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VFaENBLGVBQUE7RUFDQSx5QkFBQTtVQUFBLGlCQUFBO0FGc0NKO0FBTEk7RUFDSSxXQUFBO0VBQ0EsZUFBQTtBQU9SOztBQUpBO0VBQ0ksZUFBQTtFQUNBLG9CQUFBO0FBT0o7O0FBSkE7RUFFSSxhQUFBO0FBTUo7O0FBSEE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBTUo7O0FBSEE7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0FBTUo7O0FBSEE7RUFDSSxrQkFBQTtFQUVBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUtKO0FBSkk7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUFNUjtBQUpJO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUUvRkosMkNBQUE7QUZzR0o7O0FBSEE7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FBTUo7O0FBSEE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7QUFNSjtBQUxJO0VBQ0ksb0JBQUE7QUFPUjs7QUFKQTtFQUNJLHFDQUFBO0FBT0o7QUFOSTtFQUNJLDJDQUFBO0FBUVI7QUFOSTs7RUFFSSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUNBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQVFSO0FBTkk7RUFDSSxlQUFBO0FBUVI7QUFOSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQVFSO0FBUFE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBU1o7QUFSWTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQVVoQjtBQVJZO0VHdEpSLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkhrSm9DLEVHbEpSLDRCQUFBO0VBQzVCLDRCQUFBO0VBQ0Esc0JBQUE7QUhpS0oiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLmNvbGxlY3Rpb25zLWhlYWRlci10ZXh0YXJlYSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDUwcHggMjBweCAzMHB4IDIwcHg7XG59XG5cbi5jb2xsZWN0aW9ucy1oZWFkZXItdGV4dHRvcCB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5jb2xsZWN0aW9ucy1oZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIC5jb2xsZWN0aW9uLWxvYWRpbmcge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbiAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xuICAgIH1cbn1cbi5kYXJrLWNvbG9yIHtcbiAgICBjb2xvcjogIzAwMDtcbn1cbi5jb2xsZWN0aW9uLW5ldy1wcmV2aWV3LWhlYWRsaW5lIHtcbiAgICB3b3JkLWJyZWFrOiBub3JtYWw7XG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgIG1hcmdpbjogMDtcbn1cbi5jb2xsZWN0aW9uLW5ldy1wcmV2aWV3LWluZm9hcmVhIHtcbiAgICBtaW4taGVpZ2h0OiAxMjBweDtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cbi5jYXJkLWltYWdlLWljb24tY2lyY2xlIHtcbiAgICB3aWR0aDogOTBweDtcbiAgICBoZWlnaHQ6IDkwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgQGluY2x1ZGUgdW5zZWxlY3RhYmxlVGV4dCgpO1xuICAgID4gaSB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXNpemU6IDQ1cHg7XG4gICAgfVxufVxuLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctaGVhZGxpbmUge1xuICAgIGZvbnQtc2l6ZTogMTUwJTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbn1cblxuLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctc3VibGluZSB7XG4gICAgLy9mb250LXNpemU6IDEyMCU7XG4gICAgb3BhY2l0eTogMC44NTtcbn1cblxuLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctaW5mb2xpbmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvcGFjaXR5OiAwLjg1O1xuICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0ycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uY2FyZC1jb2xsZWN0aW9uLWltYWdlLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGhlaWdodDogMjAwcHg7XG59XG5cbi5jYXJkLWltYWdlLWljb24tY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLy8gYXNwZWN0IHJhdGlvIGVxdWFscyA0LzMgLT4gMjUwLzIyMFxuICAgIGhlaWdodDogMjIwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAuYmx1cnJlZC1pbWFnZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XG4gICAgfVxuICAgIC5jb2xsZWN0aW9uLWhlYWRlci1pbWFnZSB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvd0xhcmdlKCk7XG4gICAgfVxufVxuLmJpZy1lZGl0LWJ1dHRvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgLy9iYWNrZ3JvdW5kOiAjZmYwMDAwNDI7XG59XG4uY29sbGVjdGlvbi1vcHRpb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0yM3B4O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB6LWluZGV4OiAxO1xuICAgICYgOjpuZy1kZWVwIC5hY3Rpb25iYXIgPiBidXR0b24ubWF0LWJ1dHRvbi5jZGsta2V5Ym9hcmQtZm9jdXNlZCB7XG4gICAgICAgIG91dGxpbmUtY29sb3I6IHdoaXRlO1xuICAgIH1cbn1cbi5jb2xsZWN0aW9ucy1oZWFkZXItdGV4dGFyZWEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG4gICAgJi5jb2xsZWN0aW9ucy1oZWFkZXItdGV4dGFyZWEtYnJpZ2h0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbiAgICB9XG4gICAgLmNvbGxlY3Rpb24tbGFiZWwsXG4gICAgLmNvbGxlY3Rpb24tbWV0YWRhdGEge1xuICAgICAgICBtYXJnaW46IDE4cHggMCAwO1xuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgICAgZm9udC1zaXplOiA5MCU7XG4gICAgfVxuICAgIC5jb2xsZWN0aW9uLWNvbnRlbnQge1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgfVxuICAgIC5jb2xsZWN0aW9uLXBlcm1pc3Npb25zLmNvbGxlY3Rpb24tY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgcGFkZGluZzogM3B4IDA7XG4gICAgICAgICAgICA+IGVzLXVzZXItYXZhdGFyIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA5cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIGxpbWl0TGluZUNvdW50KDIsIDEuMjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBpbWFnZURpc2FibGVkQmx1cigpIHtcbiAgICAtd2Via2l0LWZpbHRlcjogYmx1cigzcHgpO1xuICAgIGZpbHRlcjogYmx1cigzcHgpO1xufVxuQG1peGluIHNob3J0ZW5UZXh0KCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0xhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAxMHB4IDcwcHggcmdiYSgwLCAwLCAwLCAwLjE1KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBsaW1pdExpbmVMZW5ndGgoJHdpZHRoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1heC13aWR0aDogJHdpZHRoO1xufVxuQG1peGluIHVuc2VsZWN0YWJsZVRleHQoKSB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xufVxuQG1peGluIGlvc1Njcm9sbGluZygpIHtcbiAgICAvKiBpb3Mgc2Nyb2xsaW5nIGZpeCAqL1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cbkBtaXhpbiBwbGFjZWhvbGRlciB7XG4gICAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEluc2V0Rm9jdXMoKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICRmb2N1c1dpZHRoICRmb2N1c0NvbG9yICFpbXBvcnRhbnQ7XG4gICAgQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScsICRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxEYXNoZWRGb2N1cygpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBkYXNoZWQgJGZvY3VzQ29sb3I7XG59XG5cbkBtaXhpbiBmb2N1c1NoYWRvdygkZGFyazogdHJ1ZSwgJHN0cmVuZ3RoOiAwLjEpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIEBpZiAkZGFyaz09dHJ1ZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgfVxufVxuQG1peGluIGRhcmtlbigpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuQ29sb3I7XG59XG5AbWl4aW4gZGFya2VuTGlnaHQoKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkxpZ2h0Q29sb3I7XG59XG5AbWl4aW4gYmx1ckJhY2tncm91bmQoJHJhZGl1czogNXB4KSB7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKCRyYWRpdXMpO1xufVxuQG1peGluIHNldEdsb2JhbEZvY3VzKCRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgJGZvY3VzV2lkdGggJGNvbG9yICFpbXBvcnRhbnQ7XG59XG5cbkBtaXhpbiByZW1vdmVCdXR0b25EZWZhdWx0U3R5bGVzIHtcbiAgICBiYWNrZ3JvdW5kOiB1bnNldDtcbiAgICBib3JkZXI6IHVuc2V0O1xuICAgIHBhZGRpbmc6IHVuc2V0O1xufVxuXG5AbWl4aW4gYWZ0ZXJQc2V1ZG9FbGVtZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQGltcG9ydCAncHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zJztcbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 458:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/collections-page/collection-new/collection-new.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionNewComponent: () => (/* binding */ CollectionNewComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 73064);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/bridge.service */ 34997);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/a11y */ 93170);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ 13838);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../features/mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);

































const _c0 = ["mds"];
const _c1 = ["organizations"];
const _c2 = ["file"];
const _c3 = ["authorFreetextInput"];
function CollectionNewComponent_es_global_progress_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "es-global-progress");
  }
}
function CollectionNewComponent_div_2_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_div_1_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r12);
      const i_r10 = restoredCtx.index;
      const step_r9 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](i_r10 < ctx_r11.currentStepPosition() ? ctx_r11.newCollectionStep = step_r9 : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "div", 13)(2, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](6, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const step_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("current", step_r9 === ctx_r8.newCollectionStep)("finished", i_r10 < ctx_r8.currentStepPosition());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("esIcon", ctx_r8.STEP_ICONS[step_r9]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 6, "COLLECTIONS.STEP." + step_r9));
  }
}
function CollectionNewComponent_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, CollectionNewComponent_div_2_div_1_div_1_Template, 7, 8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx_r2.availableSteps);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "COLLECTIONS.STEP.DONE"));
  }
}
function CollectionNewComponent_div_2_es_card_2_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_2_button_14_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r17.setCollectionType("CUSTOM"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 23)(4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "COLLECTIONS.CREATE.SHARED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 4, "COLLECTIONS.CREATE.SHARED_DESCRIPTION"));
  }
}
function CollectionNewComponent_div_2_es_card_2_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_2_button_15_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r19.setCollectionType("EDU_ALL"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 23)(4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "COLLECTIONS.CREATE.PUBLIC"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 4, "COLLECTIONS.CREATE.PUBLIC_DESCRIPTION"));
  }
}
function CollectionNewComponent_div_2_es_card_2_div_16_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_2_div_16_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r22.setCollectionType("EDITORIAL"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 23)(4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "COLLECTIONS.CREATE.EDITORIAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 4, "COLLECTIONS.CREATE.EDITORIAL_DESCRIPTION"), " ");
  }
}
function CollectionNewComponent_div_2_es_card_2_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, CollectionNewComponent_div_2_es_card_2_div_16_button_1_Template, 11, 6, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r15.createEditorial);
  }
}
function CollectionNewComponent_div_2_es_card_2_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_2_button_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r24.setCollectionType("MEDIA_CENTER"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 23)(4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "COLLECTIONS.CREATE.MEDIA_CENTER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 4, "COLLECTIONS.CREATE.MEDIA_CENTER_DESCRIPTION"), " ");
  }
}
function CollectionNewComponent_div_2_es_card_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-card", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onCancel", function CollectionNewComponent_div_2_es_card_2_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r26.newCollectionCancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 19)(3, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_2_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r27);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r28.setCollectionType("MY"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "div", 23)(7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](14, CollectionNewComponent_div_2_es_card_2_button_14_Template, 11, 6, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](15, CollectionNewComponent_div_2_es_card_2_button_15_Template, 11, 6, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, CollectionNewComponent_div_2_es_card_2_div_16_Template, 2, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](17, CollectionNewComponent_div_2_es_card_2_button_17_Template, 11, 6, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 7, "COLLECTIONS.CREATE_TYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 9, "COLLECTIONS.CREATE.PRIVATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](12, 11, "COLLECTIONS.CREATE.PRIVATE_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.canInvite);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.shareToAll && ctx_r3.canInvite);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.createEditorial && ctx_r3.shareToAll);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.createMediacenter);
  }
}
function CollectionNewComponent_div_2_es_card_3_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keyup.enter", function CollectionNewComponent_div_2_es_card_3_div_9_Template_div_keyup_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r37);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    })("click", function CollectionNewComponent_div_2_es_card_3_div_9_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r37);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "i", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleProp"]("background-color", ctx_r30.currentCollection.collection.color);
  }
}
const _c4 = function () {
  return {
    maxWidth: 300,
    maxHeight: 300,
    crop: true
  };
};
function CollectionNewComponent_div_2_es_card_3_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keyup.enter", function CollectionNewComponent_div_2_es_card_3_div_10_Template_div_keyup_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r40);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    })("click", function CollectionNewComponent_div_2_es_card_3_div_10_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r40);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "img", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](3, "esNodeImage");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "img", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "esNodeImage");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 2, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](3, 4, ctx_r31.currentCollection, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](12, _c4))), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 7, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](6, 9, ctx_r31.currentCollection, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](13, _c4))), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
  }
}
function CollectionNewComponent_div_2_es_card_3_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keyup.enter", function CollectionNewComponent_div_2_es_card_3_div_11_Template_div_keyup_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r43);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    })("click", function CollectionNewComponent_div_2_es_card_3_div_11_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r43);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r29.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "img", 59)(3, "img", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("src", ctx_r32.imageData, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("src", ctx_r32.imageData, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
  }
}
const _c5 = function (a0) {
  return {
    thing: a0
  };
};
function CollectionNewComponent_div_2_es_card_3_ng_container_26_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_3_ng_container_26_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r47);
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r46.switchToAuthorFreetext());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](1, 1, "EDIT", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](6, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 4, "COLLECTIONS.NEW.AUTHOR_FREETEXT"))));
  }
}
function CollectionNewComponent_div_2_es_card_3_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](4, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](5, CollectionNewComponent_div_2_es_card_3_ng_container_26_button_5_Template, 4, 8, "button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](4, 2, ctx_r33.user));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r33.authorFreetextAllowed);
  }
}
function CollectionNewComponent_div_2_es_card_3_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "mat-form-field", 67)(3, "mat-label", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "input", 69, 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function CollectionNewComponent_div_2_es_card_3_ng_container_27_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r50);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r49.currentCollection.collection.authorFreetext = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_3_ng_container_27_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r50);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r51.cancelAuthorFreetext());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "i", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("mat-form-field-bright", !ctx_r34.isBrightColor());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 6, "COLLECTIONS.NEW.AUTHOR_FREETEXT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", !ctx_r34.authorFreetextAllowed)("ngModel", ctx_r34.currentCollection.collection.authorFreetext);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 8, "CANCEL"));
  }
}
const _c6 = function (a0) {
  return {
    "color-selected": a0
  };
};
const _c7 = function (a0) {
  return {
    index: a0
  };
};
function CollectionNewComponent_div_2_es_card_3_li_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "li", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_3_li_33_Template_li_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r55);
      const color_r52 = restoredCtx.$implicit;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r54.setColor(color_r52));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const color_r52 = ctx.$implicit;
    const index_r53 = ctx.index;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleProp"]("background-color", color_r52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("id", "collection-new-color-picker-option-", index_r53, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](9, _c6, ctx_r35.currentCollection.collection.color === color_r52));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("aria-selected", ctx_r35.currentCollection.collection.color === color_r52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](3, 6, "collectionNew_colorIndex", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](11, _c7, index_r53 + 1)), " ");
  }
}
function CollectionNewComponent_div_2_es_card_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-card", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onCancel", function CollectionNewComponent_div_2_es_card_3_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r56.newCollectionCancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 36)(3, "div", 37)(4, "div", 38)(5, "input", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function CollectionNewComponent_div_2_es_card_3_Template_input_change_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r58.imageDataChanged($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](8, "es-actionbar", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](9, CollectionNewComponent_div_2_es_card_3_div_9_Template, 4, 2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](10, CollectionNewComponent_div_2_es_card_3_div_10_Template, 7, 14, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](11, CollectionNewComponent_div_2_es_card_3_div_11_Template, 4, 2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "div", 47)(15, "mat-form-field")(16, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](19, "input", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function CollectionNewComponent_div_2_es_card_3_Template_input_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r59.currentCollection.title = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](20, "mat-form-field")(21, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](24, "textarea", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function CollectionNewComponent_div_2_es_card_3_Template_textarea_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r60.currentCollection.collection.description = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](25, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](26, CollectionNewComponent_div_2_es_card_3_ng_container_26_Template, 6, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](27, CollectionNewComponent_div_2_es_card_3_ng_container_27_Template, 11, 10, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](28, "div", 51)(29, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](32, "ul", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keydown.arrowright", function CollectionNewComponent_div_2_es_card_3_Template_ul_keydown_arrowright_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r61.setColorByDirection($event));
    })("keydown.arrowup", function CollectionNewComponent_div_2_es_card_3_Template_ul_keydown_arrowup_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r62.setColorByDirection($event));
    })("keydown.arrowleft", function CollectionNewComponent_div_2_es_card_3_Template_ul_keydown_arrowleft_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r63.setColorByDirection($event));
    })("keydown.arrowdown", function CollectionNewComponent_div_2_es_card_3_Template_ul_keydown_arrowdown_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r57);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r64.setColorByDirection($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](33, CollectionNewComponent_div_2_es_card_3_li_33_Template, 4, 13, "li", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 31, "collectionNew_preview"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("buttons", ctx_r4.buttons)("isCancelable", true)("subtitle", ctx_r4.currentCollection.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r4.imageOptions)("numberOfAlwaysVisibleOptions", 0)("numberOfAlwaysVisibleOptionsMobile", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r4.imageData && !(ctx_r4.currentCollection.preview && !ctx_r4.currentCollection.preview.isIcon));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r4.imageData && ctx_r4.currentCollection.preview && !ctx_r4.currentCollection.preview.isIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r4.imageData);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleProp"]("background-color", ctx_r4.currentCollection.collection.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("dark-color", ctx_r4.isBrightColor());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("mat-form-field-bright", !ctx_r4.isBrightColor())("mat-form-field-dark", ctx_r4.isBrightColor());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](18, 33, "collectionNew_placeholderTitle"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r4.currentCollection.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("mat-form-field-bright", !ctx_r4.isBrightColor())("mat-form-field-dark", ctx_r4.isBrightColor());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](23, 35, "collectionNew_placeholderDescription"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r4.currentCollection.collection.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r4.authorFreetext);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r4.authorFreetext);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](31, 37, "collectionNew_setColor"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("aria-activedescendant", ctx_r4.COLORS.indexOf(ctx_r4.currentCollection.collection.color) !== -1 ? "collection-new-color-picker-option-" + ctx_r4.COLORS.indexOf(ctx_r4.currentCollection.collection.color) : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx_r4.COLORS);
  }
}
function CollectionNewComponent_div_2_es_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-card", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onCancel", function CollectionNewComponent_div_2_es_card_4_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r67);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r66.newCollectionCancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "es-mds-editor-wrapper", 77, 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 9, "COLLECTIONS.STEP.METADATA"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("subtitle", ctx_r5.currentCollection.title)("isCancelable", true)("buttons", ctx_r5.buttons);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("groupId", "collection_" + ctx_r5.newCollectionType.toLowerCase())("setId", ctx_r5.mdsSet)("editorMode", "form")("embedded", true)("currentValues", ctx_r5.properties);
  }
}
function CollectionNewComponent_div_2_es_card_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 90)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](3, 2, "TOOLPERMISSION_ERROR_HEADER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 4, "TOOLPERMISSION.TOOLPERMISSION_INVITE_ALLAUTHORITIES"));
  }
}
function CollectionNewComponent_div_2_es_card_5_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.NO_EDITORIAL_GROUPS"));
  }
}
const _c8 = function () {
  return [];
};
const _c9 = function (a2) {
  return {
    active: null,
    direction: "asc",
    columns: a2,
    allowed: false
  };
};
function CollectionNewComponent_div_2_es_card_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r73 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-card", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onCancel", function CollectionNewComponent_div_2_es_card_5_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r73);
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r72.newCollectionCancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 80)(3, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, CollectionNewComponent_div_2_es_card_5_div_4_Template, 7, 6, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "es-node-entries-wrapper", 83, 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("clickItem", function CollectionNewComponent_div_2_es_card_5_Template_es_node_entries_wrapper_clickItem_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r73);
      const _r69 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r69.getSelection().toggle($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](7, CollectionNewComponent_div_2_es_card_5_ng_template_7_Template, 3, 3, "ng-template", null, 85, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "div", 86)(10, "mat-slide-toggle", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function CollectionNewComponent_div_2_es_card_5_Template_mat_slide_toggle_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r73);
      const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r75.editorialPublic = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](12, 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerStart"](15, 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 13, "COLLECTIONS.STEP.EDITORIAL_GROUPS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("subtitle", ctx_r6.currentCollection.title)("isCancelable", true)("buttons", ctx_r6.buttons);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r6.shareToAll);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dataSource", ctx_r6.editorialGroups)("displayType", ctx_r6.NodeEntriesDisplayType.Table)("columns", ctx_r6.editorialColumns)("sort", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](20, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](19, _c8)))("elementInteractionType", ctx_r6.InteractionType.Emitter);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngModel", ctx_r6.editorialPublic);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](14, 15, "COLLECTIONS.EDITORIAL_PUBLIC"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](17, 17, "COLLECTIONS.EDITORIAL_PUBLIC_INFO"), " ");
  }
}
function CollectionNewComponent_div_2_es_card_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "es-card", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("onCancel", function CollectionNewComponent_div_2_es_card_6_Template_es_card_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r77);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r76.newCollectionCancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 76)(3, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "div", 93)(10, "button", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CollectionNewComponent_div_2_es_card_6_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r77);
      const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r78.editPermissions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](11, "i", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](1, 8, "COLLECTIONS.EDIT_PERMISSIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("isCancelable", true)("buttons", ctx_r7.buttons)("subtitle", ctx_r7.currentCollection.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](5, 10, "COLLECTIONS.EDIT_PERMISSIONS_SUBTEXT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](8, 12, "COLLECTIONS.EDIT_PERMISSIONS_DESCRIPTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](13, 14, "COLLECTIONS.EXTENDED_PERMISSIONS_BUTTON"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](16, 16, "COLLECTIONS.PERMISSIONS_STATUS_" + ctx_r7.getShareStatus()), " ");
  }
}
function CollectionNewComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, CollectionNewComponent_div_2_div_1_Template, 7, 4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, CollectionNewComponent_div_2_es_card_2_Template, 18, 13, "es-card", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, CollectionNewComponent_div_2_es_card_3_Template, 34, 39, "es-card", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, CollectionNewComponent_div_2_es_card_4_Template, 5, 11, "es-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](5, CollectionNewComponent_div_2_es_card_5_Template, 18, 22, "es-card", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](6, CollectionNewComponent_div_2_es_card_6_Template, 17, 18, "es-card", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep !== ctx_r1.STEP_NEW);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep === ctx_r1.STEP_NEW);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep === ctx_r1.STEP_GENERAL);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep === ctx_r1.STEP_METADATA);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep === ctx_r1.STEP_EDITORIAL_GROUPS);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r1.newCollectionStep === ctx_r1.STEP_PERMISSIONS);
  }
}
// component class
class CollectionNewComponent {
  handleKeyboardEvent(event) {
    if (event.code == 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.goBack();
      return;
    }
  }
  setCollection(collection) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_16__.Observable(observer => {
      const id = collection.ref.id;
      this.nodeService.getNodePermissions(id).subscribe(perm => {
        this.mdsSet = collection.metadataset;
        this.canInvite = this.canInvite && _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.hasAccessPermission(collection, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CHANGE_PERMISSIONS);
        this.editorialPublic = perm.permissions.localPermissions?.permissions?.some(p => p.authority?.authorityName === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE);
        this.editId = id;
        this.currentCollection = collection;
        // cleanup irrelevant data
        this.currentCollection.rating = null;
        this.authorFreetext = this.currentCollection.collection.authorFreetext != null;
        this.originalPermissions = perm.permissions.localPermissions;
        this.properties = collection.properties;
        this.newCollectionType = this.getTypeForCollection(this.currentCollection);
        this.hasCustomScope = false;
        this.newCollectionStep = this.STEP_GENERAL;
        if (this.currentCollection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM_PUBLIC) {
          this.currentCollection.collection.scope = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM;
        }
        observer.next();
        observer.complete();
      });
    });
  }
  onEvent(event, data) {
    if (event === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_APPLY_NODE) {
      const imageData = data.preview?.data;
      if (imageData) {
        this.imageData = this.sanitizer.bypassSecurityTrustUrl(imageData);
        this.updateImageOptions();
        fetch(imageData).then(res => res.blob()).then(blob => {
          this.imageFile = blob;
        });
        this.ref.tick();
      } else {
        console.info(data);
        this.toast.error(null, 'COLLECTIONS.TOAST.ERROR_IMAGE_APPLY');
      }
      this.imageWindow?.close();
    }
  }
  constructor(collectionService, nodeService, connector, nodeHelper, uiService, iamService, mediacenterService, route, mdsService, eventService, router, platformLocation, toast, bridge, temporaryStorage, zone, sanitizer, configLegacy, configService, ref, translations, translationService, loadingScreen, mainNav, dialogs) {
    this.collectionService = collectionService;
    this.nodeService = nodeService;
    this.connector = connector;
    this.nodeHelper = nodeHelper;
    this.uiService = uiService;
    this.iamService = iamService;
    this.mediacenterService = mediacenterService;
    this.route = route;
    this.mdsService = mdsService;
    this.eventService = eventService;
    this.router = router;
    this.platformLocation = platformLocation;
    this.toast = toast;
    this.bridge = bridge;
    this.temporaryStorage = temporaryStorage;
    this.zone = zone;
    this.sanitizer = sanitizer;
    this.configLegacy = configLegacy;
    this.configService = configService;
    this.ref = ref;
    this.translations = translations;
    this.translationService = translationService;
    this.loadingScreen = loadingScreen;
    this.mainNav = mainNav;
    this.dialogs = dialogs;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.InteractionType;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesDisplayType;
    this.DEFAULT_COLORS = ['#975B5D', '#692426', '#E6B247', '#A89B39', '#699761', '#32662A', '#60998F', '#29685C', '#759CB7', '#537997', '#976097', '#692869'];
    this.isLoading = true;
    this.properties = {};
    this.mainnav = true;
    this.permissions = null;
    this.createEditorial = false;
    this.createCurriculum = false;
    this.createMediacenter = false;
    this.editorialGroups = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.editorialPublic = true;
    this.editorialColumns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ListItem('GROUP', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_DISPLAYNAME)];
    this.imageData = null;
    this.imageFile = null;
    this.STEP_NEW = 'NEW';
    this.STEP_GENERAL = 'GENERAL';
    this.STEP_METADATA = 'METADATA';
    this.STEP_PERMISSIONS = 'PERMISSIONS';
    this.STEP_SETTINGS = 'SETTINGS';
    this.STEP_EDITORIAL_GROUPS = 'EDITORIAL_GROUPS';
    this.STEP_ICONS = {
      GENERAL: 'edit',
      METADATA: 'info_outline',
      PERMISSIONS: 'group_add',
      SETTINGS: 'settings',
      EDITORIAL_GROUPS: 'star'
    };
    this.newCollectionStep = this.STEP_NEW;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_18__.Subject();
    this.loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed
    });
    this.authorFreetext = false;
    this.authorFreetextAllowed = false;
    this.editorialGroupsSelected = [];
    this.eventService.addListener(this, this.destroyed);
    this.translations.waitForInit().subscribe(() => {
      this.connector.isLoggedIn().subscribe(data => {
        this.mdsService.getSets().subscribe(mdsSets => {
          const sets = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationHelper.filterValidMds(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY, mdsSets.metadatasets, this.configService);
          this.mdsSet = sets[0]?.id;
          this.COLORS = this.configLegacy.instant('collections.colors', this.DEFAULT_COLORS);
          if (data.statusCode != _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
            this.toast.error({
              message: 'loginData.statusCode was not ok',
              data
            }, 'TOOLPERMISSION_ERROR');
            _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.getCommonParameters(this.route).subscribe(params => {
              this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIConstants.ROUTER_PREFIX + 'collections'], {
                queryParams: params
              });
            });
            return;
          }
          this.canInvite = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE);
          this.shareToAll = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES);
          this.createEditorial = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_EDITORIAL);
          this.createCurriculum = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_CURRICULUM);
          this.mediacenterService.getMediacenters().subscribe(mediacenters => {
            this.createMediacenter = mediacenters.filter(m => m.administrationAccess).length === 1 && this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE);
            if (this.createMediacenter) this.mediacenter = mediacenters[0];
          });
          this.authorFreetextAllowed = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_CHANGE_OWNER);
          this.iamService.getCurrentUserAsync().then(user => this.user = user.person);
          this.route.queryParams.subscribe(queryParams => {
            this.mainnav = queryParams.mainnav !== 'false';
            this.route.params.subscribe(params => {
              // get mode from route and validate input data
              let mode = params['mode'];
              let id = params['id'];
              if (queryParams.collection) {
                this.setParent(id, null);
                this.setCollection(JSON.parse(queryParams.collection)).subscribe(() => {
                  this.updateAvailableSteps();
                  this.isLoading = false;
                  if (!this.loadingTask.isDone) {
                    this.loadingTask.done();
                  }
                });
              } else if (mode == 'edit') {
                this.collectionService.getCollection(id).subscribe(data => {
                  this.nodeService.getNodeMetadata(id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).subscribe(node => {
                    this.setCollection(node.node).subscribe(() => {
                      this.updateAvailableSteps();
                      this.updateImageOptions();
                      this.isLoading = false;
                      if (!this.loadingTask.isDone) {
                        this.loadingTask.done();
                      }
                    });
                  });
                });
              } else {
                if (id == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT) {
                  this.setParent(id, null);
                  return;
                }
                this.collectionService.getCollection(id).subscribe(data => {
                  this.setParent(id, data.collection);
                }, error => {
                  this.setParent(id, null);
                });
              }
            });
          });
          if (this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH) || this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE)) {
            this.editorialGroups.isLoading = true;
            this.iamService.searchGroups('*', true, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_TYPE_EDITORIAL, '', {
              count: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COUNT_UNLIMITED,
              sortBy: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_PROP_AUTHORITY_DISPLAYNAME],
              sortAscending: [true]
            }).subscribe(data => {
              this.editorialGroups.setData(data.groups, data.pagination);
              this.editorialGroups.isLoading = false;
            });
          }
        });
      });
    });
  }
  ngOnInit() {
    this.mainNav.setMainNavConfig({
      title: 'COLLECTIONS.TITLE',
      currentScope: 'collections',
      additionalScope: 'edit'
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  getShareStatus() {
    if (this.permissions || this.originalPermissions) {
      let perms = this.permissions || this.originalPermissions;
      let type = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
      if (perms && perms.permissions) {
        for (let perm of perms.permissions) {
          if (perm.authority.authorityName != this.user.authorityName) {
            type = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM;
          }
          if (perm.authority.authorityName == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE) {
            type = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL;
            break;
          }
        }
      }
      return type;
    } else {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
    }
  }
  saveCollection() {
    this.collectionService.updateCollection(this.currentCollection).subscribe(() => {
      this.navigateToCollectionId(this.currentCollection.ref.id);
    }, error => {
      this.nodeHelper.handleNodeError(this.currentCollection.title, error);
      //this.toast.error(error)
    });
  }

  setPermissions(permissions) {
    if (permissions) {
      this.permissionsInfo = permissions;
      this.permissions = permissions.permissions;
      this.permissions.inherited = false;
      if (this.permissions.permissions && this.permissions.permissions.length) {
        this.currentCollection.collection.scope = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM;
        for (let permission of this.permissions.permissions) {
          if (!permission.hasOwnProperty('editable')) {
            permission.editable = true;
          }
        }
      }
    }
  }
  editPermissions() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.permissions == null && !_this.editId) {
        _this.permissions = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.LocalPermissions();
      }
      let nodes;
      if (_this.editId) {
        nodes = [_this.editId];
      } else {
        const permissionsDummy = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Node();
        permissionsDummy.title = _this.currentCollection.title;
        permissionsDummy.iconURL = _this.connector.getThemeMimeIconSvg('collection.svg');
        permissionsDummy.ref = {};
        permissionsDummy.aspects = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_COLLECTION];
        permissionsDummy.properties = {};
        permissionsDummy.isDirectory = true;
        nodes = [permissionsDummy];
      }
      const dialogRef = yield _this.dialogs.openShareDialog({
        nodes,
        sendMessages: true,
        sendToApi: false,
        currentPermissions: _this.permissions
      });
      dialogRef.afterClosed().subscribe(result => _this.setPermissions(result));
    })();
  }
  isNewCollection() {
    return this.editId == null;
  }
  isEditCollection() {
    return !this.isNewCollection();
  }
  newCollectionCancel() {
    let id = this.parentId;
    if (id == null) id = this.editId;
    this.navigateToCollectionId(id);
  }
  setColor(color) {
    this.currentCollection.collection.color = color;
  }
  setColorByDirection(event) {
    const rowLength = 6;
    let index = this.COLORS.indexOf(this.currentCollection.collection.color);
    switch (event.key) {
      case 'ArrowUp':
        index -= rowLength;
        break;
      case 'ArrowDown':
        index += rowLength;
        break;
      case 'ArrowLeft':
        index -= 1;
        break;
      case 'ArrowRight':
        index += 1;
        break;
    }
    if (index >= 0 && index < this.COLORS.length) {
      this.setColor(this.COLORS[index]);
      event.preventDefault();
    }
  }
  imageDataChanged(event) {
    // get files and check if available
    let files = event.target.files;
    if (typeof files == 'undefined') {
      return;
    }
    if (files.length <= 0) {
      return;
    }
    // get first file
    let file = files[0];
    // check if file type is correct
    let validType = false;
    if (file.type.startsWith('image')) validType = true;
    //if (file.type=="image/jpeg") validType = true;
    //if (file.type=="image/gif") validType = true;
    if (!validType) {
      return;
    }
    // remember file for upload
    this.imageFile = file;
    this.imageData = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.updateImageOptions();
  }
  handleError(error) {
    if (error.status == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.DUPLICATE_NODE_RESPONSE) {
      this.toast.error(null, 'COLLECTIONS.TOAST.DUPLICATE_NAME');
      return;
    }
    if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMessageContains(error, 'Invalid property value')) {
      this.toast.error(null, 'COLLECTIONS.TOAST.INVALID_NAME');
      return;
    }
    this.toast.error(error);
  }
  save() {
    // input data optimize
    if (!this.currentCollection.collection.description) this.currentCollection.collection.description = '';
    this.currentCollection.title = this.currentCollection.title.trim();
    this.currentCollection.collection.description = this.currentCollection.collection.description.trim();
    if (this.newCollectionType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL || this.newCollectionType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER) {
      this.currentCollection.collection.type = this.newCollectionType;
    } else {
      this.currentCollection.collection.type = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_DEFAULT;
    }
    if (this.isEditCollection()) {
      /*
       *  EDIT
       */
      this.isLoading = true;
      this.collectionService.updateCollection(this.currentCollection).subscribe(() => {
        this.save2(this.currentCollection);
      }, error => {
        this.isLoading = false;
        this.handleError(error);
      });
    } else {
      /*
       *  CREATE
       */
      this.isLoading = true;
      this.collectionService.createCollection(this.currentCollection, this.parentId).subscribe(collection => {
        this.save2(collection.collection);
      }, error => {
        this.isLoading = false;
        this.handleError(error);
      });
    }
  }
  saveImage(collection) {
    if (this.imageData != null) {
      this.collectionService.uploadCollectionImage(collection.ref.id, this.imageFile, 'image/png').subscribe(() => {
        this.navigateToCollectionId(collection.ref.id);
      }, error => {
        this.toast.error(null, 'COLLECTIONS.TOAST.ERROR_IMAGE_APPLY');
        this.navigateToCollectionId(collection.ref.id);
      });
    } else if (collection.preview == null) {
      this.collectionService.deleteCollectionImage(collection.ref.id).subscribe(() => {
        this.navigateToCollectionId(collection.ref.id);
      });
    } else {
      this.navigateToCollectionId(collection.ref.id);
    }
  }
  setCollectionType(type) {
    this.newCollectionType = type;
    if (type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY) {
      this.currentCollection.collection.scope = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
    }
    if (type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL) {
      this.currentCollection.collection.scope = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL;
    }
    if (type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM || type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL) {
      this.currentCollection.collection.scope = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM;
    }
    if (type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER) {
      this.switchToAuthorFreetext();
    }
    this.updateAvailableSteps();
    this.goToNextStep();
  }
  getAvailableSteps() {
    let steps = [];
    steps.push(this.STEP_GENERAL);
    if (this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL || this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER) {
      steps.push(this.STEP_METADATA);
    }
    if (this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM && this.canInvite) {
      steps.push(this.STEP_PERMISSIONS);
    }
    if (this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL) {
      //steps.push(this.STEP_SETTINGS);
    }
    if (this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL && this.canInvite) {
      steps.push(this.STEP_EDITORIAL_GROUPS);
    }
    return steps;
  }
  isLastStep() {
    let pos = this.currentStepPosition();
    return pos >= this.availableSteps.length - 1;
  }
  goToNextStep() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.newCollectionStep == _this2.STEP_GENERAL) {
        if (!_this2.currentCollection.title) {
          _this2.toast.error(null, 'COLLECTIONS.ENTER_NAME');
          return;
        }
      }
      if (_this2.newCollectionStep == _this2.STEP_METADATA) {
        const props = yield _this2.mds.getValues();
        if (props == null) {
          return;
        }
        _this2.properties = props;
      }
      if (_this2.isLastStep()) {
        _this2.save();
      } else {
        const pos = _this2.currentStepPosition();
        _this2.newCollectionStep = _this2.availableSteps[pos + 1];
        // support for legacy mds
        setTimeout(() => {
          _this2.mds?.loadMds(true);
        });
        if (_this2.newCollectionStep == _this2.STEP_EDITORIAL_GROUPS) {
          setTimeout(() => {
            _this2.editorialGroupsSelected = _this2.getEditoralGroups(_this2.originalPermissions.permissions);
            _this2.organizationsRef.getSelection().select(..._this2.editorialGroupsSelected);
            _this2.organizationsRef.getSelection().changed.subscribe(change => _this2.editorialGroupsSelected = change.source.selected);
          });
        }
      }
      _this2.updateButtons();
    })();
  }
  setCollectionGeneral() {}
  currentStepPosition() {
    return this.availableSteps.indexOf(this.newCollectionStep);
  }
  goBack() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.newCollectionStep == _this3.STEP_METADATA) {
        const props = yield _this3.mds.getValues();
        if (props != null) {
          _this3.properties = props;
        }
      }
      let pos = _this3.currentStepPosition();
      if (pos == -1) {
        _this3.navigateToCollectionId(_this3.parentId);
      } else if (pos == 0) {
        if (_this3.editId) {
          _this3.navigateToCollectionId(_this3.editId);
        } else if (_this3.parentCollection && _this3.parentCollection.collection.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL) {
          _this3.navigateToCollectionId(_this3.parentId);
        } else {
          _this3.newCollectionStep = _this3.STEP_NEW;
        }
      } else {
        _this3.newCollectionStep = _this3.availableSteps[pos - 1];
        // support for legacy mds
        setTimeout(() => {
          _this3.mds?.loadMds(true);
        });
      }
      _this3.updateButtons();
    })();
  }
  navigateToCollectionId(id) {
    this.isLoading = false;
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      if (id !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT) {
        params.id = id;
      }
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIConstants.ROUTER_PREFIX + 'collections'], {
        queryParams: params
      });
    });
  }
  save2(collection) {
    if (this.newCollectionType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL || this.newCollectionType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER) {
      this.nodeService.AddNodeAspects(collection.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_LOMREPLICATION, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_CCLOM_GENERAL]).subscribe(() => {
        this.nodeService.editNodeMetadata(collection.ref.id, this.properties).subscribe(() => {
          this.save3(collection);
        });
      });
    } else {
      this.save3(collection);
    }
  }
  isBrightColor() {
    return ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ColorHelper.getPreferredColor(this.currentCollection.collection.color) === ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.PreferredColor.White;
  }
  save3(collection) {
    if (this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_TYPE_EDITORIAL) {
      // user has access to editorial group but can't invite (strange setting but may happens)
      if (!this.canInvite) {
        this.save4(collection);
        return;
      }
      this.permissions = this.getEditorialGroupPermissions();
    }
    if ((this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM || this.newCollectionType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_TYPE_EDITORIAL) && this.permissions && this.permissions.permissions) {
      if (this.originalPermissions && this.originalPermissions.inherited) {}
      let permissions = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyAndCleanPermissions(this.permissions.permissions, this.originalPermissions ? this.originalPermissions.inherited : false);
      this.nodeService.setNodePermissions(collection.ref.id, permissions, this.permissionsInfo ? this.permissionsInfo.notify : false, this.permissionsInfo ? this.permissionsInfo.notifyMessage : null).subscribe(() => {
        this.save4(collection);
      }, error => {
        this.toast.error(error);
        this.isLoading = false;
      });
    } else {
      this.save4(collection);
    }
  }
  getTypeForCollection(collection) {
    if (collection.collection.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL || collection.collection.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER) {
      return collection.collection.type;
    }
    if (collection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY && !this.canInvite) {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
    }
    if (collection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY || collection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ORGA || collection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL || collection.collection.scope === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM_PUBLIC) {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_CUSTOM;
    }
    return collection.collection.scope;
  }
  updateAvailableSteps() {
    this.availableSteps = this.getAvailableSteps();
    this.updateButtons();
  }
  getEditorialGroupPermissions() {
    const permissions = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.LocalPermissions();
    permissions.permissions = [];
    if (this.editorialPublic) {
      const pub = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.getAllAuthoritiesPermission();
      pub.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER];
      permissions.permissions.push(pub);
    }
    for (const group of this.editorialGroupsSelected) {
      const perm = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
      perm.authority = {
        authorityName: group.authorityName,
        authorityType: group.authorityType
      };
      perm.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_COORDINATOR];
      permissions.permissions.push(perm);
    }
    return permissions;
  }
  getEditoralGroups(permissions) {
    let list = [];
    for (let perm of permissions) {
      for (let group of this.editorialGroups.getData()) {
        if (group.authorityName == perm.authority.authorityName) {
          list.push(group);
        }
      }
    }
    return list;
  }
  setParent(id, parent) {
    this.parentId = id;
    this.parentCollection = parent;
    this.currentCollection = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Node();
    this.currentCollection.title = '';
    this.currentCollection.collection = {
      description: '',
      color: this.COLORS[0]
    };
    if (this.parentCollection && this.parentCollection.collection.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL) {
      if (!this.createEditorial || !this.shareToAll) {
        this.toast.error(this.createEditorial ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_EDITORIAL, 'TOOLPERMISSION_ERROR');
        window.history.back();
        this.isLoading = false;
        return;
      }
      this.setCollectionType(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_EDITORIAL);
    }
    this.updateAvailableSteps();
    this.updateImageOptions();
    this.isLoading = false;
    if (!this.loadingTask.isDone) {
      this.loadingTask.done();
    }
  }
  save4(collection) {
    // check if there are any nodes that should be added to this collection
    const add = this.temporaryStorage.pop(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService.COLLECTION_ADD_NODES);
    if (!add) {
      this.saveImage(collection);
      return;
    }
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.addToCollection(this.nodeHelper, this.collectionService, this.router, this.bridge, collection, add.nodes, false, references => {
      this.saveImage(collection);
      add.callback?.emit({
        collection,
        references
      });
      return;
    });
  }
  deleteImage() {
    this.imageData = null;
    this.imageFile = null;
    this.imageFileRef.nativeElement.value = null;
    this.currentCollection.preview = null;
    this.updateImageOptions();
  }
  updateButtons() {
    /**
     *  <a class="waves-effect btn" tabindex="0" (keyup.enter)="setCollectionGeneral()" (click)="setCollectionGeneral()">
     <span>{{(isLastStep() ? 'SAVE' : 'NEXT') | translate }}</span>
     </a>
     <a class="waves-effect waves-light btn-flat" tabindex="0" (keyup.enter)="goBack()" (click)="goBack()">{{ 'BACK' | translate }}</a>
      */
    this.buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('BACK', {
      color: 'standard'
    }, () => this.goBack()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton(this.isLastStep() ? 'SAVE' : 'NEXT', {
      color: 'primary'
    }, () => this.goToNextStep())];
  }
  switchToAuthorFreetext() {
    this.authorFreetextAllowed = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_CHANGE_OWNER);
    this.authorFreetext = true;
    this.currentCollection.collection.authorFreetext = new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_3__.AuthorityNamePipe(this.translationService).transform(this.newCollectionType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER || this.currentCollection.collection.type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONTYPE_MEDIA_CENTER ? this.mediacenter : this.user, null);
    setTimeout(() => {
      this.authorFreetextInput.nativeElement.focus();
    });
  }
  cancelAuthorFreetext() {
    this.authorFreetext = false;
    this.currentCollection.collection.authorFreetext = null;
  }
  updateImageOptions() {
    this.imageOptions = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('COLLECTIONS.NEW.IMAGE.SEARCH', 'search', () => {
      this.imageWindow = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.openSearchWithReurl(this.platformLocation, this.router, 'WINDOW', {
        queryParams: {
          reurlCreate: false,
          reurlTypes: ['image']
        }
      });
      /*this.route
      r.navigate([], {
              relativeTo: this.route,
              queryParams: {
                  collection: JSON.stringify(this.currentCollection)
              }
          }).then(() => {
          });*/
    }), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('COLLECTIONS.NEW.IMAGE.UPLOAD', 'file_upload', () => this.imageFileRef.nativeElement.click())];
    this.imageOptions[0].group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.Edit;
    this.imageOptions[1].group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.Edit;
    if (this.imageData || this.currentCollection.preview && !this.currentCollection.preview.isIcon) {
      this.imageOptions.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('COLLECTIONS.NEW.IMAGE.DELETE', 'delete', () => this.deleteImage()));
      this.imageOptions[2].group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.Delete;
    }
  }
  static #_ = this.ɵfac = function CollectionNewComponent_Factory(t) {
    return new (t || CollectionNewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_4__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMediacenterService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_19__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_20__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_6__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_22__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_7__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_8__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_9__.DialogsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
    type: CollectionNewComponent,
    selectors: [["es-collection-new"]],
    viewQuery: function CollectionNewComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c3, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.mds = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.organizationsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.imageFileRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.authorFreetextInput = _t.first);
      }
    },
    hostBindings: function CollectionNewComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keydown", function CollectionNewComponent_keydown_HostBindingHandler($event) {
          return ctx.handleKeyboardEvent($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresolveDocument"]);
      }
    },
    decls: 3,
    vars: 4,
    consts: [["role", "main", "esSkipTarget", "MAIN_CONTENT", 1, "collections-master-div"], [4, "ngIf"], ["class", "createContainer", 4, "ngIf"], [1, "createContainer"], ["class", "createProgress", 4, "ngIf"], ["class", "collection-new-container", "width", "normal", "height", "auto", "modal", "auto", 3, "title", "onCancel", 4, "ngIf"], ["modal", "auto", "width", "xsmall", "height", "auto", 3, "buttons", "isCancelable", "title", "subtitle", "onCancel", 4, "ngIf"], ["modal", "auto", "width", "large", "height", "xlarge", "class", "collection-metadata", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel", 4, "ngIf"], ["modal", "auto", "width", "large", "height", "xxlarge", "class", "collection-metadata", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel", 4, "ngIf"], ["modal", "auto", "width", "normal", "height", "large", "class", "collection-permission-container", 3, "title", "isCancelable", "buttons", "subtitle", "onCancel", 4, "ngIf"], [1, "createProgress"], [3, "current", "finished", "click", 4, "ngFor", "ngForOf"], [1, "finish"], [1, "circle"], [1, "label"], [3, "click"], [3, "esIcon"], [1, "connection"], ["width", "normal", "height", "auto", "modal", "auto", 1, "collection-new-container", 3, "title", "onCancel"], [1, "createCollection", "collectionShadow"], ["mat-button", "", "data-test", "create-private-collection-button", 1, "collection-item", "clickable", 3, "click"], [1, "iconLeft"], ["esIcon", "lock", 2, "color", "#995b5b"], [1, "content"], [1, "title"], [1, "description"], ["esIcon", "keyboard_arrow_right", 1, "next"], ["mat-button", "", "class", "collection-item clickable", 3, "click", 4, "ngIf"], ["class", "group", 4, "ngIf"], ["mat-button", "", 1, "collection-item", "clickable", 3, "click"], ["esIcon", "group", 2, "color", "#4f7899"], ["esIcon", "public", 2, "color", "#5c998f"], [1, "group"], ["esIcon", "star", 2, "color", "#e9b42a"], ["esIcon", "business", 2, "color", "#4e4b99"], ["modal", "auto", "width", "xsmall", "height", "auto", 3, "buttons", "isCancelable", "title", "subtitle", "onCancel"], [1, "collection-general"], [1, "collectionImage"], [1, "image-upload-field"], ["type", "file", "accept", "image/*", "name", "userFile", 1, "image-upload-field-input", 3, "change"], ["file", ""], [1, "button-icon"], ["appearance", "round", 3, "options", "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile"], ["class", "card-collection-icon-container", 3, "keyup.enter", "click", 4, "ngIf"], ["class", "card-collection-image-container", 3, "keyup.enter", "click", 4, "ngIf"], [1, "collection-new-preview-infoarea"], [1, "collection-new-bg"], [1, "dialog-basic-area", "dialog-input-area"], ["matInput", "", "autofocus", "", "autocomplete", "off", "data-test", "new-collection-name-input", 1, "title", 3, "ngModel", "ngModelChange"], ["matInput", "", 3, "ngModel", "ngModelChange"], [1, "collection-new-owner"], [1, "dialog-basic-area", "dialog-color-group"], ["id", "collection-new-color-picker-label", 1, "collection-new-preview-infoline"], ["aria-labelledby", "collection-new-color-picker-label", "tabindex", "0", "role", "listbox", "aria-orientation", "horizontal", "cdkMonitorElementFocus", "", 1, "color-group", 3, "keydown.arrowright", "keydown.arrowup", "keydown.arrowleft", "keydown.arrowdown"], ["role", "option", "class", "color-option", 3, "id", "ngClass", "background-color", "click", 4, "ngFor", "ngForOf"], [1, "card-collection-icon-container", 3, "keyup.enter", "click"], [1, "card-image-distance"], [1, "card-image-icon-container"], ["esIcon", "layers"], [1, "blurred-image", 3, "src"], [1, "card-image-preview", 3, "src"], [1, "card-collection-image-container", 3, "keyup.enter", "click"], [1, "card-image-container"], ["esIcon", "person"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 3, "click"], ["esIcon", "edit"], [1, "mat-form-field-no-padding"], ["id", "collection-new-author-freetext-label"], ["matInput", "", 3, "disabled", "ngModel", "ngModelChange"], ["authorFreetextInput", ""], ["mat-icon-button", "", "aria-describedby", "collection-new-author-freetext-label", 3, "click"], ["esIcon", "close"], ["role", "option", 1, "color-option", 3, "id", "ngClass", "click"], [1, "cdk-visually-hidden"], ["modal", "auto", "width", "large", "height", "xlarge", 1, "collection-metadata", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel"], [1, "card-content"], [3, "groupId", "setId", "editorMode", "embedded", "currentValues"], ["mds", ""], ["modal", "auto", "width", "large", "height", "xxlarge", 1, "collection-metadata", 3, "title", "subtitle", "isCancelable", "buttons", "onCancel"], [1, "editorial-group"], [1, "editorial-list"], ["class", "noPermission", 4, "ngIf"], [3, "dataSource", "displayType", "columns", "sort", "elementInteractionType", "clickItem"], ["organizations", ""], ["empty", ""], [1, "editorial-public"], ["color", "primary", 3, "ngModel", "ngModelChange"], ["slot", "label"], ["slot", "description"], [1, "noPermission"], [1, "noGroups"], ["modal", "auto", "width", "normal", "height", "large", 1, "collection-permission-container", 3, "title", "isCancelable", "buttons", "subtitle", "onCancel"], [1, "dialog-basic-area", "permissionsBtn"], ["mat-raised-button", "", 3, "click"], ["esIcon", "person_add"], [1, "status"]],
    template: function CollectionNewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, CollectionNewComponent_es_global_progress_1_Template, 1, 0, "es-global-progress", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, CollectionNewComponent_div_2_Template, 7, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("collections-master-div-mainnav", ctx.mainnav);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.isLoading);
      }
    },
    dependencies: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_24__.CdkMonitorFocus, _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_10__.CardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__.GlobalProgressComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_27__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_27__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_28__.MatInput, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_29__.MatSlideToggle, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_12__.MultiLineLabelComponent, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_13__.SkipTargetDirective, _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_14__.MdsEditorWrapperComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_3__.AuthorityNamePipe, _angular_common__WEBPACK_IMPORTED_MODULE_20__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeImagePipe],
    styles: ["\n\n.createContainer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 20px;\n  top: 20%;\n  color: var(--textLight);\n  cursor: default;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n  align-items: center;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .connection[_ngcontent-%COMP%] {\n  height: 25px;\n  width: 3px;\n  background-image: url('vendor/edu-sharing/dashed-line.svg');\n  position: absolute;\n  left: 9px;\n  top: 20px;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finished[_ngcontent-%COMP%] {\n  color: var(--primary);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finished[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n  background-image: url('vendor/edu-sharing/checked-circle.svg');\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finished[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finished[_ngcontent-%COMP%]   .connection[_ngcontent-%COMP%] {\n  background-image: url('vendor/edu-sharing/line.svg');\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.current[_ngcontent-%COMP%] {\n  color: var(--palette-foreground-text);\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.current[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n  background-image: url('vendor/edu-sharing/active-circle.svg');\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.current[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finish[_ngcontent-%COMP%] {\n  color: #40bf8e;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finish[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n  background-image: url('vendor/edu-sharing/finish.svg');\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div.finish[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%], .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: flex;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  position: relative;\n}\n.createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  border-radius: 50%;\n  width: 21px;\n  height: 21px;\n  background-image: url('vendor/edu-sharing/dashed-circle.svg');\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\n\n.collections-master-div[_ngcontent-%COMP%] {\n  min-height: 100%;\n  margin: auto;\n  max-width: 600px;\n  display: flex;\n  align-items: center;\n  padding-top: var(--mainnavHeight);\n}\n\n[_nghost-%COMP%]     .createCollection .collection-item.cdk-keyboard-focused {\n  outline-offset: -4px;\n}\n[_nghost-%COMP%]     .createCollection .collection-item > .mdc-button__label {\n  width: 100%;\n  justify-content: flex-start;\n  text-transform: none;\n  padding-right: 15px;\n}\n\n.createCollection[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n.createCollection[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%] {\n  font-size: 110%;\n  padding: 20px 20px;\n  margin: 0;\n  margin-bottom: 10px;\n  cursor: default;\n  -webkit-user-select: none;\n          user-select: none;\n  background-color: #eee;\n}\n.createCollection[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  float: right;\n}\n.createCollection[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%] {\n  padding-top: 5px;\n  margin-top: 5px;\n  border-top: 1px solid #ccc;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]:hover {\n  background-color: #f7f7f7;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%] {\n  height: unset;\n  padding: 10px 5px;\n  width: 100%;\n  border-radius: 0;\n  line-height: 2em;\n  white-space: normal;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: bold;\n  margin-bottom: 3px;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  text-align: left;\n  flex-grow: 1;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .iconLeft[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  padding-right: 15px;\n  padding-left: 20px;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .iconLeft[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: flex;\n  background-color: #fff;\n  width: 50px;\n  height: 50px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   .next[_ngcontent-%COMP%] {\n  color: var(--primary);\n  vertical-align: middle;\n  padding-right: 15px;\n}\n.createCollection[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: relative;\n  top: 3px;\n}\n\n.collection-permission-container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 140%;\n  font-weight: bold;\n  padding-bottom: 20px;\n}\n.collection-permission-container[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 110%;\n  padding-bottom: 20px;\n}\n.collection-permission-container[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  margin: -25px;\n  margin-top: 20px;\n  padding: 6px 20px;\n  background: #eee;\n}\n\n.collection-general[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.collection-general[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  height: 6rem;\n  resize: none;\n}\n.collection-general[_ngcontent-%COMP%]   .dialog-input-area[_ngcontent-%COMP%] {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.collection-general[_ngcontent-%COMP%]   .collection-new-owner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0 25px;\n}\n.collection-general[_ngcontent-%COMP%]   .collection-new-owner[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  margin: 5px;\n}\n.collection-general[_ngcontent-%COMP%]   .collection-new-owner[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.collection-general[_ngcontent-%COMP%]   .color-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  margin: auto;\n  justify-content: center;\n}\n.collection-general[_ngcontent-%COMP%]   .color-group[_ngcontent-%COMP%]:focus {\n  outline: unset;\n}\n.collection-general[_ngcontent-%COMP%]   .color-group.cdk-keyboard-focused[_ngcontent-%COMP%] {\n  outline: none;\n  outline: var(--focusWidth) solid var(--palette-primary-300);\n  outline-offset: 2px;\n}\n.collection-general[_ngcontent-%COMP%]   .color-group[_ngcontent-%COMP%]   .color-option[_ngcontent-%COMP%] {\n  display: inline-block;\n  border-radius: 4pt;\n  width: 14%;\n  height: 30px;\n  margin: 4px 3px;\n  cursor: pointer;\n}\n.collection-general[_ngcontent-%COMP%]   .color-group[_ngcontent-%COMP%]   .color-selected[_ngcontent-%COMP%] {\n  border: 2px solid #333;\n}\n\n.collection-metadata[_ngcontent-%COMP%]   .noGroups[_ngcontent-%COMP%] {\n  padding-top: 15px;\n  font-size: 120%;\n  color: var(--textLight);\n  text-align: center;\n}\n.collection-metadata[_ngcontent-%COMP%]   .noPermission[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  text-align: center;\n}\n.collection-metadata[_ngcontent-%COMP%]   .noPermission[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 120%;\n}\n.collection-metadata[_ngcontent-%COMP%]   .noPermission[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 100%;\n}\n\n.groupLabel[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.collection1[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .collection1[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:focus {\n  color: #eee !important;\n}\n\n.permissionsBtn[_ngcontent-%COMP%] {\n  margin-left: 32px;\n}\n\n.permissionsBtn[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  float: none;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-size: 120%;\n}\n\n.collectionShadow[_ngcontent-%COMP%] {\n  box-shadow: 0 10px 70px rgba(0, 0, 0, 0.15);\n}\n\n.collectionImage[_ngcontent-%COMP%] {\n  position: relative;\n  height: 240px;\n  background-color: white;\n  overflow: hidden;\n}\n\n.collection-new-preview-infoarea[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 120px;\n  padding: 16px;\n  color: #fff;\n  transition: var(--transitionNormal) all;\n}\n.collection-new-preview-infoarea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-input-placeholder {\n  color: #ccc;\n}\n.collection-new-preview-infoarea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:-moz-placeholder {\n  color: #ccc;\n}\n.collection-new-preview-infoarea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-moz-placeholder {\n  color: #ccc;\n}\n.collection-new-preview-infoarea[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:-ms-input-placeholder {\n  color: #ccc;\n}\n.collection-new-preview-infoarea[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .collection-new-preview-infoarea[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n\n.collection-new-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: calc(100% - 150px);\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.15);\n}\n\n.dark-color[_ngcontent-%COMP%] {\n  color: #000;\n}\n.dark-color[_ngcontent-%COMP%]   .collection-new-bg[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.15);\n}\n.dark-color[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-input-placeholder {\n  color: #333;\n}\n.dark-color[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:-moz-placeholder {\n  color: #333;\n}\n.dark-color[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-moz-placeholder {\n  color: #333;\n}\n.dark-color[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:-ms-input-placeholder {\n  color: #333;\n}\n\n.collection-new-preview-headline[_ngcontent-%COMP%] {\n  font-size: 200%;\n}\n\n.collection-new-preview-subline[_ngcontent-%COMP%] {\n  font-size: 120%;\n  margin-bottom: 16px;\n  opacity: 0.85;\n}\n\n.collection-new-preview-infoline[_ngcontent-%COMP%] {\n  opacity: 0.75;\n  margin-bottom: 10px;\n}\n\n.collection-nocontent-big[_ngcontent-%COMP%] {\n  font-size: 200%;\n  padding: 16px;\n  padding-top: 8px;\n  padding-left: 0px;\n}\n\n.collection-nocontent-small[_ngcontent-%COMP%] {\n  padding: 16px;\n  padding-top: 0px;\n  padding-left: 0px;\n}\n\n.collections-loading-div[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20%;\n  text-align: center;\n}\n\n.icon-bottom[_ngcontent-%COMP%] {\n  vertical-align: bottom;\n}\n\n.dialog-basic-area[_ngcontent-%COMP%] {\n  padding: 25px;\n  padding-bottom: 15px;\n}\n\n.dialog-dark-area[_ngcontent-%COMP%] {\n  padding: 16px;\n  padding-bottom: 8px;\n  background: #efefef;\n}\n\n.button-area[_ngcontent-%COMP%] {\n  text-align: right;\n  height: 74px;\n}\n\n.button-area[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  float: right;\n  margin: 5px;\n}\n\n.dialog-input[_ngcontent-%COMP%] {\n  width: 90%;\n  height: 25px;\n  padding: 4px 4px 4px 10px;\n  margin-top: 5px;\n  font-size: 14px;\n}\n\n.dialog-input-textarea[_ngcontent-%COMP%] {\n  width: 90%;\n  border-color: lightgray;\n  padding: 4px 4px 4px 10px;\n  font-size: 14px;\n  resize: vertical;\n  height: 70px;\n  max-height: 200px;\n  margin-top: 5px;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n\n.card-collection-icon-container[_ngcontent-%COMP%] {\n  text-align: center;\n  vertical-align: middle;\n  width: 100%;\n  height: 240px;\n  background-color: white;\n  color: white;\n  cursor: pointer;\n}\n\n.card-image-distance[_ngcontent-%COMP%] {\n  height: 35px;\n}\n\n.card-image-icon-container[_ngcontent-%COMP%] {\n  height: 160px;\n  width: 160px;\n  border-radius: 160px;\n  background-color: darkgray;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-image-icon-container[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 75px;\n}\n\n.card-collection-image-container[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  text-align: center;\n  background-color: white;\n  vertical-align: middle;\n}\n\n.card-image-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-top: auto;\n  margin-bottom: auto;\n  vertical-align: middle;\n}\n\n.card-image-preview[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 240px;\n  object-fit: contain;\n  position: relative;\n  z-index: 1;\n}\n\n.image-upload-field[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: transparent;\n  height: 0px;\n  position: relative;\n  top: 0px;\n  left: 0px;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 999;\n}\n\n.image-upload-field-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.button-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 15px;\n  right: 10px;\n  z-index: 2;\n}\n.button-icon[_ngcontent-%COMP%]   .mat-fab[_ngcontent-%COMP%] {\n  margin: 0 5px;\n}\n\ninput[type=radio][_ngcontent-%COMP%] {\n  margin: 0px 4px 8px 13px;\n  cursor: pointer;\n}\n\n.dialog-color-group[_ngcontent-%COMP%] {\n  min-height: 140px;\n}\n\n.dialog-header-field[_ngcontent-%COMP%] {\n  background-color: #383838;\n  padding: 8px 0px 8px 20px;\n  color: #ffffff;\n}\n\n.editorial-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.editorial-group[_ngcontent-%COMP%]   .editorial-list[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow-y: auto;\n}\n.editorial-group[_ngcontent-%COMP%]   .editorial-public[_ngcontent-%COMP%] {\n  padding: 25px 25px 20px 25px;\n  background-color: #f9f9f9;\n}\n.editorial-group[_ngcontent-%COMP%]   .editorial-public[_ngcontent-%COMP%]     .mat-slide-toggle {\n  height: auto;\n}\n\n@media screen and (max-width: 1000px) {\n  .card-high[_ngcontent-%COMP%] {\n    top: 15%;\n  }\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%] {\n    position: fixed;\n    display: flex;\n    top: calc(var(--mainnavHeight) + 40px);\n    width: 100vw;\n    left: 0;\n    justify-content: center;\n  }\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%] {\n    background-size: 60%;\n  }\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .connection[_ngcontent-%COMP%] {\n    height: 20px;\n    left: 25px;\n    top: 1px;\n    transform: rotate(90deg);\n  }\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%], .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    display: flex;\n    position: fixed;\n    left: 0;\n    top: calc(var(--mainnavHeight) + 20px);\n    width: 100vw;\n    justify-content: center;\n  }\n}\n@media screen and (max-height: 950px) {\n  .card[_ngcontent-%COMP%], .card-high[_ngcontent-%COMP%], .card-low[_ngcontent-%COMP%] {\n    top: calc(var(--mainnavHeight) + 15px);\n  }\n  .collectionImage[_ngcontent-%COMP%] {\n    height: 120px;\n  }\n  .card-collection-icon-container[_ngcontent-%COMP%] {\n    height: 120px;\n  }\n  .card-image-icon-container[_ngcontent-%COMP%] {\n    margin-top: 10px;\n    height: 100px;\n    width: 100px;\n    border-radius: 100px;\n  }\n  .card-image-icon-container[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 60px;\n  }\n  .card-image-distance[_ngcontent-%COMP%] {\n    height: 0;\n  }\n  .blurred-image[_ngcontent-%COMP%] {\n    display: block;\n    filter: blur(8px);\n  }\n  .card-image-preview[_ngcontent-%COMP%] {\n    height: 120px;\n    width: auto;\n    margin: auto;\n    z-index: 1;\n    position: relative;\n    box-shadow: 0 10px 70px rgba(0, 0, 0, 0.15);\n  }\n}\n@media screen and (max-width: 1000px) and (max-height: 950px) {\n  .createContainer[_ngcontent-%COMP%]   .createProgress[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2NvbGxlY3Rpb24tbmV3L2NvbGxlY3Rpb24tbmV3LmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIiwid2VicGFjazovLy4vcHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBREo7QUFFSTtFQUNJLGVBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLHVCRElJO0VFR1IsZUFBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7QUROSjtBQUFRO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBRVo7QUFBUTtFQUNJLFlBQUE7RUFDQSxVQUFBO0VBQ0EsMkRBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0FBRVo7QUFBUTtFQUNJLHFCRTVCRjtFQ0NOLGVBQUE7RUFDQSx5QkFBQTtFQUdBLGlCQUFBO0VBQ0Esd0NBQUE7QUg4Qko7QUFOWTtFQUNJLDhEQUFBO0FBUWhCO0FBTlk7RUFDSSxpQkFBQTtBQVFoQjtBQU5ZO0VBQ0ksb0RBQUE7QUFRaEI7QUFMUTtFQUNJLHFDRWxDRTtBRnlDZDtBQU5ZO0VBQ0ksNkRBQUE7QUFRaEI7QUFOWTtFQUNJLGlCQUFBO0FBUWhCO0FBTFE7RUFJSSxjRG9CVTtBQ2hCdEI7QUFQWTtFQUNJLHNEQUFBO0FBU2hCO0FBTlk7RUFDSSxpQkFBQTtFQUNBLHlCQUFBO0FBUWhCO0FBTFE7Ozs7RUFJSSxhQUFBO0FBT1o7QUFMUTtFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7QUFPWjtBQUxRO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNkRBQUE7RUFDQSw0QkFBQTtFQUNBLDRCQUFBO0FBT1o7O0FBRkE7RUFDSSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlDQUFBO0FBS0o7O0FBQVk7RUFDSSxvQkFBQTtBQUdoQjtBQURZO0VBQ0ksV0FBQTtFQUNBLDJCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtBQUdoQjs7QUFFQTtFQUNJLHNCQUFBO0FBQ0o7QUFBSTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQzNGSixlQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFRDRGSSxzQkRsRGlCO0FDcUR6QjtBQUZRO0VBQ0ksWUFBQTtBQUlaO0FBREk7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtBQUdSO0FBREk7RUFDSSx5QkRqRXNCO0FDb0U5QjtBQURJO0VBQ0ksYUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUdSO0FBRlE7RUFDSSxxQkVySUY7RUZzSUUsaUJBQUE7RUFDQSxrQkFBQTtBQUlaO0FBRlE7RUFDSSx1QkQxSEE7QUM4SFo7QUFGUTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFJWjtBQUZRO0VBQ0ksc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBSVo7QUFIWTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VHdElaLHdDQUFBO0FINElKO0FBRlE7RUFDSSxxQkVqS0Y7RUZrS0Usc0JBQUE7RUFDQSxtQkFBQTtBQUlaO0FBRlE7RUFDSSxrQkFBQTtFQUNBLFFBQUE7QUFJWjs7QUFDSTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FBRVI7QUFBSTtFQUNJLHVCRGxLSTtFQ21LSixlQUFBO0VBQ0Esb0JBQUE7QUFFUjtBQUFJO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkQ1SGlCO0FDOEh6Qjs7QUFFSTtFQUNJLFdBQUE7QUFDUjtBQUFRO0VBQ0ksWUFBQTtFQUNBLFlBQUE7QUFFWjtBQUNJO0VBQ0ksY0FBQTtFQUNBLGlCQUFBO0FBQ1I7QUFDSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDUjtBQUFRO0VBQ0ksV0FBQTtBQUVaO0FBQVE7RUFDSSxZQUFBO0FBRVo7QUFDSTtFQUNJLGFBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUVBLHVCQUFBO0FBQVI7QUFDUTtFQUNJLGNBQUE7QUFDWjtBQUNRO0VHN0tKLGFBQUE7RUFNSSwyREFBQTtFQUNBLG1CQUFBO0FIMEtSO0FBRFE7RUFDSSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQUdaO0FBRFE7RUFDSSxzQkFBQTtBQUdaOztBQUVJO0VBQ0ksaUJBQUE7RUFDQSxlRDFOUztFQzJOVCx1QkRqT0k7RUNrT0osa0JBQUE7QUFDUjtBQUNJO0VBQ0ksdUJEck9JO0VDc09KLGtCQUFBO0FBQ1I7QUFBUTtFQUNJLGVEbE9LO0FDb09qQjtBQUFRO0VBQ0ksZUFBQTtBQUVaOztBQUVBO0VBQ0ksa0JBQUE7QUFDSjs7QUFDQTs7RUFFSSxzQkFBQTtBQUVKOztBQUFBO0VBQ0ksaUJBQUE7QUFHSjs7QUFEQTtFQUNJLFdBQUE7QUFJSjs7QUFGQTtFQUNJLGVBQUE7QUFLSjs7QUFIQTtFQ3JRSSwyQ0FBQTtBRDRRSjs7QUFKQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7QUFPSjs7QUFKQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLHVDQUFBO0FBT0o7QUMxUUk7RURxUUksV0FBQTtBQVFSO0FDMVFJO0VEa1FJLFdBQUE7QUFXUjtBQzFRSTtFRCtQSSxXQUFBO0FBY1I7QUMxUUk7RUQ0UEksV0FBQTtBQWlCUjtBQWZJOztFQUVJLDZCQUFBO0FBaUJSOztBQWRBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLHFDQUFBO0FBaUJKOztBQWZBO0VBQ0ksV0FBQTtBQWtCSjtBQWpCSTtFQUNJLDJDQUFBO0FBbUJSO0FDMVNJO0VEMFJJLFdBQUE7QUFtQlI7QUMxU0k7RUR1UkksV0FBQTtBQXNCUjtBQzFTSTtFRG9SSSxXQUFBO0FBeUJSO0FDMVNJO0VEaVJJLFdBQUE7QUE0QlI7O0FBekJBO0VBQ0ksZUFBQTtBQTRCSjs7QUF6QkE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBNEJKOztBQXpCQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtBQTRCSjs7QUF6QkE7RUFDSSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUE0Qko7O0FBekJBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUE0Qko7O0FBMUJBO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7QUE2Qko7O0FBMUJBO0VBQ0ksc0JBQUE7QUE2Qko7O0FBMUJBO0VBQ0ksYUR0UVU7RUN1UVYsb0JBQUE7QUE2Qko7O0FBMUJBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUE2Qko7O0FBMUJBO0VBQ0ksaUJBQUE7RUFDQSxZQUFBO0FBNkJKOztBQTNCQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FBOEJKOztBQTVCQTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQStCSjs7QUE1QkE7RUFDSSxVQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUErQko7O0FBN0JBO0VBQ0ksYUQzU1U7QUMyVWQ7O0FBOUJBO0VBQ0ksa0JBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQWlDSjs7QUEvQkE7RUFDSSxZQUFBO0FBa0NKOztBQWhDQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQW1DSjtBQWxDSTtFQUNJLGVBQUE7QUFvQ1I7O0FBaENBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtBQW1DSjs7QUFoQ0E7RUFDSSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQW1DSjs7QUFoQ0E7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFtQ0o7O0FBaENBO0VBQ0ksV0FBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFtQ0o7O0FBaENBO0VBQ0ksYUFBQTtBQW1DSjs7QUFoQ0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQW1DSjtBQWxDSTtFQUNJLGFBQUE7QUFvQ1I7O0FBOUJBO0VBQ0ksd0JBQUE7RUFDQSxlQUFBO0FBaUNKOztBQTlCQTtFQUNJLGlCQUFBO0FBaUNKOztBQTlCQTtFQUNJLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0FBaUNKOztBQS9CQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFrQ0o7QUFqQ0k7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUFtQ1I7QUFqQ0k7RUFDSSw0QkFBQTtFQUNBLHlCRDVhYztBQytjdEI7QUFqQ1E7RUFDSSxZQUFBO0FBbUNaOztBQS9CQTtFQUNJO0lBQ0ksUUFBQTtFQWtDTjtFQS9CTTtJQUNJLGVBQUE7SUFDQSxhQUFBO0lBQ0Esc0NBQUE7SUFDQSxZQUFBO0lBQ0EsT0FBQTtJQUNBLHVCQUFBO0VBaUNWO0VBaENVO0lBQ0ksb0JBQUE7RUFrQ2Q7RUFoQ1U7SUFDSSxZQUFBO0lBQ0EsVUFBQTtJQUNBLFFBQUE7SUFDQSx3QkFBQTtFQWtDZDtFQS9CVTs7SUFFSSxhQUFBO0VBaUNkO0VBL0JVO0lBQ0ksYUFBQTtJQUNBLGVBQUE7SUFDQSxPQUFBO0lBQ0Esc0NBQUE7SUFDQSxZQUFBO0lBQ0EsdUJBQUE7RUFpQ2Q7QUFDRjtBQTdCQTtFQUNJOzs7SUFHSSxzQ0FBQTtFQStCTjtFQTdCRTtJQUNJLGFBQUE7RUErQk47RUE3QkU7SUFDSSxhQUFBO0VBK0JOO0VBN0JFO0lBQ0ksZ0JBQUE7SUFDQSxhQUFBO0lBQ0EsWUFBQTtJQUNBLG9CQUFBO0VBK0JOO0VBOUJNO0lBQ0ksZUFBQTtFQWdDVjtFQTdCRTtJQUNJLFNBQUE7RUErQk47RUE3QkU7SUFDSSxjQUFBO0lBQ0EsaUJBQUE7RUErQk47RUE3QkU7SUFDSSxhQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxVQUFBO0lBQ0Esa0JBQUE7SUM5aUJKLDJDQUFBO0VEOGtCRjtBQUNGO0FBN0JBO0VBQ0k7SUFDSSxhQUFBO0VBK0JOO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuJGltYWdlUGF0aDogJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvY29sbGVjdGlvbnMvJztcbi5jcmVhdGVDb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLmNyZWF0ZVByb2dyZXNzIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICBsZWZ0OiAyMHB4O1xuICAgICAgICB0b3A6IDIwJTtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIEBpbmNsdWRlIHVuc2VsZWN0YWJsZVRleHQoKTtcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbm5lY3Rpb24ge1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgd2lkdGg6IDNweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgkaW1hZ2VQYXRoICsgJ2Rhc2hlZC1saW5lLnN2ZycpO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogOXB4O1xuICAgICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgID4gZGl2LmZpbmlzaGVkIHtcbiAgICAgICAgICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICAgICAgICAgIEBpbmNsdWRlIGNsaWNrYWJsZSgpO1xuICAgICAgICAgICAgLmNpcmNsZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCRpbWFnZVBhdGggKyAnY2hlY2tlZC1jaXJjbGUuc3ZnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubGFiZWwge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbm5lY3Rpb24ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgkaW1hZ2VQYXRoICsgJ2xpbmUuc3ZnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgPiBkaXYuY3VycmVudCB7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRQcmltYXJ5O1xuICAgICAgICAgICAgLmNpcmNsZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCRpbWFnZVBhdGggKyAnYWN0aXZlLWNpcmNsZS5zdmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5sYWJlbCB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgPiBkaXYuZmluaXNoIHtcbiAgICAgICAgICAgIC5jaXJjbGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgkaW1hZ2VQYXRoICsgJ2ZpbmlzaC5zdmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3JTdGF0dXNQb3NpdGl2ZTtcbiAgICAgICAgICAgIC5sYWJlbCB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICA+IGRpdixcbiAgICAgICAgLmNpcmNsZSxcbiAgICAgICAgaSxcbiAgICAgICAgLmxhYmVsIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIH1cbiAgICAgICAgaSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgLmNpcmNsZSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICB3aWR0aDogMjFweDtcbiAgICAgICAgICAgIGhlaWdodDogMjFweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgkaW1hZ2VQYXRoICsgJ2Rhc2hlZC1jaXJjbGUuc3ZnJyk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmNvbGxlY3Rpb25zLW1hc3Rlci1kaXYge1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1heC13aWR0aDogNjAwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiB2YXIoLS1tYWlubmF2SGVpZ2h0KTtcbn1cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLmNyZWF0ZUNvbGxlY3Rpb24ge1xuICAgICAgICAuY29sbGVjdGlvbi1pdGVtIHtcbiAgICAgICAgICAgICYuY2RrLWtleWJvYXJkLWZvY3VzZWQge1xuICAgICAgICAgICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPiAubWRjLWJ1dHRvbl9fbGFiZWwge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLmNyZWF0ZUNvbGxlY3Rpb24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgLmhlYWRsaW5lIHtcbiAgICAgICAgZm9udC1zaXplOiAxMTAlO1xuICAgICAgICBwYWRkaW5nOiAyMHB4IDIwcHg7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgQGluY2x1ZGUgdW5zZWxlY3RhYmxlVGV4dCgpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aW9uRGlhbG9nQmFja2dyb3VuZDtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmdyb3VwIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbiAgICB9XG4gICAgLmNvbGxlY3Rpb24taXRlbTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ7XG4gICAgfVxuICAgIC5jb2xsZWN0aW9uLWl0ZW0ge1xuICAgICAgICBoZWlnaHQ6IHVuc2V0O1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDVweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyZW07XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgICAgICAgfVxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRlbnQge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAwO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgfVxuICAgICAgICAuaWNvbkxlZnQge1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgICBpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIG1hdGVyaWFsU2hhZG93Qm90dG9tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLm5leHQge1xuICAgICAgICAgICAgY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gICAgICAgIH1cbiAgICAgICAgaSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IDNweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5jb2xsZWN0aW9uLXBlcm1pc3Npb24tY29udGFpbmVyIHtcbiAgICAudGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDE0MCU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgICB9XG4gICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMTEwJTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5zdGF0dXMge1xuICAgICAgICBtYXJnaW46ICRjYXJkUGFkZGluZyAqIC0xO1xuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgICBwYWRkaW5nOiA2cHggMjBweDtcbiAgICAgICAgYmFja2dyb3VuZDogJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ7XG4gICAgfVxufVxuLmNvbGxlY3Rpb24tZ2VuZXJhbCB7XG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdGV4dGFyZWEge1xuICAgICAgICAgICAgaGVpZ2h0OiA2cmVtO1xuICAgICAgICAgICAgcmVzaXplOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5kaWFsb2ctaW5wdXQtYXJlYSB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICB9XG4gICAgLmNvbGxlY3Rpb24tbmV3LW93bmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMCAkY2FyZFBhZGRpbmc7XG4gICAgICAgID4gaSB7XG4gICAgICAgICAgICBtYXJnaW46IDVweDtcbiAgICAgICAgfVxuICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5jb2xvci1ncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAvL21heC13aWR0aDogMjIwcHg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IHVuc2V0O1xuICAgICAgICB9XG4gICAgICAgICYuY2RrLWtleWJvYXJkLWZvY3VzZWQge1xuICAgICAgICAgICAgQGluY2x1ZGUgc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIC5jb2xvci1vcHRpb24ge1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB0O1xuICAgICAgICAgICAgd2lkdGg6IDE0JTtcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIG1hcmdpbjogNHB4IDNweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuY29sb3Itc2VsZWN0ZWQge1xuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzMzMztcbiAgICAgICAgfVxuICAgIH1cbn1cbi5jb2xsZWN0aW9uLW1ldGFkYXRhIHtcbiAgICAubm9Hcm91cHMge1xuICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVYTGFyZ2U7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIC5ub1Blcm1pc3Npb24ge1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBoNCB7XG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVhMYXJnZTtcbiAgICAgICAgfVxuICAgICAgICBoNSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG4uZ3JvdXBMYWJlbCB7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuLmNvbGxlY3Rpb24xIGxhYmVsLFxuLmNvbGxlY3Rpb24xIGxhYmVsOmZvY3VzIHtcbiAgICBjb2xvcjogI2VlZSAhaW1wb3J0YW50O1xufVxuLnBlcm1pc3Npb25zQnRuIHtcbiAgICBtYXJnaW4tbGVmdDogMzJweDtcbn1cbi5wZXJtaXNzaW9uc0J0biAuYnRuLWZsYXQge1xuICAgIGZsb2F0OiBub25lO1xufVxuLnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEyMCU7XG59XG4uY29sbGVjdGlvblNoYWRvdyB7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3dMYXJnZSgpO1xufVxuLmNvbGxlY3Rpb25JbWFnZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogMjQwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctaW5mb2FyZWEge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtaW4taGVpZ2h0OiAxMjBweDtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHRyYW5zaXRpb246ICR0cmFuc2l0aW9uTm9ybWFsIGFsbDtcbiAgICBAaW5jbHVkZSBwbGFjZWhvbGRlciB7XG4gICAgICAgIGNvbG9yOiAjY2NjO1xuICAgIH1cbiAgICBpbnB1dCxcbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbn1cbi5jb2xsZWN0aW9uLW5ldy1iZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gMTUwcHgpO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG4uZGFyay1jb2xvciB7XG4gICAgY29sb3I6ICMwMDA7XG4gICAgLmNvbGxlY3Rpb24tbmV3LWJnIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbiAgICB9XG4gICAgQGluY2x1ZGUgcGxhY2Vob2xkZXIge1xuICAgICAgICBjb2xvcjogIzMzMztcbiAgICB9XG59XG4uY29sbGVjdGlvbi1uZXctcHJldmlldy1oZWFkbGluZSB7XG4gICAgZm9udC1zaXplOiAyMDAlO1xufVxuXG4uY29sbGVjdGlvbi1uZXctcHJldmlldy1zdWJsaW5lIHtcbiAgICBmb250LXNpemU6IDEyMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBvcGFjaXR5OiAwLjg1O1xufVxuXG4uY29sbGVjdGlvbi1uZXctcHJldmlldy1pbmZvbGluZSB7XG4gICAgb3BhY2l0eTogMC43NTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uY29sbGVjdGlvbi1ub2NvbnRlbnQtYmlnIHtcbiAgICBmb250LXNpemU6IDIwMCU7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwYWRkaW5nLXRvcDogOHB4O1xuICAgIHBhZGRpbmctbGVmdDogMHB4O1xufVxuXG4uY29sbGVjdGlvbi1ub2NvbnRlbnQtc21hbGwge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcGFkZGluZy10b3A6IDBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDBweDtcbn1cbi5jb2xsZWN0aW9ucy1sb2FkaW5nLWRpdiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMjAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmljb24tYm90dG9tIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG4uZGlhbG9nLWJhc2ljLWFyZWEge1xuICAgIHBhZGRpbmc6ICRjYXJkUGFkZGluZztcbiAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbn1cblxuLmRpYWxvZy1kYXJrLWFyZWEge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xufVxuXG4uYnV0dG9uLWFyZWEge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIGhlaWdodDogNzRweDtcbn1cbi5idXR0b24tYXJlYSBhIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luOiA1cHg7XG59XG4uZGlhbG9nLWlucHV0IHtcbiAgICB3aWR0aDogOTAlO1xuICAgIGhlaWdodDogMjVweDtcbiAgICBwYWRkaW5nOiA0cHggNHB4IDRweCAxMHB4O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5kaWFsb2ctaW5wdXQtdGV4dGFyZWEge1xuICAgIHdpZHRoOiA5MCU7XG4gICAgYm9yZGVyLWNvbG9yOiBsaWdodGdyYXk7XG4gICAgcGFkZGluZzogNHB4IDRweCA0cHggMTBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICBoZWlnaHQ6IDcwcHg7XG4gICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xufVxuLmNhcmQtY29udGVudCB7XG4gICAgcGFkZGluZzogJGNhcmRQYWRkaW5nO1xufVxuLmNhcmQtY29sbGVjdGlvbi1pY29uLWNvbnRhaW5lciB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAyNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNhcmQtaW1hZ2UtZGlzdGFuY2Uge1xuICAgIGhlaWdodDogMzVweDtcbn1cbi5jYXJkLWltYWdlLWljb24tY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDE2MHB4O1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JheTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDc1cHg7XG4gICAgfVxufVxuXG4uY2FyZC1jb2xsZWN0aW9uLWltYWdlLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uY2FyZC1pbWFnZS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uY2FyZC1pbWFnZS1wcmV2aWV3IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAyNDBweDtcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xufVxuXG4uaW1hZ2UtdXBsb2FkLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBoZWlnaHQ6IDBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAwcHg7XG4gICAgbGVmdDogMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHotaW5kZXg6IDk5OTtcbn1cblxuLmltYWdlLXVwbG9hZC1maWVsZC1pbnB1dCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLmJ1dHRvbi1pY29uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAxNXB4O1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIHotaW5kZXg6IDI7XG4gICAgLm1hdC1mYWIge1xuICAgICAgICBtYXJnaW46IDAgNXB4O1xuICAgIH1cbn1cbmxhYmVsIHtcbn1cblxuaW5wdXRbdHlwZT0ncmFkaW8nXSB7XG4gICAgbWFyZ2luOiAwcHggNHB4IDhweCAxM3B4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmRpYWxvZy1jb2xvci1ncm91cCB7XG4gICAgbWluLWhlaWdodDogMTQwcHg7XG59XG5cbi5kaWFsb2ctaGVhZGVyLWZpZWxkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzODM4O1xuICAgIHBhZGRpbmc6IDhweCAwcHggOHB4IDIwcHg7XG4gICAgY29sb3I6ICNmZmZmZmY7XG59XG4uZWRpdG9yaWFsLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5lZGl0b3JpYWwtbGlzdCB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICB9XG4gICAgLmVkaXRvcmlhbC1wdWJsaWMge1xuICAgICAgICBwYWRkaW5nOiAkY2FyZFBhZGRpbmcgJGNhcmRQYWRkaW5nIDIwcHggJGNhcmRQYWRkaW5nO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2FyZExpZ2h0QmFja2dyb3VuZDtcblxuICAgICAgICA6Om5nLWRlZXAgLm1hdC1zbGlkZS10b2dnbGUge1xuICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB9XG4gICAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSozKSB7XG4gICAgLmNhcmQtaGlnaCB7XG4gICAgICAgIHRvcDogMTUlO1xuICAgIH1cbiAgICAuY3JlYXRlQ29udGFpbmVyIHtcbiAgICAgICAgLmNyZWF0ZVByb2dyZXNzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICB0b3A6IGNhbGModmFyKC0tbWFpbm5hdkhlaWdodCkgKyA0MHB4KTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIC5jaXJjbGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogNjAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbm5lY3Rpb24ge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgICAgICAgICBsZWZ0OiAyNXB4O1xuICAgICAgICAgICAgICAgIHRvcDogMXB4O1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmxhYmVsLFxuICAgICAgICAgICAgLm1hdGVyaWFsLWljb25zIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmN1cnJlbnQgLmxhYmVsIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHRvcDogY2FsYyh2YXIoLS1tYWlubmF2SGVpZ2h0KSArIDIwcHgpO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiAkbW9iaWxlSGVpZ2h0ICsgJG1vYmlsZVN0YWdlKjIpIHtcbiAgICAuY2FyZCxcbiAgICAuY2FyZC1oaWdoLFxuICAgIC5jYXJkLWxvdyB7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1tYWlubmF2SGVpZ2h0KSArIDE1cHgpO1xuICAgIH1cbiAgICAuY29sbGVjdGlvbkltYWdlIHtcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcbiAgICB9XG4gICAgLmNhcmQtY29sbGVjdGlvbi1pY29uLWNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogMTIwcHg7XG4gICAgfVxuICAgIC5jYXJkLWltYWdlLWljb24tY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDYwcHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmNhcmQtaW1hZ2UtZGlzdGFuY2Uge1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgfVxuICAgIC5ibHVycmVkLWltYWdlIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZpbHRlcjogYmx1cig4cHgpO1xuICAgIH1cbiAgICAuY2FyZC1pbWFnZS1wcmV2aWV3IHtcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvd0xhcmdlKCk7XG4gICAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSozKSBhbmQgKG1heC1oZWlnaHQ6ICRtb2JpbGVIZWlnaHQrJG1vYmlsZVN0YWdlKjIpIHtcbiAgICAuY3JlYXRlQ29udGFpbmVyIC5jcmVhdGVQcm9ncmVzcyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuIiwiQG1peGluIGltYWdlRGlzYWJsZWRCbHVyKCkge1xuICAgIC13ZWJraXQtZmlsdGVyOiBibHVyKDNweCk7XG4gICAgZmlsdGVyOiBibHVyKDNweCk7XG59XG5AbWl4aW4gc2hvcnRlblRleHQoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TGFyZ2UoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDEwcHggNzBweCByZ2JhKDAsIDAsIDAsIDAuMTUpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIGxpbWl0TGluZUxlbmd0aCgkd2lkdGgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgbWF4LXdpZHRoOiAkd2lkdGg7XG59XG5AbWl4aW4gdW5zZWxlY3RhYmxlVGV4dCgpIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5AbWl4aW4gaW9zU2Nyb2xsaW5nKCkge1xuICAgIC8qIGlvcyBzY3JvbGxpbmcgZml4ICovXG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuQG1peGluIHBsYWNlaG9sZGVyIHtcbiAgICA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsSW5zZXRGb2N1cygpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgJGZvY3VzV2lkdGggJGZvY3VzQ29sb3IgIWltcG9ydGFudDtcbiAgICBAbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xuICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJywgJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbERhc2hlZEZvY3VzKCkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIGRhc2hlZCAkZm9jdXNDb2xvcjtcbn1cblxuQG1peGluIGZvY3VzU2hhZG93KCRkYXJrOiB0cnVlLCAkc3RyZW5ndGg6IDAuMSkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgQGlmICRkYXJrPT10cnVlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICB9XG59XG5AbWl4aW4gZGFya2VuKCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5Db2xvcjtcbn1cbkBtaXhpbiBkYXJrZW5MaWdodCgpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuTGlnaHRDb2xvcjtcbn1cbkBtaXhpbiBibHVyQmFja2dyb3VuZCgkcmFkaXVzOiA1cHgpIHtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoJHJhZGl1cyk7XG59XG5AbWl4aW4gc2V0R2xvYmFsRm9jdXMoJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAkZm9jdXNXaWR0aCAkY29sb3IgIWltcG9ydGFudDtcbn1cblxuQG1peGluIHJlbW92ZUJ1dHRvbkRlZmF1bHRTdHlsZXMge1xuICAgIGJhY2tncm91bmQ6IHVuc2V0O1xuICAgIGJvcmRlcjogdW5zZXQ7XG4gICAgcGFkZGluZzogdW5zZXQ7XG59XG5cbkBtaXhpbiBhZnRlclBzZXVkb0VsZW1lbnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AaW1wb3J0ICdwcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMnO1xuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 88187:
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/collections-page/collection-proposals/collection-proposals.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionProposalsComponent: () => (/* binding */ CollectionProposalsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _features_management_dialogs_management_dialogs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../features/management-dialogs/management-dialogs.component */ 69284);
/* harmony import */ var _core_module_rest_services_rest_collection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-collection.service */ 43785);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 21916);










const _c0 = ["listProposals"];
function CollectionProposalsComponent_section_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "h2", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "es-actionbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "es-node-entries-wrapper", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("clickItem", function CollectionProposalsComponent_section_0_Template_es_node_entries_wrapper_clickItem_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.onContentClick.emit($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 6, "COLLECTIONS.PROPOSALS.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("elementInteractionType", ctx_r0.InteractionType.DefaultActionLink)("dataSource", ctx_r0.dataSourceCollectionProposals)("scope", ctx_r0.Scope.CollectionsProposals)("displayType", ctx_r0.NodeEntriesDisplayType.Grid)("columns", ctx_r0.proposalColumns);
  }
}
class CollectionProposalsComponent {
  constructor(collectionService, mainNavService, optionsHelperService) {
    this.collectionService = collectionService;
    this.mainNavService = mainNavService;
    this.optionsHelperService = optionsHelperService;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.InteractionType;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.Scope;
    this.proposalColumns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItem('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_PROP_TITLE), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItem('NODE_PROPOSAL', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_CREATOR, {
      showLabel: false
    }), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItem('NODE_PROPOSAL', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_PROP_C_CREATED, {
      showLabel: false
    })];
    this.dataSourceCollectionProposals = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeDataSource();
    this.onContentClick = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.mainNavService.getDialogs().onEvent.subscribe(event => {
      if (event.event === _features_management_dialogs_management_dialogs_component__WEBPACK_IMPORTED_MODULE_1__.ManagementEventType.AddCollectionNodes) {
        this.refreshProposals();
      }
    });
  }
  refreshProposals() {
    this.dataSourceCollectionProposals.reset();
    this.dataSourceCollectionProposals.isLoading = true;
    if (this.canEdit) {
      this.collectionService.getCollectionProposals(this.collection.ref.id).subscribe(proposals => {
        proposals.nodes = proposals.nodes.map(p => {
          p.proposalCollection = this.collection;
          return p;
        });
        this.dataSourceCollectionProposals.setData(proposals.nodes, proposals.pagination);
        this.dataSourceCollectionProposals.isLoading = false;
        setTimeout(() => {
          this.listProposals?.initOptionsGenerator({
            actionbar: this.actionbar
          });
        });
      });
    }
  }
  ngOnChanges(changes) {
    if (changes.collection?.currentValue !== null && changes.canEdit?.currentValue !== null) {
      this.refreshProposals();
    }
  }
  static #_ = this.ɵfac = function CollectionProposalsComponent_Factory(t) {
    return new (t || CollectionProposalsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_rest_services_rest_collection_service__WEBPACK_IMPORTED_MODULE_2__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_3__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.OptionsHelperService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: CollectionProposalsComponent,
    selectors: [["es-collection-proposals"]],
    viewQuery: function CollectionProposalsComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.listProposals = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.actionbar = _t.first);
      }
    },
    inputs: {
      collection: "collection",
      canEdit: "canEdit"
    },
    outputs: {
      onContentClick: "onContentClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.OptionsHelperDataService]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 1,
    vars: 1,
    consts: [["class", "collections-cards-div", 4, "ngIf"], [1, "collections-cards-div"], [1, "content-header", "heading-group"], [1, "mat-heading-3"], [1, "no-padding", 3, "elementInteractionType", "dataSource", "scope", "displayType", "columns", "globalOptions", "clickItem"], ["listProposals", ""]],
    template: function CollectionProposalsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, CollectionProposalsComponent_section_0_Template, 8, 8, "section", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !(ctx.dataSourceCollectionProposals == null ? null : ctx.dataSourceCollectionProposals.isEmpty()));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesWrapperComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
    styles: ["\n\n.content-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.content-header[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2NvbGxlY3Rpb24tcHJvcG9zYWxzL2NvbGxlY3Rpb24tcHJvcG9zYWxzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQUo7QUFDSTtFQUNJLFlBQUE7QUFDUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4uY29udGVudC1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEwcHg7XG4gICAgPiBoMiB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 77598:
/*!***************************************************************************!*\
  !*** ./src/app/pages/collections-page/collections-page-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionsPageRoutingModule: () => (/* binding */ CollectionsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _collection_new_collection_new_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collection-new/collection-new.component */ 458);
/* harmony import */ var _collections_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collections-page.component */ 97367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





const routes = [{
  path: '',
  component: _collections_page_component__WEBPACK_IMPORTED_MODULE_1__.CollectionsPageComponent
}, {
  path: 'collection/:mode/:id',
  component: _collection_new_collection_new_component__WEBPACK_IMPORTED_MODULE_0__.CollectionNewComponent
}];
class CollectionsPageRoutingModule {
  static #_ = this.ɵfac = function CollectionsPageRoutingModule_Factory(t) {
    return new (t || CollectionsPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: CollectionsPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CollectionsPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 97367:
/*!**********************************************************************!*\
  !*** ./src/app/pages/collections-page/collections-page.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionsPageComponent: () => (/* binding */ CollectionsPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.component */ 98617);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 8815);
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/footer/footer.component */ 68014);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/menu */ 78128);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_components_tutorial_tutorial_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/tutorial/tutorial.component */ 5693);
/* harmony import */ var _collection_content_collection_content_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./collection-content/collection-content.component */ 69466);
/* harmony import */ var _collection_info_bar_collection_info_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./collection-info-bar/collection-info-bar.component */ 70213);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-translate/core */ 21916);






























const _c0 = ["collectionContentTemplate"];
const _c1 = ["infobar"];
const _c2 = ["collectionContentComponent"];
function CollectionsPageComponent_mat_tab_group_1_mat_tab_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "COLLECTIONS.TAB.MY"));
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-tab", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_mat_tab_group_1_mat_tab_2_ng_template_1_Template, 4, 3, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "COLLECTIONS.TAB.EDU_GROUPS"));
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-tab", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_mat_tab_group_1_mat_tab_3_ng_template_1_Template, 4, 3, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "COLLECTIONS.TAB.TYPE_EDITORIAL"));
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-tab", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_mat_tab_group_1_mat_tab_4_ng_template_1_Template, 4, 3, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "COLLECTIONS.TAB.TYPE_MEDIA_CENTER"));
  }
}
function CollectionsPageComponent_mat_tab_group_1_mat_tab_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-tab", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_mat_tab_group_1_mat_tab_5_ng_template_1_Template, 4, 3, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function CollectionsPageComponent_mat_tab_group_1_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "COLLECTIONS.TAB.EDU_ALL"));
  }
}
function CollectionsPageComponent_mat_tab_group_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-tab-group", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("selectedIndexChange", function CollectionsPageComponent_mat_tab_group_1_Template_mat_tab_group_selectedIndexChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r20.tabSelectedIndex = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, CollectionsPageComponent_mat_tab_group_1_mat_tab_2_Template, 2, 0, "mat-tab", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, CollectionsPageComponent_mat_tab_group_1_mat_tab_3_Template, 2, 0, "mat-tab", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, CollectionsPageComponent_mat_tab_group_1_mat_tab_4_Template, 2, 0, "mat-tab", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, CollectionsPageComponent_mat_tab_group_1_mat_tab_5_Template, 2, 0, "mat-tab", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "mat-tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](7, CollectionsPageComponent_mat_tab_group_1_ng_template_7_Template, 4, 3, "ng-template", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "dark")("selectedIndex", ctx_r0.tabSelectedIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](1, 7, "NAV.COLLECTIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r0.isGuest);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r0.isGuest);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.hasEditorial);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.hasMediacenter);
  }
}
function CollectionsPageComponent_es_actionbar_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "es-actionbar", 33, 34);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleMap"]("flat");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("numberOfAlwaysVisibleOptions", 1)("numberOfAlwaysVisibleOptionsMobile", 1)("dropdownPosition", "right");
  }
}
function CollectionsPageComponent_ng_template_5_Template(rf, ctx) {}
function CollectionsPageComponent_es_collection_info_bar_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "es-collection-info-bar", 35, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("edit", function CollectionsPageComponent_es_collection_info_bar_9_Template_es_collection_info_bar_edit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r24.collectionEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("collection", ctx_r4.collection)("permissions", (tmp_1_0 = ctx_r4.collectionContentRef == null ? null : ctx_r4.collectionContentRef.permissions) !== null && tmp_1_0 !== undefined ? tmp_1_0 : null);
  }
}
function CollectionsPageComponent_section_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "section", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "es-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function CollectionsPageComponent_h1_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "h1", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.TITLE"), " ");
  }
}
const _c3 = function (a0) {
  return [a0];
};
function CollectionsPageComponent_a_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "a", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function CollectionsPageComponent_a_13_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r26.navigateToSearch());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](1, 3, "COLLECTIONS.TO_SEARCH"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](7, _c3, "/" + ctx_r7.ROUTER_PREFIX + "search"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 5, "COLLECTIONS.TO_SEARCH"), " ");
  }
}
const _c4 = function () {
  return ["."];
};
const _c5 = function (a0) {
  return {
    scope: a0
  };
};
const _c6 = function (a0, a1) {
  return {
    routerLink: a0,
    queryParams: a1
  };
};
function CollectionsPageComponent_ng_container_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "es-breadcrumbs", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("onDrop", function CollectionsPageComponent_ng_container_14_div_1_Template_es_breadcrumbs_onDrop_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r33);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](_r29.dropOnCollection($event.target, $event.source));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](3);
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](1, 5, "NAV.COLLECTIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("home", "COLLECTIONS.TAB." + ctx_r28.tabSelected)("homeRouterLink", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction2"](10, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](7, _c4), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](8, _c5, ctx_r28.tabSelected)))("invisibleDescription", true)("canDropNodes", _r29.canDropOnCollectionBreadcrumbs);
  }
}
function CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.EMPTY.SHARED"), " ");
  }
}
function CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.EMPTY.PUBLIC"), " ");
  }
}
function CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_ng_container_1_Template, 3, 3, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_ng_container_2_Template, 3, 3, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r34.tabSelected === "EDU_GROUPS");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r34.tabSelected === "EDU_ALL");
  }
}
function CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, "COLLECTIONS.EMPTY.SUBCOLLECTIONS"), " ");
  }
}
function CollectionsPageComponent_ng_container_14_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_0_Template, 3, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_ng_container_14_ng_template_4_ng_container_1_Template, 3, 3, "ng-container", 13);
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r31.isRootLevelCollection());
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r31.isRootLevelCollection());
  }
}
function CollectionsPageComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_ng_container_14_div_1_Template, 3, 13, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "es-collection-content", 42, 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, CollectionsPageComponent_ng_container_14_ng_template_4_Template, 2, 2, "ng-template", null, 44, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r8.isRootLevelCollection() && !ctx_r8.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("collections-master-div-notabs", !ctx_r8.showTabs());
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("collection", ctx_r8.collection)("getInfobar", ctx_r8.getInfobar)("scope", ctx_r8.getScope())("isRootLevel", ctx_r8.isRootLevelCollection())("createAllowed", ctx_r8.createAllowed);
  }
}
function CollectionsPageComponent_ng_template_16_mat_slide_toggle_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-slide-toggle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function CollectionsPageComponent_ng_template_16_mat_slide_toggle_0_Template_mat_slide_toggle_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r47);
      const sortInfo_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().sortInfo;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](sortInfo_r39.customActive = $event);
    })("ngModelChange", function CollectionsPageComponent_ng_template_16_mat_slide_toggle_0_Template_mat_slide_toggle_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r47);
      const toggleCallback_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().toggleCallback;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](toggleCallback_r41.emit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sortInfo_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().sortInfo;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", sortInfo_r39.customActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "COLLECTIONS.SORT_SLIDER"), " ");
  }
}
function CollectionsPageComponent_ng_template_16_button_1_i_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 54);
  }
  if (rf & 2) {
    const sortInfo_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).sortInfo;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("esIcon", "arrow_" + (sortInfo_r39.ascending ? "upward" : "downward"));
  }
}
function CollectionsPageComponent_ng_template_16_button_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, CollectionsPageComponent_ng_template_16_button_1_i_3_Template, 1, 1, "i", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sortInfo_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().sortInfo;
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("matMenuTriggerFor", _r44.menu);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 3, "NODE." + sortInfo_r39.name), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", sortInfo_r39.name !== "ccm:collection_ordered_position");
  }
}
function CollectionsPageComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, CollectionsPageComponent_ng_template_16_mat_slide_toggle_0_Template, 3, 4, "mat-slide-toggle", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_ng_template_16_button_1_Template, 4, 5, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "es-sort-dropdown", 49, 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("onSort", function CollectionsPageComponent_ng_template_16_Template_es_sort_dropdown_onSort_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r55);
      const callback_r40 = restoredCtx.callback;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](callback_r40.emit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const columns_r38 = ctx.columns;
    const sortInfo_r39 = ctx.sortInfo;
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", sortInfo_r39.name === "ccm:collection_ordered_position");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", _r44.menu);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("columns", columns_r38)("sortBy", sortInfo_r39.name)("sortAscending", sortInfo_r39.ascending);
  }
}
const _c7 = function (a1, a2, a3, a4) {
  return {
    $implicit: null,
    collection: a1,
    permissions: a2,
    isLoading: a3,
    tabSelected: a4
  };
};
// component class
class CollectionsPageComponent {
  static #_ = this.INDEX_MAPPING = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ORGA, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_EDITORIAL, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_MEDIA_CENTER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL];
  set collectionShare(collectionShare) {
    this._collectionShare = collectionShare;
    this.refreshAll();
  }
  get collectionShare() {
    return this._collectionShare;
  }
  set tabSelectedIndex(pos) {
    if (this.isGuest) {
      pos += 2; // skip first 2 tabs
    }

    if (!this.hasEditorial && pos > 1) {
      pos++; // skip editorial
    }

    if (!this.hasMediacenter && pos > 2) {
      pos++; // skip mediacenter
    }

    this.selectTab(CollectionsPageComponent.INDEX_MAPPING[pos]);
  }
  get tabSelectedIndex() {
    let pos = CollectionsPageComponent.INDEX_MAPPING.indexOf(this.tabSelected);
    if (this.isGuest) {
      pos -= 2;
    }
    if (!this.hasEditorial && pos > 1) {
      pos--;
    }
    if (!this.hasMediacenter && pos > 2) {
      pos--;
    }
    return pos;
  }
  // inject services
  constructor(breadcrumbsService, collectionService, config, connector, iamService, localEvents, mediacenterService, nodeHelper, nodeService, route, router, tempStorage, optionsService, networkService, temporaryStorageService, toast, translations, uiService) {
    this.breadcrumbsService = breadcrumbsService;
    this.collectionService = collectionService;
    this.config = config;
    this.connector = connector;
    this.iamService = iamService;
    this.localEvents = localEvents;
    this.mediacenterService = mediacenterService;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.route = route;
    this.router = router;
    this.tempStorage = tempStorage;
    this.optionsService = optionsService;
    this.networkService = networkService;
    this.temporaryStorageService = temporaryStorageService;
    this.toast = toast;
    this.translations = translations;
    this.uiService = uiService;
    this.SCOPES = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.Scope;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodeEntriesDisplayType;
    this.ROUTER_PREFIX = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX;
    this.getInfobar = () => this.infobar;
    this.dialogCancelable = false;
    this.tabSelected = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
    this.isLoading = true;
    this.isReady = false;
    this.collectionSortEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.collectionCustomSortEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.referenceSortEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.referenceCustomSortEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter();
    this.mainnav = true;
    this.isGuest = true;
    this.contentDetailObject = null;
    // real parentCollectionId is only available, if user was browsing
    this.parentCollectionId = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Reference(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT);
    this.hasEditorial = false;
    this.hasMediacenter = false;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_15__.Subject();
    this.createAllowed = () => {
      if (this.isGuest) {
        return false;
      }
      if (this.isRootLevelCollection()) {
        let allowed = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_CREATE_ELEMENTS_COLLECTIONS);
        if (this.tabSelected === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY) {
          return allowed;
        }
        // for anything else, the user must be able to invite everyone
        allowed = allowed && this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES);
        if (this.tabSelected === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ORGA) {
          allowed = false;
        } else if (this.tabSelected === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_EDITORIAL) {
          allowed = allowed && this.adminMediacenters?.length === 1;
        } else if (this.tabSelected === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_EDITORIAL) {
          allowed = allowed && this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COLLECTION_EDITORIAL);
        }
        return allowed;
      } else {
        return this.isAllowedToEditCollection();
      }
    };
    this.translations.waitForInit().subscribe(() => {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([this.connector.isLoggedIn(),
      // FIXME: The sub components should be obserable-aware!
      this.networkService.getRepositories()]).subscribe(([data]) => {
        if (data.isValidLogin && data.currentScope == null) {
          this.isGuest = data.isGuest;
          this.mediacenterService.getMediacenters().subscribe(mediacenters => {
            this.adminMediacenters = mediacenters.filter(m => m.administrationAccess);
          });
          this.collectionService.getCollectionSubcollections(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_EDITORIAL).subscribe(data => {
            this.hasEditorial = data.collections.length > 0;
          });
          this.collectionService.getCollectionSubcollections(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_TYPE_MEDIA_CENTER).subscribe(data => {
            this.hasMediacenter = data.collections.length > 0;
          });
          this.initialize();
        } else {
          _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(this.router, this.config);
        }
      }, () => _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(this.router, this.config));
    });
    // Navigate to parent collection when the current collection is deleted.
    this.localEvents.nodesDeleted.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.filter)(nodes => nodes.some(node => node.ref.id === this.collection.ref.id))).subscribe(() => this.navigate(this.parentCollectionId.id));
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.tempStorage.set(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService.NODE_RENDER_PARAMETER_DATA_SOURCE, this.collectionContentRef?.dataSourceReferences);
  }
  isMobile() {
    return this.uiService.isMobile();
  }
  isMobileWidth() {
    return window.innerWidth < ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.MOBILE_WIDTH;
  }
  navigate(id = '', addToOther = '', feedback = false) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      params.scope = this.tabSelected;
      if (id && id !== '-root-') {
        params.id = id;
      }
      if (feedback) {
        params.feedback = feedback;
      }
      if (addToOther) {
        params.addToOther = addToOther;
      }
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX + 'collections'], {
        queryParams: params
      });
    });
  }
  closeAddToOther() {
    this.navigate(this.collection.ref.id);
  }
  selectTab(tab) {
    if (this.tabSelected !== tab || this.getCollectionId() !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT) {
      this.tabSelected = tab;
      this.parentCollectionId = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Reference(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT);
      this.contentDetailObject = null;
      this.navigate();
    }
  }
  isRootLevelCollection() {
    return this.isRootLevel;
  }
  isAllowedToEditCollection() {
    if (this.isRootLevelCollection()) {
      return !this.isGuest; //this.tabSelected === RestConstants.COLLECTIONSCOPE_MY
    }

    return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.hasAccessPermission(this.collection, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_WRITE);
  }
  feedbackAllowed() {
    return !this.isGuest && _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.hasAccessPermission(this.collection, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_FEEDBACK);
  }
  isUserAllowedToEdit(collection) {
    return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.isUserAllowedToEdit(collection, this.person);
  }
  pinCollection() {
    this.addPinning = this.collection.ref.id;
  }
  getPrivacyScope(collection) {
    return collection.scope;
    //  return RestHelper.getPrivacyScope(collection);
  }

  navigateToSearch() {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX + 'search'], {
        queryParams: params
      });
    });
  }
  isBrightColor() {
    return ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ColorHelper.getPreferredColor(this.collection?.collection?.color) === ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.PreferredColor.White;
  }
  getScopeInfo() {
    return this.nodeHelper.getCollectionScopeInfo(this.collection);
  }
  collectionEdit() {
    if (this.isAllowedToEditCollection()) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX + 'collections/collection', 'edit', this.collection.ref.id], {
        queryParams: {
          mainnav: this.mainnav
        }
      });
      return;
    }
  }
  getScope() {
    return this.tabSelected ? this.tabSelected : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL;
  }
  onCreateCollection() {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIConstants.ROUTER_PREFIX + 'collections/collection', 'new', this.collection.ref.id], {
        queryParams: params
      });
    });
  }
  onCollectionsClick(collection) {
    // remember actual collection as breadcrumb
    if (!this.isRootLevelCollection()) {
      this.parentCollectionId = this.collection.ref;
    }
    // set thru router so that browser back button can work
    this.navigate(collection.ref.id);
  }
  refreshAll() {
    this.displayCollectionById(this.collection.ref.id);
  }
  displayCollectionById(id) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!!id) {
        try {
          _this.collection = (yield _this.collectionService.getCollection(id).toPromise()).collection;
        } catch (e) {
          if (e.status === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HTTP_FORBIDDEN) {
            const login = yield _this.connector.isLoggedIn().toPromise();
            if (login.statusCode === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
              _this.toast.error(e);
            } else {
              _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(_this.router, _this.config, null);
            }
          }
        }
      } else {
        _this.setCollectionId(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT);
      }
      _this.isLoading = false;
      _this.renderBreadcrumbs();
      _this.isRootLevel = !id;
    })();
  }
  closeDialog() {
    this.dialogTitle = null;
  }
  showTabs() {
    return this.isRootLevelCollection() && (!this.isGuest || this.hasEditorial);
  }
  hasNonIconPreview() {
    const preview = this.collection?.preview;
    return preview && !preview.isIcon;
  }
  renderBreadcrumbs() {
    this.breadcrumbsService.setNodePath([]);
    if (this.collection.ref.id === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ROOT) {
      return;
    }
    this.nodeService.getNodeParents(this.collection.ref.id, false).subscribe(data => {
      const path = data.nodes.reverse();
      if (path.length > 1) {
        this.parentCollectionId = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Reference(path[path.length - 2].ref.repo, path[path.length - 2].ref.id);
      }
      this.breadcrumbsService.setNodePath(path);
    });
  }
  initialize() {
    var _this2 = this;
    // load user profile
    this.iamService.getCurrentUserAsync().then(iamUser => {
      // WIN
      this.person = iamUser.person;
      // set app to ready state
      this.isReady = true;
      // subscribe to parameters of url
      this.route.queryParams.subscribe( /*#__PURE__*/function () {
        var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
          const diffs = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getDifferentKeys(_this2.params, params);
          if (Object.keys(diffs).length === 1 && diffs.viewType) {
            _this2.params = params;
            return;
          }
          _this2.params = params;
          if (params.scope) {
            _this2.tabSelected = params.scope;
          } else {
            _this2.tabSelected = _this2.isGuest ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_ALL : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COLLECTIONSCOPE_MY;
          }
          _this2.reurl = params.reurl;
          if (params.mainnav) {
            _this2.mainnav = params.mainnav !== 'false';
          }
          // get id from route and validate input data
          const id = params.id;
          if (params.addToOther) {
            _this2.nodeService.getNodeMetadata(params.addToOther).subscribe(data => {
              _this2.addToOther = [data.node];
            });
          }
          yield _this2.displayCollectionById(id);
          /*if (params.nodeId) {
              let node = params.nodeId.split('/');
              node = node[node.length - 1];
              this.collectionService
                  .addNodeToCollection(id, node, null)
                  .subscribe(
                      () => this.navigate(id),
                      (error: any) => {
                          this.handleError(error);
                          this.navigate(id);
                          //this.displayCollectionById(id)
                      },
                  );
          } else {*/
          // }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }, error => {
      // FAIL
      this.toast.error(error);
      this.isReady = true;
    });
  }
  setCollectionId(id) {
    this.collection = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Node();
    this.collection.ref = {
      id
    };
    this.collection.aspects = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_COLLECTION];
  }
  getCollectionId() {
    const c = this.collection;
    return c != null && c.ref != null ? c.ref.id : null;
  }
  static #_2 = this.ɵfac = function CollectionsPageComponent_Factory(t) {
    return new (t || CollectionsPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMediacenterService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_5__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_19__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNetworkService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: CollectionsPageComponent,
    selectors: [["es-collections-page"]],
    contentQueries: function CollectionsPageComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵcontentQuery"](dirIndex, _c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.collectionContentTemplateRef = _t.first);
      }
    },
    viewQuery: function CollectionsPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.infobar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.collectionContentRef = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵProvidersFeature"]([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.OptionsHelperDataService])],
    decls: 18,
    vars: 24,
    consts: [[3, "element", "heading", "description", "showSkip"], ["role", "navigation", "mat-stretch-tabs", "", 3, "color", "selectedIndex", "selectedIndexChange", 4, "ngIf"], [1, "collections-header-group"], ["appearance", "round", 3, "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile", "style", "dropdownPosition", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["collectionContentTemplateRefDefault", ""], ["cdkDropList", "", 3, "cdkDropListSortingDisabled"], [1, "collectionsContainer"], [3, "collection", "permissions", "edit", 4, "ngIf"], [1, "collections-right"], ["class", "collections-loading-div", "style", "padding-top: 24px; text-align: center", 4, "ngIf"], ["esTitle", "", "class", "cdk-visually-hidden", 4, "ngIf"], ["mat-button", "", "color", "primary", "class", "switchToSearch", "tabindex", "0", 3, "title", "routerLink", "click", 4, "ngIf"], [4, "ngIf"], [3, "scope"], ["sortTool", ""], ["role", "navigation", "mat-stretch-tabs", "", 3, "color", "selectedIndex", "selectedIndexChange"], ["labelClass", "mat-tab-my", 4, "ngIf"], ["labelClass", "mat-tab-groups", 4, "ngIf"], ["labelClass", "mat-tab-editorial", 4, "ngIf"], ["labelClass", "mat-tab-media-center", 4, "ngIf"], ["labelClass", "mat-tab-edu-all"], ["mat-tab-label", ""], ["labelClass", "mat-tab-my"], ["esIcon", "person", 1, "tab-icon"], [1, "tab-label"], ["labelClass", "mat-tab-groups"], ["esIcon", "group", 1, "tab-icon"], ["labelClass", "mat-tab-editorial"], ["esIcon", "star", 1, "tab-icon"], ["labelClass", "mat-tab-media-center"], ["esIcon", "business", 1, "tab-icon"], ["esIcon", "language", 1, "tab-icon"], ["appearance", "round", 3, "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile", "dropdownPosition"], ["actionbarCollection", ""], [3, "collection", "permissions", "edit"], ["infobar", ""], [1, "collections-loading-div", 2, "padding-top", "24px", "text-align", "center"], ["esTitle", "", 1, "cdk-visually-hidden"], ["mat-button", "", "color", "primary", "tabindex", "0", 1, "switchToSearch", 3, "title", "routerLink", "click"], ["esIcon", "arrow_forward"], ["role", "navigation", "class", "breadcrumb-space", 4, "ngIf"], [3, "collection", "getInfobar", "scope", "isRootLevel", "createAllowed"], ["collectionContentComponent", ""], ["empty", ""], ["role", "navigation", 1, "breadcrumb-space"], [1, "collections-breadcrumb", 3, "home", "homeRouterLink", "invisibleDescription", "canDropNodes", "onDrop"], [3, "ngModel", "ngModelChange", 4, "ngIf"], ["mat-button", "", "color", "primary", 3, "matMenuTriggerFor", 4, "ngIf"], [3, "columns", "sortBy", "sortAscending", "onSort"], ["sortDropdown", ""], [3, "ngModel", "ngModelChange"], ["mat-button", "", "color", "primary", 3, "matMenuTriggerFor"], [3, "esIcon", 4, "ngIf"], [3, "esIcon"]],
    template: function CollectionsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "es-tutorial", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, CollectionsPageComponent_mat_tab_group_1_Template, 8, 9, "mat-tab-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, CollectionsPageComponent_es_actionbar_3_Template, 2, 5, "es-actionbar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainer"](4, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, CollectionsPageComponent_ng_template_5_Template, 0, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "div", 6)(8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, CollectionsPageComponent_es_collection_info_bar_9_Template, 2, 2, "es-collection-info-bar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, CollectionsPageComponent_section_11_Template, 2, 0, "section", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, CollectionsPageComponent_h1_12_Template, 3, 3, "h1", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](13, CollectionsPageComponent_a_13_Template, 5, 9, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](14, CollectionsPageComponent_ng_container_14_Template, 6, 8, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](15, "es-footer", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](16, CollectionsPageComponent_ng_template_16_Template, 4, 5, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](6);
        let tmp_6_0;
        let tmp_7_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("element", ctx.tutorialElement)("heading", "COLLECTIONS.TUTORIAL_HEADING")("description", "COLLECTIONS.TUTORIAL_DESCRIPTION")("showSkip", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.showTabs());
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.collectionContentTemplateRef && !ctx.isRootLevelCollection());
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngTemplateOutlet", (tmp_6_0 = ctx.collectionContentTemplateRef) !== null && tmp_6_0 !== undefined ? tmp_6_0 : _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction4"](19, _c7, ctx.collection, (tmp_7_0 = ctx.collectionContentRef == null ? null : ctx.collectionContentRef.permissions) !== null && tmp_7_0 !== undefined ? tmp_7_0 : null, ctx.isLoading, ctx.tabSelected));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("cdkDropListSortingDisabled", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("collectionsContainerTabs", ctx.showTabs())("collectionsContainerNoSidebar", ctx.isRootLevelCollection() || ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isLoading && !ctx.isRootLevelCollection() && ctx.collection);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoading || !ctx.isReady);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isRootLevelCollection());
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isLoading && ctx.isGuest);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.collection);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("scope", "collections");
      }
    },
    dependencies: [_shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_7__.BreadcrumbsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgTemplateOutlet, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_21__.CdkDropList, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.SortDropdownComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.SpinnerComponent, _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_8__.FooterComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_24__.MatMenuTrigger, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__.MatSlideToggle, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTabGroup, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterLink, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_9__.TitleDirective, _shared_components_tutorial_tutorial_component__WEBPACK_IMPORTED_MODULE_10__.TutorialComponent, _collection_content_collection_content_component__WEBPACK_IMPORTED_MODULE_11__.CollectionContentComponent, _collection_info_bar_collection_info_bar_component__WEBPACK_IMPORTED_MODULE_12__.CollectionInfoBarComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslatePipe],
    styles: ["\n\n\n\n\n\n\n\n\nmat-tab-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  position: sticky;\n  top: var(--mainnavHeight);\n  width: 100%;\n  z-index: 15;\n}\n\n.collectionsContainer[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 250px auto;\n  position: relative;\n  min-height: calc(100vh - var(--mainnavHeight));\n}\n.collectionsContainer.collectionsContainerTabs[_ngcontent-%COMP%] {\n  min-height: calc(100vh - (var(--mainnavHeight) + 48px));\n}\n.collectionsContainer[_ngcontent-%COMP%]   es-collection-content[_ngcontent-%COMP%] {\n  display: block;\n  padding-top: 30px;\n}\n.collectionsContainer.collectionsContainerNoSidebar[_ngcontent-%COMP%] {\n  padding: 0 10%;\n  grid-template-columns: auto;\n}\n\n.switchToSearch[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  font-weight: bold;\n  margin-top: 15px;\n}\n\n.table-tab[_ngcontent-%COMP%] {\n  vertical-align: bottom;\n  text-align: center;\n  padding: 10px;\n  padding-bottom: 3px;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  border-bottom-color: var(--primary);\n  color: var(--primary);\n  cursor: pointer;\n}\n\n.table-tab-selected[_ngcontent-%COMP%] {\n  vertical-align: bottom;\n  padding: 10px;\n  padding-bottom: 3px;\n  background-color: white;\n  border-bottom-width: 3px;\n  border-bottom-style: solid;\n  border-bottom-color: var(--primary);\n}\n\nsection[_ngcontent-%COMP%] {\n  padding: 20px 0px;\n}\n\n.coll-breadcrumb[_ngcontent-%COMP%] {\n  display: inline;\n  color: black;\n  margin-left: 2px;\n}\n\n.coll-breadcrumb-clickable[_ngcontent-%COMP%] {\n  color: var(--primary);\n  cursor: pointer;\n}\n\n.collections-master-div[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.noAddPermissions[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  padding-top: 10px;\n}\n\n.collection-header-image[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.icon-bottom[_ngcontent-%COMP%] {\n  vertical-align: bottom;\n}\n\n.dialog-basic-area[_ngcontent-%COMP%] {\n  padding: 16px;\n  padding-bottom: 8px;\n}\n\n.dialog-dark-area[_ngcontent-%COMP%] {\n  padding: 16px;\n  padding-bottom: 8px;\n  background: #efefef;\n}\n\n.button-area[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.dialog-input[_ngcontent-%COMP%] {\n  width: 90%;\n  height: 25px;\n  padding: 4px;\n}\n\n.collections-master-div-notabs[_ngcontent-%COMP%] {\n  padding: 0 35px;\n}\n\n.table-tab-title-short[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.content-header[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n.content-header[_ngcontent-%COMP%]    > .actionbarMaterials[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n\n[_nghost-%COMP%]     footer {\n  float: left;\n  width: 100%;\n}\n[_nghost-%COMP%]     es-collection-content .actionbarMaterials {\n  position: sticky;\n  top: var(--mainnavHeight);\n  z-index: 2;\n  background-color: #fff;\n}\n\n.breadcrumb-space[_ngcontent-%COMP%] {\n  padding: 15px 30px;\n  background: #fff;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n\n@media only screen and (max-width: 1000px) {\n  [_nghost-%COMP%]     .tab-label {\n    display: none;\n  }\n  [_nghost-%COMP%]     .mat-tab-label-active .tab-label {\n    display: flex;\n  }\n}\n@media all and (max-width: calc(var(--cardWidth) * 3)) {\n  [_nghost-%COMP%]     .cardSmallList {\n    width: calc(100% - 10px) !important;\n  }\n}\n@media screen and (max-width: 900px) {\n  .switchToSearch[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media only screen and (max-width: 700px) {\n  .collection-new-preview-headline[_ngcontent-%COMP%] {\n    overflow-wrap: break-word;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 1;\n    \n\n    text-align: center;\n    overflow: hidden;\n  }\n  .collectionsContainer[_ngcontent-%COMP%] {\n    grid-template-columns: auto;\n  }\n  .card-image-icon-container[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n  .breadcrumb-space[_ngcontent-%COMP%] {\n    background: transparent;\n    padding: 0;\n    margin-top: 0;\n  }\n  .collections-breadcrumb[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    z-index: 1;\n    background: rgba(255, 255, 255, 0.9);\n    -webkit-backdrop-filter: blur(5px);\n            backdrop-filter: blur(5px);\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\n    height: 65px;\n    padding-top: 22px;\n    padding-bottom: 20px;\n    padding-right: 50px;\n    margin: 0;\n  }\n  .collection-new-preview-infoline[_ngcontent-%COMP%], .collection-description[_ngcontent-%COMP%], .collection-permissions[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .collections-master-div-notabs[_ngcontent-%COMP%] {\n    margin-top: 0;\n  }\n  .collections-header[_ngcontent-%COMP%] {\n    margin-top: 0;\n    width: 100%;\n    overflow: hidden;\n  }\n  .collections-header-texttop[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n  }\n  .table-tab-middle[_ngcontent-%COMP%] {\n    width: unset;\n  }\n  .collections-master-div[_ngcontent-%COMP%] {\n    padding-left: 20px;\n    padding-right: 20px;\n  }\n  .collections-master-div-notabs[_ngcontent-%COMP%] {\n    min-width: unset;\n  }\n  .card-collection-image-container[_ngcontent-%COMP%] {\n    height: 200px;\n  }\n  .collections-header-detailview[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .tab-group[_ngcontent-%COMP%] {\n    max-width: 1000px;\n  }\n}\n@media only screen and (max-width: 900px) {\n  .collectionsContainer[_ngcontent-%COMP%] {\n    margin-bottom: 62px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2NvbGxlY3Rpb25zLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIiwid2VicGFjazovLy4vcHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNEQTs7Ozs7Q0FBQTtBQU1BO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7QUFGSjs7QUFJQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBR0EsaUNBQUE7RUFDQSxrQkFBQTtFQUdBLDhDQUFBO0FBTEo7QUFPSTtFQUNJLHVEQUFBO0FBTFI7QUFRSTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtBQU5SO0FBU0k7RUFDSSxjQUFBO0VBQ0EsMkJBQUE7QUFQUjs7QUFVQTtFQUNJLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFQSjs7QUFVQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUNDekRNO0VEMEROLHFCQzFETTtFRDJETixlQUFBO0FBUEo7O0FBVUE7RUFDSSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSwwQkFBQTtFQUNBLG1DQ3JFTTtBRDhEVjs7QUFVQTtFQUNJLGlCQUFBO0FBUEo7O0FBVUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBUEo7O0FBVUE7RUFDSSxxQkNuRk07RURvRk4sZUFBQTtBQVBKOztBQVVBO0VBQ0ksV0FBQTtBQVBKOztBQVNBO0VBQ0ksdUJEM0VRO0VDNEVSLGlCQUFBO0FBTko7O0FBUUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFMSjs7QUFRQTtFQUNJLHNCQUFBO0FBTEo7O0FBUUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7QUFMSjs7QUFRQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBTEo7O0FBUUE7RUFDSSxpQkFBQTtBQUxKOztBQVFBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBTEo7O0FBT0E7RUFDSSxlQUFBO0FBSko7O0FBT0E7RUFDSSxhQUFBO0FBSko7O0FBTUE7RUFDSSxhQUFBO0VBQ0EsV0FBQTtBQUhKO0FBSUk7RUFDSSxrQkFBQTtBQUZSOztBQU1JO0VBQ0ksV0FBQTtFQUNBLFdBQUE7QUFIUjtBQU1RO0VBQ0ksZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLFVBQUE7RUFDQSxzQkQzSE07QUN1SGxCOztBQVFBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFRXhJQSxzQ0FBQTtBRm9JSjs7QUFRQTtFQUVRO0lBQ0ksYUFBQTtFQU5WO0VBUU07SUFDSSxhQUFBO0VBTlY7QUFDRjtBQVNBO0VBQ0k7SUFDSSxtQ0FBQTtFQVBOO0FBQ0Y7QUFVQTtFQUNJO0lBQ0ksYUFBQTtFQVJOO0FBQ0Y7QUFVQTtFQUNJO0lBQ0kseUJBQUE7SUFDQSxvQkFBQTtJQUNBLDRCQUFBO0lBQ0EscUJBQUE7SUFDQSxvQkFBQTtJQUVBLGtCQUFBO0lBQ0EsZ0JBQUE7RUFUTjtFQVdFO0lBQ0ksMkJBQUE7RUFUTjtFQVdFO0lBQ0ksZ0JBQUE7RUFUTjtFQVdFO0lBQ0ksdUJBQUE7SUFDQSxVQUFBO0lBQ0EsYUFBQTtFQVROO0VBV0U7SUFDSSxrQkFBQTtJQUNBLE1BQUE7SUFDQSxPQUFBO0lBQ0EsV0FBQTtJQUNBLFVBQUE7SUFDQSxvQ0FBQTtJQUNBLGtDQUFBO1lBQUEsMEJBQUE7SUFDQSwwQ0FBQTtJQUNBLFlBQUE7SUFDQSxpQkFBQTtJQUNBLG9CQUFBO0lBQ0EsbUJBQUE7SUFDQSxTQUFBO0VBVE47RUFXRTs7O0lBR0ksd0JBQUE7RUFUTjtFQVdFO0lBQ0ksYUFBQTtFQVROO0VBWUU7SUFDSSxhQUFBO0lBQ0EsV0FBQTtJQUVBLGdCQUFBO0VBWE47RUFjRTtJQUNJLGFBQUE7SUFDQSx1QkFBQTtFQVpOO0VBZUU7SUFDSSxZQUFBO0VBYk47RUFnQkU7SUFDSSxrQkFBQTtJQUNBLG1CQUFBO0VBZE47RUFpQkU7SUFDSSxnQkFBQTtFQWZOO0VBaUJFO0lBQ0ksYUFBQTtFQWZOO0VBa0JFO0lBQ0ksYUFBQTtFQWhCTjtFQWtCRTtJQUNJLGlCQUFBO0VBaEJOO0FBQ0Y7QUFrQkE7RUFDSTtJQUNJLG1CRDNKYTtFQzJJbkI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL21peGlucyc7XG5cbiRzaWRlbmF2V2lkdGg6IDI1MHB4O1xuLypcbnRhYmxlLCBkaXYge1xuICAgZm9udC1mYW1pbHk6IG9wZW5fc2Fuc3JlZ3VsYXI7XG4gICBmb250LXNpemU6IDE0cHg7XG59XG4qL1xubWF0LXRhYi1ncm91cCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHRvcDogdmFyKC0tbWFpbm5hdkhlaWdodCk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgei1pbmRleDogMTU7XG59XG4uY29sbGVjdGlvbnNDb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgLy8gRG8gbm90IHNldCBgb3ZlcmZsb3c6IGhpZGRlbmAgYXMgdGhpcyB3b3VsZCBpbmhpYml0IHRoZSBgcG9zaXRpb246IHN0aWNreWAgcHJvcGVydHkgb2YgdGhlXG4gICAgLy8gYWN0aW9uYmFyLlxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJHNpZGVuYXZXaWR0aCBhdXRvO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAvLyBVc2UgYG1hcmdpbi10b3BgIGluc3RlYWQgb2YgYHRvcGAgdG8gbm90IGNyZWF0ZSBhIG5lZ2F0aXZlIHBvc2l0aW9uIG9mZnNldCBhdCB0aGUgYm90dG9tIG9mXG4gICAgLy8gdGhlIGNvbnRhaW5lciwgd2hpY2ggY291bGQgYmUgb3ZlcmxhcHBlZCBieSBhIGN1c3RvbSBmb290ZXIuXG4gICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLW1haW5uYXZIZWlnaHQpKTtcblxuICAgICYuY29sbGVjdGlvbnNDb250YWluZXJUYWJzIHtcbiAgICAgICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtICh2YXIoLS1tYWlubmF2SGVpZ2h0KSArIDQ4cHgpKTtcbiAgICB9XG5cbiAgICBlcy1jb2xsZWN0aW9uLWNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZy10b3A6IDMwcHg7XG4gICAgfVxuXG4gICAgJi5jb2xsZWN0aW9uc0NvbnRhaW5lck5vU2lkZWJhciB7XG4gICAgICAgIHBhZGRpbmc6IDAgMTAlO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XG4gICAgfVxufVxuLnN3aXRjaFRvU2VhcmNoIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4udGFibGUtdGFiIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAzcHg7XG4gICAgYm9yZGVyLWJvdHRvbS13aWR0aDogMXB4O1xuICAgIGJvcmRlci1ib3R0b20tc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICRwcmltYXJ5O1xuICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi50YWJsZS10YWItc2VsZWN0ZWQge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogM3B4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDNweDtcbiAgICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkcHJpbWFyeTtcbn1cblxuc2VjdGlvbiB7XG4gICAgcGFkZGluZzogMjBweCAwcHg7XG59XG5cbi5jb2xsLWJyZWFkY3J1bWIge1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmNvbGwtYnJlYWRjcnVtYi1jbGlja2FibGUge1xuICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb2xsZWN0aW9ucy1tYXN0ZXItZGl2IHtcbiAgICB3aWR0aDogMTAwJTtcbn1cbi5ub0FkZFBlcm1pc3Npb25zIHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbn1cbi5jb2xsZWN0aW9uLWhlYWRlci1pbWFnZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuLmljb24tYm90dG9tIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG4uZGlhbG9nLWJhc2ljLWFyZWEge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcbn1cblxuLmRpYWxvZy1kYXJrLWFyZWEge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xufVxuXG4uYnV0dG9uLWFyZWEge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uZGlhbG9nLWlucHV0IHtcbiAgICB3aWR0aDogOTAlO1xuICAgIGhlaWdodDogMjVweDtcbiAgICBwYWRkaW5nOiA0cHg7XG59XG4uY29sbGVjdGlvbnMtbWFzdGVyLWRpdi1ub3RhYnMge1xuICAgIHBhZGRpbmc6IDAgMzVweDtcbn1cblxuLnRhYmxlLXRhYi10aXRsZS1zaG9ydCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbi5jb250ZW50LWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICA+IC5hY3Rpb25iYXJNYXRlcmlhbHMge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBmb290ZXIge1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIGVzLWNvbGxlY3Rpb24tY29udGVudCB7XG4gICAgICAgIC5hY3Rpb25iYXJNYXRlcmlhbHMge1xuICAgICAgICAgICAgcG9zaXRpb246IHN0aWNreTtcbiAgICAgICAgICAgIHRvcDogdmFyKC0tbWFpbm5hdkhlaWdodCk7XG4gICAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5icmVhZGNydW1iLXNwYWNlIHtcbiAgICBwYWRkaW5nOiAxNXB4IDMwcHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvdygpO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMykge1xuICAgIDpob3N0IDo6bmctZGVlcCB7XG4gICAgICAgIC50YWItbGFiZWwge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAubWF0LXRhYi1sYWJlbC1hY3RpdmUgLnRhYi1sYWJlbCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG4gICAgfVxufVxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogKGNhbGModmFyKC0tY2FyZFdpZHRoKSAqIDMpKSkge1xuICAgIDpob3N0IDo6bmctZGVlcCAuY2FyZFNtYWxsTGlzdCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxMHB4KSAhaW1wb3J0YW50O1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogKCRtb2JpbGVUYWJTd2l0Y2hXaWR0aCkpIHtcbiAgICAuc3dpdGNoVG9TZWFyY2gge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZVdpZHRoKSB7XG4gICAgLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctaGVhZGxpbmUge1xuICAgICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICAgICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAgICAgLXdlYmtpdC1saW5lLWNsYW1wOiAxO1xuICAgICAgICAvKmxpbmUtaGVpZ2h0OiAxZW07Ki9cbiAgICAgICAgLy9tYXgtaGVpZ2h0OiAxLjVlbTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbiAgICAuY29sbGVjdGlvbnNDb250YWluZXIge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XG4gICAgfVxuICAgIC5jYXJkLWltYWdlLWljb24tY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICB9XG4gICAgLmJyZWFkY3J1bWItc3BhY2Uge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG4gICAgLmNvbGxlY3Rpb25zLWJyZWFkY3J1bWIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICAgICAgaGVpZ2h0OiA2NXB4O1xuICAgICAgICBwYWRkaW5nLXRvcDogMjJweDtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgLmNvbGxlY3Rpb24tbmV3LXByZXZpZXctaW5mb2xpbmUsXG4gICAgLmNvbGxlY3Rpb24tZGVzY3JpcHRpb24sXG4gICAgLmNvbGxlY3Rpb24tcGVybWlzc2lvbnMge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5jb2xsZWN0aW9ucy1tYXN0ZXItZGl2LW5vdGFicyB7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuXG4gICAgLmNvbGxlY3Rpb25zLWhlYWRlciB7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAvLyBIYW5kbGUgbmVnYXRpdmUgbWFyZ2luIG9mIGBtZHMtZWRpdG9yLXdpZGdldC1jb250YWluZXJgLlxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cblxuICAgIC5jb2xsZWN0aW9ucy1oZWFkZXItdGV4dHRvcCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cblxuICAgIC50YWJsZS10YWItbWlkZGxlIHtcbiAgICAgICAgd2lkdGg6IHVuc2V0O1xuICAgIH1cblxuICAgIC5jb2xsZWN0aW9ucy1tYXN0ZXItZGl2IHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICAgIH1cblxuICAgIC5jb2xsZWN0aW9ucy1tYXN0ZXItZGl2LW5vdGFicyB7XG4gICAgICAgIG1pbi13aWR0aDogdW5zZXQ7XG4gICAgfVxuICAgIC5jYXJkLWNvbGxlY3Rpb24taW1hZ2UtY29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICB9XG5cbiAgICAuY29sbGVjdGlvbnMtaGVhZGVyLWRldGFpbHZpZXcge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAudGFiLWdyb3VwIHtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAwcHg7XG4gICAgfVxufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlVGFiU3dpdGNoV2lkdGgpIHtcbiAgICAuY29sbGVjdGlvbnNDb250YWluZXIge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAkbW9iaWxlVGFiTmF2SGVpZ2h0O1xuICAgIH1cbn1cbiIsIiRwcmltYXJ5OiB2YXIoLS1wcmltYXJ5KTtcbiRwcmltYXJ5TWVkaXVtTGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0yMDApO1xuJHByaW1hcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTEwMCk7XG4kcHJpbWFyeUNvbXBsZW1lbnRhcnk6IHZhcigtLWFjY2VudCk7XG4kcHJpbWFyeURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS05MDApO1xuJHRleHRPblByaW1hcnk6IHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCk7XG4kdGV4dE9uUHJpbWFyeUxpZ2h0OiByZ2JhKHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCksIDAuNzUpO1xuJHRleHRQcmltYXJ5OiB2YXIoLS1wYWxldHRlLWZvcmVncm91bmQtdGV4dCk7XG4kd29ya3NwYWNlVG9wQmFyQmFja2dyb3VuZDogIzM4MzgzODtcbiR3b3Jrc3BhY2VUb3BCYXJGb250Q29sb3I6ICNmZmY7XG4iLCJAbWl4aW4gY2xpY2thYmxlKCkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5AbWl4aW4gbGltaXRMaW5lQ291bnQoJGNvdW50LCAkbGluZUhlaWdodDogMSkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgbWF4LWhlaWdodDogJGNvdW50ICogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6ICRjb3VudDsgLyogbnVtYmVyIG9mIGxpbmVzIHRvIHNob3cgKi9cbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC8qIGF1dG9wcmVmaXhlcjogb2ZmICovXG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3coJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0JvdHRvbSgkb3BhY2l0eTogMC4xKSB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93U21hbGwoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd01lZGl1bUxhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlLCAkb3BhY2l0eTogMC42KSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTY3JvbGxiYXIoKSB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIG1heC13aWR0aDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgLy8gLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB9XG59XG5AbWl4aW4gcmVtb3ZlRGVmYXVsdEZvY3VzKCkge1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgfVxufVxuLy8gQXBwbHkgdGhlIGNvbnRlbnQgc3R5bGVzIGluIGNvbnRyYXN0IG1vZGUuIFRoaXMgaXMganVzdCBlbm91Z2ggY29udHJhc3QgdG8gYmUgV0NBRyBjb21wbGllbnQgLS0tXG4vLyBub3QgYSBoaWdoLWNvbnRyYXN0IG1vZGUuXG4vL1xuLy8gQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyBmb3IgdXNlIGluIGVuY2Fwc3VsYXRlZCBjb21wb25lbnQgc3R5bGVzLCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZSB7XG4vLyAgICAgICAgIC8vIFN0eWxlcyB0byBhcHBseSBpbiBjb250cmFzdCBtb2RlXG4vLyAgICAgfVxuLy8gVG8gdXMgaW4gZ2xvYmFsIGNvbnRleHQsIHBhc3MgJ2dsb2JhbCcgYXMgZmlyc3QgYXJndW1lbnQsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlKGdsb2JhbCkgeyAvKiAuLi4gKi8gfVxuQG1peGluIGNvbnRyYXN0TW9kZSgkc2NvcGU6IGVuY2Fwc3VsYXRlZCkge1xuICAgICRjb250cmFzdE1vZGVTZWxlY3RvcjogJ2JvZHkuZXMtY29udHJhc3QtbW9kZSc7XG4gICAgQGlmICRzY29wZSA9PSBlbmNhcHN1bGF0ZWQge1xuICAgICAgICA6aG9zdC1jb250ZXh0KCN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSkgJiB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHNjb3BlID09IGdsb2JhbCB7XG4gICAgICAgICN7aWYoJiwgJyN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSAmJywgJGNvbnRyYXN0TW9kZVNlbGVjdG9yKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIFwiSW52YWxpZCBzY29wZSAjeyRzY29wZX0uXCI7XG4gICAgfVxufVxuQG1peGluIGJsdXJJbWFnZSgkYmx1clN0cmVuZ3RoOiAyNXB4KSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB0b3A6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB3aWR0aDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIHotaW5kZXg6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmaWx0ZXI6IGJsdXIoJGJsdXJTdHJlbmd0aCk7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb3BhY2l0eTogMC43O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 23619:
/*!*******************************************************************!*\
  !*** ./src/app/pages/collections-page/collections-page.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionsPageModule: () => (/* binding */ CollectionsPageModule)
/* harmony export */ });
/* harmony import */ var _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../features/mds/mds.module */ 77894);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _collection_content_collection_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collection-content/collection-content.component */ 69466);
/* harmony import */ var _collection_info_bar_collection_info_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collection-info-bar/collection-info-bar.component */ 70213);
/* harmony import */ var _collection_new_collection_new_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./collection-new/collection-new.component */ 458);
/* harmony import */ var _collections_page_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./collections-page-routing.module */ 77598);
/* harmony import */ var _collections_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collections-page.component */ 97367);
/* harmony import */ var _infobar_infobar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./infobar/infobar.component */ 26577);
/* harmony import */ var _collection_proposals_collection_proposals_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collection-proposals/collection-proposals.component */ 88187);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);










class CollectionsPageModule {
  static #_ = this.ɵfac = function CollectionsPageModule_Factory(t) {
    return new (t || CollectionsPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
    type: CollectionsPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule, _collections_page_routing_module__WEBPACK_IMPORTED_MODULE_5__.CollectionsPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](CollectionsPageModule, {
    declarations: [_collection_content_collection_content_component__WEBPACK_IMPORTED_MODULE_2__.CollectionContentComponent, _collection_info_bar_collection_info_bar_component__WEBPACK_IMPORTED_MODULE_3__.CollectionInfoBarComponent, _collection_new_collection_new_component__WEBPACK_IMPORTED_MODULE_4__.CollectionNewComponent, _collection_proposals_collection_proposals_component__WEBPACK_IMPORTED_MODULE_8__.CollectionProposalsComponent, _collections_page_component__WEBPACK_IMPORTED_MODULE_6__.CollectionsPageComponent, _infobar_infobar_component__WEBPACK_IMPORTED_MODULE_7__.InfobarComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule, _collections_page_routing_module__WEBPACK_IMPORTED_MODULE_5__.CollectionsPageRoutingModule],
    exports: [_collection_info_bar_collection_info_bar_component__WEBPACK_IMPORTED_MODULE_3__.CollectionInfoBarComponent, _collection_content_collection_content_component__WEBPACK_IMPORTED_MODULE_2__.CollectionContentComponent]
  });
})();

/***/ }),

/***/ 26577:
/*!*********************************************************************!*\
  !*** ./src/app/pages/collections-page/infobar/infobar.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfobarComponent: () => (/* binding */ InfobarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 21916);








const _c0 = ["buttonElements"];
function InfobarComponent_div_0_div_8_div_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InfobarComponent_div_0_div_8_div_1_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const button_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.click(button_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const button_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "white");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, button_r4.label), " ");
  }
}
function InfobarComponent_div_0_div_8_div_1_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InfobarComponent_div_0_div_8_div_1_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const button_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r13.click(button_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const button_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "white");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, button_r4.label), " ");
  }
}
function InfobarComponent_div_0_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", null, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InfobarComponent_div_0_div_8_div_1_button_2_Template, 3, 4, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, InfobarComponent_div_0_div_8_div_1_button_3_Template, 3, 4, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const button_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", button_r4.color === "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", button_r4.color === "standard");
  }
}
function InfobarComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InfobarComponent_div_0_div_8_div_1_Template, 4, 2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1._buttons);
  }
}
function InfobarComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InfobarComponent_div_0_div_9_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r17.cancel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
}
function InfobarComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "div", 1)(2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, InfobarComponent_div_0_div_8_Template, 2, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, InfobarComponent_div_0_div_9_Template, 3, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("infobar infobar-", ctx_r0.position, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@infobarBottom", ctx_r0.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 8, ctx_r0.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](7, 10, ctx_r0.message, ctx_r0.messageParameters));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0._buttons);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isCancelable);
  }
}
/**
 * A Infobar (usually at the bottom) which features action buttons
 * As soon as the title is set, the infobar will be added to the dom and animated
 * Don't add it with *ngIf, otherwise it can't animate properly
 * Just add it to the component without constraints and set or remove the title value
 */
class InfobarComponent {
  constructor() {
    /**
     * Wether or not this bar can be closed using an "x" icon
     * @type {boolean}
     */
    this.isCancelable = false;
    /**
     * Position, currently only 'bottom' is supported and default value
     */
    this.position = 'bottom';
    /**
     * Will be emitted when the users cancels the dialog
     * @type {EventEmitter}
     */
    this.onCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  set buttons(buttons) {
    if (!buttons) {
      this._buttons = null;
      return;
    }
    this._buttons = buttons.reverse();
    setTimeout(() => {
      if (this.buttonElements) this.buttonElements.nativeElement.focus();
    }, 10);
  }
  click(btn) {
    btn.callback();
  }
  cancel() {
    this.onCancel.emit();
  }
  static #_ = this.ɵfac = function InfobarComponent_Factory(t) {
    return new (t || InfobarComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: InfobarComponent,
    selectors: [["es-infobar"]],
    viewQuery: function InfobarComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.buttonElements = _t.first);
      }
    },
    inputs: {
      isCancelable: "isCancelable",
      position: "position",
      title: "title",
      message: "message",
      messageParameters: "messageParameters",
      buttons: "buttons"
    },
    outputs: {
      onCancel: "onCancel"
    },
    decls: 1,
    vars: 1,
    consts: [[3, "class", 4, "ngIf"], [1, "infobar-message"], [1, "title"], [1, "message"], ["class", "infobar-buttons", 4, "ngIf"], ["class", "infobar-cancel clickable", 3, "click", 4, "ngIf"], [1, "infobar-buttons"], [4, "ngFor", "ngForOf"], ["buttonElements", ""], ["mat-raised-button", "", 3, "color", "click", 4, "ngIf"], ["mat-button", "", 3, "color", "click", 4, "ngIf"], ["mat-raised-button", "", 3, "color", "click"], ["mat-button", "", 3, "color", "click"], [1, "infobar-cancel", "clickable", 3, "click"], [1, "material-icons"]],
    template: function InfobarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, InfobarComponent_div_0_Template, 10, 13, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.title);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_2__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
    styles: ["\n\n.infobar[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: var(--light-primary-text);\n  width: 100%;\n  position: fixed;\n  left: 0;\n  height: 70px;\n  z-index: 30;\n  display: flex;\n}\n.infobar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-message[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding-left: 20px;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: center;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-message[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  margin-left: auto;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-message[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 120%;\n  font-weight: bold;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-message[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  color: rgba(var(--light-primary-text), 0.75);\n}\n.infobar[_ngcontent-%COMP%]   .infobar-cancel[_ngcontent-%COMP%] {\n  padding-right: 20px;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-buttons[_ngcontent-%COMP%] {\n  padding: 0 20px;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  color: var(--primary) !important;\n  background: #fff !important;\n}\n.infobar[_ngcontent-%COMP%]   .infobar-buttons[_ngcontent-%COMP%]   .btn-flat[_ngcontent-%COMP%] {\n  color: var(--light-primary-text) !important;\n}\n\n.infobar-bottom[_ngcontent-%COMP%] {\n  bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9jb2xsZWN0aW9ucy1wYWdlL2luZm9iYXIvaW5mb2Jhci5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLDBCQ0hNO0VESU4sZ0NDQ1k7RURBWixXQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QUFBSjtBQUNJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBQ1I7QUFDSTtFQUNJLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSx1QkFBQTtBQUNSO0FBQVE7RUFDSSxhQUFBO0VBQ0EsaUJBQUE7QUFFWjtBQUFRO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FBRVo7QUFBUTtFQUNJLDRDQ3hCUztBRDBCckI7QUFDSTtFQUNJLG1CQUFBO0FBQ1I7QUFDSTtFQUNJLGVBQUE7QUFDUjtBQUFRO0VBQ0ksZ0NBQUE7RUFDQSwyQkFBQTtBQUVaO0FBQVE7RUFDSSwyQ0FBQTtBQUVaOztBQUVBO0VBQ0ksU0FBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5pbmZvYmFyIHtcbiAgICBiYWNrZ3JvdW5kOiAkcHJpbWFyeTtcbiAgICBjb2xvcjogJHRleHRPblByaW1hcnk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGxlZnQ6IDA7XG4gICAgaGVpZ2h0OiA3MHB4O1xuICAgIHotaW5kZXg6IDMwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICAuaW5mb2Jhci1tZXNzYWdlIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgfVxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMjAlO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgLm1lc3NhZ2Uge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0T25QcmltYXJ5TGlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmluZm9iYXItY2FuY2VsIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICB9XG4gICAgLmluZm9iYXItYnV0dG9ucyB7XG4gICAgICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICAgICAgLmJ0biB7XG4gICAgICAgICAgICBjb2xvcjogJHByaW1hcnkgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmYgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAuYnRuLWZsYXQge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0T25QcmltYXJ5ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4uaW5mb2Jhci1ib3R0b20ge1xuICAgIGJvdHRvbTogMDtcbn1cbiIsIiRwcmltYXJ5OiB2YXIoLS1wcmltYXJ5KTtcbiRwcmltYXJ5TWVkaXVtTGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0yMDApO1xuJHByaW1hcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTEwMCk7XG4kcHJpbWFyeUNvbXBsZW1lbnRhcnk6IHZhcigtLWFjY2VudCk7XG4kcHJpbWFyeURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS05MDApO1xuJHRleHRPblByaW1hcnk6IHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCk7XG4kdGV4dE9uUHJpbWFyeUxpZ2h0OiByZ2JhKHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCksIDAuNzUpO1xuJHRleHRQcmltYXJ5OiB2YXIoLS1wYWxldHRlLWZvcmVncm91bmQtdGV4dCk7XG4kd29ya3NwYWNlVG9wQmFyQmFja2dyb3VuZDogIzM4MzgzODtcbiR3b3Jrc3BhY2VUb3BCYXJGb250Q29sb3I6ICNmZmY7XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.trigger)('infobarBottom', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_2__.UIAnimation.infobarBottom(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_2__.UIAnimation.ANIMATION_TIME_SLOW))]
    }
  });
}

/***/ }),

/***/ 78689:
/*!*******************************************************************!*\
  !*** ./src/app/pages/collections-page/infobar/infobar.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfobarService: () => (/* binding */ InfobarService)
/* harmony export */ });
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ 83517);
/* harmony import */ var _util_dialog_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/dialog-button */ 98465);
/* harmony import */ var _infobar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./infobar.component */ 26577);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/overlay */ 72698);





class InfobarService {
  constructor(overlay) {
    this.overlay = overlay;
  }
  /**
   * Shows an info bar with the given configuration.
   *
   * If there are any info bars visible, they are replaced by this one.
   */
  open({
    title,
    message,
    buttons
  }) {
    return new Promise(resolve => {
      if (this.overlayRef) {
        this.overlayRef.dispose();
      }
      this.overlayRef = this.overlay.create();
      const portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__.ComponentPortal(_infobar_component__WEBPACK_IMPORTED_MODULE_1__.InfobarComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.title = title;
      componentRef.instance.message = message;
      componentRef.instance.buttons = buttons.map(button => new _util_dialog_button__WEBPACK_IMPORTED_MODULE_0__.DialogButton(button.label, button.config, () => {
        resolve(button.label);
        this.overlayRef.dispose();
      }));
      componentRef.instance.isCancelable = true;
      componentRef.instance.onCancel.subscribe(() => this.overlayRef.dispose());
      componentRef.onDestroy(() => {
        this.overlayRef = null;
        resolve(null);
      });
    });
  }
  /**
   * Closes the currently visible info bar, if any.
   */
  close() {
    this.overlayRef?.dispose();
  }
  static #_ = this.ɵfac = function InfobarService_Factory(t) {
    return new (t || InfobarService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__.Overlay));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: InfobarService,
    factory: InfobarService.ɵfac,
    providedIn: 'root'
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_collections-page_collections-page_module_ts.js.map