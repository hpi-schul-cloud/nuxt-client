<template>
	<div class="container">
		<div>
			<h2>{{ persistentValue }}</h2>
			<h2>{{ reactiveValue }}</h2>
			<br />
			<div><input v-model="reactiveValue" type="text" /></div>
			<br />
			<div>
				<button @click="increase">
					Counter in the component {{ counter }}
				</button>
			</div>
			<br />
			<div>
				<button @click="increaseCounter">
					Counter in the store {{ storeCounter }}
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "../store";
export default {
	setup() {
		const store = useStore();
		const persistentValue: string = "Composition api page";
		const reactiveValue: object = ref("Reactive value");
		const counter = ref(0);
		const increase = (): void => {
			counter.value++;
		};

		// const storeCounter = ref(store.getCounter);
		const increaseCounter = (): void => {
			store.setCounter();
		};

		return {
			persistentValue,
			reactiveValue,
			increase,
			counter,
			store,
			increaseCounter,
			storeCounter: store.getCounter,
		};
	},
};
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	max-width: 720px;
}
</style>
