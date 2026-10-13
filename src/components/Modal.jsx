import { useState } from "react";
import { CircleX }  from "lucide-react";




function Modal() {
    const [showModal, setShowModal] = useState(true);

    return (
        <div>
           

            {/* Modal and blurred background */}
            {showModal && (
                <div className="overlay">
                    <CircleX />
                    
                    <div className="modal">
                        <div className="text">
                            <h2 className="modal-text">Welcome!</h2>
                            <p className="modal-text">Make We Play Whot</p>
                        </div>
                        

                        <div className="dice">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>

                        <button className="modal-button" onClick={() => setShowModal(false)}>
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}



export default Modal;