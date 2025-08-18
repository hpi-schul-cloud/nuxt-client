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

<script setup lang="ts">
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import { computed } from "vue";
import { useUid } from "@/utils/uid";

type Props = {
	active?: boolean;
	backgroundClickDisabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	active: false,
	backgroundClickDisabled: false,
});

const emits = defineEmits<{
	(e: "update:active", value: boolean): void;
}>();

const { uid } = useUid();

const isDialogOpen = computed({
	get: () => props.active,
	set: (newValue: boolean) => emits("update:active", newValue),
});
</script>

<style lang="scss" scoped>
.modal-container {
	display: flex;
	flex-direction: column;
	width: 95%;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	max-height: calc(100vh - 48px);
	margin: 0 auto;
	overflow: hidden;
	background-color: rgba(var(--v-theme-white));
	border-radius: var(--radius-md);
	transition: all 0.3s ease;

	&.white {
		box-shadow: none;
	}
}

.modal-header {
	padding: 16px;
	text-align: center;
}

.modal-body {
	padding: 16px 32px;
}
</style>
