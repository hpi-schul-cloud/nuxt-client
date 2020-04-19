# DataFilter/Inputs

additional props can be passed to the inputs using the "attributes" config key. Check [the docs](http://docs.vue-filter-ui.surge.sh/Customize/5-Input.html#interface) for more details.

## Default

same as BaseInput. Should always be used, except for radio buttons and checkboxes.

## Checkbox

can be used as a multiselect like input. Behaves like multiple BaseCheckbox components that all have the same name and an array as v-model.

## Radio

can be used as a select like input. Behaves like multiple BaseRadio components that all have the same name and a string as the value.
