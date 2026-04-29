
import FormInput from "./FormInput";

interface TimeRangeInputProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

const TimeRangeInput = ({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange 
}: TimeRangeInputProps) => {
  return (
    <div className="field-row">
      <FormInput
        label="Start Time"
        type="time"
        value={startTime}
        onChange={onStartTimeChange}
      />
      <FormInput
        label="End Time"
        type="time"
        value={endTime}
        onChange={onEndTimeChange}
      />
    </div>
  );
};

export default TimeRangeInput;