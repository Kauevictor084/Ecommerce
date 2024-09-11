class ComponenteNovo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const text = this.getAttribute('text') || 'Default Text';
        const bgColor = this.getAttribute('bg-color') || '#ffffff';
        const id = this.getAttribute('id') || '#';
        this.render(text, bgColor, id);
    }

    render(text, bgColor, id) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: ${bgColor};
                    padding: 16px;
                    border-radius: 8px;
                }
                .content {
                    font-size: 1.2em;
                }
            </style>
            <a href="${id}">
                <div class="content">${text}</div>
            </a>
        `;
    }
}

customElements.define('componente-novo', ComponenteNovo);
