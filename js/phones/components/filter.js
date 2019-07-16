import Component from "./component.js";


export default class Filter extends Component {
  constructor({ element }) {
    super({element});


    this.on('change', 'select-sort', (event)=>{
      this.emit('change-sort', event.target.value);
    });

    const emitWithDebounce = _.debounce((event)=>{
      this.emit('change-query', event.target.value);
    }, 500);

    this.on('input', 'filter', emitWithDebounce);

    this._render();
  }

  _debounce(f, delay) {
    return function(...args) {
        //console.log('this при вызове обертки' + this);
        let checkIfUserStoppedInput = function(){
          //console.log('this при вызове проверки через секунду после ввода' + this);
          let inputText = arguments[0];
          if(inputText !== input1.value){ return; }
          f.call(this, ...args);
        };
        setTimeout(checkIfUserStoppedInput.bind(this), delay, event.target.value, ...args);   
    };
  }

  getCurrentData(){
    const query = this._element.querySelector('[data-element="filter"]').value;
    const sortBy = this._element.querySelector('[data-element="select-sort"]').value;
    return {query: query, sortBy: sortBy};
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="filter">
      </p>

      <p>
        Sort by:
        <select data-element="select-sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
