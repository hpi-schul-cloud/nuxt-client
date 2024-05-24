"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["src_app_pages_workspace-page_workspace-page_module_ts"],{

/***/ 50697:
/*!***************************************************************************!*\
  !*** ./src/app/pages/workspace-page/metadata/metadata-block.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspaceMetadataBlockComponent: () => (/* binding */ WorkspaceMetadataBlockComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/pipes/permission-name.pipe */ 44431);













function WorkspaceMetadataBlockComponent_ng_container_0_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WorkspaceMetadataBlockComponent_ng_container_0_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r30.onEditMetadata.emit(ctx_r30._node));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.cclom:title"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r3.data.title);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.cclom:general_keyword"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 16)(1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const keyword_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](keyword_r33);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WorkspaceMetadataBlockComponent_ng_container_0_div_15_div_1_Template, 3, 1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r5.data.keywords);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.description"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r7.data.description);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.ccm:author_freetext"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r9.data.author_freetext);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.ccm:lifecyclecontributer_authorFN"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r11.data.author);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_span_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "MEDIATYPE." + ctx_r12.data.mediatype));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_span_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "MEDIATYPE.file"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_span_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "MEDIATYPE.folder"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_span_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "MEDIATYPE.collection"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_span_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("(", ctx_r16.data.mimetype, ")");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.exif:dateTimeOriginal"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r18.data.exifDate);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.dimensions"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r20.data.dimensions);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.cclom:duration"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r22.data.duration);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.size"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "formatSize");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, ctx_r24.data.size));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NO_SIZE"));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "WORKSPACE.METADATA.INVITED_USERS"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const authority_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, authority_r39));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_2_div_1_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r35.permissions.users);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "WORKSPACE.METADATA.INVITED_GROUPS"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "permissionName");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const authority_r41 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, authority_r41));
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_4_div_1_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r37.permissions.groups);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_1_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_2_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_3_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, WorkspaceMetadataBlockComponent_ng_container_0_div_47_div_4_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r26.permissions.users.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r26.permissions.users.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r26.permissions.groups.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r26.permissions.groups.length);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "NODE.ccm:commonlicense_key"), " ");
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const license_r42 = ctx.ngIf;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", license_r42, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r28.data.licenseName);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_51_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const aspect_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](aspect_r45);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_51_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const property_r46 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](property_r46[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](property_r46[1]);
  }
}
function WorkspaceMetadataBlockComponent_ng_container_0_div_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, WorkspaceMetadataBlockComponent_ng_container_0_div_51_div_4_Template, 2, 1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, WorkspaceMetadataBlockComponent_ng_container_0_div_51_div_5_Template, 5, 2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]("Aspects");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r29.data.aspects);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r29.data.properties);
  }
}
const _c0 = function () {
  return {};
};
const _c1 = function () {
  return {
    crop: true,
    width: 600,
    height: 450
  };
};
function WorkspaceMetadataBlockComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "img", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WorkspaceMetadataBlockComponent_ng_container_0_Template_img_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r48);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r47.onDisplay.emit(ctx_r47._node));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "esNodeImage");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, WorkspaceMetadataBlockComponent_ng_container_0_button_5_Template, 3, 0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4)(7, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, WorkspaceMetadataBlockComponent_ng_container_0_div_12_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, WorkspaceMetadataBlockComponent_ng_container_0_div_13_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, WorkspaceMetadataBlockComponent_ng_container_0_div_14_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, WorkspaceMetadataBlockComponent_ng_container_0_div_15_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, WorkspaceMetadataBlockComponent_ng_container_0_div_16_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, WorkspaceMetadataBlockComponent_ng_container_0_div_17_Template, 2, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, WorkspaceMetadataBlockComponent_ng_container_0_div_18_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, WorkspaceMetadataBlockComponent_ng_container_0_div_19_Template, 2, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, WorkspaceMetadataBlockComponent_ng_container_0_div_20_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, WorkspaceMetadataBlockComponent_ng_container_0_div_21_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](27, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](33, WorkspaceMetadataBlockComponent_ng_container_0_span_33_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, WorkspaceMetadataBlockComponent_ng_container_0_span_34_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](35, WorkspaceMetadataBlockComponent_ng_container_0_span_35_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](36, WorkspaceMetadataBlockComponent_ng_container_0_span_36_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](37, WorkspaceMetadataBlockComponent_ng_container_0_span_37_Template, 2, 1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](38, WorkspaceMetadataBlockComponent_ng_container_0_div_38_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, WorkspaceMetadataBlockComponent_ng_container_0_div_39_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](40, WorkspaceMetadataBlockComponent_ng_container_0_div_40_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](41, WorkspaceMetadataBlockComponent_ng_container_0_div_41_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](42, WorkspaceMetadataBlockComponent_ng_container_0_div_42_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](43, WorkspaceMetadataBlockComponent_ng_container_0_div_43_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](44, WorkspaceMetadataBlockComponent_ng_container_0_div_44_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, WorkspaceMetadataBlockComponent_ng_container_0_div_45_Template, 3, 3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](46, WorkspaceMetadataBlockComponent_ng_container_0_div_46_Template, 3, 3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](47, WorkspaceMetadataBlockComponent_ng_container_0_div_47_Template, 5, 4, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](48, WorkspaceMetadataBlockComponent_ng_container_0_div_48_Template, 3, 3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](49, WorkspaceMetadataBlockComponent_ng_container_0_div_49_Template, 4, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](50, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](51, WorkspaceMetadataBlockComponent_ng_container_0_div_51_Template, 6, 3, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_35_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 36, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](3, 38, ctx_r0._node, ctx_r0.isAnimated() ? _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](49, _c0) : _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](50, _c1))), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.canEdit());
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](9, 41, "NODE.cm:name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.data.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.keywords);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.keywords);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.author_freetext);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.author_freetext);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](24, 43, "NODE.cm:creator"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.data.creator);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.data.createDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](31, 45, "NODE.mimetype"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.mediatype && !ctx_r0.data.isDirectory);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.data.mediatype);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.isDirectory && !ctx_r0.data.isCollection);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.isCollection);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.mimetype && ctx_r0.data.mediatype != ctx_r0.data.mimetype && !ctx_r0.data.isDirectory);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.exifDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.exifDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.dimensions);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.dimensions);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.duration);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.duration);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.data.isDirectory);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.data.isDirectory && ctx_r0.data.size);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.data.isDirectory && !ctx_r0.data.size);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.permissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.data.license);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](50, 47, ctx_r0.data.license));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (tmp_35_0 = ctx_r0.connector.getCurrentLogin()) == null ? null : tmp_35_0.isAdmin);
  }
}
class WorkspaceMetadataBlockComponent {
  set node(node) {
    this.load(node);
  }
  load(node) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this._node = node;
      _this.data = yield _this.format(node);
      _this.nodeApi.getNodePermissions(node.ref.id).subscribe(data => {
        _this.permissions = _this.formatPermissions(data);
      });
    })();
  }
  format(node) {
    const data = {};
    data.name = node.name;
    data.title = node.title;
    data.isDirectory = node.isDirectory;
    data.isCollection = node.collection != null;
    data.description = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_DESCRIPTION];
    data.preview = node.preview.url;
    data.keywords = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_KEYWORD];
    if (data.keywords && data.keywords.length === 1 && !data.keywords[0]) data.keywords = null;
    // data["creator"]=node.properties[RestConstants.CM_CREATOR];
    data.creator = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationHelper.getPersonWithConfigDisplayName(node.createdBy, this.configService);
    data.createDate = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.FormatDatePipe(this.translate).transform(node.createdAt);
    data.duration = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.DurationHelper.getDurationFormatted(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TECHNICAL_DURATION]);
    data.author = this.toVCards(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR]).join(', ');
    data.author_freetext = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT] ? node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT][0] : null;
    data.mediatype = node.mediatype === 'file' ? node.mimetype : node.mediatype;
    data.mimetype = node.mimetype;
    data.size = node.size;
    if (node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.EXIF_PROP_DATE_TIME_ORIGINAL]) {
      data.exifDate = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.FormatDatePipe(this.translate).transform(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.EXIF_PROP_DATE_TIME_ORIGINAL][0]);
    }
    data.dimensions = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeImageSizePipe().transform(node);
    data.license = this.nodeHelper.getLicenseIcon(node);
    data.licenseName = this.nodeHelper.getLicenseName(node);
    data.properties = [];
    data.aspects = node.aspects.sort();
    for (const k of Object.keys(node.properties).sort()) {
      data.properties.push([k, node.properties[k].join(', ')]);
    }
    return data;
  }
  constructor(connector, nodeApi, translate, configService, nodeHelper) {
    this.connector = connector;
    this.nodeApi = nodeApi;
    this.translate = translate;
    this.configService = configService;
    this.nodeHelper = nodeHelper;
    this.onEditMetadata = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.onDisplay = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
  }
  isAnimated() {
    return this.nodeHelper.hasAnimatedPreview(this._node);
  }
  formatPermissions(permissions) {
    const currentAuth = this.connector.getCurrentLogin()?.authorityName;
    const data = {};
    data.users = [];
    data.groups = [];
    if (!permissions.permissions) return data;
    for (const permission of permissions.permissions.inheritedPermissions) {
      if (permission.authority.authorityName === currentAuth || permission.authority.authorityType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_OWNER) {} else if (permission.authority.authorityType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER) {
        data.users.push(permission);
      } else {
        data.groups.push(permission);
      }
    }
    for (const permission of permissions.permissions.localPermissions.permissions) {
      if (permission.authority.authorityName === currentAuth || permission.authority.authorityType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_OWNER) {} else if (permission.authority.authorityType === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER) {
        if (!this.containsPermission(data.groups, permission)) data.users.push(permission);
      } else {
        if (!this.containsPermission(data.groups, permission)) data.groups.push(permission);
      }
    }
    return data;
  }
  toVCards(properties) {
    const vcards = [];
    if (properties) {
      for (const p of properties) {
        vcards.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.VCard(p).getDisplayName());
      }
    }
    return vcards;
  }
  containsPermission(permissions, permission) {
    for (const perm of permissions) {
      if (perm.authority.authorityName == permission.authority.authorityName) return true;
    }
    return false;
  }
  canEdit() {
    return this._node && this._node.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE) !== -1;
  }
  static #_ = this.ɵfac = function WorkspaceMetadataBlockComponent_Factory(t) {
    return new (t || WorkspaceMetadataBlockComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_7__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_2__.NodeHelperService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: WorkspaceMetadataBlockComponent,
    selectors: [["es-workspace-metadata-block"]],
    inputs: {
      node: "node"
    },
    outputs: {
      onEditMetadata: "onEditMetadata",
      onDisplay: "onDisplay"
    },
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], [1, "preview", "clickable", 3, "src", "click"], [1, "metadata-container"], ["mat-icon-button", "", "class", "edit", 3, "click", 4, "ngIf"], [1, "metadata"], [1, "description"], [1, "value"], ["class", "description", 4, "ngIf"], ["class", "value", 4, "ngIf"], ["class", "value descriptionValue", 4, "ngIf"], ["class", "value valueFreetext", 4, "ngIf"], ["class", "mimetype", 4, "ngIf"], ["class", "value license-value", 4, "ngIf"], ["mat-icon-button", "", 1, "edit", 3, "click"], [1, "material-icons"], ["class", "badge", 4, "ngFor", "ngForOf"], [1, "badge"], [1, "text"], [1, "value", "descriptionValue"], [1, "value", "valueFreetext"], [1, "mimetype"], [4, "ngFor", "ngForOf"], [1, "value", "license-value"], [1, "license", 3, "src"], [1, "licenseName"], ["class", "aspect", 4, "ngFor", "ngForOf"], [1, "aspect"]],
    template: function WorkspaceMetadataBlockComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, WorkspaceMetadataBlockComponent_ng_container_0_Template, 52, 51, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.data);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.IconDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatIconButton, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.FormatSizePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_5__.NodeImagePipe, _shared_pipes_permission_name_pipe__WEBPACK_IMPORTED_MODULE_3__.PermissionNamePipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.metadata-container[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n\n.metadata[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  min-width: 0;\n}\n\n.description[_ngcontent-%COMP%] {\n  color: #383838;\n  font-size: 90%;\n  text-transform: uppercase;\n  font-weight: bold;\n}\n\n.descriptionValue[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n\n.edit[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  float: right;\n  position: relative;\n}\n\n.value[_ngcontent-%COMP%] {\n  padding-top: 0;\n  padding-bottom: 20px;\n}\n\n.aspect[_ngcontent-%COMP%]:not(:last-child) {\n  padding-bottom: 4px;\n}\n\n.valueFreetext[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\n\n.preview[_ngcontent-%COMP%] {\n  width: calc(100% + 24px);\n  margin-left: -12px;\n  margin-bottom: 12px;\n  height: 200px;\n  position: relative;\n  object-fit: cover;\n}\n\n.license-value[_ngcontent-%COMP%]   img.license[_ngcontent-%COMP%] {\n  height: 30px;\n  margin-top: 5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS9tZXRhZGF0YS9tZXRhZGF0YS1ibG9jay5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0FBQUo7O0FBR0E7RUFDSSx1QkFBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLGNER087RUNGUCxjRE1ZO0VDTFoseUJBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUVBO0VBQ0kscUJBQUE7QUFDSjs7QUFDQTtFQUNJLHVCRFZRO0VDV1IsWUFBQTtFQUNBLGtCQUFBO0FBRUo7O0FBQUE7RUFDSSxjQUFBO0VBQ0Esb0JBQUE7QUFHSjs7QUFEQTtFQUNJLG1CQUFBO0FBSUo7O0FBRkE7RUFDSSxxQkFBQTtBQUtKOztBQUhBO0VBQ0ksd0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFNSjs7QUFISTtFQUNJLFlBQUE7RUFDQSxlQUFBO0FBTVIiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLm1ldGFkYXRhLWNvbnRhaW5lciB7XG4gICAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbi5tZXRhZGF0YSB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIG1pbi13aWR0aDogMDtcbn1cblxuLmRlc2NyaXB0aW9uIHtcbiAgICBjb2xvcjogJHRleHRNYWluO1xuICAgIGZvbnQtc2l6ZTogJGZvbnRTaXplU21hbGw7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5kZXNjcmlwdGlvblZhbHVlIHtcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG4uZWRpdCB7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi52YWx1ZSB7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgcGFkZGluZy1ib3R0b206IDIwcHg7XG59XG4uYXNwZWN0Om5vdCg6bGFzdC1jaGlsZCkge1xuICAgIHBhZGRpbmctYm90dG9tOiA0cHg7XG59XG4udmFsdWVGcmVldGV4dCB7XG4gICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xufVxuLnByZXZpZXcge1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAyNHB4KTtcbiAgICBtYXJnaW4tbGVmdDogLTEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICBoZWlnaHQ6IDIwMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5saWNlbnNlLXZhbHVlIHtcbiAgICBpbWcubGljZW5zZSB7XG4gICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 76394:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/workspace-page/metadata/metadata-sidebar.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetadataSidebarComponent: () => (/* binding */ MetadataSidebarComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _features_mds_types_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../features/mds/types/types */ 97801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _workspace_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../workspace.service */ 52517);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _metadata_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./metadata.component */ 66005);















function MetadataSidebarComponent_es_workspace_metadata_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "es-workspace-metadata", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onRestore", function MetadataSidebarComponent_es_workspace_metadata_0_Template_es_workspace_metadata_onRestore_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r1.restoreVersion($event));
    })("onDisplay", function MetadataSidebarComponent_es_workspace_metadata_0_Template_es_workspace_metadata_onDisplay_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r3.goToNode($event));
    })("onEditMetadata", function MetadataSidebarComponent_es_workspace_metadata_0_Template_es_workspace_metadata_onEditMetadata_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r4.openMdsEditor([$event]));
    })("onClose", function MetadataSidebarComponent_es_workspace_metadata_0_Template_es_workspace_metadata_onClose_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r5.closeSidebar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@fromRight", ctx_r0.nodeSidebar)("node", ctx_r0.nodeSidebar);
  }
}
/**
 * Container Component for the workspace's metadata sidebar.
 *
 * Handles input and output of the inner metadata component and shows / hides the sidebar as
 * requested.
 */
class MetadataSidebarComponent {
  get nodeSidebar() {
    return this.workspace.nodeSidebar;
  }
  constructor(dialogs, localEvents, node, router, toast, workspace) {
    this.dialogs = dialogs;
    this.localEvents = localEvents;
    this.node = node;
    this.router = router;
    this.toast = toast;
    this.workspace = workspace;
  }
  handleKeyboardEvent(event) {
    if (event.key === 'Escape') {
      if (this.workspace.nodeSidebar != null) {
        this.closeSidebar();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
  }
  restoreVersion(restore) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'WORKSPACE.METADATA.RESTORE_TITLE',
        message: 'WORKSPACE.METADATA.RESTORE_MESSAGE',
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_2__.YES_OR_NO,
        nodes: [restore.node]
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'YES') {
          _this.doRestoreVersion(restore.version);
        }
      });
    })();
  }
  doRestoreVersion(version) {
    this.toast.showProgressSpinner();
    this.node.revertNodeToVersion(version.version.node.id, version.version.major, version.version.minor).subscribe(data => {
      this.toast.closeProgressSpinner();
      this.closeSidebar();
      // @TODO type is not compatible
      this.node.getNodeMetadata(version.version.node.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).subscribe(node => {
        this.localEvents.nodesChanged.emit([node.node]);
        this.workspace.nodeSidebar = node.node;
        this.workspace.nodeSidebarChange.emit(node.node);
        this.toast.toast('WORKSPACE.REVERTED_VERSION');
      }, error => this.toast.error(error));
    }, error => this.toast.error(error));
  }
  closeSidebar() {
    this.workspace.nodeSidebar = null;
    this.workspace.nodeSidebarChange.emit(null);
  }
  goToNode(node) {
    if (node.version) {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.UIConstants.ROUTER_PREFIX + 'render', node.ref.id, node.version]);
    } else {
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.UIConstants.ROUTER_PREFIX + 'render', node.ref.id]);
    }
  }
  openMdsEditor(nodes) {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this2.dialogs.openMdsEditorDialogForNodes({
        nodes,
        bulkBehavior: _features_mds_types_types__WEBPACK_IMPORTED_MODULE_3__.BulkBehavior.Default
      });
      dialogRef.afterClosed().subscribe(updatedNodes => _this2.closeMdsEditor(nodes, updatedNodes));
    })();
  }
  closeMdsEditor(originalNodes, updatedNodes = null) {
    let refresh = !!updatedNodes;
    if (this.workspace.nodeSidebar && this.workspace.nodeSidebar.ref.id === originalNodes[0]?.ref.id && updatedNodes) {
      this.workspace.nodeSidebar = updatedNodes[0];
    }
    if (refresh) {
      this.localEvents.nodesChanged.emit(updatedNodes);
    }
  }
  static #_ = this.ɵfac = function MetadataSidebarComponent_Factory(t) {
    return new (t || MetadataSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_4__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_5__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_workspace_service__WEBPACK_IMPORTED_MODULE_6__.WorkspaceService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: MetadataSidebarComponent,
    selectors: [["es-metadata-sidebar"]],
    hostBindings: function MetadataSidebarComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("keydown", function MetadataSidebarComponent_keydown_HostBindingHandler($event) {
          return ctx.handleKeyboardEvent($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveDocument"]);
      }
    },
    decls: 1,
    vars: 1,
    consts: [["class", "metadata-sidebar", 3, "node", "onRestore", "onDisplay", "onEditMetadata", "onClose", 4, "ngIf"], [1, "metadata-sidebar", 3, "node", "onRestore", "onDisplay", "onEditMetadata", "onClose"]],
    template: function MetadataSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, MetadataSidebarComponent_es_workspace_metadata_0_Template, 1, 2, "es-workspace-metadata", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.nodeSidebar);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _metadata_component__WEBPACK_IMPORTED_MODULE_7__.WorkspaceMetadataComponent],
    styles: ["\n\n.metadata-sidebar[_ngcontent-%COMP%] {\n  min-width: 350px;\n  max-width: 350px;\n  position: fixed;\n  \n\n  -webkit-overflow-scrolling: touch;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  height: calc(100% - (var(--mainnavHeight) + 65px));\n  top: calc(var(--mainnavHeight) + 65px);\n  right: 0;\n  z-index: 5;\n  background-color: #fff;\n}\n@media screen and (max-width: 900px) {\n  .metadata-sidebar[_ngcontent-%COMP%] {\n    height: calc(100% - (var(--mainnavHeight) + 127px));\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS9tZXRhZGF0YS9tZXRhZGF0YS1zaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUNrQkEsc0JBQUE7RUFDQSxpQ0FBQTtFQ0xBLHNDQUFBO0VGWEEsa0RBQUE7RUFDQSxzQ0FBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0Esc0JBQUE7QUFDSjtBQUFJO0VBWEo7SUFZUSxtREFBQTtFQUdOO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLm1ldGFkYXRhLXNpZGViYXIge1xuICAgIG1pbi13aWR0aDogMzUwcHg7XG4gICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgQGluY2x1ZGUgaW9zU2Nyb2xsaW5nKCk7XG4gICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3coKTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICh2YXIoLS1tYWlubmF2SGVpZ2h0KSArICN7JHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0fSkpO1xuICAgIHRvcDogY2FsYyh2YXIoLS1tYWlubmF2SGVpZ2h0KSArICN7JHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0fSk7XG4gICAgcmlnaHQ6IDA7XG4gICAgei1pbmRleDogNTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICgkbW9iaWxlVGFiU3dpdGNoV2lkdGgpKSB7XG4gICAgICAgIGhlaWdodDogY2FsYyhcbiAgICAgICAgICAgIDEwMCUgLSAodmFyKC0tbWFpbm5hdkhlaWdodCkgKyAjeyR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodCskbW9iaWxlVGFiTmF2SGVpZ2h0fSlcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJAbWl4aW4gaW1hZ2VEaXNhYmxlZEJsdXIoKSB7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGJsdXIoM3B4KTtcbiAgICBmaWx0ZXI6IGJsdXIoM3B4KTtcbn1cbkBtaXhpbiBzaG9ydGVuVGV4dCgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dMYXJnZSgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMTBweCA3MHB4IHJnYmEoMCwgMCwgMCwgMC4xNSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbGltaXRMaW5lTGVuZ3RoKCR3aWR0aCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBtYXgtd2lkdGg6ICR3aWR0aDtcbn1cbkBtaXhpbiB1bnNlbGVjdGFibGVUZXh0KCkge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbkBtaXhpbiBpb3NTY3JvbGxpbmcoKSB7XG4gICAgLyogaW9zIHNjcm9sbGluZyBmaXggKi9cbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG59XG5AbWl4aW4gcGxhY2Vob2xkZXIge1xuICAgIDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxJbnNldEZvY3VzKCkge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAkZm9jdXNXaWR0aCAkZm9jdXNDb2xvciAhaW1wb3J0YW50O1xuICAgIEBtZWRpYSAocG9pbnRlcjogY29hcnNlKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnLCAkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsRGFzaGVkRm9jdXMoKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgb3V0bGluZTogJGZvY3VzV2lkdGggZGFzaGVkICRmb2N1c0NvbG9yO1xufVxuXG5AbWl4aW4gZm9jdXNTaGFkb3coJGRhcms6IHRydWUsICRzdHJlbmd0aDogMC4xKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBAaWYgJGRhcms9PXRydWUge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIH0gQGVsc2Uge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIH1cbn1cbkBtaXhpbiBkYXJrZW4oKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkNvbG9yO1xufVxuQG1peGluIGRhcmtlbkxpZ2h0KCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5MaWdodENvbG9yO1xufVxuQG1peGluIGJsdXJCYWNrZ3JvdW5kKCRyYWRpdXM6IDVweCkge1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigkcmFkaXVzKTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxGb2N1cygkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwICRmb2N1c1dpZHRoICRjb2xvciAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gcmVtb3ZlQnV0dG9uRGVmYXVsdFN0eWxlcyB7XG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XG4gICAgYm9yZGVyOiB1bnNldDtcbiAgICBwYWRkaW5nOiB1bnNldDtcbn1cblxuQG1peGluIGFmdGVyUHNldWRvRWxlbWVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBpbXBvcnQgJ3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucyc7XG4iLCJAbWl4aW4gY2xpY2thYmxlKCkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5AbWl4aW4gbGltaXRMaW5lQ291bnQoJGNvdW50LCAkbGluZUhlaWdodDogMSkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgbWF4LWhlaWdodDogJGNvdW50ICogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6ICRjb3VudDsgLyogbnVtYmVyIG9mIGxpbmVzIHRvIHNob3cgKi9cbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC8qIGF1dG9wcmVmaXhlcjogb2ZmICovXG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3coJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0JvdHRvbSgkb3BhY2l0eTogMC4xKSB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93U21hbGwoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd01lZGl1bUxhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlLCAkb3BhY2l0eTogMC42KSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTY3JvbGxiYXIoKSB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIG1heC13aWR0aDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgLy8gLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB9XG59XG5AbWl4aW4gcmVtb3ZlRGVmYXVsdEZvY3VzKCkge1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgfVxufVxuLy8gQXBwbHkgdGhlIGNvbnRlbnQgc3R5bGVzIGluIGNvbnRyYXN0IG1vZGUuIFRoaXMgaXMganVzdCBlbm91Z2ggY29udHJhc3QgdG8gYmUgV0NBRyBjb21wbGllbnQgLS0tXG4vLyBub3QgYSBoaWdoLWNvbnRyYXN0IG1vZGUuXG4vL1xuLy8gQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyBmb3IgdXNlIGluIGVuY2Fwc3VsYXRlZCBjb21wb25lbnQgc3R5bGVzLCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZSB7XG4vLyAgICAgICAgIC8vIFN0eWxlcyB0byBhcHBseSBpbiBjb250cmFzdCBtb2RlXG4vLyAgICAgfVxuLy8gVG8gdXMgaW4gZ2xvYmFsIGNvbnRleHQsIHBhc3MgJ2dsb2JhbCcgYXMgZmlyc3QgYXJndW1lbnQsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlKGdsb2JhbCkgeyAvKiAuLi4gKi8gfVxuQG1peGluIGNvbnRyYXN0TW9kZSgkc2NvcGU6IGVuY2Fwc3VsYXRlZCkge1xuICAgICRjb250cmFzdE1vZGVTZWxlY3RvcjogJ2JvZHkuZXMtY29udHJhc3QtbW9kZSc7XG4gICAgQGlmICRzY29wZSA9PSBlbmNhcHN1bGF0ZWQge1xuICAgICAgICA6aG9zdC1jb250ZXh0KCN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSkgJiB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHNjb3BlID09IGdsb2JhbCB7XG4gICAgICAgICN7aWYoJiwgJyN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSAmJywgJGNvbnRyYXN0TW9kZVNlbGVjdG9yKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIFwiSW52YWxpZCBzY29wZSAjeyRzY29wZX0uXCI7XG4gICAgfVxufVxuQG1peGluIGJsdXJJbWFnZSgkYmx1clN0cmVuZ3RoOiAyNXB4KSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB0b3A6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB3aWR0aDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIHotaW5kZXg6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmaWx0ZXI6IGJsdXIoJGJsdXJTdHJlbmd0aCk7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb3BhY2l0eTogMC43O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.trigger)('fromRight', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_9__.UIAnimation.fromRight())]
    }
  });
}

