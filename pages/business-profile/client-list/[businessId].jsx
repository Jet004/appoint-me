import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

// Styles, UI and UX imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Layout from '../../../layout/layout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Spinner from '../../../components/spinner'
import Toast from '../../../components/toast'
import Typography from '@mui/material/Typography'

// Import icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import CloseIcon from '@mui/icons-material/Close'

import NewTempUserForm from '../../../forms/NewTempUserForm'


const Clients = () => {
    // Get businessId from url
    const router = useRouter()
    const businessId = router.query.businessId

    // State management
    const [modalState, setModalState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [clientList, setClientList] = useState(null)
    const [refreshList, setRefreshList] = useState(true)
    const [responseMessage, setResponseMessage] = useState(null)
    console.log("CLIENTLIST: ", clientList)

    // Get client list
    useEffect(() => {
        const requestHandler = async () => {
            try {
                // Start spinner
                setIsLoading(true)

                // Request client list
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/client-list/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()

                // Throw error if response is not ok
                if (!response.ok) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }

                // Request was susccessful, stop spinner
                setIsLoading(false) 

                // Set client list
                setClientList(data.clients)

                // Inform user
                setResponseMessage({
                    status: data.status,
                    message: data.message,
                    severity: "success"
                })

            } catch (err) {
                console.log(err)

                // Stop spinner
                setIsLoading(false)

                // Show error message
                setResponseMessage({
                    status: err.status,
                    message: err.message,
                    severity: "error"
                })
            }
        }

        if(businessId && refreshList) requestHandler()
        setRefreshList(false)

    }, [businessId, refreshList])

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
            {clientList && clientList.map((client, index) => (
                <Link href={"/business-profile/client-list/profile"}>
                    <ListItem key={index}>

                    </ListItem>
                </Link>
            ))}
        </List>

        <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
        <Spinner open={isLoading} dialogStyle={styles.spinDialog} spinStyle={styles.spinStyle} />

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
                <NewTempUserForm 
                    refreshClientList={() => setRefreshList(true)} 
                    closeDialog={() => setModalState(false)} 
                    businessId={businessId} 
                    setResponseMessage={setResponseMessage}    
                />
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
    },
    spinDialog: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    }
}