import React, { memo } from "react";

const Footer: React.FC = memo(() => {
  return (
    <div>
      <footer className="py-6 bg-orange-700">
        <div className="container mx-auto text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Food Ordering App. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

export default Footer;
