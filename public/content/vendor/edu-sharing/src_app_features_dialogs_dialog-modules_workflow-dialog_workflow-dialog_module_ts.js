"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_workflow-dialog_workflow-dialog_module_ts"],{

/***/ 94315:
/*!*****************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/workflow-dialog/workflow-dialog-data.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkflowDialogData: () => (/* binding */ WorkflowDialogData)
/* harmony export */ });
class WorkflowDialogData {}

/***/ }),

/***/ 16560:
/*!**********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/workflow-dialog/workflow-dialog.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkflowDialogComponent: () => (/* binding */ WorkflowDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/node-helper.service */ 76754);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/components/authority-search-input/authority-search-input.component */ 68504);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _workflow_history_workflow_history_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./workflow-history/workflow-history.component */ 78214);
/* harmony import */ var _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/pipes/permission-name.pipe */ 44431);
/* harmony import */ var _workflow_dialog_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./workflow-dialog-data */ 94315);



























function WorkflowDialogComponent_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-option", 13)(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", option_r3)("disabled", !ctx_r0.isAllowedAsNext(option_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("--status-color", option_r3.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 5, "WORKFLOW." + option_r3.id), " ");
  }
}
const _c0 = function () {
  return {
    field: "secondary"
  };
};
function WorkflowDialogComponent_mat_chip_listbox_9_mat_chip_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-chip-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("removed", function WorkflowDialogComponent_mat_chip_listbox_9_mat_chip_option_1_Template_mat_chip_option_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);
      const receiver_r5 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r6.removeReceiver(receiver_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 17)(2, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](8, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const receiver_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("selectable", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 3, receiver_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](7, 5, receiver_r5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction0"](8, _c0)));
  }
}
function WorkflowDialogComponent_mat_chip_listbox_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-chip-listbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, WorkflowDialogComponent_mat_chip_listbox_9_mat_chip_option_1_Template, 9, 9, "mat-chip-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r1.receivers);
  }
}
function WorkflowDialogComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "WORKSPACE.WORKFLOW.HISTORY"), " ");
  }
}
class WorkflowDialogComponent {
  constructor(data, dialogRef, config, connector, dialogs, iam, localEvents, nodeHelper, nodeService, toast, translate) {
    var _this = this;
    this.data = data;
    this.dialogRef = dialogRef;
    this.config = config;
    this.connector = connector;
    this.dialogs = dialogs;
    this.iam = iam;
    this.localEvents = localEvents;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.toast = toast;
    this.translate = translate;
    this.TYPE_EDITORIAL = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_TYPE_EDITORIAL;
    this.receivers = [];
    this.status = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.WORKFLOW_STATUS_UNCHECKED;
    this.initialStatus = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.WORKFLOW_STATUS_UNCHECKED;
    this.nodes = this.data.nodes;
    this.updateButtons();
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH).subscribe(has => this.globalAllowed = has);
    this.config.getAll().subscribe( /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.validStatus = _this.nodeHelper.getWorkflows();
      const receiver = _this.config.instant('workflow.defaultReceiver');
      if (receiver) {
        try {
          _this.receivers = [(yield _this.iam.getGroup(receiver).toPromise()).group];
        } catch (e) {
          toast.clientConfigError('workflow.defaultReceiver', 'group not found');
        }
      }
    }));
    void this.initNodes(this.data.nodes);
  }
  isAllowedAsNext(status) {
    if (!this.initialStatus.next) {
      return true;
    }
    if (this.initialStatus.id === status.id) {
      return true;
    }
    return this.initialStatus.next.indexOf(status.id) !== -1;
  }
  setStatus(status) {
    if (!this.isAllowedAsNext(status)) {
      return;
    }
    this.status = status;
    this.updateButtons();
  }
  addSuggestion(data) {
    this.receivers = [data];
    this.updateButtons();
  }
  removeReceiver(data) {
    const pos = this.receivers.indexOf(data);
    if (pos !== -1) {
      this.receivers.splice(pos, 1);
    }
    this.updateButtons();
  }
  hasChanges() {
    return this.statusChanged() || this.receiversChanged();
  }
  saveWorkflow() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.comment && _this2.receiversChanged() && _this2.config.instant('workflow.commentRequired', true)) {
        _this2.toast.error(null, 'WORKSPACE.WORKFLOW.NO_COMMENT');
        return;
      }
      const receivers = _this2.status.hasReceiver ? _this2.receivers : [];
      if (receivers.length) {
        const hasPermission = yield _this2.requestReceiverPermissionIfNeeded(_this2.receivers[0]);
        if (!hasPermission) {
          return;
        }
      } else if (_this2.status.hasReceiver) {
        _this2.toast.error(null, 'WORKSPACE.WORKFLOW.NO_RECEIVER');
        return;
      }
      _this2.saveWorkflowFinal(receivers);
    })();
  }
  cancel() {
    this.dialogRef.close(null);
  }
  initNodes(nodes) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!nodes || nodes.length === 0) {
        return;
      }
      _this3.dialogRef.patchState({
        isLoading: true
      });
      try {
        yield _this3.initNodesInner(nodes);
      } catch (error) {
        _this3.toast.error(error);
        _this3.cancel();
      } finally {
        _this3.dialogRef.patchState({
          isLoading: false
        });
        _this3.updateButtons();
      }
    })();
  }
  initNodesInner(nodes) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.nodes = yield _this4.fetchCompleteNodes(nodes).toPromise();
      const histories = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(nodes.map(node => _this4.nodeService.getWorkflowHistory(node.ref.id))).toPromise();
      if (nodes.length > 1) {
        if (histories.some(history => history.length > 0)) {
          _this4.toast.error(null, 'WORKSPACE.WORKFLOW.BULK_WORKFLOWS_EXIST');
          _this4.cancel();
          return;
        } else {
          _this4.history = [];
          _this4.receivers = [];
          ({
            current: _this4.status,
            initial: _this4.initialStatus
          } = _this4.nodeHelper.getDefaultWorkflowStatus(true));
        }
      } else {
        _this4.history = histories[0];
        if (_this4.history.length) {
          _this4.receivers = _this4.history[0].receiver;
        }
        if (!_this4.receivers || _this4.receivers.length === 1 && !_this4.receivers[0]) {
          _this4.receivers = [];
        }
        ({
          current: _this4.status,
          initial: _this4.initialStatus
        } = _this4.nodeHelper.getWorkflowStatus(_this4.nodes[0], true));
      }
    })();
  }
  fetchCompleteNodes(nodes) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(nodes.map(node => this.nodeService.getNodeMetadata(node.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)(nodeWrapper => nodeWrapper.node))));
  }
  saveWorkflowFinal(receivers) {
    const entry = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.WorkflowEntry();
    const receiversClean = [];
    for (const r of receivers) {
      receiversClean.push({
        authorityName: r.authorityName
      });
    }
    entry.receiver = receiversClean;
    entry.comment = this.comment;
    entry.status = this.status.id;
    this.dialogRef.patchState({
      isLoading: true
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(this.nodes.map(node => this.nodeService.addWorkflow(node.ref.id, entry))).subscribe(() => {
      this.toast.toast('WORKSPACE.TOAST.WORKFLOW_UPDATED');
      this.fetchCompleteNodes(this.nodes).subscribe(nodes => {
        this.afterSaved(nodes);
      }, error => {
        this.toast.error(error);
        this.dialogRef.patchState({
          isLoading: false
        });
      });
    }, error => {
      this.toast.error(error);
      this.dialogRef.patchState({
        isLoading: false
      });
    });
  }
  afterSaved(nodes) {
    this.localEvents.nodesChanged.emit(nodes);
    this.dialogRef.close(null);
  }
  receiversChanged() {
    if (this.nodes.length > 1) {
      return this.receivers.length !== 0;
    } else {
      const prop = this.nodes[0].properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_WF_RECEIVER];
      if (prop) {
        if (prop.length !== this.receivers.length) {
          return true;
        }
        for (const receiver of this.receivers) {
          if (prop.indexOf(receiver.authorityName) === -1) {
            return true;
          }
        }
        return false;
      }
      return this.receivers.length > 0;
    }
  }
  statusChanged() {
    return this.status.id !== this.initialStatus.id;
  }
  updateButtons() {
    const save = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE', {
      color: 'primary'
    }, () => this.saveWorkflow());
    save.disabled = !this.hasChanges();
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.cancel()), save];
    this.dialogRef.patchConfig({
      buttons
    });
  }
  /**
   * Checks if the given receiver has the 'coordinator' permission and requests to grant it to
   * them if not.
   *
   * @returns `true` if the receiver had or was granted the permission
   */
  requestReceiverPermissionIfNeeded(receiver) {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const permissionsList = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)(_this5.nodes.map(node => _this5.nodeService.getNodePermissionsForUser(node.ref.id, receiver.authorityName))).toPromise();
      const nodesMissingPermission = _this5.nodes.filter((_, index) => !permissionsList[index].includes(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_COORDINATOR));
      if (nodesMissingPermission.length === 0) {
        return true;
      } else {
        const shouldGrantPermission = yield _this5.requestReceiverPermissionDialog(receiver);
        if (shouldGrantPermission) {
          yield _this5.grantReceiverPermission(nodesMissingPermission, receiver);
        }
        return shouldGrantPermission;
      }
    })();
  }
  /**
   * Shows a dialog to the user, asking them whether to grant missing permissions to the receiver.
   *
   * @returns `true` if the user decided to grant the permissions.
   */
  requestReceiverPermissionDialog(receiver) {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this6.dialogs.openGenericDialog({
        title: 'WORKSPACE.WORKFLOW.USER_NO_PERMISSION',
        message: 'WORKSPACE.WORKFLOW.USER_NO_PERMISSION_INFO',
        messageParameters: {
          user: new _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__.AuthorityNamePipe(_this6.translate).transform(receiver, null)
        },
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'WORKSPACE.WORKFLOW.PROCEED',
          config: {
            color: 'primary'
          }
        }]
      });
      const response = yield dialogRef.afterClosed().toPromise();
      return response === 'WORKSPACE.WORKFLOW.PROCEED';
    })();
  }
  grantReceiverPermission(nodes, receiver) {
    var _this7 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.dialogRef.patchState({
        isLoading: true
      });
      try {
        yield Promise.all(nodes.map(node => _this7.addWritePermission(receiver, node)));
      } catch (error) {
        _this7.toast.error(error);
      }
    })();
  }
  addWritePermission(authority, node) {
    var _this8 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const nodePermissions = yield _this8.nodeService.getNodePermissions(node.ref.id).toPromise();
      const permissions = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.addCoordinatorPermission(nodePermissions, authority);
      yield _this8.nodeService.setNodePermissions(node.ref.id, permissions, false).toPromise();
    })();
  }
  static #_ = this.ɵfac = function WorkflowDialogComponent_Factory(t) {
    return new (t || WorkflowDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_5__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_7__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: WorkflowDialogComponent,
    selectors: [["es-workflow-dialog"]],
    decls: 20,
    vars: 22,
    consts: [[1, "workflow-content"], [1, "row"], [1, "inputs"], [3, "disabled", "globalSearchAllowed", "groupType", "showRecent", "placeholder", "hint", "onChooseAuthority"], [1, "status-select"], [3, "value", "valueChange"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [1, "receivers"], [4, "ngIf"], [1, "comment"], ["matInput", "", 3, "ngModel", "ngModelChange"], ["class", "historyLabel", 4, "ngIf"], [3, "history"], [3, "value", "disabled"], [1, "workflow-dialog-status-option"], ["class", "badge", 3, "selectable", "removed", 4, "ngFor", "ngForOf"], [1, "badge", 3, "selectable", "removed"], [1, "mat-chip-group"], [1, "primary"], [1, "secondary"], ["matChipRemove", "", "esIcon", "cancel"], [1, "historyLabel"]],
    template: function WorkflowDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "es-authority-search-input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("onChooseAuthority", function WorkflowDialogComponent_Template_es_authority_search_input_onChooseAuthority_3_listener($event) {
          return ctx.addSuggestion($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "mat-form-field", 4)(6, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function WorkflowDialogComponent_Template_mat_select_valueChange_6_listener($event) {
          return ctx.setStatus($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, WorkflowDialogComponent_mat_option_7_Template, 4, 7, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, WorkflowDialogComponent_mat_chip_listbox_9_Template, 2, 1, "mat-chip-listbox", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "mat-form-field", 9)(11, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](13, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function WorkflowDialogComponent_Template_input_ngModelChange_14_listener($event) {
          return ctx.comment = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](15, "mat-hint");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](18, WorkflowDialogComponent_div_18_Template, 3, 3, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](19, "es-workflow-list", 12);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("hint", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 16, "WORKSPACE.WORKFLOW.RECEIVERS_HINT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", !ctx.status.hasReceiver)("globalSearchAllowed", ctx.globalAllowed)("groupType", ctx.TYPE_EDITORIAL)("showRecent", false)("placeholder", "WORKSPACE.WORKFLOW.RECEIVERS");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("--status-color", ctx.status.color);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx.status);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.validStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.status.hasReceiver);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](13, 18, "WORKSPACE.WORKFLOW.COMMENT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngModel", ctx.comment);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](17, 20, "WORKSPACE.WORKFLOW.COMMENT_INFO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.history == null ? null : ctx.history.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("history", ctx.history);
      }
    },
    dependencies: [_shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_8__.AuthoritySearchInputComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_13__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatOption, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipListbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipOption, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipRemove, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_21__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_22__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_23__.MatSelect, _workflow_history_workflow_history_component__WEBPACK_IMPORTED_MODULE_9__.WorkflowListComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_2__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_10__.PermissionNamePipe],
    styles: ["\n\n.row[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.inputs[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  gap: 20px;\n}\n.inputs[_ngcontent-%COMP%]   es-authority-search-input[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\n.status-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  height: 50px;\n  display: flex;\n  align-items: center;\n  padding: 0;\n}\n\n.status-select[_ngcontent-%COMP%]     .mat-mdc-select-value,   .workflow-dialog-status-option {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.status-select[_ngcontent-%COMP%]     .mat-mdc-select-value::before,   .workflow-dialog-status-option::before {\n  content: \"\";\n  border-radius: 50%;\n  width: 12px;\n  height: 12px;\n  background-color: var(--status-color);\n}\n\n.comment[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.historyLabel[_ngcontent-%COMP%] {\n  font-weight: bold;\n  padding-top: 30px;\n  padding-bottom: 12px;\n}\n\n@media screen and (max-width: 600px) {\n  .inputs[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3dvcmtmbG93LWRpYWxvZy93b3JrZmxvdy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLG1CQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUFBSjtBQUNJO0VBQ0ksWUFBQTtBQUNSOztBQUdBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7QUFBSjs7QUFHQTs7RUFFSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQUo7QUFDSTs7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFDQUFBO0FBRVI7O0FBRUE7RUFDSSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUFDSjs7QUFFQTtFQUNJO0lBQ0ksc0JBQUE7RUFDTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5yb3cge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5pbnB1dHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZ2FwOiAyMHB4O1xuICAgIGVzLWF1dGhvcml0eS1zZWFyY2gtaW5wdXQge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgfVxufVxuXG4uc3RhdHVzLXNlbGVjdCA6Om5nLWRlZXAgLm1hdC1tZGMtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgaGVpZ2h0OiA1MHB4OyAvLyBTYW1lIGFzIHRoZSBmb3JtIGZpZWxkIG9mIGF1dGhvcml0eS1zZWFyY2gtaW5wdXRcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMDtcbn1cblxuLnN0YXR1cy1zZWxlY3QgOjpuZy1kZWVwIC5tYXQtbWRjLXNlbGVjdC12YWx1ZSxcbjo6bmctZGVlcCAud29ya2Zsb3ctZGlhbG9nLXN0YXR1cy1vcHRpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEycHg7XG4gICAgJjo6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3RhdHVzLWNvbG9yKTtcbiAgICB9XG59XG5cbi5jb21tZW50IHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmhpc3RvcnlMYWJlbCB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgcGFkZGluZy10b3A6IDMwcHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEycHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGggLSAkbW9iaWxlU3RhZ2UgKiAxKSkge1xuICAgIC5pbnB1dHMge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 36123:
/*!*******************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/workflow-dialog/workflow-dialog.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkflowDialogComponent: () => (/* reexport safe */ _workflow_dialog_component__WEBPACK_IMPORTED_MODULE_1__.WorkflowDialogComponent),
/* harmony export */   WorkflowDialogModule: () => (/* binding */ WorkflowDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _workflow_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workflow-dialog.component */ 16560);
/* harmony import */ var _workflow_history_workflow_history_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workflow-history/workflow-history.component */ 78214);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);





