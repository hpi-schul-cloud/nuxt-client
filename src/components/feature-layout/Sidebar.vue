<template>
	<v-navigation-drawer
		:rail="isTablet"
		:permanent="!xs"
		:temporary="xs"
		:location="xs ? 'top' : 'left'"
		rail-width="var(--sidebar-width-tablet)"
	>
		<SidebarLogo />
		<v-list :items="items" />
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import SidebarLogo from "./SidebarLogo";

const { mdAndDown, xs } = useDisplay();

const isTablet = computed(() => {
	return mdAndDown.value && !xs.value;
});

const items = [
	{
		title: "Foo",
		value: "foo",
	},
	{
		title: "Bar",
		value: "bar",
	},
	{
		title: "Fizz",
		value: "fizz",
	},
	{
		title: "Buzz",
		value: "buzz",
	},
];
</script>

<style lang=""></style>
