export const buildAddress = (addressObject) => {
    let address = ''
    if(addressObject?.unit) {
        address += `${addressObject.unit}/`
    }
    if(addressObject?.streetNumber) {
        address += `${addressObject.streetNumber}`
    }
    if(addressObject?.streetName) {
        address += ` ${addressObject.streetName}`
    }
    if(addressObject?.city) {
        address += `, ${addressObject.city}`
    }
    if(addressObject?.state) {
        address += `, ${addressObject.state}`
    }
    if(addressObject?.postCode) {
        address += `, ${addressObject.postCode}`
    }
    if(addressObject?.country) {
        address += `, ${addressObject.country}`
    }
    return address
}

export const buildUserForm = (form) => {
    return {
        fname: form.fname,
        lname: form.lname,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        address: {
            unit: form.unit,
            streetNumber: form.streetNumber,
            streetName: form.streetName,
            city: form.city,
            state: form.state,
            postCode: form.postCode,
            country: form.country,
        }
    }
}