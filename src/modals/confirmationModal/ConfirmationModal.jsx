import React, { useEffect } from 'react';
import './confirmationModal.css';
import { Tooltip } from 'bootstrap';

const ConfirmationModal = ({ isVisible, onClose, onConfirm, message, categoryId }) => {
    useEffect(() => {
        const tooltips = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );
        return () => tooltips.forEach((tooltip) => tooltip.dispose());
    }, []);

    const HandleClose = (e) => {
        if (e.target.id == 'cnfrmModal') {
            onClose()
        }
    }

    return (
        <div
            className={`modal fade ${isVisible ? 'show' : ''}`}
            id="cnfrmModal" aria-hidden={!isVisible}
            aria-labelledby="accountBoxLabel"
            tabIndex="-1"
            style={{ display: isVisible ? "block" : "none" }}
            onClick={HandleClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content frgt1">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="accountBoxLabel">Delete {message}. !!</h1>
                        <button type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-title="Close"
                        ></button>
                    </div>
                    <div className="modal-body position-relative">
                        <h5 className="text-center py-3">Are you sure you want to delete this {message}. !</h5>
                        <div className="text-center">
                            <button className="btn btn-outline-dark m-2" onClick={onClose}>No, Cancel</button>
                            <button className="btn btn-outline-danger m-2" onClick={() => onConfirm(categoryId)}>Yes, Delete</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ConfirmationModal

