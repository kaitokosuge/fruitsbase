export const formatDateToJST = (inputDate: Date): string => {
    const jstDate = new Date(
        inputDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
    );
    const year = jstDate.getFullYear();
    const month = String(jstDate.getMonth() + 1).padStart(2, '0');
    const day = String(jstDate.getDate()).padStart(2, '0');

    const currentYear = new Date().getFullYear();

    return year === currentYear ? `${month}/${day}` : `${year}/${month}/${day}`;
};
