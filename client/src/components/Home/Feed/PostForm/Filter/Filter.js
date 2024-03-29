import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


const Filter = ({ postData, setPostData, societies }) => {
    const filterChange = (e) => {
        console.log(e.target.value)
        setPostData({ ...postData, filter: e.target.value })
    }

    return (
        <div>
            <Select
                value={postData.filter}
                onChange={filterChange}
                displayEmpty
            >
                <MenuItem value="">Filter</MenuItem>
                {
                    societies.map(society => {
                        return <MenuItem key={society._id} value={society.username}>{society.username} Members</MenuItem>
                    })
                }
            </Select>
        </div>
    )
}

export default Filter