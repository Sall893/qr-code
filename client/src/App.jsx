import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeePage from './pages/EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dynamic Route for manual pages */}
        {/* URL will be like http://localhost:5173/fama-diaw */}
        <Route path="/:slug" element={<EmployeePage />} />

        {/* Default / Home */}
        <Route path="/" element={
          <div className="h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">PowerTech Digital Cards</h1>
            <p className="text-gray-500">Scan an employee QR code to view their profile.</p>
            <div className="mt-4 p-4 bg-white shadow rounded-lg max-h-[60vh] overflow-y-auto w-full max-w-md">
              <p className="text-sm font-semibold mb-2">Example Pages:</p>
              <ul className="list-disc pl-5 text-blue-600">
                <li><a href="/fama-diaw">/fama-diaw</a></li>
                <li><a href="/souleymane-sall">/souleymane-sall</a></li>
                <li><a href="/mame-ngone-sy">/mame-ngone-sy</a></li>
                <li><a href="/oulimata-cissokho">/oulimata-cissokho</a></li>
                <li><a href="/yara-coulibaly">/yara-coulibaly</a></li>
                <li><a href="/rabyatou-diallo">/rabyatou-diallo</a></li>
                <li><a href="/mariama-tine">/mariama-tine</a></li>
                <li><a href="/houleye-sy">/houleye-sy</a></li>
                <li><a href="/oumy-mboup">/oumy-mboup</a></li>
                <li><a href="/mame-diarra-sagne">/mame-diarra-sagne</a></li>
                <li><a href="/ibrahima-sene">/ibrahima-sene</a></li>
                <li><a href="/kine-gueye-sambe">/kine-gueye-sambe</a></li>
                <li><a href="/ngone-thiam">/ngone-thiam</a></li>
                <li><a href="/abdoul-aziz-fall">/abdoul-aziz-fall</a></li>
                <li><a href="/anta-gaye">/anta-gaye</a></li>
                <li><a href="/mademba-thiam">/mademba-thiam</a></li>
                <li><a href="/papa-dethie-thiam">/papa-dethie-thiam</a></li>
                <li><a href="/powertech-digital-cards">/powertech-digital-cards</a></li>
              </ul>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
