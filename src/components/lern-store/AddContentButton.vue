<template>
	<div>
		<VBtn
			:variant="round ? 'text' : 'elevated'"
			:size="round ? 'small' : 'large'"
			:icon="round ? true : false"
			:color="btnColor"
			:class="btnClass"
			:aria-label="btnLabel ? btnLabel : t('components.molecules.AddContentModal')"
			:disabled="disabled"
			@click.prevent="addResource"
		>
			<VIcon :class="{ 'mr-2': !round }">
				{{ mdiPlusCircleOutline }}
			</VIcon>
			{{ btnLabel }}
		</VBtn>
		<AddContentModal
			v-model:show-copy-modal="copyModalActive"
			:updatedid="itemId"
			:url="url"
			:client="client"
			:title="title"
			:items="selectedElements"
			@close="performAPICall"
		/>
		<LoadingModal v-model="loadingModal.visible" />
		<NotificationModal
			v-model:show-notification-modal="notificationModal.visible"
			:is-success="notificationModal.isSuccess"
			:success-msg="t('pages.content.notification.successMsg')"
			:error-msg="t('pages.content.notification.errorMsg')"
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
import { getID, getMediatype, getMetadataAttribute, getTitle, getUrl } from "@/utils/helpers";
import { useCourses } from "@data-courses";
import { mdiPlusCircleOutline } from "@icons/material";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

let slowAPICall;

export default defineComponent({
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
	setup() {
		const { t } = useI18n();
		const { fetchCourses } = useCourses();

		return { t, fetchCourses };
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
				const url = element.url;
				return {
					title: element.title,
					client: element.client,
					url,
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
				this.fetchCourses();
			}
		},
		performAPICall() {
			this.loadingModal.isLoading = true;
			slowAPICall = setTimeout(() => {
				this.loadingModal.visible = true;
			}, 1000);
		},
	},
});
</script>