/***/ }),

/***/ 66005:
/*!*********************************************************************!*\
  !*** ./src/app/pages/workspace-page/metadata/metadata.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspaceMetadataComponent: () => (/* binding */ WorkspaceMetadataComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 85046);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 45083);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! chart.js */ 17005);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tabs */ 60989);
/* harmony import */ var _metadata_block_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metadata-block.component */ 50697);
/* harmony import */ var _shared_pipes_version_label_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/pipes/version-label.pipe */ 94194);




















const _c0 = ["canvas"];
function WorkspaceMetadataComponent_div_0_es_spinner_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-spinner");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 15);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("aria", true);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 0, ["*ngTemplateOutlet", "infoTab"]);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r14.statsTotalPoints, " ");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 1, ["*ngTemplateOutlet", "usageTab"]);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 17);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 2, ["*ngTemplateOutlet", "versionsTab"]);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-tab-group")(1, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_2_Template, 1, 1, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_3_Template, 1, 0, "ng-content", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_5_Template, 2, 1, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_6_Template, 1, 0, "ng-content", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_template_8_Template, 1, 0, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_ng_content_9_Template, 1, 0, "ng-content", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](7);
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r10);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_2_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 3, ["*ngTemplateOutlet", "infoTab"]);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_2_ng_content_1_Template, 1, 0, "ng-content", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r6);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "es-workspace-metadata-block", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onDisplay", function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_4_Template_es_workspace_metadata_block_onDisplay_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.display());
    })("onEditMetadata", function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_4_Template_es_workspace_metadata_block_onEditMetadata_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r21.edit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("node", ctx_r7.nodeObject);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 32)(1, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const point_r30 = ctx.$implicit;
    const i_r31 = ctx.index;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r23.stats.pointsIcons[i_r31]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", point_r30, " ");
  }
}
const _c1 = function (a0) {
  return {
    count: a0
  };
};
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 1, "WORKSPACE.METADATA.COLLECTIONS", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, ctx_r24.usagesCollectionData).length)), " ");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-node-entries-wrapper", 34);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dataSource", ctx_r25.usagesCollection)("columns", ctx_r25.columnsCollections)("displayType", ctx_r25.NodeEntriesDisplayType.SmallGrid)("elementInteractionType", ctx_r25.InteractionType.DefaultActionLink);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "WORKSPACE.METADATA.FORKED_PARENT"), " ");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-node-entries-wrapper", 36);
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dataSource", ctx_r27.staticDataSource(ctx_r27.forkedParent))("columns", ctx_r27.columns)("checkbox", false)("displayType", ctx_r27.NodeEntriesDisplayType.Table)("elementInteractionType", ctx_r27.InteractionType.DefaultActionLink);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 1, "WORKSPACE.METADATA.FORKED_CHILDS", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c1, ctx_r28.forkedChildren.getData().length)), " ");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "es-node-entries-wrapper", 36);
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dataSource", ctx_r29.forkedChildren)("columns", ctx_r29.columns)("checkbox", false)("displayType", ctx_r29.NodeEntriesDisplayType.Table)("elementInteractionType", ctx_r29.InteractionType.DefaultActionLink);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 20)(1, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "canvas", 22, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ul", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_li_7_Template, 4, 2, "li", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_p_13_Template, 4, 8, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_14_Template, 1, 4, "es-node-entries-wrapper", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_div_15_Template, 3, 3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_16_Template, 1, 5, "es-node-entries-wrapper", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_div_17_Template, 3, 6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_es_node_entries_wrapper_18_Template, 1, 5, "es-node-entries-wrapper", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 10, "WORKSPACE.METADATA.USAGE_COUNT_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r9.stats.points);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](10, 12, "WORKSPACE.METADATA.USAGE_COUNT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r9.statsTotalPoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r9.usagesCollection.isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r9.usagesCollection.isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r9.forkedParent);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r9.forkedParent);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r9.forkedChildren.isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r9.forkedChildren.isEmpty());
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "es-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "WORKSPACE.METADATA.CURRENT_VERSION"));
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, "WORKSPACE.METADATA.VERSION"));
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_button_18_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r40);
      const version_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r38.restoreVersion(version_r34));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("disabled", !ctx_r37.canRevert());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("esIcon", "restore");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 4, "WORKSPACE.METADATA.RESTORE"), " ");
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 41)(1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_span_2_Template, 3, 3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_span_3_Template, 3, 3, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "versionComment");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 46)(14, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_Template_button_click_14_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r42);
      const version_r34 = restoredCtx.$implicit;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r41.displayVersion(version_r34));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_button_18_Template, 4, 6, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const version_r34 = ctx.$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("versionMain", ctx_r33.isCurrentVersion(version_r34));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r33.isCurrentVersion(version_r34));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r33.isCurrentVersion(version_r34));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" (", version_r34.version.major, ".", version_r34.version.minor, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", version_r34.modifiedBy.firstName, " ", version_r34.modifiedBy.lastName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](9, 13, version_r34.modifiedAt));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](12, 15, version_r34));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("esIcon", "remove_red_eye");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](17, 17, "WORKSPACE.METADATA.VIEW_VERSION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r33.isCurrentVersion(version_r34));
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_1_Template, 2, 0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_div_2_Template, 19, 19, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r11.versionsLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r11.versions);
  }
}
function WorkspaceMetadataComponent_div_0_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, WorkspaceMetadataComponent_div_0_ng_container_9_mat_tab_group_1_Template, 10, 3, "mat-tab-group", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_2_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_4_Template, 1, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_6_Template, 19, 14, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, WorkspaceMetadataComponent_div_0_ng_container_9_ng_template_8_Template, 3, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.data.isDirectory)("ngIfElse", _r4);
  }
}
function WorkspaceMetadataComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4)(5, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function WorkspaceMetadataComponent_div_0_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r43.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, WorkspaceMetadataComponent_div_0_es_spinner_8_Template, 1, 0, "es-spinner", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, WorkspaceMetadataComponent_div_0_ng_container_9_Template, 10, 2, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.data.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.loading);
  }
}
const _c2 = ["*", "*", "*", "*"];
chart_js__WEBPACK_IMPORTED_MODULE_7__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_7__.BarController, chart_js__WEBPACK_IMPORTED_MODULE_7__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_7__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_7__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_7__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_7__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_7__.Title);
class WorkspaceMetadataComponent {
  get canvas() {
    return this._canvas;
  }
  set canvas(value) {
    this._canvas = value;
    this.drawBarChart();
  }
  set node(node) {
    this.nodeSubject.next(node);
  }
  constructor(translate, config, nodeHelper, router, iamApi, nodeApi, nodeService, searchApi, usageApi) {
    this.translate = translate;
    this.config = config;
    this.nodeHelper = nodeHelper;
    this.router = router;
    this.iamApi = iamApi;
    this.nodeApi = nodeApi;
    this.nodeService = nodeService;
    this.searchApi = searchApi;
    this.usageApi = usageApi;
    this.onEditMetadata = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.onDownload = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.onDisplay = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.onRestore = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.InteractionType;
    this.INFO = 'INFO';
    this.PROPERTIES = 'PROPERTIES';
    this.VERSIONS = 'VERSIONS';
    this.loading = true;
    this.usagesCollection = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeDataSource();
    this.usagesCollectionData = this.usagesCollection.connect();
    this.versionsLoading = false;
    this.columns = [];
    this.columnsCollections = [];
    this.forkedChildren = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeDataSource();
    this.stats = {
      labels: [],
      points: [],
      pointsIcons: ['input', 'layers', 'cloud_download', 'remove_red_eye'],
      colors: ['rgba(230, 178, 71, .8)', 'rgba(151, 91, 93, .8)', 'rgba(27, 102, 49, .8)', 'rgba(102,167,217,.8)']
    };
    this.nodeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject(null);
    this.columns.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME));
    this.columnsCollections.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('COLLECTION', 'title'));
    this.columnsCollections.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('COLLECTION', 'info'));
    this.columnsCollections.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('COLLECTION', 'scope'));
  }
  ngOnInit() {
    this.nodeSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(node => node !== null),
    // map((node) => node.ref.id),
    // TODO: check if distinct still working
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)()).subscribe(node => this.load(node));
  }
  load(node) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.versions = null;
      _this.versionsLoading = true;
      _this.resetStats();
      _this.loading = true;
      // use temporary the given data to show headers
      _this.data = _this.format(node);
      _this.nodeObject = (yield _this.nodeApi.getNodeMetadata(node.ref.id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).toPromise()).node;
      _this.loading = false;
      _this.data = _this.format(_this.nodeObject);
      const currentNode = _this.nodeObject;
      _this.nodeService.getVersionsMetadata(_this.nodeObject.ref.repo, _this.nodeObject.ref.id).subscribe(data => {
        if (currentNode !== _this.nodeObject) return;
        _this.versions = data.versions.reverse();
        for (const version of _this.versions) {
          if (version.comment) {
            if (version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_MAIN_FILE_UPLOAD || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_METADATA_UPDATE || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_CONTRIBUTOR_UPDATE || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_CONTENT_UPDATE || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_LICENSE_UPDATE || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_NODE_PUBLISHED || version.comment === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_PREVIEW_CHANGED || version.comment.startsWith(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.COMMENT_EDITOR_UPLOAD)) {
              const parameters = version.comment.split(',');
              let editor = '';
              if (parameters.length > 1) editor = _this.translate.instant('CONNECTOR.' + parameters[1] + '.NAME');
              version.comment = _this.translate.instant('WORKSPACE.METADATA.COMMENT.' + parameters[0], {
                editor
              });
            }
          }
        }
        let i = 0;
        for (const version of _this.versions) {
          if (_this.isCurrentVersion(version)) {
            _this.versions.splice(i, 1);
            _this.versions.splice(0, 0, version);
            break;
          }
          i++;
        }
        _this.versionsLoading = false;
      });
      _this.iamApi.getUser().subscribe(login => {
        _this.nodeApi.getNodePermissions(_this.nodeObject.ref.id).subscribe(data => {
          _this.permissions = _this.formatPermissions(login, data);
        });
      });
      _this.usages = null;
      _this.forkedParent = null;
      _this.forkedChildren.reset();
      if (_this.nodeObject.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_FORKED_ORIGIN]) {
        _this.nodeApi.getNodeMetadata(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.removeSpacesStoreRef(_this.nodeObject.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_FORKED_ORIGIN][0]), [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).subscribe(parent => {
          _this.forkedParent = parent.node;
        }, error => {});
      }
      const request = {
        propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]
      };
      _this.nodeService.getForkedChilds(node).subscribe(childs => {
        _this.forkedChildren.setData(childs.nodes);
      });
      _this.usageApi.getNodeUsages(_this.nodeObject.ref.id).subscribe(usages => {
        _this.usages = usages.usages;
        _this.usageApi.getNodeUsagesCollection(_this.nodeObject.ref.id).subscribe(collection => {
          _this.usagesCollection.setData(collection.filter(c => c.collectionUsageType === 'ACTIVE').map(c => c.collection));
          _this.getStats();
        });
      });
    })();
  }
  isCurrentVersion(version) {
    if (!this.nodeObject) return false;
    const prop = this.nodeObject.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_LIFECYCLE_VERSION];
    if (!prop) return false;
    return prop[0] == version.version.major + '.' + version.version.minor;
  }
  display(version = null) {
    this.nodeObject.version = version;
    this.onDisplay.emit(this.nodeObject);
  }
  displayNode(node) {
    this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.UIConstants.ROUTER_PREFIX + 'render', node.ref.id]);
  }
  displayCollection(collection) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_2__.UIHelper.goToCollection(this.router, collection);
  }
  openPermalink() {
    this.displayNode(this.nodeObject);
  }
  displayVersion(version) {
    if (this.isCurrentVersion(version)) this.display();else this.display(version.version.major + '.' + version.version.minor);
  }
  format(node) {
    const data = {};
    data.name = node.name;
    data.title = node.title;
    data.isDirectory = node.isDirectory;
    data.isCollection = node.collection != null;
    data.description = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_DESCRIPTION];
    data.preview = node.preview.url;
    data.keywords = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_GENERAL_KEYWORD];
    if (data.keywords && data.keywords.length == 1 && !data.keywords[0]) data.keywords = null;
    //data["creator"]=node.properties[RestConstants.CM_CREATOR];
    data.creator = _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationHelper.getPersonWithConfigDisplayName(node.createdBy, this.config);
    data.createDate = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.FormatDatePipe(this.translate).transform(node.createdAt);
    data.duration = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.DurationHelper.getDurationFormatted(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.LOM_PROP_TECHNICAL_DURATION]?.[0]);
    data.author = this.toVCards(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_LIFECYCLECONTRIBUTER_AUTHOR]).join(', ');
    data.author_freetext = node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT] ? node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_AUTHOR_FREETEXT][0] : null;
    data.mediatype = node.mediatype == 'file' ? node.mimetype : node.mediatype;
    data.mimetype = node.mimetype;
    data.size = node.size;
    if (node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.EXIF_PROP_DATE_TIME_ORIGINAL]) {
      data.exifDate = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.FormatDatePipe(this.translate).transform(node.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.EXIF_PROP_DATE_TIME_ORIGINAL][0]);
    }
    data.dimensions = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeImageSizePipe().transform(node);
    data.license = this.nodeHelper.getLicenseIcon(node);
    data.licenseName = this.nodeHelper.getLicenseName(node);
    data.properties = [];
    data.aspects = node.aspects.sort();
    for (const k of Object.keys(node.properties).sort()) {
      data.properties.push([k, node.properties[k].join(', ')]);
    }
    return data;
  }
  close() {
    this.onClose.emit();
  }
  edit() {
    this.onEditMetadata.emit(this.nodeObject);
  }
  restoreVersion(restore) {
    this.onRestore.emit({
      version: restore,
      node: this.nodeObject
    });
  }
  canRevert() {
    return this.nodeObject && this.nodeObject.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE) != -1;
  }
  isAnimated() {
    return this.nodeHelper.hasAnimatedPreview(this.nodeObject);
  }
  formatPermissions(login, permissions) {
    const data = {};
    data.users = [];
    data.groups = [];
    if (!permissions.permissions) return data;
    for (const permission of permissions.permissions.inheritedPermissions) {
      if (permission.authority.authorityName == login.person.authorityName || permission.authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_OWNER) {} else if (permission.authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER) {
        data.users.push(permission);
      } else {
        data.groups.push(permission);
      }
    }
    for (const permission of permissions.permissions.localPermissions.permissions) {
      if (permission.authority.authorityName == login.person.authorityName || permission.authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_OWNER) {} else if (permission.authority.authorityType == _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.AUTHORITY_TYPE_USER) {
        if (!this.containsPermission(data.groups, permission)) data.users.push(permission);
      } else {
        if (!this.containsPermission(data.groups, permission)) data.groups.push(permission);
      }
    }
    return data;
  }
  toVCards(properties) {
    const vcards = [];
    if (properties) {
      for (const p of properties) {
        vcards.push(new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.VCard(p).getDisplayName());
      }
    }
    return vcards;
  }
  containsPermission(permissions, permission) {
    for (const perm of permissions) {
      if (perm.authority.authorityName == permission.authority.authorityName) return true;
    }
    return false;
  }
  resetStats() {
    this.stats.labels = [];
    this.stats.points = [];
    this.statsTotalPoints = null;
  }
  getStats() {
    this.resetStats();
    this.stats.labels.push(this.translate.instant('WORKSPACE.METADATA.USAGE_TYPE.LMS'));
    this.stats.labels.push(this.translate.instant('WORKSPACE.METADATA.USAGE_TYPE.COLLECTION'));
    this.stats.labels.push(this.translate.instant('WORKSPACE.METADATA.USAGE_TYPE.DOWNLOAD'));
    this.stats.labels.push(this.translate.instant('WORKSPACE.METADATA.USAGE_TYPE.VIEW'));
    this.stats.points.push(this.usages.length - this.usagesCollection.getData().length);
    this.stats.points.push(this.usagesCollection.getData().length);
    this.stats.points.push(propertyToNumber(this.nodeObject.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_TRACKING_DOWNLOADS]));
    this.stats.points.push(propertyToNumber(this.nodeObject.properties[_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CCM_PROP_TRACKING_VIEWS]));
    this.statsTotalPoints = this.stats.points.reduce((a, b) => a + b);
    this.drawBarChart();
  }
  drawBarChart() {
    const canvas = this.canvas?.nativeElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    // FontFamily
    // Chart.defaults.global.defaultFontFamily = 'open_sansregular';
    const statsMax = Math.max(...this.stats.points);
    if (!this.stats.labels?.length) {
      return;
    }
    if (this.currentChart) {
      this.currentChart.destroy();
    }
    console.log(this.stats);
    this.currentChart = new chart_js__WEBPACK_IMPORTED_MODULE_7__.Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.stats.labels,
        datasets: [{
          data: this.stats.points,
          backgroundColor: this.stats.colors,
          borderWidth: 0.2
        }]
      },
      options: {
        indexAxis: 'x',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {}
        },
        responsive: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          x: {
            ticks: {
              display: false
            }
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            max: Math.max(Math.round(statsMax * 1.25), 6)
          }
        }
      }
    });
  }
  canEdit() {
    return this.nodeObject && this.nodeObject.access.indexOf(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_WRITE) !== -1;
  }
  staticDataSource(node) {
    return new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeDataSource([node]);
  }
  static #_ = this.ɵfac = function WorkspaceMetadataComponent_Factory(t) {
    return new (t || WorkspaceMetadataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_13__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_3__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_13__.NodeService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestSearchService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestUsageService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: WorkspaceMetadataComponent,
    selectors: [["es-workspace-metadata"]],
    viewQuery: function WorkspaceMetadataComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
      }
    },
    inputs: {
      isAdmin: "isAdmin",
      node: "node"
    },
    outputs: {
      onEditMetadata: "onEditMetadata",
      onDownload: "onDownload",
      onDisplay: "onDisplay",
      onClose: "onClose",
      onRestore: "onRestore"
    },
    ngContentSelectors: _c2,
    decls: 1,
    vars: 1,
    consts: [["class", "main", "data-test", "workspace-sidebar", 4, "ngIf"], ["data-test", "workspace-sidebar", 1, "main"], [1, "header"], ["data-test", "workspace-sidebar-element-name", 1, "name"], [1, "close"], ["mat-icon-button", "", 3, "click"], [1, "material-icons"], [4, "ngIf"], [4, "ngIf", "ngIfElse"], ["standaloneInfoTab", ""], ["infoTab", ""], ["usageTab", ""], ["versionsTab", ""], ["mat-tab-label", ""], [4, "ngTemplateOutlet"], ["esIcon", "info_outline", 3, "aria"], ["esIcon", "equalizer"], ["esIcon", "restore"], [1, "standalone-container"], [1, "content", 3, "node", "onDisplay", "onEditMetadata"], [1, "content", "content-properties"], [1, "description"], ["width", "320", "height", "200"], ["canvas", ""], [1, "statistic-value"], ["class", "point", 4, "ngFor", "ngForOf"], [1, "description", "usage-count"], [1, "usage-counter"], ["class", "description collections", 4, "ngIf"], [3, "dataSource", "columns", "displayType", "elementInteractionType", 4, "ngIf"], ["class", "description forkedParend", 4, "ngIf"], [3, "dataSource", "columns", "checkbox", "displayType", "elementInteractionType", 4, "ngIf"], [1, "point"], [1, "description", "collections"], [3, "dataSource", "columns", "displayType", "elementInteractionType"], [1, "description", "forkedParend"], [3, "dataSource", "columns", "checkbox", "displayType", "elementInteractionType"], [1, "content", "content-versions"], ["class", "center", 4, "ngIf"], ["class", "version", 3, "versionMain", 4, "ngFor", "ngForOf"], [1, "center"], [1, "version"], [1, "versionTitle"], [1, "versionAuthor"], [1, "versionDate"], [1, "versionComment"], [1, "button-actions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [3, "esIcon"], ["mat-flat-button", "", "color", "warn", 3, "disabled", "click", 4, "ngIf"], ["mat-flat-button", "", "color", "warn", 3, "click"]],
    template: function WorkspaceMetadataComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojectionDef"](_c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, WorkspaceMetadataComponent_div_0_Template, 10, 3, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.data);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgTemplateOutlet, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeEntriesWrapperComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatIconButton, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__.MatTabLabel, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__.MatTabGroup, _metadata_block_component__WEBPACK_IMPORTED_MODULE_4__.WorkspaceMetadataBlockComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.FormatDatePipe, _shared_pipes_version_label_pipe__WEBPACK_IMPORTED_MODULE_5__.VersionLabelPipe],
    styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n}\n\n[_nghost-%COMP%]     mat-header-row {\n  display: none;\n}\n\n.main[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.main[_ngcontent-%COMP%]    > es-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 30%;\n}\n\n.mimetype[_ngcontent-%COMP%] {\n  word-break: break-all;\n  padding-left: 5px;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  background-color: #f7f7f7;\n  align-items: center;\n}\n.header[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  font-size: 110%;\n  padding: 10px 15px;\n  word-break: break-all;\n}\n\nmat-tab-group[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n\nmat-tab-group[_ngcontent-%COMP%]     mat-tab-header {\n  background-color: #f7f7f7;\n}\n\n.standalone-container[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.versionTitle[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.versionComment[_ngcontent-%COMP%] {\n  font-style: italic;\n  padding-bottom: 10px;\n}\n\n.versionAuthor[_ngcontent-%COMP%] {\n  line-height: 1.25;\n}\n\n.versionDate[_ngcontent-%COMP%] {\n  color: var(--textLight);\n}\n\n.button-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n\n.content[_ngcontent-%COMP%] {\n  padding: 0 12px;\n}\n\n.content-properties[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 20px 12px;\n}\n\n.content-versions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 20px 12px;\n  gap: 20px;\n}\n\np.description[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 12px;\n}\n\ncanvas[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n\n.statistic-value[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  padding: 0 3px 0 25px;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n}\n.statistic-value[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  float: left;\n  text-align: center;\n  color: #383838;\n  font-weight: bold;\n  font-size: 26px;\n}\n.statistic-value[_ngcontent-%COMP%]   .point[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--textLight);\n  font-size: 20px;\n}\n\n.usage-counter[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.license-value[_ngcontent-%COMP%] {\n  padding-top: 4px;\n  display: flex;\n}\n.license-value[_ngcontent-%COMP%]   .license[_ngcontent-%COMP%] {\n  padding-right: 6px;\n  height: 21px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS9tZXRhZGF0YS9tZXRhZGF0YS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxnRUFBQTtBQ0hBO0VBQ0ksYUFBQTtBQUFKOztBQUlJO0VBQ0ksYUFBQTtBQURSOztBQUlBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQURKO0FBRUk7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FBQVI7O0FBR0E7RUFDSSxxQkFBQTtFQUNBLGlCQUFBO0FBQUo7O0FBRUE7RUFDSSxhQUFBO0VBQ0EseUJEK0IwQjtFQzlCMUIsbUJBQUE7QUFDSjtBQUFJO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FBRVI7O0FBRUE7RUFDSSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkRnQjBCO0FDZjlCOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFDQTtFQUNJLGtCQUFBO0VBQ0Esb0JBQUE7QUFFSjs7QUFBQTtFQUNJLGlCQUFBO0FBR0o7O0FBREE7RUFDSSx1QkQ3Q1E7QUNpRFo7O0FBRkE7RUFDSSxhQUFBO0VBQ0EsU0FBQTtBQUtKOztBQUhBO0VBQ0ksZUFBQTtBQU1KOztBQUhBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFNSjs7QUFIQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtBQU1KOztBQUhBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBTUo7O0FBSEE7RUFDSSxzQkFBQTtBQU1KOztBQUpBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLHNDQUFBO0FBT0o7QUFMSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQU9SO0FBTlE7RUFDSSx1QkQ1RkE7RUM2RkEsZUFBQTtBQVFaOztBQUhBO0VBQ0ksaUJBQUE7QUFNSjs7QUFKQTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtBQU9KO0FBTkk7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFRUiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL2NvcmUtdWktbW9kdWxlL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIHtcbiAgICBtYXQtaGVhZGVyLXJvdyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuLm1haW4ge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgPiBlcy1zcGlubmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi10b3A6IDMwJTtcbiAgICB9XG59XG4ubWltZXR5cGUge1xuICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbn1cbi5oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC5uYW1lIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBmb250LXNpemU6IDExMCU7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgIH1cbn1cblxubWF0LXRhYi1ncm91cCB7XG4gICAgbWluLWhlaWdodDogMDtcbn1cblxubWF0LXRhYi1ncm91cCA6Om5nLWRlZXAgbWF0LXRhYi1oZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ7XG59XG5cbi5zdGFuZGFsb25lLWNvbnRhaW5lciB7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG5cbi52ZXJzaW9uVGl0bGUge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnZlcnNpb25Db21tZW50IHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG4udmVyc2lvbkF1dGhvciB7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjU7XG59XG4udmVyc2lvbkRhdGUge1xuICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xufVxuLmJ1dHRvbi1hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMTBweDtcbn1cbi5jb250ZW50IHtcbiAgICBwYWRkaW5nOiAwIDEycHg7XG59XG5cbi5jb250ZW50LXByb3BlcnRpZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAyMHB4IDEycHg7XG59XG5cbi5jb250ZW50LXZlcnNpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZzogMjBweCAxMnB4O1xuICAgIGdhcDogMjBweDtcbn1cblxucC5kZXNjcmlwdGlvbiB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG5jYW52YXMge1xuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG59XG4uc3RhdGlzdGljLXZhbHVlIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDAgM3B4IDAgMjVweDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcblxuICAgIC5wb2ludCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGNvbG9yOiAjMzgzODM4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZm9udC1zaXplOiAyNnB4O1xuICAgICAgICBpIHtcbiAgICAgICAgICAgIGNvbG9yOiAkdGV4dExpZ2h0O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4udXNhZ2UtY291bnRlciB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ubGljZW5zZS12YWx1ZSB7XG4gICAgcGFkZGluZy10b3A6IDRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC5saWNlbnNlIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogNnB4O1xuICAgICAgICBoZWlnaHQ6IDIxcHg7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}
function propertyToNumber(property) {
  if (property?.length > 0) {
    return parseInt(property[0]);
  } else {
    return 0;
  }
}

/***/ }),

