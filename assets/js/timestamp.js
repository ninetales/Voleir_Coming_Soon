const templateTimestamp = document.createElement('template');
templateTimestamp.innerHTML = `

<style>
:host {
    display: block;
    text-align: center;
    font-size: .8rem;
    padding: .3rem 0;
    font-family: helvetica;
    color: var(--timestamp-color);
}
</style>

<time></time>

`;

class Timestamp extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(templateTimestamp.content.cloneNode(true));
    }

    connectedCallback() {

        let time = this.shadowRoot.querySelector('time');
        function timer(){
            let timestamp = new Date();

            time.innerHTML = timestamp.toLocaleString("sv-SE", {
                timezon: "Europe/Stockholm",
                timeZoneName: "short",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });

        }
        setInterval(timer,1000);

        let city = this.shadowRoot.querySelector('#time');

    }
    

}
window.customElements.define('timestamp-info', Timestamp);