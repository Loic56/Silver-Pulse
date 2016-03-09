var CommentBox = React.createClass({
	  displayName: "CommentBox",

	  render: function render() {
	    return React.createElement("div",{ className: "commentBox" },
	    			React.createElement("h1",null,"Comments"),
				    React.createElement(CommentList, { data: this.props.data }),
				    React.createElement(CommentForm, null)
	    );
	  }
	});

var CommentList = React.createClass({
	  displayName: "CommentList",

	  render: function render() {
	    var commentNodes = this.props.data.map(function (comment) {
	      return React.createElement(Comment,{ author: comment.author },comment.text);
	    });
	    return React.createElement("div",{ className: "commentList" },commentNodes);
	  }
	});

var CommentForm = React.createClass({
	  displayName: "CommentForm",
	  render: function render() {return React.createElement( "div",{ className: "commentForm" },"Hello, world! I am a CommentForm.");}
	});

	
var Comment = React.createClass({
	  displayName: "Comment",
	  render: function render() {
	    return React.createElement("div",{ className: "comment" },
	      React.createElement("h2",{ className: "commentAuthor" }, this.props.author),this.props.children);
	  }
	});

	
var data = [{ author: "Peter Hunt", text: "This is one comment" }, { author: "Jordan Walke", text: "This is *another* comment" }];

var NavBar = React.createClass({
	  displayName: "NavBar",
	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
					React.createElement("div",{ className: "navbar-header" },
						React.createElement("a",{ className: "navbar-brand", href: "#" },"Silver Pulse")
					),
					React.createElement("div",{ id: "navbar", className: "navbar-collapse collapse" },
						React.createElement("ul",{ className: "nav navbar-nav navbar-right" },
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Dashboard")
							),
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Settings")
							),
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Profile")
							),
							React.createElement("li", null,
								React.createElement("a", { href: "#" }, "Help")
							)
						)
					)
	    );
	  }
	});



function RAZ_view() {
	RAZ_form();
	RAZ_presentation();
};




var SideBar = React.createClass({
	  displayName: "SideBar",
	  render: function render() {
	    return React.createElement("ul", { className: "nav nav-sidebar" },
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(UserView, null), document.getElementById('presentation_tab'));
					} 
				},"Users" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(ProjectAreaView, null), document.getElementById('presentation_tab'));
					} 
				},"Project Areas" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(ProjectView, null), document.getElementById('presentation_tab'));
					} 
				},"Projects" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(SerieView, null), document.getElementById('presentation_tab'));
					} 
				},"Series" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(TicketView, null), document.getElementById('presentation_tab'));
					} 
				},"Tickets" ))
			)}
	});


//###########################
//######### TICKETS #########
//############################
var TicketView = React.createClass({
	  displayName: "TicketView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Tickets"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Read Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertChangeLogForm, null), document.getElementById('presentation_form'));
								}
							},"Insert change log" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(DeleteChangeLogForm, null), document.getElementById('presentation_form'));
								}
							},"Delete change log" ))
						)
	    		);
	  		}
	});



var InsertTicketForm = React.createClass({
	  displayName: "InsertTicketForm",
	  render: function render() {
	    return React.createElement("div", { className: "form-horizontal", name:"myform"},
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { className: "control-label col-sm-1", "for":"ticket_id" }, null, "Id:"),
	    			React.createElement("div", { className:"col-sm-5"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ticket_id", id:"ticket_id", placeholder:"Enter ticket source id" }, null)
				  		)
	    			  ),
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { className: "control-label col-sm-1", "for":"ticket_title" }, null, "Title:"),
	    			React.createElement("div", { className:"col-sm-5"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ticket_title", id:"ticket_title", placeholder:"Enter ticket title" }, null)
				  		)
	    			  ),
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("div", { className:"col-sm-offset-1 col-sm-10"},
	    				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_ticket","type":"submit", 
		    					onClick:
		    					function(){ 
		    						console.log("click");
		    					/*	var id = document.getElementById("ticket_id").value;
									var title = document.getElementById("ticket_title").value;
									var xmlhttp  = new XMLHttpRequest(); 
									var url = "http://192.168.99.101:8000/project_areas";
									var params = JSON.stringify({"project_area": { "id": id,"title": title }} );
									xmlhttp.open("POST", url, true);
									xmlhttp.send(params);
									xmlhttp.onload = function (e) {
									    if (xmlhttp.readyState === 4) {
									        if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									            console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket inseré");
									            // document.getElementById("ticket_id").innerHTML = "";
									            // document.getElementById("ticket_title").innerHTML = "";
									        }
									        else {
									        	console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket déjà existant");
									            // document.getElementById("ticket_id").innerHTML = "";
									            // document.getElementById("ticket_title").innerHTML = "";
									        }
									    }
									};
									xmlhttp.onerror = function (e) {
									    console.error("Error : " + xmlhttp);
									};
								*/
		    					}
	    					}, "Insert")
	    				)
	    			)
	    		);
	  		}
	});


