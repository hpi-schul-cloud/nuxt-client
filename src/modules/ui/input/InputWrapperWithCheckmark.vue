<template>
	<div class="d-flex flex-row" @click.stop @keydown.enter.stop>
		<slot />
		<div class="align-self-center pl-2">
			<button data-testid="save-input" @click.prevent.stop="onConfirm" @keydown.enter.stop="onConfirm">
				<VIcon aria-hidden="true"> {{ mdiCheck }}</VIcon>
				<span class="d-sr-only">{{ t("common.actions.save") }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiCheck } from "@icons/material";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "confirm"): void;
}>();

const { t } = useI18n();

const onConfirm = () => {
	emit("confirm");
};
</script>
