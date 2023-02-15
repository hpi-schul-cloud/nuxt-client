<template>
	<div>
		<permission-error-svg
			v-if="isPermissionError"
			:svg-width="$vuetify.breakpoint.xs ? 200 : undefined"
			fill="var(--v-primary-base)"
			data-testid="img-permission"
		/>

		<img
			v-else
			:alt="errorText"
			src="@/assets/img/pc_repair.png"
			class="pa-4"
			data-testid="img-generic"
		/>

		<h1 class="h4 error-msg pl-4 pr-4" data-testid="err-text">
			{{ errorText }}
		</h1>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorContent",
	components: { PermissionErrorSvg },
	props: {
		errorText: String,
		statusCode: {
			type: Number,
			default: HttpStatusCode.InternalServerError,
		},
	},
	setup(props) {
		const permissionErrorStatusCodes: HttpStatusCode[] = [
			HttpStatusCode.Unauthorized,
			HttpStatusCode.Forbidden,
		];

		const isPermissionError = computed(() =>
			permissionErrorStatusCodes.includes(props.statusCode)
		);

		return {
			isPermissionError,
		};
	},
});
</script>
