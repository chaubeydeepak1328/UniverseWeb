
// import Home from './pages/Home';
import Login from './pages/Login';
import UserPanel from './pages/UserPanel';
import EVRToken from './pages/EVRToken';
import { Route, Routes } from 'react-router-dom';
import BuyToken from './pages/BuyToken';
import SellToken from './pages/SellToken'
import ExpressLogin from './pages/ExpressLogin'
import DMatrix from './pages/DMatrix';
import Team from './pages/Team';
import Partners from './components/Partners';
import UplineBonus from './components/UplineBonus';
import Activate from './components/Activate';
import Home from './pages/Home';
// import LaunchingPage from './components/LanchingPage';
import Dmatrix1 from './pages/userpaneldmatrix/Dmatrix1';
import Umatrix1 from './pages/userpaneldmatrix/Umatrix1';


// =================================================
// Wallet Connect Functionality
// =================================================


import { WagmiProvider } from 'wagmi'
import { useState } from 'react'

import { createAppKit } from '@reown/appkit/react'
// import { ActionButtonList } from './Provider/ActionButtonList'
// import { SmartContractActionButtonList } from './Provider/SmartContractActionButtonList'
// import { InfoList } from './Provider/InfoList'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'


const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


function App() {

  const [transactionHash, setTransactionHash] = useState(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  const receiveHash = (hash) => {
    setTransactionHash(hash);
  };

  const receiveSignedMsg = (msg) => {
    setSignedMsg(msg);
  };

  const receiveBalance = (bal) => {
    setBalance(bal);
  };



  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/' element={<LaunchingPage/>}/> */}
          <Route path='/erv-token-home' element={<EVRToken />} />
          <Route path='/user-login' element={<Login />} />
          <Route path='/express-login' element={<ExpressLogin />} />
          <Route path='/buy-token' element={<BuyToken />} />
          <Route path='/sell-token' element={<SellToken />} />
          <Route path="/user-panel-home" element={<UserPanel />} />
          <Route path='/d-matrix' element={<DMatrix />} />
          <Route path='/user-panel-home/team' element={<Team />} />
          <Route path='/user-panel-home/partners' element={<Partners />} />
          <Route path='/user-panel-home/upline-bonus' element={<UplineBonus />} />
          <Route path='/user-panel-home/slot-activate' element={<Activate />} />
          {/* dmatrix 10 */}
          <Route path='/user-panel-dmatrix1' element={<Dmatrix1 />} />
          {/* umatrix */}
          <Route path='/user-panel-home/user-panel-umatrix1' element={<Umatrix1 />} />
        </Routes>
      </QueryClientProvider>
    </WagmiProvider>


  )
}

export default App
