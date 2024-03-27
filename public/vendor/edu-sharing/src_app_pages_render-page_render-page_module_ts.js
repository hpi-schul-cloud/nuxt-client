"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_render-page_render-page_module_ts"],{

/***/ 97236:
/*!********************************************************************!*\
  !*** ./src/app/core-module/rest/services/rest-tracking.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestTrackingService: () => (/* binding */ RestTrackingService)
/* harmony export */ });
/* harmony import */ var _rest_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rest-constants */ 46680);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _rest_connector_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest-connector.service */ 61871);



class RestTrackingService {
  constructor(connector) {
    this.connector = connector;
  }
  trackEvent(event, node = null, repository = _rest_constants__WEBPACK_IMPORTED_MODULE_0__.RestConstants.HOME_REPOSITORY) {
    let query = this.connector.createUrl('tracking/:version/tracking/:repository/:event?node=:node', repository, [[':event', event], [':node', node]]);
    console.log(query);
    return this.connector.put(query, null, this.connector.getRequestOptions());
  }
  static #_ = this.ɵfac = function RestTrackingService_Factory(t) {
    return new (t || RestTrackingService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_rest_connector_service__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: RestTrackingService,
    factory: RestTrackingService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 18216:
/*!****************************************************************************!*\
  !*** ./src/app/pages/render-page/comments-list/comments-list.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsListComponent: () => (/* binding */ CommentsListComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ 78128);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/components/spinner-small/spinner-small.component */ 65928);
/* harmony import */ var _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/user-avatar/user-avatar.component */ 98588);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 21916);





















function CommentsListComponent_div_2_div_1_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CommentsListComponent_div_2_div_1_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r8.addComment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CommentsListComponent_div_2_div_1_es_spinner_small_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-spinner-small");
  }
}
function CommentsListComponent_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "es-user-avatar", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 11)(4, "form", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function CommentsListComponent_div_2_div_1_Template_form_ngSubmit_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r10.addComment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-form-field")(6, "textarea", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CommentsListComponent_div_2_div_1_Template_textarea_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r12.newComment = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, CommentsListComponent_div_2_div_1_button_8_Template, 2, 0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, CommentsListComponent_div_2_div_1_es_spinner_small_9_Template, 1, 0, "es-spinner-small", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", "small")("user", ctx_r2.user);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](7, 7, "NODE_COMMENTS.NEW_COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r2.sending)("ngModel", ctx_r2.newComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r2.sending);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.sending);
  }
}
function CommentsListComponent_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 18)(1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "NODE_COMMENTS.NO_PERMISSION"));
  }
}
function CommentsListComponent_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "es-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CommentsListComponent_div_2_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "NODE_COMMENTS.NO_COMMENTS"), " ");
  }
}
function CommentsListComponent_div_2_div_4_div_2_i_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "i", 37);
  }
}
function CommentsListComponent_div_2_div_4_div_2_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const comment_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](comment_r15.comment);
  }
}
function CommentsListComponent_div_2_div_4_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 39)(1, "form", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function CommentsListComponent_div_2_div_4_div_2_div_13_Template_form_ngSubmit_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r24.saveEditComment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-form-field")(3, "textarea", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CommentsListComponent_div_2_div_4_div_2_div_13_Template_textarea_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r25);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r26.editCommentText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 2, "NODE_COMMENTS.NEW_COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r20.editCommentText);
  }
}
function CommentsListComponent_div_2_div_4_div_2_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 41)(1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CommentsListComponent_div_2_div_4_div_2_div_14_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r27.editComment = null);
    })("keyup.enter", function CommentsListComponent_div_2_div_4_div_2_div_14_Template_div_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r29.editComment = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CommentsListComponent_div_2_div_4_div_2_div_14_Template_div_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r30.saveEditComment());
    })("keyup.enter", function CommentsListComponent_div_2_div_4_div_2_div_14_Template_div_keyup_enter_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r31.saveEditComment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function CommentsListComponent_div_2_div_4_div_2_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const comment_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, comment_r15.created));
  }
}
function CommentsListComponent_div_2_div_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 25)(1, "div", 26)(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "es-user-avatar", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 11)(5, "div", 28)(6, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "button", 30, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CommentsListComponent_div_2_div_4_div_2_Template_button_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r34);
      const comment_r15 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r33.options = ctx_r33.getOptions(comment_r15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, CommentsListComponent_div_2_div_4_div_2_i_11_Template, 1, 0, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, CommentsListComponent_div_2_div_4_div_2_div_12_Template, 2, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, CommentsListComponent_div_2_div_4_div_2_div_13_Template, 5, 4, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, CommentsListComponent_div_2_div_4_div_2_div_14_Template, 5, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, CommentsListComponent_div_2_div_4_div_2_div_15_Template, 3, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const comment_r15 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("link", true)("size", "small")("user", comment_r15.creator);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 10, comment_r15.creator));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matMenuTriggerFor", _r0.menu);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r14.getOptions(comment_r15) && ctx_r14.getOptions(comment_r15).length);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", comment_r15 != ctx_r14.editComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", comment_r15 == ctx_r14.editComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", comment_r15 == ctx_r14.editComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", comment_r15 != ctx_r14.editComment);
  }
}
function CommentsListComponent_div_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CommentsListComponent_div_2_div_4_div_1_Template, 3, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CommentsListComponent_div_2_div_4_div_2_Template, 16, 12, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("commentsLong", !ctx_r5.canComment());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r5.comments && !ctx_r5.comments.length && ctx_r5.canComment());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r5.comments);
  }
}
function CommentsListComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CommentsListComponent_div_2_div_1_Template, 10, 9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CommentsListComponent_div_2_div_2_Template, 4, 3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, CommentsListComponent_div_2_div_3_Template, 2, 0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, CommentsListComponent_div_2_div_4_Template, 3, 4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.canComment());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.canComment());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.comments);
  }
}
class CommentsListComponent {
  set node(node) {
    this._node = node;
    this.refresh();
  }
  constructor(commentsApi, connector, dialogs, iam, toast) {
    this.commentsApi = commentsApi;
    this.connector = connector;
    this.dialogs = dialogs;
    this.iam = iam;
    this.toast = toast;
    this.newComment = '';
    this.editComment = null;
    this.onCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.onLoading = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    /**
     * Some data has changed, may be a new, removed or edited comment
     * @type {EventEmitter<any>}
     */
    this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.dropdown = -1;
    this.connector.isLoggedIn(false).subscribe(data => {
      this.isGuest = data.isGuest;
      if (!data.isGuest) {
        this.iam.getCurrentUserAsync().then(data => {
          this.user = data.person;
          this.hasPermission = this.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_COMMENT_WRITE);
        });
      }
    });
  }
  saveEditComment() {
    this.onLoading.emit(true);
    this.commentsApi.editComment(this.editComment.ref.id, this.editCommentText.trim()).subscribe(() => {
      this.onLoading.emit(false);
      this.onChange.emit();
      this.editComment = null;
      this.refresh();
    }, error => {
      this.toast.error(error);
      this.onLoading.emit(false);
    });
  }
  getOptions(comment) {
    var _this = this;
    let options = [];
    let isAuthor = this.user && this.user.authorityName == comment.creator.authorityName;
    if (isAuthor) {
      options.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.OptionItem('NODE_COMMENTS.OPTION_EDIT', 'edit', () => {
        this.editComment = comment;
        this.editCommentText = comment.comment;
      }));
    }
    if (isAuthor || this._node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE) != -1) {
      options.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.OptionItem('NODE_COMMENTS.OPTION_DELETE', 'delete', /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const dialogRef = yield _this.dialogs.openGenericDialog({
          title: 'NODE_COMMENTS.DELETE_COMMENT',
          message: 'NODE_COMMENTS.DELETE_COMMENT_MESSAGE',
          buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__.YES_OR_NO
        });
        dialogRef.afterClosed().subscribe(response => {
          if (response === 'YES') {
            _this.onLoading.emit(true);
            _this.toast.closeProgressSpinner();
            _this.commentsApi.deleteComment(comment.ref.id).subscribe(() => {
              _this.refresh();
              _this.onChange.emit();
              _this.onLoading.emit(false);
            }, error => {
              _this.toast.error(error);
              _this.onLoading.emit(false);
            });
          }
        });
      })));
    }
    return options;
  }
  canComment() {
    if (this.isGuest || !this.user || !this.hasPermission) return false;
    return this._node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_COMMENT) !== -1;
  }
  addComment() {
    if (!this.newComment.trim()) {
      this.toast.error(null, 'NODE_COMMENTS.COMMENT_EMPTY');
      return;
    }
    this.sending = true;
    this.onLoading.emit(true);
    this.commentsApi.addComment(this._node.ref.id, this.newComment.trim()).subscribe(() => {
      this.sending = false;
      this.onLoading.emit(false);
      this.onChange.emit();
      this.newComment = '';
      this.refresh();
    }, error => {
      this.sending = false;
      this.toast.error(error);
      this.onLoading.emit(false);
    });
  }
  cancel() {
    this.onCancel.emit();
  }
  refresh() {
    this.comments = null;
    if (!this._node) return;
    if (this.loading) {
      setTimeout(() => this.refresh(), 100);
      return;
    }
    this.loading = true;
    this.commentsApi.getComments(this._node.ref.id, this._node.ref.repo).subscribe(data => {
      this.loading = false;
      this.comments = data && data.comments ? data.comments.reverse() : [];
    }, error => {
      this.loading = false;
      this.toast.error(error);
    });
  }
  static #_ = this.ɵfac = function CommentsListComponent_Factory(t) {
    return new (t || CommentsListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestCommentsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_3__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_4__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: CommentsListComponent,
    selectors: [["es-comments-list"]],
    inputs: {
      node: "node"
    },
    outputs: {
      onCancel: "onCancel",
      onLoading: "onLoading",
      onChange: "onChange"
    },
    decls: 3,
    vars: 2,
    consts: [[3, "options"], ["dropdown", ""], ["class", "group", 4, "ngIf"], [1, "group"], ["class", "new", 4, "ngIf"], ["class", "new-no-permission", 4, "ngIf"], ["class", "comments comments-loading", 4, "ngIf"], ["class", "comments", 3, "commentsLong", 4, "ngIf"], [1, "new"], [1, "left"], [3, "size", "user"], [1, "right"], [3, "ngSubmit"], ["matInput", "", "name", "addComment", 3, "disabled", "placeholder", "ngModel", "ngModelChange"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], [4, "ngIf"], ["mat-icon-button", "", 3, "click"], ["esIcon", "send"], [1, "new-no-permission"], [1, "no-permission"], [1, "comments", "comments-loading"], [1, "comments"], ["class", "no-comments", 4, "ngIf"], ["class", "comment", 4, "ngFor", "ngForOf"], [1, "no-comments"], [1, "comment"], [1, "top"], [3, "link", "size", "user"], [1, "creator"], [1, "name"], ["mat-icon-button", "", 1, "dropdown-dummy", 3, "matMenuTriggerFor", "click"], ["menuTrigger", "matMenuTrigger"], ["esIcon", "more_vert", "class", "dropdown", 4, "ngIf"], ["class", "commentText", 4, "ngIf"], ["class", "commentTextEdit", 4, "ngIf"], ["class", "icons", 4, "ngIf"], ["class", "date", 4, "ngIf"], ["esIcon", "more_vert", 1, "dropdown"], [1, "commentText"], [1, "commentTextEdit"], ["matInput", "", "name", "comment", 3, "placeholder", "ngModel", "ngModelChange"], [1, "icons"], ["tabindex", "0", 1, "btn-negative", 3, "click", "keyup.enter"], ["esIcon", "close"], ["tabindex", "0", 1, "btn-positive", 3, "click", "keyup.enter"], ["esIcon", "check"], [1, "date"]],
    template: function CommentsListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "es-dropdown", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CommentsListComponent_div_2_Template, 5, 4, "div", 2);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx._node);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.DropdownComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.SpinnerComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgForm, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInput, _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuTrigger, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_5__.SpinnerSmallComponent, _shared_components_user_avatar_user_avatar_component__WEBPACK_IMPORTED_MODULE_6__.UserAvatarComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_7__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.FormatDatePipe],
    styles: ["\n\n[_nghost-%COMP%]     es-actionbar .action-always-caption {\n  display: none;\n}\n\n.group[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n}\n\n.no-comments[_ngcontent-%COMP%], .no-permission[_ngcontent-%COMP%] {\n  font-size: 120%;\n  text-align: center;\n  color: var(--textLight);\n  padding-top: 30px;\n  width: 100%;\n}\n\n.new[_ngcontent-%COMP%], .new-no-permission[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background-color: #fff;\n  margin-top: 20px;\n  padding: 10px 0;\n}\n.new[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%], .new-no-permission[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  margin: 0 20px;\n}\n.new[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%], .new[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%], .new-no-permission[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%], .new-no-permission[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n}\n.new[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%], .new-no-permission[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\n.new[_ngcontent-%COMP%] {\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n}\nform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\nform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\nmat-form-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper::before {\n  content: unset;\n}\nmat-form-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  width: unset;\n}\n\n.card[_ngcontent-%COMP%] {\n  background-color: #eee !important;\n}\n\n.comments[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  max-height: calc(100% - 95px);\n  overflow-y: auto;\n  margin: -25px;\n  padding: 25px;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%] {\n  padding: 10px;\n  background-color: #fff;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  margin: 20px 0;\n  display: flex;\n  flex-direction: column;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%], .comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  padding-right: 15px;\n  padding-top: 3px;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  flex-direction: column;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .creator[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  padding-bottom: 8px;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .creator[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: bold;\n  flex-grow: 1;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .creator[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%] {\n  color: var(--primary);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%]   .commentText[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  display: flex;\n  justify-content: flex-end;\n  font-size: 80%;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 10px;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .btn-negative[_ngcontent-%COMP%], .comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .btn-positive[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  width: 40px;\n  height: 30px;\n  border-radius: 2px;\n  border: 1px solid #9e9e9e;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .btn-negative[_ngcontent-%COMP%] {\n  color: #cd2457;\n  background-color: white;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .btn-positive[_ngcontent-%COMP%] {\n  color: #40bf8e;\n  background-color: #ecf9f4;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  margin: 0 -12.5px;\n  padding-right: 10px;\n}\n.comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .actionsAvailable[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding-top: 15px;\n  margin-bottom: -5px;\n  border-top: 1px solid #fff;\n}\n\n.commentsLong[_ngcontent-%COMP%] {\n  max-height: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9yZW5kZXItcGFnZS9jb21tZW50cy1saXN0L2NvbW1lbnRzLWxpc3QuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNBUTtFQUNJLGFBQUE7QUFIWjs7QUFPQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7QUFKSjs7QUFNQTs7RUFFSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkRIUTtFQ0lSLGlCQUFBO0VBQ0EsV0FBQTtBQUhKOztBQUtBOztFQUVJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBRko7QUFHSTs7RUFDSSxjQUFBO0FBQVI7QUFFSTs7OztFQUVJLGFBQUE7QUFFUjtBQUFJOztFQUNJLFlBQUE7QUFHUjs7QUFBQTtFQ3RCSSxzQ0FBQTtBRDBCSjs7QUFEQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFJSjtBQUhJO0VBQ0ksY0FBQTtBQUtSO0FBSlE7RUFDSSxxQkVuREY7QUZ5RFY7O0FBRkE7RUFDSSxZQUFBO0FBS0o7QUFGUTtFQUNJLGNBQUE7QUFJWjtBQUZRO0VBQ0ksWUFBQTtBQUlaOztBQUNBO0VBQ0ksaUNBQUE7QUFFSjs7QUFBQTtFQUNJLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGFEWVU7QUNUZDtBQUZJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VDNURKLHNDQUFBO0VEOERJLGNBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFJUjtBQUhRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBS1o7QUFKWTs7RUFFSSxhQUFBO0FBTWhCO0FBSlk7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0FBTWhCO0FBSlk7RUFDSSxZQUFBO0VBQ0Esc0JBQUE7QUFNaEI7QUFMZ0I7RUFDSSxZQUFBO0FBT3BCO0FBTGdCO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFPcEI7QUFOb0I7RUFDSSxpQkFBQTtFQUNBLFlBQUE7QUFReEI7QUFOb0I7RUFDSSxxQkU5R2Q7RURDTixlQUFBO0VBQ0EseUJBQUE7RUFHQSxpQkFBQTtFQUNBLHdDQUFBO0FEc0hKO0FBVmdCO0VBQ0kscUJBQUE7QUFZcEI7QUFSUTtFQUNJLHVCRHhHQTtFQ3lHQSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0FBVVo7QUFSUTtFQUNJLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7QUFVWjtBQVRZOztFQ2hJUixlQUFBO0VBQ0EseUJBQUE7RUFHQSxpQkFBQTtFQUNBLHdDQUFBO0VEOEhZLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JEM0VLO0VDNEVMLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFnQmhCO0FBZFk7RUFDSSxjRGxFTTtFQ21FTix1QkFBQTtBQWdCaEI7QUFkWTtFQUNJLGNEeEVNO0VDeUVOLHlCQUFBO0FBZ0JoQjtBQWJRO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBQWVaO0FBYlE7RUFDSSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtBQWVaOztBQVhBO0VBQ0ksZ0JBQUE7QUFjSiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkB1c2UgJ3Nhc3M6bWF0aCc7XG5AaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBlcy1hY3Rpb25iYXIge1xuICAgICAgICAuYWN0aW9uLWFsd2F5cy1jYXB0aW9uIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG59XG4uZ3JvdXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4ubm8tY29tbWVudHMsXG4ubm8tcGVybWlzc2lvbiB7XG4gICAgZm9udC1zaXplOiAxMjAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcbiAgICB3aWR0aDogMTAwJTtcbn1cbi5uZXcsXG4ubmV3LW5vLXBlcm1pc3Npb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICAgIC5sZWZ0IHtcbiAgICAgICAgbWFyZ2luOiAwIDIwcHg7XG4gICAgfVxuICAgIC5sZWZ0LFxuICAgIC5yaWdodCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIC5yaWdodCB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG59XG4ubmV3IHtcbiAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvdygpO1xufVxuZm9ybSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBidXR0b24ge1xuICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICAgICAgaSB7XG4gICAgICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgICAgIH1cbiAgICB9XG59XG5tYXQtZm9ybS1maWVsZCB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIDo6bmctZGVlcCB7XG4gICAgICAgIC8vIFJlbW92ZSBhZGRpdGlvbmFsIGJvdHRvbSBwYWRkaW5nXG4gICAgICAgIC5tYXQtbWRjLWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXI6OmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiB1bnNldDtcbiAgICAgICAgfVxuICAgICAgICAubWF0LW1kYy1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgICAgICAgIHdpZHRoOiB1bnNldDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmNhcmQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kICFpbXBvcnRhbnQ7XG59XG4uY29tbWVudHMge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMCUgLSA5NXB4KTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIG1hcmdpbjogLSRjYXJkUGFkZGluZztcbiAgICBwYWRkaW5nOiAkY2FyZFBhZGRpbmc7XG4gICAgLmNvbW1lbnQge1xuICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvdygpO1xuICAgICAgICBtYXJnaW46IDIwcHggMDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgLnRvcCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIC5sZWZ0LFxuICAgICAgICAgICAgLnJpZ2h0IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmxlZnQge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDNweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5yaWdodCB7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICAgICAgaW5wdXQge1xuICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5jcmVhdG9yIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDhweDtcbiAgICAgICAgICAgICAgICAgICAgLm5hbWUge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLmRyb3Bkb3duIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGNsaWNrYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5jb21tZW50VGV4dCB7XG4gICAgICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmRhdGUge1xuICAgICAgICAgICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlO1xuICAgICAgICB9XG4gICAgICAgIC5pY29ucyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICAgICAgICAgIC5idG4tbmVnYXRpdmUsXG4gICAgICAgICAgICAuYnRuLXBvc2l0aXZlIHtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBjbGlja2FibGUoKTtcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJGJ1dHRvbkJvcmRlclJhZGl1cztcbiAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkaW5wdXRCb3JkZXJDb2xvcjtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuYnRuLW5lZ2F0aXZlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJGNvbG9yU3RhdHVzTmVnYXRpdmU7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRlbigkY29sb3JTdGF0dXNOZWdhdGl2ZSwgNjIlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5idG4tcG9zaXRpdmUge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkY29sb3JTdGF0dXNQb3NpdGl2ZTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGVuKCRjb2xvclN0YXR1c1Bvc2l0aXZlLCA0NSUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5hY3Rpb25zIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCBtYXRoLmRpdigkY2FyZFBhZGRpbmcsIC0yKTtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLmFjdGlvbnNBdmFpbGFibGUge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogLTVweDtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAkY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuLmNvbW1lbnRzTG9uZyB7XG4gICAgbWF4LWhlaWdodDogMTAwJTtcbn1cbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('cardAnimation', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.UIAnimation.cardAnimation())]
    }
  });
}

