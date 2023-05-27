import React from 'react'

const Footer = ( { lenght}) => {
  return (
    <footer>
            <p>{lenght} List {lenght <=1? "item" : "items"}</p>
    </footer>
  )
}

export default Footer