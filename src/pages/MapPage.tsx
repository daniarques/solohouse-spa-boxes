import BoxesMap from "../components/BoxesMap.tsx";

const MapPage = () => {

    return (
        <>
            <div className="d-flex justify-content-center w-100 flex-wrap">
                <h2 className="m-2">Encuentra tu caja</h2>
                <BoxesMap/>
            </div>
        </>
    )
}

export default MapPage;