/***/ }),

/***/ 49976:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/render-page/node-relations/node-relations-widget.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MdsNodeRelationsWidgetComponent: () => (/* binding */ MdsNodeRelationsWidgetComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 92130);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-module/rest/rest-helper */ 27661);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/pipes/authority-name.pipe */ 99994);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 21916);











function MdsNodeRelationsWidgetComponent_es_spinner_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "es-spinner");
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_ng_template_2_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" (", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE_RELATIONS.CURRENT_VERSION"), ") ");
  }
}
const _c0 = function () {
  return {
    relative: false
  };
};
function MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 12)(8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_ng_template_2_span_13_Template, 3, 3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const version_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 5, "WORKSPACE.SHARE.PUBLISH.VERSION_DATE_ABSOLUTE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](6, 7, version_r9.properties["ccm:published_date_LONG"] == null ? null : version_r9.properties["ccm:published_date_LONG"][0], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](12, _c0)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 10, "WORKSPACE.SHARE.PUBLISH.VERSION_NUMBER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", version_r9.properties["cclom:version"] == null ? null : version_r9.properties["cclom:version"][0], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r11.isCurrentVersion(version_r9));
  }
}
const _c1 = function () {
  return {
    closeOnBack: true
  };
};
function MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-node-url", 9)(1, "es-node-row", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_ng_template_2_Template, 14, 13, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const version_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("current-version", ctx_r8.isCurrentVersion(version_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", version_r9)("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](6, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", version_r9)("columns", ctx_r8.columns);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5)(1, "h5", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, MdsNodeRelationsWidgetComponent_ng_container_2_div_1_es_node_url_5_Template, 4, 7, "es-node-url", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 2, "NODE_RELATIONS.RELATION_TYPE.VERSIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r3.versions);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE_RELATIONS.NO_RELATIONS"), " ");
  }
}
const _c2 = function () {
  return {
    relative: true
  };
};
function MdsNodeRelationsWidgetComponent_ng_container_2_div_3_es_node_url_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 12)(8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const relation_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 4, "NODE_RELATIONS.RELATION_CREATED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](6, 6, relation_r16.timestamp, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](13, _c2)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 9, "NODE_RELATIONS.RELATION_CREATOR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 11, relation_r16.creator));
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_div_3_es_node_url_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-node-url", 9)(1, "es-node-row", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MdsNodeRelationsWidgetComponent_ng_container_2_div_3_es_node_url_5_ng_template_2_Template, 14, 14, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const relation_r16 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", relation_r16.node)("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", relation_r16.node)("columns", ctx_r15.columns);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 16)(1, "h5", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, MdsNodeRelationsWidgetComponent_ng_container_2_div_3_es_node_url_5_Template, 4, 5, "es-node-url", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const key_r14 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 2, "NODE_RELATIONS.RELATION_TYPE." + key_r14));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r5.getRelations(key_r14));
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_4_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 12)(8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 4, "NODE_RELATIONS.VARIANT_CREATED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](6, 6, ctx_r21.forkedOrigin.createdAt, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](13, _c2)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 9, "NODE_RELATIONS.VARIANT_CREATOR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 11, ctx_r21.forkedOrigin.createdBy));
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "h5", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 7)(5, "es-node-url", 9)(6, "es-node-row", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_4_ng_template_7_Template, 14, 14, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 5, "NODE_RELATIONS.RELATION_TYPE.FORKED_ORIGIN"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", ctx_r6.forkedOrigin)("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", ctx_r6.forkedOrigin)("columns", ctx_r6.columns);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_es_node_url_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 12)(8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "authorityName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const child_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 4, "NODE_RELATIONS.VARIANT_CREATED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](6, 6, child_r23.createdAt, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](13, _c2)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 9, "NODE_RELATIONS.VARIANT_CREATOR"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 11, child_r23.createdBy));
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_es_node_url_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-node-url", 9)(1, "es-node-row", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_es_node_url_5_ng_template_2_Template, 14, 14, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const child_r23 = ctx.$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", child_r23)("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", child_r23)("columns", ctx_r22.columns);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "h5", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_es_node_url_5_Template, 4, 5, "es-node-url", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 2, "NODE_RELATIONS.RELATION_TYPE.FORKED_CHILDS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r7.forkedChilds);
  }
}
function MdsNodeRelationsWidgetComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, MdsNodeRelationsWidgetComponent_ng_container_2_div_1_Template, 6, 4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MdsNodeRelationsWidgetComponent_ng_container_2_div_2_Template, 3, 3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, MdsNodeRelationsWidgetComponent_ng_container_2_div_3_Template, 6, 4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_4_Template, 9, 8, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, MdsNodeRelationsWidgetComponent_ng_container_2_ng_container_5_Template, 6, 4, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.versions == null ? null : ctx_r1.versions.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !(ctx_r1.versions == null ? null : ctx_r1.versions.length) && !(ctx_r1.relations == null ? null : ctx_r1.relations.length) && !(ctx_r1.forkedChilds == null ? null : ctx_r1.forkedChilds.length) && !ctx_r1.forkedOrigin);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.getRelationKeys());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.forkedOrigin);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.forkedChilds == null ? null : ctx_r1.forkedChilds.length);
  }
}
function MdsNodeRelationsWidgetComponent_ng_template_3_Template(rf, ctx) {}
class MdsNodeRelationsWidgetComponent {
  constructor(relationService, nodeService) {
    this.relationService = relationService;
    this.nodeService = nodeService;
    this.loading = true;
    this.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.ListItem('NODE', _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TITLE)];
  }
  ngOnInit() {}
  ngOnChanges(changes) {
    var _this = this;
    if (this.node) {
      (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)([this.nodeService.getForkedChilds(this.node), this.nodeService.getPublishedCopies(this.node.ref.id), this.relationService.getRelations(this.node.ref.id)]).subscribe( /*#__PURE__*/function () {
        var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (result) {
          _this.forkedChilds = result[0].nodes;
          _this.versions = result[1].nodes.reverse();
          _this.relations = result[2].relations;
          // is a forked child
          if (_this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_FORKED_ORIGIN]) {
            _this.nodeService.getNode(_core_module_rest_rest_helper__WEBPACK_IMPORTED_MODULE_2__.RestHelper.removeSpacesStoreRef(_this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_FORKED_ORIGIN][0])).subscribe(node => {
              _this.forkedOrigin = node;
              _this.loading = false;
            }, error => {
              // soft error, do not trigger toast
              error.preventDefault();
              _this.loading = false;
            });
          } else {
            _this.loading = false;
          }
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }
  getRelationKeys() {
    return [...new Set(this.relations?.map(r => r.type))].sort();
  }
  getRelations(key) {
    return this.relations.filter(r => r.type === key);
  }
  isCurrentVersion(version) {
    // collection refs always refer to the latest version
    if (this.node.aspects.includes(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_IO_REFERENCE)) {
      const publishedVersion = this.versions.find(v => v.ref.id === this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_IO_ORIGINAL]?.[0]);
      if (publishedVersion) {
        return publishedVersion === version;
      }
      return this.versions.indexOf(version) === 0;
    }
    return this.node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_LIFECYCLE_VERSION]?.[0] === version.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_LIFECYCLE_VERSION]?.[0];
  }
  static #_ = this.ɵfac = function MdsNodeRelationsWidgetComponent_Factory(t) {
    return new (t || MdsNodeRelationsWidgetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.RelationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.NodeService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: MdsNodeRelationsWidgetComponent,
    selectors: [["es-mds-node-relations-widget"]],
    inputs: {
      node: "node"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
    decls: 4,
    vars: 2,
    consts: [[1, "node-relations-widget"], [4, "ngIf"], ["class", "relations-group versions", 4, "ngIf"], ["class", "empty", 4, "ngIf"], ["class", "relations-group", 4, "ngFor", "ngForOf"], [1, "relations-group", "versions"], [1, "relations-heading"], [1, "relation-nodes", "version"], ["class", "relation-node", "target", "_BLANK", 3, "current-version", "node", "queryParams", 4, "ngFor", "ngForOf"], ["target", "_BLANK", 1, "relation-node", 3, "node", "queryParams"], [3, "node", "columns"], ["customMetadata", ""], [1, "info-group"], ["class", "current-version-text", 4, "ngIf"], [1, "current-version-text"], [1, "empty"], [1, "relations-group"], [1, "relation-nodes"], ["class", "relation-node", "target", "_BLANK", 3, "node", "queryParams", 4, "ngFor", "ngForOf"]],
    template: function MdsNodeRelationsWidgetComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, MdsNodeRelationsWidgetComponent_es_spinner_1_Template, 1, 0, "es-spinner", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MdsNodeRelationsWidgetComponent_ng_container_2_Template, 6, 5, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, MdsNodeRelationsWidgetComponent_ng_template_3_Template, 0, 0, "ng-template");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.loading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeUrlComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeRowComponent, _shared_pipes_authority_name_pipe__WEBPACK_IMPORTED_MODULE_3__.AuthorityNamePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.FormatDatePipe],
    styles: ["\n\n.node-relations-widget[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  border-radius: 5px;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relations-heading[_ngcontent-%COMP%] {\n  font-size: 100%;\n  font-style: italic;\n  color: #6f6f6f;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: repeat(auto-fill, 1fr);\n  grid-gap: 10px;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   es-node-row[_ngcontent-%COMP%]     .node-row {\n  background-color: #f9f9f9;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .current-version[_ngcontent-%COMP%] {\n  border-left: 2px solid var(--palette-primary-200);\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .current-version-text[_ngcontent-%COMP%] {\n  font-size: var(--fontSizeXSmall);\n  font-weight: bold;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .relation-nodes[_ngcontent-%COMP%]   .info-group[_ngcontent-%COMP%]:last-child {\n  align-items: flex-end;\n}\n.node-relations-widget[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 120%;\n  color: var(--textLight);\n}\n\n.info-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: var(--fontSizeXSmall);\n  color: var(--textLight);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9yZW5kZXItcGFnZS9ub2RlLXJlbGF0aW9ucy9ub2RlLXJlbGF0aW9ucy13aWRnZXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7QUFBSjtBQUNJO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0RhYztBQ1p0QjtBQUNJO0VBQ0ksYUFBQTtFQUNBLDBDQUFBO0VBQ0EsY0FBQTtBQUNSO0FBRVk7RUFDSSx5QkQ4Q007QUM5Q3RCO0FBR1E7RUFDSSxpREFBQTtBQURaO0FBR1E7RUFDSSxnQ0RDSztFQ0FMLGlCQUFBO0FBRFo7QUFHUTtFQUNJLHFCQUFBO0FBRFo7QUFLSTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHVCRG5CSTtBQ2dCWjs7QUFNQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtBQUhKO0FBSUk7RUFDSSxnQ0RqQlM7RUNrQlQsdUJEM0JJO0FDeUJaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5ub2RlLXJlbGF0aW9ucy13aWRnZXQge1xuICAgIHBhZGRpbmc6IDE1cHggMjBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgLnJlbGF0aW9ucy1oZWFkaW5nIHtcbiAgICAgICAgZm9udC1zaXplOiAxMDAlO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIGNvbG9yOiAkdGV4dFJlbmRlcmluZ0xhYmVscztcbiAgICB9XG4gICAgLnJlbGF0aW9uLW5vZGVzIHtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maWxsLCAxZnIpO1xuICAgICAgICBncmlkLWdhcDogMTBweDtcblxuICAgICAgICBlcy1ub2RlLXJvdyB7XG4gICAgICAgICAgICA6Om5nLWRlZXAgLm5vZGUtcm93IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2FyZExpZ2h0QmFja2dyb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuY3VycmVudC12ZXJzaW9uIHtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgJHByaW1hcnlNZWRpdW1MaWdodDtcbiAgICAgICAgfVxuICAgICAgICAuY3VycmVudC12ZXJzaW9uLXRleHQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVYU21hbGw7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1ncm91cDpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5lbXB0eSB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxMjAlO1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICB9XG59XG4uaW5mby1ncm91cCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAkZm9udFNpemVYU21hbGw7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 42487:
/*!************************************************************!*\
  !*** ./src/app/pages/render-page/render-helper.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderHelperService: () => (/* binding */ RenderHelperService)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var _core_module_rest_data_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/rest/data-object */ 2895);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/mds/mds-editor/mds-editor-wrapper/mds-editor-wrapper.component */ 64740);
