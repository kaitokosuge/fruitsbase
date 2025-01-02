import { redirect } from 'next/navigation';

export const deleteUser = async () => {
    const res = await fetch('/api/delete-user', {
        method: 'DELETE',
    });
    if (res.ok) {
        return redirect('/');
    }
};
