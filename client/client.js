const handleError = (message) => {
  //$("#errorMessage").text(message);
  //$("#flowerMessage").animate({width:'toggle'},350);

  $("#errorText").text(message);
  //$("#error").animate()
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {
      $("#flowerMessage").animate({width:'hide'},350);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    $("#flowerMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("RAWR! All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("RAWR! Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    $("#flowerMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("RAWR! Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });

  $("#passwordChangeForm").on("submit", (e) => {
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
      sendAjax($("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize());

      return false;
  });
  
  $("#flowerForm").on("submit", (e) => {
    e.preventDefault();

    $("#flowerMessage").animate({width:'hide'},350);

    //if($("#flowerName").val() == '' || $("#flowerAge").val() == '') {
    //  handleError("RAWR! All fields are required");
    //  return false;
    //}

    // send current mouse position
    $("flowerForm").append('x', 0);
    $("flowerForm").append('y', 0);

    sendAjax($("#flowerForm").attr("action"), $("#flowerForm").serialize());

    return false;
  });
});