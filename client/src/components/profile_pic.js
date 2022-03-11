
export function ProfilePic({ url, first, last, showUploader }) {
    url = url || "https://i.pinimg.com/474x/2f/ec/a4/2feca4c9330929232091f910dbff7f87.jpg";
    const style = {
        width: "200px",
        height: "200px",
        float: "right",
        cursor: "pointer"

    };
    return (
        <div onClick={showUploader}>
            <img style={style} src={url} alt={`${first} ${last}`} />
        </div>
    );
}