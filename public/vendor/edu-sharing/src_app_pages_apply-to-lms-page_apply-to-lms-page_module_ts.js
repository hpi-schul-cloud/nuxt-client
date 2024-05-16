"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_apply-to-lms-page_apply-to-lms-page_module_ts"],{

/***/ 15672:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/apply-to-lms-page/apply-to-lms-page-routing.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyToLmsPageRoutingModule: () => (/* binding */ ApplyToLmsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _apply_to_lms_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply-to-lms-page.component */ 57818);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: ':repo/:node',
  component: _apply_to_lms_page_component__WEBPACK_IMPORTED_MODULE_0__.ApplyToLmsPageComponent
}];
class ApplyToLmsPageRoutingModule {
  static #_ = this.ɵfac = function ApplyToLmsPageRoutingModule_Factory(t) {
    return new (t || ApplyToLmsPageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ApplyToLmsPageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ApplyToLmsPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 57818:
/*!************************************************************************!*\
  !*** ./src/app/pages/apply-to-lms-page/apply-to-lms-page.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyToLmsPageComponent: () => (/* binding */ ApplyToLmsPageComponent),
/* harmony export */   NodeLMS: () => (/* binding */ NodeLMS)
/* harmony export */ });
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);








function ApplyToLmsPageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No reurl received. Please check request.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class NodeLMS extends _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.Node {}
class ApplyToLmsPageComponent {
  constructor(connector, locator, nodeApi, toast, events, translations, temporaryStorage, nodeHelper, router, platformLocation, route) {
    this.connector = connector;
    this.locator = locator;
    this.nodeApi = nodeApi;
    this.toast = toast;
    this.events = events;
    this.translations = translations;
    this.temporaryStorage = temporaryStorage;
    this.nodeHelper = nodeHelper;
    this.router = router;
    this.platformLocation = platformLocation;
    this.route = route;
    this.route.queryParams.subscribe(params => {
      if (params.reurl) {
        this.reurl = params.reurl;
      }
      this.route.params.subscribe(params => {
        this.toast.showProgressSpinner();
        if (temporaryStorage.get(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService.APPLY_TO_LMS_PARAMETER_NODE)) {
          this.node = temporaryStorage.get(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService.APPLY_TO_LMS_PARAMETER_NODE);
          this.forward();
        } else if (params.node) {
          this.nodeApi.getNodeMetadata(params.node, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.ALL], params.repo).subscribe(data => {
            this.node = data.node;
            this.forward();
          }, error => {
            this.translations.waitForInit().subscribe(() => {
              this.toast.error(error);
            });
          });
        }
      });
    });
  }
  static roundNumber(number) {
    number = Math.round(number);
    if (Number.isNaN(number)) return 0;
    return number;
  }
  forward() {
    this.nodeApi.prepareUsage(this.node.ref.id, this.node.ref.repo).subscribe(nodeWrapper => {
      this.applyNode(nodeWrapper);
    }, error => {
      this.toast.error(error);
    });
  }
  applyNode(wrapper) {
    const node = wrapper.node;
    // copy the main object to remote (in this case, it's simply a regular, local object)
    if (!wrapper.remote) wrapper.remote = wrapper.node;
    const reurl = this.reurl;
    // the ccrep should always point to the local object (relevant if it's from a remote repo)
    const ccrepUrl = 'ccrep://' + encodeURIComponent(wrapper.remote.ref.repo) + '/' + encodeURIComponent(wrapper.remote.ref.id);
    if (reurl == 'IFRAME' || reurl == 'WINDOW') {
      node.objectUrl = ccrepUrl;
      node.nodeId = wrapper.remote.ref.id;
      this.nodeHelper.appendImageData(node).then(data => {
        this.events.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.FrameEventsService.EVENT_APPLY_NODE, data);
        window.history.back();
      }, error => {
        console.warn('failed to fetch image data', error);
        this.events.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.FrameEventsService.EVENT_APPLY_NODE, node);
        window.history.back();
      });
      return;
    }
    console.warn('Using an absolute url for the "reurl" parameter is deprecated. Please prefer the value "WINDOW" and use frame communication');
    let params = reurl.indexOf('?') == -1 ? '?' : '&';
    params += 'nodeId=' + ccrepUrl;
    params += '&localId=' + encodeURIComponent(node.ref.id);
    if (node.title) params += '&title=' + encodeURIComponent(node.title);else params += '&title=' + encodeURIComponent(node.name);
    params += '&mimeType=' + encodeURIComponent(node.mimetype);
    params += '&mediatype=' + encodeURIComponent(node.mediatype);
    params += '&h=' + ApplyToLmsPageComponent.roundNumber(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_HEIGHT]);
    params += '&w=' + ApplyToLmsPageComponent.roundNumber(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_WIDTH]);
    if (node.content.version) params += '&v=' + node.content.version;
    if (node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_CCRESSOURCETYPE]) params += '&resourceType=' + encodeURIComponent(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_CCRESSOURCETYPE]);
    if (node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_CCRESSOURCEVERSION]) params += '&resourceVersion=' + encodeURIComponent(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.CCM_PROP_CCRESSOURCEVERSION]);
    params += '&isDirectory=' + node.isDirectory;
    params += '&iconURL=' + encodeURIComponent(node.iconURL);
    params += '&previewURL=' + encodeURIComponent(node.preview.url);
    params += '&repoType=' + encodeURIComponent(node.repositoryType);
    // reurl + params
    // let contentParams = node.contentUrl.indexOf("?") == -1 ? '?' : '&';
    // contentParams += "LMS_URL=" + encodeURIComponent(reurl);
    // console.log(node.contentUrl + contentParams);
    console.log(reurl);
    this.temporaryStorage.set(_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService.APPLY_TO_LMS_PARAMETER_NODE, node);
    window.location.replace(reurl + params);
  }
  static #_ = this.ɵfac = function ApplyToLmsPageComponent_Factory(t) {
    return new (t || ApplyToLmsPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestLocatorService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_1__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.FrameEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_4__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ApplyToLmsPageComponent,
    selectors: [["es-apply-to-lms-page"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"]],
    template: function ApplyToLmsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, ApplyToLmsPageComponent_div_0_Template, 2, 0, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.reurl);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf],
    encapsulation: 2
  });
}

/***/ }),

/***/ 34386:
/*!*********************************************************************!*\
  !*** ./src/app/pages/apply-to-lms-page/apply-to-lms-page.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyToLmsPageModule: () => (/* binding */ ApplyToLmsPageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _apply_to_lms_page_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply-to-lms-page-routing.module */ 15672);
/* harmony import */ var _apply_to_lms_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apply-to-lms-page.component */ 57818);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);




class ApplyToLmsPageModule {
  static #_ = this.ɵfac = function ApplyToLmsPageModule_Factory(t) {
    return new (t || ApplyToLmsPageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: ApplyToLmsPageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _apply_to_lms_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.ApplyToLmsPageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ApplyToLmsPageModule, {
    declarations: [_apply_to_lms_page_component__WEBPACK_IMPORTED_MODULE_2__.ApplyToLmsPageComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _apply_to_lms_page_routing_module__WEBPACK_IMPORTED_MODULE_1__.ApplyToLmsPageRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_apply-to-lms-page_apply-to-lms-page_module_ts.js.map