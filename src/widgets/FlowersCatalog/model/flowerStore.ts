import { makeAutoObservable } from "mobx";
import type { Flowers } from "./types";
import { getFlowers } from "../api";

class FlowerStore {
    flowers: Flowers[] = [];

    constructor () {
        makeAutoObservable(this);
    }

    setFlowers(value: Flowers[]) {
        this.flowers = value;
    }

    getFlowers() {
        return this.flowers;
    }

    async loadAllFlowers() {
        try {
            const response = await getFlowers();
            if (response) {
                this.setFlowers(response);
            }
        } catch (err) {
            console.error(err); 
        }
    }
}

export const flowerStore = new FlowerStore();