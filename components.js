//Button

const smBtn = document.createElement('template')
smBtn.innerHTML = `
        <style>           
            :host{
                display: flex;
            }
            :host([disabled='true']) .sm-btn{
                cursor: default;
                opacity: 0.6;
                background: rgba(var(--text), 0.2) !important;
            }
            :host([disabled='true']) button{
                color: rgba(var(--text), 1) !important;
            }
            :host([type='primary']) .sm-btn{
                background: var(--primary-color);
            }
            :host([type='secondary']) button{
                color: var(--primary-color);
            }
            :host([type='secondary']) .sm-btn{
                border: solid 1px var(--primary-color);
                background: rgba(var(--foreground), 1); 
            }
            :host([width='cover']) .sm-btn{
                width: 100%;
            }
            .sm-btn {
                display: flex;
                padding: 0.6rem 0.8rem;
                cursor: pointer;
                user-select: none;
                border-radius: 0.2rem; 
                justify-content: center;
            }
            button{
                text-transform: uppercase;
                letter-spacing: 0.06rem;
                word-spacing: 0.1rem;
                font-family: 'Barlow', sans-serif;
                font-weight: 600;
                background: none;
                border: none;
                color: rgba(var(--text), 1);
                outline: none;
                pointer-events: none;
            }
        </style>
        <div class="sm-btn">
            <slot name="icon"></slot>
            <button id="main_button"></button>    
        </div>`;
customElements.define('sm-btn',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smBtn.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['disabled']
        }

        get disabled() {
            return this.getAttribute('disabled')
        }

        set disabled(val) {
            this.setAttribute('disabled', val)
        }

        connectedCallback() {
            let disabledEvent = new CustomEvent('disabled', {
                bubbles: true,
                composed: true
            })
            let clicked = new CustomEvent('clicked', {
                bubbles: true,
                composed: true
            })
            this.shadowRoot.querySelector('button').textContent = this.getAttribute('value')
            this.addEventListener('click', (e) => {
                if (this.getAttribute('disabled') === 'true') {
                    this.dispatchEvent(disabledEvent)
                }
                else
                    this.dispatchEvent(clicked)
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }
    })

    //Input
    const smInput = document.createElement('template')
    smInput.innerHTML = `
        <style>
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration { display: none; }
        input[type=number] {
        -moz-appearance:textfield;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0; 
        }
        input:invalid{
        outline: none;
        box-shadow: none;
        }
        ::-moz-focus-inner{
        border: none;
        }
        :host{
            display: -webkit-box;
            display: flex;
        }
        .hide{
           opacity: 0 !important;
           pointer-events: none !important;
        }
        .icon {
            fill: none;
            height: 1rem;
            width: 1rem;
            stroke: rgba(var(--text), 0.7);
            stroke-width: 6;
            overflow: visible;
            stroke-linecap: round;
            stroke-linejoin: round;
            cursor: pointer;
            margin-left: 1rem;
        }
        .input {
            display: flex;
            align-items: center;
            position: relative;
            gap: 1rem;
            padding: 0.8em;
            border-radius: 0.2em;
            transition: opacity 0.3s;
            background: rgba(var(--text), 0.1);
            width: 100%
        }

        input:focus{
            caret-color: var(--primary-color);
        }
    
        .label {
            opacity: .7;
            font-weight: 400;
            font-size: 1rem;
            position: absolute;
            top: 0;
            -webkit-transition: -webkit-transform 0.3s ease;
            transition: -webkit-transform 0.3s ease;
            transition: transform 0.3s ease;
            transition: transform 0.3s ease, -webkit-transform 0.3s ease;
            -webkit-transform-origin: left;
            transform-origin: left;
            pointer-events: none;
            will-change: transform;
            text-transform: capitalize;
        }
        .container{
            display: flex;
            position: relative;
            align-items: center;
            flex: 1;
        }    
        input{
            font-size: 1rem;
            border: none;
            background: transparent;
            outline: none;
            color: rgba(var(--text), 1);
            width: 100%;
        }
        .animate-label .container input {
            -webkit-transform: translateY(0.5rem);
                    transform: translateY(0.5rem);
            }
          
        .animate-label .container .label {
        -webkit-transform: translateY(-60%) scale(0.7);
                transform: translateY(-60%) scale(0.7);
        opacity: 1;
        color: var(--primary-color);
        }
    </style>
    <label class="input">
        <slot name = "icon"></slot>
        <div class="container">
            <input required/>
            <div class="label"></div>
        </div>
        <svg class="icon clear hide" viewBox="0 0 64 64">
            <title>clear</title>
            <path d="M55.44,51.69H22.71a8,8,0,0,1-5.4-2.09L1.66,35.38a3.57,3.57,0,0,1-.11-5.16L17.26,14.65a8,8,0,0,1,5.65-2.34H55.44a8.09,8.09,0,0,1,8.06,8.12V43.57A8.09,8.09,0,0,1,55.44,51.69Z"/>
            <line x1="43.81" y1="24.13" x2="28.19" y2="39.87"/>
            <line x1="43.81" y1="39.87" x2="28.19" y2="24.13"/>
        </svg>
    </label>
`;
customElements.define('sm-input', 
class extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'}).append(smInput.content.cloneNode(true))
    }
    static get observedAttributes(){
        return ['placeholder']
    }

    get value(){
        return this.shadowRoot.querySelector('input').value
    }

    set value(val){
        this.shadowRoot.querySelector('input').value = val;
    }

    get placeholder() {
        return this.getAttribute('placeholder')
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val)
    }

    get type() {
        return this.getAttribute('type')
    }

    get isValid() {
        return this.shadowRoot.querySelector('input').checkValidity()
    }

    preventNonNumericalInput(e) {
        let keyCode = e.keyCode;
        if(!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 37 && keyCode <= 40) || (keyCode >=96 && keyCode <= 105) || keyCode === 110 || (keyCode > 7 && keyCode < 19))) {
                e.preventDefault();
            }
    }

    checkInput(input, label, inputParent, clear) {
        if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
            return;
        if (input.value !== '') {
            if (this.animate)
                inputParent.classList.add('animate-label')
            else
                label.classList.add('hide')
            clear.classList.remove('hide')
        }
        else {
            if (this.animate)
                inputParent.classList.remove('animate-label')
            else
                label.classList.remove('hide')
            clear.classList.add('hide')
        }
    }

    connectedCallback(){
        let input = this.shadowRoot.querySelector('input'),
            inputParent = this.shadowRoot.querySelector('.input'),
            clearBtn = this.shadowRoot.querySelector('.clear'),
            label = this.shadowRoot.querySelector('.label')
        this.animate = this.hasAttribute('animate')
        this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')
        if (this.hasAttribute('value')) {
            input.value = this.getAttribute('value')
            this.checkInput(input, inputParent, clearBtn)
        }
        if (this.hasAttribute('type')) {
            if(this.getAttribute('type') === 'number'){
                input.setAttribute('inputmode', 'numeric')
            }
            else
                input.setAttribute('type', this.getAttribute('type'))
        }
        else
            input.setAttribute('type', 'text')
        input.addEventListener('keydown', e => {
            if(this.getAttribute('type') === 'number')
                this.preventNonNumericalInput(e);
        })
        input.addEventListener('input', e => {
            this.checkInput(input, label, inputParent, clearBtn)
        })
        clearBtn.addEventListener('click', e => {
            input.value = ''
            this.checkInput(input, label, inputParent, clearBtn)
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'placeholder')
                this.shadowRoot.querySelector('.label').textContent = newValue;
        }
    }
})

