export const deleteUser = async () => {
    const res = await fetch('/api/delete-user', {
        method: 'DELETE',
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
    }
};
