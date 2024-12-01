import {ShirtData} from "./model/ShirtData.ts";

const ShirtCard = (shirt: ShirtData) => {

    return (
        <>
            {Object.keys(shirt).length == 0 ?
                <div className="card">Empty</div>
                :
                <div className="card h-100 d-flex flex-column border-2">
                    <img src={shirt.imageUrl}
                         className="w-100"
                         alt={shirt.team + " " + shirt.style}/>
                    <div className="card-body h-25 d-flex flex-column">
                        <div className="mt-auto">
                            <h5 className="card-title">{shirt.team}</h5>
                            <p className="card-text">{shirt.style}</p>
                            <a href="#" className="btn btn-dark">Go somewhere</a>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ShirtCard
