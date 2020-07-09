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
			@close="showNotificationModal = true"
		/>
		<notification-modal
			:show-notification-modal.sync="showNotificationModal"
			:is-success="isSuccess"
			:backgroundcolor="
				isSuccess ? 'var(--color-success)' : 'var(--color-danger)'
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

export default {
	name: "AddContentButton",
	components: {
		AddContentModal,
		NotificationModal,
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
		isSuccess() {
			const response = this.$store.state.content.addToLessonResult;
			return response && response.status === 201;
		},
		getUrl() {
			return `/content/${this.resource.ref.id}`;
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
				this.$store.dispatch("courses/find");
			}
		},
	},
};
</script>
