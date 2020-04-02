# How to use: EventBus <Badge text="WIP" type="warn"/>

In this document you will find how to use the EventBus. But first make sure that the EventBus is the right or better solution for your problem. In most cases, using vuex is a better approach, especially when it comes to state management. The most common use case for the EventBus is to trigger a function in another component.

[[toc]]

## How to emit events

All components have access to the global EventBus. To interact with it you can use: `$eventBus`.

```js
this.$eventBus.$emit("eventName", payload);
```

## How to emit events from vuex

At this moment in time, it is not possible to access the eventBus from a store module directly. Therefore it must be passed into it via e.g a store dispatch:

```js
created() {
	this.$store.dispatch("storeModule/actionName", this.$eventBus);
},
```

## How to subscribe to events

You can use the `onEventBus` option on a component to easily add event listeners (Note: Event listeners will be automatically unsubscribe on beforeDestroy hook)

```js
methods: {
	doSomethingOnEvent(payload) {
		...
	},
},
onEventBus: {
	"eventName": function (payload) {
		this.doSomethingOnEvent(payload);
	},
},
```

The above syntax automatically translates into as follows: <br /> (In most cases please do <u>not</u> use the following syntax)

```js
created() {
	this.$eventBus.$on('eventName', this.doSomethingOnEvent);
},
beforeDestroy() {
	this.$eventBus.$off('eventName');
},
methods: {
	doSomethingOnEvent(payload) {
		...
	},
},
```

In case you need more flexibility and assign event listeners on demand, you can manually add your event listeners using:

```js
this.$eventBus.$on("eventName", this.doSomethingOnEvent);
```

In most cases you probably want to call the listener in the created hook. Additionally, don't forget to unsubscribe unused listeners.

## How to unsubscribe from events

Don't forget to unsubscribe unused listeners ;)

```js
this.$eventBus.$off("eventName");
```
