'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._render();

    this._initCart();
    this._initCatalog();
    this._initViewer();
    this._initFilter();

    this._showPhones();

  }

  async _showPhones(){
    PhoneService.getAll(this._filter.getCurrentData())
    .then(phones => this._catalog.show(phones))
    .catch((error)=>console.warn(error));
  }

  _initCatalog(){
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]')
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getById(phoneId);
      
      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });

    this._catalog.subscribe('add-to-basket', (phoneId) => {
      //let phoneDetails = PhoneService.getById(phoneId);
      this._cart.add(phoneId);
    });
  }

  _initCart(){
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initViewer(){
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', ()=>{
      this._showPhones(); //чтоб показывать отфильтрованные телефоны
    });

    this._viewer.subscribe('add-to-basket', (phoneId)=>{
      this._cart.add(phoneId);
    });
  }

  _initFilter(){
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
    });

    this._filter.subscribe('change-sort', ({sortBy, query})=>{
      this._showPhones();
    });

    this._filter.subscribe('change-query', ({sortBy, query})=>{
      this._showPhones();
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">
    
        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="filter"></div>
          </section>
    
          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer" hidden></div>
        </div>
      </div>
    `;
  }


}
