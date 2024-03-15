"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_search-page_search-page_module_ts"],{

/***/ 58574:
/*!*****************************************************************!*\
  !*** ./src/app/pages/search-page/global-search-page.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalSearchPageService: () => (/* binding */ GlobalSearchPageService),
/* harmony export */   GlobalSearchPageServiceInternal: () => (/* binding */ GlobalSearchPageServiceInternal)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);


/**
 * Singleton service for public interfacing with the search page.
 */
class GlobalSearchPageService {
  constructor(internal) {
    this.internal = internal;
  }
  /**
   * Register custom templates to replace or extend standard components within the search page.
   */
  setCustomTemplates(customTemplates) {
    this.internal.customTemplates.next(customTemplates);
  }
  static #_ = this.ɵfac = function GlobalSearchPageService_Factory(t) {
    return new (t || GlobalSearchPageService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](GlobalSearchPageServiceInternal));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: GlobalSearchPageService,
    factory: GlobalSearchPageService.ɵfac,
    providedIn: 'root'
  });
}
/**
 * Internal part of the `GlobalSearchPageService` for use within the search page component and
 * services only.
 */
class GlobalSearchPageServiceInternal {
  constructor() {
    this.customTemplates = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject({});
  }
  static #_ = this.ɵfac = function GlobalSearchPageServiceInternal_Factory(t) {
    return new (t || GlobalSearchPageServiceInternal)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: GlobalSearchPageServiceInternal,
    factory: GlobalSearchPageServiceInternal.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 11257:
/*!***********************************************************!*\
  !*** ./src/app/pages/search-page/repository-icon.pipe.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RepositoryIconPipe: () => (/* binding */ RepositoryIconPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);


class RepositoryIconPipe {
  constructor(nodeHelper) {
    this.nodeHelper = nodeHelper;
  }
  transform(value) {
    return this.nodeHelper.getSourceIconRepoPath(value);
  }
  static #_ = this.ɵfac = function RepositoryIconPipe_Factory(t) {
    return new (t || RepositoryIconPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_0__.NodeHelperService, 16));
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "repositoryIcon",
    type: RepositoryIconPipe,
    pure: true
  });
}

/***/ }),

/***/ 33670:
/*!***********************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-filter-bar.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageFilterBarComponent: () => (/* binding */ SearchPageFilterBarComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 89718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 51063);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../features/mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _global_search_page_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global-search-page.service */ 58574);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/select */ 96355);























function SearchPageFilterBarComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SearchPageFilterBarComponent_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.openSavedSearchesDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 2, "SEARCH.SAVED_SEARCHES.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 4, "SEARCH.SAVED_SEARCHES.TITLE"), "\n");
  }
}
function SearchPageFilterBarComponent_mat_form_field_1_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const mds_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", mds_r7.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", mds_r7.name, " ");
  }
}
function SearchPageFilterBarComponent_mat_form_field_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-form-field", 6)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, SearchPageFilterBarComponent_mat_form_field_1_mat_option_5_Template, 2, 2, "mat-option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 3, "SEARCH.METADATASET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx_r1.activeMdsForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 5, ctx_r1.availableMetadataSets));
  }
}
function SearchPageFilterBarComponent_es_mds_editor_wrapper_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-mds-editor-wrapper", 10);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("repository", ctx_r2.mdsParams.repository)("setId", ctx_r2.mdsParams.setId)("embedded", true)("currentValues", ctx_r2.searchFilterValues)("externalFilters", ctx_r2.mdsExternalFilters);
  }
}
function SearchPageFilterBarComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0);
  }
}
class SearchPageFilterBarComponent {
  constructor(authentication, dialogs, globalSearchPageInternal, ngZone, searchPage, searchService, translate) {
    this.authentication = authentication;
    this.dialogs = dialogs;
    this.globalSearchPageInternal = globalSearchPageInternal;
    this.ngZone = ngZone;
    this.searchPage = searchPage;
    this.searchService = searchService;
    this.translate = translate;
    this.activeRepository = this.searchPage.activeRepository;
    this.availableMetadataSets = this.searchPage.availableMetadataSets;
    this.activeMetadataSet = this.searchPage.activeMetadataSet;
    this.activeMdsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormControl(this.activeMetadataSet.getValue());
    this.searchFilters = this.searchPage.searchFilters;
    this.reUrl = this.searchPage.reUrl;
    this.customTemplates = this.globalSearchPageInternal.customTemplates;
    this.mdsParams = null;
    this.savedSearchesButtonIsVisible = false;
    this.mdsInitialized = false;
    this.causedValueChange = false;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
  }
  ngOnInit() {
    this.registerSearchFilterOverride();
    this.activeMetadataSet.registerFormControl(this.activeMdsForm);
    this.registerMdsEditor();
    this.searchFilters.observeUserValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(values => {
      this.searchFilterValues = JSON.parse(JSON.stringify(values ?? {}));
    });
    this.registerSavedSearches();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  openSavedSearchesDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openSavedSearchesDialog({
        saveSearchData: {
          name: yield _this.getSavedSearchInitialName(),
          searchString: _this.searchPage.searchString.getValue()
        },
        reUrl: _this.reUrl.value || null
      });
      dialogRef.afterClosed().subscribe(selectedSavedSearch => {
        if (selectedSavedSearch) {
          _this.applySavedSearch(selectedSavedSearch);
        }
      });
    })();
  }
  applySavedSearch(savedSearch) {
    this.searchPage.activeRepository.setUserValue(savedSearch.repository);
    this.searchPage.activeMetadataSet.setUserValue(savedSearch.metadataSet);
    this.searchPage.searchString.setUserValue(savedSearch.searchString);
    this.searchPage.searchFilters.setUserValue(savedSearch.filters);
  }
  getSavedSearchInitialName() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let components = [];
      if (_this2.activeRepository.getUserValue()) {
        const repo = _this2.searchPage.availableRepositories.value.find(({
          id
        }) => id === _this2.activeRepository.getUserValue());
        if (repo) {
          components.push(repo.title);
        }
      }
      if (_this2.searchPage.searchString.getValue()) {
        components.push(`"${_this2.searchPage.searchString.getValue()}"`);
      }
      const filters = yield _this2.searchService.getFilters().toPromise();
      const filterLabels = Object.values(filters).flat().map(({
        label
      }) => label);
      components = [...components, ...filterLabels];
      if (components.length > 0) {
        return components.join(' - ');
      } else {
        return _this2.translate.get('SEARCH.SAVE_SEARCH.ALL_ITEMS').toPromise();
      }
    })();
  }
  /**
   * Overrides the search-filter value with null when the active repository or metadata set
   * changes.
   *
   * We do this to inhibit search requests until the mds editor is ready. We unset the override
   * when it is. There are two reasons for this:
   * 1. The mds editor might have default values we need to include in the search request.
   * 2. The mds editor might request facets that will be fetched with the search request and need
   *    to be registered before the search request is fired to be considered.
   */
  registerSearchFilterOverride() {
    rxjs__WEBPACK_IMPORTED_MODULE_10__.merge(this.activeRepository.observeValue(), this.activeMetadataSet.observeValue()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(() => {
      this.searchFilters.setOverrideValue(null);
    });
  }
  registerMdsEditor() {
    rxjs__WEBPACK_IMPORTED_MODULE_11__.forkJoin([this.activeRepository.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.first)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull)), this.activeMetadataSet.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.first)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull))]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.tap)(([repository, setId]) => this.mdsParams = {
      repository,
      setId
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.delay)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(() => this.initMdsEditor());
    this.searchPage.searchString.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(searchString => {
      if (searchString) {
        this.mdsExternalFilters = {
          [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PRIMARY_SEARCH_CRITERIA]: [searchString]
        };
      } else {
        this.mdsExternalFilters = null;
      }
    });
  }
  registerSavedSearches() {
    this.authentication.observeLoginInfo().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(loginInfo => loginInfo && !loginInfo.isGuest)).subscribe(value => this.savedSearchesButtonIsVisible = value);
  }
  initMdsEditor() {
    this.mdsEditor.mdsEditorInstance.values.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(values => this.onMdsValuesChange(values));
    this.mdsEditor.getInstanceService().widgets.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(mdsWidgets => this.searchPage.filtersMdsWidgets.next(mdsWidgets));
    rxjs__WEBPACK_IMPORTED_MODULE_10__.merge(this.activeMetadataSet.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.skip)(1)), this.activeRepository.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.skip)(1)), this.searchFilters.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.skip)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(() => !this.causedValueChange))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(() => (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.notNull)(this.activeMetadataSet.getValue()))).subscribe(() => this.resetMds());
    this.mdsEditor.mdsEditorInstance.getNeededFacets().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroyed)).subscribe(neededFacets => this.searchPage.facetsToFetch.next(neededFacets));
  }
  // TODO: Provide this functionality in mds editor.
  onMdsValuesChange(values) {
    values = JSON.parse(JSON.stringify(values));
    this.causedValueChange = true;
    if (this.mdsInitialized) {
      const userValues = getUserValues(values, this.defaultValues);
      // console.log('onMdsValuesChange', { values, userValues });
      this.searchFilters.setUserValue(userValues);
    } else {
      this.mdsInitialized = true;
      const userValues = stripValues(this.searchFilters.getUserValue() ?? {}, values);
      const defaultValues = getDefaultValues(values, userValues);
      // console.log('onMdsInitialValues', { values, defaultValues, userValues });
      this.defaultValues = defaultValues;
      this.searchFilters.setSystemValue(defaultValues);
      this.searchFilters.setUserValue(userValues);
      this.searchFilters.unsetOverrideValue();
    }
    this.ngZone.runOutsideAngular(() => setTimeout(() => this.causedValueChange = false));
  }
  resetMds() {
    this.mdsParams = {
      repository: this.activeRepository.getValue(),
      setId: this.activeMetadataSet.getValue()
    };
    // console.log('resetMds', this.mdsParams);
    this.mdsInitialized = false;
    // Wait for search-filter values to propagate via data binding to the mds editor.
    setTimeout(() => {
      // TODO: This should work automatically when updating the mds editor's setId.
      void this.mdsEditor.reInit();
    });
  }
  static #_ = this.ɵfac = function SearchPageFilterBarComponent_Factory(t) {
    return new (t || SearchPageFilterBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_20__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_global_search_page_service__WEBPACK_IMPORTED_MODULE_4__.GlobalSearchPageServiceInternal), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_search_page_service__WEBPACK_IMPORTED_MODULE_5__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_20__.SearchService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: SearchPageFilterBarComponent,
    selectors: [["es-search-page-filter-bar"]],
    viewQuery: function SearchPageFilterBarComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_2__.MdsEditorWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.mdsEditor = _t.first);
      }
    },
    decls: 5,
    vars: 6,
    consts: [["mat-stroked-button", "", "color", "primary", "class", "saved-searches-button", 3, "matTooltip", "click", 4, "ngIf"], ["appearance", "fill", 4, "ngIf"], ["class", "mds-editor", "groupId", "ngsearch", "mode", "search", 3, "repository", "setId", "embedded", "currentValues", "externalFilters", 4, "ngIf"], [4, "ngTemplateOutlet"], ["mat-stroked-button", "", "color", "primary", 1, "saved-searches-button", 3, "matTooltip", "click"], ["esIcon", "bookmark_outline"], ["appearance", "fill"], [3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["groupId", "ngsearch", "mode", "search", 1, "mds-editor", 3, "repository", "setId", "embedded", "currentValues", "externalFilters"]],
    template: function SearchPageFilterBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SearchPageFilterBarComponent_button_0_Template, 5, 6, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SearchPageFilterBarComponent_mat_form_field_1_Template, 7, 7, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SearchPageFilterBarComponent_es_mds_editor_wrapper_3_Template, 1, 5, "es-mds-editor-wrapper", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, SearchPageFilterBarComponent_ng_container_4_Template, 1, 0, "ng-container", 3);
      }
      if (rf & 2) {
        let tmp_1_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.savedSearchesButtonIsVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ((tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 4, ctx.availableMetadataSets)) == null ? null : tmp_1_0.length) > 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.mdsParams);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", ctx.customTemplates.value.filterBarBottom);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgTemplateOutlet, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_material_core__WEBPACK_IMPORTED_MODULE_24__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_25__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_27__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_2__.MdsEditorWrapperComponent, _angular_common__WEBPACK_IMPORTED_MODULE_22__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe],
    styles: ["[_nghost-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n.saved-searches-button[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.mds-editor[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvc2VhcmNoLXBhZ2Uvc2VhcmNoLXBhZ2UtZmlsdGVyLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5zYXZlZC1zZWFyY2hlcy1idXR0b24ge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5tZHMtZWRpdG9yIHtcbiAgICBmbGV4LWdyb3c6IDE7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}
function getUserValues(mergedValues, defaultValues) {
  const userValues = {};
  for (const [key, value] of Object.entries(mergedValues)) {
    if (value.length > 0 && JSON.stringify(defaultValues[key]) !== JSON.stringify(value)) {
      userValues[key] = value;
    }
  }
  if (Object.keys(userValues).length > 0) {
    return userValues;
  } else {
    return null;
  }
}
function getDefaultValues(mergedValues, userValues) {
  const defaultValues = {};
  for (const [key, value] of Object.entries(mergedValues)) {
    if (value.length > 0 && !userValues?.[key]) {
      defaultValues[key] = value;
    }
  }
  return defaultValues;
}
function stripValues(values, availableValues) {
  const strippedValues = {};
  for (const [key, value] of Object.entries(values)) {
    if (key in availableValues) {
      strippedValues[key] = value;
    }
  }
  if (Object.keys(strippedValues).length > 0) {
    return strippedValues;
  } else {
    return null;
  }
}
function objectDifference(a, b) {
  a = {
    ...a
  };
  for (const key in Object.keys(b)) {
    delete a[key];
  }
  return a;
}

/***/ }),

