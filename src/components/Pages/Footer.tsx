import logo from "../../imgs/logoGreen.png";

const Footer = () => {
    return (
        <div className="p-[10px] p-3 mt-3 mb-3">
            <hr></hr>
            <div className="flex justify-center items-center gap-2 p-1">
                <small>© 2023 alux444</small>
                <a href="http://spotify.com/" target="_blank" rel="noreferrer">
                    <img className="h-[1rem]" src={logo} />
                </a>
            </div>
            <p>
                <a
                    href="https://github.com/alux444"
                    target="_blank"
                    rel="noreferrer"
                    style={{ margin: "10px" }}
                >
                    Github
                </a>
                <a
                    href="https://alux444.github.io"
                    target="_blank"
                    rel="noreferrer"
                    style={{ margin: "10px" }}
                >
                    Portfolio
                </a>
                <a
                    href="https://www.linkedin.com/in/alexliang1/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ margin: "10px" }}
                >
                    LinkedIn
                </a>
            </p>
        </div>
    );
};

export default Footer;