/* harmony import */ var _features_mds_mds_editor_util_replace_element_with_div__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../features/mds/mds-editor/util/replace-element-with-div */ 71228);
/* harmony import */ var _comments_list_comments_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comments-list/comments-list.component */ 18216);
/* harmony import */ var _node_relations_node_relations_widget_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node-relations/node-relations-widget.component */ 49976);
/* harmony import */ var _video_controls_video_controls_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./video-controls/video-controls.component */ 87279);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_rest_services_rest_usage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core-module/rest/services/rest-usage.service */ 37809);
/* harmony import */ var _core_module_rest_services_rest_tracking_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core-module/rest/services/rest-tracking.service */ 97236);















class RenderHelperService {
  static isCollectionRef(node) {
    return node.aspects.indexOf(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_ASPECT_IO_REFERENCE) !== -1;
  }
  constructor(componentFactoryResolver, usageApi, optionsHelperService, tracking) {
    this.componentFactoryResolver = componentFactoryResolver;
    this.usageApi = usageApi;
    this.optionsHelperService = optionsHelperService;
    this.tracking = tracking;
  }
  setViewContainerRef(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  injectModuleComments(node) {
    const data = {
      node
    };
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, _comments_list_comments_list_component__WEBPACK_IMPORTED_MODULE_6__.CommentsListComponent, document.getElementsByTagName('comments')[0], data);
  }
  injectModuleInCollections(node) {
    let domCollections;
    let parent;
    try {
      domCollections = document.evaluate('//*[@id="edusharing_rendering_metadata"]//collections', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      parent = domCollections.parentElement.parentElement;
    } catch (e) {
      return;
    }
    domCollections = (0,_features_mds_mds_editor_util_replace_element_with_div__WEBPACK_IMPORTED_MODULE_5__.replaceElementWithDiv)(domCollections);
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.SpinnerComponent, domCollections);
    this.getCollectionsContainingNode(node).subscribe(collections => {
      // @TODO: This does currently ignore the "hideIfEmpty" flag of the mds template
      if (collections.length === 0) {
        parent.remove();
        return;
      }
      const data = {
        dataSource: new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.NodeDataSource(collections),
        columns: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.ListItem.getCollectionDefaults(),
        displayType: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.NodeEntriesDisplayType.SmallGrid
      };
      const entriesComponentRef = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.NodeEntriesWrapperComponent, domCollections, data, {
        delay: 250
      });
      entriesComponentRef.instance.ngOnChanges();
    }, error => {
      parent.remove();
    });
  }
  injectNodeRelationsWidget(node) {
    let domRelations;
    try {
      domRelations = document.evaluate('//*[@id="edusharing_rendering_metadata"]//nodeRelations', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (e) {}
    if (domRelations) {
      domRelations = (0,_features_mds_mds_editor_util_replace_element_with_div__WEBPACK_IMPORTED_MODULE_5__.replaceElementWithDiv)(domRelations);
      const component = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, _node_relations_node_relations_widget_component__WEBPACK_IMPORTED_MODULE_7__.MdsNodeRelationsWidgetComponent, domRelations, {
        node
      });
      component.instance.ngOnChanges();
      return component;
    }
    return null;
  }
  injectMetadataEditor(node, groupId = 'io_render') {
    const metadata = document.querySelector('.edusharing_rendering_metadata_body');
    const parent = metadata.parentElement;
    parent.removeChild(metadata);
    const component = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, _features_mds_mds_editor_mds_editor_wrapper_mds_editor_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.MdsEditorWrapperComponent, parent, {
      groupId,
      nodes: [node],
      editorMode: 'inline',
      embedded: true
    });
    // enforce to render all widgets, since rendering does not support extended state
    component.instance.getInstanceService().shouldShowExtendedWidgets$.next(true);
    return component;
  }
  getCollectionsContainingNode(node) {
    const id = this.getOriginalId(node);
    return this.usageApi.getNodeUsagesCollection(id, node.ref.repo).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(usages => usages.filter(usage => usage.collectionUsageType === 'ACTIVE')), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(usages => usages.map(usage => usage.collection)));
  }
  getOriginalId(node) {
    if (RenderHelperService.isCollectionRef(node)) {
      return node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_PROP_IO_ORIGINAL];
    } else {
      return node.ref.id;
    }
  }
  /**
   * find injected link based actions with attribute es-action
   * (they're generated by the backend)
   * and replace them with internal function/action calls
   */
  applyActionButtons(node) {
    var _this = this;
    let result;
    try {
      result = document.evaluate('//*[@id="edusharing_rendering_metadata"]//a[@data-es-action]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    } catch (e) {}
    if (result) {
      let action;
      while (action = result.iterateNext()) {
        const actionName = action.getAttribute('data-es-action');
        action.onclick = /*#__PURE__*/function () {
          var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
            event.preventDefault();
            _this.optionsHelperService.setData({
              scope: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.Scope.Render,
              activeObjects: [node]
            });
            const option = (yield _this.optionsHelperService.getAvailableOptions(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.Target.List, [node])).filter(o => o.name === actionName);
            if (option.length === 1 && option[0].isEnabled) {
              option[0].callback(node);
            } else {
              console.warn('No action was available for: ' + actionName);
            }
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();
      }
    }
  }
  doAll(node) {
    this.injectModuleInCollections(node);
    this.injectNodeRelationsWidget(node);
    this.injectModuleComments(node);
    this.applyActionButtons(node);
    this.injectVideoControls(node);
    this.injectEventHandler(node);
  }
  injectEventHandler(node) {
    const videoElement = document.querySelector('#edusharing_rendering_content_href');
    videoElement.addEventListener('click', () => {
      this.tracking.trackEvent(_core_module_rest_data_object__WEBPACK_IMPORTED_MODULE_1__.EventType.OPEN_EXTERNAL_LINK, node.ref.id).subscribe(() => {});
    });
  }
  injectVideoControls(node) {
    let videoElement;
    let target;
    try {
      videoElement = document.querySelector('.edusharing_rendering_content_wrapper video');
      if (!videoElement) {
        throw new Error();
      }
      const listener = () => {
        this.tracking.trackEvent(_core_module_rest_data_object__WEBPACK_IMPORTED_MODULE_1__.EventType.VIEW_MATERIAL_PLAY_MEDIA, node.ref.id).subscribe(() => {});
        videoElement.removeEventListener('play', listener);
      };
      videoElement.addEventListener('play', listener);
      target = document.createElement('div');
      document.querySelector('.edusharing_rendering_wrapper').parentElement.appendChild(target);
    } catch (e) {
      // console.log("did not find video element, skipping controls",e);
      setTimeout(() => this.injectVideoControls(node), 1000 / 30);
      return;
    }
    const data = {
      video: videoElement,
      node
    };
    this.videoControlsRef = _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.injectAngularComponent(this.componentFactoryResolver, this.viewContainerRef, _video_controls_video_controls_component__WEBPACK_IMPORTED_MODULE_8__.VideoControlsComponent, target, data);
  }
  /**
   * applies the render data given as the detailsSnippet and injects it in the given HTMLELement
   * Script urls given by the rendering data will be obeyed. However, inline scripts are NOT supported
   * This function should be used to align with CSP security policies
   */
  applyRenderData(htmlElement, detailsSnippet) {
    htmlElement.innerHTML = detailsSnippet;
    Array.from(htmlElement.querySelectorAll('script')).forEach(script => {
      const newScriptElement = document.createElement('script');
      if (!Array.from(script.attributes).map(a => a.name).includes('src')) {
        console.warn('Rendering provided an inline script without a src! This script can not be executed!', script);
      }
      Array.from(script.attributes).forEach(attr => {
        newScriptElement.setAttribute(attr.name, attr.value);
      });
      document.head.appendChild(newScriptElement);
      script.parentElement.removeChild(script);
    });
  }
  static #_ = this.ɵfac = function RenderHelperService_Factory(t) {
    return new (t || RenderHelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_core_module_rest_services_rest_usage_service__WEBPACK_IMPORTED_MODULE_9__.RestUsageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_11__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_core_module_rest_services_rest_tracking_service__WEBPACK_IMPORTED_MODULE_10__.RestTrackingService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
    token: RenderHelperService,
    factory: RenderHelperService.ɵfac
  });
}

/***/ }),

/***/ 89856:
/*!*****************************************************************!*\
  !*** ./src/app/pages/render-page/render-page-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderPageRoutingModule: () => (/* binding */ RenderPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _render_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-page.component */ 2216);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: ':node',
  component: _render_page_component__WEBPACK_IMPORTED_MODULE_0__.RenderPageComponent
}, {
  path: ':node/:version',
  component: _render_page_component__WEBPACK_IMPORTED_MODULE_0__.RenderPageComponent
}];
class RenderPageRoutingModule {
  static #_ = this.ɵfac = function RenderPageRoutingModule_Factory(t) {
    return new (t || RenderPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: RenderPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RenderPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 2216:
/*!************************************************************!*\
  !*** ./src/app/pages/render-page/render-page.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderPageComponent: () => (/* binding */ RenderPageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 30241);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.component */ 66401);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-module/rest/mds-helper */ 81955);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _services_options_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/options-helper.service */ 61396);
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/card/card.component */ 13838);
/* harmony import */ var _render_helper_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./render-helper.service */ 42487);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _services_card_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/card.service */ 329);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/cdk/a11y */ 93170);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _touchevents_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./touchevents.directive */ 56823);