/***/ 82895:
/*!******************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-restore.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageRestoreService: () => (/* binding */ SearchPageRestoreService)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 26575);








class RestoreEntry {
  constructor(navigationId) {
    /**
     * The event's lifecycle state.
     *
     * - 'active': The entry represents the active page. State is being pushed into the entry.
     * - 'restore': The browser has just navigated back to page represented by the entry. The entry is
     *   ready to be restored.
     */
    this.state = null;
    this.scrollPosition = null;
    this.dataSourceStates = {};
    this.navigationId = navigationId;
  }
}
class SearchPageRestoreService {
  constructor(_router, _viewportScroller) {
    this._router = _router;
    this._viewportScroller = _viewportScroller;
    this._entries = [];
    this._restoreScrollTrigger = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this._currentNavigationId = 1;
    this._registerRouterEvents();
    this._registerRestoreScrollTrigger();
  }
  registerDataSource(key, dataSource) {
    dataSource.connect().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(() => !dataSource.isLoading), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.debounceTime)(0)).subscribe(() => this._putState(key, dataSource.dumpState()));
    dataSource.registerRestoreFunction(() => this._restoreState(key));
  }
  _restoreState(key) {
    const entry = this._getRestoreEntry();
    this._restoreScrollTrigger.next(entry);
    return entry?.dataSourceStates[key] ?? null;
  }
  _registerRestoreScrollTrigger() {
    this._restoreScrollTrigger.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(({
      scrollPosition
    }) => scrollPosition), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.notNull),
    // In case the page hasn't been populated yet, wait another tick before attempting
    // to scroll.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(scrollPosition => {
      if (document.documentElement.scrollHeight < window.innerHeight + scrollPosition[1]) {
        return rxjs__WEBPACK_IMPORTED_MODULE_6__.of(scrollPosition).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.delay)(0));
      } else {
        return rxjs__WEBPACK_IMPORTED_MODULE_6__.of(scrollPosition);
      }
    })).subscribe(scrollPosition => {
      this._viewportScroller.scrollToPosition(scrollPosition);
    });
  }
  _putState(key, state) {
    const entry = this._getEntryOrCreate();
    entry.state = 'active';
    entry.dataSourceStates[key] = state;
  }
  _getRestoreEntry() {
    return this._entries.find(({
      state,
      navigationId
    }) => state === 'restore' && navigationId === this._currentNavigationId) ?? null;
  }
  _getEntryOrCreate() {
    let entry = this._entries.find(({
      navigationId
    }) => navigationId === this._currentNavigationId);
    if (entry == null) {
      entry = new RestoreEntry(this._currentNavigationId);
      this._entries.push(entry);
    }
    return entry;
  }
  _registerRouterEvents() {
    this._router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationStart)).subscribe(event => {
      this._currentNavigationId = event.id;
      if (event.navigationTrigger === 'popstate') {
        // `restoredState` can be undefined when using `MockLocationStrategy`. This is
        // the case for the app-as-web-component project. In this case, we restoring
        // will not work.
        //
        // TODO: If this is a use case, extend `MockLocationStrategy` to implement
        // `onPopState` in a way that provides `state.navigationId`.
        const restoredId = event.restoredState?.navigationId;
        const entry = this._entries.find(({
          navigationId
        }) => navigationId === restoredId);
        if (entry) {
          entry.state = 'restore';
          entry.navigationId = event.id;
        }
      }
    });
    this._router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.Scroll)).subscribe(event => {
      if (event.position) {
        this._getEntryOrCreate().scrollPosition = event.position;
      }
    });
  }
  static #_ = this.ɵfac = function SearchPageRestoreService_Factory(t) {
    return new (t || SearchPageRestoreService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_10__.ViewportScroller));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
    token: SearchPageRestoreService,
    factory: SearchPageRestoreService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 66258:
/*!************************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-results-all.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageResultsAllComponent: () => (/* binding */ SearchPageResultsAllComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _search_page_results_all_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-page-results-all.service */ 42081);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _shared_components_small_collection_small_collection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/small-collection/small-collection.component */ 61472);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 21916);













