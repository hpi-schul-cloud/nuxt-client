"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["default-src_app_pages_search-page_node-data-source-remote_ts"],{

/***/ 58723:
/*!***********************************************************!*\
  !*** ./src/app/pages/search-page/navigation-scheduler.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationScheduler: () => (/* binding */ NavigationScheduler)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_scroll_position_restoration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/scroll-position-restoration.service */ 34068);



class NavigationScheduler {
  constructor(ngZone, router, scrollPositionRestoration) {
    this.ngZone = ngZone;
    this.router = router;
    this.scrollPositionRestoration = scrollPositionRestoration;
    this.appendTimeout = 500;
    this.timeout = null;
    /** Route for next navigation execution. */
    this.route = [];
    /** Query params for next navigation execution. */
    this.params = null;
    /** `replaceUrl` value for next navigation execution. */
    this.replaceUrl = true;
    /** Skip scrolling to the top of the page for the next navigation execution. */
    this.skipScrollToTop = true;
    /** While true, navigation actions will be appended to the previous navigation in history. */
    this.shouldAppend = false;
  }
  /**
   * Schedules the given parameters for navigation.
   *
   * Subsequently scheduled navigation actions will combined into a single call to
   * `router.navigate`. After the execution of a navigation, there is a timeout (`appendTimeout`),
   * during which newly scheduled navigation actions will be appended to history using
   * `replaceUrl: true`.
   *
   * @param route will become the route to navigate to, replacing any route given in a previously
   * scheduled navigation
   * @param queryParams will be merged with other query params scheduled for navigation
   * @param replaceUrl will navigate with `replaceUrl: true` if all of the executed navigation
   * actions were scheduled with `replaceUrl: true` (default: `false`)
   * @param skipScrollToTop will skip scrolling to the top of the page if all of the executed
   * navigation actions were scheduled with `skipScrollToTop: true` (default `false`)
   */
  scheduleNavigation({
    route,
    queryParams,
    replaceUrl = false,
    skipScrollToTop = false
  }) {
    if (route) {
      this.route = route;
    }
    this.params = {
      ...(this.params ?? {}),
      ...(queryParams ?? {})
    };
    if (!replaceUrl) {
      this.replaceUrl = false;
    }
    if (!skipScrollToTop) {
      this.skipScrollToTop = false;
    }
    // Schedule next navigation execution (if not already scheduled).
    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        // Execute navigation.
        if (this.skipScrollToTop) {
          this.scrollPositionRestoration.skipNextScrollEvent();
        }
        void this.router.navigate(this.route, {
          queryParams: this.params,
          queryParamsHandling: 'merge',
          replaceUrl: this.shouldAppend || this.replaceUrl
        });
        // Reset navigation parameters.
        this.timeout = null;
        this.route = [];
        this.params = null;
        this.replaceUrl = true;
        this.skipScrollToTop = true;
        // Setup append phase (if not already appending).
        if (!this.shouldAppend) {
          this.shouldAppend = true;
          this.ngZone.runOutsideAngular(() => setTimeout(() => this.shouldAppend = false, this.appendTimeout));
        }
      });
    }
  }
  static #_ = this.ɵfac = function NavigationScheduler_Factory(t) {
    return new (t || NavigationScheduler)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_scroll_position_restoration_service__WEBPACK_IMPORTED_MODULE_0__.ScrollPositionRestorationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: NavigationScheduler,
    factory: NavigationScheduler.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 26523:
/*!**************************************************************!*\
  !*** ./src/app/pages/search-page/node-data-source-remote.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeDataSourceRemote: () => (/* binding */ NodeDataSourceRemote),
/* harmony export */   NodeDataSourceRemoteState: () => (/* binding */ NodeDataSourceRemoteState),
/* harmony export */   fromSearchResults: () => (/* binding */ fromSearchResults)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 89718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 76309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 95933);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _user_modifiable_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-modifiable-values */ 16640);
/**
 * Some code from https://github.com/angular/components/blob/15.0.x/src/material/table/table-data-source.ts
 */





