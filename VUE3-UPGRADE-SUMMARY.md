# VUE V3 UPGRADE

## DEPENDENCIES

### Upgraded

- "@ckeditor/ckeditor5-vue": "^5.1.0"
- "@mdi/js": "^7.2.96" (devDep)
- "@vuelidate/core": "^2.0.3"
- "@vuelidate/validators": "^2.0.4"
- "vue": "^3.3.4"
- "vue-dndrop": "^1.3.1" ??
- "vue-i18n": "^9.2.2"
- "vue-router": "^4.2.4"
- "vuedraggable": "^4.1.0"
- "vuetify": "^3.3.14"
- "vuex": "^4.0.2"


### Removed

- "flush-promises": "^1.0.2"
- "tiptap": "^1.32.2"
- "tiptap-extensions": "^1.35.2"
- "vue-mq": "^1.0.1"
- "vuelidate": "^0.7.7"

### Added

- "vue3-mq": "^3.1.3"

## BREAKING CHANGES

- [Vue.2x -> Vue.3x](https://v3-migration.vuejs.org/breaking-changes/)
- [Vuetify.2x -> Vuetify.3x](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [Vuex.3x -> Vuex.4x](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)
- [Vue Router.3x -> Vuex.4x](https://router.vuejs.org/guide/migration/)
- [Vue Test Utils](https://test-utils.vuejs.org/migration/)
- [vue instance vs app instance](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

  | 2.x Global API              | 3.x Instance API (app)                      |
  | --------------------------  | ------------------------------------------  |
  | Vue.config                  | app.config                                  |
  | Vue.config.productionTip    | **removed**                                 |
  | Vue.config.ignoredElements  | app.config.compilerOptions.isCustomElement  |
  | Vue.component               | app.component                               |
  | Vue.directive               | app.directive                               |
  | Vue.mixin                   | app.mixin                                   |
  | Vue.use                     | app.use                                     |
  | Vue.prototype               | app.config.globalProperties                 |
  | Vue.extend                  | **removed**                                 |
  | Vue.set                     | ?? used in (src/utils/service-template.js)  |





### VUETIFY

#### VUETIFY LABS COMPONENTS

- These components must be imported from vue **labs** to use until they're released
  - v-calendar
  - v-date-picker
  - v-skeleton-loader
  - v-stepper
  - v-time-picker
  - v-treeview

&NewLine;


#### VUETIFY COMPONENTS

- **General Changes**

    | | Changes | Files probably affected in our code |
    | - | - | - |
    | v-model | value is replaced by model-value   | .sync usage: 25 <br> v-model: 68   |
    | @input (v-model) | replaced by **@update:model-value**  | 10   |
    | **left** and **right**| **start** and **end** | 10   |
    | small, medium, large | combined to **size** prop | > 20   |
    | **dense** prop | changed to **density** with variants default, comfortable, compact | 19   |
    | @input (v-model) | replaced by **@update:model-value**  | 10   |
    | activator <br> v-on <br> v-bind | replace with #activator={ props } <br> replace v-bind attrs with v-bind="props" | activator: ~6 <br> v-on: ~16 <br> v-bind: ~35   |

- **v-alert**
    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-btn**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **inputs**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-checkbox/v-radio/v-switch**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-tabs**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-menu**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-list**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-select/v-combobox/v-autocomplete**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-expansion-panel**

    | | Changes | Files probably affected in our code |
    | - | - | - |

- **v-card**

    | | Changes | Files probably affected in our code |
    | - | - | - |
