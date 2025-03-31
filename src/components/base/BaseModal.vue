<template>
	<v-dialog
		v-model="isDialogOpen"
		:persistent="backgroundClickDisabled"
		:aria-labelledby="`modal-${uid}-title`"
		:aria-describedby="`modal-${uid}-body`"
	>
		<v-card class="modal-container">
			<slot>
				<h2
					v-if="$slots.header"
					:id="`modal-${uid}-title`"
					class="h4 modal-header"
				>
					<slot name="header" />
				</h2>
				<div :id="`modal-${uid}-body`" class="modal-body">
					<slot name="body" />
				</div>

				<slot name="footer">
					<modal-footer>
						<template #left>
							<slot name="footer-left" />
						</template>
						<template #right>
							<slot name="footerRight" />
						</template>
					</modal-footer>
				</slot>
			</slot>
		</v-card>
	</v-dialog>
</template>

<script>
import ModalFooter from "@/components/molecules/ModalFooter";
import { defineComponent } from "vue";
import { useUid } from "@/utils/uid";

export default defineComponent({
	setup() {
		const { uid } = useUid();

		return { uid };
	},
	components: {
		ModalFooter,
	},
	props: {
		active: {
			type: Boolean,
		},
		backgroundClickDisabled: {
			type: Boolean,
		},
	},
	emits: ["update:active"],
	computed: {
		isDialogOpen: {
			get() {
				return this.active;
			},
			set(newValue) {
				this.$emit("update:active", newValue);
			},
		},
	},
});
</script>

<style lang="scss" scoped>
.modal-container {
	display: flex;
	flex-direction: column;
	width: 95%;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	max-height: calc(100vh - (2 * var(--space-lg)));
	margin: 0 auto;
	overflow: hidden;
	background-color: rgba(var(--v-theme-white));
	border-radius: var(--radius-md);
	transition: all var(--duration-transition-medium) ease;

	&.white {
		box-shadow: none;
	}
}

.modal-header {
	padding: var(--space-md);
	text-align: center;
}

.modal-body {
	padding: var(--space-md) var(--space-xl);
}
</style>
