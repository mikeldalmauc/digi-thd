/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MasterPanel from './pages/MasterPanel';
import HandView from './pages/HandView';
import CardDetail from './pages/CardDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
        <Routes>
          <Route path="/" element={<MasterPanel />} />
          <Route path="/hand" element={<HandView />} />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
