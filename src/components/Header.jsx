import React from 'react'
import logo from '../assets/logo.svg'
import Banner from './Banner'

const Header = () => {
  return (
    <header className="">
      <div className='w-full mx-auto h-20 bg-[#388936] flex justify-center bg-neu'>
        <div className='w-[1400px] grid grid-cols-4 items-center'>
          <div className='pl-12'>
            <img src={logo} alt="Logo" className="w-36"/>
          </div>
          <nav className="col-span-2 flex justify-center">
            <ul className="font-poppins font-medium text-lg text-white flex gap-16 items-center">
              <li>Para venda</li>
              <li>Para locação</li>
              <li>Contato</li>
            </ul>
          </nav>
        </div>

      </div>
      <Banner></Banner>
    </header>
  )
}

export default Header