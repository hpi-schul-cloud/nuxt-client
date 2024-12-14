<template>
	<div data-testid="board-video-conference-element-create">
		<VImg :src="imageSrc" alt="" cover />
		<VCardText>
			<VForm @submit.prevent.stop="onSubmit" ref="form" validate-on="submit">
				<div class="d-flex flex-row">
					<VTextarea
						v-model="title"
						:rules="rules"
						:label="$t('components.cardElement.videoConferenceElement.label')"
						type="text"
						:autofocus="true"
						:auto-grow="true"
						rows="1"
						@keydown="onKeydown"
						class="text"
						:placeholder="$t('components.cardElement.videoConferenceElement')"
					/>

					<div class="align-self-center pl-2">
						<button type="submit" ref="submit">
							<VIcon aria-hidden="true"> {{ mdiCheck }}</VIcon>
							<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
						</button>
					</div>

					<div class="align-self-center menu">
						<slot />
					</div>
				</div>
			</VForm>
		</VCardText>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import image from "@/assets/img/videoConference.svg";
import { isRequired } from "@util-validators";
import { mdiCheck } from "@icons/material";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

const emit = defineEmits(["create:title"]);

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
</script>

<style scoped>
.v-textarea textarea {
	padding-top: 8px;
}
.menu {
	margin-right: -6px;
}
</style>
