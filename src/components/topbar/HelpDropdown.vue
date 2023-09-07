<template>
	<v-list class="pa-0 menu-width">
		<template v-for="(item, index) in menuItems" :key="item.label">
			<v-list-item
				:href="item.action"
				:target="item.target"
				:ripple="false"
				class="mb-0"
			>
				<v-list-item-icon class="ma-3 ml-0">
					<v-icon color="primary">{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="primary--text link">
						{{ item.label }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider v-if="index !== menuItems.length - 1" :key="index" />
		</template>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	mdiChatOutline,
	mdiFileQuestionOutline,
	mdiFileCertificateOutline,
	mdiGiftOutline,
} from "@mdi/js";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "HelpDropdown",
	setup() {
		const { t } = useI18n();

		const menuItems = [
			{
				label: t("global.topbar.actions.helpSection"),
				icon: mdiFileQuestionOutline,
				action: "/help",
				target: "_self",
			},
			{
				label: t("global.topbar.actions.contactSupport"),
				icon: mdiChatOutline,
				action: "/help/contact",
				target: "_self",
			},
			{
				label: t("global.topbar.actions.releaseNotes"),
				icon: mdiGiftOutline,
				action: "/help/releases",
				target: "_self",
			},
			{
				label: t("global.topbar.actions.training"),
				icon: mdiFileCertificateOutline,
				action: "https://www.lernen.cloud/",
				target: "_blank",
			},
		];

		return {
			menuItems,
		};
	},
});
</script>

<style lang="scss" scoped>
.link {
	padding-left: var(--space-sm); // space in legacy client 8px;
	text-transform: uppercase;
	&:hover,
	&:focus {
		text-decoration: underline;
	}
}

.menu-width {
	width: 261px;
	min-width: 10rem;
}
</style>
