<template>
	<div v-if="active" class="wrapper">
		<div class="content">
			<h4>
				<slot name="header" />
			</h4>
			<p class="body">
				<slot name="body" />
			</p>
			<div class="actions">
				<slot name="actions" />
				<v-btn variant="text" @click.self="close">
					{{ t("common.labels.close") }}
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

type Props = {
	active: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
	(e: "update:active", value: boolean): void;
}>();

const { t } = useI18n();

const close = () => {
	emit("update:active", false);
};
</script>

<style lang="scss" scoped>
.wrapper {
	color: rgba(var(--v-theme-white));
	background-color: rgba(var(--v-theme-info));
	border-radius: 16px;

	h4 {
		color: rgba(var(--v-theme-white));
		text-align: center;
	}
}

.content {
	padding: 16px;
	text-align: left;
}

.actions {
	text-align: right;

	> label {
		margin-bottom: 16px;
	}
}
</style>
