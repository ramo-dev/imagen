const generateForm = document.querySelector('.generate-form');
const imageGallery = document.querySelector('.image-gallery');
const OPEN_API_KEY = ''

const generateAiImages = async (UserPrompt, UserImageQuantity) => {
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${OPEN_API_KEY}`
        },
        body: JSON.stringify({
            prompt : UserPrompt,
            n : UserImageQuantity,
            size : "512x512",
            response_format : "b64_json"
        })
    })
    }
    catch(error){
        console.log(error)
    }
}



const handleFormSubmission = (e) => {
    e.preventDefault();


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
