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
								RAZ(),
								// , {pollInterval:2000} 
								ReactDOM.render(React.createElement(InsertProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Project" )),
						React.createElement("li", null, React.createElement("a", { href: "#", 
							onClick: function(){ 
								RAZ(),
								ReactDOM.render(React.createElement(ReadProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Read Project" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ();
								ReactDOM.render(React.createElement(ReadAllProjectsForm, null), document.getElementById('presentation_form'));
							}
						},"All Projects" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ();
								ReactDOM.render(React.createElement(DeleteProjectForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Project" ))
						)
	    		);
	  		}
	});





var ReadAllProjectsForm = React.createClass({
	displayName: "ReadAllProjectsForm",
	// array: allProjectAreas(),
	getInitialState: function() {
			// init du composant
			var x = this.loadProjectAreas();
	    	return {data: x };
	  	},
	  	// pollInterval={2000}
		componentDidMount: function() {
			// si le composant est correctement monté
	  	},
	  	loadProjectAreas(){
			var projectAreas = [];
			var xmlhttp  = new XMLHttpRequest(); 
			var url = "http://192.168.99.101:8000/project_areas/?";
			// la requete doit être synchrone (false)
			xmlhttp.open("GET", url, false);
			xmlhttp.send(null);
			if (xmlhttp.status === 200) {
				var json = JSON.parse(xmlhttp.responseText);
				var count = json.count;
				if (count == 0){
					alert("Aucun Project Area référencé");
				}
				else {
					var results = json.results;
					for (var i in results) {
					projectAreas.push(results[i].auto_id +";"+ results[i].title);
					}
				}
			}
			return projectAreas;
	},
	render: function render() {
	    return React.createElement("div", {className: "form-horizontal"},
	    		React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10", "for": "project_area_id"}, null, "Project Area id:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", { id:"selected_project_area", className: "input-large form-control"}, 
		    		    	this.state.data.map(function(element) {
		    		    		var res = element.split(";");
	            				return React.createElement("option", { value: res[0] }, res[1]);
		    				})
		    			)
		    		)
		    	),
				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_project","type":"submit", 
					onClick: 
						function(){ 
							RAZ_presentation_list();
							var select = document.getElementById("selected_project_area");
							var choice = select.selectedIndex;
							var project_area_id = select.options[choice].value;
							var xmlhttp  = new XMLHttpRequest(); 
							var url = "http://192.168.99.101:8000/projects/?project_areas_id=" + project_area_id;
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
											title.innerHTML = "Aucun Project référencé ";
											div.appendChild(title);
										}
										else {
											var div = document.getElementById("presentation_list");
											var title = document.createElement('h3');
											title.innerHTML = "Projects";
											div.appendChild(title);
											var list = document.createElement('ul');
											list.setAttribute('class', 'list-group col-sm-10');
											div.appendChild(list);
											var results = json.results;
											for (var i in results) {
												var project_title = document.createElement('li');
												project_title.setAttribute('class', 'list-group-item active');
												project_title.innerHTML =  results[i].title;
												var project_id = document.createElement('li');
												project_id.setAttribute('class', 'list-group-item');
												project_id.innerHTML =  "Project id : " + results[i].auto_id;
												var project_area_id = document.createElement('li');
												project_area_id.setAttribute('class', 'list-group-item');
												project_area_id.innerHTML =  "Project Area id : " + results[i].project_areas_id;
												list.appendChild(project_title);
												list.appendChild(project_id);
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
				}, "Submit")
	    	);
	  	}
	});


function allProjectAreas(){
	var projectAreas = [];
	var xmlhttp  = new XMLHttpRequest(); 
	var url = "http://192.168.99.101:8000/project_areas/?";
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);

	if (xmlhttp.status === 200) {
		var json = JSON.parse(xmlhttp.responseText);
		var count = json.count;
		if (count == 0){
			alert("Aucun Project Area référencé");
		}
		else {
			var results = json.results;
			for (var i in results) {
			projectAreas.push(results[i].auto_id +";"+ results[i].title);
			}
		}
	}

	/*
	xmlhttp.onload = function (e) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
				var json = JSON.parse(xmlhttp.responseText);
				var count = json.count;
				if (count == 0){
					alert("Aucun Project Area référencé");
				}
				else {
					var results = json.results;
					for (var i in results) {
						projectAreas.push(results[i].auto_id +";"+ results[i].title);
					}
				}
			}
		}
	};
	xmlhttp.onerror = function (e) {
		console.error("Error");
	};

	*/
	return projectAreas;
}



