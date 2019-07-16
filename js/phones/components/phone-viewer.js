import Component from "./component.js";

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({element});

    this._phoneDetails = null;

    this.on('click', 'back-button', (event)=>{ this.emit('back'); });

    this.on('click', 'basket-add', (event)=>{ this.emit('add-to-basket', this._phoneDetails.id); });

    this.on('click', 'small-image', (event)=> {
      const smallImage = event.target;
      const mainImage = this._element.querySelector('[data-element="main-img"]');
      mainImage.src = smallImage.src;
    });

  }

  show(phoneDetails) {

    this._phoneDetails = phoneDetails;
    super.show();
    this._render();
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img data-element="main-img" 
      class="phone" src="${ phone.images[0] }">

      <button 
        data-element="back-button"
      >Back</button>
      
      <button
        data-element="basket-add"
      >Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
      ${phone.images.map((image, index)=>`
        <li>
        <img data-element="small-image" src="${image}">
        </li>
      `
      ).join('')}
      </ul>
    `;
  }
}
