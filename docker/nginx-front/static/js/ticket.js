
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
								RAZ(),
								ReactDOM.render(React.createElement(InsertTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(ReadTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Read Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(ReadAllTicketsForm, null), document.getElementById('presentation_form'));
								}
							},"Read All Tickets" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ();
								ReactDOM.render(React.createElement(DeleteTicketForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Ticket" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(InsertChangeLogForm, null), document.getElementById('presentation_form'));
								}
							},"Insert change log" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
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
	    			React.createElement("label", { className: "control-label col-sm-1", "for":"ticket_id" }, null, "Id:"),
	    			React.createElement("div", { className:"col-sm-5"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ticket_id", id:"ticket_id", placeholder:"Enter ticket source id" }, null)
				  		)
	    			  ),
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", { className: "control-label col-sm-1", "for":"ticket_title" }, null, "Title:"),
	    			React.createElement("div", { className:"col-sm-5"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ticket_title", id:"ticket_title", placeholder:"Enter ticket title" }, null)
				  		)
	    			  ),
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("div", { className:"col-sm-offset-1 col-sm-10"},
	    				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_ticket","type":"submit", 
		    					onClick:
		    					function(){ 
		    						console.log("click");
		    						var id = document.getElementById("ticket_id").value;
									var title = document.getElementById("ticket_title").value;
									var xmlhttp  = new XMLHttpRequest(); 
									var url = "http://192.168.99.101:8000/tickets";
									var params = JSON.stringify({"project_area": { "id": id,"title": title }} );
									xmlhttp.open("POST", url, true);
									xmlhttp.send(params);
									xmlhttp.onload = function (e) {
									    if (xmlhttp.readyState === 4) {
									        if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									            console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket inseré");
									        }
									        else {
									        	console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									            alert("Ticket déjà existant");
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



var ReadTicketForm = React.createClass({
	  displayName: "ReadTicketForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
		    		React.createElement("div",{ className: "form-group" },
		    			React.createElement("label", { "for":"ticket_id" }, null, "Ticket:"),
		    			React.createElement("input", { className:"form-control", type:"text",  id:"ticket_id", placeholder:"Enter ticket ID" }, null)
					    ),
					React.createElement('button', {className:'btn btn-default', "id":"btn_read_ticket","type":"submit", 
						onClick: function(){
							RAZ_presentation_list();
							var id = document.getElementById("ticket_id").value;
							var xmlhttp  = new XMLHttpRequest(); 
							var url = "http://192.168.99.101:8000/tickets/" + id;
							xmlhttp.open("GET", url, true);
							xmlhttp.send();
							xmlhttp.onload = function (e) {
							if (xmlhttp.readyState === 4) {
								if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									var v = JSON.parse(xmlhttp.responseText);
									var r = v.results;
									var div = document.getElementById("presentation_list");
									var title = document.createElement('h3');
									title.innerHTML = "Ticket";
									div.appendChild(title);
									var list = document.createElement('ul');
									list.setAttribute('class', 'list-group col-sm-11');
									div.appendChild(list);
									var title = document.createElement('li');
									title.setAttribute('class', 'list-group-item active');
									title.innerHTML =  r[0].title;
									var description = document.createElement('li');
									description.setAttribute('class', 'list-group-item');
									description.innerHTML =  r[0].description;
									list.appendChild(title);
									list.appendChild(description);
								}
								else {
									var div = document.getElementById("presentation_list");
									var title = document.createElement('h3');
									title.innerHTML = "Le ticket n'existe pas";
									div.appendChild(title);
								}
							}
							};
							xmlhttp.onerror = function (e) {
								console.error("Error : " + xmlhttp);
							};
						}
					}, "Submit")
		
	    		);
	  		}
	});




var ReadAllTicketsForm = React.createClass({
	  displayName: "ReadAllTicketsForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
		    		React.createElement("div",{ className: "form-group" },
		    			// Warning: Unknown DOM property for. Did you mean htmlFor?
		    			React.createElement("label", { "for":"project_id" }, null, "Project:"),
		    			React.createElement("input", { className:"form-control", type:"text",  id:"project_id", placeholder:"Enter project ID" }, null)
					    ),
					React.createElement('button', {className:'btn btn-default', "id":"btn_read_ticket","type":"submit", 
						onClick: function(){ 
							RAZ_presentation_list();
							var project_id = document.getElementById("project_id").value;
							var xmlhttp  = new XMLHttpRequest(); 
							var url = "http://192.168.99.101:8000/tickets/?project_id=" + project_id;
							xmlhttp.open("GET", url, true);
							xmlhttp.send();
							xmlhttp.onload = function (e) {
								if (xmlhttp.readyState === 4) {
									if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
										var json = JSON.parse(xmlhttp.responseText);
										var count = json.count;
										if (count == 0){
											var div = document.getElementById("presentation_list");
											var title = document.createElement('h3');
											title.innerHTML = "Aucun ticket référencé pour ce project ID";
											div.appendChild(title);
										}
										else {
											var div = document.getElementById("presentation_list");
											var title = document.createElement('h3');
											title.innerHTML = "Tickets";
											div.appendChild(title);
											var list = document.createElement('ul');
											list.setAttribute('class', 'list-group col-sm-10');
											div.appendChild(list);
											var results = json.results;
											for (var i in results) {
												var title = document.createElement('li');
												title.setAttribute('class', 'list-group-item active');
												title.innerHTML =  results[i].title;
												var description = document.createElement('li');
												description.setAttribute('class', 'list-group-item');
												description.innerHTML =  results[i].description;
												var id = document.createElement('li');
												id.setAttribute('class', 'list-group-item');
												id.innerHTML =  "Ticket id : " + results[i].auto_id;
												var project_id = document.createElement('li');
												project_id.setAttribute('class', 'list-group-item');
												project_id.innerHTML =  "Project id : " + results[i].project_id;
												list.appendChild(title);
												list.appendChild(id);
												list.appendChild(project_id);
												list.appendChild(description);
											}
										}
									}
									else {
										var div = document.getElementById("presentation_list");
										var title = document.createElement('h3');
										title.innerHTML = "KO";
										div.appendChild(title);
									}
								}
							};
							xmlhttp.onerror = function (e) {
								console.error("Error : " + xmlhttp);
							};
						}
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

