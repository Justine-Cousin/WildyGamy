import { useCallback, useEffect, useState } from "react";

interface AdminDataConfig<T> {
  fetchUrl: string;
  initialData?: T[];
  loadingMessage?: string;
}

export const useAdminData = <T extends { id: number }>({
  fetchUrl,
  initialData = [],
  loadingMessage = "Chargement...",
}: AdminDataConfig<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}${fetchUrl}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]); // fetchUrl est la seule dépendance nécessaire

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateItem = async (id: number, updateData: Partial<T>) => {
    try {
      const response = await fetch(`${API_URL}${fetchUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...updateData } : item,
        ),
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      throw error;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}${fetchUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  const addItem = async (itemData: Omit<T, "id">) => {
    try {
      const response = await fetch(`${API_URL}${fetchUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(itemData),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const newItem = await response.json();
      setData([...data, newItem]);
      return newItem;
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      throw error;
    }
  };

  const updateAvailability = async (id: number, isAvailable: boolean) => {
    try {
      const response = await fetch(`${API_URL}${fetchUrl}/${id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isAvailable }),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setData(
        data.map((item) =>
          item.id === id ? { ...item, is_available: isAvailable } : item,
        ),
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la disponibilité:",
        error,
      );
      throw error;
    }
  };

  return {
    data,
    loading,
    error,
    updateItem,
    deleteItem,
    addItem,
    updateAvailability,
    setData,
    loadingMessage,
  };
};
