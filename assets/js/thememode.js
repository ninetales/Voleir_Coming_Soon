const templateThemeMode = document.createElement('template');
templateThemeMode.innerHTML = `

<style>
:host fieldset {
    display: grid;
    grid-template-columns: repeat(2,auto);
    border: 1px solid var(--form-accent-color);
    border-radius: 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-family: var(--body-font);
    font-size: .8rem;
    padding: 0 1rem;
}

:host select,
:host button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

select {
    appearance: none;
    background-color: red;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: var(--body-font);
    font-size: .8rem;
    cursor: inherit;
    height: 2rem;
    line-height: inherit;
    padding: 0;
    text-align: center;
    color: var(--text-color);
}

#toggle {
    display: none;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }

</style>

<fieldset>
    <legend>Theme</legend>
    <select name="" id="theme-switch">
        <option value="auto">Auto</option>   
        <option value="custom">Custom</option>         
    </select>
    <label class="switch" id="toggle">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
</fieldset>

`;

class ThemeMode extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(templateThemeMode.content.cloneNode(true));
    }

    connectedCallback() {
        
        const toggleSwitch = this.shadowRoot.querySelector('#toggle');
        const themeMode = localStorage.getItem('themeMode');
        let selectList = this.shadowRoot.querySelector('select');

        if(themeMode != null){
            console.log('Custom Option chosed');
            selectList.value = 'custom';
            //applyTheme(toggleSwitch);
        } else {
            console.log('first time. check system theme');
            autoTheme();
        }


        // Select menu
        this.shadowRoot.querySelector('select').addEventListener('change', function(event){
            if(this.value == 'auto'){
                autoTheme();
            } else {
                setThemeMode(this.value);
                applyTheme();
            }
        })

        function applyTheme(toggleSwitch){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // Check if already dark theme
                console.log('already dark');
                document.body.setAttribute('theme', 'dark');
                localStorage.setItem('themeStyle', 'dark');
                toggleSwitch.style.display = "block";
                toggleSwitch.querySelectorAll('input')[0].checked = true;
            } else {
                // it is light
                console.log('it is shiny');
                toggleSwitch.style.display = "block";
                toggleSwitch.querySelectorAll('input')[0].checked = false;
            }
        }

        // Set theme mode
        function setThemeMode(mode){
            console.log('Updated Storage with the value: ' + mode);
            localStorage.setItem('themeMode', mode);

        }

        // Clear local memory
        function clearDatabase(){
            localStorage.removeItem('themeMode');
            localStorage.removeItem('themeStyle');
        }

        // Set theme based on users system preferenses
        function autoTheme(){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('theme', 'dark');
            } 
            clearDatabase();
        }

    }
    

}
window.customElements.define('theme-mode', ThemeMode);


/*Går in på sidan. Kolla om där existerar ett sparat tema sedan tidigare? Om ja, då ska "custom" vara aktiverat
om nej, då ska "auto" vara aktiverat. Om auto är aktiverat då ska vi titta på systemets tema istället.*/

/*


        const themeMode = localStorage.getItem('themeMode');
        const themeStyle = localStorage.getItem('themeStyle');
        let selectList = this.shadowRoot.querySelector('select');

        if(themeMode != null){

            // Check what mode
            if(themeMode == 'auto'){

                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // dark mode
                    document.body.setAttribute('theme', 'dark');
                    setThemeStyle('dark');
                } else {
                    document.body.setAttribute('theme', '');
                    setThemeStyle('');
                }

            } else if (themeMode == 'custom'){
                console.log('Custom: ' + localStorage.getItem('themeMode'));
                selectList.value = 'custom';
            }

        } else {
            setThemeMode(selectList.value);
        }

        // Select menu
        this.shadowRoot.querySelector('select').addEventListener('change', function(event){
            setThemeMode(this.value);
        })

        // Set theme mode
        function setThemeMode(mode){
            console.log('Updated Storage with the value: ' + mode);
            localStorage.setItem('themeMode', mode);
        }

        // Set the theme
        function setThemeStyle(theme){
            console.log('Updated Storage with the value: ' + theme);
            localStorage.setItem('themeStyle', theme);
        }

        function getThemeStyle(){
            console.log('Getting theme');
            return localStorage.getItem('themeStyle');
        }


 */