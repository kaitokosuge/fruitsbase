import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export const usePostImage = () => {
    //投稿画像データ
    const [imageFile, setImageFile] = useState<File | null>(null);

    //ローディング管理
    const [imageUpLoad, setImageUpload] = useState(false);

    //プレビュー画像データ
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    //保存された画像のパス
    const [savedImage, setSavedImage] = useState<string>('');

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
            const response = await fetch('/api/post', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSavedImage(data);
                setPreviewImage(null);
                setImageFile(null);
                alert('画像が正常にアップロードされました。');
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
        savedImage,
        handleFileChange,
        handleSubmit,
    };
};
