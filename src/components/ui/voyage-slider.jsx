"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./voyage-slider.css";

const lerp = (a, b, t) => a + (b - a) * t;
const wrap = (n, max) => ((n % max) + max) % max;

/**
 * 3D perspective Voyage Slider with mouse tilt, parallax background,
 * and layered floating step typography.
 */
export default function VoyageSlider({ slides = [], initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const slideRefs = useRef([]);
  const slideInnerRefs = useRef([]);
  const infoInnerRefs = useRef([]);

  const count = slides.length;

  const goTo = useCallback(
    (nextIdx) => {
      if (!count) return;
      setCurrentIndex(wrap(nextIdx, count));
    },
    [count]
  );

  const handlePrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const handleNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Mouse tilt & image parallax RAF loop for the active slide
  useEffect(() => {
    if (!count) return undefined;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const triggerEl = slideRefs.current[currentIndex];
    const targetEls = [
      slideInnerRefs.current[currentIndex],
      infoInnerRefs.current[currentIndex],
    ].filter(Boolean);

    if (!triggerEl || !targetEls.length) return undefined;

    let lerpAmount = 0.06;
    const rotCurrent = { x: 0, y: 0 };
    const rotTarget = { x: 0, y: 0 };
    const bgCurrent = { x: 0, y: 0 };
    const bgTarget = { x: 0, y: 0 };
    let rafId = 0;

    const tick = () => {
      rotCurrent.x = lerp(rotCurrent.x, rotTarget.x, lerpAmount);
      rotCurrent.y = lerp(rotCurrent.y, rotTarget.y, lerpAmount);
      bgCurrent.x = lerp(bgCurrent.x, bgTarget.x, lerpAmount);
      bgCurrent.y = lerp(bgCurrent.y, bgTarget.y, lerpAmount);

      for (const el of targetEls) {
        el.style.setProperty("--rotX", `${rotCurrent.y.toFixed(2)}deg`);
        el.style.setProperty("--rotY", `${rotCurrent.x.toFixed(2)}deg`);
        el.style.setProperty("--bgPosX", `${bgCurrent.x.toFixed(2)}%`);
        el.style.setProperty("--bgPosY", `${bgCurrent.y.toFixed(2)}%`);
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (event) => {
      lerpAmount = 0.1;
      const rect = triggerEl.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
      const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);
      rotTarget.x = ox;
      rotTarget.y = oy;
      bgTarget.x = -ox * 0.3;
      bgTarget.y = oy * 0.3;
    };

    const onMouseLeave = () => {
      lerpAmount = 0.06;
      rotTarget.x = 0;
      rotTarget.y = 0;
      bgTarget.x = 0;
      bgTarget.y = 0;
    };

    triggerEl.addEventListener("mousemove", onMouseMove);
    triggerEl.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      triggerEl.removeEventListener("mousemove", onMouseMove);
      triggerEl.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      for (const el of targetEls) {
        el.style.setProperty("--rotX", "0deg");
        el.style.setProperty("--rotY", "0deg");
        el.style.setProperty("--bgPosX", "0%");
        el.style.setProperty("--bgPosY", "0%");
      }
    };
  }, [currentIndex, count]);

  if (!count) return null;

  const prevIndex = wrap(currentIndex - 1, count);
  const nextIndex = wrap(currentIndex + 1, count);

  const getRoleProps = (index) => {
    if (index === currentIndex) return { "data-current": "" };
    if (index === nextIndex) return { "data-next": "" };
    if (index === prevIndex) return { "data-previous": "" };
    const forwardDist = wrap(index - currentIndex, count);
    return {
      "data-hidden-side": forwardDist <= count / 2 ? "right" : "left",
    };
  };

  return (
    <div
      className="voyage-stage shadow-2xl border border-forest-300/20"
      role="region"
      aria-label="How SajhaSupply Works interactive steps"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }}
      tabIndex={0}
    >
      {/* Dynamic blurred backdrop images */}
      {slides.map((slide, index) => {
        const roleProps = getRoleProps(index);
        return (
          <div
            key={`bg-${slide.n || index}`}
            className="voyage-slide__bg"
            style={{ "--bg": `url(${slide.image})` }}
            {...roleProps}
            aria-hidden="true"
          />
        );
      })}

      <div className="voyage-slider">
        <button
          type="button"
          className="voyage-slider--btn"
          aria-label="Previous step"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </button>

        <div className="voyage-slides__wrapper">
          <div className="voyage-slides">
            {slides.map((slide, index) => {
              const roleProps = getRoleProps(index);
              const isNext = index === nextIndex;
              const isPrev = index === prevIndex;

              return (
                <div
                  key={`slide-${slide.n || index}`}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className="voyage-slide"
                  onClick={() => {
                    if (isNext) handleNext();
                    else if (isPrev) handlePrev();
                  }}
                  {...roleProps}
                >
                  <div
                    ref={(el) => {
                      slideInnerRefs.current[index] = el;
                    }}
                    className="voyage-slide__inner"
                  >
                    <div className="voyage-slide--image__wrapper">
                      <img
                        className="voyage-slide--image"
                        src={slide.image}
                        alt={slide.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="voyage-slides--infos">
            {slides.map((slide, index) => {
              const roleProps = getRoleProps(index);
              return (
                <div
                  key={`info-${slide.n || index}`}
                  className="voyage-slide-info"
                  {...roleProps}
                >
                  <div
                    ref={(el) => {
                      infoInnerRefs.current[index] = el;
                    }}
                    className="voyage-slide-info__inner"
                  >
                    <div className="voyage-slide-info--text__wrapper">
                      <div data-title="" className="voyage-slide-info--text">
                        <span>Step {slide.n}</span>
                      </div>
                      <div data-subtitle="" className="voyage-slide-info--text">
                        <span>{slide.title}</span>
                      </div>
                      <div data-description="" className="voyage-slide-info--text">
                        <span>{slide.desc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="voyage-slider--btn"
          aria-label="Next step"
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Step selector dots */}
      <div
        className="relative z-30 mt-6 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Select procurement step"
      >
        {slides.map((slide, index) => {
          const active = index === currentIndex;
          return (
            <button
              key={`dot-${slide.n || index}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Step ${slide.n}: ${slide.title}`}
              onClick={() => goTo(index)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border ${
                active
                  ? "bg-white text-forest-800 border-white shadow-md scale-105"
                  : "bg-white/10 text-white/80 border-white/25 hover:bg-white/20"
              }`}
            >
              {slide.n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
