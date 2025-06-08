import homeImage from '../../assets/Home1.jpg';

const CardHome = () => {
  return (
    <div
      className=" relative ml-20 bg-[length:1336px_606px] bg-no-repeat lg:w-[1336px] lg:h-[606px] md:w-[652px] md:h-[640px] w-[323px] h-[537px] rounded-t-lg text-white flex items-center justify-center anyBox overflow-hidden"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      <div className='relative z-10 p-4'>
      <h1 className=' text-4xl md:text-7xl mb-5'><span className='font-extrabold italic'>Embark</span> on Your Next Adventure...</h1>
      <p className='text-sm md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus minus sapiente, cumque fugiat consectetur quia facilis distinctio, libero officiis, incidunt earum. Labore quasi quibusdam fugit tenetur laborum neque dolore nulla.</p>
      </div>
    
    </div>
  ); 
};

export default CardHome;
