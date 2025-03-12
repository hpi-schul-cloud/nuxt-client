# DEPENDENCIES

## Upgraded

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

## Removed

- "flush-promises": "^1.0.2"
- "tiptap": "^1.32.2"
- "tiptap-extensions": "^1.35.2"
- "vue-mq": "^1.0.1"
- "vuelidate": "^0.7.7"

## Added

- "vue3-mq": "^3.1.3"
- "resize-observer-polyfill": "^1.5.1"

## Can not be upgraded

- "vue-filter-ui": "^0.8.0"

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

_Note: should be replaced by `vue-draggable` (based on sortable.js) because of re-rendering issues_

### Vue3-MQ - DONE

`$mq` has to be replaced by injection

<https://vue3-mq.info/migration/from-version-2.html#removal-of-global-properties-and-functions>

### vue-filter-ui

- The `DataTable` component uses `vue-filter-ui` dependency which is not competible with vue-3. And seems there is no info or plan to upgrade the dependeny in its repository.
- **Recommended Solution-1:** Implement our own methods as the dependency does.
- **Recommended Solution-2:** Refactor `datatables` with vuetify components.
