const Footer = () => {
    return (
        <div className="p-[10px] mb-3">
            <hr></hr>
            <div className="flex justify-center">
                <small>© 2023 alux444</small>
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
