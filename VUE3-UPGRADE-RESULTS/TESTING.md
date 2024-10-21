# UNIT TESTS

## Testing

### Setup
We have a couple of test helpers taht can be used to setup unit tests: `tests/test-utils/setup/index.ts`

The global setup file `tests/setup.js` has to be refactored and adapted to the new requirements.
### Mounting a component

Example: `src/components/organisms/vCustomDialog.unit.ts`

We added helpers for creating the nessesary vue plugins, currently `vuetify` and `i18n`. This is necessary because the setup of the plugins can differ heavily from other environments. In the case of vuetify e.g. the way we have to import vuetify in a Jest test setup has changed.

```typescript
const wrapper = mount(Component, {
  global: {
    plugins: [createTestingVuetify(), createTestingI18n()],
  },
  // Note: "propsData" is deprecated now. we should use "props" instead
  props: {}
});
```

The helper files can be found in `tests/test-utils/setup/` folder.

### Testing dialogs

Vuetify is using the `<Teleport>` component now to "teleport" the contents of the dialog outside the components own `<template>`.

In order to access the dialog components in tests we have to use `findComponent` or `getComponent()` on the wrapper instead of the more general methods like `find`.

For a further explanation see:
https://test-utils.vuejs.org/guide/advanced/teleport.html

### Testing router

```typescript
const mockRoute = {
  params: {
    id: 1
  }
}
const mockRouter = {
  push: vi.fn()
}

const wrapper = mount(Component, {
  props: {
    isAuthenticated: true
  },
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    }
  }
})
```

https://test-utils.vuejs.org/guide/advanced/vue-router.html
