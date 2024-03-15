"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_file-upload-progress-dialog_file-upload-progress-dial-16451f"],{

/***/ 93400:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-upload-progress-dialog/file-upload-progress-dialog-data.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUploadProgressDialogData: () => (/* binding */ FileUploadProgressDialogData)
/* harmony export */ });
class FileUploadProgressDialogData {}

/***/ }),

/***/ 53152:
/*!**********************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-upload-progress-dialog/file-upload-progress-dialog.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUploadProgressDialogComponent: () => (/* binding */ FileUploadProgressDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 36520);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 30502);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _time_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time.pipe */ 44422);
/* harmony import */ var _file_upload_progress_dialog_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./file-upload-progress-dialog-data */ 93400);


















const _c0 = ["existingFiles"];
function FileUploadProgressDialogComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "div", 15);
  }
}
function FileUploadProgressDialogComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("width", item_r3.progress.progress + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("determinate-finished", item_r3.progress.progress >= 100);
  }
}
function FileUploadProgressDialogComponent_div_0_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](2, 1, "WORKSPACE.UPLOAD_ERROR." + item_r3.error.key, item_r3.error.variables));
  }
}
const _c1 = function (a0) {
  return {
    time: a0
  };
};
function FileUploadProgressDialogComponent_div_0_div_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "formatTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](2, 1, "WORKSPACE.UPLOAD_REMAINING", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](6, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 4, item_r3.progress.remaining))));
  }
}
function FileUploadProgressDialogComponent_div_0_div_11_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "WORKSPACE.UPLOAD_FINISHING"));
  }
}
function FileUploadProgressDialogComponent_div_0_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, FileUploadProgressDialogComponent_div_0_div_11_span_1_Template, 4, 8, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, FileUploadProgressDialogComponent_div_0_div_11_span_2_Template, 3, 3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "formatSize");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "formatSize");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3.progress.remaining > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3.progress.remaining <= 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"]("(", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 4, item_r3.progress.loaded), " / ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 6, item_r3.progress.total), ")");
  }
}
function FileUploadProgressDialogComponent_div_0_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 20)(1, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function FileUploadProgressDialogComponent_div_0_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21)(1, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function FileUploadProgressDialogComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "file_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 5)(5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, FileUploadProgressDialogComponent_div_0_div_7_Template, 1, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, FileUploadProgressDialogComponent_div_0_div_8_Template, 2, 4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, FileUploadProgressDialogComponent_div_0_span_10_Template, 3, 4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, FileUploadProgressDialogComponent_div_0_div_11_Template, 7, 8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, FileUploadProgressDialogComponent_div_0_div_13_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, FileUploadProgressDialogComponent_div_0_div_14_Template, 3, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](item_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3.progress.progress >= 0 && item_r3.progress.progress < 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("visibility", item_r3.progress.loaded || item_r3.error ? "" : "hidden");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", item_r3.progress.loaded);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !item_r3.progress.loaded && item_r3.progress.progress >= 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !item_r3.progress.loaded && item_r3.progress.progress < 0);
  }
}
function FileUploadProgressDialogComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-radio-group", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function FileUploadProgressDialogComponent_ng_template_1_Template_mat_radio_group_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r17.keep = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-radio-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "mat-radio-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const multiple_r16 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r2.keep);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 5, "WORKSPACE.UPLOAD_EXISTS." + (multiple_r16 ? "MULTIPLE" : "SINGLE") + "_OVERWRITE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 7, "WORKSPACE.UPLOAD_EXISTS." + (multiple_r16 ? "MULTIPLE" : "SINGLE") + "_KEEP"), " ");
  }
}
/**
 * A dialog that handles uploading a given list of files and shows a progress bar per file to the
 * user.
 */
