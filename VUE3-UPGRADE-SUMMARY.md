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

## Vue3-MQ

`$mq` has to be replaced by injection

https://vue3-mq.info/migration/from-version-2.html#removal-of-global-properties-and-functions

## Component Notes

### v-menu

https://vuetifyjs.com/en/components/menus/

```html
<template v-slot:activator="{ props }">
	<VBtn v-bind="props" />
</template>
```

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
