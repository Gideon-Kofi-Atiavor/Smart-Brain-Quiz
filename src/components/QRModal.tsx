import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { FiCopy, FiShare2, FiX } from "react-icons/fi";

type Props = {
  visible: boolean;
  quizId: number;
  onClose: () => void;
}

const QRModal: React.FC<Props> = ({ visible, quizId, onClose }) => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (visible) {
      const quizLink = `${window.location.origin}/quiz?id=${quizId}`;
      QRCode.toDataURL(quizLink)
        .then((url) => setQrUrl(url))
        .catch((err) => console.error(err));
    }
  }, [visible, quizId]);

  const quizLink = `${window.location.origin}/quiz?id=${quizId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(quizLink);
    alert("Link copied!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({ title: "SmartBrain Quiz", url: quizLink });
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  if (!visible) return null;

  // close modal if user clicks outside modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white p-6 rounded shadow text-center max-w-sm w-full">
        {/* Close Button Top Right */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Scan QR to start Quiz</h2>

        {qrUrl && <img src={qrUrl} alt="QR Code" className="mx-auto mb-4" />}

        <p className="mb-4 wrap-break-words">{quizLink}</p>

        <div className="flex justify-center gap-2">
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={copyLink}
          >
            <FiCopy /> Copy
          </button>

          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
            onClick={shareLink}
          >
            <FiShare2 /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;