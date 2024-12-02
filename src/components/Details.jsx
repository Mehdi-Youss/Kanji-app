import React from 'react'

export default function Details(props) {
    const {handleToggleSidebar, showSidebar} = props

    return (
    <div className='buttonContainer'>
      <button aria-label='Toggle Sidebar' onClick={() => {
          handleToggleSidebar(showSidebar)
        }}>
        <i className="fa-regular fa-circle-question"></i>
      </button>
    </div>
  )
}
