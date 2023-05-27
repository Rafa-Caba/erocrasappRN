import React, { createContext, useEffect, useState } from 'react';

import { auth } from '../utils/firebase';
import { User } from 'firebase/auth';

type EroCrasContextProps = {
    user: User | undefined;
    loadingImage: boolean;
}

export const EroCrasContext = createContext({} as EroCrasContextProps);

export const EroCrasProvider = ({ children }: any ) => {

    const [ user, setUser ] = useState<User | undefined>();
    const [ loadingImage, setLoadingImage ] = useState(false);
    // const [ imageNames, setImageNames ] = useState<string[]>();

    useEffect(() => {
        if ( auth.currentUser !== null ) {
            setUser(auth.currentUser);
        }
    }, [])

    // const uploadImage = async( data: ImagePickerResponse ) => {

    //     setLoadingImage(true);
        
    //     const fileToUpload = {
    //         base64: data.assets![0].base64,
    //         type: data.assets![0].type,
    //         name: data.assets![0].fileName,
    //     }

    //     // setImageNames([ ...imageNames!, fileToUpload.name! ])

    //     try {

    //         const storageRef = ref(storage, `images/${ fileToUpload.name }`);

    //         const metadata = {
    //             contentType: 'image/jpeg',
    //         };

    //         // const base64Data = fileToUpload.base64;
    //         // const base64Resp = await fetch(base64Data!);

    //         // const blob = await base64Resp.blob();

    //         // 'file' comes from the Blob or File API
    //         // uploadBytes(storageRef, blob, metadata).then((snapshot) => {
    //         //     console.log('Uploaded a file!');
    //         // });
            
    //         setLoadingImage(false);

    //     } catch (error) {
    //         console.log(error)
    //         setLoadingImage(false);
    //     }        
    // };

    return(
        <EroCrasContext.Provider value={{
            user,
            loadingImage,
        }}>
            { children }
        </EroCrasContext.Provider>
    )
}



