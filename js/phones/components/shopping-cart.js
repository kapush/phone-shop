import Component from "./component.js";

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({element});
    this._basket = {};

    this.on('click', 'remove-button', (event)=>{
      const itemToDelete = event.target.dataset.itemId;
      this.remove(itemToDelete);
    });

    this.on('click', 'add-button', (event)=>{
      const itemToAdd = event.target.dataset.itemId;
      this.add(itemToAdd);
    });

    this.on('click', 'drop-button', (event)=>{
      this.drop();
    });
  }

  add(itemId) {
    let basketItemCount = this._basket[itemId] || 0;
    basketItemCount++;
    this._basket[itemId] = basketItemCount;
    this._render();
  }

  remove(itemId) {
    this._basket[itemId]--;
    if(this._basket[itemId] === 0){
      delete this._basket[itemId];
    } 
    this._render();
  }

  drop(){
    this._basket = {};
    this._element.innerHTML = '';
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <a 
        data-element="drop-button" 
        class="cart__remove-button">
        Очистить
      </a>
      <ul>
      ${ Object.keys(this._basket).map(itemId => `
          <li>${ itemId }&nbsp;
            ${ this._basket[itemId] }
            <a 
              data-element="add-button" 
              data-item-id="${ itemId }"
              class="cart__remove-button">+
            </a>
            <a 
              data-element="remove-button" 
              data-item-id="${ itemId }"
              class="cart__remove-button">-
            </a>
          </li>
      `).join('') }
      </ul>
    `;
  }
}
