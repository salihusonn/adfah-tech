import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { BUSINESS } from '../data';

export default function Portrait({ className = '', eager = false }) {
  const [source, setSource] = useState(BUSINESS.localImage);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (source !== BUSINESS.imageUrl) {
      setSource(BUSINESS.imageUrl);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className={`portrait ${className}`}>
      {failed ? (
        <div className="portrait__fallback" role="img" aria-label="AdFah Tech portrait unavailable">
          <ImageOff size={32} aria-hidden="true" />
          <strong>AdFah Tech</strong>
          <span>Portrait temporarily unavailable</span>
        </div>
      ) : (
        <img
          src={source}
          onError={handleError}
          width="864"
          height="1184"
          alt="Portrait supplied by AdFah Tech"
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
        />
      )}
    </div>
  );
}
