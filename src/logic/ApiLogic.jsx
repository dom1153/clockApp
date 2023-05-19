import { useState } from "react";
import { createClient } from 'pexels'; // image api

const USE_PEXEL = 1;
const PEXEL_KEY = 'cQZFlBBLtOaChAmnKf8OYhtoAkLGEOX4RCFax3DjqRnlm1NLdV8VvLne';

const ApiLogic = () => {
    const [pexelPhoto, setPexelPhoto] = useState({
        img_url: "https://images.pexels.com/photos/16814271/pexels-photo-16814271.jpeg", 
        photographer_name: "Kubra K.", 
        photographer_url: "https://www.pexels.com/@hkubrakisa"
    });

    function getCuratedPexelPhoto() {
        if (USE_PEXEL) 
        {
            const client = createClient(PEXEL_KEY);
            client.photos.curated({ per_page: 1 }).then(res => {
                let photo = res.photos[0];
                console.log(photo);
                setPexelPhoto({
                img_url: photo.src.original, 
                photographer_name: photo.photographer, 
                photographer_url: photo.photographer_url
                })
                // https://images.pexels.com/photos/16814271/pexels-photo-16814271.jpeg
            });
        }
    }

    return {
        getCuratedPexelPhoto,
        pexelPhoto
    }
}

export default ApiLogic;