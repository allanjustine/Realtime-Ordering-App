import React, { memo, useEffect } from "react";

const NotFound: React.FC = memo(() => {
  useEffect(() => {
    document.title = "Ordering App | Not found";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">404 - Not Found</h1>
      <p className="mb-8 text-lg text-gray-700">
        The page you are looking for does not exist.
      </p>
    </div>
  );
});

export default NotFound;
