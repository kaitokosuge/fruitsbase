import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export const usePostImage = (userImage: string | null | undefined) => {
    //投稿画像データ
    const [imageFile, setImageFile] = useState<File | null>(null);

    //ローディング管理
    const [imageUpLoad, setImageUpload] = useState(false);

    //プレビュー画像データ
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    //ページに表示する画像
    const [viewImage, setViewImage] = useState<string | null | undefined>(
        userImage,
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (!e.target.files?.[0].type.match('image.*')) {
                alert('画像データを選択してください');
                return;
            }
            setImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setImageUpload(true);
        if (!imageFile) {
            alert('画像ファイルを選択してください。');
            setImageUpload(false);
            return;
        }

        const formData = new FormData();
        const options = {
            maxSizeMB: 0.01,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        formData.append('image', compressedFile);

        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data: string = await response.json();
                setPreviewImage(null);
                setImageFile(null);
                setViewImage(data);
            } else {
                alert('画像のアップロードに失敗しました。');
            }
            setImageUpload(false);
        } catch (error) {
            console.error('アップロードエラー:', error);
            alert('画像のアップロード中にエラーが発生しました。');
            setImageUpload(false);
        }
        setImageUpload(false);
    };
    return {
        imageUpLoad,
        previewImage,
        handleFileChange,
        handleSubmit,
        viewImage,
    };
};
