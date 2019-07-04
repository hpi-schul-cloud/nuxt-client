<template>
	<base-input-default v-bind="$attrs" type="textarea" vmodel="">
		<textarea
			v-bind="$attrs"
			:value="vmodel"
			v-on="$listeners"
			@input="$emit('updatemodel', $event.target.value)"
		>
			<slot/>
		</textarea
		>
	</base-input-default>
</template>

<script>
import BaseInputDefault from "@basecomponents/BaseInput/BaseInputDefault";

export default {
	components: {
		BaseInputDefault,
	},
	model: {
		prop: "vmodel",
		event: "updatemodel",
	},
	props: {
		vmodel: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

textarea {
	width: 100%;
	resize: vertical;
	border: none;
	outline: none;
}
</style>
