
var ProjectAreaView = React.createClass({
	  displayName: "ProjectAreaView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Project Areas"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(InsertProjectAreaForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Project Area" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(ReadProjectAreaForm, null), document.getElementById('presentation_form'));
								}
							},"Read Project Area" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ();
								var xmlhttp  = new XMLHttpRequest(); 
								var url = "http://192.168.99.101:8000/project_areas/?";
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
												title.innerHTML = "Aucun Project Area référencé ";
												div.appendChild(title);
											}
											else {
												var div = document.getElementById("presentation_list");
												var title = document.createElement('h3');
												title.innerHTML = "Project Areas";
												div.appendChild(title);
												var list = document.createElement('ul');
												list.setAttribute('class', 'list-group col-sm-10');
												div.appendChild(list);
												var results = json.results;

												for (var i in results) {
													var project_area_title = document.createElement('li');
													project_area_title.setAttribute('class', 'list-group-item active');
													project_area_title.innerHTML =  results[i].title;
													var project_area_id = document.createElement('li');
													project_area_id.setAttribute('class', 'list-group-item');
													project_area_id.innerHTML =  "Project Area id : " + results[i].auto_id;
													list.appendChild(project_area_title);
													list.appendChild(project_area_id);
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
							},"All Project Areas" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ();
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
	    			React.createElement("label", { className: "col-sm-10", "for":"ProjectArea_title" }, null, "Title:"),
	    			React.createElement("div", { className:"col-sm-10"},
	    				React.createElement("input", { className:"form-control", type:"text", name:"ProjectArea_title", id:"ProjectArea_title", placeholder:"Enter project area title" }, null)
				  		)
	    			  ),
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
	    		);
	  		}
	});


var ReadProjectAreaForm = React.createClass({
	  displayName: "ReadProjectAreaForm",
	  render: function render() {
	    return React.createElement("div", { className: "form-horizontal" },
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", {className: "col-sm-10", "for":"project_area_id" }, null, "Project Area:"),
	    			React.createElement("div", { className:"col-sm-10"},
	    				React.createElement("input", { className:"form-control", type:"text",  id:"project_area_id", placeholder:"Enter projet area ID" }, null)
	    			)
				),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_project_area","type":"submit", 
					onClick: function(){ 
						RAZ_presentation_list();
						var id = document.getElementById("project_area_id").value;
						var xmlhttp  = new XMLHttpRequest(); 
						var url = "http://192.168.99.101:8000/project_areas/" + id;
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
									title.innerHTML = "Le project Area n'existe pas";
									div.appendChild(title);
								}
								else {
									var v = JSON.parse(xmlhttp.responseText);
									var r = v.results;
									var div = document.getElementById("presentation_list");
									var title = document.createElement('h3');
									title.innerHTML = "Project Areas";
									div.appendChild(title);
									var list = document.createElement('ul');
									list.setAttribute('class', 'list-group col-sm-11');
									div.appendChild(list);
									var title_project_area = document.createElement('li');
									title_project_area.setAttribute('class', 'list-group-item active');
									title_project_area.innerHTML =  r[0].title;
									var id_project_area = document.createElement('li');
									id_project_area.setAttribute('class', 'list-group-item');

									id_project_area.innerHTML =  r[0].auto_id;
									list.appendChild(title_project_area);
									list.appendChild(id_project_area);		
								}
							}
							else {
								var div = document.getElementById("presentation_list");
								var title = document.createElement('h3');
								title.innerHTML = "Le Project Area n'existe pas";
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


var ReadAllProjectAreasForm = React.createClass({
	  displayName: "ReadAllProjectAreasForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
		    		React.createElement("div",{ className: "form-group" },
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


var DeleteProjectAreaForm = React.createClass({
	  displayName: "DeleteProjectAreaForm",
	  render: function render() {
	    return React.createElement("div", { className: "form-horizontal"},
	    		React.createElement("div",{ className: "form-group" },
	    			React.createElement("label", {className:"col-sm-10", "for":"project_area_id" }, null, "Project Area:"),
	    			React.createElement("div", { className:"col-sm-10"},
	    				React.createElement("input", { className:"form-control", type:"text",  id:"project_area_id", placeholder:"Enter projet area ID" }, null)
					)    
				),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_project_area","type":"submit", 
					onClick: 
						function(){ 
							var id = document.getElementById("project_area_id").value;
							var xmlhttp  = new XMLHttpRequest(); 
							var url = "http://192.168.99.101:8000/project_areas";
							var params = JSON.stringify({"project_area": {"id": parseInt(id) }} );
							xmlhttp.open("DELETE", url, true);
							xmlhttp.send(params);
							xmlhttp.onload = function (e) {
								if (xmlhttp.readyState === 4) {
									if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
									   console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									}
									else {
									   console.error("Response : " + JSON.stringify(xmlhttp.responseText));
									}
								}
							};
							xmlhttp.onerror = function (e) {
								console.error("Error ");
							};
						}
				}, "Delete")
	    	);
	  	}
	});


/*
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

			for(var i=0; i < (project_areas_tab.length-1); i++){
				var project_areas_fields = project_areas_tab[i].split(",");
				var btn = document.createElement('button');
				btn.setAttribute('type', 'button');
				btn.setAttribute('class', 'list-group-item');
				var id = project_areas_fields[1];
				var title = project_areas_fields[2];
				btn.setAttribute('data-param', id);

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
	var xmlhttp  = new XMLHttpRequest(); 
	var url = "http://192.168.99.101:8000/project_areas";
	var p = JSON.stringify({"project_area": {"id": parseInt(id)}} ); 
	console.log(p);
	xmlhttp.open("DELETE", url, true);
	// xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(p);
	xmlhttp.onload = function (e) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
				console.error("Response : " + JSON.stringify(xmlhttp.responseText));
			}
			else {
				console.error("Response : " + JSON.stringify(xmlhttp.responseText));
			}
		}
	};
	xmlhttp.onerror = function (e) {
		console.error("Error : " + xmlhttp);
	};
};
*/