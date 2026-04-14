import { makeAutoObservable } from "mobx";

class ConstructorStore {
    selectedFlowerId: number | null = null;
    selectedModelLink: string | null = null;
    isConstructorActive: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    selectFlower(flowerId: number, modelLink: string) {
        this.selectedFlowerId = flowerId;
        this.selectedModelLink = modelLink;
        this.isConstructorActive = true;
    }

    closeConstructor() {
        this.selectedFlowerId = null;
        this.selectedModelLink = null;
        this.isConstructorActive = false;
    }
}

export const constructorStore = new ConstructorStore();