class NodeDataSourceRemoteState {}
let nextId = 0;
class NodeDataSourceRemote extends ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__.NodeDataSourceRemote {
  get paginator() {
    return this._paginationHandler.paginator;
  }
  set paginator(value) {
    this._paginationHandler.paginator = value;
  }
  get sortPanel() {
    return this._sortHandler.sortPanel;
  }
  set sortPanel(value) {
    this._sortHandler.sortPanel = value;
  }
  set itemsCap(value) {
    this._itemsCap = value;
    // Only reconnect if already connected.
    if (this.renderDataSubscription) {
      this._connectRenderData();
    }
  }
  constructor(_injector) {
    super();
    this._injector = _injector;
    this._paginationHandler = new PaginationHandler(this._injector);
    this._sortHandler = new SortHandler(this._injector);
    this._renderChangesSubscription = null;
    this._cache = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__.NodeCache();
    // Even if the data source is not in a loading state until initialized, we expect that the
    // required data is prepared elsewhere and we already show the loading spinner.
    this._isLoading = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this._initDone = false;
    this._resetDone = false;
    this.id = nextId++;
    this._registerLoadingState();
  }
  connect() {
    if (!this.renderDataSubscription) {
      this._connectRenderData();
    }
    return this.renderData;
  }
  disconnect() {}
  init({
    paginationConfig,
    defaultSort
  }) {
    this._paginationHandler.init(paginationConfig);
    this._sortHandler.init(defaultSort);
  }
  setRemote(remote) {
    this._remote = remote;
    this._updateRemoteSubscription();
  }
  getData() {
    return this.renderData.value;
  }
  isEmpty() {
    return this.dataStream.value?.length === 0;
  }
  hasMore() {
    return this._paginationHandler.hasMore();
  }
  loadMore() {
    return this._paginationHandler.loadMore();
  }
  getTotal() {
    return this._paginationHandler.length;
  }
  observeTotal() {
    return this.dataStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => this._paginationHandler.length));
  }
  appendData(appendData, location = 'after') {
    let data = this.dataStream.value;
    if (location === 'after') {
      data = data.concat(appendData);
    } else {
      data = appendData.concat(data);
    }
    this.dataStream.next(data);
    this._paginationHandler.length += appendData.length;
    this._cache.clear();
  }
  removeData(data) {
    const currentData = this.dataStream.value;
    const deleteCount = currentData.filter(entry => data.includes(entry)).length;
    const updatedData = currentData.filter(entry => !data.includes(entry));
    this.dataStream.next(updatedData);
    this._paginationHandler.length -= deleteCount;
    this._cache.clear();
  }
  registerQueryParameters(route) {
    this._paginationHandler.registerQueryParameters(route);
    this._sortHandler.registerQueryParameters(route);
  }
  dumpState() {
    // With this, we implicitly test for `_initDone` and `_resetDone`.
    console.assert(this.isLoading === false, 'dumping state not supported while loading');
    return {
      _cache: {
        ...this._cache
      },
      _pageIndex: this._paginationHandler.pageIndex,
      _pageSize: this._paginationHandler.pageSize,
      _length: this._paginationHandler.length
    };
  }
  registerRestoreFunction(restoreFunction) {
    this._restoreFunction = restoreFunction;
  }
  _restoreState(state) {
    Object.assign(this._cache, state._cache);
    this._paginationHandler.pageIndex = state._pageIndex;
    this._paginationHandler.pageSize = state._pageSize;
    this._paginationHandler.length = state._length;
  }
  _resetState() {
    const restoreState = this._restoreFunction?.();
    if (restoreState) {
      this._restoreState(restoreState);
    } else {
      this._paginationHandler.length = null;
      if (this._initDone) {
        this._paginationHandler.firstPage();
      }
      this._cache.clear();
    }
  }
  _registerLoadingState() {
    this._isLoading.subscribe(isLoading => {
      if (!isLoading) {
        this.isLoading = false;
      } else if (!this._initDone) {
        this.isLoading = 'initial';
      } else if (!this._resetDone) {
        this.isLoading = 'reset';
      } else {
        this.isLoading = 'page';
      }
    });
  }
  _connectRenderData() {
    this.renderDataSubscription?.unsubscribe();
    if (this.itemsCap) {
      this.renderDataSubscription = this.itemsCap.connect(this.dataStream).subscribe(data => this.renderData.next(data));
    } else {
      this.renderDataSubscription = this.dataStream.subscribe(data => this.renderData.next(data));
    }
  }
  _updateRemoteSubscription() {
    this._resetDone = false;
    this._resetState();
    const sortChange = rxjs__WEBPACK_IMPORTED_MODULE_4__.merge(this._sortHandler.sortChange.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(({
      source
    }) => {
      this._resetDone = false;
      this._cache.clear();
      if (source === 'user') {
        this._paginationHandler.firstPage();
      }
    })), this._sortHandler.initialized);
    const pageChange = rxjs__WEBPACK_IMPORTED_MODULE_4__.merge(this._paginationHandler.pageChange,
    //   this._internalPageChanges,
    this._paginationHandler.initialized);
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest([sortChange, pageChange]).pipe(
    // Don't send multiple requests in case a sort change triggers a page change.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => this._cache.getMissingRange(this._getRequestRange())), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(missingRange => missingRange && this._isLoading.next(true)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(missingRange => this._downloadAndCache(missingRange)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => this._cache.get(this._getDisplayRange())), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(() => {
      this._initDone = true;
      this._resetDone = true;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)({
      next: () => this._isLoading.next(false),
      error: () => this._isLoading.next(false)
    })).subscribe(data => this.dataStream.next(data));
  }
  _getRequestRange() {
    const startIndex = this._paginationHandler.pageIndex * this._paginationHandler.pageSize;
    let endIndex = (this._paginationHandler.pageIndex + 1) * this._paginationHandler.pageSize;
    if (this._paginationHandler.length !== null) {
      endIndex = Math.min(endIndex, this._paginationHandler.length);
    }
    return {
      startIndex,
      endIndex
    };
  }
  _getDisplayRange() {
    const requestRange = this._getRequestRange();
    return {
      startIndex: requestRange.startIndex,
      endIndex: Math.min(requestRange.endIndex, this._paginationHandler.length)
    };
  }
  _downloadAndCache(missingRange) {
    if (missingRange) {
      return this._remote({
        range: missingRange,
        sort: this._sortHandler.currentSort
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(response => this._paginationHandler.length = response.total), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(response => this._cache.add(this._getCacheSlice(missingRange, response.data))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => void 0));
    } else {
      return rxjs__WEBPACK_IMPORTED_MODULE_9__.of(null);
    }
  }
  _getCacheSlice(range, data) {
    return {
      startIndex: range.startIndex,
      endIndex: Math.min(range.endIndex, range.startIndex + data.length),
      data
    };
  }
}
function fromSearchResults(searchResults) {
  return {
    data: searchResults.nodes,
    total: searchResults.pagination.total
  };
}
/**
 * A layer between the data source and a paginator component or an infinite-scroll paginator.
 *
 * Without this, the data source would need to wait for a paginator component to be added to the DOM
 * to send its first request. Also, the data source would not be able to function without the
 * paginator component or directive constantly available in the DOM.
 */
