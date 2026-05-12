<template>
	<div
		data-testid="board-video-conference-element-create"
		class="d-flex"
		:class="{
			'flex-row': isRenderedAsList,
			'flex-column': !isRenderedAsList,
		}"
	>
		<div class="display-list-board">
			<VImg :src="imageSrc" alt="" cover />
		</div>
		<div class="text-list-board">
			<VCardText>
				<div class="d-flex flex-row">
					<VTextField
						v-model="title"
						:rules="rules"
						:label="t('common.labels.name')"
						type="text"
						data-testid="video-conference-element-title"
					/>
					<div class="align-self-center menu">
						<slot />
					</div>
				</div>
			</VCardText>
		</div>
	</div>
</template>

<script setup lang="ts">
import image from "@/assets/img/videoConference.svg";
import { injectStrict } from "@/utils/inject";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useOpeningTagValidator } from "@util-validators";
import { computed, onBeforeUnmount, PropType, ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps({
	existingTitle: {
		type: String as PropType<string | undefined>,
		default: undefined,
	},
	isDetailView: {
		type: Boolean,
		required: false,
	},
});

const emit = defineEmits(["create:title", "validation:failed"]);

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();
const { t } = useI18n();

const { existingTitle } = toRaw(props);
const title = ref(existingTitle || "");

const { validateOnOpeningTag } = useOpeningTagValidator();
const rules = [(value: string) => validateOnOpeningTag(value)];

const imageSrc = image;

const isRenderedAsList = computed(() => smAndUp.value && (isListLayout.value || props.isDetailView));

onBeforeUnmount(() => {
	if (title.value === existingTitle) return;

	const isValid = rules.every((rule) => rule(title.value) === true);

	if (isValid) {
		emit("create:title", title.value);
	} else {
		emit("validation:failed", t("common.validation.containsOpeningTag.discardChanges"));
	}
});
</script>

<style scoped>
.v-textarea textarea {
	padding-top: 8px;
}
.menu {
	margin-right: -6px;
}
.display-list-board {
	flex: 0 0 33%;
}
.text-list-board {
	flex: 0 0 67%;
}
</style>
