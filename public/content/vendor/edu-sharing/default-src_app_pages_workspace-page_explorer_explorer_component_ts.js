"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["default-src_app_pages_workspace-page_explorer_explorer_component_ts"],{

/***/ 47159:
/*!*********************************************************************!*\
  !*** ./src/app/pages/workspace-page/explorer/explorer.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspaceExplorerComponent: () => (/* binding */ WorkspaceExplorerComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _workspace_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../workspace-utils */ 58164);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 76309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 58175);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
















function WorkspaceExplorerComponent_ng_template_1_h5_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "WORKSPACE.NO_NODES_IN_FOLDER"), " ");
  }
}
const _c0 = function (a0) {
  return {
    name: a0
  };
};
function WorkspaceExplorerComponent_ng_template_1_h5_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, "WORKSPACE.NO_MATCHING_ITEMS_FOLDER", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](4, _c0, ctx_r4.node$.value.name)), " ");
  }
}
function WorkspaceExplorerComponent_ng_template_1_h5_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WorkspaceExplorerComponent_ng_template_1_h5_1_div_2_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r7.searchGlobal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SEARCH_GLOBAL"), " ");
  }
}
function WorkspaceExplorerComponent_ng_template_1_h5_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "WORKSPACE.NO_MATCHING_ITEMS"));
  }
}
function WorkspaceExplorerComponent_ng_template_1_h5_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, WorkspaceExplorerComponent_ng_template_1_h5_1_div_1_Template, 3, 6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, WorkspaceExplorerComponent_ng_template_1_h5_1_div_2_Template, 3, 3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, WorkspaceExplorerComponent_ng_template_1_h5_1_div_3_Template, 3, 3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r3.node$.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r3.node$.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r3.node$.value);
  }
}
function WorkspaceExplorerComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, WorkspaceExplorerComponent_ng_template_1_h5_0_Template, 3, 3, "h5", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, WorkspaceExplorerComponent_ng_template_1_h5_1_Template, 4, 3, "h5", 2);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.searchQuery$.value == null || ctx_r1.searchQuery$.value === "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !(ctx_r1.searchQuery$.value == null || ctx_r1.searchQuery$.value === ""));
  }
}
const _c1 = function (a1, a2) {
  return {
    dragAllowed: true,
    dropAllowed: a1,
    dropped: a2
  };
};
class WorkspaceExplorerComponent {
  static getColumns(connector, customColumns = [], configColumns = []) {
    let defaultColumns = [];
    defaultColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME));
    defaultColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_CREATOR));
    defaultColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_MODIFIED_DATE));
    if (connector.getCurrentLogin() ? connector.getCurrentLogin().isAdmin : false) {
      defaultColumns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.NODE_ID));
      const repsource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_REPLICATIONSOURCEID);
      repsource.visible = false;
      defaultColumns.push(repsource);
    }
    const title = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TITLE);
    title.visible = false;
    const size = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SIZE);
    size.visible = false;
    const created = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_PROP_C_CREATED);
    created.visible = false;
    const mediatype = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.MEDIATYPE);
    mediatype.visible = false;
    const keywords = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_KEYWORD);
    keywords.visible = false;
    const dimensions = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.DIMENSIONS);
    dimensions.visible = false;
    const version = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_LIFECYCLE_VERSION);
    version.visible = false;
    const usage = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.VIRTUAL_PROP_USAGECOUNT);
    usage.visible = false;
    const license = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE);
    license.visible = false;
    const wfStatus = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_WF_STATUS);
    wfStatus.visible = false;
    defaultColumns.push(title);
    defaultColumns.push(size);
    defaultColumns.push(created);
    defaultColumns.push(mediatype);
    defaultColumns.push(keywords);
    defaultColumns.push(dimensions);
    defaultColumns.push(version);
    defaultColumns.push(usage);
    defaultColumns.push(license);
    defaultColumns.push(wfStatus);
    if (Array.isArray(configColumns)) {
      const configList = [];
      for (const col of defaultColumns) {
        if (configColumns.indexOf(col.name) != -1) {
          col.visible = true;
          configList.push(col);
        }
      }
      for (const col of defaultColumns) {
        if (configColumns.indexOf(col.name) == -1) {
          col.visible = false;
          configList.push(col);
        }
      }
      // sort as defined inside config
      configList.sort((a, b) => {
        let pos1 = configColumns.indexOf(a.name);
        let pos2 = configColumns.indexOf(b.name);
        if (pos1 === -1) pos1 = configColumns.length;
        if (pos2 === -1) pos2 = configColumns.length;
        return pos1 - pos2;
      });
      defaultColumns = configList;
    }
    if (Array.isArray(customColumns)) {
      for (const column of defaultColumns) {
        let add = true;
        for (const column2 of customColumns) {
          if (column.name === column2.name) {
            add = false;
            break;
          }
        }
        if (add) {
          customColumns.push(column);
        }
      }
      return customColumns;
    }
    return defaultColumns;
  }
  set root(root) {
    this._root = root;
    this.storage.get(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService.KEY_WORKSPACE_SORT + root, null).subscribe(data => {
      if (data?.active != null) {
        this.sort.active = data.active;
        this.sort.direction = data.direction;
      } else {
        this.sort.active = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME;
        this.sort.direction = 'asc';
      }
    });
  }
  set current(current) {
    this.setNode(current);
  }
  set searchQuery(query) {
    this.setSearchQuery(query);
  }
  searchGlobal() {
    this.onSearchGlobal.emit(this.searchQuery$.value);
  }
  load(event = null) {
    if (this.node$.value == null && !this.searchQuery$.value) return;
    if (this.dataSource.isLoading) {
      // return;
    }
    if (this.searchQuery$.value) {
      this.sort.columns = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.POSSIBLE_SORT_BY_FIELDS_SOLR;
    } else {
      this.sort.columns = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.POSSIBLE_SORT_BY_FIELDS;
    }
    if (!this.sort.columns.some(s => s.name === this.sort.active)) {
      this.sort.active = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME;
      this.sort.direction = 'asc';
      // set sorting will reinit everything
      this.setSorting(this.sort);
      return;
    }
    if (event?.reset) {
      this.dataSource.reset();
      this.nodeEntries.getSelection().clear();
      this.onReset.emit();
      if (event.offset === 0) {
        this.nodeEntries.resetPagination();
      }
    } else if (this.dataSource.isFullyLoaded()) {
      return;
    }
    this.dataSource.isLoading = true;
    // ignore virtual (new) added/uploaded elements
    const offset = event.offset || this.getRealNodeCount();
    if (this.searchQuery$.value) {
      const query = this.searchQuery$.value;
      this.lastRequestSearch = true;
      /*this.search.searchByProperties([RestConstants.NODE_ID,RestConstants.CM_PROP_TITLE,RestConstants.CM_NAME,RestConstants.LOM_PROP_DESCRIPTION,RestConstants.LOM_PROP_GENERAL_KEYWORD],
        [query,query,query,query,query],[],RestConstants.COMBINE_MODE_OR,RestConstants.CONTENT_TYPE_FILES_AND_FOLDERS, request).subscribe((data : NodeList) => this.addNodes(data,true));*/
      const criteria = [];
      criteria.push({
        property: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PRIMARY_SEARCH_CRITERIA,
        values: [query]
      });
      if (this.node$.value) {
        criteria.push({
          property: 'parent',
          values: [this.node$.value ? this.node$.value.ref.id : '']
        });
      }
      this.load$.next({
        reset: event?.reset,
        nodes: this.search.search({
          query: 'workspace',
          repository: ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.HOME_REPOSITORY,
          metadataset: ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.DEFAULT,
          contentType: this.connector.getCurrentLogin() && this.connector.getCurrentLogin().isAdmin ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_TYPE_ALL : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_TYPE_FILES_AND_FOLDERS,
          body: {
            criteria,
            resolveCollections: false,
            resolveUsernames: true
          },
          skipCount: offset,
          propertyFilter: [ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.PROPERTY_FILTER_ALL],
          sortProperties: [this.sort.active],
          sortAscending: [this.sort.direction === 'asc'],
          maxItems: event?.amount || _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService.DEFAULT_NUMBER_PER_REQUEST
        })
      });
      // this.nodeApi.searchNodes(query,[],request).subscribe((data : NodeList) => this.addNodes(data,true));
    } else {
      this.lastRequestSearch = false;
      this.load$.next({
        reset: event?.reset,
        nodes: this.nodeApi.getChildren(this.node$.value.ref.id, {
          skipCount: offset,
          maxItems: event?.amount || _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService.DEFAULT_NUMBER_PER_REQUEST,
          propertyFilter: [ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.PROPERTY_FILTER_ALL]
        })
      });
    }
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.temporaryStorage.set(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.TemporaryStorageService.NODE_RENDER_PARAMETER_DATA_SOURCE, this.dataSource);
  }
  ngOnChanges(changes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (changes.displayType) {
        yield _this.initOptions();
      }
    })();
  }
  handleError(error) {
    if (error.status == 404) this.toast.error(null, 'WORKSPACE.TOAST.NOT_FOUND', {
      id: this.node$.value.ref.id
    });else this.toast.error(error);
    this.dataSource.isLoading = false;
  }
  addNodes(data) {
    this.dataSource.isLoading = false;
    if (data && data.nodes) {
      this.dataSource.appendData(data.nodes);
      this.dataSource.setPagination(data.pagination);
    }
  }
  constructor(connector, translate, storage, temporaryStorage, config, search, toast, ui, nodeApi, localEvents) {
    var _this2 = this;
    this.connector = connector;
    this.translate = translate;
    this.storage = storage;
    this.temporaryStorage = temporaryStorage;
    this.config = config;
    this.search = search;
    this.toast = toast;
    this.ui = ui;
    this.nodeApi = nodeApi;
    this.localEvents = localEvents;
    this.SCOPES = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.Scope;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.InteractionType;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.NodeEntriesDisplayType;
    this.nodesChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.sort = {
      allowed: true,
      active: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME,
      direction: 'asc',
      columns: []
    };
    this.columns = [];
    this.displayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.NodeEntriesDisplayType.Table;
    this.refreshTree = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.displayTypeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.reorderDialog = false;
    this.reorderDialogChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.searchQuery$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(null);
    this.node$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(null);
    this.load$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.ReplaySubject();
    this.onOpenNode = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onViewNode = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onSelectionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onSelectNode = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onSearchGlobal = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.onReset = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    this.canDrop = _workspace_utils__WEBPACK_IMPORTED_MODULE_3__.canDropOnNode;
    this.drop = (target, source) => {
      this.onDrop.emit({
        target,
        source
      });
    };
    // super(temporaryStorage,['_node','_nodes','sortBy','sortAscending','columns','totalCount','hasMoreToLoad']);
    this.initColumns();
    this.registerNodesDeleted();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest)([this.node$, this.searchQuery$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)((a, b) => {
      return _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.objectEquals(a[0], b[0]) && a[1] === b[1];
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.debounceTime)(10)).subscribe( /*#__PURE__*/function () {
      var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (value) {
        // FIXME: This goes back to the first page when reloading. `NodeEntriesWrapper`
        // would restore the page via the `page` query parameter otherwise.
        yield _this2.load({
          offset: 0,
          reset: true
        });
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    this.load$.pipe(
    // map((o) => o.toPromise()),
    // switchMap(result => result.toPromise())
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.tap)(({
      reset
    }) => {
      if (reset) {
        this.dataSource.reset();
      }
      this.dataSource.isLoading = true;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)( /*#__PURE__*/function () {
      var _ref2 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
        nodes
      }) {
        return yield nodes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.catchError)(err => {
          _this2.handleError(err);
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.of)(null);
        })).toPromise();
      });
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }())).subscribe( /*#__PURE__*/function () {
      var _ref3 = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
        if (data) {
          _this2.addNodes(data);
        }
      });
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  }
  ngAfterViewInit() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.initOptions();
    })();
  }
  setSorting(config) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.sort = config;
      yield _this4.storage.set(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService.KEY_WORKSPACE_SORT + _this4._root, {
        active: config.active,
        direction: config.direction
      });
      yield _this4.load({
        reset: true,
        offset: 0
      });
    })();
  }
  onSelection(event) {
    this.onSelectionChanged.emit(event);
  }
  /*
  private addParentToPath(node : Node,path : string[]) {
     path.splice(1,0,node.ref.id);
    if (node.parent.id==path[0] || node.parent.id==null) {
      this.onOpenNode.emit(node);
      return;
    }
    this.nodeApi.getNodeMetadata(node.parent.id).subscribe((data: NodeWrapper)=> {
      this.addParentToPath(data.node, path);
    });
   }
   */
  doubleClick(node) {
    this.onOpenNode.emit(node);
  }
  setNode(current) {
    this.searchQuery$.next(null);
    if (!current) {
      this.node$.next(null);
      return;
    }
    if (this.dataSource?.isLoading) {
      setTimeout(() => this.setNode(current), 10);
      return;
    }
    if (_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.objectEquals(this.node$.value, current)) return;
    this.node$.next(current);
    this.initOptions();
  }
  setSearchQuery(query) {
    setTimeout(() => {
      if (query && query.query) {
        this.searchQuery$.next(query.query);
        this.node$.next(query.node);
      } else {
        this.searchQuery$.next(null);
      }
    });
  }
  getRealNodeCount() {
    return this.dataSource?.getData().filter(n => !n.virtual).length;
  }
  initColumns() {
    this.config.get('workspaceColumns').subscribe(data => {
      this.storage.get('workspaceColumns').subscribe(columns => {
        this.columns = WorkspaceExplorerComponent.getColumns(this.connector, columns, data);
      });
    });
  }
  select(event) {
    if (!(this.nodeEntries.getSelection().selected.length === 1 && this.nodeEntries.getSelection().selected[0] === event.element)) {
      this.nodeEntries.getSelection().clear();
    }
    this.nodeEntries.getSelection().toggle(event.element);
  }
  initOptions() {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.nodeEntries?.initOptionsGenerator({
        actionbar: _this5.actionbar,
        customOptions: _this5.customOptions,
        parent: _this5.node$.value
      });
    })();
  }
  registerNodesDeleted() {
    this.localEvents.nodesDeleted.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.takeUntil)(this.destroyed)).subscribe(nodes => {
      this.dataSource.removeData(nodes);
      this.nodeEntries?.getSelection().clear();
    });
  }
  saveColumns(columns) {
    this.storage.set('workspaceColumns', columns);
  }
  clickItem(event) {
    if (this.ui.isMobile()) {
      this.onOpenNode.emit(event.element);
    } else {
      this.select(event);
    }
  }
  syncTreeViewOnAdd(nodes) {
    if (nodes.filter(n => n.virtual && n.isDirectory).length) {
      this.refreshTree.emit();
    }
  }
  static #_ = this.ɵfac = function WorkspaceExplorerComponent_Factory(t) {
    return new (t || WorkspaceExplorerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.SearchService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_4__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.LocalEventsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: WorkspaceExplorerComponent,
    selectors: [["es-workspace-explorer"]],
    viewQuery: function WorkspaceExplorerComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.NodeEntriesWrapperComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
      }
    },
    inputs: {
      customOptions: "customOptions",
      dataSource: "dataSource",
      displayType: "displayType",
      reorderDialog: "reorderDialog",
      preventKeyevents: "preventKeyevents",
      actionbar: "actionbar",
      root: "root",
      current: "current",
      searchQuery: "searchQuery"
    },
    outputs: {
      nodesChange: "nodesChange",
      refreshTree: "refreshTree",
      displayTypeChange: "displayTypeChange",
      reorderDialogChange: "reorderDialogChange",
      onOpenNode: "onOpenNode",
      onViewNode: "onViewNode",
      onSelectionChanged: "onSelectionChanged",
      onSelectNode: "onSelectNode",
      onSearchGlobal: "onSearchGlobal",
      onDrop: "onDrop",
      onReset: "onReset"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵNgOnChangesFeature"]],
    decls: 3,
    vars: 15,
    consts: [[3, "dataSource", "scope", "columns", "configureColumns", "displayType", "elementInteractionType", "sort", "dragDrop", "primaryInstance", "singleClickHint", "columnsChange", "displayTypeChange", "fetchData", "sortChange", "clickItem", "dblClickItem", "virtualNodesAdded"], ["empty", ""], ["class", "noElementsInfo", 4, "ngIf"], [1, "noElementsInfo"], [4, "ngIf"], ["class", "clickable", 3, "click", 4, "ngIf"], [1, "clickable", 3, "click"]],
    template: function WorkspaceExplorerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "es-node-entries-wrapper", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("columnsChange", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_columnsChange_0_listener($event) {
          return ctx.saveColumns($event);
        })("displayTypeChange", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_displayTypeChange_0_listener($event) {
          return ctx.displayTypeChange.emit($event);
        })("fetchData", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_fetchData_0_listener($event) {
          return ctx.load($event);
        })("sortChange", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_sortChange_0_listener($event) {
          return ctx.setSorting($event);
        })("clickItem", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_clickItem_0_listener($event) {
          return ctx.clickItem($event);
        })("dblClickItem", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_dblClickItem_0_listener($event) {
          return ctx.onOpenNode.emit($event.element);
        })("virtualNodesAdded", function WorkspaceExplorerComponent_Template_es_node_entries_wrapper_virtualNodesAdded_0_listener($event) {
          return ctx.syncTreeViewOnAdd($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, WorkspaceExplorerComponent_ng_template_1_Template, 2, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("grid", ctx.displayType !== ctx.NodeEntriesDisplayType.Table);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx.dataSource)("scope", ctx.SCOPES.WorkspaceList)("columns", ctx.columns)("configureColumns", true)("displayType", ctx.displayType)("elementInteractionType", ctx.InteractionType.Emitter)("sort", ctx.sort)("dragDrop", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](12, _c1, ctx.canDrop, ctx.drop))("primaryInstance", true)("singleClickHint", "static");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.NodeEntriesWrapperComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
    styles: ["\n\n.noElementsInfo[_ngcontent-%COMP%]    > div.clickable[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-transform: uppercase;\n  margin-top: 5px;\n}\n\n@media screen and (max-width: 900px) {\n  [_nghost-%COMP%]     .list > div {\n    margin-bottom: 62px;\n  }\n}\n\nes-node-entries-wrapper.grid[_ngcontent-%COMP%] {\n  display: block;\n  margin: 10px 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS9leHBsb3Jlci9leHBsb3Jlci5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGSTtFQUNJLHFCQ0pFO0VES0YseUJBQUE7RUFDQSxlQUFBO0FBRFI7O0FBS0k7RUFDSTtJQUVJLG1CRCtGUztFQ2xHbkI7QUFDRjs7QUFPQTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtBQUpKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5ub0VsZW1lbnRzSW5mbyB7XG4gICAgPiBkaXYuY2xpY2thYmxlIHtcbiAgICAgICAgY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgfVxufVxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlVGFiU3dpdGNoV2lkdGgpIHtcbiAgICAgICAgLmxpc3QgPiBkaXYge1xuICAgICAgICAgICAgLy8ga2VlcCBzcGFjZSBmb3Igc2Nyb2xsaW5nIHRvIHRoZSB2ZXJ5IGVuZFxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogJG1vYmlsZVRhYk5hdkhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXMtbm9kZS1lbnRyaWVzLXdyYXBwZXIuZ3JpZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luOiAxMHB4IDIwcHg7XG59XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 58164:
/*!*********************************************************!*\
  !*** ./src/app/pages/workspace-page/workspace-utils.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canDragDrop: () => (/* binding */ canDragDrop),
/* harmony export */   canDropOnNode: () => (/* binding */ canDropOnNode)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);

function canDropOnNode(dragData) {
  if (dragData.draggedNodes.includes(dragData.target)) {
    // When the target is the exact same object as one of the dragged nodes, the user is
    // hovering over a placeholder of a dragged node. They likely want to cancel the drag
    // operation, so we don't print an error message.
    return {
      accept: false,
      denyExplicit: false
    };
  } else if (!dragData.target.isDirectory) {
    return {
      accept: false,
      denyExplicit: false,
      denyReason: 'WORKSPACE.TARGET_NO_DIRECTORY'
    };
  } else if (dragData.draggedNodes.some(node => node.ref.id === dragData.target.ref.id)) {
    return {
      accept: false,
      denyExplicit: false,
      denyReason: 'WORKSPACE.SOURCE_TARGET_IDENTICAL'
    };
  } else if (dragData.draggedNodes.some(node => node.parent?.id === dragData.target.ref.id)) {
    return {
      accept: false,
      denyExplicit: false,
      denyReason: 'WORKSPACE.SOURCE_TARGET_IDENTICAL'
    };
  } else if (!dragData.target.access.includes(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE)) {
    return {
      accept: false,
      denyExplicit: true,
      denyReason: 'WORKSPACE.TARGET_NO_WRITE_PERMISSIONS'
    };
  } else {
    return canDragDrop(dragData);
  }
}
function canDragDrop(dragData) {
  if (dragData.action === 'move' && dragData.draggedNodes.some(node => !node.access.includes(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_WRITE))) {
    return {
      accept: false,
      denyExplicit: true,
      denyReason: 'WORKSPACE.SOURCE_NO_WRITE_PERMISSIONS'
    };
  } else if (dragData.action === 'link') {
    return {
      accept: false,
      denyExplicit: true,
      denyReason: 'WORKSPACE.FEATURE_NOT_IMPLEMENTED'
    };
  } else {
    return {
      accept: true
    };
  }
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_pages_workspace-page_explorer_explorer_component_ts.js.map