"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_simple-edit-dialog_simple-edit-dialog_module_ts"],{

/***/ 65171:
/*!*******************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/has-permission.pipe.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HasPermissionPipe: () => (/* binding */ HasPermissionPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class HasPermissionPipe {
  transform(nodes, permission) {
    return nodes?.every(node => node.access.includes(permission));
  }
  static #_ = this.ɵfac = function HasPermissionPipe_Factory(t) {
    return new (t || HasPermissionPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "hasPermission",
    type: HasPermissionPipe,
    pure: true
  });
}

/***/ }),

/***/ 11423:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-dialog-data.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditDialogData: () => (/* binding */ SimpleEditDialogData)
/* harmony export */ });
class SimpleEditDialogData {}

/***/ }),

/***/ 72750:
/*!****************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-dialog.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditDialogComponent: () => (/* binding */ SimpleEditDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 58175);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _simple_edit_invite_simple_edit_invite_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./simple-edit-invite/simple-edit-invite.component */ 73952);
/* harmony import */ var _simple_edit_license_simple_edit_license_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./simple-edit-license/simple-edit-license.component */ 33865);
/* harmony import */ var _simple_edit_metadata_simple_edit_metadata_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./simple-edit-metadata/simple-edit-metadata.component */ 51384);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _has_permission_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./has-permission.pipe */ 65171);
/* harmony import */ var _simple_edit_dialog_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./simple-edit-dialog-data */ 11423);



















const _c0 = ["metadata"];
const _c1 = ["invite"];
const _c2 = ["license"];
class SimpleEditDialogComponent {
  constructor(data, dialogRef, connector, dialogs, localEvents, nodeApi, toast) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.connector = connector;
    this.dialogs = dialogs;
    this.localEvents = localEvents;
    this.nodeApi = nodeApi;
    this.toast = toast;
    this._nodes = this.data.nodes;
    this.initState = {
      license: false,
      invite: false
    };
    this.dialogRef.patchState({
      isLoading: true
    });
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE).subscribe(tp => this.tpInvite = tp);
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_LICENSE).subscribe(tp => this.tpLicense = tp);
    this._initButtons();
  }
  _initButtons() {
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => this._cancel()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE', {
        color: 'primary'
      }, () => this._saveAndClose())]
    });
  }
  _saveAndClose() {
    this._save().subscribe(nodes => {
      if (nodes && nodes.length > 0) {
        this.localEvents.nodesChanged.next(nodes);
        this.dialogRef.close(nodes);
      }
    });
  }
  /**
   * Closes the dialog without saving data.
   */
  _cancel() {
    this.dialogRef.close(null);
  }
  /**
   * Opens the full MDS dialog on top of the current dialog.
   */
  _openMetadata() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const upToDate = yield _this._ensureUpToDate();
      if (!upToDate) {
        return;
      }
      const dialogRef = yield _this.dialogs.openMdsEditorDialogForNodes({
        nodes: _this._nodes
      });
      const updatedNodes = yield dialogRef.afterClosed().toPromise();
      if (updatedNodes) {
        _this._nodes = updatedNodes;
      }
    })();
  }
  /**
   * Opens the share dialog on top of the current dialog.
   */
  _openShare() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const upToDate = yield _this2._ensureUpToDate();
      if (!upToDate) {
        return;
      }
      const dialogRef = yield _this2.dialogs.openShareDialog({
        nodes: _this2._nodes
      });
      yield dialogRef.afterClosed().toPromise();
      _this2.dialogRef.patchState({
        isLoading: true
      });
      rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin(_this2._nodes.map(n => _this2.nodeApi.getNodeMetadata(n.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]))).subscribe(nodes => {
        _this2._nodes = nodes.map(n => n.node);
        _this2.dialogRef.patchState({
          isLoading: false
        });
      });
    })();
  }
  /**
   * Opens the license dialog on top of the current dialog.
   */
  _openLicense() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const upToDate = yield _this3._ensureUpToDate();
      if (!upToDate) {
        return;
      }
      const dialogRef = yield _this3.dialogs.openLicenseDialog({
        kind: 'nodes',
        nodes: _this3._nodes
      });
      const updatedNodes = yield dialogRef.afterClosed().toPromise();
      if (updatedNodes) {
        _this3._nodes = updatedNodes;
      }
    })();
  }
  /**
   * Saves changed data.
   *
   * @returns updated nodes if successful, `null` otherwise
   */
  _save() {
    if (!this.metadata.validate()) {
      return rxjs__WEBPACK_IMPORTED_MODULE_13__.of(null);
    }
    this.dialogRef.patchState({
      isLoading: true
    });
    return this.metadata.save().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(() => this.invite.save()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(() => this.license.save()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.switchMap)(() => rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin(this._nodes.map(n => this.nodeApi.getNodeMetadata(n.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL])))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)(nodes => {
      this.toast.toast('SIMPLE_EDIT.SAVED' + (nodes.length === 1 ? '' : '_MULTIPLE'), {
        name: nodes[0].node.name,
        count: nodes.length
      });
      this.dialogRef.patchState({
        isLoading: false
      });
      return nodes.map(n => n.node);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.catchError)(error => {
      this.toast.error(error);
      this.dialogRef.patchState({
        isLoading: false
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_13__.of(null);
    }));
  }
  /**
   * Checks if there are any unsaved changes and prompts the user to save any changes if so.
   *
   * When the user accepts, saves any data.
   *
   * @returns whether data is up-to-date
   */
  _ensureUpToDate() {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4._isDirty()) {
        return true;
      }
      const dialogRef = yield _this4.dialogs.openGenericDialog({
        title: 'SIMPLE_EDIT.DIRTY.TITLE',
        message: 'SIMPLE_EDIT.DIRTY.MESSAGE',
        buttons: _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__.SAVE_OR_CANCEL
      });
      const result = yield dialogRef.afterClosed().toPromise();
      if (result === 'SAVE') {
        const updatedNodes = yield _this4._save().toPromise();
        if (updatedNodes) {
          _this4._nodes = updatedNodes;
          return true;
        }
      }
      return false;
    })();
  }
  /**
   * Returns true if there are unsaved changes.
   */
  _isDirty() {
    return this.metadata.isDirty() || this.invite.isDirty() || this.license.isDirty();
  }
  /**
   * Sets the state for the given component to initialized.
   *
   * When all components are initialized, turns off the loading spinner.
   */
  _updateInitState(component) {
    this.initState[component] = true;
    if (this.initState.invite && this.initState.license) {
      this.dialogRef.patchState({
        isLoading: false
      });
    }
  }
  /**
   * Handles an error in a sub component.
   */
  _handleError(error) {
    if (error) {
      this.toast.error(error);
    }
    // Before migration to standalone modules, this used to close the dialog on error. We copied
    // the behavior, but keeping the dialog and just turning off the loading spinner might be
    // the more sensible choice.
    // this.dialogRef.patchState({ isLoading: false });
    this.dialogRef.close(null);
  }
  static #_ = this.ɵfac = function SimpleEditDialogComponent_Factory(t) {
    return new (t || SimpleEditDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_5__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_6__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
    type: SimpleEditDialogComponent,
    selectors: [["es-simple-edit-dialog"]],
    viewQuery: function SimpleEditDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.metadata = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.invite = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.license = _t.first);
      }
    },
    decls: 37,
    vars: 29,
    consts: [[1, "block"], [1, "top"], [1, "mat-heading-3"], ["mat-button", "", "color", "primary", "data-test", "more-metadata-button", 3, "click"], ["esIcon", "edit"], [3, "nodes", "fromUpload", "onError"], ["metadata", ""], ["mat-button", "", "color", "primary", 3, "disabled", "click"], ["esIcon", "group_add"], [3, "nodes", "fromUpload", "onError", "onInitFinished"], ["invite", ""], ["esIcon", "copyright"], ["license", ""]],
    template: function SimpleEditDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "div")(6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function SimpleEditDialogComponent_Template_button_click_6_listener() {
          return ctx._openMetadata();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](7, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "es-simple-edit-metadata", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("onError", function SimpleEditDialogComponent_Template_es_simple_edit_metadata_onError_10_listener($event) {
          return ctx._handleError($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "div", 0)(13, "div", 1)(14, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](17, "div")(18, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function SimpleEditDialogComponent_Template_button_click_18_listener() {
          return ctx._openShare();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](19, "hasPermission");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](20, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](23, "es-simple-edit-invite", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("onError", function SimpleEditDialogComponent_Template_es_simple_edit_invite_onError_23_listener($event) {
          return ctx._handleError($event);
        })("onInitFinished", function SimpleEditDialogComponent_Template_es_simple_edit_invite_onInitFinished_23_listener() {
          return ctx._updateInitState("invite");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](25, "div", 0)(26, "div", 1)(27, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](29, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](30, "div")(31, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function SimpleEditDialogComponent_Template_button_click_31_listener() {
          return ctx._openLicense();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](32, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](34, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](35, "es-simple-edit-license", 9, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("onError", function SimpleEditDialogComponent_Template_es_simple_edit_license_onError_35_listener($event) {
          return ctx._handleError($event);
        })("onInitFinished", function SimpleEditDialogComponent_Template_es_simple_edit_license_onInitFinished_35_listener() {
          return ctx._updateInitState("license");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](4, 14, "SIMPLE_EDIT.METADATA.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](9, 16, "SIMPLE_EDIT.METADATA.MORE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("nodes", ctx._nodes)("fromUpload", ctx.data.fromUpload);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](16, 18, "SIMPLE_EDIT.INVITE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", !ctx.tpInvite || !_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind2"](19, 20, ctx._nodes, "ChangePermissions"));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](22, 23, "SIMPLE_EDIT.INVITE.MORE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("nodes", ctx._nodes)("fromUpload", ctx.data.fromUpload);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](29, 25, "SIMPLE_EDIT.LICENSE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", !ctx.tpLicense);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](34, 27, "SIMPLE_EDIT.LICENSE.MORE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("nodes", ctx._nodes)("fromUpload", ctx.data.fromUpload);
      }
    },
    dependencies: [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatButton, _simple_edit_invite_simple_edit_invite_component__WEBPACK_IMPORTED_MODULE_7__.SimpleEditInviteComponent, _simple_edit_license_simple_edit_license_component__WEBPACK_IMPORTED_MODULE_8__.SimpleEditLicenseComponent, _simple_edit_metadata_simple_edit_metadata_component__WEBPACK_IMPORTED_MODULE_9__.SimpleEditMetadataComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe, _has_permission_pipe__WEBPACK_IMPORTED_MODULE_10__.HasPermissionPipe],
    styles: ["\n\n.block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.block[_ngcontent-%COMP%]:not(:first-child) {\n  padding-top: 20px;\n}\n.block[_ngcontent-%COMP%]:not(:last-child) {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #ccc;\n}\n.block[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.block[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  color: #383838;\n  font-weight: bold;\n  flex-grow: 1;\n  font-size: 125%;\n}\n.block[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  top: 3px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NpbXBsZS1lZGl0LWRpYWxvZy9zaW1wbGUtZWRpdC1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQURKO0FBRUk7RUFDSSxpQkFBQTtBQUFSO0FBRUk7RUFDSSxvQkFBQTtFQUNBLDZCQUFBO0FBQVI7QUFFSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtBQUFSO0FBQ1E7RUFDSSxjREdEO0VDRkMsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQUNaO0FBQ1E7RUFDSSxrQkFBQTtFQUNBLFFBQUE7QUFDWiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvY2FyZC92YXJpYWJsZXMnO1xuXG4uYmxvY2sge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAmOm5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDIwcHg7XG4gICAgfVxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgICB9XG4gICAgLnRvcCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgID4gaDMge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TWFpbjtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMjUlO1xuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IDNweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 45489:
/*!*************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-dialog.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditDialogComponent: () => (/* reexport safe */ _simple_edit_dialog_component__WEBPACK_IMPORTED_MODULE_2__.SimpleEditDialogComponent),
/* harmony export */   SimpleEditDialogModule: () => (/* binding */ SimpleEditDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mds/mds.module */ 77894);
/* harmony import */ var _simple_edit_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simple-edit-dialog.component */ 72750);
/* harmony import */ var _simple_edit_invite_simple_edit_invite_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./simple-edit-invite/simple-edit-invite.component */ 73952);
/* harmony import */ var _simple_edit_license_simple_edit_license_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simple-edit-license/simple-edit-license.component */ 33865);
/* harmony import */ var _simple_edit_metadata_simple_edit_metadata_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./simple-edit-metadata/simple-edit-metadata.component */ 51384);
/* harmony import */ var _user_tile_user_tile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-tile/user-tile.component */ 81168);
/* harmony import */ var _has_permission_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./has-permission.pipe */ 65171);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);










