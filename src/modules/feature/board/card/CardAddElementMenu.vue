<template>
	<VCardText class="pt-0">
		<div class="d-flex justify-center w-full">
			<VBtn
				elevation="0"
				variant="outlined"
				icon
				data-testid="add-element-btn"
				@click.stop="onAddElement()"
				@dblclick.stop="() => {}"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				<span class="d-sr-only"
					>{{ $t("components.elementTypeSelection.dialog.title") }}
				</span>
			</VBtn>
		</div>
	</VCardText>
</template>

<script setup lang="ts">
import { mdiPlus } from "@icons/material";

const emit = defineEmits<{
	(e: "add-element"): void;
}>();

const onAddElement = () => emit("add-element");
</script>
