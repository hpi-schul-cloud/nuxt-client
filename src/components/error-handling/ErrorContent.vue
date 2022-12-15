<template>
	<div>
		<permission-error-svg
			v-if="isPermissionError"
			:svg-width="$vuetify.breakpoint.xs ? 200 : null"
			fill="var(--v-primary-base)"
			data-testid="img-permission"
		/>

		<img
			v-if="isGenericError"
			:alt="errorText"
			src="@assets/img/pc_repair.png"
			class="pa-4"
			data-testid="img-generic"
		/>

		<h1 class="h4 error-msg pl-4 pr-4" data-testid="err-text">
			{{ errorText }}
		</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import PermissionErrorSvg from "@assets/img/PermissionErrorSvg.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	components: { PermissionErrorSvg },
	props: {
		errorText: {
			type: String,
			default: "",
		},
		isPermissionError: {
			type: Boolean,
		},
		isGenericError: {
			type: Boolean,
		},
	},
	setup() {},
});
</script>
