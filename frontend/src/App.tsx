import { useState } from "react";
import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "./abi.ts";
import { parseUnits } from "viem";
import Header from "./components/Header";
import AddressInput from "./components/AdressInput";
import Button from "./components/Button";
import TokenInput from "./components/TokenInput";
function App() {
  const { address } = useAccount();
  const { data: txHash, isPending, writeContract } = useWriteContract();
  const [token, setToken] = useState("DAI");
  const [amount, setAmount] = useState(0);
  const [targetAddress, setTargetAddress] = useState<`0x${string}` | "">("");
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const { data: receipt, isError } = useWaitForTransactionReceipt({
    hash: txHash,
  });
  const tokenData: Record<string, { address: string; decimals: number }> = {
    DAI: {
      address: "0x1D70D57ccD2798323232B2dD027B3aBcA5C00091",
      decimals: 18,
    },
    USDC: {
      address: "0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47",
      decimals: 9,
    },
  };
  useEffect(() => {
    if (receipt?.status === "success") {
      console.log("Transaction confirmed!", receipt);

      if (isApproving) {
        setIsApproved(true);
        setIsApproving(false);
      }

      if (isTransferring) {
        console.log("Transfer successful! Resetting state...");
        setIsTransferring(false);
        setIsApproved(false);
        setAmount(0);
        setTargetAddress("");
      }
    } else if (isError) {
      console.warn("Transaction failed or rejected!");
      setIsApproved(false);
      setIsApproving(false);
      setIsTransferring(false);
    }
  }, [receipt, isError]);
  const tokenAddress = tokenData[token as keyof typeof tokenData].address;
  const decimals = tokenData[token as keyof typeof tokenData].decimals;

  const balance =
    Number(
      useTokenBalance(address as `0x${string}`, tokenAddress as `0x${string}`)
    ) || 0;

  const handleClick = async () => {
    if (!isApproved) {
      console.log("Sending approve transaction...");
      setIsApproving(true);
      writeContract({
        abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [
          address as `0x${string}`,
          parseUnits(amount.toString(), decimals),
        ],
      });

      console.log("Transaction sent! Waiting for confirmation...");
    } else {
      console.log("Sending transfer transaction...");
      setIsTransferring(true);

      writeContract({
        abi,
        address: tokenAddress as `0x${string}`,
        functionName: "transferFrom",
        args: [
          address as `0x${string}`,
          targetAddress as `0x${string}`,
          parseUnits(amount.toString(), decimals),
        ],
      });

      console.log("Transfer transaction sent! Waiting for confirmation...");
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          margin: "auto",
          width: "30%",
          height: "450px",
          padding: "20px",
          background: "black",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <TokenInput
          amount={amount}
          setAmount={setAmount}
          token={token}
          setToken={setToken}
          balance={balance}
          tokenData={tokenData}
          setIsAmountValid={setIsAmountValid}
        />
        <AddressInput />
        <Button />
      </div>
    </>
  );
}

export default App;
function useTokenBalance(arg0: string, arg1: string): any {
  throw new Error("Function not implemented.");
}
