import React from 'react'

interface ListProps {
    children: React.ReactNode;
}

const List: React.FC<ListProps> = ({ children }) => {
  return (
    <>
        {children}
    </>
  )
}

export default List