/***/ 82475:
/*!*******************************************************************!*\
  !*** ./src/app/pages/workspace-page/recycle/recycle.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecycleMainComponent: () => (/* binding */ RecycleMainComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../main/navigation/search-field/search-field.service */ 86381);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ 56658);

















const _c0 = ["list"];
const _c1 = ["confirmDeleteDialog"];
const _c2 = ["restoreDialog"];
function RecycleMainComponent_ng_template_2_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "RECYCLE.NO_RESULTS_MESSAGE"), " ");
  }
}
function RecycleMainComponent_ng_template_2_h3_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, "RECYCLE.ARCHIVE_EMPTY"), " ");
  }
}
function RecycleMainComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, RecycleMainComponent_ng_template_2_h3_0_Template, 3, 3, "h3", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, RecycleMainComponent_ng_template_2_h3_1_Template, 3, 3, "h3", 5);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !!ctx_r2.searchQuery);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r2.searchQuery);
  }
}
function RecycleMainComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "form")(4, "div", 7)(5, "mat-checkbox", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function RecycleMainComponent_ng_template_4_Template_mat_checkbox_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r9.skipDeleteConfirmation = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 3, "RECYCLE.DELETE.CONFIRM_MESSAGE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r4.skipDeleteConfirmation);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](7, 5, "RECYCLE.DELETE.NOT_ASK_AGAIN"));
  }
}
function RecycleMainComponent_ng_template_6_div_0_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const result_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", result_r15.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("(", result_r15.message, ")");
  }
}
function RecycleMainComponent_ng_template_6_div_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, RecycleMainComponent_ng_template_6_div_0_div_4_div_1_Template, 4, 2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", result_r15.restoreStatus === "DUPLICATENAME");
  }
}
function RecycleMainComponent_ng_template_6_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, RecycleMainComponent_ng_template_6_div_0_div_4_Template, 2, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const restoreResult_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 2, "RECYCLE.RESTORE.LIST_DUPLICATE_NAMES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", restoreResult_r11.results);
  }
}
function RecycleMainComponent_ng_template_6_div_1_hr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "hr");
  }
}
function RecycleMainComponent_ng_template_6_div_1_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const result_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", result_r21.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("(", result_r21.message, ")");
  }
}
function RecycleMainComponent_ng_template_6_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, RecycleMainComponent_ng_template_6_div_1_div_5_div_1_Template, 4, 2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", result_r21.restoreStatus === "FALLBACK_PARENT_NOT_EXISTS" || result_r21.restoreStatus === "FALLBACK_PARENT_NO_PERMISSION");
  }
}
function RecycleMainComponent_ng_template_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, RecycleMainComponent_ng_template_6_div_1_hr_1_Template, 1, 0, "hr", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, RecycleMainComponent_ng_template_6_div_1_div_5_Template, 2, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const restoreResult_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", restoreResult_r11.hasDuplicateNames);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 3, "RECYCLE.RESTORE.LIST_PARENT_FOLDER_MISSING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", restoreResult_r11.results);
  }
}
function RecycleMainComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, RecycleMainComponent_ng_template_6_div_0_Template, 5, 4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, RecycleMainComponent_ng_template_6_div_1_Template, 6, 5, "div", 9);
  }
  if (rf & 2) {
    const restoreResult_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", restoreResult_r11.hasDuplicateNames);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", restoreResult_r11.hasParentFolderMissing);
  }
}
class RecycleMainComponent {
  loadData(currentQuery, offset, sortBy, sortAscending) {
    return this.archive.search(currentQuery || '*', '', {
      propertyFilter: [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL],
      offset: offset,
      sortBy: [sortBy],
      sortAscending: sortAscending
    });
  }
  constructor(archive, toast, translate, service, searchField, dialogs) {
    this.archive = archive;
    this.toast = toast;
    this.translate = translate;
    this.service = service;
    this.searchField = searchField;
    this.dialogs = dialogs;
    this.NodeEntriesDisplayType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeEntriesDisplayType;
    this.InteractionType = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.InteractionType;
    this.Scope = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.Scope;
    this.dataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeDataSource();
    this.columns = [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItem('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_ARCHIVED_DATE)];
    this.options = {
      useDefaultOptions: false,
      addOptions: []
    };
    this.sort = {
      columns: [new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItemSort('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_NAME), new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ListItemSort('NODE', _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_ARCHIVED_DATE)],
      allowed: true,
      active: _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.CM_ARCHIVED_DATE,
      direction: 'desc'
    };
    this.skipDeleteConfirmation = false;
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
  }
  ngOnInit() {
    const restoreOption = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.OptionItem('RECYCLE.OPTION.RESTORE_SINGLE', 'undo', node => this.restoreSingle(node));
    restoreOption.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.DefaultGroups.Primary;
    const deleteOption = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.OptionItem('RECYCLE.OPTION.DELETE_SINGLE', 'delete', node => this.deleteSingle(node));
    deleteOption.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.DefaultGroups.Primary;
    this.options.addOptions.push(restoreOption);
    this.options.addOptions.push(deleteOption);
    this.options.addOptions.forEach(o => {
      o.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ElementType.Node, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.ElementType.NodePublishedCopy];
    });
    this.searchField.observeCurrentInstance().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.destroyed)).subscribe(instance => instance.onSearchTriggered().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.destroyed)).subscribe(({
      searchString
    }) => {
      this.searchQuery = searchString;
      this.refresh();
    }));
  }
  ngAfterViewInit() {
    this.refresh();
    this.list.initOptionsGenerator({
      actionbar: this.actionbar,
      customOptions: this.options
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  openConfirmDeleteDialog(nodes) {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.skipDeleteConfirmation = false; // reset
      const dialogRef = yield _this.dialogs.openGenericDialog({
        title: 'RECYCLE.DELETE.CONFIRM_TITLE',
        buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__.DELETE_OR_CANCEL,
        closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.Closable.Standard,
        contentTemplate: _this.confirmDeleteDialog,
        nodes
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'YES_DELETE') {
          if (_this.skipDeleteConfirmation) {
            _this.service.set('recycleSkipDeleteConfirmation', true);
          }
          _this.deleteNodesWithoutConfirmation(nodes);
        }
      });
    })();
  }
  restoreFinished(list, restoreResult) {
    this.toast.closeProgressSpinner();
    this.prepareResults(restoreResult);
    if (restoreResult.hasDuplicateNames || restoreResult.hasParentFolderMissing) {
      this.openRestoreDialog(restoreResult);
    }
    if (list.length == 1) {
      this.toast.toast('RECYCLE.TOAST.RESTORE_FINISHED_SINGLE');
    } else {
      this.toast.toast('RECYCLE.TOAST.RESTORE_FINISHED');
    }
    this.refresh();
  }
  openRestoreDialog(restoreResults) {
    void this.dialogs.openGenericDialog({
      title: 'RECYCLE.RESTORE.NEW_LOCATION_TITLE',
      subtitle: 'RECYCLE.RESTORE.NEW_LOCATION_SUBTITLE',
      avatar: {
        kind: 'icon',
        icon: 'undo'
      },
      buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_3__.CLOSE,
      closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_2__.Closable.Standard,
      contentTemplate: this.restoreDialog,
      context: {
        $implicit: restoreResults
      }
    });
  }
  delete() {
    this.deleteNodes(this.list.getSelection().selected);
  }
  deleteSingle(node) {
    if (node == null) {
      this.delete();
      return;
    }
    this.deleteNodes([node]);
  }
  deleteNodesWithoutConfirmation(nodes) {
    this.toast.showProgressSpinner();
    this.archive.delete(nodes).subscribe(() => this.deleteFinished(), error => this.handleErrors(error));
  }
  deleteFinished() {
    this.toast.closeProgressSpinner();
    this.toast.toast('RECYCLE.TOAST.DELETE_FINISHED');
    this.list.getSelection().clear();
    this.refresh();
  }
  deleteNodes(list) {
    if (this.service.get('recycleSkipDeleteConfirmation', false)) {
      this.deleteNodesWithoutConfirmation(list);
      return;
    }
    void this.openConfirmDeleteDialog([...list]);
  }
  restoreNodes(list, toPath = '') {
    // archiveRestore list
    this.toast.showProgressSpinner();
    this.archive.restore(list, toPath).subscribe(result => this.restoreFinished(list, result), error => this.handleErrors(error));
  }
  handleErrors(error) {
    this.toast.error(error);
    this.toast.closeProgressSpinner();
  }
  restoreSingle(node) {
    if (node == null) {
      this.restore();
      return;
    }
    this.restoreNodes([node]);
  }
  restore() {
    this.restoreNodes(this.list.getSelection().selected);
  }
  refresh(event) {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.dataSource.isLoading = true;
      if (event == null) {
        _this2.dataSource.reset();
        _this2.list?.getSelection().clear();
      }
      const result = yield _this2.loadData(_this2.searchQuery, event ? event?.offset || _this2.dataSource.getData().length : 0, _this2.sort.active, _this2.sort.direction === 'asc').toPromise();
      if (event == null) {
        _this2.dataSource.setData(result.nodes, result.pagination);
      } else {
        _this2.dataSource.appendData(result.nodes);
        _this2.dataSource.setPagination(result.pagination);
      }
      _this2.dataSource.isLoading = false;
    })();
  }
  click(event) {
    this.list.getSelection().toggle(event.element);
  }
  updateSort(sort) {
    this.sort = sort;
    this.refresh();
  }
  prepareResults(results) {
    for (const result of results.results) {
      if (result.restoreStatus === 'FINE') {
        continue;
      }
      this.translate.get('RECYCLE.RESTORE.' + result.restoreStatus).subscribe(text => result.message = text);
      if (result.restoreStatus === 'DUPLICATENAME') {
        results.hasDuplicateNames = true;
      }
      if (result.restoreStatus === 'FALLBACK_PARENT_NOT_EXISTS' || result.restoreStatus === 'FALLBACK_PARENT_NO_PERMISSION') {
        results.hasParentFolderMissing = true;
      }
    }
  }
  static #_ = this.ɵfac = function RecycleMainComponent_Factory(t) {
    return new (t || RecycleMainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestArchiveService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_4__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_5__.SearchFieldService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_6__.DialogsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: RecycleMainComponent,
    selectors: [["es-recycle"]],
    viewQuery: function RecycleMainComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.list = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.confirmDeleteDialog = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.restoreDialog = _t.first);
      }
    },
    inputs: {
      actionbar: "actionbar"
    },
    decls: 8,
    vars: 7,
    consts: [[3, "columns", "checkbox", "displayType", "scope", "elementInteractionType", "sort", "dataSource", "sortChange", "clickItem", "fetchData"], ["list", ""], ["empty", ""], ["confirmDeleteDialog", ""], ["restoreDialog", ""], ["class", "empty mat-heading-3", 4, "ngIf"], [1, "empty", "mat-heading-3"], [1, "checkbox"], ["name", "skipDeleteConfirmation", 3, "ngModel", "ngModelChange"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "restore-message"]],
    template: function RecycleMainComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "es-node-entries-wrapper", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("sortChange", function RecycleMainComponent_Template_es_node_entries_wrapper_sortChange_0_listener($event) {
          return ctx.updateSort($event);
        })("clickItem", function RecycleMainComponent_Template_es_node_entries_wrapper_clickItem_0_listener($event) {
          return ctx.click($event);
        })("fetchData", function RecycleMainComponent_Template_es_node_entries_wrapper_fetchData_0_listener($event) {
          return ctx.refresh($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, RecycleMainComponent_ng_template_2_Template, 2, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, RecycleMainComponent_ng_template_4_Template, 8, 7, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, RecycleMainComponent_ng_template_6_Template, 2, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("columns", ctx.columns)("checkbox", true)("displayType", ctx.NodeEntriesDisplayType.Table)("scope", ctx.Scope.WorkspaceList)("elementInteractionType", ctx.InteractionType.Emitter)("sort", ctx.sort)("dataSource", ctx.dataSource);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeEntriesWrapperComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgForm, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckbox, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
    styles: [".empty[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n\n.restore-message[_ngcontent-%COMP%] {\n  color: #500;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvd29ya3NwYWNlLXBhZ2UvcmVjeWNsZS9yZWN5Y2xlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi5lbXB0eSB7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5yZXN0b3JlLW1lc3NhZ2Uge1xuICAgIGNvbG9yOiAjNTAwO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 50954:
/*!*********************************************************************!*\
  !*** ./src/app/pages/workspace-page/sub-tree/sub-tree.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspaceSubTreeComponent: () => (/* binding */ WorkspaceSubTreeComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 89718);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core-module/rest/helper */ 64634);
/* harmony import */ var _workspace_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../workspace-utils */ 58164);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 8815);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 78128);
/* harmony import */ var _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/spinner-small/spinner-small.component */ 65928);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 21916);


















