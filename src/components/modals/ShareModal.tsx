import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Modal } from './Modal';

interface ShareModalProps {
  shareLink: string;
  onClose: () => void;
}

export function ShareModal({ shareLink, onClose }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Modal title="分享行程" onClose={onClose}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          复制以下链接分享给好友：
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}