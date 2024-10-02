interface IProps {
  className?: string;
  progress: number; // Value between 0 and 1
}

export const HeartGradientIcon = ({ className, progress }: IProps) => {
  // Ensure progress is between 0 and 1
  const validProgress = Math.max(0, Math.min(progress, 1));

  return (
    <svg
      className={className}
      viewBox="0 0 241 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient definition for the fill */}
        <linearGradient
          id="paint0_linear_1210_1194"
          x1="113.412"
          y1="2.35777e-06"
          x2="-18.958"
          y2="217.799"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6262D9" />
          <stop offset="1" stopColor="#9D62D9" />
        </linearGradient>

        {/* ClipPath to reveal based on progress */}
        <clipPath id="clip0">
          <rect
            x="0"
            y={`${(1 - validProgress) * 100}%`}
            width="100%"
            height={`${validProgress * 100}%`}
          />
        </clipPath>
      </defs>

      {/* Original heart shape (outline/stroke) */}
      <path
        d="M171.593 71.3661L171.593 71.3657L133.885 26.7756C144.611 12.1581 160.965 2.93623 179.176 3.00033C179.227 3.00334 179.279 3.00502 179.331 3.00534C197.961 3.12135 214.326 13.6524 225.057 29.4069C235.791 45.1652 240.698 65.9057 236.512 85.898C234.44 95.7916 229.891 104.861 224.323 113.568C220.566 119.441 216.452 124.998 212.359 130.527C210.329 133.269 208.305 136.004 206.332 138.767L206.332 138.767C191.625 159.361 162.801 188.748 142.078 208.971C129.735 221.01 111.265 221.01 98.927 208.971L98.9268 208.971C78.1994 188.749 49.3788 159.361 34.6682 138.767C32.6912 135.998 30.6629 133.257 28.6295 130.51C24.5402 124.986 20.4306 119.434 16.6774 113.566C11.1089 104.86 6.55978 95.7914 4.48803 85.898C0.302332 65.9079 5.20861 45.1674 15.9427 29.4085C26.6743 13.6534 43.0394 3.12135 61.6686 3.00534L61.6699 3.00533C69.5888 2.95264 77.877 4.59609 84.8495 8.15839L84.8501 8.15867C89.6831 10.6266 93.0413 14.7322 96.8409 19.3776C97.6703 20.3915 98.5207 21.4312 99.412 22.4852C99.4121 22.4852 99.4121 22.4853 99.4122 22.4853L118.737 45.3388L118.737 45.3392C124.58 52.2461 130.421 59.1541 136.263 66.0623L136.299 66.1045C142.128 72.998 147.957 79.8917 153.788 86.7843C156.097 89.5195 159.384 90.9342 162.693 90.9342C165.411 90.9342 168.137 89.9837 170.347 88.0525C175.232 83.7836 175.784 76.3235 171.593 71.3661Z"
        stroke="url(#paint0_linear_1210_1194)" // Keep the original heart stroke visible
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Filled heart with gradient, clipped based on progress */}
      <path
        d="M171.593 71.3661L171.593 71.3657L133.885 26.7756C144.611 12.1581 160.965 2.93623 179.176 3.00033C179.227 3.00334 179.279 3.00502 179.331 3.00534C197.961 3.12135 214.326 13.6524 225.057 29.4069C235.791 45.1652 240.698 65.9057 236.512 85.898C234.44 95.7916 229.891 104.861 224.323 113.568C220.566 119.441 216.452 124.998 212.359 130.527C210.329 133.269 208.305 136.004 206.332 138.767L206.332 138.767C191.625 159.361 162.801 188.748 142.078 208.971C129.735 221.01 111.265 221.01 98.927 208.971L98.9268 208.971C78.1994 188.749 49.3788 159.361 34.6682 138.767C32.6912 135.998 30.6629 133.257 28.6295 130.51C24.5402 124.986 20.4306 119.434 16.6774 113.566C11.1089 104.86 6.55978 95.7914 4.48803 85.898C0.302332 65.9079 5.20861 45.1674 15.9427 29.4085C26.6743 13.6534 43.0394 3.12135 61.6686 3.00534L61.6699 3.00533C69.5888 2.95264 77.877 4.59609 84.8495 8.15839L84.8501 8.15867C89.6831 10.6266 93.0413 14.7322 96.8409 19.3776C97.6703 20.3915 98.5207 21.4312 99.412 22.4852C99.4121 22.4852 99.4121 22.4853 99.4122 22.4853L118.737 45.3388L118.737 45.3392C124.58 52.2461 130.421 59.1541 136.263 66.0623L136.299 66.1045C142.128 72.998 147.957 79.8917 153.788 86.7843C156.097 89.5195 159.384 90.9342 162.693 90.9342C165.411 90.9342 168.137 89.9837 170.347 88.0525C175.232 83.7836 175.784 76.3235 171.593 71.3661Z"
        fill="url(#paint0_linear_1210_1194)"
        clipPath="url(#clip0)" // Clip based on progress
      />
    </svg>
  );
};
