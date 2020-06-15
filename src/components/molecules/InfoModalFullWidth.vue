<template>
	<base-modal v-bind="$attrs" design="white" v-on="$listeners">
		<template v-slot:header></template>
		<template v-slot:body>
			<modal-body-info :title="title" :description="description">
				<template v-slot:icon>
					<slot name="icon" />
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button :design="design" @click="close">{{ btn }}</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>

<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";

export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
	},
	props: {
		design: {
			type: String,
			default: "info",
		},
		title: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
		},
		btn: {
			type: String,
			default: "OK",
		},
	},
	methods: {
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
