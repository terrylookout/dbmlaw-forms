import React, { ReactElement } from 'react';
import SubmitButton from './SubmitButton';

const PurchaseForm = (): ReactElement => {


    return (
        <div>
            <div style={{
                width: '100%',
                //display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                rowGap: '25px',
                columnGap: '10px',
                justifyItems: 'flex-start',
                textAlign: 'left',
                padding: '0 20% 100px 20%',
                boxSizing: 'border-box',
            }}>

                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>
                        <span>
                            1.&nbsp;&nbsp;
                        </span>
                        <span>
                            Full legal name of all purchasers&nbsp;<br />
                            <span style={{
                                fontWeight: 'bold',
                            }}>
                                (MUST MATCH PHOTO ID INCLUDING
                                MIDDLE NAMES (IF APPLICABLE) (extra fees will apply should we have to amend
                                documents)
                            </span>:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '150px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>

                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            2.&nbsp;&nbsp;
                        </span>

                        <span>
                            Your occupations:
                        </span>
                    </div>

                    <div>
                        <textarea style={{
                            width: '100%',
                            height: '150px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>

                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            2a.&nbsp;
                        </span>
                        <span>
                            The name, address and phone number of your employer(s):
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '150px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>

                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            3.&nbsp;&nbsp;
                        </span>

                        <span>
                            Your phone number and email address:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>

                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            4.&nbsp;&nbsp;
                        </span>
                        <span>
                            The Completion Date:
                        </span>
                    </div>

                    <div>

                        <input type='date' style={{
                            fontSize: '1.0rem',
                            padding: '3px',
                        }} />

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            5.&nbsp;&nbsp;
                        </span>
                        <span>
                            The Purchase Price:
                        </span>
                    </div>

                    <div>

                        <input type='number' style={{
                            fontSize: '1.0rem',
                            padding: '3px',
                        }}
                            min='0'
                        />

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            6.&nbsp;&nbsp;
                        </span>
                        <span>
                            The Address of the Property:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }} />

                    </div>
                </div>

                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            7.&nbsp;&nbsp;
                        </span>
                        <span style={{
                            display: 'inline-block',
                            marginBottom: '20px',
                        }}>
                            Do you want to own the property as Joint Tenants and or as Tenants-In-
                            Common:
                        </span>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            rowGap: '5px',
                            columnGap: '5px',
                            padding: '0 0 15px 15px',
                        }}>

                            <input type='radio' name='tenant-type' value='Joint Tenants' id='joint-tenants' />
                            <label htmlFor='joint-tenants'>Joint Tenants</label>

                            <input type='radio' name='tenant-type' value='Tenants-In-Common' id='tenants-in-common' />
                            <label htmlFor='tenants-in-common'>Tenants-In-Common</label>

                        </div>
                        <span style={{
                            display: 'block',
                        }}>
                            For more information between Joint Tenancy and Tenancy In Common, click on the
                            following link to our blog post: <a target='_blank' rel='noreferrer' href='http://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/'>
                                Joint Tenancy vs Tenants-In-Common</a>
                        </span>
                    </div>

                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>
                        <span>
                            8a.&nbsp;
                        </span>
                        <span>
                            Answer ONLY if you are purchasing a USED property
                        </span>
                    </div>

                    <div>
                        <span>
                            Are you a first time home
                            buyer and your purchase price is below $525,000? If yes, please provide the following:
                        </span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto 1fr',
                        rowGap: '10px',
                        columnGap: '10px',
                        padding: '15px 0 0 15px',
                    }}>
                        <div>a.</div>
                        <div>
                            <label htmlFor='can1'>
                                Are you a Canadian Citizen or Permanent Resident?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='can1' />
                        </div>

                        <div>b.</div>
                        <div>
                            <label htmlFor='can2'>
                                Have you ever owned a principal residence anywhere in the world?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='can2' />
                        </div>


                        <div>c.</div>
                        <div>
                            <label htmlFor='can3'>
                                Have you been a resident of BC for at least a year?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='can3' />
                        </div>


                        <div>d.</div>
                        <div>
                            <label htmlFor='can4'>
                                Will you be living in the property within three months?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='can4' />
                        </div>


                        <div>e.</div>
                        <div>
                            <label>
                                Date of Birth
                            </label>
                        </div>
                        <div>
                            <input type='date' style={{
                                fontSize: '1.0rem',
                                padding: '3px',
                            }} />

                        </div>


                        <div>f.</div>
                        <div>
                            <label>
                                Social Insurance Number
                            </label>
                        </div>
                        <div>
                            <input type='number' style={{
                                fontSize: '1.0rem',
                                padding: '3px',
                            }} />
                        </div>


                        <div>g.</div>
                        <div>
                            <label>
                                Previous address for the last two years
                            </label>
                        </div>
                        <div>
                            <textarea style={{
                                width: '100%',
                                height: '150px',
                                padding: '5px',
                                fontSize: '1.0rem',
                            }} />
                        </div>



                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>
                        <span>
                            8b.&nbsp;
                        </span>
                        <span>
                            Answer ONLY if you are purchasing a NEW property
                        </span>
                    </div>

                    <div>
                        <span>
                            Is your purchase price
                            below $800,000? If yes, please provide the following:
                        </span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto 1fr',
                        rowGap: '10px',
                        columnGap: '10px',
                        padding: '15px 0 0 15px',
                    }}>
                        <div>a.</div>
                        <div>
                            <label htmlFor='bcan1'>
                                Are you a Canadian Citizen or Permanent Resident?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='bcan1' />
                        </div>

                        <div>b.</div>
                        <div>
                            <label htmlFor='bcan2'>
                                Will you be living in the property within three months?
                            </label>
                        </div>
                        <div>
                            <input type='checkbox' id='bcan2' />
                        </div>

                        <div>c.</div>
                        <div>
                            <label>
                                Date of Birth
                            </label>
                        </div>
                        <div>
                            <input type='date' style={{
                                fontSize: '1.0rem',
                                padding: '3px',
                            }} />

                        </div>


                        <div>d.</div>
                        <div>
                            <label>
                                Social Insurance Number
                            </label>
                        </div>
                        <div>
                            <input type='number' style={{
                                fontSize: '1.0rem',
                                padding: '3px',
                            }} />
                        </div>


                        <div>e.</div>
                        <div>
                            <label>
                                Previous address for the last two years
                            </label>
                        </div>
                        <div>
                            <textarea style={{
                                width: '100%',
                                height: '150px',
                                padding: '5px',
                                fontSize: '1.0rem',
                            }} />
                        </div>



                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            9.&nbsp;&nbsp;
                        </span>

                        <span>
                            The name and phone number of your realtor:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            10.&nbsp;&nbsp;
                        </span>

                        <span>
                            If you are getting a mortgage, who is the Bank or Mortgage Lender:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            11.&nbsp;&nbsp;
                        </span>

                        <span>
                            The name and phone number of your mortgage broker or banker:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            12.&nbsp;&nbsp;
                        </span>

                        <span>
                            If it is a strata, the name of the strata management company:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            13.&nbsp;&nbsp;
                        </span>

                        <span>
                            If applicable, the parking stall number(s) and storage locker number(s):
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            14.&nbsp;&nbsp;
                        </span>

                        <span>
                            The name and phone number of your house insurance agent:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            15.&nbsp;&nbsp;
                        </span>

                        <span>
                            If you are not moving in, your mailing address:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto 1fr',
                    }}>

                        <span>
                            16.&nbsp;&nbsp;
                        </span>

                        <label htmlFor='ccan2'>
                            Will any portion of the property be rented out?
                        </label>

                        <input type='checkbox' id='ccan2' style={{
                            marginLeft: '15px',
                        }} />

                        <div></div>
                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            17.&nbsp;&nbsp;
                        </span>
                        <span style={{
                            display: 'inline-block',
                            marginBottom: '20px',
                        }}>
                            Where do you prefer your appointment?
                        </span>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            rowGap: '5px',
                            columnGap: '5px',
                            padding: '0 0 0px 15px',
                        }}>

                            <input type='radio' name='appt-loc' value='Vancouver' id='appt-van' />
                            <label htmlFor='appt-van'>Vancouver</label>

                            <input type='radio' name='appt-loc' value='Coquitlam' id='appt-coq' />
                            <label htmlFor='appt-coq'>Coquitlam</label>

                            <input type='radio' name='appt-loc' value='Langley' id='appt-lang' />
                            <label htmlFor='appt-lang'>Langley</label>

                        </div>
                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto 1fr',
                    }}>

                        <span>
                            18.&nbsp;&nbsp;
                        </span>

                        <label htmlFor='dcan2'>
                            If not a Canadian Citizen, are you a Permanent Resident?
                        </label>

                        <input type='checkbox' id='dcan2' style={{
                            marginLeft: '15px',
                        }} />

                        <div></div>
                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            19.&nbsp;&nbsp;
                        </span>

                        <span>
                            Your SIN (for each purchaser):
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>

                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            20.&nbsp;&nbsp;
                        </span>
                        <span>
                            Date of Birth:
                        </span>
                    </div>

                    <div>

                        <input type='date' style={{
                            fontSize: '1.0rem',
                            padding: '3px',
                        }} />

                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto 1fr',
                    }}>

                        <span>
                            21.&nbsp;&nbsp;
                        </span>

                        <label htmlFor='ecan2'>
                            If you are not a Canadian Citizen or a Permanent Resident, are you confirmed as
                            a B.C. Provincial Nominee (if so, we will require a copy of your B.C. Provincial Nominee
                            confirmation)?
                        </label>

                        <input type='checkbox' id='ecan2' style={{
                            marginLeft: '15px',
                        }} />

                        <div></div>
                    </div>
                </div>



                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            22.&nbsp;&nbsp;
                        </span>

                        <span>
                            If you will need to bring in funds to complete this transaction, please advise where
                            the funds will be coming from (i.e. savings account, chequing account, Home Equity Line
                            of Credit, etc):
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            23.&nbsp;&nbsp;
                        </span>

                        <span>
                            If coming from your savings or chequing account, where was the funds come from
                            (i.e. savings, sale of property, gift, etc):
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>


                <div style={{
                    paddingBottom: '30px',
                }}>
                    <div style={{
                        paddingBottom: '10px',
                    }}>

                        <span>
                            24.&nbsp;&nbsp;
                        </span>

                        <span>
                            If the funds came from someone else who is not a purchaser, please provide the
                            name, phone number, address and occupation, and relationship of that payer:
                        </span>
                    </div>

                    <div>

                        <textarea style={{
                            width: '100%',
                            height: '75px',
                            padding: '5px',
                            fontSize: '1.0rem',
                        }}>

                        </textarea>

                    </div>
                </div>

                <div style={{
                    gridColumn: '1/-1',
                    textAlign: 'right',
                }}>
                    <SubmitButton onClicked={() => {
                        console.log('clicked');
                    }} />
                </div>
            </div>




        </div>
    )

};

export default PurchaseForm;