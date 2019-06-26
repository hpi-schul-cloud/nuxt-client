<template>
	<div class="popup" @click="popup">
		<base-icon-button :source="source" :icon="icon" :fill="fill" @click="popup"/>
		<span class="popuptext" :class="{visible}">AHAAHAA<br>HAAH<br>AAHAA<br>HAAH<br>AAH<br>AAHAAHA</span>
	</div>
</template>

<script>
export default {
	props: {
		source: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		fill: {
			type: String,
			default: "currentColor",
		},
	},
	data () {
		return {
			visible: false
		}
	},
	methods: {
		popup () {
			// console.log("JOJOJOJOJO");
			this.visible = !this.visible;
			// irgendwie visible setzen
		}
	}
};
</script>

<style lang="scss" scoped>
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
