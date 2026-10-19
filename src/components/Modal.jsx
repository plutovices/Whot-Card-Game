import { useState } from "react";




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
                          
                          <CardAnimation/>

                        <button className={`modal-button ${showModal ? '' : 'disappear'}`} onClick={handleCloseModal}>
                            Start
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function CardAnimation() {
    return (
        <div className="card-animation">
         <img
                src="/cards/Star2.svg"
                className="animated-card card-left"
                alt="animated card"
            />
            <img
                src="/cards/Triangle2.svg"
                className="animated-card card-middle"
                alt="animated card"
            />
            <img
                src="/cards/circle2.svg"
                className="animated-card card-right"
                alt="animated card"
            />
        </div>
    );
}

export default Modal;