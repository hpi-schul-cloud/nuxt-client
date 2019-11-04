const userIsTabbingMixin = {
	created: function() {
		window.addEventListener("keydown", this.handleFirstTab);
		this.$userIsTabbing = false;
	},
	methods: {
		handleFirstTab: function(e) {
			if (e.key === "Tab" || e.keyCode.toString() === "9") {
				window.removeEventListener("keydown", this.handleFirstTab);
				window.addEventListener("click", this.handleFirstClick);
				this.$userIsTabbing = true;
			}
		},
		handleFirstClick: function() {
			window.removeEventListener("click", this.handleFirstClick);
			window.addEventListener("keydown", this.handleFirstTab);
			this.$userIsTabbing = false;
		},
	},
};

export default userIsTabbingMixin;