class SimpleEditDialogModule {
  static #_ = this.ɵfac = function SimpleEditDialogModule_Factory(t) {
    return new (t || SimpleEditDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: SimpleEditDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](SimpleEditDialogModule, {
    declarations: [_simple_edit_dialog_component__WEBPACK_IMPORTED_MODULE_2__.SimpleEditDialogComponent, _simple_edit_invite_simple_edit_invite_component__WEBPACK_IMPORTED_MODULE_3__.SimpleEditInviteComponent, _simple_edit_license_simple_edit_license_component__WEBPACK_IMPORTED_MODULE_4__.SimpleEditLicenseComponent, _simple_edit_metadata_simple_edit_metadata_component__WEBPACK_IMPORTED_MODULE_5__.SimpleEditMetadataComponent, _user_tile_user_tile_component__WEBPACK_IMPORTED_MODULE_6__.UserTileComponent, _has_permission_pipe__WEBPACK_IMPORTED_MODULE_7__.HasPermissionPipe],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
})();

/***/ }),

/***/ 73952:
/*!***********************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-invite/simple-edit-invite.component.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditInviteComponent: () => (/* binding */ SimpleEditInviteComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 73064);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button-toggle */ 10727);
/* harmony import */ var _user_tile_user_tile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user-tile/user-tile.component */ 81168);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 21916);


















