import React from 'react'

import Nav from '../Nav/Nav.js'
import CustomizedTable from './CustomizedTable/CustomizedTable.js'
import './DataPage.css'

const DataPage = (props) => {
    let mode = props.location.pathname.substring(1)
    
    return(
        <div className="data-page">
            <Nav />
            <div className="data-page__header">
                <h1 className="data-page__heading">{mode}</h1>
            </div>
            <CustomizedTable mode={mode} />
        </div>
    )
}

export default DataPage