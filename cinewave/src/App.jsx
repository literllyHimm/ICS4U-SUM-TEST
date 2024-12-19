import "./App.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { SharedContext } from "./SharedContext";

import { Outlet, useNavigation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Profile from "./components/Profile/Profile";
import ResetScrollPosition from "./components/ResetScrollPosition/ResetScrollPosition";
const MobileProfile = lazy(() =>
  import("./components/MobileProfile/MobileProfile")
);
import Loading from "./components/Loading/Loading";
import Process from "./components/Process/Process";

const MobileNavigation = lazy(() =>
  import("./components/MobileNavigation/MobileNavigation")
);

function App() {
  const [theme, settheme] = useState("dark");
  const [mobileView, setmobileView] = useState(false);
  const [NavActive, setNavActive] = useState(false);
  const [ThemeOptions, setThemeOptions] = useState(false);
  const [ShowProfile, setShowProfile] = useState(false);
  const [processing, setProcessing] = useState({
    started: null,
    success: null,
  });

  const navigation = useNavigation();

  function checkWindow() {
    if (window.innerWidth <= 600) {
      setmobileView(true);
    } else {
      setmobileView(false);
    }
  }

  window.addEventListener("resize", () => {
    checkWindow();
  });

  useEffect(() => {
    checkWindow();

    const themes = document.querySelectorAll(".theme_colors .theme");

    themes.forEach((it) => {
      it.addEventListener("click", () => {
        settheme(it.getAttribute("data-theme"));
      });
    });
  }, []);

  function toggle() {
    if (NavActive) {
      setNavActive(false);
    }

    if (ThemeOptions) {
      setThemeOptions(false);
    }

    if (ShowProfile) {
      setShowProfile(false);
    }
  }

  useEffect(() => {
    if (processing.success === true || processing.success === false) {
      setTimeout(() => {
        setProcessing({
          started: null,
          success: null,
        });
      }, 4000);
    }
  }, [processing]);

  return (
    <div
      className={`app ${theme}_theme ${
        (NavActive || ShowProfile || navigation.state == "loading") &&
        "drop_blinds"
      }`}
    >
      <SharedContext.Provider
        value={{
          mobileView,
          NavActive,
          setNavActive,
          ThemeOptions,
          setThemeOptions,
          ShowProfile,
          setShowProfile,
          processing,
          setProcessing,
        }}
      >
        {mobileView ? (
          <Suspense fallback="">
            <MobileNavigation />
            <MobileProfile />
          </Suspense>
        ) : (
          <Navigation />
        )}

        {navigation.state == "loading" && <Loading />}

        <main>
          <div className="blinds" onClick={toggle}></div>

          <Header />
          <Profile />

          {processing.started && <Process />}

          <ResetScrollPosition>
            <Outlet />
          </ResetScrollPosition>
        </main>
      </SharedContext.Provider>
    </div>
  );
}

export default App;
