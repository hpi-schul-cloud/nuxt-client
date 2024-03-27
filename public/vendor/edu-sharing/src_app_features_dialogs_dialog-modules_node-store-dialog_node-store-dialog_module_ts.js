"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_node-store-dialog_node-store-dialog_module_ts"],{

/***/ 62955:
/*!**************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-store-dialog/node-store-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchNodeStoreDialogComponent: () => (/* binding */ SearchNodeStoreDialogComponent)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_utils_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-utils.service */ 1846);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 21916);













function SearchNodeStoreDialogComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "SEARCH.NODE_STORE.LIST_EMPTY"), "\n");
  }
}
class SearchNodeStoreDialogComponent {
  constructor(cardDialogUtils, dialogRef, nodeList, router, toast, ui) {
    this.cardDialogUtils = cardDialogUtils;
    this.dialogRef = dialogRef;
    this.nodeList = nodeList;
    this.router = router;
    this.toast = toast;
    this.ui = ui;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.InteractionType;
    this.columns = [];
    // buttons = DialogButton.getSingleButton('CLOSE', () => this.cancel(), 'standard');
    this.list = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeDataSource();
    this.sortPolicySubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject({
      allowed: true,
      active: _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.LOM_PROP_TITLE,
      direction: 'asc',
      columns: [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItemSort('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.LOM_PROP_TITLE)]
    });
    this.options = {
      useDefaultOptions: true,
      supportedOptions: ['OPTIONS.DOWNLOAD'],
      addOptions: this.getAdditionalOptions()
    };
    this.selected = [];
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItem('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.LOM_PROP_TITLE));
  }
  ngOnInit() {
    this.dialogRef.patchState({
      isLoading: true
    });
    this.registerNodeList();
  }
  ngAfterViewInit() {
    this.nodeEntries.initOptionsGenerator({
      actionbar: this.actionBar,
      customOptions: this.options
    });
    this.nodeEntries.getSelection().changed.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.destroyed)).subscribe(selectionChange => this.onSelection(selectionChange.source.selected));
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  setSelection(node) {
    const selection = this.nodeEntries.getSelection();
    selection.clear();
    selection.select(node);
  }
  onClick(node) {
    if (this.ui.isMobile()) {
      this.openNode(node);
    } else {
      this.setSelection(node);
    }
  }
  openNode(node) {
    this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.UIConstants.ROUTER_PREFIX + 'render', node.ref.id], {
      state: {
        nodes: this.list.getData(),
        scope: 'node-store'
      }
    });
  }
  onSelection(data) {
    this.selected = data;
  }
  changeSort(config) {
    this.sortPolicySubject.next({
      ...config,
      direction: config.direction || 'asc'
    });
  }
  getAdditionalOptions() {
    const remove = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.OptionItem('SEARCH.NODE_STORE.REMOVE_ITEM', 'delete', () => {
      this.deleteSelection();
    });
    remove.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.DefaultGroups.FileOperations;
    return [remove];
  }
  deleteSelection() {
    this.dialogRef.patchState({
      isLoading: true
    });
    this.nodeList.removeFromNodeList(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.NODE_STORE_LIST, this.selected.map(node => node.ref.id)).subscribe(() => {
      this.toast.toast('SEARCH.NODE_STORE.REMOVED_ITEMS', {
        count: this.selected.length
      });
      this.nodeEntries.getSelection().clear();
    });
  }
  registerNodeList() {
    this.sortPolicySubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(sortPolicy => this.nodeList.observeNodeList(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.NODE_STORE_LIST, {
      propertyFilter: [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL],
      sortPolicies: [sortPolicy]
    }))).subscribe({
      next: nodes => {
        this.list.setData(nodes.nodes);
        void this.cardDialogUtils.configForNodes(nodes.nodes).then(config => this.dialogRef.patchConfig(config));
        this.dialogRef.patchState({
          isLoading: false
        });
      },
      error: () => {
        this.dialogRef.patchState({
          isLoading: false
        });
      }
    });
  }
  static #_ = this.ɵfac = function SearchNodeStoreDialogComponent_Factory(t) {
    return new (t || SearchNodeStoreDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_utils_service__WEBPACK_IMPORTED_MODULE_1__.CardDialogUtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_10__.NodeListService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.UIService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: SearchNodeStoreDialogComponent,
    selectors: [["es-search-node-store-dialog"]],
    viewQuery: function SearchNodeStoreDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesWrapperComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.nodeEntries = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.actionBar = _t.first);
      }
    },
    decls: 5,
    vars: 10,
    consts: [[1, "actions"], ["class", "noElementsInfo noElements", 4, "ngIf"], [3, "dataSource", "columns", "displayType", "elementInteractionType", "sort", "clickItem", "dblClickItem", "sortChange"], [1, "noElementsInfo", "noElements"]],
    template: function SearchNodeStoreDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "es-actionbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SearchNodeStoreDialogComponent_div_2_Template, 3, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "es-node-entries-wrapper", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("clickItem", function SearchNodeStoreDialogComponent_Template_es_node_entries_wrapper_clickItem_3_listener($event) {
          return ctx.onClick($event.element);
        })("dblClickItem", function SearchNodeStoreDialogComponent_Template_es_node_entries_wrapper_dblClickItem_3_listener($event) {
          return ctx.openNode($event.element);
        })("sortChange", function SearchNodeStoreDialogComponent_Template_es_node_entries_wrapper_sortChange_3_listener($event) {
          return ctx.changeSort($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.list.isEmpty());
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("display-none", ctx.list.isEmpty());
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.list)("columns", ctx.columns)("displayType", ctx.NodeEntriesDisplayType.Table)("elementInteractionType", ctx.InteractionType.Emitter)("sort", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 8, ctx.sortPolicySubject));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeEntriesWrapperComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe],
    styles: [".actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n  height: 50px;\n  margin-top: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9ub2RlLXN0b3JlLWRpYWxvZy9ub2RlLXN0b3JlLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi5hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 46741:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-store-dialog/node-store-dialog.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeStoreDialogModule: () => (/* binding */ NodeStoreDialogModule),
/* harmony export */   SearchNodeStoreComponent: () => (/* reexport safe */ _node_store_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SearchNodeStoreDialogComponent)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _node_store_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node-store-dialog.component */ 62955);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);





class NodeStoreDialogModule {
  static #_ = this.ɵfac = function NodeStoreDialogModule_Factory(t) {
    return new (t || NodeStoreDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: NodeStoreDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.EduSharingUiModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NodeStoreDialogModule, {
    declarations: [_node_store_dialog_component__WEBPACK_IMPORTED_MODULE_1__.SearchNodeStoreDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.EduSharingUiModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_node-store-dialog_node-store-dialog_module_ts.js.map