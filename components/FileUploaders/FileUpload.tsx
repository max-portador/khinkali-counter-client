import React, {ChangeEvent, FC, useRef} from 'react';

const FileUpload:FC<FileUploadProps> = ({accept, children, setFile}) => {
    const ref = useRef<HTMLInputElement>()
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }
    return (
        <div
            onClick={() => {ref.current.click()}}
            style={{display: 'flex', alignSelf: 'center', height: "100%"}}
        >
            <input
                type="file"
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}
            
        </div>
    );
};

export default FileUpload;

export interface FileUploadProps {
    setFile: Function;
    accept: string;
    children?: React.ReactNode;
}