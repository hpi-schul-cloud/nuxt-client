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
		@click="redirectToAppointmentFinderUrl"
		@keydown.enter.space="redirectToAppointmentFinderUrl"
		@keydown.stop
	>
		<ContentElementBar :hasGreyBackground="true">
			<template #display v-if="element.content.appointmentFinderId">
				<v-img :src="image" alt="" cover class="rounded-t" />
			</template>
			<template #logo v-if="!element.content.appointmentFinderId">
				<v-icon>{{ mdiCalendarCheck }}</v-icon>
			</template>
			<template #title>
				{{
					element.content.appointmentFinderId
						? t("components.cardElement.appointmentFinderElement")
						: t("components.cardElement.appointmentFinderElement.createFinder")
				}}
			</template>
			<template #menu>
				<CollaborativeTextEditorElementMenu
					v-if="isEditMode"
					@move-down:element="onMoveDown"
					@move-up:element="onMoveUp"
					@delete:element="onDelete"
				/>
			</template>
		</ContentElementBar>
	</v-card>
</template>

<script setup lang="ts">
import image from "@/assets/img/appointmentFinder.png";
import { AppointmentFinderElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler } from "@data-board";
import { mdiCalendarCheck } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";
import { $axios } from "@/utils/api";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";

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
	"update-element",
]);

const { t } = useI18n();

const appointmentFinderElement = ref<HTMLElement | null>(null);
const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, appointmentFinderElement);

const redirectToAppointmentFinderUrl = async () => {
	const windowReference = window.open();
	const appointmentFinderId = props.element.content.appointmentFinderId;

	if (appointmentFinderId && windowReference) {
		const url = `http://localhost:4200/#/poll/${appointmentFinderId}`;
		windowReference.location = url;
	}
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
</style>
