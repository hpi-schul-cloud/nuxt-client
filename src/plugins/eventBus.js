import Vue from "vue";
const vue = new Vue();

const eventBus = {};
let eventListeners = {};

// adds '$bus' to all components
eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
};
Vue.use(eventBus);

// inspired by https://github.com/fffixed/vue-bus
// add new component option 'eventBus' for easy event register
Vue.mixin({
	created: function () {
		//register events
		const events = this.$options.eventBus;
		eventListeners = {};
		for (const event in events) {
			eventListeners[event] = events[event].bind(this); //remember register listener
			vue.$bus.$on(event, eventListeners[event]);
		}
	},
	beforeDestroy: function () {
		//unregister events
		for (const event in eventListeners) {
			Vue.$bus.$off(event, eventListeners[event]);
		}
		eventListeners = null;
	},
});
