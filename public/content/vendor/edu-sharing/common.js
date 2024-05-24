"use strict";
(self["webpackChunkapp_as_web_component"] = self["webpackChunkapp_as_web_component"] || []).push([["common"],{

/***/ 83848:
/*!*******************************************!*\
  !*** ./src/app/core-module/csv.helper.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CsvHelper: () => (/* binding */ CsvHelper)
/* harmony export */ });
/* harmony import */ var _rest_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest/helper */ 64634);

/**
 * Helper class to generate comma seperated (csv) data from arrays
 */
class CsvHelper {
  /**
   * if data is an object, the values for each row will be fetched based on the headerInternal list or (if it is not present) the header list
   */
  static fromArray(header, data, headerInternal) {
    let csv = header ? header.map(h => '"' + h + '"').join(';') : '';
    for (const d of data) {
      if (csv) {
        csv += '\n';
      }
      let line = [];
      if (d instanceof Array) {
        line = d;
      } else {
        for (const h of headerInternal || header) {
          line.push(d[h]);
        }
      }
      csv += line.map(l => '"' + (l !== null ? (l + '').replace(/"/g, '""') : '') + '"').join(';');
    }
    return csv;
  }
  static download(filename, header, data, headerInternal = null) {
    _rest_helper__WEBPACK_IMPORTED_MODULE_0__.Helper.downloadContent(filename.replace(/[^a-z0-9 \-().]/gi, '_') + '.csv', CsvHelper.fromArray(header, data, headerInternal));
  }
}

/***/ })

}]);
//# sourceMappingURL=common.js.map