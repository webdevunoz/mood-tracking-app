import { useRef, useEffect } from "react";
import "./MoodScrollBar.css";

interface MoodScrollBarProps {
  children: React.ReactNode;
}

const MoodScrollBar = ({ children }: MoodScrollBarProps) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current!;
    const track = trackRef.current!;
    const items = itemsRef.current!;
    const wrapper = items.parentElement!;

    let isDragging = false;
    let startX = 0;
    let thumbStartLeft = 0;

    const updateThumbWidth = () => {
      const visibleWidth = wrapper.clientWidth;
      const totalContentWidth = items.scrollWidth;

      // If all items fit, hide the thumb
      if (totalContentWidth <= visibleWidth) {
        thumb.style.display = "none";
        return;
      }

      thumb.style.display = "block";

      // Calculate thumb width based on visible ratio
      const visibleRatio = visibleWidth / totalContentWidth;
      const thumbWidth = track.offsetWidth * visibleRatio;

      thumb.style.width = `${thumbWidth}px`;

      // Clamp thumb position so it doesn't overflow
      const maxThumbX = track.offsetWidth - thumb.offsetWidth;
      const currentLeft = parseFloat(thumb.style.left || "0");
      const clampedLeft = Math.min(currentLeft, maxThumbX);
      thumb.style.left = `${clampedLeft}px`;

      // Recalculate scroll ratio and realign items
      const scrollRatio = clampedLeft / maxThumbX;
      const maxTranslate = totalContentWidth - visibleWidth;
      items.style.transform = `translateX(-${scrollRatio * maxTranslate}px)`;
    };

    updateThumbWidth();

    // Execute updateThumbWidth "update" when a resize of items,
    // wrapper or track has been observed
    const resizeObserver = new ResizeObserver(updateThumbWidth);
    resizeObserver.observe(items);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(track);

    // Start of dragging, retrieve start position of thumb
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      thumbStartLeft = thumb.offsetLeft;
      document.body.style.userSelect = "none";
    };

    // Update thumb left position as we drag and move the items
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const maxThumbX = track.offsetWidth - thumb.offsetWidth;
      const newLeft = Math.min(Math.max(0, thumbStartLeft + deltaX), maxThumbX);
      thumb.style.left = `${newLeft}px`;

      const scrollRatio = newLeft / maxThumbX;
      const maxTranslate = items.offsetWidth - track.offsetWidth;
      items.style.transform = `translateX(-${scrollRatio * maxTranslate}px)`;
    };

    // End of dragging, so disable boolean to prevent scrolling logic
    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    thumb.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      resizeObserver.disconnect();
      thumb.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="scroll-content">
      <div className="scroll-items-wrapper">
        <div className="scroll-items" ref={itemsRef}>
          {children}
        </div>
      </div>
      <div className="scroll-track" ref={trackRef}>
        <div className="scroll-thumb" ref={thumbRef}>
          <div className="scroll-thumb-area"></div>
        </div>
      </div>
    </div>
  );
};

export default MoodScrollBar;
