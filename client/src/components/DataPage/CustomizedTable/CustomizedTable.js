import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { createUser, getUsers, deleteUser, updateUser } from '../../../actions/users.js'
import { createSociety, getSocieties, deleteSociety, updateSociety } from '../../../actions/societies.js'

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

import './CustomizedTable.css';

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


const CustomizedTable = (props) => {
  const dispatch = useDispatch()
  var actions, columns, data;

  useEffect(() => {
    console.log("not useEffect")
    dispatch(actions.getEntities())
  }, [dispatch, props.mode, actions])

  const entities = useSelector((state) => state[props.mode])


  if (props.mode === "users") {
    actions = {
      getEntities: getUsers,
      createEntity: createUser,
      updateEntity: updateUser,
      deleteEntity: deleteUser
    }

    columns = [
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
    
    data = entities.map((entity) => { return { ...entity, password: '********' } })

  } else if(props.mode === "societies"){
    actions = {
      getEntities: getSocieties,
      createEntity: createSociety,
      updateEntity: updateSociety,
      deleteEntity: deleteSociety
    }

    columns = [
      { title: "id", field: "id", hidden: true },
      { title: "Avatar", render: rowData => <Avatar /> },
      { title: "Name", field: "username" },
      { title: "Email", field: "email" },
      { title: "Admin", field: "admin" },
      { title: "Admin Username", field: "adminUsername" },
      { title: "President", field: "president" },
      { title: "President Username", field: "presidentUsername" },
      { title: "Role", field: "role" },
      { title: "Since", field: "since" },
    ]

    data = entities
  }

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  const validations = (newData, resolve, mode) => {
    //validation
    let errorList = []

    // Checks if user already exists
    if (mode === "new") {
      let entityExists = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === newData.username) {
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
      if (Object.keys(newData).length > columns.length - 3) {
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

    if (!validateEmail(newData.email)) {
      errorList.push("Please enter a valid email address")
    }

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
    const fields = { ...newData, __v: true }
    let noError = validations(fields, resolve, "update")
    if (noError) { //no error
      dispatch(actions.updateEntity(oldData._id, newData))
      resolve()
      setIserror(false)
      setErrorMessages([])
    }
  }

  const handleRowAdd = (newData, resolve) => {
    let noError = validations(newData, resolve, "new")
    if (noError) { //no error
      dispatch(actions.createEntity(newData))
      resolve()
      setErrorMessages([])
      setIserror(false)

    }
  }

  const handleRowDelete = (oldData, resolve) => {
    dispatch(actions.deleteEntity(oldData._id))
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
        data={data}
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