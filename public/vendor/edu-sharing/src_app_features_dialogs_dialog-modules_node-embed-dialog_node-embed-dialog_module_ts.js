"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_features_dialogs_dialog-modules_node-embed-dialog_node-embed-dialog_module_ts"],{

/***/ 18638:
/*!**************************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-embed-dialog/node-embed-dialog.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeEmbedDialogComponent: () => (/* binding */ NodeEmbedDialogComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 1062);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 46939);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core-module/core.module */ 71083);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/toast */ 93366);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../card-dialog/card-dialog-ref */ 91486);
/* harmony import */ var _dialogs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dialogs.service */ 29900);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/components/info-message/info-message.component */ 17162);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/cdk/text-field */ 5802);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/radio */ 92106);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/pipes/safe-html.pipe */ 69942);

























const _c0 = ["textarea"];
function NodeEmbedDialogComponent_es_info_message_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "es-info-message", 15)(1, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "div")(5, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NodeEmbedDialogComponent_es_info_message_5_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r3.openInviteDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 2, "EMBED.NOT_PUBLIC_WARNING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 4, "OPTIONS.INVITE"), " ");
  }
}
function NodeEmbedDialogComponent_mat_radio_group_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-radio-group", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-radio-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-radio-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 3, "EMBED.VERSION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 5, "EMBED.VERSION_OPTION.FIXED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](7, 7, "EMBED.VERSION_OPTION.NEWEST"));
  }
}
/**
 * Dialog to generate an embed snippet for a node.
 */
