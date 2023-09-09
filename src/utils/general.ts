//All utilities should be written this file

export const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }
    });
};

export const getBase64File = async (file: any) => {
    // let fileName = file?.name;
    return await getBase64(file).then((response: any) => response);
};