class PaginationHandler {
  get paginator() {
    return this._paginator;
  }
  set paginator(value) {
    this._paginator = value;
    this._initPaginator(value);
  }
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = value;
    if (this.paginator) {
      this.paginator.pageIndex = value;
    }
  }
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = value;
    if (this.paginator) {
      this.paginator.pageSize = value;
    }
  }
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
    if (this.paginator) {
      this.paginator.length = value;
    }
  }
  constructor(_injector) {
    this._injector = _injector;
    this._pageIndex = 0;
    this._length = null;
    this._initialized = new rxjs__WEBPACK_IMPORTED_MODULE_10__.ReplaySubject();
    this.initialized = this._initialized.asObservable();
    this._isInitialized = false;
    this._pageChange = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.pageChange = this._pageChange.asObservable();
    this._paginatorReset = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
  }
  init(config) {
    this._config = config;
    this.pageSize = config.defaultPageSize;
    this._isInitialized = true;
    this._initialized.next();
    this._initialized.complete();
  }
  firstPage() {
    const previousPageIndex = this.pageIndex;
    const previousPageSize = this.pageSize;
    this.pageIndex = 0;
    if (this._config.strategy === 'infinite-scroll') {
      this.pageSize = this._config.defaultPageSize;
    }
    if (previousPageIndex !== this.pageIndex || previousPageSize !== this.pageSize) {
      this._emitPageEvent();
    }
  }
  hasMore() {
    if (!this._isInitialized) {
      return undefined;
    }
    return this.length > (this.pageIndex + 1) * this.pageSize;
  }
  /**
   * @returns Whether there is more data to load
   */
  loadMore() {
    if (this._config.strategy !== 'infinite-scroll') {
      console.warn(`Called loadMore with pagination strategy ${this._config.strategy}.`, `The only supported strategy for loadMore is 'infinite-scroll'.`);
      return false;
    }
    if (this.hasMore()) {
      this.pageSize = Math.min(this.pageSize + this._config.defaultPageSize, this.length);
      this._emitPageEvent();
      return true;
    } else {
      return false;
    }
  }
  registerQueryParameters(route) {
    if (!this._isInitialized) {
      throw new Error('Tried to register query params before initializing');
    } else if (this._config.strategy === 'infinite-scroll') {
      // Nothing to store in query params when using infinite scrolling.
      return;
    }
    const userModifiableValue = this._injector.get(_user_modifiable_values__WEBPACK_IMPORTED_MODULE_0__.UserModifiableValuesService);
    const pageIndex = userModifiableValue.createMapped({
      toString: value => (value + 1).toString(),
      fromString: value => parseInt(value) - 1
    }, 0);
    const pageSize = userModifiableValue.createMapped({
      toString: value => value.toString(),
      fromString: value => parseInt(value)
    }, this._config.defaultPageSize);
    pageIndex.registerQueryParameter('page', route);
    pageSize.registerQueryParameter('pageSize', route);
    rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest([pageIndex.observeValue(), pageSize.observeValue()]).subscribe(([pageIndex, pageSize]) => {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this._emitPageEvent();
    });
    this.pageChange.subscribe(event => {
      pageIndex.setUserValue(event.pageIndex);
      pageSize.setUserValue(event.pageSize);
    });
  }
  _initPaginator(paginator) {
    this._paginatorReset.next();
    if (paginator) {
      paginator.pageIndex = this.pageIndex;
      paginator.pageSize = this.pageSize;
      paginator.length = this.length;
      paginator.page.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this._paginatorReset)).subscribe(pageEvent => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.length = pageEvent.length;
        this._emitPageEvent();
      });
    }
  }
  _emitPageEvent() {
    this._pageChange.next({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
}
class SortHandler {
  get sortPanel() {
    return this._sortPanel;
  }
  set sortPanel(value) {
    this._sortPanel = value;
    this._initSortPanel(value);
  }
  get currentSort() {
    return this._currentSort;
  }
  set currentSort(value) {
    this._currentSort = value;
    if (this.sortPanel) {
      this.sortPanel.active = value.active;
      this.sortPanel.direction = value.direction;
    }
  }
  constructor(_injector) {
    this._injector = _injector;
    this._sortChange = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.sortChange = this._sortChange.asObservable();
    this._initialized = new rxjs__WEBPACK_IMPORTED_MODULE_10__.ReplaySubject();
    this.initialized = this._initialized.asObservable();
    this._isInitialized = false;
    this._sortPanelReset = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
  }
  init(defaultSort) {
    defaultSort = {
      active: defaultSort?.active,
      direction: defaultSort?.direction
    };
    this._defaultSort = defaultSort;
    this.currentSort = defaultSort;
    this._isInitialized = true;
    this._initialized.next();
    this._initialized.complete();
  }
  _changeSort(sort, source) {
    if (!sort.direction) {
      sort = this._defaultSort;
    }
    if (this.currentSort.active !== sort.active || this.currentSort.direction !== sort.direction) {
      this.currentSort = {
        ...sort
      };
      this._sortChange.next({
        ...sort,
        source
      });
    }
  }
  registerQueryParameters(route) {
    if (!this._isInitialized) {
      throw new Error('Tried to register query params before initializing');
    }
    // @TODO
    /*
    const userModifiableValue = this._injector.get(UserModifiableValuesService);
    const sortActive = userModifiableValue.createString(this._defaultSort?.active);
    const sortDirection = userModifiableValue.createString<SortDirection>(
        this._defaultSort?.direction,
    );
    sortActive.registerQueryParameter('sortBy', route, { skipScrollToTop: true });
    sortDirection.registerQueryParameter('sortDirection', route, { skipScrollToTop: true });
    rxjs.combineLatest([sortActive.observeValue(), sortDirection.observeValue()]).subscribe(
        ([active, direction]) => this._changeSort({ active, direction }, 'query-params'),
    );
    this.sortChange.subscribe((event) => {
        sortActive.setUserValue(event.active);
        sortDirection.setUserValue(event.direction);
    });
     */
  }

  _initSortPanel(sortPanel) {
    this._sortPanelReset.next();
    if (sortPanel) {
      sortPanel.active = this.currentSort?.active;
      sortPanel.direction = this.currentSort?.direction;
      sortPanel.sortChange.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this._sortPanelReset)).subscribe(sortEvent => {
        this._changeSort(sortEvent, 'user');
      });
    }
  }
}

