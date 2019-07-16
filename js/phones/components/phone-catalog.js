'use strict';

import Component from "./component.js";

export default class PhoneCatalog extends Component {
  constructor({ element, phones}) {
    super({element});
    
    this._phones = [];

    this._render();

    this.on('click', 'phone-link', (event)=>{
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'buy-button', (event)=>{
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit('add-to-basket', phoneElement.dataset.phoneId);
    });
  }

  show(phones){
    this._phones = phones;
    
    super.show();

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${ this._phones.map(phone => `

          <li
            data-element="phone"
            data-phone-id="${ phone.id }"
            class="thumbnail"
          >
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a data-element="buy-button" class="btn btn-success">
                Add
              </a>
            </div>
  
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      
        
      </ul> 
    `;
  }
}
