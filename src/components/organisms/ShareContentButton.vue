<template>
	<div>
		<base-button
				:design="btnDesign"
				:class="btnClass"
				:size="btnSize"
				role="button"
				:aria-label="
				btnLabel ? btnLabel : `${$t('components.molecules.AddContentModal')}`
			"
				@click.prevent="addResource"
		>
			<base-icon :class="btnIconClass" source="material" :icon="btnIcon" />
			{{ btnLabel }}
		</base-button>
		<share-content-modal
				:updatedid="resource.ref.id"
				:url="getUrl"
		/>
	</div></template>

<script>
import ShareContentModal from "@components/organisms/ShareContentModal";
import { getMetadataAttribute } from "@utils/helpers";

export default {
	name: "AddContentButton",
	components: {
		ShareContentModal,
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
			showNotificationModal: false,
		};
	},
	computed: {
		getUrl() {
			return getMetadataAttribute(this.resource.properties, "cclom:location");
		},
	},
	methods: {
		addResourceAndClose() {
			if (window.opener && window.opener !== window) {
				if (window.opener.addResource) {
					window.opener.addResource({
						title: this.resource.title,
						client: this.client,
						url: `/content/${this.resource.ref.id}`,
					});
					window.close();
					return true;
				}
			}
		},
		addResource() {
			if (!this.addResourceAndClose()) {
				this.copyModalActive = true;
			}
		},
	},
};
</script>
