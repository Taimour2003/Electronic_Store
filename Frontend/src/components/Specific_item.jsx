import { FaEye } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ChangeState,DeleteState } from "../redux/Slices/HoverSlice";
import { updateValue } from "../redux/Slices/AddToCart";
import { Link } from "react-router-dom";

const DisplaySpecificItem = ({ medical_picture, medical_title,medicine_price,id}) => {
  const flag=useSelector((state)=> state.Hover[id]);
  const currentValue=useSelector((state)=>state.addToCart.value);
  const dispatch=useDispatch();
  const update=()=>{
    dispatch(updateValue(currentValue+1))
  }
  return (
    <>
      <div>
        <div onMouseEnter={()=>dispatch(ChangeState({id,value:true}))} onMouseLeave={()=>dispatch(DeleteState({id}))}>
            <div style={{ height: "200px", position: "relative" }} >
              <img
                src={medical_picture}
                alt="category"
                className="w-full h-full"
                style={{ height: "200px",width:"200px" }}
              />
            </div>
            <div className="flex justify-end">
                <>
                  <div className="flex space-x-1.5">
                      <Link to={`/orderitem/${id}`} className={`bg-custom-green text-white rounded-full w-9 h-9 p-2 pl-2.5 ${flag?'animate-slide-up1':'opacity-0'}`}><FaEye /></Link>
                      <Link className={`bg-custom-green text-white rounded-full w-9 h-9 p-2 pl-2.5 ${flag?'animate-slide-up2':'opacity-0'}`} onClick={update}><FiShoppingCart /></Link>
                  </div>
                </>
            </div>
        </div>
        <div className="flex flex-col items-center mt-2">
            <div className="font-semibold">{medical_title}</div>
            <div className="text-custom-green font-bold">{medicine_price}</div>
        </div>            
      </div>
    </>
  );
};

export default DisplaySpecificItem;
