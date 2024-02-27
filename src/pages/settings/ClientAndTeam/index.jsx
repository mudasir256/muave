import React, { useState , useEffect } from 'react';
import Main from './main';
import Layout from "../Layout";
import { accountSettings , userDetails , getOrganizationUsers } from '../../../redux/user/user-actions';
import { useDispatch , useSelector } from 'react-redux';
import ClientAndTeam from './ClientAndTeam';



const ClientAndTeamSettings = () => {
    const dispatch  = useDispatch();
    const myState = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(userDetails());
    },[])

    useEffect(() => {
        const orgID = myState.userData?.OrganizationId;
        if(orgID){
        dispatch(getOrganizationUsers(orgID));
        }
    },[myState.userData])

    const clientAndTeamSettings = <div className='ml-[2%] mr-[10%] flex flex-col mb-10 mt-10'>
        {/* <Main /> */}
        <ClientAndTeam/>
    </div>

    const desc = "Lorem ipsum dolor sit amet consectetur. Cras nunc diam tortor tincidunt. Mi ut enim feugiat blandit egestas."


    return <Layout title={"Client & Team Settings"} description={desc} content={clientAndTeamSettings} />
}

export default ClientAndTeamSettings