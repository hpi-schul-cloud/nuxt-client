<template>
	<div class="topbar">
		<div v-if="!fullscreenMode" class="top-sidebar" @click="$emit('input')">
			<img class="logo" :src="$theme.logo.transparent" alt="Schulcloud Logo" />
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
					<menu-link to="/">Einstellungen</menu-link>
					<base-button
						:key="action.title"
						v-ripple
						class="item"
						@click="sendEvent(action.event)"
					>
						Abmelden
					</base-button>
				</popup-icon-initials>
			</template>
		</div>
		<base-button
			v-if="!!fullscreenMode"
			class="fullscreen-button fullscreen-button-active"
			design="secondary icon"
			@click.native="sendEvent('fullscreen')"
		>
			<base-icon source="fa" icon="expand" />
		</base-button>
	</div>
</template>

<script>
import PopupIcon from "@components/PopupIcon";
import PopupIconInitials from "@components/PopupIconInitials";
import MenuLink from "@components/MenuLink";
import HelpDropdown from "@components/HelpDropdown";
import MenuQrCode from "@components/MenuQrCode";

export default {
	components: {
		PopupIcon,
		PopupIconInitials,
		MenuLink,
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
						(action.icon ||
							action.title ||
							(action.firstname && action.lastname && action.role)) &&
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
			height: var(--heading-1);
			margin-top: var(--space-xs);
			margin-bottom: var(--space-xs);

			@include breakpoint(tablet) {
				margin: 0;
				// hier fehlt noch was
			}
		}

		.page-title {
			padding: 0;
			margin: 0;
			font-family: var(--font-accent);
			font-size: var(--heading-5);
			font-weight: var(--font-weight-normal);
			color: var(--color-white);
			text-transform: capitalize;

			@include breakpoint(tablet) {
				display: none;
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
}
</style>