const _c0 = function (a0) {
  return [a0];
};
function SearchPageResultsAllComponent_es_small_collection_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "es-small-collection", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "es-actionbar", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const addToCollection_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("collection", addToCollection_r6.collection)("titleLabel", "SEARCH.ADD_INTO_COLLECTION")("titleLabelShort", "SEARCH.ADD_INTO_COLLECTION_SHORT");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c0, addToCollection_r6.customOptions.addOptions[0]));
  }
}
function SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const repo_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" (", repo_r7.dataSource.getTotal(), ") ");
  }
}
const _c1 = function () {
  return [".."];
};
function SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const repo_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](5, _c1))("queryParams", ctx_r11.getShowMoreQueryParams(repo_r7.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 3, "SHOW_MORE"), " ");
  }
}
function SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9)(1, "h2", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_ng_container_4_Template, 2, 1, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_a_5_Template, 4, 6, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const repo_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 4, repo_r7.title), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !repo_r7.dataSource.isLoading)("ngIfElse", _r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", repo_r7.dataSource.getTotal() > repo_r7.dataSource.getData().length);
  }
}
const _c2 = function () {
  return {
    layout: "scroll"
  };
};
const _c3 = function (a0) {
  return {
    customOptions: a0
  };
};
function SearchPageResultsAllComponent_es_node_entries_wrapper_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "es-node-entries-wrapper", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SearchPageResultsAllComponent_es_node_entries_wrapper_1_ng_template_2_Template, 6, 6, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const repo_r7 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("display-none", repo_r7.dataSource.isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", repo_r7.dataSource)("scope", ctx_r1.Scope.Search)("columns", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 10, repo_r7.columns))("disableInfiniteScroll", true)("displayType", ctx_r1.NodeEntriesDisplayType.Grid)("gridConfig", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](12, _c2))("checkbox", false)("initConfig", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](13, _c3, ctx_r1.addToCollectionMode.value == null ? null : ctx_r1.addToCollectionMode.value.customOptions));
  }
}
function SearchPageResultsAllComponent_es_spinner_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "es-spinner");
  }
}
function SearchPageResultsAllComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 1, "SEARCH.QUERY_NO_RESULT"), "\n");
  }
}
function SearchPageResultsAllComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-spinner", 17);
  }
}
class SearchPageResultsAllComponent {
  constructor(_searchPage, _results) {
    this._searchPage = _searchPage;
    this._results = _results;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.Scope;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.NodeEntriesDisplayType;
    this.repoData = this._results.repoData;
    this.loadingProgress = this._results.loadingProgress;
    this.addToCollectionMode = this._searchPage.addToCollectionMode;
    this.allEmpty = false;
    this._searchString = this._searchPage.searchString;
    this._activeRepository = this._searchPage.activeRepository;
  }
  ngOnInit() {
    setTimeout(() => {
      this._searchPage.results = this._results;
      this._searchPage.showingAllRepositories.next(true);
    });
    this._registerAllEmpty();
  }
  getShowMoreQueryParams(repoId) {
    return {
      ...this._searchString.getQueryParamEntry(),
      ...this._activeRepository.getQueryParamEntry(repoId)
    };
  }
  _registerAllEmpty() {
    this.loadingProgress.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(progress => {
      if (progress < 100) {
        return false;
      } else {
        return this.repoData.value.every(r => r.dataSource.isEmpty());
      }
    })).subscribe(allEmpty => this.allEmpty = allEmpty);
  }
  static #_ = this.ɵfac = function SearchPageResultsAllComponent_Factory(t) {
    return new (t || SearchPageResultsAllComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_search_page_service__WEBPACK_IMPORTED_MODULE_1__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_search_page_results_all_service__WEBPACK_IMPORTED_MODULE_0__.SearchPageResultsAllService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: SearchPageResultsAllComponent,
    selectors: [["es-search-page-results-all"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_search_page_results_all_service__WEBPACK_IMPORTED_MODULE_0__.SearchPageResultsAllService])],
    decls: 8,
    vars: 8,
    consts: [["class", "add-to-collection-banner", 3, "collection", "titleLabel", "titleLabelShort", 4, "ngIf"], ["class", "entries-wrapper", 3, "display-none", "dataSource", "scope", "columns", "disableInfiniteScroll", "displayType", "gridConfig", "checkbox", "initConfig", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "no-search-results-message", 4, "ngIf"], ["smallLoadingSpinner", ""], [1, "add-to-collection-banner", 3, "collection", "titleLabel", "titleLabelShort"], ["backgroundType", "primary", 3, "options"], [1, "entries-wrapper", 3, "dataSource", "scope", "columns", "disableInfiniteScroll", "displayType", "gridConfig", "checkbox", "initConfig"], ["title", ""], [1, "title-container"], [1, "mat-heading-2"], [4, "ngIf", "ngIfElse"], ["mat-button", "", 3, "routerLink", "queryParams", 4, "ngIf"], ["mat-button", "", 3, "routerLink", "queryParams"], ["esIcon", "keyboard_arrow_right"], [1, "no-search-results-message"], ["esIcon", "search"], ["diameter", "24", 1, "small-progress-spinner"]],
    template: function SearchPageResultsAllComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SearchPageResultsAllComponent_es_small_collection_0_Template, 2, 6, "es-small-collection", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SearchPageResultsAllComponent_es_node_entries_wrapper_1_Template, 4, 15, "es-node-entries-wrapper", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SearchPageResultsAllComponent_es_spinner_3_Template, 1, 0, "es-spinner", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, SearchPageResultsAllComponent_div_5_Template, 4, 3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, SearchPageResultsAllComponent_ng_template_6_Template, 1, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.addToCollectionMode.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 4, ctx.repoData));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 6, ctx.loadingProgress) < 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.allEmpty);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.NodeEntriesWrapperComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatAnchor, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__.MatProgressSpinner, _shared_components_small_collection_small_collection_component__WEBPACK_IMPORTED_MODULE_2__.SmallCollectionComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.TitleCasePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
    styles: ["\n\n.add-to-collection-banner[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 1.5rem;\n}\n\n.entries-wrapper[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 1.5rem;\n}\n\n.title-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n}\n.title-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin: 1rem 0;\n}\n.title-container[_ngcontent-%COMP%]   .small-progress-spinner[_ngcontent-%COMP%] {\n  margin-left: 12px;\n}\n\n.no-search-results-message[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.54);\n  text-align: center;\n  padding: 30px 0;\n  font-size: 120%;\n}\n.no-search-results-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 60px;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zZWFyY2gtcGFnZS9zZWFyY2gtcGFnZS1yZXN1bHRzLWFsbC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvc2VhcmNoLXBhZ2UvY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNHQTtFQ0xJLGNBQUE7RUFDQSxrQkFBQTtBREFKOztBQVFBO0VDSkksY0FBQTtFQUNBLGtCQUFBO0FEQUo7O0FBT0E7RUNISSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FEQUo7QUNDSTtFQUNJLFlBQUE7RUFDQSxjQUFBO0FEQ1I7QUNDSTtFQUNJLGlCQUFBO0FEQ1I7O0FBRkE7RUNNSSwwQkYyQ2E7RUUxQ2Isa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBREFKO0FDQ0k7RUFDSSxlQUFBO0VBQ0EsV0FBQTtBRENSIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi9jb21tb24nO1xuXG4vLyAuYWN0aW9uYmFyIHtcbi8vICAgICBkaXNwbGF5OiBmbGV4O1xuLy8gICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4vLyAgICAgbWFyZ2luLXRvcDogMS41cmVtO1xuLy8gfVxuXG4uYWRkLXRvLWNvbGxlY3Rpb24tYmFubmVyIHtcbiAgICBAaW5jbHVkZSBhZGRUb0NvbGxlY3Rpb25CYW5uZXI7XG59XG5cbi5lbnRyaWVzLXdyYXBwZXIge1xuICAgIEBpbmNsdWRlIGVudHJpZXNXcmFwcGVyO1xufVxuXG4udGl0bGUtY29udGFpbmVyIHtcbiAgICBAaW5jbHVkZSB0aXRsZUNvbnRhaW5lcjtcbn1cblxuLm5vLXNlYXJjaC1yZXN1bHRzLW1lc3NhZ2Uge1xuICAgIEBpbmNsdWRlIG5vU2VhcmNoUmVzdWx0c01lc3NhZ2U7XG59XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuQG1peGluIGFkZFRvQ29sbGVjdGlvbkJhbm5lciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG5AbWl4aW4gZW50cmllc1dyYXBwZXIge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuQG1peGluIHRpdGxlQ29udGFpbmVyIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGgyIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICB9XG4gICAgLnNtYWxsLXByb2dyZXNzLXNwaW5uZXIge1xuICAgICAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICB9XG59XG5cbkBtaXhpbiBub1NlYXJjaFJlc3VsdHNNZXNzYWdlIHtcbiAgICBjb2xvcjogJG5vUmVzdWx0c0NvbG9yO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAzMHB4IDA7XG4gICAgZm9udC1zaXplOiAxMjAlO1xuICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDYwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 42081:
/*!**********************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-results-all.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageResultsAllService: () => (/* binding */ SearchPageResultsAllService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _node_data_source_remote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node-data-source-remote */ 26523);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _search_page_restore_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search-page-restore.service */ 82895);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 21916);











class SearchPageResultsAllService {
  constructor(_injector, _search, _searchPage, _searchPageRestore, _mds, _translate) {
    this._injector = _injector;
    this._search = _search;
    this._searchPage = _searchPage;
    this._searchPageRestore = _searchPageRestore;
    this._mds = _mds;
    this._translate = _translate;
    this.repoData = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null);
    this.loadingProgress = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(0);
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this._initRepoData();
    this._registerPageRestore();
    this._registerLoadingProgress();
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  addNodes(nodes) {
    const homeRepoData = this.repoData.value.find(({
      isHome
    }) => isHome);
    homeRepoData?.dataSource.appendData(nodes, 'before');
  }
  _initRepoData() {
    this._searchPage.availableRepositories.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this._destroyed)).subscribe(repositories => {
      this.repoData.next(repositories.map(repository => this._getRepoData(repository)));
    });
  }
  _registerPageRestore() {
    this.repoData.subscribe(repoData => {
      for (const repo of repoData) {
        this._searchPageRestore.registerDataSource(repo.id, repo.dataSource);
      }
    });
  }
  _getRepoData(repository) {
    const loadingParams = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(true);
    const loadingContent = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(true);
    const dataSource = new _node_data_source_remote__WEBPACK_IMPORTED_MODULE_2__.NodeDataSourceRemote(this._injector);
    const metadataSet = this._getMetadataSet(repository);
    const mdsDefinition = metadataSet.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(metadataSet => this._getMdsDefinition(repository, metadataSet)));
    const columns = mdsDefinition.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(mdsDefinition => this._getColumns(mdsDefinition)));
    const sort = mdsDefinition.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(mdsDefinition => this._getDefaultSort(mdsDefinition)));
    rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest([metadataSet, sort, this._searchPage.searchString.observeValue()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(() => loadingParams.next(false)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this._destroyed)).subscribe(([metadataSet, sort, searchString]) => {
      dataSource.setRemote(this._getSearchRemote(repository, metadataSet, sort, searchString));
    });
    dataSource.isLoadingSubject.subscribe(isLoading => loadingContent.next(!!isLoading));
    return {
      title: repository.title,
      id: repository.id,
      isHome: repository.isHomeRepo,
      dataSource,
      columns,
      loadingParams,
      loadingContent
    };
  }
  _getMetadataSet(repository) {
    return this._searchPage.getAvailableMetadataSets(repository).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this._destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(availableMetadataSets => availableMetadataSets[0]));
  }
  _getMdsDefinition(repository, metadataSet) {
    return this._mds.getMetadataSet({
      repository: repository.id,
      metadataSet: metadataSet.id
    });
  }
  _getColumns(mdsDefinition) {
    return this._translate
    // Make sure translations are initialized when MdsHelper calls `instant`.
    .get('dummy').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__.MdsHelper.getColumns(this._translate, mdsDefinition, 'search')));
  }
  _getDefaultSort(mdsDefinition) {
    return _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__.MdsHelper.getSortInfo(mdsDefinition, 'search')?.default;
  }
  _getSearchRemote(repository, metadataSet, sort, searchString) {
    const criteria = searchString ? [{
      property: 'ngsearchword',
      values: [searchString]
    }] : [];
    return request => {
      return this._search.search({
        body: {
          criteria
          // permissions: this.reUrl.value ? [RestConstants.ACCESS_CC_PUBLISH] : [],
        },

        maxItems: request.range.endIndex - request.range.startIndex,
        skipCount: request.range.startIndex,
        sortAscending: sort ? [sort.sortAscending] : null,
        sortProperties: sort ? [sort.sortBy] : null,
        contentType: 'FILES',
        repository: repository.id,
        metadataset: metadataSet.id,
        query: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.DEFAULT_QUERY_NAME,
        propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL]
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(_node_data_source_remote__WEBPACK_IMPORTED_MODULE_2__.fromSearchResults));
    };
  }
  _registerLoadingProgress() {
    this.repoData.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(repoData => rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest([rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest(repoData.map(r => r.loadingParams)), rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest(repoData.map(r => r.loadingContent))])), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(([loadingParams, loadingContent]) => {
      const loadingParamsFinished = loadingParams.filter(isFalse).length;
      const loadingContentFinished = loadingContent.filter(isFalse).length;
      if (loadingParamsFinished === 0) {
        return 10;
      } else if (loadingParamsFinished < loadingParams.length) {
        return loadingParamsFinished / loadingParams.length * 30 + 10;
      } else {
        return loadingContentFinished / loadingContent.length * 60 + 40;
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)()).subscribe(this.loadingProgress);
  }
  static #_ = this.ɵfac = function SearchPageResultsAllService_Factory(t) {
    return new (t || SearchPageResultsAllService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_14__.SearchService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_search_page_service__WEBPACK_IMPORTED_MODULE_3__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_search_page_restore_service__WEBPACK_IMPORTED_MODULE_4__.SearchPageRestoreService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_14__.MdsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
    token: SearchPageResultsAllService,
    factory: SearchPageResultsAllService.ɵfac
  });
}
function isFalse(value) {
  return value === false;
}

/***/ }),

/***/ 9906:
/*!********************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-results.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageResultsComponent: () => (/* binding */ SearchPageResultsComponent)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _search_page_results_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-page-results.service */ 15967);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _global_search_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global-search-page.service */ 58574);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/a11y */ 93170);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ 33910);
/* harmony import */ var _shared_components_small_collection_small_collection_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/small-collection/small-collection.component */ 61472);

















function SearchPageResultsComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](0, 8);
  }
}
function SearchPageResultsComponent_es_small_collection_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-small-collection", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "es-actionbar", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const addToCollection_r11 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("collection", addToCollection_r11.collection)("titleLabel", "SEARCH.ADD_INTO_COLLECTION")("titleLabelShort", "SEARCH.ADD_INTO_COLLECTION_SHORT");
  }
}
function SearchPageResultsComponent_ng_template_3_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" (", ctx_r12.collectionsDataSource.getTotal(), ") ");
  }
}
function SearchPageResultsComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, SearchPageResultsComponent_ng_template_3_ng_container_4_Template, 2, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 3, "SEARCH.COLLECTIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r3.collectionsDataSource.isLoading)("ngIfElse", _r9);
  }
}
function SearchPageResultsComponent_ng_template_8_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMapInterpolate1"]("count ", ctx_r16.getCountClass(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" \u00A0(", ctx_r16.resultsDataSource.getTotal(), ") ");
  }
}
function SearchPageResultsComponent_ng_template_8_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, SearchPageResultsComponent_ng_template_8_ng_container_4_ng_container_1_Template, 3, 4, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r13.resultsDataSource.isEmpty());
  }
}
function SearchPageResultsComponent_ng_template_8_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SearchPageResultsComponent_ng_template_8_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r17.toggleFilters());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 5, "TOGGLE_SEARCH_FILTERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 3, "SEARCH.FILTERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 7, "SEARCH.FILTERS"));
  }
}
function SearchPageResultsComponent_ng_template_8_es_actionbar_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "es-actionbar");
  }
}
function SearchPageResultsComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, SearchPageResultsComponent_ng_template_8_ng_container_4_Template, 2, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, SearchPageResultsComponent_ng_template_8_button_5_Template, 7, 9, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, SearchPageResultsComponent_ng_template_8_es_actionbar_6_Template, 1, 0, "es-actionbar", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](13);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 5, "SEARCH.MATERIALS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r6.resultsDataSource.isLoading)("ngIfElse", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _r4.getSelection().isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r6.addToCollectionMode.value);
  }
}
function SearchPageResultsComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, "SEARCH.QUERY_NO_RESULT"), " ");
  }
}
function SearchPageResultsComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-spinner", 20);
  }
}
const _c0 = function () {
  return {
    layout: "scroll"
  };
};
const _c1 = function (a0, a1) {
  return {
    actionbar: a0,
    customOptions: a1
  };
};
class SearchPageResultsComponent {
  set _actionbar(value) {
    // Avoid changed-after-checked error.
    setTimeout(() => this.actionbar = value);
  }
  constructor(globalSearchPageInternal, results, searchPage, temporaryStorageService, announcer, translate) {
    this.globalSearchPageInternal = globalSearchPageInternal;
    this.results = results;
    this.searchPage = searchPage;
    this.temporaryStorageService = temporaryStorageService;
    this.announcer = announcer;
    this.translate = translate;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.Scope;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesDisplayType;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this.resultsDataSource = this.results.resultsDataSource;
    this.collectionsDataSource = this.results.collectionsDataSource;
    this.resultColumns = this.results.resultColumns;
    this.collectionColumns = this.results.collectionColumns;
    this.sortConfig = this.results.sortConfig;
    this.addToCollectionMode = this.searchPage.addToCollectionMode;
    this.customTemplates = this.globalSearchPageInternal.customTemplates;
    // announce newly loaded elements to users using screen readers
    results.diffCount.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.destroyed),
    // FIXME: replace with takeUntilDestroyed in Angular 16+
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(newlyLoadedElements => this.translate.get('SEARCH.LOADED_RESULTS', {
      count: newlyLoadedElements
    }))).subscribe(elementsLoadedTranslation => {
      this.announcer.announce(elementsLoadedTranslation);
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.searchPage.results = this.results;
      this.searchPage.showingAllRepositories.next(false);
    });
  }
  toggleFilters() {
    const filterBarIsVisible = this.searchPage.filterBarIsVisible;
    filterBarIsVisible.setUserValue(!filterBarIsVisible.getValue());
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.temporaryStorageService.set(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.TemporaryStorageService.NODE_RENDER_PARAMETER_DATA_SOURCE, this.resultsDataSource);
  }
  getCountClass() {
    if (this.searchPage.searchString.getValue()) {
      return 'count-ngsearchword';
    }
    return '';
  }
  static #_ = this.ɵfac = function SearchPageResultsComponent_Factory(t) {
    return new (t || SearchPageResultsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_global_search_page_service__WEBPACK_IMPORTED_MODULE_1__.GlobalSearchPageServiceInternal), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_search_page_results_service__WEBPACK_IMPORTED_MODULE_0__.SearchPageResultsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__.LiveAnnouncer), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: SearchPageResultsComponent,
    selectors: [["es-search-page-results"]],
    viewQuery: function SearchPageResultsComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx._actionbar = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([_search_page_results_service__WEBPACK_IMPORTED_MODULE_0__.SearchPageResultsService])],
    decls: 14,
    vars: 22,
    consts: [["xmlns", "http://www.w3.org/1999/html", 4, "ngTemplateOutlet"], ["class", "add-to-collection-banner", 3, "collection", "titleLabel", "titleLabelShort", 4, "ngIf"], [1, "entries-wrapper", 3, "dataSource", "scope", "columns", "disableInfiniteScroll", "displayType", "gridConfig"], ["title", ""], [1, "entries-wrapper", 3, "dataSource", "scope", "columns", "sort", "primaryInstance", "initConfig"], ["nodeEntriesResults", ""], ["empty", ""], ["smallLoadingSpinner", ""], ["xmlns", "http://www.w3.org/1999/html"], [1, "add-to-collection-banner", 3, "collection", "titleLabel", "titleLabelShort"], ["backgroundType", "primary"], [1, "title-container"], [1, "mat-heading-2"], [4, "ngIf", "ngIfElse"], ["mat-flat-button", "", "color", "primary", "class", "filters-button", 3, "matTooltip", "click", 4, "ngIf"], [4, "ngIf"], ["mat-flat-button", "", "color", "primary", 1, "filters-button", 3, "matTooltip", "click"], ["esIcon", "filter_list"], [1, "no-search-results-message"], ["esIcon", "search"], ["diameter", "24", 1, "small-progress-spinner"]],
    template: function SearchPageResultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SearchPageResultsComponent_ng_container_0_Template, 1, 0, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, SearchPageResultsComponent_es_small_collection_1_Template, 2, 3, "es-small-collection", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "es-node-entries-wrapper", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, SearchPageResultsComponent_ng_template_3_Template, 5, 5, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "es-node-entries-wrapper", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, SearchPageResultsComponent_ng_template_8_Template, 7, 7, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, SearchPageResultsComponent_ng_template_10_Template, 4, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, SearchPageResultsComponent_ng_template_12_Template, 1, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngTemplateOutlet", ctx.customTemplates.value.resultsTop);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.addToCollectionMode.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("display-none", ctx.collectionsDataSource.isEmpty());
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.collectionsDataSource)("scope", ctx.Scope.SearchCollections)("columns", ctx.collectionColumns.value)("disableInfiniteScroll", true)("displayType", ctx.NodeEntriesDisplayType.SmallGrid)("gridConfig", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](18, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.resultsDataSource)("scope", ctx.Scope.Search)("columns", ctx.resultColumns.value)("sort", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 16, ctx.sortConfig))("primaryInstance", true)("initConfig", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](19, _c1, ctx.actionbar, ctx.addToCollectionMode.value == null ? null : ctx.addToCollectionMode.value.customOptions));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgTemplateOutlet, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesWrapperComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinner, _shared_components_small_collection_small_collection_component__WEBPACK_IMPORTED_MODULE_3__.SmallCollectionComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
    styles: ["\n\n.add-to-collection-banner[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 1.5rem;\n}\n\n.entries-wrapper[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 1.5rem;\n}\n\n.title-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n}\n.title-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin: 1rem 0;\n}\n.title-container[_ngcontent-%COMP%]   .small-progress-spinner[_ngcontent-%COMP%] {\n  margin-left: 12px;\n}\n\n.no-search-results-message[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.54);\n  text-align: center;\n  padding: 30px 0;\n  font-size: 120%;\n}\n.no-search-results-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 60px;\n  width: 100%;\n}\n\n@media (max-width: 600px) {\n  .filters-button[_ngcontent-%COMP%] {\n    min-width: 0;\n    min-height: 36px;\n  }\n  .filters-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zZWFyY2gtcGFnZS9zZWFyY2gtcGFnZS1yZXN1bHRzLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zZWFyY2gtcGFnZS9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VDQ0ksY0FBQTtFQUNBLGtCQUFBO0FEQUo7O0FBRUE7RUNFSSxjQUFBO0VBQ0Esa0JBQUE7QURBSjs7QUFDQTtFQ0dJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QURBSjtBQ0NJO0VBQ0ksWUFBQTtFQUNBLGNBQUE7QURDUjtBQ0NJO0VBQ0ksaUJBQUE7QURDUjs7QUFSQTtFQ1lJLDBCRjJDYTtFRTFDYixrQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FEQUo7QUNDSTtFQUNJLGVBQUE7RUFDQSxXQUFBO0FEQ1I7O0FBZEk7RUFESjtJQUVRLFlBQUE7SUFDQSxnQkFBQTtFQWtCTjtFQWpCTTtJQUNJLGFBQUE7RUFtQlY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4vY29tbW9uJztcblxuLmFkZC10by1jb2xsZWN0aW9uLWJhbm5lciB7XG4gICAgQGluY2x1ZGUgYWRkVG9Db2xsZWN0aW9uQmFubmVyO1xufVxuXG4uZW50cmllcy13cmFwcGVyIHtcbiAgICBAaW5jbHVkZSBlbnRyaWVzV3JhcHBlcjtcbn1cblxuLnRpdGxlLWNvbnRhaW5lciB7XG4gICAgQGluY2x1ZGUgdGl0bGVDb250YWluZXI7XG59XG5cbi5uby1zZWFyY2gtcmVzdWx0cy1tZXNzYWdlIHtcbiAgICBAaW5jbHVkZSBub1NlYXJjaFJlc3VsdHNNZXNzYWdlO1xufVxuXG4uZmlsdGVycy1idXR0b24ge1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDM2cHg7XG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG5AbWl4aW4gYWRkVG9Db2xsZWN0aW9uQmFubmVyIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbkBtaXhpbiBlbnRyaWVzV3JhcHBlciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG5AbWl4aW4gdGl0bGVDb250YWluZXIge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaDIge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIG1hcmdpbjogMXJlbSAwO1xuICAgIH1cbiAgICAuc21hbGwtcHJvZ3Jlc3Mtc3Bpbm5lciB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICAgIH1cbn1cblxuQG1peGluIG5vU2VhcmNoUmVzdWx0c01lc3NhZ2Uge1xuICAgIGNvbG9yOiAkbm9SZXN1bHRzQ29sb3I7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDMwcHggMDtcbiAgICBmb250LXNpemU6IDEyMCU7XG4gICAgaSB7XG4gICAgICAgIGZvbnQtc2l6ZTogNjBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 15967:
/*!******************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-results.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageResultsService: () => (/* binding */ SearchPageResultsService)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 99718);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 1062);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs/operators */ 66407);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _node_data_source_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node-data-source-remote */ 26523);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var src_app_features_mds_types_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/features/mds/types/types */ 97801);
/* harmony import */ var src_app_core_module_core_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core-module/core.module */ 71083);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _search_page_restore_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-page-restore.service */ 82895);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
