var ReadTicketForm = React.createClass({
	  displayName: "ReadTicketForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
		    		React.createElement("div",{ className: "form-group" },
		    			// Warning: Unknown DOM property for. Did you mean htmlFor?
		    			React.createElement("label", { "for":"ticket_id" }, null, "Ticket:"),
		    			React.createElement("input", { className:"form-control", type:"text",  id:"ticket_id", placeholder:"Enter ticket ID" }, null)
					    ),
					React.createElement('button', {className:'btn btn-default', "id":"btn_read_ticket","type":"submit", 
						onClick: function(){ alert("read ticket"); }
					}, "Submit")
		
	    		);
	  		}
	});

var DeleteTicketForm = React.createClass({
	  displayName: "DeleteTicketForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"ticket_id" }, null, "Ticket:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"ticket_id", placeholder:"Enter ticket ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_ticket","type":"submit", 
					onClick: function(){ alert("delete ticket"); }
				}, "Delete")
		
	    	);
	  	}
	});
var InsertChangeLogForm = React.createClass({
	  displayName: "InsertChangeLogForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"change_log_id" }, null, "Change Log:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"change_log_id", placeholder:"Enter change log ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_change_log","type":"submit", 
					onClick: function(){ alert("insert change log"); }
				}, "Submit")
		
	    	);
	  	}
	});
var DeleteChangeLogForm = React.createClass({
	  displayName: "DeleteChangeLogForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"change_log_id" }, null, "Change Log:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"change_log_id", placeholder:"Enter change log ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_change_log","type":"submit", 
					onClick: function(){ alert("delete change log"); }
				}, "Delete")
		
	    	);
	  	}
	});



//##########################
//######### SERIES #########
//##########################
var SerieView = React.createClass({
	  displayName: "SerieView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Series"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Serie" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Read Serie" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Serie" ))
						)
	    		);
	  		}
	});

var InsertSerieForm = React.createClass({
	  displayName: "InsertSerieForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"serie_title" }, null, "Title:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_title", placeholder:"Enter serie title" }, null)
				    ),
				React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"serie_description" }, null, "Description:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_description", placeholder:"Enter Serie description" }, null)
				    ), 
				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_serie","type":"submit", 
					onClick: function(){ alert("insert serie"); }
				}, "Insert")
		
	    	);
	  	}
	});
var ReadSerieForm = React.createClass({
	  displayName: "ReadSerieForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"serie_id" }, null, "Serie:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_id", placeholder:"Enter serie ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_serie","type":"submit", 
					onClick: function(){ alert("read serie"); }
				}, "Submit")
		
	    	);
	  	}
	});
var DeleteSerieForm = React.createClass({
	  displayName: "DeleteSerieForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"serie_id" }, null, "Serie:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_id", placeholder:"Enter serie ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_serie","type":"submit", 
					onClick: function(){ alert("delete serie"); }
				}, "Delete")
		
	    	);
	  	}
	});


//##########################
//######### PROJECT ########
//##########################
var ProjectView = React.createClass({
	  displayName: "ProjectView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Projects"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Project" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Read Project" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Project" ))
						)
	    		);
	  		}
	});
var InsertProjectForm = React.createClass({
	  displayName: "InsertProjectForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"project_title" }, null, "Title:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"project_title", placeholder:"Enter project title" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_project","type":"submit", 
					onClick: function(){ alert("insert project"); }
				}, "Insert")
	    	);
	  	}
	});
var ReadProjectForm = React.createClass({
	  displayName: "ReadProjectForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"project_id" }, null, "Project:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"project_id", placeholder:"Enter projet ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_project","type":"submit", 
					onClick: function(){ alert("read project"); }
				}, "Submit")
	    	);
	  	}
	});
