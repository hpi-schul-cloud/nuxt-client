# Expendable Form

This tutorial will show you, how to write a form component that provides a slot for additional input fields. The advantage of this technique is, that you can encapsulate all the form submit logic inside a single component and do not need to implement it multiple times.

## Concept

The general pattern for this problem is, that the form component provides a scoped slot with an object that the consumer can link new inputs in. These new inputs can then directly modify the data in the object. On Form submit, the form can read all the data from the very same object and all data gets submitted. This works, because objects are passed by reference in JS.

## Example

### Form

You can see, that we store all form data in the `formData` object and make it available to the scoped-slot `inputs`. The Form itself handles all the data handling, but additional inputs can be added using the slot. Check the usage example below, to see how to extend the form.

```vue {6}
<template>
	<form @submit.prevent="submitHandler">
		<input v-model="formData.firstname" type="text" />
		<input v-model="formData.lastname" type="text" />

		<slot name="inputs" :data="formData" />

		<button type="submit">Submit</button>
	</form>
</template>
<script>
export default {
	data() {
		return {
			formData: {},
		};
	},
	methods: {
		submitHandler() {
			// validate this.formData...
			await this.$store.dispatch("user/create", this.formData);
		},
	},
};
</script>
```

### Usage

The following script will extent the form with a new username input where the input value will be submitted with the key `username`.

```vue {4,7}
<!-- extended form -->
<template>
	<ExpendableForm>
		<template v-slot:inputs="{ data }">
			<label>
				Username:
				<input v-model="data.username" type="text" />
			</label>
		</template>
	</ExpendableForm>
</template>
<script>
import ExpendableForm from "./ExpandaleForm";
export default {
	components: {
		ExpendableForm,
	},
};
</script>
```
