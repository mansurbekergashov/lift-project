// import { useState } from "react";

// export default function App() {

//   const [currentFloor, setCurrentFloor] = useState(1)
//   const [queue, setQueue] = useState([])
//   function arrive() {


//   }
//   return (
//     <div>
      
      
//       <div className="flex gap-5 h-146 ">
//         <div className="flex mt-40 ml-20">
//           <div className="flex flex-col bg-gray-200 border text-center w-200">
//             <div className="border p-10">4</div>
//             <div className="border p-10">3</div>
//             <div className="border p-10">2</div>
//             <div className="border p-10">1</div>
//           </div>

//           <div className="bg-yellow-400 w-50 flex items-end justify-center p-3">
//             <div className="bg-fuchsia-300 w-20 h-20 p-7">Lift</div>
//           </div>
//         </div>



//         <div className="bg-gray-500 w-40 h-50 rounded-md flex flex-col items-center justify-center p-1 gap-3 mt-96 text-white">
//           <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" onClick={arrive} >4</button>
//           <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" >3</button>
//           <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" >2</button>
//           <button className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full" >1</button>
//         </div>
//       </div>
    
    
//     </div>
//   );
// }


// duration 1-qavat bolsa 2 , 2 bolsa 4, 3-6, 4-8 



import { useState } from "react";

export default function App() {
  // Liftning hozirgi qavati
  const [currentFloor, setCurrentFloor] = useState(1);
  // Liftga bosilgan qavatlar ro'yxati
  const [queue, setQueue] = useState([]);

  // Tugma bosilganda chaqiriladigan funksiya
  function arrive(floor) {
    if (!queue.includes(floor) && floor !== currentFloor) {
      setQueue((prev) => [...prev, floor]);
    }
  }

  // Liftni harakatlantirish
  function moveLift() {
    if (queue.length === 0) return;

    const targetFloor = queue[0];

    if (currentFloor < targetFloor) {
      setCurrentFloor(currentFloor + 1);
    } else if (currentFloor > targetFloor) {
      setCurrentFloor(currentFloor - 1);
    } else {
      // Lift maqsad qavatga yetdi
      setQueue((prev) => prev.slice(1));
    }
  }

  // Lift harakatini har 1 sekundda tekshirish
  useState(() => {
    const interval = setInterval(moveLift, 1000);
    return () => clearInterval(interval);
  }, [currentFloor, queue]);

  return (
    <div>
      <div className="flex gap-5 h-146 ">
        <div className="flex mt-40 ml-20">
          <div className="flex flex-col bg-gray-200 border text-center w-200">
            <div className={`border p-10 ${currentFloor === 4 ? "bg-green-300" : ""}`}>4</div>
            <div className={`border p-10 ${currentFloor === 3 ? "bg-green-300" : ""}`}>3</div>
            <div className={`border p-10 ${currentFloor === 2 ? "bg-green-300" : ""}`}>2</div>
            <div className={`border p-10 ${currentFloor === 1 ? "bg-green-300" : ""}`}>1</div>
          </div>

          <div className="bg-yellow-400 w-50 flex items-end justify-center p-3">
            <div className="bg-fuchsia-300 w-20 h-20 p-7">
              Lift ({currentFloor})
            </div>
          </div>
        </div>

        <div className="bg-gray-500 w-40 h-50 rounded-md flex flex-col items-center justify-center p-1 gap-3 mt-96 text-white">
          {[4, 3, 2, 1].map((floor) => (
            <button
              key={floor}
              className="bg-black w-10 h-10 border inline-block p-1 hover:opacity-70 active:bg-white active:text-black rounded-full"
              onClick={() => arrive(floor)}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
