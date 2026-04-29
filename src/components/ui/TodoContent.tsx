
import { BiTime } from "react-icons/bi";

interface TodoContentProps {
  description: string;
  timeRange: string;
}

const TodoContent = ({ description, timeRange }: TodoContentProps) => {
  return (
    <>
      <p className="task-notes">{description}</p>
      <p className="task-time">
        <BiTime /> {timeRange}
      </p>
    </>
  );
};

export default TodoContent;