const _c0 = ["orgGroup"];
const _c1 = ["globalGroup"];
function SimpleEditInviteComponent_es_info_message_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-info-message", 5);
  }
}
function SimpleEditInviteComponent_es_info_message_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-info-message", 6);
  }
}
function SimpleEditInviteComponent_es_info_message_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "es-info-message", 7)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "SIMPLE_EDIT.INVITE.ERROR_HELP"));
  }
}
function SimpleEditInviteComponent_es_info_message_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const authority_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, authority_r6));
  }
}
function SimpleEditInviteComponent_es_info_message_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "es-info-message", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, SimpleEditInviteComponent_es_info_message_3_span_2_Template, 3, 3, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r3.parentAuthorities);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 2, "SIMPLE_EDIT.INVITE.ERROR_HELP"));
  }
}
const _c2 = function (a0) {
  return {
    school: a0
  };
};
function SimpleEditInviteComponent_div_4_ng_container_15_mat_button_toggle_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-button-toggle", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r13 = ctx.$implicit;
    const organization_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", organization_r11.groups[group_r13] == null ? null : organization_r11.groups[group_r13].authorityName)("disabled", !organization_r11.groups[group_r13]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 3, "SIMPLE_EDIT.INVITE.GROUP_TYPES." + group_r13, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 6, organization_r11.organization))));
  }
}
function SimpleEditInviteComponent_div_4_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SimpleEditInviteComponent_div_4_ng_container_15_mat_button_toggle_1_Template, 4, 10, "mat-button-toggle", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-button-toggle", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const organization_r11 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r8.organizationGroups);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", organization_r11.organization.authorityName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, organization_r11.organization));
  }
}
function SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "SIMPLE_EDIT.INVITE.PUBLISH"));
  }
}
function SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const group_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, group_r17));
  }
}
function SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-button-toggle", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_ng_container_2_Template, 3, 3, "ng-container", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_ng_container_3_Template, 3, 3, "ng-container", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r17 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", group_r17.authorityName === "GROUP_EVERYONE" && !ctx_r16.tpInviteEveryone || ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 4, ctx_r16.authenticationService.observeLoginInfo())) == null ? null : tmp_0_0.currentScope) !== null)("value", group_r17.authorityName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", group_r17.authorityName === "GROUP_EVERYONE");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", group_r17.authorityName !== "GROUP_EVERYONE");
  }
}
function SimpleEditInviteComponent_div_4_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div")(1, "mat-button-toggle-group", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function SimpleEditInviteComponent_div_4_div_16_Template_mat_button_toggle_group_change_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r21.updateValue("global"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, SimpleEditInviteComponent_div_4_div_16_mat_button_toggle_3_Template, 4, 6, "mat-button-toggle", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r9.globalGroups);
  }
}
function SimpleEditInviteComponent_div_4_div_17_es_user_tile_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "es-user-tile", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SimpleEditInviteComponent_div_4_div_17_es_user_tile_5_Template_es_user_tile_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const authority_r24 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.toggleInvitation(authority_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const authority_r24 = ctx.$implicit;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("user", authority_r24)("active", ctx_r23.isInvited(authority_r24));
  }
}
function SimpleEditInviteComponent_div_4_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 14)(1, "label", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, SimpleEditInviteComponent_div_4_div_17_es_user_tile_5_Template, 1, 2, "es-user-tile", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, "SIMPLE_EDIT.INVITE.RECENT_AUTHORITIES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r10.recentAuthorities);
  }
}
function SimpleEditInviteComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 12)(1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 14)(5, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 16)(9, "div")(10, "mat-button-toggle-group", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function SimpleEditInviteComponent_div_4_Template_mat_button_toggle_group_change_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r27.updateValue("org"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "mat-button-toggle", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, SimpleEditInviteComponent_div_4_ng_container_15_Template, 5, 5, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, SimpleEditInviteComponent_div_4_div_16_Template, 4, 1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, SimpleEditInviteComponent_div_4_div_17_Template, 6, 4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 7, "SIMPLE_EDIT.INVITE.INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](7, 9, "SIMPLE_EDIT.INVITE.DEFAULT_GROUPS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", "unset");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](14, 11, "SIMPLE_EDIT.INVITE.UNSET"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r4.organizations);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.globalGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.recentAuthorities && ctx_r4.recentAuthorities.length);
  }
}
class SimpleEditGroupConfig {}
class SimpleEditInviteComponent {
  set nodes(nodes) {
    this._nodes = nodes;
    if (nodes) {
      this.prepare();
    }
  }
  constructor(nodeApi, connector, applicationRef, configService, iamApi, organizationApi, authenticationService, toast) {
    this.nodeApi = nodeApi;
    this.connector = connector;
    this.applicationRef = applicationRef;
    this.configService = configService;
    this.iamApi = iamApi;
    this.organizationApi = organizationApi;
    this.authenticationService = authenticationService;
    this.toast = toast;
    this.dirty = false;
    this.parentAuthorities = [];
    /**
     * When true, we know that we only handling with simple permissions
     * this will cause that editing permission will REPLACE the permissions, rather than EXPAND them
     */
    this.stablePermissionState = false;
    this.globalGroups = [];
    this.onInitFinished = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.configService.get('simpleEdit.organization.groupTypes', [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_TYPE_ADMINISTRATORS]).subscribe(data =>
    // only display non-empty groups
    this.organizationGroups = data.filter(d => !!d));
    this.configService.get('simpleEdit.globalGroups', [{
      groups: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE]
    }]).subscribe(data => {
      this.loadGlobalGroups(data);
    });
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE).subscribe(tp => this.tpInvite = tp);
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES).subscribe(tp => this.tpInviteEveryone = tp);
  }
  isDirty() {
    if (this.hasInvalidState()) {
      return false;
    }
    if (this.dirty) {
      return true;
    }
    return this.getSelectedAuthority() != null && !_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.objectEquals(this.initialState, this.getSelectedAuthority());
  }
  save() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable(observer => {
      if (!this.isDirty()) {
        observer.next();
        observer.complete();
        return;
      }
      const authority = this.getSelectedAuthority();
      let addPermission = null;
      const publish = authority === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE;
      if (authority != null) {
        addPermission = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
        addPermission.authority = {
          authorityName: authority,
          authorityType: authority.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.GROUP_PREFIX) ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_GROUP : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER
        };
        // if EVERYONE, we do a "publishing"
        if (publish) {
          addPermission.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH];
        } else {
          addPermission.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER];
        }
      }
      (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)(this._nodes.map((n, i) => {
        let permissions = this.nodesPermissions[i].localPermissions;
        // if currentPermissions available (single node mode), we will check the state and override if possible
        if (this.currentPermissions && this.currentPermissions.length) {
          permissions.permissions = [];
        }
        if (addPermission) {
          if (this.stablePermissionState) {
            permissions.permissions = [addPermission];
          } else {
            permissions.permissions = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.mergePermissionsWithHighestPermission(permissions.permissions, [addPermission]);
          }
        }
        if (this.currentPermissions && this.currentPermissions.length) {
          // all global groups will get removed
          this.currentPermissions = this.currentPermissions.filter(p => this.getAvailableGlobalGroups().indexOf(p.authority.authorityName) === -1);
          permissions.permissions = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.mergePermissionsWithHighestPermission(permissions.permissions, this.currentPermissions);
        }
        permissions = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyAndCleanPermissions(permissions.permissions, this.nodesPermissions[i].localPermissions.inherited);
        return this.nodeApi.setNodePermissions(n.ref.id, permissions, false);
      })).subscribe(() => {
        observer.next(null);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
  getSelectedAuthority() {
    if (this.hasInvalidState()) {
      return null;
    }
    let authority = null;
    if (this.orgGroup.value) {
      if (this.orgGroup.value === 'unset') {
        // do nothing
      } else {
        authority = this.orgGroup.value;
      }
    } else if (this.globalGroup.value) {
      authority = this.globalGroup.value;
    } else {
      console.warn('invalid value for button toggle in simple invite dialog');
    }
    return authority;
  }
  prepare() {
    const parents = Array.from(new Set(this._nodes.map(n => n.parent.id)));
    this.multipleParents = parents.length > 1;
    if (this.multipleParents) {
      this.setInitialState();
      return;
    }
    if (this._nodes.find(n => n.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CHANGE_PERMISSIONS) === -1)) {
      this.missingNodePermissions = true;
      this.setInitialState();
      return;
    }
    this.nodeApi.getNodePermissions(parents[0]).subscribe(parent => {
      this.parentPermissions = parent.permissions.localPermissions.permissions.concat(parent.permissions.inheritedPermissions);
      // filter and distinct them first
      const authorities = Array.from(new Set(this.parentPermissions.map(p => p.authority.authorityName).filter(a => a !== this.connector.getCurrentLogin().authorityName && a !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_ROLE_OWNER)));
      // now, convert them back to objects
      this.parentAuthorities = authorities.map(a => this.parentPermissions.find(p => p.authority.authorityName === a));
    }, error => {
      if (error.status === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HTTP_FORBIDDEN) {
        this.missingNodePermissions = true;
      } else {
        this.onError.emit(error);
      }
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)(this._nodes.map(n => this.nodeApi.getNodePermissions(n.ref.id))).subscribe(permissions => {
      this.nodesPermissions = permissions.map(p => p.permissions);
      this.inherited = permissions.some(p => p.permissions.localPermissions.inherited);
      // The amount of orgs is still limited to the maximum amount returned by default!
      this.organizationApi.getOrganizations('', true).subscribe(orgs => {
        const filter = this.configService.instant('simpleEdit.organizationFilter');
        if (filter) {
          const reg = new RegExp(filter);
          orgs.organizations = orgs.organizations.filter(o => {
            return reg.exec(o.authorityName) != null;
          });
        }
        if (orgs.organizations.length >= 1) {
          this.organizations = orgs.organizations.map(o => {
            return {
              organization: o,
              groups: {}
            };
          });
          (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)(this.organizations.map(o => {
            return new rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable(observer => {
              if (this.organizationGroups?.length) {
                (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)(this.organizationGroups.map(g => this.iamApi.getSubgroupByType(o.organization.authorityName, g))).subscribe(groups => {
                  groups.forEach(g => {
                    o.groups[g.group.profile.groupType] = g.group;
                  });
                  observer.next(o);
                  observer.complete();
                }, error => {
                  console.warn('Some group roles could not be found', error);
                  observer.next(o);
                  observer.complete();
                });
              } else {
                observer.next(o);
                observer.complete();
              }
            });
          })).subscribe(o => {
            this.organizations = o;
            this.detectPermissionState();
          });
        } else {
          this.detectPermissionState();
        }
      });
    }, error => {
      this.onError.emit(error);
    });
  }
  loadGlobalGroups(config) {
    const groupConfigs = config.filter(g => !g.toolpermission || this.connector.hasToolPermissionInstant(g.toolpermission));
    let groups;
    if (groupConfigs.length === 0) {
      console.warn('Invalid config for simple edit / global groups. No matching entry was found');
      groups = [];
    } else {
      groups = groupConfigs[0].groups || [];
    }
    this.globalGroups = [];
    // filter group everyone and handle it seperately
    if (groups.find(d => d === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE)) {
      groups = groups.filter(d => d !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE);
      this.globalGroups.push({
        authorityName: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE,
        authorityType: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_EVERYONE
      });
    }
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)(groups.map(d => this.iamApi.getGroup(d))).subscribe(groups => this.globalGroups = groups.map(g => g.group).concat(this.globalGroups));
  }
  updateValue(mode) {
    if (mode === 'org') {
      this.globalGroup.value = null;
    } else {
      this.orgGroup.value = null;
    }
  }
  detectPermissionState() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // wait 1 tick so that the mat toggle is ready to accept values
      yield _this.applicationRef.tick();
      if (_this.hasInvalidState()) {
        _this.setInitialState();
        return;
      }
      const availableToggleGroups = _this.getAvailableGlobalGroups();
      let unset = false;
      let invalid = false;
      let activeToggle;
      for (const perm of _this.nodesPermissions) {
        const list = perm.localPermissions.permissions;
        // filter((p) => p.authority.authorityName !== this.connector.getCurrentLogin().authorityName);
        if (_this._nodes.length === 1) {
          _this.currentPermissions = list;
        } else {
          _this.currentPermissions = [];
        }
        if (list.length > 0) {
          const consumers = list.filter(p => p.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER) !== -1);
          const toggle = consumers.filter(c => availableToggleGroups.indexOf(c.authority.authorityName) !== -1);
          if (toggle.length === 1 && (!activeToggle || activeToggle === toggle[0].authority.authorityName)) {
            activeToggle = toggle[0].authority.authorityName;
          } else {
            invalid = true;
          }
        } else {
          unset = true;
        }
      }
      _this.stablePermissionState = !invalid;
      if (unset || invalid) {
        _this.orgGroup.value = 'unset';
      } else {
        if (_this.organizations?.length && activeToggle) {
          const match = _this.organizations.find(o => o.organization.authorityName === activeToggle);
          if (match) {
            _this.orgGroup.value = match.organization.authorityName;
            _this.setInitialState();
            return;
          }
        }
        if (_this.organizations?.length) {
          for (const org of _this.organizations) {
            for (const key of Object.keys(org.groups)) {
              if (activeToggle === org.groups[key].authorityName) {
                _this.orgGroup.value = activeToggle;
                _this.setInitialState();
                return;
              }
            }
          }
        }
        if (_this.globalGroups) {
          for (const globalGroup of _this.globalGroups) {
            if (activeToggle === globalGroup.authorityName) {
              _this.globalGroup.value = activeToggle;
              _this.setInitialState();
              return;
            }
          }
        }
        _this.orgGroup.value = 'unset';
      }
      _this.setInitialState();
    })();
  }
  getAvailableGlobalGroups() {
    let availableToggleGroups = [];
    if (this.organizations?.length) {
      availableToggleGroups = availableToggleGroups.concat(this.organizations.map(o => o.organization.authorityName));
      for (const org of this.organizations) {
        for (const key of Object.keys(org.groups)) {
          availableToggleGroups.push(org.groups[key].authorityName);
        }
      }
    }
    if (this.globalGroups) {
      for (const globalGroup of this.globalGroups) {
        availableToggleGroups.push(globalGroup.authorityName);
      }
    }
    return availableToggleGroups;
  }
  hasInvalidState() {
    return this.multipleParents || this.inherited && this.parentAuthorities.length > 0 || !this.tpInvite || this.missingNodePermissions;
  }
  setInitialState() {
    this.iamApi.getRecentlyInvited().subscribe(recent => {
      this.recentAuthorities = recent.authorities.filter(a => this.getAvailableGlobalGroups().indexOf(a.authorityName) === -1).slice(0, 6);
      this.initialState = this.getSelectedAuthority();
      this.onInitFinished.emit(true);
    }, error => this.onError.emit(error));
  }
  isInvited(authority) {
    return this.currentPermissions ? !!this.currentPermissions.find(p => p.authority.authorityName === authority.authorityName) : false;
  }
  toggleInvitation(authority) {
    this.dirty = true;
    if (this.isInvited(authority)) {
      this.currentPermissions = this.currentPermissions.filter(p => p.authority.authorityName !== authority.authorityName);
      console.log(this.currentPermissions);
    } else {
      const permission = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
      permission.authority = {
        authorityName: authority.authorityName,
        authorityType: authority.authorityType
      };
      permission.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER];
      this.currentPermissions.push(permission);
    }
  }
  static #_ = this.ɵfac = function SimpleEditInviteComponent_Factory(t) {
    return new (t || SimpleEditInviteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestOrganizationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_11__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_4__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: SimpleEditInviteComponent,
    selectors: [["es-simple-edit-invite"]],
    viewQuery: function SimpleEditInviteComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.orgGroup = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.globalGroup = _t.first);
      }
    },
    inputs: {
      nodes: "nodes",
      fromUpload: "fromUpload"
    },
    outputs: {
      onInitFinished: "onInitFinished",
      onError: "onError"
    },
    decls: 5,
    vars: 5,
    consts: [["message", "SIMPLE_EDIT.INVITE.ERROR_TOOLPERMISSION_MISSING", 4, "ngIf"], ["message", "SIMPLE_EDIT.INVITE.ERROR_PERMISSION_MISSING", 4, "ngIf"], ["message", "SIMPLE_EDIT.INVITE.ERROR_MULTIPLE_PARENTS", 4, "ngIf"], ["message", "SIMPLE_EDIT.INVITE.ERROR_INHERIT", 4, "ngIf"], ["class", "toggles", 4, "ngIf"], ["message", "SIMPLE_EDIT.INVITE.ERROR_TOOLPERMISSION_MISSING"], ["message", "SIMPLE_EDIT.INVITE.ERROR_PERMISSION_MISSING"], ["message", "SIMPLE_EDIT.INVITE.ERROR_MULTIPLE_PARENTS"], ["message", "SIMPLE_EDIT.INVITE.ERROR_INHERIT"], [1, "parent-authorities"], ["class", "authorities", 4, "ngFor", "ngForOf"], [1, "authorities"], [1, "toggles"], [1, "info", "field-group"], [1, "field-group"], ["id", "global-groups-label"], ["role", "group", "aria-labelledby", "global-groups-label"], [1, "toggle-full-size", "toggle-org", 3, "change"], ["orgGroup", "matButtonToggleGroup"], [1, "button-toggle-org", 3, "value"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "field-group", 4, "ngIf"], ["class", "button-toggle-org", 3, "value", "disabled", 4, "ngFor", "ngForOf"], [1, "button-toggle-org", 3, "value", "disabled"], [1, "toggle-full-size", 3, "change"], ["globalGroup", "matButtonToggleGroup"], ["class", "button-toggle-global", 3, "disabled", "value", 4, "ngFor", "ngForOf"], [1, "button-toggle-global", 3, "disabled", "value"], ["id", "last-invitations-label"], ["aria-labelledby", "last-invitations-label", 1, "tiles"], [3, "user", "active", "click", 4, "ngFor", "ngForOf"], [3, "user", "active", "click"]],
    template: function SimpleEditInviteComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, SimpleEditInviteComponent_es_info_message_0_Template, 1, 0, "es-info-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SimpleEditInviteComponent_es_info_message_1_Template, 1, 0, "es-info-message", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, SimpleEditInviteComponent_es_info_message_2_Template, 4, 3, "es-info-message", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, SimpleEditInviteComponent_es_info_message_3_Template, 6, 4, "es-info-message", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, SimpleEditInviteComponent_div_4_Template, 18, 13, "div", 4);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.tpInvite);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.missingNodePermissions && ctx.tpInvite);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.multipleParents);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.inherited && ctx.parentAuthorities.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.hasInvalidState());
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_5__.InfoMessageComponent, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__.MatButtonToggle, _user_tile_user_tile_component__WEBPACK_IMPORTED_MODULE_6__.UserTileComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__.AuthorityNamePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
    styles: ["\n\n.authorities[_ngcontent-%COMP%]:not(:last-child):after {\n  content: \", \";\n}\n\n.parent-authorities[_ngcontent-%COMP%] {\n  font-style: italic;\n  padding: 5px 10px;\n}\n\nmat-button-toggle-group[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n\n.toggle-org[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.toggle-org[_ngcontent-%COMP%]   .button-toggle-org[_ngcontent-%COMP%] {\n  width: 50%;\n  border-top: solid 1px rgba(0, 0, 0, 0.12);\n}\n.toggle-org[_ngcontent-%COMP%]   .button-toggle-org[_ngcontent-%COMP%]:nth-child(0n+1) {\n  width: 33%;\n  border-top: none;\n}\n.toggle-org[_ngcontent-%COMP%]   .button-toggle-org[_ngcontent-%COMP%]:nth-child(0n+2) {\n  width: 33%;\n  border-top: none;\n}\n.toggle-org[_ngcontent-%COMP%]   .button-toggle-org[_ngcontent-%COMP%]:nth-child(0n+3) {\n  width: 33%;\n  border-top: none;\n}\n.toggle-org[_ngcontent-%COMP%]     .mat-button-toggle-label-content {\n  white-space: pre-line;\n  line-height: 1.5em;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.toggles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.toggles[_ngcontent-%COMP%]   .tiles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.toggles[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  font-size: 90%;\n}\n.toggles[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 20px;\n}\n.toggles[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  padding-bottom: 7px;\n  font-weight: bold;\n}\n\n@media screen and (max-width: 600px) {\n  .tiles[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NpbXBsZS1lZGl0LWRpYWxvZy9zaW1wbGUtZWRpdC1pbnZpdGUvc2ltcGxlLWVkaXQtaW52aXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDREk7RUFDSSxhQUFBO0FBRlI7O0FBS0E7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0FBRko7O0FBSUE7RUFDSSxpQkFBQTtBQURKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUFBSjtBQUNJO0VBQ0ksVUFBQTtFQUNBLHlDQUFBO0FBQ1I7QUFFUTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtBQUFaO0FBRlE7RUFDSSxVQUFBO0VBQ0EsZ0JBQUE7QUFJWjtBQU5RO0VBQ0ksVUFBQTtFQUNBLGdCQUFBO0FBUVo7QUFKUTtFQUNJLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFNWjs7QUFGQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUtKO0FBSkk7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQU1SO0FBSkk7RUFDSSxjRHZCUTtBQzZCaEI7QUFKSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0FBTVI7QUFKSTtFQUNJLG1CQUFBO0VBQ0EsaUJBQUE7QUFNUjs7QUFIQTtFQUNJO0lBQ0ksdUJBQUE7RUFNTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9jYXJkL3ZhcmlhYmxlcyc7XG5cbi5hdXRob3JpdGllcyB7XG4gICAgJjpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJywgJztcbiAgICB9XG59XG4ucGFyZW50LWF1dGhvcml0aWVzIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgcGFkZGluZzogNXB4IDEwcHg7XG59XG5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4udG9nZ2xlLW9yZyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgLmJ1dHRvbi10b2dnbGUtb3JnIHtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gICAgfVxuICAgIEBmb3IgJGkgZnJvbSAxIHRvIDQge1xuICAgICAgICAuYnV0dG9uLXRvZ2dsZS1vcmc6bnRoLWNoaWxkKDBuICsgI3skaX0pIHtcbiAgICAgICAgICAgIHdpZHRoOiAzMyU7XG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgIDo6bmctZGVlcCB7XG4gICAgICAgIC5tYXQtYnV0dG9uLXRvZ2dsZS1sYWJlbC1jb250ZW50IHtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICAgICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4udG9nZ2xlcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIC50aWxlcyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG4gICAgLmluZm8ge1xuICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVNtYWxsO1xuICAgIH1cbiAgICAuZmllbGQtZ3JvdXAge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgICB9XG4gICAgbGFiZWwge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogN3B4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAobWFwLWdldCgkd2lkdGhzLCdub3JtYWwnKSkpIHtcbiAgICAudGlsZXMge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_16__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_15__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_16__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 33865:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-license/simple-edit-license.component.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditLicenseComponent: () => (/* binding */ SimpleEditLicenseComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 73064);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 30502);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../core-module/core.module */ 71083);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/node-helper.service */ 76754);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _shared_components_license_source_license_source_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/license-source/license-source.component */ 73815);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button-toggle */ 10727);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 21916);





















const _c0 = ["modeGroup"];
const _c1 = ["licenseGroup"];
function SimpleEditLicenseComponent_es_info_message_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-info-message", 3);
  }
}
function SimpleEditLicenseComponent_es_info_message_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-info-message", 4)(1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SimpleEditLicenseComponent_es_info_message_1_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      ctx_r3.invalid = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.prepare());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "white");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 2, "SIMPLE_EDIT.LICENSE.REPLACE"), " ");
  }
}
function SimpleEditLicenseComponent_div_2_mat_button_toggle_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-button-toggle", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const license_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", license_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 2, "SIMPLE_EDIT.LICENSE.LICENSES." + license_r10));
  }
}
function SimpleEditLicenseComponent_div_2_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-form-field", 18)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "textarea", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function SimpleEditLicenseComponent_div_2_ng_container_20_Template_textarea_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.authorFreetext = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 2, "MDS.AUTHOR_FREETEXT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r8.authorFreetext);
  }
}
function SimpleEditLicenseComponent_div_2_es_license_source_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-license-source", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ccTitleOfWorkChange", function SimpleEditLicenseComponent_div_2_es_license_source_21_Template_es_license_source_ccTitleOfWorkChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r13.ccTitleOfWork = $event);
    })("ccSourceUrlChange", function SimpleEditLicenseComponent_div_2_es_license_source_21_Template_es_license_source_ccSourceUrlChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.ccSourceUrl = $event);
    })("ccProfileUrlChange", function SimpleEditLicenseComponent_div_2_es_license_source_21_Template_es_license_source_ccProfileUrlChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r16.ccProfileUrl = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ccTitleOfWork", ctx_r9.ccTitleOfWork)("ccSourceUrl", ctx_r9.ccSourceUrl)("ccProfileUrl", ctx_r9.ccProfileUrl);
  }
}
function SimpleEditLicenseComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 6)(1, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 8)(5, "mat-button-toggle-group", 9, 10)(7, "mat-button-toggle", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "mat-button-toggle", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 8)(17, "mat-button-toggle-group", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, SimpleEditLicenseComponent_div_2_mat_button_toggle_19_Template, 3, 4, "mat-button-toggle", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, SimpleEditLicenseComponent_div_2_ng_container_20_Template, 6, 4, "ng-container", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, SimpleEditLicenseComponent_div_2_es_license_source_21_Template, 1, 3, "es-license-source", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](6);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 9, "SIMPLE_EDIT.LICENSE.SOURCE_TYPE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", "own");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 11, "SIMPLE_EDIT.LICENSE.SOURCE_OWN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", "foreign");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 13, "SIMPLE_EDIT.LICENSE.SOURCE_FOREIGN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](15, 15, "SIMPLE_EDIT.LICENSE.SET_LICENSE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.allowedLicenses);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _r5.value === "foreign");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.isCCAttributableLicense() && _r5.value === "foreign");
  }
}
class SimpleEditLicenseComponent {
  set nodes(nodes) {
    this._nodes = nodes;
    if (nodes) {
      this.prepare(true);
    }
  }
  constructor(nodeApi, connector, configService, iamApi, nodeHelper, organizationApi, toast) {
    this.nodeApi = nodeApi;
    this.connector = connector;
    this.configService = configService;
    this.iamApi = iamApi;
    this.nodeHelper = nodeHelper;
    this.organizationApi = organizationApi;
    this.toast = toast;
    this.onInitFinished = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.configService.get('simpleEdit.licenses', ['NONE', 'COPYRIGHT_FREE', 'CC_BY', 'CC_0']).subscribe(licenses => this.allowedLicenses = licenses);
    this.connector.hasToolPermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_LICENSE).subscribe(tp => this.tpLicense = tp);
  }
  getESUID() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (yield _this.iamApi.getCurrentUserVCard()).uid;
    })();
  }
  isDirty() {
    // state is untouched -> so not dirty
    if (this.invalid || !this.tpLicense) {
      return false;
    }
    // when was initialy invalid -> the invalid was changed, so it is touched
    if (this.wasInvalid) {
      return true;
    }
    return this.initialLicense !== this.licenseGroup.value || this.initalAuthorFreetext !== this.authorFreetext || this.initialMode !== this.modeGroup.value;
  }
  save() {
    if (!this.isDirty()) {
      return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
        observer.next();
        observer.complete();
        return;
      });
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.forkJoin)(this._nodes.map(n => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.from)(this.getProperties()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(props => this.nodeApi.editNodeMetadataNewVersion(n.ref.id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_LICENSE_UPDATE, props)));
    }));
  }
  prepare(updateInvalid = false) {
    var _this2 = this;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.forkJoin)(this._nodes.map(n => this.nodeApi.getNodeMetadata(n.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]))).subscribe(nodes => {
      this._nodes = nodes.map(n => n.node);
      const license = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE, null, 'NONE', false);
      this.authorFreetext = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT, '', '', false);
      this.ccTitleOfWork = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK, '');
      this.ccProfileUrl = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL, '');
      this.ccSourceUrl = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL, '');
      const vcard = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.VCard(this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR, '', '', false));
      let isValid = true;
      if (license) {
        if (license.startsWith('CC_BY')) {
          const version = this.nodeHelper.getValueForAll(this._nodes, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_VERSION, null, null, false);
          isValid = version === '4.0';
        }
        if (this.allowedLicenses.indexOf(license) === -1) {
          isValid = false;
        }
      } else {
        isValid = false;
      }
      this.initialLicense = license;
      this.initalAuthorFreetext = this.authorFreetext;
      setTimeout( /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (updateInvalid) {
          _this2.invalid = !_this2.fromUpload && !isValid;
          _this2.wasInvalid = _this2.invalid;
        }
        if (_this2.tpLicense && _this2.modeGroup) {
          if (_this2.fromUpload) {
            _this2.modeGroup.value = 'own';
          } else {
            const esuid = yield _this2.getESUID();
            if (_this2.modeGroup) {
              if (esuid && esuid === vcard.uid) {
                _this2.modeGroup.value = 'own';
              } else {
                _this2.modeGroup.value = 'foreign';
              }
            }
          }
          if (_this2.modeGroup) {
            _this2.initialMode = _this2.modeGroup.value;
            if (isValid) {
              _this2.licenseGroup.value = license;
            } else {
              _this2.licenseGroup.value = 'NONE';
            }
          }
        }
        _this2.onInitFinished.emit();
      }));
    }, error => this.onError.emit(error));
  }
  getProperties() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const properties = {};
      if (_this3.modeGroup.value === 'own') {
        const vcard = yield _this3.iamApi.getCurrentUserVCard();
        properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR] = [vcard.toVCardString()];
        properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT] = null;
      } else {
        properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR] = null;
        properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT] = [_this3.authorFreetext];
      }
      if (_this3.isCCAttributableLicense()) {
        if (_this3.ccTitleOfWork) {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK] = [_this3.ccTitleOfWork];
        } else {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_TITLE_OF_WORK] = null;
        }
        if (_this3.ccSourceUrl) {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL] = [_this3.ccSourceUrl];
        } else {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_SOURCE_URL] = null;
        }
        if (_this3.ccProfileUrl) {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL] = [_this3.ccProfileUrl];
        } else {
          properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_PROFILE_URL] = null;
        }
      }
      properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE] = [_this3.licenseGroup.value];
      properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE_CC_VERSION] = _this3.licenseGroup.value === 'CC_BY' ? ['4.0'] : null;
      return properties;
    })();
  }
  isCCAttributableLicense() {
    return this.licenseGroup && this.licenseGroup.value && this.licenseGroup.value.startsWith('CC_BY');
  }
  ngOnInit() {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!(yield _this4.getESUID())) {
        console.warn('Current user has no esuid, detecting owner of license is impossible');
      }
    })();
  }
  static #_ = this.ɵfac = function SimpleEditLicenseComponent_Factory(t) {
    return new (t || SimpleEditLicenseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestOrganizationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: SimpleEditLicenseComponent,
    selectors: [["es-simple-edit-license"]],
    viewQuery: function SimpleEditLicenseComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.modeGroup = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.licenseGroup = _t.first);
      }
    },
    inputs: {
      fromUpload: "fromUpload",
      nodes: "nodes"
    },
    outputs: {
      onInitFinished: "onInitFinished",
      onError: "onError"
    },
    decls: 3,
    vars: 3,
    consts: [["message", "SIMPLE_EDIT.LICENSE.ERROR_TOOLPERMISSION_MISSING", 4, "ngIf"], ["message", "SIMPLE_EDIT.LICENSE.INVALID_STATE", 4, "ngIf"], ["class", "license", 4, "ngIf"], ["message", "SIMPLE_EDIT.LICENSE.ERROR_TOOLPERMISSION_MISSING"], ["message", "SIMPLE_EDIT.LICENSE.INVALID_STATE"], ["mat-raised-button", "", 3, "color", "click"], [1, "license"], ["id", "material-source-label"], [1, "field-group"], ["aria-labelledby", "material-source-label"], ["modeGroup", "matButtonToggleGroup"], [3, "value"], ["id", "material-license-label"], ["aria-labelledby", "material-license-label"], ["licenseGroup", "matButtonToggleGroup"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "field-group", 3, "ccTitleOfWork", "ccSourceUrl", "ccProfileUrl", "ccTitleOfWorkChange", "ccSourceUrlChange", "ccProfileUrlChange", 4, "ngIf"], [1, "authorFreetext"], ["matInput", "", "cdkTextareaAutosize", "", "id", "authorFreetext", "cdkAutosizeMinRows", "3", "cdkAutosizeMaxRows", "5", 3, "ngModel", "ngModelChange"], [1, "field-group", 3, "ccTitleOfWork", "ccSourceUrl", "ccProfileUrl", "ccTitleOfWorkChange", "ccSourceUrlChange", "ccProfileUrlChange"]],
    template: function SimpleEditLicenseComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SimpleEditLicenseComponent_es_info_message_0_Template, 1, 0, "es-info-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SimpleEditLicenseComponent_es_info_message_1_Template, 4, 4, "es-info-message", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, SimpleEditLicenseComponent_div_2_Template, 22, 17, "div", 2);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.tpLicense);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.invalid && ctx.tpLicense);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_4__.InfoMessageComponent, _shared_components_license_source_license_source_component__WEBPACK_IMPORTED_MODULE_5__.LicenseSourceComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__.MatButtonToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_18__.CdkTextareaAutosize, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
    styles: ["\n\nes-info-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 10px auto 0 auto;\n}\n\n.license[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.license[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%] {\n  padding-bottom: 20px;\n}\n.license[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  padding-bottom: 7px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NpbXBsZS1lZGl0LWRpYWxvZy9zaW1wbGUtZWRpdC1saWNlbnNlL3NpbXBsZS1lZGl0LWxpY2Vuc2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGSTtFQUNJLHdCQUFBO0FBRFI7O0FBSUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFESjtBQUVJO0VBQ0ksb0JBQUE7QUFBUjtBQUVJO0VBQ0ksbUJBQUE7RUFDQSxpQkFBQTtBQUFSIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbmVzLWluZm8tbWVzc2FnZSB7XG4gICAgYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luOiAxMHB4IGF1dG8gMCBhdXRvO1xuICAgIH1cbn1cbi5saWNlbnNlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLmZpZWxkLWdyb3VwIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIGxhYmVsIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDdweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_20__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_20__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 51384:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/simple-edit-metadata/simple-edit-metadata.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleEditMetadataComponent: () => (/* binding */ SimpleEditMetadataComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 30502);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../core-module/core.module */ 71083);
/* harmony import */ var _features_mds_types_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../features/mds/types/types */ 97801);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/toast */ 93366);
/* harmony import */ var _mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);











