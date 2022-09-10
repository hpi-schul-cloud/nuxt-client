<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<ckeditor
					v-model="htmlInput"
					:editor="editor"
					:config="editorConfig"
					@input="onEditorInput"
				></ckeditor>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { defineComponent } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor from "ckeditor5-custom-build";
import "ckeditor5-custom-build/build/translations/en";
import "ckeditor5-custom-build/build/translations/es";

export default defineComponent({
	name: "CK5ProofOfConcept",
	components: {
		ckeditor: CKEditor.component,
	},
	data() {
		return {
			editor: Editor,
			markupInput: `## h1`,
			htmlInput: `<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text</iframe>
<h2>h1</h2>
<h3>h2</h3>
<p>h3</p>
<footer>I am a footer and will just be text</footer>
<p>some
	<strong>bold</strong>
	<i>italic (will be not italic)</i>
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
<p>Math from Latex: $$(x = {-b \\pm \\sqrt{b^2-4ac} \\over 3a}$$</p>
<p>Math formula: <math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>9</mn></msqrt></math></p>
<p>IMAGE:
	<figure onclick="javascript:alert('hello from js');" class="image"><img src="http://127.0.0.1:4000/cat.png" alt="cute kitty"></figure>
</p>
<p>VIDEO:</p>
	<video src="http://127.0.0.1:4000/video.mp4" controls="true" controlslist="nodownload"></video>
<p>AUDIO:</p>
<audio src="http://127.0.0.1:4000/audio.mp3" controls="true" controlslist="nodownload"></audio>`,
			editorConfig: {
				language: "de",
				//language: "en",
				//language: "es",

				//plugins: ["Paragraph", "Bold"],
				//toolbar: ["bold"],
			},
		};
	},
	methods: {
		onEditorInput() {
			console.log(this.htmlInput);
		},
	},
});
</script>
