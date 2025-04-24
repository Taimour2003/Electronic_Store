import DisplaySpecificItem from './Specific_item.jsx'

const SpecificCategory=function({image}){
    return <>
    <div className="flex flex-between" style={{gap:"110px"}}>
     {image.map((img, index) => (
           <DisplaySpecificItem
             key={index}
             medical_picture={img.medicine_picture}
             medical_title={img.medicine_title}
             medicine_price={img.Prize}
             id={index}
           />
       ))}
    </div>
    </>
}

export default SpecificCategory;