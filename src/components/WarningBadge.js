import styles from "./WarningBadge.css" with { type: "css" };

const DEFAULT_TEXT = "Advertencia";

class WarningBadge extends HTMLElement {
  #text = DEFAULT_TEXT;

  static get observedAttributes() {
    return ["pulsing", "text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  attributeChangedCallback(attr, _old, now) {
    if (attr === "text") this.#text = now ?? DEFAULT_TEXT;
    this.render();
  }

connectedCallback() {
  const attr = this.getAttribute("text");
  const slot = this.textContent.trim();
  this.#text = attr ?? slot ?? DEFAULT_TEXT;
  this.render();
}

  activate()   { this.setAttribute("pulsing", ""); }
  deactivate() { this.removeAttribute("pulsing"); }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <span class="badge" part="badge">${this.#text}</span>
    `);
  }
}

customElements.define("warning-badge", WarningBadge);