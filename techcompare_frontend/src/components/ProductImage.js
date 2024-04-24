import React from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";
import image13 from "../images/image13.jpg";
import image14 from "../images/image14.jpg";
import image15 from "../images/image15.jpg";
import image16 from "../images/image16.jpg";
import image17 from "../images/image17.jpg";
import image18 from "../images/image18.jpg";
import image19 from "../images/image19.jpg";
import image20 from "../images/image21.jpg";
import image21 from "../images/image21.jpg";
import image22 from "../images/image22.jpg";
import image23 from "../images/image23.jpg";
import image24 from "../images/image24.jpg";
import image25 from "../images/image25.jpg";
import image26 from "../images/image26.jpg";
import image27 from "../images/image27.jpg";
import image28 from "../images/image28.jpg";
import image29 from "../images/image29.jpg";
import image30 from "../images/image30.jpg";
import image31 from "../images/image31.jpg";
import image32 from "../images/image32.jpg";
import image33 from "../images/image33.jpg";






function ProductImage({ id }) { // Destructure id from props here

    // Create a map or object that associates ids with images
    const images = {
        1: image1,
        2: image2,
        3: image3,
        4: image4,
        5: image5,
        6: image6,
        7: image7,
        8: image8,
        9: image9,
        10: image10,
        11: image11,
        12: image12,
        13: image13,
        14: image14,
        15: image15,
        16: image16,
        17: image17,
        18: image18,
        19: image19,
        20: image20,
        21: image21,
        22: image22,
        23: image23,
        24: image24,
        25: image25,
        26: image26,
        27: image27,
        28: image28,
        29: image29,
        30: image30,
        31: image31,
        32: image32,
        33: image33,

        // Add more images as needed
    };

    // Select the image based on the id prop
    const imageToDisplay = images[id];

    return(
        <div style={{display: 'flex', height: '100%', justifyContent:"center", alignItems:"center"}}>
            {/* Render the selected image */}
            <img src={imageToDisplay} alt={`Product Image ${id}`} style={{ maxHeight: '100%', width: 'auto'}}/>
        </div>
    );
}

export default ProductImage;
