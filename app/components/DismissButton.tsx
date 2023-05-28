'use client';

interface Props {
  onClick?: () => void;
}

export default function DismissButton({
  onClick
}:Props) {
  return (
    <button
      className="contents underline text-blue-600"
      onClick={onClick}
    >
      Dismiss →
    </button>
  );
}
