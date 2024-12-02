import {ShirtData} from "./ShirtData.ts";

export interface BoxData {
    id: number;
    name: string;
    location: {
        longitude: number
        latitude: number
    }
    availableShirts: ShirtData[]
}