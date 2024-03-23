<template>
	<v-navigation-drawer
		:rail="isTablet"
		:permanent="!xs"
		:temporary="xs"
		:location="xs ? 'top' : 'left'"
		rail-width="var(--sidebar-width-tablet)"
		:width="isDesktop ? 'var(--sidebar-width)' : ''"
	>
		<SidebarLogo :isTablet="isTablet" :isDesktop="isDesktop" />
		<v-list>
			<SidebarItem
				v-for="item in getSidebarItems()"
				:isTablet="isTablet"
				:key="item.title"
				:item="item"
			/>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import getSidebarItems from "@/utils/sidebar-base-items";

const { mdAndDown, xs, lgAndUp } = useDisplay();

const isTablet = computed(() => {
	return mdAndDown.value && !xs.value;
});

const isDesktop = computed(() => {
	return lgAndUp.value;
});

console.log(getSidebarItems());

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
