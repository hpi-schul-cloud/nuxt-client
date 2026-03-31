<template>
	<SvsDialog
		:model-value="isOpen"
		:title="`components.molecules.import.${parentType}.options.title`"
		confirm-btn-lang-key="common.actions.continue"
		data-testid="select-destination-modal"
		@confirm="onNext"
		@cancel="emit('cancel')"
	>
		<template #content>
			<InfoAlert> {{ infoText }} </InfoAlert>
			<VSelect
				v-model="selectedReference"
				return-object
				item-value="id"
				item-title="name"
				:items="destinations"
				:placeholder="selectionPlaceholder"
				:rules="[rules.required]"
				:error="showError()"
				:hint="selectionHint"
				persistent-hint
				data-testId="import-destination-select"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { ImportDestinationItem } from "@/store/types/rooms";
import { BoardExternalReferenceType } from "@api-server";
import { InfoAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, PropType, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["import", "cancel", "next"]);
const props = defineProps({
	isOpen: { type: Boolean },
	parentName: { type: String, required: true },
	parentType: { type: String, required: true },
	destinations: {
		type: Array as PropType<ImportDestinationItem[]>,
		required: true,
	},
	destinationType: {
		type: String as PropType<BoardExternalReferenceType>,
		required: true,
	},
});
const { t } = useI18n();

const selectedReference = ref<ImportDestinationItem>();

const showErrorOnEmpty = ref(false);
const showError = () => !selectedReference.value && showErrorOnEmpty.value;

const rules = reactive({
	required: (value: string | undefined) => !!value || t("common.validation.required"),
});

const infoText = computed(() =>
	t(
		props.destinationType === BoardExternalReferenceType.ROOM
			? `components.molecules.import.${props.parentType}.options.selectRoom.infoText`
			: `components.molecules.import.${props.parentType}.options.selectCourse.infoText`
	)
);

const selectionPlaceholder = computed(() =>
	t(
		props.destinationType === BoardExternalReferenceType.ROOM
			? `components.molecules.import.${props.parentType}.options.selectRoom`
			: `components.molecules.import.${props.parentType}.options.selectCourse`
	)
);

const selectionHint = computed(() =>
	t(props.destinationType === BoardExternalReferenceType.ROOM ? "common.labels.room" : "common.labels.course")
);

const onNext = () => {
	showErrorOnEmpty.value = true;
	const id = selectedReference.value?.id;
	if (rules.required(id) === true) {
		emit("next", id);
	}
};
</script>
