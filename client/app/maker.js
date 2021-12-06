const handleFlower = (e) => {
    e.preventDefault();

    let serializedForm = $("#flowerForm").serialize();
    serializedForm = `${serializedForm}&x=${e.clientX}&y=${e.clientY}`;
    
    $("#flowerMessage").animate({ width: 'hide' }, 350);

    sendAjax('POST', $("#flowerForm").attr("action"), serializedForm, function () {
        loadFlowersFromServer();
    });

    return false;
};

const handlePasswordChange = (e) => {
    e.preventDefault();

    $("#flowerMessage").animate({ width: 'hide' }, 350);

    // check if all fields aren't filled out
    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    // check if passwords are the same
    if ($("#pass").val() != $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    // check if new password is already the old one
    // if not, set password
    //if (currentUser.password == req.body.pass) {
    //    return res.status(400).json({ error: 'Passwords is already in use' });
    //} else {
    //    currentUser.password = req.body.pass;
    //    return false;
    //}
    sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);

    return false;
};

const FlowerForm = (props) => {
    return (
        <form id="flowerForm"
            name="flowerForm"
            className="flowerForm"
        >
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="image"
                onClick={handleFlower}
                className="makeFlowerSubmit"
                action="/maker"
                method="POST"
                src="/assets/img/soil.png"
                alt="ground"
            />
        </form>
    );
};

const FlowerList = function (props) {
    if (props.flowers.length === 0) {
        return (
            <div className="flowerList">
                <h3 className="emptyFlower">No flowers yet<br />Click the ground to plant a flower</h3>
            </div>
        );
    }

    const flowerNodes = props.flowers.map(function (flower) {
        return (
            <div key={flower._id} className="flower">
                <img src="/assets/img/planted.png"
                    alt="planted spot"
                    className="flowerPlanted"
                    style={{
                        position: 'absolute',
                        bottom: '35px',
                        left: (flower.x - 15) + 'px'
                    }}
                />
                <img src="/assets/img/stem.png"
                    alt="stem"
                    className="stem"
                    style={{
                        display: (true) ? 'block' : 'hidden',
                        position: 'absolute',
                        bottom: '41px',
                        left: (flower.x) + 'px',
                        width: '3px',
                        height: (flower.createdDate),
                        maxHeight: '100px'
                    }}
                />
                <img src="/assets/img/sprout.png"
                    alt="sprout"
                    className="sprout"
                    style={{
                        position: 'absolute',
                        bottom: '41px',
                        left: (flower.x - 30) + 'px',
                    }}
                />
                <img src={"/assets/img/flower" + flower.color + ".png"}
                    alt="flower image"
                    className="flowerFace"
                    style={{
                        position: 'absolute',
                        bottom: '130px',
                        left: (flower.x - 48) + 'px',
                    }}
                />
            </div>
        );
    });

    return (
        <div className="flowerList">
            {flowerNodes}
        </div>
    );
};

const PasswordWindow = (props) => {
    return (
        <div id="wrapper">
            <nav>
                <a href="/login"><img id="logo" src="/assets/img/flowerpink.png" alt="flower logo" /></a>
                <div className="navlink"><a id="loginButton" href="/login">Back to garden</a></div>
                <div className="navlink"><a href="/logout">Log out</a></div>
            </nav>
            <form id="passwordForm"
                name="passwordChangeForm"
                onSubmit={handlePasswordChange}
                action="/passwordChange"
                method="POST"
                className="mainForm"
            >
                <label htmlFor="pass">Password: </label>
                <input id="pass" type="password" name="pass" placeholder="password" />
                <label htmlFor="pass2">Retype password: </label>
                <input id="pass2" type="password" name="pass2" placeholder="retype password" />
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="formSubmit" type="submit" value="Change Password" />
            </form>
        </div>
    );
};

// potential upgrades user could buy
// upgrades don't actually do anything
const BuyWindow = (props) => {
    return (
        <div id="wrapper">
            <nav>
                <a href="/login"><img id="logo" src="/assets/img/flowerpink.png" alt="flower logo" /></a>
                <div className="navlink"><a id="loginButton" href="/login">Back to garden</a></div>
            </nav>
            <div id="upgrades">
                <div className="upgrade">
                    <img src="/assets/img/seed.png" alt="seed" />
                    <p>More seeds</p>
                    <input type="button" value="x 5" />
                </div>
                <div className="upgrade">
                    <img src="/assets/img/seed.png" alt="seed" />
                    <p>Flower grow speed</p>
                    <input type="button" value="x 2" />
                </div>
            </div>
        </div>
    );
}

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
        <PasswordWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createBuyWindow = (csrf) => {
    ReactDOM.render(
        <BuyWindow csrf={csrf} />,
        document.querySelector("#content")
    );
}

const loadFlowersFromServer = () => {
    sendAjax('GET', '/getFlowers', null, (data) => {
        ReactDOM.render(
            <FlowerList flowers={data.flowers} />, document.querySelector("#flowers")
        );
    });
};

const setup = function (csrf) {
    const passwordButton = document.querySelector("#passwordButton");
    const buyButton = document.querySelector("#buyButton");

    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    buyButton.addEventListener("click", (e) => {
        e.preventDefault();
        createBuyWindow(csrf);
        return false;
    });

    ReactDOM.render(
        <FlowerForm csrf={csrf} />, document.querySelector("#makeFlower")
    );

    ReactDOM.render(
        <FlowerList flowers={[]} />, document.querySelector("#flowers")
    );
    
    loadFlowersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});