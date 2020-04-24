const elementIsInTop = {
	data() {
		return {
			elIsTop: false,
			scrollY: 0,
			elementOne: {
				el: "",
				yLocation: 0,
			},
			elementTwo: {
				el: "",
				yLocation: 0,
			},
		};
	},
	created() {
		window.addEventListener("scroll", () => {
			this.scrollY = window.scrollY;
		});
	},
	beforeDestroy() {
		window.removeEventListener("scroll", () => {
			this.scrollY = window.scrollY;
		});
	},
	watch: {
		scrollY() {
			const elOne = this.elementOne.el;
			const elTwo = this.elementTwo.el;

			this.elementOne.yLocation = this.$refs[elOne].getBoundingClientRect().top;
			this.elementTwo.yLocation = this.$refs[elTwo].getBoundingClientRect().top;

			this.isTop();
		},
	},
	methods: {
		isTop() {
			this.elIsTop = this.elementOne.yLocation <= this.elementTwo.yLocation;
		},
		assignElements(el1, el2) {
			this.elementOne.el = el1;
			this.elementTwo.el = el2;
		},
	},
};

export default elementIsInTop;
