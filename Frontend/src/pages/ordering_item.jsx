import { useParams } from "react-router-dom";
import { useContext } from "react";
import {ImagesContext} from '../store/ContextStore'
const Showitem=()=>{
    const {images}=useContext(ImagesContext);
    const {id}=useParams();
    let imageid=parseInt(id,10);
    imageid+=1
    let image=images.find(image=>image.id===imageid);
    return (  
        <div>
            <div className="flex">
                <div>
                    <img src={image.medicine_picture} alt="medicine_picture"/>
                </div>
                <div>
                    {image.medicine_title}
                </div>
                <div>
                     {image.Prize}
                </div>
            </div>
        </div>
    )
}

export default Showitem;