import { useState, useEffect } from "react";

const Average = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 15) {
          clearInterval(intervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId2 = setInterval(() => {
      setCount2((prevCount) => {
        if (prevCount >= 15345) {
          clearInterval(intervalId2);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 0.005); 
    return () => clearInterval(intervalId2);
  }, []);

  useEffect(() => {
    const intervalId3 = setInterval(() => {
      setCount3((prevCount) => {
        if (prevCount >= 33) {
          clearInterval(intervalId3);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 100);
    return () => clearInterval(intervalId3);
  }, []);

  useEffect(() => {
    const intervalId4 = setInterval(() => {
      setCount4((prevCount) => {
        if (prevCount >= 5) {
          clearInterval(intervalId4);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 1000);
    return () => clearInterval(intervalId4);
  }, []);

  return (
    <div className="w-full h-[768px] md:h-[480px] md:w-[768px] lg:w-[1440px] lg:h-[129px] justify-center flex flex-wrap gap-5">
      <div className="mt-5 md:mt-0 mr-5 mb-5 bg-fourty w-[200px] h-[100px] md:w-[297px] md:h-[115px] rounded-md font-black">
        <h1 className="ml-5 mt-5">Current MR...</h1>
        <p className="text-4xl ml-5">{count}<span>K</span></p>
      </div>
      <div className="mr-5 mb-5 bg-white w-[200px] h-[100px] md:w-[297px] md:h-[115px] rounded-md font-black">
        <h1 className="ml-5 mt-5">Clients...</h1>
        <p className="text-4xl ml-5"><span>$</span>{count2}</p>
      </div>
      <div className="mr-5 mb-5 bg-fourty w-[200px] h-[100px] md:w-[297px] md:h-[115px] rounded-md font-black">
        <h1 className="ml-5 mt-5">Average...</h1>
        <p className="text-4xl ml-5">{count3}<span>%</span></p>
      </div>
      <div className="mr-5 mb-5 bg-white w-[200px] h-[100px] md:w-[297px] md:h-[115px] rounded-md font-black">
        <h1 className="ml-5 mt-5">Second Average...</h1>
        <p className="text-4xl ml-5">{count4}<span>%</span></p>
      </div>
    </div>
  );
};

export default Average;
