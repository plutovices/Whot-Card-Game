import { useState } from "react";


// function Modal() {
//     const [showModal, setShowModal] = useState(true);

//     return (
//         <div>
           

//             {/* Modal and blurred background */}
//             {showModal && (
//                 <div className="overlay">
//                     <div className="modal">
//                         <h2>Welcome!</h2>
//                         <p>Make We Play Whot</p>

//                         <div className="dice">
//                             <div className="dot"></div>
//                             <div className="dot"></div>
//                             <div className="dot"></div>
//                             <div className="dot"></div>
//                             <div className="dot"></div>
//                             <div className="dot"></div>
//                         </div>

//                         <button onClick={() => setShowModal(false)}>
//                             Continue
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

function Modal() {
    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "white",
                color: "black",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center"
            }}>
                <h2>Welcome to Whot!</h2>
                <p>Ready to play?</p>
                <button onClick={() => {
                    document.getElementById("react-root").style.display = "none";
                }}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Modal;