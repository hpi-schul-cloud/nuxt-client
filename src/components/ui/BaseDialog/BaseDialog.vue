<template>
	<div ref="dialog">
		<base-modal :active.sync="isActive">
			<div class="modal-header">
				<h3>{{ title }}</h3>
			</div>

			<div class="modal-body">
				<div>{{ message }}</div>
			</div>

			<div class="modal-footer">
				<base-button ref="cancelButton" @click="close">
					{{ cancelText }}
				</base-button>
				<base-button
					id="confirm-button"
					ref="confirmButton"
					class="is-primary"
					:class="type"
					@click="confirm"
				>
					{{ confirmText }}
				</base-button>
			</div>
		</base-modal>
	</div>
</template>

<script>
import BaseModal from "../BaseModal";
export default {
	components: {
		BaseModal,
	},
	props: {
		title: {
			type: String,
			default: "",
		},
		message: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "primary",
		},
		size: {
			type: String,
			default: "",
		},
		confirmText: {
			type: String,
			default: () => {
				return "Bestätigen";
			},
		},
		cancelText: {
			type: String,
			default: () => {
				return "Abbrechen";
			},
		},
		onConfirm: {
			type: Function,
			default: () => {},
		},
		focusOn: {
			type: String,
			default: "confirm",
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
	beforeMount() {
		// Insert the Dialog component in body tag
		this.$nextTick(() => {
			document.body.appendChild(this.$el);
		});
	},
	mounted() {
		this.isActive = true;
	},
	methods: {
		/**
		 * If it's a prompt Dialog, validate the input.
		 * Call the onConfirm prop (function) and close the Dialog.
		 */
		confirm() {
			this.onConfirm(this.prompt);
			this.close();
		},
		/**
		 * Close the Dialog.
		 */
		close() {
			this.isActive = false;
			// Timeout for the animation complete before destroying
			this.$destroy();
			if (typeof this.$el.remove !== "undefined") {
				this.$el.remove();
			} else if (typeof el.parentNode !== "undefined") {
				this.$el.parentNode.removeChild(el);
			}
		},
	},
};
</script>