class NodeEmbedDialogComponent {
  constructor(data, dialogRef, dialogs, changeDetectorRef, location, mainNav, ngZone, router, toast) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialogs = dialogs;
    this.changeDetectorRef = changeDetectorRef;
    this.location = location;
    this.mainNav = mainNav;
    this.ngZone = ngZone;
    this.router = router;
    this.toast = toast;
    this.buttons = [new _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.DialogButton('OPTIONS.COPY', {
      color: 'primary'
    }, () => this.copy())];
    this.sizeConstraints = {
      width: {
        min: 300,
        max: 1200
      },
      height: {
        min: 200,
        max: 1200
      }
    };
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormGroup({
      width: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(400, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.min(this.sizeConstraints.width.min), _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.max(this.sizeConstraints.width.max)]),
      height: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl(300, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.min(this.sizeConstraints.height.min), _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.max(this.sizeConstraints.height.max)]),
      version: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.UntypedFormControl('fixed')
    });
    this.embedCode = '';
    this.showNotPublicWarning = false;
    this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__.Subject();
  }
  ngOnInit() {
    this.dialogRef.patchConfig({
      buttons: this.buttons
    });
    this.registerFormChanges();
    this.registerNotPublicWarning();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  openInviteDialog() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openShareDialog({
        nodes: [_this.data.node]
      });
      dialogRef.afterClosed().subscribe(() => {
        // TODO: Update `isPublic` if necessary.
      });
    })();
  }
  registerFormChanges() {
    this.form.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.startWith)(this.form.value)).subscribe(values => {
      if (this.form.valid) {
        this.embedCode = this.getEmbedCode(values);
        // Run a second change detection for `cdkTextareaAutosize` on the embed-code
        // textarea.
        this.ngZone.runOutsideAngular(() => setTimeout(() => this.changeDetectorRef.detectChanges()));
      }
      this.buttons[0].disabled = !this.form.valid;
    });
    // The dialog is closable by backdrop click until any value has been changed.
    this.form.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.take)(1)).subscribe(() => {
      this.dialogRef.patchConfig({
        closable: _card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__.Closable.Standard
      });
    });
  }
  registerNotPublicWarning() {
    // TODO
    //
    // observeIsPublic(node)
    //     .pipe(takeUntil(this.destroyed$))
    //     .subscribe((isPublic) => (this.showNotPublicWarning = !isPublic));
  }
  copy() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_3__.UIHelper.copyElementToClipboard(_this2.textareaRef.nativeElement);
      _this2.toast.show({
        message: 'EMBED.COPIED_TO_CLIPBOARD_NOTICE',
        type: 'info',
        subtype: _services_toast__WEBPACK_IMPORTED_MODULE_2__.ToastType.InfoSimple
      });
    })();
  }
  getEmbedCode(values) {
    const node = this.data.node;
    // We use `createElement` to have attributes sanitized. Note that occurrences of `&` in the
    // attribute `src` are rightfully escaped to `&amp;`.
    const iFrame = document.createElement('iframe');
    iFrame.src = this.getEmbedLink(node, values.version);
    iFrame.title = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.getTitle(node);
    iFrame.width = values.width;
    iFrame.height = values.height;
    iFrame.frameBorder = '0';
    iFrame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    return iFrame.outerHTML;
  }
  getEmbedLink(node, version) {
    // Note that this does not work when the application itself is used in an embedded context
    // since this method relies on the current page's URL to match the origin and base HREF of
    // the backend.
    const routerLink = 'eduservlet/render';
    const queryParams = {
      node_id: node.ref.id,
      version: version === 'fixed' && !this.isCollectionReference() ? node.content.version : null
      // Currently, `RenderingServlet` only supports local nodes. Uncomment, when other
      // repositories become supported.
      //
      // repository: node.ref.isHomeRepo ? null : node.ref.repo,
    };

    const urlTree = this.router.createUrlTree([routerLink], {
      queryParams
    });
    return location.origin + this.location.prepareExternalUrl(urlTree.toString());
  }
  isCollectionReference() {
    return this.data.node.aspects.includes(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_ASPECT_IO_REFERENCE);
  }
  static #_ = this.ɵfac = function NodeEmbedDialogComponent_Factory(t) {
    return new (t || NodeEmbedDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_4__.CARD_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_card_dialog_card_dialog_ref__WEBPACK_IMPORTED_MODULE_5__.CardDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_dialogs_service__WEBPACK_IMPORTED_MODULE_6__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_15__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_7__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_2__.Toast));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: NodeEmbedDialogComponent,
    selectors: [["es-node-embed-dialog"]],
    viewQuery: function NodeEmbedDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.textareaRef = _t.first);
      }
    },
    decls: 31,
    vars: 30,
    consts: [[1, "content-container"], [1, "preview-container"], [1, "preview", 3, "innerHTML"], [1, "preferences-container"], ["mode", "warning", 4, "ngIf"], [1, "not-public-warning-container"], ["appearance", "fill", 1, "embed-code-field"], ["matInput", "", "cdkTextareaAutosize", "", "cdkAutosizeMinRows", "2", "cdkAutosizeMaxRows", "10", 3, "readonly", "disabled", "focus"], ["textarea", ""], [1, "preferences-form", 3, "formGroup"], ["class", "version-radio-group", "formControlName", "version", 4, "ngIf"], [1, "size-fields-container"], [1, "size-field"], ["matInput", "", "type", "number", "formControlName", "width", 3, "min", "max"], ["matInput", "", "type", "number", "formControlName", "height", 3, "min", "max"], ["mode", "warning"], [1, "not-public-warning-message"], ["mat-button", "", 3, "click"], ["esIcon", "arrow_forward"], ["formControlName", "version", 1, "version-radio-group"], ["value", "fixed"], ["value", "newest"]],
    template: function NodeEmbedDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "safeHtml");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, NodeEmbedDialogComponent_es_info_message_5_Template, 9, 6, "es-info-message", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "mat-form-field", 6)(8, "textarea", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("focus", function NodeEmbedDialogComponent_Template_textarea_focus_8_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](9);
          return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](_r1.select());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, NodeEmbedDialogComponent_mat_radio_group_13_Template, 8, 9, "mat-radio-group", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "div", 11)(15, "mat-form-field", 12)(16, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](18, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "mat-form-field", 12)(24, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](26, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](27, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](30, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](3, 16, ctx.embedCode), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.showNotPublicWarning);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("readonly", true)("disabled", !ctx.form.valid);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](10, 18, "EMBED.CODE_LABEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx.embedCode);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.isCollectionReference());
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](18, 20, "EMBED.WIDTH"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("min", ctx.sizeConstraints.width.min)("max", ctx.sizeConstraints.width.max);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](22, 22, "EMBED.SIZE_CONSTRAINTS_ERROR_NOTICE", ctx.sizeConstraints.width), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](26, 25, "EMBED.HEIGHT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("min", ctx.sizeConstraints.height.min)("max", ctx.sizeConstraints.height.max);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](30, 27, "EMBED.SIZE_CONSTRAINTS_ERROR_NOTICE", ctx.sizeConstraints.height), " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_17__.IconDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.MaxValidator, _shared_components_info_message_info_message_component__WEBPACK_IMPORTED_MODULE_8__.InfoMessageComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInput, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_21__.CdkTextareaAutosize, _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__.MatRadioButton, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, _shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_9__.SafeHtmlPipe],
    styles: ["\n\n@media (min-width: 700px) {\n  [_nghost-%COMP%] {\n    width: 1200px;\n    max-width: 100%;\n    height: 500px;\n  }\n  [_nghost-%COMP%]   .content-container[_ngcontent-%COMP%] {\n    display: flex;\n    height: 100%;\n  }\n}\n\n.preview-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: grid;\n  overflow: auto;\n  box-shadow: inset 0px 1px 10px rgba(0, 0, 0, 0.48);\n  background-color: whitesmoke;\n  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.2) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0.2)), linear-gradient(45deg, rgba(0, 0, 0, 0.2) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0.2));\n  background-size: 50px 50px;\n  background-position: 0 0, 25px 25px;\n}\n\n.preview[_ngcontent-%COMP%] {\n  margin: auto;\n  line-height: 0;\n  background: white;\n  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.48);\n}\n\n.preferences-container[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  flex-basis: 350px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n\n.not-public-warning-message[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.preferences-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 0 15px;\n}\n\n.size-fields-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n\n.size-field[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.size-field[_ngcontent-%COMP%]     .mat-form-field-infix {\n  width: unset;\n}\n\n.version-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 1.4375em;\n}\n.version-radio-group[_ngcontent-%COMP%]    > mat-radio-button[_ngcontent-%COMP%] {\n  height: 2.75em;\n}\n\n.embed-code-field[_ngcontent-%COMP%] {\n  font-family: monospace;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9mZWF0dXJlcy9kaWFsb2dzL2RpYWxvZy1tb2R1bGVzL25vZGUtZW1iZWQtZGlhbG9nL25vZGUtZW1iZWQtZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDRkk7RUFESjtJQUVRLGFBQUE7SUFDQSxlQUFBO0lBQ0EsYUFBQTtFQUFOO0VBQ007SUFDSSxhQUFBO0lBQ0EsWUFBQTtFQUNWO0FBQ0Y7O0FBR0E7RUFDSSxZQUFBO0VBR0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxrREFBQTtFQUlBLDRCQUFBO0VBQ0EsNFFBQUE7RUFnQkEsMEJBQUE7RUFDQSxtQ0FBQTtBQXBCSjs7QUF1QkE7RUFDSSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsNENBQUE7QUFwQko7O0FBdUJBO0VBQ0ksY0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBRUEsY0FBQTtBQXJCSjs7QUF3QkE7RUFDSSxhQUFBO0FBckJKOztBQXdCQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7QUFyQko7O0FBd0JBO0VBQ0ksYUFBQTtFQUNBLFNBQUE7QUFyQko7O0FBd0JBO0VBQ0ksWUFBQTtBQXJCSjtBQXNCSTtFQUNJLFlBQUE7QUFwQlI7O0FBd0JBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0Esd0JBQUE7QUFyQko7QUFzQkk7RUFDSSxjQUFBO0FBcEJSOztBQXdCQTtFQUNJLHNCQUFBO0FBckJKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjpob3N0IHtcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJG1vYmlsZVdpZHRoKSB7XG4gICAgICAgIHdpZHRoOiAxMjAwcHg7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA1MDBweDtcbiAgICAgICAgLmNvbnRlbnQtY29udGFpbmVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5wcmV2aWV3LWNvbnRhaW5lciB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIC8vIENlbnRlciB1c2luZyBncmlkIGFuZCBgbWFyZ2luOiBhdXRvYCB0byBhdm9pZCBjcm9wcGVkIGNvbnRlbnQgb24gb3ZlcmZsb3cuIFNlZVxuICAgIC8vIGh0dHBzOi8vYmhjaC5naXRodWIuaW8vcG9zdHMvMjAyMS8wNC9jZW50cmluZy1mbGV4LWl0ZW1zLWFuZC1hbGxvd2luZy1vdmVyZmxvdy1zY3JvbGwvLlxuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDFweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC40OCk7XG4gICAgLy8gRnJvbSBodHRwczovL2ZyZWViaWVzdXBwbHkuY29tL2Jsb2cvY3NzLWJhY2tncm91bmQtcGF0dGVybnMvXG4gICAgJGRlZXBDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICRjdWJlU2l6ZTogMjVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgICAgIDQ1ZGVnLFxuICAgICAgICAgICAgJGRlZXBDb2xvciAyNSUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudCAyNSUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudCA3NSUsXG4gICAgICAgICAgICAkZGVlcENvbG9yIDc1JSxcbiAgICAgICAgICAgICRkZWVwQ29sb3JcbiAgICAgICAgKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgICAgNDVkZWcsXG4gICAgICAgICAgICAkZGVlcENvbG9yIDI1JSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50IDI1JSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50IDc1JSxcbiAgICAgICAgICAgICRkZWVwQ29sb3IgNzUlLFxuICAgICAgICAgICAgJGRlZXBDb2xvclxuICAgICAgICApO1xuICAgIGJhY2tncm91bmQtc2l6ZTogKCRjdWJlU2l6ZSAqIDIpICgkY3ViZVNpemUgKiAyKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsICRjdWJlU2l6ZSAkY3ViZVNpemU7XG59XG5cbi5wcmV2aWV3IHtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC40OCk7XG59XG5cbi5wcmVmZXJlbmNlcy1jb250YWluZXIge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZsZXgtYmFzaXM6IDM1MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAvLyB3aWR0aDogMzUwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi5ub3QtcHVibGljLXdhcm5pbmctbWVzc2FnZSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbn1cblxuLnByZWZlcmVuY2VzLWZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG59XG5cbi5zaXplLWZpZWxkcy1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMHB4O1xufVxuXG4uc2l6ZS1maWVsZCB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgICYgOjpuZy1kZWVwIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgICAgIHdpZHRoOiB1bnNldDtcbiAgICB9XG59XG5cbi52ZXJzaW9uLXJhZGlvLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZy1ib3R0b206IDEuNDM3NWVtOyAvLyBTYW1lIGFzIG1hdCBmb3JtIGZpZWxkXG4gICAgPiBtYXQtcmFkaW8tYnV0dG9uIHtcbiAgICAgICAgaGVpZ2h0OiAyLjc1ZW07XG4gICAgfVxufVxuXG4uZW1iZWQtY29kZS1maWVsZCB7XG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 54578:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/dialogs/dialog-modules/node-embed-dialog/node-embed-dialog.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeEmbedDialogComponent: () => (/* reexport safe */ _node_embed_dialog_component__WEBPACK_IMPORTED_MODULE_1__.NodeEmbedDialogComponent),
/* harmony export */   NodeEmbedDialogModule: () => (/* binding */ NodeEmbedDialogModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/shared.module */ 56208);
/* harmony import */ var _node_embed_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node-embed-dialog.component */ 18638);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class NodeEmbedDialogModule {
  static #_ = this.ɵfac = function NodeEmbedDialogModule_Factory(t) {
    return new (t || NodeEmbedDialogModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: NodeEmbedDialogModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NodeEmbedDialogModule, {
    declarations: [_node_embed_dialog_component__WEBPACK_IMPORTED_MODULE_1__.NodeEmbedDialogComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_features_dialogs_dialog-modules_node-embed-dialog_node-embed-dialog_module_ts.js.map