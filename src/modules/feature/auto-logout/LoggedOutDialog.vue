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
			<ErrorAlert>
				{{ t("feature-loggedout.message") }}
			</ErrorAlert>
		</template>
	</SvsDialog>
</template>

<script lang="ts" setup>
import { ErrorAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { useSessionBroadcast } from "@util-broadcast-channel";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();
const { isJwtExpired } = useSessionBroadcast();

const onConfirm = () => {
	router.push("/login");
};
</script>
