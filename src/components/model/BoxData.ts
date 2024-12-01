import {ShirtData} from "./ShirtData.ts";

export interface BoxData {
    name: string;
    location: {
        longitude: number
        latitude: number
    }
    availableShirts: ShirtData[]
}