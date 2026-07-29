import Swal from "sweetalert2";
import Cookies from "js-cookie";

const showAlert = (icon, title) => {
  Swal.fire({
    position: 'top-end',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    toast: true,
  })
}

const storeTokens = (access, refresh) => {
  Cookies.set('access_token', access, { secure: true, sameSite: 'Lax' })
  Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'Lax' })
}

export { showAlert, storeTokens }