const _c0 = ["mds"];
class SimpleEditMetadataComponent {
  get nodes() {
    return this._nodes;
  }
  set nodes(value) {
    // If nodes are changed and the mds is already rendered, force an update of values.
    if (this._nodes && this.mds) {
      void this.mds.reInit();
    }
    this._nodes = value;
  }
  constructor(nodeApi, toast) {
    this.nodeApi = nodeApi;
    this.toast = toast;
    this.BulkBehaviour = _features_mds_types_types__WEBPACK_IMPORTED_MODULE_1__.BulkBehavior;
    this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
  }
  isDirty() {
    if (this.mds.mdsRef) {
      return this.mds.mdsRef.isDirty();
    }
    return this.mds.mdsEditorInstance.getHasUserChanges();
  }
  /**
   * validate the form data
   * return true if data is valid, false otherwise
   */
  validate() {
    if (!this.mds.mdsEditorInstance.getIsValid()) {
      this.mds.mdsEditorInstance.showMissingRequiredWidgets();
      return false;
    }
    return true;
  }
  save() {
    if (!this.isDirty()) {
      // emit null so that next and complete get's called
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(null);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)(this.nodes.map(n => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.from)(this.mds.getValues(n)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(props => {
      delete props[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CM_NAME];
      return this.nodeApi.editNodeMetadataNewVersion(n.ref.id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.COMMENT_METADATA_UPDATE, props);
    })))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => {}));
  }
  static #_ = this.ɵfac = function SimpleEditMetadataComponent_Factory(t) {
    return new (t || SimpleEditMetadataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_2__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: SimpleEditMetadataComponent,
    selectors: [["es-simple-edit-metadata"]],
    viewQuery: function SimpleEditMetadataComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.mds = _t.first);
      }
    },
    inputs: {
      nodes: "nodes",
      fromUpload: "fromUpload"
    },
    outputs: {
      onError: "onError"
    },
    decls: 2,
    vars: 4,
    consts: [["groupId", "io_simple", 1, "mds-simple-editor", 3, "embedded", "allowReplacing", "bulkBehaviour", "nodes", "onCancel"], ["mds", ""]],
    template: function SimpleEditMetadataComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-mds-editor-wrapper", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("onCancel", function SimpleEditMetadataComponent_Template_es_mds_editor_wrapper_onCancel_0_listener() {
          return ctx.onError.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("embedded", true)("allowReplacing", !ctx.fromUpload)("bulkBehaviour", ctx.fromUpload ? ctx.BulkBehaviour.Replace : ctx.BulkBehaviour.Default)("nodes", ctx.nodes);
      }
    },
    dependencies: [_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorWrapperComponent],
    styles: ["\n\n  .mds-simple-editor es-mds-editor-view h3 {\n  display: none !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NpbXBsZS1lZGl0LWRpYWxvZy9zaW1wbGUtZWRpdC1tZXRhZGF0YS9zaW1wbGUtZWRpdC1tZXRhZGF0YS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0ZJO0VBQ0ksd0JBQUE7QUFEUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46Om5nLWRlZXAge1xuICAgIC5tZHMtc2ltcGxlLWVkaXRvciBlcy1tZHMtZWRpdG9yLXZpZXcgaDMge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_10__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 81168:
/*!*****************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/simple-edit-dialog/user-tile/user-tile.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTileComponent: () => (/* binding */ UserTileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../shared/components/user-avatar/user-avatar.component */ 98588);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/pipes/authority-name.pipe */ 99994);







