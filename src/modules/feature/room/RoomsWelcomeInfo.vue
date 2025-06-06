<template>
	<InfoAlert class="mb-14">
		{{ t("pages.rooms.infoAlert.welcome") }}

		<ul class="mt-1 pl-4">
			<li>{{ t("pages.rooms.infoAlert.welcome.collaboration") }}</li>
			<li>{{ t("pages.rooms.infoAlert.welcome.teamsAndCourses") }}</li>
			<li>
				<i18n-t
					keypath="pages.rooms.infoAlert.welcome.furtherInformation"
					scope="global"
				>
					<template #helpLink>
						<a
							href="https://docs.dbildungscloud.de/x/6gthFg"
							target="_blank"
							rel="noopener"
							data-testid="rooms-help-link"
							:aria-label="helpAriaLabel"
						>
							{{ t("pages.rooms.infoAlert.welcome.furtherInformation.help") }}
						</a>
					</template>
					<template #feedbackLink>
						<a
							href="/help/contact"
							target="_blank"
							rel="noopener"
							:aria-label="feedbackAriaLabel"
						>
							{{
								t("pages.rooms.infoAlert.welcome.furtherInformation.feedback")
							}}
						</a>
					</template>
				</i18n-t>
			</li>
		</ul>
	</InfoAlert>
</template>

<script setup lang="ts">
import { InfoAlert } from "@ui-alert";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t } = useI18n();

const helpAriaLabel = computed(
	() =>
		`${t("pages.rooms.infoAlert.welcome.furtherInformation.help")}, ${t("common.ariaLabel.newTab")}`
);

const feedbackAriaLabel = computed(
	() =>
		`${t("pages.rooms.infoAlert.welcome.furtherInformation.feedback")}, ${t("common.ariaLabel.newTab")}`
);
</script>
