import { useState } from 'react';

export const useHandleCategory = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const handleClickCategory = (id: string) => {
        if (selectedIds.some((selectedId: string) => selectedId === id)) {
            setSelectedIds(
                selectedIds.filter((selectedId) => selectedId !== id),
            );
        } else {
            setSelectedIds((prev) => {
                return [...prev, id];
            });
        }
    };
    return { selectedIds, handleClickCategory, setSelectedIds };
};
