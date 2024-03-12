import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Tabs';

// Tabs
import Beneficiaries from './Reports/Beneficiaries';
import Fiduciaries from './Reports/Fiduciaries';
import GoalPlanning from './Reports/GoalPlanning';

const Client = () => {
    const navigate = useNavigate();
    const [overview, setOverview] = useState(false);
    const [estate, setEstate] = useState(true);
    const [document, setDocument] = useState(false);

    const items = [
        {
            key: '1',
            label: 'Goal Planning',
            children: GoalPlanning(),
        },
        {
            key: '2',
            label: 'Asset Overview',
            children: 'Content of Tab Asset Overview',
        },
        {
            key: '3',
            label: 'Estate Diagram',
            children: 'Content of Tab Estate Diagram',
        },
        {
            key: '4',
            label: 'Beneficiaries',
            children: Beneficiaries(),
        },
        {
            key: '5',
            label: 'Fiduciaries',
            children: Fiduciaries(),
        },
        {
            key: '6',
            label: 'Family Tree',
            children: 'Content of Tab Family Tree',
        },
    ];

    return <div className='mt-3'>

        <div className='flex justify-between'>

            <div>

                <div className="tri-state-toggle-b">
                    <button
                        className={`tri-state-toggle-button-b${overview ? '-active' : ''}`}
                        id="toggle-button1"
                        onClick={() => {
                            setOverview(true);
                            setDocument(false);
                            setEstate(false);
                        }}
                    >
                        Overview
                    </button>
                    <button
                        className={`tri-state-toggle-button-b${estate ? '-active' : ''}`}
                        id="toggle-button2"
                        onClick={() => {
                            setOverview(false);
                            setDocument(false);
                            setEstate(true);
                        }}
                    >
                        Estate
                    </button>
                    <button
                        className={`tri-state-toggle-button-b${document ? '-active' : ''}`}
                        id="toggle-button3"
                        onClick={() => {
                            setOverview(false);
                            setDocument(true);
                            setEstate(false);
                        }}
                    >
                        Document
                    </button>
                </div>

            </div>


            <div className='flex'>

                <label className='pr-3 mt-3'>Client : </label>
                <div className='bg-[white] p-2 rounded-2xl mt-2 mb-2 text-sm mr-5'>
                    <select className='bg-[rgba(244,241,241,0.1)]' name="client" id="client">
                        <option value="James Johnson">James Johnson</option>
                    </select>
                </div>

                {/* <div className='items pt-4 flex mb-1 cursor-pointer' onClick={() => navigate('/settings/account')}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(11,11,11,0.1)',
                    }} className='ml-2 mr-2'>
                    </div>
                    <p>Settings</p>
                </div> */}

            </div>

        </div>

        <div className='mt-3'>
            <Tabs items={items} defaultKey={"4"} />
        </div>
    </div>
}

export default Client;