import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Error: React.FC = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>)=> {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const button = event.currentTarget as HTMLElement
      const link = button.querySelector('a')
      if (link) {
        link.click()
      }
    }
  }

  return (
    <>
        <Navbar />
        <div className='px-4 pt-10 flex flex-col items-center pb-10 lg:w-[60%] lg:flex lg:m-auto'>
          <h1 className='text-8xl font-semibold lg:text-9xl'>404</h1>
            <h2 className='text-5xl font-semibold mt-4'>Oops!</h2>
            <p className='text-center text-xl pt-4 pb-6 lg:max-w-60'>The page you are looking for doesn't exist or has been moved</p>
            <Button onKeyDown={handleKeyDown}>
              <Link to="/">Go Home</Link>
            </Button>
        </div>
        <Footer />
    </>
  )
}

export default Error