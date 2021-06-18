import React, { useState, useEffect } from 'react';
import './CustomizedTable.css';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { createUser, getUsers, deleteUser, updateUser } from '../../../actions/users.js'

import { Avatar } from '@material-ui/core'

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


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function CustomizedTable() {
  const users = useSelector((state) => state.users)
  const usersData = users.map((user) => { return { ...user, password: '********' } })

  const dispatch = useDispatch()

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Avatar", render: rowData => <Avatar /> },
    { title: "Name", field: "name" },
    { title: "Username", field: "username" },
    { title: "Password", field: "password" },
    { title: "Email", field: "email" },
    { title: "CNIC", field: "cnic" },
    { title: "Phone No.", field: "phoneNumber" },
    { title: "Designation", field: "designation" },
    { title: "Roles", field: "roles" },
  ]

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const validations = (newData, resolve, mode) => {
    //validation
    let errorList = []

    if(mode === "new"){
      let userExists = false
      for (let i = 0; i < usersData.length; i++) {
        if(usersData[i].username === newData.username){
          userExists = true
          break
        }      
      }
      if(userExists){
        errorList.push("User already exists")
      }
    }

    function checkProperties(usersData) {
      for (let key in usersData) {
        if (!usersData[key])
          return false;
      }
      return true;
    }

    if(!checkProperties(usersData)){
      errorList.push("Please fill all fields")
    }

    // if (!newData.name) {
    //   errorList.push("Please enter name")
    // }
    // if (!newData.username) {
    //   errorList.push("Please enter username")
    // }
    // if (!newData.password) {
    //   errorList.push("Please enter password")
    // }
    // if (!newData.email || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email")
    // }
    // if (!newData.cnic) {
    //   errorList.push("Please enter cnic")
    // }
    // if (!newData.phoneNumber) {
    //   errorList.push("Please enter phone number")
    // }
    // if (!newData.designation) {
    //   errorList.push("Please enter designation")
    // }
    // if (!newData.roles) {
    //   errorList.push("Please enter roles")
    // }
    
    if (errorList.length < 1) {
      return true;
    } else {
      console.log(errorList.length)
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    let noError = validations(newData, resolve, "update")
    if (noError) { //no error
      dispatch(updateUser(oldData._id, newData))
      resolve()
      setIserror(false)
      setErrorMessages([])
    }
  }

  const handleRowAdd = (newData, resolve) => {
    let noError = validations(newData, resolve, "new")
    if (noError) { //no error
      // dispatch(createUser(newData))
      resolve()
      setErrorMessages([])
      setIserror(false)

    }
  }

  const handleRowDelete = (oldData, resolve) => {
    dispatch(deleteUser(oldData._id))
    resolve()
  }


  return (
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
        columns={columns}
        data={usersData}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />
    </div>
  );
}

export default CustomizedTable;