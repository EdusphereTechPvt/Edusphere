"use client";

import PrivacyPolicyConfig from "../../config/PrivacyPolicyConfig";
import React, { useRef } from "react";


const page = () => {
  const { pageTitle, lastUpdated, tableOfContents, sections } =
    PrivacyPolicyConfig;

  const sectionRefs = useRef(sections.map(() => React.createRef()));

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.current?.scrollIntoView({behavior: "smooth", block: "start",});
  };

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="w-full sm:my-[10%] my-[15%] lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2 text-gray-600">
              {tableOfContents.map((item, idx) => (
                <li key={idx} className="text-sm hover:text-black cursor-pointer" onClick={() => scrollToSection(idx)}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>


          <main className="lg:w-3/4 space-y-10">
            <header className="mb-10 text-start">
              <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
              <p className="text-gray-500">Last updated: {lastUpdated}</p>
            </header>
            {sections.map((section, idx) => (
              <section key={idx} className="space-y-3" ref={sectionRefs.current[idx]}>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-gray-700 leading-relaxed whitespace-pre-line"
                  >
                    {line}
                  </p>
                ))}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
