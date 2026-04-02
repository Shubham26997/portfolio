import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { setAllTimeline } from "./utils/GsapScroll";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  useEffect(() => {
    setSplitText();
    setAllTimeline();

    const onResize = () => setSplitText();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="container-main">
      <Navbar />
      <SocialIcons />
      <Landing />
      <About />
      <WhatIDo />
      <Career />
      <Work />
      <Suspense fallback={null}>
        <TechStack />
      </Suspense>
      <Contact />
    </div>
  );
};

export default MainContainer;