const _c0 = ["sequencediv"];
const _c1 = ["actionbar"];
function RenderPageComponent_div_0_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_0_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r9.showDetails());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](3, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](4, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate2"]("title", "", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](1, 3, "GOTO"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](2, 5, "INFO"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](6, 7, "INFO"));
  }
}
function RenderPageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "div", 12)(3, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_0_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r11.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](5, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](10, RenderPageComponent_div_0_button_10_Template, 7, 9, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](11, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](12, "es-actionbar", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](4, 6, "BACK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](8, 8, "BACK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r0._node);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("backgroundType", "dark")("numberOfAlwaysVisibleOptions", 1)("numberOfAlwaysVisibleOptionsMobile", 0);
  }
}
function RenderPageComponent_div_1_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_1_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r15.switchPosition(ctx_r15.getPosition() - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("aria", true);
  }
}
function RenderPageComponent_div_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_1_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r17.switchPosition(ctx_r17.getPosition() + 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("aria", true);
  }
}
function RenderPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, RenderPageComponent_div_1_button_1_Template, 2, 1, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](2, RenderPageComponent_div_1_button_2_Template, 2, 1, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r1.canSwitchBack());
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r1.canSwitchForward());
  }
}
function RenderPageComponent_div_4_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_4_div_7_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r24);
      const item_r21 = restoredCtx.$implicit;
      const i_r22 = restoredCtx.index;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r23.viewChildobject(item_r21, i_r22));
    })("keyup.enter", function RenderPageComponent_div_4_div_7_Template_div_keyup_enter_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r24);
      const item_r21 = restoredCtx.$implicit;
      const i_r22 = restoredCtx.index;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r25.viewChildobject(item_r21, i_r22));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](4, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r20.getNodeTitle(item_r21));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("selected", ctx_r20._nodeId == item_r21.ref.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate1"]("src", "", item_r21.preview.url, "&crop=true&width=100&height=75", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsanitizeUrl"]);
  }
}
function RenderPageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 29, 30)(2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_4_Template_div_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r26.viewParent());
    })("keyup.enter", function RenderPageComponent_div_4_Template_div_keyup_enter_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r27);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r28.viewParent());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](6, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](7, RenderPageComponent_div_4_div_7_Template, 5, 4, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r2.getNodeTitle(ctx_r2.sequenceParent));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("selected", ctx_r2._nodeId == ctx_r2.sequenceParent.ref.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpropertyInterpolate1"]("src", "", ctx_r2.sequenceParent.preview.url, "&crop=true&width=100&height=75", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx_r2.sequence.nodes);
  }
}
function RenderPageComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_5_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r29.scroll("left"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("aria", true);
  }
}
function RenderPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function RenderPageComponent_div_6_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r31.scroll("right"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("aria", true);
  }
}
function RenderPageComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "es-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
}
function RenderPageComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 39)(1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2, "\u00C4hnliche Objekte");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](3, "es-node-entries-wrapper", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dataSource", ctx_r6.similarNodes)("displayType", ctx_r6.DisplayType.Grid)("columns", ctx_r6.similarNodeColumns)("checkbox", false)("elementInteractionType", ctx_r6.InteractionType.DefaultActionLink);
  }
}
class RenderPageComponent {
  set node(node) {
    const id = node.ref ? node.ref.id : node;
    jQuery('#nodeRenderContent').html('');
    this._nodeId = id;
    this.loadRenderData();
  }
  constructor(translate, translations, uiService, nodeHelper, renderHelper, location, connector, connectors, iam, mdsApi, nodeApi, searchApi, toolService, cardServcie, viewContainerRef, frame, toast, configLegacy, configService, route, networkService, breadcrumbsService, _ngZone, router, platformLocation, optionsHelper, loadingScreen, mainNavService, temporaryStorageService, localEvents) {
    this.translate = translate;
    this.translations = translations;
    this.uiService = uiService;
    this.nodeHelper = nodeHelper;
    this.renderHelper = renderHelper;
    this.location = location;
    this.connector = connector;
    this.connectors = connectors;
    this.iam = iam;
    this.mdsApi = mdsApi;
    this.nodeApi = nodeApi;
    this.searchApi = searchApi;
    this.toolService = toolService;
    this.cardServcie = cardServcie;
    this.frame = frame;
    this.toast = toast;
    this.configLegacy = configLegacy;
    this.configService = configService;
    this.route = route;
    this.networkService = networkService;
    this.breadcrumbsService = breadcrumbsService;
    this.router = router;
    this.platformLocation = platformLocation;
    this.optionsHelper = optionsHelper;
    this.loadingScreen = loadingScreen;
    this.mainNavService = mainNavService;
    this.temporaryStorageService = temporaryStorageService;
    this.localEvents = localEvents;
    this.DisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.InteractionType;
    this.isLoading = true;
    this.isBuildingPage = false;
    /**
     * Show a bar at the top with the node name or not
     * @type {boolean}
     */
    this.showTopBar = true;
    /**
     * Node version, -1 indicates the latest
     * @type {string}
     */
    this.version = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.NODE_VERSION_CURRENT;
    /**
     *   display metadata
     */
    this.metadata = true;
    this.isRoute = false;
    this.isSafe = false;
    this.fromLogin = false;
    this.canScrollLeft = false;
    this.canScrollRight = false;
    this.similarNodes = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeDataSource();
    this.isDestroyed = false;
    this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_18__.Subject();
    this.isChildobject = false;
    this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter();
    this.similarNodeColumns = [];
    window.nodeRenderComponentRef = {
      component: this,
      zone: _ngZone
    };
    window.ngRender = {
      setDownloadUrl: url => {
        this.setDownloadUrl(url);
      }
    };
    this.frame.addListener(this, this.destroyed$);
    this.renderHelper.setViewContainerRef(viewContainerRef);
    this.translations.waitForInit().subscribe(() => {
      this.banner = _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.ConfigurationHelper.getBanner(this.configService);
      this.connector.setRoute(this.route, this.router);
      this.networkService.prepareCache();
      this.route.queryParams.subscribe(params => {
        this.closeOnBack = params.closeOnBack === 'true';
        this.editor = params.editor;
        this.fromLogin = params.fromLogin === 'true' || params.redirectFromSSO === 'true';
        this.repository = params.repository ? params.repository : _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.HOME_REPOSITORY;
        this.queryParams = params;
        const childobject = params.childobject_id ? params.childobject_id : null;
        this.isChildobject = childobject != null;
        this.route.params.subscribe(params => {
          if (params.node) {
            this.isRoute = true;
            const dataSource = this.temporaryStorageService.get(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.TemporaryStorageService.NODE_RENDER_PARAMETER_DATA_SOURCE);
            if (dataSource) {
              this.list = dataSource.getData();
            } else {
              this.list = this.temporaryStorageService.get(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.TemporaryStorageService.NODE_RENDER_PARAMETER_LIST);
            }
            this.connector.isLoggedIn(false).subscribe(data => {
              this.isSafe = data.currentScope == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.SAFE_SCOPE;
              if (params.version) {
                this.version = params.version;
              }
              if (childobject) {
                setTimeout(() => this.node = childobject, 10);
              } else {
                setTimeout(() => this.node = params.node, 10);
              }
            });
          }
        });
      });
    });
    this.frame.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.FrameEventsService.EVENT_VIEW_OPENED, 'node-render');
  }
  ngOnInit() {
    this.mainNavService.setMainNavConfig({
      show: true,
      showNavigation: false,
      currentScope: 'render'
    });
    this.optionsHelper.registerGlobalKeyboardShortcuts();
    this.localEvents.nodesChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.takeUntil)(this.destroyed$)).subscribe(() => this.refresh());
    this.localEvents.nodesDeleted.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.takeUntil)(this.destroyed$)).subscribe(() => this.close());
  }
  beforeunloadHandler(event) {
    if (this.isSafe) {
      this.connector.logout().toPromise();
    }
  }
  onResize(event) {
    this.setScrollparameters();
  }
  handleKeyboardEvent(event) {
    if (_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_6__.CardComponent.getNumberOfOpenCards() > 0) {
      return;
    }
    if (event.code == 'ArrowLeft' && this.canSwitchBack()) {
      this.switchPosition(this.getPosition() - 1);
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.code == 'ArrowRight' && this.canSwitchForward()) {
      this.switchPosition(this.getPosition() + 1);
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
  close() {
    if (this.isRoute) {
      if (this.closeOnBack) {
        window.close();
      } else {
        if (this.fromLogin && !_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent.isRedirectedFromLogin()) {
          _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.goToDefaultLocation(this.router, this.platformLocation, this.configLegacy, false);
        } else {
          this.location.back();
          // use a timeout to let the browser try to go back in history first
          setTimeout(() => {
            if (!this.isDestroyed) {
              this.mainNavService.getMainNav().topBar?.toggleMenuSidebar();
            }
          }, 250);
        }
      }
    } else this.onClose.emit();
  }
  showDetails() {
    const element = document.getElementById('edusharing_rendering_metadata');
    element.setAttribute('tabindex', '-1');
    element.addEventListener('blur', event => event.target.removeAttribute('tabindex'), {
      once: true
    });
    element.focus({
      preventScroll: true
    });
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }
  getPosition() {
    if (!this._node || !this.list) return -1;
    let i = 0;
    for (const node of this.list) {
      if (node.ref.id == this._node.ref.id || node.ref.id == this.sequenceParent.ref.id) return i;
      i++;
    }
    return -1;
  }
  onEvent(event, data) {
    if (event == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.FrameEventsService.EVENT_REFRESH) {
      this.refresh();
    }
  }
  ngOnDestroy() {
    window.ngRender = null;
    this.isDestroyed = true;
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  switchPosition(pos) {
    // this.router.navigate([UIConstants.ROUTER_PREFIX+"render",this.list[pos].ref.id]);
    this.isLoading = true;
    this.sequence = null;
    this.node = this.list[pos];
    // this.options=[];
  }

  canSwitchBack() {
    return this.list && this.getPosition() > 0 && !this.list[this.getPosition() - 1].isDirectory;
  }
  canSwitchForward() {
    return this.list && this.getPosition() < this.list.length - 1 && !this.list[this.getPosition() + 1].isDirectory;
  }
  refresh() {
    if (this.isLoading) {
      return;
    }
    this.optionsHelper.clearComponents(this.actionbar);
    this.isLoading = true;
    this.node = this._nodeId;
  }
  viewParent() {
    this.isChildobject = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        childobject_id: null
      },
      replaceUrl: true
    });
  }
  viewChildobject(node, pos) {
    this.isChildobject = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        childobject_id: node.ref.id
      },
      replaceUrl: true
    });
  }
  loadNode() {
    if (!this._node) {
      this.isBuildingPage = false;
      return;
    }
    const download = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('OPTIONS.DOWNLOAD', 'cloud_download', () => this.downloadCurrentNode());
    download.elementType = _services_options_helper_service__WEBPACK_IMPORTED_MODULE_5__.OptionsHelperService.DownloadElementTypes;
    // use callback since isEnabled gets ignored
    download.customEnabledCallback = nodes => {
      return this._node.downloadUrl != null && (!this._node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_PROP_IO_WWWURL] || !_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestNetworkService.isFromHomeRepo(this._node));
    };
    download.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.View;
    download.priority = 25;
    download.showAsAction = true;
    if (this.isCollectionRef()) {
      this.nodeApi.getNodeMetadata(this._node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_PROP_IO_ORIGINAL]).subscribe(node => {
        this.addDownloadButton(download);
      }, error => {
        if (error.status == _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.HTTP_NOT_FOUND) {
          download.isEnabled = false;
        }
        this.addDownloadButton(download);
      });
      return;
    }
    this.addDownloadButton(download);
  }
  loadRenderData() {
    const loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed$
    });
    this.isLoading = true;
    this.optionsHelper.clearComponents(this.actionbar);
    if (this.isBuildingPage) {
      setTimeout(() => this.loadRenderData(), 50);
      return;
    }
    const parameters = {
      showDownloadButton: this.configLegacy.instant('rendering.showDownloadButton', false),
      showDownloadAdvice: !this.isOpenable
    };
    this._node = null;
    this.isBuildingPage = true;
    // we only fetching versions for the primary parent (child objects don't have versions)
    this.nodeApi.getNodeRenderSnippet(this._nodeId, this.version && !this.isChildobject ? this.version : '-1', parameters, this.repository).subscribe(data => {
      if (!data.detailsSnippet) {
        console.error(data);
        this.toast.error(null, 'RENDERSERVICE_API_ERROR');
      } else {
        this._node = data.node;
        this.isOpenable = this.connectors.connectorSupportsEdit(this._node) != null;
        const finish = (set = null) => {
          this.similarNodeColumns = _core_module_rest_mds_helper__WEBPACK_IMPORTED_MODULE_3__.MdsHelper.getColumns(this.translate, set, 'search');
          this.mds = set;
          const nodeRenderContent = jQuery('#nodeRenderContent');
          nodeRenderContent.html(data.detailsSnippet);
          this.moveInnerStyleToHead(nodeRenderContent);
          this.postprocessHtml();
          this.handleProposal();
          this.renderHelper.doAll(this._node);
          this.linkSearchableWidgets();
          this.loadNode();
          this.loadSimilarNodes();
          this.isLoading = false;
        };
        this.getSequence(() => {
          this.mdsApi.getSet(this.getMdsId(), this.repository).subscribe(set => {
            finish(set);
          }, error => {
            console.warn('mds fetch error', error);
            finish();
          });
        });
      }
      this.isLoading = false;
      loadingTask.done();
    }, error => {
      console.log(error.error.error);
      if (error?.error?.error === 'org.edu_sharing.restservices.DAOMissingException') {
        this.toast.error(null, 'TOAST.RENDER_NOT_FOUND', null, null, null, {
          link: {
            caption: 'BACK',
            callback: () => this.close()
          }
        });
      } else {
        this.toast.error(error);
      }
      this.isLoading = false;
      loadingTask.done();
    });
    this.nodeApi.getNodeParents(this._nodeId).subscribe(nodes => this.breadcrumbsService.setNodePath(nodes.nodes.reverse()));
  }
  postprocessHtml() {
    if (!this.configLegacy.instant('rendering.showPreview', true)) {
      jQuery('.edusharing_rendering_content_wrapper').hide();
      jQuery('.showDetails').hide();
    }
    if (this.isOpenable) {
      jQuery('#edusharing_downloadadvice').hide();
    }
    const element = jQuery('#edusharing_rendering_content_href');
    element.click(event => {
      if (this.connector.getBridgeService().isRunningCordova()) {
        const href = element.attr('href');
        this.connector.getBridgeService().getCordova().openBrowser(href);
        event.preventDefault();
      }
    });
  }
  downloadSequence() {
    const nodes = [this.sequenceParent].concat(this.sequence.nodes);
    this.nodeHelper.downloadNodes(nodes, this.sequenceParent.name + '.zip');
  }
  downloadCurrentNode() {
    if (this.downloadUrl) {
      this.nodeHelper.downloadUrl(this.downloadUrl, 'download', {
        node: this._node,
        triggerTrackingEvent: true
      });
    } else {
      this.nodeHelper.downloadNode(this._node, this.isChildobject ? null : this.version);
    }
  }
  openConnector(node, newWindow = true) {
    if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestToolService.isLtiObject(node)) {
      this.toolService.openLtiObject(node);
    } else {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.openConnector(this.connectors, this.iam, this.frame, this.toast, node, null, null, null, newWindow);
    }
  }
  initOptions() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.optionsHelper.setData({
        scope: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.Scope.Render,
        activeObjects: [_this._node],
        parent: new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.Node(_this._node.parent.id),
        allObjects: _this.list,
        customOptions: {
          useDefaultOptions: true,
          addOptions: _this.currentOptions
        },
        postPrepareOptions: (options, objects) => {
          if (_this.version && _this.version !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.NODE_VERSION_CURRENT) {
            options.filter(o => o.name === 'OPTIONS.OPEN')[0].isEnabled = false;
          }
        }
      });
      yield _this.optionsHelper.initComponents(_this.actionbar);
      _this.optionsHelper.refreshComponents();
      _this.postprocessHtml();
      _this.isBuildingPage = false;
      _this.handleQueryAction();
    })();
  }
  isCollectionRef() {
    return this._node.aspects.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_ASPECT_IO_REFERENCE) != -1;
  }
  addDownloadButton(download) {
    this.nodeApi.getNodeChildobjects(this.sequenceParent.ref.id, this.sequenceParent.ref.repo).subscribe(data => {
      this.downloadButton = download;
      const options = [];
      options.splice(0, 0, download);
      if (data.nodes.length > 0 || this._node.aspects.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_ASPECT_IO_CHILDOBJECT) != -1) {
        const downloadAll = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionItem('OPTIONS.DOWNLOAD_ALL', 'archive', () => {
          this.downloadSequence();
        });
        downloadAll.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ElementType.Node, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ElementType.NodeChild, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ElementType.NodePublishedCopy];
        downloadAll.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.DefaultGroups.View;
        downloadAll.priority = 35;
        options.splice(1, 0, downloadAll);
      }
      this.currentOptions = options;
      this.initOptions();
    });
  }
  setDownloadUrl(url) {
    console.info('url from rendering', url);
    if (this.downloadButton != null) {
      this.downloadButton.customEnabledCallback = () => url != null;
    }
    this.downloadUrl = url;
    this.initOptions();
  }
  getSequence(onFinish) {
    if (this._node.aspects.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.CCM_ASPECT_IO_CHILDOBJECT) != -1) {
      this.nodeApi.getNodeMetadata(this._node.parent.id).subscribe(data => {
        this.sequenceParent = data.node;
        this.nodeApi.getNodeChildobjects(this.sequenceParent.ref.id, this.sequenceParent.ref.repo).subscribe(data => {
          if (data.nodes.length > 0) {
            this.sequence = data;
          } else {
            this.sequence = null;
          }
          setTimeout(() => this.setScrollparameters(), 100);
          onFinish();
        });
      });
    } else {
      this.sequenceParent = this._node;
      this.nodeApi.getNodeChildobjects(this.sequenceParent.ref.id, this.sequenceParent.ref.repo).subscribe(data => {
        if (data.nodes.length > 0) {
          this.sequence = data;
        } else {
          this.sequence = null;
        }
        setTimeout(() => this.setScrollparameters(), 100);
        onFinish();
      }, error => {
        console.error('failed sequence fetching');
        console.error(error);
        onFinish();
      });
    }
  }
  scroll(direction) {
    const element = this.sequencediv.nativeElement;
    const width = window.innerWidth / 2;
    this.uiService.scrollSmoothElement(element.scrollLeft + (direction == 'left' ? -width : width), element, 2, 'x').then(limit => {
      this.setScrollparameters();
    });
  }
  setScrollparameters() {
    if (!this.sequence) return;
    const element = this.sequencediv.nativeElement;
    if (element.scrollLeft <= 20) {
      this.canScrollLeft = false;
    } else {
      this.canScrollLeft = true;
    }
    if (element.scrollLeft + 20 >= element.scrollWidth - window.innerWidth) {
      this.canScrollRight = false;
    } else {
      this.canScrollRight = true;
    }
  }
  getNodeName(node) {
    return _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestHelper.getName(node);
  }
  getName() {
    if (this._node) {
      return this.getNodeName(this._node);
    } else {
      return '';
    }
  }
  getNodeTitle(node) {
    return _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestHelper.getTitle(node);
  }
  switchNode(event) {
    this.uiService.scrollSmooth();
    this.node = event.node;
  }
  loadSimilarNodes() {
    this.similarNodes.isLoading = true;
    this.searchApi.searchFingerprint(this._nodeId).subscribe(data => {
      this.similarNodes.isLoading = false;
      this.similarNodes.setData(data.nodes, data.pagination);
    });
  }
  linkSearchableWidgets() {
    try {
      this.mds.widgets.filter(w => w.isSearchable).forEach(w => {
        try {
          const values = document.querySelectorAll("#edusharing_rendering_metadata [data-widget-id='" + w.id + "'] .mdsWidgetMultivalue .mdsValue");
          values.forEach(v => {
            v.classList.add('clickable', 'mdsValueClickable');
            v.tabIndex = 0;
            const key = v.getAttribute('data-value-key');
            v.onclick = () => {
              this.navigateToSearch(w.id, key);
            };
            v.onkeyup = k => {
              if (k.key === 'Enter') {
                this.navigateToSearch(w.id, key);
              }
            };
          });
        } catch (e) {}
      });
      // document.getElementsByClassName("edusharing_rendering_content_wrapper")[0].ge;
    } catch (e) {
      console.warn('Could not read the widget list from the metadataset', e);
    }
  }
  navigateToSearch(id, value) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.getCommonParameters(this.route).subscribe(params => {
      const data = {};
      data[id] = [value];
      params.mds = this.getMdsId();
      params.sidenav = true;
      params.repo = this.repository;
      params.parameters = JSON.stringify(data);
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIConstants.ROUTER_PREFIX + 'search'], {
        queryParams: params
      });
    });
  }
  getMdsId() {
    return this._node.metadataset ? this._node.metadataset : _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.DEFAULT;
  }
  handleProposal() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.queryParams.proposal && _this2.queryParams.proposalCollection) {
        _this2._node.proposal = (yield _this2.nodeApi.getNodeMetadata(_this2.queryParams.proposal, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConstants.ALL]).toPromise()).node;
        _this2._node.proposalCollection = new _core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.Node(_this2.queryParams.proposalCollection);
        // access is granted when we can fetch the node
        _this2._node.accessible = true;
        _this2.optionsHelper.refreshComponents();
      }
    })();
  }
  /**
   * check if the current url requested to directly open an action (from the actionbar),
   * and if so, call it
   */
  handleQueryAction() {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.queryParams.action) {
        const option = (yield _this3.optionsHelper.getAvailableOptions(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.Target.Actionbar)).filter(o => o.name === _this3.queryParams.action)?.[0];
        if (option) {
          if (option.isEnabled) {
            option.callback();
            // wait until a dialog has opened, then, as soon as the particular dialog closed
            // trigger that the action has been done
            _this3.cardServcie.hasOpenModals.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.skipWhile)(h => !h), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.filter)(h => !h)).subscribe(() => _this3.onQueryActionDone());
          } else {
            console.warn('action ' + _this3.queryParams.action + ' is currently not enabled');
          }
        } else {
          console.warn('action ' + _this3.queryParams.action + ' is either not supported or not allowed for current user');
        }
      }
    })();
  }
  onQueryActionDone() {
    if (this.queryParams.action) {
      window.close();
    }
  }
  /**
   * Moves a style element that is a child of `element` to the document head.
   *
   * Existing style elements that were previously moved to the document head like this will be
   * removed.
   *
   * The style element will be removed from document head on `ngDestroy`.
   */
  moveInnerStyleToHead(element) {
    const styleAttr = 'data-render-content-style';
    jQuery('[' + styleAttr + ']').remove();
    const style = element.find('style');
    style.attr(styleAttr, '');
    jQuery(document.head).append(style);
    this.destroyed$.subscribe(() => style.remove());
  }
  static #_ = this.ɵfac = function RenderPageComponent_Factory(t) {
    return new (t || RenderPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.UIService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_8__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_render_helper_service__WEBPACK_IMPORTED_MODULE_7__.RenderHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_23__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestConnectorsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestToolService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_services_card_service__WEBPACK_IMPORTED_MODULE_9__.CardService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.FrameEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_10__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_24__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_25__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_2__.RestNetworkService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_11__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_25__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_23__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_12__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_13__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.LocalEventsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
    type: RenderPageComponent,
    selectors: [["es-render-page"]],
    viewQuery: function RenderPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.sequencediv = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.actionbar = _t.first);
      }
    },
    hostBindings: function RenderPageComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("beforeunload", function RenderPageComponent_beforeunload_HostBindingHandler($event) {
          return ctx.beforeunloadHandler($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresolveWindow"])("resize", function RenderPageComponent_resize_HostBindingHandler($event) {
          return ctx.onResize($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresolveWindow"])("keydown", function RenderPageComponent_keydown_HostBindingHandler($event) {
          return ctx.handleKeyboardEvent($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresolveDocument"]);
      }
    },
    inputs: {
      node: "node",
      showTopBar: "showTopBar",
      version: "version",
      metadata: "metadata"
    },
    outputs: {
      onClose: "onClose"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵProvidersFeature"]([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.OptionsHelperDataService, _render_helper_service__WEBPACK_IMPORTED_MODULE_7__.RenderHelperService])],
    decls: 12,
    vars: 10,
    consts: [["class", "topBar fixed", 4, "ngIf"], [4, "ngIf"], ["id", "nodeRenderContentWrapper"], ["id", "sequence", 4, "ngIf"], ["class", "scroller left clickable", "id", "left", 3, "click", 4, "ngIf"], ["class", "scroller right clickable", "id", "right", 3, "click", 4, "ngIf"], ["esTitle", "", "hidden", "", 1, "display-none"], ["id", "nodeRenderContent", "esTouchEvent", "", 3, "ngSwipeRight", "ngSwipeLeft"], ["class", "nodeRenderLoading", 4, "ngIf"], ["class", "similarNodes", 4, "ngIf"], [1, "topBar", "fixed"], [1, "displayBar"], [1, "left"], ["mat-button", "", 3, "title", "click"], ["esIcon", "keyboard_arrow_left"], [1, "render-back"], [1, "center"], ["mat-button", "", 3, "title", "click", 4, "ngIf"], [1, "right"], [3, "backgroundType", "numberOfAlwaysVisibleOptions", "numberOfAlwaysVisibleOptionsMobile"], ["actionbar", ""], ["esIcon", "info_outline"], [1, "hidemobile"], ["class", "previous", "cdkMonitorElementFocus", "", 3, "click", 4, "ngIf"], ["class", "next", "cdkMonitorElementFocus", "", 3, "click", 4, "ngIf"], ["cdkMonitorElementFocus", "", 1, "previous", 3, "click"], ["esIcon", "keyboard_arrow_left", 3, "aria"], ["cdkMonitorElementFocus", "", 1, "next", 3, "click"], ["esIcon", "keyboard_arrow_right", 3, "aria"], ["id", "sequence"], ["sequencediv", ""], ["tabindex", "0", 1, "wrapperouter", "clickable", 3, "click", "keyup.enter"], [1, "itemTitle"], [1, "wrapper"], [3, "src"], ["tabindex", "0", "class", "wrapperouter clickable", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["id", "left", 1, "scroller", "left", "clickable", 3, "click"], ["id", "right", 1, "scroller", "right", "clickable", 3, "click"], [1, "nodeRenderLoading"], [1, "similarNodes"], [1, "caption"], [3, "dataSource", "displayType", "columns", "checkbox", "elementInteractionType"]],
    template: function RenderPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](0, RenderPageComponent_div_0_Template, 14, 10, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, RenderPageComponent_div_1_Template, 3, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div")(3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](4, RenderPageComponent_div_4_Template, 8, 5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](5, RenderPageComponent_div_5_Template, 2, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](6, RenderPageComponent_div_6_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngSwipeRight", function RenderPageComponent_Template_div_ngSwipeRight_9_listener() {
          return ctx.canSwitchBack() ? ctx.switchPosition(ctx.getPosition() - 1) : null;
        })("ngSwipeLeft", function RenderPageComponent_Template_div_ngSwipeLeft_9_listener() {
          return ctx.canSwitchForward() ? ctx.switchPosition(ctx.getPosition() + 1) : null;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](10, RenderPageComponent_div_10_Template, 2, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](11, RenderPageComponent_div_11_Template, 4, 5, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        let tmp_0_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.showTopBar && !((tmp_0_0 = ctx.mainNavService.getMainNav()) == null ? null : tmp_0_0.topBar == null ? null : tmp_0_0.topBar.isSidenavOpen()));
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.getPosition() != -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.sequence);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.canScrollLeft);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.canScrollRight);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx.getNodeTitle(ctx._node));
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵclassProp"]("hide", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.similarNodes.isEmpty());
      }
    },
    dependencies: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_26__.CdkMonitorFocus, _angular_common__WEBPACK_IMPORTED_MODULE_23__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_23__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.NodeEntriesWrapperComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_27__.MatButton, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_14__.TitleDirective, _touchevents_directive__WEBPACK_IMPORTED_MODULE_15__.TouchEventDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslatePipe],
    styles: ["\n\ni[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n\na[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:active {\n  color: #fff;\n  text-decoration: none;\n}\n\n.pointed[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.previous[_ngcontent-%COMP%], .next[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  background: #585858;\n  border-radius: 2px;\n  padding: 2px;\n  z-index: 5;\n  border: none;\n}\n.previous.cdk-keyboard-focused[_ngcontent-%COMP%], .next.cdk-keyboard-focused[_ngcontent-%COMP%] {\n  outline: none;\n  outline: var(--focusWidth) solid var(--palette-primary-300);\n  outline-offset: 2px;\n}\n\n.next[_ngcontent-%COMP%] {\n  left: auto;\n  right: 0;\n}\n\n.previous[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .next[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 30px;\n  color: #fff;\n}\n\n[_nghost-%COMP%]     a.edusharing_rendering_content {\n  background-color: var(--primary);\n}\n[_nghost-%COMP%]     a.edusharing_rendering_content:focus {\n  outline: none;\n  outline: var(--focusWidth) solid var(--palette-primary-300);\n  outline-offset: 2px;\n}\n[_nghost-%COMP%]     .edusharing_rendering_metadata_body comments .group {\n  padding: 0 10px;\n}\n[_nghost-%COMP%]     .edusharing_rendering_metadata_body [data-element=collections] .list {\n  padding-top: 15px;\n}\n[_nghost-%COMP%]     .edusharing_rendering_metadata_body [data-element=collections] .list .cardContainer {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n[_nghost-%COMP%]     .more {\n  color: white !important;\n}\n[_nghost-%COMP%]     .edusharing_rendering_metadata_body .mdsWidgetMultivalue .mdsValueClickable {\n  background-color: rgba(var(--palette-primary-500-no-rgb), 0.08);\n  border: 1px solid var(--primary);\n  color: var(--primary);\n  font-weight: 400;\n}\n[_nghost-%COMP%]     .edusharing_rendering_metadata_body .mds_license a:focus {\n  outline: none;\n  outline: var(--focusWidth) solid var(--palette-primary-300);\n  outline-offset: 2px;\n}\n\n.topBar[_ngcontent-%COMP%] {\n  background: #383838;\n  color: #ffffff;\n  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);\n  top: 0;\n  left: 0;\n  height: var(--mainnavHeight);\n  z-index: 99;\n  position: sticky;\n  width: 100%;\n}\n.topBar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: unset;\n}\n\n.displayBar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n}\n.displayBar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  flex-basis: 0;\n  align-items: center;\n  height: 100%;\n}\n.displayBar[_ngcontent-%COMP%]    > div.left[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n.displayBar[_ngcontent-%COMP%]    > div.center[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.displayBar[_ngcontent-%COMP%]    > div.right[_ngcontent-%COMP%] {\n  justify-content: right;\n}\n.displayBar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 100%;\n  padding: 20px;\n}\n.displayBar[_ngcontent-%COMP%]   es-actionbar[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n\n  .displayBar > button:first-child .mat-button-wrapper {\n  justify-content: flex-start !important;\n}\n\n#nodeRenderContentWrapper[_ngcontent-%COMP%] {\n  background: #ebebeb;\n  width: 100%;\n}\n\n#nodeRenderContent[_ngcontent-%COMP%], .nodeRenderLoading[_ngcontent-%COMP%] {\n  height: auto;\n  position: relative;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n#sequence[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n  min-width: 100%;\n  text-align: center;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap;\n}\n#sequence[_ngcontent-%COMP%]   .itemTitle[_ngcontent-%COMP%] {\n  color: #585858;\n  display: inline-block;\n  width: 100px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  text-align: center;\n  margin-bottom: -2px;\n}\n#sequence[_ngcontent-%COMP%]   .wrapperouter[_ngcontent-%COMP%] {\n  display: inline-block;\n  position: relative;\n  margin: 0 10px;\n}\n#sequence[_ngcontent-%COMP%]   .wrapperouter[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%] {\n  margin: 3px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n#sequence[_ngcontent-%COMP%]   .wrapperouter[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-bottom: -5px;\n  height: 75px;\n  width: 100px;\n  object-fit: cover;\n}\n#sequence[_ngcontent-%COMP%]   .wrapperouter[_ngcontent-%COMP%]   .wrapper.selected[_ngcontent-%COMP%] {\n  margin: 0;\n  border: 3px solid var(--palette-primary-200);\n  box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);\n}\n#sequence[_ngcontent-%COMP%]   .wrapperouter[_ngcontent-%COMP%]   .wrapper.selected[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  left: 43px;\n  top: 100px;\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid var(--palette-primary-200);\n  clear: both;\n}\n\n.scroller[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(8px + var(--mainnavHeight));\n  padding: 5px 10px;\n  background-color: rgba(0, 0, 0, 0.6);\n  color: #fff;\n}\n\n.scroller.left[_ngcontent-%COMP%] {\n  left: 0;\n}\n\n.scroller.right[_ngcontent-%COMP%] {\n  right: 0;\n}\n\n.nodeRenderLoading[_ngcontent-%COMP%] {\n  height: calc(100vh - var(--mainnavHeight));\n  overflow: hidden;\n}\n.nodeRenderLoading[_ngcontent-%COMP%]   es-spinner[_ngcontent-%COMP%] {\n  position: relative;\n  top: 50px;\n}\n\n.edusharing_rendering_content_wrapper[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n\n.edusharing_rendering_metadata_top[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n#edusharing_rendering_metadata_top_toggle[_ngcontent-%COMP%] {\n  color: var(--primary);\n  top: 10px;\n  position: relative;\n}\n\na.edusharing_rendering_content[_ngcontent-%COMP%] {\n  background-color: var(--primary);\n}\n\n.edusharing_rendering_wrapper[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n\n.edusharing_rendering_content_wrapper[_ngcontent-%COMP%] {\n  min-height: 500px;\n}\n\n.edusharing_rendering_content[_ngcontent-%COMP%] {\n  height: calc(100% - var(--mainnavHeight) - 130px) !important;\n}\n\n[_nghost-%COMP%]     .mdsWidget .comment .avatarCircle {\n  cursor: default !important;\n}\n[_nghost-%COMP%]     .node-comments {\n  margin: 15px;\n  color: var(--primary);\n  display: flex;\n  align-items: center;\n  min-width: 160px;\n  justify-content: flex-end;\n}\n[_nghost-%COMP%]     .node-comments .item {\n  display: flex;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n[_nghost-%COMP%]     .node-comments .item:focus {\n  outline: none;\n  box-shadow: 0 0 0 2px var(--palette-primary-300) !important;\n}\n[_nghost-%COMP%]     .node-comments .item > i {\n  padding-left: 5px;\n}\n[_nghost-%COMP%]     .node-comments .item > div {\n  margin: 0 10px;\n}\n[_nghost-%COMP%]     .node-comments .item > div span {\n  text-transform: uppercase;\n}\n\ndiv.download[_ngcontent-%COMP%] {\n  margin-top: -8px;\n}\n\n.similarNodes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n  width: 100%;\n  background-color: #fff;\n}\n.similarNodes[_ngcontent-%COMP%]   es-listTable[_ngcontent-%COMP%] {\n  \n\n}\n.similarNodes[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n  color: var(--textLight);\n  font-weight: bold;\n  display: block;\n}\n\n@media (pointer: coarse) {\n  #sequence[_ngcontent-%COMP%] {\n    overflow-x: auto;\n    \n\n    -webkit-overflow-scrolling: touch;\n  }\n  .scroller[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media screen and (max-width: 700px) {\n  div.download[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 120%;\n  }\n  .render-back[_ngcontent-%COMP%] {\n    display: none;\n  }\n  [_nghost-%COMP%]     .node-comments {\n    min-width: unset;\n    padding-right: 10px;\n  }\n  [_nghost-%COMP%]     .node-comments > div > div > span {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9yZW5kZXItcGFnZS9yZW5kZXItcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvYnJhbmRpbmcuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxzQkFBQTtBQUFKOztBQUdBOzs7O0VBSUksV0FBQTtFQUNBLHFCQUFBO0FBQUo7O0FBR0E7RUFDSSxlQUFBO0FBQUo7O0FBRUE7O0VBRUksZUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQUNKO0FBQUk7O0VDcUJBLGFBQUE7RUFNSSwyREFBQTtFQUNBLG1CQUFBO0FEdEJSOztBQUZBO0VBQ0ksVUFBQTtFQUNBLFFBQUE7QUFLSjs7QUFIQTs7RUFFSSxlQUFBO0VBQ0EsV0FBQTtBQU1KOztBQUhJO0VBQ0ksZ0NFMUNFO0FGZ0RWO0FBSFE7RUNHSixhQUFBO0VBTUksMkRBQUE7RUFDQSxtQkFBQTtBREZSO0FBSkk7RUFDSSxlQUFBO0FBTVI7QUFKSTtFQUNJLGlCQUFBO0FBTVI7QUFMUTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUFPWjtBQUpJO0VBQ0ksdUJBQUE7QUFNUjtBQUhRO0VBQ0ksK0REakNZO0VDa0NaLGdDQUFBO0VBQ0EscUJFbkVGO0VGb0VFLGdCQUFBO0FBS1o7QUFESTtFQ3hCQSxhQUFBO0VBTUksMkRBQUE7RUFDQSxtQkFBQTtBRHVCUjs7QUFGQTtFQUNJLG1CQUFBO0VBQ0EsY0FBQTtFQUdBLCtDQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFLSjtBQUpJO0VBQ0ksWUFBQTtBQU1SOztBQUhBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7QUFNSjtBQUxJO0VBQ0ksYUFBQTtFQUVBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBTVI7QUFMUTtFQUNJLDJCQUFBO0FBT1o7QUFMUTtFQUNJLHVCQUFBO0FBT1o7QUFMUTtFQUNJLHNCQUFBO0FBT1o7QUFKSTtFQUNJLFlBQUE7RUFDQSxhQUFBO0FBTVI7QUFKSTtFQUNJLGtCQUFBO0FBTVI7O0FBSEE7RUFDSSxzQ0FBQTtBQU1KOztBQUhBO0VBQ0ksbUJBQUE7RUFDQSxXQUFBO0FBTUo7O0FBSEE7O0VBRUksWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBTUo7O0FBSEE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQU1KO0FBTEk7RUFDSSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQU9SO0FBTEk7RUFDSSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQU9SO0FBTlE7RUFDSSxXQUFBO0VDNUlSLHNDQUFBO0FEcUpKO0FBUFk7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFTaEI7QUFOUTtFQUNJLFNBQUE7RUFDQSw0Q0FBQTtFQzlJUix1Q0FBQTtBRHVKSjtBQU5RO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLG1DQUFBO0VBQ0Esb0NBQUE7RUFDQSxpREFBQTtFQUNBLFdBQUE7QUFRWjs7QUFKQTtFQUNJLGtCQUFBO0VBQ0EscUNBQUE7RUFDQSxpQkFBQTtFQUNBLG9DQUFBO0VBQ0EsV0FBQTtBQU9KOztBQUxBO0VBQ0ksT0FBQTtBQVFKOztBQU5BO0VBQ0ksUUFBQTtBQVNKOztBQU5BO0VBQ0ksMENBQUE7RUFDQSxnQkFBQTtBQVNKO0FBUkk7RUFDSSxrQkFBQTtFQUNBLFNBQUE7QUFVUjs7QUFQQTtFQUNJLGtCQUFBO0FBVUo7O0FBUEE7RUFDSSxhQUFBO0FBVUo7O0FBUkE7RUFDSSxxQkV6Tk07RUYwTk4sU0FBQTtFQUNBLGtCQUFBO0FBV0o7O0FBVEE7RUFDSSxnQ0U5Tk07QUYwT1Y7O0FBVkE7RUFDSSx5QkFBQTtBQWFKOztBQVhBO0VBQ0ksaUJBQUE7QUFjSjs7QUFYQTtFQUNJLDREQUFBO0FBY0o7O0FBVkk7RUFDSSwwQkFBQTtBQWFSO0FBWEk7RUFDSSxZQUFBO0VBQ0EscUJFalBFO0VGa1BGLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFhUjtBQVpRO0VBQ0ksYUFBQTtFQ3RQUixlQUFBO0VBQ0EseUJBQUE7RUFHQSxpQkFBQTtFQUNBLHdDQUFBO0FEcVFKO0FBbEJZO0VDek1SLGFBQUE7RUUyQ0EsMkRBQUE7QUhvTEo7QUFuQlk7RUFDSSxpQkFBQTtBQXFCaEI7QUFuQlk7RUFDSSxjQUFBO0FBcUJoQjtBQXBCZ0I7RUFDSSx5QkFBQTtBQXNCcEI7O0FBaEJBO0VBQ0ksZ0JBQUE7QUFtQko7O0FBaEJBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtBQW1CSjtBQWxCSTtFQUNJLGVBQUE7QUFvQlI7QUFsQkk7RUFDSSxvQkFBQTtFQUNBLHVCRHZRSTtFQ3dRSixpQkFBQTtFQUNBLGNBQUE7QUFvQlI7O0FBaEJBO0VBQ0k7SUFDSSxnQkFBQTtJR3hRSixzQkFBQTtJQUNBLGlDQUFBO0VINFJGO0VBbEJFO0lBQ0ksYUFBQTtFQW9CTjtBQUNGO0FBbEJBO0VBQ0k7SUFDSSxlQUFBO0VBb0JOO0VBbEJFO0lBQ0ksYUFBQTtFQW9CTjtFQWxCRTtJQUNJLGdCQUFBO0lBQ0EsbUJBQUE7RUFvQk47RUFuQk07SUFDSSxhQUFBO0VBcUJWO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuaSB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuYSxcbmE6aG92ZXIsXG5hOnZpc2l0ZWQsXG5hOmFjdGl2ZSB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4ucG9pbnRlZCB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnByZXZpb3VzLFxuLm5leHQge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogNTAlO1xuICAgIGJhY2tncm91bmQ6ICM1ODU4NTg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICB6LWluZGV4OiA1O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkIHtcbiAgICAgICAgQGluY2x1ZGUgc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygpO1xuICAgIH1cbn1cbi5uZXh0IHtcbiAgICBsZWZ0OiBhdXRvO1xuICAgIHJpZ2h0OiAwO1xufVxuLnByZXZpb3VzIGksXG4ubmV4dCBpIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgY29sb3I6ICNmZmY7XG59XG46aG9zdCA6Om5nLWRlZXAge1xuICAgIGEuZWR1c2hhcmluZ19yZW5kZXJpbmdfY29udGVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICAgICAgICAvLyBgJi5jZGsta2V5Ym9hcmQtZm9jdXNlZGAgd291bGQgYmUgYmV0dGVyLCBidXQgd2UgY2Fubm90IHRyaXZpYWxseSBhcHBseSB0aGVcbiAgICAgICAgLy8gYGNka01vbml0b3JFbGVtZW50Rm9jdXNgIGRpcmVjdGl2ZSBoZXJlLlxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAuZWR1c2hhcmluZ19yZW5kZXJpbmdfbWV0YWRhdGFfYm9keSBjb21tZW50cyAuZ3JvdXAge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgfVxuICAgIC5lZHVzaGFyaW5nX3JlbmRlcmluZ19tZXRhZGF0YV9ib2R5IFtkYXRhLWVsZW1lbnQ9J2NvbGxlY3Rpb25zJ10gLmxpc3Qge1xuICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgLmNhcmRDb250YWluZXIge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC5tb3JlIHtcbiAgICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5lZHVzaGFyaW5nX3JlbmRlcmluZ19tZXRhZGF0YV9ib2R5IHtcbiAgICAgICAgLm1kc1dpZGdldE11bHRpdmFsdWUgLm1kc1ZhbHVlQ2xpY2thYmxlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRidXR0b25Ib3ZlckJhY2tncm91bmQ7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAkcHJpbWFyeTtcbiAgICAgICAgICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWdhaW4sIGAmLmNkay1rZXlib2FyZC1mb2N1c2VkYCB3b3VsZCBiZSBiZXR0ZXIuXG4gICAgLmVkdXNoYXJpbmdfcmVuZGVyaW5nX21ldGFkYXRhX2JvZHkgLm1kc19saWNlbnNlIGE6Zm9jdXMge1xuICAgICAgICBAaW5jbHVkZSBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCk7XG4gICAgfVxufVxuLnRvcEJhciB7XG4gICAgYmFja2dyb3VuZDogIzM4MzgzODtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAzcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgIC1tb3otYm94LXNoYWRvdzogMHB4IDNweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDNweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgaGVpZ2h0OiB2YXIoLS1tYWlubmF2SGVpZ2h0KTtcbiAgICB6LWluZGV4OiAkdG9wQmFyWkluZGV4ICsgMTtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgICYgYnV0dG9uIHtcbiAgICAgICAgY29sb3I6IHVuc2V0O1xuICAgIH1cbn1cbi5kaXNwbGF5QmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICA+IGRpdiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC8vIE1ha2UgYWxsIGNoaWxkIGNvbnRhaW5lcnMgZXF1YWwgd2lkdGgsIHNvIC5jZW50ZXIgaXMgcHJvcGVybHkgY2VudGVyZWQuXG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgZmxleC1iYXNpczogMDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAmLmxlZnQge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgICYuY2VudGVyIHtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgICYucmlnaHQge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiByaWdodDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBidXR0b24ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgfVxuICAgIGVzLWFjdGlvbmJhciB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICB9XG59XG46Om5nLWRlZXAgLmRpc3BsYXlCYXIgPiBidXR0b246Zmlyc3QtY2hpbGQgLm1hdC1idXR0b24td3JhcHBlciB7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0ICFpbXBvcnRhbnQ7XG59XG5cbiNub2RlUmVuZGVyQ29udGVudFdyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICNlYmViZWI7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbiNub2RlUmVuZGVyQ29udGVudCxcbi5ub2RlUmVuZGVyTG9hZGluZyB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG5cbiNzZXF1ZW5jZSB7XG4gICAgcGFkZGluZzogMzBweCAyMHB4O1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAuaXRlbVRpdGxlIHtcbiAgICAgICAgY29sb3I6ICM1ODU4NTg7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAtMnB4O1xuICAgIH1cbiAgICAud3JhcHBlcm91dGVyIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgICAgICAud3JhcHBlciB7XG4gICAgICAgICAgICBtYXJnaW46IDNweDtcbiAgICAgICAgICAgIEBpbmNsdWRlIG1hdGVyaWFsU2hhZG93KCk7XG4gICAgICAgICAgICBpbWcge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IC01cHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA3NXB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAud3JhcHBlci5zZWxlY3RlZCB7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBib3JkZXI6IDNweCBzb2xpZCAkcHJpbWFyeU1lZGl1bUxpZ2h0O1xuICAgICAgICAgICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgpO1xuICAgICAgICB9XG4gICAgICAgIC53cmFwcGVyLnNlbGVjdGVkOmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogNDNweDtcbiAgICAgICAgICAgIHRvcDogMTAwcHg7XG4gICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCAkcHJpbWFyeU1lZGl1bUxpZ2h0O1xuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG4uc2Nyb2xsZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IGNhbGMoOHB4ICsgdmFyKC0tbWFpbm5hdkhlaWdodCkpO1xuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICBjb2xvcjogI2ZmZjtcbn1cbi5zY3JvbGxlci5sZWZ0IHtcbiAgICBsZWZ0OiAwO1xufVxuLnNjcm9sbGVyLnJpZ2h0IHtcbiAgICByaWdodDogMDtcbn1cblxuLm5vZGVSZW5kZXJMb2FkaW5nIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1tYWlubmF2SGVpZ2h0KSk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBlcy1zcGlubmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDUwcHg7XG4gICAgfVxufVxuLmVkdXNoYXJpbmdfcmVuZGVyaW5nX2NvbnRlbnRfd3JhcHBlciB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4uZWR1c2hhcmluZ19yZW5kZXJpbmdfbWV0YWRhdGFfdG9wIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xufVxuI2VkdXNoYXJpbmdfcmVuZGVyaW5nX21ldGFkYXRhX3RvcF90b2dnbGUge1xuICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICB0b3A6IDEwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuYS5lZHVzaGFyaW5nX3JlbmRlcmluZ19jb250ZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeTtcbn1cbi5lZHVzaGFyaW5nX3JlbmRlcmluZ193cmFwcGVyIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmVkdXNoYXJpbmdfcmVuZGVyaW5nX2NvbnRlbnRfd3JhcHBlciB7XG4gICAgbWluLWhlaWdodDogNTAwcHg7XG59XG5cbi5lZHVzaGFyaW5nX3JlbmRlcmluZ19jb250ZW50IHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIHZhcigtLW1haW5uYXZIZWlnaHQpIC0gMTMwcHgpICFpbXBvcnRhbnQ7XG59XG5cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgLm1kc1dpZGdldCAuY29tbWVudCAuYXZhdGFyQ2lyY2xlIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5ub2RlLWNvbW1lbnRzIHtcbiAgICAgICAgbWFyZ2luOiAxNXB4O1xuICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1pbi13aWR0aDogMTYwcHg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIC5pdGVtIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBAaW5jbHVkZSBjbGlja2FibGUoKTtcbiAgICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIHNldEdsb2JhbEZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA+IGkge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgICAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmRpdi5kb3dubG9hZCB7XG4gICAgbWFyZ2luLXRvcDogLThweDtcbn1cblxuLnNpbWlsYXJOb2RlcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBlcy1saXN0VGFibGUge1xuICAgICAgICAvKm1hcmdpbjphdXRvOyovXG4gICAgfVxuICAgIC5jYXB0aW9uIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxufVxuXG5AbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xuICAgICNzZXF1ZW5jZSB7XG4gICAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgICAgIEBpbmNsdWRlIGlvc1Njcm9sbGluZygpO1xuICAgIH1cbiAgICAuc2Nyb2xsZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCkge1xuICAgIGRpdi5kb3dubG9hZCBpIHtcbiAgICAgICAgZm9udC1zaXplOiAxMjAlO1xuICAgIH1cbiAgICAucmVuZGVyLWJhY2sge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICA6aG9zdCA6Om5nLWRlZXAgLm5vZGUtY29tbWVudHMge1xuICAgICAgICBtaW4td2lkdGg6IHVuc2V0O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgICAgICA+IGRpdiA+IGRpdiA+IHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIiwiQG1peGluIGltYWdlRGlzYWJsZWRCbHVyKCkge1xuICAgIC13ZWJraXQtZmlsdGVyOiBibHVyKDNweCk7XG4gICAgZmlsdGVyOiBibHVyKDNweCk7XG59XG5AbWl4aW4gc2hvcnRlblRleHQoKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TGFyZ2UoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDEwcHggNzBweCByZ2JhKDAsIDAsIDAsIDAuMTUpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIGxpbWl0TGluZUxlbmd0aCgkd2lkdGgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgbWF4LXdpZHRoOiAkd2lkdGg7XG59XG5AbWl4aW4gdW5zZWxlY3RhYmxlVGV4dCgpIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5AbWl4aW4gaW9zU2Nyb2xsaW5nKCkge1xuICAgIC8qIGlvcyBzY3JvbGxpbmcgZml4ICovXG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuQG1peGluIHBsYWNlaG9sZGVyIHtcbiAgICA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICAgIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsSW5zZXRGb2N1cygpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgJGZvY3VzV2lkdGggJGZvY3VzQ29sb3IgIWltcG9ydGFudDtcbiAgICBAbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkge1xuICAgICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJywgJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiAkZm9jdXNXaWR0aCBzb2xpZCAkY29sb3I7XG4gICAgfVxufVxuQG1peGluIHNldEdsb2JhbERhc2hlZEZvY3VzKCkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIGRhc2hlZCAkZm9jdXNDb2xvcjtcbn1cblxuQG1peGluIGZvY3VzU2hhZG93KCRkYXJrOiB0cnVlLCAkc3RyZW5ndGg6IDAuMSkge1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgQGlmICRkYXJrPT10cnVlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgJHN0cmVuZ3RoKTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICB9XG59XG5AbWl4aW4gZGFya2VuKCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5Db2xvcjtcbn1cbkBtaXhpbiBkYXJrZW5MaWdodCgpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFya2VuTGlnaHRDb2xvcjtcbn1cbkBtaXhpbiBibHVyQmFja2dyb3VuZCgkcmFkaXVzOiA1cHgpIHtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoJHJhZGl1cyk7XG59XG5AbWl4aW4gc2V0R2xvYmFsRm9jdXMoJGNvbG9yOiAkZm9jdXNDb2xvcikge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAkZm9jdXNXaWR0aCAkY29sb3IgIWltcG9ydGFudDtcbn1cblxuQG1peGluIHJlbW92ZUJ1dHRvbkRlZmF1bHRTdHlsZXMge1xuICAgIGJhY2tncm91bmQ6IHVuc2V0O1xuICAgIGJvcmRlcjogdW5zZXQ7XG4gICAgcGFkZGluZzogdW5zZXQ7XG59XG5cbkBtaXhpbiBhZnRlclBzZXVkb0VsZW1lbnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5AaW1wb3J0ICdwcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_28__.trigger)('fadeFast', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIAnimation.fade(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.UIAnimation.ANIMATION_TIME_FAST))]
    }
  });
}

