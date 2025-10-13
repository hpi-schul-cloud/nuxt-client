<template>
	<v-custom-dialog
		ref="dialog"
		:is-open="isOpen"
		:size="480"
		has-buttons
		:buttons="['cancel', 'next']"
		@next="onNext()"
		@dialog-canceled="onCancel"
	>
		<template #title>
			<h2 class="mt-2">
				{{ t(`components.molecules.import.${parentType}.options.title`) }}
			</h2>
		</template>

		<template #content>
			<div>
				<div class="d-flex flex-row pa-2 mb-4 rounded bg-blue-lighten-5">
					<div class="mx-2">
						<v-icon color="info">{{ mdiInformation }}</v-icon>
					</div>
					<div>
						{{ infoText }}
					</div>
				</div>
				<v-select
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
			</div>
		</template>
	</v-custom-dialog>
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { BoardExternalReferenceType } from "@/serverApi/v3";
import { ImportDestinationItem } from "@/store/types/rooms";
import { mdiInformation } from "@icons/material";
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
		props.destinationType === BoardExternalReferenceType.Room
			? `components.molecules.import.${props.parentType}.options.selectRoom.infoText`
			: `components.molecules.import.${props.parentType}.options.selectCourse.infoText`
	)
);

const selectionPlaceholder = computed(() =>
	t(
		props.destinationType === BoardExternalReferenceType.Room
			? `components.molecules.import.${props.parentType}.options.selectRoom`
			: `components.molecules.import.${props.parentType}.options.selectCourse`
	)
);

const selectionHint = computed(() =>
	t(props.destinationType === BoardExternalReferenceType.Room ? "common.labels.room" : "common.labels.course")
);

const onNext = () => {
	showErrorOnEmpty.value = true;
	const id = selectedReference.value?.id;
	if (rules.required(id) === true) {
		emit("next", id);
	}
};
const onCancel = () => emit("cancel");
</script>
