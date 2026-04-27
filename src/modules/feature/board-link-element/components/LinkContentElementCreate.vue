<template>
	<div data-testid="board-link-element-create" tabindex="-1">
		<VCardText>
			<VForm ref="form" validate-on="submit" @submit.prevent.stop="onSubmit">
				<div class="d-flex flex-row">
					<VTextarea
						v-model="url"
						:rules="rules"
						:label="label"
						:class="{ 'input-success': isUrlValidated }"
						:hint="isUrlValidated ? t('components.cardElement.LinkElement.validation.success') : undefined"
						:persistent-hint="isUrlValidated"
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
import { onBeforeUnmount, ref, toRaw } from "vue";
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
const isUrlValidated = ref(false);

const label = existingUrl
	? t("components.cardElement.LinkElement.edit.label")
	: t("components.cardElement.LinkElement.create.label");

const form = ref<VuetifyFormApi | null>(null);
const rules = [isRequired(t("common.validation.required2")), isValidUrl()];

const onSubmit = async () => {
	if (form?.value) {
		const { valid } = await form.value.validate();
		if (valid) {
			isUrlValidated.value = true;
			emit("create:url", url.value);
		}
	}
};

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "enter" || e.key === "Enter") {
		e.preventDefault();
		onSubmit();
	} else if (form?.value) {
		isUrlValidated.value = false;
		form.value.resetValidation();
	}
};

onBeforeUnmount(() => {
	if (url.value === existingUrl) return;
	if (isUrlValidated.value) return;
	const isValid = rules.every((rule) => rule(url.value) === true);
	if (isValid) {
		emit("create:url", url.value);
	}
});
</script>

<style scoped>
.menu {
	margin-right: -6px;
}

/* simulating success on validation, similar to error case */
:deep(.input-success .v-field__outline) {
	--v-field-border-opacity: 1;
	color: rgb(var(--v-theme-success));
}

:deep(.input-success .v-label) {
	color: rgb(var(--v-theme-success));
}

:deep(.input-success .v-messages) {
	color: rgb(var(--v-theme-success));
}
</style>
