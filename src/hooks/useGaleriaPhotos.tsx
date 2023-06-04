import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import 'firebase/compat/database';
import firebase, { db } from '../utils/firebase';
import { ref, onValue, set } from "firebase/database";
import { launchImageLibrary } from 'react-native-image-picker';

export const useGaleriaPhotos = () => {

    const [ imageURLs, setImageURLs ] = useState<string[]>([]);

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

            if (perfilName) {
                set(ref(db, `images_integrantes/${ perfilName }`), data.secure_url );
            }

            if (data.secure_url) {
                firebase
                    .database()
                    .ref('images')
                    .push(data.secure_url);
            }

        }).catch(err => {
            return (Alert.alert("An Error Occured While Uploading"))
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
        onValue(ref(db, 'images'), (snapshot) => {
            const data = snapshot.val();
            
            setImageURLs(Object.values(data));
        });
    }

    useEffect(() => {
        getAllPhotos();
    }, [])

    return {
        imageURLs,
        takePhotoFromGalery,
        cloudinaryUpload,
        getAllPhotos,
    }
}
