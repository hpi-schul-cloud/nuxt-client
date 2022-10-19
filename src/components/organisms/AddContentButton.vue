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
			:disabled="disabled"
			@click.prevent="addResource"
		>
			<base-icon :class="btnIconClass" source="material" :icon="btnIcon" />
			{{ btnLabel }}
		</base-button>
		<add-content-modal
			:show-copy-modal.sync="copyModalActive"
			:updatedid="itemId"
			:url="url"
			:client="client"
			:title="title"
			:merlin-reference="merlinReference"
			:items="selectedElements"
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
					? 'var(--v-success-base)'
					: 'var(--v-error-base)'
			"
			:success-msg="$t('pages.content.notification.successMsg')"
			:error-msg="$t('pages.content.notification.errorMsg')"
			@close="addResourceAndClose"
		/>
	</div>
</template>

<script>
import { contentModule } from "@/store";
import AddContentModal from "@/components/molecules/AddContentModal";
import NotificationModal from "@/components/molecules/NotificationModal";
import LoadingModal from "@/components/molecules/LoadingModal";
import {
	getTitle,
	getMerlinReference,
	getUrl,
	getMetadataAttribute,
} from "@/utils/helpers";

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
		disabled: { type: Boolean },
		multiple: { type: Boolean },
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
			selectedElements: [],
		};
	},
	computed: {
		elements() {
			return contentModule.getElementsGetter;
		},
		selected() {
			return contentModule.getSelected;
		},
		addContentNotificationModal() {
			return contentModule.notificationModal;
		},
		itemId() {
			return this.resource && this.resource.properties
				? getMetadataAttribute(
						this.resource.properties,
						"ccm:replicationsourceuuid"
				  )
				: null;
		},
		title() {
			return getTitle(this.resource);
		},
		url() {
			return getUrl(this.resource);
		},
		merlinReference() {
			return getMerlinReference(this.resource);
		},
	},
	watch: {
		selected() {
			if (this.multiple) {
				const selectedElements = this.elements.data.filter(
					(element) => element.stateSelected === true
				);

				this.selectedElements = selectedElements.map((element) => {
					return {
						url: getUrl(element),
						title: getTitle(element),
						client: this.client,
						merlinReference: getMerlinReference(element),
					};
				});
			}
		},
		addContentNotificationModal(value) {
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
	methods: {
		async addResourceAndClose() {
			const getElementInfo = async (element) => {
				return {
					title: element.title,
					client: element.client,
					url: element.merlinReference
						? await this.$axios.$get(
								`/v1/edu-sharing/merlinToken/?merlinReference=${element.merlinReference}`
						  )
						: element.url,
					merlinReference: element.merlinReference,
				};
			};

			if (window.opener && window.opener !== window) {
				if (window.opener.addResource) {
					if (this.selectedElements.length > 0) {
						const elements = await Promise.all(
							this.selectedElements.map(async (element) => {
								return await getElementInfo(element);
							})
						);
						elements.forEach((element) => {
							window.opener.addResource(element);
						});
					} else {
						window.opener.addResource(await getElementInfo(this));
					}
					window.close();
					return true;
				}
			}
		},
		async addResource() {
			contentModule.setNotificationModal(null);
			if (!(await this.addResourceAndClose())) {
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
};
</script>
<style lang="scss" scoped>
.wide-button {
	width: 100%;
}
</style>
