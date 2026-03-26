function ButtonAdd(props: { className?: string }) {
  return (
    <div className="col-md-2 d-flex justify-content-end">
      <button
        className={
          props.className + "btn btn-primary d-flex align-items-center gap-2"
        }
        style={{
          bottom: "20px",
          right: "40px",
          width: "60px",
          height: "60px",
        }}
      >
        <i className="bi bi-plus-circle"></i>
        agregar
      </button>
    </div>
  );
}
export default ButtonAdd;
