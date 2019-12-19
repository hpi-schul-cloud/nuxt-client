const infiniteScrolling = {
	data() {
		return {
			bottom: false,
			scrollY: 0,
		};
	},
	created() {
		window.scrollTo({ top: 0, behavior: "smooth" });
		window.addEventListener("scroll", () => {
			this.bottom = this.$_bottomVisible();
			this.scrollY = window.scrollY;
		});
	},
	beforeDestroy() {
		window.removeEventListener("scroll", () => {
			this.bottom = this.$_bottomVisible();
			this.scrollY = window.scrollY;
		});
	},
	methods: {
		$_bottomVisible() {
			const { scrollY } = window;
			const visible = document.documentElement.clientHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const bottomOfPage = visible + scrollY >= pageHeight - 2;
			return bottomOfPage || pageHeight < visible;
		},
		$_backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
};

export default infiniteScrolling;
