export default function Greetee(props) {
    return (
        <p>
            <strong style={{
                color: "tomato",
                textDecoration: "underline"
            }}>
                The greetee is {props.name}{props.name != "kittyy" ? "!" : "?"}
            </strong>
        </p>
    );
}