/***/ }),

/***/ 17468:
/*!*********************************************************!*\
  !*** ./src/app/pages/render-page/render-page.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderPageModule: () => (/* binding */ RenderPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _comments_list_comments_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments-list/comments-list.component */ 18216);
/* harmony import */ var _node_relations_node_relations_widget_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node-relations/node-relations-widget.component */ 49976);
/* harmony import */ var _render_page_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render-page-routing.module */ 89856);
/* harmony import */ var _render_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render-page.component */ 2216);
/* harmony import */ var _touchevents_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./touchevents.directive */ 56823);
/* harmony import */ var _video_controls_duration_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./video-controls/duration.pipe */ 52769);
/* harmony import */ var _video_controls_video_controls_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./video-controls/video-controls.component */ 87279);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);









class RenderPageModule {
  static #_ = this.ɵfac = function RenderPageModule_Factory(t) {
    return new (t || RenderPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: RenderPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _render_page_routing_module__WEBPACK_IMPORTED_MODULE_3__.RenderPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](RenderPageModule, {
    declarations: [_comments_list_comments_list_component__WEBPACK_IMPORTED_MODULE_1__.CommentsListComponent, _video_controls_duration_pipe__WEBPACK_IMPORTED_MODULE_6__.DurationPipe, _node_relations_node_relations_widget_component__WEBPACK_IMPORTED_MODULE_2__.MdsNodeRelationsWidgetComponent, _render_page_component__WEBPACK_IMPORTED_MODULE_4__.RenderPageComponent, _touchevents_directive__WEBPACK_IMPORTED_MODULE_5__.TouchEventDirective, _video_controls_video_controls_component__WEBPACK_IMPORTED_MODULE_7__.VideoControlsComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _render_page_routing_module__WEBPACK_IMPORTED_MODULE_3__.RenderPageRoutingModule]
  });
})();