const _c0 = ["dropdown"];
const _c1 = ["dropdownTrigger"];
function WorkspaceSubTreeComponent_div_5_div_1_i_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i", 17);
  }
}
function WorkspaceSubTreeComponent_div_5_div_1_i_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i", 18);
  }
}
function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "es-workspace-sub-tree", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("onLoading", function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template_es_workspace_sub_tree_onLoading_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const i_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().index;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r12.setLoadingState($event, i_r8));
    })("onUpdateOptions", function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template_es_workspace_sub_tree_onUpdateOptions_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r15.updateOptions($event));
    })("hasChildren", function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template_es_workspace_sub_tree_hasChildren_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const node_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r16._hasChildren[node_r7.ref.id] = $event);
    })("onClick", function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template_es_workspace_sub_tree_onClick_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r18.openPathEvent($event));
    })("onDrop", function WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template_es_workspace_sub_tree_onDrop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r19.dropToParent($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const node_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("node", node_r7.ref.id)("currentPath", ctx_r11.currentPath)("depth", ctx_r11.depth + 1);
  }
}
const _c2 = function (a0) {
  return [a0];
};
function WorkspaceSubTreeComponent_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("contextmenu", function WorkspaceSubTreeComponent_div_5_div_1_Template_div_contextmenu_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const node_r7 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r21.contextMenu($event, node_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("nodeDropped", function WorkspaceSubTreeComponent_div_5_div_1_Template_div_nodeDropped_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r23.onDropped($event));
    })("click", function WorkspaceSubTreeComponent_div_5_div_1_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const node_r7 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r24.openOrCloseNode(node_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WorkspaceSubTreeComponent_div_5_div_1_Template_button_click_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const node_r7 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r25.toggleNodeExpansion($event, node_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, WorkspaceSubTreeComponent_div_5_div_1_i_4_Template, 1, 0, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, WorkspaceSubTreeComponent_div_5_div_1_i_5_Template, 1, 0, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "esNodeIcon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, WorkspaceSubTreeComponent_div_5_div_1_es_workspace_sub_tree_11_Template, 1, 3, "es-workspace-sub-tree", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const node_r7 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("padding-left", (ctx_r4.depth + 1) * 20, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("sub-tree-element-selected", ctx_r4.isSelected(node_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("cdkDragDisabled", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 16, ctx_r4.ui.isTouchSubject))("cdkDragData", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](22, _c2, node_r7))("esNodesDropTarget", node_r7)("canDropNodes", ctx_r4.canDropOnNode);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("opacity-invisible", ctx_r4._hasChildren[node_r7.ref.id] === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r4.isOpen(node_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.isOpen(node_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 18, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 20, node_r7)), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("alt", node_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](node_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.isOpen(node_r7));
  }
}
const _c3 = function (a0) {
  return {
    count: a0
  };
};
function WorkspaceSubTreeComponent_div_5_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function WorkspaceSubTreeComponent_div_5_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r26.loadAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("margin-left", 50 + ctx_r5.depth * 20, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](2, 3, "WORKSPACE.TREE_MORE_ITEMS", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](6, _c3, ctx_r5.moreItems)), " ");
  }
}
function WorkspaceSubTreeComponent_div_5_es_spinner_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "es-spinner", 21);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("margin-left", 50 + ctx_r6.depth * 20, "px");
  }
}
function WorkspaceSubTreeComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, WorkspaceSubTreeComponent_div_5_div_1_Template, 12, 24, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, WorkspaceSubTreeComponent_div_5_button_2_Template, 3, 8, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, WorkspaceSubTreeComponent_div_5_es_spinner_3_Template, 1, 2, "es-spinner", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@open", ctx_r2._nodes && ctx_r2._nodes.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2._nodes);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.moreItems > 0 && !ctx_r2.loadingMore);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.loadingMore);
  }
}
function WorkspaceSubTreeComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "es-spinner-small");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class WorkspaceSubTreeComponent {
  static #_ = this.MAX_FOLDER_COUNT = 100;
  /** Parent hierarchy of the currently selected node. */
  get currentPath() {
    return this._currentPath;
  }
  set currentPath(value) {
    this._currentPath = value;
    this.expandCurrentPath();
  }
  /** The node rendered by this sub tree. */
  set node(node) {
    this._node = node;
    if (node == null) {
      return;
    }
    this.refresh();
  }
  constructor(nodeApi, optionsService, localEvents, ui) {
    this.nodeApi = nodeApi;
    this.optionsService = optionsService;
    this.localEvents = localEvents;
    this.ui = ui;
    this._currentPath = [];
    this.depth = 0;
    this.onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.onLoading = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.onDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.hasChildren = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.onUpdateOptions = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.loading = true;
    this._hasChildren = {};
    this.loadingStates = [];
    /** IDs of child nodes of the node rendered by this sub tree, that should be expanded. */
    this.expandedNodes = [];
    this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.canDropOnNode = _workspace_utils__WEBPACK_IMPORTED_MODULE_2__.canDropOnNode;
  }
  ngOnInit() {
    rxjs__WEBPACK_IMPORTED_MODULE_6__.merge(this.localEvents.nodesChanged, this.localEvents.nodesDeleted).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.destroyed)).subscribe(nodes => {
      const nodeIds = this._nodes.map(node => node.ref.id);
      if (nodes.some(node => nodeIds.includes(node.ref.id))) {
        this.refresh();
      }
    });
  }
  /**
   * Resets expanded nodes to the parent hierarchy of the currently selected node.
   */
  expandCurrentPath() {
    const currentChildNode = this._nodes?.find(node => node.ref.id === this.currentPath[this.depth]);
    if (currentChildNode) {
      this.expandedNodes = [currentChildNode.ref.id];
    }
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  setLoadingState(state, pos) {
    this.loadingStates[pos] = state;
  }
  optionIsShown(optionItem, node) {
    if (optionItem.showCallback) {
      return optionItem.showCallback(node);
    }
    return true;
  }
  loadAll() {
    this.loadingMore = true;
    this.nodeApi.getChildren(this._node, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.FILTER_FOLDERS], {
      offset: this._nodes.length,
      count: _core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.COUNT_UNLIMITED
    }).subscribe(data => {
      this.loadingMore = false;
      this._nodes = this._nodes.concat(data.nodes);
      this.moreItems = 0;
    });
  }
  contextMenu(event, node) {
    event.preventDefault();
    event.stopPropagation();
    this.showDropdown(event, node);
  }
  updateOptions(event) {
    this.onUpdateOptions.emit(event);
  }
  showDropdown(event, node) {
    //if(this._options==null || this._options.length<1)
    //  return;
    this.dropdownLeft = event.clientX + 'px';
    this.dropdownTop = event.clientY + 'px';
    this.optionsService.setData({
      activeObjects: [node],
      scope: ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.Scope.WorkspaceTree
    });
    this.optionsService.initComponents(null, null, this.dropdown);
    this.optionsService.refreshComponents();
    this.dropdownTrigger.openMenu();
  }
  dropToParent(event) {
    this.onDrop.emit(event);
  }
  isSelected(node) {
    return this.currentPath[this.currentPath.length - 1] === node.ref.id;
  }
  openPathEvent(node) {
    this.onClick.emit(node);
  }
  isOpen(node) {
    return this.expandedNodes.includes(node.ref.id);
  }
  openOrCloseNode(node) {
    this.onClick.emit(node);
  }
  toggleNodeExpansion(event, node) {
    if (this._hasChildren[node.ref.id] === false) {
      return;
    }
    event.stopPropagation();
    const index = this.expandedNodes.indexOf(node.ref.id);
    if (index < 0) {
      this.expandedNodes.push(node.ref.id);
    } else {
      this.expandedNodes.splice(index, 1);
    }
  }
  refresh() {
    if (!this._node) return;
    this.nodeApi.getChildren(this._node, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestConstants.FILTER_FOLDERS], {
      count: WorkspaceSubTreeComponent.MAX_FOLDER_COUNT
    }).subscribe(data => {
      this._nodes = data.nodes;
      this.moreItems = data.pagination.total - data.pagination.count;
      this.loadingStates = _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_1__.Helper.initArray(this._nodes.length, true);
      this.hasChildren.emit(this._nodes?.length > 0);
      this.onLoading.emit(false);
      this.loading = false;
      this.expandCurrentPath();
    });
  }
  onDropped(dragData) {
    this.onDrop.emit({
      target: dragData.target,
      source: {
        element: dragData.draggedNodes,
        mode: dragData.action
      }
    });
  }
  static #_2 = this.ɵfac = function WorkspaceSubTreeComponent_Factory(t) {
    return new (t || WorkspaceSubTreeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.OptionsHelperDataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_0__.UIService));
  };
  static #_3 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: WorkspaceSubTreeComponent,
    selectors: [["es-workspace-sub-tree"]],
    viewQuery: function WorkspaceSubTreeComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.dropdown = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.dropdownTrigger = _t.first);
      }
    },
    inputs: {
      currentPath: "currentPath",
      depth: "depth",
      node: "node"
    },
    outputs: {
      onClick: "onClick",
      onLoading: "onLoading",
      onDrop: "onDrop",
      hasChildren: "hasChildren",
      onUpdateOptions: "onUpdateOptions"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.OptionsHelperDataService])],
    decls: 7,
    vars: 7,
    consts: [[1, "sub-tree-wrapper"], ["dropdown", ""], ["mat-button", "", "tabindex", "-1", "aria-hidden", "true", 1, "dropdown-dummy", 3, "matMenuTriggerFor"], ["dropdownTrigger", "matMenuTrigger"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [3, "contextmenu", 4, "ngFor", "ngForOf"], ["mat-flat-button", "", "color", "primary", "class", "more-items", 3, "marginLeft", "click", 4, "ngIf"], ["class", "more-items-loading", 3, "marginLeft", 4, "ngIf"], [3, "contextmenu"], ["cdkDrag", "", "esNodesDrag", "", 1, "sub-tree-element", 3, "cdkDragDisabled", "cdkDragData", "esNodesDropTarget", "canDropNodes", "nodeDropped", "click"], [1, "expand-toggle", 3, "click"], ["esIcon", "keyboard_arrow_right", 4, "ngIf"], ["esIcon", "keyboard_arrow_down", 4, "ngIf"], [1, "node-icon", 3, "src", "alt"], [1, "name"], ["class", "sub-tree", 3, "node", "currentPath", "depth", "onLoading", "onUpdateOptions", "hasChildren", "onClick", "onDrop", 4, "ngIf"], ["esIcon", "keyboard_arrow_right"], ["esIcon", "keyboard_arrow_down"], [1, "sub-tree", 3, "node", "currentPath", "depth", "onLoading", "onUpdateOptions", "hasChildren", "onClick", "onDrop"], ["mat-flat-button", "", "color", "primary", 1, "more-items", 3, "click"], [1, "more-items-loading"], [1, "spinner"]],
    template: function WorkspaceSubTreeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "es-dropdown", null, 1)(3, "button", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, WorkspaceSubTreeComponent_div_5_Template, 4, 4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, WorkspaceSubTreeComponent_div_6_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("left", ctx.dropdownLeft)("top", ctx.dropdownTop);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matMenuTriggerFor", _r0.menu);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx._nodes && ctx._nodes.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_10__.CdkDrag, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.DropdownComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.SpinnerComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodesDragDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodesDropTargetDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _shared_components_spinner_small_spinner_small_component__WEBPACK_IMPORTED_MODULE_3__.SpinnerSmallComponent, WorkspaceSubTreeComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.NodeIconPipe],
    styles: ["\n\n.dropdown-dummy[_ngcontent-%COMP%] {\n  position: fixed;\n}\n\n.sub-tree-element[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  white-space: nowrap;\n  margin: 4px 0;\n}\n.sub-tree-element.cdk-drag-preview[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n[_nghost-%COMP%]     es-spinner-small .preloader-wrapper.small {\n  width: 14px;\n  height: 14px;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -48px;\n  right: 0;\n  z-index: 10;\n  padding: 10px;\n}\n\n.expand-toggle[_ngcontent-%COMP%] {\n  background: unset;\n  border: unset;\n  padding: unset;\n  display: flex;\n  align-items: center;\n  color: var(--textLight);\n  flex-shrink: 0;\n  width: 25px;\n}\n\n.moreOpen[_ngcontent-%COMP%] {\n  left: 30px;\n  width: 240px;\n}\n\n.sub-tree-element[_ngcontent-%COMP%]:hover {\n  background-color: #fff;\n}\n\n.sub-tree-element-selected[_ngcontent-%COMP%] {\n  background-color: #fff !important;\n  background: linear-gradient(to right, var(--primary) 0, var(--primary) 5px, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 0) 5px);\n  font-weight: bold;\n}\n\n.name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow: hidden;\n  -webkit-mask-image: linear-gradient(to left, transparent 0 18px, black 60px);\n          mask-image: linear-gradient(to left, transparent 0 18px, black 60px);\n}\n\n.node-icon[_ngcontent-%COMP%] {\n  padding-right: 10px;\n  width: 30px;\n  height: 20px; \n\n}\n\n.sub-tree-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.empty[_ngcontent-%COMP%] {\n  font-style: italic;\n  padding-top: 10px;\n}\n\n.more-items[_ngcontent-%COMP%] {\n  color: var(--primary);\n  background-color: transparent;\n}\n\n.more-items-loading[_ngcontent-%COMP%] {\n  position: relative;\n  top: -15px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS9zdWItdHJlZS9zdWItdHJlZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvbWl4aW5zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2NvcmUtdWktbW9kdWxlL3N0eWxlcy9icmFuZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDRkE7RUFDSSxlQUFBO0FBREo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUNQQSxlQUFBO0VBQ0EseUJBQUE7RUFHQSxpQkFBQTtFQUNBLHdDQUFBO0VESUEsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUtKO0FBSkk7RUFDSSxzQkRpQzBCO0FDM0JsQzs7QUFESTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBSVI7O0FBQUE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QUFHSjs7QUFEQTtFRThESSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VGOURBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCRHJCUTtFQ3NCUixjQUFBO0VBQ0EsV0FBQTtBQU1KOztBQUpBO0VBQ0ksVUFBQTtFQUNBLFlEaUJlO0FDVm5COztBQUxBO0VBQ0ksc0JERThCO0FDTWxDOztBQU5BO0VBQ0ksaUNBQUE7RUFDQSx1SERDb0M7RUNBcEMsaUJBQUE7QUFTSjs7QUFQQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLDRFQUFBO1VBQUEsb0VBQUE7QUFVSjs7QUFSQTtFQUNJLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUEsRUFBQSxXQUFBO0FBV0o7O0FBVEE7RUFDSSxrQkFBQTtBQVlKOztBQVZBO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtBQWFKOztBQVhBO0VBQ0kscUJHdkVNO0VId0VOLDZCQUFBO0FBY0o7O0FBWkE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7QUFlSiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6Y29sb3InO1xuQGltcG9ydCAnYnJhbmRpbmcnO1xuXG4vLyBBbGwgdmFyaWFibGVzIGNhbiBiZSBvdmVycmlkZGVuIGluIGBicmFuZGluZy5zY3NzYC5cbi8qIHJlcGxhY2UgdmFyaWFibGVzIHdoaWNoIGFyZSBtYXkgbm90IGRlZmluZWQgaW4gdGhlIGJyYW5kaW5nICovXG4kcHJpbWFyeVZlcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiRwcmltYXJ5TWVkaXVtRGFyazogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTcwMCkgIWRlZmF1bHQ7XG5cbiR0YWJDb2xvcjogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JEYXJrOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckxpZ2h0OiAkcHJpbWFyeU1lZGl1bUxpZ2h0ICFkZWZhdWx0O1xuJHdhcm5pbmc6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kd2FybmluZ01lZGl1bTogI2U5OGMxYiAhZGVmYXVsdDtcbiR0b2FzdExlZnRFcnJvcjogI2MxNWQ1ZCAhZGVmYXVsdDtcbiR0b2FzdFByaW1hcnk6ICMzMzMzMzMgIWRlZmF1bHQ7XG4kdGV4dExpZ2h0OiB2YXIoLS10ZXh0TGlnaHQpICFkZWZhdWx0O1xuJHRleHRNZWRpdW1MaWdodDogdmFyKC0tdGV4dE1lZGl1bUxpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0VmVyeUxpZ2h0OiAjYWFhICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLXRleHRNYWluKVxuJHRleHRNYWluOiAjMzgzODM4ICFkZWZhdWx0O1xuJHRleHRSZW5kZXJpbmdMYWJlbHM6ICM2ZjZmNmYgIWRlZmF1bHQ7XG4kZm9udFNpemVYTGFyZ2U6IDEyMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVMYXJnZTogMTEwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVNtYWxsOiA5MCUgIWRlZmF1bHQ7XG4kZm9udFNpemVYU21hbGw6IHZhcigtLWZvbnRTaXplWFNtYWxsKSAhZGVmYXVsdDtcbiRiYWNrZ3JvdW5kQ29sb3I6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2lkZWJhcldpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VJbmhlcml0Q29sb3I6ICM0MmNhOGQgIWRlZmF1bHQ7XG4kZWRpdG9yaWFsQ29sbGVjdGlvbnNCYWNrZ3JvdW5kOiAjZjVlYzE5ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6ICRwcmltYXJ5VmVyeUxpZ2h0ICFkZWZhdWx0O1xuJGl0ZW1TZWxlY3RlZFRleHRDb2xvcjogJHByaW1hcnlNZWRpdW1EYXJrICFkZWZhdWx0O1xuJGJ1dHRvbkhvdmVyQmFja2dyb3VuZDogcmdiYSh2YXIoLS1wYWxldHRlLXByaW1hcnktNTAwLW5vLXJnYiksIDAuMDgpICFkZWZhdWx0O1xuJHdvcmtzcGFjZU5ld0JhY2tncm91bmQ6ICRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kICFkZWZhdWx0O1xuLy8gdGhlIHdoaXRlIGJhciBoZWlnaHQgaW4gc2VhcmNoIGFuZCBlcy13b3Jrc3BhY2VcbiRzZWNvbmRhcnlCYXJIZWlnaHQ6IDY1cHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1TZWxlY3RlZEJhY2tncm91bmQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgICAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuICAgIClcbiAgICBuby1yZXBlYXQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFyU2FmZUJhY2tncm91bmQ6ICM5NjNhM2E7XG4kZGlhbG9nUmlnaHRXaWR0aDogMzIwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0OiAkc2Vjb25kYXJ5QmFySGVpZ2h0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byByaWdodCxcbiAgICB2YXIoLS1wcmltYXJ5KSAwLFxuICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDApIDVweFxuKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VNZXRhZGF0YUJhY2tncm91bmQ6ICNmN2Y3ZjcgIWRlZmF1bHQ7XG4kYnV0dG9uQm9yZGVyUmFkaXVzOiAycHggIWRlZmF1bHQ7XG4kY29udGV4dE1lbnVXaWR0aDogMjQwcHggIWRlZmF1bHQ7XG4kdGFibGVJY29uU2l6ZTogMzhweCAhZGVmYXVsdDtcbiRhY3Rpb25EaWFsb2dCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJGNhcmRMaWdodEJhY2tncm91bmQ6ICNmOWY5ZjkgIWRlZmF1bHQ7XG4kc2VhcmNoSW5wdXRCb3JkZXJDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRjYXJkU2VwYXJhdG9yTGluZUNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGdlbmVyaWNTZXBlcmF0b3JMaW5lQ29sb3I6ICNlY2VjZWMgIWRlZmF1bHQ7XG4kaW5wdXRCb3JkZXJDb2xvcjogIzllOWU5ZSAhZGVmYXVsdDtcbiRjb21tZW50c0FjdGlvbnNTZXBlcmF0b3JMaW5lQ29sb3I6ICRiYWNrZ3JvdW5kQ29sb3IgIWRlZmF1bHQ7XG4kbm9SZXN1bHRzQ29sb3I6IHJnYmEoYmxhY2ssIDAuNTQpICFkZWZhdWx0O1xuJGRhcmtlbkNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpICFkZWZhdWx0O1xuJGRhcmtlbkxpZ2h0Q29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tJGNvbG9yU3RhdHVzUG9zaXRpdmUpXG4kY29sb3JTdGF0dXNQb3NpdGl2ZTogIzQwYmY4ZSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1jb2xvclN0YXR1c05lZ2F0aXZlKVxuJGNvbG9yU3RhdHVzTmVnYXRpdmU6ICNjZDI0NTcgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNXYXJuaW5nOiAkd2FybmluZ01lZGl1bSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1JlY29tbWVuZGVkOiAjYWNkMzMxICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzTmV1dHJhbDogIzc3NyAhZGVmYXVsdDtcbiRjb2xvclN0YXJBY3RpdmU6IHZhcigtLWNvbG9yU3RhckFjdGl2ZSkgIWRlZmF1bHQ7XG4kZm9jdXNDb2xvcjogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCkgIWRlZmF1bHQ7XG4kcGxhY2Vob2xkZXJDb2xvcjogIzc2NzY3NiAhZGVmYXVsdDtcbiRmb2N1c1dpZHRoOiAycHggIWRlZmF1bHQ7XG4kY2FyZFdpZHRoOiB2YXIoLS1jYXJkV2lkdGgpICFkZWZhdWx0O1xuJGNhcmRIZWlnaHQ6IDMwMHB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtSGVpZ2h0OiA3MHB4ICFkZWZhdWx0O1xuJGxpc3RDYXJkU21hbGxIZWlnaHQ6IDEwMHB4ICFkZWZhdWx0O1xuJGxpc3RIZWFkaW5nSGVpZ2h0OiAzNnB4ICFkZWZhdWx0O1xuJGNhcmRQYWRkaW5nOiAyNXB4ICFkZWZhdWx0O1xuJHRyYW5zaXRpb25Ob3JtYWw6IHZhcigtLXRyYW5zaXRpb25Ob3JtYWwpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVdpZHRoKVxuJG1vYmlsZVdpZHRoOiA3MDBweCAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVTdGFnZSlcbiRtb2JpbGVTdGFnZTogMTAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0OiA3NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRXaXRoS2V5Ym9hcmQ6IDU1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodExhbmRzY2FwZTogNDAwcHggIWRlZmF1bHQ7XG4kbW9iaWxlV2lkdGhQb3J0cmFpdDogNDAwcHggIWRlZmF1bHQ7XG4vLyB0aGlzIGZhY3RvciBzaG91bGQgYmUgbXVsdGlwbGllZCBieSBhIG5hdHVyYWwgbnVtYmVyLCBlLmcuICozIG1lYW5zIHN0YWdlIDMgKHJlbGF0aXZlbHkgZWFybHkpXG4kZGlhbG9nWkluZGV4OiAxMzAgIWRlZmF1bHQ7XG4vLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJGRpYWxvZ05vbk1vZGFsWkluZGV4OiA5MCAhZGVmYXVsdDsgLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiR0b3BCYXJaSW5kZXg6IDk4ICFkZWZhdWx0O1xuJHRvcEJhck1vYmlsZVpJbmRleDogODAgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRCYWNrZ3JvdW5kOiAjZWVlICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0VGV4dDogJHRleHRNYWluICFkZWZhdWx0O1xuJG1vYmlsZVRhYnNaSW5kZXg6IDExMCAhZGVmYXVsdDtcbiRtb2JpbGVUYWJTd2l0Y2hXaWR0aDogJG1vYmlsZVdpZHRoICsgJG1vYmlsZVN0YWdlICogMiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJOYXZIZWlnaHQ6IDYycHggIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRGYW1pbHk6ICdvcGVuX3NhbnNyZWd1bGFyJyAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udFNpemU6IDEwcHQgIWRlZmF1bHQ7XG5cbiRkZWZhdWx0LWNoaXAtY29sb3JzOiAoXG4gICAgJ2NjbG9tX2dlbmVyYWxfa2V5d29yZCc6IHJnYigxNjYsIDIxNCwgMjA4KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsY29udGV4dCc6IHJnYigyMTQsIDE2NiwgMTY2KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsbGVhcm5pbmdyZXNvdXJjZXR5cGUnOiByZ2IoMjE0LCAxOTMsIDE2NiksXG4gICAgJ2NjbV9vYmplY3R0eXBlJzogcmdiKDE2NiwgMTkyLCAyMTQpLFxuICAgICdjY21fdGF4b25pZCc6IHJnYigxNjYsIDIxNCwgMTc0KSxcbiAgICAnY2NtX2VkdWNhdGlvbmFsaW50ZW5kZWRlbmR1c2Vycm9sZSc6IHJnYigyMTEsIDIxNCwgMTY2KSxcbik7XG4kY3VzdG9tLWNoaXAtY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjaGlwLWNvbG9yczogbWFwLm1lcmdlKCRkZWZhdWx0LWNoaXAtY29sb3JzLCAkY3VzdG9tLWNoaXAtY29sb3JzKTtcblxuQGltcG9ydCAnbWl4aW5zJztcbiIsIkB1c2UgJ3Nhc3M6bWF0aCc7XG5AaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLmRyb3Bkb3duLWR1bW15IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG59XG4uc3ViLXRyZWUtZWxlbWVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIEBpbmNsdWRlIGNsaWNrYWJsZSgpO1xuICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgbWFyZ2luOiA0cHggMDtcbiAgICAmLmNkay1kcmFnLXByZXZpZXcge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZDtcbiAgICB9XG59XG5cbjpob3N0IDo6bmctZGVlcCB7XG4gICAgZXMtc3Bpbm5lci1zbWFsbCAucHJlbG9hZGVyLXdyYXBwZXIuc21hbGwge1xuICAgICAgICB3aWR0aDogMTRweDtcbiAgICAgICAgaGVpZ2h0OiAxNHB4O1xuICAgIH1cbn1cblxuLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC00OHB4O1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IDEwO1xuICAgIHBhZGRpbmc6IDEwcHg7XG59XG4uZXhwYW5kLXRvZ2dsZSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlQnV0dG9uRGVmYXVsdFN0eWxlcygpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICB3aWR0aDogMjVweDtcbn1cbi5tb3JlT3BlbiB7XG4gICAgbGVmdDogbWF0aC5kaXYoJHdvcmtzcGFjZVNpZGViYXJXaWR0aCAtICRjb250ZXh0TWVudVdpZHRoLCAyKTtcbiAgICB3aWR0aDogJGNvbnRleHRNZW51V2lkdGg7XG59XG4uc3ViLXRyZWUtZWxlbWVudDpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ7XG59XG4uc3ViLXRyZWUtZWxlbWVudC1zZWxlY3RlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiAkd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5uYW1lIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXNrLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gbGVmdCwgdHJhbnNwYXJlbnQgMCAxOHB4LCBibGFjayA2MHB4KTtcbn1cbi5ub2RlLWljb24ge1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAyMHB4OyAvKiBpZSBmaXggKi9cbn1cbi5zdWItdHJlZS13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uZW1wdHkge1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbn1cbi5tb3JlLWl0ZW1zIHtcbiAgICBjb2xvcjogJHByaW1hcnk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubW9yZS1pdGVtcy1sb2FkaW5nIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMTVweDtcbn1cbiIsIkBtaXhpbiBjbGlja2FibGUoKSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbkBtaXhpbiBsaW1pdExpbmVDb3VudCgkY291bnQsICRsaW5lSGVpZ2h0OiAxKSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBsaW5lLWhlaWdodDogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICBtYXgtaGVpZ2h0OiAkY291bnQgKiAkbGluZUhlaWdodCArIGVtO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogJGNvdW50OyAvKiBudW1iZXIgb2YgbGluZXMgdG8gc2hvdyAqL1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLyogYXV0b3ByZWZpeGVyOiBvZmYgKi9cbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvdygkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93Qm90dG9tKCRvcGFjaXR5OiAwLjEpIHtcbiAgICBib3gtc2hhZG93OiAwIDNweCAzcHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dTbWFsbCgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93TWVkaXVtTGFyZ2UoJGltcG9ydGFudDogZmFsc2UsICRvcGFjaXR5OiAwLjYpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNjcm9sbGJhcigpIHtcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgbWF4LXdpZHRoOiAyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAvLyAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwuMyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIH1cbn1cbkBtaXhpbiByZW1vdmVEZWZhdWx0Rm9jdXMoKSB7XG4gICAgb3V0bGluZTogbm9uZTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxLZXlib2FyZEZvY3VzKCRtb2RlOiAnb3V0bGluZScpIHtcbiAgICAvL3Jlc3BlY3QgZWxlbWVudCBib3JkZXIgcmFkaXVzXG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgQGlmICRtb2RlPT0gJ291dGxpbmUnIHtcbiAgICAgICAgb3V0bGluZTogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgfSBAZWxzZSBpZiAkbW9kZT09ICdib3JkZXInIHtcbiAgICAgICAgYm9yZGVyOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICB9XG59XG4vLyBBcHBseSB0aGUgY29udGVudCBzdHlsZXMgaW4gY29udHJhc3QgbW9kZS4gVGhpcyBpcyBqdXN0IGVub3VnaCBjb250cmFzdCB0byBiZSBXQ0FHIGNvbXBsaWVudCAtLS1cbi8vIG5vdCBhIGhpZ2gtY29udHJhc3QgbW9kZS5cbi8vXG4vLyBDYWxsIHdpdGhvdXQgYXJndW1lbnRzIGZvciB1c2UgaW4gZW5jYXBzdWxhdGVkIGNvbXBvbmVudCBzdHlsZXMsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlIHtcbi8vICAgICAgICAgLy8gU3R5bGVzIHRvIGFwcGx5IGluIGNvbnRyYXN0IG1vZGVcbi8vICAgICB9XG4vLyBUbyB1cyBpbiBnbG9iYWwgY29udGV4dCwgcGFzcyAnZ2xvYmFsJyBhcyBmaXJzdCBhcmd1bWVudCwgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUoZ2xvYmFsKSB7IC8qIC4uLiAqLyB9XG5AbWl4aW4gY29udHJhc3RNb2RlKCRzY29wZTogZW5jYXBzdWxhdGVkKSB7XG4gICAgJGNvbnRyYXN0TW9kZVNlbGVjdG9yOiAnYm9keS5lcy1jb250cmFzdC1tb2RlJztcbiAgICBAaWYgJHNjb3BlID09IGVuY2Fwc3VsYXRlZCB7XG4gICAgICAgIDpob3N0LWNvbnRleHQoI3skY29udHJhc3RNb2RlU2VsZWN0b3J9KSAmIHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSBpZiAkc2NvcGUgPT0gZ2xvYmFsIHtcbiAgICAgICAgI3tpZigmLCAnI3skY29udHJhc3RNb2RlU2VsZWN0b3J9ICYnLCAkY29udHJhc3RNb2RlU2VsZWN0b3IpfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgICBAZXJyb3IgXCJJbnZhbGlkIHNjb3BlICN7JHNjb3BlfS5cIjtcbiAgICB9XG59XG5AbWl4aW4gYmx1ckltYWdlKCRibHVyU3RyZW5ndGg6IDI1cHgpIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHRvcDogLSRibHVyU3RyZW5ndGggKiAyO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgKyAjeyRibHVyU3RyZW5ndGggKiA0fSk7XG4gICAgei1pbmRleDogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZpbHRlcjogYmx1cigkYmx1clN0cmVuZ3RoKTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvcGFjaXR5OiAwLjc7XG59XG4iLCJAbWl4aW4gaW1hZ2VEaXNhYmxlZEJsdXIoKSB7XG4gICAgLXdlYmtpdC1maWx0ZXI6IGJsdXIoM3B4KTtcbiAgICBmaWx0ZXI6IGJsdXIoM3B4KTtcbn1cbkBtaXhpbiBzaG9ydGVuVGV4dCgpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dMYXJnZSgkaW1wb3J0YW50OiBmYWxzZSkge1xuICAgIGJveC1zaGFkb3c6IDAgMTBweCA3MHB4IHJnYmEoMCwgMCwgMCwgMC4xNSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbGltaXRMaW5lTGVuZ3RoKCR3aWR0aCkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBtYXgtd2lkdGg6ICR3aWR0aDtcbn1cbkBtaXhpbiB1bnNlbGVjdGFibGVUZXh0KCkge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbkBtaXhpbiBpb3NTY3JvbGxpbmcoKSB7XG4gICAgLyogaW9zIHNjcm9sbGluZyBmaXggKi9cbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG59XG5AbWl4aW4gcGxhY2Vob2xkZXIge1xuICAgIDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgICA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG4gICAgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBtaXhpbiBzZXRHbG9iYWxJbnNldEZvY3VzKCkge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAkZm9jdXNXaWR0aCAkZm9jdXNDb2xvciAhaW1wb3J0YW50O1xuICAgIEBtZWRpYSAocG9pbnRlcjogY29hcnNlKSB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnLCAkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6ICRmb2N1c1dpZHRoIHNvbGlkICRjb2xvcjtcbiAgICB9XG59XG5AbWl4aW4gc2V0R2xvYmFsRGFzaGVkRm9jdXMoKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgb3V0bGluZTogJGZvY3VzV2lkdGggZGFzaGVkICRmb2N1c0NvbG9yO1xufVxuXG5AbWl4aW4gZm9jdXNTaGFkb3coJGRhcms6IHRydWUsICRzdHJlbmd0aDogMC4xKSB7XG4gICAgQGluY2x1ZGUgcmVtb3ZlRGVmYXVsdEZvY3VzKCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBAaWYgJGRhcms9PXRydWUge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgIH0gQGVsc2Uge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAkc3RyZW5ndGgpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIH1cbn1cbkBtaXhpbiBkYXJrZW4oKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRhcmtlbkNvbG9yO1xufVxuQG1peGluIGRhcmtlbkxpZ2h0KCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrZW5MaWdodENvbG9yO1xufVxuQG1peGluIGJsdXJCYWNrZ3JvdW5kKCRyYWRpdXM6IDVweCkge1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigkcmFkaXVzKTtcbn1cbkBtaXhpbiBzZXRHbG9iYWxGb2N1cygkY29sb3I6ICRmb2N1c0NvbG9yKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwICRmb2N1c1dpZHRoICRjb2xvciAhaW1wb3J0YW50O1xufVxuXG5AbWl4aW4gcmVtb3ZlQnV0dG9uRGVmYXVsdFN0eWxlcyB7XG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XG4gICAgYm9yZGVyOiB1bnNldDtcbiAgICBwYWRkaW5nOiB1bnNldDtcbn1cblxuQG1peGluIGFmdGVyUHNldWRvRWxlbWVudCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbkBpbXBvcnQgJ3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucyc7XG4iLCIkcHJpbWFyeTogdmFyKC0tcHJpbWFyeSk7XG4kcHJpbWFyeU1lZGl1bUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktMjAwKTtcbiRwcmltYXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0xMDApO1xuJHByaW1hcnlDb21wbGVtZW50YXJ5OiB2YXIoLS1hY2NlbnQpO1xuJHByaW1hcnlEYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktOTAwKTtcbiR0ZXh0T25QcmltYXJ5OiB2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpO1xuJHRleHRPblByaW1hcnlMaWdodDogcmdiYSh2YXIoLS1saWdodC1wcmltYXJ5LXRleHQpLCAwLjc1KTtcbiR0ZXh0UHJpbWFyeTogdmFyKC0tcGFsZXR0ZS1mb3JlZ3JvdW5kLXRleHQpO1xuJHdvcmtzcGFjZVRvcEJhckJhY2tncm91bmQ6ICMzODM4Mzg7XG4kd29ya3NwYWNlVG9wQmFyRm9udENvbG9yOiAjZmZmO1xuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_14__.trigger)('openOverlay', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.UIAnimation.openOverlay(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.UIAnimation.ANIMATION_TIME_FAST)), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_14__.trigger)('open', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_8__.UIAnimation.openOverlay())]
    }
  });
}

/***/ }),

/***/ 58687:
/*!*************************************************************!*\
  !*** ./src/app/pages/workspace-page/tree/tree.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspaceTreeComponent: () => (/* binding */ WorkspaceTreeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _sub_tree_sub_tree_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sub-tree/sub-tree.component */ 50954);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 21916);







