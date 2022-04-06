<template>
	<div class="topbar">
		<!-- ACTIONS -->
		<div
			v-if="!fullscreenMode"
			class="top-main"
			:class="{ 'expanded-menu': expandedMenu }"
		>
			<base-button
				:class="{ 'menu-button': true, 'expanded-menu': expandedMenu }"
				design="text icon"
				@click.native="sendEvent('expandMenu')"
			>
				<base-icon class="menu-icon" source="fa" icon="bars" />
			</base-button>
			<div class="space"></div>
			<base-button
				class="item fullscreen-button"
				design="text icon"
				@click.native="sendEvent('fullscreen')"
			>
				<base-icon source="fa" icon="expand" />
			</base-button>
			<template v-for="action in actions">
				<popup-icon
					:key="action.title"
					class="item"
					source="fa"
					:icon="action.icon"
				>
					<component :is="action.component" v-bind="action.config"></component>
				</popup-icon>
			</template>
			<div v-if="school" class="school-name item">
				{{ school.name }}
			</div>
			<img
				v-if="school && school.logo_dataUrl"
				class="school-logo"
				:src="school.logo_dataUrl"
				:alt="school.name"
			/>

			<popup-icon-initials
				v-if="user"
				:first-name="user.firstName || 'Unknown'"
				:last-name="user.lastName || 'Unknown'"
				:user-role="role"
				class="item"
			>
				<language-menu />
				<a
					href="/account"
					class="account-link"
					role="menuitem"
					:aria-label="$t('global.topbar.settings')"
					>{{ $t("global.topbar.settings") }}</a
				>
				<button
					class="logout-button"
					data-testid="logout"
					role="menuitem"
					:aria-label="$t('common.labels.logout')"
					@click="sendEvent('logout')"
				>
					{{ $t("common.labels.logout") }}
				</button>
			</popup-icon-initials>
		</div>
		<base-button
			v-else
			class="fullscreen-button fullscreen-button-active"
			design="primary icon"
			@click.native="sendEvent('fullscreen')"
		>
			<base-icon source="fa" icon="compress" fill="var(--color-white)" />
		</base-button>
	</div>
</template>

<script>
import PopupIcon from "@components/legacy/PopupIcon";
import PopupIconInitials from "@components/legacy/PopupIconInitials";
import BaseLink from "@basecomponents/BaseLink";
import HelpDropdown from "@components/legacy/HelpDropdown";
import MenuQrCode from "@components/legacy/MenuQrCode";
import LanguageMenu from "@components/molecules/LanguageMenu.vue";

export default {
	components: {
		PopupIcon,
		PopupIconInitials,
		BaseLink,
		HelpDropdown,
		MenuQrCode,
		LanguageMenu,
	},
	props: {
		actions: {
			type: Array,
			default: () => [],
			validator: function (value) {
				return value.every((action) => {
					return action.icon && action.component;
				});
			},
		},
		fullscreenMode: {
			type: Boolean,
		},
		expandedMenu: {
			type: Boolean,
		},
		school: {
			type: Object,
			default: () => ({
				name: "",
			}),
		},
		user: {
			type: Object,
			validator: function (user) {
				return !user || !(user.firstname && user.lastname && user.roles);
			},
			default: null,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		role() {
			const roleName = this.user.roles.map((r) => r.name);
			return this.$t(`global.topbar.roleName.${roleName[0]}`);
		},
	},
	methods: {
		sendEvent(eventName) {
			this.$emit("action", eventName);
		},
	},
};
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */
@import "@styles";

.topbar {
	display: flex;
	align-items: center;
	height: var(--sidebar-item-height);

	.top-main {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		padding-right: var(--space-sm);

		.space {
			flex-grow: 1;
		}

		.item {
			margin-left: var(--space-sm);
		}

		.menu-button {
			z-index: var(--layer-popover);
			display: flex;
			margin: var(--space-xs);
			font-size: 22px;
			text-align: center;
			transition: transform 0.35s;

			.menu-icon {
				padding-left: 4px;
			}

			&:hover,
			&:focus {
				cursor: pointer;
				background-color: transparent;
			}

			@include breakpoint(tablet) {
				display: none;
			}
		}

		&.expanded-menu {
			position: fixed;
			top: 0;
			left: 0;
			background: white;

			.item {
				display: none;
			}

			.menu-button {
				position: fixed;
				top: 0;
				left: 0;
				transform: rotate(90deg);
			}
		}

		@include breakpoint(desktop) {
			.item {
				display: initial;
			}
		}
		.school-name {
			display: none;

			@include breakpoint(tablet) {
				display: initial;
			}
		}
	}
}

.fullscreen-button-active {
	position: fixed;
	top: var(--space-sm);
	right: var(--space-sm);
}

.logout-button,
.account-link {
	--hover-color: #f5f5f5;

	width: 100%;
	padding: 8px 27px;
	color: var(--color-secondary);
	text-align: left;
	text-decoration: none;
	cursor: pointer;
	background-color: transparent;
	border-color: transparent;
	outline: none;

	&:hover,
	&:focus {
		background-color: var(--hover-color);
	}
}
.school-logo {
	max-height: 100%;
	margin-left: 1rem;
}
</style>
