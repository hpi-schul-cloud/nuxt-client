<template>
	<div class="topbar">
		<div
			v-if="!fullscreenMode"
			class="top-main"
			:class="{ 'expanded-menu': expandedMenu }"
		>
			<v-btn
				icon="$mdiMenu"
				height="60"
				width="60"
				variant="text"
				:ripple="false"
				:class="{ 'menu-button': true, 'expanded-menu': expandedMenu }"
				data-testid="top-menu-btn"
				:aria-label="$t('global.topbar.mobileMenu.ariaLabel')"
				role="menu"
				@click="sendEvent('expandMenu')"
			/>
			<div class="top-bar-actions">
				<popup-icon
					v-if="showStatusAlertIcon"
					icon="$mdiAlert"
					:title="$t('global.topbar.actions.alerts')"
					:aria-label="$t('global.topbar.actions.alerts')"
					:color="statusAlertColor"
					class="item exclamation-triangle"
					centered
					data-testid="status-alerts-icon"
				>
					<StatusAlerts :status-alerts="statusAlerts" />
				</popup-icon>
				<v-btn
					class="item"
					icon="$mdiArrowExpand"
					variant="text"
					density="comfortable"
					:title="$t('global.topbar.actions.fullscreen')"
					:aria-label="$t('global.topbar.actions.fullscreen')"
					data-testid="fullscreen-btn"
					@click="sendEvent('fullscreen')"
				/>
				<popup-icon
					class="item"
					icon="$mdiQrcode"
					:title="$t('global.topbar.actions.qrCode')"
					:aria-label="$t('global.topbar.actions.qrCode')"
					data-testid="qr-code-btn"
				>
					<menu-qr-code />
				</popup-icon>
				<popup-icon
					class="item"
					icon="$mdiHelpCircleOutline"
					:title="$t('global.topbar.actions.helpSection')"
					:aria-label="$t('global.topbar.actions.helpSection')"
					data-testid="help-btn"
				>
					<help-dropdown />
				</popup-icon>
				<div v-if="school" class="school-name item">
					{{ school.name }}
				</div>
				<img
					v-if="school?.logo?.url"
					class="school-logo"
					:src="school.logo.url"
					ref="image"
					alt=""
				/>
				<popup-icon-initials
					v-if="user"
					:first-name="user.firstName || 'Unknown'"
					:last-name="user.lastName || 'Unknown'"
					:user-role="role"
					class="item"
					data-testid="item"
				>
					<language-menu />
					<a
						href="/account"
						class="account-link"
						role="menuitem"
						:aria-label="$t('global.topbar.settings').toString()"
						data-testid="account-link"
					>
						{{ $t("global.topbar.settings") }}
					</a>
					<button
						class="logout-button"
						data-testid="logout"
						role="menuitem"
						:aria-label="$t('common.labels.logout').toString()"
						@click="sendEvent('logout')"
					>
						{{ $t("common.labels.logout") }}
					</button>
				</popup-icon-initials>
			</div>
		</div>
		<v-btn
			v-else
			icon="$mdiArrowCollapse"
			variant="flat"
			width="40"
			height="40"
			class="fullscreen-button-active"
			@click="sendEvent('fullscreen')"
		/>
	</div>
</template>

<script lang="ts">
import HelpDropdown from "@/components/topbar/HelpDropdown.vue";
import LanguageMenu from "@/components/topbar/LanguageMenu.vue";
import MenuQrCode from "@/components/topbar/MenuQrCode.vue";
import PopupIcon from "@/components/topbar/PopupIcon.vue";
import PopupIconInitials from "@/components/topbar/PopupIconInitials.vue";
import StatusAlerts from "@/components/topbar/StatusAlerts.vue";
import { MeSchoolResponse, MeUserResponse } from "@/serverApi/v3";
import { STATUS_ALERTS_MODULE_KEY, injectStrict } from "@/utils/inject";
import { PropType, computed, defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";

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
			type: Object as PropType<MeSchoolResponse>,
			default: () => ({
				name: "",
			}),
		},
		user: {
			type: Object as PropType<MeUserResponse>,
			default: null,
		},
		roleNames: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const { t } = useI18n();
		const statusAlertsModule = injectStrict(STATUS_ALERTS_MODULE_KEY);

		onMounted(() => {
			(async () => {
				await statusAlertsModule.fetchStatusAlerts();
			})();
		});

		const sendEvent = (eventName: string) => {
			emit("action", eventName);
		};

		const translatedRoleName = computed(() => {
			return t(`common.roleName.${props.roleNames[0]}`).toString();
		});

		const statusAlerts = computed(() => {
			return statusAlertsModule.getStatusAlerts;
		});

		const showStatusAlertIcon = computed(() => {
			return statusAlerts.value.length !== 0;
		});

		const statusAlertColor = computed(() => {
			const statusAlertsIncludeDanger =
				statusAlerts.value.filter((alert) => alert.status === "danger")
					.length !== 0;

			return statusAlertsIncludeDanger
				? "rgba(var(--v-theme-error))"
				: "rgba(var(--v-theme-info))";
		});

		return {
			sendEvent,
			role: translatedRoleName,
			statusAlerts,
			showStatusAlertIcon,
			statusAlertColor,
		};
	},
});
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */
@import "@/styles/mixins";

.topbar {
	display: flex;
	align-items: center;
	height: var(--sidebar-item-height);

	@include breakpoint(tablet) {
		max-width: calc(100vw - var(--sidebar-width-tablet));
	}

	@include breakpoint(desktop) {
		max-width: calc(100vw - var(--sidebar-width));
	}

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
