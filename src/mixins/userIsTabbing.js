export default {
	created: function() {
		window.addEventListener("keydown", this.$_handleFirstTab);
		this.$userIsTabbing = false;
	},
	methods: {
		$_handleFirstTab: function(e) {
			if (e.key === "Tab" || e.keyCode.toString() === "9") {
				window.removeEventListener("keydown", this.$_handleFirstTab);
				window.addEventListener("click", this.$_handleFirstClick);
				this.$userIsTabbing = true;
			}
		},
		$_handleFirstClick: function() {
			window.removeEventListener("click", this.$_handleFirstClick);
			window.addEventListener("keydown", this.$_handleFirstTab);
			this.$userIsTabbing = false;
		},
	},
};