function WorkspaceTreeComponent_i_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_i_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "es-workspace-sub-tree", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onUpdateOptions", function WorkspaceTreeComponent_div_7_Template_es_workspace_sub_tree_onUpdateOptions_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r13.updateOptions($event));
    })("onDrop", function WorkspaceTreeComponent_div_7_Template_es_workspace_sub_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r15.drop($event));
    })("onClick", function WorkspaceTreeComponent_div_7_Template_es_workspace_sub_tree_onClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r16.openNode($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", "-userhome-")("currentPath", ctx_r2.currentPath);
  }
}
function WorkspaceTreeComponent_i_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_i_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "es-workspace-sub-tree", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onUpdateOptions", function WorkspaceTreeComponent_div_15_Template_es_workspace_sub_tree_onUpdateOptions_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r17.updateOptions($event));
    })("onDrop", function WorkspaceTreeComponent_div_15_Template_es_workspace_sub_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r19.drop($event));
    })("onClick", function WorkspaceTreeComponent_div_15_Template_es_workspace_sub_tree_onClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r20.openNode($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", "-shared_files-")("currentPath", ctx_r5.currentPath);
  }
}
function WorkspaceTreeComponent_i_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_i_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "es-workspace-sub-tree", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onUpdateOptions", function WorkspaceTreeComponent_div_23_Template_es_workspace_sub_tree_onUpdateOptions_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r21.updateOptions($event));
    })("onDrop", function WorkspaceTreeComponent_div_23_Template_es_workspace_sub_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r23.drop($event));
    })("onClick", function WorkspaceTreeComponent_div_23_Template_es_workspace_sub_tree_onClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r24.openNode($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", "-my_shared_files-")("currentPath", ctx_r8.currentPath);
  }
}
function WorkspaceTreeComponent_i_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_i_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "i", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "keyboard_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function WorkspaceTreeComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "es-workspace-sub-tree", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onUpdateOptions", function WorkspaceTreeComponent_div_31_Template_es_workspace_sub_tree_onUpdateOptions_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r25.updateOptions($event));
    })("onDrop", function WorkspaceTreeComponent_div_31_Template_es_workspace_sub_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r27.drop($event));
    })("onClick", function WorkspaceTreeComponent_div_31_Template_es_workspace_sub_tree_onClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r28.openNode($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", ctx_r11.workspace.getRootFolderInternalId())("currentPath", ctx_r11.currentPath);
  }
}
function WorkspaceTreeComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "es-workspace-sub-tree", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onUpdateOptions", function WorkspaceTreeComponent_div_37_Template_es_workspace_sub_tree_onUpdateOptions_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r29.updateOptions($event));
    })("onDrop", function WorkspaceTreeComponent_div_37_Template_es_workspace_sub_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r31.drop($event));
    })("onClick", function WorkspaceTreeComponent_div_37_Template_es_workspace_sub_tree_onClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r32.openNode($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", "-workflow_receive-")("currentPath", ctx_r12.currentPath);
  }
}
class WorkspaceTreeComponent {
  set path(path) {
    const pathIds = path.map(node => node.ref.id);
    this.currentPath = pathIds;
  }
  constructor() {
    this.options = [];
    this.onOpenNode = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onUpdateOptions = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onSetRoot = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onDeleteNodes = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.MY_FILES = 'MY_FILES';
    this.SHARED_FILES = 'SHARED_FILES';
    this.MY_SHARED_FILES = 'MY_SHARED_FILES';
    this.TO_ME_SHARED_FILES = 'TO_ME_SHARED_FILES';
    this.WORKFLOW_RECEIVE = 'WORKFLOW_RECEIVE';
    this.RECYCLE = 'RECYCLE';
    this.currentPath = [];
    this.canDropOnRecycle = dragData => {
      return {
        accept: dragData.action === 'move'
      };
    };
  }
  setRoot(root) {
    this.onSetRoot.emit(root);
    this.currentPath = [];
  }
  onNodesDrop(dragData) {
    if (dragData.target === this.RECYCLE && dragData.action === 'move') {
      this.onDeleteNodes.emit(dragData.draggedNodes);
    }
  }
  drop(event) {
    this.onDrop.emit(event);
  }
  updateOptions(event) {
    this.onUpdateOptions.emit(event);
  }
  openNode(event) {
    this.onOpenNode.emit(event);
  }
  refresh() {
    this.subTree?.refresh();
  }
  static #_ = this.ɵfac = function WorkspaceTreeComponent_Factory(t) {
    return new (t || WorkspaceTreeComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: WorkspaceTreeComponent,
    selectors: [["es-workspace-tree"]],
    viewQuery: function WorkspaceTreeComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_sub_tree_sub_tree_component__WEBPACK_IMPORTED_MODULE_0__.WorkspaceSubTreeComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.subTree = _t.first);
      }
    },
    inputs: {
      root: "root",
      workspace: "workspace",
      isSafe: "isSafe",
      selectedNode: "selectedNode",
      path: "path",
      options: "options"
    },
    outputs: {
      onOpenNode: "onOpenNode",
      onUpdateOptions: "onUpdateOptions",
      onSetRoot: "onSetRoot",
      onDrop: "onDrop",
      onDeleteNodes: "onDeleteNodes"
    },
    decls: 43,
    vars: 45,
    consts: [[1, "rootNode", 3, "click"], [1, "material-icons", "typeIcon"], ["class", "material-icons", 4, "ngIf"], ["class", "arrow", "class", "material-icons", 4, "ngIf"], ["class", "tree", 4, "ngIf"], [1, "rootNode", 3, "esNodesDropTarget", "canDropNodes", "click", "nodeDropped"], [1, "material-icons"], [1, "tree"], [3, "node", "currentPath", "onUpdateOptions", "onDrop", "onClick"]],
    template: function WorkspaceTreeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_0_listener() {
          return ctx.setRoot(ctx.MY_FILES);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "person");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, WorkspaceTreeComponent_i_5_Template, 2, 0, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, WorkspaceTreeComponent_i_6_Template, 2, 0, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, WorkspaceTreeComponent_div_7_Template, 2, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_8_listener() {
          return ctx.setRoot(ctx.SHARED_FILES);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "group");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, WorkspaceTreeComponent_i_13_Template, 2, 0, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, WorkspaceTreeComponent_i_14_Template, 2, 0, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, WorkspaceTreeComponent_div_15_Template, 2, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_16_listener() {
          return ctx.setRoot(ctx.MY_SHARED_FILES);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "share");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, WorkspaceTreeComponent_i_21_Template, 2, 0, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, WorkspaceTreeComponent_i_22_Template, 2, 0, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, WorkspaceTreeComponent_div_23_Template, 2, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_24_listener() {
          return ctx.setRoot(ctx.TO_ME_SHARED_FILES);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "send");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](28, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, WorkspaceTreeComponent_i_29_Template, 2, 0, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, WorkspaceTreeComponent_i_30_Template, 2, 0, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, WorkspaceTreeComponent_div_31_Template, 2, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_32_listener() {
          return ctx.setRoot(ctx.WORKFLOW_RECEIVE);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "inbox");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](36, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, WorkspaceTreeComponent_div_37_Template, 2, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function WorkspaceTreeComponent_Template_div_click_38_listener() {
          return ctx.setRoot(ctx.RECYCLE);
        })("nodeDropped", function WorkspaceTreeComponent_Template_div_nodeDropped_38_listener($event) {
          return ctx.onNodesDrop($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](42, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.MY_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 33, "WORKSPACE.MY_FILES"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.MY_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root != ctx.MY_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.MY_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 35, "WORKSPACE.SHARED_FILES"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root != ctx.SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.MY_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](20, 37, "WORKSPACE.MY_SHARED_FILES"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.MY_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root != ctx.MY_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.MY_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.TO_ME_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](28, 39, "WORKSPACE.TO_ME_SHARED_FILES"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.TO_ME_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root != ctx.TO_ME_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.TO_ME_SHARED_FILES);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.WORKFLOW_RECEIVE);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](36, 41, "WORKSPACE.WORKFLOW_RECEIVE"), "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root == ctx.WORKFLOW_RECEIVE);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("rootNodeSelected", ctx.root == ctx.RECYCLE);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("esNodesDropTarget", ctx.RECYCLE)("canDropNodes", ctx.canDropOnRecycle);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](42, 43, "WORKSPACE.RECYCLE"), "\n");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.IconDirective, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_3__.NodesDropTargetDirective, _sub_tree_sub_tree_component__WEBPACK_IMPORTED_MODULE_0__.WorkspaceSubTreeComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
    styles: ["\n\n.rootNode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  padding-left: 10px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  margin: 4px 0;\n}\n\n.typeIcon[_ngcontent-%COMP%] {\n  margin-right: 7px;\n}\n\n.arrow[_ngcontent-%COMP%] {\n  padding-left: 3px;\n}\n\n.rootNode[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  padding-right: 9px;\n  color: var(--textLight);\n  position: relative;\n}\n\n.rootNodeSelected[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: bold;\n}\n\n.rootNodeSelected[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS90cmVlL3RyZWUuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9wcm9qZWN0cy9lZHUtc2hhcmluZy11aS9hc3NldHMvc2Nzcy9taXhpbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL2JyYW5kaW5nLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsZ0VBQUE7QUNIQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQ0hBLGVBQUE7RUFDQSx5QkFBQTtFQUdBLGlCQUFBO0VBQ0Esd0NBQUE7RURBQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxhQUFBO0FBS0o7O0FBSEE7RUFDSSxpQkFBQTtBQU1KOztBQUpBO0VBQ0ksaUJBQUE7QUFPSjs7QUFMQTtFQUNJLGtCQUFBO0VBQ0EsdUJESFE7RUNJUixrQkFBQTtBQVFKOztBQUxBO0VBQ0kscUJFeEJNO0VGeUJOLGlCQUFBO0FBUUo7O0FBTkE7RUFDSSxxQkU1Qk07QUZxQ1YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOmNvbG9yJztcbkBpbXBvcnQgJ2JyYW5kaW5nJztcblxuLy8gQWxsIHZhcmlhYmxlcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBgYnJhbmRpbmcuc2Nzc2AuXG4vKiByZXBsYWNlIHZhcmlhYmxlcyB3aGljaCBhcmUgbWF5IG5vdCBkZWZpbmVkIGluIHRoZSBicmFuZGluZyAqL1xuJHByaW1hcnlWZXJ5TGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MCkgIWRlZmF1bHQ7XG4kcHJpbWFyeU1lZGl1bURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS03MDApICFkZWZhdWx0O1xuXG4kdGFiQ29sb3I6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yRGFyazogdmFyKC0tcHJpbWFyeSkgIWRlZmF1bHQ7XG4kdGFiQ29sb3JMaWdodDogJHByaW1hcnlNZWRpdW1MaWdodCAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjY2QyNDU3ICFkZWZhdWx0O1xuJHdhcm5pbmdNZWRpdW06ICNlOThjMWIgIWRlZmF1bHQ7XG4kdG9hc3RMZWZ0RXJyb3I6ICNjMTVkNWQgIWRlZmF1bHQ7XG4kdG9hc3RQcmltYXJ5OiAjMzMzMzMzICFkZWZhdWx0O1xuJHRleHRMaWdodDogdmFyKC0tdGV4dExpZ2h0KSAhZGVmYXVsdDtcbiR0ZXh0TWVkaXVtTGlnaHQ6IHZhcigtLXRleHRNZWRpdW1MaWdodCkgIWRlZmF1bHQ7XG4kdGV4dFZlcnlMaWdodDogI2FhYSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS10ZXh0TWFpbilcbiR0ZXh0TWFpbjogIzM4MzgzOCAhZGVmYXVsdDtcbiR0ZXh0UmVuZGVyaW5nTGFiZWxzOiAjNmY2ZjZmICFkZWZhdWx0O1xuJGZvbnRTaXplWExhcmdlOiAxMjAlICFkZWZhdWx0O1xuJGZvbnRTaXplTGFyZ2U6IDExMCUgIWRlZmF1bHQ7XG4kZm9udFNpemVTbWFsbDogOTAlICFkZWZhdWx0O1xuJGZvbnRTaXplWFNtYWxsOiB2YXIoLS1mb250U2l6ZVhTbWFsbCkgIWRlZmF1bHQ7XG4kYmFja2dyb3VuZENvbG9yOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNpZGViYXJXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlSW5oZXJpdENvbG9yOiAjNDJjYThkICFkZWZhdWx0O1xuJGVkaXRvcmlhbENvbGxlY3Rpb25zQmFja2dyb3VuZDogI2Y1ZWMxOSAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiAkcHJpbWFyeVZlcnlMaWdodCAhZGVmYXVsdDtcbiRpdGVtU2VsZWN0ZWRUZXh0Q29sb3I6ICRwcmltYXJ5TWVkaXVtRGFyayAhZGVmYXVsdDtcbiRidXR0b25Ib3ZlckJhY2tncm91bmQ6IHJnYmEodmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwMC1uby1yZ2IpLCAwLjA4KSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VOZXdCYWNrZ3JvdW5kOiAkaXRlbVNlbGVjdGVkQmFja2dyb3VuZCAhZGVmYXVsdDtcbi8vIHRoZSB3aGl0ZSBiYXIgaGVpZ2h0IGluIHNlYXJjaCBhbmQgZXMtd29ya3NwYWNlXG4kc2Vjb25kYXJ5QmFySGVpZ2h0OiA2NXB4ICFkZWZhdWx0O1xuJGxpc3RJdGVtU2VsZWN0ZWRCYWNrZ3JvdW5kOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHdvcmtzcGFjZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICAgICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbiAgICApXG4gICAgbm8tcmVwZWF0ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhclNhZmVCYWNrZ3JvdW5kOiAjOTYzYTNhO1xuJGRpYWxvZ1JpZ2h0V2lkdGg6IDMyMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVTZWxlY3RlZEJhY2tncm91bmQ6ICNmZmYgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVdpZHRoOiAzMDBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDogJHNlY29uZGFyeUJhckhlaWdodCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kRWZmZWN0OiBsaW5lYXItZ3JhZGllbnQoXG4gICAgdG8gcmlnaHQsXG4gICAgdmFyKC0tcHJpbWFyeSkgMCxcbiAgICB2YXIoLS1wcmltYXJ5KSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwKSA1cHhcbikgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTWV0YWRhdGFCYWNrZ3JvdW5kOiAjZjdmN2Y3ICFkZWZhdWx0O1xuJGJ1dHRvbkJvcmRlclJhZGl1czogMnB4ICFkZWZhdWx0O1xuJGNvbnRleHRNZW51V2lkdGg6IDI0MHB4ICFkZWZhdWx0O1xuJHRhYmxlSWNvblNpemU6IDM4cHggIWRlZmF1bHQ7XG4kYWN0aW9uRGlhbG9nQmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiRjYXJkTGlnaHRCYWNrZ3JvdW5kOiAjZjlmOWY5ICFkZWZhdWx0O1xuJHNlYXJjaElucHV0Qm9yZGVyQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kY2FyZFNlcGFyYXRvckxpbmVDb2xvcjogI2NjYyAhZGVmYXVsdDtcbiRnZW5lcmljU2VwZXJhdG9yTGluZUNvbG9yOiAjZWNlY2VjICFkZWZhdWx0O1xuJGlucHV0Qm9yZGVyQ29sb3I6ICM5ZTllOWUgIWRlZmF1bHQ7XG4kY29tbWVudHNBY3Rpb25zU2VwZXJhdG9yTGluZUNvbG9yOiAkYmFja2dyb3VuZENvbG9yICFkZWZhdWx0O1xuJG5vUmVzdWx0c0NvbG9yOiByZ2JhKGJsYWNrLCAwLjU0KSAhZGVmYXVsdDtcbiRkYXJrZW5Db2xvcjogcmdiYSgwLCAwLCAwLCAwLjc1KSAhZGVmYXVsdDtcbiRkYXJrZW5MaWdodENvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLSRjb2xvclN0YXR1c1Bvc2l0aXZlKVxuJGNvbG9yU3RhdHVzUG9zaXRpdmU6ICM0MGJmOGUgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tY29sb3JTdGF0dXNOZWdhdGl2ZSlcbiRjb2xvclN0YXR1c05lZ2F0aXZlOiAjY2QyNDU3ICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzV2FybmluZzogJHdhcm5pbmdNZWRpdW0gIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNSZWNvbW1lbmRlZDogI2FjZDMzMSAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c05ldXRyYWw6ICM3NzcgIWRlZmF1bHQ7XG4kY29sb3JTdGFyQWN0aXZlOiB2YXIoLS1jb2xvclN0YXJBY3RpdmUpICFkZWZhdWx0O1xuJGZvY3VzQ29sb3I6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApICFkZWZhdWx0O1xuJHBsYWNlaG9sZGVyQ29sb3I6ICM3Njc2NzYgIWRlZmF1bHQ7XG4kZm9jdXNXaWR0aDogMnB4ICFkZWZhdWx0O1xuJGNhcmRXaWR0aDogdmFyKC0tY2FyZFdpZHRoKSAhZGVmYXVsdDtcbiRjYXJkSGVpZ2h0OiAzMDBweCAhZGVmYXVsdDtcbiRsaXN0SXRlbUhlaWdodDogNzBweCAhZGVmYXVsdDtcbiRsaXN0Q2FyZFNtYWxsSGVpZ2h0OiAxMDBweCAhZGVmYXVsdDtcbiRsaXN0SGVhZGluZ0hlaWdodDogMzZweCAhZGVmYXVsdDtcbiRjYXJkUGFkZGluZzogMjVweCAhZGVmYXVsdDtcbiR0cmFuc2l0aW9uTm9ybWFsOiB2YXIoLS10cmFuc2l0aW9uTm9ybWFsKSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS1tb2JpbGVXaWR0aClcbiRtb2JpbGVXaWR0aDogNzAwcHggIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlU3RhZ2UpXG4kbW9iaWxlU3RhZ2U6IDEwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodDogNzUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0V2l0aEtleWJvYXJkOiA1NTBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHRMYW5kc2NhcGU6IDQwMHB4ICFkZWZhdWx0O1xuJG1vYmlsZVdpZHRoUG9ydHJhaXQ6IDQwMHB4ICFkZWZhdWx0O1xuLy8gdGhpcyBmYWN0b3Igc2hvdWxkIGJlIG11bHRpcGxpZWQgYnkgYSBuYXR1cmFsIG51bWJlciwgZS5nLiAqMyBtZWFucyBzdGFnZSAzIChyZWxhdGl2ZWx5IGVhcmx5KVxuJGRpYWxvZ1pJbmRleDogMTMwICFkZWZhdWx0O1xuLy8gYmVmb3JlIHRoZSB0b3AgYmFyIG9uIG1vYmlsZSwgYnV0IGJlaGluZCB0aGUgbW9iaWxlIHRhYnMgYW5kIHRoZSB0b3AgYmFyIG9uIGRlc2t0b3BcbiRkaWFsb2dOb25Nb2RhbFpJbmRleDogOTAgIWRlZmF1bHQ7IC8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kdG9wQmFyWkluZGV4OiA5OCAhZGVmYXVsdDtcbiR0b3BCYXJNb2JpbGVaSW5kZXg6IDgwICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRvcEJhcklucHV0QmFja2dyb3VuZDogI2VlZSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dFRleHQ6ICR0ZXh0TWFpbiAhZGVmYXVsdDtcbiRtb2JpbGVUYWJzWkluZGV4OiAxMTAgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiU3dpdGNoV2lkdGg6ICRtb2JpbGVXaWR0aCArICRtb2JpbGVTdGFnZSAqIDIgIWRlZmF1bHQ7XG4kbW9iaWxlVGFiTmF2SGVpZ2h0OiA2MnB4ICFkZWZhdWx0O1xuJHByaW1hcnlGb250RmFtaWx5OiAnb3Blbl9zYW5zcmVndWxhcicgIWRlZmF1bHQ7XG4kcHJpbWFyeUZvbnRTaXplOiAxMHB0ICFkZWZhdWx0O1xuXG4kZGVmYXVsdC1jaGlwLWNvbG9yczogKFxuICAgICdjY2xvbV9nZW5lcmFsX2tleXdvcmQnOiByZ2IoMTY2LCAyMTQsIDIwOCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGNvbnRleHQnOiByZ2IoMjE0LCAxNjYsIDE2NiksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGxlYXJuaW5ncmVzb3VyY2V0eXBlJzogcmdiKDIxNCwgMTkzLCAxNjYpLFxuICAgICdjY21fb2JqZWN0dHlwZSc6IHJnYigxNjYsIDE5MiwgMjE0KSxcbiAgICAnY2NtX3RheG9uaWQnOiByZ2IoMTY2LCAyMTQsIDE3NCksXG4gICAgJ2NjbV9lZHVjYXRpb25hbGludGVuZGVkZW5kdXNlcnJvbGUnOiByZ2IoMjExLCAyMTQsIDE2NiksXG4pO1xuJGN1c3RvbS1jaGlwLWNvbG9yczogKCkgIWRlZmF1bHQ7XG4kY2hpcC1jb2xvcnM6IG1hcC5tZXJnZSgkZGVmYXVsdC1jaGlwLWNvbG9ycywgJGN1c3RvbS1jaGlwLWNvbG9ycyk7XG5cbkBpbXBvcnQgJ21peGlucyc7XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9jb3JlLXVpLW1vZHVsZS9zdHlsZXMvdmFyaWFibGVzJztcblxuLnJvb3ROb2RlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgQGluY2x1ZGUgY2xpY2thYmxlKCk7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgIG1hcmdpbjogNHB4IDA7XG59XG4udHlwZUljb24ge1xuICAgIG1hcmdpbi1yaWdodDogN3B4O1xufVxuLmFycm93IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDNweDtcbn1cbi5yb290Tm9kZSBpIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiA5cHg7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucm9vdE5vZGVTZWxlY3RlZCB7XG4gICAgY29sb3I6ICRwcmltYXJ5O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnJvb3ROb2RlU2VsZWN0ZWQgaSB7XG4gICAgY29sb3I6ICRwcmltYXJ5O1xufVxuIiwiQG1peGluIGNsaWNrYWJsZSgpIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuQG1peGluIGxpbWl0TGluZUNvdW50KCRjb3VudCwgJGxpbmVIZWlnaHQ6IDEpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZUhlaWdodCArIGVtO1xuICAgIG1heC1oZWlnaHQ6ICRjb3VudCAqICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAkY291bnQ7IC8qIG51bWJlciBvZiBsaW5lcyB0byBzaG93ICovXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAvKiBhdXRvcHJlZml4ZXI6IG9mZiAqL1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93KCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dCb3R0b20oJG9wYWNpdHk6IDAuMSkge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDNweCByZ2JhKDAsIDAsIDAsICRvcGFjaXR5KTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd1NtYWxsKCRpbXBvcnRhbnQ6IGZhbHNlKSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMykgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3dNZWRpdW1MYXJnZSgkaW1wb3J0YW50OiBmYWxzZSwgJG9wYWNpdHk6IDAuNikge1xuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpIGlmKCRpbXBvcnRhbnQsICFpbXBvcnRhbnQsIG51bGwpO1xufVxuQG1peGluIG1hdGVyaWFsU2Nyb2xsYmFyKCkge1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIC8vIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgfVxufVxuQG1peGluIHJlbW92ZURlZmF1bHRGb2N1cygpIHtcbiAgICBvdXRsaW5lOiBub25lO1xufVxuQG1peGluIHNldEdsb2JhbEtleWJvYXJkRm9jdXMoJG1vZGU6ICdvdXRsaW5lJykge1xuICAgIC8vcmVzcGVjdCBlbGVtZW50IGJvcmRlciByYWRpdXNcbiAgICBAaW5jbHVkZSByZW1vdmVEZWZhdWx0Rm9jdXMoKTtcbiAgICBAaWYgJG1vZGU9PSAnb3V0bGluZScge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1mb2N1c1dpZHRoKSBzb2xpZCB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB9IEBlbHNlIGlmICRtb2RlPT0gJ2JvcmRlcicge1xuICAgICAgICBib3JkZXI6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgIH1cbn1cbi8vIEFwcGx5IHRoZSBjb250ZW50IHN0eWxlcyBpbiBjb250cmFzdCBtb2RlLiBUaGlzIGlzIGp1c3QgZW5vdWdoIGNvbnRyYXN0IHRvIGJlIFdDQUcgY29tcGxpZW50IC0tLVxuLy8gbm90IGEgaGlnaC1jb250cmFzdCBtb2RlLlxuLy9cbi8vIENhbGwgd2l0aG91dCBhcmd1bWVudHMgZm9yIHVzZSBpbiBlbmNhcHN1bGF0ZWQgY29tcG9uZW50IHN0eWxlcywgZS5nLixcbi8vICAgICBAaW5jbHVkZSBjb250cmFzdE1vZGUge1xuLy8gICAgICAgICAvLyBTdHlsZXMgdG8gYXBwbHkgaW4gY29udHJhc3QgbW9kZVxuLy8gICAgIH1cbi8vIFRvIHVzIGluIGdsb2JhbCBjb250ZXh0LCBwYXNzICdnbG9iYWwnIGFzIGZpcnN0IGFyZ3VtZW50LCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZShnbG9iYWwpIHsgLyogLi4uICovIH1cbkBtaXhpbiBjb250cmFzdE1vZGUoJHNjb3BlOiBlbmNhcHN1bGF0ZWQpIHtcbiAgICAkY29udHJhc3RNb2RlU2VsZWN0b3I6ICdib2R5LmVzLWNvbnRyYXN0LW1vZGUnO1xuICAgIEBpZiAkc2NvcGUgPT0gZW5jYXBzdWxhdGVkIHtcbiAgICAgICAgOmhvc3QtY29udGV4dCgjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0pICYge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRzY29wZSA9PSBnbG9iYWwge1xuICAgICAgICAje2lmKCYsICcjeyRjb250cmFzdE1vZGVTZWxlY3Rvcn0gJicsICRjb250cmFzdE1vZGVTZWxlY3Rvcil9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEBlcnJvciBcIkludmFsaWQgc2NvcGUgI3skc2NvcGV9LlwiO1xuICAgIH1cbn1cbkBtaXhpbiBibHVySW1hZ2UoJGJsdXJTdHJlbmd0aDogMjVweCkge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgdG9wOiAtJGJsdXJTdHJlbmd0aCAqIDI7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSArICN7JGJsdXJTdHJlbmd0aCAqIDR9KTtcbiAgICB6LWluZGV4OiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZmlsdGVyOiBibHVyKCRibHVyU3RyZW5ndGgpO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9wYWNpdHk6IDAuNztcbn1cbiIsIiRwcmltYXJ5OiB2YXIoLS1wcmltYXJ5KTtcbiRwcmltYXJ5TWVkaXVtTGlnaHQ6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS0yMDApO1xuJHByaW1hcnlMaWdodDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTEwMCk7XG4kcHJpbWFyeUNvbXBsZW1lbnRhcnk6IHZhcigtLWFjY2VudCk7XG4kcHJpbWFyeURhcms6IHZhcigtLXBhbGV0dGUtcHJpbWFyeS05MDApO1xuJHRleHRPblByaW1hcnk6IHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCk7XG4kdGV4dE9uUHJpbWFyeUxpZ2h0OiByZ2JhKHZhcigtLWxpZ2h0LXByaW1hcnktdGV4dCksIDAuNzUpO1xuJHRleHRQcmltYXJ5OiB2YXIoLS1wYWxldHRlLWZvcmVncm91bmQtdGV4dCk7XG4kd29ya3NwYWNlVG9wQmFyQmFja2dyb3VuZDogIzM4MzgzODtcbiR3b3Jrc3BhY2VUb3BCYXJGb250Q29sb3I6ICNmZmY7XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 17396:
/*!***********************************************************************!*\
  !*** ./src/app/pages/workspace-page/workspace-page-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacePageRoutingModule: () => (/* binding */ WorkspacePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _workspace_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./workspace-page.component */ 12833);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);




const routes = [{
  path: '',
  component: _workspace_page_component__WEBPACK_IMPORTED_MODULE_0__.WorkspacePageComponent
}, {
  path: ':mode',
  component: _workspace_page_component__WEBPACK_IMPORTED_MODULE_0__.WorkspacePageComponent
}];
class WorkspacePageRoutingModule {
  static #_ = this.ɵfac = function WorkspacePageRoutingModule_Factory(t) {
    return new (t || WorkspacePageRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: WorkspacePageRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WorkspacePageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 12833:
/*!******************************************************************!*\
  !*** ./src/app/pages/workspace-page/workspace-page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacePageComponent: () => (/* binding */ WorkspacePageComponent)
/* harmony export */ });
/* harmony import */ var _home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/animations */ 12501);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs */ 64555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs */ 70462);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs */ 32484);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 55617);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! rxjs/operators */ 13303);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs/operators */ 17627);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! rxjs/operators */ 47422);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! rxjs/operators */ 46939);
/* harmony import */ var _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-module/core.module */ 71083);
/* harmony import */ var _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-module/rest/helper */ 64634);
/* harmony import */ var _core_module_rest_services_rest_iam_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core-module/rest/services/rest-iam.service */ 49511);
/* harmony import */ var _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core-ui-module/ui-helper */ 90721);
/* harmony import */ var _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../features/dialogs/card-dialog/card-dialog-config */ 53461);
/* harmony import */ var _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/dialogs/dialog-modules/generic-dialog/generic-dialog-data */ 4254);
/* harmony import */ var _tree_tree_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tree/tree.component */ 58687);
/* harmony import */ var _workspace_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./workspace-utils */ 58164);
/* harmony import */ var _recycle_recycle_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./recycle/recycle.component */ 82475);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.service */ 19445);
/* harmony import */ var _services_card_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/card.service */ 329);
/* harmony import */ var _features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../features/dialogs/dialogs.service */ 29900);
/* harmony import */ var _main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../main/loading-screen/loading-screen.service */ 63030);
/* harmony import */ var _main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../main/navigation/main-nav.service */ 5178);
/* harmony import */ var _services_node_helper_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../services/node-helper.service */ 76754);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../main/navigation/search-field/search-field.service */ 86381);
/* harmony import */ var ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ngx-edu-sharing-api */ 77299);
/* harmony import */ var _services_toast__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../services/toast */ 93366);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @ngx-translate/core */ 21916);
/* harmony import */ var _services_theme_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../services/theme.service */ 42471);
/* harmony import */ var _workspace_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./workspace.service */ 52517);































