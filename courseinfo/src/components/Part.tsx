import { CoursePart } from "../App";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getPartInfo = (part: CoursePart) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <i>{part.description}</i>
          </div>
        );
      case "group":
        return <div>project exercises {part.groupProjectCount}</div>;
      case "background":
        return (
          <div>
            <div>
              <i>{part.description}</i>
            </div>
            <div>submit to {part.backgroundMaterial}</div>
          </div>
        );
      case "special":
        return (
          <div>
            <div>
              <i>{part.description}</i>
            </div>
            <div>required skills: {part.requirements.join(", ")}</div>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      <b>
        {coursePart.name} {coursePart.exerciseCount}
      </b>
      {getPartInfo(coursePart)}
      <br />
    </div>
  );
};

export default Part;
