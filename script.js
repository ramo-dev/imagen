const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');
const OPEN_API_KEY = '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';
let isImageGenerating = false;

const updateImageCard = (imageDataArray) => {
    imageDataArray.forEach((imageObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".image-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        // set the image source to the ai generated image data
        const aiGeneratedImg =  `data:image/jpeg;base64,${imageObject.b64_json}`
        imgElement.src = aiGeneratedImg;

        // when the image is loaded remove the loading class and set download attributes
        imgElement.onload = () => {
            imgCard.classList.remove('loading');
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpeg`);
        }
    })
}

const generateAiImages = async (UserPrompt, UserImageQuantity) => {
    try{
        // send a request to OPENAI api to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${OPEN_API_KEY}`
    },
    body: JSON.stringify({
        prompt : UserPrompt,
        n : parseInt(UserImageQuantity),
        size : "512x512",
        response_format : "b64_json"
    })
});

console.log(response.status); // Log the HTTP status code

if (!response.ok) {
    const errorData = await response.json(); // Log the error details
    console.error("Error details:", errorData);
    throw new Error("Failed to generate images, please try again later.");
}

const { data } = await response.json();
console.log("API response:", data);

        updateImageCard([...data]);
        console.log(data);
    }
        
    catch(error){
        alert(error.message)
    }
    finally{
        isImageGenerating = false;
    }
}



const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerating) return;
        isImageGenerating = true;

    // Get user input and image quantity from the form
    const UserPrompt = e.srcElement[0].value;
    const UserImageQuantity = e.srcElement[1].value;

    // console.log(UserPrompt, UserImageQuantity);


    // Creating HTML markup for image card with loading state
    const ImageCardMarkup = Array.from({ length: UserImageQuantity }, () => {
        return `<div class="image-card loading">
            <img src="./assets/loading.svg" alt="image">
            <a href="" class="download-btn">
                <img src="./assets/d-button.svg" alt="download-btn">
            </a>
        </div>`;
    }).join("");

    imageGallery.innerHTML = ImageCardMarkup;
    generateAiImages(UserPrompt, UserImageQuantity);
}

generateForm.addEventListener('submit', handleFormSubmission);