class FileUploadProgressDialogComponent {
  constructor(data, dialogRef, nodeService, nodeApi, dialogs, translate) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.nodeService = nodeService;
    this.nodeApi = nodeApi;
    this.dialogs = dialogs;
    this.translate = translate;
    this.progress = [];
    this.resultList = [];
    this.error = false;
    this.processed = 0;
    this.keep = true;
  }
  ngOnInit() {
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => this._cancel())]
    });
    for (const file of this.data.files) {
      this.progress.push({
        name: file.name,
        progress: {
          progress: 0
        }
      });
    }
    // check for existing child nodes with the same file name
    this._existingNodes().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(existingNodes => {
      // open the dialog only if this dialog is still open...
      if (this.dialogRef.getLifecycleState() !== 'open') return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(false);
      // if some files are already present as nodes then inform the user and ask whether
      // to keep or overwrite the files
      this.existingNodes = existingNodes;
      if (existingNodes.length > 0) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.from)(this._openExistingDialog(existingNodes));
      }
      // if there are no existing nodes of the same name just proceed and upload
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(true);
    })).subscribe(doUpload => {
      if (doUpload) {
        this._updateSubtitle();
        this._upload(0);
      } else {
        this._cancel();
      }
    });
  }
  _openExistingDialog(existingNodes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const multiple = existingNodes.length > 1;
      let fileName, message, messageParameters;
      if (multiple) {
        fileName = null;
        message = 'WORKSPACE.UPLOAD_EXISTS.MULTIPLE';
        messageParameters = null;
      } else {
        fileName = existingNodes[0].name;
        message = 'WORKSPACE.UPLOAD_EXISTS.SINGLE';
        messageParameters = {
          fileName: fileName
        };
      }
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'WORKSPACE.UPLOAD_EXISTS.TITLE',
        message,
        messageParameters,
        contentTemplate: _this.existingFilesRef,
        context: {
          $implicit: multiple
        },
        buttons: [{
          label: 'CANCEL',
          config: {
            color: 'standard'
          }
        }, {
          label: 'WORKSPACE.UPLOAD_EXISTS.UPLOAD',
          config: {
            color: 'primary'
          }
        }]
      });
      const result = yield dialogRef.afterClosed().toPromise();
      return result !== 'CANCEL';
    })();
  }
  _cancel() {
    // first check whether the dialog has already been closed
    if (this.dialogRef.getLifecycleState() !== 'open') return;
    if (this.resultList.length > 0) {
      // Close with nodes uploaded until now. Could also delete these nodes.
      this.dialogRef.close(this.resultList);
    } else {
      this.dialogRef.close(null);
    }
  }
  /**
   * Returns all child nodes of the parent which match the file name of a
   * file to be uploaded.
   * @private
   */
  _existingNodes() {
    // get all children to compare against them
    return this.nodeService.getChildren(this._getParent(), [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.FILTER_FILES], {
      propertyFilter: []
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(children => {
      let existing = [];
      const fileNames = Array.from(this.data.files).map(file => file.name);
      const childNodes = children.nodes;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        const childFileName = childNode.name;
        if (fileNames.some(fName => fName == childFileName)) {
          existing.push(childNode);
        }
      }
      return existing;
    }));
  }
  _getParent() {
    return this.data.parent ? this.data.parent.ref.id : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.INBOX;
  }
  _upload(number) {
    if (number >= this.data.files.length) {
      if (this.error) {
        this.dialogRef.patchConfig({
          closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.Closable.Casual
        });
      } else {
        this._cancel();
      }
      return;
    }
    const file = this.data.files.item(number);
    if (!file.type && !file.size) {
      setTimeout(() => {
        this.progress[number].progress.progress = -1;
        this.progress[number].error = {
          key: 'FORMAT'
        };
        this.error = true;
        this._upload(number + 1);
      }, 50);
      return;
    }
    const nextUpload = node => () => {
      this.resultList.push(node);
      this.progress[number].progress.progress = 100;
      this.processed++;
      this._updateSubtitle();
      this._upload(number + 1);
    };
    const nextError = node => error => {
      this.error = true;
      this.progress[number].error = this._mapError(error, node);
      this.progress[number].progress.progress = -1;
      this._upload(number + 1);
    };
    // check whether the file is already existing and if so
    // if the user also chose to overwrite the old one only create a new version
    const existingNode = this.existingNodes.find(node => node.name == file.name);
    if (existingNode && !this.keep) {
      this.nodeApi.changeContent(existingNode.ref.repo, existingNode.ref.id, 'auto', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_CONTENT_UPDATE, {
        file
      }).subscribe(nextUpload(existingNode), nextError(existingNode));
    } else {
      this.nodeService.createNode(this._getParent(), _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_TYPE_IO, [], _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.createNameProperty(file.name), this.keep).subscribe(data => {
        this.nodeService.uploadNodeContent(data.node.ref.id, file, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_MAIN_FILE_UPLOAD, 'auto', progress => {
          progress.progress = Math.round(progress.progress * 100);
          this.progress[number].progress = progress;
        }).subscribe(nextUpload(data.node), nextError(data.node));
      }, nextError(null));
    }
  }
  _updateSubtitle() {
    this.translate.get('WORKSPACE.UPLOAD_SUBTITLE', {
      progress: this.processed,
      total: this.progress.length
    }).subscribe(subtitle => this.dialogRef.patchConfig({
      subtitle
    }));
  }
  _mapError(error, node = null) {
    // delete the now orphan node since it's empty
    if (node) {
      this.nodeService.deleteNode(node.ref.id, false).subscribe(() => {});
    }
    let i18nName;
    let variables;
    if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_VIRUS_SCAN_FAILED_EXCEPTION)) {
      i18nName = 'VIRUS_SCAN_FAILED';
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_VIRUS_EXCEPTION)) {
      i18nName = 'VIRUS';
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_MIMETYPE_VERIFICATION_EXCEPTION)) {
      i18nName = 'MIMETYPE_VERIFICATION';
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_NODE_FILE_SIZE_EXCEEDED_EXCEPTION)) {
      i18nName = 'FILE_SIZE_EXCEEDED';
      try {
        const errorData = JSON.parse(error.response);
        variables = {
          actualSize: new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.FormatSizePipe(this.translate).transform(errorData.details.actualSize),
          maxSize: new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.FormatSizePipe(this.translate).transform(errorData.details.maxSize)
        };
      } catch (e) {
        console.warn(e);
      }
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_FILE_EXTENSION_VERIFICATION_EXCEPTION)) {
      i18nName = 'FILETYPE_VERIFICATION';
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.errorMatchesAny(error, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CONTENT_QUOTA_EXCEPTION)) {
      i18nName = 'QUOTA';
    } else {
      i18nName = 'UNKNOWN';
    }
    return {
      key: i18nName,
      variables
    };
  }
  static #_ = this.ɵfac = function FileUploadProgressDialogComponent_Factory(t) {
    return new (t || FileUploadProgressDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_3__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_13__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_4__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: FileUploadProgressDialogComponent,
    selectors: [["es-file-upload-progress-dialog"]],
    viewQuery: function FileUploadProgressDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.existingFilesRef = _t.first);
      }
    },
    decls: 3,
    vars: 1,
    consts: [["class", "group", 4, "ngFor", "ngForOf"], ["existingFiles", ""], [1, "group"], [1, "icon"], [1, "material-icons"], [1, "center"], [1, "fileName"], ["class", "loading", 4, "ngIf"], ["class", "progress", 4, "ngIf"], [1, "info"], ["class", "info-error", 4, "ngIf"], [4, "ngIf"], [1, "right"], ["class", "done success", 4, "ngIf"], ["class", "done failed", 4, "ngIf"], [1, "loading"], [1, "progress"], [1, "determinate"], [1, "info-error"], [1, "size"], [1, "done", "success"], [1, "done", "failed"], [1, "existing-radio-group", 3, "ngModel", "ngModelChange"], [1, "existing-radio-button", 3, "value"]],
    template: function FileUploadProgressDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, FileUploadProgressDialogComponent_div_0_Template, 15, 9, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, FileUploadProgressDialogComponent_ng_template_1_Template, 7, 9, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.progress);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__.MatRadioButton, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_12__.FormatSizePipe, _time_pipe__WEBPACK_IMPORTED_MODULE_5__.TimePipe],
    styles: ["\n\n.loading[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.group[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  margin-bottom: 10px;\n}\n.group[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  color: #aaa;\n  margin-top: 5px;\n}\n.group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%] {\n  flex-direction: column;\n  flex-grow: 1;\n}\n.group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]   .fileName[_ngcontent-%COMP%] {\n  word-break: break-all;\n  padding-bottom: 4px;\n  height: 1.5em;\n  overflow: hidden;\n}\n.group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]   .fileName[_ngcontent-%COMP%], .group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  padding-left: 10px;\n}\n.group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  font-size: 8pt;\n  font-weight: bold;\n  padding-top: 2px;\n  min-height: 1.3rem;\n}\n.group[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .size[_ngcontent-%COMP%] {\n  font-weight: normal;\n  padding-left: 0.5em;\n  color: var(--textLight);\n}\n.group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n.group[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  align-items: center;\n  width: 80px;\n}\n.group[_ngcontent-%COMP%]   .done[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n.group[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%] {\n  color: #40bf8e;\n}\n.group[_ngcontent-%COMP%]   .failed[_ngcontent-%COMP%] {\n  color: #cd2457;\n}\n.group[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 10px;\n  background-color: var(--palette-primary-100);\n  position: relative;\n  height: 4px;\n  border-radius: 2px;\n  overflow: hidden;\n}\n.group[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]   .determinate[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background-color: var(--primary);\n  transition: width 0.3s linear;\n}\n\n.groupColumn[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n\n.existing-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 10px 0;\n  align-items: flex-start;\n}\n\n.existing-radio-button[_ngcontent-%COMP%] {\n  margin: 3px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL2ZpbGUtdXBsb2FkLXByb2dyZXNzLWRpYWxvZy9maWxlLXVwbG9hZC1wcm9ncmVzcy1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxjQUFBO0FBQUo7QUFDSTtFQUNJLGFBQUE7QUFDUjs7QUFHQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFBSjtBQUNJO0VBQ0ksV0RJUTtFQ0hSLGVBQUE7QUFDUjtBQUNJO0VBQ0ksc0JBQUE7RUFDQSxZQUFBO0FBQ1I7QUFBUTtFQUNJLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFFWjtBQUFROztFQUVJLGtCQUFBO0FBRVo7QUFBUTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFFWjtBQURZO0VBQ0ksbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCRHRCSjtBQ3lCWjtBQUNJO0VBQ0ksYUFBQTtBQUNSO0FBQ0k7RUFDSSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQUNSO0FBQ0k7RUFDSSxxQkNuREU7QURvRFY7QUFDSTtFQUNJLGNEbUJjO0FDbEJ0QjtBQUNJO0VBQ0ksY0RrQmM7QUNqQnRCO0FBQ0k7RUFDSSxXQUFBO0VBQ0EsY0FBQTtFQUNBLDRDQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNSO0FBQVE7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsNkJBQUE7QUFFWjs7QUFFQTtFQUNJLHNCQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4ubG9hZGluZyB7XG4gICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbn1cblxuLmdyb3VwIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgLmljb24ge1xuICAgICAgICBjb2xvcjogJHRleHRWZXJ5TGlnaHQ7XG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICB9XG4gICAgLmNlbnRlciB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgLmZpbGVOYW1lIHtcbiAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA0cHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEuNWVtO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgfVxuICAgICAgICAuZmlsZU5hbWUsXG4gICAgICAgIC5pbmZvIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICAgICAgfVxuICAgICAgICAuaW5mbyB7XG4gICAgICAgICAgICBmb250LXNpemU6IDhwdDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDEuM3JlbTtcbiAgICAgICAgICAgIC5zaXplIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMC41ZW07XG4gICAgICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICAucmlnaHQge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB3aWR0aDogODBweDtcbiAgICB9XG4gICAgLmRvbmUge1xuICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgfVxuICAgIC5zdWNjZXNzIHtcbiAgICAgICAgY29sb3I6ICRjb2xvclN0YXR1c1Bvc2l0aXZlO1xuICAgIH1cbiAgICAuZmFpbGVkIHtcbiAgICAgICAgY29sb3I6ICRjb2xvclN0YXR1c05lZ2F0aXZlO1xuICAgIH1cbiAgICAucHJvZ3Jlc3Mge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGhlaWdodDogNHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIC5kZXRlcm1pbmF0ZSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzIGxpbmVhcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi5ncm91cENvbHVtbiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmV4aXN0aW5nLXJhZGlvLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luOiAxMHB4IDA7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5leGlzdGluZy1yYWRpby1idXR0b24ge1xuICAgIG1hcmdpbjogM3B4O1xufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 25775:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-upload-progress-dialog/file-upload-progress-dialog.module.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUploadProgressDialogComponent: () => (/* reexport safe */ _file_upload_progress_dialog_component__WEBPACK_IMPORTED_MODULE_1__.FileUploadProgressDialogComponent),
/* harmony export */   FileUploadProgressDialogModule: () => (/* binding */ FileUploadProgressDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _file_upload_progress_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-upload-progress-dialog.component */ 53152);
/* harmony import */ var _time_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time.pipe */ 44422);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);





