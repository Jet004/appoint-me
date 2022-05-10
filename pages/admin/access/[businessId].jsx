import { useState, useEffect, useContext } from "react"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import userContext from "../../../utility/appContext"
import localForage from "localforage"

// Import components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FeatureBox from '../../../components/featureBox'
import IconButton from '@mui/material/IconButton'
import Layout from '../../../layout/layout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Spinner from '../../../components/spinner'
import TextField from '@mui/material/TextField'
import Toast from '../../../components/toast'
import Typography from "@mui/material/Typography"

// Import icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import ClearIcon from '@mui/icons-material/Clear';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'


// Define form validation schema
const validationSchema = yup.object().shape({
    ip: yup.string()
        .required("IP address is required")
        .matches(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, "Invlaid IP address (IPv4 only)")
})

const Access = () => {
    // Access global user context
    const userData = useContext(userContext)
    const businessId = userData?.user?.business?._id

    // Manage State
    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ip: ""
        }
    })
    const [ipList, setIpList] = useState(null)
    const [needIPRefresh, setNeedIPRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    useEffect(() => {
        const requestHandler = async () => {
            try {
                // Send request to get ip list
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/admin/access/ip/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()

                // Throw error if request failed
                if (response.status !== 200) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }

                // Response was successful, set IP list
                setIpList(data.ipList)

            } catch (error) {
                console.log(error)
            }
        }

        if(businessId) requestHandler()
    }, [businessId, needIPRefresh])

    // Add new IP address
    const handleAddIP = () => {
        const handleRequest = async () => {
            try {
                // Get form values
                const ip = getValues('ip')
                
                // Start spinner
                setIsLoading(true)

                // Send request to add ip
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/admin/access/ip/${businessId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({
                        ip
                    })
                })
                const data = await response.json()

                // Throw error if request failed
                if (response.status !== 201) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }

                // Stop spinner
                setIsLoading(false)

                // Request was successful, force IP list to reload
                setNeedIPRefresh(!needIPRefresh)

                // Inform user of success
                setResponseMessage({
                    status: data.status,
                    message: data.message,
                    severity: "success"
                })

            } catch (error) {
                console.log(error)

                // Stop spinner
                setIsLoading(false)

                // Inform user of error
                setResponseMessage({
                    status: error.status,
                    message: error.message,
                    severity: "error"
                })
            }
        }

        // Trigger request
        handleRequest()
    }

    const handleDeleteIP = async (ip) => {
        try {
            // Start spinner
            setIsLoading(true)

            // Send request to delete IP
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/admin/access/ip/${businessId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    ip: ip
                })
            })
            
            // Throw error if request failed
            if (response.status !== 204) {
                const data = await response.json()
                throw {
                    status: data.status,
                    message: data.message
                }
            }

            // Stop spinner
            setIsLoading(false)

            // Request was successful, force IP list to reload
            setNeedIPRefresh(!needIPRefresh)

            // Inform user of success
            setResponseMessage({
                message: "IP address deleted",
                severity: "success"
            })

        } catch (error) {
            console.log(error)

            // Stop spinner
            setIsLoading(false)

            // Inform user of error
            setResponseMessage({
                status: error.status,
                message: error.message,
                severity: "error"
            })
        }
        console.log(`DELETE FIRED FOR IP:`, ip)
    }

    return (
        <Layout page="Access Controls">
            <Box sx={styles.innerBox}>
                <FeatureBox
                    sx={styles.featureBox}
                    title="Allowed IP Addresses"
                    iconLeft={<StorageRoundedIcon />}
                    // iconRight={<AddCircleOutlineRoundedIcon />}
                    // clickRightIcon={() => console.log("CLICKED EDIT ICON!")}
                >
                    <Box sx={styles.formBox} as="form" onSubmit={handleSubmit(handleAddIP)}>
                        <Controller
                            name="ip"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    sx={styles.formText}
                                    name="ip"
                                    label="IP Address"
                                    variant="outlined"
                                    size="small"
                                    type="input"
                                    { ...field }
                                    error={!!errors.ip}
                                    helperText={!!errors.ip && errors.ip.message}
                                />
                            )}
                        />
                        <Button variant="outlined" type="submit">Add IP Address</Button>
                    </Box>
                    <Box sx={styles.rep}>
                        <Typography sx={styles.rep.repName} variant="h5">{`${userData.user.fname} ${userData.user.lname}:`}</Typography>
                        <List sx={styles.ipList} disablePadding>
                            {ipList && ipList.map((ip, index) => (
                                <ListItem key={index} secondaryAction={
                                    <>
                                        {/* Only show delete button if there is more than one IP address in list */}
                                        { (ipList.length > 1) && (
                                            <IconButton edge="start" aria-label="delete" color="error" onClick={() => handleDeleteIP(ip.ip)}>
                                                <ClearIcon />
                                            </IconButton>
                                        )}
                                    </>
                                }>
                                    <ListItemText primary={ip.ip} />

                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </FeatureBox>
            </Box>

            <Spinner open={isLoading} />
            <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />

        </Layout>
    )
}

export default Access

const styles = {
    innerBox: {
        px: 2,
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    featureBox: {
        minHeight: 300,
        px: 1,
        pb: 2,
    },
    formBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        py: 2,
        px: 1,
        my: 2,
        mx: 'auto',
        width: '95%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    formText: {
        width: '45%',
    },
    rep: {
        display: 'flex',
        color: "custom.contrastText",
        repName: {
            my: 1,
            mx: 3,
        },
    },
    ipList: {
        width: '45%',
        margin: '0 auto',
        "&.MuiList-root": {
            margin: 0,
        },
    },
}