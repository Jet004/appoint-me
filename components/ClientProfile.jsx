import ProfileLayout from '../layout/profileLayout'

const ClientProfile = ({ userData, businessId, refreshClientList, setResponseMessage, closeDialog }) => {

    return (
        <ProfileLayout
            userData={userData} 
            businessId={businessId} 
            refreshClientList={refreshClientList} 
            setResponseMessage={setResponseMessage}
            closeDialog={closeDialog}
        />
    )
}

export default ClientProfile