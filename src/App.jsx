import React from "react";
import IconLabelButtons from "./Button";
import CollapsibleTable from "./Tables";

const App = () => {
  return (
    <>
      <header className="header">
        <h1>Registro de Horas</h1>
      </header>
      <main>
        <div className="container">
          <IconLabelButtons />
        </div>
        <section>
          <CollapsibleTable />
        </section>
      </main>
    </>
  );
};
export default App;
