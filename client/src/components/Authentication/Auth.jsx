import React, { useState, useReducer, useCallback } from "react";
import Input from "../FormElements/Input";
import "./Auth.css";
// import axios from "axios";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../helper/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formValidity = true;
      for (const inputid in state.inputs) {
        if (inputid === action.inputId) {
          formValidity = formValidity && action.isValid;
        } else {
          formValidity = formValidity && state.inputs[action.inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.val, isValid: action.isValid },
        },
        isValid: formValidity,
      };
    default:
      return state;
  }
};

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      surname: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  console.log(formState);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      val: value,
      isValid: isValid,
    });
  }, []);

  const switchModeHandler = () => {
    setIsLoggedIn((prevMde) => !prevMde);
  };

  const { surname, name, email, password } = formState.inputs;
  const data = {
    username: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
  };

  console.log(data);

  const setStorage = (newData) => {
    localStorage.setItem("user", JSON.stringify(newData));
    console.log("data is set");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formState);

    !isLoggedIn && setStorage(data);
    //  fetch("http://localhost:3001/authorization", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         localStorage.setItem(email.value, data);
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // : fetch("http://localhost:3001/login", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: email.value,
    //       password: password.value,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));

    // axios
    //   .post("http://localhost:3001/authorization", {
    //     username: name,
    //     surname,
    //     email,
    //     password,
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="authentication">
      <h1 className="animate__animated animate__zoomIn loginTitle">
        {!isLoggedIn ? "Signup" : "Login"}
      </h1>
      <form onSubmit={submitHandler}>
        {!isLoggedIn && (
          <>
            <Input
              id="name"
              type="text"
              placeholder="NAME..."
              errorText="Something wrong!"
              validators={VALIDATOR_REQUIRE()}
              onInput={inputHandler}
            />
            <Input
              id="surname"
              type="text"
              placeholder="SURNAME..."
              errorText="Something wrong!"
              validators={VALIDATOR_REQUIRE()}
              onInput={inputHandler}
            />
          </>
        )}
        <Input
          id="email"
          type="text"
          placeholder="EMAIL..."
          errorText="Something wrong!"
          validators={VALIDATOR_EMAIL()}
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          placeholder="PASSWORD..."
          errorText="Something wrong!"
          validators={VALIDATOR_MINLENGTH(5)}
          onInput={inputHandler}
        />
        <button disabled={!formState.isValid} className="inputEl">
          Submit
        </button>
      </form>
      <button onClick={switchModeHandler} className="switch">
        Switch To {isLoggedIn ? "Signup" : "Login"}
      </button>
    </div>
  );
}

export default Auth;
