import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Import Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'

// Import Icons
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded'

// Define validation rules
const validationSchema = yup.object().shape({
    profilePicture: yup.mixed()
        .required("Please select a file to upload")
        .test("fileSize", "File size is too large", value => value && value[0].size <= (2 * 1024 * 1024))
        .test("fileType", "File type is not supported", value => {console.log("VALUE: ", value); return value && ["image/jpeg", "image/jpg", "image/png"].includes(value[0].type)})
})

export default function UploadDpForm({ closeDialog }) {

    const { handleSubmit, register, formState: { errors }, getValues, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const watchFile = watch("profilePicture", "")

    // Send request to backend to upload image
    const handleUpload = (data) => {
        console.log("GETVALUES: ", getValues(), "DATA: ", data.profilePicture[0])
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
            {console.log("WATCHFILE: ", watchFile)}
            {console.log("ERRORS: ", errors)}
            <FormHelperText error={!!errors.profilePicture}>
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
    }
}