class SearchPageResultsService {
  constructor(_injector, _mds, _search, _searchPage, _searchPageRestore, _translate) {
    this._injector = _injector;
    this._mds = _mds;
    this._search = _search;
    this._searchPage = _searchPage;
    this._searchPageRestore = _searchPageRestore;
    this._translate = _translate;
    this.resultsDataSource = new _node_data_source_remote__WEBPACK_IMPORTED_MODULE_1__.NodeDataSourceRemote(this._injector);
    this.totalResults = this.resultsDataSource.observeTotal();
    this.collectionsDataSource = new _node_data_source_remote__WEBPACK_IMPORTED_MODULE_1__.NodeDataSourceRemote(this._injector);
    this.resultColumns = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject([]);
    this.collectionColumns = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject([]);
    this.sortConfig = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(null);
    this.loadingParams = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(true);
    this.loadingContent = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(true);
    this.loadingCollections = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(true);
    this.loadingProgress = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(0);
    this.diffCount = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(0);
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this._registerPageRestore();
    this._registerSearchObservables();
    this._registerColumnsAndSortConfig();
    this._registerLoadingProgress();
    this._registerResultDiffCount();
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  addNodes(nodes) {
    this.resultsDataSource.appendData(nodes, 'before');
  }
  _registerPageRestore() {
    this._searchPageRestore.registerDataSource('materials', this.resultsDataSource);
    this._searchPageRestore.registerDataSource('collections', this.collectionsDataSource);
  }
  _registerSearchObservables() {
    const searchRequestParams = rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest([this._searchPage.activeRepository.observeValue(),
    // .pipe(tap((value) => console.log('activeRepository changed', value))),
    this._searchPage.activeMetadataSet.observeValue(),
    // .pipe(tap((value) => console.log('activeMetadataSet changed', value))),
    this._searchPage.searchFilters.observeValue(),
    // .pipe(tap((value) => console.log('searchFilters changed', value))),
    this._searchPage.searchString.observeValue()
    // .pipe(tap((value) => console.log('searchString changed', value))),
    ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this._destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(() => this.loadingParams.next(true)),
    // Search filters and facets to fetch depend on the active repository and metadata
    // set. Their values will be set to `null` while data is being determined after
    // repository or metadata set changed. Give other components a tick to do this, so
    // we don't prematurely send a search request with outdated data.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(([repository, metadataSet, searchFilters]) => (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull)(repository) && (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull)(metadataSet) && (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull)(searchFilters)),
    // Wait until the filter bar's MDS instance has registered its needed facets for
    // suggestions at the search service. We don't explicitly include the facets in the
    // search request here to let the search service decide not to update the facets
    // when not needed (e.g., when loading a new page). See comments on
    // `MdsEditorWrapperComponent.registerLegacySuggestions` for further context.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)(values => this._searchPage.facetsToFetch.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.first)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(() => values))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(() => this.loadingParams.next(false)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(([repository, metadataSet, searchFilters, searchString]) => new _search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchRequestParams(repository, metadataSet, searchFilters, searchString)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.distinctUntilChanged)((x, y) => x.equals(y)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.share)());
    const collectionRequestParams = searchRequestParams.pipe(
    // Omit searchFilters.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(({
      repository,
      metadataSet,
      searchString
    }) => new _search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchRequestParams(repository, metadataSet, {}, searchString)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.distinctUntilChanged)((x, y) => x.equals(y)));
    searchRequestParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(() => this.loadingContent.next(true)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(params => this._getSearchRemote(params))).subscribe(remote => this.resultsDataSource.setRemote(remote));
    collectionRequestParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(() => this.loadingCollections.next(true)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(params => this._getCollectionsSearchRemote(params))).subscribe(remote => this.collectionsDataSource.setRemote(remote));
    this.resultsDataSource.isLoadingSubject.subscribe(isLoading => this.loadingContent.next(!!isLoading));
    this.collectionsDataSource.isLoadingSubject.subscribe(isLoading => this.loadingCollections.next(!!isLoading));
  }
  _registerColumnsAndSortConfig() {
    // Get MDS definition.
    const mds = rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest([this._searchPage.activeRepository.observeValue(), this._searchPage.activeMetadataSet.observeValue()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this._destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(([repository, metadataSet]) => (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull)(repository) && (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull)(metadataSet)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)(([repository, metadataSet]) => this._mds.getMetadataSet({
      repository,
      metadataSet
    })));
    // Register columns.
    mds.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(mds => _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_0__.MdsHelper.getColumns(this._translate, mds, 'search'))).subscribe(this.resultColumns);
    mds.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(mds => _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_0__.MdsHelper.getColumns(this._translate, mds, 'searchCollections'))).subscribe(this.collectionColumns);
    // Register sort.
    mds.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(mds => _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_0__.MdsHelper.getSortInfo(mds, 'search'))).subscribe(sortInfo => {
      this.sortConfig.next({
        allowed: true,
        active: sortInfo.default.sortBy,
        direction: sortInfo.default.sortAscending ? 'asc' : 'desc',
        columns: sortInfo.columns?.map(({
          id,
          mode
        }) => new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.ListItemSort('NODE', id, mode))
      });
    });
  }
  _getSearchRemote(params) {
    // console.log('%cgetSearchRemote', 'font-weight: bold', params);
    return request => {
      // console.log('search', request);
      return this._search.search({
        body: {
          criteria: this._getSearchCriteria(params),
          facetLimit: 5,
          facetMinCount: 1,
          permissions: this._searchPage.reUrl.value ? [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.ACCESS_CC_PUBLISH] : []
        },
        maxItems: request.range.endIndex - request.range.startIndex,
        skipCount: request.range.startIndex,
        sortAscending: request.sort ? [request.sort.direction === 'asc'] : null,
        sortProperties: request.sort ? [request.sort.active] : null,
        contentType: 'FILES',
        repository: params.repository,
        metadataset: params.metadataSet,
        query: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.DEFAULT_QUERY_NAME,
        propertyFilter: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.ALL]
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(r => {
        if (r.pagination.total < r.pagination.count) {
          console.warn('Total count of items is smaller than total, results might be truncated, check pagination results of api', r.pagination);
        }
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(_node_data_source_remote__WEBPACK_IMPORTED_MODULE_1__.fromSearchResults));
    };
  }
  _getCollectionsSearchRemote(params) {
    const repository = this._searchPage.availableRepositories.value.find(({
      id
    }) => id === params.repository);
    if (
    // We cannot show collections for another repository.
    !repository.isHomeRepo ||
    // We don't show other collections when searching for material to add to a collection.
    this._searchPage.addToCollectionMode.value) {
      this.loadingCollections.next(false);
      return () => rxjs__WEBPACK_IMPORTED_MODULE_20__.of({
        data: [],
        total: 0
      });
    }
    return request => {
      return this._search.requestSearch({
        body: {
          criteria: this._getSearchCriteria(params),
          facets: []
        },
        sortProperties: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.CCM_PROP_COLLECTION_PINNED_STATUS, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.CCM_PROP_COLLECTION_PINNED_ORDER, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.CM_MODIFIED_DATE],
        sortAscending: [false, true, false],
        maxItems: request.range.endIndex - request.range.startIndex,
        skipCount: request.range.startIndex,
        // sortAscending: request.sort ? [request.sort.direction === 'asc'] : null,
        // sortProperties: request.sort ? [request.sort.active] : null,
        contentType: 'ALL',
        repository: params.repository,
        metadataset: params.metadataSet,
        query: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.QUERY_NAME_COLLECTIONS,
        propertyFilter: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_3__.RestConstants.ALL]
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(_node_data_source_remote__WEBPACK_IMPORTED_MODULE_1__.fromSearchResults));
    };
  }
  _getSearchCriteria(params) {
    let criteria = Object.entries(params.searchFilters ?? {}).map(([property, values]) => ({
      property,
      values
    }));
    this.convertCriteria(criteria);
    if (params.searchString) {
      criteria.push({
        property: 'ngsearchword',
        values: [params.searchString]
      });
    }
    return criteria;
  }
  _registerLoadingProgress() {
    rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest([this.loadingParams, this.loadingContent, this.loadingCollections]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(([loadingParams, loadingContent, loadingCollections]) => {
      if (loadingParams) {
        return 10;
      } else {
        return 40 + (loadingContent ? 0 : 30) + (loadingCollections ? 0 : 30);
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.distinctUntilChanged)()).subscribe(progress => this.loadingProgress.next(progress));
  }
  _registerResultDiffCount() {
    this.resultsDataSource.connect().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this._destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.map)(nodes => nodes.length), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.startWith)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.pairwise)()).subscribe(([previousCount, currentCount]) => {
      this.diffCount.next(currentCount - previousCount);
    });
  }
  // TODO: Port `unfoldTrees` methods from 8.0. See
  // https://scm.edu-sharing.com/edu-sharing/community/repository/edu-sharing-angular-core-module/-/blob/5447ea837a99a3dab04395c10464dd417ddb73a1/rest/services/rest-search.service.ts#L34.
  // Also consider a backend solution.
  convertCriteria(criteria) {
    for (const c of criteria) {
      // We get the widget definition from the MDS editor instance, so overrides with `data-`
      // attributes in the MDS template are reflected.
      const widget = this._searchPage.filtersMdsWidgets.value?.find(widget => widget.definition.id === c.property)?.definition;
      if (widget?.type === src_app_features_mds_types_types__WEBPACK_IMPORTED_MODULE_4__.MdsWidgetType.MultiValueTree) {
        // For multi-value-tree widgets, add all child values of selected values to the
        // search criteria.
        let attach = ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_23__.MdsService.unfoldTreeChilds(c.values, widget);
        if (attach) {
          if (attach.length > src_app_core_module_core_module__WEBPACK_IMPORTED_MODULE_5__.RestSearchService.MAX_QUERY_CONCAT_PARAMS) {
            console.info('param ' + c.property + ' has too many unfold childs (' + attach.length + '), falling back to basic prefix-based search');
          } else {
            c.values = c.values.concat(attach);
          }
        }
      }
    }
  }
  static #_ = this.ɵfac = function SearchPageResultsService_Factory(t) {
    return new (t || SearchPageResultsService)(_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_24__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_23__.MdsService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_23__.SearchService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_search_page_restore_service__WEBPACK_IMPORTED_MODULE_6__.SearchPageRestoreService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_25__.TranslateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjectable"]({
    token: SearchPageResultsService,
    factory: SearchPageResultsService.ɵfac
  });
}

/***/ }),

/***/ 15930:
/*!*****************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageRoutingModule: () => (/* binding */ SearchPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _search_page_results_all_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-page-results-all.component */ 66258);
/* harmony import */ var _search_page_results_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-page-results.component */ 9906);
/* harmony import */ var _search_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-page.component */ 16860);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);






