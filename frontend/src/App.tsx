import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';
import { useWindowSize } from './components/shared/hooks/useWindowSize';
import Unsupported from './components/shared/unsupported/Unsupported';

function App() {
  const pathName = useLocation().pathname;
  const size = useWindowSize();
  const [showUnsupportedWidth, setShowUnsupportedWidth] = useState(false);

  useEffect(() => {
    if (size.width < 1000 && !showUnsupportedWidth) {
      setShowUnsupportedWidth(true);
    } else if (showUnsupportedWidth && size.width > 1000) {
      setShowUnsupportedWidth(false);
    }
  }, [size]);

  return (
    <>
      {showUnsupportedWidth ? (
        <Unsupported />
      ) : (
        <div>
          <div className="App">
            {!(pathName == '/dashboard' || pathName == '/dashboardCompany') && <Navbar />}
            <AppRouter />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
