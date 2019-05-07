import { useState, useReducer, useEffect } from "react";

export const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    reset: () => setValue(""),
    required: true
  };
};

export const useMapReducer = () => {
  const initState = {
    lat: 0,
    lng: 0,
    open: false
  };

  const mapReduser = (state, action) => {
    switch (action.type) {
      case "MOVE":
        return {
          lat: action.lat,
          lng: action.lng,
          open: true
        };
      case "RESET":
        return { ...initState };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(mapReduser, initState);

  return {
    state,
    dispatch
  };
};

export const useDeleteItem = fun => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteItem = async id => {
    setOpen(!open);
    setVisible(false);

    await fun({
      variables: {
        id
      }
    });
  };

  return {
    visible,
    setVisible,
    open,
    setOpen,
    deleteItem
  };
};

export const useWindow = () => {
  const [width, setWidth] = useState(false);

  const resizeWindow = () => {
    if (window.innerWidth > 600) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return [width, resizeWindow];
};

export const useProfileId = jwt => {
  const main = localStorage.getItem("token");

  let ProfileId = 0;

  if (main) {
    try {
      ProfileId = jwt.decode(main).id.ProfileId;
    } catch (error) {
      console.log(error);
    }
  }

  return ProfileId;
};