const _c0 = ["explorer"];
const _c1 = ["actionbar"];
function WorkspacePageComponent_es_breadcrumbs_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "es-breadcrumbs", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("onDrop", function WorkspacePageComponent_es_breadcrumbs_3_Template_es_breadcrumbs_onDrop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r5.handleDropOnBreadcrumb($event));
    })("onClick", function WorkspacePageComponent_es_breadcrumbs_3_Template_es_breadcrumbs_onClick_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r7.openBreadcrumb($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("searchQuery", ctx_r0.searchQuery == null ? null : ctx_r0.searchQuery.query)("home", "WORKSPACE." + ctx_r0.root)("canDropNodes", ctx_r0.canDropOnBreadcrumb);
  }
}
function WorkspacePageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 1, "NO_PERMISSIONS_FOR_SCOPE"), " ");
  }
}
function WorkspacePageComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r13.showSelectRoot = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function WorkspacePageComponent_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 18)(1, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r15.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r15.setRoot("MY_FILES"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r17.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r17.setRoot("SHARED_FILES"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](6, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](9, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r18.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r18.setRoot("MY_SHARED_FILES"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](10, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](13, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r19.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r19.setRoot("TO_ME_SHARED_FILES"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](14, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](17, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r20.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r20.setRoot("WORKFLOW_RECEIVE"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](18, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](21, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function WorkspacePageComponent_div_7_div_2_Template_a_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      ctx_r21.showSelectRoot = false;
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r21.setRoot("RECYCLE"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](22, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("@overlay", ctx_r9.showSelectRoot);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "MY_FILES");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](4, 19, "WORKSPACE.MY_FILES"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "SHARED_FILES");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](8, 21, "WORKSPACE.SHARED_FILES"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "MY_SHARED_FILES");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](12, 23, "WORKSPACE.MY_SHARED_FILES"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "TO_ME_SHARED_FILES");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](16, 25, "WORKSPACE.TO_ME_SHARED_FILES"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "WORKFLOW_RECEIVE");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](20, 27, "WORKSPACE.WORKFLOW_RECEIVE"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("rootSelected", ctx_r9.root === "RECYCLE");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](24, 29, "WORKSPACE.RECYCLE"), "");
  }
}
function WorkspacePageComponent_div_7_div_3_es_user_quota_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "es-user-quota", 29);
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("quota", ctx_r22.user.person.quota);
  }
}
function WorkspacePageComponent_div_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 26)(1, "es-workspace-tree", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("onDrop", function WorkspacePageComponent_div_7_div_3_Template_es_workspace_tree_onDrop_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r23.handleDrop($event));
    })("onSetRoot", function WorkspacePageComponent_div_7_div_3_Template_es_workspace_tree_onSetRoot_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r25.setRoot($event));
    })("onOpenNode", function WorkspacePageComponent_div_7_div_3_Template_es_workspace_tree_onOpenNode_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r26.openNode($event));
    })("onDeleteNodes", function WorkspacePageComponent_div_7_div_3_Template_es_workspace_tree_onDeleteNodes_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r24);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r27.onDeleteNodes($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, WorkspacePageComponent_div_7_div_3_es_user_quota_2_Template, 1, 1, "es-user-quota", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("tree-quota", ctx_r10.user.person.quota.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("path", ctx_r10.path)("selectedNode", ctx_r10.selectedNodeTree)("root", ctx_r10.root)("workspace", ctx_r10)("isSafe", ctx_r10.isSafe);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r10.user.person.quota.enabled);
  }
}
function WorkspacePageComponent_div_7_es_recycle_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "es-recycle", 30);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("actionbar", _r1);
  }
}
function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "es-workspace-explorer", 31, 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("refreshTree", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_refreshTree_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r29.treeComponent == null ? null : ctx_r29.treeComponent.refresh());
    })("displayTypeChange", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_displayTypeChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r31.setDisplayType($event));
    })("reorderDialogChange", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_reorderDialogChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r32.reorderDialog = $event);
    })("onSearchGlobal", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_onSearchGlobal_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r33.searchGlobal($event));
    })("onDrop", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_onDrop_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r34.handleDrop($event));
    })("onViewNode", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_onViewNode_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r35.openNode($event, false));
    })("onOpenNode", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_onOpenNode_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r36.openNode($event, false));
    })("onReset", function WorkspacePageComponent_div_7_es_workspace_explorer_8_Template_es_workspace_explorer_onReset_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r30);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r37.resetWorkspace());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("current", ctx_r12.currentFolder)("root", ctx_r12.root)("searchQuery", ctx_r12.searchQuery)("customOptions", ctx_r12.customOptions)("displayType", ctx_r12.displayType)("reorderDialog", ctx_r12.reorderDialog)("preventKeyevents", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](2, 9, ctx_r12.cardHasOpenModals$))("dataSource", ctx_r12.dataSource)("actionbar", _r1);
  }
}
function WorkspacePageComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, WorkspacePageComponent_div_7_div_1_Template, 1, 0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, WorkspacePageComponent_div_7_div_2_Template, 25, 31, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, WorkspacePageComponent_div_7_div_3_Template, 3, 8, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, WorkspacePageComponent_div_7_es_recycle_4_Template, 1, 1, "es-recycle", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "h1", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](8, WorkspacePageComponent_div_7_es_workspace_explorer_8_Template, 3, 11, "es-workspace-explorer", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("hide", ctx_r3.globalProgress);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.showSelectRoot);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.showSelectRoot);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.isLoggedIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.root === "RECYCLE");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](7, 8, "WORKSPACE.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.root !== "RECYCLE");
  }
}
function WorkspacePageComponent_es_global_progress_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "es-global-progress");
  }
}
class WorkspacePageComponent {
  static #_ = this.VALID_ROOTS = ['MY_FILES', 'SHARED_FILES', 'MY_SHARED_FILES', 'TO_ME_SHARED_FILES', 'WORKFLOW_RECEIVE', 'RECYCLE'];
  static #_2 = this.VALID_ROOTS_NODES = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME, '-shared_files-', '-my_shared_files-', '-to_me_shared_files_personal-', '-to_me_shared_files-', '-workflow_receive-'];
  get allowBinary() {
    return this.allowBinarySubject.value;
  }
  set allowBinary(value) {
    this.allowBinarySubject.next(value);
  }
  get createAllowed() {
    return this.createAllowedSubject.value;
  }
  set createAllowed(value) {
    this.createAllowedSubject.next(value);
  }
  get currentFolder() {
    return this.currentFolderSubject.value;
  }
  set currentFolder(value) {
    this.currentFolderSubject.next(value);
  }
  get searchQuery() {
    return this.searchQuerySubject.value;
  }
  set searchQuery(value) {
    this.searchQuerySubject.next(value);
  }
  constructor(appContainer, breadcrumbsService, card, config, connector, connectors, dialogs, event, iam, loadingScreen, localEvents, mainNavService, mds, ngZone, node, nodeHelper, route, router, searchField, session, storage, userService, toast, toolService, translate, translations, configService, themeService, ui, workspace) {
    this.appContainer = appContainer;
    this.breadcrumbsService = breadcrumbsService;
    this.card = card;
    this.config = config;
    this.connector = connector;
    this.connectors = connectors;
    this.dialogs = dialogs;
    this.event = event;
    this.iam = iam;
    this.loadingScreen = loadingScreen;
    this.localEvents = localEvents;
    this.mainNavService = mainNavService;
    this.mds = mds;
    this.ngZone = ngZone;
    this.node = node;
    this.nodeHelper = nodeHelper;
    this.route = route;
    this.router = router;
    this.searchField = searchField;
    this.session = session;
    this.storage = storage;
    this.userService = userService;
    this.toast = toast;
    this.toolService = toolService;
    this.translate = translate;
    this.translations = translations;
    this.configService = configService;
    this.themeService = themeService;
    this.ui = ui;
    this.workspace = workspace;
    this.sharedFolders = [];
    this.path = [];
    this.root = 'MY_FILES';
    this.showSelectRoot = false;
    this.allowBinarySubject = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(true);
    this.createAllowedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(null);
    this.currentFolderSubject = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(null);
    this.searchQuerySubject = new rxjs__WEBPACK_IMPORTED_MODULE_21__.BehaviorSubject(null);
    this.globalProgress = false;
    this.editNodeDeleteOnCancel = false;
    this.isSafe = false;
    this.isLoggedIn = false;
    this.mainnav = true;
    this.isBlocked = false;
    this.customOptions = {
      useDefaultOptions: true
    };
    this.dataSource = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.NodeDataSource();
    this.showLtiTools = false;
    this.displayType = null;
    this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_23__.Subject();
    this.loadingTask = this.loadingScreen.addLoadingTask({
      until: this.destroyed$
    });
    this.canDropOnBreadcrumb = dragData => {
      if (dragData.target === 'HOME') {
        if (this.root === 'MY_FILES') {
          return (0,_workspace_utils__WEBPACK_IMPORTED_MODULE_8__.canDragDrop)(dragData);
        } else {
          return {
            accept: false,
            denyExplicit: false
          };
        }
      } else {
        return (0,_workspace_utils__WEBPACK_IMPORTED_MODULE_8__.canDropOnNode)(dragData);
      }
    };
    this.event.addListener(this, this.destroyed$);
    this.connector.setRoute(this.route, this.router);
    this.globalProgress = true;
    this.translations.waitForInit().subscribe(() => {
      void this.initialize();
      this.cardHasOpenModals$ = this.card.hasOpenModals.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.delay)(0));
    });
  }
  ngOnInit() {
    this.registerScroll();
    this.registerUpdateMainNav();
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.storage.remove('workspace_clipboard');
    if (this.currentFolder) {
      this.storage.set(this.getLastLocationStorageId(), this.currentFolder.ref.id);
    }
  }
  beforeunloadHandler(event) {
    if (this.isSafe) {
      // not necessary anymore, stay in session on reload
      // low session times for safe in backend to provide session hijacking
      // this.connector.logout().toPromise();
    }
  }
  handleScroll(event) {
    const scroll = this.appContainer.getScrollContainer().scrollTop;
    if (scroll > 0) {
      this.storage.set('workspace_scroll', scroll);
    }
  }
  onEvent(event, data) {
    if (event === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_REFRESH) {
      this.refresh();
    }
  }
  /**
   * Needs the following member variables to be initialized:
   * - isSafe
   * - isBlocked
   * - mainnav
   */
  initMainNav() {
    this.mainNavService.setMainNavConfig({
      title: this.isSafe ? 'WORKSPACE.TITLE_SAFE' : 'WORKSPACE.TITLE',
      currentScope: this.isSafe ? 'safe' : 'workspace',
      create: {
        allowed: this.createAllowed,
        allowBinary: this.allowBinary,
        parent: this.currentFolder,
        folder: true
      },
      onCreate: nodes => this.explorer.nodeEntries.addVirtualNodes(nodes),
      onCreateNotAllowed: () => this.createNotAllowed(),
      canOpen: this.mainnav
    });
    if (!this.isBlocked) {
      const searchFieldInstance = this.searchField.enable({
        placeholder: this.isSafe ? 'WORKSPACE.SAFE_SEARCH' : 'WORKSPACE.SEARCH'
      }, this.destroyed$);
      searchFieldInstance.onSearchTriggered().subscribe(event => this.doSearch(event));
      this.searchQuerySubject.subscribe(searchQuery => searchFieldInstance.setSearchString(searchQuery?.query));
    } else {
      this.searchField.disable();
    }
  }
  registerUpdateMainNav() {
    rxjs__WEBPACK_IMPORTED_MODULE_25__.combineLatest([this.createAllowedSubject, this.allowBinarySubject, this.currentFolderSubject]).subscribe(([createAllowed, allowBinary, currentFolder]) => this.mainNavService.patchMainNavConfig({
      create: {
        allowed: createAllowed,
        allowBinary: allowBinary,
        parent: currentFolder,
        folder: true
      }
    }));
  }
  registerScroll() {
    this.appContainer.registerScrollEvents(event => this.handleScroll(event), this.destroyed$);
  }
  editConnector(node = null, type = null, win = null, connectorType = null) {
    _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.openConnector(this.connectors, this.iam, this.event, this.toast, this.getNodeList(node)[0], type, win, connectorType);
  }
  handleDrop(event) {
    if (event.source.mode === 'copy') {
      this.copyNode(event.target, event.source.element);
    } else {
      this.moveNode(event.target, event.source.element);
    }
    /*
    this.dialogTitle="WORKSPACE.DRAG_DROP_TITLE";
    this.dialogCancelable=true;
    this.dialogMessage="WORKSPACE.DRAG_DROP_MESSAGE";
    this.dialogMessageParameters={source:event.source.name,target:event.target.name};
    this.dialogButtons=[
      new DialogButton("WORKSPACE.DRAG_DROP_COPY",{ color: 'primary' },()=>this.copyNode(event.target,event.source)),
      new DialogButton("WORKSPACE.DRAG_DROP_MOVE",{ color: 'primary' },()=>this.moveNode(event.target,event.source)),
    ]
    */
  }

  handleDropOnBreadcrumb(event) {
    if (event.target === 'HOME') {
      this.handleDrop({
        target: this.root,
        source: event.source
      });
    } else {
      this.handleDrop(event);
    }
  }
  moveNode(target, source, position = 0) {
    this.globalProgress = true;
    if (position >= source.length) {
      this.finishMoveCopy(target, source, false);
      this.globalProgress = false;
      return;
    }
    this.node.moveNode(target.ref?.id || _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME, source[position].ref.id).subscribe(data => {
      this.moveNode(target, source, position + 1);
    }, error => {
      this.nodeHelper.handleNodeError(source[position].name, error);
      source.splice(position, 1);
      this.moveNode(target, source, position + 1);
    });
  }
  copyNode(target, source, position = 0) {
    this.globalProgress = true;
    if (position >= source.length) {
      this.finishMoveCopy(target, source, true);
      this.globalProgress = false;
      return;
    }
    this.node.copyNode(target.ref?.id || _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME, source[position].ref.id).subscribe(data => {
      this.copyNode(target, source, position + 1);
    }, error => {
      this.nodeHelper.handleNodeError(source[position].name, error);
      source.splice(position, 1);
      this.copyNode(target, source, position + 1);
    });
  }
  finishMoveCopy(target, source, copy) {
    this.toast.closeProgressSpinner();
    const info = {
      to: target.name || this.translate.instant('WORKSPACE.MY_FILES'),
      count: source.length,
      mode: this.translate.instant('WORKSPACE.' + (copy ? 'PASTE_COPY' : 'PASTE_MOVE'))
    };
    if (source.length) {
      this.toast.toast('WORKSPACE.TOAST.PASTE_DRAG', info);
    }
    this.globalProgress = false;
    this.refresh();
  }
  initialize() {
    var _this = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_26__.takeUntil)(_this.destroyed$)).subscribe(routeParams => _this.handleParamsUpdate(routeParams));
      _this.route.queryParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_26__.takeUntil)(_this.destroyed$)).subscribe(params => _this.handleQueryParamsUpdate(params));
    })();
  }
  initUser() {
    var _this2 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // wait until a valid user is present (issues after app login otherwise)
        _this2.user = yield _this2.userService.observeCurrentUser().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_27__.first)(notNull), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_28__.map)(_core_module_rest_services_rest_iam_service__WEBPACK_IMPORTED_MODULE_3__.mapVCard)).toPromise();
      } catch (e) {
        _this2.toast.error(e);
        return;
      }
    })();
  }
  handleParamsUpdate(routeParams) {
    var _this3 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.isSafe = routeParams.mode === 'safe';
      const login = yield _this3.connector.isLoggedIn().toPromise();
      if (login.statusCode !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.STATUS_CODE_OK) {
        _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(_this3.router, _this3.config);
        return;
      }
      let valid = true;
      if (!login.isValidLogin || login.isGuest) {
        valid = false;
      }
      _this3.isBlocked = !_this3.connector.hasToolPermissionInstant(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TOOLPERMISSION_WORKSPACE);
      if (_this3.isSafe && login.currentScope !== _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE) {
        valid = false;
      }
      if (!_this3.isSafe && login.currentScope != null) {
        _this3.connector.logout().subscribe(() => {
          _this3.goToLogin();
        }, error => {
          _this3.toast.error(error);
          _this3.goToLogin();
        });
        return;
      }
      if (!valid) {
        _this3.goToLogin();
        return;
      }
      yield _this3.prepareActionbar();
      yield _this3.initUser();
      _this3.loadFolders(_this3.user);
      _this3.connector.scope = _this3.isSafe ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE : null;
      _this3.isLoggedIn = true;
      _this3.globalProgress = false;
      if (_this3.isSafe) {
        const config = yield _this3.configService.observeConfig().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_29__.take)(1)).toPromise();
        if (config.themeColors?.colorSafe) {
          _this3.themeService.applyFromConfigColors(config.themeColors.colorSafe);
        }
      }
    })();
  }
  handleQueryParamsUpdate(params) {
    let needsUpdate = false;
    if (this.oldParams) {
      for (const key of Object.keys(this.oldParams).concat(Object.keys(params))) {
        if (params[key] === this.oldParams[key]) {
          continue;
        }
        if (key === ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.QUERY_PARAM_LIST_VIEW_TYPE) {
          continue;
        } else if (['page', 'pageSize'].includes(key)) {
          // Handled by `NodeEntriesComponent`.
          continue;
        }
        needsUpdate = true;
      }
    } else {
      needsUpdate = true;
    }
    if (params.displayType != null) {
      this.setDisplayType(parseInt(params[ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.QUERY_PARAM_LIST_VIEW_TYPE], 10), false);
    } else {
      this.setDisplayType(this.config.instant('workspaceViewType', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.NodeEntriesDisplayType.Table), false);
    }
    if (params.root && WorkspacePageComponent.VALID_ROOTS.indexOf(params.root) !== -1) {
      this.root = params.root;
    } else {
      this.root = 'MY_FILES';
    }
    if (params.reurl) {
      this.reurl = params.reurl;
    }
    this.mainnav = params.mainnav === 'false' ? false : true;
    this.initMainNav();
    if (params.file && params.file !== this.oldParams?.file) {
      void this.showNodeInCurrentFolder(params.file);
    }
    if (!needsUpdate) {
      return;
    }
    this.createAllowed = this.root === 'MY_FILES';
    let lastLocation = this.storage.pop(this.getLastLocationStorageId(), null);
    if (this.isSafe) {
      // clear lastLocation, this is another folder than the safe
      lastLocation = null;
    }
    if (!params.id && !params.query && lastLocation) {
      this.openDirectory(lastLocation, {
        replaceUrl: true
      });
    } else {
      this.openDirectoryFromRoute(params);
    }
    if (params.showAlpha) {
      this.showAlpha();
    }
    this.oldParams = params;
  }
  showNodeInCurrentFolder(id) {
    var _this4 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // TODO: Consider moving this to `NodeDataSource`.
      const visibleNodes = yield _this4.explorer.dataSource.connect().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_27__.first)(data => data?.length > 1)).toPromise();
      let node = visibleNodes.find(node => node.ref.id === id);
      if (!node) {
        ({
          node
        } = yield _this4.node.getNodeMetadata(id, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).toPromise());
        if (node.parent?.id === _this4.currentFolder?.ref.id) {
          _this4.explorer.dataSource.appendData([node], 'before');
          // FIXME: The appended node will show up a second time when loading more data.
        } else {
          _this4.toast.error(null, 'WORKSPACE.TOAST.ELEMENT_NOT_IN_FOLDER');
          return;
        }
      }
      _this4.setSelection([node]);
      _this4.parameterNode = node;
      _this4.workspace.nodeSidebar = node;
    })();
  }
  resetWorkspace() {
    if (this.workspace.nodeSidebar && this.parameterNode) {
      this.setSelection([this.parameterNode]);
    }
  }
  doSearch(event) {
    const id = this.currentFolder ? this.currentFolder.ref.id : this.searchQuery && this.searchQuery.node ? this.searchQuery.node.ref.id : null;
    void this.routeTo(this.root, id, event.searchString);
    if (!event.cleared) {
      this.ui.hideKeyboardIfMobile();
    }
  }
  doSearchFromRoute(params, node) {
    node = this.isRootFolder ? null : node;
    this.searchQuery = {
      query: params.query,
      node
    };
    if (node == null && this.root !== 'RECYCLE') {
      this.root = 'ALL_FILES';
    }
    this.createAllowed = 'EMIT_EVENT';
    this.notAllowedReason = 'WORKSPACE.CREATE_REASON.SEARCH';
    this.path = [];
    this.breadcrumbsService.setNodePath(this.path);
    this.setSelection([]);
  }
  displayNode(event) {
    const list = this.getNodeList(event);
    if (list[0].isDirectory || list[0].type === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SYS_TYPE_CONTAINER) {
      if (list[0].collection) {
        _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.goToCollection(this.router, list[0]);
      } else {
        this.openDirectory(list[0].ref.id);
      }
    } else {
      /*
      this.nodeDisplayed = event;
      this.nodeDisplayedVersion = event.version;
      */
      this.storage.set(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.TemporaryStorageService.NODE_RENDER_PARAMETER_DATA_SOURCE, this.dataSource);
      this.router.navigate([ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.ROUTER_PREFIX + 'render', list[0].ref.id, list[0].version ? list[0].version : ''], {
        state: {
          scope: 'workspace'
        }
      });
    }
  }
  // returns either the passed node as list, or the current selection if the passed node is invalid (actionbar)
  getNodeList(node) {
    if (Array.isArray(node)) {
      return node;
    }
    let nodes = [node];
    if (node == null) {
      nodes = this.explorer.nodeEntries.getSelection().selected;
    }
    return nodes;
  }
  loadFolders(user) {
    for (const folder of user.person.sharedFolders) {
      this.node.getNodeMetadata(folder.id).subscribe(node => this.sharedFolders.push(node.node));
    }
  }
  setRoot(root) {
    this.root = root;
    this.searchQuery = null;
    this.routeTo(root, null, null);
    this.actionbarRef.invalidate();
  }
  setSelection(nodes) {
    this.explorer?.nodeEntries.getSelection().clear();
    this.explorer?.nodeEntries.getSelection().select(...nodes);
    this.setFixMobileNav();
  }
  setFixMobileNav() {
    this.mainNavService.getMainNav().setFixMobileElements(this.explorer?.nodeEntries.getSelection().selected?.length > 0);
  }
  closeMetadata() {
    this.workspace.nodeSidebar = null;
    this.workspace.nodeSidebarChange.emit(null);
  }
  openDirectory(id, {
    replaceUrl = false
  } = {}) {
    this.routeTo(this.root, id, null, {
      replaceUrl
    });
  }
  searchGlobal(query) {
    this.routeTo(this.root, null, query);
  }
  openDirectoryFromRoute(params = null) {
    let id = params?.id;
    this.closeMetadata();
    if (!id) {
      this.path = [];
      this.breadcrumbsService.setNodePath(this.path);
      id = this.getRootFolderInternalId();
      if (this.root === 'RECYCLE') {
        this.createAllowed = false;
        // GlobalContainerComponent.finishPreloading();
        // return;
      }
    } else {
      this.selectedNodeTree = id;
      if (id === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME) {
        this.selectedNodeTree = null;
        this.path = [];
      } else {
        this.node.getNodeParents(id, false, [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ALL]).subscribe(data => {
          if (this.root === 'RECYCLE') {
            this.path = [];
            this.breadcrumbsService.setNodePath(this.path);
            this.createAllowed = false;
          } else {
            this.path = data.nodes.reverse();
            this.breadcrumbsService.setNodePath(this.path);
          }
          this.selectedNodeTree = null;
        }, error => {
          this.selectedNodeTree = null;
          this.path = [];
          this.breadcrumbsService.setNodePath(this.path);
        });
      }
    }
    if (this.currentFolder?.ref.id !== id) {
      this.currentFolder = null;
    }
    this.allowBinary = true;
    const root = !id || WorkspacePageComponent.VALID_ROOTS_NODES.indexOf(id) !== -1;
    if (!root) {
      this.isRootFolder = false;
      this.node.getNodeMetadata(id).subscribe(data => {
        this.mds.getSet(data.node.metadataset ? data.node.metadataset : _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.DEFAULT).subscribe(mds => {
          if (mds.create) {
            this.allowBinary = !mds.create.onlyMetadata;
            if (!this.allowBinary) {}
          }
        });
        this.updateNodeByParams(params, data.node);
        this.createAllowed = !this.searchQuery && this.nodeHelper.getNodesRight([data.node], _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_ADD_CHILDREN) ? true : 'EMIT_EVENT';
        this.notAllowedReason = 'WORKSPACE.CREATE_REASON.PERMISSIONS';
        this.recoverScrollposition();
      }, error => {
        this.updateNodeByParams(params, {
          ref: {
            id
          }
        });
      });
    } else {
      this.isRootFolder = true;
      if (id === '-my_shared_files-' || id === '-to_me_shared_files_personal-' || id === '-to_me_shared_files-') {
        this.isRootFolder = false;
      }
      if (id === _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME) {
        this.createAllowed = true;
      } else if (this.root === 'RECYCLE') {
        this.createAllowed = false;
      } else {
        this.createAllowed = 'EMIT_EVENT';
        this.notAllowedReason = 'WORKSPACE.CREATE_REASON.VIRTUAL';
      }
      const node = {
        ref: {
          id
        },
        name: this.translate.instant('WORKSPACE.' + this.root)
      };
      if (this.root === 'MY_FILES') {
        node.access = [_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.ACCESS_ADD_CHILDREN];
      }
      this.updateNodeByParams(params, node);
    }
  }
  openNode(node, useConnector = true) {
    if (this.nodeHelper.isSavedSearchObject(node)) {
      _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.routeToSearchNode(this.router, null, node);
    } else if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestToolService.isLtiObject(node)) {
      this.toolService.openLtiObject(node);
    } else if (useConnector && this.connectors.connectorSupportsEdit(node)) {
      this.editConnector(node);
    } else {
      this.displayNode(node);
    }
  }
  openBreadcrumb(position) {
    this.searchQuery = null;
    if (position > 0) {
      // handled automatically via routing
    } else {
      // TODO: handle with homeRouterLink if possible.
      if (_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIService.evaluateMediaQuery(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.MEDIA_QUERY_MAX_WIDTH, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.MOBILE_TAB_SWITCH_WIDTH)) {
        this.showSelectRoot = true;
      } else {
        this.routeTo(this.root);
      }
    }
  }
  refresh(refreshPath = true, nodes = null) {
    // only refresh properties in this case
    if (nodes && nodes.length) {
      this.updateNodes(nodes);
      return;
    }
    const search = this.searchQuery;
    const folder = this.currentFolder;
    this.currentFolder = null;
    this.searchQuery = null;
    const path = this.path;
    if (refreshPath) {
      this.path = [];
      this.breadcrumbsService.setNodePath(this.path);
    }
    setTimeout(() => {
      this.path = path;
      this.breadcrumbsService.setNodePath(this.path);
      this.currentFolder = folder;
      this.searchQuery = search;
    });
  }
  routeTo(root, node = null, search = null, {
    replaceUrl = false
  } = {}) {
    var _this5 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const params = yield _core_ui_module_ui_helper__WEBPACK_IMPORTED_MODULE_4__.UIHelper.getCommonParameters(_this5.route).toPromise();
      params.root = root;
      params.id = node;
      params.query = search;
      params.mainnav = _this5.mainnav;
      // tslint:disable-next-line:triple-equals
      if (_this5.displayType !== null) {
        params.displayType = _this5.displayType;
      }
      void _this5.router.navigate(['./'], {
        queryParams: params,
        relativeTo: _this5.route,
        replaceUrl
      }).then(result => {
        if (!result) {
          _this5.refresh(false);
        }
      });
    })();
  }
  showAlpha() {
    void this.dialogs.openGenericDialog({
      title: 'WORKSPACE.ALPHA_TITLE',
      message: 'WORKSPACE.ALPHA_MESSAGE',
      buttons: _features_dialogs_dialog_modules_generic_dialog_generic_dialog_data__WEBPACK_IMPORTED_MODULE_6__.OK,
      closable: _features_dialogs_card_dialog_card_dialog_config__WEBPACK_IMPORTED_MODULE_5__.Closable.Disabled
    });
  }
  addToCollection(node) {
    const nodes = this.getNodeList(node);
    this.addNodesToCollection = nodes;
  }
  addToStream(node) {
    const nodes = this.getNodeList(node);
    this.addNodesStream = nodes;
  }
  createVariant(node) {
    const nodes = this.getNodeList(node);
    this.variantNode = nodes[0];
  }
  goToLogin() {
    _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestHelper.goToLogin(this.router, this.config, this.isSafe ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE : '');
  }
  getRootFolderId() {
    if (this.root === 'MY_FILES') {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME;
    }
    if (this.root === 'SHARED_FILES') {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SHARED_FILES;
    }
    if (this.root === 'MY_SHARED_FILES') {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.MY_SHARED_FILES;
    }
    if (this.root === 'TO_ME_SHARED_FILES') {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TO_ME_SHARED_FILES;
    }
    if (this.root === 'WORKFLOW_RECEIVE') {
      return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.WORKFLOW_RECEIVE;
    }
    return '';
  }
  getRootFolderInternalId() {
    if (this.root === 'TO_ME_SHARED_FILES') {
      if (this.toMeSharedToggle) {
        return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TO_ME_SHARED_FILES;
      } else {
        return _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.TO_ME_SHARED_FILES_PERSONAL;
      }
    }
    return this.getRootFolderId();
  }
  listLTI() {
    this.showLtiTools = true;
  }
  recoverScrollposition() {
    window.scrollTo(0, this.storage.get('workspace_scroll', 0));
  }
  applyNode(node, force = false) {
    /*if(node.isDirectory && !force){
        this.dialogTitle='WORKSPACE.APPLY_NODE.DIRECTORY_TITLE';
        this.dialogCancelable=true;
        this.dialogMessage='WORKSPACE.APPLY_NODE.DIRECTORY_MESSAGE';
        this.dialogMessageParameters={name:node.name};
        this.dialogButtons=DialogButton.getYesNo(()=>{
            this.dialogTitle=null;
        },()=>{
            this.dialogTitle=null;
            this.applyNode(node,true);
        });
        return;
    }*/
    this.nodeHelper.addNodeToLms(node, this.reurl);
  }
  updateNodeByParams(params, node) {
    if (!this.loadingTask.isDone) {
      this.loadingTask.done();
    }
    if (params?.query) {
      this.doSearchFromRoute(params, node);
    } else {
      this.searchQuery = null;
      this.currentFolder = node;
      this.event.broadcastEvent(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService.EVENT_NODE_FOLDER_OPENED, this.currentFolder);
    }
  }
  canPasteInCurrentLocation() {
    const clip = this.storage.get('workspace_clipboard');
    return this.currentFolder && !this.searchQuery && clip && (!clip.sourceNode || clip.sourceNode.ref.id !== this.currentFolder.ref.id || clip.copy) && this.createAllowed;
  }
  updateNodes(nodes) {
    for (let node of this.dataSource.getData()) {
      const hit = nodes.filter(n => n.ref.id === node.ref.id);
      if (hit && hit.length === 1) {
        _core_module_rest_helper__WEBPACK_IMPORTED_MODULE_2__.Helper.copyObjectProperties(node, hit[0]);
      }
    }
  }
  prepareActionbar() {
    var _this6 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.toMeSharedToggle = yield _this6.session.get('toMeSharedGroup', _this6.config.instant('workspaceSharedToMeDefaultAll', false)).toPromise();
      const toggle = new ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.OptionItem('OPTIONS.TOGGLE_SHARED_TO_ME', _this6.toMeSharedToggle ? 'edu-content_shared_me_all' : 'edu-content_shared_me_private', () => {
        _this6.toMeSharedToggle = !_this6.toMeSharedToggle;
        toggle.icon = _this6.toMeSharedToggle ? 'edu-content_shared_me_all' : 'edu-content_shared_me_private';
        _this6.session.set('toMeSharedGroup', _this6.toMeSharedToggle);
        _this6.openDirectoryFromRoute();
        //this.treeComponent.reload = Boolean(true);
        _this6.toast.toast('WORKSPACE.TOAST.TO_ME_SHARED_' + (_this6.toMeSharedToggle ? 'ALL' : 'PERSONAL'));
      });
      toggle.isToggle = true;
      toggle.group = ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.DefaultGroups.Toggles;
      toggle.elementType = [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.ElementType.Unknown];
      toggle.priority = 5;
      toggle.customShowCallback = /*#__PURE__*/(0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return _this6.root === 'TO_ME_SHARED_FILES';
      });
      _this6.customOptions.addOptions = [toggle];
    })();
  }
  getLastLocationStorageId() {
    return ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.TemporaryStorageService.WORKSPACE_LAST_LOCATION + (this.isSafe ? _core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.SAFE_SCOPE : '');
  }
  setDisplayType(displayType, refreshRoute = true) {
    if (this.displayType === displayType) {
      return;
    }
    this.displayType = displayType;
    if (refreshRoute) {
      void this.router.navigate(['./'], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParamsHandling: 'merge',
        queryParams: {
          [ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIConstants.QUERY_PARAM_LIST_VIEW_TYPE]: displayType
        }
      });
    }
  }
  createNotAllowed() {
    var _this7 = this;
    return (0,_home_bergatco_Repositories_ITs_JOINTLY_edu_sharing_community_repository_Frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dialogRef = yield _this7.dialogs.openGenericDialog({
        title: 'WORKSPACE.CREATE_REASON.TITLE',
        message: (yield _this7.translate.get(_this7.notAllowedReason).toPromise()) + '\n' + (yield _this7.translate.get('WORKSPACE.CREATE_REASON.GENERAL').toPromise()),
        buttons: [{
          label: 'WORKSPACE.GO_TO_HOME',
          config: {
            color: 'primary',
            position: 'opposite'
          }
        }, {
          label: 'CLOSE',
          config: {
            color: 'standard'
          }
        }]
      });
      dialogRef.afterClosed().subscribe(response => {
        if (response === 'WORKSPACE.GO_TO_HOME') {
          _this7.openDirectory(_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConstants.USERHOME);
        }
      });
    })();
  }
  onDeleteNodes(nodes) {
    this.dialogs.openDeleteNodesDialog({
      nodes
    });
    // this.mainNavService.getDialogs().nodeDelete = nodes;
  }
  static #_3 = this.ɵfac = function WorkspacePageComponent_Factory(t) {
    return new (t || WorkspacePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.AppContainerService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_shared_components_breadcrumbs_breadcrumbs_service__WEBPACK_IMPORTED_MODULE_10__.BreadcrumbsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_card_service__WEBPACK_IMPORTED_MODULE_11__.CardService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.ConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestConnectorsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_features_dialogs_dialogs_service__WEBPACK_IMPORTED_MODULE_12__.DialogsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.FrameEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestIamService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_loading_screen_loading_screen_service__WEBPACK_IMPORTED_MODULE_13__.LoadingScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.LocalEventsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_navigation_main_nav_service__WEBPACK_IMPORTED_MODULE_14__.MainNavService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestMdsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestNodeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_node_helper_service__WEBPACK_IMPORTED_MODULE_15__.NodeHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_30__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_30__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_main_navigation_search_field_search_field_service__WEBPACK_IMPORTED_MODULE_16__.SearchFieldService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.SessionStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.TemporaryStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_31__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_toast__WEBPACK_IMPORTED_MODULE_17__.Toast), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.RestToolService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_32__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.TranslationsService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](ngx_edu_sharing_api__WEBPACK_IMPORTED_MODULE_31__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_theme_service__WEBPACK_IMPORTED_MODULE_18__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_core_module_core_module__WEBPACK_IMPORTED_MODULE_1__.UIService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_workspace_service__WEBPACK_IMPORTED_MODULE_19__.WorkspaceService));
  };
  static #_4 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
    type: WorkspacePageComponent,
    selectors: [["es-workspace-page"]],
    viewQuery: function WorkspacePageComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_tree_tree_component__WEBPACK_IMPORTED_MODULE_7__.WorkspaceTreeComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_recycle_recycle_component__WEBPACK_IMPORTED_MODULE_9__.RecycleMainComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.explorer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.treeComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.recycleMainComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.actionbarRef = _t.first);
      }
    },
    hostBindings: function WorkspacePageComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("beforeunload", function WorkspacePageComponent_beforeunload_HostBindingHandler($event) {
          return ctx.beforeunloadHandler($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresolveWindow"]);
      }
    },
    decls: 10,
    vars: 5,
    consts: [["cdkDropList", "", 1, "frame", 3, "cdkDropListSortingDisabled"], [1, "topbarFrame"], [1, "mobile-move-top"], [3, "searchQuery", "home", "canDropNodes", "onDrop", "onClick", 4, "ngIf"], ["actionbar", ""], ["class", "workspace-container isBlocked", 4, "ngIf"], ["class", "workspace-container", 3, "hide", 4, "ngIf"], [4, "ngIf"], [3, "searchQuery", "home", "canDropNodes", "onDrop", "onClick"], [1, "workspace-container", "isBlocked"], [1, "workspace-container"], ["class", "dialog", 3, "click", 4, "ngIf"], ["class", "selectRootMenu collection", 4, "ngIf"], ["class", "tree", 4, "ngIf"], ["class", "explorer", 3, "actionbar", 4, "ngIf"], ["esTitle", "", 1, "cdk-visually-hidden"], ["class", "explorer", "role", "main", "esSkipTarget", "MAIN_CONTENT", "appCreateContextMenu", "", 3, "current", "root", "searchQuery", "customOptions", "displayType", "reorderDialog", "preventKeyevents", "dataSource", "actionbar", "refreshTree", "displayTypeChange", "reorderDialogChange", "onSearchGlobal", "onDrop", "onViewNode", "onOpenNode", "onReset", 4, "ngIf"], [1, "dialog", 3, "click"], [1, "selectRootMenu", "collection"], [1, "collection-item", 3, "click"], ["esIcon", "person"], ["esIcon", "group"], ["esIcon", "share"], ["esIcon", "send"], ["esIcon", "inbox"], ["esIcon", "delete"], [1, "tree"], [3, "path", "selectedNode", "root", "workspace", "isSafe", "onDrop", "onSetRoot", "onOpenNode", "onDeleteNodes"], [3, "quota", 4, "ngIf"], [3, "quota"], [1, "explorer", 3, "actionbar"], ["role", "main", "esSkipTarget", "MAIN_CONTENT", "appCreateContextMenu", "", 1, "explorer", 3, "current", "root", "searchQuery", "customOptions", "displayType", "reorderDialog", "preventKeyevents", "dataSource", "actionbar", "refreshTree", "displayTypeChange", "reorderDialogChange", "onSearchGlobal", "onDrop", "onViewNode", "onOpenNode", "onReset"], ["explorer", ""]],
    template: function WorkspacePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, WorkspacePageComponent_es_breadcrumbs_3_Template, 1, 3, "es-breadcrumbs", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "es-actionbar", null, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, WorkspacePageComponent_div_6_Template, 3, 3, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](7, WorkspacePageComponent_div_7_Template, 9, 10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](8, WorkspacePageComponent_es_global_progress_8_Template, 1, 0, "es-global-progress", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](9, "es-metadata-sidebar");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("cdkDropListSortingDisabled", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.isLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.isBlocked);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx.isBlocked);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.globalProgress);
      }
    },
    styles: ["\n\n.frame[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.topbarFrame[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--mainnavHeight);\n  z-index: 60;\n}\n.topbarFrame[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 65px;\n  background-color: #fff;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  display: flex;\n}\n.topbarFrame[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > es-breadcrumbs[_ngcontent-%COMP%] {\n  padding-left: 30px;\n  flex-grow: 1;\n  height: 100%;\n}\n.topbarFrame[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > es-actionbar[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  height: 100%;\n  padding: 0 10px;\n  display: flex;\n  align-items: center;\n  z-index: 62;\n  background: linear-gradient(to right, rgba(255, 255, 255, 0.001) 0, #fff 10px, #fff 100%); \n\n}\n.topbarFrame[_ngcontent-%COMP%]     .breadcrumb div {\n  word-break: break-all;\n}\n\n.workspace-container[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.isBlocked[_ngcontent-%COMP%] {\n  position: absolute;\n  color: rgba(0, 0, 0, 0.54);\n  font-size: 150%;\n  text-align: center;\n  width: 100%;\n  padding-top: 25px;\n}\n\n.tree[_ngcontent-%COMP%] {\n  display: table-cell;\n}\n\n.globalProgress[_ngcontent-%COMP%] {\n  z-index: 122;\n}\n\n.tree[_ngcontent-%COMP%] {\n  min-width: 300px;\n  max-width: 300px;\n  top: calc(65px + var(--mainnavHeight));\n  position: fixed;\n  height: calc(100% - 65px - var(--mainnavHeight));\n  z-index: 2;\n  background: #f7f7f7;\n}\n.tree[_ngcontent-%COMP%]   es-workspace-tree[_ngcontent-%COMP%] {\n  min-width: 300px;\n  max-width: 300px;\n  top: calc(65px + var(--mainnavHeight));\n  position: fixed;\n  height: calc(100% - 65px - var(--mainnavHeight));\n  overflow-y: auto;\n}\n.tree[_ngcontent-%COMP%]   .tree-quota[_ngcontent-%COMP%] {\n  height: calc(\n            100% - 65px - var(--mainnavHeight) - 60px\n        );\n}\n\nes-user-quota[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 300px;\n  height: 60px;\n  background: #f7f7f7;\n  bottom: 0;\n  z-index: 3;\n  padding: 10px 20px;\n}\n\n.nodeRender[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.addDesktop[_ngcontent-%COMP%], .addMobile[_ngcontent-%COMP%] {\n  z-index: 65;\n}\n\n.addMobile[_ngcontent-%COMP%] {\n  z-index: 66;\n  position: fixed;\n  right: 25px;\n  bottom: 87px;\n  display: none;\n}\n\n.dialog[_ngcontent-%COMP%] {\n  z-index: 131;\n}\n\n.selectRootMenu[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 250px;\n  left: 311px;\n  top: calc(14px + var(--mainnavHeight));\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3019607843);\n  z-index: 132;\n  cursor: pointer;\n  background-color: #fff;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n}\n\n.selectRootMenu[_ngcontent-%COMP%]   .collection-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: var(--textLight);\n  padding: 8px 15px;\n  gap: 8px;\n}\n\n.rootSelected[_ngcontent-%COMP%] {\n  color: var(--primary) !important;\n  font-weight: bold;\n  background: linear-gradient(to right, var(--primary) 0, var(--primary) 5px, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 0) 5px);\n  background-color: #fff;\n}\n\n.explorer[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  left: 300px;\n  width: calc(100% - 300px);\n  transition: all var(--transitionNormal);\n}\n\n.explorerMetadata[_ngcontent-%COMP%] {\n  width: calc(100% - 600px);\n}\n\n.viewType[_ngcontent-%COMP%] {\n  position: fixed;\n  color: var(--textLight);\n  padding-top: 20px;\n  padding-right: 25px;\n  right: 0;\n  z-index: 97;\n}\n\n.viewType[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  \n\n}\n\n.tree[_ngcontent-%COMP%] {\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n\n@media screen and (max-width: 1300px) {\n  .explorerMetadata[_ngcontent-%COMP%] {\n    width: calc(100% - 300px);\n  }\n}\n@media screen and (max-width: 1100px) {\n  \n\n\n\n\n\n}\n@media screen and (max-width: 900px) {\n  .tree[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .selectRootMenu[_ngcontent-%COMP%] {\n    left: 10px;\n  }\n  .addMobile[_ngcontent-%COMP%] {\n    display: inherit;\n  }\n  .topbarFrame[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > es-breadcrumbs[_ngcontent-%COMP%] {\n    padding-left: 20px;\n  }\n  .explorer[_ngcontent-%COMP%] {\n    left: 0;\n    width: 100%;\n    height: calc(100% - (var(--mainnavHeight) + 127px));\n  }\n  [_nghost-%COMP%]     es-workspace-explorer .list {\n    margin-bottom: 62px;\n  }\n}\n@media screen and (max-width: 700px) {\n  \n\n\n\n\n\n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9wYWdlcy93b3Jrc3BhY2UtcGFnZS93b3Jrc3BhY2UtcGFnZS5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3Byb2plY3RzL2VkdS1zaGFyaW5nLXVpL2Fzc2V0cy9zY3NzL21peGlucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGdFQUFBO0FDSEE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7QUFBSjs7QUFHQTtFQUNJLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0FBQUo7QUFDSTtFQUNJLFdBQUE7RUFDQSxZRHNCYTtFQ3JCYixzQkFBQTtFQ0tKLHNDQUFBO0VESEksYUFBQTtBQUNSO0FBQVE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBRVo7QUFBUTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLHlGQUFBLEVBS0csZUFBQTtBQUhmO0FBUVk7RUFDSSxxQkFBQTtBQU5oQjs7QUFZQTtFQUNJLGFBQUE7QUFUSjs7QUFZQTtFQUNJLGtCQUFBO0VBQ0EsMEJEZ0JhO0VDZmIsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBVEo7O0FBWUE7RUFDSSxtQkFBQTtBQVRKOztBQVlBO0VBQ0ksWUFBQTtBQVRKOztBQWFBO0VBQ0ksZ0JEckJpQjtFQ3NCakIsZ0JEdEJpQjtFQ3VCakIsc0NBQUE7RUFDQSxlQUFBO0VBQ0EsZ0RBQUE7RUFDQSxVQUFBO0VBQ0EsbUJEL0JzQjtBQ3FCMUI7QUFXSTtFQUNJLGdCRDdCYTtFQzhCYixnQkQ5QmE7RUMrQmIsc0NBQUE7RUFDQSxlQUFBO0VBQ0EsZ0RBQUE7RUFDQSxnQkFBQTtBQVRSO0FBV0k7RUFDSTs7U0FBQTtBQVBSOztBQWFBO0VBQ0ksa0JBQUE7RUFDQSxZRDdDaUI7RUM4Q2pCLFlBM0JVO0VBNEJWLG1CRG5Ec0I7RUNvRHRCLFNBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7QUFWSjs7QUFZQTtFQUNJLGFBQUE7QUFUSjs7QUFXQTs7RUFFSSxXQUFBO0FBUko7O0FBVUE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQVBKOztBQVVBO0VBQ0ksWUFBQTtBQVBKOztBQVNBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esc0NBQUE7RUFDQSwrQ0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esc0JEckdjO0VDc0dkLHlCQUFBO0VBQ0Esa0JBQUE7QUFOSjs7QUFRQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCRHRIUTtFQ3VIUixpQkFBQTtFQUNBLFFBQUE7QUFMSjs7QUFPQTtFQUNJLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSx1SEQxRm9DO0VDMkZwQyxzQkFBQTtBQUpKOztBQU1BO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsdUNBQUE7QUFISjs7QUFNQTtFQUNJLHlCQUFBO0FBSEo7O0FBTUE7RUFDSSxlQUFBO0VBQ0EsdUJEOUlRO0VDK0lSLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtBQUhKOztBQUtBO0VBQ0ksZ0NBQUE7QUFGSjs7QUFLQTtFQ3JKSSxzQ0FBQTtBRG9KSjs7QUFLQTtFQUNJO0lBQ0kseUJBQUE7RUFGTjtBQUNGO0FBSUE7RUFDSTs7OztHQUFBO0FBRUo7QUFLQTtFQUNJO0lBQ0ksYUFBQTtFQUhOO0VBS0U7SUFDSSxVQUFBO0VBSE47RUFLRTtJQUNJLGdCQUFBO0VBSE47RUFLRTtJQUNJLGtCQUFBO0VBSE47RUFLRTtJQUNJLE9BQUE7SUFDQSxXQUFBO0lBQ0EsbURBQUE7RUFITjtFQU1NO0lBQ0ksbUJBQUE7RUFKVjtBQUNGO0FBUUE7RUFDSTs7Ozs7R0FBQTtBQURKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AaW1wb3J0ICdicmFuZGluZyc7XG5cbi8vIEFsbCB2YXJpYWJsZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gYGJyYW5kaW5nLnNjc3NgLlxuLyogcmVwbGFjZSB2YXJpYWJsZXMgd2hpY2ggYXJlIG1heSBub3QgZGVmaW5lZCBpbiB0aGUgYnJhbmRpbmcgKi9cbiRwcmltYXJ5VmVyeUxpZ2h0OiB2YXIoLS1wYWxldHRlLXByaW1hcnktNTApICFkZWZhdWx0O1xuJHByaW1hcnlNZWRpdW1EYXJrOiB2YXIoLS1wYWxldHRlLXByaW1hcnktNzAwKSAhZGVmYXVsdDtcblxuJHRhYkNvbG9yOiB2YXIoLS1wcmltYXJ5KSAhZGVmYXVsdDtcbiR0YWJDb2xvckRhcms6IHZhcigtLXByaW1hcnkpICFkZWZhdWx0O1xuJHRhYkNvbG9yTGlnaHQ6ICRwcmltYXJ5TWVkaXVtTGlnaHQgIWRlZmF1bHQ7XG4kd2FybmluZzogI2NkMjQ1NyAhZGVmYXVsdDtcbiR3YXJuaW5nTWVkaXVtOiAjZTk4YzFiICFkZWZhdWx0O1xuJHRvYXN0TGVmdEVycm9yOiAjYzE1ZDVkICFkZWZhdWx0O1xuJHRvYXN0UHJpbWFyeTogIzMzMzMzMyAhZGVmYXVsdDtcbiR0ZXh0TGlnaHQ6IHZhcigtLXRleHRMaWdodCkgIWRlZmF1bHQ7XG4kdGV4dE1lZGl1bUxpZ2h0OiB2YXIoLS10ZXh0TWVkaXVtTGlnaHQpICFkZWZhdWx0O1xuJHRleHRWZXJ5TGlnaHQ6ICNhYWEgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tdGV4dE1haW4pXG4kdGV4dE1haW46ICMzODM4MzggIWRlZmF1bHQ7XG4kdGV4dFJlbmRlcmluZ0xhYmVsczogIzZmNmY2ZiAhZGVmYXVsdDtcbiRmb250U2l6ZVhMYXJnZTogMTIwJSAhZGVmYXVsdDtcbiRmb250U2l6ZUxhcmdlOiAxMTAlICFkZWZhdWx0O1xuJGZvbnRTaXplU21hbGw6IDkwJSAhZGVmYXVsdDtcbiRmb250U2l6ZVhTbWFsbDogdmFyKC0tZm9udFNpemVYU21hbGwpICFkZWZhdWx0O1xuJGJhY2tncm91bmRDb2xvcjogI2ZmZiAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTaWRlYmFyV2lkdGg6IDMwMHB4ICFkZWZhdWx0O1xuJHdvcmtzcGFjZUluaGVyaXRDb2xvcjogIzQyY2E4ZCAhZGVmYXVsdDtcbiRlZGl0b3JpYWxDb2xsZWN0aW9uc0JhY2tncm91bmQ6ICNmNWVjMTkgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkQmFja2dyb3VuZDogJHByaW1hcnlWZXJ5TGlnaHQgIWRlZmF1bHQ7XG4kaXRlbVNlbGVjdGVkVGV4dENvbG9yOiAkcHJpbWFyeU1lZGl1bURhcmsgIWRlZmF1bHQ7XG4kYnV0dG9uSG92ZXJCYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhbGV0dGUtcHJpbWFyeS01MDAtbm8tcmdiKSwgMC4wOCkgIWRlZmF1bHQ7XG4kd29ya3NwYWNlTmV3QmFja2dyb3VuZDogJGl0ZW1TZWxlY3RlZEJhY2tncm91bmQgIWRlZmF1bHQ7XG4vLyB0aGUgd2hpdGUgYmFyIGhlaWdodCBpbiBzZWFyY2ggYW5kIGVzLXdvcmtzcGFjZVxuJHNlY29uZGFyeUJhckhlaWdodDogNjVweCAhZGVmYXVsdDtcbiRsaXN0SXRlbVNlbGVjdGVkQmFja2dyb3VuZDogdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTUwKSAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VTZWxlY3RlZEJhY2tncm91bmRFZmZlY3Q6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgICAgIHZhcigtLXByaW1hcnkpIDVweCxcbiAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSA1cHgsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4gICAgKVxuICAgIG5vLXJlcGVhdCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJTYWZlQmFja2dyb3VuZDogIzk2M2EzYTtcbiRkaWFsb2dSaWdodFdpZHRoOiAzMjBweCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUcmVlU2VsZWN0ZWRCYWNrZ3JvdW5kOiAjZmZmICFkZWZhdWx0O1xuJHdvcmtzcGFjZVRyZWVXaWR0aDogMzAwcHggIWRlZmF1bHQ7XG4kd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHQ6ICRzZWNvbmRhcnlCYXJIZWlnaHQgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDogbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgIHZhcigtLXByaW1hcnkpIDAsXG4gICAgdmFyKC0tcHJpbWFyeSkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMCkgNXB4XG4pICFkZWZhdWx0O1xuJHdvcmtzcGFjZU1ldGFkYXRhQmFja2dyb3VuZDogI2Y3ZjdmNyAhZGVmYXVsdDtcbiRidXR0b25Cb3JkZXJSYWRpdXM6IDJweCAhZGVmYXVsdDtcbiRjb250ZXh0TWVudVdpZHRoOiAyNDBweCAhZGVmYXVsdDtcbiR0YWJsZUljb25TaXplOiAzOHB4ICFkZWZhdWx0O1xuJGFjdGlvbkRpYWxvZ0JhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kY2FyZExpZ2h0QmFja2dyb3VuZDogI2Y5ZjlmOSAhZGVmYXVsdDtcbiRzZWFyY2hJbnB1dEJvcmRlckNvbG9yOiAjY2NjICFkZWZhdWx0O1xuJGNhcmRTZXBhcmF0b3JMaW5lQ29sb3I6ICNjY2MgIWRlZmF1bHQ7XG4kZ2VuZXJpY1NlcGVyYXRvckxpbmVDb2xvcjogI2VjZWNlYyAhZGVmYXVsdDtcbiRpbnB1dEJvcmRlckNvbG9yOiAjOWU5ZTllICFkZWZhdWx0O1xuJGNvbW1lbnRzQWN0aW9uc1NlcGVyYXRvckxpbmVDb2xvcjogJGJhY2tncm91bmRDb2xvciAhZGVmYXVsdDtcbiRub1Jlc3VsdHNDb2xvcjogcmdiYShibGFjaywgMC41NCkgIWRlZmF1bHQ7XG4kZGFya2VuQ29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSkgIWRlZmF1bHQ7XG4kZGFya2VuTGlnaHRDb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KSAhZGVmYXVsdDtcbi8vIHByZWZlciB1c2luZyB2YXIoLS0kY29sb3JTdGF0dXNQb3NpdGl2ZSlcbiRjb2xvclN0YXR1c1Bvc2l0aXZlOiAjNDBiZjhlICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLWNvbG9yU3RhdHVzTmVnYXRpdmUpXG4kY29sb3JTdGF0dXNOZWdhdGl2ZTogI2NkMjQ1NyAhZGVmYXVsdDtcbiRjb2xvclN0YXR1c1dhcm5pbmc6ICR3YXJuaW5nTWVkaXVtICFkZWZhdWx0O1xuJGNvbG9yU3RhdHVzUmVjb21tZW5kZWQ6ICNhY2QzMzEgIWRlZmF1bHQ7XG4kY29sb3JTdGF0dXNOZXV0cmFsOiAjNzc3ICFkZWZhdWx0O1xuJGNvbG9yU3RhckFjdGl2ZTogdmFyKC0tY29sb3JTdGFyQWN0aXZlKSAhZGVmYXVsdDtcbiRmb2N1c0NvbG9yOiB2YXIoLS1wYWxldHRlLXByaW1hcnktMzAwKSAhZGVmYXVsdDtcbiRwbGFjZWhvbGRlckNvbG9yOiAjNzY3Njc2ICFkZWZhdWx0O1xuJGZvY3VzV2lkdGg6IDJweCAhZGVmYXVsdDtcbiRjYXJkV2lkdGg6IHZhcigtLWNhcmRXaWR0aCkgIWRlZmF1bHQ7XG4kY2FyZEhlaWdodDogMzAwcHggIWRlZmF1bHQ7XG4kbGlzdEl0ZW1IZWlnaHQ6IDcwcHggIWRlZmF1bHQ7XG4kbGlzdENhcmRTbWFsbEhlaWdodDogMTAwcHggIWRlZmF1bHQ7XG4kbGlzdEhlYWRpbmdIZWlnaHQ6IDM2cHggIWRlZmF1bHQ7XG4kY2FyZFBhZGRpbmc6IDI1cHggIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbk5vcm1hbDogdmFyKC0tdHJhbnNpdGlvbk5vcm1hbCkgIWRlZmF1bHQ7XG4vLyBwcmVmZXIgdXNpbmcgdmFyKC0tbW9iaWxlV2lkdGgpXG4kbW9iaWxlV2lkdGg6IDcwMHB4ICFkZWZhdWx0O1xuLy8gcHJlZmVyIHVzaW5nIHZhcigtLW1vYmlsZVN0YWdlKVxuJG1vYmlsZVN0YWdlOiAxMDBweCAhZGVmYXVsdDtcbiRtb2JpbGVIZWlnaHQ6IDc1MHB4ICFkZWZhdWx0O1xuJG1vYmlsZUhlaWdodFdpdGhLZXlib2FyZDogNTUwcHggIWRlZmF1bHQ7XG4kbW9iaWxlSGVpZ2h0TGFuZHNjYXBlOiA0MDBweCAhZGVmYXVsdDtcbiRtb2JpbGVXaWR0aFBvcnRyYWl0OiA0MDBweCAhZGVmYXVsdDtcbi8vIHRoaXMgZmFjdG9yIHNob3VsZCBiZSBtdWx0aXBsaWVkIGJ5IGEgbmF0dXJhbCBudW1iZXIsIGUuZy4gKjMgbWVhbnMgc3RhZ2UgMyAocmVsYXRpdmVseSBlYXJseSlcbiRkaWFsb2daSW5kZXg6IDEzMCAhZGVmYXVsdDtcbi8vIGJlZm9yZSB0aGUgdG9wIGJhciBvbiBtb2JpbGUsIGJ1dCBiZWhpbmQgdGhlIG1vYmlsZSB0YWJzIGFuZCB0aGUgdG9wIGJhciBvbiBkZXNrdG9wXG4kZGlhbG9nTm9uTW9kYWxaSW5kZXg6IDkwICFkZWZhdWx0OyAvLyBiZWZvcmUgdGhlIHRvcCBiYXIgb24gbW9iaWxlLCBidXQgYmVoaW5kIHRoZSBtb2JpbGUgdGFicyBhbmQgdGhlIHRvcCBiYXIgb24gZGVza3RvcFxuJHRvcEJhclpJbmRleDogOTggIWRlZmF1bHQ7XG4kdG9wQmFyTW9iaWxlWkluZGV4OiA4MCAhZGVmYXVsdDtcbiR3b3Jrc3BhY2VUb3BCYXJJbnB1dEJhY2tncm91bmQ6ICNlZWUgIWRlZmF1bHQ7XG4kd29ya3NwYWNlVG9wQmFySW5wdXRUZXh0OiAkdGV4dE1haW4gIWRlZmF1bHQ7XG4kbW9iaWxlVGFic1pJbmRleDogMTEwICFkZWZhdWx0O1xuJG1vYmlsZVRhYlN3aXRjaFdpZHRoOiAkbW9iaWxlV2lkdGggKyAkbW9iaWxlU3RhZ2UgKiAyICFkZWZhdWx0O1xuJG1vYmlsZVRhYk5hdkhlaWdodDogNjJweCAhZGVmYXVsdDtcbiRwcmltYXJ5Rm9udEZhbWlseTogJ29wZW5fc2Fuc3JlZ3VsYXInICFkZWZhdWx0O1xuJHByaW1hcnlGb250U2l6ZTogMTBwdCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY2hpcC1jb2xvcnM6IChcbiAgICAnY2Nsb21fZ2VuZXJhbF9rZXl3b3JkJzogcmdiKDE2NiwgMjE0LCAyMDgpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxjb250ZXh0JzogcmdiKDIxNCwgMTY2LCAxNjYpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxsZWFybmluZ3Jlc291cmNldHlwZSc6IHJnYigyMTQsIDE5MywgMTY2KSxcbiAgICAnY2NtX29iamVjdHR5cGUnOiByZ2IoMTY2LCAxOTIsIDIxNCksXG4gICAgJ2NjbV90YXhvbmlkJzogcmdiKDE2NiwgMjE0LCAxNzQpLFxuICAgICdjY21fZWR1Y2F0aW9uYWxpbnRlbmRlZGVuZHVzZXJyb2xlJzogcmdiKDIxMSwgMjE0LCAxNjYpLFxuKTtcbiRjdXN0b20tY2hpcC1jb2xvcnM6ICgpICFkZWZhdWx0O1xuJGNoaXAtY29sb3JzOiBtYXAubWVyZ2UoJGRlZmF1bHQtY2hpcC1jb2xvcnMsICRjdXN0b20tY2hpcC1jb2xvcnMpO1xuXG5AaW1wb3J0ICdtaXhpbnMnO1xuIiwiQGltcG9ydCAnLi4vLi4vY29yZS11aS1tb2R1bGUvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbi5mcmFtZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4udG9wYmFyRnJhbWUge1xuICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgdG9wOiB2YXIoLS1tYWlubmF2SGVpZ2h0KTtcbiAgICB6LWluZGV4OiA2MDtcbiAgICA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6ICR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgQGluY2x1ZGUgbWF0ZXJpYWxTaGFkb3coKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgPiBlcy1icmVhZGNydW1icyB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgPiBlcy1hY3Rpb25iYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIHotaW5kZXg6IDYyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMDEpIDAsXG4gICAgICAgICAgICAgICAgI2ZmZiAxMHB4LFxuICAgICAgICAgICAgICAgICNmZmYgMTAwJVxuICAgICAgICAgICAgKTsgLyogc2FmYXJpIGZpeCAqL1xuICAgICAgICB9XG4gICAgfVxuICAgIDo6bmctZGVlcCB7XG4gICAgICAgIC5icmVhZGNydW1iIHtcbiAgICAgICAgICAgIGRpdiB7XG4gICAgICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4ud29ya3NwYWNlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLmlzQmxvY2tlZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAkbm9SZXN1bHRzQ29sb3I7XG4gICAgZm9udC1zaXplOiAxNTAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nLXRvcDogMjVweDtcbn1cblxuLnRyZWUge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG59XG5cbi5nbG9iYWxQcm9ncmVzcyB7XG4gICAgei1pbmRleDogMTIyO1xufVxuXG4kcXVvdGFIZWlnaHQ6IDYwcHg7XG4udHJlZSB7XG4gICAgbWluLXdpZHRoOiAkd29ya3NwYWNlVHJlZVdpZHRoO1xuICAgIG1heC13aWR0aDogJHdvcmtzcGFjZVRyZWVXaWR0aDtcbiAgICB0b3A6IGNhbGMoI3skd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHR9ICsgdmFyKC0tbWFpbm5hdkhlaWdodCkpO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICN7JHdvcmtzcGFjZUJyZWFkY3J1bWJzSGVpZ2h0fSAtIHZhcigtLW1haW5uYXZIZWlnaHQpKTtcbiAgICB6LWluZGV4OiAyO1xuICAgIGJhY2tncm91bmQ6ICR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDtcbiAgICBlcy13b3Jrc3BhY2UtdHJlZSB7XG4gICAgICAgIG1pbi13aWR0aDogJHdvcmtzcGFjZVRyZWVXaWR0aDtcbiAgICAgICAgbWF4LXdpZHRoOiAkd29ya3NwYWNlVHJlZVdpZHRoO1xuICAgICAgICB0b3A6IGNhbGMoI3skd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHR9ICsgdmFyKC0tbWFpbm5hdkhlaWdodCkpO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gI3skd29ya3NwYWNlQnJlYWRjcnVtYnNIZWlnaHR9IC0gdmFyKC0tbWFpbm5hdkhlaWdodCkpO1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cbiAgICAudHJlZS1xdW90YSB7XG4gICAgICAgIGhlaWdodDogY2FsYyhcbiAgICAgICAgICAgIDEwMCUgLSAjeyR3b3Jrc3BhY2VCcmVhZGNydW1ic0hlaWdodH0gLSB2YXIoLS1tYWlubmF2SGVpZ2h0KSAtICN7JHF1b3RhSGVpZ2h0fVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXMtdXNlci1xdW90YSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAkd29ya3NwYWNlVHJlZVdpZHRoO1xuICAgIGhlaWdodDogJHF1b3RhSGVpZ2h0O1xuICAgIGJhY2tncm91bmQ6ICR3b3Jrc3BhY2VUcmVlQmFja2dyb3VuZDtcbiAgICBib3R0b206IDA7XG4gICAgei1pbmRleDogMztcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG59XG4ubm9kZVJlbmRlciB7XG4gICAgcGFkZGluZzogMjBweDtcbn1cbi5hZGREZXNrdG9wLFxuLmFkZE1vYmlsZSB7XG4gICAgei1pbmRleDogNjU7XG59XG4uYWRkTW9iaWxlIHtcbiAgICB6LWluZGV4OiA2NjtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgcmlnaHQ6IDI1cHg7XG4gICAgYm90dG9tOiAyNXB4ICsgJG1vYmlsZVRhYk5hdkhlaWdodDtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuLy8gQmFja2Ryb3AgZm9yIGRyb3Bkb3duIC5zZWxlY3RSb290TWVudVxuLmRpYWxvZyB7XG4gICAgei1pbmRleDogMTMxO1xufVxuLnNlbGVjdFJvb3RNZW51IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDI1MHB4O1xuICAgIGxlZnQ6IDMxMXB4O1xuICAgIHRvcDogY2FsYygxNHB4ICsgdmFyKC0tbWFpbm5hdkhlaWdodCkpO1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggIzAwMDAwMDRkO1xuICAgIHotaW5kZXg6IDEzMjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmRDb2xvcjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cbi5zZWxlY3RSb290TWVudSAuY29sbGVjdGlvbi1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sb3I6ICR0ZXh0TGlnaHQ7XG4gICAgcGFkZGluZzogOHB4IDE1cHg7XG4gICAgZ2FwOiA4cHg7XG59XG4ucm9vdFNlbGVjdGVkIHtcbiAgICBjb2xvcjogJHByaW1hcnkgIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBiYWNrZ3JvdW5kOiAkd29ya3NwYWNlVHJlZVNlbGVjdGVkQmFja2dyb3VuZEVmZmVjdDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuLmV4cGxvcmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbGVmdDogMzAwcHg7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgJHRyYW5zaXRpb25Ob3JtYWw7XG59XG5cbi5leHBsb3Jlck1ldGFkYXRhIHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gNjAwcHgpO1xufVxuXG4udmlld1R5cGUge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBjb2xvcjogJHRleHRMaWdodDtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyNXB4O1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IDk3O1xufVxuLnZpZXdUeXBlIGRpdiB7XG4gICAgLyogYm9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjY2M7ICovXG59XG5cbi50cmVlIHtcbiAgICBAaW5jbHVkZSBtYXRlcmlhbFNoYWRvdygpO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSo2KSkge1xuICAgIC5leHBsb3Jlck1ldGFkYXRhIHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcbiAgICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVdpZHRoKyRtb2JpbGVTdGFnZSo0KSkge1xuICAgIC8qXG4gIC5icmVhZGNydW1iRnJhbWV7XG4gICAgcGFkZGluZy1yaWdodDoxNzBweDtcbiAgfVxuICAqL1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAoJG1vYmlsZVRhYlN3aXRjaFdpZHRoKSkge1xuICAgIC50cmVlIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLnNlbGVjdFJvb3RNZW51IHtcbiAgICAgICAgbGVmdDogMTBweDtcbiAgICB9XG4gICAgLmFkZE1vYmlsZSB7XG4gICAgICAgIGRpc3BsYXk6IGluaGVyaXQ7XG4gICAgfVxuICAgIC50b3BiYXJGcmFtZSA+IGRpdiA+IGVzLWJyZWFkY3J1bWJzIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIH1cbiAgICAuZXhwbG9yZXIge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAodmFyKC0tbWFpbm5hdkhlaWdodCkgKyAjeyRzZWNvbmRhcnlCYXJIZWlnaHQrJG1vYmlsZVRhYk5hdkhlaWdodH0pKTtcbiAgICB9XG4gICAgOmhvc3QgOjpuZy1kZWVwIHtcbiAgICAgICAgZXMtd29ya3NwYWNlLWV4cGxvcmVyIC5saXN0IHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDYycHg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGVXaWR0aCkge1xuICAgIC8qXG4gIC5tZXRhZGF0YXtcbiAgICBtYXgtd2lkdGg6bm9uZTtcbiAgICB3aWR0aDoxMDAlO1xuICB9XG4gICovXG59XG4iLCJAbWl4aW4gY2xpY2thYmxlKCkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5AbWl4aW4gbGltaXRMaW5lQ291bnQoJGNvdW50LCAkbGluZUhlaWdodDogMSkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lSGVpZ2h0ICsgZW07XG4gICAgbWF4LWhlaWdodDogJGNvdW50ICogJGxpbmVIZWlnaHQgKyBlbTtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6ICRjb3VudDsgLyogbnVtYmVyIG9mIGxpbmVzIHRvIHNob3cgKi9cbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC8qIGF1dG9wcmVmaXhlcjogb2ZmICovXG59XG5AbWl4aW4gbWF0ZXJpYWxTaGFkb3coJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd0JvdHRvbSgkb3BhY2l0eTogMC4xKSB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggM3B4IHJnYmEoMCwgMCwgMCwgJG9wYWNpdHkpO1xufVxuQG1peGluIG1hdGVyaWFsU2hhZG93U21hbGwoJGltcG9ydGFudDogZmFsc2UpIHtcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4zKSBpZigkaW1wb3J0YW50LCAhaW1wb3J0YW50LCBudWxsKTtcbn1cbkBtaXhpbiBtYXRlcmlhbFNoYWRvd01lZGl1bUxhcmdlKCRpbXBvcnRhbnQ6IGZhbHNlLCAkb3BhY2l0eTogMC42KSB7XG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgwLCAwLCAwLCAkb3BhY2l0eSkgaWYoJGltcG9ydGFudCwgIWltcG9ydGFudCwgbnVsbCk7XG59XG5AbWl4aW4gbWF0ZXJpYWxTY3JvbGxiYXIoKSB7XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICAgIG1heC13aWR0aDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgLy8gLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwwLDAsLjMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB9XG59XG5AbWl4aW4gcmVtb3ZlRGVmYXVsdEZvY3VzKCkge1xuICAgIG91dGxpbmU6IG5vbmU7XG59XG5AbWl4aW4gc2V0R2xvYmFsS2V5Ym9hcmRGb2N1cygkbW9kZTogJ291dGxpbmUnKSB7XG4gICAgLy9yZXNwZWN0IGVsZW1lbnQgYm9yZGVyIHJhZGl1c1xuICAgIEBpbmNsdWRlIHJlbW92ZURlZmF1bHRGb2N1cygpO1xuICAgIEBpZiAkbW9kZT09ICdvdXRsaW5lJyB7XG4gICAgICAgIG91dGxpbmU6IHZhcigtLWZvY3VzV2lkdGgpIHNvbGlkIHZhcigtLXBhbGV0dGUtcHJpbWFyeS0zMDApO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH0gQGVsc2UgaWYgJG1vZGU9PSAnYm9yZGVyJyB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZm9jdXNXaWR0aCkgc29saWQgdmFyKC0tcGFsZXR0ZS1wcmltYXJ5LTMwMCk7XG4gICAgfVxufVxuLy8gQXBwbHkgdGhlIGNvbnRlbnQgc3R5bGVzIGluIGNvbnRyYXN0IG1vZGUuIFRoaXMgaXMganVzdCBlbm91Z2ggY29udHJhc3QgdG8gYmUgV0NBRyBjb21wbGllbnQgLS0tXG4vLyBub3QgYSBoaWdoLWNvbnRyYXN0IG1vZGUuXG4vL1xuLy8gQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyBmb3IgdXNlIGluIGVuY2Fwc3VsYXRlZCBjb21wb25lbnQgc3R5bGVzLCBlLmcuLFxuLy8gICAgIEBpbmNsdWRlIGNvbnRyYXN0TW9kZSB7XG4vLyAgICAgICAgIC8vIFN0eWxlcyB0byBhcHBseSBpbiBjb250cmFzdCBtb2RlXG4vLyAgICAgfVxuLy8gVG8gdXMgaW4gZ2xvYmFsIGNvbnRleHQsIHBhc3MgJ2dsb2JhbCcgYXMgZmlyc3QgYXJndW1lbnQsIGUuZy4sXG4vLyAgICAgQGluY2x1ZGUgY29udHJhc3RNb2RlKGdsb2JhbCkgeyAvKiAuLi4gKi8gfVxuQG1peGluIGNvbnRyYXN0TW9kZSgkc2NvcGU6IGVuY2Fwc3VsYXRlZCkge1xuICAgICRjb250cmFzdE1vZGVTZWxlY3RvcjogJ2JvZHkuZXMtY29udHJhc3QtbW9kZSc7XG4gICAgQGlmICRzY29wZSA9PSBlbmNhcHN1bGF0ZWQge1xuICAgICAgICA6aG9zdC1jb250ZXh0KCN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSkgJiB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHNjb3BlID09IGdsb2JhbCB7XG4gICAgICAgICN7aWYoJiwgJyN7JGNvbnRyYXN0TW9kZVNlbGVjdG9yfSAmJywgJGNvbnRyYXN0TW9kZVNlbGVjdG9yKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIFwiSW52YWxpZCBzY29wZSAjeyRzY29wZX0uXCI7XG4gICAgfVxufVxuQG1peGluIGJsdXJJbWFnZSgkYmx1clN0cmVuZ3RoOiAyNXB4KSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB0b3A6IC0kYmx1clN0cmVuZ3RoICogMjtcbiAgICB3aWR0aDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIGhlaWdodDogY2FsYygxMDAlICsgI3skYmx1clN0cmVuZ3RoICogNH0pO1xuICAgIHotaW5kZXg6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmaWx0ZXI6IGJsdXIoJGJsdXJTdHJlbmd0aCk7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgb3BhY2l0eTogMC43O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_33__.trigger)('fade', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.fade()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_33__.trigger)('fadeFast', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.fade(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.ANIMATION_TIME_FAST)), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_33__.trigger)('overlay', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.openOverlay(ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.ANIMATION_TIME_FAST)), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_33__.trigger)('fromLeft', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.fromLeft()), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_33__.trigger)('fromRight', ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_22__.UIAnimation.fromRight())]
    }
  });
}
function notNull(value) {
  return value !== undefined && value !== null;
}

