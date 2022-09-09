<template>
	<div>
		<text-editor
			:value="staticContent"
			placeholder-text="Extending tip-tap POC"
			:advanced-features="true"
		/>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import TextEditor from "./editor/TextEditor.vue";

export default defineComponent({
	name: "TiptapProofOfConcept",
	components: {
		TextEditor,
	},
	data() {
		return {
			staticContent: `<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text</iframe>
<h2>h1</h2>
<h3>h2</h3>
<p>h3</p>
<p>some
	<strong>bold</strong>
	<i>italic</i>
	<u>underline</u>
	<s>strike-through</s>
	<sub>sub</sub> and
	<sup>sup</sup>
</p>
<p>checking span
	<span style="color:#F44336">color</span> and
	<span style="background-color:#9C27B0">background color</span>
</p>
<blockquote>
	<p>and some blockquote</p>
</blockquote>
<p>come code comes here:
	<code>while (editor) { alert('does it render?') }</code>
</p>
<p>Line:<hr />
</p>
<p>
	<ol>
		<li>ordered list</li>
	</ol>
	<ul>
		<li>unordered list</li>
	</ul>
</p>
<p>symbols $₹₻≡⇒</p>
<p>Some <a href="http://www.google.com">Link</a></p>
<p>
	<figure class="table">
<table>
	<tbody>
	<tr>
			<th>Col 1</th>
			<th>Col 2</th>
			<th>Col 3</th>
		</tr>
		<tr>
			<td>table td 1 1</td>
			<td>table td 1 2</td>
			<td rowspan="2">merged table rows</td>
		</tr>
		<tr>
			<td>table td 2 1</td>
			<td>table td 2 2</td>
		</tr>
	</tbody>
</table>
	</figure>
</p>
<p>Math formula: <span class="math-tex">\\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 3a}\\)</span></p>
<p>IMAGE:
	<figure class="image"><img src="https://icatcare.org/app/uploads/2018/10/What-is-a-cat.png" alt="alt image attr"></figure>
</p>
<p>VIDEO:</p>
	<video src="somevideo.mp4" controls="true" controlslist="nodownload"></video>
<p>AUDIO:</p>
<audio src="http://192.168.1.136/musik.mp3" controls="true" controlslist="nodownload"></audio>`,
		};
	},
});
</script>
