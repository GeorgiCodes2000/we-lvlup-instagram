/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase.config.js'

function Upload() {
    const [selectedImage, setSelectedImage] = useState<File | undefined>()

    // This function will be triggered when the file field change
    const imageChange = (e: Event) => {
        const input = e.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            setSelectedImage(input.files[0])
        }
    }

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage(undefined)
    }

    // const imagesListRef = ref(storage, 'avatars/')
    // const uploadFile = () => {
    //     if (selectedImage == null) return
    //     const imageRef = ref(storage, `images/${selectedImage.name}`)
    //     uploadBytes(imageRef, selectedImage).then((snapshot) => {
    //         getDownloadURL(snapshot.ref)
    //             .then((url) => {})
    //             .catch((error) => console.log(error))
    //     })
    // }

    return (
        <div>
            <input
                accept="image/*"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    imageChange(e as unknown as Event)
                }}
            />

            {selectedImage && (
                <div>
                    <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
                    <button type="button" onClick={removeSelectedImage}>
                        Remove This Image
                    </button>
                </div>
            )}
        </div>
    )
}

export default Upload
