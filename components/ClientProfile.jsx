import ProfileLayout from '../layout/profileLayout'

const ClientProfile = ({ userData }) => {
    console.log("CLIENT PROFILE DATA: ", userData)
    return (
        <ProfileLayout userData={userData} />
    )
}

export default ClientProfile