# Theming

[[toc]]

The SC themes are located in `src/themes` within the subfolders `default`, `brb`, etc.

## Config, Assets & Variables

Variables are defined in `src/themes/<theme-name>/config.js`.

## CSS

CSSs are located in `src/themes/<theme-name>/styles`, and subfolders.

The reference to the regarding theme folder is configured in `nuxt.config.js`, as `css: ["@/themes/" + themeName + "/styles"]`.

Once a theme other than `default` is used, the index.scss of the regarding theme subfolder, e.g. `brb` is referenced. Here the default styles are included, as well as theme specific styles.

themeName/index.scss:

```css
@import "@styles-default/variables.scss";
@import "@styles-default/utility.scss";
@import "./variables";
```

## Assets

A theme enables to replace assets at build time. This is done by using the alias concept for resolving modules of webpack (<https://webpack.js.org/configuration/resolve/>).

Assets, such as logos, are placed in `src/themes/<theme-name>/assets/`, in the same folder structure as in the default asset folder `src/assets`.

Webpack resolves the alias and replaces the assets correctly once the theme asset is imported in the manner of

```html
<img
	class="logo"
	src="~@assets/img/logo/logo-image-mono.svg"
	alt="Website Logo"
/>
```

## Components

A theme enables to replace complete components at build time. This is done by using the alias concept for resolving modules of webpack (<https://webpack.js.org/configuration/resolve/>).

Components are located in `src/themes/<theme-name>/components`.

Webpack resolves the alias and replaces the component correctly once the theme component is imported in the manner of

```javascript
import MyReplacedComponent from "@components/MyReplacedComponent";
```

The below alias object is auto-extended by the `variation.js` script, for all theme components. Example for one open-theme component:

```json
{
	"@components/MyReplacedComponent": "./src/themes/open/components/MyReplacedComponent.vue",
	"@": "src",
	"@@": ".",
	"@assets": "src/assets",
	"@components": "src/components",
	"@basecomponents": "src/components/ui",
	"@docs": "docs",
	"@layouts": "src/layouts",
	"@middleware": "src/middleware",
	"@mixins": "src/mixins",
	"@pages": "src/pages",
	"@plugins": "src/plugins",
	"@store": "src/store",
	"@static": "src/themes/open/static",
	"@theme": "src/themes/open",
	"@styles": "src/themes/open/styles/index.scss",
	"@styles-default": "src/themes/default/styles",
	"@variables": "src/themes/open/styles/variables.scss"
}
```
