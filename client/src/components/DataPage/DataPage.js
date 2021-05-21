import React from 'react'

import Nav from '../Nav/Nav.js'
import CustomizedTable from './CustomizedTable/CustomizedTable.js'
import './DataPage.css'

const DataPage = () => {
    
    return(
        <div className="data-page">
            <Nav />
            <div className="data-page__header">
                <h1 className="data-page__heading">Users</h1>
                <button className="create-user__btn">Create User</button>
            </div>
            <CustomizedTable />
        </div>
    )
}

export default DataPage