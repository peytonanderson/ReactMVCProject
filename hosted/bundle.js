"use strict";

var handleFlower = function handleFlower(e) {
  e.preventDefault();
  var serializedForm = $("#flowerForm").serialize();
  serializedForm = "".concat(serializedForm, "&x=").concat(e.clientX, "&y=").concat(e.clientY);
  $("#flowerMessage").animate({
    width: 'hide'
  }, 350);
  sendAjax('POST', $("#flowerForm").attr("action"), serializedForm, function () {
    loadFlowersFromServer();
  });
  return false;
};

var handlePasswordChange = function handlePasswordChange(e) {
  e.preventDefault();
  $("#flowerMessage").animate({
    width: 'hide'
  }, 350); // check if all fields aren't filled out

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  } // check if passwords are the same


  if ($("#pass").val() != $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  } // check if new password is already the old one
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

var FlowerForm = function FlowerForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "flowerForm",
    name: "flowerForm",
    className: "flowerForm"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "image",
    onClick: handleFlower,
    className: "makeFlowerSubmit",
    action: "/maker",
    method: "POST",
    src: "/assets/img/soil.png",
    alt: "ground"
  }));
};

var FlowerList = function FlowerList(props) {
  if (props.flowers.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flowerList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyFlower"
    }, "No flowers yet", /*#__PURE__*/React.createElement("br", null), "Click the ground to plant a flower"));
  }

  var flowerNodes = props.flowers.map(function (flower) {
    return /*#__PURE__*/React.createElement("div", {
      key: flower._id,
      className: "flower"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/planted.png",
      alt: "planted spot",
      className: "flowerPlanted",
      style: {
        position: 'absolute',
        bottom: '35px',
        left: flower.x - 15 + 'px'
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/stem.png",
      alt: "stem",
      className: "stem",
      style: {
        display: true ? 'block' : 'hidden',
        position: 'absolute',
        bottom: '41px',
        left: flower.x + 'px',
        width: '3px',
        height: flower.createdDate,
        maxHeight: '100px'
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/sprout.png",
      alt: "sprout",
      className: "sprout",
      style: {
        position: 'absolute',
        bottom: '41px',
        left: flower.x - 30 + 'px'
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/flower" + flower.color + ".png",
      alt: "flower image",
      className: "flowerFace",
      style: {
        position: 'absolute',
        bottom: '130px',
        left: flower.x - 48 + 'px'
      }
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "flowerList"
  }, flowerNodes);
};

var PasswordWindow = function PasswordWindow(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "wrapper"
  }, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, /*#__PURE__*/React.createElement("img", {
    id: "logo",
    src: "/assets/img/flowerpink.png",
    alt: "flower logo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    id: "loginButton",
    href: "/login"
  }, "Back to garden")), /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Log out"))), /*#__PURE__*/React.createElement("form", {
    id: "passwordForm",
    name: "passwordChangeForm",
    onSubmit: handlePasswordChange,
    action: "/passwordChange",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Retype password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  })));
}; // potential upgrades user could buy
// upgrades don't actually do anything


var BuyWindow = function BuyWindow(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "wrapper"
  }, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, /*#__PURE__*/React.createElement("img", {
    id: "logo",
    src: "/assets/img/flowerpink.png",
    alt: "flower logo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    id: "loginButton",
    href: "/login"
  }, "Back to garden"))), /*#__PURE__*/React.createElement("div", {
    id: "upgrades"
  }, /*#__PURE__*/React.createElement("div", {
    className: "upgrade"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/seed.png",
    alt: "seed"
  }), /*#__PURE__*/React.createElement("p", null, "More seeds"), /*#__PURE__*/React.createElement("input", {
    type: "button",
    value: "x 5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "upgrade"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/seed.png",
    alt: "seed"
  }), /*#__PURE__*/React.createElement("p", null, "Flower grow speed"), /*#__PURE__*/React.createElement("input", {
    type: "button",
    value: "x 2"
  }))));
};

var createPasswordWindow = function createPasswordWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PasswordWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createBuyWindow = function createBuyWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(BuyWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var loadFlowersFromServer = function loadFlowersFromServer() {
  sendAjax('GET', '/getFlowers', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(FlowerList, {
      flowers: data.flowers
    }), document.querySelector("#flowers"));
  });
};

var setup = function setup(csrf) {
  var passwordButton = document.querySelector("#passwordButton");
  var buyButton = document.querySelector("#buyButton");
  passwordButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPasswordWindow(csrf);
    return false;
  });
  buyButton.addEventListener("click", function (e) {
    e.preventDefault();
    createBuyWindow(csrf);
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(FlowerForm, {
    csrf: csrf
  }), document.querySelector("#makeFlower"));
  ReactDOM.render( /*#__PURE__*/React.createElement(FlowerList, {
    flowers: []
  }), document.querySelector("#flowers"));
  loadFlowersFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#flowerMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#flowerMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