const routes = [{
  path: '',
  component: _search_page_component__WEBPACK_IMPORTED_MODULE_2__.SearchPageComponent,
  children: [{
    path: '',
    component: _search_page_results_component__WEBPACK_IMPORTED_MODULE_1__.SearchPageResultsComponent
  }, {
    path: 'all',
    component: _search_page_results_all_component__WEBPACK_IMPORTED_MODULE_0__.SearchPageResultsAllComponent
  }]
}];
class SearchPageRoutingModule {
  static #_ = this.ɵfac = function SearchPageRoutingModule_Factory(t) {
    return new (t || SearchPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: SearchPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SearchPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 17452:
/*!********************************************************************!*\
  !*** ./src/app/pages/search-page/search-page-toolbar.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageToolbarComponent: () => (/* binding */ SearchPageToolbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 21916);





class SearchPageToolbarComponent {
  constructor() {
    this.filterBarIsVisibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  ngOnInit() {}
  toggleFilterBar() {
    this.filterBarIsVisible = !this.filterBarIsVisible;
    this.filterBarIsVisibleChange.emit(this.filterBarIsVisible);
  }
  static #_ = this.ɵfac = function SearchPageToolbarComponent_Factory(t) {
    return new (t || SearchPageToolbarComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: SearchPageToolbarComponent,
    selectors: [["es-search-page-toolbar"]],
    inputs: {
      filterBarIsVisible: "filterBarIsVisible"
    },
    outputs: {
      filterBarIsVisibleChange: "filterBarIsVisibleChange"
    },
    decls: 5,
    vars: 5,
    consts: [["mat-button", "", "color", "primary", 1, "toggle-filter-bar-button", 3, "click"], ["esIcon", "keyboard_arrow_right"]],
    template: function SearchPageToolbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SearchPageToolbarComponent_Template_button_click_0_listener() {
          return ctx.toggleFilterBar();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("toggle-filter-bar-button-active", ctx.filterBarIsVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 3, "SEARCH.EXPANDED_SEARCH"));
      }
    },
    dependencies: [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  position: sticky;\n  z-index: 2;\n  top: var(--top-matter-height);\n  padding: 10px 0;\n  background-color: #fff;\n}\n\n.toggle-filter-bar-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  transition: rotate var(--transitionNormal);\n}\n.toggle-filter-bar-button.toggle-filter-bar-button-active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  rotate: 180deg;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zZWFyY2gtcGFnZS9zZWFyY2gtcGFnZS10b29sYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsNkJBQUE7RUFDQSxlQUFBO0VBQ0Esc0JEa0JjO0FDbEJsQjs7QUFJSTtFQUNJLDBDQUFBO0FBRFI7QUFHSTtFQUNJLGNBQUE7QUFEUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHotaW5kZXg6IDI7XG4gICAgdG9wOiB2YXIoLS10b3AtbWF0dGVyLWhlaWdodCk7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kQ29sb3I7XG59XG5cbi50b2dnbGUtZmlsdGVyLWJhci1idXR0b24ge1xuICAgIGkge1xuICAgICAgICB0cmFuc2l0aW9uOiByb3RhdGUgJHRyYW5zaXRpb25Ob3JtYWw7XG4gICAgfVxuICAgICYudG9nZ2xlLWZpbHRlci1iYXItYnV0dG9uLWFjdGl2ZSBpIHtcbiAgICAgICAgcm90YXRlOiAxODBkZWc7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 16860:
/*!************************************************************!*\
  !*** ./src/app/pages/search-page/search-page.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageComponent: () => (/* binding */ SearchPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _search_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-page.service */ 75599);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/cdk/layout */ 39743);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _navigation_scheduler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navigation-scheduler */ 58723);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/progress-bar */ 78173);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/sidenav */ 31465);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _search_page_filter_bar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./search-page-filter-bar.component */ 33670);
/* harmony import */ var _repository_icon_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./repository-icon.pipe */ 11257);


























