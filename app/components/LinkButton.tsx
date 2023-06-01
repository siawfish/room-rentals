'use client';

interface Props {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export default function LinkButton({
  onClick,
  label = 'Dismiss',
  className = ''
}:Props) {
  return (
    <button
      className={`contents underline text-blue-600 ${className}`}
      onClick={onClick}
    >
      {label} →
    </button>
  );
}
