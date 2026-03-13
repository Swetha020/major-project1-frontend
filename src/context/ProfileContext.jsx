import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const ProfileContext = createContext();
export const useProfileContext = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {
  const {
    data: userAddresses = [],
    loading,
    error,
  } = useFetch("https://major-project1-backend-eight.vercel.app/address");

  const [addresses, setAddresses] = useState([]);
  const user = {
    name: "Swetha Mahesh",
    email: "swetha@gmail.com",
    phone: "+91 98765 43210",
    addresses: addresses,
  };

  useEffect(() => setAddresses(userAddresses), [userAddresses]);

  async function addAddress(address) {
    const response = await fetch("https://major-project1-backend-eight.vercel.app/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    const data = await response.json();
    const newAddress = data.address;
    
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  }

  async function updateAddress(addressId, updateAddress) {
    const response = await fetch(`https://major-project1-backend-eight.vercel.app/address/${addressId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateAddress),
    });

    const updatedAddress = await response.json();

    setAddresses((prevAddresses) =>
      prevAddresses.map((addr) => (addr._id === addressId ? updatedAddress : addr)),
    );
  }

  async function deleteAddress(addressId) {
    await fetch(`https://major-project1-backend-eight.vercel.app/address/${addressId}`, {
      method: "DELETE",
    });
    setAddresses((prevAddresses) =>
      prevAddresses.filter((addr) => addr._id != addressId),
    );
  }

  return (
    <ProfileContext.Provider
      value={{ user, loading, error, addAddress, updateAddress, deleteAddress }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
