import { useState } from "react";
import AdminItemGrid from "../../components/admin/AdminItemGrid";
import AdminLayout from "../../components/admin/AdminLayout";
import ModalAdminUser from "../../components/admin/ModalAdminUser";
import { useAdminData } from "../../components/admin/useAdminData";
import type { User } from "../../services/types";
import "../../styles/admin/AdminUsers.css";
import "../../styles/admin/AdminCommon.css";

const DEFAULT_USER: User = {
  id: 0,
  name: "",
  firstname: "",
  email: "",
  username: "",
  password_hash: "",
  phone_number: "",
  profile_pic: "",
  total_points: 0,
  current_points: 0,
  is_admin: false,
};

const AdminUsers = () => {
  const {
    data: users,
    loading,
    error,
    updateItem,
    deleteItem,
    setData,
  } = useAdminData<User>({
    fetchUrl: "/api/users",
    loadingMessage: "Invocation des joueurs",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("edit");
  const [selectedUser, setSelectedUser] = useState<User>(DEFAULT_USER);

  const handleEditClick = (user: User) => {
    setModalMode("edit");
    setSelectedUser({
      ...user,
      name: user.name || "",
      firstname: user.firstname || "",
      username: user.username || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      profile_pic: user.profile_pic || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (userData: {
    name: string;
    firstname: string;
    username: string;
    email: string;
    phone_number: string;
    profile_pic: string;
  }) => {
    try {
      const formattedData = {
        name: userData.name,
        firstname: userData.firstname,
        username: userData.username,
        email: userData.email,
        phone_number: userData.phone_number,
        profile_pic: userData.profile_pic,
        password_hash: selectedUser.password_hash || "",
        total_points: selectedUser.total_points || 0,
        current_points: selectedUser.current_points || 0,
        is_admin: selectedUser.is_admin || false,
      };

      await updateItem(selectedUser.id, formattedData);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBan = async (id: number) => {
    try {
      const user = users?.find((user) => user.id === id);
      if (!user) return;

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/users/${id}/ban`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_banned: !user.is_banned }),
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const updatedUsers = users?.map((user) =>
        user.id === id ? { ...user, is_banned: !user.is_banned } : user,
      );
      if (updatedUsers) {
        setData(updatedUsers);
      }
    } catch (error) {
      console.error("Erreur lors du bannissement:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-page">
        <div className="admin-loading-message">Invocation des joueurs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-loading-page">
        <div className="admin-error-message">{error}</div>
      </div>
    );
  }

  return (
    <AdminLayout
      showAddButton={false}
      containerClassName="adminusers-container"
      contentClassName="adminusers-content"
      logoClassName="adminusers-logo"
    >
      <div className="admingrid-card">
        {users?.map((user) => (
          <AdminItemGrid
            key={user.id}
            id={user.id}
            type="user"
            user={user}
            onEdit={handleEditClick}
            onDelete={deleteItem}
            onBan={handleBan}
            isBanned={user.is_banned}
          />
        ))}
      </div>

      <ModalAdminUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={{
          ...selectedUser,
          name: selectedUser.name || "",
          firstname: selectedUser.firstname || "",
          username: selectedUser.username || "",
          email: selectedUser.email || "",
          phone_number: selectedUser.phone_number || "",
          profile_pic: selectedUser.profile_pic || "",
        }}
        onSave={handleSave}
        mode={modalMode || "edit"}
      />
    </AdminLayout>
  );
};

export default AdminUsers;