class UserTileComponent {
  constructor(router, translate, sanitizer) {
    this.router = router;
    this.translate = translate;
    this.sanitizer = sanitizer;
    this.active = false;
  }
  static #_ = this.ɵfac = function UserTileComponent_Factory(t) {
    return new (t || UserTileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: UserTileComponent,
    selectors: [["es-user-tile"]],
    inputs: {
      user: "user",
      active: "active"
    },
    decls: 5,
    vars: 6,
    consts: [["matRipple", "", 1, "tile"], ["size", "xsmall", 3, "user"], [1, "name"]],
    template: function UserTileComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "es-user-avatar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "authorityName");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.active);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("user", ctx.user);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, ctx.user));
      }
    },
    dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatRipple, _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_0__.UserAvatarComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_1__.AuthorityNamePipe],
    styles: ["\n\n.tile[_ngcontent-%COMP%] {\n  width: 167px;\n  height: 45px;\n  margin: 5px;\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  border-radius: 2px;\n  background-color: #fff;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.tile[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%], .tile[_ngcontent-%COMP%]   es-user-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.tile[_ngcontent-%COMP%]   es-user-avatar[_ngcontent-%COMP%] {\n  margin-bottom: -4px;\n}\n.tile[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-size: 90%;\n  text-align: left;\n  padding-left: 15px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.25em;\n  max-height: 2.5em;\n  -webkit-line-clamp: 2; \n\n  -webkit-box-orient: vertical;\n  \n\n}\n.tile.active[_ngcontent-%COMP%] {\n  color: var(--light-primary-text);\n  background-color: var(--primary);\n}\n.tile.active[_ngcontent-%COMP%]:hover {\n  background-color: rgb(var(--palette-primary-50));\n}\n.tile[_ngcontent-%COMP%]:hover {\n  background-color: rgba(var(--palette-primary-500-no-rgb), 0.08);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NpbXBsZS1lZGl0LWRpYWxvZy91c2VyLXRpbGUvdXNlci10aWxlLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vcHJvamVjdHMvZWR1LXNoYXJpbmctdWkvYXNzZXRzL3Njc3MvbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JEbURpQjtFQ2xEakIsc0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQ1hBLGVBQUE7RUFDQSx5QkFBQTtFQUdBLGlCQUFBO0VBQ0Esd0NBQUE7QURZSjtBQUpJOztFQUVJLGFBQUE7RUFDQSxtQkFBQTtBQU1SO0FBSkk7RUFDSSxtQkFBQTtBQU1SO0FBSkk7RUFDSSxjRENRO0VDQVIsZ0JBQUE7RUFDQSxrQkFBQTtFQ2hCSixnQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJEWTRCLEVDWkEsNEJBQUE7RUFDNUIsNEJBQUE7RUFDQSxzQkFBQTtBRHVCSjtBQVhJO0VBQ0ksZ0NFeEJRO0VGeUJSLGdDRTlCRTtBRjJDVjtBQVpRO0VBQ0ksZ0RBQUE7QUFjWjtBQVhJO0VBQ0ksK0RESmdCO0FDaUJ4QiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4udGlsZSB7XG4gICAgd2lkdGg6IDE2N3B4O1xuICAgIGhlaWdodDogNDVweDtcbiAgICBtYXJnaW46IDVweDtcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcbiAgICBib3JkZXItcmFkaXVzOiAkYnV0dG9uQm9yZGVyUmFkaXVzO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgQGluY2x1ZGUgY2xpY2thYmxlKCk7XG4gICAgLm5hbWUsXG4gICAgZXMtdXNlci1hdmF0YXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBlcy11c2VyLWF2YXRhciB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC00cHg7XG4gICAgfVxuICAgIC5uYW1lIHtcbiAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVTbWFsbDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICAgICAgICBAaW5jbHVkZSBsaW1pdExpbmVDb3VudCgyLCAxLjI1KTtcbiAgICB9XG4gICAgJi5hY3RpdmUge1xuICAgICAgICBjb2xvcjogJHRleHRPblByaW1hcnk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYih2YXIoLS1wYWxldHRlLXByaW1hcnktNTApKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDtcbiAgICB9XG59XG4iLCJAbWl4aW4gY2xpY2thYmxlKCkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5AbWl4aW4gbGltaXRMaW5lQ291bnQoJGNvdW50LCAkbGluZUhlaWdodDogMSkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgbWF4LWhlaWdodDogJGNvdW50ICogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6ICRjb3VudDsgLyogbnVtYmVyIG9mIGxpbmVzIHRvIHNob3cgKi9cbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC8qIGF1dG9wcmVmaXhlcjogb2ZmICovXG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3coJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0JvdHRvbSgkb3BhY2l0eTogMC4xKSB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93U21hbGwoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd01lZGl1bUxhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlLCAkb3BhY2l0eTogMC42KSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTY3JvbGxiYXIoKSB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIG1heC13aWR0aDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgLy8gLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB9XG59XG5AbWl4aW4gcmVtb3ZlRGVmYXVsdEZvY3VzKCkge1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgfVxufVxuLy8gQXBwbHkgdGhlIGNvbnRlbnQgc3R5bGVzIGluIGNvbnRyYXN0IG1vZGUuIFRoaXMgaXMganVzdCBlbm91Z2ggY29udHJhc3QgdG8gYmUgV0NBRyBjb21wbGllbnQgLS0tXG4vLyBub3QgYSBoaWdoLWNvbnRyYXN0IG1vZGUuXG4vL1xuLy8gQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyBmb3IgdXNlIGluIGVuY2Fwc3VsYXRlZCBjb21wb25lbnQgc3R5bGVzLCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZSB7XG4vLyAgICAgICAgIC8vIFN0eWxlcyB0byBhcHBseSBpbiBjb250cmFzdCBtb2RlXG4vLyAgICAgfVxuLy8gVG8gdXMgaW4gZ2xvYmFsIGNvbnRleHQsIHBhc3MgJ2dsb2JhbCcgYXMgZmlyc3QgYXJndW1lbnQsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlKGdsb2JhbCkgeyAvKiAuLi4gKi8gfVxuQG1peGluIGNvbnRyYXN0TW9kZSgkc2NvcGU6IGVuY2Fwc3VsYXRlZCkge1xuICAgICRjb250cmFzdE1vZGVTZWxlY3RvcjogJ2JvZHkuZXMtY29udHJhc3QtbW9kZSc7XG4gICAgQGlmICRzY29wZSA9PSBlbmNhcHN1bGF0ZWQge1xuICAgICAgICA6aG9zdC1jb250ZXh0KCN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSkgJiB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHNjb3BlID09IGdsb2JhbCB7XG4gICAgICAgICN7aWYoJiwgJyN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSAmJywgJGNvbnRyYXN0TW9kZVNlbGVjdG9yKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIFwiSW52YWxpZCBzY29wZSAjeyRzY29wZX0uXCI7XG4gICAgfVxufVxuQG1peGluIGJsdXJJbWFnZSgkYmx1clN0cmVuZ3RoOiAyNXB4KSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB0b3A6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB3aWR0aDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIHotaW5kZXg6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmaWx0ZXI6IGJsdXIoJGJsdXJTdHJlbmd0aCk7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb3BhY2l0eTogMC43O1xufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_simple-edit-dialog_simple-edit-dialog_module_ts.js.map