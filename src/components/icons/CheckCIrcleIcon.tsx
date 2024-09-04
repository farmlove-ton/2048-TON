interface IProps {
  className?: string;
}

export const CheckCircleIcon = ({ className }: IProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.96263 14.2748L5.25 10.5613L6.48725 9.32401L8.96263 11.7985L13.9116 6.84863L15.1497 8.08676L8.96263 14.2748Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.875 10.5C0.875 5.18438 5.18438 0.875 10.5 0.875C15.8156 0.875 20.125 5.18438 20.125 10.5C20.125 15.8156 15.8156 20.125 10.5 20.125C5.18438 20.125 0.875 15.8156 0.875 10.5ZM10.5 18.375C9.46584 18.375 8.44181 18.1713 7.48637 17.7756C6.53093 17.3798 5.6628 16.7997 4.93153 16.0685C4.20027 15.3372 3.6202 14.4691 3.22445 13.5136C2.82869 12.5582 2.625 11.5342 2.625 10.5C2.625 9.46584 2.82869 8.44181 3.22445 7.48637C3.6202 6.53093 4.20027 5.6628 4.93153 4.93153C5.6628 4.20027 6.53093 3.6202 7.48637 3.22445C8.44181 2.82869 9.46584 2.625 10.5 2.625C12.5886 2.625 14.5916 3.45468 16.0685 4.93153C17.5453 6.40838 18.375 8.41142 18.375 10.5C18.375 12.5886 17.5453 14.5916 16.0685 16.0685C14.5916 17.5453 12.5886 18.375 10.5 18.375Z"
        fill="white"
      />
    </svg>
  );
};
