import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//upload image to firebase storage and return profile url tp send to db
export async function uploadImageAsync(uri: string, email: string) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
        resolve(xhr.response);
        };
        xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const url = `${email}${Date.now()}.jpg`;
    const fileRef = ref(storage, url);
    await uploadBytes(fileRef, blob).catch((err) => console.log(err));

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
    }


//capture image added and show it to the user
export const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string>>) => {
// No permissions request is necessary for launching the image library
let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
});
if (!result.cancelled) {
    setImage(result.uri);
}
};