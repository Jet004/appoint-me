import { useState, useContext } from 'react'
import Head from 'next/head'

// Import Components
import Layout from '../layout/layout'
import ProfileLayout from '../layout/profileLayout'
import Toast from '../components/toast'


// User data
import userContext from '../utility/mockData/appContext'

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
                <ProfileLayout userData={userData} setResponseMessage={setResponseMessage} />
                <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
            </Layout>
        </>
    )
}

export default Profile
