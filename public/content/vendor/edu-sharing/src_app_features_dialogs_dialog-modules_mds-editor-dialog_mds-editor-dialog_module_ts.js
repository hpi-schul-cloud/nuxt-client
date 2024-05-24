"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_mds-editor-dialog_mds-editor-dialog_module_ts"],{

/***/ 84036:
/*!************************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/mds-editor-dialog/input-fill-progress/input-fill-progress.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputFillProgressComponent: () => (/* binding */ InputFillProgressComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _mds_types_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../mds/types/types */ 97801);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 21916);





function InputFillProgressComponent_div_0_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputFillProgressComponent_div_0_ng_container_10_Template_span_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.showMissing.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, "FILL_STATUS.SHOW"), " ");
  }
}
function InputFillProgressComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 2)(3, "div", 3)(4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, InputFillProgressComponent_div_0_ng_container_10_Template, 5, 3, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMapInterpolate1"]("status status-", ctx_r0.getStatus(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", (ctx_r0.maximum.mandatory + (ctx_r0.maximum.mandatoryForPublish || 0)) / ctx_r0.getSum("maximum") * 100 + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r0.maximum.mandatory / ctx_r0.getSum("maximum") * 100 + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r0.getFullProgress() / ctx_r0.getSum("maximum") * 100 + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMapInterpolate1"]("status-", ctx_r0.getStatus(), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r0.getSum("current"), " / ", ctx_r0.getSum("maximum"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 16, "FILL_STATUS.MESSAGE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.getStatus() === ctx_r0.RequiredMode.Mandatory || ctx_r0.getStatus() === ctx_r0.RequiredMode.MandatoryForPublish);
  }
}
class InputFillProgressComponent {
  constructor() {
    this.RequiredMode = _mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode;
    this.showMissing = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  getStatus() {
    for (const type of Object.values(_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode)) {
      if (this.current[type] !== this.maximum[type]) {
        return type;
      }
    }
    return 'finished';
  }
  getFullProgress() {
    let sum = this.current[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory];
    if (this.current[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory] === this.maximum[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory]) {
      sum += this.current[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.MandatoryForPublish] || 0;
      if (this.current[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.MandatoryForPublish] === this.maximum[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.MandatoryForPublish]) {
        sum += this.current.optional || 0;
      }
    }
    return sum;
  }
  getPrimaryProgress() {
    return this.current[this.getStatus()] / this.maximum[this.getStatus()];
  }
  getCurrentMaximum() {
    if (this.getStatus() === _mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory) {
      return this.current[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory];
    }
    return this.maximum[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.Mandatory] + (this.maximum[_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode.MandatoryForPublish] || 0);
  }
  getSum(what) {
    let sum = 0;
    for (const type of Object.values(_mds_types_types__WEBPACK_IMPORTED_MODULE_0__.RequiredMode)) {
      sum += this[what][type] || 0;
    }
    return sum;
  }
  static #_ = this.ɵfac = function InputFillProgressComponent_Factory(t) {
    return new (t || InputFillProgressComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: InputFillProgressComponent,
    selectors: [["es-input-fill-progress"]],
    inputs: {
      current: "current",
      maximum: "maximum"
    },
    outputs: {
      showMissing: "showMissing"
    },
    decls: 1,
    vars: 1,
    consts: [["class", "wrapper", 4, "ngIf"], [1, "wrapper"], [1, "publish-bar"], [1, "minimum-bar"], [1, "current-bar"], [4, "ngIf"], ["tabindex", "0", 1, "clickable", "show-missing-button", 3, "click"]],
    template: function InputFillProgressComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, InputFillProgressComponent_div_0_Template, 11, 18, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.current && ctx.maximum);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
    styles: ["\n\n.wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n.wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  width: 100%;\n  flex-grow: 1;\n  background-color: #eee;\n  position: relative;\n}\n.wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100%;\n  transition: var(--transitionNormal) all;\n}\n.wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   .minimum-bar[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   .publish-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100%;\n}\n.wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   .minimum-bar[_ngcontent-%COMP%] {\n  background-color: #777;\n}\n.wrapper[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]   .publish-bar[_ngcontent-%COMP%] {\n  background-color: #aaa;\n}\n.wrapper[_ngcontent-%COMP%]   .status.status-mandatory[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%] {\n  background-color: #cd2457;\n}\n.wrapper[_ngcontent-%COMP%]   .status.status-mandatoryForPublish[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%] {\n  background-color: #e98c1b;\n}\n.wrapper[_ngcontent-%COMP%]   .status.status-recommended[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%] {\n  background-color: #acd331;\n}\n.wrapper[_ngcontent-%COMP%]   .status.status-finished[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .status.status-optional[_ngcontent-%COMP%]   .current-bar[_ngcontent-%COMP%] {\n  background-color: #40bf8e;\n}\n.wrapper[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  font-size: 90%;\n  text-align: center;\n}\n.wrapper[_ngcontent-%COMP%]    > label.status-mandatory[_ngcontent-%COMP%] {\n  color: #761532;\n}\n.wrapper[_ngcontent-%COMP%]    > label.status-mandatoryForPublish[_ngcontent-%COMP%] {\n  color: #90550e;\n}\n.wrapper[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%]   .show-missing-button[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL21kcy1lZGl0b3ItZGlhbG9nL2lucHV0LWZpbGwtcHJvZ3Jlc3MvaW5wdXQtZmlsbC1wcm9ncmVzcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0pBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDSjtBQUNJO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FBQ1I7QUFBUTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHVDQUFBO0FBRVo7QUFBUTs7RUFFSSxrQkFBQTtFQUNBLFlBQUE7QUFFWjtBQUFRO0VBQ0ksc0JBQUE7QUFFWjtBQUFRO0VBQ0ksc0JBQUE7QUFFWjtBQUFRO0VBQ0kseUJEOENVO0FDNUN0QjtBQUFRO0VBQ0kseUJEbkJJO0FDcUJoQjtBQUFRO0VBQ0kseUJEMENhO0FDeEN6QjtBQUFRO0VBRUkseUJEa0NVO0FDakN0QjtBQUVJO0VBQ0ksY0FBQTtFQUNBLGNEcEJRO0VDcUJSLGtCQUFBO0FBQVI7QUFDUTtFQUNJLGNBQUE7QUFDWjtBQUNRO0VBQ0ksY0FBQTtBQUNaO0FBQ1E7RUFDSSxpQkFBQTtBQUNaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG4ud3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIC5zdGF0dXMge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC5jdXJyZW50LWJhciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAkdHJhbnNpdGlvbk5vcm1hbCBhbGw7XG4gICAgICAgIH1cbiAgICAgICAgLm1pbmltdW0tYmFyLFxuICAgICAgICAucHVibGlzaC1iYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5taW5pbXVtLWJhciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3O1xuICAgICAgICB9XG4gICAgICAgIC5wdWJsaXNoLWJhciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xuICAgICAgICB9XG4gICAgICAgICYuc3RhdHVzLW1hbmRhdG9yeSAuY3VycmVudC1iYXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yU3RhdHVzTmVnYXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgJi5zdGF0dXMtbWFuZGF0b3J5Rm9yUHVibGlzaCAuY3VycmVudC1iYXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yU3RhdHVzV2FybmluZztcbiAgICAgICAgfVxuICAgICAgICAmLnN0YXR1cy1yZWNvbW1lbmRlZCAuY3VycmVudC1iYXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ7XG4gICAgICAgIH1cbiAgICAgICAgJi5zdGF0dXMtZmluaXNoZWQgLmN1cnJlbnQtYmFyLFxuICAgICAgICAmLnN0YXR1cy1vcHRpb25hbCAuY3VycmVudC1iYXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yU3RhdHVzUG9zaXRpdmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgPiBsYWJlbCB7XG4gICAgICAgIHBhZGRpbmc6IDhweCAwO1xuICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVNtYWxsO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICYuc3RhdHVzLW1hbmRhdG9yeSB7XG4gICAgICAgICAgICBjb2xvcjogZGFya2VuKCRjb2xvclN0YXR1c05lZ2F0aXZlLCAyMCUpO1xuICAgICAgICB9XG4gICAgICAgICYuc3RhdHVzLW1hbmRhdG9yeUZvclB1Ymxpc2gge1xuICAgICAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3JTdGF0dXNXYXJuaW5nLCAyMCUpO1xuICAgICAgICB9XG4gICAgICAgIC5zaG93LW1pc3NpbmctYnV0dG9uIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 56577:
/*!**************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/mds-editor-dialog/mds-editor-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MdsEditorDialogComponent: () => (/* binding */ MdsEditorDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _services_jump_marks_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/jump-marks.service */ 18965);
/* harmony import */ var _mds_mds_editor_mds_editor_core_mds_editor_core_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../mds/mds-editor/mds-editor-core/mds-editor-core.component */ 42068);
/* harmony import */ var _mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../mds/mds-editor/mds-editor-instance.service */ 27201);
/* harmony import */ var _mds_types_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../mds/types/types */ 97801);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _card_dialog_card_dialog_container_jump_marks_handler_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../card-dialog/card-dialog-container/jump-marks-handler.directive */ 1739);
/* harmony import */ var _mds_editor_dialog_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mds-editor-dialog-data */ 42534);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _input_fill_progress_input_fill_progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./input-fill-progress/input-fill-progress.component */ 84036);


















