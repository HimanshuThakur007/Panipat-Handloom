import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const showConfirmationAlert = (deleteMasterData,code) => {
    MySwal.fire({
        title: 'Are you sure?',
        text: 'You want to change the Status!',
        showCancelButton: true,
        confirmButtonColor: '#00ff00',
        confirmButtonText: 'Yes, change it!',
        cancelButtonColor: '#ff0000',
        cancelButtonText: 'Cancel',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const message = await deleteMasterData(code)
            MySwal.fire({
                title: 'Status Changed!',
                text: message,
                className: "btn btn-success",
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            });
        } else {
            MySwal.close();
        }

    });
};
export const showConfirmationStatusAlert = (deleteMasterData,code,statusId,type) => {
    MySwal.fire({
        title: 'Are you sure?',
        text: 'You won\'t  to change the status!',
        showCancelButton: true,
        confirmButtonColor: '#00ff00',
        confirmButtonText: 'Yes, change it!',
        cancelButtonColor: '#ff0000',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeof deleteMasterData === 'function') {
                deleteMasterData(code,statusId,type);
                console.log(code,'sweeetAlert')
            } else {
                console.error('deleteMasterData is not a function');
                console.log(code,'sweeetAlert')
            }
            MySwal.fire({
                title: 'Status!',
                text: 'Your status has been changed.',
                className: "btn btn-success",
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            });
        } else {
            MySwal.close();
        }

    });
};