import { extractReferencedTaskFileIds } from "./task-description-files";
import { describe, expect, it } from "vitest";

describe("extractReferencedTaskFileIds", () => {
	it("extracts unique file ids from inline media", () => {
		const description = `
			<p>Task</p>
			<figure><img src="/api/v3/file/download/image-id/image.png"></figure>
			<audio src="/api/v3/file/download/audio-id/audio.mp3" controls></audio>
			<video src="/api/v3/file/download/image-id/image.png" controls></video>
		`;

		expect(extractReferencedTaskFileIds(description)).toEqual(["image-id", "audio-id"]);
	});

	it("ignores external and non-media sources", () => {
		const description = '<p><a href="/api/v3/file/download/link-id/file.pdf">File</a></p>';

		expect(extractReferencedTaskFileIds(description)).toEqual([]);
	});
});
