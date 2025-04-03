"use client";
import React, { createContext, useRef, useState } from "react";

const initialState = {
  loading: false,
};

export const AuthContextProvider = createContext(initialState);

const AuthContext = ({ children }) => {
  const [state1, setState] = React.useState(true);
  const [Leave, setLeave] = React.useState(false);
  const section1Ref = useRef(null);
  const [id, setId] = useState("id");
  const [enquiryName, setEnquiryName] = React.useState("");
  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState(null);
  const [eventType, setEventType] = React.useState("");

  return (
    <AuthContextProvider.Provider
      value={{
        state1,
        setState,
        Leave,
        setLeave,
        id,
        setId,
        section1Ref,
        enquiryName,
        setEnquiryName,
        eventName,
        setEventName,
        eventDate,
        setEventDate,
        eventType,
        setEventType,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
