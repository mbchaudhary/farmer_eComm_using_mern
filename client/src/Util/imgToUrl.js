export default async function uploadFileUsingCludinaryAPI  (e){
    try{
        const formData = new FormData();
        formData.append('file',  e.target.files[0]);
        formData.append('upload_preset', "Image_preset");

        const res = await fetch(`https://api.cloudinary.com/v1_1/di2ngtc70/image/upload`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json(arguments);
        return data.secure_url;

    }catch(error){
        console.log(error.message);
    
    }  
    return "";
 }