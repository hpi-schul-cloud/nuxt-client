<template>
	<ul class="dropdown-menu px-0">
		<li v-for="menuItem in menuItems" :key="menuItem.label" class="menu-item">
			<span class="core">
				<svg role="img" class="menu-item__icon">
					<path :d="menuItem.icon"></path>
				</svg>

				<base-link
					:href="menuItem.action"
					:target="menuItem.target"
					class="link"
					:title="menuItem.label"
					:aria-label="menuItem.label"
				>
					{{ menuItem.label }}
				</base-link>
			</span>
		</li>
	</ul>
</template>

<script>
import {
	mdiFileQuestionOutline,
	mdiFileCertificateOutline,
	mdiChatOutline,
} from "@mdi/js";

export default {
	computed: {
		menuItems() {
			return [
				{
					label: this.$t("global.topbar.actions.helpSection"),
					icon: mdiFileQuestionOutline,
					action: "/help",
					target: "_self",
				},
				{
					label: this.$t("global.topbar.actions.contactSupport"),
					icon: mdiChatOutline,
					action: "/help/contact",
					target: "_self",
				},
				{
					label: this.$t("global.topbar.actions.training"),
					icon: mdiFileCertificateOutline,
					action: "https://www.lernen.cloud/",
					target: "_blank",
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
	float: left;
	width: 261px;
	min-width: 10rem;
	text-align: left;
	list-style-type: none;
}

.menu-item {
	--hover-color: #f5f5f5;

	position: relative;
	display: block;
	padding: var(--space-sm) var(--space-sm);
	font-size: var(--text-md); // text size in legacy client 14px;
	text-align: inherit;
	background-color: var(--v-white-base);
	border-bottom: 1px solid map-get($grey, lighten-2);

	&:first-child {
		border-top-left-radius: var(--radius-sm);
		border-top-right-radius: var(--radius-sm);
	}

	&:last-child {
		border: none;
		border-radius: var(--radius-sm);
	}

	&:hover {
		background-color: var(--hover-color);
	}

	.core {
		display: flex;
		align-items: center;
	}

	.core:hover {
		fill: var(--v-primary-darken1);
	}

	.link {
		padding-left: var(--space-sm); // space in legacy client 8px;
		text-transform: uppercase;
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	.menu-item__icon {
		fill: var(--v-primary-base);
		height: 24px;
		width: 24px;
	}
}
</style>