class WorkflowDialogModule {
  static #_ = this.ɵfac = function WorkflowDialogModule_Factory(t) {
    return new (t || WorkflowDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: WorkflowDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](WorkflowDialogModule, {
    declarations: [_workflow_dialog_component__WEBPACK_IMPORTED_MODULE_1__.WorkflowDialogComponent, _workflow_history_workflow_history_component__WEBPACK_IMPORTED_MODULE_2__.WorkflowListComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ }),

/***/ 78214:
/*!****************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/workflow-dialog/workflow-history/workflow-history.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkflowListComponent: () => (/* binding */ WorkflowListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../shared/pipes/permission-name.pipe */ 44431);








function WorkflowListComponent_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, "WORKSPACE.WORKFLOW.NO_HISTORY"), " ");
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip-set")(1, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 1, "WORKSPACE.WORKFLOW.NOBODY"), " ");
  }
}
const _c0 = function () {
  return {
    field: "secondary"
  };
};
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_14_mat_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 21)(3, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const receiver_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("esIcon", receiver_r16.authorityType === "USER" ? "person" : "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 3, receiver_r16));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](8, 5, receiver_r16, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0)));
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip-set");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_14_mat_chip_1_Template, 9, 9, "mat-chip", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r8.history[i_r5 + 1].receiver);
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().index;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 4, "WORKSPACE.WORKFLOW.OLD_STATUS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background-color", ctx_r9.getWorkflowForId(ctx_r9.history[i_r5 + 1].status).color);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 6, "WORKFLOW." + ctx_r9.history[i_r5 + 1].status), " ");
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 4, "WORKSPACE.WORKFLOW.OLD_STATUS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background-color", ctx_r10.defaultStatus.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 6, "WORKFLOW." + ctx_r10.defaultStatus.id), " ");
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip-set")(1, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 1, "WORKSPACE.WORKFLOW.NOBODY"), " ");
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_25_mat_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 21)(3, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const receiver_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("esIcon", receiver_r20.authorityType === "USER" ? "person" : "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 3, receiver_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](8, 5, receiver_r20, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0)));
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip-set");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_25_mat_chip_1_Template, 9, 9, "mat-chip", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const entry_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", entry_r4.receiver);
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 24)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const entry_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 2, "WORKSPACE.WORKFLOW.COMMENT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](entry_r4.comment);
  }
}
function WorkflowListComponent_ng_container_0_div_2_div_1_hr_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "hr");
  }
}
const _c1 = function () {
  return {
    time: true,
    relative: true
  };
};
function WorkflowListComponent_ng_container_0_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 8)(8, "div", 9)(9, "div", 10)(10, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_13_Template, 4, 3, "mat-chip-set", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_14_Template, 2, 1, "mat-chip-set", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, WorkflowListComponent_ng_container_0_div_2_div_1_div_15_Template, 7, 8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, WorkflowListComponent_ng_container_0_div_2_div_1_div_16_Template, 7, 8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 14)(20, "div", 10)(21, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_24_Template, 4, 3, "mat-chip-set", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, WorkflowListComponent_ng_container_0_div_2_div_1_mat_chip_set_25_Template, 2, 1, "mat-chip-set", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 15)(27, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](33, WorkflowListComponent_ng_container_0_div_2_div_1_div_33_Template, 6, 4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](34, WorkflowListComponent_ng_container_0_div_2_div_1_hr_34_Template, 1, 0, "hr", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const last_r6 = ctx.last;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 16, entry_r4.editor));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](6, 18, entry_r4.time, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](29, _c1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](12, 21, "WORKSPACE.WORKFLOW.RECEIVERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", i_r5 === ctx_r3.history.length - 1 || !ctx_r3.getWorkflowForId(ctx_r3.history[i_r5 + 1].status).hasReceiver);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !(i_r5 === ctx_r3.history.length - 1 || !ctx_r3.getWorkflowForId(ctx_r3.history[i_r5 + 1].status).hasReceiver));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", i_r5 < ctx_r3.history.length - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", i_r5 === ctx_r3.history.length - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](23, 23, "WORKSPACE.WORKFLOW.RECEIVERS_NEXT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r3.getWorkflowForId(ctx_r3.history[i_r5].status).hasReceiver);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r3.getWorkflowForId(ctx_r3.history[i_r5].status).hasReceiver && (entry_r4.receiver == null ? null : entry_r4.receiver.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](29, 25, "WORKSPACE.WORKFLOW.NEW_STATUS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background-color", ctx_r3.getWorkflowForId(entry_r4.status).color);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](32, 27, "WORKFLOW." + entry_r4.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", entry_r4.comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r6);
  }
}
function WorkflowListComponent_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, WorkflowListComponent_ng_container_0_div_2_div_1_Template, 35, 30, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.history);
  }
}
function WorkflowListComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, WorkflowListComponent_ng_container_0_div_1_Template, 3, 3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, WorkflowListComponent_ng_container_0_div_2_Template, 2, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.history.length);
  }
}
class WorkflowListComponent {
  constructor(nodeHelper) {
    this.nodeHelper = nodeHelper;
    ({
      initial: this.defaultStatus
    } = this.nodeHelper.getDefaultWorkflowStatus(false));
  }
  getWorkflowForId(id) {
    return this.nodeHelper.getWorkflowStatusById(id);
  }
  static #_ = this.ɵfac = function WorkflowListComponent_Factory(t) {
    return new (t || WorkflowListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_0__.NodeHelperService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: WorkflowListComponent,
    selectors: [["es-workflow-list"]],
    inputs: {
      history: "history"
    },
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], ["class", "no-history", 4, "ngIf"], ["class", "history", 4, "ngIf"], [1, "no-history"], [1, "history"], [4, "ngFor", "ngForOf"], [1, "user"], [1, "date"], [1, "box"], [1, "row", "origin"], [1, "receivers"], ["class", "status", 4, "ngIf"], [1, "row", "arrow"], ["esIcon", "keyboard_arrow_right"], [1, "row", "target"], [1, "status"], [1, "workflowStatus"], ["class", "comment", 4, "ngIf"], ["class", "badge", 4, "ngFor", "ngForOf"], [1, "badge"], ["matChipAvatar", "", 3, "esIcon"], [1, "mat-chip-group"], [1, "primary"], [1, "secondary"], [1, "comment"]],
    template: function WorkflowListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, WorkflowListComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.history);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.IconDirective, _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChipAvatar, _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChipSet, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_1__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.FormatDatePipe, _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_2__.PermissionNamePipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n}\n\n.receivers[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\nhr[_ngcontent-%COMP%] {\n  margin: 2em 0;\n  width: 100%;\n}\n\n.no-history[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 60px 0;\n  text-align: center;\n  color: var(--textLight);\n}\n\n.history[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.history[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%], .history[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n.history[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%] {\n  float: left;\n}\n.history[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  float: right;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%] {\n  background-color: #fff;\n  padding: 10px 0;\n  display: flex;\n  width: 100%;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  padding-bottom: 5px;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .workflowStatus[_ngcontent-%COMP%] {\n  float: left;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%], .history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%] {\n  padding-top: 15px;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .row.arrow[_ngcontent-%COMP%] {\n  flex-grow: 0;\n  padding: 0 25px;\n  justify-content: center;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .row.origin[_ngcontent-%COMP%], .history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .row.target[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.history[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  float: left;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3dvcmtmbG93LWRpYWxvZy93b3JrZmxvdy1oaXN0b3J5L3dvcmtmbG93LWhpc3RvcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7QUFBSjs7QUFHQTtFQUNJLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkRKUTtBQ0laOztBQUVBO0VBQ0ksV0FBQTtBQUNKO0FBQUk7O0VBRUksdUJEVkk7QUNZWjtBQUFJO0VBQ0ksV0FBQTtBQUVSO0FBQUk7RUFDSSxZQUFBO0FBRVI7QUFBSTtFQUNJLHNCRFRVO0VDVVYsZUFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0FBRVI7QUFEUTtFQUNJLG1CQUFBO0FBR1o7QUFEUTtFQUNJLFdBQUE7QUFHWjtBQURROztFQUVJLGlCQUFBO0FBR1o7QUFEUTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUdaO0FBRlk7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0FBSWhCO0FBRlk7RUFFSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBR2hCO0FBQ1E7RUFDSSxXQUFBO0VBQ0EsV0FBQTtBQUNaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjpob3N0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4ucmVjZWl2ZXJzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbmhyIHtcbiAgICBtYXJnaW46IDJlbSAwO1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4ubm8taGlzdG9yeSB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIHBhZGRpbmc6IDYwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG4uaGlzdG9yeSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLnVzZXIsXG4gICAgLmRhdGUge1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICB9XG4gICAgLnVzZXIge1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICB9XG4gICAgLmRhdGUge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuICAgIC5ib3gge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBsYWJlbCB7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICAgICAgICB9XG4gICAgICAgIC53b3JrZmxvd1N0YXR1cyB7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgfVxuICAgICAgICAuc3RhdHVzLFxuICAgICAgICAuY29tbWVudCB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgfVxuICAgICAgICAucm93IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgJi5hcnJvdyB7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMjVweDtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYub3JpZ2luLFxuICAgICAgICAgICAgJi50YXJnZXQge1xuICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxhYmVsIHtcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_workflow-dialog_workflow-dialog_module_ts.js.map