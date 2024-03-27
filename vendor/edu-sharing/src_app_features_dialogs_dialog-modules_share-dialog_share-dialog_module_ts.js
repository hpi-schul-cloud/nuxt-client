"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_share-dialog_share-dialog_module_ts"],{

/***/ 28177:
/*!***************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/choose-type/choose-type.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogChooseTypeComponent: () => (/* binding */ ShareDialogChooseTypeComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 93170);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/keycodes */ 30554);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 89718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var _focusable_option_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./focusable-option.directive */ 53474);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
















const _c0 = ["slideToggle"];
function ShareDialogChooseTypeComponent_mat_option_2_i_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "i", 8);
  }
}
function ShareDialogChooseTypeComponent_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ShareDialogChooseTypeComponent_mat_option_2_Template_mat_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const option_r2 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4._setType(option_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ShareDialogChooseTypeComponent_mat_option_2_i_7_Template, 1, 0, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-checked", ctx_r0._contains(option_r2.id))("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 8, option_r2.label))("aria-description", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 10, option_r2.description))("cdkFocusInitial", ctx_r0._contains(option_r2.id) ? "" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("esIcon", option_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 12, option_r2.label), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0._contains(option_r2.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 14, option_r2.description));
  }
}
function ShareDialogChooseTypeComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "mat-slide-toggle", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ShareDialogChooseTypeComponent_div_4_Template_mat_slide_toggle_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7._setPublish($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 12)(5, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "public");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 5, "WORKSPACE.SHARE.PUBLISHER_TOOLTIP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("customFocusFunction", _r6.focus.bind(_r6))("ngModel", ctx_r1._publish)("disabled", ctx_r1._publishDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 7, "WORKSPACE.SHARE.PUBLISHER"));
  }
}
class ShareDialogChooseTypeComponent {
  constructor() {
    this.isDirectory = false;
    this.canPublish = true;
    this.onCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onType = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this._options = [{
      id: 'Consumer',
      label: 'WORKSPACE.SHARE.TYPE_VIEWER',
      icon: 'remove_red_eye',
      description: 'WORKSPACE.SHARE.TYPE_VIEWER_DESCRIPTION'
    }, {
      id: 'Collaborator',
      label: 'WORKSPACE.SHARE.TYPE_COWORKER',
      icon: 'edit',
      description: 'WORKSPACE.SHARE.TYPE_COWORKER_DESCRIPTION'
    }, {
      id: 'Coordinator',
      label: 'WORKSPACE.SHARE.TYPE_COORDINATOR',
      icon: 'work',
      description: 'WORKSPACE.SHARE.TYPE_COORDINATOR_DESCRIPTION'
    }];
    this._destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  set selected(selected) {
    this._selected = selected;
    setTimeout(() => this._checkPublish(), 10);
  }
  ngAfterViewInit() {
    // angular 15 change
    this._slideToggle._elementRef.nativeElement.setAttribute('role', 'menuitemcheckbox');
    // this._slideToggle._inputElement.nativeElement.setAttribute('role', 'menuitemcheckbox');
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusKeyManager(this._menuItems).withWrap();
    this._keyManager.tabOut.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this._destroyed$)).subscribe(() => this._cancel());
    this._keyManager.setActiveItem(this._getActiveIndex());
    // Update the key manager when an option is focused by other means by the user, e.g. via
    // mouse.
    rxjs__WEBPACK_IMPORTED_MODULE_5__.merge(...this._menuItems.map(item => item.focused)).subscribe(item => this._keyManager.updateActiveItem(item));
  }
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
  _handleKeydown(event) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    switch (keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.ESCAPE:
        event.preventDefault();
        event.stopPropagation();
        this._cancel();
        break;
      default:
        if (keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.UP_ARROW || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.DOWN_ARROW) {
          manager.setFocusOrigin('keyboard');
        }
        manager.onKeydown(event);
        return;
    }
  }
  _cancel() {
    this.onCancel.emit();
  }
  _setType(type) {
    for (const {
      id
    } of this._options) {
      if (this._contains(id)) {
        this._selected.splice(this._selected.indexOf(id), 1);
      }
    }
    this._selected.push(type);
    setTimeout(() => this._checkPublish(), 10);
    this.onType.emit({
      permissions: this._selected,
      wasMain: true
    });
  }
  _contains(type) {
    return this._selected.indexOf(type) != -1;
  }
  _checkPublish() {
    this._publish = this._contains('CCPublish');
    this._publishDisabled = this._contains('Coordinator');
    if (this._contains('Coordinator')) {
      this._publish = true;
    }
  }
  _setPublish(event) {
    if (event.checked) {
      if (this._contains('CCPublish')) return;
      this._selected.push('CCPublish');
    } else {
      if (!this._contains('CCPublish')) return;
      this._selected.splice(this._selected.indexOf('CCPublish'), 1);
    }
    this.onType.emit({
      permissions: this._selected,
      wasMain: false
    });
  }
  _getActiveIndex() {
    return this._options.findIndex(option => this._selected.includes(option.id));
  }
  static #_ = this.ɵfac = function ShareDialogChooseTypeComponent_Factory(t) {
    return new (t || ShareDialogChooseTypeComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ShareDialogChooseTypeComponent,
    selectors: [["es-share-dialog-choose-type"]],
    viewQuery: function ShareDialogChooseTypeComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_focusable_option_directive__WEBPACK_IMPORTED_MODULE_0__.FocusableOptionDirective, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._slideToggle = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx._menuItems = _t);
      }
    },
    hostBindings: function ShareDialogChooseTypeComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function ShareDialogChooseTypeComponent_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
    },
    inputs: {
      selected: "selected",
      isDirectory: "isDirectory",
      canPublish: "canPublish",
      ariaLabel: ["aria-label", "ariaLabel"]
    },
    outputs: {
      onCancel: "onCancel",
      onType: "onType"
    },
    decls: 5,
    vars: 4,
    consts: [[1, "dialog", 3, "click"], ["role", "menu", "cdkTrapFocus", "", "id", "es-share-dialog-choose-type-menu", 1, "more-open", 3, "cdkTrapFocusAutoCapture"], ["esWorkspaceShareFocusableOption", "", "role", "menuitemradio", 3, "click", 4, "ngFor", "ngForOf"], [1, "cdk-visually-hidden"], ["class", "publish-toggle", 4, "ngIf"], ["esWorkspaceShareFocusableOption", "", "role", "menuitemradio", 3, "click"], [3, "esIcon"], ["icon", "check", "class", "selected", 4, "ngIf"], ["icon", "check", 1, "selected"], [1, "publish-toggle"], ["esWorkspaceShareFocusableOption", "", 1, "collection-item", 3, "customFocusFunction", "ngModel", "disabled", "title", "change"], ["slideToggle", ""], [1, "toggle"], [1, "material-icons"]],
    template: function ShareDialogChooseTypeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ShareDialogChooseTypeComponent_Template_div_click_0_listener() {
          return ctx._cancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ShareDialogChooseTypeComponent_mat_option_2_Template, 11, 16, "mat-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "hr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ShareDialogChooseTypeComponent_div_4_Template, 10, 9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdkTrapFocusAutoCapture", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.ariaLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx._options);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", true);
      }
    },
    dependencies: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.CdkTrapFocus, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatOption, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggle, _focusable_option_directive__WEBPACK_IMPORTED_MODULE_0__.FocusableOptionDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
    styles: ["\n\n.more-open[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 131;\n  background-color: #fff;\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n}\n.more-open[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: var(--palette-foreground-text);\n}\n.more-open[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  top: -2px;\n  font-size: 10pt;\n}\n.more-open[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.more-open[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 5px;\n}\n.more-open[_ngcontent-%COMP%]   .publish-toggle[_ngcontent-%COMP%] {\n  background-color: #eee;\n  padding: 20px 10px;\n  display: flex;\n  justify-content: flex-end;\n}\n.more-open[_ngcontent-%COMP%]   .publish-toggle[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n.more-open[_ngcontent-%COMP%]   .publish-toggle[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.more-open[_ngcontent-%COMP%]   .publish-toggle[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  margin-right: 5px;\n}\n\n.more-open[_ngcontent-%COMP%]   mat-option[_ngcontent-%COMP%]     .mdc-list-item__primary-text {\n  flex-direction: column;\n  align-items: flex-start;\n  white-space: initial;\n  border: none;\n  outline: none;\n}\n.more-open[_ngcontent-%COMP%]   mat-option[_ngcontent-%COMP%]     .mdc-list-item__primary-text div {\n  display: flex;\n  align-items: center;\n  color: var(--primary);\n  font-weight: bold;\n}\n.more-open[_ngcontent-%COMP%]   mat-option[_ngcontent-%COMP%]     .mdc-list-item__primary-text div i {\n  margin-right: 8px;\n}\n.more-open[_ngcontent-%COMP%]   mat-option[_ngcontent-%COMP%]     .mdc-list-item__primary-text p {\n  color: var(--textLight);\n  padding: 0 28px;\n  margin: 8px 0;\n  text-align: left;\n  line-height: 1.5;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy9jaG9vc2UtdHlwZS9jaG9vc2UtdHlwZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvYnJhbmRpbmcuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUNpQkEsd0NBQUE7QURoQko7QUFDSTtFQUNJLHFDRURNO0FGRWQ7QUFDSTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFDUjtBQUNJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0FBQ1I7QUFBUTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7QUFFWjtBQUNJO0VBQ0ksc0JEcUNpQjtFQ3BDakIsa0JBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFDUjtBQUFRO0VBQ0ksNkJBQUE7QUFFWjtBQURZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBR2hCO0FBRmdCO0VBQ0ksTUFBQTtFQUNBLE9BQUE7RUFDQSxpQkFBQTtBQUlwQjs7QUFHQTtFQUNJLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQUo7QUFFSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCRXRERTtFRnVERixpQkFBQTtBQUFSO0FBRVE7RUFDSSxpQkFBQTtBQUFaO0FBSUk7RUFDSSx1QkQvQ0k7RUNnREosZUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBRlIiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLm1vcmUtb3BlbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6ICRkaWFsb2daSW5kZXggKyAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3dCb3R0b20oKTtcbiAgICAuc3dpdGNoIGxhYmVsIHtcbiAgICAgICAgY29sb3I6ICR0ZXh0UHJpbWFyeTtcbiAgICB9XG4gICAgLnN3aXRjaCBsYWJlbCBzcGFuIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IC0ycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBwdDtcbiAgICB9XG4gICAgYnV0dG9uIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgLnNlbGVjdGVkIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnB1Ymxpc2gtdG9nZ2xlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggMTBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgbWF0LXNsaWRlLXRvZ2dsZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIC50b2dnbGUge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICAubWF0ZXJpYWwtaWNvbnMge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLm1vcmUtb3BlbiBtYXQtb3B0aW9uIDo6bmctZGVlcCAubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0IHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBvdXRsaW5lOiBub25lO1xuXG4gICAgZGl2IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgICAgICBpIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcCB7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICBwYWRkaW5nOiAwIDI4cHg7XG4gICAgICAgIG1hcmdpbjogOHB4IDA7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxufVxuIiwiQG1peGluIGNsaWNrYWJsZSgpIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuQG1peGluIGxpbWl0TGluZUNvdW50KCRjb3VudCwgJGxpbmVIZWlnaHQ6IDEpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZUhlaWdodCArIGVtO1xuICAgIG1heC1oZWlnaHQ6ICRjb3VudCAqICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAkY291bnQ7IC8qIG51bWJlciBvZiBsaW5lcyB0byBzaG93ICovXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAvKiBhdXRvcHJlZml4ZXI6IG9mZiAqL1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93KCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dCb3R0b20oJG9wYWNpdHk6IDAuMSkge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDNweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd1NtYWxsKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgkaW1wb3J0YW50OiBmYWxzZSwgJG9wYWNpdHk6IDAuNikge1xuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2Nyb2xsYmFyKCkge1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIC8vIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgfVxufVxuQG1peGluIHJlbW92ZURlZmF1bHRGb2N1cygpIHtcbiAgICBvdXRsaW5lOiBub25lO1xufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJykge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgIH1cbn1cbi8vIEFwcGx5IHRoZSBjb250ZW50IHN0eWxlcyBpbiBjb250cmFzdCBtb2RlLiBUaGlzIGlzIGp1c3QgZW5vdWdoIGNvbnRyYXN0IHRvIGJlIFdDQUcgY29tcGxpZW50IC0tLVxuLy8gbm90IGEgaGlnaC1jb250cmFzdCBtb2RlLlxuLy9cbi8vIENhbGwgd2l0aG91dCBhcmd1bWVudHMgZm9yIHVzZSBpbiBlbmNhcHN1bGF0ZWQgY29tcG9uZW50IHN0eWxlcywgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUge1xuLy8gICAgICAgICAvLyBTdHlsZXMgdG8gYXBwbHkgaW4gY29udHJhc3QgbW9kZVxuLy8gICAgIH1cbi8vIFRvIHVzIGluIGdsb2JhbCBjb250ZXh0LCBwYXNzICdnbG9iYWwnIGFzIGZpcnN0IGFyZ3VtZW50LCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZShnbG9iYWwpIHsgLyogLi4uICovIH1cbkBtaXhpbiBjb250cmFzdE1vZGUoJHNjb3BlOiBlbmNhcHN1bGF0ZWQpIHtcbiAgICAkY29udHJhc3RNb2RlU2VsZWN0b3I6ICdib2R5LmVzLWNvbnRyYXN0LW1vZGUnO1xuICAgIEBpZiAkc2NvcGUgPT0gZW5jYXBzdWxhdGVkIHtcbiAgICAgICAgOmhvc3QtY29udGV4dCgjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0pICYge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRzY29wZSA9PSBnbG9iYWwge1xuICAgICAgICAje2lmKCYsICcjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0gJicsICRjb250cmFzdE1vZGVTZWxlY3Rvcil9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEBlcnJvciBcIkludmFsaWQgc2NvcGUgI3skc2NvcGV9LlwiO1xuICAgIH1cbn1cbkBtaXhpbiBibHVySW1hZ2UoJGJsdXJTdHJlbmd0aDogMjVweCkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgdG9wOiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICB6LWluZGV4OiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmlsdGVyOiBibHVyKCRibHVyU3RyZW5ndGgpO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9wYWNpdHk6IDAuNztcbn1cbiIsIiRwcmltYXJ5OiB2YXIoLS1wcmltYXJ5KTtcbiRwcmltYXJ5TWVkaXVtTGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0yMDApO1xuJHByaW1hcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTEwMCk7XG4kcHJpbWFyeUNvbXBsZW1lbnRhcnk6IHZhcigtLWFjY2VudCk7XG4kcHJpbWFyeURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS05MDApO1xuJHRleHRPblByaW1hcnk6IHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCk7XG4kdGV4dE9uUHJpbWFyeUxpZ2h0OiByZ2JhKHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCksIDAuNzUpO1xuJHRleHRQcmltYXJ5OiB2YXIoLS1wYWxldHRlLWZvcmVncm91bmQtdGV4dCk7XG4kd29ya3NwYWNlVG9wQmFyQmFja2dyb3VuZDogIzM4MzgzODtcbiR3b3Jrc3BhY2VUb3BCYXJGb250Q29sb3I6ICNmZmY7XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 53474:
/*!********************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/choose-type/focusable-option.directive.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusableOptionDirective: () => (/* binding */ FocusableOptionDirective)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);


class FocusableOptionDirective {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this.focused = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this._onFocus = () => this.focused.next(this);
  }
  ngOnInit() {
    this._elementRef.nativeElement.addEventListener('focus', this._onFocus);
  }
  ngOnDestroy() {
    this._elementRef.nativeElement.removeEventListener('focus', this._onFocus);
  }
  focus() {
    if (this.customFocusFunction) {
      this.customFocusFunction();
    } else {
      this._elementRef.nativeElement.focus();
    }
  }
  static #_ = this.ɵfac = function FocusableOptionDirective_Factory(t) {
    return new (t || FocusableOptionDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
    type: FocusableOptionDirective,
    selectors: [["", "esWorkspaceShareFocusableOption", ""]],
    inputs: {
      disabled: "disabled",
      customFocusFunction: "customFocusFunction"
    }
  });
}

/***/ }),

/***/ 65313:
/*!*************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/permission/permission.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogPermissionComponent: () => (/* binding */ ShareDialogPermissionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../core-module/core.module */ 71083);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/components/user-avatar/user-avatar.component */ 98588);
/* harmony import */ var _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../choose-type/choose-type.component */ 28177);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../shared/pipes/permission-name.pipe */ 44431);











function ShareDialogPermissionComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 1, "WORKSPACE.SHARE.DELETED"));
  }
}
function ShareDialogPermissionComponent_i_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "public");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "WORKSPACE.SHARE.PUBLISHER"));
  }
}
const _c0 = function (a0) {
  return {
    permissions: a0
  };
};
function ShareDialogPermissionComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div")(3, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "help_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](1, 2, "WORKSPACE.SHARE.TYPE_UNKNOWN_DESCRIPTION", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](7, _c0, ctx_r2._permission.permissions.join(", "))));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 5, "WORKSPACE.SHARE.TYPE_UNKNOWN"));
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "home");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 1, "WORKSPACE.SHARE.GROUP_OWNER"));
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_5_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 20)(1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "remove_red_eye");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ShareDialogPermissionComponent_div_16_ng_container_5_span_6_Template, 3, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 2, "WORKSPACE.SHARE.TYPE_VIEWER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r6.readOnly && !ctx_r6.isEveryone);
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_6_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 20)(1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ShareDialogPermissionComponent_div_16_ng_container_6_span_6_Template, 3, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 2, "WORKSPACE.SHARE.TYPE_COWORKER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r7.readOnly && !ctx_r7.isEveryone);
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_7_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 20)(1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ShareDialogPermissionComponent_div_16_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "work");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ShareDialogPermissionComponent_div_16_ng_container_7_span_6_Template, 3, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 2, "WORKSPACE.SHARE.TYPE_COORDINATOR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r8.readOnly && !ctx_r8.isEveryone);
  }
}
function ShareDialogPermissionComponent_div_16_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div");
  }
}
const _c1 = function (a0) {
  return {
    user: a0
  };
};
function ShareDialogPermissionComponent_div_16_es_share_dialog_choose_type_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-share-dialog-choose-type", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("onCancel", function ShareDialogPermissionComponent_div_16_es_share_dialog_choose_type_9_Template_es_share_dialog_choose_type_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r14.showChooseType = false);
    })("onType", function ShareDialogPermissionComponent_div_16_es_share_dialog_choose_type_9_Template_es_share_dialog_choose_type_onType_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r16.changeType($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](1, 4, "WORKSPACE.SHARE.TYPE_MENU_LABEL", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](9, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 7, ctx_r10._permission))))("selected", ctx_r10._permission.permissions)("isDirectory", ctx_r10.isDirectory)("canPublish", ctx_r10.canPublish);
  }
}
function ShareDialogPermissionComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 21)(1, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ShareDialogPermissionComponent_div_16_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r17.chooseType());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ShareDialogPermissionComponent_div_16_ng_container_4_Template, 6, 3, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ShareDialogPermissionComponent_div_16_ng_container_5_Template, 7, 4, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ShareDialogPermissionComponent_div_16_ng_container_6_Template, 7, 4, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ShareDialogPermissionComponent_div_16_ng_container_7_Template, 7, 4, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ShareDialogPermissionComponent_div_16_div_8_Template, 1, 0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ShareDialogPermissionComponent_div_16_es_share_dialog_choose_type_9_Template, 3, 11, "es-share-dialog-choose-type", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r3.readOnly);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 10, "WORKSPACE.SHARE.TYPE_MENU_LABEL", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](15, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 13, ctx_r3._permission))))("aria-expanded", ctx_r3.showChooseType || null)("aria-controls", ctx_r3.showChooseType ? "es-share-dialog-choose-type-menu" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3._permission.permissions.indexOf("Owner") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3._permission.permissions.indexOf("Consumer") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3._permission.permissions.indexOf("Collaborator") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3._permission.permissions.indexOf("Coordinator") > -1 || ctx_r3._permission.permissions.indexOf("All") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3._permission.permissions.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3.showChooseType);
  }
}
function ShareDialogPermissionComponent_button_17_i_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ShareDialogPermissionComponent_button_17_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ShareDialogPermissionComponent_button_17_i_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "WORKSPACE.SHARE.INHERIT_HINT"));
  }
}
function ShareDialogPermissionComponent_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ShareDialogPermissionComponent_button_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r22.remove());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ShareDialogPermissionComponent_button_17_i_1_Template, 2, 0, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ShareDialogPermissionComponent_button_17_i_2_Template, 2, 0, "i", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ShareDialogPermissionComponent_button_17_i_3_Template, 2, 3, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r4.readOnly);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r4.inherit && !ctx_r4.isDeleted);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r4.inherit && ctx_r4.isDeleted);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.inherit);
  }
}
const _c2 = function () {
  return {
    field: "secondary"
  };
};
class ShareDialogPermissionComponent {
  constructor() {
    this.invalidPermission = false;
    this.inherit = false;
    this.readOnly = true;
    this.showDelete = true;
    this.isDeleted = false;
    this.isDirectory = false;
    this.canPublish = true;
    this.onRemove = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.onType = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.showChooseType = false;
  }
  set permission(permission) {
    this._permission = permission;
    let coordinator = permission.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_COORDINATOR);
    let collaborator = permission.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_COLLABORATOR);
    if (coordinator != -1) {
      let i = permission.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_COLLABORATOR);
      if (i != -1) permission.permissions.splice(i, 1);
    }
    if (coordinator != -1 || collaborator != -1) {
      let i = permission.permissions.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_CONSUMER);
      if (i != -1) permission.permissions.splice(i, 1);
    }
    this.isEveryone = permission.authority.authorityName == _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.AUTHORITY_EVERYONE;
    let check = this._permission.permissions.slice();
    if (check.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_CC_PUBLISH) != -1) {
      check.splice(check.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ACCESS_CC_PUBLISH), 1);
    }
    this.invalidPermission = check.length != 1 || check[0] != _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_OWNER && check[0] != _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_CONSUMER && check[0] != _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_COLLABORATOR && check[0] != _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.PERMISSION_COORDINATOR;
  }
  remove() {
    if (this.showDelete) this.onRemove.emit();
  }
  chooseType() {
    if (this.readOnly || this.isEveryone) return;
    this.showChooseType = true;
  }
  changeType(type) {
    this.onType.emit(type);
    if (type.wasMain) this.showChooseType = false;
  }
  static #_ = this.ɵfac = function ShareDialogPermissionComponent_Factory(t) {
    return new (t || ShareDialogPermissionComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: ShareDialogPermissionComponent,
    selectors: [["es-share-dialog-permission"]],
    inputs: {
      permission: "permission",
      inherit: "inherit",
      readOnly: "readOnly",
      showDelete: "showDelete",
      isDeleted: "isDeleted",
      isDirectory: "isDirectory",
      canPublish: "canPublish"
    },
    outputs: {
      onRemove: "onRemove",
      onType: "onType"
    },
    decls: 18,
    vars: 16,
    consts: [[1, "group"], ["class", "deleted-info", 4, "ngIf"], [1, "container"], [1, "icon"], ["size", "xsmall", 3, "user"], [1, "permissionName"], [1, "primary"], [1, "secondary"], [1, "permission"], [1, "publish"], ["class", "material-icons", 3, "matTooltip", 4, "ngIf"], [3, "title", 4, "ngIf"], ["class", "permission-type", 4, "ngIf"], ["class", "remove", "mat-icon-button", "", 3, "disabled", "click", 4, "ngIf"], [1, "deleted-info"], [1, "line"], [1, "info"], [1, "material-icons", 3, "matTooltip"], [3, "title"], ["aria-hidden", "true", 1, "material-icons", "align"], [1, "select"], [1, "permission-type"], ["mat-button", "", "role", "combobox", "aria-haspopup", "true", 3, "disabled", "click"], [4, "ngIf"], ["class", "typeAdd", 3, "aria-label", "selected", "isDirectory", "canPublish", "onCancel", "onType", 4, "ngIf"], [1, "material-icons", "align"], ["class", "select", 4, "ngIf"], [1, "typeAdd", 3, "aria-label", "selected", "isDirectory", "canPublish", "onCancel", "onType"], ["mat-icon-button", "", 1, "remove", 3, "disabled", "click"], ["class", "material-icons", 4, "ngIf"], ["class", "inherit", "esIcon", "edu-inherit", 3, "matTooltip", 4, "ngIf"], [1, "material-icons"], ["esIcon", "edu-inherit", 1, "inherit", 3, "matTooltip"]],
    template: function ShareDialogPermissionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ShareDialogPermissionComponent_div_1_Template, 8, 3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "es-user-avatar", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 5)(6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "permissionName");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "permissionName");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 8)(13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, ShareDialogPermissionComponent_i_14_Template, 3, 3, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ShareDialogPermissionComponent_div_15_Template, 9, 9, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ShareDialogPermissionComponent_div_16_Template, 10, 17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ShareDialogPermissionComponent_button_17_Template, 4, 4, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isDeleted);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("user", ctx._permission);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 10, ctx._permission));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](11, 12, ctx._permission, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](15, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("readOnly", ctx.readOnly);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx._permission.permissions.indexOf("Coordinator") > -1 || ctx._permission.permissions.indexOf("CCPublish") > -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.invalidPermission);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.invalidPermission);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showDelete);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatIconButton, _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_1__.UserAvatarComponent, _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_2__.ShareDialogChooseTypeComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe, _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_3__.PermissionNamePipe],
    styles: ["\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n}\n.container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 3px 0;\n  align-items: center;\n}\n.container[_ngcontent-%COMP%]    > .icon[_ngcontent-%COMP%] {\n  position: relative;\n  padding-left: 10px;\n}\n.container[_ngcontent-%COMP%]    > .permissionName[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  min-height: 40px;\n  flex-grow: 1;\n  padding: 3px 10px;\n}\n.container[_ngcontent-%COMP%]    > .permissionName[_ngcontent-%COMP%]    > .primary[_ngcontent-%COMP%] {\n  word-break: break-all;\n  max-height: 1.5em;\n  line-height: 1.5em;\n  overflow: hidden;\n}\n.container[_ngcontent-%COMP%]    > .permissionName[_ngcontent-%COMP%]    > .secondary[_ngcontent-%COMP%] {\n  font-size: 80%;\n  color: var(--textLight);\n  margin-top: -3px;\n  min-height: 3px;\n}\n.container[_ngcontent-%COMP%]   .permission-type[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.deleted-info[_ngcontent-%COMP%] {\n  width: calc(100% + 20px);\n  height: 100%;\n  position: absolute;\n  align-items: center;\n  left: -15px;\n  top: 0;\n  z-index: 1;\n  display: flex;\n  border-radius: 25px;\n  font-weight: bold;\n  background-color: rgba(255, 255, 255, 0.6);\n  -webkit-backdrop-filter: blur(1px) saturate(50%);\n          backdrop-filter: blur(1px) saturate(50%);\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 0 15px;\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:last-child {\n  padding-right: 60px;\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border: none;\n  background: #000;\n  height: 1px;\n}\n\n.publish[_ngcontent-%COMP%] {\n  padding: 0 5px;\n}\n\n.group[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.group[_ngcontent-%COMP%], .container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.readOnly[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.permission[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.permission[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 5px;\n}\n\n.icon[_ngcontent-%COMP%] {\n  padding-right: 5px;\n}\n\n.typeAdd[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  width: 310px !important;\n  top: -60px;\n}\n\n.select[_ngcontent-%COMP%] {\n  width: 25px;\n  display: inline-flex;\n  padding: 0 2px;\n}\n\n.icon[_ngcontent-%COMP%], .remove[_ngcontent-%COMP%], .inherit[_ngcontent-%COMP%] {\n  min-width: 24px;\n}\n\n.remove[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n\n.remove[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .type[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.remove[_ngcontent-%COMP%]   .inherit[_ngcontent-%COMP%] {\n  color: #42ca8d;\n  font-size: 21px;\n}\n\n@media screen and (max-width: 700px) {\n  .permission[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy9wZXJtaXNzaW9uL3Blcm1pc3Npb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7QUFBSjtBQUNJO0VBQ0ksYUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUNSO0FBQ0k7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0FBQ1I7QUFDSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUNSO0FBQVE7RUFDSSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUVaO0FBQVE7RUFDSSxjQUFBO0VBQ0EsdUJEYkE7RUNjQSxnQkFBQTtFQUNBLGVBQUE7QUFFWjtBQUNJO0VBQ0ksa0JBQUE7QUFDUjs7QUFFQTtFQUVJLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLDBDQUFBO0VBQ0EsZ0RBQUE7VUFBQSx3Q0FBQTtBQUFKO0FBQ0k7RUFDSSxZQUFBO0VBQ0EsZUFBQTtBQUNSO0FBQVE7RUFDSSxtQkFBQTtBQUVaO0FBQVE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBRVo7O0FBRUE7RUFDSSxjQUFBO0FBQ0o7O0FBQ0E7RUFDSSxrQkFBQTtBQUVKOztBQUFBOztFQUVJLFdBQUE7QUFHSjs7QUFEQTtFQUNJLHVCRDVEUTtBQ2dFWjs7QUFGQTtFQUNJLHlCQUFBO0FBS0o7QUFKSTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUFNUjs7QUFIQTtFQUNJLGtCQUFBO0FBTUo7O0FBSkE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7QUFPSjs7QUFMQTtFQUNJLFdBQUE7RUFDQSxvQkFBQTtFQUNBLGNBQUE7QUFRSjs7QUFOQTs7O0VBR0ksZUFBQTtBQVNKOztBQVBBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0FBVUo7O0FBUkE7O0VBRUksdUJEL0ZRO0FDMEdaOztBQVRBO0VBQ0ksY0R0Rm9CO0VDdUZwQixlQUFBO0FBWUo7O0FBVkE7RUFDSTtJQUNJLGFBQUE7RUFhTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwYWRkaW5nOiAzcHggMDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgPiAuaWNvbiB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIH1cbiAgICA+IC5wZXJtaXNzaW9uTmFtZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgbWluLWhlaWdodDogNDBweDtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBwYWRkaW5nOiAzcHggMTBweDtcbiAgICAgICAgPiAucHJpbWFyeSB7XG4gICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAxLjVlbTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgPiAuc2Vjb25kYXJ5IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlO1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtM3B4O1xuICAgICAgICAgICAgbWluLWhlaWdodDogM3B4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5wZXJtaXNzaW9uLXR5cGUge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxufVxuLmRlbGV0ZWQtaW5mbyB7XG4gICAgLy8gdGhlIG91dGVyIGJvdW5kYXJ5IGluIHNoYXJlIGRpYWxvZyBoYXMgMTVweCArIDVweCBwYWRkaW5nXG4gICAgd2lkdGg6IGNhbGMoMTAwJSArIDIwcHgpO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBsZWZ0OiAtMTVweDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxcHgpIHNhdHVyYXRlKDUwJSk7XG4gICAgLmxpbmUge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIHBhZGRpbmc6IDAgMTVweDtcbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDYwcHg7XG4gICAgICAgIH1cbiAgICAgICAgaHIge1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICAgICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICB9XG4gICAgfVxufVxuLnB1Ymxpc2gge1xuICAgIHBhZGRpbmc6IDAgNXB4O1xufVxuLmdyb3VwIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uZ3JvdXAsXG4uY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cbi5yZWFkT25seSBidXR0b24ge1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xufVxuLnBlcm1pc3Npb24ge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgPiBkaXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBwYWRkaW5nOiAwIDVweDtcbiAgICB9XG59XG4uaWNvbiB7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuLnR5cGVBZGQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMjBweDtcbiAgICB3aWR0aDogMzEwcHggIWltcG9ydGFudDtcbiAgICB0b3A6IC02MHB4O1xufVxuLnNlbGVjdCB7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgcGFkZGluZzogMCAycHg7XG59XG4uaWNvbixcbi5yZW1vdmUsXG4uaW5oZXJpdCB7XG4gICAgbWluLXdpZHRoOiAyNHB4O1xufVxuLnJlbW92ZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDI7XG59XG4ucmVtb3ZlIGksXG4udHlwZSB7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG4ucmVtb3ZlIC5pbmhlcml0IHtcbiAgICBjb2xvcjogJHdvcmtzcGFjZUluaGVyaXRDb2xvcjtcbiAgICBmb250LXNpemU6IDIxcHg7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlV2lkdGgpIHtcbiAgICAucGVybWlzc2lvbiA+IGRpdiA+IGRpdiBzcGFuIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 27596:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/publish/node-author-name.pipe.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeAuthorNamePipe: () => (/* binding */ NodeAuthorNamePipe)
/* harmony export */ });
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 21916);




/**
 * Format the version label and checking constants if required
 */
class NodeAuthorNamePipe {
  transform(node, args = null) {
    if (node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_AUTHOR_FREETEXT]?.[0]) {
      return node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_AUTHOR_FREETEXT]?.[0];
    } else if (node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR]?.[0]) {
      return new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_1__.VCard(node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR]?.[0]).getDisplayName();
    } else {
      return this.translate.instant('MDS.AUTHOR_UNSET');
    }
  }
  constructor(translate) {
    this.translate = translate;
  }
  static #_ = this.ɵfac = function NodeAuthorNamePipe_Factory(t) {
    return new (t || NodeAuthorNamePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService, 16));
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefinePipe"]({
    name: "nodeAuthorName",
    type: NodeAuthorNamePipe,
    pure: true
  });
}

/***/ }),

/***/ 14465:
/*!*******************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/publish/publish.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogPublishComponent: () => (/* binding */ ShareDialogPublishComponent),
/* harmony export */   ShareMode: () => (/* binding */ ShareMode)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs */ 73064);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_data_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core-module/rest/data-object */ 2895);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../mds/mds-editor/mds-editor-instance.service */ 27201);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../services/bridge.service */ 34997);
/* harmony import */ var _core_module_rest_services_rest_connector_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../core-module/rest/services/rest-connector.service */ 61871);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../dialogs.service */ 29900);
/* harmony import */ var _core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../core-module/rest/services/rest-node.service */ 57857);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../services/node-helper.service */ 76754);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../shared/components/spinner-small/spinner-small.component */ 65928);
/* harmony import */ var _shared_directives_toolpermission_check_directive__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../shared/directives/toolpermission-check.directive */ 32110);
/* harmony import */ var _shared_pipes_version_label_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../shared/pipes/version-label.pipe */ 94194);
/* harmony import */ var _node_author_name_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./node-author-name.pipe */ 27596);






































