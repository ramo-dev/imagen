# imagen
## AI Image Generator

## Overview

This is a simple AI-powered image generator tool that allows users to convert text descriptions into images. The tool is implemented using JavaScript for the logic and CSS for styling.

## Features

- **Text-to-Image Conversion:** Convert your textual descriptions into images.
- **Image Quantity Selection:** Choose the number of images to generate.
- **Loading State:** Visual indication with loading animations while images are being generated.
- **Download Button:** Download the generated images.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ai-image-generator.git
    cd ai-image-generator
    ```

2. Open `index.html` in your web browser.

3. Describe your image in the input field, select the number of images, and click the "Generate" button.

## Usage

```javascript
// Include the script in your HTML file
<script src="script.js" defer></script>

// Use the following function to generate AI images
generateAiImages(UserPrompt, UserImageQuantity);

