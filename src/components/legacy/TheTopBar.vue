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
					v-if="action.type === 'popupIcon'"
					:key="action.title"
					class="item"
					source="fa"
					:icon="action.icon"
					:popup-items="action.items"
				>
					<component :is="action.component" v-bind="action.config"></component>
				</popup-icon>

				<div
					v-if="action.type === 'text'"
					:key="action.title"
					class="school-name item"
				>
					{{ action.title }}
				</div>

				<popup-icon-initials
					v-if="action.type === 'popupWithInitials'"
					:key="action.firstname"
					:firstname="action.firstname"
					:lastname="action.lastname"
					:user="action.user"
					:role="action.role"
					class="item"
				>
					<a href="/account" class="account-link">{{
						$t("global.topbar.settings")
					}}</a>
					<button
						:key="action.title"
						v-ripple
						class="logout-button"
						data-testid="logout"
						@click="sendEvent(action.event)"
					>
						{{ $t("common.labels.logout") }}
					</button>
				</popup-icon-initials>
			</template>
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

export default {
	components: {
		PopupIcon,
		PopupIconInitials,
		BaseLink,
		HelpDropdown,
		MenuQrCode,
	},
	props: {
		actions: {
			type: Array,
			default: () => [],
			validator: function (value) {
				return value.every((action) => {
					const isValid =
						// (action.icon || action.title ||
						// (action.firstname && action.lastname && action.role)) &&
						action.type;
					if (!isValid) {
						console.error(
							`Action "${JSON.stringify(
								action
							)}" in prop "actions" of "TheTopBar" is invalid.`
						);
					}
					return isValid;
				});
			},
		},
		fullscreenMode: {
			type: Boolean,
		},
		expandedMenu: {
			type: Boolean,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
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
	color: var(--color-tertiary-dark);
	text-align: left;
	text-decoration: none;
	cursor: pointer;
	background-color: transparent;
	border-color: transparent;
	outline: none;

	&:hover {
		background-color: var(--hover-color);
	}
}
</style>