const _c0 = ["shareModeCopyRef"];
const _c1 = ["shareModeDirectRef"];
function ShareDialogPublishComponent_ng_container_4_es_info_message_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "br")(2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](4, 1, "WORKSPACE.SHARE.PUBLISH.LICENSE_INFO_COPY"), " ");
  }
}
const _c2 = function (a0) {
  return {
    license: a0
  };
};
function ShareDialogPublishComponent_ng_container_4_es_info_message_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](4, "nodeAuthorName");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, ShareDialogPublishComponent_ng_container_4_es_info_message_1_ng_container_5_Template, 5, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](6, "div")(7, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_ng_container_4_es_info_message_1_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r12.openLicense());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](8, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind2"](2, 5, "WORKSPACE.SHARE.PUBLISH.LICENSE_INFO", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](14, _c2, ctx_r6.getLicenseText())), " ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](3, 8, "WORKSPACE.SHARE.PUBLISH.LICENSE_AUTHOR"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](4, 10, ctx_r6.node), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r6.shareModeCopy);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](10, 12, "WORKSPACE.SHARE.PUBLISH.SET_LICENSE"), " ");
  }
}
function ShareDialogPublishComponent_ng_container_4_es_info_message_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div")(4, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_ng_container_4_es_info_message_2_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r14.openMetadata());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind2"](2, 2, "WORKSPACE.SHARE.PUBLISH.MISSING_METADATA", ctx_r7.mdsCompletion), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](7, 5, "WORKSPACE.SHARE.PUBLISH.OPEN_METADATA"), " ");
  }
}
function ShareDialogPublishComponent_ng_container_4_es_info_message_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div")(4, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_ng_container_4_es_info_message_3_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r16.openLicense());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 2, "WORKSPACE.SHARE.PUBLISH.LICENSE_REQUIRED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](7, 4, "WORKSPACE.SHARE.PUBLISH.SET_LICENSE"), " ");
  }
}
function ShareDialogPublishComponent_ng_container_4_es_info_message_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.PUBLISH.AUTHOR_REQUIRED"), " ");
  }
}
function ShareDialogPublishComponent_ng_container_4_es_info_message_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div")(4, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_ng_container_4_es_info_message_5_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r18.openLicense());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 2, "WORKSPACE.SHARE.PUBLISH.NO_LICENSE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](7, 4, "WORKSPACE.SHARE.PUBLISH.SET_LICENSE"), " ");
  }
}
function ShareDialogPublishComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](1, ShareDialogPublishComponent_ng_container_4_es_info_message_1_Template, 11, 16, "es-info-message", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](2, ShareDialogPublishComponent_ng_container_4_es_info_message_2_Template, 8, 7, "es-info-message", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](3, ShareDialogPublishComponent_ng_container_4_es_info_message_3_Template, 8, 6, "es-info-message", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](4, ShareDialogPublishComponent_ng_container_4_es_info_message_4_Template, 3, 3, "es-info-message", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, ShareDialogPublishComponent_ng_container_4_es_info_message_5_Template, 8, 6, "es-info-message", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.getLicense());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", (ctx_r0.mdsCompletion == null ? null : ctx_r0.mdsCompletion.completed) !== (ctx_r0.mdsCompletion == null ? null : ctx_r0.mdsCompletion.total));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.isLicenseMissing());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.isAuthorMissing());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r0.getLicense() && !ctx_r0.isLicenseMissing());
  }
}
function ShareDialogPublishComponent_es_info_message_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div")(4, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_es_info_message_5_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r20.onDisableInherit.emit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 2, "WORKSPACE.SHARE.PUBLISH.INHERITED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](7, 4, "WORKSPACE.SHARE.PUBLISH.DISABLE_INHERIT"), " ");
  }
}
function ShareDialogPublishComponent_es_info_message_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.PUBLISH.COPY_ACTIVE"), " ");
  }
}
function ShareDialogPublishComponent_div_7_div_19_es_info_message_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "es-info-message", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.PUBLISH.NO_PUBLISH_COPY_PERMISSION"), " ");
  }
}
function ShareDialogPublishComponent_div_7_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 22)(1, "div", 23)(2, "div", 24)(3, "mat-radio-group", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("ngModelChange", function ShareDialogPublishComponent_div_7_div_19_Template_mat_radio_group_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r26.republish = $event);
    })("ngModelChange", function ShareDialogPublishComponent_div_7_div_19_Template_mat_radio_group_ngModelChange_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r27);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r28.setRepublish());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](4, "mat-radio-button", 25)(5, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](6, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](9, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "mat-radio-button", 25)(13, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](14, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](17, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](20, "mat-radio-button", 25)(21, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](22, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](28, ShareDialogPublishComponent_div_7_div_19_es_info_message_28_Template, 3, 3, "es-info-message", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngModel", ctx_r24.republish)("disabled", !ctx_r24.copyAllowed());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", !ctx_r24.isCopy)("value", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](8, 15, "WORKSPACE.SHARE.PUBLISH.NO_REPUBLISH"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](11, 17, "WORKSPACE.SHARE.PUBLISH.NO_REPUBLISH_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", ctx_r24.currentVersionPublished())("value", "new");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](16, 19, "WORKSPACE.SHARE.PUBLISH.REPUBLISH"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](19, 21, "WORKSPACE.SHARE.PUBLISH.REPUBLISH_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", ctx_r24.currentVersionPublished() || !ctx_r24.isCopy)("value", "update");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](24, 23, "WORKSPACE.SHARE.PUBLISH.UPDATE_METADATA"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](27, 25, "WORKSPACE.SHARE.PUBLISH.UPDATE_METADATA_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r24.publishCopyPermission);
  }
}
function ShareDialogPublishComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 15)(1, "mat-checkbox", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("ngModelChange", function ShareDialogPublishComponent_div_7_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r29.shareModeDirect = $event);
    })("ngModelChange", function ShareDialogPublishComponent_div_7_Template_mat_checkbox_ngModelChange_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r31.updateShareMode("direct"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](4, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](10, "mat-checkbox", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("ngModelChange", function ShareDialogPublishComponent_div_7_Template_mat_checkbox_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r32.shareModeCopy = $event);
    })("ngModelChange", function ShareDialogPublishComponent_div_7_Template_mat_checkbox_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      $event ? ctx_r33.doiActive = true : null;
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r33.updateShareMode("copy"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](13, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](16, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](19, ShareDialogPublishComponent_div_7_div_19_Template, 29, 27, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngModel", ctx_r3.shareModeDirect)("disabled", ctx_r3.isLicenseMissing() || ctx_r3.isAuthorMissing());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](6, 9, "WORKSPACE.SHARE.PUBLISH.MODE_DIRECT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](9, 11, "WORKSPACE.SHARE.PUBLISH.MODE_DIRECT_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngModel", ctx_r3.shareModeCopy)("disabled", !ctx_r3.copyAllowed() || ctx_r3.isCopy || ctx_r3.isLicenseMissing() || ctx_r3.isAuthorMissing());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](15, 13, "WORKSPACE.SHARE.PUBLISH.MODE_COPY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](18, 15, "WORKSPACE.SHARE.PUBLISH.MODE_COPY_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r3.shareModeCopy);
  }
}
function ShareDialogPublishComponent_div_8_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 33)(1, "mat-radio-group", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("ngModelChange", function ShareDialogPublishComponent_div_8_div_9_Template_mat_radio_group_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r36);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r35.handleMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "mat-radio-button", 35)(3, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](4, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](7, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](10, "mat-radio-button", 36)(11, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](12, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerStart"](15, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngModel", ctx_r34.handleMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](6, 6, "WORKSPACE.SHARE.PUBLISH.DOI_DISTINCT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](9, 8, "WORKSPACE.SHARE.PUBLISH.DOI_DISTINCT_INFO"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", !ctx_r34.hasExactOneHandle());
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](14, 10, "WORKSPACE.SHARE.PUBLISH.DOI_UPDATE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](17, 12, "WORKSPACE.SHARE.PUBLISH.DOI_UPDATE_INFO"), " ");
  }
}
function ShareDialogPublishComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 27)(1, "mat-checkbox", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("ngModelChange", function ShareDialogPublishComponent_div_8_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r37.doiActive = $event);
    })("ngModelChange", function ShareDialogPublishComponent_div_8_Template_mat_checkbox_ngModelChange_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r38);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r39.updatePublishedVersions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](6, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](9, ShareDialogPublishComponent_div_8_div_9_Template, 18, 14, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", ctx_r4.doiDisabled)("ngModel", ctx_r4.doiActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](4, 5, "WORKSPACE.SHARE.DOI"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](8, 7, "WORKSPACE.SHARE.DOI_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r4.doiActive);
  }
}
function ShareDialogPublishComponent_div_9_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "es-spinner-small");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
}
function ShareDialogPublishComponent_div_9_div_6_i_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "i", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](1, 1, "WORKSPACE.SHARE.DOI"));
  }
}
function ShareDialogPublishComponent_div_9_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 41)(1, "div", 42)(2, "div")(3, "div", 43)(4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](8, "versionComment");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "div", 44)(10, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](14, "div")(15, "div", 45)(16, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](20, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](21, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](22, ShareDialogPublishComponent_div_9_div_6_i_22_Template, 2, 3, "i", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](23, "div", 48)(24, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function ShareDialogPublishComponent_div_9_div_6_Template_button_click_24_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r45);
      const v_r42 = restoredCtx.$implicit;
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r44.openVersion(v_r42));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](26, "i", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const v_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵclassProp"]("version-virtual", v_r42.status === "new")("version-update", v_r42.status === "update");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](6, 13, "WORKSPACE.SHARE.PUBLISH.VERSION_COMMENT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](8, 15, v_r42), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](12, 17, "WORKSPACE.SHARE.PUBLISH.VERSION_NUMBER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", v_r42["properties"]["cclom:version"][0], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](18, 19, "WORKSPACE.SHARE.PUBLISH.VERSION_DATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](20, 21, v_r42.properties["ccm:published_date_LONG"][0]), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", v_r42.properties["ccm:published_handle_id"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](25, 23, "WORKSPACE.SHARE.PUBLISH.OPEN_VERSION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("disabled", !!v_r42.status);
  }
}
function ShareDialogPublishComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 22)(1, "div", 23)(2, "h6", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, ShareDialogPublishComponent_div_9_div_5_Template, 2, 0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](6, ShareDialogPublishComponent_div_9_div_6_Template, 27, 25, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](4, 3, "WORKSPACE.SHARE.PUBLISH.VERSIONS_PUBLISHED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r5.allPublishedVersions);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx_r5.allPublishedVersions);
  }
}
class PublishedNode extends _core_module_rest_data_object__WEBPACK_IMPORTED_MODULE_2__.Node {}
class ShareDialogPublishComponent {
  constructor(bridge, config, connector, dialogs, legacyNodeService, mdsService, nodeHelper, nodeService, router, toast, translate) {
    this.bridge = bridge;
    this.config = config;
    this.connector = connector;
    this.dialogs = dialogs;
    this.legacyNodeService = legacyNodeService;
    this.mdsService = mdsService;
    this.nodeHelper = nodeHelper;
    this.nodeService = nodeService;
    this.router = router;
    this.toast = toast;
    this.translate = translate;
    this.onDisableInherit = new _angular_core__WEBPACK_IMPORTED_MODULE_21__.EventEmitter();
    this.onInitCompleted = new _angular_core__WEBPACK_IMPORTED_MODULE_21__.EventEmitter();
    this.handleMode = 'distinct';
    this.republish = false;
    this.publishedVersions = [];
    this.initHasStarted = false;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_22__.Subject();
    this.doiPermission = this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.TOOLPERMISSION_HANDLESERVICE);
    this.publishCopyPermission = this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.TOOLPERMISSION_PUBLISH_COPY);
  }
  ngOnInit() {
    this.mdsService.observeCompletionStatus().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.takeUntil)(this.destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.filter)(completion => completion !== null)).subscribe(completion => {
      this.mdsCompletion = {
        completed: (completion.mandatory.completed || 0) + (completion.mandatoryForPublish.completed || 0),
        total: (completion.mandatory.total || 0) + (completion.mandatoryForPublish.total || 0)
      };
    });
  }
  ngOnChanges(changes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.node && _this.permissions && !_this.initHasStarted) {
        _this.initHasStarted = true;
        // refresh already for providing initial state
        _this.refresh();
        _this.node = (yield _this.legacyNodeService.getNodeMetadata(_this.node.ref.id, [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ALL]).toPromise()).node;
        _this.refresh();
        _this.onInitCompleted.emit();
        _this.onInitCompleted.complete();
      }
    })();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  getLicense() {
    return this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_LICENSE]?.[0];
  }
  getLicenseText() {
    return this.translate.instant('LICENSE.NAMES.' + this.getLicense());
  }
  openLicense() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this2.dialogs.openLicenseDialog({
        kind: 'nodes',
        nodes: [_this2.node]
      });
      dialogRef.afterClosed().subscribe(updatedNodes => {
        if (updatedNodes) {
          // We used to fetch the node again, but we should be fine just taking the updated
          // node from the dialog, right?
          //
          // this.node = (
          //     await this.legacyNodeService
          //         .getNodeMetadata(this.node.ref.id, [RestConstants.ALL])
          //         .toPromise()
          // ).node;
          _this2.node = updatedNodes[0];
          _this2.refresh();
        }
      });
    })();
  }
  openMetadata() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this3.dialogs.openMdsEditorDialogForNodes({
        nodes: [_this3.node],
        immediatelyShowMissingRequiredWidgets: true
      });
      dialogRef.afterClosed().subscribe(nodes => {
        if (nodes) {
          _this3.node = nodes[0];
          // this.node = (
          //     await this.legacyNodeService
          //         .getNodeMetadata(this.node.ref.id, [RestConstants.ALL])
          //         .toPromise()
          // ).node;
          _this3.refresh();
        }
      });
    })();
  }
  refresh() {
    this.doiActive = this.nodeHelper.isDOIActive(this.node, this.permissions);
    this.doiDisabled = this.doiActive;
    const prop = this.node?.properties?.[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_PUBLISHED_MODE]?.[0];
    if (prop === ShareMode.Copy) {
      this.shareModeCopy = true;
      this.isCopy = true;
      this.legacyNodeService.getPublishedCopies(this.node.ref.id).subscribe(nodes => {
        this.publishedVersions = nodes.nodes.reverse();
        this.updatePublishedVersions();
      }, error => {
        this.toast.error(error);
      });
    }
    if (prop !== ShareMode.Copy) {
      this.republish = 'new';
    }
    // if GROUP_EVERYONE is not yet invited -> reset to off
    this.shareModeDirect = this.permissions.some(p => p.authority?.authorityName === _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.AUTHORITY_EVERYONE);
    this.initialState = {
      copy: this.shareModeCopy,
      direct: this.shareModeDirect
    };
    this.mdsService.initWithNodes([this.node]);
    this.updatePublishedVersions();
  }
  updateShareMode(type, force = false) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if ((_this4.shareModeCopy || _this4.shareModeDirect) && !force) {
        if (_this4.config.instant('publishingNotice', false)) {
          const dialogRef = yield _this4.dialogs.openGenericDialog({
            title: 'WORKSPACE.SHARE.PUBLISHING_WARNING_TITLE',
            message: 'WORKSPACE.SHARE.PUBLISHING_WARNING_MESSAGE',
            buttons: _generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_8__.YES_OR_NO
          });
          dialogRef.afterClosed().subscribe(response => {
            if (response === 'YES') {
              void _this4.updateShareMode(type, true);
            } else {
              _this4.shareModeDirect = false;
              _this4.shareModeCopy = false;
            }
          });
          return;
        }
      }
      if (_this4.shareModeCopy && _this4.doiPermission && type === 'copy') {
        _this4.doiActive = true;
      }
      _this4.updatePublishedVersions();
    })();
  }
  updatePermissions(permissions) {
    permissions = permissions.filter(p => p.authority.authorityName !== _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.AUTHORITY_EVERYONE);
    if (this.shareModeDirect) {
      const permission = _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_5__.RestHelper.getAllAuthoritiesPermission();
      permission.permissions = [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_CONSUMER, _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.ACCESS_CC_PUBLISH];
      permissions.push(permission);
    }
    return permissions;
  }
  save() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_25__.Observable(observer => {
      if (this.shareModeCopy && (
      // republish and not yet published, or wasn't published before at all
      this.republish === 'new' && !this.currentVersionPublished() || !this.isCopy)) {
        this.legacyNodeService.publishCopy(this.node.ref.id, this.doiPermission && !this.doiDisabled && this.doiActive ? this.handleMode : null).subscribe(({
          node
        }) => {
          observer.next(node);
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      } else if (this.shareModeCopy &&
      // update most recent version
      this.republish === 'update') {
        this.nodeService.copyMetadata(this.publishedVersions[0].ref.id, this.node.ref.id, {}).subscribe(({
          node
        }) => {
          observer.next(node);
          observer.complete();
        }, error => {
          observer.error(error);
          observer.complete();
        });
      } else {
        observer.next(null);
        observer.complete();
      }
    });
  }
  openVersion(node) {
    const url = this.connector.getAbsoluteEdusharingUrl() + this.router.serializeUrl(this.router.createUrlTree([_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIConstants.ROUTER_PREFIX, 'render', node.ref.id]));
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_6__.UIHelper.openUrl(url, this.bridge, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_26__.OPEN_URL_MODE.Blank);
  }
  currentVersionPublished() {
    return this.publishedVersions?.filter(p => p.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.LOM_PROP_LIFECYCLE_VERSION]?.[0] === this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.LOM_PROP_LIFECYCLE_VERSION]?.[0]).length !== 0;
  }
  updatePublishedVersions() {
    if (!this.isCopy && this.shareModeCopy || this.republish === 'new') {
      if (this.node?.properties) {
        const virtual = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_3__.Helper.deepCopy(this.node);
        virtual.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_PUBLISHED_DATE + '_LONG'] = [new Date().getTime()];
        if (this.doiActive && !this.doiDisabled && this.doiPermission) {
          virtual.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_PUBLISHED_HANDLE_ID] = [true];
        }
        virtual.status = 'new';
        this.allPublishedVersions = [virtual].concat(this.publishedVersions);
        this.handleMode = this.hasExactOneHandle() ? 'update' : 'distinct';
      }
    } else if (this.republish === 'update') {
      this.allPublishedVersions = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_3__.Helper.deepCopy(this.publishedVersions);
      this.allPublishedVersions[0].status = 'update';
    } else {
      this.allPublishedVersions = this.publishedVersions;
    }
  }
  getType() {
    if (this.node?.isDirectory) {
      return this.node.collection ? 'COLLECTION' : 'DIRECTORY';
    } else {
      return 'DOCUMENT';
    }
  }
  copyAllowed() {
    return this.publishCopyPermission && !this.node?.isDirectory;
  }
  setRepublish() {
    this.doiActive = this.republish !== false && this.doiPermission;
    this.updatePublishedVersions();
  }
  hasExactOneHandle() {
    return new Set(this.allPublishedVersions.filter(v => !v.status && v.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_PUBLISHED_HANDLE_ID]).map(v => v.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_4__.RestConstants.CCM_PROP_PUBLISHED_HANDLE_ID][0])).size === 1;
  }
  isLicenseMissing() {
    return !this.getLicense() && this.isLicenseEmpty && !this.node.isDirectory;
  }
  isAuthorMissing() {
    return this.isAuthorEmpty && !this.node.isDirectory;
  }
  canBePublished() {
    // it either has all required metadata or is already published anyway
    return this.mdsCompletion?.completed === this.mdsCompletion?.total || this.initialState.copy || this.initialState.direct;
  }
  static #_ = this.ɵfac = function ShareDialogPublishComponent_Factory(t) {
    return new (t || ShareDialogPublishComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_9__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_core_module_rest_services_rest_connector_service__WEBPACK_IMPORTED_MODULE_10__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_11__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_12__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_7__.MdsEditorInstanceService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_13__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_27__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_28__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_14__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_29__.TranslateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
    type: ShareDialogPublishComponent,
    selectors: [["es-share-dialog-publish"]],
    viewQuery: function ShareDialogPublishComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.shareModeCopyRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.shareModeDirectRef = _t.first);
      }
    },
    inputs: {
      node: "node",
      permissions: "permissions",
      inherited: "inherited",
      isAuthorEmpty: "isAuthorEmpty",
      isLicenseEmpty: "isLicenseEmpty"
    },
    outputs: {
      onDisableInherit: "onDisableInherit",
      onInitCompleted: "onInitCompleted"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵProvidersFeature"]([_mds_mds_editor_mds_editor_instance_service__WEBPACK_IMPORTED_MODULE_7__.MdsEditorInstanceService]), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵNgOnChangesFeature"]],
    decls: 10,
    vars: 9,
    consts: [[1, "group-padding"], [1, "mat-heading-4"], [4, "ngIf"], ["mode", "warning", 4, "ngIf"], ["mode", "info", 4, "ngIf"], ["class", "share-type", 4, "ngIf"], ["class", "doi", 4, "ngIf"], ["class", "published-versions-container", 4, "ngIf"], ["mode", "error", 4, "ngIf"], ["mode", "info"], ["mat-button", "", "color", "primary", "esToolpermissionCheck", "", "toolpermission", "TOOLPERMISSION_LICENSE", 3, "click"], ["esIcon", "arrow_forward"], ["mode", "warning"], ["mat-button", "", "color", "primary", 3, "click"], ["mode", "error"], [1, "share-type"], ["value", "direct", 3, "ngModel", "disabled", "ngModelChange"], ["shareModeDirectRef", ""], ["slot", "label"], ["slot", "description", 1, "description"], [3, "ngModel", "disabled", "ngModelChange"], ["shareModeCopyRef", ""], [1, "published-versions-container"], [1, "published-versions"], [1, "version-republish"], [3, "disabled", "value"], ["slot", "description"], [1, "doi"], ["id", "doi", 3, "disabled", "ngModel", "ngModelChange"], [1, "strong", "label"], ["esIcon", "vpn_key"], [1, "label-secondary"], ["class", "handle-mode", 4, "ngIf"], [1, "handle-mode"], [3, "ngModel", "ngModelChange"], ["value", "distinct"], ["value", "update", 3, "disabled"], [1, "published-versions", "mat-heading-6"], ["class", "no-versions", 4, "ngIf"], ["class", "version", 3, "version-virtual", "version-update", 4, "ngFor", "ngForOf"], [1, "no-versions"], [1, "version"], [1, "version-group"], [1, "version-comment"], [1, "version-number"], [1, "version-date"], [1, "version-handle"], ["esIcon", "vpn_key", 3, "matTooltip", 4, "ngIf"], [1, "version-actions"], ["mat-button", "", "color", "primary", 3, "disabled", "matTooltip", "click"], ["esIcon", "open_in_new"], ["esIcon", "vpn_key", 3, "matTooltip"]],
    template: function ShareDialogPublishComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](4, ShareDialogPublishComponent_ng_container_4_Template, 6, 5, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, ShareDialogPublishComponent_es_info_message_5_Template, 8, 6, "es-info-message", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](6, ShareDialogPublishComponent_es_info_message_6_Template, 3, 3, "es-info-message", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](7, ShareDialogPublishComponent_div_7_Template, 20, 17, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](8, ShareDialogPublishComponent_div_8_Template, 10, 9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](9, ShareDialogPublishComponent_div_9_Template, 7, 5, "div", 7);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](3, 7, "WORKSPACE.SHARE.PUBLISH_" + ctx.getType()), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !(ctx.node == null ? null : ctx.node.isDirectory));
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.inherited);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.isCopy);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx.inherited && ctx.canBePublished());
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.doiPermission && ctx.publishCopyPermission && !ctx.inherited && ctx.shareModeCopy && ctx.republish === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.shareModeCopy);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_31__.MatTooltip, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_26__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_15__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_33__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_34__.MatCheckbox, _angular_material_radio__WEBPACK_IMPORTED_MODULE_35__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_35__.MatRadioButton, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_16__.MultiLineLabelComponent, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_17__.SpinnerSmallComponent, _shared_directives_toolpermission_check_directive__WEBPACK_IMPORTED_MODULE_18__.ToolpermissionCheckDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_29__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_26__.FormatDatePipe, _shared_pipes_version_label_pipe__WEBPACK_IMPORTED_MODULE_19__.VersionLabelPipe, _node_author_name_pipe__WEBPACK_IMPORTED_MODULE_20__.NodeAuthorNamePipe],
    styles: ["\n\nes-info-message[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 10px 20px;\n}\nes-info-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n\n.share-type[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 10px 0;\n}\n\n.group-padding[_ngcontent-%COMP%] {\n  padding: 5px 25px;\n}\n.group-padding[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n\n.published-versions-container[_ngcontent-%COMP%] {\n  padding: 5px 28px;\n}\n.published-versions-container[_ngcontent-%COMP%]   h6.published-versions[_ngcontent-%COMP%] {\n  padding-top: 10px;\n}\n.published-versions-container[_ngcontent-%COMP%]   .no-versions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  font-size: 90%;\n  color: var(--textLight);\n  font-style: italic;\n  text-align: center;\n  padding-top: 10px;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 5px 10px;\n  width: 100%;\n  justify-content: space-between;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%]    > mat-radio-button[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n@media screen and (max-width: 700px) {\n  .published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   mat-radio-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   es-info-message[_ngcontent-%COMP%] {\n  display: block;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  background-color: #f9f9f9;\n  padding: 5px 20px;\n  margin: 5px 0;\n  border-radius: 50px;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 4px 6px;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div.version-number[_ngcontent-%COMP%] {\n  align-items: flex-end;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-group[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  text-transform: uppercase;\n  font-size: var(--fontSizeXSmall);\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-handle[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  width: 40px;\n  display: flex;\n  justify-content: flex-end;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-date[_ngcontent-%COMP%] {\n  font-size: 90%;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version.version-virtual[_ngcontent-%COMP%] {\n  background: #e1f7ed;\n  border: 2px dashed #42ca8d;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version.version-update[_ngcontent-%COMP%] {\n  background: #fbead5;\n  border: 2px dashed #e98c1b;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-actions[_ngcontent-%COMP%] {\n  align-self: center;\n}\n.published-versions-container[_ngcontent-%COMP%]   .published-versions[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]   .version-actions[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: 5px;\n}\n\n.doi[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  margin: 0 0 20px 0;\n  padding: 10px 58px;\n}\n.doi[_ngcontent-%COMP%]   .handle-mode[_ngcontent-%COMP%] {\n  padding-top: 8px;\n}\n.doi[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.doi[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  margin: 0 5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy9wdWJsaXNoL3B1Ymxpc2guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7RUFDQSxrQkFBQTtBQUFKO0FBQ0k7RUFDSSxnQkFBQTtBQUNSOztBQUdJO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUFBUjs7QUFHQTtFQUNJLGlCQUFBO0FBQUo7QUFDSTtFQUNJLHFCQUFBO0FBQ1I7O0FBRUE7RUFDSSxpQkFBQTtBQUNKO0FBQUk7RUFDSSxpQkFBQTtBQUVSO0FBQUk7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsdUJEZEk7RUNlSixrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFFUjtBQUFJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBRVI7QUFEUTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSw4QkFBQTtBQUdaO0FBRlk7RUFDSSxlQUFBO0FBSWhCO0FBRlk7RUFSSjtJQVNRLHNCQUFBO0VBS2Q7QUFDRjtBQUhRO0VBQ0ksY0FBQTtBQUtaO0FBSFE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EseUJETVU7RUNMVixpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUtaO0FBSFk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FBS2hCO0FBSGdCO0VBQ0ksYUFBQTtFQUNBLDhCQUFBO0FBS3BCO0FBSm9CO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFNeEI7QUFMd0I7RUFDSSxxQkFBQTtBQU81QjtBQUx3QjtFQUNJLHVCRDlEaEI7RUMrRGdCLHlCQUFBO0VBQ0EsZ0NEdkRYO0FDOERqQjtBQUZZO0VBQ0ksdUJEdEVKO0VDdUVJLFdBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFJaEI7QUFGWTtFQUNJLGNEcEVBO0FDd0VoQjtBQUZZO0VBQ0ksbUJBQUE7RUFDQSwwQkFBQTtBQUloQjtBQUZZO0VBQ0ksbUJBQUE7RUFDQSwwQkFBQTtBQUloQjtBQUZZO0VBQ0ksa0JBQUE7QUFJaEI7QUFIZ0I7RUFDSSxZQUFBO0VBQ0EsV0FBQTtBQUtwQjs7QUFDQTtFQUNJLHlCRGxEa0I7RUNtRGxCLGtCQUFBO0VBQ0Esa0JBQUE7QUFFSjtBQURJO0VBQ0ksZ0JBQUE7QUFHUjtBQURJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBR1I7QUFGUTtFQUNJLGFBQUE7QUFJWiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG5lcy1pbmZvLW1lc3NhZ2Uge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgIGJ1dHRvbiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgfVxufVxuLnNoYXJlLXR5cGUge1xuICAgIG1hdC1jaGVja2JveCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICB9XG59XG4uZ3JvdXAtcGFkZGluZyB7XG4gICAgcGFkZGluZzogNXB4ICRjYXJkUGFkZGluZztcbiAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG4gICAgfVxufVxuLnB1Ymxpc2hlZC12ZXJzaW9ucy1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDVweCAyOHB4O1xuICAgIGg2LnB1Ymxpc2hlZC12ZXJzaW9ucyB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgIH1cbiAgICAubm8tdmVyc2lvbnMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiA5MCU7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgfVxuICAgIC5wdWJsaXNoZWQtdmVyc2lvbnMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBtYXQtcmFkaW8tZ3JvdXAge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIG1hcmdpbjogNXB4IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgID4gbWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogKCRtb2JpbGVXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVzLWluZm8tbWVzc2FnZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgICAgICAudmVyc2lvbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNhcmRMaWdodEJhY2tncm91bmQ7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMjBweDtcbiAgICAgICAgICAgIG1hcmdpbjogNXB4IDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xuXG4gICAgICAgICAgICAudmVyc2lvbi1ncm91cCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgICAgICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAmLnZlcnNpb24tbnVtYmVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+IGxhYmVsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplWFNtYWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnZlcnNpb24taGFuZGxlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAudmVyc2lvbi1kYXRlIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6ICRmb250U2l6ZVNtYWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJi52ZXJzaW9uLXZpcnR1YWwge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0ZW4oJHdvcmtzcGFjZUluaGVyaXRDb2xvciwgNDAlKTtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDJweCBkYXNoZWQgJHdvcmtzcGFjZUluaGVyaXRDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYudmVyc2lvbi11cGRhdGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpZ2h0ZW4oJHdhcm5pbmdNZWRpdW0sIDQwJSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAycHggZGFzaGVkICR3YXJuaW5nTWVkaXVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnZlcnNpb24tYWN0aW9ucyB7XG4gICAgICAgICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgICAgICAgID4gYnV0dG9uIHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDVweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4uZG9pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2FyZExpZ2h0QmFja2dyb3VuZDtcbiAgICBtYXJnaW46IDAgMCAyMHB4IDA7XG4gICAgcGFkZGluZzogMTBweCAkY2FyZFBhZGRpbmcgKyAzM3B4O1xuICAgIC5oYW5kbGUtbW9kZSB7XG4gICAgICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gICAgfVxuICAgIC5sYWJlbCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgID4gaSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgNXB4O1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}
var ShareMode;
(function (ShareMode) {
  ShareMode["Direct"] = "direct";
  ShareMode["Copy"] = "copy";
})(ShareMode || (ShareMode = {}));

/***/ }),

