"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_saved-searches-dialog_saved-searches-dialog_module_ts"],{

/***/ 54078:
/*!**********************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/saved-searches-dialog/saved-searches-dialog.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SavedSearchesDialogComponent: () => (/* binding */ SavedSearchesDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 1062);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var src_app_pages_search_page_node_data_source_remote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pages/search-page/node-data-source-remote */ 26523);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngx-translate/core */ 21916);




















const _c0 = ["saveCurrentSearch"];
function SavedSearchesDialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function SavedSearchesDialogComponent_ng_template_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r4.openSaveSearchDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "SEARCH.SAVED_SEARCHES.SAVED_CURRENT_SEARCH"), " ");
  }
}
function SavedSearchesDialogComponent_ng_template_5_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "SEARCH.SAVED_SEARCHES.NO_SAVED_SEARCH"));
  }
}
const _c1 = function (a0) {
  return {
    actionbar: a0
  };
};
function SavedSearchesDialogComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "es-actionbar", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "es-node-entries-wrapper", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("clickItem", function SavedSearchesDialogComponent_ng_template_5_Template_es_node_entries_wrapper_clickItem_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r9.onClick($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, SavedSearchesDialogComponent_ng_template_5_ng_template_3_Template, 3, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](1);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dataSource", ctx_r2.mySavedSearchesSource)("columns", ctx_r2.columns)("displayType", ctx_r2.displayType)("scope", ctx_r2.scope)("initConfig", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](7, _c1, _r6))("elementInteractionType", ctx_r2.interactionType)("singleClickHint", ctx_r2.data.reUrl ? "static" : "dynamic");
  }
}
function SavedSearchesDialogComponent_ng_template_8_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, ctx_r13.searchInputControl.value ? "SEARCH.SAVED_SEARCHES.NO_SAVED_SEARCH_FOUND" : "SEARCH.SAVED_SEARCHES.NO_SAVED_SEARCH"), " ");
  }
}
function SavedSearchesDialogComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "form", 10)(1, "mat-form-field", 11)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "es-actionbar", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "es-node-entries-wrapper", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("clickItem", function SavedSearchesDialogComponent_ng_template_8_Template_es_node_entries_wrapper_clickItem_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r14.onClick($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, SavedSearchesDialogComponent_ng_template_8_ng_template_9_Template, 3, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](7);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 9, "SEARCH.SAVED_SEARCHES.SEARCH_INPUT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formControl", ctx_r3.searchInputControl);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dataSource", ctx_r3.sharedSavedSearchesSource)("columns", ctx_r3.columns)("displayType", ctx_r3.displayType)("scope", ctx_r3.scope)("initConfig", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](11, _c1, _r11))("elementInteractionType", ctx_r3.interactionType)("singleClickHint", ctx_r3.data.reUrl ? "static" : "dynamic");
  }
}
class SavedSearchesDialogComponent {
  /**
   * The current node-entries component.
   *
   * Updates when tabs are switched.
   */
  get nodeEntries() {
    return this._nodeEntries.value;
  }
  set nodeEntries(value) {
    this._nodeEntries.next(value);
  }
  constructor(data, dialogRef, dialogs, savedSearchesService, nodeHelper, injector) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialogs = dialogs;
    this.savedSearchesService = savedSearchesService;
    this.nodeHelper = nodeHelper;
    this.injector = injector;
    this._nodeEntries = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(null);
    this.mySavedSearchesSource = new src_app_pages_search_page_node_data_source_remote__WEBPACK_IMPORTED_MODULE_3__.NodeDataSourceRemote(this.injector);
    this.sharedSavedSearchesSource = new src_app_pages_search_page_node_data_source_remote__WEBPACK_IMPORTED_MODULE_3__.NodeDataSourceRemote(this.injector);
    this.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.ListItem('NODE', 'title')];
    this.displayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.NodeEntriesDisplayType.Table;
    this.scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.Scope.SavedSearches;
    this.interactionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.InteractionType.Emitter;
    this.searchInputControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('');
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.registerMySavedSearchesSource();
    this.registerSharedSavedSearchesSource();
  }
  ngOnInit() {
    this.dialogRef.patchConfig({
      customHeaderBarContent: this.saveCurrentSearchRef,
      buttons: this.getButtons()
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  registerMySavedSearchesSource() {
    this.mySavedSearchesSource;
    const subject = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(null);
    this.savedSearchesService.observeMySavedSearches().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.destroyed)).subscribe(subject);
    // `NodeDataSourceRemote` doesn't account for remote observables that emit multiple times.
    // So we set a new remote each time `observeSavedSearches` emits.
    subject.subscribe(() => this.mySavedSearchesSource.setRemote(({
      range
    }) => subject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.first)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(savedSearches => ({
      data: savedSearches
      // TODO: Configure the data source / node entries to not use pagination
      // instead of simulating pagination like this.
      .slice(range.startIndex, range.endIndex).map(({
        node
      }) => node),
      total: savedSearches.length
    })))));
  }
  registerSharedSavedSearchesSource() {
    this.searchInputControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.startWith)(null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.debounceTime)(300)).subscribe(value => {
      this.sharedSavedSearchesSource.setRemote(params => this.savedSearchesService.getSharedSavedSearchesNodes({
        searchString: value,
        ...params.range
      }));
    });
  }
  getButtons() {
    const buttons = [];
    if (this.data.reUrl) {
      buttons.push(new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SEARCH.SAVED_SEARCHES.EMBED_BUTTON', {
        color: 'standard'
      }, () => this.embedSelectedSearch()));
    }
    buttons.push(new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SEARCH.SAVED_SEARCHES.SEARCH_BUTTON', {
      color: 'primary'
    }, () => this.closeDialogWithResult()));
    this._nodeEntries.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.switchMap)(nodeEntries => nodeEntries.getSelection().changed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.startWith)(void 0)).subscribe(() => {
      const buttonsEnabled = this.nodeEntries?.getSelection().selected.length === 1;
      buttons.forEach(button => button.disabled = !buttonsEnabled);
    });
    return buttons;
  }
  onClick(node) {
    if (this.data.reUrl) {
      this.nodeEntries.getSelection().clear();
      this.nodeEntries.getSelection().select(node);
    } else {
      this.closeDialogWithResult(node);
    }
  }
  /**
   * Closes the dialog and returns the given or the currently selected saved-search node as
   * result.
   */
  closeDialogWithResult(node = this.nodeEntries.getSelection().selected[0]) {
    const savedSearch = this.savedSearchesService.savedSearchNodeToSavedSearch(node);
    this.dialogRef.close(savedSearch);
  }
  openSaveSearchDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openSaveSearchDialog(_this.data.saveSearchData);
      dialogRef.afterClosed().subscribe(savedSearch => {
        _this.nodeEntries.getSelection().clear();
        _this.nodeEntries.getSelection().select(savedSearch.node);
      });
    })();
  }
  embedSelectedSearch() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let savedSearch = _this2.nodeEntries.getSelection().selected[0];
      _this2.nodeHelper.addNodeToLms(savedSearch, _this2.data.reUrl);
    })();
  }
  static #_ = this.ɵfac = function SavedSearchesDialogComponent_Factory(t) {
    return new (t || SavedSearchesDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_5__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.SavedSearchesService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: SavedSearchesDialogComponent,
    selectors: [["es-saved-searches-dialog"]],
    viewQuery: function SavedSearchesDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.NodeEntriesWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.saveCurrentSearchRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
      }
    },
    decls: 9,
    vars: 6,
    consts: [["saveCurrentSearch", ""], [3, "label"], ["matTabContent", ""], ["mat-raised-button", "", 3, "click"], ["esIcon", "star_outline"], [1, "actionbar"], ["actionbar", ""], [3, "dataSource", "columns", "displayType", "scope", "initConfig", "elementInteractionType", "singleClickHint", "clickItem"], ["empty", ""], [1, "no-results-notice"], [1, "search-input-form"], [1, "search-input-field"], ["matInput", "", 3, "formControl"]],
    template: function SavedSearchesDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, SavedSearchesDialogComponent_ng_template_0_Template, 4, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-tab-group")(3, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, SavedSearchesDialogComponent_ng_template_5_Template, 5, 9, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](7, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, SavedSearchesDialogComponent_ng_template_8_Template, 11, 13, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 2, "SEARCH.SAVED_SEARCHES.TAB_MY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](7, 4, "SEARCH.SAVED_SEARCHES.TAB_SHARED"));
      }
    },
    dependencies: [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgForm, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_22__.MatInput, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__.MatTabContent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__.MatTabGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%]     .mat-mdc-tab-body-content {\n  display: flex;\n  flex-direction: column;\n}\n\n.mat-tab-group[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.mat-tab-group[_ngcontent-%COMP%]     .mat-tab-body-wrapper {\n  flex-grow: 1;\n}\n\n.search-input-form[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 25px 25px 0;\n}\n.search-input-form[_ngcontent-%COMP%]   .search-input-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.search-input-form[_ngcontent-%COMP%]   .search-input-field[_ngcontent-%COMP%]     .mat-form-field-wrapper {\n  padding: 0;\n}\n\n.actionbar[_ngcontent-%COMP%] {\n  padding: 25px 25px 0;\n  align-self: flex-end;\n}\n\n.no-results-notice[_ngcontent-%COMP%] {\n  padding: 25px;\n  color: var(--textLight);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NhdmVkLXNlYXJjaGVzLWRpYWxvZy9zYXZlZC1zZWFyY2hlcy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtBQUFKO0FBQ0k7RUFDSSxZQUFBO0FBQ1I7O0FBR0E7RUFDSSxhQUFBO0VBQ0Esb0JBQUE7QUFBSjtBQUNJO0VBQ0ksWUFBQTtBQUNSO0FBQVE7RUFDSSxVQUFBO0FBRVo7O0FBR0E7RUFDSSxvQkFBQTtFQUNBLG9CQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsdUJEaEJRO0FDZ0JaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjpob3N0IDo6bmctZGVlcCAubWF0LW1kYy10YWItYm9keS1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5tYXQtdGFiLWdyb3VwIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgJiA6Om5nLWRlZXAgLm1hdC10YWItYm9keS13cmFwcGVyIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgIH1cbn1cblxuLnNlYXJjaC1pbnB1dC1mb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IDI1cHggMjVweCAwO1xuICAgIC5zZWFyY2gtaW5wdXQtZmllbGQge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICYgOjpuZy1kZWVwIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5hY3Rpb25iYXIge1xuICAgIHBhZGRpbmc6IDI1cHggMjVweCAwO1xuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xufVxuXG4ubm8tcmVzdWx0cy1ub3RpY2Uge1xuICAgIHBhZGRpbmc6IDI1cHg7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 98399:
/*!*******************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/saved-searches-dialog/saved-searches-dialog.module.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SavedSearchesDialogComponent: () => (/* reexport safe */ _saved_searches_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SavedSearchesDialogComponent),
/* harmony export */   SavedSearchesDialogModule: () => (/* binding */ SavedSearchesDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _saved_searches_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saved-searches-dialog.component */ 54078);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class SavedSearchesDialogModule {
  static #_ = this.ɵfac = function SavedSearchesDialogModule_Factory(t) {
    return new (t || SavedSearchesDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: SavedSearchesDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.NodeEntriesModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SavedSearchesDialogModule, {
    declarations: [_saved_searches_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SavedSearchesDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.NodeEntriesModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_saved-searches-dialog_saved-searches-dialog_module_ts.js.map