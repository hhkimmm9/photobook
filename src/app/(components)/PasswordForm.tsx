import { useState, FormEvent } from "react";

interface IPasswordFormProps {
  hasAccess: () => void;
}

const PasswordForm = ({ hasAccess }: IPasswordFormProps) => {
  const [passwordState, setPasswordState] = useState({
    hasAccess: false,
    pwd: "",
    warningMessage: ""
  });

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/verifyPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordState.pwd }),
      });

      const result = await res.json();

      if (result.success) {
        hasAccess();
      } else {
        setPasswordState({ ...passwordState, pwd: "", warningMessage: "Incorrect password" })
      }
    } catch (error) {
      console.error("Error verifying password", error)
    }
  }

  return (
    // Password form
    <div className="grid justify-items-center h-[calc(100vh-10rem)]">
      <form onSubmit={handlePasswordSubmit} className="w-64 flex flex-col gap-4 justify-center items-center">
      <input
        type="password"
        value={passwordState.pwd}
        placeholder="Password"
        onChange={e => setPasswordState({ ...passwordState, pwd: e.target.value, warningMessage: "" })}
        className="w-full p-2 border border-gray-300 rounded-md outline-none border-none"
      />
      <button type="submit" className="w-full p-2 bg-stone-500 text-white rounded-md font-medium">
        Submit
      </button>
      <div className="h-4 mt-2 px-1 text-sm text-red-600">{passwordState.warningMessage}</div>
      </form>
    </div>
  )
}

export default PasswordForm