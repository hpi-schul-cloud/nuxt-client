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

## Library Notes

### vue-i18n

```html
<template>
  <p>We can use the $t helper in templates: {{ $t('translation.key') }}</p>
</template>

<script setup>
  // we can use the official composable now.
  // no need for provide / inject anymore
  const { t } = useI18n();

  // translations have to be reactive!
  const translatedValue = computed(() => t("translation.key"));
</script>
```

### vue-dndrop

```sh
npm i vue-dndrop@next
```

_should be replaced by `vue-draggable` (based on sortable.js) because of re-rendering issues_

### Vue3-MQ

`$mq` has to be replaced by injection

https://vue3-mq.info/migration/from-version-2.html#removal-of-global-properties-and-functions


## BREAKING CHANGES

- [Vue.2x -> Vue.3x](https://v3-migration.vuejs.org/breaking-changes/)
- [Vuetify.2x -> Vuetify.3x](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [Vuex.3x -> Vuex.4x](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)
- [Vue Router.3x -> Vuex.4x](https://router.vuejs.org/guide/migration/)
- [Vue Test Utils](https://test-utils.vuejs.org/migration/)
- [vue instance vs app instance](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

  | 2.x Global API             | 3.x Instance API (app)                     |
  | -------------------------- | ------------------------------------------ |
  | Vue.config                 | app.config                                 |
  | Vue.config.productionTip   | **removed**                                |
  | Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement |
  | Vue.component              | app.component                              |
  | Vue.directive              | app.directive                              |
  | Vue.mixin                  | app.mixin                                  |
  | Vue.use                    | app.use                                    |
  | Vue.prototype              | app.config.globalProperties                |
  | Vue.extend                 | **removed**                                |
  | Vue.set                    | ?? used in (src/utils/service-template.js) |




## Component Notes


### Vuetify Labs Component


- These components must be imported from vue **labs** to use until they're released
  - v-calendar
  - v-date-picker
  - v-skeleton-loader
  - v-stepper
  - v-time-picker
  - v-treeview

&NewLine;

### General Changes

|                                 | Changes                                                                         | Files probably affected in our code           |
| ------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| v-model                         | value is replaced by model-value                                                | .sync usage: 25 <br> v-model: 68              |
| @input (v-model)                | replaced by **@update:model-value**                                             | 10                                            |
| **left** and **right**          | **start** and **end**                                                           | 10                                            |
| small, medium, large            | combined to **size** prop                                                       | > 20                                          |
| **dense** prop                  | changed to **density** with variants default, comfortable, compact              | 19                                            |
| @input (v-model)                | replaced by **@update:model-value**                                             | 10                                            |
| activator <br> v-on <br> v-bind | replace with #activator={ props } <br> replace v-bind attrs with v-bind="props" | activator: ~6 <br> v-on: ~16 <br> v-bind: ~35 |





### v-menu

https://vuetifyjs.com/en/components/menus/

 |                    | Changes                  | Files probably affected in our code |
 | ------------------ | ------------------------ | ----------------------------------- |
 | offset-y, offset-x | removed, use offset prop | 2                                   |

```html
<template v-slot:activator="{ props }">
	<VBtn v-bind="props" />
</template>
```

### v-list

|                                         | Changes                                                                                                        | Files probably affected in our code            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| two-line, three-line                    | lines="two", lines="three"                                                                                     | two-line: 2                                    |
| v-list-item-group                       | removed, add value to list items and bind v-model:selected on v-list                                           | 1                                              |
| v-list-item-icon and v-list-item-avatar | removed, use **v-list-item** with **icon** or **avatar props** or put icon or avatar in append or prepend slot | v-list-item-avatar: 2 <br> v-list-item-icon: 8 |
| v-list-item-content                     | removed, lists used CSS grid for layout now instead                                                            |                                                |
| inactive prop                           | prop has been replaced with **:active="false" :link="false"**                                                  | 4                                              |
| v-subheader                             | renamed to **v-list-subheader**                                                                                | 1                                              |

### v-list-item

```html
<VListItem data-testid="board-menu-action" @click.prevent="onClick">
	<template v-slot:prepend>
		<slot name="icon" data-testid="board-menu-action-icon"></slot>
	</template>
	<VListItemTitle data-testid="board-menu-action-title">
		<slot></slot>
	</VListItemTitle>
</VListItem>
```

### v-alert

|                                     | Changes                                                                                                   | Files probably affected in our code |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| border props **left** and **right** | renamed to **start** and **end**                                                                          | 1                                   |
| colored-border                      | renamed to **border-color**                                                                               | 1                                   |
| dismissable                         | combined into **variant** prop <br> -> values 'elevated', 'flat', 'tonal', 'outlined', 'plain' and 'text' | outlined: ~2 <br>text: ~10          |

### v-btn

|                                | Changes                                                                                                                                    | Files probably affected in our code |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| fab                            | no longer supported, use **icon** prop or apply **.rounded-circle class**                                                                  | 10                                  |
| flat / outlined / text / plain | combined into a single variant                                                                                                             | flat:0, outlined: ~10, plain: ~4    |
| depressed                      | renamed to **variant="flat"**                                                                                                              | ~30                                 |
| disabled                       | uses **faded** variant of specified color instead of grey, $button-colored-disabled sass variable can be set to false to use grey instead. |                                     |

### inputs

|                                    | Changes                                                                                       | Files probably affected in our code     |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------- |
| prepend (slots)                    | prepend and prepend-inner are the same                                                        |                                         |
| append (slots)                     | renamed to append-inner                                                                       | ~1                                      |
| append-outer (slots)               | append                                                                                        | 0                                       |
| Variant props filled/outlined/solo | combined into variant prop <br> -> values 'underlined', 'outlined', 'filled', 'solo', 'plain' | filled: 3 <br> outlined: 0 <br> solo: 5 |
| success, success-messages          | **removed**                                                                                   |                                         |
| validate-on-blur                   | renamed to validate-on="blur"                                                                 | 4                                       |

### *v-checkbox/v-radio/v-switch

|                       | Changes                                                   | Files probably affected in our code |
| --------------------- | --------------------------------------------------------- | ----------------------------------- |
| input-value           | renamed to model-value                                    | ~2                                  |
| v-checkbox label slot | v-checkbox label slot should not longer contain a <label> |                                     |
| :label                | label                                                     | ~40                                 |

### v-tabs

|            | Changes                    | Files probably affected in our code |
| ---------- | -------------------------- | ----------------------------------- |
| v-tab-item | removed, use v-window-item | 4                                   |

### v-menu

|                    | Changes                  | Files probably affected in our code |
| ------------------ | ------------------------ | ----------------------------------- |
| offset-y, offset-x | removed, use offset prop | 2                                   |

### v-select/v-combobox/v-autocomplete

|                      | Changes                                                                                                        | Files probably affected in our code |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| v-model              | v-model values not present in items will now be rendered instead of being ignored                              |                                     |
| item-text            | renamed to **item-title**, <br> now looks up the title property on item objects by default. value is unchanged |                                     |
| item object in slots | now an ListItem object, the original item object is available as item.raw                                      |                                     |

### v-expansion-panel

|                           | Changes                                                                | Files probably affected in our code |
| ------------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| v-expansion-panel-header  | renamed to **v-expansion-panel-title**                                 | 2                                   |
| v-expansion-panel-content | renamed to **v-expansion-panel-text**                                  | 2                                   |
| v-expansion-panel         | now has text and title props that can be used instead of subcomponents |                                     |



### v-card

|        | Changes                                                                                              | Files probably affected in our code |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------- |
| v-card | not allow content to overflow or use higher z-index values to display on top of elements outside it. |                                     |
| v-card | To disable this behavior, use <v-card style="overflow: initial; z-index: initial">                   |                                     |

### v-dialog

- requires `v-model` or `activator`
- `vCustomDialog` has to be refactored

### v-skeleton-loader,

### v-stepper,

### v-stepper-header,

### v-stepper-item,

### v-stepper-window,

### v-stepper-window-item,

### v-data-table

### v-custom-fab

_Currently broken:_ is using `v-speed-dial` which is not available in vuetify 3 anymore

### v-custom-dialog

- Has been refactored to use required `v-model` API for `VDialog`
- `v-confirmation-dialog` already works
- _TODO:_ refactor all Dialogs that use the `v-custom-dialog` component