var InsertProjectForm = React.createClass({
	getInitialState: function() {
		// init du composant
		var x = this.loadProjectAreas();
    	return {data: x };
  	},
  	// pollInterval={2000}
	componentDidMount: function() {
		// si le composant est correctement monté
  	},
  	loadProjectAreas(){
		var projectAreas = [];
		var xmlhttp  = new XMLHttpRequest(); 
		var url = "http://192.168.99.101:8000/project_areas/?";
		// la requete doit être synchrone (false)
		xmlhttp.open("GET", url, false);
		xmlhttp.send(null);
		if (xmlhttp.status === 200) {
			var json = JSON.parse(xmlhttp.responseText);
			var count = json.count;
			if (count == 0){
				alert("Aucun Project Area référencé");
			}
			else {
				var results = json.results;
				for (var i in results) {
				projectAreas.push(results[i].auto_id +";"+ results[i].title);
				}
			}
		}
		return projectAreas;
  	},
	displayName: "InsertProjectForm",
	// array: allProjectAreas(),
	render: function render() {
	    return alert("render > " + this.state.data),

	    		React.createElement("div", {className: "form-horizontal"},
	    		React.createElement("div", {className: "form-group" },
	    			React.createElement("label", {className: "col-sm-10", "for":"project_title" }, null, "Title:"),
	    			React.createElement("div", { className:"col-sm-10"},
	    				React.createElement("input", {className:"form-control", type:"text",  id:"project_title", placeholder:"Enter project title" }, null)
				    	)
				    ),
	    		React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10", "for": "project_area_id"}, null, "Project Area id:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", { id:"selected_project_area", className: "input-large form-control"}, 
							this.state.data.map(function(element) {
		    		    		var res = element.split(";");
	            				return React.createElement("option", { value: res[0] }, res[1]);
		    				})

		    			)
		    		)
		    	),
				React.createElement('button', {className:'btn btn-default', "id":"btn_insert_project","type":"submit", 
					onClick: 
						function(){ 
							var project_title = document.getElementById("project_title").value;
							var select = document.getElementById("selected_project_area");
							var choice = select.selectedIndex;
							var project_area_id = select.options[choice].value;
							var xmlhttp  = new XMLHttpRequest(); 
							var url = "http://192.168.99.101:8000/projects";
							var params = JSON.stringify({"project":{"title":project_title,"project_areas_id":parseInt(project_area_id)}});
							xmlhttp.open("POST", url, true);
							xmlhttp.send(params);
							xmlhttp.onload = function (e) {
								if (xmlhttp.readyState === 4) {
									if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
										console.error("Response : " + JSON.stringify(xmlhttp.responseText));
										alert("Projet inseré");
									}
									else {
										console.error("Response : " + JSON.stringify(xmlhttp.responseText));
										alert("Projet déjà existant");
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


var ReadProjectForm = React.createClass({
	  displayName: "ReadProjectForm",
	  render: function render() {
	    return React.createElement("div", {className: "form-horizontal" },
	    		React.createElement("div",{className: "form-group" },
	    			React.createElement("label", {className:"col-sm-10", "for":"project_id" }, null, "Project:"),
	    			React.createElement("div", { className:"col-sm-10"},
	    				React.createElement("input", { className:"form-control", type:"text",  id:"project_id", placeholder:"Enter projet ID" }, null)
					)
				),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_project","type":"submit", 
					onClick: function(){ 
						RAZ_presentation_list();
						var id = document.getElementById("project_id").value;
						var xmlhttp  = new XMLHttpRequest(); 
						var url = "http://192.168.99.101:8000/projects/" + id;
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
										title.innerHTML = "Aucun Project référencé avec cet ID";
										div.appendChild(title);
									} else {
										var r = json.results;
										var div = document.getElementById("presentation_list");
										var title = document.createElement('h3');
										title.innerHTML = "Project";
										div.appendChild(title);
										var list = document.createElement('ul');
										list.setAttribute('class', 'list-group col-sm-11');
										div.appendChild(list);
										var project_title = document.createElement('li');
										project_title.setAttribute('class', 'list-group-item active');
										project_title.innerHTML =  r[0].title;
										var project_id = document.createElement('li');
										project_id.setAttribute('class', 'list-group-item');
										project_id.innerHTML =  "Project Id : " + r[0].auto_id;
										var project_area_id = document.createElement('li');
										project_area_id.setAttribute('class', 'list-group-item');
										project_area_id.innerHTML =  "Project Area Id : " + r[0].project_areas_id;
										list.appendChild(project_title);
										list.appendChild(project_id);
										list.appendChild(project_area_id);
									}

								}
								else {
									var div = document.getElementById("presentation_list");
									var title = document.createElement('h3');
									title.innerHTML = "Le ticket n'existe pas";
									div.appendChild(title);
								}
							};
							xmlhttp.onerror = function (e) {
								console.error("Error : " + xmlhttp);
							};
						}
					}
				}, "Submit")
	    	);
	  	}
	});


var DeleteProjectForm = React.createClass({
	  displayName: "DeleteProjectForm",
	  render: function render() {
	    return React.createElement("div", {className: "form-horizontal" },
	    		React.createElement("div",{className: "form-group" },
	    			React.createElement("label", {className:"col-sm-10", "for":"project_id" }, null, "Project:"),
	    			React.createElement("div", {className:"col-sm-10"},
	    				React.createElement("input", {className:"form-control", type:"text",  id:"project_id", placeholder:"Enter projet ID" }, null)
					)
				),



				React.createElement('button', {className:'btn btn-default', "id":"btn_del_project","type":"submit", 
					onClick: function(){ 
						alert("delete project"); 
					}
				}, "Delete")
	    	);
	  	}
	});

