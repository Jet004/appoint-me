import { useState } from 'react'
import Head from 'next/head'

// Styles, UI and UX imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Layout from '../layout/layout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'

// Import icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import CloseIcon from '@mui/icons-material/Close'

import NewTempUserForm from '../forms/NewTempUserForm'


const Clients = () => {

    // State management
    const [modalState, setModalState] = useState(false)
    const [clientList, setClientList] = useState(true)
    console.log("CLIENTLIST: ", clientList)

  return (
    <>
        <Head>
            <title>AppointMe: Client List</title>
        </Head>
        <Layout page="Clients">
        <List>
            <ListSubheader sx={styles.clientList.header}>
                <IconButton sx={styles.clientList.addButton} variant="outlined" onClick={() => setModalState(true)}>
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
                <Divider sx={styles.clientList.divider} flexItem />
            </ListSubheader>
        </List>
        <Dialog sx={styles.formDialog} open={modalState} onClose={() => {setModalState(false)}}>
            <DialogTitle variant="h4" align="center">
            Add New Client
                <IconButton
                    aria-label="close"
                    onClick={() => setModalState(false)}
                    sx={styles.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <NewTempUserForm refreshClientList={() => setClientList(null)} closeDialog={() => setModalState(false)} />
            </DialogContent>
        </Dialog>
        </Layout>
    </>
  )
}

export default Clients

const styles = {
    clientList: {
        header: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        addButton: {
            alignSelf: 'flex-end',
        },
        divider: {
            borderColor: 'custom.contrastTextLight'
        }
    },
    formDialog: {
        color: "custom.constrastText" 
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: "custom.constrastText",
    }
}