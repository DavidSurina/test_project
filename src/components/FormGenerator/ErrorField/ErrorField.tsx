import React from "react";

type PropTypes = {
  errors: string[];
};

function ErrorField(props: PropTypes): JSX.Element {
  const { errors } = props;

  if (!errors) {
    return <span className="h4" />;
  }

  return (
    <div className="flex flex-col justify-start">
      {errors.map((error, index) => {
        return (
          <span key={index} className="h-4 text-red-700 text-xs">
            {error}
          </span>
        );
      })}
    </div>
  );
}

export default ErrorField;
