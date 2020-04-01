let uid = 0;

export default {
	beforeCreate() {
		this.$uid = ++uid;
	},
};
