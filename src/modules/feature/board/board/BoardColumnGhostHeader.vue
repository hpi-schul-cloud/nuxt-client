<template>
	<div class="mb-4" ref="headerRef">
		<div class="d-flex align-start justify-space-between pt-2">
			<VBtn
				elevation="0"
				variant="text"
				class="mb-2"
				:color="isColumnActive ? '' : 'grey-darken-2'"
				@click="onAddColumn"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				{{ title }}
			</VBtn>
		</div>
		<VDivider aria-hidden="true" class="border-opacity-100" />
	</div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@mdi/js";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	isColumnActive: {
		type: Boolean,
		required: true,
	},
	isListBoard: { type: Boolean, required: true },
});

const emit = defineEmits(["add-column"]);

const { t } = useI18n();

const onAddColumn = () => {
	emit("add-column");
};

const title = computed(() =>
	props.isListBoard
		? t("components.board.column.ghost.list.placeholder")
		: t("components.board.column.ghost.column.placeholder")
);
</script>

<style scoped>
.margin-fix {
	margin-top: 2px;
}

.transition-divider {
	transition: all ease-in 150ms;
}
</style>
