<template>
	<v-card
		class="text-editor-card mb-4"
		data-testid="appointment-finder-element"
		variant="outlined"
		ref="appointmentFinderElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
		role="button"
		:aria-label="ariaLabel"
		@click="openPoll"
		@keydown.enter.space="openPoll"
		@keydown.stop
	>
		<ContentElementBar :hasGreyBackground="true">
			<template #display>
				<v-img :src="image" alt="" cover class="rounded-t" />
			</template>
			<template #title>
				{{ t("components.cardElement.appointmentFinderElement") }}
			</template>
			<template #menu>
				<AppointmentFinderElementMenu
					v-if="isEditMode"
					@move-down:element="onMoveDown"
					@move-up:element="onMoveUp"
					@delete:element="onDelete"
					@edit:finder="onEdit"
				/>
			</template>
		</ContentElementBar>
		<VDialog v-model="isDialogOpen">
			<VCard class="appointmentFinderDialog">
				<iframe :src="iframeUrl" class="appointmentFinderIframe" />
			</VCard>
		</VDialog>
	</v-card>
</template>

<script setup lang="ts">
import image from "@/assets/img/appointmentFinder.png";
import { AppointmentFinderElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler } from "@data-board";
import { ContentElementBar } from "@ui-board";
import { computed, PropType, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import AppointmentFinderElementMenu from "./components/AppointmentFinderElementMenu.vue";

const props = defineProps({
	element: {
		type: Object as PropType<AppointmentFinderElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});

const emit = defineEmits([
	"delete:element",
	"move-down:edit",
	"move-up:edit",
	"move-keyboard:edit",
]);

const { t } = useI18n();

const appointmentFinderElement = ref<HTMLElement | null>(null);
const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, appointmentFinderElement);
const isDialogOpen = ref(false);
const iframeUrl = ref("");

const onEdit = () => {
	const adminId = props.element.content.adminId;
	iframeUrl.value = `http://localhost:4200/#/admin/dashboard/${adminId}`;
	isDialogOpen.value = true;
	addEventListenerToCloseDialog();
};

const openPoll = async () => {
	const appointmentFinderId = props.element.content.appointmentFinderId;
	iframeUrl.value = `http://localhost:4200/#/poll/${appointmentFinderId}`;
	isDialogOpen.value = true;
	addEventListenerToCloseDialog();
};

const addEventListenerToCloseDialog = () => {
	const closeDialog = () => {
		isDialogOpen.value = false;

		window.removeEventListener("message", closeDialog);
	};

	window.addEventListener("message", closeDialog);

	watch(isDialogOpen, (isOpen) => {
		if (!isOpen) {
			window.removeEventListener("message", closeDialog);
		}
	});
};

const ariaLabel = computed(() => {
	return `${t("components.cardElement.appointmentFinderElement")}, ${t(
		"common.ariaLabel.newTab"
	)}`;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onDelete = () => emit("delete:element", props.element.id);
const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");
</script>

<style scoped lang="scss">
.text-editor-card {
	outline-offset: 1px;
}

.appointmentFinderDialog {
	height: 90vh;
}

.appointmentFinderIframe {
	width: 100%;
	height: 100%;
}
</style>
