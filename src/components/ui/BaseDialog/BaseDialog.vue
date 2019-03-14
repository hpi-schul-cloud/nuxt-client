<template>
	<BaseModal :active.sync="isActive">
		<div class="modal-header">
			<h3>{{ title }}</h3>
		</div>

		<div class="modal-body">
			<p v-html="message" />
		</div>

		<div class="modal-footer">
			<BaseButton ref="cancelButton" @click="close()">
				{{ cancelText }}
			</BaseButton>
			<BaseButton
				ref="confirmButton"
				class="is-primary"
				:class="type"
				@click="confirm"
			>
				{{ confirmText }}
			</BaseButton>
		</div>
	</BaseModal>
</template>

<script>
import BaseModal from "../BaseModal";
export default {
	components: {
		BaseModal,
	},
	props: {
		title: String,
		message: String,
		type: {
			type: String,
			default: "primary",
		},
		size: String,
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
			validationMessage: "",
		};
	},
	computed: {
		/**
		 * Icon name (MDI) based on the type.
		 */
		iconByType() {
			switch (this.type) {
				case "is-info":
					return "information";
				case "is-success":
					return "check-circle";
				case "is-warning":
					return "alert";
				case "is-danger":
					return "alert-circle";
				default:
					return null;
			}
		},
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
			setTimeout(() => {
				this.$destroy();
				if (typeof this.$el.remove !== "undefined") {
					this.$el.remove();
				} else if (typeof el.parentNode !== "undefined") {
					this.$el.parentNode.removeChild(el);
				}
			}, 150);
		},
	},
};
</script>
