
interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="task-check"
      aria-label={label}
    />
  );
};

export default Checkbox;