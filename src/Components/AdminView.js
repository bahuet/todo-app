import React from 'react'
import CreateTodoForm from './CreateTodoForm'
import CreateUserButton from './CreateUserButton'
import useInput from '../useHooks/useInput'
import { Typography, TextField, Grid, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import TodoListWrapper from './TodoListWrapper'

const AdminView = ({ users, todos, setStatus }) => {



  const tasksFilter = useInput()

  const filteredTasks = todos.todoList
    .filter(td => td.text.toLowerCase().includes(tasksFilter.input.toLowerCase()))


  const filteredUsers = [...new Set(filteredTasks.map(x => x.user))]
  // this is to maintain original user array order
  const usersToShow = tasksFilter.input === '' ? users.userList : users.userList.filter(u => filteredUsers.includes(u))


  // TODO: un peu brouillon 

  return (
    <div>
      <Typography variant='h4'>Administration panel </Typography>

      <Grid container spacing={2} justify="space-around"   >

        <Grid item>
          <CreateTodoForm actions={todos.adminActions} users={users} setStatus={setStatus} />
        </Grid>

        <Grid item >
          <Typography>Ajouter un utilisateur:</Typography>      <CreateUserButton users={users} setStatus={setStatus} />
        </Grid>

      </Grid>

      <Grid container spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch">

        <Grid item xs={12} >

          <TextField
            label="Recherche" placeholder='ex: "fournisseur"' size="small"
            variant="filled" onChange={tasksFilter.onChange} value={tasksFilter.input} InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }} />

        </Grid>

        {usersToShow.map((user, i) => (

          <TodoListWrapper user={user} actions={todos.adminActions}
            setStatus={setStatus} deleteUser={() => users.deleteUser(user)}
            filteredTasks={filteredTasks} key={user + i} />
        ))}

      </Grid>
      {usersToShow.length === 0 ? <Typography variant='h5'>Pas de résultats</Typography> : null}
    </div >
  )
}

export default AdminView