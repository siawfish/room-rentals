import { resolveValue } from 'react-hot-toast';
import classNames from 'classnames';

interface Props {
  toast: any;
}

export default function Toast({
  toast
}:Props) {
  return (
    <div className="sticky rounded-2xl w-11/12 sm:w-[450px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
      <div className={classNames("rounded-[14px] w-full h-full border flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5", {"border-gray-200 bg-gray-50" : toast?.type !== "error", "border-red-200 bg-red-50" : toast?.type === "error"})}>
        <p className={classNames("text-black text-[13px] font-mono w-[304px] h-10 flex items-center justify-center p-3")}>
          {resolveValue(toast?.message, toast)}
        </p>
        <button
          className="text-white text-[13px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[100px] h-10 flex items-center justify-center whitespace-nowrap"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
