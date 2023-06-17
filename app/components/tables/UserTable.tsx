'use client';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
} from '@tremor/react';
import { useRouter, usePathname } from 'next/navigation';
import SwitchToggle from '../Toggle';
import usersApiService from '../../../api/user';
import { toast } from 'react-hot-toast';

export interface User {
    id: number;
    first_name: string;
    other_names: string;
    phone_number: string;
    employee_id: string;
    role: "superadmin" | "admin";
    email: string;
    motel_id: number;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
    default_password: number;
    active: number;
}

export default function UsersTable({ users }: { users: User[] }) {
    const { push, refresh } = useRouter();
    const pathname = usePathname();

    const handleToggle = async (data:{user_id: number, status: number}) => {
        try {
            toast.loading('Updating user status...', { id: 'update-user-status'});
            await usersApiService.toggleUserStatus(data);
            toast.success('User status updated successfully', { id: 'update-user-status'});
            refresh();
        } catch (error) {
            toast.error('Failed to update user status', { id: 'update-user-status'});
        }
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Employee ID</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Phone Number</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow className='cursor-pointer' key={user.id}>
                        <TableCell onClick={()=>push(`${pathname}/form?uid=${user?.id}`)}>
                            <Text>{user?.employee_id??" -- "}</Text>
                        </TableCell>
                        <TableCell onClick={()=>push(`${pathname}/form?uid=${user?.id}`)}>
                            <Text>{`${user?.first_name} ${user?.other_names}`}</Text>
                        </TableCell>
                        <TableCell onClick={()=>push(`${pathname}/form?uid=${user?.id}`)} >
                            <Text>{user?.phone_number}</Text>
                        </TableCell>
                        <TableCell onClick={()=>push(`${pathname}/form?uid=${user?.id}`)}>
                            <Text>{user?.email}</Text>
                        </TableCell>
                        <TableCell>
                            {/* <Badge color={user?.active === 1 ? "green" : "red"}>{user?.active === 1 ? "Active" : "Inactive"}</Badge> */}
                            <SwitchToggle 
                                options={[
                                    {label: 'Active', value: "1"},
                                    {label: 'Inactive', value: "0"}
                                ]}
                                defaultValue={user?.active?.toString()}
                                onValueChange={(value) => handleToggle({user_id: user?.id, status: parseInt(value)})}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  