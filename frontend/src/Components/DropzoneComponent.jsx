import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export const DropzoneComponent = ({ onFileChange }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => {
                const newFiles = [...prevFiles, ...acceptedFiles];
                console.log("Accepted Files: ", newFiles); // Добавьте лог для проверки
                onFileChange(newFiles); // Передаем новые файлы родителю
                return newFiles;
            });
        },
    });

    const removeFile = (fileName) => {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((file) => file.name !== fileName);
            onFileChange(updatedFiles); // Обновляем родительское состояние
            return updatedFiles;
        });
    };

    return (
        <div className="mt-3 w-3/4 xl:mt-0">
            <form className="dropzone border-2 border-dashed border-darkmode-200/60 dark:bg-darkmode-600 dark:border-white/5 p-9 text-center">
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div className="dz-message">
                        Limite 5 MB Max
                        <div className="text-lg font-medium">Solte os ficheiros aqui ou clique para carregar.</div>
                        <div className="text-gray-600">Não é obrigatório</div>
                    </div>
                </div>
            </form>

            <div className="mt-3">
                {files.length > 0 && (
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between mt-2">
                                <span>{file.name}</span>
                                <button
                                    className="ml-2 text-red-500"
                                    onClick={() => removeFile(file.name)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