/***/ }),

/***/ 56823:
/*!************************************************************!*\
  !*** ./src/app/pages/render-page/touchevents.directive.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TouchEventDirective: () => (/* binding */ TouchEventDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);


class TouchEventDirective {
  constructor() {
    this.ngSwipeLeft = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.ngSwipeRight = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  onTouchStart(event) {
    this.touchStart = event;
  }
  onTouchEnd(event) {
    let horizontal = event.changedTouches[0].clientX - this.touchStart.changedTouches[0].clientX;
    let vertical = event.changedTouches[0].clientY - this.touchStart.changedTouches[0].clientY;
    let horizontalRelative = horizontal / window.innerWidth;
    if (Math.abs(horizontalRelative) < 0.1 || Math.abs(horizontal) < 50) return;
    // Vertical touches currently not supported
    if (Math.abs(horizontal) / Math.abs(vertical) < 5) return;
    if (horizontal < 0) this.ngSwipeLeft.emit(horizontalRelative);else this.ngSwipeRight.emit(horizontalRelative);
  }
  static #_ = this.ɵfac = function TouchEventDirective_Factory(t) {
    return new (t || TouchEventDirective)();
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: TouchEventDirective,
    selectors: [["", "esTouchEvent", ""]],
    hostBindings: function TouchEventDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("touchstart", function TouchEventDirective_touchstart_HostBindingHandler($event) {
          return ctx.onTouchStart($event);
        })("touchend", function TouchEventDirective_touchend_HostBindingHandler($event) {
          return ctx.onTouchEnd($event);
        });
      }
    },
    outputs: {
      ngSwipeLeft: "ngSwipeLeft",
      ngSwipeRight: "ngSwipeRight"
    }
  });
}

