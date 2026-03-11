import "./style.css";
import { LitElement, css, html } from "lit";

class HelloLit extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 28rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
    }
  `;

  static properties = {
    name: { type: String },
  };

  declare name: string;

  constructor() {
    super();
    this.name = "TypeScript + Lit";
  }

  render() {
    return html`<h1>${this.name}</h1><p>Lit ships its own types.</p>`;
  }
}

customElements.define("hello-lit", HelloLit);
document.querySelector<HTMLDivElement>("#app")!.innerHTML = "<hello-lit></hello-lit>";
