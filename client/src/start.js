import ReactDOM from "react-dom";
import HelloWorld from './hello';

ReactDOM.render(<HelloWorld greetee="kittyy" />, document.querySelector("main"));

// function HelloWorld(props) {
//     //return React.createElement("div", /*...*/)
//     console.log(props);

//     return (
//         <div className="funky">
//             Hello, {props.greetee}?!
//             {props.greetee == 'kittyy' && <Greetee name={props.greetee} />}
//         </div>
//     );
// }


// function Greetee(props) {
//     return (
//         <p>
//             <strong style={{
//                 color: "tomato",
//                 textDecoration: "underline"
//             }}>
//                 The greetee is {props.name}{props.name != "kittyy" ? "!" : "?"}
//             </strong>
//         </p>
//     );
// }