class FileUploadProgressDialogModule {
  static #_ = this.ɵfac = function FileUploadProgressDialogModule_Factory(t) {
    return new (t || FileUploadProgressDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: FileUploadProgressDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FileUploadProgressDialogModule, {
    declarations: [_file_upload_progress_dialog_component__WEBPACK_IMPORTED_MODULE_1__.FileUploadProgressDialogComponent, _time_pipe__WEBPACK_IMPORTED_MODULE_2__.TimePipe],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ }),

/***/ 44422:
/*!******************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/file-upload-progress-dialog/time.pipe.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimePipe: () => (/* binding */ TimePipe)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 21916);



/**
 * Format a given value of time in seconds to a readable time span
 * e.g. 2m 5s
 */
class TimePipe {
  transform(value) {
    if (!(0,ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_0__.isNumeric)(value)) return 'invalid value';
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor(value / 60 % 60);
    let seconds = Math.floor(value % 60);
    let str = '';
    if (hours > 0) {
      str += hours + ' ' + this.translate.instant('HOUR' + (hours != 1 ? 'S' : '')) + ' ';
    }
    if (minutes > 0) {
      str += minutes + ' ' + this.translate.instant('MINUTE' + (minutes != 1 ? 'S' : '')) + ' ';
    }
    if (seconds > 0) {
      str += seconds + ' ' + this.translate.instant('SECOND' + (seconds != 1 ? 'S' : '')) + ' ';
    }
    return str.trim();
  }
  constructor(translate) {
    this.translate = translate;
  }
  static #_ = this.ɵfac = function TimePipe_Factory(t) {
    return new (t || TimePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateService, 16));
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "formatTime",
    type: TimePipe,
    pure: true
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_file-upload-progress-dialog_file-upload-progress-dial-16451f.js.map