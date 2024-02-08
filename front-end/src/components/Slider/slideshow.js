import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./SlideShow.css";
const SlideshowContext = createContext();

export function Slideshow({ children, className, style }) {
  const [context, setContext] = useState({
    items: [],
    edge: false,
  });
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (context.items.length > 1 && context.edge) {
        const head = context.items.shift();
        context.items.push(head);
      }
      context.edge = !context.edge;
      setContext({ ...context });
    }, 2500);

    return () => clearTimeout(timer.current);
  });

  // console.log(context.items);

  return (
    <SlideshowContext.Provider value={[context, setContext]}>
      <div className="slideshow">{children}</div>
    </SlideshowContext.Provider>
  );
}

export function SlideshowItem({ children }) {
  const name = useRef(`${performance.now()}_${Math.random()}`);
  const [context] = useContext(SlideshowContext);
  const [stage, setStage] = useState("ready");

  useEffect(() => {
    context.items.push(name.current);
    return () => {
      const index = context.items.indexOf(name.current);
      context.items.splice(index, 1);
    };
  }, []);

  useEffect(() => {
    const activeName = context.items[0];
    if (activeName === name.current) {
      setStage("on");
    }
    if (activeName !== name.current && stage === "on") {
      setStage("off");
    }
    if (activeName !== name.current && stage === "off") {
      setStage("ready");
    }
  }, [context]);

  let left = 0;
  let zIndex = 0;
  switch (stage) {
    case "ready":
      left = "100%";
      break;
    case "on":
      left = "0";
      zIndex = 1;
      break;
    case "off":
      zIndex = 0;
      break;
    default:
  }

  return (
    <div
      style={{
        transition: "0.5s",
        position: "absolute",
        top: 0,
        left: left,
        zIndex: zIndex,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
