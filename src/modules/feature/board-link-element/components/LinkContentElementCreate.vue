<template>
	<div data-testid="board-link-element-create" tabindex="-1">
		<VCardText>
			<VForm ref="form" validate-on="submit" @submit.prevent.stop="onSubmit">
				<div class="d-flex flex-row">
					<VTextarea
						v-model="url"
						:rules="rules"
						:label="label"
						type="text"
						data-testid="input-link"
						:autofocus="true"
						:auto-grow="true"
						rows="1"
						class="text"
						@keydown="onKeydown"
					/>

					<div class="align-self-center pl-2">
						<button ref="submit" type="submit" data-testid="save-link-in-card">
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
import { mdiCheck } from "@icons/material";
import { isRequired, isValidUrl } from "@util-validators";
import { ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

const props = defineProps({
	existingUrl: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["create:url"]);

const { t } = useI18n();

const { existingUrl } = toRaw(props);
const url = ref(existingUrl);

const label = existingUrl
	? t("components.cardElement.LinkElement.edit.label")
	: t("components.cardElement.LinkElement.create.label");

const form = ref<VuetifyFormApi | null>(null);

const rules = [isRequired(t("common.validation.required2")), isValidUrl()];

const onSubmit = async () => {
	if (form?.value) {
		const { valid } = await form.value.validate();
		if (valid) {
			emit("create:url", url.value);
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
.menu {
	margin-right: -6px;
}
</style>
