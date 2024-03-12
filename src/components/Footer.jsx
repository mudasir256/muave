import { Link } from 'react-router-dom';
import Logo from '../assets/images/mauve-white-logo.svg';
import LinkedIn from '../assets/images/linkedin.svg';
import Insta from '../assets/images/insta.svg';
import X from '../assets/images/x.svg';
import Fb from '../assets/images/fb.svg';

const Footer = () => {
  return (
    <>
    <div>
    <div className='flex items-center justify-between pb-14 border-b border-[#b8b8b8]' >
    <img src={Logo} alt="mauve-logo" />
    <ul className='flex text-white' >
      <li className='mx-4' ><Link to="/user/dashboard" >Dashboard</Link></li>
      <li className='mx-4' ><Link to="/user/clients-&-reports" >Clients & Reports</Link></li>
      <li className='mx-4' ><Link to="/user/action-&-goals" >Goal Planning</Link></li>
      <li className='mx-4' ><Link to="/user/documents" >Documents</Link></li>
      <li className='mx-4' ><Link to="/user/action-&-goals" >Action Items</Link></li>
    </ul>
    <div className='flex items-center' >
    <img src={Insta} alt="insta-logo" className='bg-[#6B4673] p-3 rounded-[50%] mx-2' />
    <img src={Fb} alt="fb-logo" className='bg-[#6B4673] p-3 rounded-[50%] mx-2' />
    <img src={X} alt="x-logo" className='bg-[#6B4673] p-3 rounded-[50%] mx-2' />
    <img src={LinkedIn} alt="linkedin-logo" className='bg-[#6B4673] p-3 rounded-[50%] mx-2' />
    </div>
    </div>
    <p className='text-[#b8b8b8] text-center pt-10' >Mauve  © 2023  All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer