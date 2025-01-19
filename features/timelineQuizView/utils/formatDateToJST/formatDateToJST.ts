export const formatDateToJST = (inputDate: Date): string => {
    if (typeof window === 'undefined') {
        return '';
    }
    const jstDate = new Date(
        inputDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    );
    const year = jstDate.getFullYear();
    const month = String(jstDate.getMonth() + 1).padStart(2, '0');
    const day = String(jstDate.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
};
