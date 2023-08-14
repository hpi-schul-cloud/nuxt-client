<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a :href="`http://localhost:3046${newWindowUrl}`" target="_blank">
			NEW WINDOW
		</a>
		<iframe
			:src="`http://localhost:3046${newWindowUrl}`"
			width="600px"
			height="600px"
		></iframe>
	</div>
</template>

<script>
export default {
	props: {
		buttonText: {
			type: String,
			default: "Tldraw",
		},
	},

	computed: {
		newWindowUrl() {
			const savedRoomID = localStorage.getItem("roomID");

			if (savedRoomID) {
				return `/tldraw?roomName=${savedRoomID}`;
			} else {
				const newRoomID = this.generateRandomRoomID();
				localStorage.setItem("roomID", newRoomID);
				return `/tldraw?roomName=${newRoomID}`;
			}
		},
	},
	methods: {
		generateRandomRoomID() {
			const randomNumber = Math.random();
			const randomString = randomNumber.toString().substring(2);
			const roomID = "room_" + randomString;
			return roomID;
		},
	},
};
</script>

<style lang="scss" scoped>
/* Ваш стиль тут */
</style>
