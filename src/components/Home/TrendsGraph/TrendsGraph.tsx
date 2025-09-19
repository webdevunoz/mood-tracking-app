import "./TrendsGraph.css";
import MoodBar from "./MoodBar/MoodBar";
import MoodScrollBar from "./MoodScrollBar/MoodScrollBar";
import { useEffect, useRef, useState } from "react";
import BarPopover from "../BarPopover/BarPopover";
import React from "react";
import type { MoodData } from "../../../CustomHooks/useMoodData";

interface TrendsGraph {
  moodData: MoodData[] | undefined;
}

const TrendsGraph = ({ moodData }: TrendsGraph) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enableBarPopover, setEnableBarPopover] = useState<boolean[]>([]);
  const yAxisLabels = ["9+", "7-8", "5-6", "3-4", "0-2"];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".scroll-thumb-area")) return;

      // Find the currently active popover index
      const activeIndex = enableBarPopover.findIndex((val) => val);

      // If no popover is open, do nothing
      if (activeIndex === -1) return;

      const activeBarRef = barRefs.current[activeIndex];

      // If the click is outside the active bar, close it
      if (activeBarRef && !activeBarRef.contains(target)) {
        setEnableBarPopover(new Array(moodData?.length || 0).fill(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enableBarPopover, moodData]);

  useEffect(() => {
    if (!moodData) return;
    setEnableBarPopover(new Array(moodData.length).fill(false));
  }, [moodData]);

  const handlePopover = (index: number) => {
    setEnableBarPopover((prev) => prev.map((_, i) => i === index));
  };

  const setBarRef = (index: number) => (el: HTMLDivElement | null) => {
    barRefs.current[index] = el;
  };

  return (
    <>
      <div ref={containerRef} className="trends-content">
        <div className="trend-line top-[6px]"></div>
        <div className="trend-line top-[59px]"></div>
        <div className="trend-line top-[112px]"></div>
        <div className="trend-line top-[165px]"></div>
        <div className="trend-line top-[220px]"></div>

        {/* Y-Axis Labels */}
        <div className="sleep-bar">
          <div className="sleep-bar-content">
            {yAxisLabels.map((label) => (
              <div key={label} className="sleep-bar-details">
                <svg
                  className="sleep-bar-icon text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M10 .906c-.031.219-.125.531-.25.688L7.156 4.5H9c.25 0 .5.25.5.5v.5c0 .281-.25.5-.5.5H5.5a.494.494 0 0 1-.5-.5v-.406c0-.188.094-.5.219-.657L7.812 1.5H6a.494.494 0 0 1-.5-.5V.5c0-.25.219-.5.5-.5h3.5c.25 0 .5.25.5.5v.406ZM7.25 8a.76.76 0 0 1 .75.75v.813c-.031.218-.156.53-.313.687L3.876 14H7.5c.25 0 .5.25.5.5v1c0 .281-.25.5-.5.5H1.75a.722.722 0 0 1-.75-.75v-.781c0-.219.125-.531.281-.688L5.094 10H2a.494.494 0 0 1-.5-.5v-1c0-.25.219-.5.5-.5h5.25Zm7.25-1c.25 0 .5.25.5.5v.406c-.031.219-.125.532-.25.688L12.156 11.5H14c.25 0 .5.25.5.5v.5c0 .281-.25.5-.5.5h-3.5a.494.494 0 0 1-.5-.5v-.406c0-.188.094-.5.219-.656L12.813 8.5H11a.494.494 0 0 1-.5-.5v-.5c0-.25.219-.5.5-.5h3.5Z"
                  />
                </svg>
                <p className="sleep-duration text-preset-9 text-neutral-600">
                  {label} hours
                </p>
              </div>
            ))}
          </div>
        </div>
        <MoodScrollBar>
          {moodData?.map((log, i) => (
            <React.Fragment key={i}>
              <MoodBar
                ref={setBarRef(i)}
                log={log}
                enableBarPopover={() => handlePopover(i)}
              >
                {enableBarPopover[i] && <BarPopover index={i} log={log} />}
              </MoodBar>
            </React.Fragment>
          ))}
        </MoodScrollBar>
      </div>
    </>
  );
};

export default TrendsGraph;