const _c0 = ["filtersDialogResetButton"];
const _c1 = ["filtersDialogContent"];
const _c2 = function () {
  return ["./all"];
};
function SearchPageComponent_ng_container_5_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "a", 11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](1);
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](6, _c2))("queryParams", ctx_r8.queryParamsAllRepositories)("active", _r12.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 4, "SEARCH.REPOSITORY_ALL"), " ");
  }
}
function SearchPageComponent_ng_container_5_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SearchPageComponent_ng_container_5_a_3_Template_a_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15);
      const repository_r13 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r14.goToRepository(repository_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "repositoryIcon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const repository_r13 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("active", repository_r13.id === ctx_r9.activeRepository.getValue());
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 3, repository_r13), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", repository_r13.title, " ");
  }
}
function SearchPageComponent_ng_container_5_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainer"](0);
  }
}
function SearchPageComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "nav", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, SearchPageComponent_ng_container_5_a_2_Template, 4, 7, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, SearchPageComponent_ng_container_5_a_3_Template, 5, 5, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "mat-tab-nav-panel", null, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, SearchPageComponent_ng_container_5_ng_container_6_Template, 1, 0, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](5);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("tabPanel", _r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.availableRepositories.getValue().length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.availableRepositories.getValue());
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function SearchPageComponent_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainer"](0);
  }
}
function SearchPageComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, SearchPageComponent_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngTemplateOutlet", _r2);
  }
}
function SearchPageComponent_ng_template_7_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SearchPageComponent_ng_template_7_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r20.searchFilters.setUserValue(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, "CLEAR_FILTERS"), " ");
  }
}
function SearchPageComponent_ng_template_7_es_search_page_filter_bar_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "es-search-page-filter-bar");
  }
}
function SearchPageComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-drawer-container", null, 16)(2, "mat-drawer", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "div", 18)(5, "div", 19)(6, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, SearchPageComponent_ng_template_7_button_9_Template, 4, 3, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SearchPageComponent_ng_template_7_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r22.filterBarIsVisible.setUserValue(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, SearchPageComponent_ng_template_7_es_search_page_filter_bar_13_Template, 1, 0, "es-search-page-filter-bar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](14, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "main");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](16, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("opened", ctx_r3.filterBarIsVisible.getValue() && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 5, ctx_r3.isMobileScreen) === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 7, "SEARCH.FILTERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.searchFilters.getUserValue());
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("aria", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](14, 9, ctx_r3.showingAllRepositories) === false);
  }
}
function SearchPageComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "es-search-page-filter-bar", 27);
  }
}
function SearchPageComponent_ng_template_11_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SearchPageComponent_ng_template_11_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r25.searchFilters.setUserValue(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, "CLEAR_FILTERS"), " ");
  }
}
function SearchPageComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, SearchPageComponent_ng_template_11_button_0_Template, 4, 3, "button", 21);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r7.searchFilters.getUserValue());
  }
}
const _c3 = function (a0) {
  return {
    progress: a0
  };
};
class SearchPageComponent {
  constructor(breadcrumbsService, breakpointObserver, dialogs, mainNav, navigationScheduler, route, searchPage, translate) {
    this.breadcrumbsService = breadcrumbsService;
    this.breakpointObserver = breakpointObserver;
    this.dialogs = dialogs;
    this.mainNav = mainNav;
    this.navigationScheduler = navigationScheduler;
    this.route = route;
    this.searchPage = searchPage;
    this.translate = translate;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.Scope;
    this.tabBarIsVisible = null;
    this.progressBarIsVisible = false;
    this.availableRepositories = this.searchPage.availableRepositories;
    this.activeRepository = this.searchPage.activeRepository;
    this.showingAllRepositories = this.searchPage.showingAllRepositories;
    this.filterBarIsVisible = this.searchPage.filterBarIsVisible;
    this.searchString = this.searchPage.searchString;
    this.searchFilters = this.searchPage.searchFilters;
    this.loadingProgress = this.searchPage.loadingProgress;
    this.isMobileScreen = this.getIsMobileScreen();
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_12__.Subject();
    this.searchPage.init();
  }
  ngOnInit() {
    this.initMainNav();
    this.breadcrumbsService.setNodePath(null);
    this.availableRepositories.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(availableRepositories => availableRepositories.length > 1)).subscribe(tabBarIsVisible => this.tabBarIsVisible = tabBarIsVisible);
    this.registerProgressBarIsVisible();
    this.registerFilterDialog();
    this.registerQueryParamsAllRepositories();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  goToRepository(repository) {
    this.activeRepository.setUserValue(repository.id);
    this.navigationScheduler.scheduleNavigation({
      route: [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIConstants.ROUTER_PREFIX, 'search']
    });
  }
  registerFilterDialog() {
    var _this = this;
    let dialogRefPromise;
    let isMobileScreen;
    rxjs__WEBPACK_IMPORTED_MODULE_15__.combineLatest([this.searchPage.filterBarIsVisible.observeValue().pipe(), this.isMobileScreen.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.tap)(value => isMobileScreen = value))]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.takeUntil)(this.destroyed)).subscribe( /*#__PURE__*/function () {
      var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ([filterBarIsVisible]) {
        if (isMobileScreen && filterBarIsVisible && !dialogRefPromise) {
          dialogRefPromise = _this.openFilterDialog();
          const dialogRef = yield dialogRefPromise;
          dialogRef.afterClosed().subscribe(() => {
            dialogRefPromise = null;
            if (isMobileScreen) {
              _this.filterBarIsVisible.setUserValue(false);
            }
          });
        } else if (!isMobileScreen || !filterBarIsVisible) {
          void dialogRefPromise?.then(dialogRef => dialogRef.close());
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  registerQueryParamsAllRepositories() {
    rxjs__WEBPACK_IMPORTED_MODULE_15__.combineLatest([this.route.queryParams, this.searchString.observeQueryParamEntry()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(([queryParams, searchStringEntry]) => ({
      addToCollection: queryParams.addToCollection,
      ...searchStringEntry
    }))).subscribe(params => this.queryParamsAllRepositories = params);
  }
  openFilterDialog() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this2.dialogs.openGenericDialog({
        title: 'SEARCH.FILTERS',
        contentTemplate: _this2.filtersDialogContent,
        minWidth: 350,
        customHeaderBarContent: _this2.filtersDialogResetButton
      });
      _this2.searchPage.results.totalResults.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.switchMap)(results => _this2.translate.get('SEARCH.NUMBER_RESULTS', {
        results
      })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.takeUntil)(dialogRef.afterClosed())).subscribe(numberResults => {
        dialogRef.patchConfig({
          subtitle: numberResults.toString()
        });
      });
      return dialogRef;
    })();
  }
  getIsMobileScreen() {
    return this.breakpointObserver.observe(['(max-width: 900px)']).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(({
      matches
    }) => matches));
  }
  initMainNav() {
    this.mainNav.setMainNavConfig({
      title: 'SEARCH.TITLE',
      currentScope: 'search',
      canOpen: true,
      onCreate: nodes => this.searchPage.results.addNodes(nodes)
    });
    const activeRepositoryIsHome = rxjs__WEBPACK_IMPORTED_MODULE_15__.combineLatest([this.availableRepositories, this.activeRepository.observeValue()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(([availableRepositories, activeRepository]) => (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.notNull)(availableRepositories) && (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.notNull)(activeRepository)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)(([availableRepositories, activeRepository]) => activeRepository === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY || availableRepositories.find(r => r.id === activeRepository).isHomeRepo));
    activeRepositoryIsHome.subscribe(isHome => this.mainNav.patchMainNavConfig({
      create: {
        allowed: isHome,
        allowBinary: true
      }
    }));
  }
  onProgressBarAnimationEnd() {
    if (this.searchPage.loadingProgress.value >= 100) {
      this.progressBarIsVisible = false;
    }
  }
  registerProgressBarIsVisible() {
    this.searchPage.loadingProgress.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(progress => progress < 100)).subscribe(() => this.progressBarIsVisible = true);
  }
  static #_ = this.ɵfac = function SearchPageComponent_Factory(t) {
    return new (t || SearchPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_3__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_19__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_4__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_5__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_navigation_scheduler__WEBPACK_IMPORTED_MODULE_6__.NavigationScheduler), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchPageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: SearchPageComponent,
    selectors: [["es-search-page"]],
    viewQuery: function SearchPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c1, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.filtersDialogResetButton = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.filtersDialogContent = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function SearchPageComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("has-tab-bar", ctx.tabBarIsVisible);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵProvidersFeature"]([_search_page_service__WEBPACK_IMPORTED_MODULE_2__.SearchPageService])],
    decls: 13,
    vars: 13,
    consts: [["esTitle", "", 1, "cdk-visually-hidden"], ["mode", "determinate", 3, "value", "animationEnd"], [4, "ngIf"], ["tabBody", ""], ["filtersDialogContent", ""], ["filtersDialogResetButton", ""], ["mat-tab-nav-bar", "", 3, "tabPanel"], ["mat-tab-link", "", "routerLinkActive", "", 3, "routerLink", "queryParams", "active", 4, "ngIf"], ["mat-tab-link", "", 3, "active", "click", 4, "ngFor", "ngForOf"], ["tabPanel", ""], [4, "ngTemplateOutlet"], ["mat-tab-link", "", "routerLinkActive", "", 3, "routerLink", "queryParams", "active"], ["routerLinkActive", "routerLinkActive"], ["mat-tab-link", "", 3, "active", "click"], [1, "repository-icon"], ["alt", "", 3, "src"], ["filterBar", ""], ["mode", "side", 3, "opened"], [1, "filter-bar-container"], [1, "filter-bar-heading"], [1, "filter-bar-title"], ["mat-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 1, "filter-bar-close-button", 3, "click"], ["esIcon", "close", 3, "aria"], [1, "filter-bar-body"], ["mat-button", "", 3, "click"], ["esIcon", "undo"], [1, "filters-dialog-content"]],
    template: function SearchPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "mat-progress-bar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("animationEnd", function SearchPageComponent_Template_mat_progress_bar_animationEnd_3_listener() {
          return ctx.onProgressBarAnimationEnd();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, SearchPageComponent_ng_container_5_Template, 7, 4, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, SearchPageComponent_ng_container_6_Template, 2, 1, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchPageComponent_ng_template_7_Template, 17, 11, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, SearchPageComponent_ng_template_9_Template, 1, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, SearchPageComponent_ng_template_11_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 6, "SEARCH.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.progressBarIsVisible ? ctx.loadingProgress.value : 0)("@fadeOut", ctx.progressBarIsVisible ? "visible" : "hidden");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", ctx.progressBarIsVisible ? _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](4, 8, "SEARCH.LOADING_RESULTS", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](11, _c3, ctx.progressBarIsVisible ? ctx.loadingProgress.value : 0)) : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.tabBarIsVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.tabBarIsVisible === false);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgTemplateOutlet, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatIconButton, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_24__.MatProgressBar, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatDrawerContainer, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTabNav, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTabNavPanel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_26__.MatTabLink, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_7__.TitleDirective, _search_page_filter_bar_component__WEBPACK_IMPORTED_MODULE_8__.SearchPageFilterBarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_22__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe, _repository_icon_pipe__WEBPACK_IMPORTED_MODULE_9__.RepositoryIconPipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: calc(100vh - var(--mainnavHeight));\n}\n\nmat-progress-bar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--mainnavCurrentHeight);\n  flex-shrink: 0;\n  transition: unset;\n  z-index: 2;\n}\n\n.mat-tab-label-active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n.repository-icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(0, 0, 0, 0.01);\n  border: 1px solid rgba(0, 0, 0, 0.03);\n  border-radius: 50px;\n  height: 32px;\n  width: 32px;\n  flex-shrink: 0;\n}\n.repository-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  background-color: white;\n  height: 20px;\n  width: 20px;\n  border-radius: 2px;\n}\n\nmat-tab-nav-panel[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n.mat-drawer-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  background-color: unset;\n}\n\n.filter-bar-container[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.filter-bar-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n  height: 60px;\n  border-bottom: 1px solid rgba(var(--palette-foreground-divider), var(--palette-foreground-divider-alpha));\n}\n.filter-bar-heading[_ngcontent-%COMP%]   .filter-bar-title[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  font-size: 180%;\n  margin: 0;\n}\n.filter-bar-heading[_ngcontent-%COMP%]   .filter-bar-close-button[_ngcontent-%COMP%] {\n  margin-right: -10px;\n  flex-shrink: 0;\n}\n\n.filter-bar-body[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow: auto;\n  --container-padding: 20px;\n  padding: var(--container-padding);\n}\n\n.filters-dialog-content[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\nmain[_ngcontent-%COMP%] {\n  padding: 0 25px 25px;\n}\n\n.entries-wrapper[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 1.5rem;\n}\n\n.title-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n}\n.title-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin: 1rem 0;\n}\n.title-container[_ngcontent-%COMP%]   .small-progress-spinner[_ngcontent-%COMP%] {\n  margin-left: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9zZWFyY2gtcGFnZS9zZWFyY2gtcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvc2VhcmNoLXBhZ2UvY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOENBQUE7QUFBSjs7QUFHQTtFQUNJLGdCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0FBQUo7O0FBR0E7RUFDSSxVQUFBO0FBQUo7O0FBR0E7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUNBQUE7RUFDQSxxQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FBQUo7QUFDSTtFQUNJLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQUNSOztBQUdBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7QUFBSjs7QUFHQTtFQUNJLFlBQUE7RUFDQSx1QkFBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EseUdBQUE7QUFBSjtBQUVJO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBQVI7QUFFSTtFQUNJLG1CQUFBO0VBQ0EsY0FBQTtBQUFSOztBQUlBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGlDQUFBO0FBREo7O0FBSUE7RUFDSSxZQUFBO0FBREo7O0FBSUE7RUFDSSxvQkFBQTtBQURKOztBQUlBO0VDcEZJLGNBQUE7RUFDQSxrQkFBQTtBRG9GSjs7QUFHQTtFQ25GSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FEb0ZKO0FDbkZJO0VBQ0ksWUFBQTtFQUNBLGNBQUE7QURxRlI7QUNuRkk7RUFDSSxpQkFBQTtBRHFGUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4vY29tbW9uJztcblxuOmhvc3Qge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLW1haW5uYXZIZWlnaHQpKTtcbn1cblxubWF0LXByb2dyZXNzLWJhciB7XG4gICAgcG9zaXRpb246IHN0aWNreTtcbiAgICB0b3A6IHZhcigtLW1haW5uYXZDdXJyZW50SGVpZ2h0KTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICB0cmFuc2l0aW9uOiB1bnNldDtcbiAgICB6LWluZGV4OiAyO1xufVxuXG4ubWF0LXRhYi1sYWJlbC1hY3RpdmUge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5yZXBvc2l0b3J5LWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjAxKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDMpO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIHdpZHRoOiAzMnB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGltZyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgfVxufVxuXG5tYXQtdGFiLW5hdi1wYW5lbCB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBtaW4taGVpZ2h0OiAwO1xufVxuXG4ubWF0LWRyYXdlci1jb250YWluZXIge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB1bnNldDtcbn1cblxuLmZpbHRlci1iYXItY29udGFpbmVyIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmZpbHRlci1iYXItaGVhZGluZyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkXG4gICAgICAgIHJnYmEodmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLWRpdmlkZXIpLCB2YXIoLS1wYWxldHRlLWZvcmVncm91bmQtZGl2aWRlci1hbHBoYSkpO1xuICAgIC5maWx0ZXItYmFyLXRpdGxlIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBmb250LXNpemU6IDE4MCU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgLmZpbHRlci1iYXItY2xvc2UtYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAtMTBweDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxufVxuXG4uZmlsdGVyLWJhci1ib2R5IHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgLS1jb250YWluZXItcGFkZGluZzogMjBweDtcbiAgICBwYWRkaW5nOiB2YXIoLS1jb250YWluZXItcGFkZGluZyk7XG59XG5cbi5maWx0ZXJzLWRpYWxvZy1jb250ZW50IHtcbiAgICBmbGV4LWdyb3c6IDE7XG59XG5cbm1haW4ge1xuICAgIHBhZGRpbmc6IDAgMjVweCAyNXB4O1xufVxuXG4uZW50cmllcy13cmFwcGVyIHtcbiAgICBAaW5jbHVkZSBlbnRyaWVzV3JhcHBlcjtcbn1cblxuLnRpdGxlLWNvbnRhaW5lciB7XG4gICAgQGluY2x1ZGUgdGl0bGVDb250YWluZXI7XG59XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuQG1peGluIGFkZFRvQ29sbGVjdGlvbkJhbm5lciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG5AbWl4aW4gZW50cmllc1dyYXBwZXIge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuQG1peGluIHRpdGxlQ29udGFpbmVyIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGgyIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICB9XG4gICAgLnNtYWxsLXByb2dyZXNzLXNwaW5uZXIge1xuICAgICAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICB9XG59XG5cbkBtaXhpbiBub1NlYXJjaFJlc3VsdHNNZXNzYWdlIHtcbiAgICBjb2xvcjogJG5vUmVzdWx0c0NvbG9yO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAzMHB4IDA7XG4gICAgZm9udC1zaXplOiAxMjAlO1xuICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDYwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.trigger)('fadeOut', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.state)('visible', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.style)({
        opacity: 1
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.style)({
        opacity: 0
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.transition)('visible => hidden', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_27__.animate)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.ANIMATION_TIME_NORMAL)])])]
    }
  });
}

/***/ }),

/***/ 57067:
/*!*********************************************************!*\
  !*** ./src/app/pages/search-page/search-page.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageModule: () => (/* binding */ SearchPageModule)
/* harmony export */ });
/* harmony import */ var _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../features/mds/mds.module */ 77894);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _repository_icon_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repository-icon.pipe */ 11257);
/* harmony import */ var _search_page_filter_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-page-filter-bar.component */ 33670);
/* harmony import */ var _search_page_results_all_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search-page-results-all.component */ 66258);
/* harmony import */ var _search_page_results_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search-page-results.component */ 9906);
/* harmony import */ var _search_page_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-page-routing.module */ 15930);
/* harmony import */ var _search_page_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-page-toolbar.component */ 17452);
/* harmony import */ var _search_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./search-page.component */ 16860);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);











class SearchPageModule {
  static #_ = this.ɵfac = function SearchPageModule_Factory(t) {
    return new (t || SearchPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
    type: SearchPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
    imports: [_search_page_routing_module__WEBPACK_IMPORTED_MODULE_6__.SearchPageRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.EduSharingUiModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](SearchPageModule, {
    declarations: [_search_page_component__WEBPACK_IMPORTED_MODULE_8__.SearchPageComponent, _search_page_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.SearchPageToolbarComponent, _search_page_filter_bar_component__WEBPACK_IMPORTED_MODULE_3__.SearchPageFilterBarComponent, _repository_icon_pipe__WEBPACK_IMPORTED_MODULE_2__.RepositoryIconPipe, _search_page_results_component__WEBPACK_IMPORTED_MODULE_5__.SearchPageResultsComponent, _search_page_results_all_component__WEBPACK_IMPORTED_MODULE_4__.SearchPageResultsAllComponent],
    imports: [_search_page_routing_module__WEBPACK_IMPORTED_MODULE_6__.SearchPageRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_10__.EduSharingUiModule, _features_mds_mds_module__WEBPACK_IMPORTED_MODULE_0__.MdsModule]
  });
})();

