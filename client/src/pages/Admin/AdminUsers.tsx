import AdminItemGrid from "../../components/admin/AdminItemGrid";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminData } from "../../components/admin/useAdminData";
import type { User } from "../../services/types";

/*const DEFAULT_USERS: User = {
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
};*/

const AdminUsers = () => {
  const {
    data: users,
    loading,
    //error,//
    //updateItem,//
    deleteItem,
    //addItem,//
  } = useAdminData<User>({
    fetchUrl: "/api/users",
    loadingMessage: "Invocation des joueurs",
  });

  /* const handleEditClick = (user: User) => {
    setModalMode("edit");
    setSelectedUser({
      ...user,
      name: user.name || "",
      firstname: user.firstname || "",
      email: user.email || "",
      username: user.username || "",
      phone_number: user.phone_number || "",
      profile_pic: user.profile_pic || "",
      total_points: user.total_points,
      current_points: user.current_points,
    });
  };

   const handleAddClick = () => {
    setSelectedUser(DEFAULT_USERS);
    setModalMode("add");
  };

   const handleSave = async (userData: {
    name: string;
    firstname: string;
    email: string;
    username: string;
    phone_number?: string;
    profile_pic?: string;
    total_points: number;
    current_points: number;
    is_admin: boolean;
  }) => {
    try {
      const formattedData = {
        name: userData.name,
        firstname: userData.firstname,
        email: userData.email,
        username: userData.username,
        password_hash: "", // Add a default or empty value for password_hash
        phone_number: userData.phone_number,
        profile_pic: userData.profile_pic,
        total_points: userData.total_points,
        current_points: userData.current_points,
        is_admin: userData.is_admin,
      };

      if (modalMode === "add") {
        await addItem(formattedData);
      } else {
        await updateItem(selectedUser.id, formattedData);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setLocalError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  }; */

  if (loading) {
    return (
      <div className="admin-loading-page">
        <div className="admin-loading-message">Invocation des joueurs...</div>
      </div>
    );
  }

  /* if (error || localError) {
    return (
      <div className="admin-loading-page">
        <div className="admin-error-message">{error || localError}</div>
      </div>
    );
  } */

  return (
    <AdminLayout
      showAddButton={true}
      //onAddClick={handleAddClick}//
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
            //onEdit={handleEditClick}://
            onDelete={deleteItem}
          />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