/***/ }),

/***/ 52769:
/*!*******************************************************************!*\
  !*** ./src/app/pages/render-page/video-controls/duration.pipe.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DurationPipe: () => (/* binding */ DurationPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class DurationPipe {
  transform(value, maxValue = value) {
    const totalSeconds = Math.floor(value);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;
    if (maxValue < 3600) {
      return toTwoDigitString(minutes) + ':' + toTwoDigitString(seconds);
    } else {
      return toTwoDigitString(hours) + ':' + toTwoDigitString(minutes) + ':' + toTwoDigitString(seconds);
    }
  }
  static #_ = this.ɵfac = function DurationPipe_Factory(t) {
    return new (t || DurationPipe)();
  };
  static #_2 = this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "esDuration",
    type: DurationPipe,
    pure: true
  });
}
function toTwoDigitString(n) {
  if (n < 10) {
    return '0' + n.toString();
  } else {
    return n.toString();
  }
}

/***/ }),

/***/ 87279:
/*!******************************************************************************!*\
  !*** ./src/app/pages/render-page/video-controls/video-controls.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoControlsComponent: () => (/* binding */ VideoControlsComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 15746);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 58175);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 76309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 9681);
/* harmony import */ var _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/rest-constants */ 46680);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _duration_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./duration.pipe */ 52769);
/* harmony import */ var _services_bridge_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/bridge.service */ 34997);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core-module/rest/services/rest-node.service */ 57857);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/expansion */ 88060);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var ngx_slider_v2__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ngx-slider-v2 */ 39566);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/components/spinner-small/spinner-small.component */ 65928);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-translate/core */ 21916);



























