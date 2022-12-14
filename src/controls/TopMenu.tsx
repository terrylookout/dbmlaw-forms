import { ReactElement } from "react";
import DbmLogo from '../images/dbm-logo.png';
import './TopMenu.css';


const TopMenu = (): ReactElement => {

    return (
        <div>
            <div className='row dbm-x-top-menu'>
                <div className='col'>
                    <img
                        style={{
                            height: '80px',
                        }}
                        title='1-2-2023 1'
                        src={DbmLogo} alt='DBM Law' />
                </div>

                <div className='col col-lg-8  dbm-x-top-menu-right'>

                    <div className='row mb-4'>
                        <div className='col d-flex justify-content-end dbm-x-top-menu-phone'>
                            <a href="tel:1-604-939-8321" >604 939 8321</a>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col d-flex justify-content-end dbm-x-top-menu-links'>

                            <div className="row">
                                <div className="col">
                                    <a href='https://www.dbmlaw.ca'>HOME</a>
                                </div>
                                <div className="col">
                                    <a href='https://www.dbmlaw.ca/about/'>ABOUT</a>
                                </div>

                                <div className="col">
                                    <a href='https://www.dbmlaw.ca/lawyers/'>LAWYERS</a>
                                </div>

                                <div className="col">
                                    <a href='https://www.dbmlaw.ca/legal-services/'>LEGAL SERVICES</a>
                                </div>

                                <div className="col">
                                    <a href='https://www.dbmlaw.ca/blog/'>BLOG</a>
                                </div>

                                <div className="col">
                                    <a href='https://www.dbmlaw.ca/contact/'>CONTACT</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default TopMenu;