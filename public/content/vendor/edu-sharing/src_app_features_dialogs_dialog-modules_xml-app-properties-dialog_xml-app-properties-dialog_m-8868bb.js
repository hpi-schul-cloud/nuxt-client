"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_xml-app-properties-dialog_xml-app-properties-dialog_m-8868bb"],{

/***/ 38760:
/*!******************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/xml-app-properties-dialog/xml-app-properties-dialog.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XmlAppPropertiesDialogComponent: () => (/* binding */ XmlAppPropertiesDialogComponent)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 21916);













function XmlAppPropertiesDialogComponent_div_3_textarea_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "textarea", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function XmlAppPropertiesDialogComponent_div_3_textarea_4_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const value_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r8.data.properties[value_r2] = $event);
    })("ngModelChange", function XmlAppPropertiesDialogComponent_div_3_textarea_4_Template_textarea_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.onChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const value_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r4.data.properties[value_r2]);
  }
}
function XmlAppPropertiesDialogComponent_div_3_input_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function XmlAppPropertiesDialogComponent_div_3_input_5_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const value_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r13.data.properties[value_r2] = $event);
    })("ngModelChange", function XmlAppPropertiesDialogComponent_div_3_input_5_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r16.onChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const value_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r5.data.properties[value_r2]);
  }
}
function XmlAppPropertiesDialogComponent_div_3_i_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function XmlAppPropertiesDialogComponent_div_3_i_6_Template_i_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().index;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r18.removeAppProperty(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return {
    fallback: ""
  };
};
function XmlAppPropertiesDialogComponent_div_3_mat_hint_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const value_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 1, "ADMIN.APPLICATIONS." + ctx_r7.data.appName + "." + value_r2, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c0)));
  }
}
function XmlAppPropertiesDialogComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 7)(1, "mat-form-field", 8)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, XmlAppPropertiesDialogComponent_div_3_textarea_4_Template, 1, 1, "textarea", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, XmlAppPropertiesDialogComponent_div_3_input_5_Template, 1, 1, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, XmlAppPropertiesDialogComponent_div_3_i_6_Template, 2, 0, "i", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, XmlAppPropertiesDialogComponent_div_3_mat_hint_7_Template, 3, 5, "mat-hint", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const value_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](value_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.isMultilineProperty(value_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.isMultilineProperty(value_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.appName);
  }
}
function XmlAppPropertiesDialogComponent_mat_hint_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 1, "ADMIN.APPLICATIONS." + ctx_r1.data.appName + "." + ctx_r1.xmlAppAdditionalPropertyName, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c0)));
  }
}
const MULTILINE_PROPERTIES = ['custom_html_headers', 'public_key'];
class XmlAppPropertiesDialogComponent {
  constructor(data, dialogRef, admin, toast) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.admin = admin;
    this.toast = toast;
    this.propertyKeys = Object.keys(this.data.properties);
  }
  ngOnInit() {
    this.dialogRef.patchConfig({
      buttons: [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('CANCEL', {
        color: 'standard'
      }, () => {
        this.dialogRef.close(null);
      }), new _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.DialogButton('APPLY', {
        color: 'primary'
      }, () => {
        this.saveApp();
      })]
    });
  }
  isMultilineProperty(key) {
    if (MULTILINE_PROPERTIES.includes(key)) {
      return true;
    }
    return this.data.properties[key].includes('\n');
  }
  removeAppProperty(pos) {
    const key = this.propertyKeys[pos];
    this.propertyKeys.splice(pos, 1);
    delete this.data.properties[key];
  }
  onChange() {
    this.dialogRef.patchConfig({
      closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.Closable.Standard
    });
  }
  saveApp() {
    this.dialogRef.patchState({
      isLoading: true
    });
    if (this.xmlAppAdditionalPropertyName && this.xmlAppAdditionalPropertyName.trim()) {
      this.data.properties[this.xmlAppAdditionalPropertyName.trim()] = this.xmlAppAdditionalPropertyValue;
    }
    this.admin.updateApplicationXML(this.data.appXml, this.data.properties).subscribe(() => {
      this.toast.toast('ADMIN.APPLICATIONS.APP_SAVED', {
        xml: this.data.appXml
      });
      this.dialogRef.patchState({
        isLoading: false
      });
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.patchState({
        isLoading: false
      });
      this.toast.error(error);
    });
  }
  static #_ = this.ɵfac = function XmlAppPropertiesDialogComponent_Factory(t) {
    return new (t || XmlAppPropertiesDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_1__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_2__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestAdminService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_3__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: XmlAppPropertiesDialogComponent,
    selectors: [["es-xml-app-properties-dialog"]],
    decls: 19,
    vars: 16,
    consts: [[1, "warning"], ["class", "appEditor", 4, "ngFor", "ngForOf"], [1, "add-property"], [1, "property", "mat-heading-4", "mat-heading-underline"], ["matInput", "", "type", "text", "id", "additionalProperty", 3, "ngModel", "ngModelChange"], [4, "ngIf"], ["matInput", "", "type", "text", 3, "ngModel", "ngModelChange"], [1, "appEditor"], [1, "mat-input-group"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "5", "class", "materialize-textarea", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["matInput", "", "type", "text", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "material-icons clickable", 3, "click", 4, "ngIf"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "5", 1, "materialize-textarea", 3, "ngModel", "ngModelChange"], [1, "material-icons", "clickable", 3, "click"]],
    template: function XmlAppPropertiesDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, XmlAppPropertiesDialogComponent_div_3_Template, 8, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2)(5, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-form-field")(9, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function XmlAppPropertiesDialogComponent_Template_input_ngModelChange_12_listener($event) {
          return ctx.xmlAppAdditionalPropertyName = $event;
        })("ngModelChange", function XmlAppPropertiesDialogComponent_Template_input_ngModelChange_12_listener() {
          return ctx.onChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, XmlAppPropertiesDialogComponent_mat_hint_13_Template, 3, 5, "mat-hint", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-form-field")(15, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function XmlAppPropertiesDialogComponent_Template_input_ngModelChange_18_listener($event) {
          return ctx.xmlAppAdditionalPropertyValue = $event;
        })("ngModelChange", function XmlAppPropertiesDialogComponent_Template_input_ngModelChange_18_listener() {
          return ctx.onChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 8, "ADMIN.APPLICATIONS.APP_XML_WARNING"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.propertyKeys);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 10, "ADMIN.APPLICATIONS.ADD_PROPERTY"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](11, 12, "ADMIN.APPLICATIONS.PROPERTY_NAME_PLACEHOLDER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.xmlAppAdditionalPropertyName);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.data.appName);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 14, "ADMIN.APPLICATIONS.PROPERTY_VALUE_PLACEHOLDER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.xmlAppAdditionalPropertyValue);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_6__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__.CdkTextareaAutosize, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
    styles: [".warning[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\n\n.mat-input-group[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 15px 0;\n}\n\n.add-property[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlhbG9ncy9kaWFsb2ctbW9kdWxlcy94bWwtYXBwLXByb3BlcnRpZXMtZGlhbG9nL3htbC1hcHAtcHJvcGVydGllcy1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIud2FybmluZyB7XG4gICAgcGFkZGluZzogMTBweCAwO1xufVxuXG4ubWF0LWlucHV0LWdyb3VwIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDE1cHggMDtcbn1cblxuLmFkZC1wcm9wZXJ0eSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 48695:
/*!***************************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/xml-app-properties-dialog/xml-app-properties-dialog.module.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XmlAppPropertiesDialogComponent: () => (/* reexport safe */ _xml_app_properties_dialog_component__WEBPACK_IMPORTED_MODULE_1__.XmlAppPropertiesDialogComponent),
/* harmony export */   XmlAppPropertiesDialogModule: () => (/* binding */ XmlAppPropertiesDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _xml_app_properties_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xml-app-properties-dialog.component */ 38760);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class XmlAppPropertiesDialogModule {
  static #_ = this.ɵfac = function XmlAppPropertiesDialogModule_Factory(t) {
    return new (t || XmlAppPropertiesDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: XmlAppPropertiesDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](XmlAppPropertiesDialogModule, {
    declarations: [_xml_app_properties_dialog_component__WEBPACK_IMPORTED_MODULE_1__.XmlAppPropertiesDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_xml-app-properties-dialog_xml-app-properties-dialog_m-8868bb.js.map