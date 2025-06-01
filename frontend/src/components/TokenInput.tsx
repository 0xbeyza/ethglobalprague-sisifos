import Select from "react-select";
import { useState } from "react";

interface TokenInputProps {
  amount: number;
  setAmount: (amount: number) => void;
  token: string;
  setToken: (token: string) => void;
  balance: number | null;
  tokenData: Record<string, { address: string; decimals: number }>;
  setIsAmountValid: (isValid: boolean) => void;
}
const TokenInput = ({
  amount,
  setAmount,
  token,
  setToken,
  balance,
  tokenData,
  setIsAmountValid,
}: TokenInputProps) => {
  const tokenOptions = Object.keys(tokenData).map((key) => ({
    value: key,
  }));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === "") {
      setAmount(NaN);
      setError(null);
      return;
    }

    let numericValue = parseFloat(value);

    if (numericValue < 0) {
      setError("Negative value cannot be used!");
      setIsAmountValid(false);
      return;
    }

    if (balance !== null && numericValue > balance) {
      setError("Amount cannot exceed balance!");
      setIsAmountValid(false);
      return;
    }

    setAmount(numericValue);
    setIsAmountValid(true);
    setError(null);
  };

  return (
    <>
      <div
        style={{
          background: "white",
          height: "40%",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="number"
          placeholder="0.00"
          value={isNaN(amount) ? "" : amount}
          onChange={handleChange}
          required
        />{" "}
        <button className="max-amount" onClick={() => setAmount(balance ?? 0)}>
          MAX
        </button>
        <Select
          className="token-select"
          options={tokenOptions}
          value={tokenOptions.find((option) => option.value === token)}
          onChange={(selectedOption) =>
            setToken(selectedOption?.value || token)
          }
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#212A36",
              border: "none",
              borderRadius: "25px",
              padding: "2.5% 2%",
              width: "100%",
              height: "40px",
              fontSize: "15px",
              boxShadow: "none",
              outline: "none",
              paddingBottom: "40px",
              gridArea: "token",
              marginTop: "18px",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#212A36",
              borderRadius: "10px",
              minWidth: "150px",
            }),
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#2C3E50" : "#212A36",
              color: "#FFFFFF",
              borderRadius: "20px",
              cursor: "pointer",
            }),
            indicatorSeparator: () => ({
              display: "none",
            }),
          }}
        />
        {error && (
          <b
            className="error-text"
            style={{
              color: "#2699FE",
              fontSize: "12px",
              width: "max-content",
              gridArea: " error",
            }}
          >
            {error}
          </b>
        )}
        <p>
          Balance: {balance} {token}
        </p>
      </div>
    </>
  );
};

// const TokenInput = () => {
//   return (
//     <>
//       <div
//         style={{
//           background: "white",
//           height: "40%",
//           borderRadius: "10px",
//           marginBottom: "20px",
//         }}
//       ></div>

//     </>
//   );
// };

export default TokenInput;
