import { useState, useEffect } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

export default ({ size = 18, value, title, onCopy, className = "" }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = copied
      ? setTimeout(() => setCopied(false), 1 * 1000)
      : undefined;

    return () => clearTimeout(timeout);
  }, [copied]);

  return copied ? (
    <div className={`${title ? "min-w-max" : ""} flex items-center space-x-1`}>
      {title && <span>{title}</span>}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="green"><title>check-circle</title><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>
    </div>
  ) : (
    <CopyToClipboard
      text={value}
      onCopy={() => {
        setCopied(true);

        if (onCopy) {
          onCopy();
        }
      }}
    >
      <div
        className={`${title ? "min-w-max" : ""} flex items-center space-x-1`}
      >
        {title && <span>{title}</span>}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><title>content-copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
      </div>
    </CopyToClipboard>
  );
};
