import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="uppercase tracking-widest font-aboreto text-4xl text-center">
      {title}
    </div>
  );
};

export default SectionTitle;
