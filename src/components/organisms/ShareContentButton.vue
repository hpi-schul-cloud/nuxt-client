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
			@click.prevent="openModal"
		>
			<base-icon :class="btnIconClass" source="material" :icon="btnIcon" />
			{{ btnLabel }}
		</base-button>
		<share-content-modal
			:show-share-modal.sync="shareModalActive"
			:resource="resource"
		/>
	</div>
</template>

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
		resource: { type: Object, default: () => {} },
	},
	data() {
		return {
			shareModalActive: false,
		};
	},
	computed: {
		getUrl() {
			console.log("getUrl metaData");
			console.log(
				getMetadataAttribute(this.resource.properties, "cclom:location")
			);
			return getMetadataAttribute(this.resource.properties, "cclom:location");
		},
	},
	methods: {
		openModal() {
			this.shareModalActive = true;
		},
	},
};
</script>
