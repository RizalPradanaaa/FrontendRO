import React from "react";

export const ErrorPage = () => {
  return (
    <div className="mt-5">
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-3">Page Not Found</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <a href="/" className="link-offset-1">
          &larr; Back to Dashboard
        </a>
      </div>
    </div>
  );
};
