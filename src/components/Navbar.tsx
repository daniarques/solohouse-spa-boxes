import {NavLink} from 'react-router-dom';

const Navbar = () => {
    const linkClass = ({isActive}: { isActive: boolean }) =>
        isActive
            ? 'btn btn-dark-light text-black rounded px-3 py-2 text-decoration-none m-2'
            : 'btn btn-dark text-black rounded px-3 py-2 text-decoration-none hover-bg-gray-900 m-2';

    return (
        <nav className='bg-primary border-bottom border-black'>
            <div className='mx-auto container px-2 px-sm-3 px-lg-4'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div
                        className='d-flex flex-grow-1 align-items-center justify-content-center justify-content-md-start align-items-md-stretch'>
                        <NavLink className='d-flex flex-shrink-0 align-items-center me-4' to='/'
                                 style={{textDecoration: 'none'}}>
                            {/* <img className='h-25 w-auto' height="2.5rem" width="auto" src={logo} alt='React boxes'/>*/}
                            <span className='d-none d-md-block text-white fs-4 fw-bold ms-2'>
                              Solo House
                            </span>
                        </NavLink>
                        <div className='ms-md-auto'>
                            <div className='d-flex'>
                                <NavLink to='/' className={linkClass}>
                                    Home
                                </NavLink>
                                {/*TODO: add other pages*/}
                                <NavLink to='/boxes' className={linkClass}>
                                    Navbar element
                                </NavLink>
                                <NavLink to='/about' className={linkClass}>
                                    Navbar element
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
