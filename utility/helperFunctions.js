export const buildAddress = (addressObject) => {
    let address = ''
    if(addressObject.unit) {
        address += `${addressObject.unit}/`
    }
    if(addressObject.streetNumber) {
        address += `${addressObject.streetNumber}`
    }
    if(addressObject.streetName) {
        address += ` ${addressObject.streetName}`
    }
    if(addressObject.city) {
        address += `, ${addressObject.city}`
    }
    if(addressObject.state) {
        address += `, ${addressObject.state}`
    }
    if(addressObject.postCode) {
        address += `, ${addressObject.postCode}`
    }
    if(addressObject.country) {
        address += `, ${addressObject.country}`
    }
    return address
}