const handleDomo = (e) => {
    e.preventDefault();

    let serializedForm = $("#domoForm").serialize();
    serializedForm = `${serializedForm}&x=${e.clientX}&y=${e.clientY}`;
    console.log('x:' + e.clientX + ', y:' + e.clientY);
    console.log(e);
    console.log(serializedForm);

    $("#domoMessage").animate({ width: 'hide' }, 350);

    sendAjax('POST', $("#domoForm").attr("action"), serializedForm, function () {
        loadDomosFromServer();
    });

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            name="domoForm"
            className="domoForm"
        >
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="image"
                onClick={handleDomo}
                className="makeDomoSubmit"
                action="/maker"
                method="POST"
                src="/assets/img/flowericon.png"
                alt="ground"
            />
            <p>Plant flower ^</p>
        </form>
    );
};

const DomoList = function (props) {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No flowers yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function (domo) {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/flowericon.png" alt="flower icon" className="domoFace" />
                <h3 className="domoAge"> Time until grown: {5 - domo.age} minutes</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});