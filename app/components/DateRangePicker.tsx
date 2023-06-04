import { DateRangePicker, DateRangePickerValue } from "@tremor/react";

interface Props {
    inputClassName?: string;
    labelClassName?: string;
    label?: string;
    id?: string;
    name?: string;
    error?: string;
    placeholder?: string;
    value?: DateRangePickerValue;
    onChange?: (value: DateRangePickerValue) => void;
}

const errorInputClassName = "h-10 block w-full rounded-md border border-red-500 pl-3 focus:border-red-500 focus:ring-red-500 sm:text-sm";

export function DateRange({
    inputClassName="h-10 block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    labelClassName="block text-sm font-medium leading-6 text-gray-900 mb-2",
    label,
    name,
    error,
    placeholder="Select Check-in and Check-out dates",
    value,
    onChange
}: Props) {

  return (
    <div>
        <label htmlFor={name} className={labelClassName}>{label}</label>
        <DateRangePicker
            placeholder={placeholder}
            className={error ? errorInputClassName : inputClassName}
            value={value}
            onValueChange={onChange}
            enableDropdown={false}
        />
        {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}