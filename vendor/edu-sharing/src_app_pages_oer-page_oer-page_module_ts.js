"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_oer-page_oer-page_module_ts"],{

/***/ 1875:
/*!***********************************************************!*\
  !*** ./src/app/pages/oer-page/oer-page-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OerPageRoutingModule: () => (/* binding */ OerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _oer_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oer-page.component */ 41787);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _oer_page_component__WEBPACK_IMPORTED_MODULE_0__.OerPageComponent
}];
class OerPageRoutingModule {
  static #_ = this.ɵfac = function OerPageRoutingModule_Factory(t) {
    return new (t || OerPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: OerPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](OerPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 41787:
/*!******************************************************!*\
  !*** ./src/app/pages/oer-page/oer-page.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OerPageComponent: () => (/* binding */ OerPageComponent)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../main/navigation/search-field/search-field.service */ 86381);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/footer/footer.component */ 68014);
/* harmony import */ var _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/directives/image-config.directive */ 654);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/pipes/assets-path.pipe */ 689);


















function OerPageComponent_div_13_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OerPageComponent_div_13_div_4_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r6.goToCollections());
    })("keyup.enter", function OerPageComponent_div_13_div_4_Template_a_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r8.goToCollections());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, ctx_r4.showMore[ctx_r4.COLLECTIONS] ? "HIDE_MORE" : "SHOW_MORE"));
  }
}
function OerPageComponent_div_13_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, "OER.NO_COLLECTION_RESULTS"), " ");
  }
}
function OerPageComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 13)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, OerPageComponent_div_13_div_4_Template, 4, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, OerPageComponent_div_13_div_5_Template, 3, 3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "TODO");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 3, "OER.COLLECTIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.hasMore[ctx_r0.COLLECTIONS] || true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r0.loading[ctx_r0.COLLECTIONS] && !ctx_r0.nodes[ctx_r0.COLLECTIONS].length);
  }
}
function OerPageComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OerPageComponent_div_18_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r9.goToSearch());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, ctx_r1.showMore[ctx_r1.MATERIALS] ? "HIDE_MORE" : "SHOW_MORE"));
  }
}
function OerPageComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, "OER.NO_MATERIAL_RESULTS"), " ");
  }
}
function OerPageComponent_div_21_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function OerPageComponent_div_21_div_4_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r13.toggleMore(ctx_r13.TOOLS));
    })("keyup.enter", function OerPageComponent_div_21_div_4_Template_a_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r15.toggleMore(ctx_r15.TOOLS));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 1, ctx_r11.showMore[ctx_r11.TOOLS] ? "HIDE_MORE" : "SHOW_MORE"));
  }
}
function OerPageComponent_div_21_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, "OER.NO_TOOL_RESULTS"), " ");
  }
}
function OerPageComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 20)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, OerPageComponent_div_21_div_4_Template, 4, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, OerPageComponent_div_21_div_5_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, " TODO ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 3, "OER.TOOLS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.hasMore[ctx_r3.TOOLS]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r3.loading[ctx_r3.TOOLS] && !ctx_r3.nodes[ctx_r3.TOOLS].length);
  }
}
class OerPageComponent {
  get currentQuery() {
    return this.currentQuerySubject.value;
  }
  set currentQuery(value) {
    this.currentQuerySubject.next(value);
  }
  constructor(router, route, connector, nodeService, nodeHelper, searchService, mdsService, storage, translations, mainNav, translate, searchField) {
    this.router = router;
    this.route = route;
    this.connector = connector;
    this.nodeService = nodeService;
    this.nodeHelper = nodeHelper;
    this.searchService = searchService;
    this.mdsService = mdsService;
    this.storage = storage;
    this.translations = translations;
    this.mainNav = mainNav;
    this.translate = translate;
    this.searchField = searchField;
    this.SCOPES = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.Scope;
    this.COLLECTIONS = 0;
    this.MATERIALS = 1;
    this.TOOLS = 2;
    this.TYPE_COUNT = 3;
    this.columns = [];
    this.options = [];
    this.currentQuerySubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(null);
    this.loading = [];
    this.showMore = [];
    this.hasMore = [];
    this.offsets = [];
    this.nodes = [];
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_13__.Subject();
    this.translations.waitForInit().subscribe(() => {
      for (let i = 0; i < this.TYPE_COUNT; i++) {
        this.columns.push([]);
        this.updateOptions(i);
        this.nodes.push([]);
      }
      this.columns[this.COLLECTIONS].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_NAME));
      this.columns[this.COLLECTIONS].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem('COLLECTION', 'info'));
      this.columns[this.COLLECTIONS].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem('COLLECTION', 'scope'));
      this.mdsService.getSet().subscribe(mds => {
        this.columns[this.MATERIALS] = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_1__.MdsHelper.getColumns(this.translate, mds, 'search');
      });
      /*
      this.config.get("searchColumns").subscribe((data:any)=>{
      this.columns[this.MATERIALS]=[];
      if(data && data.length){
        for(let item of data){
          this.columns[this.MATERIALS].push(new ListItem("NODE",item));
        }
      }
      else{
        this.columns[this.MATERIALS].push(new ListItem("NODE",RestConstants.CM_NAME));
        this.columns[this.MATERIALS].push(new ListItem("NODE",RestConstants.CM_MODIFIED_DATE));
        this.columns[this.MATERIALS].push(new ListItem("NODE",RestConstants.CCM_PROP_LICENSE));
        this.columns[this.MATERIALS].push(new ListItem("NODE",RestConstants.CCM_PROP_REPLICATIONSOURCE));
      }
      });
      //this.columns[this.MATERIALS].push(new ListItem("NODE",RestConstants.CCM_PROP_REPLICATIONSOURCE));
      */
      this.columns[this.TOOLS].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_NAME));
      this.columns[this.TOOLS].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.LOM_PROP_DESCRIPTION));
      this.connector.numberPerRequest = 20;
      for (let i = 0; i < this.TYPE_COUNT; i++) {
        this.offsets[i] = 0;
        this.nodes[i] = [];
        this.showMore[i] = false;
        this.hasMore[i] = false;
      }
      this.route.queryParams.forEach(params => {
        for (let i = 0; i < this.TYPE_COUNT; i++) {
          this.showMore[i] = params['showMore' + i] == 'true';
        }
        this.search(params.query ? params.query : '');
      });
    });
    setInterval(() => this.updateHasMore(), 1000);
  }
  ngOnInit() {
    this.registerMainNav();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.storage.set(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService.NODE_RENDER_PARAMETER_LIST, this.nodes[this.MATERIALS]);
    this.mainNav.getMainNav().topBar.elementRef.nativeElement.style.marginTop = null;
  }
  registerMainNav() {
    this.mainNav.setMainNavConfig({
      title: 'SEARCH.TITLE',
      currentScope: 'oer',
      canOpen: true
    });
    const searchFieldInstance = this.searchField.enable({
      placeholder: 'OER.SEARCH'
    }, this.destroyed);
    searchFieldInstance.onSearchTriggered().subscribe(({
      searchString
    }) => this.routeSearch(searchString));
    this.currentQuerySubject.subscribe(currentQuery => searchFieldInstance.setSearchString(currentQuery));
  }
  setMainNavOffset(offset) {
    this.mainNav.getMainNav().topBar.elementRef.nativeElement.style.marginTop = offset + 'px';
  }
  goToCollections() {
    this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIConstants.ROUTER_PREFIX + 'collections'], {
      queryParams: {
        mainnav: true
      }
    });
  }
  goToSearch() {
    this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIConstants.ROUTER_PREFIX + 'search']);
  }
  routeSearch(query = this.currentQuery) {
    if (query) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIConstants.ROUTER_PREFIX + 'search'], {
        queryParams: {
          query
        }
      });
      return;
    }
    const queryParams = {
      query
    };
    for (let i = 0; i < this.TYPE_COUNT; i++) {
      queryParams['showMore' + i] = this.showMore[i];
    }
    this.router.navigate(['./'], {
      queryParams,
      relativeTo: this.route
    });
  }
  checkMore() {}
  search(string) {
    if (this.currentQuery === string) return;
    for (let i = 0; i < this.TYPE_COUNT; i++) {
      this.offsets[i] = 0;
      this.nodes[i] = [];
      this.loading[i] = true;
    }
    const criterias = [];
    this.currentQuery = string;
    const originalQuery = string;
    if (string === '') string = '*';
    criterias.push({
      property: 'ngsearchword',
      values: [string]
    });
    this.searchService.search(criterias, [], {
      sortBy: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_COLLECTION_PINNED_STATUS, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_COLLECTION_PINNED_ORDER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_MODIFIED_DATE],
      sortAscending: [false, true, false],
      offset: this.offsets[this.COLLECTIONS],
      propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL]
    }, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CONTENT_TYPE_COLLECTIONS, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.HOME_REPOSITORY, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.DEFAULT, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL], 'collections').subscribe(data => {
      if (this.currentQuery !== originalQuery) return;
      for (const node of data.nodes) {
        this.nodes[this.COLLECTIONS].push(node);
      }
      this.offsets[this.COLLECTIONS] += this.connector.numberPerRequest;
      this.loading[this.COLLECTIONS] = false;
    });
    this.searchService.search(criterias, [], {
      sortBy: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_MODIFIED_DATE],
      sortAscending: false,
      offset: this.offsets[this.MATERIALS],
      propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL]
    }).subscribe(data => {
      if (this.currentQuery !== originalQuery) return;
      for (const node of data.nodes) {
        this.nodes[this.MATERIALS].push(node);
      }
      // force an update to allow change detection
      this.nodes[this.MATERIALS] = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopyArray(this.nodes[this.MATERIALS]);
      this.offsets[this.MATERIALS] += this.connector.numberPerRequest;
      this.loading[this.MATERIALS] = false;
    });
    this.searchService.search(criterias, [], {
      sortBy: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_MODIFIED_DATE],
      sortAscending: false,
      offset: this.offsets[this.TOOLS],
      propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.LOM_PROP_DESCRIPTION]
    }).subscribe(data => {
      if (this.currentQuery !== originalQuery) return;
      for (const node of data.nodes) {
        this.nodes[this.TOOLS].push(node);
      }
      this.nodes[this.TOOLS] = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopyArray(this.nodes[this.TOOLS]);
      this.offsets[this.TOOLS] += this.connector.numberPerRequest;
      this.loading[this.TOOLS] = false;
    });
  }
  toggleMore(mode) {
    this.showMore[mode] = !this.showMore[mode];
    this.routeSearch();
  }
  loadMore(mode) {}
  openNode(node) {
    this.router.navigate([this.nodeHelper.getNodeLink('routerLink', node)], {
      queryParams: this.nodeHelper.getNodeLink('queryParams', node)
    });
  }
  updateOptions(mode, node = null) {
    this.options[mode] = [];
    if (mode == this.MATERIALS) {
      this.options[mode].push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.OptionItem('INFORMATION', 'info_outline', node => this.openNode(node)));
      const download = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.OptionItem('DOWNLOAD', 'cloud_download', node => this.downloadNode(node));
      if (node && node.mediatype == 'link') download.isEnabled = false;
      this.options[mode].push(download);
    }
  }
  downloadNode(node = this.displayedNode) {
    window.open(node.downloadUrl);
  }
  updateHasMore() {
    try {
      this.hasMore[this.COLLECTIONS] = document.getElementById('collections').scrollHeight > 90 + 15;
    } catch (e) {}
    try {
      this.hasMore[this.MATERIALS] = document.getElementById('materials').scrollHeight > 300 + 15;
    } catch (e) {}
    try {
      this.hasMore[this.TOOLS] = document.getElementById('tools').scrollHeight > 300 + 15;
    } catch (e) {}
  }
  static #_ = this.ɵfac = function OerPageComponent_Factory(t) {
    return new (t || OerPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_4__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__.SearchFieldService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: OerPageComponent,
    selectors: [["es-oer-page"]],
    decls: 23,
    vars: 17,
    consts: [[1, "header", 3, "esBorderBoxObserver"], ["esImageConfig", "", "alt", "", 3, "src"], [1, "headerGradient"], [1, "heading"], ["esTitle", ""], [1, "content"], ["class", "collectionsGroup", 4, "ngIf"], [1, "materials"], [1, "caption"], ["class", "more", 4, "ngIf"], ["class", "noResults materials", 4, "ngIf"], ["class", "tools", 4, "ngIf"], [3, "scope"], [1, "collectionsGroup"], ["class", "noResults collections", 4, "ngIf"], [1, "more"], ["tabindex", "0", 1, "clickable", 3, "click", "keyup.enter"], [1, "noResults", "collections"], ["tabindex", "0", 1, "clickable", 3, "click"], [1, "noResults", "materials"], [1, "tools"], ["class", "noResults tools", 4, "ngIf"], [1, "noResults", "tools"]],
    template: function OerPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div")(1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("esBorderBoxObserver", function OerPageComponent_Template_div_esBorderBoxObserver_1_listener($event) {
          return ctx.setMainNavOffset($event.height - 75);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "esAssetsPath");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 3)(6, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, OerPageComponent_div_13_Template, 8, 5, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "div", 7)(15, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, OerPageComponent_div_18_Template, 4, 3, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, OerPageComponent_div_19_Template, 3, 3, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](20, " TODO ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, OerPageComponent_div_21_Template, 7, 5, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](22, "es-footer", 12);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 9, "assets/images/layout/oer_bg.jpg"), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 11, "OER.HEADING_TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](11, 13, "OER.HEADING_DESCRIPTION"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.nodes[ctx.COLLECTIONS] && ctx.nodes[ctx.COLLECTIONS].length);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](17, 15, "OER.MATERIALS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasMore[ctx.MATERIALS]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !(ctx.loading[ctx.MATERIALS] || ctx.nodes[ctx.MATERIALS] && ctx.nodes[ctx.MATERIALS].length));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("scope", "oer");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.BorderBoxObserverDirective, _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__.FooterComponent, _shared_directives_image_config_directive__WEBPACK_IMPORTED_MODULE_7__.ImageConfigDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_8__.TitleDirective, _shared_pipes_assets_path_pipe__WEBPACK_IMPORTED_MODULE_9__.AssetsPathPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslatePipe],
    styles: ["\n\n  .topBar-oer > div {\n  background: transparent !important;\n}\n  .topBar-oer .topBarSearch form input {\n  background-color: rgb(255, 255, 255) !important;\n}\n  .topBar-oer .topBarSearch {\n  position: initial !important;\n}\n  .topBar-oer .topBarSearch form input,   .topBar-oer .topBarSearch form i {\n  color: #505050 !important;\n}\n  .topBar-oer .userMenu {\n  position: absolute !important;\n}\n  .topBar-oer .topBarSearch form {\n  margin: auto;\n}\n  .topBar-oer .topBarSearch form .searchClearIcon {\n  right: 5px;\n}\n  .topBar-oer .topBarSearch form,   .topBar-oer .topBarSearch input {\n  width: 500px;\n  box-sizing: border-box;\n}\n  .topBar-oer .topbar-search-right {\n  width: 300px;\n  text-align: right;\n  display: flex !important;\n  align-items: center;\n  justify-content: flex-end;\n}\n@media screen and (max-width: 1200px) {\n    .topBar-oer .topBarSearch form,   .topBar-oer .topBarSearch input {\n    width: 100%;\n    box-sizing: content-box;\n  }\n}\n@media screen and (max-width: 1000px) {\n    .topBar-oer .user {\n    width: auto;\n  }\n}\n@media screen and (max-width: 900px) {\n    .topBar-oer .topbar-search-right {\n    width: auto;\n  }\n    .topBar-oer .searchInputGroup {\n    width: 100% !important;\n  }\n}\n@media screen and (max-width: 700px) {\n    .topBar-oer .topBarSearch form,   .topBar-oer .topBarSearch input {\n    box-sizing: border-box;\n  }\n}\n\n@media screen and (max-width: 1000px) {\n  .heading[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.heading[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  margin-top: 3%;\n  width: 100%;\n  text-align: center;\n  color: #fff;\n}\n.heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 240%;\n}\n.heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 120%;\n  white-space: pre-line;\n}\n.heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-shadow: 0 0 10px #000;\n}\n\n.header[_ngcontent-%COMP%] {\n  position: relative;\n}\n.header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  object-fit: cover;\n  width: 100%;\n  max-height: 300px;\n  min-height: 80px;\n}\n.header[_ngcontent-%COMP%]   .headerGradient[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 5px;\n  background: linear-gradient(rgba(0, 0, 0, 0.0001) 0, rgba(0, 0, 0, 0.5) 100%);\n}\n\n.content[_ngcontent-%COMP%] {\n  position: relative;\n  top: -20px;\n  width: calc(100% + 10px);\n  padding: 0 4%;\n  overflow: hidden;\n}\n\n.caption[_ngcontent-%COMP%] {\n  float: left;\n  color: var(--textLight);\n  margin-left: 15px;\n}\n\n.more[_ngcontent-%COMP%] {\n  float: right;\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.more[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n\n.list[_ngcontent-%COMP%] {\n  width: calc(100% + var(--cardWidth)60px);\n  float: left;\n  overflow: hidden;\n  margin: 10px 0;\n}\n\n.collections[_ngcontent-%COMP%] {\n  min-height: 115px;\n  max-height: 115px;\n  margin-bottom: 70px;\n}\n\n.materials[_ngcontent-%COMP%] {\n  min-height: 315px;\n  max-height: 315px;\n}\n\n.scrollContent[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.listLoading[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.listMore[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: none;\n}\n\n.noResults[_ngcontent-%COMP%] {\n  float: left;\n  width: 100%;\n  font-size: 120%;\n  color: rgba(0, 0, 0, 0.54);\n  text-align: center;\n  padding-top: 20px;\n}\n\n@media (pointer: coarse) {\n  [_nghost-%COMP%]     .collections {\n    width: 100%;\n    overflow-x: auto;\n    \n\n    -webkit-overflow-scrolling: touch;\n  }\n  [_nghost-%COMP%]     .collections .list {\n    width: max-content;\n  }\n}\n@media all and (max-width: 900px) {\n  [_nghost-%COMP%]     .collections .list {\n    width: max-content;\n  }\n  .collections[_ngcontent-%COMP%] {\n    width: calc(100% + 40px);\n    margin: 10px -20px;\n    padding: 0 20px;\n  }\n}\n@media all and (max-width: 700px) {\n  .materials[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9vZXItcGFnZS9vZXItcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDRkk7RUFDSSxrQ0FBQTtBQURSO0FBR0k7RUFDSSwrQ0FBQTtBQURSO0FBR0k7RUFDSSw0QkFBQTtBQURSO0FBR0k7O0VBRUkseUJBQUE7QUFEUjtBQUdJO0VBQ0ksNkJBQUE7QUFEUjtBQUdJO0VBQ0ksWUFBQTtBQURSO0FBRVE7RUFDSSxVQUFBO0FBQVo7QUFHSTs7RUFFSSxZQUFBO0VBQ0Esc0JBQUE7QUFEUjtBQUdJO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBRFI7QUFHSTtFQUNJOztJQUVJLFdBQUE7SUFDQSx1QkFBQTtFQURWO0FBQ0Y7QUFJSTtFQUNJO0lBQ0ksV0FBQTtFQUZWO0FBQ0Y7QUFJSTtFQUNJO0lBQ0ksV0FBQTtFQUZWO0VBSU07SUFDSSxzQkFBQTtFQUZWO0FBQ0Y7QUFJSTtFQUNJOztJQUVJLHNCQUFBO0VBRlY7QUFDRjs7QUFNQTtFQUNJO0lBQ0ksYUFBQTtFQUhOO0FBQ0Y7QUFNQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLE1BQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUpKO0FBS0k7RUFDSSxlQUFBO0FBSFI7QUFLSTtFQUNJLGVBQUE7RUFDQSxxQkFBQTtBQUhSO0FBS0k7O0VBRUksMEJBQUE7QUFIUjs7QUFNQTtFQUNJLGtCQUFBO0FBSEo7QUFJSTtFQUNJLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFGUjtBQUlJO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLDZFQUFBO0FBRlI7O0FBTUE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQUhKOztBQUtBO0VBQ0ksV0FBQTtFQUNBLHVCRHhHUTtFQ3lHUixpQkFBQTtBQUZKOztBQUlBO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUFESjtBQUVJO0VBQ0ksZUFBQTtBQUFSOztBQUdBO0VBQ0ksd0NBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQUo7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFDQTtFQUNJLGlCQUFBO0VBQ0EsaUJBQUE7QUFFSjs7QUFBQTtFQUNJLGdCQUFBO0FBR0o7O0FBREE7RUFDSSxXQUFBO0FBSUo7O0FBRkE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUFLSjs7QUFIQTtFQUNJLFdBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLDBCRDNGYTtFQzRGYixrQkFBQTtFQUNBLGlCQUFBO0FBTUo7O0FBSkE7RUFDSTtJQUNJLFdBQUE7SUFDQSxnQkFBQTtJQ2hKSixzQkFBQTtJQUNBLGlDQUFBO0VEd0pGO0VBUE07SUFDSSxrQkFBQTtFQVNWO0FBQ0Y7QUFMQTtFQUVRO0lBQ0ksa0JBQUE7RUFNVjtFQUhFO0lBQ0ksd0JBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7RUFLTjtBQUNGO0FBRkE7RUFFUTtJQUNJLFdBQUE7RUFHVjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjo6bmctZGVlcCAudG9wQmFyLW9lciB7XG4gICAgPiBkaXYge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAudG9wQmFyU2VhcmNoIGZvcm0gaW5wdXQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC50b3BCYXJTZWFyY2gge1xuICAgICAgICBwb3NpdGlvbjogaW5pdGlhbCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAudG9wQmFyU2VhcmNoIGZvcm0gaW5wdXQsXG4gICAgLnRvcEJhclNlYXJjaCBmb3JtIGkge1xuICAgICAgICBjb2xvcjogIzUwNTA1MCAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAudXNlck1lbnUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLnRvcEJhclNlYXJjaCBmb3JtIHtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAuc2VhcmNoQ2xlYXJJY29uIHtcbiAgICAgICAgICAgIHJpZ2h0OiA1cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnRvcEJhclNlYXJjaCBmb3JtLFxuICAgIC50b3BCYXJTZWFyY2ggaW5wdXQge1xuICAgICAgICB3aWR0aDogNTAwcHg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgfVxuICAgIC50b3BiYXItc2VhcmNoLXJpZ2h0IHtcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSo1KSkge1xuICAgICAgICAudG9wQmFyU2VhcmNoIGZvcm0sXG4gICAgICAgIC50b3BCYXJTZWFyY2ggaW5wdXQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGgrJG1vYmlsZVN0YWdlKjMpKSB7XG4gICAgICAgIC51c2VyIHtcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGgrJG1vYmlsZVN0YWdlKjIpKSB7XG4gICAgICAgIC50b3BiYXItc2VhcmNoLXJpZ2h0IHtcbiAgICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIC5zZWFyY2hJbnB1dEdyb3VwIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogKCRtb2JpbGVXaWR0aCkpIHtcbiAgICAgICAgLnRvcEJhclNlYXJjaCBmb3JtLFxuICAgICAgICAudG9wQmFyU2VhcmNoIGlucHV0IHtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGgrJG1vYmlsZVN0YWdlKjMpKSB7XG4gICAgLmhlYWRpbmcge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cblxuLmhlYWRpbmcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAyO1xuICAgIHRvcDogMDtcbiAgICBtYXJnaW4tdG9wOiAzJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgaDEge1xuICAgICAgICBmb250LXNpemU6IDI0MCU7XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgZm9udC1zaXplOiAxMjAlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG4gICAgfVxuICAgIGgxLFxuICAgIGgyIHtcbiAgICAgICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMwMDA7XG4gICAgfVxufVxuLmhlYWRlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGltZyB7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDgwcHg7XG4gICAgfVxuICAgIC5oZWFkZXJHcmFkaWVudCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiA1cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuMDAwMSkgMCwgcmdiYSgwLCAwLCAwLCAwLjUpIDEwMCUpO1xuICAgIH1cbn1cblxuLmNvbnRlbnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IC0yMHB4O1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAxMHB4KTtcbiAgICBwYWRkaW5nOiAwIDQlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY2FwdGlvbiB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XG59XG4ubW9yZSB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYSB7XG4gICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICB9XG59XG4ubGlzdCB7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGNhcmRXaWR0aCArIDYwcHh9KTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1hcmdpbjogMTBweCAwO1xufVxuLmNvbGxlY3Rpb25zIHtcbiAgICBtaW4taGVpZ2h0OiAkbGlzdENhcmRTbWFsbEhlaWdodCArIDE1cHg7XG4gICAgbWF4LWhlaWdodDogJGxpc3RDYXJkU21hbGxIZWlnaHQgKyAxNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XG59XG4ubWF0ZXJpYWxzIHtcbiAgICBtaW4taGVpZ2h0OiAkY2FyZEhlaWdodCArIDE1cHg7XG4gICAgbWF4LWhlaWdodDogJGNhcmRIZWlnaHQgKyAxNXB4O1xufVxuLnNjcm9sbENvbnRlbnQge1xuICAgIG92ZXJmbG93LXg6IGF1dG87XG59XG4ubGlzdExvYWRpbmcge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuLmxpc3RNb3JlIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiBub25lO1xufVxuLm5vUmVzdWx0cyB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1zaXplOiAxMjAlO1xuICAgIGNvbG9yOiAkbm9SZXN1bHRzQ29sb3I7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcbiAgICA6aG9zdCA6Om5nLWRlZXAgLmNvbGxlY3Rpb25zIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgICAgIEBpbmNsdWRlIGlvc1Njcm9sbGluZygpO1xuICAgICAgICAubGlzdCB7XG4gICAgICAgICAgICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCskbW9iaWxlU3RhZ2UqMikge1xuICAgIDpob3N0IDo6bmctZGVlcCAuY29sbGVjdGlvbnMge1xuICAgICAgICAubGlzdCB7XG4gICAgICAgICAgICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmNvbGxlY3Rpb25zIHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSArIDQwcHgpO1xuICAgICAgICBtYXJnaW46IDEwcHggLTIwcHg7XG4gICAgICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICB9XG59XG5cbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCkge1xuICAgIC5tYXRlcmlhbHMge1xuICAgICAgICAubGlzdCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBtaXhpbiBpbWFnZURpc2FibGVkQmx1cigpIHtcbiAgICAtd2Via2l0LWZpbHRlcjogYmx1cigzcHgpO1xuICAgIGZpbHRlcjogYmx1cigzcHgpO1xufVxuQG1peGluIHNob3J0ZW5UZXh0KCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0xhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAxMHB4IDcwcHggcmdiYSgwLCAwLCAwLCAwLjE1KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBsaW1pdExpbmVMZW5ndGgoJHdpZHRoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1heC13aWR0aDogJHdpZHRoO1xufVxuQG1peGluIHVuc2VsZWN0YWJsZVRleHQoKSB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xufVxuQG1peGluIGlvc1Njcm9sbGluZygpIHtcbiAgICAvKiBpb3Mgc2Nyb2xsaW5nIGZpeCAqL1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cbkBtaXhpbiBwbGFjZWhvbGRlciB7XG4gICAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDo6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEluc2V0Rm9jdXMoKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICRmb2N1c1dpZHRoICRmb2N1c0NvbG9yICFpbXBvcnRhbnQ7XG4gICAgQG1lZGlhIChwb2ludGVyOiBjb2Fyc2UpIHtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScsICRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogJGZvY3VzV2lkdGggc29saWQgJGNvbG9yO1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxEYXNoZWRGb2N1cygpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBkYXNoZWQgJGZvY3VzQ29sb3I7XG59XG5cbkBtaXhpbiBmb2N1c1NoYWRvdygkZGFyazogdHJ1ZSwgJHN0cmVuZ3RoOiAwLjEpIHtcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIEBpZiAkZGFyaz09dHJ1ZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsICRzdHJlbmd0aCk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgfVxufVxuQG1peGluIGRhcmtlbigpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuQ29sb3I7XG59XG5AbWl4aW4gZGFya2VuTGlnaHQoKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkxpZ2h0Q29sb3I7XG59XG5AbWl4aW4gYmx1ckJhY2tncm91bmQoJHJhZGl1czogNXB4KSB7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKCRyYWRpdXMpO1xufVxuQG1peGluIHNldEdsb2JhbEZvY3VzKCRjb2xvcjogJGZvY3VzQ29sb3IpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgJGZvY3VzV2lkdGggJGNvbG9yICFpbXBvcnRhbnQ7XG59XG5cbkBtaXhpbiByZW1vdmVCdXR0b25EZWZhdWx0U3R5bGVzIHtcbiAgICBiYWNrZ3JvdW5kOiB1bnNldDtcbiAgICBib3JkZXI6IHVuc2V0O1xuICAgIHBhZGRpbmc6IHVuc2V0O1xufVxuXG5AbWl4aW4gYWZ0ZXJQc2V1ZG9FbGVtZW50IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuQGltcG9ydCAncHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zJztcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 50222:
/*!***************************************************!*\
  !*** ./src/app/pages/oer-page/oer-page.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OerPageModule: () => (/* binding */ OerPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _oer_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oer-page-routing.module */ 1875);
/* harmony import */ var _oer_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oer-page.component */ 41787);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class OerPageModule {
  static #_ = this.ɵfac = function OerPageModule_Factory(t) {
    return new (t || OerPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: OerPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _oer_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.OerPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](OerPageModule, {
    declarations: [_oer_page_component__WEBPACK_IMPORTED_MODULE_2__.OerPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _oer_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.OerPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_oer-page_oer-page_module_ts.js.map