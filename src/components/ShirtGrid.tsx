import {BoxData} from "./model/BoxData.ts";
import {ShirtData} from "./model/ShirtData.ts";
import ShirtCard from "./ShirtCard.tsx";
import {useLoaderData, useLocation, useNavigate} from "react-router-dom";

interface PurchaseBody {
    boxId: number,
    shirtId: number,
    userId: number,
}

function ShirtGrid() {
    const box: BoxData = useLoaderData();
    const navigate = useNavigate();
    const location: Location = useLocation();

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

    const purchaseFetch = async (params: PurchaseBody) => {

        const apiUrl = `http://localhost:8080/purchases`;
        const rawResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        return await rawResponse.json();
    };


    let rowSize = 2;
    return (
        <div>
            <h3 className='text-center m-5'>
                Caja ubicada en {box.name}
            </h3>
            <div className="container">
                {
                    chunkArray(box.availableShirts, rowSize).map((chunk: ShirtData[], chunkIndex) => (
                        <div className="row my-2">
                            {
                                chunk.map((shirt: ShirtData, index) =>
                                    <div className="col flex">
                                        {/* TODO: Should build box structure as in real life (not all boxes have same amount of rows and columns).
                                    Skeleton should represent all box even if it's mostly empty  */}
                                        <ShirtCard key={chunkIndex * rowSize + index + 1} shirt={shirt}
                                                   onCreateHandler={() => {
                                                       //TODO: use user logged id
                                                       let userId = 2;
                                                       purchaseFetch({
                                                           boxId: box.id,
                                                           shirtId: shirt.id,
                                                           userId: userId
                                                       })
                                                           .then((response) => {
                                                               navigate('/purchase', {
                                                                   state: {
                                                                       purchaseId: response,
                                                                       box: box,
                                                                       shirt: shirt,
                                                                       userId: userId,
                                                                       previousLocation: location.pathname
                                                                   },
                                                               })
                                                           })
                                                   }}/>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

const boxLoader = async ({params}: { params: any }) => {
    const apiUrl = `http://localhost:8080/boxes/${params.id}?expand=true`;
    const res = await fetch(apiUrl);
    return await res.json() as BoxData
};

export {ShirtGrid as default, boxLoader};