import { storiesOf } from "@storybook/vue";
import TaskItem from "@components/molecules/TaskItem";
import DeleteModal from "@components/molecules/DeleteModal";
import ExampleImage from "@assets/img/courses/task-draft.svg";
import { boolean, text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/TaskItem", module)
	.add("with knobs and delete modal", () => ({
		components: { TaskItem, DeleteModal },
		data: () => ({
			id: "11111",
			url: text("url", "#"),
			showDeleteModal: false,
			imgSrc: ExampleImage,
			title: text("title", "Das Nervensystem"),
			subtitle: text("subtitle", "Editor-Dokument"),
			status: text("status", "Entwurf"),
			actionNeeded: boolean("actionNeeded", false),
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
				{ text: "Delete", event: "delete" },
			],
			contextOpen: false,
		}),
		template: `
			<div>
			<TaskItem
				@delete="showDeleteModal = true" :id="id" :url="url"
				:imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded"
				:actions="actions">
			</TaskItem>
			<delete-modal
				:show-delete-modal.sync="showDeleteModal"
				:item-to-delete="''"
			></delete-modal>
			</div>`,
	}))
	.add("with image (triple)", () => ({
		components: { TaskItem },
		data: () => ({
			url: "#",
			imgSrc: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actionNeeded: false,
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
		<TaskItem id="1" :url="url" :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
		</TaskItem>
        <TaskItem id="2" :url="url" :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </TaskItem>
        <TaskItem id="3" :url="url" :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </TaskItem>
	</div>`,
	}))
	.add("with pulsating dot", () => ({
		components: { TaskItem },
		data: () => ({
			url: "#",
			imgSrc: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actionNeeded: true,
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
    <TaskItem :imgSrc="imgSrc" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
    </TaskItem>
    </div>`,
	}));
