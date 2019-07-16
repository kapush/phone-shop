export default class Component {
    constructor({ element }) {
        this._element = element;
        this._callbackMap = {};
    }

    show(){
        this._element.hidden = false;
    }

    hide(){
        this._element.hidden = true;
    }

    subscribe(eventName, callback){
        const callbackArr = this._callbackMap[eventName] || [];
        callbackArr.push(callback);
        this._callbackMap[eventName] = callbackArr;
    }

    emit(eventName, data){
        const callbackArr = this._callbackMap[eventName] || [];
        callbackArr.forEach(callback => {
            callback(data);
        });
    }

    //обертка для addEventListener , чтоб не дублировать код. Это делегирование
    on(eventName, elementToListen, callback){
        this._element.addEventListener(eventName, (event)=>{
            const delegateTarget = event.target.closest(`[data-element="${elementToListen}"]`);
            
            if(!delegateTarget)
                return;
            callback(event);
        });
    }

}