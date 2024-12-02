import {Link, useLocation} from 'react-router-dom';
import {FaCheck} from "react-icons/fa";
import NotFoundPage from "./NotFoundPage.tsx";
import {BoxData} from "../components/model/BoxData.ts";
import {ShirtData} from "../components/model/ShirtData.ts";

interface Props {
    purchaseId: number,
    box: BoxData,
    shirt: ShirtData,
    userId: number
}

const PurchaseOKPage = () => {

    const state: Props = useLocation().state;
    return (
        <>
            {state.box ? <section className='text-center flex flex-col justify-center items-center m-5'>
                    <FaCheck className='text-success mb-4' size={50}/>
                    <p className='font-bold mb-4'>La compra de la camiseta {state.shirt?.style} en {state.box?.name} ha
                        sido
                        realizada correctamente. Por favor pase a recoger su compra</p>
                    <Link
                        to='/'
                        className='text-black bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4'
                    >
                        Volver
                    </Link>
                </section>
                :
                <NotFoundPage></NotFoundPage>}
        </>
    );
};
export default PurchaseOKPage;
