import img1 from "../../assets/product-Prueba1.jpg";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="flex flex-wrap justify-center place-content-center h-full">
      <div className="w-[330px] h-[658px] mb-5 justify-center place-content-center text-sm anyBox">
        <h1 className="btn-primary w-[215px] h-[48px] justify-center place-content-center p-2 mb-5">
          Tus Pedidos ...
        </h1>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 1
        </div>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 2
        </div>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 3
        </div>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 4
        </div>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 5
        </div>
        <div className="bg-fourty mb-5 w-[215px] h-[40px] rounded-sm place-content-center p-2">
          Acordion 6
        </div>
      </div>
      <div className="w-[330px] h-screen md:w-[527px] lg:[1040px]">
        <div className="bg-fourty/50 w-[249px] h-[550px] m-1 justify-center">
          <img src={img1} alt="" width="249px" height="250px" />
          <h1 className="font-bold ml-2">Title description</h1>
          <p className="ml-2 p-1 font-semibold">Precio: ${"No disponible"}</p>
          <div className="text-sm flex flex-wrap space-x-1 p-1">
            <Link className="btn-primary p-2 mb-5">Details...</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
