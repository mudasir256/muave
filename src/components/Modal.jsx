// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children, title, description }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="z-50 bg-white p-8 rounded-md" style={{
                width: '500px'
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                        width: "-webkit-fill-available",
                        marginTop: "-10px",
                        marginBottom: "20px"
                    }}>
                        <h4 className='text-center font-medium mb-1'>{title}</h4>
                        <p className='text-sm text-[gray] text-center'>{description}</p>
                    </div>
                    <div className='cursor-pointer' onClick={onClose}>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.25" d="M1.5 1.5L10.75 10.75M20 20L10.75 10.75M10.75 10.75L20 1.5L1.5 20" stroke="black" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
