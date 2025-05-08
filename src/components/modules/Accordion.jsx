import React, { useState } from "react";

function Accordion({title , answer}) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="py-2">
      <button onClick={()=> setAccordionOpen(!accordionOpen)} className="flex w-full justify-between gap-5 text-start  max-sm:text-sm">
        <span>{title}</span>
        {accordionOpen ?<span className="text-xl transition-all duration-300 ease-in-out rotate-45">+</span> :  <span className="text-xl transition-all duration-300 ease-in-out rotate-90">+</span> }
      </button>
      <div
        className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-300 ease-in-out ${accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden my-1">{answer}</div>
      </div>
    </div>
  );
}

export default Accordion;
