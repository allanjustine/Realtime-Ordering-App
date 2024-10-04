import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-green-600">Success!</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="p-6 text-center">
          <svg
            className="w-16 h-16 mx-auto text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm5.293 7.293a1 1 0 00-1.414 0L10 12.586 6.121 8.707a1 1 0 00-1.414 1.414l4.293 4.293a1 1 0 001.414 0l5.293-5.293a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mt-4 text-gray-600">{message}</p>
        </div>
        <div className="flex justify-center p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
