export const upperCaseFirstChar = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const toKebabCase = (text: string) => text.replace(/(\w)(?=[A-Z])/g, (match) => match[0] + "-").toLowerCase();

/**
 * Decodes HTML entities in a text string by converting them to their corresponding characters.
 *
 * This function handles HTML entities like:
 * - Named entities: &lt; (&lt;), &gt; (&gt;), &amp; (&amp;), &quot; (&quot;), &#39; (&#39;)
 * - Numeric entities: &#60; (decimal), &#x3C; (hexadecimal)
 * - Any other HTML entities that browsers can decode
 *
 * @param text - The input string that may contain HTML entities to be decoded
 * @returns The decoded string with HTML entities converted to their actual characters
 *
 * @example
 * decodeHtmlEntities("&lt;script&gt;alert(&#39;Hello&#39;);&lt;/script&gt;")
 * // Returns: "<script>alert('Hello');</script>"
 *
 * decodeHtmlEntities("AT&amp;T &amp; Verizon")
 * // Returns: "AT&T & Verizon"
 *
 * How it works:
 * 1. Creates a temporary textarea DOM element
 * 2. Sets the innerHTML property to the input text, which triggers the browser's
 *    built-in HTML entity decoding mechanism
 * 3. Retrieves the decoded text from the textarea's value property
 * 4. Returns the decoded result
 *
 * Note: This approach leverages the browser's native HTML parsing capabilities
 * to safely decode entities without manual string replacement logic.
 *
 * SAFE USAGE:
 * - Use for display text where HTML entities need to be human-readable
 * - Combine with proper HTML sanitization when inserting into DOM
 * - Validate input source and context before decoding
 */
export const decodeHtmlEntities = (text: string): string => {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = text;
	const decodedText = textarea.value;

	return decodedText;
};