/***/ }),

/***/ 16640:
/*!*************************************************************!*\
  !*** ./src/app/pages/search-page/user-modifiable-values.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserModifiableValue: () => (/* binding */ UserModifiableValue),
/* harmony export */   UserModifiableValuesService: () => (/* binding */ UserModifiableValuesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _navigation_scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation-scheduler */ 58723);






/**
 * Provides a factory for user-modifiable values.
 *
 * The concept is to provide a value that has a system default, can be changed by the user, or be
 * overridden by the system, while keeping track of each value explicitly.
 *
 * We provide methods for controlling the user value with (reactive) forms and for tracking the
 * user value as query parameter.
 */
class UserModifiableValuesService {
  constructor(navigationScheduler) {
    UserModifiableValue.navigationScheduler = navigationScheduler;
    // UserModifiableValue.preferences = preferences;
  }

  createDict(systemValue) {
    return new UserModifiableValue(userModifiableDictType, systemValue);
  }
  createString(systemValue) {
    return new UserModifiableValue(new UserModifiableStringType(), systemValue);
  }
  createMapped(mapping, systemValue) {
    return new UserModifiableValue(new UserModifiableMappedType(mapping), systemValue);
  }
  createBoolean(systemValue) {
    return new UserModifiableValue(userModifiableBooleanType, systemValue);
  }
  static #_ = this.ɵfac = function UserModifiableValuesService_Factory(t) {
    return new (t || UserModifiableValuesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_navigation_scheduler__WEBPACK_IMPORTED_MODULE_0__.NavigationScheduler));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: UserModifiableValuesService,
    factory: UserModifiableValuesService.ɵfac,
    providedIn: 'root'
  });
}
/**
 * Represents a value that has a system default and can be modified by the user.
 *
 * Allows to sync the value with a query parameter such that only values changed by the user will be
 * reflected in the query parameters.
 */
