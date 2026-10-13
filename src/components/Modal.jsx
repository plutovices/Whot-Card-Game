import { useState } from "react";
import { CircleX }  from "lucide-react";




function Modal() {
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
           

            {/* Modal and blurred background */}
            {showModal && (
                <div className="overlay">
                    
                    <div className="modal">
                        <div className="text">
                            <h2 className="modal-text">Welcome!</h2>
                            <p className="modal-text">Make We Play Whot</p>
                        </div>
                        

                        <button className={`modal-button ${showModal ? '' : 'disappear'}`} onClick={handleCloseModal}>
                            Start
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}



export default Modal;