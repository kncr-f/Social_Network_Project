import { Image } from 'react-bootstrap';
import { Container } from "react-bootstrap";

export function ProfilePic({ url, first, last, showUploader, style }) {
    url = url || "https://i.pinimg.com/474x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg";


    return (
        <Container >

            <Image
                onClick={showUploader}
                className='rounded float-end img-fluid img-thumbnail'
                src={url} alt={`${first} ${last}`}
                style={style}
            />

        </Container>

    );
}