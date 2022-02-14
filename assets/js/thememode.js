const templateThemeMode = document.createElement('template');
templateThemeMode.innerHTML = `

<style>
:host fieldset {
    display: grid;
    grid-template-columns: repeat(2,auto);
    border: 1px dashed var(--form-accent-color);
    position: absolute;
    bottom: 1rem;
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
    font-size: .6rem;
    text-transform: uppercase;
    cursor: inherit;
    height: 2rem;
    line-height: inherit;
    padding: 0;
    text-align: center;
    color: var(--text-color);
}

select option {
    color: #fff;
    background-color: #535353;
}

#switch-con {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: .5rem;
    display: none;
}

.moon-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.moon-icon svg {
    width: 1.3rem;
    height: 1.3rem;
}


.moon-icon svg path{
    fill: var(--text-color);
}


.switch {
    position: relative;
    display: inline-block;
    width: 40px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    height: 1.2rem;
    width: 2.5rem;
    position: absolute;
    cursor: pointer;
    top: 5px;
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
    height: 17px;
    width: 17px;
    left: 1px;
    bottom: 1px;
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
    -webkit-transform: translateX(21px);
    -ms-transform: translateX(21px);
    transform: translateX(21px);
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
    
    <div id="switch-con">
    <label class="switch" id="toggle">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>

    <div class="moon-icon">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>
    </div>

    </div>
</fieldset>

`;

class ThemeMode extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(templateThemeMode.content.cloneNode(true));
    }

    connectedCallback() {
        
        const toggleSwitch = this.shadowRoot.querySelector('#switch-con');
        const themeMode = localStorage.getItem('themeMode');
        let selectList = this.shadowRoot.querySelector('select');

        if(themeMode != null){
            console.log('Custom Option chosed');
            selectList.value = 'custom';
            applyTheme(toggleSwitch);
        } else {
            console.log('first time. check system theme');
            autoTheme(toggleSwitch);
        }


        // Select menu
        this.shadowRoot.querySelector('select').addEventListener('change', function(event){
            if(this.value == 'auto'){
                autoTheme(toggleSwitch);
            } else {
                setThemeMode(this.value);
                applyTheme(toggleSwitch);
            }
        })

        //
        function applyTheme(toggleSwitch){

            if (localStorage.getItem('themeStyle') === null) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setDarkTheme(toggleSwitch)
                } else {
                    setLightTheme(toggleSwitch)
                } 
            } 
            else if (localStorage.getItem('themeStyle') === 'dark'){
                setDarkTheme(toggleSwitch)
            } else {
                setLightTheme(toggleSwitch)
            }
        }


        // Dark and Light theme switch
        toggleSwitch.querySelectorAll('input')[0].addEventListener('change', function(){
            if(this.checked){
                setDarkTheme(toggleSwitch);
            } else {
                setLightTheme(toggleSwitch);
            }
        })

        // Set dark theme
        function setDarkTheme(toggleSwitch){
            console.log('Set dark theme');
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('themeStyle', 'dark');
            toggleSwitch.style.display = "grid";
            toggleSwitch.querySelectorAll('input')[0].checked = true;
        }

        // Set light theme
        function setLightTheme(toggleSwitch){
            console.log('Set light theme');
            document.body.removeAttribute('data-theme');
            localStorage.setItem('themeStyle', 'light');
            toggleSwitch.style.display = "grid";
            toggleSwitch.querySelectorAll('input')[0].checked = false;
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
        function autoTheme(toggleSwitch){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('data-theme', 'dark');
            } 
            toggleSwitch.style.display = "none";
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