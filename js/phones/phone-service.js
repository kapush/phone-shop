const PhoneService = {

  async getAll({ sortBy='age', query='', page='', perPage='' } = {}) {

    const url = `https://kapush.github.io/phone-shop/phones/phones.json`;
    const phones = await this._sendRequest(url);
    
    const phonesFiltered = this._filterPhones(phones, query);
    return this._sortPhones(phonesFiltered, sortBy);
  },

  getById(phoneId) {
    const url = `https://kapush.github.io/phone-shop/phones/${ phoneId }.json`;
    return this._sendRequest(url);
  },

  async _sendRequest(url){
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.send();

        xhr.onload = function() {
          if (xhr.status != 200) {
            reject(`Server error ${xhr.status} : ${xhr.statusText} `);
          } else {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          }
        }
      }
    );
  },

  _sortPhones(phones, sortBy){

    return phones.sort((phone1, phone2)=>{
      return phone1[sortBy] > phone2[sortBy] ? 1 : -1;
    });

  },

  _filterPhones(phones, query){
    if(query){

      phones = phones.filter((phone)=>{
        return phone.name.toLowerCase().includes(query.toLowerCase());
      });
    }
    return phones;
  }
};

export default PhoneService;
