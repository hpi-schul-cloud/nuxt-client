# Optionaly Prop Controllable Data using the `controllableData` Mixin

## Use-Case

If you want to provide a prop named `A` that will eventually be updated with an `$emit` to control some kind of behaviour of your component, but do not want to enforce that the parent sets the `.sync` modifier you need a fair amount of hacking.

> "The problem is that sometimes you have a prop that you want to follow, but don't want to force the user of the component to use it. If your component now has code that needs to update this prop per event, nothing will work anymore, because the parent component will not react to these events. He does not even use the prop. If you use the here explained approach, this use-case is enabled and the rule is: if prop is there, then take it into account. If not, then everything still works." -- <cite>[Adrian Jost](https://github.com/adrianjost)</cite>

Example:

```vue
<!-- your component -->
<template>
	<button @click="$emit('update:A', 'B')">{{ A }}</button>
</template>
<script>
export default {
	props: {
		A: {
			type: String,
			default: 'A'
	}
}
</script>
```

This Component should be usable and working (updates the button text to `B` on click) in all of the following ways:

```vue
<!-- prop is not used at all, component should manage everything itself -->
<template>
	<YourComponent>
</template>
```

```vue
<!-- prop is given in initally, but all changes of the value must be managed by the component itself -->

<template>
	<YourComponent :A="C">
</template>
<script>
export default {
	data(){
		return {
			C: "D"
		}
	}
}
</script>
```

```vue
<!-- prop is synced, so the parent should always be able to overwrite the value -->

<template>
	<YourComponent :A.sync="C">
</template>
<script>
export default {
	data(){
		return {
			C: "D"
		}
	}
}
</script>
```

## Solution

We discovered, that we solve this issue often with an similar approach, so we refactored it into a reusable mixin that will do the work for you.

The Idea is, to represent the state of the prop in a local data variable of your object, but update this variable whenever the parent prop changes. We also need to make sure that the `$emit` event is emitted, whenever the local value in your component changes.

```vue
<!-- your component -->
<template>
	<button @click="$_controllableDataA = 'B'">{{ A }}</button>
</template>
<script>
import controllableData from "@mixins/controllableData";

export default {
	props: {
		A: {
			type: String,
			default: 'A'
	}
	mixins: [controllableData('A')]
}
</script>
```

### Details

This mixin will generate the following things:

- a computed property with the naming schema `$_controllableData${PropName}`, **this is the "variable" you need to use instead of the prop**
- a reactive local data variable that you should never touch with the naming schema `${localDataPrefix}${upperCaseFirstChar(prop)}`. This variable is used to save the current state of the variable. The above mentioned computed property will always return the value of this variable.
- a watcher that will update the local data variable whenever the prop changes.
