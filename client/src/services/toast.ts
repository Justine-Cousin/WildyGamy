import { toast } from "react-toastify";

const toastSuccess = (title: string) => {
  toast.success(title, {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    theme: "colored",
    style: {
      background: "#9001f5",
      color: "white",
    },
  });
};

const toastError = (title: string) => {
  toast.error(title, {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    theme: "colored",
    style: {
      background: "#FE00EA",
      color: "white",
    },
  });
};

export { toastSuccess, toastError };
