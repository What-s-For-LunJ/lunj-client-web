import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface AddressFormProps {
  onAddressSaved: () => void;
  handleNext: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  onAddressSaved,
  handleNext,
}) => {
  const [label, setLabel] = useState<string>("primary");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const { toast } = useToast(); // Use the toast hook

  const handleSaveAddress = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label,
          addressLine1,
          addressLine2,
          city,
          postalCode,
          country,
        }),
      });

      if (response.ok) {
        onAddressSaved();
        toast({
          title: "Address Saved",
          description: "Your address has been successfully updated.",
        });
        handleNext(); // Move to the next step
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to save address(es). Make sure you filled it in correctly",
        });
        console.error(
          "Failed to save address:",
          errorData.error || response.statusText
        );
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <Select onValueChange={setLabel} value={label}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select address type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Address Type</SelectLabel>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="office">Office</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Address Line 1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Address Line 2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <Button onClick={handleSaveAddress} className="w-full">
        Save Address
      </Button>
      <p className="text-sm font-bold text-green-500 mt-4">
        Addresses can be updated later in settings.
      </p>
    </div>
  );
};

export default AddressForm;
