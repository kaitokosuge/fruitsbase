import React from 'react';
import { formatDateToJST } from '../../utils/formatDateToJST/formatDateToJST';

export default function PostDate({ date }: { date: Date }) {
    const postDate = formatDateToJST(date);
    return <time dateTime={postDate}>{postDate}</time>;
}