/***/ 95574:
/*!***************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/restricted-access/restricted-access.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogRestrictedAccessComponent: () => (/* binding */ ShareDialogRestrictedAccessComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 21916);










function ShareDialogRestrictedAccessComponent_div_9_mat_checkbox_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-checkbox", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ShareDialogRestrictedAccessComponent_div_9_mat_checkbox_6_Template_mat_checkbox_ngModelChange_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const permission_r2 = restoredCtx.$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.restrictedAccessPermissions[permission_r2.key] = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const permission_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r1.restrictedAccessPermissions[permission_r2.key]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 2, "WORKSPACE.SHARE.RESTRICTED_ACCESS.PERMISSION." + permission_r2.key), " ");
  }
}
function ShareDialogRestrictedAccessComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5)(1, "h5", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "es-info-message", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ShareDialogRestrictedAccessComponent_div_9_mat_checkbox_6_Template, 3, 4, "mat-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 3, "WORKSPACE.SHARE.RESTRICTED_ACCESS.ADDITIONAL_PERMISSIONS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("message", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 5, "WORKSPACE.SHARE.RESTRICTED_ACCESS.ADDITIONAL_PERMISSIONS_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 7, ctx_r0.restrictedAccessPermissions));
  }
}
class ShareDialogRestrictedAccessComponent {
  constructor(nodeService) {
    this.nodeService = nodeService;
    this.RESTRICTED_ACCESS_PERMISSIONS = ['ReadAll', 'DownloadContent', 'Print'];
  }
  ngOnChanges(changes) {
    this.restrictedAccess = this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_RESTRICTED_ACCESS]?.[0] || false;
    this.restrictedAccessPermissions = {};
    const permissions = this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_RESTRICTED_ACCESS_PERMISSIONS] || [];
    this.RESTRICTED_ACCESS_PERMISSIONS.forEach(perm => {
      this.restrictedAccessPermissions[perm] = permissions.includes(perm);
    });
    // remove print option if not a pdf file
    if (this.node.mediatype !== 'file-pdf') {
      delete this.restrictedAccessPermissions['Print'];
    }
  }
  ngOnInit() {}
  save() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const properties = {
        [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_RESTRICTED_ACCESS]: [_this.restrictedAccess + ''],
        [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_RESTRICTED_ACCESS_PERMISSIONS]: Object.keys(_this.restrictedAccessPermissions).filter(key => _this.restrictedAccessPermissions[key] === true)
      };
      _this.node.properties = {
        ..._this.node.properties,
        ...properties
      };
      yield _this.nodeService.editNodeMetadata(_this.node.ref.id, properties).toPromise();
    })();
  }
  static #_ = this.ɵfac = function ShareDialogRestrictedAccessComponent_Factory(t) {
    return new (t || ShareDialogRestrictedAccessComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_5__.NodeService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: ShareDialogRestrictedAccessComponent,
    selectors: [["es-share-dialog-restricted-access"]],
    inputs: {
      node: "node"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 10,
    vars: 8,
    consts: [[1, "group-padding"], [3, "ngModel", "ngModelChange"], ["slot", "label"], ["slot", "description", 1, "description"], ["class", "additional-permissions", 4, "ngIf"], [1, "additional-permissions"], [1, "mat-heading-5"], ["mode", "info", 3, "message"], [3, "ngModel", "ngModelChange", 4, "ngFor", "ngForOf"]],
    template: function ShareDialogRestrictedAccessComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "mat-checkbox", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ShareDialogRestrictedAccessComponent_Template_mat_checkbox_ngModelChange_1_listener($event) {
          return ctx.restrictedAccess = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "es-multi-line-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](3, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, ShareDialogRestrictedAccessComponent_div_9_Template, 8, 9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.restrictedAccess);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 4, "WORKSPACE.SHARE.RESTRICTED_ACCESS.PRIMARY"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 6, "WORKSPACE.SHARE.RESTRICTED_ACCESS.SECONDARY"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.restrictedAccess);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_2__.InfoMessageComponent, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__.MatCheckbox, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_3__.MultiLineLabelComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.KeyValuePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
    styles: ["\n\n.group-padding[_ngcontent-%COMP%] {\n  padding: 30px 25px;\n}\n.group-padding[_ngcontent-%COMP%]   .additional-permissions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n}\n.group-padding[_ngcontent-%COMP%]   .additional-permissions[_ngcontent-%COMP%]    > es-info-message[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy9yZXN0cmljdGVkLWFjY2Vzcy9yZXN0cmljdGVkLWFjY2Vzcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksa0JBQUE7QUFBSjtBQUNJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtBQUNSO0FBQVE7RUFDSSxvQkFBQTtBQUVaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5ncm91cC1wYWRkaW5nIHtcbiAgICBwYWRkaW5nOiAzMHB4ICRjYXJkUGFkZGluZztcbiAgICAuYWRkaXRpb25hbC1wZXJtaXNzaW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgID4gZXMtaW5mby1tZXNzYWdlIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 41379:
/*!****************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/share-dialog.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogComponent: () => (/* binding */ ShareDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _restricted_access_restricted_access_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./restricted-access/restricted-access.component */ 95574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _card_dialog_card_dialog_utils_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../card-dialog/card-dialog-utils.service */ 1846);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/components/authority-search-input/authority-search-input.component */ 68504);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _shared_components_link_link_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/components/link/link.component */ 5491);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/chips */ 21757);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slide-toggle */ 59293);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/components/multi-line-label/multi-line-label.component */ 12883);
/* harmony import */ var _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./choose-type/choose-type.component */ 28177);
/* harmony import */ var _permission_permission_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./permission/permission.component */ 65313);
/* harmony import */ var _publish_publish_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./publish/publish.component */ 14465);
/* harmony import */ var _usage_usage_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./usage/usage.component */ 98737);
/* harmony import */ var _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../shared/pipes/permission-name.pipe */ 44431);
/* harmony import */ var _share_dialog_data__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./share-dialog-data */ 19614);








































