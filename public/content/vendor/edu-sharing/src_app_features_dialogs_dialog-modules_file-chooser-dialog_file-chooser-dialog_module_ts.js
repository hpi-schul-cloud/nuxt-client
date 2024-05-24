"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_file-chooser-dialog_file-chooser-dialog_module_ts"],{

/***/ 21474:
/*!******************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-chooser-dialog/file-chooser-dialog.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileChooserDialogComponent: () => (/* binding */ FileChooserDialogComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 51063);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _pages_workspace_page_explorer_explorer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../pages/workspace-page/explorer/explorer.component */ 47159);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/components/breadcrumbs/breadcrumbs.component */ 98617);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _file_chooser_dialog_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./file-chooser-dialog-data */ 84462);























const _c0 = ["bottomBarContent"];
function FileChooserDialogComponent_ng_template_0_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "WORKSPACE.FILE_CHOOSER.HOME_FOLDER_NO_PERMISSIONS"), " ");
  }
}
function FileChooserDialogComponent_ng_template_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "WORKSPACE.FILE_CHOOSER.NO_WRITE_PERMISSIONS"), " ");
  }
}
function FileChooserDialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, FileChooserDialogComponent_ng_template_0_div_0_Template, 3, 3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, FileChooserDialogComponent_ng_template_0_div_1_Template, 3, 3, "div", 3);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r1.data.collections && !ctx_r1.path$.value.length && !ctx_r1.canSelectHome);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r1.folderIsWritable());
  }
}
function FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("esIcon", tab_r8.homeIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 2, tab_r8.label));
  }
}
function FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](0);
  }
}
function FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_ng_template_1_Template, 4, 4, "ng-template", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_ng_container_2_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", _r3)("ngTemplateOutletContext", tab_r8);
  }
}
function FileChooserDialogComponent_mat_tab_group_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-tab-group", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("selectedTabChange", function FileChooserDialogComponent_mat_tab_group_2_Template_mat_tab_group_selectedTabChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r12.onTabChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, FileChooserDialogComponent_mat_tab_group_2_mat_tab_1_Template, 3, 2, "mat-tab", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r2.tabs);
  }
}
function FileChooserDialogComponent_ng_template_3_es_breadcrumbs_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "es-breadcrumbs", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("onClick", function FileChooserDialogComponent_ng_template_3_es_breadcrumbs_1_Template_es_breadcrumbs_onClick_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r20.selectBreadcrumb($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    const label_r15 = ctx_r22.label;
    const homeIcon_r14 = ctx_r22.homeIcon;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("createLink", false)("home", ctx_r16.homeOverride ? ctx_r16.homeOverride.label : _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 3, label_r15))("homeIcon", ctx_r16.homeOverride ? ctx_r16.homeOverride.icon : homeIcon_r14);
  }
}
function FileChooserDialogComponent_ng_template_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 17)(1, "form", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngSubmit", function FileChooserDialogComponent_ng_template_3_div_2_Template_form_ngSubmit_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r23.search());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-form-field", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "mat-label")(4, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function FileChooserDialogComponent_ng_template_3_div_2_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r25.searchQuery = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "NODE_SEARCH"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r17.searchQuery);
  }
}
function FileChooserDialogComponent_ng_template_3_ng_template_4_h5_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h5", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "NO_MORE_ELEMENTS"), " ");
  }
}
function FileChooserDialogComponent_ng_template_3_ng_template_4_h5_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h5", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "NO_MATCHES"), " ");
  }
}
function FileChooserDialogComponent_ng_template_3_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, FileChooserDialogComponent_ng_template_3_ng_template_4_h5_0_Template, 3, 3, "h5", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, FileChooserDialogComponent_ng_template_3_ng_template_4_h5_1_Template, 3, 3, "h5", 22);
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r19.searchMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r19.searchMode);
  }
}
function FileChooserDialogComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, FileChooserDialogComponent_ng_template_3_es_breadcrumbs_1_Template, 2, 5, "es-breadcrumbs", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, FileChooserDialogComponent_ng_template_3_div_2_Template, 7, 4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "es-node-entries-wrapper", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("columnsChange", function FileChooserDialogComponent_ng_template_3_Template_es_node_entries_wrapper_columnsChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r28.checkColumnState($event));
    })("sortChange", function FileChooserDialogComponent_ng_template_3_Template_es_node_entries_wrapper_sortChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r29);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r30.setSorting($event));
    })("clickItem", function FileChooserDialogComponent_ng_template_3_Template_es_node_entries_wrapper_clickItem_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r29);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r31.selectItem($event.element));
    })("fetchData", function FileChooserDialogComponent_ng_template_3_Template_es_node_entries_wrapper_fetchData_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r29);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r32.loadMore());
    })("scrolled", function FileChooserDialogComponent_ng_template_3_Template_es_node_entries_wrapper_scrolled_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r29);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r33.loadMore());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, FileChooserDialogComponent_ng_template_3_ng_template_4_Template, 2, 2, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r4.searchMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r4.searchMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dataSource", ctx_r4.list)("columns", ctx_r4.columns)("configureColumns", true)("displayType", ctx_r4.displayType)("checkbox", false)("sort", ctx_r4.sort)("elementInteractionType", ctx_r4.InteractionType.Emitter)("scrollWindow", false);
  }
}
const SINGLE_COLUMN_WIDTH = 600;
const MULTI_COLUMN_WIDTH = 900;
class FileChooserDialogComponent {
  get defaultSubtitle() {
    return this.defaultSubtitleSubject.value;
  }
  set defaultSubtitle(value) {
    this.defaultSubtitleSubject.next(value);
  }
  constructor(data, dialogRef, connector, collectionApi, nodeApi, toast, breadcrumbsService, translate) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.connector = connector;
    this.collectionApi = collectionApi;
    this.nodeApi = nodeApi;
    this.toast = toast;
    this.breadcrumbsService = breadcrumbsService;
    this.translate = translate;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.InteractionType;
    /**
     * Path to show as breadcrumbs, beginning with the first item after the current home directory.
     */
    this.path$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject([]);
    this.columns = [];
    this.selectedFiles = [];
    this.displayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesDisplayType.Table;
    this.defaultSubtitleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_11__.BehaviorSubject(null);
    this.list = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeDataSource();
    this.hasHeading = true;
    this.tabs = [{
      label: 'WORKSPACE.MY_FILES',
      homeIcon: 'person',
      directory: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.USERHOME,
      canSelectHome: true
    }, {
      label: 'WORKSPACE.SHARED_FILES',
      homeIcon: 'group',
      directory: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.SHARED_FILES,
      canSelectHome: false
    }];
    /** Replace home icon and -label given by tabs. */
    this.homeOverride = null;
    this.loadDirectoryTrigger = new rxjs__WEBPACK_IMPORTED_MODULE_12__.Subject();
    // http://plnkr.co/edit/btpW3l0jr5beJVjohy1Q?p=preview
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_NAME));
  }
  ngOnInit() {
    this.processDialogData();
    this.registerObservables();
    this.initialize();
    this.setDialogConfig();
    this.defaultSubtitleSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(defaultSubtitle => this.data.subtitle ?? defaultSubtitle), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.distinctUntilChanged)()).subscribe(subtitle => this.dialogRef.patchConfig({
      subtitle
    }));
  }
  ngAfterViewInit() {
    this.dialogRef.patchConfig({
      customBottomBarContent: this.bottomBarContent
    });
  }
  setDialogConfig() {
    const config = {
      title: this.data.title,
      width: SINGLE_COLUMN_WIDTH
    };
    this.dialogRef.patchConfig(config);
    if (this.cardIcon) {
      config.avatar = {
        kind: 'icon',
        icon: this.cardIcon
      };
    }
  }
  folderIsWritable() {
    return this.path$?.value?.[this.path$?.value?.length - 1]?.access?.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE) !== -1;
  }
  registerObservables() {
    this.loadDirectoryTrigger.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)(({
      directory,
      reset
    }) => this.loadDirectory(directory, reset))).subscribe();
    this.path$.subscribe(path => {
      this.breadcrumbsService.setNodePath(path);
      this.updateButtons();
    });
  }
  onTabChange(event) {
    const tab = this.tabs[event.index];
    this.setHomeDirectory(tab.directory, {
      canSelectHome: tab.canSelectHome
    });
  }
  setHomeDirectory(directory, {
    canSelectHome = false
  }) {
    this.homeDirectory = directory;
    // FIXME: confusing naming: `canSelectHome` doesn't relate to `selectHome`.
    this.canSelectHome = canSelectHome;
    this.selectHome();
  }
  onSelection(node) {
    this.selectedFiles = node;
  }
  processDialogData() {
    if (this.data.pickDirectory) {
      this.cardIcon = 'folder';
      this.data.filter.push(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.FILTER_FOLDERS);
    }
    if (this.data.collections) {
      this.displayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesDisplayType.SmallGrid;
      this.tabs = null;
      this.setHomeDirectory(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ROOT, {
        canSelectHome: false
      });
      this.hasHeading = false;
      this.searchMode = true;
      this.searchQuery = '';
      this.columns = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_1__.UIHelper.getDefaultCollectionColumns();
      this.sort = {
        active: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_MODIFIED_DATE,
        direction: 'desc',
        columns: []
      };
    } else {
      this.columns = _pages_workspace_page_explorer_explorer_component__WEBPACK_IMPORTED_MODULE_2__.WorkspaceExplorerComponent.getColumns(this.connector);
      this.columns = this.columns.map((c, i) => {
        c.visible = i === 0;
        return c;
      });
      this.sort = {
        active: this.columns[0].name,
        direction: 'asc',
        allowed: true,
        columns: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.POSSIBLE_SORT_BY_FIELDS.filter(s => this.columns.some(c => c.name === s.name))
      };
    }
  }
  initialize() {
    if (this.homeDirectory) {
      this.viewDirectory(this.homeDirectory);
    } else {
      this.setHomeDirectory(this.tabs[0].directory, {
        canSelectHome: this.tabs[0].canSelectHome
      });
    }
  }
  hasWritePermissions(node) {
    if (node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE) == -1) {
      return {
        status: false,
        message: 'NO_WRITE_PERMISSIONS'
      };
    }
    return {
      status: true
    };
  }
  selectBreadcrumb(position) {
    if (position === 0) {
      this.selectHome();
    } else {
      this.selectItem(this.path$.value[position - 1]);
    }
  }
  selectHome() {
    this.homeOverride = null;
    this.path$.next([]);
    this.viewDirectory(this.homeDirectory, true);
  }
  selectItem(event) {
    if (event.isDirectory || this.data.collections) {
      if (this.searchMode) {
        this.selectedFiles = [event];
        this.updateButtons();
        return;
      }
      this.selectedFiles = [];
      if (this.path$.value?.[this.path$.value.length - 1]?.ref.id === event.parent.id) {
        // We selected the direct child of our previous node. Can update the path in place.
        this.path$.next([...this.path$.value, event]);
      } else if (this.path$.value?.some(ancestor => ancestor.ref.id === event.ref.id)) {
        // We selected an ancestor of our previous node. Can update the path in place.
        const index = this.path$.value.findIndex(ancestor => ancestor.ref.id === event.ref.id);
        this.path$.next(this.path$.value.slice(0, index + 1));
      } else {
        // Couldn't update the path in place, load from backend.
        if (this.path$.value.length === 0) {
          // We probably just selected a child of the home directory. Optimistically
          // update accordingly, but fetch the actual data below anyway.
          this.path$.next([event]);
        }
        this.updatePathFromBackend(event.ref.id)
        // Abort when new directory is loaded before we could update the path.
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.takeUntil)(this.loadDirectoryTrigger.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.skip)(1)))).subscribe();
      }
      this.viewDirectory(event.ref.id);
    }
  }
  updatePathFromBackend(id) {
    return this.nodeApi.getNodeParents(id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.tap)(data => {
      this.path$.next(data.nodes.reverse());
      // When `scope` is not set, we didn't get the children of our home directory but
      // instead a path relative to root. This happens for the admin user.
      if (!data.scope) {
        this.homeOverride = {
          label: null,
          icon: data.scope === 'SHARED_FILES' ? 'group' : 'person'
        };
      }
    }));
  }
  onSelectionChanged(event) {
    // Triggered in collection mode.
    this.selectedFiles = event;
    this.updateButtons();
  }
  search() {
    this.viewDirectory(this.homeDirectory);
  }
  viewDirectory(directory, reset = true) {
    this.loadDirectoryTrigger.next({
      directory,
      reset
    });
  }
  loadDirectory(directory, reset = true) {
    this.currentDirectory = directory;
    if (reset) {
      this.list.reset();
      // this.hasMoreToLoad = true; // !this.data.collections; // Collections have no paging
    }

    this.isLoading = true;
    if (this.data.collections) {
      return this.collectionApi.search(this.searchQuery, {
        offset: this.list.getData().length,
        sortBy: [this.sort.active],
        sortAscending: this.sort.direction === 'asc',
        propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL]
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.tap)(data => {
        const list = [];
        for (const c of data.collections) {
          const obj = c;
          // dummy for list-table so it recognizes a collection
          obj.collection = c;
          list.push(obj);
        }
        this.showList({
          pagination: data.pagination,
          nodes: list
        });
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(() => {}));
    } else {
      return this.nodeApi.getChildren(directory, this.data.filter, {
        offset: this.list.getData().length,
        sortBy: [this.sort.active],
        sortAscending: this.sort.direction === 'asc',
        propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL]
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.tap)(list => {
        this.showList(list);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(() => {}));
    }
  }
  loadMore() {
    if (!this.list.hasMore()) {
      return;
    }
    this.viewDirectory(this.currentDirectory, false);
    this.isLoading = true;
  }
  setSorting(data) {
    this.sort = data;
    this.list.reset();
    this.viewDirectory(this.currentDirectory);
  }
  showList(list) {
    this.addToList(list);
    this.updateButtons();
    this.isLoading = false;
  }
  cancel() {
    this.dialogRef.close(null);
  }
  addToList(list) {
    this.isLoading = false;
    if (!list.nodes.length) {
      return;
    }
    this.list.setPagination(list.pagination);
    this.list.appendData(list.nodes);
  }
  chooseDirectory() {
    (() => {
      if (this.path$.value.length) {
        return rxjs__WEBPACK_IMPORTED_MODULE_19__.of(this.path$.value[this.path$.value.length - 1]);
      } else {
        return this.nodeApi.getNodeMetadata(this.homeDirectory).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(nodeWrapper => nodeWrapper.node));
      }
    })().subscribe(node => {
      if (this.data.collections) {
        if (node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE) === -1) {
          this.toast.error(null, 'NO_WRITE_PERMISSIONS');
          return;
        }
      }
      this.dialogRef.close([node]);
    });
  }
  chooseFile() {
    if (this.data.collections) {
      if (this.selectedFiles[0].access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE) == -1) {
        this.toast.error(null, 'NO_WRITE_PERMISSIONS');
        return;
      }
    }
    this.dialogRef.close(this.selectedFiles);
  }
  updateButtons() {
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton(this.translate.instant('CANCEL'), {
      color: 'standard'
    }, () => this.cancel())];
    let confirmButton;
    if (this.data.pickDirectory) {
      if (this.path$.value.length) {
        this.defaultSubtitle = this.path$.value[this.path$.value.length - 1].name;
      } else {
        this.defaultSubtitle = this.translate.instant('SELECT_ROOT_NAME');
      }
      confirmButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton(this.translate.instant('APPLY'), {
        color: 'primary'
      }, () => this.chooseDirectory());
      confirmButton.disabled = !this.path$.value.length && !this.canSelectHome || !this.folderIsWritable();
    } else if (this.data.collections && !this.selectedFiles.length) {
      this.defaultSubtitle = null;
      confirmButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('SELECT_ROOT_DISABLED', {
        color: 'primary'
      }, () => {});
      confirmButton.disabled = true;
    } else if (this.selectedFiles.length) {
      this.defaultSubtitle = this.selectedFiles[0].name;
      confirmButton = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton(this.translate.instant(this.data.collections ? 'SELECT_COLLECTION' : 'SELECT_FILE', {
        name: this.defaultSubtitle
      }), {
        color: 'primary'
      }, () => this.chooseFile());
      confirmButton.disabled = this.data.writeRequired && this.hasWritePermissions(this.selectedFiles[0]).status == false;
    }
    if (confirmButton) {
      buttons.push(confirmButton);
    }
    this.dialogRef.patchConfig({
      buttons
    });
  }
  checkColumnState(event) {
    if (event.filter(i => i.visible).length > 1) {
      this.dialogRef.patchConfig({
        width: MULTI_COLUMN_WIDTH
      });
    } else {
      this.dialogRef.patchConfig({
        width: SINGLE_COLUMN_WIDTH
      });
    }
  }
  static #_ = this.ɵfac = function FileChooserDialogComponent_Factory(t) {
    return new (t || FileChooserDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_5__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: FileChooserDialogComponent,
    selectors: [["es-file-chooser-dialog"]],
    viewQuery: function FileChooserDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.bottomBarContent = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbsService])],
    decls: 5,
    vars: 2,
    consts: [["bottomBarContent", ""], ["mat-stretch-tabs", "", 3, "selectedTabChange", 4, "ngIf", "ngIfElse"], ["tabContent", ""], ["class", "no-permissions", 4, "ngIf"], [1, "no-permissions"], ["mat-stretch-tabs", "", 3, "selectedTabChange"], [4, "ngFor", "ngForOf"], ["mat-tab-label", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "tab-icon", 3, "esIcon"], [1, "tab-label"], [1, "tab-content"], ["class", "breadcrumbFrame", 3, "createLink", "home", "homeIcon", "onClick", 4, "ngIf"], ["class", "searchInputFrame", 4, "ngIf"], ["esInfiniteScroll", "", 1, "fileChooserList", 3, "dataSource", "columns", "configureColumns", "displayType", "checkbox", "sort", "elementInteractionType", "scrollWindow", "columnsChange", "sortChange", "clickItem", "fetchData", "scrolled"], ["empty", ""], [1, "breadcrumbFrame", 3, "createLink", "home", "homeIcon", "onClick"], [1, "searchInputFrame"], ["autocomplete", "off", 3, "ngSubmit"], ["floatLabel", "always"], ["esIcon", "search", "matPrefix", ""], ["matInput", "", "type", "search", "name", "search", 3, "placeholder", "ngModel", "ngModelChange"], ["class", "noElements", 4, "ngIf"], [1, "noElements"]],
    template: function FileChooserDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, FileChooserDialogComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, FileChooserDialogComponent_mat_tab_group_2_Template, 2, 1, "mat-tab-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, FileChooserDialogComponent_ng_template_3_Template, 6, 10, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.tabs)("ngIfElse", _r3);
      }
    },
    dependencies: [_shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_7__.BreadcrumbsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgTemplateOutlet, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.InfiniteScrollDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_22__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_22__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgForm, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatPrefix, _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInput, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_25__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_25__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_25__.MatTabGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%]     es-node-entries-card-grid {\n  display: block;\n  margin: 10px 20px;\n}\n\n.fileChooserOut[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n.no-permissions[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  text-align: center;\n  justify-content: center;\n  padding-bottom: 10px;\n}\n\n.mat-tab-group[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n}\n\n.tab-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.breadcrumbFrame[_ngcontent-%COMP%], .searchInputFrame[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 11px;\n  margin: 0;\n  height: 50px;\n  z-index: 2;\n  width: 100%;\n  background-color: #fff;\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n}\n\n.searchInputFrame[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  padding-bottom: 0;\n  height: auto;\n  display: flex;\n  align-items: center;\n}\n.searchInputFrame[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.searchInputFrame[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  padding: 0 10px;\n}\n.searchInputFrame[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .mat-form-field-wrapper {\n  width: 100%;\n}\n\n.listFrame[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n}\n\n.noElements[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--textLight);\n  display: inline-block;\n  width: 100%;\n  padding-top: 20px;\n}\n\n.fileChooserList[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  overflow-y: auto;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL2ZpbGUtY2hvb3Nlci1kaWFsb2cvZmlsZS1jaG9vc2VyLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxjQUFBO0VBQ0EsaUJBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7QUFBSjs7QUFHQTtFQUNJLHNCRGNjO0FDZGxCOztBQUVBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBOztFQUVJLGNBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VDbkJBLHdDQUFBO0FEcUJKOztBQUVBO0VBQ0ksaUJBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQUFJO0VBQ0ksWUFBQTtBQUVSO0FBQUk7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFFUjtBQUFZO0VBQ0ksV0FBQTtBQUVoQjs7QUFJQTtFQUNJLGFBQUE7RUFDQSxhQUFBO0FBREo7O0FBSUE7RUFDSSxrQkFBQTtFQUNBLHVCRHpEUTtFQzBEUixxQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQURKOztBQUlBO0VBQ0ksaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFESiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46aG9zdCA6Om5nLWRlZXAgZXMtbm9kZS1lbnRyaWVzLWNhcmQtZ3JpZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAxMHB4IDIwcHg7XG59XG5cbi5maWxlQ2hvb3Nlck91dCB7XG4gICAgcGFkZGluZzogMjBweDtcbn1cblxuLmNhcmQtY29udGVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmRDb2xvcjtcbn1cbi5uby1wZXJtaXNzaW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5tYXQtdGFiLWdyb3VwIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnRhYi1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uYnJlYWRjcnVtYkZyYW1lLFxuLnNlYXJjaElucHV0RnJhbWUge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIHBhZGRpbmc6IDExcHg7XG4gICAgbWFyZ2luOiAwO1xuICAgIGhlaWdodDogNTBweDtcbiAgICB6LWluZGV4OiAyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3dCb3R0b20oKTtcbn1cblxuLnNlYXJjaElucHV0RnJhbWUge1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9ybSB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgICAgOjpuZy1kZWVwIHtcbiAgICAgICAgICAgIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmxpc3RGcmFtZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtaW4taGVpZ2h0OiAwO1xufVxuXG4ubm9FbGVtZW50cyB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbn1cblxuLmZpbGVDaG9vc2VyTGlzdCB7XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICB3aWR0aDogMTAwJTtcbn1cbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 94516:
/*!***************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-chooser-dialog/file-chooser-dialog.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileChooserDialogComponent: () => (/* reexport safe */ _file_chooser_dialog_component__WEBPACK_IMPORTED_MODULE_1__.FileChooserDialogComponent),
/* harmony export */   FileChooserDialogModule: () => (/* binding */ FileChooserDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _file_chooser_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-chooser-dialog.component */ 21474);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class FileChooserDialogModule {
  static #_ = this.ɵfac = function FileChooserDialogModule_Factory(t) {
    return new (t || FileChooserDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: FileChooserDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.NodeEntriesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](FileChooserDialogModule, {
    declarations: [_file_chooser_dialog_component__WEBPACK_IMPORTED_MODULE_1__.FileChooserDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.NodeEntriesModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_file-chooser-dialog_file-chooser-dialog_module_ts.js.map