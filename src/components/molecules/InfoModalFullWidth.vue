<template>
	<base-modal v-bind="$attrs" design="white" v-on="$listeners">
		<template v-slot:header></template>
		<template v-slot:body>
			<modal-body-info :title="title" :description="description">
				<template v-slot:icon>
					<base-icon
						source="material"
						icon="info"
						style="color: var(--color-info);"
					/>
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button design="info" @click="close">{{ btn }}</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>

<script>
import BaseIcon from "@basecomponents/BaseIcon";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";

export default {
	components: {
		BaseIcon,
		ModalBodyInfo,
		CenterSlot,
	},
	props: {
		color: {
			type: String,
			default: "var(--color-info)",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		btn: {
			type: String,
			required: true,
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
