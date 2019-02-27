<template>
	<transition name="modal">
		<div v-if="showModal" class="modal-mask">
			<div
				class="modal-wrapper"
				@mousedown.self="handleBackgroundClick"
				@touchstart.self="handleBackgroundClick"
			>
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header">
							default header
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body">
							default body
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							default footer
							<button class="modal-default-button" @click="$emit('close')">
								OK
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleBackgroundClick() {
			this.toggle();
		},
		toggle() {
			this.$emit("close");
		},
	},
};
</script>

<style>
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9998;
	display: table;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px;
	padding: 20px 30px;
	margin: 0 auto;
	font-family: Helvetica, Arial, sans-serif;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
