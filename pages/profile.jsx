import { useState, useContext } from 'react'
import Head from 'next/head'
import userContext from '../utility/appContext'

// Import Components
import Layout from '../layout/layout'
import ProfileLayout from '../layout/profileLayout'
import Toast from '../components/toast'


const Profile = () => {
    // Access user context
    const userData = useContext(userContext)

    const [responseMessage, setResponseMessage] = useState(null)

    return (
        <>
            <Head>
                <title>AppointMe: Profile</title>
            </Head>
            <Layout page="Profile">
                <ProfileLayout userData={userData} setResponseMessage={setResponseMessage} businessId={userData.user?.business?._id} />
                <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
            </Layout>
        </>
    )
}

export default Profile
