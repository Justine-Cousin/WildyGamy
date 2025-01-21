import AdminItemGrid from "../../components/admin/AdminItemGrid";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminData } from "../../components/admin/useAdminData";
import type { User } from "../../services/types";
import "../../styles/admin/AdminUsers.css";

const AdminUsers = () => {
  const {
    data: users,
    loading,
    error,
  } = useAdminData<User>({
    fetchUrl: "/api/users",
    loadingMessage: "Invocation des joueurs",
  });

  if (loading) {
    return (
      <div className="users-loading-page">
        <div className="users-loading-message">Invocation des joueurs...</div>
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
      containerClassName="adminusers-container"
      contentClassName="adminusers-content"
      logoClassName="adminusers-logo"
    >
      <div className="admingrid-card">
        {users?.map((user) => (
          <AdminItemGrid key={user.id} id={user.id} type="user" user={user} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
