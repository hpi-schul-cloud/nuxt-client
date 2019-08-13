<template>
	<div class="topbar">
		<div v-if="!fullscreenMode" class="top-sidebar" @click="$emit('input')">
			<img
				class="logo"
				src="@assets/img/logo/logo-image-mono.svg"
				alt="Schulcloud Logo"
			/>
		</div>

		<!-- ACTIONS -->
		<div v-if="!fullscreenMode" class="top-main">
			<base-icon-button
				class="item fullscreen-button"
				source="fa"
				icon="expand"
				@click.native="sendEvent('fullscreen')"
			/>
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
					>{{ action.title }}</div
				>

				<popup-icon-initials
					v-if="action.type === 'popupWithInitials'"
					:key="action.firstname"
					:firstname="action.firstname"
					:lastname="action.lastname"
					:user="action.user"
					:role="action.role"
					class="item"
				>
					<a href="/account" class="account-link">Einstellungen</a>
					<button
						:key="action.title"
						v-ripple
						class="logout-button"
						@click="sendEvent(action.event)"
					>
						Abmelden
					</button>
				</popup-icon-initials>
			</template>
		</div>
		<base-button
			v-if="!!fullscreenMode"
			class="fullscreen-button fullscreen-button-active"
			design="secondary icon"
			@click.native="sendEvent('fullscreen')"
		>
			<base-icon source="fa" icon="compress" fill="var(--color-white)" />
		</base-button>
	</div>
</template>

<script>
import PopupIcon from "@components/PopupIcon";
import PopupIconInitials from "@components/PopupIconInitials";
import BaseLink from "@components/ui/BaseLink";
import HelpDropdown from "@components/HelpDropdown";
import MenuQrCode from "@components/MenuQrCode";

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
			validator: function(value) {
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
	},
	methods: {
		sendEvent(eventName) {
			this.$emit("action", eventName);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.topbar {
	display: flex;
	align-items: center;

	.top-sidebar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: var(--sidebar-width);
		height: 100%;
		padding: 0 var(--space-xxs);
		background-color: var(--color-primary);

		@include breakpoint(tablet) {
			width: var(--sidebar-width-tablet);
		}

		.logo {
			width: 100%;
			height: var(--sidebar-item-height);
			padding-top: var(--space-xs);
			padding-bottom: var(--space-xs);

			@include breakpoint(tablet) {
				margin: 0;
				// hier fehlt noch was
			}
		}
	}

	.top-main {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		align-items: center;
		justify-content: flex-end;
		padding-right: var(--space-sm);

		.item {
			margin-left: var(--space-sm);
		}

		.school-name {
			@include breakpoint(tablet) {
				display: none;
			}
		}
	}
}

.fullscreen-button-active {
	position: fixed;
	top: var(--space-sm);
	right: var(--space-sm);
	// padding: var(--space-sm) var(--space-md);
	// background-color: var(--color-primary);
	// box-shadow: var(--shadow-sm);
}

.logout-button, .account-link {
	--hover-color: #f5f5f5;

	width: 100%;
	/* stylelint-disable sh-waqar/declaration-use-variable */
	padding: 8px 27px;
	/* stylelint-enable */
	font-size: var(--text-lg);
	color: var(--color-tertiary-dark);
	text-align: left;
	text-decoration: none;
	background-color: transparent;
	border-color: transparent;
	outline: none;

	&:hover {
		background-color: var(--hover-color);
	}
}
</style>