// tab-header

const smTabHeader = document.createElement('template')
smTabHeader.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: flex;
}
.tab-header{
    display: flex;
    position: relative;
    overflow-x: auto;
}
.indicator{
    position: absolute;
    background: rgba(var(--text), 1);
    bottom: 0;
}
:host([type="line"]) .indicator{
    height: 0.12rem;
    background: var(--primary-color);
    border-radius: 0.4rem 0.4rem 0 0;
}
:host([type="tab"]) .indicator{
    height: 100%;
    border-radius: 0.2rem
}
:host([type="line"]) .tab-header{
    border-bottom: solid 1px rgba(var(--text), .1); 
}
:host([type="tab"]) .tab-header{
    border-radius: 0.2rem;
    grid-auto-columns: 1fr;
    border: solid 1px rgba(var(--text), 1); 
}
.transition{
    transition: transform 0.4s, width 0.4s;
}
</style>
<div class="tab-header">
    <slot>Nothing to see here</slot>
    <div class="indicator"></div>
</div>
`;

customElements.define('sm-tab-header', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smTabHeader.content.cloneNode(true))
        
        this.indicator = this.shadowRoot.querySelector('.indicator');
    }
    static get observedAttributes() {
        return ['active-tab']
    }
    connectedCallback() {
        this.addEventListener('switchTab', e => {
            this.setAttribute('active-tab', e.detail.index)
        })
        this.addEventListener('activeTab', e => {
            this.setAttribute('active-tab', e.activeTab)
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'active-tab') {
                setTimeout(() => {
                    if (this.getAttribute('type') === 'tab') {
                        if (this.children[oldValue])
                            this.children[oldValue].classList.remove('tab-active')
                        this.children[newValue].classList.add('tab-active')
                    }
                    else {
                        if (this.children[oldValue])
                            this.children[oldValue].classList.remove('line-active')
                        this.children[newValue].classList.add('line-active')
                    }
                    this.indicator.setAttribute('style', `width: ${this.children[newValue].offsetWidth}px; transform: translateX(${this.children[newValue].offsetLeft}px)`)      
                }, 0);
                setTimeout(() => {
                    this.indicator.classList.add('transition')
                }, 100);
            }
        }
    }
})
// tab

const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: inline-flex;
    z-index: 2;
}
.tab{
    user-select: none;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    word-spacing: 0.1em;
    text-align: center;
    transition: color 0.3s;
    text-transform: uppercase;
}
:host(.tab-active) .tab{
    color: rgba(var(--foreground), 1);
}
:host(.line-active) .tab{
    color: var(--primary-color);

</style>
<div class="tab">
    <slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smTab.content.cloneNode(true))
    }
    connectedCallback() {
        let switchTab = new CustomEvent('switchTab', {
            bubbles: true,
            composed: true,
            detail: {
                panel: this.getAttribute('panel'),
                index: [...this.parentNode.children].indexOf(this)
            }
        })
        let activeTab = new CustomEvent('switchTab', {
            bubbles: true,
            composed: true,
            activeTab: {
                index: [...this.parentNode.children].indexOf(this)
            }
        })
        this.addEventListener('click', e => {
            this.dispatchEvent(switchTab)
        })
        if(this.hasAttribute('active'))
            this.dispatchEvent(switchTab)
    }
})