function VideoControlsComponent_div_0_ng_template_6_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function VideoControlsComponent_div_0_ng_template_6_button_25_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r4.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, "SAVE"), " ");
  }
}
function VideoControlsComponent_div_0_ng_template_6_es_spinner_small_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "es-spinner-small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, "SAVE"));
  }
}
function VideoControlsComponent_div_0_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 4)(1, "ngx-slider", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function VideoControlsComponent_div_0_ng_template_6_Template_ngx_slider_valueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r6.values.startTime = $event);
    })("highValueChange", function VideoControlsComponent_div_0_ng_template_6_Template_ngx_slider_highValueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r8.values.endTime = $event);
    })("valueChange", function VideoControlsComponent_div_0_ng_template_6_Template_ngx_slider_valueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r9.onValueChange($event, "start"));
    })("highValueChange", function VideoControlsComponent_div_0_ng_template_6_Template_ngx_slider_highValueChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r10.onValueChange($event, "end"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div")(3, "form", 6)(4, "div", 7)(5, "mat-form-field", 8)(6, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function VideoControlsComponent_div_0_ng_template_6_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r11.values.startTime = ($event.length === 8 || $event.length === 5) && ctx_r11.convertStringToTime($event) !== 0 ? ctx_r11.convertStringToTime($event) : ctx_r11.values.startTime);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "esDuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 7)(12, "mat-form-field", 10)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function VideoControlsComponent_div_0_ng_template_6_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r12.values.endTime = ($event.length === 8 || $event.length === 5) && ctx_r12.convertStringToTime($event) !== 0 ? ctx_r12.convertStringToTime($event) : ctx_r12.values.endTime);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](17, "esDuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "div", 12)(19, "mat-form-field")(20, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function VideoControlsComponent_div_0_ng_template_6_Template_input_ngModelChange_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r13.values.title = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](25, VideoControlsComponent_div_0_ng_template_6_button_25_Template, 3, 3, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](26, VideoControlsComponent_div_0_ng_template_6_es_spinner_small_26_Template, 3, 3, "es-spinner-small", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r1.values.startTime)("highValue", ctx_r1.values.endTime)("options", ctx_r1.sliderOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 11, "START"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](10, 13, ctx_r1.values.startTime, ctx_r1.video.duration));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](15, 16, "STOP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](17, 18, ctx_r1.values.endTime, ctx_r1.video.duration));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](22, 21, "NODE.cm:title"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r1.values.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r1.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.isLoading);
  }
}
function VideoControlsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 1)(1, "mat-expansion-panel", 2)(2, "mat-expansion-panel-header")(3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, VideoControlsComponent_div_0_ng_template_6_Template, 27, 23, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("small", ctx_r0.size === "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 3, "VIDEO_CONTROLS.HEADING"), " ");
  }
}
class VideoControlsComponent {
  constructor(bridge, collectionService, connector, nodeService, nodeHelper, router, mainNav, temporaryStorage, toast) {
    this.bridge = bridge;
    this.collectionService = collectionService;
    this.connector = connector;
    this.nodeService = nodeService;
    this.nodeHelper = nodeHelper;
    this.router = router;
    this.mainNav = mainNav;
    this.temporaryStorage = temporaryStorage;
    this.toast = toast;
    this.size = 'large';
    this.updateCurrentNode = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter();
    this.isLoading = false;
    this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.ReplaySubject(1);
  }
  ngOnInit() {
    // This component is injected programmatically without calling ngOnChanges. Therefore, we
    // require that critical inputs are available after init and don't support updates on these
    // values.
    if (!this.node) {
      throw new Error('Missing required input `node`');
    }
    if (!this.video) {
      throw new Error('Missing required input `video`');
    }
    this.hasRequiredPermissions = this.getHasRequiredPermissions(this.node);
    if (this.video.duration) {
      this.onVideoLoaded();
    } else {
      this.video.onloadedmetadata = () => {
        this.onVideoLoaded();
      };
    }
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  save() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isCollectionRef(_this.node) && _this.isOwner(_this.node)) {
        const node = yield _this.writeVideoControlsValues(_this.node, _this.values);
        if (node) {
          _this.updateCurrentNode.emit(node);
        }
      } else {
        // Not an individual object, choose new location first.
        _this.mainNav.getDialogs().addToCollection = [_this.node];
        _this.mainNav.getDialogs().onStoredAddToCollection.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.first)()).pipe().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(ref => ref.references.some(r => r.originalId === _this.node.ref.id))).subscribe( /*#__PURE__*/function () {
          var _ref = (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
            references
          }) {
            const node = yield _this.writeVideoControlsValues(references[0], _this.values, false);
            _this.node = node;
            _this.updateCurrentNode.emit(node);
          });
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    })();
  }
  onValueChange(value, type) {
    if (type === 'start' && value !== this.previousValues?.startTime
    // || type === 'end' && value !== this.previousValues?.endTime
    ) {
      this.video.currentTime = value;
    }
    this.previousValues = {
      ...this.values
    };
  }
  onVideoLoaded() {
    this.sliderOptions = this.getSliderOptions(this.video);
    this.values = this.readVideoControlsValues(this.node, this.video);
    this.registerVideoHooks(this.video);
    this.video.currentTime = this.values.startTime;
  }
  getHasRequiredPermissions(node) {
    if (this.connector.getCurrentLogin().isGuest) {
      return false;
    } else if (!this.connector.hasToolPermissionInstant(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_VIDEO_AUDIO_CUT)) {
      return false;
    } else {
      if (this.isCollectionRef(node)) {
        if (this.isOwner(node)) {
          return this.nodeHelper.getNodesRight([node], _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE);
        } else {
          return this.nodeHelper.getNodesRight([node], _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.NodesRightMode.Effective);
        }
      } else {
        return this.nodeHelper.getNodesRight([node], _core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_CC_PUBLISH);
      }
    }
  }
  /**
   * Reads video-control values from `node`.
   *
   * Uses `video` to set meaningful fallback values in case node doesn't define video-control
   * values. `video` has to have loaded metadata.
   */
  readVideoControlsValues(node, video) {
    const values = {
      title: node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TITLE]?.[0] ?? '',
      startTime: 0,
      endTime: video.duration
    };
    const vttCuesJson = node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_IO_REF_VIDEO_VTT];
    if (vttCuesJson && vttCuesJson.length === 1) {
      const vttCues = JSON.parse(vttCuesJson[0]);
      const vttCue = vttCues[vttCues.length - 1];
      if (vttCue) {
        values.startTime = vttCue.startTime;
        values.endTime = vttCue.endTime;
      }
    }
    return values;
  }
  convertStringToTime(str) {
    const splitted = str.split(':');
    if (splitted.length === 2) {
      return parseInt(splitted[0], 10) * 60 + parseInt(splitted[1], 10);
    } else if (splitted.length === 3) {
      return parseInt(splitted[0], 10) * 3600 + parseInt(splitted[1], 10) * 60 + parseInt(splitted[2], 10);
    }
    return 0;
  }
  writeVideoControlsValues(node, values, showMessage = true) {
    this.isLoading = true;
    const props = {
      [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_IO_REF_VIDEO_VTT]: [JSON.stringify([{
        startTime: values.startTime,
        endTime: values.endTime,
        text: ''
      }])],
      [_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TITLE]: [values.title]
    };
    return this.nodeService.editNodeMetadata(node.ref.id, props).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.tap)({
      next: () => {
        if (showMessage) {
          this.toast.toast('VIDEO_CONTROLS.SAVED');
        }
      },
      error: error => {
        this.toast.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(nodeWrapper => nodeWrapper.node),
    // Don't propagate errors any further.
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.of)(null))).toPromise();
  }
  getSliderOptions(video) {
    const durationPipe = new _duration_pipe__WEBPACK_IMPORTED_MODULE_2__.DurationPipe();
    return {
      floor: 0,
      ceil: video.duration,
      animate: true,
      draggableRange: true,
      minRange: 1,
      translate: value => durationPipe.transform(value, video.duration)
    };
  }
  registerVideoHooks(video) {
    const videoControlsComponent = this;
    video.addEventListener('timeupdate', function pauseOnEndTime() {
      // Pause each time endTime is reached, but allow to resume playback.
      if (this.currentTime >= videoControlsComponent.values.endTime &&
      // Pause only up to one second after exceeding endTime.
      Math.abs(this.currentTime - videoControlsComponent.values.endTime) < 1 &&
      // Do not pause if playback was started less than 2 seconds ago.
      new Date().getTime() - videoControlsComponent.playbackStartedTime?.getTime() > 2000) {
        this.pause();
      }
    });
    video.addEventListener('play', function onPlay() {
      videoControlsComponent.playbackStartedTime = new Date();
    });
  }
  isCollectionRef(node) {
    return node.aspects.indexOf(_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_IO_REFERENCE) !== -1;
  }
  isOwner(node) {
    return node.properties[_core_module_rest_rest_constants__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_CREATOR][0] === this.connector.getCurrentLogin().authorityName;
  }
  static #_ = this.ɵfac = function VideoControlsComponent_Factory(t) {
    return new (t || VideoControlsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_bridge_service__WEBPACK_IMPORTED_MODULE_3__.BridgeService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_4__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_4__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_module_rest_services_rest_node_service__WEBPACK_IMPORTED_MODULE_5__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_6__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_19__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_7__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_8__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: VideoControlsComponent,
    selectors: [["es-video-controls"]],
    inputs: {
      node: "node",
      video: "video",
      size: "size"
    },
    outputs: {
      updateCurrentNode: "updateCurrentNode"
    },
    decls: 1,
    vars: 1,
    consts: [["class", "selection", 3, "small", 4, "ngIf"], [1, "selection"], [1, "mat-elevation-z0"], ["matExpansionPanelContent", ""], [1, "selectionSlider"], [3, "value", "highValue", "options", "valueChange", "highValueChange"], [1, "addChapter"], [1, "time"], [1, "startTime"], ["matInput", "", "type", "text", "name", "startTime", "id", "startTime", "pattern", "\\d\\d:\\d\\d(:\\d\\d)?", 3, "ngModel", "ngModelChange"], [1, "endTime"], ["matInput", "", "type", "text", "name", "endTime", "id", "endTime", "pattern", "\\d\\d:\\d\\d(:\\d\\d)?", 3, "ngModel", "ngModelChange"], [1, "title"], ["matInput", "", "type", "text", "name", "chapterName", "id", "chapterName", 3, "ngModel", "ngModelChange"], [1, "save"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
    template: function VideoControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, VideoControlsComponent_div_0_Template, 7, 5, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.sliderOptions && ctx.hasRequiredPermissions);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_21__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgForm, _angular_material_button__WEBPACK_IMPORTED_MODULE_22__.MatButton, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionPanelTitle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_23__.MatExpansionPanelContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_25__.MatInput, ngx_slider_v2__WEBPACK_IMPORTED_MODULE_26__.SliderComponent, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_9__.SpinnerSmallComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslatePipe, _duration_pipe__WEBPACK_IMPORTED_MODULE_2__.DurationPipe],
    styles: ["\n\n[_nghost-%COMP%]   .mat-expansion-panel[_ngcontent-%COMP%]:not(.mat-expanded)     .mat-expansion-panel-content:not(.ng-animating) ngx-slider * {\n  display: none !important;\n}\n\nmat-expansion-panel[_ngcontent-%COMP%] {\n  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);\n}\n\n.time[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%], .time[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.ngx-slider[_ngcontent-%COMP%] {\n  width: 90%;\n}\n\n.selection[_ngcontent-%COMP%] {\n  background: #fff;\n  margin-top: -2px;\n}\n\n.chapterTitle[_ngcontent-%COMP%] {\n  text-align: left;\n  visibility: hidden;\n  transition: 0.2s ease-in-out;\n  z-index: 5000;\n}\n\n.addChapter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 25px 40px 0 40px;\n}\n.addChapter[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%], .addChapter[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .addChapter[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%] {\n  margin: 0 5px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 0;\n}\n.addChapter[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%], .addChapter[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%], .addChapter[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.addChapter[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  min-width: 100px;\n}\n.addChapter[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  top: -9px;\n}\n.addChapter[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {\n  flex-grow: 2;\n}\n.addChapter[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  flex-grow: 4;\n}\n\n.addChapter[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%] {\n  color: #383838;\n  margin-bottom: 0;\n}\n\n.addChapter[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 100%;\n  margin: auto 8px;\n}\n\n.selection.small[_ngcontent-%COMP%]   .ngx-slider[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.selection.small[_ngcontent-%COMP%]   .addChapter[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  flex-direction: column;\n}\n.selection.small[_ngcontent-%COMP%]   .addChapter[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.selection.small[_ngcontent-%COMP%]   .addChapter[_ngcontent-%COMP%]   .startTime[_ngcontent-%COMP%], .selection.small[_ngcontent-%COMP%]   .addChapter[_ngcontent-%COMP%]   .endTime[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9yZW5kZXItcGFnZS92aWRlby1jb250cm9scy92aWRlby1jb250cm9scy5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDQUE7RUFNSSx3QkFBQTtBQVJKOztBQVVBO0VDU0ksd0NBQUE7QURmSjs7QUFXSTs7RUFFSSxlQUFBO0FBUlI7O0FBWUE7RUFDSSxVQUFBO0FBVEo7O0FBWUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0FBVEo7O0FBWUE7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxhQUFBO0FBVEo7O0FBWUE7RUFDSSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSx3QkFBQTtBQVRKO0FBVUk7OztFQUdJLGFBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0FBUlI7QUFTUTs7O0VBQ0ksV0FBQTtBQUxaO0FBUUk7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUFOUjtBQU9RO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0FBTFo7QUFRSTtFQUNJLFlBQUE7QUFOUjtBQVFJO0VBQ0ksWUFBQTtBQU5SOztBQVVBO0VBQ0ksY0RyRE87RUNzRFAsZ0JBQUE7QUFQSjs7QUFVQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQVBKOztBQVdJO0VBQ0ksV0FBQTtBQVJSO0FBVUk7RUFDSSxjQUFBO0VBQ0Esc0JBQUE7QUFSUjtBQVNRO0VBQ0ksV0FBQTtBQVBaO0FBU1E7O0VBRUksYUFBQTtBQVBaIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi8vIG5neC1zbGlkZXIgc2V0cyBgdmlzaWJpbGl0eTogdmlzaWJsZWAgb24gc29tZSBlbGVtZW50cy4gVGhpcyByZWludHJvZHVjZXMgaW50ZXJhY3RpdmUgZWxlbWVudHMgdG9cbi8vIHRoZSB0YWIgb3JkZXIgYWx0aG91Z2ggdGhlIHBhcmVudCBjb250YWluZXIgc2V0cyBgdmlzaWJpbGl0eTogaGlkZGVuYC4gV2UgZml4IHRoaXMgYmUgaGlkaW5nXG4vLyBldmVyeXRoaW5nIGluc2lkZSBuZ3gtc2xpZGVyIGV4cGxpY2l0bHkgYXMgbG9uZyBhcyB0aGUgZXhwYW5zaW9uIHBhbmVsIGlzIGNvbGxhcHNlZC5cbjpob3N0XG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWw6bm90KC5tYXQtZXhwYW5kZWQpXG4gICAgOjpuZy1kZWVwXG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudDpub3QoLm5nLWFuaW1hdGluZylcbiAgICBuZ3gtc2xpZGVyXG4gICAgKiB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxubWF0LWV4cGFuc2lvbi1wYW5lbCB7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3dCb3R0b20oKTtcbn1cblxuLnRpbWUge1xuICAgIC5tYXQtZm9ybS1maWVsZCxcbiAgICBpbnB1dCB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG59XG5cbi5uZ3gtc2xpZGVyIHtcbiAgICB3aWR0aDogOTAlO1xufVxuXG4uc2VsZWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIG1hcmdpbi10b3A6IC0ycHg7XG59XG5cbi5jaGFwdGVyVGl0bGUge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHRyYW5zaXRpb246IDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgei1pbmRleDogNTAwMDtcbn1cblxuLmFkZENoYXB0ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgbWFyZ2luOiAyNXB4IDQwcHggMCA0MHB4O1xuICAgIC50aW1lLFxuICAgIC50aXRsZSxcbiAgICAuc2F2ZSB7XG4gICAgICAgIG1hcmdpbjogMCA1cHg7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgID4gbWF0LWZvcm0tZmllbGQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnNhdmUge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgIG1pbi13aWR0aDogMTAwcHg7XG4gICAgICAgID4gKiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IC05cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnRpbWUge1xuICAgICAgICBmbGV4LWdyb3c6IDI7XG4gICAgfVxuICAgIC50aXRsZSB7XG4gICAgICAgIGZsZXgtZ3JvdzogNDtcbiAgICB9XG59XG5cbi5hZGRDaGFwdGVyIGlucHV0W3R5cGU9J3RleHQnXSB7XG4gICAgY29sb3I6ICR0ZXh0TWFpbjtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4uYWRkQ2hhcHRlciBoMyB7XG4gICAgZm9udC1zaXplOiAxMDAlO1xuICAgIG1hcmdpbjogYXV0byA4cHg7XG59XG5cbi5zZWxlY3Rpb24uc21hbGwge1xuICAgIC5uZ3gtc2xpZGVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5hZGRDaGFwdGVyIHtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5zdGFydFRpbWUsXG4gICAgICAgIC5lbmRUaW1lIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJAbWl4aW4gY2xpY2thYmxlKCkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5AbWl4aW4gbGltaXRMaW5lQ291bnQoJGNvdW50LCAkbGluZUhlaWdodDogMSkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgbWF4LWhlaWdodDogJGNvdW50ICogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6ICRjb3VudDsgLyogbnVtYmVyIG9mIGxpbmVzIHRvIHNob3cgKi9cbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC8qIGF1dG9wcmVmaXhlcjogb2ZmICovXG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3coJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0JvdHRvbSgkb3BhY2l0eTogMC4xKSB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93U21hbGwoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd01lZGl1bUxhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlLCAkb3BhY2l0eTogMC42KSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTY3JvbGxiYXIoKSB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIG1heC13aWR0aDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgLy8gLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB9XG59XG5AbWl4aW4gcmVtb3ZlRGVmYXVsdEZvY3VzKCkge1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgfVxufVxuLy8gQXBwbHkgdGhlIGNvbnRlbnQgc3R5bGVzIGluIGNvbnRyYXN0IG1vZGUuIFRoaXMgaXMganVzdCBlbm91Z2ggY29udHJhc3QgdG8gYmUgV0NBRyBjb21wbGllbnQgLS0tXG4vLyBub3QgYSBoaWdoLWNvbnRyYXN0IG1vZGUuXG4vL1xuLy8gQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyBmb3IgdXNlIGluIGVuY2Fwc3VsYXRlZCBjb21wb25lbnQgc3R5bGVzLCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZSB7XG4vLyAgICAgICAgIC8vIFN0eWxlcyB0byBhcHBseSBpbiBjb250cmFzdCBtb2RlXG4vLyAgICAgfVxuLy8gVG8gdXMgaW4gZ2xvYmFsIGNvbnRleHQsIHBhc3MgJ2dsb2JhbCcgYXMgZmlyc3QgYXJndW1lbnQsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlKGdsb2JhbCkgeyAvKiAuLi4gKi8gfVxuQG1peGluIGNvbnRyYXN0TW9kZSgkc2NvcGU6IGVuY2Fwc3VsYXRlZCkge1xuICAgICRjb250cmFzdE1vZGVTZWxlY3RvcjogJ2JvZHkuZXMtY29udHJhc3QtbW9kZSc7XG4gICAgQGlmICRzY29wZSA9PSBlbmNhcHN1bGF0ZWQge1xuICAgICAgICA6aG9zdC1jb250ZXh0KCN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSkgJiB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHNjb3BlID09IGdsb2JhbCB7XG4gICAgICAgICN7aWYoJiwgJyN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSAmJywgJGNvbnRyYXN0TW9kZVNlbGVjdG9yKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIFwiSW52YWxpZCBzY29wZSAjeyRzY29wZX0uXCI7XG4gICAgfVxufVxuQG1peGluIGJsdXJJbWFnZSgkYmx1clN0cmVuZ3RoOiAyNXB4KSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB0b3A6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB3aWR0aDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIHotaW5kZXg6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmaWx0ZXI6IGJsdXIoJGJsdXJTdHJlbmd0aCk7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb3BhY2l0eTogMC43O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_28__.trigger)('fromRight', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_14__.UIAnimation.fromRight())]
    }
  });
}

/***/ }),

/***/ 30241:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/_esm2015/internal/operators/skipWhile.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   skipWhile: () => (/* binding */ skipWhile)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscriber */ 55142);

function skipWhile(predicate) {
  return source => source.lift(new SkipWhileOperator(predicate));
}
class SkipWhileOperator {
  constructor(predicate) {
    this.predicate = predicate;
  }
  call(subscriber, source) {
    return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
  }
}
class SkipWhileSubscriber extends _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber {
  constructor(destination, predicate) {
    super(destination);
    this.predicate = predicate;
    this.skipping = true;
    this.index = 0;
  }
  _next(value) {
    const destination = this.destination;
    if (this.skipping) {
      this.tryCallPredicate(value);
    }
    if (!this.skipping) {
      destination.next(value);
    }
  }
  tryCallPredicate(value) {
    try {
      const result = this.predicate(value, this.index++);
      this.skipping = Boolean(result);
    } catch (err) {
      this.destination.error(err);
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_render-page_render-page_module_ts.js.map