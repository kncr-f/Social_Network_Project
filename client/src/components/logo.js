import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default function Logo() {
    const style = {
        width: "100px",
        height: "100px"
    };

    return (
        <>
            <Container>
                <Image style={style} className="rounded float-start img-fluid img-thumbnail" src="./download.png"></Image>
            </Container>

        </>
    );
}