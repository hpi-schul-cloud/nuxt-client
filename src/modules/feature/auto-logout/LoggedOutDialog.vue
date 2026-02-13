<template>
	<SvsDialog
		:model-value="isJwtExpired"
		title="feature-loggedout.title"
		no-cancel
		persistent
		confirm-btn-lang-key="feature-loggedout.button"
		@confirm="onConfirm"
	>
		<template #content>
			<WarningAlert>
				{{ t("feature-loggedout.message") }}
			</WarningAlert>
		</template>
	</SvsDialog>
</template>

<script lang="ts" setup>
import { useAppStoreRefs } from "@data-app";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();
const { isJwtExpired } = useAppStoreRefs();

const onConfirm = () => {
	router.push("/login");
};
</script>
