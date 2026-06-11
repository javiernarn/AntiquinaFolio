import { useEffect } from "react";


function App() {
  useEffect(() => {
    window.location.href = "src/portfolio/index.html";
  }, []);

  return <div>Loading portfolio...</div>;
}

export default App;