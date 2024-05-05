import Swal from "sweetalert2";
import axios from "axios";

export default {
  methods: {
    ShowToast(status, title, message) {
      Swal.fire({
        icon: status,
        title: title,
        toast: true,
        text: message,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    },
  },
};
