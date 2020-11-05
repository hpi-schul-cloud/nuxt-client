<template>
	<div></div>
</template>

<script>
export function extractRoomTypeAndIdFromPath(path) {
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
}

export default {
	data() {
		return {};
	},
	computed: {
		matrixFeatureFlag() {
			return this.$store.state.messenger.matrixFeatureFlag;
		},
		matrixAssetDomain() {
			return this.$store.state.messenger.matrixAssetDomain;
		},
		userLanguage() {
			return this.$i18n.locale;
		},
		isMessengerActivatedForSchool() {
			if (!this.matrixFeatureFlag) {
				return false;
			}
			const { school } = this.$store.state.auth;
			return school && (school.features || []).includes("messenger");
		},
		session() {
			return this.$store.state.messenger.session;
		},
		sessionFromLocalStorage() {
			return this.$store.state.messenger.sessionFromLocalStorage;
		},
		serverName() {
			return this.$store.state.messenger.serverName;
		},
	},
	watch: {
		// since the school is loaded by the auth service, this probably never changes
		isMessengerActivatedForSchool(newIsActivated) {
			if (newIsActivated) {
				this.loadMessengerEmbed();
				this.setupMessenger();
			}
		},
		session(newSession) {
			if (this.isMessengerActivatedForSchool && newSession) {
				this.setupMessenger();
			}
		},
	},
	mounted() {
		if (this.isMessengerActivatedForSchool) {
			this.loadMessengerEmbed();
			this.setupMessenger();
		}
	},
	methods: {
		loadMessengerEmbed() {
			// load javascript
			const riotScript = document.createElement("script");
			riotScript.src = `${this.matrixAssetDomain}/embed.js`;
			riotScript.type = "text/javascript";
			document.head.appendChild(riotScript);
		},
		setupMessenger() {
			if (!this.sessionFromLocalStorage && !this.session) {
				// get new session from Server
				this.$store.dispatch("messenger/loadMessengerToken");
				return;
			}

			const { roomType, roomId } = extractRoomTypeAndIdFromPath(
				window.location.pathname
			);
			let matrixRoomId = null;
			if (roomId && roomType && this.serverName) {
				matrixRoomId = `#${roomType}_${roomId}:${this.serverName}`;
			}

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
			if (this.session) {
				options.homeserverUrl = this.session.homeserverUrl;
				options.userId = this.session.userId;
				options.accessToken = this.session.accessToken;
				options.deviceId = this.session.deviceId;
			}

			window.Matrix = window.Matrix || [];
			window.Matrix.push(["setup", options]);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
