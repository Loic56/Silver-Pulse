//########################
//######## USERS  ########
//########################
var UserView = React.createClass({
	  displayName: "UserView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Users"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertUserForm, null), document.getElementById('presentation_form'));
								}
							},"Insert User" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadUserForm, null), document.getElementById('presentation_form'));
								}
							},"Read User" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteUserForm, null), document.getElementById('presentation_form'));
								}
							},"Delete User" )),
												React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								//ReactDOM.render(React.createElement(InsertUserForm, null), document.getElementById('presentation_form'));
								}
							},"All Users" ))
						)
	    		);
	  		}
	});


var InsertUserForm = React.createClass({
	  displayName: "InsertUserForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"login" }, null, "Email:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"login", placeholder:"Enter Email" }, null)
				    ),

				React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"pwd" }, null, "Password:"),
	    			React.createElement("input", { className:"form-control", type:"password",  id:"pwd", placeholder:"Enter Password" }, null)
				    ), 
				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_user","type":"submit", 
					onClick: 
					function(){ 
						var login = document.getElementById("login").value;
						var pwd = document.getElementById("pwd").value;

						var xmlhttp  = new XMLHttpRequest(); 
						var url = "http://192.168.99.101:8000/users";

						var params = JSON.stringify({"user": {"name": login , "password" : pwd}} );
						console.log(params);

						xmlhttp.open("POST", url, true);
						xmlhttp.send(params);
						xmlhttp.onload = function (e) {
							if (xmlhttp.readyState === 4) {
								if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									alert("User inseré");

								}
								else {
									console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									alert("Users déjà existant");
								}
							}
						};
						xmlhttp.onerror = function (e) {
							console.error("Error : " + xmlhttp);
						};
						// set users views
						show_all_users();
					}
				}, "Insert")
		
	    	);
	  	}
	});



var ReadUserForm = React.createClass({
	  displayName: "ReadUserForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"username" }, null, "User:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"username", placeholder:"Enter user name" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_user","type":"submit", 
					onClick: function(){ alert("read user"); }
				}, "Submit")
		
	    	);
	  	}
	});
var DeleteUserForm = React.createClass({
	  displayName: "DeleteUserForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"username" }, null, "User:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"username", placeholder:"Enter user name" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_user","type":"submit", 
					onClick: function(){ alert("delete user"); }
				}, "Delete")
		
	    	);
	  	}
	});



var MainFooter = React.createClass({
	  displayName: "MainFooter",

	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_save_dashboard","type":"submit", onClick: function(){ save_dashboard();}}, "Save to Dashboards"),
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_reset_view","type":"submit", onClick: function(){ reset_view();}}, "Reset View")
			)
	  }
	});
	


var DashboardFooter = React.createClass({
	  displayName: "DashboardFooter",

	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_save_dashboard","type":"submit", onClick: function(){ close_dashboard_view();}}, "Close"))

	  }
	});


function show_all_users(){
	var xmlhttp  = new XMLHttpRequest(); 
	var url = "http://192.168.99.101:8000/users";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onload = function (e) {
	if (xmlhttp.readyState === 4) {
		if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
			var s = JSON.stringify(xmlhttp.responseText);
			// delete first/last character
			str = s.substring(1, s.length-1);
			var div = document.getElementById("presentation_list");
			var title = document.createElement('h3');
			title.innerHTML = "Users";
			div.appendChild(title);
			var list = document.createElement('div');
			list.setAttribute('class', 'list-group col-sm-11');
			div.appendChild(list);
			var users_tab = str.split(";");
			for(var i=0; i < (users_tab.length-1); i++){
				var user_fields = users_tab[i].split(",");
				var btn = document.createElement('button');
				btn.setAttribute('type', 'button');
				btn.setAttribute('class', 'list-group-item');
				var user_id = user_fields[1];
				var user_name = user_fields[2];
				var user_pwd = user_fields[3];
				btn.setAttribute('data-param', user_id);
				btn.onclick = function () {
					del_user(this.getAttribute('data-param'));
				};
				btn.innerHTML = "User Id:" +user_fields[1] + ", User name:" + user_name + ", User pwd:" + user_pwd;
				list.appendChild(btn);
			}
		}
		else {
			console.error("Response : " + JSON.stringify(xmlhttp.responseText));
			alert("ko");
		}
	}
	};
	xmlhttp.onerror = function (e) {
		console.error("Error : " + xmlhttp);
	};
};


ReactDOM.render(React.createElement(NavBar, null), document.getElementById('nav'));
ReactDOM.render(React.createElement(SideBar, null), document.getElementById('sidebar'));