var DeleteProjectForm = React.createClass({
	  displayName: "DeleteProjectForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"project_id" }, null, "Project:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"project_id", placeholder:"Enter projet ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_project","type":"submit", 
					onClick: function(){ alert("delete project"); }
				}, "Delete")
	    	);
	  	}
	});


function get_All_project_areas(){
	var xmlhttp  = new XMLHttpRequest(); 
	var url = "http://192.168.99.101:8000/project_areas";
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
			title.innerHTML = "Project Areas";
			div.appendChild(title);
			var list = document.createElement('div');
			list.setAttribute('class', 'list-group col-sm-11');
			div.appendChild(list);

			var project_areas_tab = str.split(";");

			for(var i=0; i < project_areas_tab.length; i++){
				var project_areas_fields = project_areas_tab[i].split(",");
				var btn = document.createElement('button');
				btn.setAttribute('type', 'button');
				btn.setAttribute('class', 'list-group-item');
				var Id = project_areas_fields[1];
				btn.setAttribute('data-param', Id);
				// http://jsfiddle.net/asw3myqg/2/
				btn.onclick = function () {
					del_project_area(this.getAttribute('data-param'));
				};
				btn.innerHTML = project_areas_fields[1] + " " + project_areas_fields[2];
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


function del_project_area(id){
	// alert("delete : " + id);

};


//###############################
//######### PROJECT AREA ########
//###############################
var ProjectAreaView = React.createClass({
	  displayName: "ProjectAreaView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Project Areas"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								get_All_project_areas();
								ReactDOM.render(React.createElement(InsertProjectAreaForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Project Area" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadProjectAreaForm, null), document.getElementById('presentation_form'));
								}
							},"Read Project Area" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteProjectAreaForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Project Area" ))
						)
	    		);
	  		}
	});


var InsertProjectAreaForm = React.createClass({
	  displayName: "InsertProjectAreaForm",
	  render: function render() {
	    return React.createElement("div", { className: "form-horizontal", name:"myform"},
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { className: "control-label col-sm-1", "for":"ProjectArea_title" }, null, "Title:"),
	    			React.createElement("div", { className:"col-sm-5"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ProjectArea_title", id:"ProjectArea_title", placeholder:"Enter project area title" }, null)
				  		)
	    			  ),
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("div", { className:"col-sm-offset-1 col-sm-10"},
	    				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_ticket","type":"submit", 
		    					onClick:
		    					function(){ 
									var title = document.getElementById("ProjectArea_title").value;
									var xmlhttp  = new XMLHttpRequest(); 
									var url = "http://192.168.99.101:8000/project_areas";
									var params = JSON.stringify({"project_area": {"title": title }} );
									xmlhttp.open("POST", url, true);
									xmlhttp.send(params);
									xmlhttp.onload = function (e) {
									    if (xmlhttp.readyState === 4) {
									        if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									            console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket inseré");
									            // document.getElementById("ticket_id").innerHTML = "";
									            // document.getElementById("ticket_title").innerHTML = "";
									        }
									        else {
									        	console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket déjà existant");
									            // document.getElementById("ticket_id").innerHTML = "";
									            // document.getElementById("ticket_title").innerHTML = "";
									        }
									    }
									};
									xmlhttp.onerror = function (e) {
									    console.error("Error : " + xmlhttp);
									};
		    					}
	    					}, "Insert")
	    				)
	    			)
	    		);
	  		}
	});



var ReadProjectAreaForm = React.createClass({
	  displayName: "ReadProjectAreaForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"project_area_id" }, null, "Project Area:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"project_area_id", placeholder:"Enter projet area ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_project_area","type":"submit", 
					onClick: function(){ alert("read project area"); }
				}, "Submit")
	    	);
	  	}
	});
var DeleteProjectAreaForm = React.createClass({
	  displayName: "DeleteProjectAreaForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { "for":"project_area_id" }, null, "Project Area:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"project_area_id", placeholder:"Enter projet area ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_project_area","type":"submit", 
					onClick: function(){ alert("delete project area"); }
				}, "Delete")
	    	);
	  	}
	});

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
					onClick: function(){ alert("insert user"); }
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
	
ReactDOM.render(React.createElement(NavBar, null), document.getElementById('nav'));
ReactDOM.render(React.createElement(SideBar, null), document.getElementById('sidebar'));
