import { BASE_URL, ENDPOINTS } from "@/shared/lib/ServerConfiguration"
import type { Flowers } from "../model/types";

export async function getFlowers(): Promise<Flowers[]> {
    const url = BASE_URL + ENDPOINTS.FLOWERS;

    try {
        const response = await fetch(url)
        const data = await response.json();

        console.log(data);

        return data
    } catch (error) {
        console.error("ОШИБКА: ", error);
        return [];
    }
}