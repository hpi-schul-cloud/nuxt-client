<template>
	<div @drop.prevent="dropAvatar" @dragover.prevent>
		<v-badge
			class="ma-0 badge-component"
			bordered
			color="rgba(var(--v-theme-primary))"
			:icon="mdiLock"
			:model-value="false"
		>
			<v-avatar
				class="ma-0 pa-1 avatar-component-empty"
				:class="{
					'hovered-avatar': hovered,
					'avatar-component-empty': !hovered,
					outlined: showOutline,
				}"
				:size="size"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			/>
		</v-badge>
		<div class="d-flex justify-center mt-1 subtitle" />
	</div>
</template>

<script setup lang="ts">
import { mdiLock } from "@icons/material";
import { ref } from "vue";

type Props = {
	size: string;
	showOutline?: boolean;
};
withDefaults(defineProps<Props>(), {
	showOutline: false,
});

const emit = defineEmits<{
	(e: "dropEmptyAvatar"): void;
}>();

const hovered = ref(false);

const dropAvatar = () => {
	emit("dropEmptyAvatar");
};

const dragLeave = () => {
	hovered.value = false;
};
const dragEnter = () => {
	hovered.value = true;
};
</script>

<style scoped>
.outlined {
	border: 2px dashed;
}

.hovered-avatar {
	border: 2px solid;
}

.avatar-component-empty {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 1em;
}

.subtitle {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 32px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