/***/ }),

/***/ 48893:
/*!***************************************************************!*\
  !*** ./src/app/pages/workspace-page/workspace-page.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkspacePageModule: () => (/* binding */ WorkspacePageModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/shared.module */ 56208);
/* harmony import */ var _explorer_explorer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./explorer/explorer.component */ 47159);
/* harmony import */ var _metadata_metadata_block_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata/metadata-block.component */ 50697);
/* harmony import */ var _metadata_metadata_sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metadata/metadata-sidebar.component */ 76394);
/* harmony import */ var _metadata_metadata_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metadata/metadata.component */ 66005);
/* harmony import */ var _recycle_recycle_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recycle/recycle.component */ 82475);
/* harmony import */ var _sub_tree_sub_tree_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sub-tree/sub-tree.component */ 50954);
/* harmony import */ var _tree_tree_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tree/tree.component */ 58687);
/* harmony import */ var _workspace_page_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./workspace-page-routing.module */ 17396);
/* harmony import */ var _workspace_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./workspace-page.component */ 12833);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/breadcrumbs/breadcrumbs.component */ 98617);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 8815);
/* harmony import */ var ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-edu-sharing-ui */ 924);
/* harmony import */ var _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/components/global-progress/global-progress.component */ 94618);
/* harmony import */ var _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/directives/skip-target.directive */ 19374);
/* harmony import */ var _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/directives/title.directive */ 66848);
/* harmony import */ var _shared_components_user_quota_user_quota_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/components/user-quota/user-quota.component */ 31579);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 21916);




