class UserModifiableValue {
  // static preferences: SessionStorageService;
  /**
   * Shorthand for registration with two-way bindings, e.g.,
   *
   *      [(someVariable)]="someUserModifiableValue.value"
   */
  get value() {
    return this.getValue();
  }
  set value(value) {
    this.setUserValue(value);
  }
  constructor(_type, initialSystemValue) {
    this._type = _type;
    this._systemValue = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this._type.null);
    this._userValue = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
    this._overrideValue = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({
      useOverride: false
    });
    this._mergedValue = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
    if (initialSystemValue !== undefined) {
      this.setSystemValue(initialSystemValue);
    }
    this._getMergedValue().subscribe(this._mergedValue);
  }
  /**
   * Sets the default system value, that will be used when no user value is set.
   */
  setSystemValue(value) {
    if (this._serialize(value) !== this._serialize(this._systemValue.value)) {
      this._systemValue.next(value);
    }
  }
  /**
   * Sets the user value, that will replace or be merged with the system value.
   */
  setUserValue(value) {
    if (this._serialize(value) !== this._serialize(this._userValue.value)) {
      // console.log('setUserValue', { value, systemValue: this._systemValue.value });
      if (this._serialize(value) === this._serialize(this._systemValue.value)) {
        this.resetUserValue();
      } else {
        this._userValue.next(value);
      }
    }
  }
  resetUserValue() {
    if (this._userValue.value !== null) {
      // console.log('resetUserValue');
      this._userValue.next(null);
    }
  }
  getUserValue() {
    return this._userValue.value;
  }
  observeUserValue() {
    return this._userValue.asObservable();
  }
  /**
   * Sets an override value that will supersede any user and system values.
   */
  setOverrideValue(value) {
    if (!this._overrideValue.value.useOverride || this._serialize(this._overrideValue.value.value) !== this._serialize(value)) {
      this._overrideValue.next({
        useOverride: true,
        value
      });
    }
  }
  unsetOverrideValue() {
    if (this._overrideValue.value.useOverride) {
      this._overrideValue.next({
        useOverride: false
      });
    }
  }
  getValue() {
    return this._mergedValue.value;
  }
  observeValue() {
    return this._mergedValue.asObservable();
  }
  getQueryParamEntry(value = this.getValue()) {
    const serializedValue = this._serialize(value);
    if (serializedValue === this._serialize(this._systemValue.value)) {
      return {};
    } else {
      return {
        [this._queryParam]: serializedValue
      };
    }
  }
  observeQueryParamEntry() {
    return this.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(value => this.getQueryParamEntry(value)));
  }
  registerQueryParameter(key, activatedRoute, {
    replaceUrl = false,
    skipScrollToTop = false
  } = {}) {
    if (this._queryParam) {
      console.warn(`Registered user value for query parameter ${key} ` + `which is already registered for query parameter ${this._queryParam}`);
    }
    this._queryParam = key;
    let currentParam;
    activatedRoute.queryParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(params => params[key]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(param => param !== currentParam), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(param => currentParam = param), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(param => this._deserialize(param))).subscribe(value => this.setUserValue(value));
    this._userValue.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(value => this._serialize(value)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(param => param !== currentParam), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(param => currentParam = param)).subscribe(param => {
      UserModifiableValue.navigationScheduler.scheduleNavigation({
        queryParams: {
          [key]: param
        },
        replaceUrl,
        skipScrollToTop
      });
    });
  }
  registerSessionStorage(key) {
    // Query the storage value only once on registration. We expect to be the only one accessing
    // this value.
    let storageValue = sessionStorage.getItem(key);
    if ((0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.notNull)(storageValue)) {
      this.setUserValue(this._deserialize(storageValue));
    }
    this._userValue.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(value => this._serialize(value))).subscribe(value => {
      if (storageValue !== value) {
        storageValue = value;
        if ((0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.notNull)(value)) {
          sessionStorage.setItem(key, value);
        } else {
          sessionStorage.removeItem(key);
        }
      }
    });
  }
  // registerProfilePreference(key: string, until: Observable<void>): void {
  //     let currentStorageValue: string;
  //     UserModifiableValue.preferences
  //         .observe(key)
  //         .pipe(
  //             filter((value: T) => this._serialize(value) !== currentStorageValue),
  //             tap((value: T) => (currentStorageValue = this._serialize(value))),
  //             takeUntil(until),
  //         )
  //         .subscribe((value: T) => this.setUserValue(value));
  //     this._userValue
  //         .pipe(filter((value: T) => this._serialize(value) !== currentStorageValue))
  //         .subscribe((userValue) => UserModifiableValue.preferences.set(key, userValue));
  // }
  registerFormControl(formControl) {
    this.observeValue().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(value => this._serialize(value)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(value => value !== formControl.value)).subscribe(value => formControl.setValue(value));
    formControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(value => this._deserialize(value))).subscribe(value => this.setUserValue(value));
  }
  _serialize(value) {
    if ((0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.notNull)(value)) {
      return this._type.serialize(value);
    } else {
      return null;
    }
  }
  _deserialize(value) {
    if ((0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.notNull)(value)) {
      return this._type.deserialize(value);
    } else {
      return null;
    }
  }
  _getMergedValue() {
    return rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest([this._systemValue, this._userValue, this._overrideValue]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(([systemValue, userValue, overrideValue]) => overrideValue.useOverride ? overrideValue.value : this._type.merge(systemValue, userValue)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
  }
}
const userModifiableDictType = {
  null: {},
  merge: (defaultValue, userValue) => ({
    ...defaultValue,
    ...userValue
  }),
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
class UserModifiableStringType {
  constructor() {
    this.null = null;
    this.merge = (defaultValue, userValue) => userValue ?? defaultValue;
    this.serialize = value => value;
    this.deserialize = value => value;
  }
}
class UserModifiableMappedType {
  constructor(mapping) {
    this.mapping = mapping;
    this.null = null;
    this.merge = (defaultValue, userValue) => userValue ?? defaultValue;
    this.serialize = this.mapping.toString;
    this.deserialize = this.mapping.fromString;
  }
}
const userModifiableBooleanType = {
  null: false,
  merge: (defaultValue, userValue) => userValue ?? defaultValue,
  serialize: value => value ? 'true' : 'false',
  deserialize: value => value === 'true'
};

/***/ })

}]);
//# sourceMappingURL=default-src_app_pages_search-page_node-data-source-remote_ts.js.map