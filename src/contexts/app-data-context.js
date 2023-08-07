import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./auth-context";
import { GetProjects, GetUserStats } from "@/utils/axios/axios";

const PROJECT_ACTIONS = {
  SET_PROJECTS: "SET_PROJECTS",
};

const KEYWORDS_ACTIONS = {
  SET_KEYWORDS: "SET_KEYWORDS",
};

const USER_STATS_ACTIONS = {
  SET_USER_STATS: "SET_USER_STATS",
};

const appDataInitialState = {
  projects: [],
  keywords: [],
  userStats: null,
};

const appDataReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case KEYWORDS_ACTIONS.SET_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
      };
    case USER_STATS_ACTIONS.SET_USER_STATS:
      return {
        ...state,
        userStats: action.payload,
      };
    default:
      return state;
  }
};

export const AppDataContext = createContext({ undefined });

export const AppDataProvider = (props) => {
  const { children } = props;
  const { user } = useContext(AuthContext);
  const [appDataState, appDataDispatch] = useReducer(
    appDataReducer,
    appDataInitialState
  );
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const data = await GetProjects({
      client_id: user.id,
    });

    appDataDispatch({ type: "SET_PROJECTS", payload: data });

    const userstats = await GetUserStats();

    appDataDispatch({ type: "SET_USER_STATS", payload: userstats });
  };

  useEffect(() => {
    if (user?.id) {
      initialize();
    }
  }, [user]);

  return (
    <AppDataContext.Provider
      value={{
        appDataState,
        appDataDispatch,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

AppDataProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppDataContext = () => useContext(AppDataContext);
