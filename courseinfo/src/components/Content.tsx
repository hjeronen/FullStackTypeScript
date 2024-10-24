export interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts &&
        parts.map((part) => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
    </div>
  );
};

export default Content;
