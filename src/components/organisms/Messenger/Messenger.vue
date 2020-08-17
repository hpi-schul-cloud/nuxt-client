<template>
	<div></div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		matrixAssetDomain() {
			// TODO: fill with ENV/Configuration value
			return "https://embed.stomt.com";
		},
		userLanguage() {
			// TODO: fill with actual current user language
			return "de";
		},
	},
	mounted() {
		// TODO: only enable messenger if feature flag FEATURE_MATRIX_MESSENGER_ENABLED is set
		this.initializeMessenger();
	},
	methods: {
		findMatrixUserId(session = null) {
			if (session) {
				return session.userId;
			}

			return window.localStorage.getItem("mx_user_id");
		},

		extractRoomTypeAndIdFromPath(path) {
			const matches = RegExp("/(course|team)s/([0-9a-f]{24})").exec(path);
			if (matches && matches.length >= 3) {
				return {
					roomType: matches[1],
					roomId: matches[2],
				};
			}

			return {
				roomType: null,
				roomId: null,
			};
		},

		extractServernameFromMatrixUserId(matrixUserId) {
			if (!matrixUserId) {
				return null;
			}
			return matrixUserId.substr(matrixUserId.indexOf(":") + 1);
		},

		composeMatrixRoomId(roomType, roomId, servername) {
			if (!roomId || !roomType || !servername) {
				return null;
			}

			// build matrix room id
			return `#${roomType}_${roomId}:${servername}`;
		},

		setupMessenger(session) {
			const matrixUserId = this.findMatrixUserId(session);
			const { roomType, roomId } = this.extractRoomTypeAndIdFromPath(
				window.location.pathname
			);
			const servername = this.extractServernameFromMatrixUserId(matrixUserId);
			const matrixRoomId = this.composeMatrixRoomId(
				roomType,
				roomId,
				servername
			);

			// base options
			const options = {
				riotConfig: "/riot_config.json",
				indexeddbWorkerScript: "/indexeddb-worker.js",
				assetDomain: `${this.matrixAssetDomain}/`,
				language: this.userLanguage || "de",
				forceToggled: true,
			};

			// force the selection of a specific room
			if (matrixRoomId) {
				options.roomId = matrixRoomId;
			}

			// apply session
			if (session) {
				options.homeserverUrl = session.homeserverUrl;
				options.userId = session.userId;
				options.accessToken = session.accessToken;
				options.deviceId = session.deviceId;
			}

			window.Matrix = window.Matrix || [];
			window.Matrix.push(["setup", options]);
		},

		hasActiveSessionInLocalStorage() {
			return (
				window.localStorage &&
				window.localStorage.getItem("mx_hs_url") &&
				window.localStorage.getItem("mx_access_token") &&
				window.localStorage.getItem("mx_user_id")
			);
		},

		requestSession() {
			return this.$axios.$post("/messengerToken", {});
		},

		async initializeMessenger() {
			// Find Matrix Session
			let session;
			if (this.hasActiveSessionInLocalStorage()) {
				// session available, the messenger will access it itself
				session = null;
			} else {
				// get new session from Server
				session = await this.requestSession();
			}

			this.setupMessenger(session);
		},

		headScripts() {
			// TODO: only enable messenger if feature flag FEATURE_MATRIX_MESSENGER_ENABLED is set
			return [
				{
					hid: "messenger",
					src: `${this.matrixAssetDomain}/embed.js`,
					defer: true,
				},
			];
		},
	},
	head() {
		return {
			script: this.headScripts(),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