class WorkspacePageModule {
  static #_ = this.ɵfac = function WorkspacePageModule_Factory(t) {
    return new (t || WorkspacePageModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({
    type: WorkspacePageModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _workspace_page_routing_module__WEBPACK_IMPORTED_MODULE_8__.WorkspacePageRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](WorkspacePageModule, {
    declarations: [_metadata_metadata_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.MetadataSidebarComponent, _recycle_recycle_component__WEBPACK_IMPORTED_MODULE_5__.RecycleMainComponent, _explorer_explorer_component__WEBPACK_IMPORTED_MODULE_1__.WorkspaceExplorerComponent, _metadata_metadata_block_component__WEBPACK_IMPORTED_MODULE_2__.WorkspaceMetadataBlockComponent, _metadata_metadata_component__WEBPACK_IMPORTED_MODULE_4__.WorkspaceMetadataComponent, _workspace_page_component__WEBPACK_IMPORTED_MODULE_9__.WorkspacePageComponent, _sub_tree_sub_tree_component__WEBPACK_IMPORTED_MODULE_6__.WorkspaceSubTreeComponent, _tree_tree_component__WEBPACK_IMPORTED_MODULE_7__.WorkspaceTreeComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _workspace_page_routing_module__WEBPACK_IMPORTED_MODULE_8__.WorkspacePageRoutingModule],
    exports: [_metadata_metadata_block_component__WEBPACK_IMPORTED_MODULE_2__.WorkspaceMetadataBlockComponent]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetComponentScope"](_workspace_page_component__WEBPACK_IMPORTED_MODULE_9__.WorkspacePageComponent, [_shared_components_breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_10__.BreadcrumbsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_17__.CdkDropList, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__.ActionbarComponent, ngx_edu_sharing_ui__WEBPACK_IMPORTED_MODULE_18__.IconDirective, _shared_components_global_progress_global_progress_component__WEBPACK_IMPORTED_MODULE_11__.GlobalProgressComponent, _shared_directives_skip_target_directive__WEBPACK_IMPORTED_MODULE_12__.SkipTargetDirective, _shared_directives_title_directive__WEBPACK_IMPORTED_MODULE_13__.TitleDirective, _shared_components_user_quota_user_quota_component__WEBPACK_IMPORTED_MODULE_14__.UserQuotaComponent, _metadata_metadata_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.MetadataSidebarComponent, _recycle_recycle_component__WEBPACK_IMPORTED_MODULE_5__.RecycleMainComponent, _explorer_explorer_component__WEBPACK_IMPORTED_MODULE_1__.WorkspaceExplorerComponent, _tree_tree_component__WEBPACK_IMPORTED_MODULE_7__.WorkspaceTreeComponent], [_angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe]);

/***/ })

}]);
//# sourceMappingURL=src_app_pages_workspace-page_workspace-page_module_ts.js.map