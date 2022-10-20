<template>
	<div class="topbar">
		<div
			v-if="!fullscreenMode"
			class="top-main"
			:class="{ 'expanded-menu': expandedMenu }"
		>
			<v-btn
				icon
				:class="{ 'menu-button': true, 'expanded-menu': expandedMenu }"
				data-test-id="top-menu-btn"
				@click.native="sendEvent('expandMenu')"
			>
				<v-icon>fa-solid fa-bars</v-icon>
			</v-btn>
			<div class="top-bar-actions">
				<popup-icon
					v-if="showStatusAlertIcon"
					source="fa"
					icon="exclamation-triangle"
					:title="$t('global.topbar.actions.alerts')"
					:aria-label="$t('global.topbar.actions.alerts')"
					:fill="statusAlertColor"
					class="item"
					centered
					data-test-id="status-alerts-icon"
				>
					<status-alerts :status-alerts="statusAlerts"></status-alerts>
				</popup-icon>
				<v-btn
					class="item"
					icon
					:title="$t('global.topbar.actions.fullscreen')"
					:aria-label="$t('global.topbar.actions.fullscreen')"
					data-test-id="fullscreen-btn"
					@click.native="sendEvent('fullscreen')"
				>
					<v-icon>{{ mdiArrowExpand }}</v-icon>
				</v-btn>
				<popup-icon
					class="item"
					source="fa"
					icon="qrcode"
					:title="$t('global.topbar.actions.qrCode')"
					:aria-label="$t('global.topbar.actions.qrCode')"
					data-test-id="qr-code-btn"
				>
					<menu-qr-code />
				</popup-icon>
				<popup-icon
					class="item"
					source="fa"
					icon="question"
					:title="$t('global.topbar.actions.help')"
					:aria-label="$t('global.topbar.actions.help')"
					data-test-id="help-btn"
				>
					<help-dropdown />
				</popup-icon>
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
		</div>
		<v-btn
			v-else
			color="secondary darken-1"
			fab
			dark
			depressed
			width="40"
			height="40"
			class="fullscreen-button-active"
			@click.native="sendEvent('fullscreen')"
		>
			<v-icon>{{ mdiArrowCollapse }}</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { statusAlertsModule } from "@/store";
import PopupIcon from "@components/legacy/PopupIcon";
import PopupIconInitials from "@components/legacy/PopupIconInitials";
import HelpDropdown from "@components/legacy/HelpDropdown";
import MenuQrCode from "@components/legacy/MenuQrCode";
import StatusAlerts from "@components/molecules/StatusAlerts";
import LanguageMenu from "@components/molecules/LanguageMenu.vue";
import { mdiArrowCollapse, mdiArrowExpand, mdiMenu } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	components: {
		StatusAlerts,
		PopupIcon,
		PopupIconInitials,
		HelpDropdown,
		MenuQrCode,
		LanguageMenu,
	},
	props: {
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
		return {
			mdiArrowCollapse,
			mdiArrowExpand,
			mdiMenu,
		};
	},
	computed: {
		role() {
			const roleName = this.user.roles.map((r) => r.name);
			return this.$t(`global.topbar.roleName.${roleName[0]}`);
		},
		showStatusAlertIcon() {
			return this.statusAlerts.length !== 0;
		},
		statusAlertColor() {
			const statusAlertsIncludeDanger =
				this.statusAlerts.filter((alert) => alert.status === "danger")
					.length !== 0;

			return statusAlertsIncludeDanger
				? "var(--v-error-base)"
				: "var(--v-secondary-darken1)";
		},
		statusAlerts() {
			return statusAlertsModule.getStatusAlerts;
		},
	},
	async mounted() {
		await statusAlertsModule.fetchStatusAlerts();
	},
	methods: {
		sendEvent(eventName) {
			this.$emit("action", eventName);
		},
	},
});
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
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding-right: var(--space-sm);

		.top-bar-actions {
			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: flex-end;
		}

		.item {
			margin-left: var(--space-sm);
		}

		.menu-button {
			z-index: var(--layer-popover);
			display: flex;
			margin: var(--space-xs);
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
	opacity: 0.5;
}

.logout-button,
.account-link {
	--hover-color: #f5f5f5;

	width: 100%;
	padding: 8px 27px;
	color: var(--v-secondary-base);
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
