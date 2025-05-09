<template>
	<base-modal v-bind="$attrs">
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<v-progress-circular
						indeterminate
						width="2"
						:color="color"
						size="60"
						class="mb-6"
					/>
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-items mb-4">
				<v-btn
					color="primary"
					variant="flat"
					@click="$emit('update:active', false)"
				>
					{{ $t(btnText) }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script>
import BaseModal from "../base/BaseModal.vue";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";
import { defineComponent } from "vue";
export default defineComponent({
	components: {
		ModalBodyInfo,
		BaseModal,
	},
	props: {
		color: {
			type: String,
			default: "rgba(var(--v-theme-primary))",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		btnText: {
			type: String,
			default: "common.actions.cancel",
		},
	},
	emits: ["update:active"],
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
});
</script>
