import React from 'react'
import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header className="">
      <div className='w-full mx-auto h-20 bg-[#388936] flex justify-center '>
        <div className='w-[1400px] grid grid-cols-4 items-center'>
          <div className='pl-12'>
            <img src={logo} alt="Santos corretora" className="w-36"/>
          </div>
          <nav className="col-span-2 flex justify-center">
            <ul className="font-poppins font-medium text-lg text-white flex gap-16 items-center">
              <li className='underline-animation'>Para venda</li>
              <li className='underline-animation'>Para locação</li>
              <li className='underline-animation'>Contato</li>
            </ul>
          </nav>
        </div>

      </div>
    </header>
  )
}

export default Header