const _c0 = ["publish"];
const _c1 = ["inheritRef"];
const _c2 = ["state"];
const _c3 = ["shareLink"];
function ShareDialogComponent_ng_template_0_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_ng_template_0_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r14.openShareLinkDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "OPTIONS.SHARE_LINK"), " ");
  }
}
function ShareDialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, ShareDialogComponent_ng_template_0_button_0_Template, 4, 3, "button", 13);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx_r1.isCollection() && !ctx_r1.isBulk() && ctx_r1.showShareLink());
  }
}
function ShareDialogComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "WORKSPACE.TAB_INVITE"));
  }
}
function ShareDialogComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.NO_FUZZY"), " ");
  }
}
const _c4 = function () {
  return {
    field: "secondary"
  };
};
function ShareDialogComponent_div_9_mat_chip_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-chip", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("removed", function ShareDialogComponent_div_9_mat_chip_2_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r21);
      const permission_r19 = restoredCtx.$implicit;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r20.removePermission(permission_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "div", 25)(2, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](7, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](8, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const permission_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 2, permission_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind2"](7, 4, permission_r19, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](7, _c4)));
  }
}
function ShareDialogComponent_div_9_div_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 1, "WORKSPACE.SHARE.TYPE_UNKNOWN"));
  }
}
function ShareDialogComponent_div_9_div_3_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 1, "WORKSPACE.SHARE.TYPE_VIEWER"));
  }
}
function ShareDialogComponent_div_9_div_3_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 1, "WORKSPACE.SHARE.TYPE_COWORKER"));
  }
}
function ShareDialogComponent_div_9_div_3_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 1, "WORKSPACE.SHARE.TYPE_COORDINATOR"));
  }
}
function ShareDialogComponent_div_9_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 29)(1, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_div_9_div_3_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r26.chooseType());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ShareDialogComponent_div_9_div_3_ng_container_3_Template, 6, 3, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_div_9_div_3_ng_container_4_Template, 6, 3, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, ShareDialogComponent_div_9_div_3_ng_container_5_Template, 6, 3, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, ShareDialogComponent_div_9_div_3_ng_container_6_Template, 6, 3, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 7, "WORKSPACE.SHARE.TYPE_MENU_LABEL_NEW"))("aria-expanded", ctx_r17.showChooseType || null)("aria-controls", ctx_r17.showChooseType ? "es-share-dialog-choose-type-menu" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r17.currentType.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r17.currentType.indexOf("Consumer") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r17.currentType.indexOf("Collaborator") > -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r17.currentType.indexOf("Coordinator") > -1);
  }
}
function ShareDialogComponent_div_9_es_share_dialog_choose_type_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "es-share-dialog-choose-type", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("onCancel", function ShareDialogComponent_div_9_es_share_dialog_choose_type_4_Template_es_share_dialog_choose_type_onCancel_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r28.showChooseType = false);
    })("onType", function ShareDialogComponent_div_9_es_share_dialog_choose_type_4_Template_es_share_dialog_choose_type_onType_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r29);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r30.setType($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](1, 4, "WORKSPACE.SHARE.TYPE_MENU_LABEL_NEW"))("selected", ctx_r18.currentType)("isDirectory", ctx_r18._nodes[0].isDirectory)("canPublish", !ctx_r18.isSafe);
  }
}
function ShareDialogComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 19)(1, "mat-chip-set", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, ShareDialogComponent_div_9_mat_chip_2_Template, 9, 8, "mat-chip", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ShareDialogComponent_div_9_div_3_Template, 7, 9, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_div_9_es_share_dialog_choose_type_4_Template, 2, 6, "es-share-dialog-choose-type", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r4.getNewInvitedAuthorities());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r4.getNewInvitedAuthorities().length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r4.showChooseType);
  }
}
function ShareDialogComponent_div_10_mat_form_field_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-form-field", 42)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "textarea", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("ngModelChange", function ShareDialogComponent_div_10_mat_form_field_8_Template_textarea_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r33);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r32.notifyMessage = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("@overlay", ctx_r31.notifyUsers);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 4, "WORKSPACE.SHARE.MESSAGE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](5, 6, "WORKSPACE.SHARE.MESSAGE_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngModel", ctx_r31.notifyMessage);
  }
}
function ShareDialogComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 38)(1, "mat-checkbox", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("ngModelChange", function ShareDialogComponent_div_10_Template_mat_checkbox_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r34.notifyUsers = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](8, ShareDialogComponent_div_10_mat_form_field_8_Template, 6, 8, "mat-form-field", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngModel", ctx_r5.notifyUsers);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 4, "WORKSPACE.NOTIFY_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](7, 6, "WORKSPACE.NOTIFY_INFO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r5.notifyUsers);
  }
}
function ShareDialogComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 44)(1, "mat-radio-group", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("ngModelChange", function ShareDialogComponent_div_11_Template_mat_radio_group_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r36.bulkMode = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "h4", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "mat-radio-button", 47)(6, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](7, 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](10, 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](13, "mat-radio-button", 50)(14, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](15, 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](18, 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](21, "div", 51)(22, "mat-slide-toggle", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("ngModelChange", function ShareDialogComponent_div_11_Template_mat_slide_toggle_ngModelChange_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r37);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r38.bulkInvite = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](23, "es-multi-line-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](24, 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](27, 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngModel", ctx_r6.bulkMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 10, "WORKSPACE.SHARE.BULK_MODE.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](9, 12, "WORKSPACE.SHARE.BULK_MODE.EXTEND"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](12, 14, "WORKSPACE.SHARE.BULK_MODE.EXTEND_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](17, 16, "WORKSPACE.SHARE.BULK_MODE.REPLACE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](20, 18, "WORKSPACE.SHARE.BULK_MODE.REPLACE_DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngModel", ctx_r6.bulkInvite)("disabled", !ctx_r6.publishPermission);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](26, 20, "WORKSPACE.SHARE.PUBLISH.MODE_DIRECT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](29, 22, "WORKSPACE.SHARE.PUBLISH.MODE_DIRECT_INFO_MULTIPLE"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "WORKSPACE.TAB_INVITED"));
  }
}
function ShareDialogComponent_mat_tab_12_es_mat_link_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "es-mat-link", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_mat_tab_12_es_mat_link_3_Template_es_mat_link_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r53.showHistory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "i", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.SHOW_HISTORY"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.GROUP_OWNER"));
  }
}
function ShareDialogComponent_mat_tab_12_es_share_dialog_permission_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "es-share-dialog-permission", 66);
  }
  if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", ctx_r42.owner)("isDirectory", ctx_r42._nodes[0].isDirectory)("readOnly", true)("showDelete", false);
  }
}
function ShareDialogComponent_mat_tab_12_div_6_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "es-share-dialog-permission", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const permission_r61 = ctx.$implicit;
    const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", permission_r61)("isDirectory", ctx_r60._nodes[0].isDirectory)("inherit", true)("readOnly", true);
  }
}
function ShareDialogComponent_mat_tab_12_div_6_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_12_div_6_div_10_div_1_Template, 2, 4, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("crossed", !ctx_r56.inherited);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r56.inherit);
  }
}
function ShareDialogComponent_mat_tab_12_div_6_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.INHERIT_DISABLED"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_6_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.INHERIT_ACCESS_DENIED"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_6_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.INHERIT_EMPTY"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div")(1, "div", 67)(2, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "div", 68)(6, "mat-checkbox", 69, 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_mat_tab_12_div_6_Template_mat_checkbox_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r63);
      const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](7);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r62.onCheckInherit(_r55));
    })("ngModelChange", function ShareDialogComponent_mat_tab_12_div_6_Template_mat_checkbox_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r63);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r64.inherited = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](10, ShareDialogComponent_mat_tab_12_div_6_div_10_Template, 2, 3, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](11, ShareDialogComponent_mat_tab_12_div_6_div_11_Template, 3, 3, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](12, ShareDialogComponent_mat_tab_12_div_6_div_12_Template, 3, 3, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](13, ShareDialogComponent_mat_tab_12_div_6_div_13_Template, 3, 3, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 7, "WORKSPACE.SHARE.GROUP_INHERIT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngModel", ctx_r43.inherited);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](9, 9, "WORKSPACE.SHARE.INHERIT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r43.inherited && ctx_r43.inherit && ctx_r43.inherit.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx_r43.inherited);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r43.inherited && ctx_r43.inheritAccessDenied);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r43.inherited && !ctx_r43.inherit.length && !ctx_r43.inheritAccessDenied);
  }
}
function ShareDialogComponent_mat_tab_12_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.GROUP_GROUPS"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div")(1, "es-share-dialog-permission", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("onRemove", function ShareDialogComponent_mat_tab_12_div_9_Template_es_share_dialog_permission_onRemove_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r67);
      const permission_r65 = restoredCtx.$implicit;
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r66.removePermission(permission_r65));
    })("onType", function ShareDialogComponent_mat_tab_12_div_9_Template_es_share_dialog_permission_onType_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r67);
      const permission_r65 = restoredCtx.$implicit;
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      permission_r65.permissions = $event.permissions;
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r68.updatePermissionInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const permission_r65 = ctx.$implicit;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("added", ctx_r45.isNewPermission(permission_r65));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", permission_r65)("readOnly", !permission_r65.editable && !ctx_r45.isNewPermission(permission_r65))("showDelete", permission_r65.editable || ctx_r45.isNewPermission(permission_r65))("isDeleted", ctx_r45.isDeleted(permission_r65))("isDirectory", ctx_r45._nodes[0].isDirectory)("canPublish", !ctx_r45.isSafe);
  }
}
function ShareDialogComponent_mat_tab_12_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.GROUP_USERS"), " ");
  }
}
function ShareDialogComponent_mat_tab_12_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div")(1, "es-share-dialog-permission", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("onRemove", function ShareDialogComponent_mat_tab_12_div_12_Template_es_share_dialog_permission_onRemove_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r71);
      const permission_r69 = restoredCtx.$implicit;
      const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r70.removePermission(permission_r69));
    })("onType", function ShareDialogComponent_mat_tab_12_div_12_Template_es_share_dialog_permission_onType_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r71);
      const permission_r69 = restoredCtx.$implicit;
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      permission_r69.permissions = $event.permissions;
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r72.updatePermissionInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const permission_r69 = ctx.$implicit;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("added", ctx_r47.isNewPermission(permission_r69));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", permission_r69)("readOnly", !permission_r69.editable && !ctx_r47.isNewPermission(permission_r69))("showDelete", permission_r69.editable || ctx_r47.isNewPermission(permission_r69))("isDeleted", ctx_r47.isDeleted(permission_r69))("isDirectory", ctx_r47._nodes[0].isDirectory)("canPublish", !ctx_r47.isSafe);
  }
}
function ShareDialogComponent_mat_tab_12_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "es-mat-link", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_mat_tab_12_ng_container_13_Template_es_mat_link_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r74);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r73.openShareLinkDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](7, "es-share-dialog-permission", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 6, "WORKSPACE.SHARE.LINK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](6, 8, "WORKSPACE.SHARE.MANAGE_LINK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", ctx_r48.linkEnabled)("isDirectory", ctx_r48._nodes[0].isDirectory)("readOnly", true)("showDelete", false);
  }
}
function ShareDialogComponent_mat_tab_12_ng_container_14_es_mat_link_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "es-mat-link", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("click", function ShareDialogComponent_mat_tab_12_ng_container_14_es_mat_link_4_Template_es_mat_link_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r77);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r76.tab = 2);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.MANAGE_PUBLISH"), "");
  }
}
function ShareDialogComponent_mat_tab_12_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_mat_tab_12_ng_container_14_es_mat_link_4_Template, 3, 3, "es-mat-link", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "es-share-dialog-permission", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 9, "WORKSPACE.SHARE.PUBLISH_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r49.publishPermission && !ctx_r49.isBulk() && !ctx_r49.isSafe);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("added", !(ctx_r49.publishComponent.initialState == null ? null : ctx_r49.publishComponent.initialState.direct) && !(ctx_r49.publishComponent.initialState == null ? null : ctx_r49.publishComponent.initialState.copy) && (ctx_r49.publishComponent.shareModeDirect || ctx_r49.publishComponent.shareModeCopy));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("permission", ctx_r49.publishEnabled)("isDirectory", ctx_r49._nodes[0].isDirectory)("readOnly", true)("showDelete", false)("isDeleted", ((ctx_r49.publishComponent.initialState == null ? null : ctx_r49.publishComponent.initialState.direct) || (ctx_r49.publishComponent.initialState == null ? null : ctx_r49.publishComponent.initialState.copy)) && !ctx_r49.publishComponent.shareModeDirect && !ctx_r49.publishComponent.shareModeCopy);
  }
}
function ShareDialogComponent_mat_tab_12_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.USAGES"));
  }
}
function ShareDialogComponent_mat_tab_12_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 85)(1, "es-share-dialog-usage", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("deleteListChange", function ShareDialogComponent_mat_tab_12_div_16_Template_es_share_dialog_usage_deleteListChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r79);
      const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r78.deletedUsages = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("name", "COLLECTION")("usages", ctx_r51.collections)("deleteList", ctx_r51.deletedUsages);
  }
}
function ShareDialogComponent_mat_tab_12_div_17_es_share_dialog_usage_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "es-share-dialog-usage", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("deleteListChange", function ShareDialogComponent_mat_tab_12_div_17_es_share_dialog_usage_1_Template_es_share_dialog_usage_deleteListChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r83);
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r82.deletedUsages = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const usage_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().$implicit;
    const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("name", usage_r80.key)("usages", usage_r80.value)("deleteList", ctx_r81.deletedUsages);
  }
}
function ShareDialogComponent_mat_tab_12_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_12_div_17_es_share_dialog_usage_1_Template, 1, 3, "es-share-dialog-usage", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const usage_r80 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", usage_r80.key !== "null");
  }
}
function ShareDialogComponent_mat_tab_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-tab", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_12_ng_template_1_Template, 4, 3, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ShareDialogComponent_mat_tab_12_es_mat_link_3_Template, 4, 3, "es-mat-link", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_mat_tab_12_div_4_Template, 3, 3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, ShareDialogComponent_mat_tab_12_es_share_dialog_permission_5_Template, 1, 4, "es-share-dialog-permission", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, ShareDialogComponent_mat_tab_12_div_6_Template, 14, 11, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](7, ShareDialogComponent_mat_tab_12_div_7_Template, 3, 3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](8, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](9, ShareDialogComponent_mat_tab_12_div_9_Template, 2, 8, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](10, ShareDialogComponent_mat_tab_12_div_10_Template, 3, 3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](11, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](12, ShareDialogComponent_mat_tab_12_div_12_Template, 2, 8, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](13, ShareDialogComponent_mat_tab_12_ng_container_13_Template, 8, 10, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, ShareDialogComponent_mat_tab_12_ng_container_14_Template, 6, 11, "ng-container", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](15, ShareDialogComponent_mat_tab_12_div_15_Template, 3, 3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](16, ShareDialogComponent_mat_tab_12_div_16_Template, 2, 3, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](17, ShareDialogComponent_mat_tab_12_div_17_Template, 2, 1, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](18, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7._nodes && ctx_r7._nodes[0].ref.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.owner);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.owner);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.inheritAllowed && !ctx_r7.isCollection());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.permissionsGroup && ctx_r7.permissionsGroup.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r7.permissionsGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.permissionsUser && ctx_r7.permissionsUser.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r7.permissionsUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.showLink && ctx_r7.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !!(ctx_r7.publishComponent == null ? null : ctx_r7.publishComponent.shareModeDirect) || !!(ctx_r7.publishComponent == null ? null : ctx_r7.publishComponent.shareModeCopy) || !!(ctx_r7.publishComponent == null ? null : ctx_r7.publishComponent.initialState == null ? null : ctx_r7.publishComponent.initialState.direct) || !!(ctx_r7.publishComponent == null ? null : ctx_r7.publishComponent.initialState == null ? null : ctx_r7.publishComponent.initialState.copy));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.hasUsages());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.collections && ctx_r7.collections.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](18, 13, ctx_r7.usages));
  }
}
function ShareDialogComponent_mat_tab_13_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "WORKSPACE.TAB_PUBLISH"));
  }
}
function ShareDialogComponent_mat_tab_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r88 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-tab", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_13_ng_template_1_Template, 4, 3, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 88)(3, "es-share-dialog-publish", 89, 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("onInitCompleted", function ShareDialogComponent_mat_tab_13_Template_es_share_dialog_publish_onInitCompleted_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r88);
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r87.setInitialState());
    })("onDisableInherit", function ShareDialogComponent_mat_tab_13_Template_es_share_dialog_publish_onDisableInherit_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r88);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r89.inherited = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("node", ctx_r8._nodes[0])("permissions", ctx_r8.permissions)("inherited", ctx_r8.getPublishInherit())("isAuthorEmpty", ctx_r8.isAuthorRequired() ? ctx_r8.isAuthorEmpty() : false)("isLicenseEmpty", ctx_r8.isLicenseMandatory() ? ctx_r8.isLicenseEmpty() : false);
  }
}
function ShareDialogComponent_mat_tab_14_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "WORKSPACE.TAB_RESTRICTED_ACCESS"));
  }
}
function ShareDialogComponent_mat_tab_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-tab", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_14_ng_template_1_Template, 4, 3, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "es-share-dialog-restricted-access", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("node", ctx_r9._nodes[0]);
  }
}
function ShareDialogComponent_mat_tab_15_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](3, 1, "WORKSPACE.TAB_ADVANCED"));
  }
}
function ShareDialogComponent_mat_tab_15_h4_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "h4", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](2, 1, "WORKSPACE.SHARE.NO_PERMISSIONS"), " ");
  }
}
function ShareDialogComponent_mat_tab_15_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r99 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 101)(1, "mat-checkbox", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function ShareDialogComponent_mat_tab_15_div_4_div_6_Template_mat_checkbox_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r99);
      const type_r96 = restoredCtx.$implicit;
      const permission_r94 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().$implicit;
      const ctx_r97 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r97.setPermission(permission_r94, type_r96, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const type_r96 = ctx.$implicit;
    const permission_r94 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().$implicit;
    const ctx_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpropertyInterpolate"]("id", permission_r94.authority.authorityName + "_" + type_r96);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("checked", ctx_r95.hasImplicitPermission(permission_r94, type_r96))("disabled", ctx_r95.isImplicitPermission(permission_r94, type_r96));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", type_r96, " ");
  }
}
function ShareDialogComponent_mat_tab_15_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div")(1, "div", 98)(2, "i", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](5, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, ShareDialogComponent_mat_tab_15_div_4_div_6_Template, 3, 4, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const permission_r94 = ctx.$implicit;
    const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](permission_r94.authority.authorityType === "USER" ? "person" : "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](5, 3, permission_r94), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r93.ALL_PERMISSIONS);
  }
}
function ShareDialogComponent_mat_tab_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "mat-tab", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_mat_tab_15_ng_template_1_Template, 4, 3, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ShareDialogComponent_mat_tab_15_h4_3_Template, 3, 3, "h4", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_mat_tab_15_div_4_Template, 7, 5, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r10.permissionsUser.length + ctx_r10.permissionsGroup.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r10.permissionsGroup.concat(ctx_r10.permissionsUser));
  }
}
function ShareDialogComponent_ng_template_16_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("state-changed", ctx_r102.isStateModified());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 3, "WORKSPACE.SHARE.STATE.PRIVATE"), "");
  }
}
function ShareDialogComponent_ng_template_16_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("state-changed", ctx_r103.isStateModified());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](4, 3, "WORKSPACE.SHARE.STATE.SHARED"), "");
  }
}
function ShareDialogComponent_ng_template_16_div_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 106)(1, "i", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2, "public");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r104 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("state-changed", ctx_r104.isStateModified());
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](5, 3, "WORKSPACE.SHARE.STATE.PUBLIC"), "");
  }
}
function ShareDialogComponent_ng_template_16_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ShareDialogComponent_ng_template_16_div_0_div_1_Template, 5, 5, "div", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, ShareDialogComponent_ng_template_16_div_0_div_2_Template, 5, 5, "div", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ShareDialogComponent_ng_template_16_div_0_div_3_Template, 6, 5, "div", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r101.getState() === "PRIVATE");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r101.getState() === "SHARED");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r101.getState() === "PUBLIC");
  }
}
function ShareDialogComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, ShareDialogComponent_ng_template_16_div_0_Template, 4, 3, "div", 103);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r12.initialState);
  }
}
class ShareDialogComponent {
  set tab(tab) {
    this._tab = tab;
    this.updateButtons();
  }
  get tab() {
    return this._tab;
  }
  constructor(data, dialogRef, applicationRef, authenticationService, cardDialogUtils, collectionService, config, connector, localEvents, dialogs, iam, nodeApi, toast, translate, usageApi) {
    //this.dataService=new SearchData(iam);
    this.data = data;
    this.dialogRef = dialogRef;
    this.applicationRef = applicationRef;
    this.authenticationService = authenticationService;
    this.cardDialogUtils = cardDialogUtils;
    this.collectionService = collectionService;
    this.config = config;
    this.connector = connector;
    this.localEvents = localEvents;
    this.dialogs = dialogs;
    this.iam = iam;
    this.nodeApi = nodeApi;
    this.toast = toast;
    this.translate = translate;
    this.usageApi = usageApi;
    this.RestConstants = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants;
    this.ALL_PERMISSIONS = ['All', 'Read', 'ReadPreview', 'ReadContent', 'DownloadContent', 'Print', 'ReadAll', 'Comment', 'Rate', 'Write', 'Delete', 'DeleteChildren', 'DeleteNode', 'AddChildren', 'Consumer', 'ConsumerMetadata', 'Editor', 'Contributor', 'Collaborator', 'Coordinator', 'ReadPermissions', 'ChangePermissions', 'CCPublish', 'Relation', 'Comment', 'Feedback', 'Deny'];
    this.PERMISSIONS_FORCES = [['Read', ['ConsumerMetadata']], ['Read', ['Consumer']], ['ReadPreview', ['ReadAll']], ['ReadContent', ['ReadAll']], ['Print', ['Consumer']], ['DownloadContent', ['Consumer']], ['ReadAll', ['Consumer']], ['Comment', ['Consumer']], ['Feedback', ['Consumer']], ['Rate', ['Consumer']], ['Write', ['Editor']], ['DeleteChildren', ['Delete']], ['DeleteNode', ['Delete']], ['AddChildren', ['Contributor']], ['Relation', ['Contributor']], ['ReadPermissions', ['Contributor']], ['Contributor', ['Collaborator']]];
    this._tab = 0;
    this.newPermissions = [];
    this.inheritAccessDenied = false;
    this.bulkMode = 'extend';
    this.bulkInvite = false;
    this.link = false;
    this.inheritAllowed = false;
    this.isSharedScope = false;
    this.globalSearch = false;
    this.globalAllowed = false;
    this.fuzzyAllowed = false;
    this.isSafe = false;
    this.collectionColumns = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.getDefaultCollectionColumns();
    // store authorities marked for deletion
    this.deletedPermissions = [];
    this.deletedUsages = [];
    this.currentType = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH];
    this.notifyUsers = true;
    this.inherit = [];
    this.permissions = null;
    this.showChooseType = false;
    this.linkEnabled = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
    this.linkEnabled.authority = {
      authorityName: this.translate.instant('WORKSPACE.SHARE.LINK_ENABLED_INFO'),
      authorityType: 'LINK'
    };
    this.linkEnabled.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER];
    this.linkDisabled = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
    this.linkDisabled.authority = {
      authorityName: this.translate.instant('WORKSPACE.SHARE.LINK_DISABLED_INFO'),
      authorityType: 'LINK'
    };
    this.linkDisabled.permissions = [];
    this.publishEnabled = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
    this.publishEnabled.authority = {
      authorityName: this.translate.instant('WORKSPACE.SHARE.PUBLISH_ENABLED'),
      authorityType: 'EVERYONE'
    };
    this.publishEnabled.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.PERMISSION_CONSUMER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH];
    this.connector.isLoggedIn(false).subscribe(data => {
      this.isSafe = data.currentScope != null;
      this.updateToolpermissions();
    });
    // Call in constructor to avoid changed-after-checked error when setting `isLoading` state.
    this.initNodes();
  }
  ngOnInit() {
    this.initButtons();
  }
  ngAfterViewInit() {
    this.initCardRefs();
  }
  initButtons() {
    const buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('CANCEL', {
      color: 'standard'
    }, () => this.cancel()), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('SAVE',
    // Can be changed in `updateButtons`.
    {
      color: 'primary'
    }, () => this.save())];
    this.dialogRef.patchConfig({
      buttons
    });
  }
  initNodes() {
    const isStringArray = a => typeof a[0] === 'string';
    if (isStringArray(this.data.nodes)) {
      this.dialogRef.patchState({
        isLoading: true
      });
      rxjs__WEBPACK_IMPORTED_MODULE_20__.forkJoin(this.data.nodes.map(nodeId => this.nodeApi.getNodeMetadata(nodeId, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]))).subscribe(nodeWrappers => {
        this.dialogRef.patchState({
          isLoading: false
        });
        const nodes = nodeWrappers.map(({
          node
        }) => node);
        this.setNodes(nodes);
      });
    } else {
      this.setNodes(this.data.nodes);
    }
  }
  initCardRefs() {
    this.dialogRef.patchConfig({
      customHeaderBarContent: this.shareLinkRef,
      customBottomBarContent: this.stateRef
    });
  }
  isCollection() {
    if (this._nodes == null) {
      return true;
    }
    return this._nodes[0].aspects.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_COLLECTION) !== -1;
  }
  openShareLinkDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const node = _this._nodes[0];
      const dialogRef = yield _this.dialogs.openShareLinkDialog({
        node
      });
      dialogRef.afterClosed().subscribe(() => _this.updateNodeLink());
    })();
  }
  addSuggestion(data) {
    this.addAuthority(data);
  }
  setNodes(nodes) {
    void this.cardDialogUtils.configForNodes(nodes).then(config => this.dialogRef.patchConfig(config));
    this._nodes = nodes;
    this.initialize();
  }
  initialize() {
    const isDirectory = new Set(this._nodes.map(n => n.isDirectory));
    if (isDirectory.size !== 1) {
      this.toast.error(null, 'WORKSPACE.SHARE.ERROR_INVALID_TYPE_COMBINATION');
      // async to make sure the dialogRef is available
      setTimeout(() => this.cancel());
      return;
    }
    if (isDirectory.values().next()) {
      this.currentType = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER];
    }
    if (this.data.currentPermissions) {
      this.originalPermissions = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.data.currentPermissions);
      this.setPermissions(this.data.currentPermissions.permissions);
      this.isInherited(this.data.currentPermissions.inherited);
      this.showLink = false;
    } else {
      this.showLink = true;
      this.updateNodeLink();
      this.dialogRef.patchState({
        isLoading: true
      });
      (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.forkJoin)(this._nodes.map(n => this.nodeApi.getNodePermissions(n.ref.id))).subscribe(permissions => {
        this.originalPermissions = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(permissions.map(p => p.permissions.localPermissions));
        if (permissions.length === 1 && permissions[0].permissions) {
          //this.originalPermissions=Helper.deepCopy(permissions[0].permissions.localPermissions);
          this.setPermissions(permissions[0].permissions.localPermissions.permissions);
          this.isInherited(permissions[0].permissions.localPermissions.inherited);
          setTimeout(() => this.setInitialState());
        } else {
          this.setPermissions([]);
        }
        this.dialogRef.patchState({
          isLoading: false
        });
      });
      this.reloadUsages();
    }
    if (this._nodes.length === 1 && this._nodes[0].parent && this._nodes[0].parent.id) {
      this.nodeApi.getNodePermissions(this._nodes[0].parent.id).subscribe(data => {
        if (data.permissions) {
          this.inherit = data.permissions.inheritedPermissions;
          this.removePermissions(this.inherit, 'OWNER');
          this.inherit = this.inherit.filter(p => p.authority.authorityName !== this.connector.getCurrentLogin()?.authorityName);
          this.removePermissions(data.permissions.localPermissions.permissions, 'OWNER');
          this.inherit = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.mergePermissions(this.inherit, data.permissions.localPermissions.permissions);
          // dealy on tick to let sub-components (share-publish) init
          this.initialState = this.getState();
        }
      }, error => {
        this.inheritAccessDenied = true;
      });
      this.nodeApi.getNodeParents(this._nodes[0].ref.id).subscribe(data => {
        //this.inheritAllowed = !this.isCollection() && data.nodes.length > 1;
        // changed in 4.1 to keep inherit state of collections
        this.inheritAllowed = data.scope === 'MY_FILES' || data.nodes.length > 1;
        this.isSharedScope = data.scope === 'SHARED_FILES';
        this.updateToolpermissions();
      }, error => {
        // this can be caused if the node is somewhere at a location not fully visible to the user
        this.inheritAllowed = true;
        this.updateToolpermissions();
      });
      if (this._nodes[0].ref.id) {
        this.nodeApi.getNodeMetadata(this._nodes[0].ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).subscribe(data => {
          let authority = data.node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_CREATOR][0];
          let user = data.node.createdBy;
          if (data.node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_OWNER]) {
            authority = data.node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_OWNER][0];
            user = data.node.owner;
          }
          this.owner = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
          this.owner.authority = {
            authorityName: authority,
            authorityType: 'USER'
          };
          this.owner.user = user;
          this.iam.getUser(authority).subscribe(apiUser => {
            this.owner.user = apiUser.person.profile;
            // force a refresh of the data for ui update
            this.owner = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.owner);
          }, error => {
            // ignore, only relevant for the avatar of the owner
          });
          this.owner.permissions = ['Owner'];
        });
      }
    }
    this.connector.isLoggedIn(false).subscribe(data => {
      this.isAdmin = data.isAdmin;
    });
  }
  isDeleted(p) {
    return this.deletedPermissions.indexOf(p.authority.authorityName) !== -1;
  }
  cancel() {
    this.dialogRef.close(null);
  }
  hasUsages() {
    return this.usages && Object.keys(this.usages).length;
  }
  showHistory() {
    const node = this._nodes[0];
    void this.dialogs.openShareHistoryDialog({
      node
    });
  }
  filterDisabledPermissions(permissions) {
    let result = [];
    if (!permissions) return result;
    for (let p of permissions) {
      if (this.deletedPermissions.indexOf(p.authority.authorityName) === -1) result.push(p);
    }
    return result;
  }
  setPermission(permission, name, status) {
    if (status.checked) {
      if (permission.permissions.indexOf(name) == -1) permission.permissions.push(name);
    } else {
      let index = permission.permissions.indexOf(name);
      if (index != -1) {
        permission.permissions.splice(index, 1);
      }
    }
    this.applicationRef.tick();
  }
  isImplicitPermission(permission, name) {
    //if(name=="Consumer") // this is the default permission, can't be removed
    //  return true;
    if (name != 'All' && permission.permissions.indexOf('All') != -1)
      // coordinator implies all permissions
      return true;
    if (name != 'Coordinator' && permission.permissions.indexOf('Coordinator') != -1)
      // coordinator implies all permissions
      return true;
    for (let array of this.PERMISSIONS_FORCES) {
      if (array[0] != name) continue;
      let list = array[1];
      if (!list) return false;
      let result = true;
      for (let perm of list) {
        if (perm == name) continue;
        if (this.hasImplicitPermission(permission, perm)) continue;
        result = false;
        break;
      }
      if (result) return true;
    }
    return false;
  }
  hasImplicitPermission(permission, name) {
    if (permission.permissions.indexOf(name) != -1) return true;
    return this.isImplicitPermission(permission, name);
  }
  updateNodeLink() {
    this.nodeApi.getNodeShares(this._nodes[0].ref.id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SHARE_LINK).subscribe(data => {
      this.link = data.length > 0 && data[0].expiryDate != 0;
    });
  }
  reloadUsages() {
    this.usageApi.getNodeUsagesCollection(this._nodes[0].ref.id).subscribe(collections => {
      this.collections = collections.filter(c => c.collectionUsageType === 'ACTIVE');
      this.usageApi.getNodeUsages(this._nodes[0].ref.id).subscribe(usages => {
        const filteredUsages = usages.usages.filter(u => this.collections.filter(c => c.nodeId === u.nodeId).length === 0);
        this.usages = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestUsageService.getNodeUsagesByRepositoryType(filteredUsages);
      });
    });
  }
  openCollection(collection) {
    window.open(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIConstants.ROUTER_PREFIX + 'collections?id=' + collection.ref.id);
  }
  isStateModified() {
    return this.initialState !== this.getState();
  }
  getState() {
    if (this.getPublishActive() || this.getPublishInherit()) {
      return 'PUBLIC';
    }
    const permissions = [...(this.permissions ?? []), ...(this.inherited ? this.inherit : [])];
    for (const perm of permissions) {
      if (perm.authority.authorityName !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE && perm.authority.authorityName !== this.connector.getCurrentLogin()?.authorityName) return 'SHARED';
    }
    return 'PRIVATE';
  }
  isBulk() {
    return this._nodes && this._nodes.length > 1;
  }
  showShareLink() {
    return !this.isCollection() && this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_LINK);
  }
  updateButtons() {
    // const saveButton = this.buttons[1];
    // saveButton.label = 'SAVE'; // this.tab == 0 ? 'WORKSPACE.BTN_INVITE' : 'APPLY';
  }
  chooseType() {
    this.showChooseType = true;
  }
  chooseTypeList(p) {
    this.showChooseTypeList = p;
  }
  removePermission(p) {
    if (this.isDeleted(p)) this.deletedPermissions.splice(this.deletedPermissions.indexOf(p.authority.authorityName), 1);else this.deletedPermissions.push(p.authority.authorityName);
    /*
    if(this.newPermissions.indexOf(p)!=-1)
    this.newPermissions.splice(this.newPermissions.indexOf(p),1);
    this.permissions.splice(this.permissions.indexOf(p),1);
    this.setPermissions(this.permissions);
    */
  }

  setType(type) {
    this.currentType = type.permissions;
    if (type.wasMain) this.showChooseType = false;
    for (let permission of this.newPermissions) {
      permission.permissions = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(this.currentType);
    }
  }
  contains(permissions, permission, comparePermissions) {
    for (let p of permissions) {
      if (p.authority.authorityName == permission.authority.authorityName) {
        if (!comparePermissions) return true;
        if (_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.arrayEquals(p.permissions, permission.permissions)) return true;
      }
    }
    return false;
  }
  addAuthority(selected) {
    if (selected == null) return;
    let permission = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.Permission();
    permission.authority = {
      authorityName: selected.authorityName,
      authorityType: selected.authorityType
    };
    if (selected.authorityType == 'USER') {
      permission.user = selected.profile;
    } else {
      permission.group = selected.profile;
    }
    permission.permissions = this.currentType;
    permission = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(permission);
    if (this.deletedPermissions.indexOf(permission.authority.authorityName) != -1) {
      this.deletedPermissions.splice(this.deletedPermissions.indexOf(permission.authority.authorityName), 1);
    } else if (!this.contains(this.permissions, permission, false)) {
      this.newPermissions.push(permission);
      this.permissions.push(permission);
      this.setPermissions(this.permissions);
    } else this.toast.error(null, 'WORKSPACE.PERMISSION_AUTHORITY_EXISTS');
    this.searchStr = '';
  }
  isNewPermission(p) {
    if (!this.originalPermissions?.length || !this.originalPermissions[0].permissions) return true;
    return !this.contains(this.originalPermissions[0].permissions, p, true);
  }
  save() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.permissions != null) {
        _this2.dialogRef.patchState({
          isLoading: true
        });
        let inherit = _this2.inherited && _this2.inheritAllowed && !_this2.isCollection();
        const actions = _this2._nodes.map((n, i) => {
          return /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
            let permissions = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(_this2.permissions);
            if (_this2.isBulk()) {
              if (_this2.bulkInvite) {
                const permission = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.getAllAuthoritiesPermission();
                permission.permissions = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CONSUMER, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH];
                permissions.push(permission);
              }
              // keep inherit state of original node
              inherit = _this2.originalPermissions[i].inherited;
              if (_this2.bulkMode === 'extend') {
                permissions = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.mergePermissionsWithHighestPermission(_this2.originalPermissions[i].permissions, permissions);
              } else {
                // we do nothing, because the original ones are getting deleted
              }
            }
            permissions = permissions.filter(p => !_this2.isDeleted(p));
            // handle the invitation of group everyone
            if (_this2.publishComponent) {
              permissions = _this2.publishComponent.updatePermissions(permissions);
              try {
                yield _this2.publishComponent.save().toPromise();
              } catch (error) {
                _this2.toast.error(error);
                _this2.dialogRef.patchState({
                  isLoading: false
                });
                return;
              }
            }
            if (_this2.restrictedAccessComponent) {
              try {
                if (_this2.data.sendToApi) {
                  yield _this2.restrictedAccessComponent.save();
                }
              } catch (error) {
                _this2.toast.error(error);
                _this2.dialogRef.patchState({
                  isLoading: false
                });
                return;
              }
            }
            yield _this2.handlePermissionsPerNode(n, permissions, inherit);
          });
        });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.forkJoin)(actions.map(a => a())).subscribe(() => {
          if (!_this2.data.sendToApi) {
            return;
          }
          _this2.updateUsages(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyPermissions(_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.deepCopy(_this2.permissions), inherit));
        }, error => {
          _this2.toast.error(error);
          _this2.dialogRef.patchState({
            isLoading: false
          });
        });
      }
    })();
  }
  updateToolpermissions() {
    this.connector.hasToolPermission(this.isSafe ? this.isSharedScope ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE_SAFE : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SAFE : this.isSharedScope ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH).subscribe(has => this.globalAllowed = has);
    this.authenticationService.hasToolpermission(this.isSafe ? this.isSharedScope ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE_SAFE : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SAFE : this.isSharedScope ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_SHARE : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH).then(has => this.globalAllowed = has);
    this.authenticationService.hasToolpermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_GLOBAL_AUTHORITY_SEARCH_FUZZY).then(has => this.fuzzyAllowed = has);
    this.authenticationService.hasToolpermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_INVITE_ALLAUTHORITIES).then(has => this.publishPermission = has);
    this.authenticationService.hasToolpermission(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_CONTROL_RESTRICTED_ACCESS).then(has => this.restrictedAccessPermission = has);
  }
  updatePermissionInfo() {
    let type;
    for (let permission of this.newPermissions) {
      if (type && !_core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.arrayEquals(type, permission.permissions)) {
        this.currentType = [];
        return;
      }
      type = permission.permissions;
    }
    if (type) this.currentType = type;
  }
  removePermissions(permissions, remove) {
    for (let i = 0; i < remove.length; i++) {
      if (permissions[i] && permissions[i].authority.authorityType == remove) {
        permissions.splice(i, 1);
        i--;
      }
    }
  }
  setPermissions(permissions) {
    if (permissions == null) {
      permissions = [];
    }
    this.permissions = permissions;
    this.permissionsUser = this.permissions.slice();
    this.permissionsGroup = this.permissions.slice();
    this.removePermissions(this.permissionsUser, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_GROUP);
    this.removePermissions(this.permissionsUser, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_EVERYONE);
    this.removePermissions(this.permissionsGroup, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER);
    // do not show GROUP_EVERYONE permission, is displayed in the share-publish dialog
    this.removePermissions(this.permissionsGroup, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_EVERYONE);
  }
  getPublishInherit() {
    return this.inherited && this.getAuthorityPos(this.inherit, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE) !== -1;
  }
  localPublish() {
    return this.getAuthorityPos(this.permissions, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE) !== -1 && this.deletedPermissions?.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE) === -1;
  }
  getPublishActive() {
    return this.getPublishInherit() ||
    // this.localPublish() ||
    this.publishComponent?.shareModeDirect || this.publishComponent?.shareModeCopy;
  }
  getAuthorityPos(permissions, authority) {
    let i = 0;
    for (let permission of permissions) {
      if (permission.authority.authorityName == authority) return i;
      i++;
    }
    return -1;
  }
  updateUsages(permissions, pos = 0, error = false) {
    // skip for bulk mode
    if (pos === this.deletedUsages.length || this.isBulk()) {
      if (this.data.sendToApi) {
        this.localEvents.nodesChanged.emit(this.data.nodes);
      }
      this.dialogRef.close(this.getEmitObject(permissions));
      if (!error) {
        this.toast.toast('WORKSPACE.PERMISSIONS_UPDATED');
      }
      return;
    }
    let usage = this.deletedUsages[pos];
    // collection
    if (usage.collection) {
      this.collectionService.removeFromCollection(usage.resourceId, usage.collection.ref.id).subscribe(() => {
        this.updateUsages(permissions, pos + 1);
      }, error => {
        this.toast.error(error);
        this.updateUsages(permissions, pos + 1, true);
      });
    } else {
      this.usageApi.deleteNodeUsage(this._nodes[0].ref.id, usage.nodeId).subscribe(() => {
        this.updateUsages(permissions, pos + 1);
      }, error => {
        this.toast.error(error);
        this.updateUsages(permissions, pos + 1, true);
      });
    }
  }
  getEmitObject(localPermissions) {
    return {
      permissions: localPermissions,
      notify: this.notifyUsers,
      notifyMessage: this.notifyMessage
    };
  }
  handlePermissionsPerNode(n, permissions, inherit) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const permissionsCopy = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyAndCleanPermissions(permissions, inherit);
      if (!_this3.data.sendToApi) {
        _this3.dialogRef.close(_this3.getEmitObject(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.copyPermissions(permissions, inherit)));
        return null;
      }
      yield _this3.nodeApi.setNodePermissions(n.ref.id, permissionsCopy, _this3.notifyUsers && _this3.data.sendMessages, _this3.notifyMessage, false).toPromise();
    })();
  }
  setInitialState() {
    this.initialState = this.getState();
  }
  getNewInvitedAuthorities() {
    return this.filterDisabledPermissions(this.newPermissions).filter(p => p.authority.authorityName !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_EVERYONE);
  }
  onCheckInherit(event) {
    if (!event._checked) {
      if (this.isLicenseMandatory() && !this.isLicenseEmpty()) {
        if (this.isAuthorRequired() && this.isAuthorEmpty()) {
          this.toast.error(null, this.translate.instant('WORKSPACE.LICENSE.RELEASE_WITHOUT_AUTHOR'));
        } else {
          this.toast.error(null, this.translate.instant('WORKSPACE.SHARE.PUBLISH.LICENSE_REQUIRED'));
        }
        event.preventDefaultEvent();
      }
    }
  }
  isInherited(inherited) {
    if (this.isLicenseMandatory() && !this.isLicenseEmpty()) {
      if (this.isAuthorRequired() && this.isAuthorEmpty()) {
        this.inherited = false;
      } else {
        this.inherited = inherited;
      }
    } else {
      this.inherited = inherited;
    }
  }
  /**
   * Check if license is mandatory
   * @return true | false | not exist return false
   */
  isLicenseMandatory() {
    return this.config.instant('publish.licenseMandatory', false);
  }
  isAuthorMandatory() {
    return this.config.instant('publish.authorMandatory', false);
  }
  /**
   * Check if license is empty
   * @return true | false | not exist return false
   */
  isLicenseEmpty() {
    if (this._nodes == null || !this._nodes[0].properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE]?.[0]) {
      return true;
    }
    return false;
  }
  /**
   * Check if author is required
   * For CC_0 and PDM, Author is not required, and we can share also without author
   * @return true | false | not exist return false
   */
  isAuthorRequired() {
    if (!this.isAuthorMandatory()) {
      return false;
    }
    if (this._nodes !== null) {
      return !this._nodes[0].properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE]?.includes('CC_0') && !this._nodes[0].properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LICENSE]?.includes('PDM');
    }
    return false;
  }
  /**
   * Check if Author is empty
   * @return true | false | not exist return false
   */
  isAuthorEmpty() {
    if (this._nodes == null || !this._nodes[0].properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR]?.[0]) {
      return true;
    }
    return false;
  }
  static #_ = this.ɵfac = function ShareDialogComponent_Factory(t) {
    return new (t || ShareDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_6__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_22__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_card_dialog_card_dialog_utils_service__WEBPACK_IMPORTED_MODULE_7__.CardDialogUtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_8__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_9__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestUsageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
    type: ShareDialogComponent,
    selectors: [["es-share-dialog"]],
    viewQuery: function ShareDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_restricted_access_restricted_access_component__WEBPACK_IMPORTED_MODULE_5__.ShareDialogRestrictedAccessComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c3, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.publishComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.restrictedAccessComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.inheritRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.stateRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.shareLinkRef = _t.first);
      }
    },
    decls: 18,
    vars: 10,
    consts: [["shareLink", ""], ["mat-stretch-tabs", "", 3, "selectedIndex", "selectedIndexChange"], [1, "tabContent", "tabContentInvite"], ["mat-tab-label", ""], [1, "invite-group"], [1, "group", "groupInvite"], [3, "globalSearchAllowed", "onChooseAuthority"], ["class", "hintNoFuzzy", 4, "ngIf"], ["class", "group groupToInvite", 4, "ngIf"], ["class", "groupMessage", 4, "ngIf"], ["class", "bulk-config", 4, "ngIf"], ["class", "tabContent", 4, "ngIf"], ["state", ""], ["mat-raised-button", "", "class", "share-link-button", 3, "click", 4, "ngIf"], ["mat-raised-button", "", 1, "share-link-button", 3, "click"], ["esIcon", "link"], ["esIcon", "group_add", 1, "tab-icon"], [1, "tab-label"], [1, "hintNoFuzzy"], [1, "group", "groupToInvite"], [1, "toInvite"], [3, "removed", 4, "ngFor", "ngForOf"], ["class", "typeButton", 4, "ngIf"], ["class", "typeAdd", 3, "aria-label", "selected", "isDirectory", "canPublish", "onCancel", "onType", 4, "ngIf"], [3, "removed"], [1, "mat-chip-group"], [1, "primary"], [1, "secondary"], ["matChipRemove", "", "esIcon", "cancel"], [1, "typeButton"], ["mat-raised-button", "", "role", "combobox", "aria-haspopup", "true", 3, "click"], [4, "ngIf"], ["esIcon", "help_outline"], ["aria-hidden", "true", "esIcon", "keyboard_arrow_down"], ["esIcon", "remove_red_eye"], ["esIcon", "edit"], ["esIcon", "work"], [1, "typeAdd", 3, "aria-label", "selected", "isDirectory", "canPublish", "onCancel", "onType"], [1, "groupMessage"], ["id", "notify", 3, "ngModel", "ngModelChange"], [1, "notify-info"], ["floatLabel", "always", 4, "ngIf"], ["floatLabel", "always"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "3", "cdkAutosizeMaxRows", "5", "id", "message", "name", "message", 3, "ngModel", "placeholder", "ngModelChange"], [1, "bulk-config"], [3, "ngModel", "ngModelChange"], [1, "mat-heading-4"], ["value", "extend"], ["slot", "label"], ["slot", "description"], ["value", "replace"], [1, "publish-bulk"], [3, "ngModel", "disabled", "ngModelChange"], [1, "tabContent"], [1, "invited"], ["class", "history uppercase", 3, "click", 4, "ngIf"], ["class", "groupName", 4, "ngIf"], ["class", "groupEntry owner", 3, "permission", "isDirectory", "readOnly", "showDelete", 4, "ngIf"], [1, "normal"], [4, "ngFor", "ngForOf"], ["class", "usage", 4, "ngIf"], ["class", "usage", 4, "ngFor", "ngForOf"], ["esIcon", "group", 1, "tab-icon"], [1, "history", "uppercase", 3, "click"], ["esIcon", "arrow_forward"], [1, "groupName"], [1, "groupEntry", "owner", 3, "permission", "isDirectory", "readOnly", "showDelete"], [1, "groupHeading"], [1, "inheritCheck"], ["id", "inherit", 3, "ngModel", "click", "ngModelChange"], ["inheritRef", ""], ["class", "inherit", 3, "crossed", 4, "ngIf"], ["class", "inheritDisabled", 4, "ngIf"], ["class", "inheritEmpty", 4, "ngIf"], [1, "inherit"], ["class", "groupEntry", 4, "ngFor", "ngForOf"], [1, "groupEntry"], [3, "permission", "isDirectory", "inherit", "readOnly"], [1, "inheritDisabled"], [1, "inheritEmpty"], [1, "groupEntry", 3, "permission", "readOnly", "showDelete", "isDeleted", "isDirectory", "canPublish", "onRemove", "onType"], [1, "manageLink", "uppercase", 3, "click"], [1, "groupEntry", "link", 3, "permission", "isDirectory", "readOnly", "showDelete"], ["class", "manageLink uppercase", 3, "click", 4, "ngIf"], [1, "groupEntry", "link", 3, "permission", "isDirectory", "readOnly", "showDelete", "isDeleted"], [1, "usage"], [1, "usageEntry", 3, "name", "usages", "deleteList", "deleteListChange"], ["class", "usageEntry", 3, "name", "usages", "deleteList", "deleteListChange", 4, "ngIf"], [1, "publish-tab"], [3, "node", "permissions", "inherited", "isAuthorEmpty", "isLicenseEmpty", "onInitCompleted", "onDisableInherit"], ["publish", ""], ["esIcon", "public", 1, "tab-icon"], [1, "restricted-access-tab"], [3, "node"], ["esIcon", "lock", 1, "tab-icon"], [1, "advanced"], ["class", "mat-heading-4", 4, "ngIf"], ["esIcon", "settings", 1, "tab-icon"], [1, "advancedAuthority"], [1, "type", "material-icons"], ["class", "advancedPermission", 4, "ngFor", "ngForOf"], [1, "advancedPermission"], [3, "id", "checked", "disabled", "change"], ["class", "state", 4, "ngIf"], [1, "state"], ["class", "show-state", 3, "state-changed", 4, "ngIf"], [1, "show-state"], ["esIcon", "lock"], ["esIcon", "group"], [1, "material-icons", 2, "color", "#42ca8d"]],
    template: function ShareDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, ShareDialogComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "mat-tab-group", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("selectedIndexChange", function ShareDialogComponent_Template_mat_tab_group_selectedIndexChange_2_listener($event) {
          return ctx.tab = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "mat-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, ShareDialogComponent_ng_template_4_Template, 4, 3, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "div", 4)(6, "div", 5)(7, "es-authority-search-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("onChooseAuthority", function ShareDialogComponent_Template_es_authority_search_input_onChooseAuthority_7_listener($event) {
          return ctx.addSuggestion($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](8, ShareDialogComponent_div_8_Template, 3, 3, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](9, ShareDialogComponent_div_9_Template, 5, 3, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](10, ShareDialogComponent_div_10_Template, 9, 8, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](11, ShareDialogComponent_div_11_Template, 30, 24, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](12, ShareDialogComponent_mat_tab_12_Template, 19, 15, "mat-tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](13, ShareDialogComponent_mat_tab_13_Template, 5, 5, "mat-tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, ShareDialogComponent_mat_tab_14_Template, 4, 1, "mat-tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](15, ShareDialogComponent_mat_tab_15_Template, 5, 2, "mat-tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](16, ShareDialogComponent_ng_template_16_Template, 1, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("selectedIndex", ctx.tab);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("globalSearchAllowed", ctx.globalAllowed);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.globalSearch && !ctx.fuzzyAllowed);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.getNewInvitedAuthorities().length);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.data.sendMessages && ctx.getNewInvitedAuthorities().length);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.isBulk());
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx._nodes && ctx._nodes.length === 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx._nodes && ctx.publishPermission && !ctx.isBulk() && !ctx.isSafe);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx._nodes && ctx.restrictedAccessPermission && !ctx.isBulk() && !ctx.isSafe);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.isAdmin && ctx.permissionsUser && ctx.permissionsGroup);
      }
    },
    dependencies: [_shared_components_authority_search_input_authority_search_input_component__WEBPACK_IMPORTED_MODULE_10__.AuthoritySearchInputComponent, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_24__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel, _shared_components_link_link_component__WEBPACK_IMPORTED_MODULE_11__.LinkComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_27__.MatCheckbox, _angular_material_chips__WEBPACK_IMPORTED_MODULE_28__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_28__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_28__.MatChipSet, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_30__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_31__.CdkTextareaAutosize, _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_32__.MatRadioButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggle, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_34__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_34__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_34__.MatTabGroup, _shared_components_multi_line_label_multi_line_label_component__WEBPACK_IMPORTED_MODULE_12__.MultiLineLabelComponent, _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_13__.ShareDialogChooseTypeComponent, _permission_permission_component__WEBPACK_IMPORTED_MODULE_14__.ShareDialogPermissionComponent, _publish_publish_component__WEBPACK_IMPORTED_MODULE_15__.ShareDialogPublishComponent, _usage_usage_component__WEBPACK_IMPORTED_MODULE_16__.ShareDialogUsageComponent, _restricted_access_restricted_access_component__WEBPACK_IMPORTED_MODULE_5__.ShareDialogRestrictedAccessComponent, _angular_common__WEBPACK_IMPORTED_MODULE_24__.KeyValuePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_17__.PermissionNamePipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n[_nghost-%COMP%]     mat-checkbox .mat-checkbox-layout, [_nghost-%COMP%]     mat-radio-button .mat-radio-label {\n  white-space: normal;\n}\n[_nghost-%COMP%]     .mat-tab-body-wrapper {\n  flex-grow: 1;\n}\n\n.mat-mdc-tab-group[_ngcontent-%COMP%] {\n  height: 100%;\n  flex-grow: 1;\n  min-height: 0;\n}\n.mat-mdc-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper {\n  height: 100%;\n}\n\n.advancedPermission[_ngcontent-%COMP%] {\n  float: left;\n  width: 33.33%;\n}\n\n.hintNoFuzzy[_ngcontent-%COMP%] {\n  margin-top: -10px;\n  margin-bottom: 10px;\n  padding: 0 10px;\n  color: var(--textLight);\n}\n\n.group[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  padding: 10px 20px;\n}\n\n.groupInvite[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  padding-top: 26px;\n  flex-direction: column;\n}\n\n.invited[_ngcontent-%COMP%], .advanced[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n}\n\n.advanced[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n\n.advancedAuthority[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  float: left;\n  width: 100%;\n  font-weight: bold;\n  padding: 10px 0;\n}\n.advancedAuthority[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: relative;\n  top: 5px;\n  padding-right: 10px;\n}\n\n.history[_ngcontent-%COMP%] {\n  padding-right: 20px;\n  float: right;\n}\n\n.groupMessage[_ngcontent-%COMP%] {\n  padding: 0 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.groupMessage[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.invite-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.publish-bulk[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  margin-left: -25px;\n  width: calc(100% + 50px);\n  padding: 20px 25px;\n  background-color: #eee;\n}\n\n.bulk-config[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n}\n.bulk-config[_ngcontent-%COMP%]   .mat-heading-4[_ngcontent-%COMP%] {\n  padding-bottom: 15px;\n}\n.bulk-config[_ngcontent-%COMP%]   .mat-radio-button[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n}\n\n.groupToInvite[_ngcontent-%COMP%] {\n  display: flex;\n  margin-top: 35px;\n  padding-bottom: 45px;\n  padding-right: 20px;\n  align-items: center;\n}\n.groupToInvite[_ngcontent-%COMP%]   .toInvite[_ngcontent-%COMP%] {\n  overflow: hidden;\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n.groupToInvite[_ngcontent-%COMP%]   .toInvite[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n.groupToInvite[_ngcontent-%COMP%]   .typeButton[_ngcontent-%COMP%] {\n  display: flex;\n}\n.groupToInvite[_ngcontent-%COMP%]   .typeButton[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  padding: 0 4px;\n  display: inline;\n}\n.groupToInvite[_ngcontent-%COMP%]   .typeButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 40px;\n}\n\n.crossed[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n}\n\n.groupEntry[_ngcontent-%COMP%], .usageEntry[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  background: #eee;\n  border-radius: 25px;\n  margin-bottom: 6px;\n  align-items: center;\n  border: 2px dashed transparent;\n}\n.groupEntry[_ngcontent-%COMP%]   es-share-dialog-permission[_ngcontent-%COMP%], .usageEntry[_ngcontent-%COMP%]   es-share-dialog-permission[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.groupEntry[_ngcontent-%COMP%] {\n  min-height: 35px;\n}\n\n.added[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: #42ca8d;\n}\n\n.inherit[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  min-height: 50px;\n}\n\n.inherit[_ngcontent-%COMP%]   .groupEntry[_ngcontent-%COMP%] {\n  border: 1px solid #42ca8d;\n  cursor: default;\n}\n\n.normal[_ngcontent-%COMP%] {\n  cursor: default;\n}\n\n.owner[_ngcontent-%COMP%] {\n  cursor: default;\n}\n\n.groupHeading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  padding-bottom: 10px;\n}\n\n.groupName[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 90%;\n  padding-top: 15px;\n  padding-bottom: 5px;\n  float: left;\n}\n\n.inheritDisabled[_ngcontent-%COMP%], .inheritEmpty[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n  padding: 0 10px 20px 10px;\n  font-style: italic;\n  width: 100%;\n  text-align: center;\n  white-space: pre-wrap;\n}\n\n.tabContentInvite[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n\n.inheritCheck[_ngcontent-%COMP%] {\n  float: left;\n  padding-left: 20px;\n}\n\n.manageLink[_ngcontent-%COMP%] {\n  float: right;\n  padding-right: 15px;\n  position: relative;\n  top: 14px;\n}\n\n.typeAdd[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  width: 310px !important;\n  top: -60px;\n}\n\n.notify-info[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.share-link-button[_ngcontent-%COMP%] {\n  width: 230px;\n}\n.share-link-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.state[_ngcontent-%COMP%] {\n  font-size: 9pt;\n}\n.state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  vertical-align: bottom;\n  font-size: 14pt;\n  margin-right: 3px;\n}\n.state[_ngcontent-%COMP%]   .show-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  border: 2px dashed transparent;\n  border-radius: 15px;\n  padding: 6px 10px;\n}\n.state[_ngcontent-%COMP%]   .state-changed[_ngcontent-%COMP%] {\n  border-color: #42ca8d;\n}\n.state[_ngcontent-%COMP%]   .state-changed[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n@media screen and (max-width: 700px) {\n  .typeButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 76px;\n  }\n  .typeButton[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .advancedPermission[_ngcontent-%COMP%] {\n    width: 50%;\n  }\n  .publish[_ngcontent-%COMP%]   .doi[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n  .publish[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .groupToInvite[_ngcontent-%COMP%] {\n    padding-bottom: 60px;\n  }\n  .typeButton[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    left: 0;\n  }\n  .groupToInvite[_ngcontent-%COMP%] {\n    padding-bottom: 60px;\n  }\n  .share-type-mobile[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 58px;\n    right: 25px;\n    color: var(--textLight);\n    display: block;\n  }\n}\n@media screen and (max-width: 500px) {\n  .groupHeading[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding-bottom: 5px;\n  }\n  .inheritCheck[_ngcontent-%COMP%] {\n    padding-left: 5px;\n  }\n  .state[_ngcontent-%COMP%]   .show-state[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .state[_ngcontent-%COMP%]   .state-changed[_ngcontent-%COMP%] {\n    border-color: transparent;\n  }\n  .state[_ngcontent-%COMP%]   .state-changed[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    color: #42ca8d;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy9zaGFyZS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNGQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQURKOztBQUtJOztFQUVJLG1CQUFBO0FBRlI7QUFJSTtFQUNJLFlBQUE7QUFGUjs7QUFNQTtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQUhKO0FBS1E7RUFDSSxZQUFBO0FBSFo7O0FBUUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtBQUxKOztBQVFBO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx1QkR0QlE7QUNpQlo7O0FBUUE7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQUxKOztBQVFBO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtFQUVBLHNCQUFBO0FBTko7O0FBU0E7O0VBRUksa0JBQUE7QUFOSjs7QUFVSTtFQUNJLHVCQUFBO0FBUFI7O0FBV0E7RUFDSSx1QkRsRFE7RUNtRFIsV0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFSSjtBQVNJO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUFQUjs7QUFXQTtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtBQVJKOztBQVdBO0VBQ0ksZUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFSSjtBQVNJO0VBQ0ksV0FBQTtBQVBSOztBQVdBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBUko7O0FBV0E7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCRHpDcUI7QUNpQ3pCOztBQVdBO0VBQ0ksa0JBQUE7QUFSSjtBQVNJO0VBQ0ksb0JBQUE7QUFQUjtBQVNJO0VBQ0ksaUJBQUE7QUFQUjs7QUFXQTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQVJKO0FBU0k7RUFDSSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQVBSO0FBUVE7RUFDSSxpQkFBQTtBQU5aO0FBU0k7RUFDSSxhQUFBO0FBUFI7QUFRUTtFQUNJLGNBQUE7RUFDQSxlQUFBO0FBTlo7QUFRUTtFQUNJLFlBQUE7QUFOWjs7QUFXQTtFQUNJLDZCQUFBO0FBUko7O0FBV0E7O0VBRUksV0FBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUlBLDhCQUFBO0FBWEo7QUFRSTs7RUFDSSxXQUFBO0FBTFI7O0FBVUE7RUFDSSxnQkFBQTtBQVBKOztBQVVBO0VBQ0ksdUJBQUE7RUFDQSxxQkQzSW9CO0FDb0l4Qjs7QUFVQTtFQUNJLHVCRDNKUTtFQzRKUixnQkFBQTtBQVBKOztBQVNBO0VBQ0kseUJBQUE7RUFDQSxlQUFBO0FBTko7O0FBU0E7RUFDSSxlQUFBO0FBTko7O0FBU0E7RUFDSSxlQUFBO0FBTko7O0FBU0E7RUFDSSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtBQU5KOztBQVNBO0VBQ0ksdUJEbExRO0VDbUxSLGNBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQU5KOztBQVNBOztFQUVJLGNBQUE7RUFDQSx1QkQ1TFE7RUM2TFIseUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FBTko7O0FBU0E7RUFDSSxjQUFBO0FBTko7O0FBU0E7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7QUFOSjs7QUFTQTtFQUNJLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtBQU5KOztBQVNBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0FBTko7O0FBU0E7RUFDSSx1QkQ1TlE7QUNzTlo7O0FBU0E7RUFDSSxZQUFBO0FBTko7QUFPSTtFQUNJLGlCQUFBO0FBTFI7O0FBU0E7RUFDSSxjQUFBO0FBTko7QUFPSTtFQUNJLHVCRHpPSTtFQzBPSixzQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUxSO0FBT0k7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUxSO0FBUUk7RUFDSSxxQkQ1T2dCO0FDc094QjtBQU9RO0VBQ0ksdUJEMVBBO0FDcVBaOztBQXdCQTtFQUNJO0lBQ0ksZUFBQTtJQUNBLFdBQUE7RUFyQk47RUFzQk07SUFDSSxhQUFBO0VBcEJWO0VBdUJFO0lBQ0ksVUFBQTtFQXJCTjtFQXVCRTtJQUNJLGVBQUE7RUFyQk47RUF1QkU7SUFDSSxhQUFBO0VBckJOO0VBdUJFO0lBQ0ksb0JBQUE7RUFyQk47RUF3Qk07SUFDSSxPQUFBO0VBdEJWO0VBeUJFO0lBQ0ksb0JBQUE7RUF2Qk47RUF5QkU7SUFDSSxrQkFBQTtJQUNBLFNBQUE7SUFDQSxXQUFBO0lBQ0EsdUJEN1NJO0lDOFNKLGNBQUE7RUF2Qk47QUFDRjtBQXlCQTtFQUNJO0lBQ0ksc0JBQUE7SUFDQSxtQkFBQTtFQXZCTjtFQXlCRTtJQUNJLGlCQUFBO0VBdkJOO0VBMkJNO0lBQ0ksYUFBQTtFQXpCVjtFQTRCTTtJQUNJLHlCQUFBO0VBMUJWO0VBMkJVO0lBQ0ksY0R0VFE7RUM2UnRCO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2NhcmQvdmFyaWFibGVzJztcblxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBtYXQtY2hlY2tib3ggLm1hdC1jaGVja2JveC1sYXlvdXQsXG4gICAgbWF0LXJhZGlvLWJ1dHRvbiAubWF0LXJhZGlvLWxhYmVsIHtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgICB9XG4gICAgLm1hdC10YWItYm9keS13cmFwcGVyIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgIH1cbn1cblxuLm1hdC1tZGMtdGFiLWdyb3VwIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIG1pbi1oZWlnaHQ6IDA7XG4gICAgOjpuZy1kZWVwIHtcbiAgICAgICAgLm1hdC1tZGMtdGFiLWJvZHktd3JhcHBlciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5hZHZhbmNlZFBlcm1pc3Npb24ge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAzMy4zMyU7XG59XG5cbi5oaW50Tm9GdXp6eSB7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG5cbi5ncm91cCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xufVxuXG4uZ3JvdXBJbnZpdGUge1xuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICBwYWRkaW5nLXRvcDogMjZweDtcbiAgICAvL2JhY2tncm91bmQtY29sb3I6ICRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5pbnZpdGVkLFxuLmFkdmFuY2VkIHtcbiAgICBwYWRkaW5nOiAyMHB4ICRjYXJkUGFkZGluZztcbn1cblxuLmFkdmFuY2VkIHtcbiAgICBoNCB7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cbn1cblxuLmFkdmFuY2VkQXV0aG9yaXR5IHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgaSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgfVxufVxuXG4uaGlzdG9yeSB7XG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICBmbG9hdDogcmlnaHQ7XG59XG5cbi5ncm91cE1lc3NhZ2Uge1xuICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxNXB4O1xuICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufVxuXG4uaW52aXRlLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5wdWJsaXNoLWJ1bGsge1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0kY2FyZFBhZGRpbmc7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGNhcmRQYWRkaW5nICogMn0pO1xuICAgIHBhZGRpbmc6IDIwcHggJGNhcmRQYWRkaW5nO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kO1xufVxuXG4uYnVsay1jb25maWcge1xuICAgIHBhZGRpbmc6IDIwcHggJGNhcmRQYWRkaW5nO1xuICAgIC5tYXQtaGVhZGluZy00IHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7XG4gICAgfVxuICAgIC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgfVxufVxuXG4uZ3JvdXBUb0ludml0ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tdG9wOiAzNXB4O1xuICAgIHBhZGRpbmctYm90dG9tOiA0NXB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAudG9JbnZpdGUge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXQtY2hpcCB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAudHlwZUJ1dHRvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC5tYXRlcmlhbC1pY29ucyB7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDRweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgfVxuICAgICAgICBidXR0b24ge1xuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4uY3Jvc3NlZCB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG59XG5cbi5ncm91cEVudHJ5LFxuLnVzYWdlRW50cnkge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYmFja2dyb3VuZDogI2VlZTtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGVzLXNoYXJlLWRpYWxvZy1wZXJtaXNzaW9uIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIGJvcmRlcjogMnB4IGRhc2hlZCB0cmFuc3BhcmVudDtcbn1cblxuLmdyb3VwRW50cnkge1xuICAgIG1pbi1oZWlnaHQ6IDM1cHg7XG59XG5cbi5hZGRlZCB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLWNvbG9yOiAkd29ya3NwYWNlSW5oZXJpdENvbG9yO1xufVxuXG4uaW5oZXJpdCB7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgbWluLWhlaWdodDogNTBweDtcbn1cbi5pbmhlcml0IC5ncm91cEVudHJ5IHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkd29ya3NwYWNlSW5oZXJpdENvbG9yO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLm5vcm1hbCB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4ub3duZXIge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmdyb3VwSGVhZGluZyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5ncm91cE5hbWUge1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgIGZvbnQtc2l6ZTogOTAlO1xuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XG4gICAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5pbmhlcml0RGlzYWJsZWQsXG4uaW5oZXJpdEVtcHR5IHtcbiAgICBmb250LXNpemU6IDkwJTtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nOiAwIDEwcHggMjBweCAxMHB4O1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4udGFiQ29udGVudEludml0ZSB7XG4gICAgcGFkZGluZy10b3A6IDA7XG59XG5cbi5pbmhlcml0Q2hlY2sge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuLm1hbmFnZUxpbmsge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDE0cHg7XG59XG5cbi50eXBlQWRkIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDIwcHg7XG4gICAgd2lkdGg6IDMxMHB4ICFpbXBvcnRhbnQ7XG4gICAgdG9wOiAtNjBweDtcbn1cblxuLm5vdGlmeS1pbmZvIHtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbn1cblxuLnNoYXJlLWxpbmstYnV0dG9uIHtcbiAgICB3aWR0aDogMjMwcHg7XG4gICAgaSB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgIH1cbn1cblxuLnN0YXRlIHtcbiAgICBmb250LXNpemU6IDlwdDtcbiAgICBpIHtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgICAgIGZvbnQtc2l6ZTogMTRwdDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7XG4gICAgfVxuICAgIC5zaG93LXN0YXRlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBib3JkZXI6IDJweCBkYXNoZWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgIH1cblxuICAgIC5zdGF0ZS1jaGFuZ2VkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkd29ya3NwYWNlSW5oZXJpdENvbG9yO1xuICAgICAgICBpIHtcbiAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyAucHVibGlzaC1ncmV5IHtcbi8vICAgICBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZENvbG9yO1xuLy8gfVxuXG4vLyAuc2VhcmNoLFxuLy8gLnNlYXJjaCBkaXYgaW5wdXQge1xuLy8gICAgIG1hcmdpbi1ib3R0b206IDA7XG4vLyAgICAgd2lkdGg6IDk1JTtcbi8vIH1cblxuLy8gLnNoYXJlLXR5cGUtbW9iaWxlIHtcbi8vICAgICBkaXNwbGF5OiBub25lO1xuLy8gfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlV2lkdGgpIHtcbiAgICAudHlwZUJ1dHRvbiBidXR0b24ge1xuICAgICAgICBtaW4td2lkdGg6IGF1dG87XG4gICAgICAgIHdpZHRoOiA3NnB4O1xuICAgICAgICBzcGFuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmFkdmFuY2VkUGVybWlzc2lvbiB7XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgfVxuICAgIC5wdWJsaXNoIC5kb2kgc3BhbiB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gICAgLnB1Ymxpc2ggLnR5cGUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAuZ3JvdXBUb0ludml0ZSB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiA2MHB4O1xuICAgIH1cbiAgICAudHlwZUJ1dHRvbiB7XG4gICAgICAgIC5tYXRlcmlhbC1pY29ucyB7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5ncm91cFRvSW52aXRlIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDYwcHg7XG4gICAgfVxuICAgIC5zaGFyZS10eXBlLW1vYmlsZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1OHB4O1xuICAgICAgICByaWdodDogMjVweDtcbiAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlV2lkdGggLSAkbW9iaWxlU3RhZ2UqMikpIHtcbiAgICAuZ3JvdXBIZWFkaW5nIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDVweDtcbiAgICB9XG4gICAgLmluaGVyaXRDaGVjayB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgIH1cblxuICAgIC5zdGF0ZSB7XG4gICAgICAgIC5zaG93LXN0YXRlID4gc3BhbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnN0YXRlLWNoYW5nZWQge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGkge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkd29ya3NwYWNlSW5oZXJpdENvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIC5zaGFyZS10eXBlLW1vYmlsZSB7XG4gICAgLy8gICAgIHJpZ2h0OiAyMHB4O1xuICAgIC8vIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_35__.trigger)('overlay', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_21__.UIAnimation.openOverlay())]
    }
  });
}

/***/ }),

/***/ 81086:
/*!*************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/share-dialog.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogComponent: () => (/* reexport safe */ _share_dialog_component__WEBPACK_IMPORTED_MODULE_6__.ShareDialogComponent),
/* harmony export */   ShareDialogModule: () => (/* binding */ ShareDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./choose-type/choose-type.component */ 28177);
/* harmony import */ var _choose_type_focusable_option_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./choose-type/focusable-option.directive */ 53474);
/* harmony import */ var _permission_permission_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./permission/permission.component */ 65313);
/* harmony import */ var _publish_node_author_name_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./publish/node-author-name.pipe */ 27596);
/* harmony import */ var _publish_publish_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./publish/publish.component */ 14465);
/* harmony import */ var _share_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./share-dialog.component */ 41379);
/* harmony import */ var _usage_usage_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./usage/usage.component */ 98737);
/* harmony import */ var _restricted_access_restricted_access_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./restricted-access/restricted-access.component */ 95574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 61699);











class ShareDialogModule {
  static #_ = this.ɵfac = function ShareDialogModule_Factory(t) {
    return new (t || ShareDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
    type: ShareDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](ShareDialogModule, {
    declarations: [_choose_type_focusable_option_directive__WEBPACK_IMPORTED_MODULE_2__.FocusableOptionDirective, _publish_node_author_name_pipe__WEBPACK_IMPORTED_MODULE_4__.NodeAuthorNamePipe, _choose_type_choose_type_component__WEBPACK_IMPORTED_MODULE_1__.ShareDialogChooseTypeComponent, _share_dialog_component__WEBPACK_IMPORTED_MODULE_6__.ShareDialogComponent, _permission_permission_component__WEBPACK_IMPORTED_MODULE_3__.ShareDialogPermissionComponent, _publish_publish_component__WEBPACK_IMPORTED_MODULE_5__.ShareDialogPublishComponent, _usage_usage_component__WEBPACK_IMPORTED_MODULE_7__.ShareDialogUsageComponent, _restricted_access_restricted_access_component__WEBPACK_IMPORTED_MODULE_8__.ShareDialogRestrictedAccessComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ }),

/***/ 98737:
/*!***************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/share-dialog/usage/usage.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShareDialogUsageComponent: () => (/* binding */ ShareDialogUsageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);







function ShareDialogUsageComponent_div_11_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, "WORKSPACE.SHARE.DELETED"));
  }
}
function ShareDialogUsageComponent_div_11_div_1_i_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ShareDialogUsageComponent_div_11_div_1_i_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ShareDialogUsageComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ShareDialogUsageComponent_div_11_div_1_div_1_Template, 8, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div")(3, "div", 4)(4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup.enter", function ShareDialogUsageComponent_div_11_div_1_Template_div_keyup_enter_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);
      const usage_r2 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.remove(usage_r2));
    })("click", function ShareDialogUsageComponent_div_11_div_1_Template_div_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);
      const usage_r2 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r8.remove(usage_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ShareDialogUsageComponent_div_11_div_1_i_8_Template, 2, 0, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ShareDialogUsageComponent_div_11_div_1_i_9_Template, 2, 0, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const usage_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.isDeleted(usage_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getName(usage_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", usage_r2.type === "INDIRECT")("opacity-invisible", !ctx_r1.showDelete);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 9, usage_r2.type === "INDIRECT" ? "WORKSPACE.SHARE.USAGE_INDIRECT" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.isDeleted(usage_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.isDeleted(usage_r2));
  }
}
function ShareDialogUsageComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ShareDialogUsageComponent_div_11_div_1_Template, 10, 11, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@cardAnimation", ctx_r0.showAll);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.usages);
  }
}
const _c0 = function (a0) {
  return {
    fallback: a0
  };
};
class ShareDialogUsageComponent {
  static #_ = this.ICON_MAP = {
    MOODLE: 'school',
    COLLECTION: 'layers'
  };
  isDeleted(usage) {
    return this.deleteList.indexOf(usage) != -1;
  }
  getIcon() {
    let map = ShareDialogUsageComponent.ICON_MAP[this.name.toUpperCase()];
    if (map) return map;
    return 'extension';
  }
  getName(usage) {
    // may be a collection
    if (usage.collection) return usage.collection.title;
    let info = usage.usageXmlParams;
    if (info && info.general.referencedInName != null) {
      const typeStr = 'WORKSPACE.SHARE.USAGE_SUBTYPE.' + info.general.referencedInType.toUpperCase();
      let type = this.translation.instant(typeStr);
      if (type === typeStr) {
        type = info.general.referencedInType;
      }
      return this.translation.instant('WORKSPACE.SHARE.USAGE_INFO', {
        instance: info.general.referencedInInstance,
        type,
        name: info.general.referencedInName
      });
    }
    return usage.courseId;
  }
  remove(usage) {
    if (this.showDelete && usage.type != 'INDIRECT') {
      if (this.isDeleted(usage)) this.deleteList.splice(this.deleteList.indexOf(usage), 1);else this.deleteList.push(usage);
      this.deleteListChange.emit(this.deleteList);
    }
  }
  constructor(translation) {
    this.translation = translation;
    this.deleteListChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.showDelete = true;
    this.onRemoveAll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.onRemove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.showAll = false;
  }
  static #_2 = this.ɵfac = function ShareDialogUsageComponent_Factory(t) {
    return new (t || ShareDialogUsageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: ShareDialogUsageComponent,
    selectors: [["es-share-dialog-usage"]],
    inputs: {
      name: "name",
      usages: "usages",
      deleteList: "deleteList",
      showDelete: "showDelete"
    },
    outputs: {
      deleteListChange: "deleteListChange",
      onRemoveAll: "onRemoveAll",
      onRemove: "onRemove"
    },
    decls: 12,
    vars: 10,
    consts: [[1, "group"], [1, "container"], [1, "icon"], [1, "type", "material-icons"], [1, "name"], [1, "primary"], [1, "material-icons", "clickable", "toggle", 3, "click"], ["class", "all", 4, "ngIf"], [1, "all"], ["class", "single", 4, "ngFor", "ngForOf"], [1, "single"], ["class", "deleted-info", 4, "ngIf"], ["tabindex", "0", 1, "remove", 3, "title", "keyup.enter", "click"], ["class", "material-icons", 4, "ngIf"], [1, "deleted-info"], [1, "line"], [1, "info"], [1, "material-icons"]],
    template: function ShareDialogUsageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4)(6, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShareDialogUsageComponent_Template_i_click_9_listener() {
          return ctx.showAll = !ctx.showAll;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ShareDialogUsageComponent_div_11_Template, 2, 2, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getIcon());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 5, "WORKSPACE.SHARE.USAGE_TYPE." + ctx.name.toUpperCase(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c0, ctx.name)), " (", ctx.usages.length, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.showAll ? "keyboard_arrow_down" : "keyboard_arrow_right");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showAll);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.IconDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslatePipe],
    styles: ["\n\n.group[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.deleted-info[_ngcontent-%COMP%] {\n  width: calc(100% + 20px);\n  height: 30px;\n  position: absolute;\n  align-items: center;\n  left: -15px;\n  top: 0;\n  z-index: 1;\n  display: flex;\n  border-radius: 25px;\n  font-weight: bold;\n  background-color: rgba(238, 238, 238, 0.6);\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 0 15px;\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]:last-child {\n  padding-right: 25px;\n}\n.deleted-info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border: none;\n  background: #000;\n  height: 1px;\n}\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n.container[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  overflow: hidden;\n  padding: 3px 0;\n  align-items: center;\n}\n.container[_ngcontent-%COMP%]    > .icon[_ngcontent-%COMP%] {\n  padding-left: 10px;\n}\n.container[_ngcontent-%COMP%]    > .name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: left;\n  padding: 3px 10px;\n  height: 40px;\n}\n.container[_ngcontent-%COMP%]    > .name[_ngcontent-%COMP%]    > .secondary[_ngcontent-%COMP%] {\n  font-size: 80%;\n  color: var(--textLight);\n  margin-top: -3px;\n  min-height: 3px;\n}\n.container[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%] {\n  padding: 0 5px;\n}\n\n.single[_ngcontent-%COMP%] {\n  display: flex;\n  padding-left: 25px;\n  position: relative;\n}\n.single[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.all[_ngcontent-%COMP%] {\n  padding-bottom: 5px;\n}\n\n.icon[_ngcontent-%COMP%] {\n  padding-right: 5px;\n}\n\n.name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.icon[_ngcontent-%COMP%], .remove[_ngcontent-%COMP%] {\n  min-width: 24px;\n}\n\n.remove[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  cursor: pointer;\n}\n\n.remove[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .type[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL3NoYXJlLWRpYWxvZy91c2FnZS91c2FnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxXQUFBO0FBQUo7O0FBRUE7RUFFSSx3QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQ0FBQTtBQUFKO0FBQ0k7RUFDSSxZQUFBO0VBQ0EsZUFBQTtBQUNSO0FBQVE7RUFDSSxtQkFBQTtBQUVaO0FBQVE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBRVo7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsV0FBQTtBQUNKO0FBQUk7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFFUjtBQUFJO0VBQ0ksa0JBQUE7QUFFUjtBQUFJO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQUVSO0FBRFE7RUFDSSxjQUFBO0VBQ0EsdUJEcENBO0VDcUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUdaO0FBQUk7RUFDSSxjQUFBO0FBRVI7O0FBQ0E7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUVKO0FBREk7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBR1I7O0FBQUE7RUFDSSxtQkFBQTtBQUdKOztBQURBO0VBQ0ksa0JBQUE7QUFJSjs7QUFGQTtFQUNJLFlBQUE7RUN6RUEsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FEK0VKOztBQUxBOztFQUVJLGVBQUE7QUFRSjs7QUFOQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QUFTSjs7QUFQQTs7RUFFSSx1QkQ1RVE7QUNzRlo7O0FBUkE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtBQVdKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5ncm91cCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4uZGVsZXRlZC1pbmZvIHtcbiAgICAvLyB0aGUgb3V0ZXIgYm91bmRhcnkgaW4gc2hhcmUgZGlhbG9nIGhhcyAxNXB4ICsgNXB4IHBhZGRpbmdcbiAgICB3aWR0aDogY2FsYygxMDAlICsgMjBweCk7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGxlZnQ6IC0xNXB4O1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNik7XG4gICAgLmxpbmUge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIHBhZGRpbmc6IDAgMTVweDtcbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDI1cHg7XG4gICAgICAgIH1cbiAgICAgICAgaHIge1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICAgICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICB9XG4gICAgfVxufVxuLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICA+IGRpdiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDNweCAwO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICA+IC5pY29uIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIH1cbiAgICA+IC5uYW1lIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xuICAgICAgICBwYWRkaW5nOiAzcHggMTBweDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICA+IC5zZWNvbmRhcnkge1xuICAgICAgICAgICAgZm9udC1zaXplOiA4MCU7XG4gICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC0zcHg7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAzcHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnRvZ2dsZSB7XG4gICAgICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgIH1cbn1cbi5zaW5nbGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZy1sZWZ0OiAyNXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICA+IGRpdiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cbi5hbGwge1xuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XG59XG4uaWNvbiB7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuLm5hbWUge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBAaW5jbHVkZSBzaG9ydGVuVGV4dCgpO1xufVxuLmljb24sXG4ucmVtb3ZlIHtcbiAgICBtaW4td2lkdGg6IDI0cHg7XG59XG4ucmVtb3ZlIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ucmVtb3ZlIGksXG4udHlwZSB7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG59XG4uZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG4iLCJAbWl4aW4gaW1hZ2VEaXNhYmxlZEJsdXIoKSB7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGJsdXIoM3B4KTtcbiAgICBmaWx0ZXI6IGJsdXIoM3B4KTtcbn1cbkBtaXhpbiBzaG9ydGVuVGV4dCgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dMYXJnZSgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMTBweCA3MHB4IHJnYmEoMCwgMCwgMCwgMC4xNSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbGltaXRMaW5lTGVuZ3RoKCR3aWR0aCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBtYXgtd2lkdGg6ICR3aWR0aDtcbn1cbkBtaXhpbiB1bnNlbGVjdGFibGVUZXh0KCkge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbkBtaXhpbiBpb3NTY3JvbGxpbmcoKSB7XG4gICAgLyogaW9zIHNjcm9sbGluZyBmaXggKi9cbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG59XG5AbWl4aW4gcGxhY2Vob2xkZXIge1xuICAgIDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxJbnNldEZvY3VzKCkge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAkZm9jdXNXaWR0aCAkZm9jdXNDb2xvciAhaW1wb3J0YW50O1xuICAgIEBtZWRpYSAocG9pbnRlcjogY29hcnNlKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnLCAkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsRGFzaGVkRm9jdXMoKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgb3V0bGluZTogJGZvY3VzV2lkdGggZGFzaGVkICRmb2N1c0NvbG9yO1xufVxuXG5AbWl4aW4gZm9jdXNTaGFkb3coJGRhcms6IHRydWUsICRzdHJlbmd0aDogMC4xKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBAaWYgJGRhcms9PXRydWUge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIH0gQGVsc2Uge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIH1cbn1cbkBtaXhpbiBkYXJrZW4oKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkNvbG9yO1xufVxuQG1peGluIGRhcmtlbkxpZ2h0KCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5MaWdodENvbG9yO1xufVxuQG1peGluIGJsdXJCYWNrZ3JvdW5kKCRyYWRpdXM6IDVweCkge1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigkcmFkaXVzKTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxGb2N1cygkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwICRmb2N1c1dpZHRoICRjb2xvciAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gcmVtb3ZlQnV0dG9uRGVmYXVsdFN0eWxlcyB7XG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XG4gICAgYm9yZGVyOiB1bnNldDtcbiAgICBwYWRkaW5nOiB1bnNldDtcbn1cblxuQG1peGluIGFmdGVyUHNldWRvRWxlbWVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBpbXBvcnQgJ3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucyc7XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_4__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_share-dialog_share-dialog_module_ts.js.map