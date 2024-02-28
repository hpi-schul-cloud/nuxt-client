# VUETIFY

## General Changes

|                                 | Changes                                                                         | Files probably affected in our code           |
| ------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| v-model                         | value is replaced by model-value                                                | .sync usage: 25 <br> v-model: 68              |
| @input (v-model)                | replaced by **@update:model-value**                                             | 10                                            |
| **left** and **right**          | **start** and **end**                                                           | 10                                            |
| small, medium, large            | combined to **size** prop                                                       | > 20                                          |
| **dense** prop                  | changed to **density** with variants default, comfortable, compact              | 19                                            |
| @input (v-model)                | replaced by **@update:model-value**                                             | 10                                            |
| activator <br> v-on <br> v-bind | replace with #activator={ props } <br> replace v-bind attrs with v-bind="props" | activator: ~6 <br> v-on: ~16 <br> v-bind: ~35 |


## v-menu

https://vuetifyjs.com/en/components/menus/

|                    | Changes                  | Files probably affected in our code |
| ------------------ | ------------------------ | ----------------------------------- |
| offset-y, offset-x | removed, use offset prop | 2                                   |

```html
<template v-slot:activator="{ props }">
  <VBtn v-bind="props" />
</template>
```

## v-list

|                                         | Changes                                                                                                        | Files probably affected in our code            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| two-line, three-line                    | lines="two", lines="three"                                                                                     | two-line: 2                                    |
| v-list-item-group                       | removed, add value to list items and bind v-model:selected on v-list                                           | 1                                              |
| v-list-item-icon and v-list-item-avatar | removed, use **v-list-item** with **icon** or **avatar props** or put icon or avatar in append or prepend slot | v-list-item-avatar: 2 <br> v-list-item-icon: 8 |
| v-list-item-content                     | removed, lists used CSS grid for layout now instead                                                            |                                                |
| inactive prop                           | prop has been replaced with **:active="false" :link="false"**                                                  | 4                                              |
| v-subheader                             | renamed to **v-list-subheader**                                                                                | 1                                              |

## v-list-item

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

## v-alert

|                                     | Changes                                                                                                   | Files probably affected in our code |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| border props **left** and **right** | renamed to **start** and **end**                                                                          | 1                                   |
| colored-border                      | renamed to **border-color**                                                                               | 1                                   |
| dismissable                         | combined into **variant** prop <br> -> values 'elevated', 'flat', 'tonal', 'outlined', 'plain' and 'text' | outlined: ~2 <br>text: ~10          |

> **⚠️ Upgrade Notes:**
>- v-alert types(`warning`, `error`) icons are different in vuetify 3 -> talk to UX
>- to achieve the same alert look we had before: add `variant="tonal"` (when `text` was used)
>- `transition` prop has been removed, have to wrap the component into transition component
>- transitions need condition: v-if or v-show, see: https://vuejs.org/guide/built-ins/transition.html


## v-btn

|                                | Changes                                                                                                                                    | Files probably affected in our code |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| fab                            | no longer supported, use **icon** prop or apply **.rounded-circle class**                                                                  | 10                                  |
| flat / outlined / text / plain | combined into a single variant                                                                                                             | flat:0, outlined: ~10, plain: ~4    |
| depressed                      | renamed to **variant="flat"**                                                                                                              | ~30                                 |
| disabled                       | uses **faded** variant of specified color instead of grey, $button-colored-disabled sass variable can be set to false to use grey instead. |                                     |

