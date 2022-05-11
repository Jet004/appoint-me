import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import localForage from 'localforage'

// Import form components
import NewServiceForm from '../../../forms/NewServiceForm'

// Import components
import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Layout from '../../../layout/layout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ResponsiveDialog from '../../../components/ResponsiveDialog'
import ServiceDetail from '../../../components/ServiceDetail'
import Spinner from '../../../components/spinner'
import Toast from '../../../components/toast'
import Typography from '@mui/material/Typography'

// Import icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


const ServiceList = () => {
    // Get businessId from url
    const router = useRouter()
    const businessId = router.query.businessId

    // State management
    const [modalState, setModalState] = useState(false) // Add new service
    const [serviceModalOpen, setServiceModalOpen] = useState(false) // Service detail modal
    const [serviceModalData, setServiceModalData] = useState(null) // Selected service details
    const [serviceList, setServiceList] = useState(null)
    const [refreshList, setRefreshList] = useState(true) // Changes to this state will force a refresh of the list of services
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)
console.log(serviceList, responseMessage)
    // Get client list
    useEffect(() => {
        const requestHandler = async () => {
            try {
                // Start spinner
                setIsLoading(true)

                // Request service list
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/services/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
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
                setServiceList(data.services)
                // If the service modal is open then update modal data
                if(serviceModalData) {
                    setServiceModalData(data.services.filter(service => service._id === serviceModalData._id)[0])
                }

               // Don't set a response message as loading the client list is expected to be successful on page load
                
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

        if(businessId && refreshList) {
            requestHandler()
            setRefreshList(false)
        }

    }, [businessId, refreshList])

  return (
    <>
        <Head>
            <title>AppointMe: Services</title>
        </Head>
        <Layout page="Services">
            <Box sx={styles.innerBox}>
                <List>
                    <ListSubheader sx={styles.serviceList.header} >
                        <Box  sx={styles.serviceList.header.detail}>
                            <Box>Services: {serviceList ? serviceList.length : 0}</Box>
                            <IconButton variant="outlined" onClick={() => setModalState(true)}>
                                <AddCircleOutlineRoundedIcon sx={styles.serviceList.addIcon} />
                            </IconButton>
                        </Box>
                        <Divider sx={styles.serviceList.divider} flexItem />
                    </ListSubheader>
                    {serviceList && serviceList.map((service, index) => (
                        <Box 
                            sx={styles.serviceList.link} 
                            key={index}
                            onClick={() => {setServiceModalOpen(true); setServiceModalData(service)}}
                        >
                            <ListItem sx={styles.serviceList.listItem}>
                                <ListItemText 
                                    primary={`${service.name}`} 
                                    secondary={service.description.length > 40 ? service.description.slice(0, 40) + '...' : service.description} 
                                    primaryTypographyProps={{variant: "h5"}}
                                    secondaryTypographyProps={{variant: "caption"}}
                                />
                                <ArrowForwardIosRoundedIcon />
                            </ListItem>
                            <Divider sx={styles.serviceList.divider} flexItem variant='middle' />
                        </Box>
                    ))}
                    <Typography sx={styles.serviceList.caption} variant="caption" component='div' align="center">-- END OF LIST --</Typography>
                </List>
            </Box>

            <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
            <Spinner open={isLoading} dialogStyle={styles.spinDialog} spinStyle={styles.spinStyle} />
 
            <ResponsiveDialog sx={styles.formDialog} open={modalState} onClose={() => setModalState(false)}>
                <DialogTitle variant="h4" align="center">
                    Add New Service
                </DialogTitle>
                <DialogContent>
                    <NewServiceForm
                        refreshServiceList={() => setRefreshList(true)} 
                        closeDialog={() => setModalState(false)} 
                        businessId={businessId} 
                        setResponseMessage={setResponseMessage}    
                    />
                </DialogContent>
            </ResponsiveDialog>
            <ResponsiveDialog
                open={serviceModalOpen}
                onClose={() => {setServiceModalOpen(false); setServiceModalData(null);}}
            >
                <ServiceDetail
                    serviceData={serviceModalData}
                    refreshServiceList={() => setRefreshList(true)} 
                    businessId={businessId}
                    setIsLoading={setIsLoading}
                    setResponseMessage={setResponseMessage}
                    closeDialog={() => setServiceModalOpen(false)}
                />
            </ResponsiveDialog>
        </Layout>
    </>
  )
}

export default ServiceList

const styles = {
    innerBox: {
        maxWidth: 500,
        mx: 'auto',
        px: 0,
        mt: {sm: 3},
    },
    serviceList: {
        width: "100%",
        header: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            detail: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        },
        addIcon: {
            fontSize: '2rem',
        },
        divider: {
            borderColor: 'custom.contrastTextLight'
        },
        listItem: {
            color: 'custom.contrastText',
            px: 3,
            '&:hover': {
                color: "custom.contrastTextStrong",
                backgroundImage: (theme) => theme.palette.custom.gradient.light,
            },
        },
        link: {
            textDecoration: 'none',
            "&:hover .MuiDivider-root": {
                borderColor: 'custom.contrastText'
            }
        },
        caption: {
            py: 1,
            color: 'custom.contrastText',
        }
    },
    formDialog: {
        color: "custom.constrastText" 
    },
    spinDialog: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    },

}