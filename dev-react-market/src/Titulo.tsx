function Titulo() {
  const name = "Juan";
  if (name) {
    return <h1>Hola {name}</h1>;
  } else {
    return <h1>Hola mundo</h1>;
  }
}

export default Titulo;
