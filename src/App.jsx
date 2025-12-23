// duration 1-qavat bolsa 2 , 2 bolsa 4, 3-6, 4-8 
import { useState } from "react";

export default function App() {

  const [currentFloor, setCurrentFloor] = useState(1)
  const [isMoving, setIsMoving] = useState(false)
  const [queue, setQueue] = useState([])
  
  function goToFloor(floor) {
    if (isMoving) {
      if (!queue.includes(floor) && floor !== currentFloor) {
        setQueue(prev => [...prev, floor]);
      }
      return;
    }
    
    if (floor === currentFloor) return; 
    
    processFloor(floor);
  }
  
  function processFloor(floor) {
    setIsMoving(true);
    setCurrentFloor(floor);
    
    setTimeout(() => {
      setIsMoving(false);
      if (queue.length > 0) {
        const nextFloor = queue[0];
        setQueue(prev => prev.slice(1));
        setTimeout(() => processFloor(nextFloor), 100);
      }
    }, 1000);
  }
  
  
  return (
    <div>
      
      
      <div className="flex gap-5 h-146 ">
        <div className="flex mt-40 ml-20">
          <div className="flex flex-col bg-gray-200 border text-center sm:w-100 md:w-200">
            <div className="border p-10">4</div>
            <div className="border p-10">3</div>
            <div className="border p-10">2</div>
            <div className="border p-10">1</div>
          </div>

          <div className="bg-yellow-400 md:w-50 sm:w-22 flex items-end justify-center p-3" >
            <div style={{transform: `translateY(-${(currentFloor - 1) * 100}px)`, transition: 'transform 1s ease-in-out'}} className="bg-fuchsia-600 w-20 h-20 p-7">Lift</div>
          </div>
        </div>



        <div className="bg-gray-500 w-40 h-50 rounded-md flex flex-col items-center justify-center p-1 gap-3 mt-96 text-white">
          <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" onClick={() => goToFloor(4)} >4</button>
          <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" onClick={() => goToFloor(3)} >3</button>
          <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" onClick={() => goToFloor(2)} >2</button>
          <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" onClick={() => goToFloor(1)} >1</button>
        </div>
      </div>
    
    
    </div>
  );
}