const _c0 = ["customBottomBarContent"];
function MdsEditorDialogComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "es-input-fill-progress", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("showMissing", function MdsEditorDialogComponent_ng_template_1_Template_es_input_fill_progress_showMissing_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r2.onShowMissing());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("current", ctx_r1.completedProperties)("maximum", ctx_r1.totalProperties);
  }
}
class MdsEditorDialogComponent {
  constructor(data, dialogRef, mdsEditorInstance, localEvents, toast) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.mdsEditorInstance = mdsEditorInstance;
    this.localEvents = localEvents;
    this.toast = toast;
    this.dialogRef.patchState({
      isLoading: true
    });
  }
  ngOnInit() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.initMdsEditor();
      _this.initButtons();
      _this.registerProgressIndicator();
      // `SendFeedbackDialog` works similar to this component. Please update accordingly when
      // making changes here.
      _this.mdsEditorInstance.mdsInflated.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.first)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.delay)(0)).subscribe(() => {
        _this.dialogRef.patchState({
          isLoading: false
        });
        if (_this.data.immediatelyShowMissingRequiredWidgets) {
          _this.mdsEditorInstance.showMissingRequiredWidgets(false);
        }
      });
    })();
  }
  ngAfterViewInit() {
    this.registerJumpMarks();
    this.dialogRef.patchConfig({
      customBottomBarContent: this.customBottomBarContent
    });
  }
  onShowMissing() {
    this.mdsEditorInstance.showMissingRequiredWidgets();
  }
  initMdsEditor() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let editorType;
      /*if (hasGraphql(this.data)) {
          editorType = await this.mdsEditorInstance.initWithGraphqlData(
              (this.data as MdsEditorDialogDataGraphql).graphqlIds,
              {
                  groupId: this.data.groupId,
                  bulkBehavior: this.data.bulkBehavior,
                  editorMode: 'nodes',
              },
          );
      } else */
      if ((0,_mds_editor_dialog_data__WEBPACK_IMPORTED_MODULE_8__.hasNodes)(_this2.data)) {
        editorType = yield _this2.mdsEditorInstance.initWithNodes(_this2.data.nodes, {
          groupId: _this2.data.groupId,
          bulkBehavior: _this2.data.bulkBehavior,
          editorMode: 'nodes'
        });
      } else if ((0,_mds_editor_dialog_data__WEBPACK_IMPORTED_MODULE_8__.hasValues)(_this2.data)) {
        editorType = yield _this2.mdsEditorInstance.initWithoutNodes(_this2.data.groupId, _this2.data.setId, _this2.data.repository, _this2.data.editorMode, _this2.data.values);
      }
      if (editorType !== 'angular') {
        throw new Error('Called mds-editor-dialog with legacy mds. Supports only "angular" rendering.');
      }
    })();
  }
  initButtons() {
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => this.dialogRef.close('CANCEL')), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE', {
        color: 'primary'
      }, () => this.save())]
    });
    this.mdsEditorInstance.observeHasUserChanges().subscribe(hasUserChanges => this.dialogRef.patchConfig({
      closable: hasUserChanges ? _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__.Closable.Confirm : _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__.Closable.Standard
    }));
  }
  registerJumpMarks() {
    rxjs__WEBPACK_IMPORTED_MODULE_15__.combineLatest([this.mdsEditorInstance.activeViews, this.mdsEditorInstance.shouldShowExtendedWidgets$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(([activeViews]) => activeViews.map(view => this.mdsEditorCore.viewRef?.find(v => v.view.id === view.id))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(viewRef => viewRef.filter(v => v && !v.isInHiddenState() && v.view.caption).map(v => new _services_jump_marks_service__WEBPACK_IMPORTED_MODULE_2__.JumpMark(v.view.id + _card_dialog_card_dialog_container_jump_marks_handler_directive__WEBPACK_IMPORTED_MODULE_7__.JUMP_MARK_POSTFIX, v.view.caption, v.view.icon)))).subscribe(jumpMarks => this.dialogRef.patchConfig({
      jumpMarks
    }));
  }
  registerProgressIndicator() {
    this.mdsEditorInstance.observeCompletionStatus().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.filter)(completionStatus => !!completionStatus)).subscribe(completionStatus => {
      this.completedProperties = mapDict(completionStatus, entry => entry.completed);
      this.totalProperties = mapDict(completionStatus, entry => entry.total);
    });
  }
  save() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.mdsEditorInstance.getCanSave()) {
        _this3.dialogRef.patchState({
          isLoading: true
        });
        try {
          const updatedNodesOrValues = yield _this3.mdsEditorInstance.save();
          _this3.toast.toast('WORKSPACE.EDITOR.UPDATED');
          _this3.dialogRef.close(updatedNodesOrValues);
          if ((0,_mds_editor_dialog_data__WEBPACK_IMPORTED_MODULE_8__.hasNodes)(_this3.data)) {
            _this3.localEvents.nodesChanged.emit(updatedNodesOrValues);
          }
        } catch (e) {
          _this3.handleError(e);
          _this3.dialogRef.patchState({
            isLoading: false
          });
        }
      } else {
        // No changes, behave like close.
        if (_this3.mdsEditorInstance.getIsValid()) {
          _this3.dialogRef.close('NO-CHANGES');
        } else {
          _this3.mdsEditorInstance.showMissingRequiredWidgets();
        }
      }
    })();
  }
  handleError(error) {
    console.error(error);
    if (error instanceof _mds_types_types__WEBPACK_IMPORTED_MODULE_5__.UserPresentableError) {
      this.toast.error(null, error.message);
    } else {
      this.toast.error(error);
    }
  }
  static #_ = this.ɵfac = function MdsEditorDialogComponent_Factory(t) {
    return new (t || MdsEditorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_6__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_9__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__.MdsEditorInstanceService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_10__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: MdsEditorDialogComponent,
    selectors: [["es-mds-editor-dialog"]],
    viewQuery: function MdsEditorDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_mds_mds_editor_mds_editor_core_mds_editor_core_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorCoreComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.customBottomBarContent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.mdsEditorCore = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵProvidersFeature"]([_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_4__.MdsEditorInstanceService])],
    decls: 3,
    vars: 0,
    consts: [["customBottomBarContent", ""], [3, "current", "maximum", "showMissing"]],
    template: function MdsEditorDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "es-mds-editor-core");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, MdsEditorDialogComponent_ng_template_1_Template, 1, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      }
    },
    dependencies: [_mds_mds_editor_mds_editor_core_mds_editor_core_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorCoreComponent, _input_fill_progress_input_fill_progress_component__WEBPACK_IMPORTED_MODULE_11__.InputFillProgressComponent],
    styles: ["\n\nes-input-fill-progress[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 200px;\n  height: 36px;\n}\n\n[_nghost-%COMP%]     es-mds-editor-core {\n  --mds-content-padding: 25px;\n}\n[_nghost-%COMP%]     es-mds-editor-core .extended-toggle-container {\n  position: sticky;\n  top: 0;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  background-color: #f7f7f7;\n}\n@media only screen and (min-width: 400px) {\n  [_nghost-%COMP%]     es-mds-editor-core .extended-toggle-container {\n    z-index: 11;\n    background-color: unset;\n  }\n}\n[_nghost-%COMP%]     es-mds-editor-core .extended-toggle-container .extended-toggle {\n  display: flex;\n  padding: 0 10px 0 25px;\n  height: 39px;\n  background: linear-gradient(to right, rgba(247, 247, 247, 0.0001) 0, #f7f7f7 15px);\n}\n[_nghost-%COMP%]     es-mds-editor-core .heading-container {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n[_nghost-%COMP%]     es-mds-editor-core .heading {\n  margin: 0;\n  border-bottom: 1px solid #eee;\n  font-size: 130%;\n  font-weight: normal;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL21kcy1lZGl0b3ItZGlhbG9nL21kcy1lZGl0b3ItZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDREE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBRko7O0FBS0E7RUFDSSwyQkFBQTtBQUZKO0FBR0k7RUFDSSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFEUjtBQUVRO0VBUEo7SUFRUSxXQUFBO0lBQ0EsdUJBQUE7RUFDVjtBQUNGO0FBQVE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0ZBQUE7QUFFWjtBQVdJO0VBQ0ksZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtBQVRSO0FBV0k7RUFDSSxTQUFBO0VBQ0EsNkJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFUUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG4kZXhwYW5kVG9nZ2xlV2lkdGhUaHJlc2hvbGQ6IDQwMHB4O1xuXG5lcy1pbnB1dC1maWxsLXByb2dyZXNzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1pbi13aWR0aDogMjAwcHg7XG4gICAgaGVpZ2h0OiAzNnB4O1xufVxuXG46aG9zdCA6Om5nLWRlZXAgZXMtbWRzLWVkaXRvci1jb3JlIHtcbiAgICAtLW1kcy1jb250ZW50LXBhZGRpbmc6IDI1cHg7XG4gICAgLmV4dGVuZGVkLXRvZ2dsZS1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xuICAgICAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRleHBhbmRUb2dnbGVXaWR0aFRocmVzaG9sZCkge1xuICAgICAgICAgICAgei1pbmRleDogMTE7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB1bnNldDtcbiAgICAgICAgfVxuICAgICAgICAuZXh0ZW5kZWQtdG9nZ2xlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDEwcHggMCAyNXB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzOXB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICAgICAgICAgIHJnYmEoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWQoJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBncmVlbigkd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsdWUoJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjAwMDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQgMTVweFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuaGVhZGluZy1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwO1xuICAgIH1cbiAgICAuaGVhZGluZyB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XG4gICAgICAgIGZvbnQtc2l6ZTogMTMwJTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}
function mapDict(dict, f) {
  return Object.entries(dict).reduce((acc, [key, value]) => {
    acc[key] = f(value);
    return acc;
  }, {});
}

/***/ }),

/***/ 44255:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/mds-editor-dialog/mds-editor-dialog.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MdsEditorDialogComponent: () => (/* reexport safe */ _mds_editor_dialog_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorDialogComponent),
/* harmony export */   MdsEditorDialogModule: () => (/* binding */ MdsEditorDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mds/mds.module */ 77894);
/* harmony import */ var _input_fill_progress_input_fill_progress_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input-fill-progress/input-fill-progress.component */ 84036);
/* harmony import */ var _mds_editor_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mds-editor-dialog.component */ 56577);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);






class MdsEditorDialogModule {
  static #_ = this.ɵfac = function MdsEditorDialogModule_Factory(t) {
    return new (t || MdsEditorDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: MdsEditorDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](MdsEditorDialogModule, {
    declarations: [_mds_editor_dialog_component__WEBPACK_IMPORTED_MODULE_3__.MdsEditorDialogComponent, _input_fill_progress_input_fill_progress_component__WEBPACK_IMPORTED_MODULE_2__.InputFillProgressComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _mds_mds_module__WEBPACK_IMPORTED_MODULE_1__.MdsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_mds-editor-dialog_mds-editor-dialog_module_ts.js.map