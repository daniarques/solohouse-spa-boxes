import {useEffect, useState} from "react";
import {BoxData} from "./model/BoxData.ts";
import {ShirtData} from "./model/ShirtData.ts";
import ShirtCard from "./ShirtCard.tsx";

function ShirtGrid() {
    const [shirts, setShirts] = useState<ShirtData[]>([]);

    //const [loading, setLoading] = useState(true);
    function chunkArray(array: any, chunkSize: number) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            while (chunk.length < chunkSize) {
                chunk.push(null);
            }
            result.push(chunk);
        }
        return result;
    }

    useEffect(() => {
        const fetchBox = async () => {
            const apiUrl = "http://localhost:8080/boxes/1?expand=true";
            try {
                const res = await fetch(apiUrl);
                const data = await res.json() as BoxData;
                setShirts(data.availableShirts);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                //setLoading(false);
            }
        };

        fetchBox();
    }, []);

    let rowSize = 2;
    return (
        <div className="container">
            {
                chunkArray(shirts, rowSize).map((chunk: ShirtData[], chunkIndex) => (
                    <div className="row  my-2">
                        {
                            chunk.map((shirt: ShirtData, index) =>
                                <div className="col flex">
                                    {/* TODO: Should build box structure as in real life (not all boxes have same amount of rows and columns).
                                    Skeleton should represent all box even if it's mostly empty  */}
                                    <ShirtCard key={chunkIndex * rowSize + index + 1} {...shirt}/>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>

    )
}


export default ShirtGrid;