/***/ }),

/***/ 75599:
/*!**********************************************************!*\
  !*** ./src/app/pages/search-page/search-page.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchPageService: () => (/* binding */ SearchPageService),
/* harmony export */   SearchRequestParams: () => (/* binding */ SearchRequestParams)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 89718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_options_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/options-helper.service */ 61396);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _navigation_scheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation-scheduler */ 58723);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/navigation/search-field/search-field.service */ 86381);
/* harmony import */ var _user_modifiable_values__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-modifiable-values */ 16640);














class SearchRequestParams {
  constructor(repository, metadataSet, searchFilters, searchString) {
    this.repository = repository;
    this.metadataSet = metadataSet;
    this.searchFilters = searchFilters;
    this.searchString = searchString;
  }
  equals(other) {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
class SearchPageService {
  get results() {
    return this._results.value;
  }
  set results(value) {
    this._results.next(value);
  }
  constructor(collection, config, mainNavService, mds, navigationScheduler, network, route, router, searchField, userModifiableValues) {
    this.collection = collection;
    this.config = config;
    this.mainNavService = mainNavService;
    this.mds = mds;
    this.navigationScheduler = navigationScheduler;
    this.network = network;
    this.route = route;
    this.router = router;
    this.searchField = searchField;
    this.userModifiableValues = userModifiableValues;
    this.availableRepositories = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.activeRepository = this.userModifiableValues.createString();
    this.showingAllRepositories = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.availableMetadataSets = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.activeMetadataSet = this.userModifiableValues.createString();
    this.filterBarIsVisible = this.userModifiableValues.createBoolean(false);
    this.searchFilters = this.userModifiableValues.createDict();
    this.searchString = this.userModifiableValues.createString();
    this.loadingProgress = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.reUrl = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.addToCollectionMode = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.filtersMdsWidgets = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    /**
     * A list of properties that should be fetched as facets with a search request.
     *
     * The facets are determined by the mds instance of the filter-bar and are used to show
     * suggestions for filter values to the user.
     *
     * Will be set to `null` while a value is being determined. Set to the empty array in case there
     * are no facets to fetch.
     */
    this.facetsToFetch = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this._results = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  /** Initializes the service for use on the search page. */
  init() {
    this.initBasicData();
    this.registerSearchField();
    this.initSearchPageUi();
    this.initQueryParams();
    this.registerAllRepositories();
    this.registerAddToCollection();
  }
  /**
   * Utilizes this service to provide facet search via a search field when not on the search page.
   *
   * When a search is triggered by either entering a search string and hitting the search button
   * or by selecting a facet, we jump to the search page.
   */
  initSearchFieldOnly() {
    this.initBasicData();
    const searchFieldInstance = this.registerSearchField({
      autoFocusSearchField: false
    });
    this.initQueryParams();
    searchFieldInstance.patchConfig({
      showFiltersButton: false
    });
    // Jump to the search page when a search is triggered.
    rxjs__WEBPACK_IMPORTED_MODULE_8__.merge(searchFieldInstance.onSearchTriggered().pipe(
    // Don't trigger a search when the search field was cleared with the 'X' button.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(({
      cleared
    }) => !cleared)), searchFieldInstance.onFilterValuesChanged()).subscribe(() => {
      this.navigationScheduler.scheduleNavigation({
        route: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.UIConstants.ROUTER_PREFIX, 'search']
      });
    });
  }
  initBasicData() {
    this.registerRepositories();
    this.registerAvailableMetadataSets();
    this.registerActiveMetadataSet();
  }
  initSearchPageUi() {
    this.registerLoadingProgress();
  }
  initQueryParams() {
    this.activeRepository.registerQueryParameter('repo', this.route);
    this.activeMetadataSet.registerQueryParameter('mds', this.route);
    this.searchFilters.registerQueryParameter('filters', this.route);
    this.searchString.registerQueryParameter('q', this.route);
    this.filterBarIsVisible.registerSessionStorage('search-page-filter-bar');
    this.route.queryParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(params => params.reurl || false)).subscribe(this.reUrl);
  }
  registerRepositories() {
    rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest([this.network.getRepositories(), this.config.observeConfig()]).subscribe(([repositories, config]) => this.availableRepositories.next(filterRepositories(repositories, config)));
    this.availableRepositories.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull)).subscribe(availableRepositories => {
      this.activeRepository.setSystemValue(availableRepositories[0].id);
      if (!availableRepositories.some(({
        id
      }) => id === this.activeRepository.getValue())) {
        this.activeRepository.resetUserValue();
      }
    });
  }
  registerAllRepositories() {
    this.showingAllRepositories.subscribe(showingAllRepositories => {
      if (showingAllRepositories) {
        this.activeRepository.setOverrideValue(null);
        this.filterBarIsVisible.resetUserValue();
      } else {
        this.activeRepository.unsetOverrideValue();
      }
    });
  }
  registerAvailableMetadataSets() {
    this.activeRepository.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.tap)(() => this.availableMetadataSets.next(null)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(activeRepository => this.availableRepositories.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(repositories => repositories.find(r => r.id === activeRepository)))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(repository => this.getAvailableMetadataSets(repository))).subscribe(availableMetadataSets => this.availableMetadataSets.next(availableMetadataSets));
  }
  getAvailableMetadataSets(repository) {
    return rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest([this.mds.getAvailableMetadataSets(repository.id), this.config.observeConfig()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(([availableMetadataSets, config]) => filterMetadataSets(availableMetadataSets, config, repository)));
  }
  registerActiveMetadataSet() {
    this.availableMetadataSets.subscribe(availableMetadataSets => {
      if (!availableMetadataSets) {
        this.activeMetadataSet.setOverrideValue(null);
      } else {
        this.activeMetadataSet.unsetOverrideValue();
      }
      this.activeMetadataSet.setSystemValue(availableMetadataSets?.[0]?.id);
      if (availableMetadataSets && !availableMetadataSets.some(mds => mds.id === this.activeMetadataSet.getValue())) {
        this.activeMetadataSet.resetUserValue();
      }
    });
  }
  registerSearchField({
    autoFocusSearchField = true
  } = {}) {
    const searchFieldInstance = this.searchField.enable({
      placeholder: 'SEARCH.SEARCH_STUFF',
      autoFocus: autoFocusSearchField
    }, this.destroyed);
    this.showingAllRepositories.subscribe(showingAllRepositories => {
      searchFieldInstance.patchConfig({
        showFiltersButton: !showingAllRepositories,
        enableFiltersAndSuggestions: !showingAllRepositories
      });
    });
    searchFieldInstance.onFiltersButtonClicked().subscribe(() => this.filterBarIsVisible.setUserValue(!this.filterBarIsVisible.getValue()));
    searchFieldInstance.onSearchTriggered().subscribe(({
      searchString
    }) => this.searchString.setUserValue(searchString || null));
    this.searchString.observeUserValue().subscribe(searchString => searchFieldInstance.setSearchString(searchString));
    rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest([this.activeRepository.observeValue(), this.activeMetadataSet.observeValue()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(([repository, metadataSet]) => (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull)(repository) && (0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull)(metadataSet)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(([repository, metadataSet]) => ({
      repository,
      metadataSet
    }))).subscribe(mdsInfo => searchFieldInstance.setMdsInfo(mdsInfo));
    searchFieldInstance.onFilterValuesChanged().subscribe(filterValues => {
      // console.log('onFilterValuesChanged', filterValues);
      this.searchFilters.setUserValue(filterValues);
    });
    this.searchFilters.observeUserValue().subscribe(searchFilters => {
      // console.log('searchFilters.userValue', searchFilters);
      searchFieldInstance.setFilterValues(searchFilters);
      // Reset the visible search string if the user made unapplied changes.
      searchFieldInstance.setSearchString(this.searchString.getValue());
    });
    return searchFieldInstance;
  }
  registerLoadingProgress() {
    this._results.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(results => results.loadingProgress)).subscribe(this.loadingProgress);
  }
  registerAddToCollection() {
    this.route.queryParamMap.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(queryParamMap => queryParamMap.get('addToCollection')), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(collectionId => collectionId ? this.collection.getCollection(collectionId) : rxjs__WEBPACK_IMPORTED_MODULE_17__.of(null))).subscribe(collection => {
      if (collection) {
        this.addToCollectionMode.next({
          collection,
          customOptions: this.getAddToCollectionOptions(collection)
        });
      } else {
        this.addToCollectionMode.next(null);
      }
    });
  }
  getAddToCollectionOptions(collection) {
    const addTo = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.OptionItem('SEARCH.ADD_INTO_COLLECTION_SHORT', 'layers', (_, nodes) => {
      this.mainNavService.getDialogs().addToCollectionList(collection, nodes, true, () => this.router.navigate([_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.UIConstants.ROUTER_PREFIX + 'collections'], {
        queryParams: {
          id: collection.ref.id
        }
      }));
    });
    addTo.elementType = _services_options_helper_service__WEBPACK_IMPORTED_MODULE_1__.OptionsHelperService.ElementTypesAddToCollection;
    addTo.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.DefaultGroups.Reuse;
    addTo.showAlways = true;
    const cancel = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.OptionItem('CANCEL', 'close', () => this.router.navigate([_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.UIConstants.ROUTER_PREFIX, 'collections'], {
      queryParams: {
        id: collection.ref.id
      }
    }));
    cancel.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.DefaultGroups.Delete;
    cancel.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.ElementType.Unknown];
    return {
      useDefaultOptions: false,
      addOptions: [cancel, addTo]
    };
  }
  static #_ = this.ɵfac = function SearchPageService_Factory(t) {
    return new (t || SearchPageService)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.CollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_2__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.MdsService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_navigation_scheduler__WEBPACK_IMPORTED_MODULE_3__.NavigationScheduler), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.NetworkService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_4__.SearchFieldService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_user_modifiable_values__WEBPACK_IMPORTED_MODULE_5__.UserModifiableValuesService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjectable"]({
    token: SearchPageService,
    factory: SearchPageService.ɵfac
  });
}
function filterRepositories(repositories, config) {
  const enabledRepositories = config.availableRepositories;
  if (enabledRepositories) {
    return repositories.filter(repo => repo.isHomeRepo && config.availableRepositories.includes(ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.HOME_REPOSITORY) || config.availableRepositories.includes(repo.id));
  } else {
    return repositories;
  }
}
function filterMetadataSets(metadataSets, config, repository) {
  const enabledMetadataSets = config.availableMds?.find(mdsConfig => mdsConfig.repository === repository.id || mdsConfig.repository === ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_19__.HOME_REPOSITORY && repository.isHomeRepo)?.mds;
  if (enabledMetadataSets) {
    return metadataSets.filter(mds => enabledMetadataSets.includes(mds.id));
  } else {
    return metadataSets;
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_search-page_search-page_module_ts.js.map