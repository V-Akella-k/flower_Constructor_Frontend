import { makeAutoObservable } from "mobx";

class OrderFormStore {
    isOpen: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }
}

export const orderFormStore = new OrderFormStore();