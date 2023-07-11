<template>
	<div class="topbar">
		<div
			v-if="!fullscreen"
			class="top-main"
			:class="{ 'expanded-menu': expandedMenu }"
		>
			<v-btn
				icon
				height="60"
				width="60"
				color="secondary darken-1"
				:ripple="false"
				:class="{ 'menu-button': true, 'expanded-menu': expandedMenu }"
				data-test-id="top-menu-btn"
				:aria-label="$t('global.topbar.mobileMenu.ariaLabel')"
				role="menu"
				@click.native="sendEvent('expandMenu')"
			>
				<v-icon>{{ mdiMenu }}</v-icon>
			</v-btn>
			<div class="top-bar-actions">
				<popup-icon
					v-if="showStatusAlertIcon"
					:icon="mdiAlert"
					:title="$t('global.topbar.actions.alerts')"
					:aria-label="$t('global.topbar.actions.alerts')"
					:color="statusAlertColor"
					class="item exclamation-triangle"
					centered
					data-test-id="status-alerts-icon"
				>
					<StatusAlerts :status-alerts="statusAlerts" />
				</popup-icon>
				<v-btn
					class="item"
					icon
					color="secondary darken-1"
					:title="$t('global.topbar.actions.fullscreen')"
					:aria-label="$t('global.topbar.actions.fullscreen')"
					data-test-id="fullscreen-btn"
					@click.native="sendEvent('fullscreen')"
				>
					<v-icon>{{ mdiArrowExpand }}</v-icon>
				</v-btn>
				<popup-icon
					class="item"
					:icon="mdiQrcode"
					:title="$t('global.topbar.actions.qrCode')"
					:aria-label="$t('global.topbar.actions.qrCode')"
					data-test-id="qr-code-btn"
				>
					<menu-qr-code />
				</popup-icon>
				<popup-icon
					class="item"
					:icon="mdiHelpCircleOutline"
					:title="$t('global.topbar.actions.helpSection')"
					:aria-label="$t('global.topbar.actions.helpSection')"
					data-test-id="help-btn"
				>
					<help-dropdown />
				</popup-icon>
				<div v-if="school" class="school-name item" tabindex="0">
					{{ school.name }}
				</div>
				<img
					v-if="school && school.logo_dataUrl"
					class="school-logo"
					:src="school.logo_dataUrl"
					ref="image"
					alt=""
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
						:aria-label="$t('global.topbar.settings').toString()"
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

<script lang="ts">
import {
	defineComponent,
	PropType,
	onMounted,
	computed,
	ref,
	watch,
} from "vue";
import {
	I18N_KEY,
	STATUS_ALERTS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { User } from "@/store/types/auth";
// import { statusAlertsModule } from "@/store";
import PopupIcon from "@/components/topbar/PopupIcon.vue";
import PopupIconInitials from "@/components/topbar/PopupIconInitials.vue";
import HelpDropdown from "@/components/topbar/HelpDropdown.vue";
import MenuQrCode from "@/components/topbar/MenuQrCode.vue";
import StatusAlerts from "@/components/topbar/StatusAlerts.vue";
import LanguageMenu from "@/components/topbar/LanguageMenu.vue";
import {
	mdiArrowCollapse,
	mdiArrowExpand,
	mdiMenu,
	mdiHelpCircleOutline,
	mdiQrcode,
	mdiAlert,
} from "@mdi/js";

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
			type: Object as PropType<User>,
			default: null,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const statusAlertsModule = injectStrict(STATUS_ALERTS_MODULE_KEY);
		const fullscreen = ref(props.fullscreenMode);

		onMounted(() => {
			(async () => {
				await statusAlertsModule.fetchStatusAlerts();
			})();
		});

		watch(
			() => props.fullscreenMode,
			(newValue) => {
				fullscreen.value = newValue;
			}
		);

		const sendEvent = (eventName: string) => {
			emit("action", eventName);
		};

		const role = computed(() => {
			const roleName = props.user.roles.map((r) => r.name);
			return i18n.t(`common.roleName.${roleName[0]}`).toString();
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
				? "var(--v-error-base)"
				: "var(--v-info-base)";
		});

		return {
			mdiArrowCollapse,
			mdiArrowExpand,
			mdiMenu,
			mdiHelpCircleOutline,
			mdiQrcode,
			mdiAlert,
			sendEvent,
			role,
			statusAlerts,
			showStatusAlertIcon,
			statusAlertColor,
			fullscreen,
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
