<template>
	<div v-click-outside="removePopup" class="popup" @click="popup">
		<div class="icon">{{ name }}</div>
		<span class="popuptext" :class="{visible}">{{popuptext}}</span>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		fill: {
			type: String,
			default: "currentColor",
		},
		popuptext: {
			type: String,
			default: "Lorem ipsum"
		}
	},
	data () {
		return {
			visible: false
		}
	},
	methods: {
		popup () {
			this.visible = !this.visible;
		},
		removePopup() {
			this.visible = false;
		}

	}
};
</script>

<style lang="scss" scoped>
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2em;
	height: 2em;
	padding: 5px;
	background-color: var(--color-black);
	color: var(--color-white);
	border: none;
	border-radius: 50%;
	-webkit-user-select: None;

	&:hover {
		opacity: 0.9;
	}
}


.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	.popuptext {
		position: absolute;
		top: 105%;
		left: 0%;
		z-index: 1;
		visibility: hidden;
		border: 1px solid black;



		&.visible {
  			visibility: visible;
		}
	}

	.popuptext::before {
		position: absolute;
		top: -10px;
		left: 1em;
		margin-left: -5px;
		content: "";
		border-color:  transparent transparent #555 transparent;
		border-style: solid;
		border-width: 5px;
	}
}

</style>