> **⚠️ Upgrade Notes:**
>- Disabled buttons use a faded variant of the specified color instead of grey (#15147)
The `$button-colored-disabled` sass variable can be set to false to use grey instead.
-> Talk to UX what we want to use

## inputs

|                                    | Changes                                                                                       | Files probably affected in our code     |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------- |
| prepend (slots)                    | prepend and prepend-inner are the same                                                        |                                         |
| append (slots)                     | renamed to append-inner                                                                       | ~1                                      |
| append-outer (slots)               | append                                                                                        | 0                                       |
| Variant props filled/outlined/solo | combined into variant prop <br> -> values 'underlined', 'outlined', 'filled', 'solo', 'plain' | filled: 3 <br> outlined: 0 <br> solo: 5 |
| success, success-messages          | **removed**                                                                                   |                                         |
| validate-on-blur                   | renamed to validate-on="blur"                                                                 | 4                                        |

### v-text-field/ v-select/ v-autocomplete
> **⚠️ Upgrade Notes:**
> - vuetify 2: `underlined` was default and primary color was added
> - vuetify 3: `filled` is default and no color, so we need to add `variant="underlined"` (if we want to use the old default/ no other variant is used) + `color="primary"`


## v-checkbox/v-radio/v-switch

|                       | Changes                                                   | Files probably affected in our code |
| --------------------- | --------------------------------------------------------- | ----------------------------------- |
| input-value           | renamed to model-value                                    | ~2                                  |
| v-checkbox label slot | v-checkbox label slot should not longer contain a <label> |                                     |
| :label                | label                                                     | ~40                                 |

> **⚠️ Upgrade Notes v-switch:**
>- vertical height not adjusted when inset with `density` is used
>- GitHub Issue: https://github.com/vuetifyjs/vuetify/issues/18334
>- disabled is now grey instead of primary color in vuetify 3
>- also added true-icon prop for a11y (was discussed in a11y meeting, Google Material 3, maybe check also with UX again)


## v-tabs

|            | Changes                    | Files probably affected in our code |
| ---------- | -------------------------- | ----------------------------------- |
| v-tab-item | removed, use v-window-item | 4                                   |

## v-menu

|                    | Changes                  | Files probably affected in our code |
| ------------------ | ------------------------ | ----------------------------------- |
| offset-y, offset-x | removed, use offset prop | 2                                   |

## v-select/v-combobox/v-autocomplete

|                      | Changes                                                                                                        | Files probably affected in our code |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| v-model              | v-model values not present in items will now be rendered instead of being ignored                              |                                     |
| item-text            | renamed to **item-title**, <br> now looks up the title property on item objects by default. value is unchanged |                                     |
| item object in slots | now an ListItem object, the original item object is available as item.raw

> **⚠️ Upgrade Notes:**
> - vuetify 2: "underlined" was default and primary color was added
> - vuetify 3: "filled" is default and no color, so we need to add variant="underlined" + color="primary                                  |                                     |

## v-expansion-panel

|                           | Changes                                                                | Files probably affected in our code |
| ------------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| v-expansion-panel-header  | renamed to **v-expansion-panel-title**                                 | 2                                   |
| v-expansion-panel-content | renamed to **v-expansion-panel-text**                                  | 2                                   |
| v-expansion-panel         | now has text and title props that can be used instead of subcomponents |                                     |

> **⚠️ Upgrade Notes:**
> - vuetify 2: `flat`: Removes the expansion-panel’s elevation and borders
> - vuetify 3: `flat` was removed, to achieve the same we need to add `elevation=0` to `v-expansion-panel`

## v-card

|        | Changes                                                                                              | Files probably affected in our code |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------- |
| v-card | not allow content to overflow or use higher z-index values to display on top of elements outside it. |                                     |
| v-card | To disable this behavior, use <v-card style="overflow: initial; z-index: initial">                   |                                     |

> **⚠️ Upgrade Notes:**
>- `hover` breaks variant elevated, GitHub Issue: https://github.com/vuetifyjs/vuetify/issues/17574 (fixed in 3.4.0)
>- `outlined` card appearance changed in vuetify 3

## v-dialog

- requires `v-model` or `activator`
- `vCustomDialog` has to be refactored

## v-breadcrumb
- in vuetify 2 there was a link color (our primary color), that changed in vuetify 3
- to achieve the same behaviour we added CSS for `vCustomBreadcrumbs.vue`:
  - `.v-breadcrumbs-item`: primary color
  - `.v-breadcrumbs-item--disabled`: secondary color

## v-chip
- there is a bug in vuetifuy where the text-color prop does not work

## v-skeleton-loader

## v-stepper

## v-stepper-header

## v-stepper-item

## v-stepper-window

## v-stepper-window-item

## v-data-table

- Headers objects:
  - `text` property renamed to `title`
  - `data-table-select` and `data-table-expand` must be defined as `key` instead of `value`.
  - `class`replaced with `headerProps`
  - `cellClass`replaced with `cellProps` and now accepts either a function or an object.
- Server side tables using `server-items-length` must be replaced with `<v-data-table-server items-length />`
- Argument order for `@click:*` events is now consistently `(event, data)`.
  - `onRowClick (item, data, event)` changed to `onRowClick (event, { item })`.
  - `item-class` and `item-style` have been combined into `row-props`, and `cell-props` has been added.
- `sort-desc` and `group-desc` have been combined into `sort-by` and `group-by`.
  - properties now take an array of `{ key: string, order: 'asc' | 'desc' } objects` instead of `strings`.
- `sortBy` type changed from `string|array` to `SortItem[]`
  ```ts
  type SortItem = { key: string; order?: boolean | "asc" | "desc" };
  ```

## v-custom-fab

_Currently broken:_ is using `v-speed-dial` which is not available in vuetify 3 anymore

-  it is planned to be in labs later this year:
https://github.com/vuetifyjs/vuetify/issues/13508

## v-custom-dialog

- Has been refactored to use required `v-model` API for `VDialog`
- `v-confirmation-dialog` already works
- _TODO:_ refactor all Dialogs that use the `v-custom-dialog` component

## Vuetify Classes
- `class="red--text"` changed to `class="text-red"`
- `rounded-tr-0` with `rounded-te-0` replaced
- `rounded-tl-0` with `rounded-ts-0` replaced

## Vuetify 3 Bugs

### v-switch

- vertical height not adjusted when inset with density is used
- GitHub Issue: https://github.com/vuetifyjs/vuetify/issues/18334

### v-card

- hover breaks variant elevated
- GitHub Issue: https://github.com/vuetifyjs/vuetify/issues/17574

  > **⚠️ Upgrade Notes:**
  >- seems like it was fixed with 3.4.0

### v-chip
- there is a bug in vuetifuy where the `text-color` prop does not work
  - eslint vuetify migration plugin says it was removed but this is propably not intended because they use the prop in the vuetify docs, see: https://vuetifyjs.com/en/components/chips/#colored (view source code)
- GitHub Issue: https://github.com/vuetifyjs/vuetify/issues/18235

  > **⚠️ Upgrade Notes:**
  >- documentation was updated, if we want to have the text color black we can use `flat`


## To Keep In Mind

### Vuetify Global Config
- maybe interesting : https://vuetifyjs.com/en/features/global-configuration/#setup
- Example: 
we could set defaults for v-switches (e.g. `inset`, `flat`, `density`) so we can define how they should look
-> no need  to write `flat`, `inset` to all v-switch  components

```js
export default createVuetify({
  default: {
    VSwitch: {flat: true, inset: true},
  }
})
```