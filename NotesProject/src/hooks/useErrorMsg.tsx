import { useState } from "react";

export function useErrorMsg() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  function showErrorMsg(msg: string) {
    setErrorMsg(msg);

    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  }

  return { errorMsg, showErrorMsg };
}

export default useErrorMsg;
