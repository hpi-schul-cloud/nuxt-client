"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_app-share-page_app-share-page_module_ts"],{

/***/ 46983:
/*!***********************************************************************!*\
  !*** ./src/app/pages/app-share-page/app-share-page-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSharePageRoutingModule: () => (/* binding */ AppSharePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _app_share_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-share-page.component */ 1679);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _app_share_page_component__WEBPACK_IMPORTED_MODULE_0__.AppSharePageComponent
}];
class AppSharePageRoutingModule {
  static #_ = this.ɵfac = function AppSharePageRoutingModule_Factory(t) {
    return new (t || AppSharePageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: AppSharePageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppSharePageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 1679:
/*!******************************************************************!*\
  !*** ./src/app/pages/app-share-page/app-share-page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSharePageComponent: () => (/* binding */ AppSharePageComponent)
/* harmony export */ });
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _services_cordova_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/cordova.service */ 84003);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 90895);
















function AppSharePageComponent_es_global_progress_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-global-progress");
  }
}
function AppSharePageComponent_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.description);
  }
}
function AppSharePageComponent_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 18)(1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "home");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r3.inbox.name);
  }
}
function AppSharePageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 2)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 5)(4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, AppSharePageComponent_div_1_div_9_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, AppSharePageComponent_div_1_div_13_Template, 7, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 11)(15, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AppSharePageComponent_div_1_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.saveFile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 14)(21, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "es-node-entries-wrapper", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("clickItem", function AppSharePageComponent_div_1_Template_es_node_entries_wrapper_clickItem_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.saveToCollection($event.element));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r1.previewUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 12, "MEDIATYPE." + ctx_r1.getType()));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.title ? ctx_r1.title : ctx_r1.uri);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 14, "SHARE_APP.WILL_BE_SAVED_AT"), ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.inbox);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](19, 16, "SAVE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 18, "SHARE_APP.ADD_TO_COLLECTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dataSource", ctx_r1.collections)("columns", ctx_r1.columns)("displayType", ctx_r1.NodeEntriesDisplayType.SmallGrid)("elementInteractionType", ctx_r1.InteractionType.Emitter);
  }
}
class AppSharePageComponent {
  constructor(toast, route, router, sanitizer, node, connectors, events, utilities, translate, translations, collectionApi, cordova, connector) {
    this.toast = toast;
    this.route = route;
    this.router = router;
    this.sanitizer = sanitizer;
    this.node = node;
    this.connectors = connectors;
    this.events = events;
    this.utilities = utilities;
    this.translate = translate;
    this.translations = translations;
    this.collectionApi = collectionApi;
    this.cordova = cordova;
    this.connector = connector;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.InteractionType;
    this.globalProgress = true;
    this.type = 'LINK';
    this.columns = [];
    this.collections = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.NodeDataSource();
    // when the user finished sharing and navigates back he must return to the origin app
    this.cordova.setOnBackBehaviour(_services_cordova_service__WEBPACK_IMPORTED_MODULE_3__.OnBackBehaviour.closeApp);
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.ListItem('COLLECTION', 'title'));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.ListItem('COLLECTION', 'info'));
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.ListItem('COLLECTION', 'scope'));
    if (this.cordova.isRunningCordova()) {
      this.cordova.subscribeServiceReady().subscribe(() => {
        this.init();
      });
    } else {
      this.init();
    }
  }
  getType() {
    if (this.isLink()) return 'link';
    if (this.isTextSnippet()) return 'file-txt';
    if (this.mimetype === 'application/pdf') {
      return 'file-pdf';
    }
    if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(this.mimetype)) {
      return 'file-word';
    }
    if (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(this.mimetype)) {
      return 'file-excel';
    }
    if (['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'].includes(this.mimetype)) {
      return 'file-powerpoint';
    }
    if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(this.mimetype)) {
      return 'file-word';
    }
    if (this.mimetype) {
      let type = this.mimetype.split('/')[0];
      if (this.translate.instant('MEDIATYPE.file-' + type) === 'MEDIATYPE.file-' + type) {
        type = null;
      }
      if (type != null) {
        return 'file-' + type;
      }
    }
    return 'file';
  }
  saveInternal(callback) {
    this.globalProgress = true;
    if (this.isLink()) {
      let prop = {};
      prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_IO_WWWURL] = [this.getUri()];
      this.node.createNode(this.inbox?.ref?.id || _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.INBOX, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_TYPE_IO, [], prop, true, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_MAIN_FILE_UPLOAD).subscribe(data => {
        callback(data.node);
      });
    } else {
      let prop = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.createNameProperty(this.title);
      if (this.editorType) {
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_EDITOR_TYPE] = [this.editorType];
      }
      if (this.text && !this.isTextSnippet()) {
        prop[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_DESCRIPTION] = [this.text];
      }
      this.node.createNode(this.inbox.ref.id, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_TYPE_IO, [], prop, true).subscribe(data => {
        this.node.uploadNodeContent(data.node.ref.id, this.file, _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_MAIN_FILE_UPLOAD, this.mimetype).subscribe(() => {
          callback(data.node);
        }, error => {
          this.toast.error(error);
          this.globalProgress = false;
        });
      }, error => {
        this.toast.error(error);
        this.globalProgress = false;
      });
    }
  }
  saveFile() {
    this.saveInternal(node => {
      this.goToInbox();
      this.events.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_SHARED, node);
    });
  }
  saveToCollection(collection) {
    this.saveInternal(node => {
      this.collectionApi.addNodeToCollection(collection.ref.id, node.ref.id, node.ref.repo).subscribe(() => {
        _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_0__.UIHelper.goToCollection(this.router, collection, null, {
          replaceUrl: true
        });
        this.events.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_SHARED, node);
      });
    });
  }
  isLink() {
    if (this.cordovaType == 'public.url')
      // ios
      return true;
    if (this.hasData()) return false;
    if (!this.uri) return false;
    if (this.uri.startsWith('content://') || this.uri.startsWith('file://')) return false;
    let pos = this.uri.indexOf('://');
    return pos > 0 && pos < 10;
  }
  isTextSnippet() {
    if (this.cordovaType == 'public.text')
      // ios
      return true;
    if (this.hasData()) return false;
    if (this.isLink()) return false;
    if (!this.uri) return false;
    return !this.uri.startsWith('content://') && !this.uri.startsWith('file://');
  }
  goToInbox() {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_0__.UIHelper.goToWorkspaceFolder(this.node, this.router, null, this.inbox.ref.id, {
      replaceUrl: true
    });
  }
  hasWritePermissions(node) {
    if (node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE) == -1) {
      return {
        status: false,
        message: 'NO_WRITE_PERMISSIONS'
      };
    }
    return {
      status: true
    };
  }
  init() {
    this.translations.waitForInit().subscribe(() => {
      this.route.queryParams.subscribe(params => {
        this.uri = params['uri'];
        this.mimetype = params['mimetype'];
        if (this.mimetype == 'public.image') {
          // ios
          this.mimetype = 'image/jpeg';
        } else if (!this.mimetype.includes('/')) {
          // ios sends invalid mimetypes from certain apps
          console.info('invalid mimetype from ios', this.mimetype);
          this.mimetype = 'application/octet-stream';
        }
        this.cordovaType = params['mimetype'];
        this.fileName = params['file'];
        this.text = params['text']; // ios only: custom description
        this.description = null;
        this.collections.reset();
        this.collections.isLoading = true;
        this.collectionApi.search('', {
          sortBy: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_MODIFIED_DATE],
          offset: 0,
          count: 50,
          sortAscending: false
        }).subscribe(data => {
          this.collections.setData(data.collections, data.pagination);
          this.collections.isLoading = false;
        }, error => {
          this.toast.error(error);
          this.collections.isLoading = false;
        });
        this.node.getNodeParents(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.INBOX, false).subscribe(data => {
          this.inboxPath = data.nodes;
          this.inbox = data.nodes[0];
        });
        this.previewUrl = this.connector.getThemeMimePreview(this.getType() + '.svg');
        console.log('type', this.mimetype, this.getType());
        if (this.isLink()) {
          this.utilities.getWebsiteInformation(this.getUri()).subscribe(data => {
            if (data.title) {
              this.title = data.title + ' - ' + data.page;
            } else {
              this.title = this.getUri();
            }
            this.description = data.description;
            this.globalProgress = false;
          }, error => {
            this.title = this.getUri();
            this.globalProgress = false;
          });
        } else if (this.isTextSnippet()) {
          this.globalProgress = false;
          this.connectors.list().subscribe(list => {
            this.prepareTextSnippet(list.connectors);
          }, error => {
            this.prepareTextSnippet(null);
          });
        } else {
          if (this.cordova.isRunningCordova() && this.cordova.getLastIntent() && this.cordova.getLastIntent().stream) {
            let base64 = this.cordova.getLastIntent().stream;
            if (this.mimetype.startsWith('image/')) {
              this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.mimetype + ';base64,' + base64);
            }
            this.file = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.base64toBlob(base64, this.mimetype);
            this.cordova.getFileAsBlob(this.getUri(), this.mimetype).subscribe(data => {
              this.globalProgress = false;
              this.updateTitle();
            }, error => {
              console.warn(error);
              this.globalProgress = false;
              this.updateTitle();
            });
          } else {
            this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.UIConstants.ROUTER_PREFIX, 'messages', 'SHARING_ERROR']);
          }
          /*
          this.cordova.getFileAsBlob(this.getUri(),this.mimetype).subscribe((data:any)=>{
              let split=this.fileName ? this.fileName.split("/") : this.getUri().split("/");
              this.title=split[split.length-1];
              this.file=data;
              if(this.mimetype.startsWith("image/"))
                  this.previewUrl=this.sanitizer.bypassSecurityTrustUrl(data.localURL);
              let request = new XMLHttpRequest();
              let result=request.open('GET', data.localURL, true);
              request.responseType = 'blob';
              request.onload = ()=> {
                  if(request.response.size<=0){
                      this.router.navigate([UIConstants.ROUTER_PREFIX,'messages','CONTENT_NOT_READABLE']);
                  }
                  this.file=request.response;
                  (this.file as any).name=this.title;
              };
              request.onerror=(e)=>{
                  this.router.navigate([UIConstants.ROUTER_PREFIX,'messages','CONTENT_NOT_READABLE']);
              }
              request.send();
          },(error:any)=>{
              this.router.navigate([UIConstants.ROUTER_PREFIX,'messages','CONTENT_NOT_READABLE']);
          });*/
        }
      });
    });
  }

  updateTitle() {
    let split = this.fileName ? this.fileName.split('/') : this.uri.split('/');
    this.title = decodeURIComponent(split[split.length - 1]);
  }
  hasData() {
    return this.cordova.isRunningCordova() && this.cordova.getLastIntent() && this.cordova.getLastIntent().stream != null;
  }
  prepareTextSnippet(connectors) {
    this.mimetype = 'text/plain';
    let filetype = 'txt';
    if (connectors && connectors.length) {
      let i = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.indexOfObjectArray(connectors, 'id', 'TINYMCE');
      if (i != -1) {
        let connector = connectors[i];
        this.mimetype = connector.filetypes[0].mimetype;
        filetype = connector.filetypes[0].filetype;
        this.editorType = connector.filetypes[0].editorType;
      }
    }
    this.title = this.translate.instant('SHARE_APP.TEXT_SNIPPET') + ' ' + ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.DateHelper.getDateForNewFile() + '.' + filetype;
    let content = this.getTextContent();
    if (this.mimetype == 'text/html') {
      content = content.replace(/\n/g, '<br />');
    }
    this.file = new Blob([content], {
      type: this.mimetype
    });
  }
  getTextContent() {
    return this.cordova.isAndroid() ? this.uri : this.text;
  }
  getUri() {
    return this.cordova.isAndroid() ? this.uri : this.cordova.getLastIntent().base64;
  }
  static #_ = this.ɵfac = function AppSharePageComponent_Factory(t) {
    return new (t || AppSharePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_4__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestUtilitiesService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestCollectionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_cordova_service__WEBPACK_IMPORTED_MODULE_3__.CordovaService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: AppSharePageComponent,
    selectors: [["es-app-share-page"]],
    decls: 2,
    vars: 2,
    consts: [[4, "ngIf"], ["class", "content", 4, "ngIf"], [1, "content"], [1, "preview"], [3, "src"], [1, "info"], [1, "type"], [1, "label"], ["class", "description", 4, "ngIf"], [1, "location"], ["class", "breadcrumbs", 4, "ngIf"], [1, "save"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["esIcon", "folder"], [1, "collections"], [1, "addToCollection"], [3, "dataSource", "columns", "displayType", "elementInteractionType", "clickItem"], [1, "description"], [1, "breadcrumbs"], [1, "material-icons"]],
    template: function AppSharePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, AppSharePageComponent_es_global_progress_0_Template, 1, 0, "es-global-progress", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AppSharePageComponent_div_1_Template, 25, 20, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.globalProgress);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.globalProgress);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_7__.NodeEntriesWrapperComponent, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_5__.GlobalProgressComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
    styles: ["\n\n.content[_ngcontent-%COMP%] {\n  padding: 20px 30px;\n  width: 100%;\n  max-width: calc(var(--cardWidth) * 4 + 125px);\n  margin: auto;\n  margin-top: var(--mainnavHeight);\n  display: flex;\n  flex-direction: column;\n}\n.content[_ngcontent-%COMP%]   .breadcrumbs[_ngcontent-%COMP%] {\n  color: var(--primary);\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  margin-left: 5px;\n}\n.content[_ngcontent-%COMP%]   .breadcrumbs[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin: 0 2px;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%] {\n  display: flex;\n  padding-bottom: 10px;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  min-width: 90px;\n  min-height: 90px;\n  object-fit: cover;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-left: 20px;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 80%;\n  color: var(--textLight);\n  padding-bottom: 15px;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.5em;\n  max-height: 1.5em;\n  -webkit-line-clamp: 1; \n\n  -webkit-box-orient: vertical;\n  \n\n  word-break: break-all;\n  margin-bottom: 10px;\n}\n.content[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  font-size: 90%;\n  color: var(--textLight);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  line-height: 1.5em;\n  max-height: 3em;\n  -webkit-line-clamp: 2; \n\n  -webkit-box-orient: vertical;\n  \n\n}\n.content[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 90%;\n  color: var(--textLight);\n}\n.content[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]   es-breadcrumbs[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n.content[_ngcontent-%COMP%]   .save[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.content[_ngcontent-%COMP%]   .collections[_ngcontent-%COMP%] {\n  margin-top: 40px;\n  margin-bottom: 10px;\n}\n.content[_ngcontent-%COMP%]   .collections[_ngcontent-%COMP%]   .addToCollection[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n\n@media all and (max-width: calc(var(--cardWidth) * 3)) {\n  [_nghost-%COMP%]     .cardSmallList {\n    width: calc(100% - 10px) !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy9hcHAtc2hhcmUtcGFnZS9hcHAtc2hhcmUtcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsNkNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFBSjtBQUNJO0VBQ0kscUJDWEU7RURZRixhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDUjtBQUFRO0VBQ0ksYUFBQTtBQUVaO0FBQ0k7RUFDSSxhQUFBO0VBQ0Esb0JBQUE7QUFDUjtBQUFRO0VBRUksV0FEVTtFQUVWLFlBRlU7RUFHVixlQUhVO0VBSVYsZ0JBSlU7RUFLVixpQkFBQTtBQUNaO0FBQ1E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQUNaO0FBQVk7RUFDSSxpQkFBQTtFQUNBLGNBQUE7RUFDQSx1QkR0Qko7RUN1Qkksb0JBQUE7QUFFaEI7QUFBWTtFRWhDUixnQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJGNEJvQyxFRTVCUiw0QkFBQTtFQUM1Qiw0QkFBQTtFQUNBLHNCQUFBO0VGMkJZLHFCQUFBO0VBQ0EsbUJBQUE7QUFTaEI7QUFQWTtFQUNJLGNBQUE7RUFDQSx1QkRoQ0o7RUdQUixnQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxxQkZtQ29DLEVFbkNSLDRCQUFBO0VBQzVCLDRCQUFBO0VBQ0Esc0JBQUE7QUZpREo7QUFaSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSx1QkR6Q0k7QUN1RFo7QUFiUTtFQUNJLGVBQUE7QUFlWjtBQVpJO0VBQ0ksYUFBQTtFQUNBLHlCQUFBO0FBY1I7QUFaSTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUFjUjtBQWJRO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBQWVaOztBQVhBO0VBQ0k7SUFDSSxtQ0FBQTtFQWNOO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLmNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IGNhbGModmFyKC0tY2FyZFdpZHRoKSAqIDQgKyAxMjVweCk7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IHZhcigtLW1haW5uYXZIZWlnaHQpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAuYnJlYWRjcnVtYnMge1xuICAgICAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgICAgPiAqIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCAycHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnByZXZpZXcge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICAgICAgaW1nIHtcbiAgICAgICAgICAgICRpbWdTaXplOiA5MHB4O1xuICAgICAgICAgICAgd2lkdGg6ICRpbWdTaXplO1xuICAgICAgICAgICAgaGVpZ2h0OiAkaW1nU2l6ZTtcbiAgICAgICAgICAgIG1pbi13aWR0aDogJGltZ1NpemU7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAkaW1nU2l6ZTtcbiAgICAgICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgICB9XG4gICAgICAgIC5pbmZvIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgICAgICAgICAgLnR5cGUge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogODAlO1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmxhYmVsIHtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBsaW1pdExpbmVDb3VudCgxLCAxLjUpO1xuICAgICAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDkwJTtcbiAgICAgICAgICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBsaW1pdExpbmVDb3VudCgyLCAxLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5sb2NhdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogOTAlO1xuICAgICAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICAgICAgZXMtYnJlYWRjcnVtYnMge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5zYXZlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICB9XG4gICAgLmNvbGxlY3Rpb25zIHtcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgLmFkZFRvQ29sbGVjdGlvbiB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgIH1cbiAgICB9XG59XG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiAoY2FsYyh2YXIoLS1jYXJkV2lkdGgpICogMykpKSB7XG4gICAgOmhvc3QgOjpuZy1kZWVwIC5jYXJkU21hbGxMaXN0IHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDEwcHgpICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuIiwiJHByaW1hcnk6IHZhcigtLXByaW1hcnkpO1xuJHByaW1hcnlNZWRpdW1MaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTIwMCk7XG4kcHJpbWFyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMTAwKTtcbiRwcmltYXJ5Q29tcGxlbWVudGFyeTogdmFyKC0tYWNjZW50KTtcbiRwcmltYXJ5RGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTkwMCk7XG4kdGV4dE9uUHJpbWFyeTogdmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KTtcbiR0ZXh0T25QcmltYXJ5TGlnaHQ6IHJnYmEodmFyKC0tbGlnaHQtcHJpbWFyeS10ZXh0KSwgMC43NSk7XG4kdGV4dFByaW1hcnk6IHZhcigtLXBhbGV0dGUtZm9yZWdyb3VuZC10ZXh0KTtcbiR3b3Jrc3BhY2VUb3BCYXJCYWNrZ3JvdW5kOiAjMzgzODM4O1xuJHdvcmtzcGFjZVRvcEJhckZvbnRDb2xvcjogI2ZmZjtcbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: []
    }
  });
}

/***/ }),

/***/ 25906:
/*!***************************************************************!*\
  !*** ./src/app/pages/app-share-page/app-share-page.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSharePageModule: () => (/* binding */ AppSharePageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _app_share_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-share-page-routing.module */ 46983);
/* harmony import */ var _app_share_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-share-page.component */ 1679);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class AppSharePageModule {
  static #_ = this.ɵfac = function AppSharePageModule_Factory(t) {
    return new (t || AppSharePageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AppSharePageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _app_share_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppSharePageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppSharePageModule, {
    declarations: [_app_share_page_component__WEBPACK_IMPORTED_MODULE_2__.AppSharePageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _app_share_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppSharePageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_app-share-page_app-share-page_module_ts.js.map