import Button from "./Button";
import CollapsibleTable from "./Tables";
import BasicModal from "./Modal";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";

const App = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [registryID, setRegistryID] = useState();

  const handleOpen = (id) => {
    setOpen(true);
    setRegistryID(id);
  };
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://674a75678680202966348afe.mockapi.io/task-planner/registry",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header className="header">
        <h1>Registro de Horas</h1>
      </header>
      <main>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"flex-end"}
          width={"100%"}
        >
          <div className="container">
            <Button
              onClick={() => handleOpen(undefined)}
              label={"Criar registro"}
            />
          </div>
        </Stack>
        <section>
          <CollapsibleTable data={data} handleOpen={handleOpen} />
        </section>
        <BasicModal
          open={open}
          handleClose={handleClose}
          getData={getData}
          registryID={registryID}
        />
      </main>
    </>
  );
};
export default App;
