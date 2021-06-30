import React, { useState, forwardRef } from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';

import Nav from '../Nav/Nav.js'
import './DataPage.css'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const DataPage = (props) => {
    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    const validations = (newData, resolve, mode) => {
        if(mode !== "no validation"){
            //validation
            let errorList = []
    
            // Checks if user already exists
            if (mode === "new") {
                let entityExists = false
                for (let i = 0; i < props.data.length; i++) {
                    if (props.data[i].username === newData.username) {
                        entityExists = true
                        break
                    }
                }
                if (entityExists) {
                    errorList.push("Entity already exists")
                }
            }
    
            // Checks any field is empty
            function isEmpty(newData) {
                if (Object.keys(newData).length > props.columns.length - 3) {
                    for (let key in newData) {
                        if (!newData[key]) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            }
    
            if (isEmpty(newData)) {
                errorList.push("Please fill all fields")
            }
    
            // validates the email address
            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
    
            if (newData.email) {
                if (!validateEmail(newData.email)) {
                    errorList.push("Please enter a valid email address")
                }
            }
    
            if (errorList.length < 1) {
                return true;
            } else {
                setErrorMessages(errorList)
                setIserror(true)
                resolve()
            }
        }
    }

    return (
        <div className="data-page">
            <Nav />
            <div className="data-page__header">
                <h1 className="data-page__heading">{props.mode}</h1>
            </div>

            <div className="">
                <div>
                    {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                    }
                </div>
                <MaterialTable
                    title=""
                    columns={props.columns}
                    data={props.data}
                    icons={tableIcons}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                props.handleRowUpdate(newData, oldData, resolve, validations, setIserror, setErrorMessages);

                            }),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                props.handleRowAdd(newData, resolve, validations, setIserror, setErrorMessages)
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                props.handleRowDelete(oldData, resolve)
                            }),
                    }}
                />
            </div>
        </div>
    )
}

export default DataPage