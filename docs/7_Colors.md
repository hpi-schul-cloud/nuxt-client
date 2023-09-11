# Colors

You can find our custom defined theme colors under `/src/themes/base-vuetify.options.js` and their overwrites per theme in `/src/themes/<theme_name>/vuetify.options.js`.

The colors vuetify provides you can find [here](https://v2.vuetifyjs.com/en/styles/colors/)

## Usage

### Color Classes

All colors defined by vuetify or in our vuetify options generate css classes you can use. To aplly a color variant like lighten1, add a second class like "grey lighten-1".

#### Examples

Using a color from vuetify's color palette:

```HTML
<div class="blue">
  Blue background
</div>
```

Using a color defined in our vuetify options as text color:

```HTML
<p class="primary--text">
  Blue background
</p>
```

To use a variant of a color, you have to add a second class with the name of the variant:

```HTML
<p class="primary--text darken-1">
  Blue background
</p>
```

### Use Colors in (S)CSS

For colors defined in our vuetify options, vuetify generates css variables.

#### Example

```SCSS
.alert {
  background-color: var(--v-secondary-darken1);
  color: var(--v-white-base);
}
```

Colors from vuetify's colors palette (as of now) do not get generated css variables. You will need to access them with map-get.

#### Example

```SCSS
.alert {
  background-color: color: map-get($grey, base);;
  color: color: map-get($blue, lighten-3);;
}
```

## Definition

You can define more custom colors in our vuetify options like this:

```JS
...
"icon-btn": {
	base: colors.grey.darken3,
},
"beta-task": {
	base: "#196C9E",
},
...
```

As of now you can only use hex values without the alpha property. If a color is only meant for one theme only, please define the color in the relating theme file for our vuetify options.

### Rules

- Do not overwrite vuetify colors
- Use a semantic name to represent the use case
- Prefer usage via map-get over new color definition, unless you introduce a new color
- Either define style in template or in scss
