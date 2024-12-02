import {Link} from 'react-router-dom';
import {FaExclamationTriangle} from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <section className='text-center flex flex-col justify-center items-center m-5'>
            <FaExclamationTriangle className='text-warning mb-4' size={50}/>
            <h1 className='font-bold mb-4'>404 Not Found</h1>
            <h4 className='mb-5'>This page does not exist</h4>
            <Link
                to='/'
                className='text-black bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4'
            >
                Go Back
            </Link>
        </section>
    );
};
export default NotFoundPage;
