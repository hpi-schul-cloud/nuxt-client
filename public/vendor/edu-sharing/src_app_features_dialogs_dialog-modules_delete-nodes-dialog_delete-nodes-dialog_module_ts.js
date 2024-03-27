"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_delete-nodes-dialog_delete-nodes-dialog_module_ts"],{

/***/ 26555:
/*!******************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/delete-nodes-dialog/delete-nodes-dialog.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeleteNodesDialogComponent: () => (/* binding */ DeleteNodesDialogComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _util_rxjs_forkJoinWithErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../util/rxjs/forkJoinWithErrors */ 47562);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/node-helper.service */ 76754);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
















function DeleteNodesDialogComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 1)(1, "mat-checkbox", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function DeleteNodesDialogComponent_div_2_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.shouldBlockImport = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](3, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](6, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.shouldBlockImport);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 3, "WORKSPACE.DELETE_IMPORT_BLOCK"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](8, 5, "WORKSPACE.DELETE_IMPORT_BLOCK_INFO"), " ");
  }
}
class DeleteNodesDialogComponent {
  constructor(data, dialogRef, connector, localEvents, nodeHelper, nodeService, temporaryStorage, toast, usageService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.connector = connector;
    this.localEvents = localEvents;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.temporaryStorage = temporaryStorage;
    this.toast = toast;
    this.usageService = usageService;
    this.dialogRef.patchState({
      isLoading: true
    });
  }
  ngOnInit() {
    this.updateTitleAndMessage();
    this.canBlockImport = this.getCanBlockImports();
    this.shouldBlockImport = this.canBlockImport;
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => this.dialogRef.close()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('YES_DELETE', {
        color: 'danger'
      }, () => this.onConfirm())]
    });
  }
  /**
   * Updates the dialog title and sets `message` and `messageParams`.
   *
   * Sets the dialog's `isLoading` state to `false` when done.
   */
  updateTitleAndMessage() {
    let waitingForResponse = false;
    let title;
    title = 'WORKSPACE.DELETE_TITLE' + (this.data.nodes.length === 1 ? '_SINGLE' : '');
    this.message = 'WORKSPACE.DELETE_MESSAGE' + (this.data.nodes.length === 1 ? '_SINGLE' : '');
    if (this.data.nodes.length === 1) {
      const node = this.data.nodes[0];
      const name = _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestHelper.getName(node);
      this.messageParams = {
        name
      };
      if (node.collection) {
        title = 'WORKSPACE.DELETE_TITLE_COLLECTION';
        this.message = 'WORKSPACE.DELETE_MESSAGE_COLLECTION';
      } else if (this.nodeHelper.isNodePublishedCopy(node)) {
        title = 'WORKSPACE.DELETE_TITLE_PUBLISHED_COPY';
        this.message = 'WORKSPACE.DELETE_MESSAGE_PUBLISHED_COPY';
      } else if (node.mediatype === 'folder-link') {
        title = 'WORKSPACE.DELETE_TITLE_FOLDER_LINK';
        this.message = 'WORKSPACE.DELETE_MESSAGE_FOLDER_LINK';
      } else if (node.isDirectory) {
        // Check for usages and warn user
        waitingForResponse = true;
        this.usageService.getNodeUsages(node.ref.id, node.ref.repo).subscribe(({
          usages
        }) => {
          if (usages.length > 0) {
            this.message = 'WORKSPACE.DELETE_MESSAGE_SINGLE_USAGES';
            this.messageParams = {
              name,
              usages: usages.length.toString()
            };
          }
          this.dialogRef.patchState({
            isLoading: false
          });
        });
      }
    }
    this.dialogRef.patchConfig({
      title
    });
    if (!waitingForResponse) {
      setTimeout(() => {
        this.dialogRef.patchState({
          isLoading: false
        });
      });
    }
  }
  getCanBlockImports() {
    return this.connector.getCurrentLogin()?.isAdmin && this.data.nodes.every(n => n.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_REPLICATIONSOURCE] != null);
  }
  onConfirm() {
    this.dialogRef.patchState({
      isLoading: true
    });
    (0,_util_rxjs_forkJoinWithErrors__WEBPACK_IMPORTED_MODULE_1__.forkJoinWithErrors)(this.data.nodes.map(node => this.processNode(node))).subscribe(({
      successes: processedNodes,
      errors
    }) => {
      if (errors.length === 0) {
        this.toast.toast('WORKSPACE.TOAST.DELETE_FINISHED');
      }
      if (processedNodes.length > 0) {
        this.dialogRef.close({
          nodes: processedNodes,
          action: this.shouldBlockImport ? 'changed' : 'deleted'
        });
      } else {
        this.dialogRef.close(null);
      }
      // If subscribers to the emitted events cause routing actions, the dialog could
      // interfere if still open. So we emit the events after closing the dialog.
      if (this.shouldBlockImport) {
        this.localEvents.nodesChanged.emit(processedNodes);
      } else {
        this.localEvents.nodesDeleted.emit(processedNodes);
      }
    });
  }
  /**
   * Processes a single node that was confirmed for deletion.
   */
  processNode(node) {
    let action;
    if (this.shouldBlockImport) {
      action = this.blockImport(node);
    } else {
      action = this.deleteNode(node);
    }
    return action.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.tap)(() => this.removeNodeFromClipboard(node)));
  }
  deleteNode(node) {
    return this.nodeService.deleteNode(node.ref.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => node));
  }
  blockImport(node) {
    return this.nodeService.editNodeMetadata(node.ref.id, {
      [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_IMPORT_BLOCKED]: ['true']
    }, {
      versionComment: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.COMMENT_BLOCKED_IMPORT
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(node => {
      const permissions = {
        inherited: false,
        permissions: []
      };
      return this.nodeService.setPermissions(node.ref.id, permissions);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => node));
  }
  removeNodeFromClipboard(node) {
    let clip = this.temporaryStorage.get('workspace_clipboard');
    if (clip == null) {
      return;
    }
    for (const clipNode of clip.nodes) {
      if (clipNode.ref.id === node.ref.id) {
        clip.nodes.splice(clip.nodes.indexOf(clipNode), 1);
      }
      if (clip.nodes.length === 0) {
        this.temporaryStorage.remove('workspace_clipboard');
      }
    }
  }
  static #_ = this.ɵfac = function DeleteNodesDialogComponent_Factory(t) {
    return new (t || DeleteNodesDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_4__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_12__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestUsageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: DeleteNodesDialogComponent,
    selectors: [["es-delete-nodes-dialog"]],
    decls: 3,
    vars: 5,
    consts: [["class", "block-import-checkbox", 4, "ngIf"], [1, "block-import-checkbox"], [3, "ngModel", "ngModelChange"], ["slot", "label"], ["slot", "description"]],
    template: function DeleteNodesDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](1, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, DeleteNodesDialogComponent_div_2_Template, 9, 7, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](1, 2, ctx.message, ctx.messageParams), "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.canBlockImport);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__.MatCheckbox, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_6__.MultiLineLabelComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
    styles: [".block-import-checkbox[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy9kZWxldGUtbm9kZXMtZGlhbG9nL2RlbGV0ZS1ub2Rlcy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmJsb2NrLWltcG9ydC1jaGVja2JveCB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 38548:
/*!***************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/delete-nodes-dialog/delete-nodes-dialog.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeleteNodesDialogComponent: () => (/* reexport safe */ _delete_nodes_dialog_component__WEBPACK_IMPORTED_MODULE_1__.DeleteNodesDialogComponent),
/* harmony export */   DeleteNodesDialogModule: () => (/* binding */ DeleteNodesDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _delete_nodes_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delete-nodes-dialog.component */ 26555);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class DeleteNodesDialogModule {
  static #_ = this.ɵfac = function DeleteNodesDialogModule_Factory(t) {
    return new (t || DeleteNodesDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: DeleteNodesDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DeleteNodesDialogModule, {
    declarations: [_delete_nodes_dialog_component__WEBPACK_IMPORTED_MODULE_1__.DeleteNodesDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_delete-nodes-dialog_delete-nodes-dialog_module_ts.js.map