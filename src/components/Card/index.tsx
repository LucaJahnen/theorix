import React from 'react'

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({children }) => {
  return (
    <section className="pr-3 pt-4 pl-4 pb-6 mb-7 bg-green-400 bg-opacity-30 w-[100vw] translate-x-[-1rem] border-l-4 border-green-500 lg:w-[100%] lg:translate-x-0">
        {children}
    </section>
  )
}

export default Card