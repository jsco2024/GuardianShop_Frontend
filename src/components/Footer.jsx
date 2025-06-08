import logo from '../assets/logo.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import world from '../assets/world.svg'
import { Link } from 'react-router-dom'
import meta from '../assets/meta.svg'
import tiktok from '../assets/tiktok.svg'
import instagram from '../assets/instagram.svg'
import twitter from '../assets/twitter.svg'
import WhatsApp from '../assets/WhatsApp.svg'

const Footer = () => {
  return (
    <div className='bottom-0 bg-tertiary w-full h-full flex flex-wrap justify-center items-center lg:justify-between text-xs text-white p-4'>
      <div className='w-[300px] md:w-[256px] lg:w-[300px]  h-[97px] lg:ml-8 flex gap-4  border-white border-r-2 mb-4'>
       <img src={logo} alt="" width="80px" height="80px" />
        <div className='justify-center place-content-center'>
          <img src={phone} alt="" className='mb-1'/>
          <img src={location} alt=""  className='mb-1' />
          <img src={world} alt="" className='mb-1'/>
        </div>
        <div className='justify-center place-content-center'>
          <ol>
          <li className='mb-2'><Link to="https://api.whatsapp.com/send/?phone=%2B573205159915&text&type=phone_number&app_absent=0" className='underline'>+573205159915</Link></li>
            <li className='mb-2'>Cr 24 # 1 - 135 Sur - Madrid/Cundinamarca</li>
            <li className='mb-2'><Link to="https://github.com/PEDRAZA2645/GuardianShop_Front" className='underline'>www.GuardianShop.com</Link></li>
          </ol>
        </div>
      </div>
      <div className='w-[300px] md:w-[256px] lg:w-[300px] h-[97px] border-white border-r-2 mb-4 flex'>
        <h1 className='p-4 uppercase ml-4'>Enlaces</h1>
        <ol className='p-4'>
          <li className='mb-1'><Link to="/">Inicio</Link></li>
          <li className='mb-1'><Link to="/products">Productos</Link></li>         
          <li className='mb-1'><Link to="/contactForm">Contactenos</Link></li>
          <li className='mb-1'>Support</li>
        </ol>
      </div>
      <div className='w-[300px] md:w-[256px] lg:w-[300px] h-[97px] border-white border-r-2 mb-4'>
       <h1 className='uppercase p-4'>redes sociales</h1>
       
        <ol className='flex gap-8 ml-4'>
          <li>
            <Link to="https://www.facebook.com">
            <img src={meta} alt="" width="20px" height="20px"/>
            </Link>
          </li>
          <li> <Link to="https://www.tiktok.com">
          <img src={tiktok} alt="" width="20px" height="20px"/>
          </Link>
          </li>
          <li> 
            <Link to="https://www.instagram.com">
            <img src={instagram} alt="" width="20px" height="20px"/>
            </Link>
          </li>
          <li> 
            <Link to="https://www.twitter.com">
            <img src={twitter} alt="" width="20px" height="20px"/>
            </Link>
          </li>
          <li> 
            <Link to="https://chat.whatsapp.com/HlWua8NmQtRE8IZpoTB6sp">
            <img src={WhatsApp} alt="" width="20px" height="20px"/>
          </Link>
          </li>
        </ol>
      
      </div>
      <div className='w-[300px] h-[97px] md:w-[768px] md:h-[50px] lg:w-[300px] lg:h-[97px] md:flex lg:flex-wrap justify-center md:justify-between lg:justify-start place-content-center p-3 md:p-4 lg: border-white border-r-2'>
        <h1 className='mb-2 md:mt-0 uppercase lg:mr-5'>¿Que quieres hacer?</h1>
       <Link to="/products" className='btn-tertiary'>Comprar...</Link>
        <p className='mt-2 md:mt-0 lg:mt-5'>© 2024 <span className='font-bold'>GuardianShop</span> || Todos los derechos reservados</p>
      </div>
    </div>
  )
}

export default Footer