import React from 'react';
import { Text } from '@tremor/react';

interface Props {
  value?: "admin" | "superadmin";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({
  value,
  onChange,
}:Props) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">Role</label>
      <Text className="mb-3">Select user permission role</Text>
      <div className="flex flex-row">
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            value="admin"
            checked={value === 'admin'}
            onChange={onChange}
            className="mr-1 cursor-pointer"
          />
          <Text>Admin</Text>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="superadmin"
            checked={value === 'superadmin'}
            onChange={onChange}
            className="mr-1 cursor-pointer"
          />
          <Text>Super Admin</Text>
        </label>
      </div>
    </div>
  );
};

export default RadioGroup;
