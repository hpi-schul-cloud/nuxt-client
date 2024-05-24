"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_send-feedback-dialog_send-feedback-dialog_module_ts"],{

/***/ 43372:
/*!***************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/send-feedback-dialog/send-feedback-dialog-data.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendFeedbackDialogData: () => (/* binding */ SendFeedbackDialogData)
/* harmony export */ });
class SendFeedbackDialogData {}

/***/ }),

/***/ 9350:
/*!********************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/send-feedback-dialog/send-feedback-dialog.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendFeedbackDialogComponent: () => (/* binding */ SendFeedbackDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mds/mds-editor/mds-editor-instance.service */ 27201);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _mds_mds_editor_mds_editor_core_mds_editor_core_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../mds/mds-editor/mds-editor-core/mds-editor-core.component */ 42068);
/* harmony import */ var _send_feedback_dialog_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./send-feedback-dialog-data */ 43372);













class SendFeedbackDialogComponent {
  constructor(data, dialogRef, route, feedbackService, toast, mdsEditorInstance) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.route = route;
    this.feedbackService = feedbackService;
    this.toast = toast;
    this.mdsEditorInstance = mdsEditorInstance;
    this.dialogRef.patchState({
      isLoading: true
    });
  }
  ngOnInit() {
    this.initButtons();
    void this.mdsEditorInstance.initWithoutNodes('material_feedback', undefined, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY, 'form', {});
    this.mdsEditorInstance.mdsInflated.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.first)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.delay)(0)).subscribe(() => {
      this.dialogRef.patchState({
        isLoading: false
      });
    });
  }
  initButtons() {
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.dialogRef.close(null)), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('FEEDBACK.SAVE', {
      color: 'primary'
    }, () => this.addFeedback())];
    this.dialogRef.patchConfig({
      buttons
    });
    this.mdsEditorInstance.observeCanSave().subscribe(canSave => buttons[1].disabled = !canSave);
  }
  addFeedback() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const values = yield _this.mdsEditorInstance.save();
      _this.dialogRef.patchState({
        isLoading: true
      });
      try {
        yield _this.feedbackService.addFeedback({
          repository: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.HOME_REPOSITORY,
          node: _this.data.node.ref.id,
          body: values
        }).toPromise();
      } catch (e) {
        _this.toast.error(e);
      }
      _this.dialogRef.close();
      const queryParams = yield _this.route.queryParams.toPromise();
      if (queryParams.feedbackClose) {
        window.close();
      }
    })();
  }
  static #_ = this.ɵfac = function SendFeedbackDialogComponent_Factory(t) {
    return new (t || SendFeedbackDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_3__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_4__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_12__.FeedbackV1Service), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_2__.MdsEditorInstanceService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: SendFeedbackDialogComponent,
    selectors: [["es-send-feedback-dialog"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵProvidersFeature"]([_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_2__.MdsEditorInstanceService])],
    decls: 1,
    vars: 0,
    template: function SendFeedbackDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "es-mds-editor-core");
      }
    },
    dependencies: [_mds_mds_editor_mds_editor_core_mds_editor_core_component__WEBPACK_IMPORTED_MODULE_6__.MdsEditorCoreComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1786:
/*!*****************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/send-feedback-dialog/send-feedback-dialog.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendFeedbackDialogComponent: () => (/* reexport safe */ _send_feedback_dialog_component__WEBPACK_IMPORTED_MODULE_2__.SendFeedbackDialogComponent),
/* harmony export */   SendFeedbackDialogModule: () => (/* binding */ SendFeedbackDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mds/mds.module */ 77894);
/* harmony import */ var _send_feedback_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./send-feedback-dialog.component */ 9350);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);





class SendFeedbackDialogModule {
  static #_ = this.ɵfac = function SendFeedbackDialogModule_Factory(t) {
    return new (t || SendFeedbackDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: SendFeedbackDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SendFeedbackDialogModule, {
    declarations: [_send_feedback_dialog_component__WEBPACK_IMPORTED_MODULE_2__.SendFeedbackDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_send-feedback-dialog_send-feedback-dialog_module_ts.js.map