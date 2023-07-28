<template>
	<div>
		<!-- <iframe
      :src="iframeSrc"
			:width="iframeWidth"
			:height="iframeHeight"
      frameborder="0"
		></iframe> -->
		<button class="tldraw-button" @click="openLink" target="_blank">
			<tldrawIcon class="svg-icon" />
			<span class="button-text">{{ buttonText }}</span>
		</button>
	</div>
</template>
<script>
import tldrawIcon from "../../../icons/custom/tldraw-icon.vue";
export default {
	props: {
		iframeSrc: {
			type: String,
			required: true,
		},
		iframeWidth: {
			type: String,
			default: "100%",
		},
		iframeHeight: {
			type: String,
			default: "270px",
		},
		buttonText: {
			type: String,
			default: "Whiteboard",
		},
	},
	components: {
		tldrawIcon,
	},
	methods: {
		openLink() {
			const savedRoomID = localStorage.getItem("roomID");

			if (savedRoomID) {
				const urlWithRoom = `${this.iframeSrc}?roomName=${savedRoomID}`;
				window.open(urlWithRoom, "_blank");
			} else {
				const newRoomID = this.generateRandomRoomID();

				localStorage.setItem("roomID", newRoomID);

				const urlWithRoom = `${this.iframeSrc}?roomName=${newRoomID}`;
				window.open(urlWithRoom, "_blank");
			}
		},
		generateRandomRoomID() {
			const randomNumber = Math.random();

			const randomString = randomNumber.toString().substring(2);

			const roomID = "room_" + randomString;

			return roomID;
		},
	},
};
</script>
<style>
.tldraw-button {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 10px 20px;
	color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	cursor: pointer;
	height: 70px;
	width: 330px;
	margin: 8px;
}

.tldraw-button:hover {
	background-color: #54616e1a;
}
.button-text {
	color: #1b1b1b;
	margin-left: 10px;
}
.svg-icon {
	width: 20px;
	height: 20px;
}
</style>
