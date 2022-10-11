import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FB_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FB_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FB_MSG_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
});
 
const storage = getStorage(app);
export default storage;