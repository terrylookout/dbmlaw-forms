import { ReactElement } from "react";
import './TopMenu.css';

interface TopMenuProps {
    buildDateString: string;
}

const TopMenu = ({ buildDateString }: TopMenuProps): ReactElement => {

    return (
        <div>
            <div className='row dbm-x-top-menu'>
                <div className='col'>
                    <img
                        style={{
                            height: '80px',
                        }}
                        title={buildDateString}
                        src={`./assets/dbm-logo.png`} alt='DBM Law' />
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