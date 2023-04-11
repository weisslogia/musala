import { useEffect, useState } from 'react'
import './App.scss'
import { CreateGateway } from './components/CreateGateway'
import { IGateway } from './interfaces/gateway';
import { deleteGateway, fetchAllGateways } from './services/gateway';
import toast, { Toaster } from 'react-hot-toast';
import { Confirm } from './components/Confirm';
import { TableRow } from './components/TableRow';

function App() {
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [gateways, setGateways] = useState<IGateway[]>([]);
  const [removeIndex, setRemoveIndex] = useState<string>("")

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchAllGateways();
        setGateways(result);
        setRefresh(false)
      } catch (e) {
        toast.error("An error occur on fetching the gateways.")
        setRefresh(false);
      }
    }
    if (refresh) {
      fetch();
    }
  }, [refresh])



  const handleCreateModal = (isOpen: boolean, refresh: boolean) => {
    setIsOpenCreate(isOpen)
    setRefresh(refresh)
  }

  return (
    <div className="app_container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="table">
        <div className="table__actions">
          <button className="accent_button" onClick={() => setIsOpenCreate(true)}>
            Create Gateway
          </button>
        </div>
        <div className="table__gridify table__tableHeader">
          <span>Name</span>
          <span>No. Peripherals</span>
          <span>Ip Address:</span>
          <span>acciones</span>
        </div>
        {gateways.map((gateway, index) => (
          <TableRow gateway={gateway} key={index} onDelete={setRefresh} />
        ))}
      </div>
      {isOpenCreate && (
        <CreateGateway setIsOpen={handleCreateModal} type="create" />
      )}

    </div>
  )
}

export default App
