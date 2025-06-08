import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import bgPromo from '../../assets/bgPromo.svg';
import useCart from '../../hooks/useCart.js';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, error } = useSelector((state) => state.products); // Usar Redux para obtener productos
  const { addToCart } = useCart();

  const product = products.find((product) => product.id === parseInt(id, 10));

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className='flex-wrap md:flex-row lg:flex-wrap anyBox justify-center md:justify-start md:place-content-start hidden md:flex'>

      <div className='w-[330px] h-[619px] lg:w-[483px] lg:h-[684px] justify-start place-content-start mr-5 mb-5'>
        <div className='bg-fourty w-[330px] h-[619px] lg:w-[425px] lg:h-[621px] md:ml-5 lg:ml-10' style={{backgroundImage: `url(${bgPromo})`}}>
          <h1 className='text-5xl md:text-7xl p-4 mb-20'>Esta es la promo numero uno de <span className='font-extrabold italic'>hoy</span>.</h1> 
          <Link to="/" className='p-4 underline'>Explora mas...</Link>
        </div>
      </div>

      <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>
        <div key={product.id} className='bg-fourty/50 w-[330px] h-[800px] md:w-[490px] md:h-[px] lg:w-[905px] lg:h-[413px] flex flex-wrap justify-center place-content-start'>
          <div className='w-[330px] h-[475px] p-5'>
            <div className='mb-5 font-extrabold'>{product.name}</div>
            <p className='text-sm mb-5'>Lorem ipsum dolor,vitae! Facilis officiis animi ut odit! Deserunt officiis excepturi sequi quaerat in nesciunt quae non illum aspernatur.</p>
            <p className="ml-2 p-1 font-semibold">
              Precio: ${product.salePrice ? product.salePrice : 'No disponible'}
            </p>
            <div className='flex flex-wrap justify-between place-content-start p-5'>
              <button className="btn btn-primary p-2 mb-5" onClick={() => handleAddToCart(product)}>
                Agregar al carrito
              </button>
            </div>
          </div>
          <img src={product.imageUrl} alt="" height="348px" width="330px" />
        </div>

        <div className='anyBox'>
          <div className='bg-white w-[330px] h-[100px] md:w-[490px] md:h-[79px] lg:w-[898px] lg:h-[79px] justify-center place-content-center anyBox'>
            <h1 className='bg-fourty w-[292px] h-[50px] md:w-[482px] md:h-[45px] rounded-md justify-center place-content-center anyBox'>Adquirir mas productos...</h1>
          </div>

          <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>
            {error && <p>{error}</p>}

            {products.map((product) => (
              <div key={product.id} className='bg-fourty/50 w-[249px] h-[550px] m-1'>
                <img src={product.imageUrl} alt="" width="249px" height="250px" />
                <h1 className='font-bold ml-2'>{product.name}</h1>
                <p className="ml-2 p-1 font-semibold">
                  Precio: ${product.salePrice ? product.salePrice : 'No disponible'}
                </p>
                <div className='text-sm flex flex-wrap space-x-1 p-1'>
                  <Link className='btn-primary p-2 mb-5' to={`/productDetails/${product.id}`}>Details...</Link>
                  <button className="btn btn-primary p-2 mb-5" onClick={() => handleAddToCart(product)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;