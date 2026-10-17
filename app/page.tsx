import { Builds } from "@/components/site/builds";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { IntechGeeks } from "@/components/site/intechgeeks";
import { Loader } from "@/components/site/loader";
import { Nav } from "@/components/site/nav";
import { Origins } from "@/components/site/origins";
import { Reveals } from "@/components/site/reveals";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Toolbox } from "@/components/site/toolbox";
import { TraceRail } from "@/components/site/trace-rail";

export default function Page() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#origins">
        Skip to the story
      </a>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <div className="story">
          <TraceRail />
          <Origins />
          <IntechGeeks />
          <Builds />
          <Toolbox />
          <Contact />
        </div>
      </main>
      <Reveals />
      <div className="grain" aria-hidden="true" />
    </SmoothScroll>
  );
}
