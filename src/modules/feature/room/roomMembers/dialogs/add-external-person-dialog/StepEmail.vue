<template>
	<VCard ref="addExternalPersonContent">
		<template #title>
			<h2 class="mt-2">
				{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.heading") }}
			</h2>
		</template>
		<template #text>
			<p>
				{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.text") }}
			</p>
			<VForm ref="emailForm" class="mt-5" data-testid="add-external-person-email-form" @submit.prevent="onConfirmEmail">
				<VTextField
					ref="emailInput"
					v-model="email"
					class="mb-4"
					:readonly="hasError"
					:label="t('pages.rooms.members.dialog.addExternalPerson.label.email')"
					data-testid="add-external-person-email"
					:rules="[isValidEmail(t('pages.rooms.members.dialog.addExternalPerson.label.email.error'))]"
					validate-on="submit"
					@keydown.enter.prevent="onConfirmEmail()"
				/>
			</VForm>
			<ErrorAlert v-if="hasError" class="error-message">
				<i18n-t keypath="pages.rooms.members.dialog.addExternalPerson.steps.email.error.userNotExternal" scope="global">
					<template #link>
						<a :href="requirementsLink!" class="link" target="_blank" rel="noopener" :ariaLabel="linkAriaLabel">
							{{ t("pages.rooms.members.dialog.addExternalPerson.steps.email.error.userNotExternal.requirements") }}
						</a>
					</template>
				</i18n-t>
			</ErrorAlert>
		</template>
		<template #actions>
			<VSpacer />
			<div class="mr-4 mb-3">
				<template v-if="!hasError">
					<VBtn
						ref="cancelButton"
						class="ms-auto mr-2"
						:text="t('common.actions.cancel')"
						data-testid="add-external-person-cancel-btn"
						@click="onCancel"
					/>
					<VBtn
						ref="addButton"
						class="ms-auto"
						color="primary"
						variant="flat"
						:text="t('pages.rooms.members.dialog.addExternalPerson.button.add')"
						data-testid="add-external-person-add-email-btn"
						@click="onConfirmEmail"
					/>
				</template>
				<template v-else>
					<VBtn
						ref="closeButton"
						class="ms-auto"
						variant="outlined"
						:text="t('common.labels.close')"
						data-testid="add-external-person-close-btn"
						@click="onCancel"
					/>
				</template>
			</div>
		</template>
	</VCard>
</template>

<script setup lang="ts">
import { getFirstInvalidElement } from "./utils/form";
import { useEnvConfig } from "@data-env";
import { ErrorAlert } from "@ui-alert";
import { isValidEmail } from "@util-validators";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	hasError?: boolean;
};

const email = defineModel("email", { type: String, required: true });

withDefaults(defineProps<Props>(), {
	hasError: false,
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "submit:email", email: string): void;
}>();

const emailForm = ref();
const emailInput = ref<HTMLElement>();

onMounted(() => {
	setTimeout(() => {
		emailInput.value?.focus();
	}, 0);
});

const { t } = useI18n();

const onConfirmEmail = async () => {
	const errorElement = await getFirstInvalidElement(emailForm);
	if (errorElement) {
		errorElement.focus();
		return;
	}

	emit("submit:email", email.value);
};

const onCancel = () => {
	emit("close");
};
const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.dialog.addExternalPerson.steps.email.error.userNotExternal.requirements")}, ${t("common.ariaLabel.newTab")}`
);

const requirementsLink = computed(() => useEnvConfig().value.ROOM_MEMBER_INFO_URL);
</script>

<style scoped lang="scss">
.link {
	color: rgba(var(--v-theme-on-surface));
}
</style>
