'use client';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Badge,
} from '@tremor/react';

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

export default async function UsersTable({ users }: { users: User[] }) {
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
                    <TableRow key={user.id}>
                        <TableCell>
                            <Text>{user?.employee_id??" -- "}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{`${user?.first_name} ${user?.other_names}`}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user?.phone_number}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user?.email}</Text>
                        </TableCell>
                        <TableCell>
                            <Badge color={user?.active === 1 ? "green" : "red"}>{user?.active === 1 ? "Active" : "Inactive"}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
  