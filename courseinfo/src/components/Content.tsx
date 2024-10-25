import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts &&
        parts.map((part) => (
          <div key={part.name}>
            <Part coursePart={part} />
          </div>
        ))}
    </div>
  );
};

export default Content;
