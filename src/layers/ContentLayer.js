import React from 'react'



const ContentLayer = (props) => {
  return (
    <div className='contentWrapper'>
        {props.children}
    </div>
  )
}

export default ContentLayer;