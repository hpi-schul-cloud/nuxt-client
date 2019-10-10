import { storiesOf } from "@storybook/vue";
import { text, select, color, boolean } from "@storybook/addon-knobs";

import notes from "@docs/storybook/misc.md";
import PulsatingDot from "@components/PulsatingDot";
import ProfilePicture from "@components/ProfilePicture";
import ExampleImage from "@assets/img/avatarExample.svg";
import MenuLink from "@components/MenuLink";
import DropdownMenu from "@components/DropdownMenu";
import BaseButton from "@components/ui/BaseButton";
import Searchbar from "@components/Searchbar";
import PopupIcon from "@components/PopupIcon";
import PopupIconInitials from "@components/PopupIconInitials";
import NewsCard from "@components/NewsCard";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: `<PulsatingDot />`,
	}))
	.add("Profile Pic", () => ({
		components: { ProfilePicture },
		data: () => ({ imgsrc: ExampleImage }),
		template: `<div><ProfilePicture :image="imgsrc" size="small"/><ProfilePicture :image="imgsrc" size="medium"/><ProfilePicture :image="imgsrc" size="large"/></div>`,
	}))
	.add("DropdownMenu", () => ({
		components: { DropdownMenu, MenuLink },
		template: `
			<DropdownMenu>
				<template v-slot:header>Dropdown</template>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
				<MenuLink to="/">Link 3</MenuLink>
			</DropdownMenu>
		`,
	}))
	.add("Searchbar", () => ({
		components: { Searchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Suche nach..."),
		}),
		template: `<searchbar v-model.lazy="searchQuery" :placeholder="placeholder" />`,
	}))
	.add("Toast", () => ({
		components: { BaseButton },
		data: () => ({
			type: select(
				"type",
				{ show: "show", info: "info", success: "success", error: "error" },
				"show"
			),
			message: text("message", "Toast 🧐"),
		}),
		template: `
			<div>
				<BaseButton @click="$toast[type](message)">Knobs Toast</BaseButton>
				<br>
				<BaseButton @click="$toast.show('Show 🧐')">Default Toast</BaseButton>
				<BaseButton @click="$toast.info('Info 🤓')">Info Toast</BaseButton>
				<BaseButton @click="$toast.success('Success 😊')" class="is-success">Success Toast</BaseButton>
				<BaseButton @click="$toast.error('Error 😥')" class="is-error">Error Toast</BaseButton>
			</div>
		`,
	}))

	.add("Newscard", () => ({
		components: { NewsCard },
		data: () => ({
			title: text("title", "Title"),
			category: text("Category", "Schultheater"),
			content: text(
				"Content",
				`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
			),
			createdAt: text("CreatedAt", "2019-07-17-14:30"),
			createdBy: text("CreatedBy", "Mona Weizenberg"),
			picture: text("Picture", "https://source.unsplash.com/daily"),
			eventDate: text("Event date", "2019-02-22-19:00"),
			color1: color("color1", "#412363"),
			color2: color("color2", "#c63e80"),
			isLandscape: boolean("isLandscape"),
		}),
		template: `
		<div style="max-width: 500px; margin: 0 auto">
			<news-card
				:category="category"
				:title="title"
				:createdAt="createdAt"
				:createdBy="createdBy"
				:picture="picture"
				:eventDate="eventDate"
				:isLandscape="isLandscape"
				:color="[color1, color2]"
			>
				{{content}}
			</news-card>
		</div>
		`,
	}))
	.add("Popup Icon", () => ({
		components: { PopupIcon },
		template: `<div>
			<PopupIcon source="fa" icon="solid/address-book"></PopupIcon>
		</div>`,
	}))
	.add("Popup Icon with Initials", () => ({
		components: { PopupIconInitials, MenuLink },
		template: `<div style="text-align: right">
			<PopupIconInitials firstname="Fritz" lastname="Schmidt">
				<div>Fritz Schmidt </div>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
			</PopupIconInitials>
		</div>`,
	}));
