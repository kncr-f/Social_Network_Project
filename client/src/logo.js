

export default function Logo() {
    const style = {

        width: "200px",
        height: "200px",

    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                    style={style}
                    src="./images.png"
                    alt="logo"
                />
            </div>


        </>
    );
}