import {BoxData} from "./model/BoxData.ts";
import {ShirtData} from "./model/ShirtData.ts";
import ShirtCard from "./ShirtCard.tsx";
import {useLoaderData} from "react-router-dom";

function ShirtGrid() {
    const box: BoxData = useLoaderData();

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

    let rowSize = 2;
    return (
        <div className="container">
            {
                chunkArray(box.availableShirts, rowSize).map((chunk: ShirtData[], chunkIndex) => (
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

const boxLoader = async ({params}: { params: any }) => {
    const apiUrl = `http://localhost:8080/boxes/${params.id}?expand=true`;
    const res = await fetch(apiUrl);
    return await res.json() as BoxData
};

export {ShirtGrid as default, boxLoader};