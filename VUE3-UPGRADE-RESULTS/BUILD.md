# Build

## Vue-I18n

We have to precompile our i18n translations. That can be done using the `@intlify/bundle-tools` package:

https://github.com/intlify/bundle-tools

For webpack that means we have to use the `@intlify/vue-i18n-loader` package. This reports lots of errors when building because we have HTML-tags in our locales (which is generally not allowed from a XSS security perspective).

There is an option `strictMessage: false` for the locales compilation but this option is not supported in `@intlify/vue-i18n-loader`.

Possible solutions:

1. Implement an own (quiet simple) custom resolver for locales compilation in webpack, see https://github.com/intlify/bundle-tools/blob/main/packages/vue-i18n-loader/src/index.ts

2. Move to unplugin/webpack and use the newer package `@intlify/unplugin-vue-i18n`. However this can be a lot of effort depending on how much we will have to change in our build process.