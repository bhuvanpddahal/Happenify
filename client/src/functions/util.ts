import { Dispatch, SetStateAction } from "react";

export const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>, setChange: Dispatch<SetStateAction<string>>): void => {
    const file = e.target.files?.[0];

    if (file) {
        const reader = (readFile: File): Promise<string> => new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        });

        reader(file).then((result) => setChange(result));
    }
};

export const isSearching = (location: any) => {
    if(location.search.includes('name') || location.search.includes('location')) return true;
    return false;
};