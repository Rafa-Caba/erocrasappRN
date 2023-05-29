import { useState, useEffect } from 'react';

import 'firebase/compat/database';
import { getDatabase, ref, onValue, set } from "firebase/database";

import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';

export const useGaleriaPhotos = () => {
    
    const db = getDatabase();
    const [ imageURLs, setImageURLs ] = useState<string[]>([]);
    const [ loadingImages, setloadingImages ] = useState(false)

    const cloudinaryUpload = ( photo: any, perfilName?: string ) => {
        const data = new FormData()
            data.append('file', photo)
            data.append('upload_preset', 'eroCrasphotos')
            data.append("cloud_name", "dr6b4izzt")

        fetch("https://api.cloudinary.com/v1_1/dr6b4izzt/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
        .then(data => {

            const urlFirebase = perfilName ? `images/integrantes/${ perfilName }` : 'images';

            set(ref(db, urlFirebase), data.secure_url );

        }).catch(err => {
            Alert.alert("An Error Occured While Uploading")
            console.log(err)
        })
    }

    const takePhotoFromGalery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7
        }, (resp) => {
            if ( resp.didCancel ) return;
            if ( !resp.assets?.[0].uri ) return;

            const uri = resp.assets[0].uri;
            const type = resp.assets[0].type;
            const name = resp.assets[0].fileName;
            const source = { uri, type, name }

            cloudinaryUpload(source);

        });
    }

    const getAllPhotos = () => {
        onValue(ref(db, `images`), (snapshot) => {
            const data: string[] = snapshot.val();
            
            setImageURLs( Object.values(data) );
        });
    }

    return {
        imageURLs,
        takePhotoFromGalery,
        cloudinaryUpload,
        loadingImages,
        getAllPhotos,
    }
}
