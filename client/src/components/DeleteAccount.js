import { Button, Modal } from "react-bootstrap";




const DeleteAccount = (props) => {


    const handleDelete = () => {
        fetch("/delete-account", {
            method: "POST",

        })
            .then(resp => resp.json())
            .then((data) => {

                if (data.success === true) {
                    window.location.reload();
                }

            })
            .catch((err) => {
                console.log("/delete-account failed", err);

            });
    };



    return (
        <>
            <Modal.Dialog>
                <Modal.Header onClick={props.hideDeleteModule} closeButton>
                    <Modal.Title>Delete Your Account</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> Are you sure you want to delete your account ? </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete()} > Delete Your Account </Button>

                </Modal.Footer>
            </Modal.Dialog>
        </>

    );
};

export default DeleteAccount;