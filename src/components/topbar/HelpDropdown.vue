<template>
	<v-list class="pa-0 menu-width">
		<template v-for="(item, index) in menuItems" :key="item.label">
			<v-list-item
				:href="item.action"
				:target="item.target"
				:title="$t(item.label)"
				:ripple="false"
				:prepend-icon="item.icon"
				class="mb-0"
			/>
			<v-divider v-if="index !== menuItems.length - 1" />
		</template>
	</v-list>
</template>

<script setup lang="ts">
import {
	mdiChatOutline,
	mdiFileCertificateOutline,
	mdiFileQuestionOutline,
	mdiGiftOutline,
} from "@mdi/js";

const menuItems = [
	{
		label: "global.topbar.actions.helpSection",
		icon: mdiFileQuestionOutline,
		action: "/help",
		target: "_self",
	},
	{
		label: "global.topbar.actions.contactSupport",
		icon: mdiChatOutline,
		action: "/help/contact",
		target: "_self",
	},
	{
		label: "global.topbar.actions.releaseNotes",
		icon: mdiGiftOutline,
		action: "/help/releases",
		target: "_self",
	},
	{
		label: "global.topbar.actions.training",
		icon: mdiFileCertificateOutline,
		action: "https://www.lernen.cloud/",
		target: "_blank",
	},
];
</script>

<style lang="scss" scoped>
.menu-width {
	width: 261px;
	min-width: 10rem;
}
</style>
