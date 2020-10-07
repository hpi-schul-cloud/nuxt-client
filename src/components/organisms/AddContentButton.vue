<template>
	<div>
		<base-button
			:design="btnDesign"
			:class="btnClass"
			:size="btnSize"
			role="button"
			:aria-label="
				btnLabel ? btnLabel : `$t('components.molecules.AddContentModal')`
			"
			@click.prevent="addResource"
		>
			<base-icon :class="btnIconClass" source="material" :icon="btnIcon" />
			{{ btnLabel }}
		</base-button>
		<add-content-modal
			:show-copy-modal.sync="copyModalActive"
			:updatedid="resource.ref.id"
			:url="getUrl"
			:client="client"
			:title="resource.title"
			@close="performAPICall"
		/>
		<loading-modal
			:title="$t('pages.content.notification.loading')"
			description=""
			:btn-text="$t('common.labels.close')"
			:active.sync="loadingModal.visible"
		/>
		<notification-modal
			:show-notification-modal.sync="notificationModal.visible"
			:is-success="notificationModal.isSuccess"
			:backgroundcolor="
				notificationModal.isSuccess
					? 'var(--color-success)'
					: 'var(--color-danger)'
			"
			:success-msg="$t('pages.content.notification.successMsg')"
			:error-msg="$t('pages.content.notification.errorMsg')"
			@close="addResourceAndClose"
		/>
	</div>
</template>

<script>
import AddContentModal from "@components/molecules/AddContentModal";
import NotificationModal from "@components/molecules/NotificationModal";
import LoadingModal from "@components/molecules/LoadingModal";
import { getMetadataAttribute } from "@utils/helpers";

let slowAPICall;

export default {
	name: "AddContentButton",
	components: {
		AddContentModal,
		NotificationModal,
		LoadingModal,
	},
	props: {
		btnLabel: { type: String, default: "" },
		btnDesign: { type: String, default: "" },
		btnSize: { type: String, default: "medium" },
		btnClass: { type: String, default: "" },
		btnIconClass: { type: String, default: "" },
		btnIcon: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },
		resource: { type: Object, default: () => {} },
	},
	data() {
		return {
			copyModalActive: false,
			loadingModal: {
				visible: false,
				isLoading: false,
			},
			notificationModal: {
				visible: false,
				isSuccess: false,
			},
		};
	},
	computed: {
		getUrl() {
			return getMetadataAttribute(this.resource.properties, "ccm:wwwurl");
		},
		getMerlinReference() {
			const isMerlinContent = getMetadataAttribute(
				this.resource.properties,
				"ccm:replicationsource"
			).includes("merlin");
			return isMerlinContent
				? getMetadataAttribute(
						this.resource.properties,
						"ccm:replicationsourceid"
				  )
				: "";
		},
	},
	methods: {
		addResourceAndClose() {
			if (window.opener && window.opener !== window) {
				if (window.opener.addResource) {
					window.opener.addResource({
						title: this.resource.title,
						client: this.client,
						url: this.getUrl,
						merlinReference: this.getMerlinReference,
					});
					window.close();
					return true;
				}
			}
		},
		addResource() {
			if (!this.addResourceAndClose()) {
				this.copyModalActive = true;
				this.$store.dispatch("courses/find");
			}
		},
		performAPICall() {
			this.loadingModal.isLoading = true;
			slowAPICall = setTimeout(() => {
				this.loadingModal.visible = true;
			}, 1000);
		},
	},
	onEventBus: {
		"showModal@content": function (value) {
			if (this.loadingModal.isLoading) {
				clearTimeout(slowAPICall);
				this.loadingModal.visible = false;
				this.loadingModal.isLoading = false;
				this.notificationModal.visible = true;
				switch (value) {
					case "successModal":
						this.notificationModal.isSuccess = true;
						break;
					default:
						this.notificationModal.isSuccess = false;
						break;
				}
			}
		},
	},
};
</script>
