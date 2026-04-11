type ButtonProps = {
  text: string;
  icon: string;
  variant?: string;
  position?: string;
  column?: number;
};

function CustomButton({
  text,
  icon,
  variant = "primary",
  position,
  column,
}: ButtonProps) {
  return (
    <div className={`col-md-${column} d-flex justify-content-${position}`}>
      <button className={`btn btn-${variant} d-flex align-items-center gap-2`}>
        <i className={`bi ${icon}`}></i>
        {text}
      </button>
    </div>
  );
}
export default CustomButton;
