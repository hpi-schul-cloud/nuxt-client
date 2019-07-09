<template>
	<div class="topbar">
		<div class="top-sidebar">
			<h1 class="page-title">HPI</h1>
			<img class="logo" :src="$theme.logo.transparent" alt="Schulcloud Logo" />
			<h1 class="page-title">Schul-Cloud</h1>
		</div>

		<!-- ACTIONS -->
		<div class="top-main">
			<template v-for="action in actions">
				<popup-icon
					v-if="action.type === 'popupIcon'"
					:key="action.title"
					class="item"
					source="fa"
					:icon="action.icon"
					:popup-items="action.items"
				>
					Lorem ipsum Lorem ipsum Lorem ipsum
				</popup-icon>

				<help-dropdown
					v-if="action.type === 'dropdown'"
					:key="action.title"
					class="item"
					source="fa"
					:icon="action.icon"
					:menu-items="action.items"
				/>

				<div
					v-if="action.type === 'text'"
					:key="action.schoolname"
					class="school-name item"
					>{{ action.schoolname }}</div
				>

				<popup-icon-initials
					v-if="action.type === 'popupWithInitials'"
					:key="action.title"
					:firstname="action.title"
					class="item"
				>
					<div>{{ action.title }} </div>
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
	</div>
</template>

<script>
import PopupIcon from "@components/PopupIcon";
import PopupIconInitials from "@components/PopupIconInitials";
import MenuLink from "@components/MenuLink";
import HelpDropdown from "@components/HelpDropdown";
export default {
	components: { PopupIcon, PopupIconInitials, MenuLink, HelpDropdown },
	props: {
		actions: {
			type: Array,
			default: () => [],
			validator: function(value) {
				return value.every((action) => {
					return (
						(action.icon || action.title) &&
						(action.event || action.to || action.href)
					);
				});
			},
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
		padding: var(--space-sm) var(--space-md);
		background-color: var(--color-primary);

		@include breakpoint(tablet) {
			width: var(--sidebar-width-tablet);
		}

		.logo {
			height: var(--heading-3);
			margin-right: var(--space-sm);
			margin-left: var(--space-sm);

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
</style>
