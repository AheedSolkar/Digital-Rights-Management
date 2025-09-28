// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import UploadAsset from "./components/UploadAsset";
// import RegisterAsset from "./components/RegisterAsset";
// import IssueLicense from "./components/IssueLicense";
// import TransferOwnership from "./components/TransferOwnership";

// function App() {
//   return (
//     <Router>
//       <div className="container mt-3">
//         <nav>
//           <Link className="btn btn-primary m-2" to="/">Upload</Link>
//           <Link className="btn btn-secondary m-2" to="/register">Register</Link>
//           <Link className="btn btn-warning m-2" to="/license">License</Link>
//           <Link className="btn btn-success m-2" to="/ownership">Ownership</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<UploadAsset />} />
//           <Route path="/register" element={<RegisterAsset />} />
//           <Route path="/license" element={<IssueLicense />} />
//           <Route path="/ownership" element={<TransferOwnership />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterAsset from "./components/RegisterAsset";
import IssueLicense from "./components/IssueLicense";
import TransferOwnership from "./components/TransferOwnership";
import ViewAssets from "./components/ViewAssets"; // Corrected import name

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <nav>
          <Link to="/register" className="btn btn-primary m-2">Register Asset</Link>
          <Link to="/license" className="btn btn-warning m-2">Issue License</Link>
          <Link to="/ownership" className="btn btn-success m-2">Transfer Ownership</Link>
          <Link to="/viewasset" className="btn btn-info m-2">View Assets</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterAsset />} />
          <Route path="/license" element={<IssueLicense />} />
          <Route path="/ownership" element={<TransferOwnership />} />
          <Route path="/viewasset" element={<ViewAssets />} /> {/* Corrected component reference */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
