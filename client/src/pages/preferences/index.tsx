"use client";
import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "@/graphql/queries/getUserData";

const dietaryOptions = [
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Vegan", label: "Vegan" },
  { value: "Gluten-Free", label: "Gluten-Free" },
  { value: "Halal", label: "Halal" },
  { value: "Kosher", label: "Kosher" },
  { value: "None", label: "None" },
];

const cuisineOptions = [
  { value: "Italian", label: "Italian" },
  { value: "Chinese", label: "Chinese" },
  { value: "Indian", label: "Indian" },
  { value: "Mexican", label: "Mexican" },
  { value: "Thai", label: "Thai" },
  { value: "American", label: "American" },
];

interface PreferencesProps {
  onPreferencesSaved: () => void;
  handleNext: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({
  onPreferencesSaved,
  handleNext,
}) => {
  const [dietaryPreference, setDietaryPreference] = useState<string[]>([]);
  const [cuisinePreference, setCuisinePreference] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast(); // Use the toast hook

  const { data, loading, error } = useQuery(GET_USER_DATA);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (data) {
      const preferencesFilled =
        data.preferences?.dietaryPreferences?.length > 0 ||
        data.preferences?.cuisinePreferences?.length > 0;

      if (preferencesFilled) {
        onPreferencesSaved();
      }
    }
  }, [data, onPreferencesSaved]);

  const handleSave = async () => {
    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dietaryPreferences: dietaryPreference,
            cuisinePreferences: cuisinePreference,
          }),
        }
      );

      if (response.ok) {
        onPreferencesSaved();
        toast({
          title: "Preferences Saved",
          description: "Your preferences have been successfully updated.",
        });
        handleNext();
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to save preferences:",
          errorData.error || response.statusText
        );
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSelect = (
    value: string,
    currentSelection: string[],
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelection((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <PreferenceCombobox
          label="Dietary Preferences"
          options={dietaryOptions}
          selection={dietaryPreference}
          setSelection={setDietaryPreference}
          handleSelect={handleSelect}
        />
      </div>
      <div className="mb-6">
        <PreferenceCombobox
          label="Cuisine Preferences"
          options={cuisineOptions}
          selection={cuisinePreference}
          setSelection={setCuisinePreference}
          handleSelect={handleSelect}
        />
      </div>
      <Button onClick={handleSave}>Save Preferences</Button>
      <p className="text-sm font-bold text-green-500 mt-4">
        Preferences can be updated later in settings.
      </p>
    </div>
  );
};

type PreferenceComboboxProps = {
  label: string;
  options: { value: string; label: string }[];
  selection: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelect: (
    value: string,
    currentSelection: string[],
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
};

const PreferenceCombobox: React.FC<PreferenceComboboxProps> = ({
  label,
  options,
  selection,
  setSelection,
  handleSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h3 className="font-semibold mb-2">{label}</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selection.length > 0
              ? selection.join(", ")
              : `Select ${label.toLowerCase()}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() =>
                      handleSelect(option.value, selection, setSelection)
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selection.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Preferences;
