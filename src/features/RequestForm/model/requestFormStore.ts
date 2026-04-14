import { makeAutoObservable } from "mobx";

class RequestFormStore {
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

export const requestFormStore = new RequestFormStore();