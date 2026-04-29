import type { RefObject } from "react";


interface FormInputProps {
    label: string;
    type?: "text" | "time";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    inputRef?: RefObject<HTMLInputElement | null>;
}

const FormInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    inputRef
}: FormInputProps) => {
    return (
        <div className="field-group">
            <label className="field-label">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="field-input"
                ref={inputRef}
                required={required}
            />
        </div>
    );
};

export default FormInput;