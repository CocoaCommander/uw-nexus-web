

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}


function isValidPhoneNumber(phone) {
    const unformatted = /^\d{10}$/; 
    const USFormat = /^\d{3}-\d{3}-\d{4}$/;
    const USFormatWithParens = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    const USFormatWithDots = /^\d{3}\.\d{3}\.\d{4}$/;
    const internationalFormat = /^\+\d{1,3} \d{1,3} \d{4,}$/;
  
    return unformatted.test(phone) 
        || USFormat.test(phone) 
        || USFormatWithParens.test(phone) 
        || USFormatWithDots.test(phone) 
        || internationalFormat.test(phone);
}
  

module.exports = { isValidEmail, isValidPhoneNumber }