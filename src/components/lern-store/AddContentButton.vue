<template>
	<div>
		<v-btn
			:variant="round ? 'text' : 'elevated'"
			:size="round ? 'small' : 'large'"
			:icon="round ? true : false"
			:color="btnColor"
			:class="btnClass"
			:aria-label="btnLabel ? btnLabel : $t('components.molecules.AddContentModal')"
			:disabled="disabled"
			@click.prevent="addResource"
		>
			<v-icon :class="{ 'mr-2': !round }">
				{{ mdiPlusCircleOutline }}
			</v-icon>
			{{ btnLabel }}
		</v-btn>
		<add-content-modal
			v-model:show-copy-modal="copyModalActive"
			:updatedid="itemId"
			:url="url"
			:client="client"
			:title="title"
			:merlin-reference="merlinReference"
			:items="selectedElements"
			@close="performAPICall"
		/>
		<loading-modal
			v-model:active="loadingModal.visible"
			:title="$t('pages.content.notification.loading')"
			description=""
			:btn-text="$t('common.labels.close')"
		/>
		<notification-modal
			v-model:show-notification-modal="notificationModal.visible"
			:is-success="notificationModal.isSuccess"
			:backgroundcolor="notificationModal.isSuccess ? 'rgba(var(--v-theme-success))' : 'rgba(var(--v-theme-error))'"
			:success-msg="$t('pages.content.notification.successMsg')"
			:error-msg="$t('pages.content.notification.errorMsg')"
			@close="addResourceAndClose"
		/>
	</div>
</template>

<script>
import AddContentModal from "@/components/lern-store/AddContentModal";
import LoadingModal from "@/components/lern-store/LoadingModal";
import NotificationModal from "@/components/lern-store/NotificationModal";
import { contentModule } from "@/store";
import { $axios } from "@/utils/api";
import { getID, getMediatype, getMerlinReference, getMetadataAttribute, getTitle, getUrl } from "@/utils/helpers";
import { mdiPlusCircleOutline } from "@icons/material";

let slowAPICall;

export default {
	name: "AddContentButton",
	components: {
		AddContentModal,
		NotificationModal,
		LoadingModal,
	},
	props: {
		round: { type: Boolean },
		btnColor: { type: String, default: undefined },
		btnLabel: { type: String, default: "" },
		btnClass: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },
		resource: { type: Object, default: () => ({}) },
		disabled: { type: Boolean },
		multiple: { type: Boolean },
	},
	data() {
		return {
			mdiPlusCircleOutline,
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
			return this.resource?.properties
				? getMetadataAttribute(this.resource.properties, "ccm:replicationsourceuuid")
				: null;
		},
		title() {
			return getTitle(this.resource);
		},
		url() {
			if (getMediatype(this.resource) === "file-h5p") {
				let baseUrlH5p = "";
				if ($axios.defaults.baseURL.includes("/api")) {
					baseUrlH5p = $axios.defaults.baseURL.slice(0, -4);
				} else {
					baseUrlH5p = $axios.defaults.baseURL;
				}
				return baseUrlH5p + "/content/" + getMetadataAttribute(this.resource.properties, "ccm:replicationsourceuuid");
			}
			return getUrl(this.resource);
		},
		merlinReference() {
			return getMerlinReference(this.resource);
		},
	},
	watch: {
		selected() {
			if (this.multiple) {
				const selectedElements = this.elements.data.filter((element) => element.stateSelected === true);

				this.selectedElements = selectedElements.map((element) => {
					let elementUrl = getUrl(element);
					if (getMediatype(element) === "file-h5p") {
						const elementID = getID(element);
						if (elementID !== null) {
							const baseUrlH5p = $axios.defaults.baseURL.slice(0, -4);
							elementUrl = `${baseUrlH5p}/content/${elementID}`;
						} else {
							elementUrl = null;
						}
					}

					return {
						url: elementUrl,
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
				this.notificationModal.isSuccess = value === "successModal";
			}
		},
	},
	methods: {
		async addResourceAndClose() {
			const getElementInfo = async (element) => {
				let url = element.url;
				if (element.merlinReference) {
					const requestUrl = `/v1/edu-sharing-merlinToken/?merlinReference=${element.merlinReference}`;
					url = (await $axios.get(requestUrl)).data || element.url;
				}
				return {
					title: element.title,
					client: element.client,
					url,
					merlinReference: element.merlinReference,
				};
			};

			if (window.opener && window.opener !== window) {
				if (window.opener.addResource) {
					if (this.selectedElements.length > 0) {
						const elements = await Promise.all(
							this.selectedElements.map(async (element) => await getElementInfo(element))
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
