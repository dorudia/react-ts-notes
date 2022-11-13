import React from 'react'

type Props = { children: React.ReactNode }

const ContentLayer: React.FC<Props> = (props) => {
  return (
    <div className='contentWrapper'>
        {props.children}
    </div>
  )
}

export default ContentLayer;