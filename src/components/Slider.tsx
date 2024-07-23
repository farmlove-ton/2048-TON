import React, { forwardRef } from "react";
import { Range, getTrackBackground } from "react-range";

interface IProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<IProps> = forwardRef(
  (
    { min, max, step = 1, value, onChange },
    ref: React.LegacyRef<Range> | undefined
  ) => {
    const handleChange = (values: number[]) => {
      onChange(values[0]);
    };

    return (
      <div className="w-full relative">
        <span className="absolute -top-6 right-0">{value}</span>
        <Range
          ref={ref}
          values={[value]}
          step={step}
          min={min}
          max={max}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "24px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "1px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [0, value],
                    colors: ["#8E8E8E", "#FFFFFF", "#8E8E8E"],
                    min: min,
                    max: max,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              tabIndex={props.tabIndex}
              aria-valuemax={props["aria-valuemax"]}
              aria-valuemin={props["aria-valuemin"]}
              aria-valuenow={props["aria-valuenow"]}
              draggable={props.draggable}
              ref={props.ref}
              role={props.role}
              onKeyDown={props.onKeyDown}
              onKeyUp={props.onKeyUp}
              style={{
                ...props.style,
                height: "24px",
                width: "24px",
                background: "#1a1a1a",
                cursor: "pointer",
                border: "0.75px solid white",
                borderRadius: "50%",
              }}
            />
          )}
        />
      </div>
    );
  }
);

export default Slider;
