import { useState, useContext } from "react"
import userContext from "../utility/appContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import localForage from 'localforage'

// Import Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Spinner from "../components/spinner"
import Toast from "../components/toast"

// Import Icons
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'

// Define validation rules
const validationSchema = yup.object().shape({
    profilePicture: yup.mixed()
        .test("required", "Please select a file", value => value && value?.length > 0)
        .test("fileSize", "File size must be below 2MB", value => {
            if(!value.length) return false
            return value && value[0].size <= (2 * 1024 * 1024)
        })
        .test("fileType", "File type is not supported", value => {
            if(!value.length) return false
            console.log("TYREVALIDATION: ", value[0].type)
            return value && ["image/jpeg", "image/jpg", "image/png"].includes(value[0]?.type)
        }) 
})

export default function UploadDpForm({ closeDialog, reload }) {
    // Access user context
    const userData = useContext(userContext)

    // Initialize form state management
    const { handleSubmit, register, formState: { errors }, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const watchFile = watch("profilePicture", "")
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    // Send request to backend to upload image
    const handleUpload = (image) => {
        // Async function: send image to backend
        const sendRequest = async (image) => {
            try {
                // Start spinner
                setIsLoading(true)

                // Prepare the file for transmission
                const formData = new FormData()
                console.log("FILE: ", image)
                formData.append("file", image)

                // Send image to backend
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile-picture/${userData.user._id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${await localForage.getItem("accessToken")}`
                    },
                    body: formData
                })
                // Parse response
                const data = await response.json()
                
                // Return error if request failed
                if(!response.ok) {
                    throw {
                        status: data.status,
                        message: data.message,
                    }
                }

                // Request was successful, stop spinner inform the user
                setIsLoading(false)
                setResponseMessage({
                    status: data.status,
                    message: data.message,
                    severity: "success"
                })

                // force the avatar to reload
                reload()
                // Close the dialog
                closeDialog()

            } catch (err) {
                // Log the error to console then show user the error message
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

        sendRequest(image.profilePicture[0])
    }

    return (
        <Box as="form" sx={styles.form} onSubmit={handleSubmit(handleUpload)}>
            <Button 
                sx={styles.chooseButton} 
                fullWidth
                variant="outlined" 
                component="label"
            >
                <input
                    hidden
                    name="profilePicture" 
                    type="file"
                    multiple={false}
                    {...register("profilePicture")}
                />
                <AddPhotoAlternateRoundedIcon sx={styles.uploadIcon} />
                { (watchFile && watchFile[0] != undefined) ? watchFile[0]?.name : "Select a file..."}
            </Button>
            <FormHelperText error={!!errors.profilePicture}>
                {console.log("ERRORS: ", errors)}
                {!!errors.profilePicture && errors?.profilePicture?.message}
            </FormHelperText>
            <Button 
                sx={styles.submitButton}
                fullWidth 
                type="submit" 
                variant="contained"
            >
                <FileUploadOutlinedIcon /> Upload
            </Button>
            <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
            <Spinner open={isLoading} dialogStyle={styles.spinDialog} spinStyle={styles.spinStyle} />
        </ Box>
    )
}

const styles= {
    form: {
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
    },
    submitButton: {
        my: 3,
    },
    uploadCont: {
        display: "flex",
        alignItems: "center",
    },
    chooseButton: {
        py: 1,
        pr: 3,
    },
    uploadIcon: {
        mr: 3
    },
    spinDialog: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    }
}