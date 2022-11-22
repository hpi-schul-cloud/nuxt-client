<template>
	<v-card class="py-2 px-4">
		<v-text-field
			:label="label"
			:value="name"
			@input="$emit('update:name', $event)"
		/>
	</v-card>
</template>

<script>
export default {
	name: "TitleCard",
	props: {
		label: {
			required: true,
			type: String,
		},
		name: {
			required: true,
			type: String,
		},
	},
};
</script>
