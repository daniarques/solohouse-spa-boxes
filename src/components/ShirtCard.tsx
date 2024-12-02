import {ShirtData} from "./model/ShirtData.ts";
import {useEffect, useState} from "react";

interface Props {
    shirt: ShirtData,
    onCreateHandler: any
}

const ShirtCard = (props: Props) => {
    const [shirt, setShirt] = useState<ShirtData>(props.shirt)

    useEffect(() => {
        setShirt(props.shirt)
    }, [shirt])
    return (
        <>
            {Object.keys(shirt).length == 0 ?
                //TODO: Fix empty card
                <div className="card h-100 d-flex flex-column border-2">Empty</div>
                :
                <div className="card h-100 d-flex flex-column border-2">
                    <img src={shirt.imageUrl}
                         className="w-100"
                         alt={shirt.team + " " + shirt.style}/>
                    <div className="card-body h-25 d-flex flex-column">
                        <div className="mt-auto">
                            <h5 className="card-title">{shirt.team}</h5>
                            <p className="card-text">{shirt.style}</p>
                            <div>

                                {
                                    shirt.amount == 0 ?
                                        <span className="badge bg-danger p-2">No disponible</span>
                                        :
                                        <button type="button" className="btn btn-dark me-2" disabled={shirt.amount == 0}
                                                onClick={props.onCreateHandler}>
                                            Comprar {shirt.price}€
                                        </button>
                                }
                                { //TODO: this logic should be in back. Back should return boolean "lowStock" instead of amount
                                    shirt.amount < 3 && shirt.amount != 0 &&
                                    <span className="badge bg-warning p-2">Pocas unidades</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ShirtCard
