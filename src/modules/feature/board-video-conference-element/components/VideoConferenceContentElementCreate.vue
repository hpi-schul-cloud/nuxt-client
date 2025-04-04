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
				<VForm ref="form" validate-on="submit" @submit.prevent.stop="onSubmit">
					<div class="d-flex flex-row">
						<VTextarea
							v-model="title"
							:rules="rules"
							:label="t('components.cardElement.videoConferenceElement.label')"
							type="text"
							:autofocus="true"
							:auto-grow="true"
							rows="1"
							class="text"
							data-testid="video-conference-element-title"
							:placeholder="t('components.cardElement.videoConferenceElement')"
							@keydown="onKeydown"
						/>
						<div class="align-self-center pl-2">
							<button
								ref="submit"
								type="submit"
								data-testid="save-video-conference-title-button"
							>
								<VIcon aria-hidden="true"> {{ mdiCheck }}</VIcon>
								<span class="d-sr-only">{{ t("common.actions.save") }}</span>
							</button>
						</div>
						<div class="align-self-center menu">
							<slot />
						</div>
					</div>
				</VForm>
			</VCardText>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import image from "@/assets/img/videoConference.svg";
import { isRequired } from "@util-validators";
import { mdiCheck } from "@icons/material";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

const emit = defineEmits(["create:title"]);

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const { t } = useI18n();
const title = ref<string>(t("components.cardElement.videoConferenceElement"));
const form = ref<VuetifyFormApi | null>(null);

const imageSrc = image;

const rules = [isRequired(t("common.validation.required2"))];

const onSubmit = async () => {
	if (form?.value) {
		// await needed for validation to finish
		const { valid } = await form.value.validate();
		if (valid) {
			emit("create:title", title.value);
		}
	}
};

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "enter" || e.key === "Enter") {
		e.preventDefault();
		onSubmit();
	} else if (form?.value) {
		form.value.resetValidation();
	}
};

const isRenderedAsList = computed(() => {
	return smAndUp.value && isListLayout.value;
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
